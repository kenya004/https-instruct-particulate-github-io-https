from __future__ import annotations

import unittest

import numpy as np
import trimesh

from ip_object_name.connectivity import _edge_adjacency, _regularize_boundary_faces, refine_edge_connectivity, refine_two_edge_boundary


def bipyramid(top=1.0, bottom=0.5):
    vertices = [[1, 0, 0], [-0.5, np.sqrt(3) / 2, 0], [-0.5, -np.sqrt(3) / 2, 0],
                [0, 0, top], [0, 0, -bottom]]
    faces = [[3, 0, 1], [3, 1, 2], [3, 2, 0], [4, 1, 0], [4, 2, 1], [4, 0, 2]]
    return trimesh.Trimesh(vertices=vertices, faces=faces, process=False)


def boundary_only(mesh, labels, num_parts=2):
    points, ids = np.unique(mesh.vertices, axis=0, return_inverse=True)
    adjacency, edges, _ = _edge_adjacency(ids[mesh.faces])
    return _regularize_boundary_faces(np.asarray(labels), num_parts, adjacency, edges, mesh.area_faces, vertices=points)


def integer_bipyramid(top=1.0):
    return trimesh.Trimesh(vertices=[[1, 0, 0], [0, 1, 0], [-1, 0, 0], [0, 0, top], [0, 0, -0.5]],
                           faces=[[3, 0, 1], [3, 1, 2], [3, 2, 0], [4, 1, 0], [4, 2, 1], [4, 0, 2]], process=False)


class BoundaryRegularizationTests(unittest.TestCase):
    def test_unique_best_gain_removes_boundary_tooth_and_keeps_two_internal_edges(self):
        mesh = integer_bipyramid(top=2)
        original = np.array([1, 1, 0, 0, 0, 0])
        labels, diagnostic = boundary_only(mesh, original, num_parts=3)
        np.testing.assert_array_equal(labels, [1, 1, 1, 0, 0, 0])
        np.testing.assert_array_equal(original, [1, 1, 0, 0, 0, 0])
        self.assertEqual(diagnostic["assignments"], 1)
        self.assertEqual(diagnostic["unresolved_boundary_faces"], 0)
        self.assertEqual(sum(part["violating_faces_before"] for part in diagnostic["parts"]), 3)
        self.assertTrue(all(part["violating_faces_after"] == 0 for part in diagnostic["parts"]))
        self.assertEqual([part["face_count_after"] for part in diagnostic["parts"]], [3, 3, 0])

    def test_best_length_gain_is_used_without_surface_area_direction(self):
        mesh = integer_bipyramid()
        original = np.array([1, 1, 0, 0, 0, 0])
        labels, diagnostic = boundary_only(mesh, original)
        initial = np.bincount(original, weights=mesh.area_faces)
        final = np.bincount(labels, weights=mesh.area_faces)
        self.assertGreater(initial[0], initial[1])
        self.assertGreater(final[0], initial[0])
        np.testing.assert_array_equal(labels, [0, 1, 0, 0, 0, 0])
        self.assertEqual([(item["from_part_id"], item["to_part_id"]) for item in diagnostic["transfers"]], [(1, 0)])
        self.assertAlmostEqual(diagnostic["move_sample"][0]["boundary_length_reduction"], np.sqrt(2))
        self.assertEqual(diagnostic["stop_reason"], "no_admissible_moves")

    def test_priority_is_independent_of_part_ids_when_geometric_gain_is_unique(self):
        mesh = integer_bipyramid(top=2)
        labels, diagnostic = boundary_only(mesh, np.array([0, 0, 1, 1, 1, 1]))
        np.testing.assert_array_equal(labels, [0, 0, 0, 1, 1, 1])
        self.assertEqual(diagnostic["transfers"][0]["from_part_id"], 1)
        self.assertEqual(diagnostic["transfers"][0]["to_part_id"], 0)

    def test_local_neighbors_are_rechecked_after_each_transfer_and_last_face_is_preserved(self):
        mesh = integer_bipyramid()
        labels, diagnostic = boundary_only(mesh, np.array([0, 0, 1, 0, 1, 1]))
        # Face 0 initially had two internal edges; moving face 1 exposes it.
        np.testing.assert_array_equal(labels, [1, 1, 1, 0, 1, 1])
        self.assertEqual(diagnostic["assignments"], 2)
        self.assertEqual(diagnostic["changed_faces"], 2)
        self.assertEqual(diagnostic["parts"][0]["face_count_after"], 1)
        self.assertEqual(diagnostic["unresolved_reasons"], {"would_empty_part": 1})
        self.assertTrue(all(p["components_after"] <= p["components_before"] for p in diagnostic["parts"]))

    def test_small_to_large_transfer_is_allowed_without_emptying_part(self):
        mesh = trimesh.creation.icosphere(subdivisions=0)
        original = np.zeros(len(mesh.faces), dtype=np.int32)
        original[mesh.face_adjacency[0]] = 1
        labels, diagnostic = boundary_only(mesh, original)
        self.assertEqual(diagnostic["assignments"], 1)
        self.assertEqual(np.count_nonzero(labels == 1), 1)
        self.assertEqual(diagnostic["unresolved_reasons"], {"would_empty_part": 1})
        self.assertEqual(diagnostic["boundary_edge_reduction"], 1)

    def test_edge_count_gain_precedes_much_larger_length_gain(self):
        large, tiny = integer_bipyramid(), trimesh.creation.icosphere(subdivisions=0)
        large.apply_scale(100)
        tiny.apply_scale(0.001)
        tiny.apply_translation([1000, 0, 0])
        mesh = trimesh.util.concatenate([large, tiny])
        original = np.ones(len(mesh.faces), dtype=np.int32)
        original[:6] = [1, 1, 0, 0, 0, 0]
        original[6] = 0
        _, diagnostic = boundary_only(mesh, original)
        first = diagnostic["move_sample"][0]
        self.assertEqual(first["face_index"], 6)
        self.assertEqual(first["edge_count_reduction"], 3)
        self.assertLess(first["boundary_length_reduction"], 1)

    def test_length_gain_precedes_face_index_and_changed_priorities_are_refreshed(self):
        small, large = integer_bipyramid(), integer_bipyramid()
        large.apply_scale(10)
        large.apply_translation([100, 0, 0])
        mesh = trimesh.util.concatenate([small, large])
        _, diagnostic = boundary_only(mesh, np.tile([1, 1, 0, 0, 0, 0], 2))
        sample = diagnostic["move_sample"]
        self.assertGreaterEqual(sample[0]["face_index"], 6)
        self.assertEqual(sample[0]["edge_count_reduction"], 1)
        self.assertEqual(sample[1]["edge_count_reduction"], 3)
        self.assertEqual(diagnostic["boundary_edge_reduction"], sum(item["edge_count_reduction"] for item in sample))

    def test_unique_geometric_gain_is_preserved_under_face_permutation(self):
        mesh = integer_bipyramid(top=2)
        original = np.array([1, 1, 0, 0, 0, 0])
        first, _ = boundary_only(mesh, original)
        order = np.array([3, 0, 1, 2, 4, 5])
        second, _ = refine_two_edge_boundary(mesh.vertices, mesh.faces[order], original[order], 2)
        restored = np.empty_like(second)
        restored[order] = second
        np.testing.assert_array_equal(first, restored)

    def test_exact_gain_ties_are_recorded_and_can_depend_on_face_order(self):
        mesh = integer_bipyramid()
        original = np.array([0, 0, 1, 0, 1, 1])
        first, diagnostic = boundary_only(mesh, original)
        self.assertTrue(diagnostic["order_dependence_possible"])
        self.assertGreater(diagnostic["priority_tie_steps"], 0)
        order = np.array([4, 0, 1, 2, 3, 5])
        second, _ = refine_two_edge_boundary(mesh.vertices, mesh.faces[order], original[order], 2)
        restored = np.empty_like(second)
        restored[order] = second
        self.assertFalse(np.array_equal(first, restored))

    def test_boundary_edge_count_strictly_decreases_and_parts_survive(self):
        mesh = trimesh.creation.icosphere(subdivisions=1)
        for seed in range(5):
            original = np.random.default_rng(seed).integers(0, 3, len(mesh.faces))
            labels, diagnostic = boundary_only(mesh, original, num_parts=3)
            pairs = mesh.face_adjacency
            before = np.count_nonzero(original[pairs[:, 0]] != original[pairs[:, 1]])
            after = np.count_nonzero(labels[pairs[:, 0]] != labels[pairs[:, 1]])
            self.assertEqual(diagnostic["boundary_edges_before"], before)
            self.assertEqual(diagnostic["boundary_edges_after"], after)
            self.assertLessEqual(diagnostic["assignments"], before - after)
            self.assertEqual(set(labels), {0, 1, 2})
            self.assertTrue(all(part["components_after"] <= part["components_before"] for part in diagnostic["parts"]))

    def test_three_part_junction_cannot_move_to_a_part_sharing_only_one_edge(self):
        mesh = trimesh.creation.icosphere(subdivisions=0)
        neighbors = mesh.face_adjacency[np.any(mesh.face_adjacency == 0, axis=1)]
        adjacent = [int(pair[pair != 0][0]) for pair in neighbors]
        original = np.zeros(len(mesh.faces), dtype=np.int32)
        original[adjacent[0]], original[adjacent[1]] = 1, 2
        labels, diagnostic = boundary_only(mesh, original, num_parts=3)
        np.testing.assert_array_equal(labels, original)
        self.assertIn(0, diagnostic["unresolved_face_indices"])
        self.assertGreater(diagnostic["unresolved_reasons"]["no_recipient_with_two_shared_edges"], 0)

    def test_multiple_neighbors_on_one_nonmanifold_edge_do_not_count_as_two_edges(self):
        mesh = trimesh.Trimesh(vertices=[[0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0],
                                        [0, -5, 0], [0, 0, 5]],
                               faces=[[0, 1, 2], [1, 0, 4], [0, 1, 5], [1, 2, 3], [2, 0, 3]], process=False)
        original = np.array([0, 0, 0, 1, 1])
        labels, diagnostic = boundary_only(mesh, original)
        np.testing.assert_array_equal(labels, original)
        self.assertIn(0, diagnostic["unresolved_face_indices"])
        self.assertEqual(diagnostic["unresolved_reasons"]["nonmanifold_edge"], 1)

    def test_full_segmentation_refinement_uses_coincident_edges_and_preserves_geometry(self):
        source = integer_bipyramid(top=2)
        vertices = source.vertices[source.faces].reshape(-1, 3)
        faces = np.arange(len(vertices)).reshape(-1, 3)
        mesh = trimesh.Trimesh(vertices=vertices, faces=faces, process=False)
        original = np.array([1, 1, 0, 0, 0, 0])
        connected, diagnostic = refine_edge_connectivity(mesh, original, 2)
        np.testing.assert_array_equal(connected, original)
        self.assertNotIn("boundary_regularization", diagnostic)
        self.assertTrue(diagnostic["all_nonempty_parts_connected"])
        labels, boundary = refine_two_edge_boundary(vertices, faces, connected, 2)
        np.testing.assert_array_equal(labels, [1, 1, 1, 0, 0, 0])
        self.assertEqual(boundary["changed_faces"], 1)
        np.testing.assert_array_equal(mesh.vertices, vertices)
        np.testing.assert_array_equal(mesh.faces, faces)


if __name__ == "__main__":
    unittest.main()
