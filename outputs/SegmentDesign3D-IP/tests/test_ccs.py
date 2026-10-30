from __future__ import annotations

import json
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch

from streamlit.testing.v1 import AppTest

from backend_client import BackendClient, BackendError
from workflow import refine_parts_ccs, segment_parts
from test_preparation import part_plan
from test_segmentation import segmentation_fixture


def ccs_fixture():
    result, artifacts = segmentation_fixture()
    result.update(segmentation_id="d" * 32, parent_segmentation_id="c" * 32, method="ccs_face_centroids_v1", total_processing_seconds=0.02)
    result["postprocessing"] = {
        "method": "ccs_face_centroids_v1", "changed_faces": 2, "elapsed_seconds": 0.01, "stop_reason": "unchanged",
        "parts": [{"part_id": index, "faces_before": 12, "faces_after": 12, "components_before": 1, "components_after": 1} for index in range(2)],
        "skipped_pairs": [],
    }
    artifacts["parts.json"] = json.dumps(result).encode()
    return result, artifacts


class CCSWorkflowTests(unittest.TestCase):
    def setUp(self):
        self.original, self.original_artifacts = segmentation_fixture()
        self.refined, self.artifacts = ccs_fixture()
        self.state = {"plan": part_plan(), "segmentation": {"result": self.original, "artifacts": self.original_artifacts}}
        self.client = MagicMock(base_url="http://localhost:8004")
        self.client.refine_ccs.return_value = self.refined
        self.client.download_artifact.side_effect = lambda result, filename: self.artifacts[filename]

    def refine(self):
        return refine_parts_ccs(self.state, self.client, options={"max_iterations": 5}, progress=lambda label: None)

    def test_refinement_keeps_original_and_does_not_run_segmentation(self):
        result = self.refine()
        self.client.refine_ccs.assert_called_once_with(self.original, {"max_iterations": 5})
        self.client.segment.assert_not_called()
        self.assertEqual(result["artifacts"], self.artifacts)
        self.assertEqual(self.state["segmentation"]["result"]["segmentation_id"], "c" * 32)
        self.assertEqual(self.state["segmentation"]["artifacts"], self.original_artifacts)

    def test_download_retry_does_not_repeat_ccs(self):
        def download(result, filename):
            if filename == "parts.npz":
                raise BackendError("offline")
            return self.artifacts[filename]
        self.client.download_artifact.side_effect = download
        with self.assertRaises(BackendError):
            self.refine()
        self.assertIn("parts.glb", self.state["ccs_refinement"]["artifacts"])
        self.client.download_artifact.side_effect = lambda result, filename: self.artifacts[filename]
        self.refine()
        self.assertEqual(self.client.refine_ccs.call_count, 1)

    def test_each_explicit_rerun_uses_original_not_previous_refinement(self):
        self.refine()
        self.refine()
        self.assertEqual(self.client.refine_ccs.call_count, 2)
        for call in self.client.refine_ccs.call_args_list:
            self.assertEqual(call.args[0]["segmentation_id"], "c" * 32)

    def test_parent_mismatch_is_rejected(self):
        self.client.refine_ccs.return_value = {**self.refined, "parent_segmentation_id": "f" * 32}
        with self.assertRaises(ValueError):
            self.refine()
        self.assertNotIn("ccs_refinement", self.state)

    def test_new_original_segmentation_clears_refinement(self):
        self.refine()
        self.client.segment.return_value = {**self.original, "segmentation_id": "e" * 32}
        segment_parts(self.state, self.client, options={}, progress=lambda label: None)
        self.assertNotIn("ccs_refinement", self.state)

    def test_failure_keeps_original_result(self):
        self.client.refine_ccs.side_effect = BackendError("server error")
        with self.assertRaises(BackendError):
            self.refine()
        self.assertEqual(self.state["segmentation"]["result"], self.original)

    def test_refinement_requires_matching_model_and_plan(self):
        self.state["plan"]["plan_id"] = "f" * 32
        with self.assertRaises(ValueError):
            self.refine()
        self.client.refine_ccs.assert_not_called()

    def test_client_uses_scoped_refinement_endpoint(self):
        response = MagicMock(ok=True)
        response.json.return_value = self.refined
        with patch("backend_client.requests.request", return_value=response) as request:
            BackendClient("http://localhost:8004").refine_ccs(self.original, {"max_iterations": 5})
        self.assertEqual(request.call_args.args[0], "POST")
        self.assertTrue(request.call_args.args[1].endswith(f"/segmentations/{'c' * 32}/refine-ccs"))


class CCSInterfaceTests(unittest.TestCase):
    def test_refine_compare_and_request_change(self):
        original, original_artifacts = segmentation_fixture()
        refined, artifacts = ccs_fixture()
        path = Path(__file__).resolve().parents[1] / "app.py"
        app = AppTest.from_file(str(path)).run()
        app.get("file_uploader")[0].set_value(("input.glb", original_artifacts["parts.glb"], "model/gltf-binary")).run()
        app.text_area[0].set_value("Make the handle longer.").run()
        with patch.object(BackendClient, "register", return_value={"model_id": "a" * 32}), patch.object(BackendClient, "recognize", return_value={"object_name": "object"}), patch.object(BackendClient, "plan", return_value=part_plan()):
            app.button[0].click().run()
        with patch.object(BackendClient, "segment", return_value=original), patch.object(BackendClient, "download_artifact", side_effect=lambda result, filename: original_artifacts[filename]):
            app.button(key="segment").click().run()
        with patch.object(BackendClient, "refine_ccs", return_value=refined) as refine, patch.object(BackendClient, "download_artifact", side_effect=lambda result, filename: artifacts[filename]):
            app.button(key="refine_ccs").click().run()
        self.assertEqual(len(app.exception), 0)
        refine.assert_called_once_with(original, {"max_iterations": 5})
        self.assertEqual(app.radio[0].value, "CCS補正後")
        self.assertIn(f"分割ID: {'d' * 32}", [item.value for item in app.caption])
        self.assertEqual(app.metric[0].value, "2")
        app.radio[0].set_value("補正前").run()
        self.assertEqual(len(app.exception), 0)
        self.assertIn(f"分割ID: {'c' * 32}", [item.value for item in app.caption])
        self.assertEqual(app.session_state["preparation"]["segmentation"]["result"], original)
        app.radio[0].set_value("CCS補正後").run()
        self.assertEqual(len(app.get("plotly_chart")), 2)
        app.text_area[0].set_value("Change another part.").run()
        self.assertNotIn("ccs_refinement", app.session_state["preparation"])
        self.assertNotIn("segmentation", app.session_state["preparation"])


if __name__ == "__main__":
    unittest.main()
