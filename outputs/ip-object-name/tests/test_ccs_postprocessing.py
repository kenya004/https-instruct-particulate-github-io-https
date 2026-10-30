from __future__ import annotations

import io
import json
import unittest
from unittest.mock import patch

import numpy as np
from filelock import FileLock

from ip_object_name.ccs_postprocessing import CCSOptions, refine_face_labels
from ip_object_name.segmentation import MeshPartition
from ip_object_name.store import write_json
import test_segmentation as segmentation_tests


def mesh_with_centroids(x_coordinates):
    points = np.column_stack((np.asarray(x_coordinates, dtype=float), np.zeros((len(x_coordinates), 2))))
    offsets = np.array([[0, -0.01, -0.01], [0, 0.01, -0.01], [0, 0, 0.02]])
    vertices = (points[:, None, :] + offsets).reshape(-1, 3)
    faces = np.arange(len(vertices)).reshape(-1, 3)
    return vertices, faces


class CCSAlgorithmTests(unittest.TestCase):
    def test_overlap_uses_nearest_non_overlap_anchors_and_preserves_geometry(self):
        vertices, faces = mesh_with_centroids([-4, -3, -2, 1.1, -0.5, 2, 3, 4])
        labels = np.array([0, 0, 0, 0, 1, 1, 1, 1])
        original_vertices, original_faces, original_labels = vertices.copy(), faces.copy(), labels.copy()
        result, stats = refine_face_labels(vertices, faces, labels, 2, CCSOptions())
        np.testing.assert_array_equal(result, [0, 0, 0, 1, 0, 1, 1, 1])
        np.testing.assert_array_equal(vertices, original_vertices)
        np.testing.assert_array_equal(faces, original_faces)
        np.testing.assert_array_equal(labels, original_labels)
        self.assertEqual(stats["changed_faces"], 2)
        self.assertEqual(stats["stop_reason"], "unchanged")
        self.assertEqual(stats["representatives"], "triangle_centroids")
        self.assertEqual(sum(part["faces_after"] for part in stats["parts"]), len(faces))
        self.assertTrue(all(part["faces_after"] > 0 for part in stats["parts"]))

    def test_nonoverlapping_spheres_are_unchanged(self):
        vertices, faces = mesh_with_centroids([-10, -9, 9, 10])
        labels = np.array([0, 0, 1, 1])
        result, stats = refine_face_labels(vertices, faces, labels, 2, CCSOptions())
        np.testing.assert_array_equal(result, labels)
        self.assertEqual(stats["iterations"][0]["overlapping_pairs"], 0)
        self.assertEqual(stats["changed_faces"], 0)

    def test_containment_without_anchors_is_skipped_without_merging(self):
        vertices, faces = mesh_with_centroids([-1, 0, 1, -3, -2, 2, 3])
        labels = np.array([0, 0, 0, 1, 1, 1, 1])
        result, stats = refine_face_labels(vertices, faces, labels, 2, CCSOptions())
        np.testing.assert_array_equal(result, labels)
        self.assertIn("no_anchors_outside_overlap", [item["reason"] for item in stats["skipped_pairs"]])
        self.assertFalse(stats["cluster_merging"])

    def test_equal_distances_keep_original_label(self):
        vertices, faces = mesh_with_centroids([-4, -2, 0, -0.5, 2, 4])
        result, _ = refine_face_labels(vertices, faces, np.array([0, 0, 0, 1, 1, 1]), 2, CCSOptions(max_iterations=1))
        self.assertEqual(result[2], 0)
        self.assertEqual(result[3], 0)

    def test_distance_is_to_anchors_not_cluster_center(self):
        vertices, faces = mesh_with_centroids([-100, -99, -1, 0.2, -0.5, 2, 3, 4])
        labels = np.array([0, 0, 0, 0, 1, 1, 1, 1])
        result, _ = refine_face_labels(vertices, faces, labels, 2, CCSOptions(max_iterations=1))
        self.assertLess(abs(0.2 - 2.125), abs(0.2 - (-49.95)))
        self.assertEqual(result[3], 0)

    def test_empty_part_is_not_revived_and_ids_are_not_compacted(self):
        vertices, faces = mesh_with_centroids([-4, -3, -2, 1.1, -0.5, 2, 3, 4])
        result, stats = refine_face_labels(vertices, faces, np.array([0, 0, 0, 0, 2, 2, 2, 2]), 3, CCSOptions())
        self.assertEqual(set(result.tolist()), {0, 2})
        self.assertEqual(stats["parts"][1]["faces_after"], 0)
        self.assertIsNone(stats["spheres_after"][1]["center"])
        self.assertIn("empty_part", [item["reason"] for item in stats["skipped_pairs"]])

    def test_iteration_limit_is_observed_and_repeat_runs_are_deterministic(self):
        vertices, faces = mesh_with_centroids([-4, -3, -2, 1.1, -0.5, 2, 3, 4])
        labels = np.array([0, 0, 0, 0, 1, 1, 1, 1])
        first, stats = refine_face_labels(vertices, faces, labels, 2, CCSOptions(max_iterations=1))
        second, _ = refine_face_labels(vertices, faces, labels, 2, CCSOptions(max_iterations=1))
        np.testing.assert_array_equal(first, second)
        self.assertEqual(len(stats["iterations"]), 1)
        self.assertEqual(stats["stop_reason"], "max_iterations")

    def test_translation_and_scale_do_not_change_assignments(self):
        vertices, faces = mesh_with_centroids([-4, -3, -2, 1.1, -0.5, 2, 3, 4])
        labels = np.array([0, 0, 0, 0, 1, 1, 1, 1])
        first, _ = refine_face_labels(vertices, faces, labels, 2, CCSOptions())
        second, _ = refine_face_labels(vertices * 10 + [5, 6, 7], faces, labels, 2, CCSOptions())
        np.testing.assert_array_equal(first, second)

    def test_component_statistics_use_real_shared_edges(self):
        vertices = np.array([[0, 0, 0], [1, 0, 0], [1, 1, 0], [0, 1, 0], [10, 0, 0], [11, 0, 0], [10, 1, 0]])
        faces = np.array([[0, 1, 2], [0, 2, 3], [4, 5, 6]])
        labels = np.array([0, 0, 0])
        result, stats = refine_face_labels(vertices, faces, labels, 1, CCSOptions())
        np.testing.assert_array_equal(result, labels)
        self.assertEqual(stats["parts"][0]["components_before"], 2)
        self.assertEqual(stats["parts"][0]["components_after"], 2)

    def test_invalid_inputs_are_rejected(self):
        for value in (0, 31, 1.5, True):
            with self.subTest(max_iterations=value), self.assertRaises(ValueError):
                CCSOptions(value)
        vertices, faces = mesh_with_centroids([0, 1])
        for labels in (np.array([-1, 1]), np.array([0, 2]), np.array([0]), np.array([0.0, 1.0])):
            with self.subTest(labels=labels), self.assertRaises(ValueError):
                refine_face_labels(vertices, faces, labels, 2, CCSOptions())


class CCSAPITests(unittest.TestCase):
    def setUp(self):
        segmentation_tests.SegmentationTests.setUp(self)
        response = self.client.post(self.endpoint, json={})
        self.assertEqual(response.status_code, 200, response.text)
        self.original = response.json()
        self.original_files = {name: self.client.get(url).content for name, url in self.original["files"].items()}
        self.runner.reset_mock()
        self.runner.side_effect = AssertionError("CCS must not call GPU inference")
        self.ccs_endpoint = f"/models/{self.model_id}/plans/{self.plan_id}/segmentations/{self.original['segmentation_id']}/refine-ccs"

    def test_ccs_uses_saved_arrays_and_preserves_parent_artifacts(self):
        response = self.client.post(self.ccs_endpoint, json={"max_iterations": 2})
        self.assertEqual(response.status_code, 200, response.text)
        result = response.json()
        self.runner.assert_not_called()
        self.assertEqual(result["parent_segmentation_id"], self.original["segmentation_id"])
        self.assertNotEqual(result["segmentation_id"], self.original["segmentation_id"])
        self.assertEqual([part["part_id"] for part in result["parts"]], [0, 1, 2])
        self.assertEqual(result["postprocessing"]["options"]["max_iterations"], 2)
        for name, url in self.original["files"].items():
            self.assertEqual(self.client.get(url).content, self.original_files[name])
        for filename in ("parts.glb", "parts.npz", "parts.json"):
            self.assertEqual(self.client.get(result["files"][filename]).status_code, 200)
        with np.load(io.BytesIO(self.original_files["parts.npz"]), allow_pickle=False) as before:
            with np.load(io.BytesIO(self.client.get(result["files"]["parts.npz"]).content), allow_pickle=False) as after:
                np.testing.assert_array_equal(after["vertices"], before["vertices"])
                np.testing.assert_array_equal(after["faces"], before["faces"])
                self.assertEqual(len(after["face_part_ids"]), len(before["face_part_ids"]))
        self.assertEqual(json.loads((self.folder / "segmentation.json").read_text(encoding="utf-8"))["segmentation_id"], self.original["segmentation_id"])
        self.assertEqual(json.loads((self.folder / "ccs_refinement.json").read_text(encoding="utf-8")), result)

    def test_each_ccs_run_keeps_same_parent_and_gets_new_id(self):
        first = self.client.post(self.ccs_endpoint, json={}).json()
        second = self.client.post(self.ccs_endpoint, json={}).json()
        self.assertNotEqual(first["segmentation_id"], second["segmentation_id"])
        self.assertEqual(first["parent_segmentation_id"], second["parent_segmentation_id"])
        self.assertEqual(self.client.get(first["files"]["parts.glb"]).status_code, 200)

    def test_changed_labels_are_exported_in_npz(self):
        vertices, faces = mesh_with_centroids([-4, -3, -2, 1.1, -0.5, 2, 3, 4])
        self.runner.side_effect = None
        self.runner.return_value = MeshPartition(vertices, faces, np.array([0, 0, 0, 0, 1, 1, 1, 1]), {})
        parent_response = self.client.post(self.endpoint, json={})
        self.assertEqual(parent_response.status_code, 200, parent_response.text)
        parent = parent_response.json()
        endpoint = self.ccs_endpoint.replace(self.original["segmentation_id"], parent["segmentation_id"])
        self.runner.reset_mock()
        response = self.client.post(endpoint, json={})
        self.assertEqual(response.status_code, 200, response.text)
        self.runner.assert_not_called()
        result = response.json()
        self.assertEqual(result["postprocessing"]["changed_faces"], 2)
        with np.load(io.BytesIO(self.client.get(result["files"]["parts.npz"]).content), allow_pickle=False) as data:
            np.testing.assert_array_equal(data["face_part_ids"], [0, 0, 0, 1, 0, 1, 1, 1])
            np.testing.assert_array_equal(data["vertices"], vertices)
            np.testing.assert_array_equal(data["faces"], faces)

    def test_invalid_options_ids_and_lock_are_rejected(self):
        for value in (0, 31, 1.5, True):
            self.assertEqual(self.client.post(self.ccs_endpoint, json={"max_iterations": value}).status_code, 422)
        self.assertEqual(self.client.post(self.ccs_endpoint.replace(self.original["segmentation_id"], "invalid"), json={}).status_code, 422)
        self.assertEqual(self.client.post(self.ccs_endpoint.replace(self.original["segmentation_id"], "f" * 32), json={}).status_code, 404)
        with FileLock(self.store.root / ".watch.lock", timeout=0):
            self.assertEqual(self.client.post(self.ccs_endpoint, json={}).status_code, 409)

    def test_source_and_part_identity_are_checked(self):
        path = self.folder / "segmentations" / self.original["segmentation_id"] / "parts.json"
        changed = {**self.original, "source_sha256": "wrong"}
        write_json(path, changed)
        self.assertEqual(self.client.post(self.ccs_endpoint, json={}).status_code, 422)
        changed = json.loads(json.dumps(self.original))
        changed["parts"][0]["name"] = "different"
        write_json(path, changed)
        self.assertEqual(self.client.post(self.ccs_endpoint, json={}).status_code, 422)

    def test_failure_preserves_original_and_records_separate_error(self):
        with patch("ip_object_name.ccs_postprocessing.refine_face_labels", side_effect=RuntimeError("test CCS failure")):
            response = self.client.post(self.ccs_endpoint, json={})
        self.assertEqual(response.status_code, 502)
        metadata = self.store.get(self.model_id)
        self.assertEqual(metadata["ccs_status"], "failed")
        self.assertEqual(metadata["segmentation_status"], "completed")
        self.assertEqual(self.client.get(self.original["files"]["parts.glb"]).status_code, 200)
        folder = self.folder / "segmentations" / metadata["latest_ccs_segmentation_id"]
        self.assertTrue((folder / "error.json").is_file())
        url = self.original["files"]["parts.glb"].replace(self.original["segmentation_id"], metadata["latest_ccs_segmentation_id"])
        self.assertEqual(self.client.get(url).status_code, 404)


if __name__ == "__main__":
    unittest.main()
