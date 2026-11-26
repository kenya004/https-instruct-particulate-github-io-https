import io
import json
import shutil
import subprocess
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import patch

import numpy as np

from boundary_blending import (
    METHOD, _SurfaceDistanceQuery, _distances, apply_boundary_blend, blend_weights,
    blended_anchor_residuals, boundary_geometry, build_blend_distances, part_edge_graph,
)
from boundary_motion import apply_boundary_motion, motion_from_blending
from connections import build_connection_plan, detect_connections, follow_connections
from editing import editor_payload, export_edited_glb, load_editable_parts
from rejoining import rejoin_parts
from test_capping import pack
from test_connection_overlap import double_connection_fixture


def handle_fixture(island=False):
    """A U-shaped handle with two cuts on a broad planar receiving body."""
    _, content, _, _ = double_connection_fixture()
    with np.load(io.BytesIO(content), allow_pickle=False) as data:
        vertices, faces, labels = (data[name] for name in ("vertices", "faces", "face_part_ids"))
    # Keep all original labels and seam correspondences while adding interior samples.
    for _ in range(2):
        edges, inverse = np.unique(np.sort(faces[:, [[0, 1], [1, 2], [2, 0]]].reshape(-1, 2), axis=1),
                                   axis=0, return_inverse=True)
        ab, bc, ca = (inverse.reshape(-1, 3) + len(vertices)).T
        a, b, c = faces.T
        faces = np.stack([np.column_stack([a, ab, ca]), np.column_stack([ab, b, bc]),
                          np.column_stack([ca, bc, c]), np.column_stack([ab, bc, ca])], axis=1).reshape(-1, 3)
        vertices = np.vstack([vertices, vertices[edges].mean(axis=1)])
        labels = np.repeat(labels, 4)
    if island:
        faces = np.vstack([faces, np.arange(3).reshape(1, 3) + len(vertices)])
        vertices = np.vstack([vertices, [[.01, 2, 0], [.02, 2, 0], [.01, 2.1, .1]]])
        labels = np.r_[labels, 1]
    manifest, content, parts = pack(vertices, faces, labels)
    connections, _ = detect_connections(content, parts)
    return manifest, content, parts, connections


class ReferenceSurfaceBlendingTests(unittest.TestCase):
    def test_distances_are_to_triangle_interiors_and_independent_of_units(self):
        for scale in (1e-8, 1., 1e8):
            with self.subTest(scale=scale):
                shift = np.array([2., -3., 4.]) * scale
                body = SimpleNamespace(name="body", vertices=np.array([[0, -5, -5], [0, 5, -5], [0, 0, 5]]) * scale + shift,
                                       faces=np.array([[0, 1, 2]]))
                queries = np.array([[.25, 0, 0], [.75, 0, 1]]) * scale + shift
                np.testing.assert_allclose(_SurfaceDistanceQuery(body).distances(queries) / scale, [.25, .75], atol=1e-13)

    def test_two_cut_handle_uses_body_distance_rather_than_path_length(self):
        manifest, content, parts, connections = handle_fixture()
        self.assertEqual(len(connections), 2)
        fields = build_blend_distances(content, manifest, parts, connections, [1], 0)
        weights = blend_weights(fields, .6)
        handle = parts[1]
        # These points project onto the receiving body's actual planar surface.
        samples = (handle.vertices[:, 0] > 0) & (np.abs(handle.vertices[:, 1]) == .5)
        distance = fields["parts"]["1"]["distances"]
        np.testing.assert_allclose(distance[samples], handle.vertices[samples, 0], atol=1e-12)
        t = np.clip(distance / weights["parts"]["1"]["radius"], 0, 1)
        strength = np.asarray(weights["parts"]["1"]["influences"][0]["weights"])
        np.testing.assert_allclose(strength, 1 - t*t*(3-2*t), atol=1e-12)
        points, local_ids = boundary_geometry(content, manifest, parts)
        local_nodes, index, graph = part_edge_graph(points, local_ids[1], handle)
        sources = {v for connection in connections for edge in connection.boundary_edges for v in edge}
        old_distance = _distances(graph, [index[v] for v in sources])[local_nodes]
        same_distance = samples & np.isclose(handle.vertices[:, 0], 2)
        self.assertGreater(np.ptp(old_distance[same_distance]), .1)
        self.assertLess(np.ptp(strength[same_distance]), 1e-12)

    def test_scale_motion_preview_and_welding_use_the_same_weights(self):
        manifest, content, parts, connections = handle_fixture()
        fields = build_blend_distances(content, manifest, parts, connections, [1], 0)
        # Once computed, neither changing the band nor editing the pose queries geometry again.
        with patch("boundary_blending.trimesh.proximity.closest_point", side_effect=AssertionError("Reuse distances")):
            blend_weights(fields, .3)
            blending = blend_weights(fields, .6)
            scales = {"0": 1.1, "1": 1.3}
            base, automatic = follow_connections(parts, scales, build_connection_plan(parts, connections, 0))
            blended = apply_boundary_blend(parts, base, scales, automatic, blending)
            offsets = {"0": [.1, .2, 0], "1": [-.2, .1, 0]}
            motion = motion_from_blending(blending)
            edited = apply_boundary_motion(blended, offsets, motion)
        residuals = blended_anchor_residuals(edited, connections, blending, {})
        self.assertTrue(all(v < 1e-12 for v in residuals.values()))
        joined = rejoin_parts(content, manifest, parts, edited)
        self.assertEqual(joined.statistics["bridge_faces"], 0)
        self.assertTrue(joined.mesh.is_watertight)
        import trimesh
        scene = trimesh.load(io.BytesIO(export_edited_glb(edited, source_key="surface", scales=scales, offsets=offsets)),
                             file_type="glb", process=False)
        for part in edited:
            np.testing.assert_allclose(scene.geometry[part.geometry_name].vertices, part.vertices, atol=2e-6)
        node = shutil.which("node")
        self.assertIsNotNone(node)
        data = {"parts": editor_payload(parts), "scales": scales, "automatic": {str(k):v.tolist() for k,v in automatic.items()},
                "blending": blending, "boundary_motion": motion, "offsets": offsets}
        result = subprocess.run([node, "tests/motion_preview_fixture.mjs"], input=json.dumps(data),
            cwd=Path(__file__).resolve().parents[1] / "scale_component", text=True, capture_output=True, check=True)
        preview = json.loads(result.stdout)
        for part in edited:
            np.testing.assert_allclose(preview["vertices"][str(part.part_id)], part.vertices, atol=2e-6)

    def test_disconnected_island_near_body_is_not_pulled_to_the_surface(self):
        manifest, content, parts, connections = handle_fixture(island=True)
        fields = build_blend_distances(content, manifest, parts, connections, [1], 0)
        blending = blend_weights(fields, .6)
        island = parts[1].vertices[:, 1] > 1
        self.assertEqual(np.count_nonzero(island), 3)
        self.assertEqual(blending["parts"]["1"]["unreachable_vertices"], 3)
        np.testing.assert_array_equal(np.asarray(blending["parts"]["1"]["influences"][0]["weights"])[island], 0)

    def test_ui_distance_cache_is_reused_when_the_band_changes(self):
        from part_editor import _load_blend_distances, _load_blending
        manifest, content, _, _ = handle_fixture()
        _load_blend_distances.clear()
        _load_blending.clear()
        from boundary_blending import trimesh
        with patch("boundary_blending.trimesh.proximity.closest_point", wraps=trimesh.proximity.closest_point) as query:
            _load_blending(content, manifest, (1,), .6, 0, range_method=METHOD)
            initial_queries = query.call_count
            self.assertGreater(initial_queries, 0)
            _load_blending(content, manifest, (1,), .3, 0, range_method=METHOD)
            self.assertEqual(query.call_count, initial_queries)


if __name__ == "__main__":
    unittest.main()
