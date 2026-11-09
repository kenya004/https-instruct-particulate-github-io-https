from __future__ import annotations

import json
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch

from streamlit.testing.v1 import AppTest

from backend_client import BackendClient, BackendError
from workflow import (
    ccs_input, get_refinement_order, prepare_parts, refine_parts_boundary, refine_parts_ccs,
    refinement_input, result_stages, segment_parts, set_refinement_order,
)
from test_preparation import part_plan
from test_segmentation import segmentation_fixture
from test_ccs import ccs_fixture


def boundary_fixture():
    result, artifacts = segmentation_fixture()
    result.update(segmentation_id="d" * 32, parent_segmentation_id="c" * 32,
                  method="two_internal_edges_boundary_gain_v2", total_processing_seconds=0.02)
    result["postprocessing"] = {
        "changed_faces": 2, "unresolved_boundary_faces": 1,
        "unresolved_reasons": {"would_empty_part": 1},
        "boundary_edges_before": 8, "boundary_edges_after": 6,
        "boundary_length_before": 10.0, "boundary_length_after": 8.0, "priority_tie_steps": 1,
        "parts": [{"part_id": part, "violating_faces_before": 3, "violating_faces_after": 1,
                   "components_before": 1, "components_after": 1} for part in range(2)],
    }
    artifacts["parts.json"] = json.dumps(result).encode()
    return result, artifacts


def boundary_ccs_fixture():
    result, artifacts = ccs_fixture()
    result.update(segmentation_id="e" * 32, parent_segmentation_id="d" * 32)
    artifacts["parts.json"] = json.dumps(result).encode()
    return result, artifacts


class BoundaryWorkflowTests(unittest.TestCase):
    def setUp(self):
        self.original, self.original_files = segmentation_fixture()
        self.boundary, self.boundary_files = boundary_fixture()
        self.ccs, self.ccs_files = boundary_ccs_fixture()
        self.state = {"plan": part_plan(), "segmentation": {"result": self.original, "artifacts": self.original_files}}
        self.client = MagicMock(base_url="http://localhost:8004")
        self.client.refine_boundary.return_value = self.boundary
        self.client.refine_ccs.return_value = self.ccs
        files = {"c" * 32: self.original_files, "d" * 32: self.boundary_files, "e" * 32: self.ccs_files}
        self.client.download_artifact.side_effect = lambda result, filename: files[result["segmentation_id"]][filename]

    def boundary_run(self):
        return refine_parts_boundary(self.state, self.client, progress=lambda label: None)

    def ccs_run(self):
        return refine_parts_ccs(self.state, self.client, options={"max_iterations": 5}, progress=lambda label: None)

    def test_sequential_processing_preserves_three_stages_and_uses_boundary_as_ccs_input(self):
        self.boundary_run()
        self.ccs_run()
        self.client.refine_boundary.assert_called_once_with(self.original)
        self.client.refine_ccs.assert_called_once_with(self.boundary, {"max_iterations": 5})
        self.client.segment.assert_not_called()
        self.assertEqual([name for name, _ in result_stages(self.state)], ["分割直後", "2辺共有補正後", "CCS補正後"])
        self.assertEqual(self.state["segmentation"]["artifacts"], self.original_files)

    def test_boundary_rerun_starts_from_original_and_discards_old_ccs(self):
        self.boundary_run()
        self.ccs_run()
        self.boundary_run()
        self.assertNotIn("ccs_refinement", self.state)
        for call in self.client.refine_boundary.call_args_list:
            self.assertEqual(call.args[0]["segmentation_id"], self.original["segmentation_id"])

    def test_partial_boundary_download_resumes_and_blocks_ccs_until_complete(self):
        self.client.download_artifact.side_effect = lambda result, filename: (_ for _ in ()).throw(BackendError("offline")) if filename == "parts.npz" else self.boundary_files[filename]
        with self.assertRaises(BackendError):
            self.boundary_run()
        with self.assertRaises(ValueError):
            self.ccs_run()
        self.client.refine_ccs.assert_not_called()
        self.client.download_artifact.side_effect = lambda result, filename: self.boundary_files[filename]
        self.boundary_run()
        self.assertEqual(self.client.refine_boundary.call_count, 1)
        self.assertIs(ccs_input(self.state), self.state["boundary_refinement"])

    def test_new_segmentation_discards_both_refinements(self):
        self.boundary_run()
        self.ccs_run()
        self.client.segment.return_value = self.original
        segment_parts(self.state, self.client, options={}, progress=lambda label: None)
        self.assertNotIn("boundary_refinement", self.state)
        self.assertNotIn("ccs_refinement", self.state)

    def test_new_plan_discards_both_refinements(self):
        self.boundary_run()
        self.ccs_run()
        self.client.register.return_value = {"model_id": "a" * 32}
        self.client.recognize.return_value = {"object_name": "object"}
        self.client.plan.return_value = part_plan()
        prepare_parts(self.state, self.client, filename="model.glb", content=self.original_files["parts.glb"],
                      edit_request="Make the handle longer.", up_dir="+Z", progress=lambda label: None)
        self.assertNotIn("boundary_refinement", self.state)
        self.assertNotIn("ccs_refinement", self.state)

    def test_failure_preserves_previous_complete_results(self):
        self.boundary_run()
        self.ccs_run()
        old = self.state["ccs_refinement"]
        self.client.refine_boundary.side_effect = BackendError("failed")
        with self.assertRaises(BackendError):
            self.boundary_run()
        self.assertIs(self.state["ccs_refinement"], old)

    def test_wrong_parent_and_old_automatic_result_are_rejected(self):
        self.client.refine_boundary.return_value = {**self.boundary, "parent_segmentation_id": "f" * 32}
        with self.assertRaises(ValueError):
            self.boundary_run()
        self.assertNotIn("boundary_refinement", self.state)
        self.original["diagnostics"] = {"connectivity": {"boundary_regularization": {}}}
        self.client.refine_boundary.reset_mock()
        with self.assertRaises(ValueError):
            self.boundary_run()
        self.client.refine_boundary.assert_not_called()

    def test_stale_ccs_is_not_shown_when_its_parent_is_not_current_boundary(self):
        self.boundary_run()
        self.state["ccs_refinement"] = {"result": {**self.ccs, "parent_segmentation_id": self.original["segmentation_id"]}, "artifacts": self.ccs_files}
        self.assertEqual([name for name, _ in result_stages(self.state)], ["分割直後", "2辺共有補正後"])

    def test_boundary_client_uses_scoped_endpoint(self):
        response = MagicMock(ok=True)
        response.json.return_value = self.boundary
        with patch("backend_client.requests.request", return_value=response) as request:
            BackendClient("http://localhost:8004").refine_boundary(self.original)
        self.assertTrue(request.call_args.args[1].endswith(f"/segmentations/{'c' * 32}/refine-boundary"))
        self.assertEqual(request.call_args.kwargs["json"], {})

    def run_both_orders(self):
        self.boundary_run()
        self.ccs_run()
        forward = {key: self.state[key] for key in ("boundary_refinement", "ccs_refinement")}
        set_refinement_order(self.state, "ccs_then_boundary")
        reverse_ccs = {**self.ccs, "segmentation_id": "f" * 32, "parent_segmentation_id": self.original["segmentation_id"]}
        reverse_boundary = {**self.boundary, "segmentation_id": "0" * 32, "parent_segmentation_id": reverse_ccs["segmentation_id"]}
        self.client.refine_ccs.return_value = reverse_ccs
        self.client.refine_boundary.return_value = reverse_boundary
        self.client.download_artifact.side_effect = lambda result, filename: (
            self.ccs_files if result.get("method") == "ccs_face_centroids_v1"
            else self.boundary_files if result.get("parent_segmentation_id") else self.original_files)[filename]
        self.ccs_run()
        self.boundary_run()
        reverse = {key: self.state[key] for key in ("boundary_refinement", "ccs_refinement")}
        return forward, reverse

    def test_both_orders_use_correct_inputs_and_switch_without_recalculation(self):
        forward, reverse = self.run_both_orders()
        self.assertEqual([name for name, _ in result_stages(self.state)], ["分割直後", "CCS補正後", "2辺共有補正後"])
        self.assertEqual(self.client.refine_boundary.call_args.args[0], reverse["ccs_refinement"]["result"])
        self.assertEqual(self.client.refine_ccs.call_args.args[0], self.original)
        calls = (self.client.refine_boundary.call_count, self.client.refine_ccs.call_count)
        set_refinement_order(self.state, "boundary_then_ccs")
        self.assertIs(self.state["boundary_refinement"], forward["boundary_refinement"])
        self.assertIs(self.state["ccs_refinement"], forward["ccs_refinement"])
        set_refinement_order(self.state, "ccs_then_boundary")
        self.assertIs(self.state["boundary_refinement"], reverse["boundary_refinement"])
        self.assertEqual((self.client.refine_boundary.call_count, self.client.refine_ccs.call_count), calls)
        self.client.segment.assert_not_called()

    def test_rerunning_first_stage_invalidates_only_that_orders_second_stage(self):
        _, reverse = self.run_both_orders()
        set_refinement_order(self.state, "boundary_then_ccs")
        self.client.refine_boundary.return_value = {**self.boundary, "segmentation_id": "1" * 32}
        self.boundary_run()
        self.assertNotIn("ccs_refinement", self.state)
        set_refinement_order(self.state, "ccs_then_boundary")
        self.assertIs(self.state["boundary_refinement"], reverse["boundary_refinement"])
        self.assertIs(self.state["ccs_refinement"], reverse["ccs_refinement"])

    def test_new_segmentation_clears_results_for_both_orders(self):
        self.run_both_orders()
        self.client.segment.return_value = self.original
        segment_parts(self.state, self.client, options={}, progress=lambda label: None)
        self.assertNotIn("refinement_runs", self.state)
        self.assertNotIn("boundary_refinement", self.state)
        self.assertNotIn("ccs_refinement", self.state)

    def test_partial_download_is_restored_after_switch_and_resumed(self):
        def download(result, filename):
            if filename == "parts.npz":
                raise BackendError("offline")
            return self.boundary_files[filename]
        self.client.download_artifact.side_effect = download
        with self.assertRaises(BackendError):
            self.boundary_run()
        set_refinement_order(self.state, "ccs_then_boundary")
        self.assertNotIn("boundary_refinement", self.state)
        set_refinement_order(self.state, "boundary_then_ccs")
        self.assertIn("parts.glb", self.state["boundary_refinement"]["artifacts"])
        self.client.download_artifact.side_effect = lambda result, filename: self.boundary_files[filename]
        self.boundary_run()
        self.assertEqual(self.client.refine_boundary.call_count, 1)

    def test_second_stage_waits_for_first_in_each_order(self):
        with self.assertRaises(ValueError):
            self.ccs_run()
        set_refinement_order(self.state, "ccs_then_boundary")
        with self.assertRaises(ValueError):
            self.boundary_run()
        self.client.refine_ccs.assert_not_called()
        self.client.refine_boundary.assert_not_called()

    def test_wrong_first_stage_parent_is_rejected(self):
        set_refinement_order(self.state, "ccs_then_boundary")
        self.state["ccs_refinement"] = {"result": self.ccs, "artifacts": self.ccs_files}
        with self.assertRaises(ValueError):
            refinement_input(self.state, "boundary_refinement")
        self.assertEqual([name for name, _ in result_stages(self.state)], ["分割直後"])

    def test_existing_ccs_only_session_is_preserved_as_reverse_order(self):
        legacy = {"result": {**self.ccs, "parent_segmentation_id": self.original["segmentation_id"]}, "artifacts": self.ccs_files}
        self.state["ccs_refinement"] = legacy
        self.assertEqual(get_refinement_order(self.state), "ccs_then_boundary")
        set_refinement_order(self.state, "ccs_then_boundary")
        self.assertIs(self.state["ccs_refinement"], legacy)
        self.assertIs(refinement_input(self.state, "boundary_refinement"), legacy)


class BoundaryInterfaceTests(unittest.TestCase):
    def test_buttons_run_in_sequence_compare_three_stages_and_clear_ccs_after_boundary_rerun(self):
        original, original_files = segmentation_fixture()
        boundary, boundary_files = boundary_fixture()
        ccs, ccs_files = boundary_ccs_fixture()
        app = AppTest.from_file(str(Path(__file__).resolve().parents[1] / "app.py")).run()
        app.get("file_uploader")[0].set_value(("input.glb", original_files["parts.glb"], "model/gltf-binary")).run()
        app.text_area[0].set_value("Make the handle longer.").run()
        with patch.object(BackendClient, "register", return_value={"model_id": "a" * 32}), patch.object(BackendClient, "recognize", return_value={"object_name": "object"}), patch.object(BackendClient, "plan", return_value=part_plan()):
            app.button[0].click().run()
        with patch.object(BackendClient, "segment", return_value=original), patch.object(BackendClient, "download_artifact", side_effect=lambda result, filename: original_files[filename]):
            app.button(key="segment").click().run()
        keys = [button.key for button in app.button]
        self.assertLess(keys.index("segment"), keys.index("refine_boundary"))
        self.assertLess(keys.index("refine_boundary"), keys.index("refine_ccs"))
        self.assertTrue(app.button(key="refine_ccs").disabled)
        with patch.object(BackendClient, "refine_boundary", return_value=boundary) as refine, patch.object(BackendClient, "download_artifact", side_effect=lambda result, filename: boundary_files[filename]):
            app.button(key="refine_boundary").click().run()
        refine.assert_called_once_with(original)
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(app.radio[0].options, ["分割直後", "2辺共有補正後"])
        self.assertEqual(app.radio[0].value, "2辺共有補正後")
        self.assertIn("CCSの入力：2辺共有補正後", [caption.value for caption in app.caption])
        self.assertIn("境界Edge数：8 → 6", [caption.value for caption in app.caption])
        app.radio[0].set_value("分割直後").run()
        with patch.object(BackendClient, "refine_ccs", return_value=ccs) as refine_ccs, patch.object(BackendClient, "download_artifact", side_effect=lambda result, filename: ccs_files[filename]):
            app.button(key="refine_ccs").click().run()
        refine_ccs.assert_called_once_with(boundary, {"max_iterations": 1})
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(app.radio[0].options, ["分割直後", "2辺共有補正後", "CCS補正後"])
        for name, result in (("分割直後", original), ("2辺共有補正後", boundary), ("CCS補正後", ccs)):
            app.radio[0].set_value(name).run()
            self.assertEqual(len(app.exception), 0)
            self.assertIn(f"分割ID: {result['segmentation_id']}", [caption.value for caption in app.caption])
        rerun = {**boundary, "segmentation_id": "f" * 32}
        with patch.object(BackendClient, "refine_boundary", return_value=rerun), patch.object(BackendClient, "download_artifact", side_effect=lambda result, filename: boundary_files[filename]):
            app.button(key="refine_boundary").click().run()
        self.assertEqual(app.radio[0].options, ["分割直後", "2辺共有補正後"])
        self.assertNotIn("ccs_refinement", app.session_state["preparation"])
        app.selectbox(key="refinement_order_control").set_value("ccs_then_boundary").run()
        self.assertEqual(len(app.exception), 0)
        keys = [button.key for button in app.button]
        self.assertLess(keys.index("refine_ccs"), keys.index("refine_boundary"))
        self.assertTrue(app.button(key="refine_boundary").disabled)
        reverse_ccs = {**ccs, "segmentation_id": "1" * 32, "parent_segmentation_id": original["segmentation_id"]}
        with patch.object(BackendClient, "refine_ccs", return_value=reverse_ccs) as refine_ccs, patch.object(BackendClient, "download_artifact", side_effect=lambda result, filename: ccs_files[filename]):
            app.button(key="refine_ccs").click().run()
        refine_ccs.assert_called_once_with(original, {"max_iterations": 1})
        reverse_boundary = {**boundary, "segmentation_id": "2" * 32, "parent_segmentation_id": reverse_ccs["segmentation_id"]}
        with patch.object(BackendClient, "refine_boundary", return_value=reverse_boundary) as refine_boundary, patch.object(BackendClient, "download_artifact", side_effect=lambda result, filename: boundary_files[filename]):
            app.button(key="refine_boundary").click().run()
        refine_boundary.assert_called_once_with(reverse_ccs)
        self.assertEqual(app.radio[0].options, ["分割直後", "CCS補正後", "2辺共有補正後"])
        self.assertIn("2辺共有補正の入力：CCS補正後", [caption.value for caption in app.caption])
        with patch.object(BackendClient, "refine_boundary", side_effect=AssertionError("Switching order must not execute")), patch.object(BackendClient, "refine_ccs", side_effect=AssertionError("Switching order must not execute")):
            app.selectbox(key="refinement_order_control").set_value("boundary_then_ccs").run()
            self.assertEqual(app.radio[0].options, ["分割直後", "2辺共有補正後"])
            self.assertEqual(app.session_state["preparation"]["boundary_refinement"]["result"]["segmentation_id"], "f" * 32)
            app.selectbox(key="refinement_order_control").set_value("ccs_then_boundary").run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(app.session_state["preparation"]["boundary_refinement"]["result"], reverse_boundary)
        app.text_area[0].set_value("Change another part.").run()
        self.assertNotIn("boundary_refinement", app.session_state["preparation"])
        self.assertNotIn("refinement_runs", app.session_state["preparation"])


if __name__ == "__main__":
    unittest.main()
