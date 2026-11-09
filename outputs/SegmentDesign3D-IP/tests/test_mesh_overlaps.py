from __future__ import annotations

import io
import json
import unittest
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from editing import load_editable_parts, translate_parts
from mesh_overlaps import _intersecting_pairs, assemble_parts, find_face_overlaps, part_face_ids
from test_connections import connection_fixture
from test_orientation import editor_app


def triangles_report(triangles):
    vertices = np.asarray(triangles, dtype=float).reshape(-1, 3)
    return find_face_overlaps(vertices, np.arange(len(vertices)).reshape(-1, 3))


class MeshOverlapTests(unittest.TestCase):
    def test_coplanar_positive_area_and_duplicate_faces_are_detected(self):
        first = [[0, 0, 0], [2, 0, 0], [0, 2, 0]]
        for second in ([[.2, .2, 0], [.8, .2, 0], [.2, .8, 0]], first, list(reversed(first))):
            report = triangles_report([first, second])
            self.assertEqual(report["pair_count"], 1)
            self.assertEqual(report["face_ids"], [0, 1])

    def test_shared_edge_vertex_and_disjoint_faces_are_not_overlaps(self):
        first = [[0, 0, 0], [1, 0, 0], [0, 1, 0]]
        for second in (
            [[1, 0, 0], [1, 1, 0], [0, 1, 0]],
            [[0, 0, 0], [1, 0, 0], [0, 0, 1]],
            [[0, 0, 0], [-1, 0, 1], [0, -1, 1]],
            [[.8, .8, 0], [1, .8, 0], [.8, 1, 0]],
            [[0, 0, .1], [1, 0, .1], [0, 1, .1]],
        ):
            self.assertEqual(triangles_report([first, second])["pair_count"], 0)

    def test_crossing_faces_and_edge_into_face_are_detected(self):
        first = [[0, 0, 0], [2, 0, 0], [0, 2, 0]]
        for second in (
            [[.4, .2, -1], [.4, .2, 1], [.4, 1.2, 0]],
            [[.2, .2, 0], [.8, .2, 0], [.2, .2, 1]],
        ):
            self.assertEqual(triangles_report([first, second])["pair_count"], 1)

    def test_closed_primitives_and_segmented_shared_boundaries_are_clean(self):
        for mesh in (trimesh.creation.box(), trimesh.creation.icosphere(subdivisions=2)):
            self.assertEqual(find_face_overlaps(mesh.vertices, mesh.faces)["pair_count"], 0)
        manifest, artifacts = connection_fixture()
        parts = load_editable_parts(artifacts["parts.npz"], manifest)
        vertices, faces, slices = assemble_parts(parts)
        self.assertEqual(find_face_overlaps(vertices, faces)["pair_count"], 0)
        moved = translate_parts(parts, {"0": [0, 0, 0], "1": [-.25, 0, 0], "2": [0, 0, 0]})
        vertices, faces, slices = assemble_parts(moved)
        report = find_face_overlaps(vertices, faces)
        self.assertGreater(report["pair_count"], 0)
        ids = part_face_ids(report, slices)
        self.assertTrue(ids["0"])
        self.assertTrue(ids["1"])
        self.assertFalse(ids["2"])

    def test_bvh_matches_all_pairs_on_random_triangles_without_duplicates(self):
        rng = np.random.default_rng(23)
        vertices = rng.normal(size=(180, 3))
        faces = np.arange(len(vertices)).reshape(-1, 3)
        report = find_face_overlaps(vertices, faces)
        normalized = (vertices - (vertices.min(axis=0) + vertices.max(axis=0)) / 2) / np.ptp(vertices, axis=0).max()
        triangles = normalized[faces]
        normals = np.cross(triangles[:, 1] - triangles[:, 0], triangles[:, 2] - triangles[:, 0])
        normals /= np.linalg.norm(normals, axis=1)[:, None]
        a, b = np.triu_indices(len(faces), 1)
        expected = _intersecting_pairs(triangles, normals, np.column_stack([a, b]), 1e-9)
        self.assertEqual(report["pair_count"], len(expected))
        self.assertEqual(report["face_ids"], np.unique(expected).tolist())

    def test_tolerance_scales_with_model_and_source_geometry_is_unchanged(self):
        vertices = np.array([[0, 0, 0], [2, 0, 0], [0, 2, 0], [.4, .2, -1], [.4, .2, 1], [.4, 1.2, 0]])
        faces = np.arange(6).reshape(-1, 3)
        original = vertices.copy()
        rotation = trimesh.transformations.rotation_matrix(.73, [1, 2, 3])[:3, :3]
        for scale in (1e-3, 1, 1e4):
            transformed = vertices @ rotation.T * scale + [100, -200, 300]
            self.assertEqual(find_face_overlaps(transformed, faces)["pair_count"], 1)
        np.testing.assert_array_equal(vertices, original)
        self.assertEqual(find_face_overlaps(vertices, np.array([[0, 0, 0], [3, 4, 5]]))["pair_count"], 0)


class MeshOverlapInterfaceTests(unittest.TestCase):
    def test_intersections_are_highlighted_without_rejecting_edits_or_recoloring_exports(self):
        manifest, artifacts = connection_fixture()
        app = AppTest.from_function(editor_app, args=(manifest, artifacts["parts.npz"])).run()
        self.assertEqual(len(app.exception), 0)
        state = app.session_state["part_editing"]
        self.assertEqual(state["overlap_report"]["pair_count"], 0)
        source = state["source_key"]
        offsets = {"0": [0, 0, 0], "1": [-.25, 0, 0], "2": [0, 0, 0]}
        event = {"source_key": source, "sequence": 1, "scales": {"0": 1, "1": 1, "2": 1}, "offsets": offsets}
        with patch("part_editor._component", return_value=event) as component:
            app.run()
        state = app.session_state["part_editing"]
        self.assertEqual(state["offsets"], offsets)
        self.assertGreater(state["overlap_report"]["pair_count"], 0)
        self.assertTrue(component.call_args.kwargs["overlap_faces"]["1"])
        app.button(key="rejoin_mesh").click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.error), 0)
        saved = app.session_state["part_editing"]["rejoined"]
        self.assertGreater(saved["overlap_report"]["pair_count"], 0)
        specification = json.loads(app.get("plotly_chart")[0].proto.spec)
        self.assertIn("#e12b35", specification["data"][0]["facecolor"])
        with np.load(io.BytesIO(saved["npz"])) as data:
            expected = {tuple(trimesh.visual.color.hex_to_rgba(part["color"])) for part in manifest["parts"]}
            self.assertTrue({tuple(color) for color in data["face_colors"]}.issubset(expected))
        zero = {key: [0, 0, 0] for key in offsets}
        with patch("part_editor._component", return_value={**event, "sequence": 2, "offsets": zero}):
            app.run()
        self.assertEqual(app.session_state["part_editing"]["overlap_report"]["pair_count"], 0)
        app.checkbox(key=f"show_overlaps_{source}").set_value(False).run()
        self.assertIsNone(app.session_state["part_editing"]["overlap_report"])


if __name__ == "__main__":
    unittest.main()
