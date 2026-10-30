from __future__ import annotations

import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from backend_client import BackendClient, BackendError
from viewer import load_mesh_payloads, mesh_figure
from workflow import prepare_parts


def part_plan(request="Make the handle longer."):
    return {
        "model_id": "a" * 32, "plan_id": "b" * 32, "object_name": "\u30ec\u30f3\u30c1",
        "edit_request": request, "summary": "\u6301\u3061\u624b\u3092\u7de8\u96c6\u5bfe\u8c61\u306b\u3057\u307e\u3059\u3002", "warnings": [],
        "part_names": ["handle", "head"],
        "parts": [
            {"part_id": 0, "name": "handle", "label": "\u6301\u3061\u624b", "description": "gripping region", "is_edit_target": True},
            {"part_id": 1, "name": "head", "label": "\u5148\u7aef", "description": "working region", "is_edit_target": False},
        ],
    }


class WorkflowTests(unittest.TestCase):
    def setUp(self):
        self.glb = trimesh.Scene(trimesh.creation.box()).export(file_type="glb")
        self.client = MagicMock(base_url="http://localhost:8004")
        self.client.register.return_value = {"model_id": "a" * 32}
        self.client.recognize.return_value = {"object_name": "\u30ec\u30f3\u30c1"}
        self.client.plan.return_value = part_plan()
        self.arguments = dict(filename="wrench.glb", content=self.glb, edit_request="Make the handle longer.", up_dir="+Z", progress=lambda value: None)

    def test_changed_request_reuses_registered_model_and_name(self):
        state = {}
        prepare_parts(state, self.client, **self.arguments)
        self.client.plan.return_value = part_plan("Make the head wider.")
        prepare_parts(state, self.client, **{**self.arguments, "edit_request": "Make the head wider."})
        self.assertEqual(self.client.register.call_count, 1)
        self.assertEqual(self.client.recognize.call_count, 1)
        self.assertEqual(self.client.plan.call_count, 2)

    def test_changed_geometry_or_up_direction_registers_again(self):
        state = {}
        prepare_parts(state, self.client, **self.arguments)
        prepare_parts(state, self.client, **{**self.arguments, "up_dir": "+Y"})
        self.assertEqual(self.client.register.call_count, 2)
        self.assertEqual(self.client.recognize.call_count, 2)

    def test_failed_planning_retains_name_and_registration_for_retry(self):
        state = {}
        self.client.plan.side_effect = BackendError("provider error")
        with self.assertRaises(BackendError):
            prepare_parts(state, self.client, **self.arguments)
        self.assertEqual(state["model_id"], "a" * 32)
        self.assertEqual(state["object_name"], "\u30ec\u30f3\u30c1")
        self.assertNotIn("plan", state)

    def test_glb_preview_preserves_scene_transforms(self):
        scene = trimesh.Scene()
        transform = np.eye(4)
        transform[0, 3] = 10
        scene.add_geometry(trimesh.creation.box(), transform=transform)
        meshes = load_mesh_payloads(scene.export(file_type="glb"))
        vertices = np.asarray(meshes[0]["vertices"])
        self.assertAlmostEqual(vertices[:, 0].min(), 9.5)
        figure = mesh_figure(meshes, up_dir="-Y")
        self.assertEqual(figure.layout.scene.camera.up.y, -1)
        self.assertGreater(len(figure.data[0].i), 0)

    def test_backend_error_is_presented_without_traceback(self):
        response = MagicMock(ok=False, status_code=409)
        response.json.return_value = {"detail": "busy"}
        with patch("backend_client.requests.request", return_value=response):
            with self.assertRaisesRegex(BackendError, "409: busy"):
                BackendClient("http://localhost:8004").recognize("a" * 32)


class InterfaceTests(unittest.TestCase):
    def setUp(self):
        self.path = Path(__file__).resolve().parents[1] / "app.py"
        self.glb = trimesh.Scene(trimesh.creation.box()).export(file_type="glb")

    def test_empty_state_does_not_request_inference(self):
        with patch("backend_client.requests.request") as request:
            app = AppTest.from_file(str(self.path)).run()
        self.assertEqual(len(app.exception), 0)
        self.assertTrue(app.button[0].disabled)
        request.assert_not_called()

    def test_upload_and_request_produce_name_and_parts_then_clear_stale_plan(self):
        app = AppTest.from_file(str(self.path)).run()
        app.get("file_uploader")[0].set_value(("wrench.glb", self.glb, "model/gltf-binary")).run()
        app.text_area[0].set_value("Make the handle longer.").run()
        self.assertFalse(app.button[0].disabled)
        with patch.object(BackendClient, "register", return_value={"model_id": "a" * 32}) as register:
            with patch.object(BackendClient, "recognize", return_value={"object_name": "\u30ec\u30f3\u30c1"}):
                with patch.object(BackendClient, "plan", return_value=part_plan()):
                    app.button[0].click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.dataframe), 1)
        self.assertEqual(app.dataframe[0].value["パーツ名"].tolist(), ["handle", "head"])
        self.assertNotIn("分割用名称", app.dataframe[0].value.columns)
        self.assertEqual(len(app.get("plotly_chart")), 1)
        self.assertEqual(app.session_state["preparation"]["object_name"], "\u30ec\u30f3\u30c1")
        register.assert_called_once()
        app.text_area[0].set_value("Make the head wider.").run()
        self.assertEqual(len(app.dataframe), 0)
        self.assertEqual(app.session_state["preparation"]["model_id"], "a" * 32)

    def test_invalid_glb_disables_submission(self):
        app = AppTest.from_file(str(self.path)).run()
        app.get("file_uploader")[0].set_value(("bad.glb", b"not a glb", "model/gltf-binary")).run()
        app.text_area[0].set_value("Make it longer.").run()
        self.assertEqual(len(app.exception), 0)
        self.assertTrue(app.button[0].disabled)
        self.assertEqual(len(app.error), 1)


if __name__ == "__main__":
    unittest.main()
