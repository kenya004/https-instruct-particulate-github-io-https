from __future__ import annotations

import io
import json
import unittest
from dataclasses import replace
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from boundary_blending import apply_boundary_blend, build_boundary_blend
from connections import build_connection_plan, detect_connections, follow_connections
from editing import load_editable_parts, translate_parts
from mesh_overlaps import _intersecting_pairs, assemble_parts, find_face_overlaps, only_new_overlaps, part_face_ids
from test_connections import connection_fixture
from test_orientation import editor_app


def triangles_report(triangles):
    vertices = np.asarray(triangles, dtype=float).reshape(-1, 3)
    return find_face_overlaps(vertices, np.arange(len(vertices)).reshape(-1, 3))


def preexisting_overlap_fixture():
    # Interleaved source face IDs differ from the per-part assembly order.
    vertices = np.array([
        [[0, 0, 0], [3, 0, 0], [0, 3, 0]],
        [[4, 1, -1], [4, 1, 1], [4, 2, 0]],
        [[.2, .2, 0], [.8, .2, 0], [.2, .8, 0]],
        [[8, 0, 4], [9, 0, 4], [8, 1, 4]],
    ]).reshape(-1, 3)
    return connection_fixture(geometry=(vertices, np.arange(12).reshape(-1, 3), np.array([0, 1, 0, 1])))


def identity_roundoff_fixture():
    # The near-coplanar faces lie at the detector's tolerance. Reconstructing
    # absolute anchors at scale 1 used to move part 1 by -2.78e-17 in Z and
    # create a spurious new intersection without an actual user edit.
    vertices = np.array([[0, 0, 0], [1, 0, 0], [0, 1, 0],
                         [0, 0, 1e-9], [1, 0, 1e-9], [0, 1, 1e-9],
                         [.9, 0, 1e-9], [1, 0, 1e-9], [1, 0, .1], [.9, 0, .6]])
    faces = np.array([[0, 1, 2], [3, 4, 5], [6, 7, 8], [7, 6, 9]])
    return connection_fixture(geometry=(vertices, faces, np.array([0, 1, 0, 1])))


def changing_bounds_fixture():
    # Moving the distant third part used to enlarge the world-space tolerance
    # and report the two stationary, separated faces as newly overlapping.
    vertices = np.array([[[0, 0, 0], [1, 0, 0], [0, 1, 0]],
                         [[0, 0, 5e-9], [1, 0, 5e-9], [0, 1, 5e-9]],
                         [[2, 0, 0], [3, 0, 0], [2, 1, 0]]]).reshape(-1, 3)
    return connection_fixture(geometry=(vertices, np.arange(9).reshape(-1, 3), np.arange(3)))


class MeshOverlapTests(unittest.TestCase):
    def test_distant_motion_does_not_change_tolerance_or_stationary_pairs(self):
        manifest, artifacts = changing_bounds_fixture()
        parts = load_editable_parts(artifacts["parts.npz"], manifest)
        vertices, faces, _ = assemble_parts(parts)
        reference = find_face_overlaps(vertices, faces)
        self.assertEqual(reference["pair_count"], 0)
        for x in (3, 10, 100):
            current, _, _ = assemble_parts(translate_parts(parts, {"0": [0, 0, 0], "1": [0, 0, 0], "2": [x, 0, 0]}))
            report = find_face_overlaps(current, faces, frame=reference["frame"])
            self.assertEqual(report["frame"], reference["frame"])
            self.assertEqual(report["tolerance"], reference["tolerance"])
            self.assertEqual(only_new_overlaps(report, reference)["pair_count"], 0)
        current, _, _ = assemble_parts(translate_parts(parts, {"0": [0, 0, 0], "1": [0, 0, 0], "2": [-1.75, 0, 0]}))
        report = only_new_overlaps(find_face_overlaps(current, faces, frame=reference["frame"]), reference)
        np.testing.assert_array_equal(report["pairs"], [[0, 2]])

    def test_uniform_internal_pairs_are_excluded_but_cross_part_and_deformed_pairs_remain(self):
        first = [[0, 0, 0], [2, 0, 0], [0, 2, 0]]
        separated = np.array([first, np.array(first) + [5, 0, 0], np.array(first) + [10, 0, 0]])
        reference = triangles_report(separated)
        report = triangles_report([first, first, first])
        filtered = only_new_overlaps(report, reference, uniform_groups=[7, 7, 15])
        self.assertEqual({tuple(pair) for pair in filtered["pairs"]}, {(0, 2), (1, 2)})
        self.assertEqual(filtered["ignored_uniform_pair_count"], 1)
        # -1 is used for locally deformed parts and newly generated bridge faces.
        for groups in ([-1, -1, 15], [7, -1, 7]):
            filtered = only_new_overlaps(report, reference, uniform_groups=groups)
            self.assertTrue(any(-1 in np.asarray(groups)[pair] for pair in filtered["pairs"]))
            self.assertEqual(filtered["pair_count"], 3 if groups[0] == -1 else 2)

    def test_overlap_cache_includes_the_reference_frame(self):
        from part_editor import _overlaps
        manifest, artifacts = changing_bounds_fixture()
        vertices, faces, _ = assemble_parts(load_editable_parts(artifacts["parts.npz"], manifest))
        frame = {"origin": [1.5, .5, 2.5e-9], "scale": 3.0}
        self.assertEqual(_overlaps(vertices, faces, frame)["pair_count"], 0)
        self.assertEqual(_overlaps(vertices, faces, {**frame, "scale": 6.0})["pair_count"], 1)
        self.assertEqual(_overlaps(vertices, faces, frame)["pair_count"], 0)

    def test_empty_geometry_retains_a_valid_frame_and_invalid_frames_are_rejected(self):
        empty = find_face_overlaps(np.empty((0, 3)), np.empty((0, 3), dtype=int))
        self.assertEqual(empty["frame"]["scale"], 1)
        vertices = np.array([[0, 0, 0], [1, 0, 0], [0, 1, 0]])
        for frame in ({"origin": [0, 0, 0], "scale": 0}, {"origin": [0, 0, float("nan")], "scale": 1}):
            with self.assertRaises(ValueError):
                find_face_overlaps(vertices, [[0, 1, 2]], frame=frame)

    def test_unit_scales_preserve_exact_vertices_with_following_and_blending(self):
        manifest, artifacts = identity_roundoff_fixture()
        content = artifacts["parts.npz"]
        parts = load_editable_parts(content, manifest)
        connections, _ = detect_connections(content, parts)
        vertices, faces, _ = assemble_parts(parts)
        reference = find_face_overlaps(vertices, faces)
        scales = {str(part.part_id): 1 for part in parts}
        for root in (0, 1):
            for selection in ([], [0], [1], [0, 1]):
                with self.subTest(root=root, selection=selection):
                    base, automatic = follow_connections(parts, scales, build_connection_plan(parts, connections, root))
                    self.assertTrue(all(np.array_equal(value, np.zeros(3)) for value in automatic.values()))
                    field = build_boundary_blend(content, manifest, parts, connections, selection, root_id=root)
                    edited = apply_boundary_blend(parts, base, scales, automatic, field)
                    current, _, _ = assemble_parts(edited)
                    np.testing.assert_array_equal(current, vertices)
                    self.assertEqual(only_new_overlaps(find_face_overlaps(current, faces), reference)["pair_count"], 0)

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

    def test_all_initial_pairs_are_excluded_beyond_the_sample_limit(self):
        report = triangles_report([[[0, 0, 0], [1, 0, 0], [0, 1, 0]]] * 16)
        self.assertEqual(report["pair_count"], 120)
        self.assertEqual(len(report["sample_pairs"]), 100)
        self.assertEqual(len(report["pairs"]), 120)
        filtered = only_new_overlaps(report, report)
        self.assertEqual(filtered["pair_count"], 0)
        self.assertEqual(filtered["face_ids"], [])
        self.assertEqual(filtered["ignored_pair_count"], 120)
        self.assertEqual(report["pair_count"], 120)

    def test_old_face_with_a_new_partner_is_highlighted_but_old_partner_is_not(self):
        manifest, artifacts = preexisting_overlap_fixture()
        parts = load_editable_parts(artifacts["parts.npz"], manifest)
        vertices, faces, _ = assemble_parts(parts)
        reference = find_face_overlaps(vertices, faces)
        np.testing.assert_array_equal(reference["pairs"], [[0, 1]])
        moved = translate_parts(parts, {"0": [0, 0, 0], "1": [-3.5, 0, 0]})
        vertices, faces, slices = assemble_parts(moved)
        filtered = only_new_overlaps(find_face_overlaps(vertices, faces), reference)
        np.testing.assert_array_equal(filtered["pairs"], [[0, 2]])
        self.assertEqual(filtered["face_ids"], [0, 2])
        self.assertEqual(filtered["total_pair_count"], 2)
        self.assertEqual(part_face_ids(filtered, slices), {"0": [0], "1": [0]})

    def test_comparison_remaps_unordered_pairs_and_counts_new_bridge_faces(self):
        first = [[0, 0, 0], [2, 0, 0], [0, 2, 0]]
        second = [[.2, .2, 0], [.8, .2, 0], [.2, .8, 0]]
        reference = triangles_report([first, second])
        # Source keys are reversed after rejoining; -1 identifies a new face.
        current = triangles_report([second, first, first])
        filtered = only_new_overlaps(current, reference, face_keys=[20, 10, -1], reference_face_keys=[10, 20])
        self.assertEqual(filtered["pair_count"], 2)
        self.assertEqual(filtered["ignored_pair_count"], 1)
        self.assertEqual({tuple(pair) for pair in filtered["pairs"]}, {(0, 2), (1, 2)})


class MeshOverlapInterfaceTests(unittest.TestCase):
    def test_distant_part_motion_leaves_stationary_faces_clean_and_real_collision_is_red(self):
        manifest, artifacts = changing_bounds_fixture()
        app = AppTest.from_function(editor_app, args=(manifest, artifacts["parts.npz"]), default_timeout=10).run()
        self.assertEqual(len(app.exception), 0)
        state = app.session_state["part_editing"]
        source, reference = state["source_key"], state["overlap_report"]
        event = {"source_key": source, "sequence": 1, "scales": {"0": 1, "1": 1, "2": 1},
                 "offsets": {"0": [0, 0, 0], "1": [0, 0, 0], "2": [3, 0, 0]}}
        with patch("part_editor._component", return_value=event) as component:
            app.run()
        self.assertEqual(len(app.exception), 0)
        report = app.session_state["part_editing"]["overlap_report"]
        self.assertEqual(report["frame"], reference["frame"])
        self.assertEqual(report["tolerance"], reference["tolerance"])
        self.assertEqual(component.call_args.kwargs["overlap_faces"], {"0": [], "1": [], "2": []})
        app.button(key="rejoin_mesh").click().run()
        self.assertEqual(len(app.exception), 0)
        report = app.session_state["part_editing"]["rejoined"]["overlap_report"]
        self.assertEqual(report["pair_count"], 0)
        self.assertEqual(report["frame"], reference["frame"])
        with patch("part_editor._component", return_value={**event, "sequence": 2,
                   "offsets": {**event["offsets"], "2": [-1.75, 0, 0]}}) as component:
            app.run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(component.call_args.kwargs["overlap_faces"], {"0": [0], "1": [], "2": [0]})
        app.button(key="rejoin_mesh").click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(app.session_state["part_editing"]["rejoined"]["overlap_report"]["face_ids"], [0, 2])

    def test_locally_deformed_part_self_intersection_is_not_excluded(self):
        triangle = np.array([[0, 0, 0], [1, 0, 0], [0, 1, 0]])
        vertices = np.vstack([triangle, triangle + [5, 0, 0], triangle + [10, 0, 0]])
        manifest, artifacts = connection_fixture(geometry=(vertices, np.arange(9).reshape(-1, 3), np.array([0, 0, 1])))

        def deform(parts, baseline, *args):
            # Simulate a local deformation that moves just the second face of
            # part 0 onto its first face; its uniform-scale pose stays separate.
            current = baseline[0].vertices.copy()
            current[baseline[0].faces[1]] -= [5, 0, 0]
            return (replace(baseline[0], vertices=current), baseline[1])

        with patch("part_editor.apply_boundary_blend", side_effect=deform), patch("part_editor._component", return_value=None) as component:
            app = AppTest.from_function(editor_app, args=(manifest, artifacts["parts.npz"])).run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(component.call_args.kwargs["overlap_faces"], {"0": [0, 1], "1": []})
        with patch("part_editor.apply_boundary_blend", side_effect=deform):
            app.button(key="rejoin_mesh").click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(app.session_state["part_editing"]["rejoined"]["overlap_report"]["face_ids"], [0, 1])

    def test_no_highlights_before_editing_or_after_reset_at_near_coplanar_boundary(self):
        manifest, artifacts = identity_roundoff_fixture()
        app = AppTest.from_function(editor_app, args=(manifest, artifacts["parts.npz"])).run()
        self.assertEqual(len(app.exception), 0)
        state = app.session_state["part_editing"]
        source = state["source_key"]
        self.assertEqual(state["overlap_report"]["pair_count"], 0)
        app.multiselect(key=f"boundary_blend_parts_{source}").set_value([1]).run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(app.session_state["part_editing"]["overlap_report"]["pair_count"], 0)
        event = {"source_key": source, "sequence": 1, "scales": {"0": 1, "1": 1},
                 "offsets": {"0": [0, 0, 0], "1": [0, 0, -.01]}}
        with patch("part_editor._component", return_value=event):
            app.run()
        with patch("part_editor._component", return_value={**event, "sequence": 2, "offsets": {"0": [0, 0, 0], "1": [0, 0, 0]}}) as component:
            app.run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(component.call_args.kwargs["overlap_faces"], {"0": [], "1": []})
        self.assertEqual(app.session_state["part_editing"]["overlap_report"]["pair_count"], 0)
        app.button(key="rejoin_mesh").click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(app.session_state["part_editing"]["rejoined"]["overlap_report"]["pair_count"], 0)

    def test_original_intersections_stay_hidden_through_edit_rejoin_and_reset(self):
        manifest, artifacts = preexisting_overlap_fixture()
        app = AppTest.from_function(editor_app, args=(manifest, artifacts["parts.npz"])).run()
        self.assertEqual(len(app.exception), 0)
        state = app.session_state["part_editing"]
        self.assertEqual(state["overlap_report"]["total_pair_count"], 1)
        self.assertEqual(state["overlap_report"]["pair_count"], 0)
        # The joined mesh restores source face order, rather than part order.
        app.button(key="rejoin_mesh").click().run()
        self.assertEqual(app.session_state["part_editing"]["rejoined"]["overlap_report"]["pair_count"], 0)
        spec = json.loads(app.get("plotly_chart")[0].proto.spec)
        self.assertNotIn("#e12b35", spec["data"][0]["facecolor"])

        source = state["source_key"]
        app.checkbox(key=f"show_overlaps_{source}").set_value(False).run()
        event = {"source_key": source, "sequence": 1, "scales": {"0": 1, "1": 1},
                 "offsets": {"0": [0, 0, 0], "1": [-3.5, 0, 0]}}
        with patch("part_editor._component", return_value=event):
            app.run()
        self.assertIsNone(app.session_state["part_editing"]["overlap_report"])
        # Enabling diagnostics after editing must still use the original mesh.
        with patch("part_editor._component", return_value=None) as component:
            app.checkbox(key=f"show_overlaps_{source}").set_value(True).run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(component.call_args.kwargs["overlap_faces"], {"0": [0], "1": [0]})
        self.assertEqual(app.session_state["part_editing"]["overlap_report"]["pair_count"], 1)
        app.button(key="rejoin_mesh").click().run()
        self.assertEqual(len(app.exception), 0)
        joined = app.session_state["part_editing"]["rejoined"]["overlap_report"]
        self.assertEqual(joined["pair_count"], 1)
        self.assertEqual(joined["face_ids"], [0, 1])
        spec = json.loads(app.get("plotly_chart")[0].proto.spec)
        self.assertEqual(spec["data"][0]["facecolor"], ["#e12b35", "#e12b35", "#d77a35", "#168b83"])

        with patch("part_editor._component", return_value={**event, "sequence": 2, "offsets": {"0": [0, 0, 0], "1": [0, 0, 0]}}):
            app.run()
        self.assertEqual(app.session_state["part_editing"]["overlap_report"]["pair_count"], 0)
        self.assertNotIn("rejoined", app.session_state["part_editing"])

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
