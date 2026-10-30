from __future__ import annotations

import json
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from backend_client import BackendClient, BackendError
from viewer import load_segmented_payloads, mesh_figure
from workflow import prepare_parts, segment_parts
from test_preparation import part_plan


def segmentation_fixture():
    scene = trimesh.Scene()
    parts = []
    for index in range(2):
        mesh = trimesh.creation.box()
        mesh.apply_translation([index * 2 + 10, 20, 30])
        name = f"part_{index:04d}"
        scene.add_geometry(mesh, geom_name=name, node_name=f"node_{name}")
        parts.append({**part_plan()["parts"][index], "geometry_name": name, "node_name": f"node_{name}",
                      "vertex_count": 8, "face_count": 12, "is_watertight": True, "color": ["#d77a35", "#168b83"][index]})
    result = {"model_id": "a" * 32, "plan_id": "b" * 32, "segmentation_id": "c" * 32, "status": "completed", "parts": parts, "warnings": []}
    artifacts = {"parts.glb": scene.export(file_type="glb"), "parts.json": json.dumps(result).encode(), "parts.npz": b"test npz download"}
    return result, artifacts


class SegmentationWorkflowTests(unittest.TestCase):
    def setUp(self):
        self.result, self.artifacts = segmentation_fixture()
        self.state = {"plan": part_plan(), "model_id": "a" * 32, "object_name": "object"}
        self.client = MagicMock(base_url="http://localhost:8004")
        self.client.segment.return_value = self.result
        self.client.download_artifact.side_effect = lambda result, filename: self.artifacts[filename]

    def run_segmentation(self):
        return segment_parts(self.state, self.client, options={}, progress=lambda label: None)

    def test_separate_button_fetches_all_editing_artifacts(self):
        saved = self.run_segmentation()
        self.client.segment.assert_called_once_with("a" * 32, "b" * 32, {})
        self.assertEqual(saved["artifacts"], self.artifacts)
        self.assertEqual(self.state["plan"], part_plan())

    def test_failed_download_is_resumed_without_gpu_reexecution(self):
        def download(result, filename):
            if filename == "parts.npz":
                raise BackendError("offline")
            return self.artifacts[filename]
        self.client.download_artifact.side_effect = download
        with self.assertRaises(BackendError):
            self.run_segmentation()
        self.assertIn("parts.glb", self.state["segmentation"]["artifacts"])
        self.client.download_artifact.side_effect = lambda result, filename: self.artifacts[filename]
        self.run_segmentation()
        self.assertEqual(self.client.segment.call_count, 1)
        self.assertEqual(self.state["segmentation"]["artifacts"], self.artifacts)

    def test_explicit_rerun_after_complete_runs_new_inference(self):
        self.run_segmentation()
        self.run_segmentation()
        self.assertEqual(self.client.segment.call_count, 2)

    def test_wrong_plan_result_is_not_displayed(self):
        self.client.segment.return_value = {**self.result, "plan_id": "d" * 32}
        with self.assertRaises(ValueError):
            self.run_segmentation()
        self.assertNotIn("segmentation", self.state)

    def test_preparation_clears_old_segmentation(self):
        self.run_segmentation()
        self.client.register.return_value = {"model_id": "a" * 32}
        self.client.recognize.return_value = {"object_name": "object"}
        self.client.plan.return_value = part_plan()
        prepare_parts(self.state, self.client, filename="input.glb", content=self.artifacts["parts.glb"], edit_request="edit", up_dir="+Z", progress=lambda label: None)
        self.assertNotIn("segmentation", self.state)

    def test_viewer_uses_explicit_ids_and_keeps_full_scene_bounds(self):
        meshes = load_segmented_payloads(self.artifacts["parts.glb"], self.result)
        self.assertEqual({mesh["part_id"] for mesh in meshes}, {0, 1})
        self.assertEqual({mesh["name"] for mesh in meshes}, {"handle", "head"})
        self.assertEqual({mesh["color"] for mesh in meshes}, {"#d77a35", "#168b83"})
        figure = mesh_figure(meshes[:1], up_dir="+Y", bounds=[[9.5, 19.5, 29.5], [12.5, 20.5, 30.5]])
        self.assertEqual(len(figure.data), 1)
        self.assertGreater(figure.layout.scene.xaxis.range[1], 12.5)
        self.result["parts"][0]["geometry_name"] = "wrong"
        with self.assertRaises(ValueError):
            load_segmented_payloads(self.artifacts["parts.glb"], self.result)

    def test_download_uses_scoped_api_not_local_wsl_paths(self):
        response = MagicMock(ok=True, content=b"download")
        with patch("backend_client.requests.request", return_value=response) as request:
            result = BackendClient("http://localhost:8004").download_artifact(self.result, "parts.glb")
        self.assertEqual(result, b"download")
        self.assertIn(f"/plans/{'b' * 32}/segmentations/{'c' * 32}/files/parts.glb", request.call_args.args[1])


class SegmentationInterfaceTests(unittest.TestCase):
    def test_ui_segments_then_isolates_and_invalidates_on_request_change(self):
        result, artifacts = segmentation_fixture()
        path = Path(__file__).resolve().parents[1] / "app.py"
        app = AppTest.from_file(str(path)).run()
        app.get("file_uploader")[0].set_value(("input.glb", artifacts["parts.glb"], "model/gltf-binary")).run()
        app.text_area[0].set_value("Make the handle longer.").run()
        with patch.object(BackendClient, "register", return_value={"model_id": "a" * 32}), patch.object(BackendClient, "recognize", return_value={"object_name": "object"}), patch.object(BackendClient, "plan", return_value=part_plan()):
            app.button[0].click().run()
        self.assertEqual(len(app.get("plotly_chart")), 1)
        self.assertTrue(app.checkbox[0].value)
        with patch.object(BackendClient, "segment", return_value=result) as segment, patch.object(BackendClient, "download_artifact", side_effect=lambda result, filename: artifacts[filename]):
            app.button(key="segment").click().run()
        self.assertEqual(len(app.exception), 0)
        segment.assert_called_once()
        self.assertTrue(segment.call_args.args[2]["enforce_connectivity_per_part"])
        self.assertEqual(len(app.get("plotly_chart")), 2)
        self.assertEqual(app.dataframe[1].value["パーツ"].tolist(), ["handle", "head"])
        self.assertEqual(app.selectbox(key=f"visible_part_{'c' * 32}").options, ["全体", "0: handle", "1: head"])
        self.assertEqual(len(app.get("download_button")), 4)
        app.selectbox(key=f"visible_part_{'c' * 32}").set_value(0).run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(app.selectbox(key=f"visible_part_{'c' * 32}").value, 0)
        app.checkbox[0].set_value(False).run()
        self.assertFalse(app.checkbox[0].value)
        app.text_area[0].set_value("Change another region.").run()
        self.assertNotIn("segmentation", app.session_state["preparation"])
        self.assertEqual(len(app.get("plotly_chart")), 1)


if __name__ == "__main__":
    unittest.main()
