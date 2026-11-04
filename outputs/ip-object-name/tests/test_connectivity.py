from __future__ import annotations

import unittest

import numpy as np
import trimesh

from ip_object_name.connectivity import refine_edge_connectivity


def chain(count):
    vertices = [[index, index % 2, 0] for index in range(count + 2)]
    return trimesh.Trimesh(vertices=vertices, faces=[[i, i + 1, i + 2] for i in range(count)], process=False)


class EdgeConnectivityTests(unittest.TestCase):
    def test_island_moves_to_edge_connected_core_using_model_probability(self):
        mesh = chain(7)
        vertices, faces = mesh.vertices.copy(), mesh.faces.copy()
        original = np.array([0, 0, 1, 1, 0, 2, 2], dtype=np.int32)
        probabilities = np.eye(3)[original] * 0.8 + 0.2 / 3
        probabilities[4] = [0.1, 0.2, 0.7]
        labels, diagnostic = refine_edge_connectivity(
            mesh, original, 4, point_part_probabilities=np.pad(probabilities, ((0, 0), (0, 1))),
            query_face_indices=np.arange(7))
        np.testing.assert_array_equal(labels, [0, 0, 1, 1, 2, 2, 2])
        self.assertTrue(diagnostic["all_nonempty_parts_connected"])
        self.assertEqual([p["components_after"] for p in diagnostic["parts"]], [1, 1, 1, 0])
        self.assertEqual(diagnostic["changed_faces"], 1)
        self.assertEqual(diagnostic["unresolved_components"], [])
        np.testing.assert_array_equal(mesh.vertices, vertices)
        np.testing.assert_array_equal(mesh.faces, faces)
        np.testing.assert_array_equal(original, [0, 0, 1, 1, 0, 2, 2])

    def test_largest_surface_area_is_kept_even_with_fewer_triangles(self):
        mesh = trimesh.Trimesh(vertices=[[0, 0, 0], [0, 10, 0], [2, 0, 0], [2, 1, 0],
                                        [3, 0, 0], [3, 1, 0], [4, 0, 0]],
                               faces=[[i, i + 1, i + 2] for i in range(5)], process=False)
        labels, diagnostic = refine_edge_connectivity(mesh, np.array([0, 1, 0, 0, 1]), 2)
        np.testing.assert_array_equal(labels, [0, 1, 1, 1, 1])
        self.assertEqual(diagnostic["parts"][0]["core_surface_area"], 10.0)
        self.assertTrue(diagnostic["all_nonempty_parts_connected"])

    def test_group_probability_is_weighted_by_area_and_not_point_count(self):
        angles = np.cumsum([0, 0.5, 0.5, 1.4, 0.01, 0.5, 0.5, 1.4, 1.4])
        vertices = np.vstack(([0, 0, 0], np.column_stack((np.cos(angles), np.sin(angles), np.zeros(9)))))
        mesh = trimesh.Trimesh(vertices=vertices, faces=[[0, i + 1, i + 2] for i in range(8)], process=False)
        original = np.array([1, 1, 0, 0, 2, 2, 0, 0])
        probabilities = np.eye(3)[original]
        probabilities[2] = [0.05, 0.9, 0.05]
        probabilities[3] = [0.01, 0.01, 0.98]
        for repeats in (1, 10):
            indices = np.repeat(np.arange(8), [1, 1, 1, repeats, 1, 1, 1, 1])
            labels, _ = refine_edge_connectivity(mesh, original, 3,
                point_part_probabilities=probabilities[indices], query_face_indices=indices)
            np.testing.assert_array_equal(labels, [1, 1, 1, 1, 2, 2, 0, 0])

    def test_vertex_contact_and_small_gap_never_create_connectivity(self):
        for vertex_contact in (True, False):
            vertices = [[0, 0, 0], [2, 0, 0], [0, 2, 0], [2, 2, 0], [-0.01, 0, 0], [0, -0.01, 0]]
            faces = [[0, 1, 2], [1, 2, 3], [0, 4, 5]]
            if not vertex_contact:
                vertices.append([0, 0, 0.000001])
                faces[2][0] = 6
            mesh = trimesh.Trimesh(vertices=vertices, faces=faces, process=False)
            original = np.array([0, 1, 0])
            labels, diagnostic = refine_edge_connectivity(mesh, original, 2,
                point_part_probabilities=np.array([[1, 0], [0, 1], [0, 1]]), query_face_indices=np.arange(3))
            np.testing.assert_array_equal(labels, original)
            self.assertFalse(diagnostic["all_nonempty_parts_connected"])
            self.assertEqual(diagnostic["parts"][0]["components_after"], 2)
            self.assertEqual(len(diagnostic["unresolved_components"]), 1)

    def test_duplicate_edge_endpoints_connect_for_analysis_without_welding_mesh(self):
        mesh = trimesh.Trimesh(vertices=[[0, 0, 0], [1, 0, 0], [0, 1, 0],
                                        [1, 0, 0], [0, 1, 0], [1, 1, 0]],
                               faces=[[0, 1, 2], [3, 4, 5]], process=False)
        labels, diagnostic = refine_edge_connectivity(mesh, np.array([0, 0]), 1)
        np.testing.assert_array_equal(labels, [0, 0])
        self.assertEqual(diagnostic["parts"][0]["components_after"], 1)
        self.assertEqual(diagnostic["parts"][0]["vertex_id_components_after"], 2)
        self.assertEqual(diagnostic["duplicate_vertex_count"], 2)
        self.assertTrue(diagnostic["all_nonempty_parts_connected"])
        self.assertFalse(diagnostic["all_nonempty_parts_connected_by_vertex_id"])
        self.assertEqual(len(mesh.vertices), 6)
        np.testing.assert_array_equal(mesh.faces, [[0, 1, 2], [3, 4, 5]])

    def test_exploded_mesh_reassignment_matches_shared_vertex_mesh(self):
        source = chain(7)
        vertices = source.vertices[source.faces].reshape(-1, 3)
        faces = np.arange(len(vertices)).reshape(-1, 3)
        mesh = trimesh.Trimesh(vertices=vertices, faces=faces, process=False)
        original = np.array([0, 0, 1, 1, 0, 2, 2])
        probabilities = np.eye(3)[original] * 0.8 + 0.2 / 3
        probabilities[4] = [0.1, 0.2, 0.7]
        labels, diagnostic = refine_edge_connectivity(mesh, original, 3,
            point_part_probabilities=probabilities, query_face_indices=np.arange(7))
        np.testing.assert_array_equal(labels, [0, 0, 1, 1, 2, 2, 2])
        self.assertEqual(diagnostic["mesh_components_by_vertex_id"], 7)
        self.assertEqual(diagnostic["mesh_components_by_coincident_edges"], 1)
        self.assertEqual([p["components_after"] for p in diagnostic["parts"]], [1, 1, 1])
        self.assertEqual([p["vertex_id_components_before"] for p in diagnostic["parts"]], [3, 2, 2])
        self.assertEqual([p["vertex_id_components_after"] for p in diagnostic["parts"]], [2, 2, 3])
        np.testing.assert_array_equal(mesh.vertices, vertices)
        np.testing.assert_array_equal(mesh.faces, faces)

    def test_hundreds_of_duplicated_face_edges_are_recognized(self):
        source = chain(427)
        vertices = source.vertices[source.faces].reshape(-1, 3)
        faces = np.arange(len(vertices)).reshape(-1, 3)
        mesh = trimesh.Trimesh(vertices=vertices, faces=faces, process=False)
        labels, diagnostic = refine_edge_connectivity(mesh, np.zeros(427, dtype=np.int32), 1)
        self.assertEqual(diagnostic["parts"][0]["vertex_id_components_after"], 427)
        self.assertEqual(diagnostic["parts"][0]["components_after"], 1)
        self.assertEqual(diagnostic["unresolved_components"], [])
        self.assertEqual(diagnostic["changed_faces"], 0)
        np.testing.assert_array_equal(labels, np.zeros(427, dtype=np.int32))
        np.testing.assert_array_equal(mesh.vertices, vertices)
        np.testing.assert_array_equal(mesh.faces, faces)

    def test_equal_vertex_position_alone_does_not_connect_faces(self):
        mesh = trimesh.Trimesh(vertices=[[0, 0, 0], [1, 0, 0], [0, 1, 0],
                                        [0, 0, 0], [-1, 0, 0], [0, -1, 0]],
                               faces=[[0, 1, 2], [3, 4, 5]], process=False)
        _, diagnostic = refine_edge_connectivity(mesh, np.array([0, 0]), 1)
        self.assertEqual(diagnostic["duplicate_vertex_count"], 1)
        self.assertEqual(diagnostic["parts"][0]["components_after"], 2)

    def test_nearly_equal_edge_endpoint_is_not_matched(self):
        mesh = trimesh.Trimesh(vertices=[[0, 0, 0], [1, 0, 0], [0, 1, 0],
                                        [1, 0, 0], [0, 1 + 1e-12, 0], [1, 1, 0]],
                               faces=[[0, 1, 2], [3, 4, 5]], process=False)
        _, diagnostic = refine_edge_connectivity(mesh, np.array([0, 0]), 1)
        self.assertEqual(diagnostic["parts"][0]["components_after"], 2)

    def test_reversed_edge_endpoints_are_recognized(self):
        mesh = trimesh.Trimesh(vertices=[[0, 0, 0], [1, 0, 0], [0, 1, 0],
                                        [0, 1, 0], [1, 0, 0], [1, 1, 0]],
                               faces=[[0, 1, 2], [3, 4, 5]], process=False)
        _, diagnostic = refine_edge_connectivity(mesh, np.array([0, 0]), 1)
        self.assertEqual(diagnostic["parts"][0]["components_after"], 1)

    def test_shared_edge_with_three_incident_faces_connects_same_label_faces(self):
        mesh = trimesh.Trimesh(vertices=[[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1]],
                               faces=[[0, 1, 2], [1, 0, 3], [0, 1, 4]], process=False)
        labels, diagnostic = refine_edge_connectivity(mesh, np.array([0, 1, 0]), 2)
        np.testing.assert_array_equal(labels, [0, 1, 0])
        self.assertTrue(diagnostic["all_nonempty_parts_connected"])
        self.assertEqual(diagnostic["nonmanifold_edges"], 1)

    def test_propagation_through_several_orphan_groups_stays_connected(self):
        mesh = chain(11)
        original = np.array([0, 0, 0, 1, 0, 2, 1, 2, 2, 2, 2])
        labels, diagnostic = refine_edge_connectivity(mesh, original, 3)
        self.assertTrue(diagnostic["all_nonempty_parts_connected"])
        self.assertEqual(diagnostic["unresolved_components"], [])
        self.assertEqual(set(labels), {0, 1, 2})
        # A repeated pass must preserve already connected regions.
        repeated, second = refine_edge_connectivity(mesh, labels, 3)
        np.testing.assert_array_equal(repeated, labels)
        self.assertEqual(second["changed_faces"], 0)

    def test_missing_samples_keep_current_probabilities_without_distance_links(self):
        mesh = chain(5)
        original = np.array([0, 0, 1, 0, 1])
        labels, diagnostic = refine_edge_connectivity(mesh, original, 2,
            point_part_probabilities=np.array([[1., 0.], [0., 1.]]), query_face_indices=np.array([-1, 2]))
        self.assertTrue(diagnostic["all_nonempty_parts_connected"])
        self.assertEqual(diagnostic["sampled_faces"], 1)
        self.assertTrue(np.all((labels >= 0) & (labels < 2)))

    def test_invalid_probabilities_or_labels_are_rejected(self):
        mesh = chain(3)
        with self.assertRaises(ValueError):
            refine_edge_connectivity(mesh, np.array([0, -1, 1]), 2)
        for probabilities, indices in (([[0.4, 0.4]], [0]), ([[np.nan, 1]], [0]),
                                       ([[0, 1]], [3]), ([[0, 1]], [-2])):
            with self.subTest(indices=indices), self.assertRaises(ValueError):
                refine_edge_connectivity(mesh, np.array([0, 1, 0]), 2,
                    point_part_probabilities=np.array(probabilities), query_face_indices=np.array(indices))


if __name__ == "__main__":
    unittest.main()
