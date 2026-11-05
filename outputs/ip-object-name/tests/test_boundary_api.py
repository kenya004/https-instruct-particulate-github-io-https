from __future__ import annotations

import io
import json
import unittest
from unittest.mock import patch

import numpy as np
from filelock import FileLock

from ip_object_name.ccs_postprocessing import refine_face_labels
from ip_object_name.connectivity import BOUNDARY_METHOD, refine_two_edge_boundary
from ip_object_name.segmentation import MeshPartition
from ip_object_name.store import write_json
import test_boundary_regularization as boundary_tests
import test_segmentation as segmentation_tests


class BoundaryAPITests(unittest.TestCase):
    def setUp(self):
        segmentation_tests.SegmentationTests.setUp(self)
        mesh = boundary_tests.bipyramid()
        self.vertices = mesh.vertices[mesh.faces].reshape(-1, 3)
        self.faces = np.arange(len(self.vertices)).reshape(-1, 3)
        self.labels = np.array([1, 1, 0, 0, 0, 0])
        self.runner.return_value = MeshPartition(self.vertices, self.faces, self.labels, {})
        response = self.client.post(self.endpoint, json={})
        self.assertEqual(response.status_code, 200, response.text)
        self.original = response.json()
        self.original_files = {name: self.client.get(url).content for name, url in self.original["files"].items()}
        self.runner.reset_mock()
        self.runner.side_effect = AssertionError("Postprocessing must not call GPU inference")
        self.boundary_endpoint = self.endpoint.replace("/segment", f"/segmentations/{self.original['segmentation_id']}/refine-boundary")

    def refine(self):
        response = self.client.post(self.boundary_endpoint, json={})
        self.assertEqual(response.status_code, 200, response.text)
        return response.json()

    def test_saved_boundary_changes_labels_and_preserves_geometry_ids_and_original(self):
        result = self.refine()
        self.runner.assert_not_called()
        self.assertEqual(result["parent_segmentation_id"], self.original["segmentation_id"])
        self.assertEqual(result["postprocessing"]["changed_faces"], 1)
        self.assertEqual([p["part_id"] for p in result["parts"]], [0, 1, 2])
        self.assertEqual([p["face_count"] for p in result["parts"]], [5, 1, 0])
        with np.load(io.BytesIO(self.client.get(result["files"]["parts.npz"]).content), allow_pickle=False) as data:
            np.testing.assert_array_equal(data["face_part_ids"], [0, 1, 0, 0, 0, 0])
            np.testing.assert_array_equal(data["vertices"], self.vertices)
            np.testing.assert_array_equal(data["faces"], self.faces)
        for name, url in self.original["files"].items():
            self.assertEqual(self.client.get(url).content, self.original_files[name])
        self.assertEqual(json.loads((self.folder / "boundary_refinement.json").read_text(encoding="utf8")), result)
        self.assertEqual(json.loads((self.folder / "segmentation.json").read_text(encoding="utf8")), self.original)

    def test_ccs_receives_boundary_labels_and_keeps_all_three_results(self):
        boundary = self.refine()
        url = self.boundary_endpoint.replace(self.original["segmentation_id"], boundary["segmentation_id"]).replace("refine-boundary", "refine-ccs")
        with patch("ip_object_name.ccs_postprocessing.refine_face_labels", wraps=refine_face_labels) as refine:
            response = self.client.post(url, json={})
        self.assertEqual(response.status_code, 200, response.text)
        np.testing.assert_array_equal(refine.call_args.args[2], [0, 1, 0, 0, 0, 0])
        ccs = response.json()
        self.assertEqual(ccs["parent_segmentation_id"], boundary["segmentation_id"])
        self.assertEqual(ccs["processing_order"], [BOUNDARY_METHOD, "ccs_face_centroids_v1"])
        self.assertEqual(len({item["segmentation_id"] for item in (self.original, boundary, ccs)}), 3)
        for item in (self.original, boundary, ccs):
            self.assertEqual(self.client.get(item["files"]["parts.glb"]).status_code, 200)
        self.runner.assert_not_called()

    def test_repeat_runs_keep_their_parent_and_completed_refined_inputs_are_accepted(self):
        first, second = self.refine(), self.refine()
        self.assertNotEqual(first["segmentation_id"], second["segmentation_id"])
        self.assertEqual(first["parent_segmentation_id"], second["parent_segmentation_id"])
        url = self.boundary_endpoint.replace(self.original["segmentation_id"], first["segmentation_id"])
        response = self.client.post(url, json={})
        self.assertEqual(response.status_code, 200, response.text)
        self.assertEqual(response.json()["parent_segmentation_id"], first["segmentation_id"])
        self.assertEqual(self.client.get(first["files"]["parts.glb"]).status_code, 200)

    def test_ccs_then_boundary_uses_ccs_labels_and_preserves_both_orders(self):
        forward_boundary = self.refine()
        forward_url = self.boundary_endpoint.replace(self.original["segmentation_id"], forward_boundary["segmentation_id"]).replace("refine-boundary", "refine-ccs")
        forward_response = self.client.post(forward_url, json={})
        self.assertEqual(forward_response.status_code, 200, forward_response.text)
        ccs_response = self.client.post(self.boundary_endpoint.replace("refine-boundary", "refine-ccs"), json={})
        self.assertEqual(ccs_response.status_code, 200, ccs_response.text)
        ccs = ccs_response.json()
        with np.load(io.BytesIO(self.client.get(ccs["files"]["parts.npz"]).content), allow_pickle=False) as data:
            ccs_labels = data["face_part_ids"].copy()
        url = self.boundary_endpoint.replace(self.original["segmentation_id"], ccs["segmentation_id"])
        with patch("ip_object_name.boundary_postprocessing.refine_two_edge_boundary", wraps=refine_two_edge_boundary) as refine:
            response = self.client.post(url, json={})
        self.assertEqual(response.status_code, 200, response.text)
        np.testing.assert_array_equal(refine.call_args.args[2], ccs_labels)
        reverse = response.json()
        self.assertEqual(reverse["parent_segmentation_id"], ccs["segmentation_id"])
        self.assertEqual(reverse["processing_order"], ["ccs_face_centroids_v1", BOUNDARY_METHOD])
        for item in (self.original, forward_boundary, forward_response.json(), ccs, reverse):
            self.assertEqual(self.client.get(item["files"]["parts.glb"]).status_code, 200)
        self.runner.assert_not_called()

    def test_old_automatic_result_requires_new_segmentation(self):
        path = self.folder / "segmentations" / self.original["segmentation_id"] / "parts.json"
        old = {**self.original, "diagnostics": {"connectivity": {"method": "shared_edge_connectivity_v3", "boundary_regularization": {}}}}
        write_json(path, old)
        response = self.client.post(self.boundary_endpoint, json={})
        self.assertEqual(response.status_code, 422)
        self.assertIn("再分割", response.text)
        self.runner.assert_not_called()

    def test_bad_ids_options_and_store_lock(self):
        self.assertEqual(self.client.post(self.boundary_endpoint, json={"unknown": True}).status_code, 422)
        self.assertEqual(self.client.post(self.boundary_endpoint.replace(self.original["segmentation_id"], "bad"), json={}).status_code, 422)
        self.assertEqual(self.client.post(self.boundary_endpoint.replace(self.original["segmentation_id"], "f" * 32), json={}).status_code, 404)
        with FileLock(self.store.root / ".watch.lock", timeout=0):
            self.assertEqual(self.client.post(self.boundary_endpoint, json={}).status_code, 409)

    def test_parent_identity_is_checked(self):
        path = self.folder / "segmentations" / self.original["segmentation_id"] / "parts.json"
        for field, value in (("source_sha256", "wrong"), ("model_id", "f" * 32)):
            write_json(path, {**self.original, field: value})
            self.assertEqual(self.client.post(self.boundary_endpoint, json={}).status_code, 422)

    def test_failure_keeps_original_and_does_not_serve_incomplete_result(self):
        with patch("ip_object_name.boundary_postprocessing.refine_two_edge_boundary", side_effect=RuntimeError("failed")):
            response = self.client.post(self.boundary_endpoint, json={})
        self.assertEqual(response.status_code, 502)
        metadata = self.store.get(self.model_id)
        self.assertEqual(metadata["boundary_status"], "failed")
        self.assertEqual(metadata["segmentation_status"], "completed")
        run_id = metadata["latest_boundary_segmentation_id"]
        self.assertTrue((self.folder / "segmentations" / run_id / "error.json").is_file())
        self.assertEqual(self.client.get(self.original["files"]["parts.glb"]).status_code, 200)
        url = self.original["files"]["parts.glb"].replace(self.original["segmentation_id"], run_id)
        self.assertEqual(self.client.get(url).status_code, 404)


if __name__ == "__main__":
    unittest.main()
