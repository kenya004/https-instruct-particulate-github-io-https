from __future__ import annotations

import base64
import hashlib
import json
import os
import tempfile
import unittest
from dataclasses import replace
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import trimesh
from fastapi.testclient import TestClient

from ip_object_name.api import create_app
from ip_object_name.core import (
    InvalidMeshError,
    Settings,
    SetupError,
    VLMError,
    check_environment,
    identify_object,
    normalize_up_dir,
    request_object_name,
    validate_glb,
    validate_prediction,
)


PNG = base64.b64decode(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jgekAAAAASUVORK5CYII="
)


class RecognitionTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.root = Path(self.temporary.name)
        self.settings = Settings(repo_root=self.root / "repo", output_root=self.root / "results")
        self.mesh_path = self.root / "stand.glb"
        mesh = trimesh.creation.box(extents=(1, 2, 3))
        mesh.apply_translation((4, 5, 6))
        scene = trimesh.Scene(mesh)
        self.mesh_path.write_bytes(scene.export(file_type="glb"))
        self.renderer = SimpleNamespace(
            DEFAULT_AUTO_KINEMATICS_AZIMUTHS=(-45, 45, 135, 215),
            resolve_blender_binary=MagicMock(return_value=Path("/usr/bin/blender")),
            render_mesh_auto_kinematics_views=MagicMock(side_effect=self.render),
        )
        self.data_utils = SimpleNamespace(
            load_trimesh=lambda path: trimesh.load(path, force="mesh", process=False)
        )
        self.upstream_patch = patch(
            "ip_object_name.core._upstream", return_value=(self.renderer, self.data_utils)
        )
        self.upstream_patch.start()
        self.addCleanup(self.upstream_patch.stop)
        self.addCleanup(self.temporary.cleanup)
        self.env_patch = patch.dict(os.environ, {"GEMINI_API_KEY": "test-only-not-a-real-key"})
        self.env_patch.start()
        self.addCleanup(self.env_patch.stop)

    def render(self, mesh, *, output_dir, **kwargs):
        self.assertEqual(mesh.faces.shape[1], 3)
        self.assertAlmostEqual(mesh.bounds[0][0], 3.5)
        output_dir.mkdir(parents=True)
        views = []
        for index in range(4):
            image = output_dir / f"view_{index:03d}.png"
            image.write_bytes(PNG)
            views.append(SimpleNamespace(image_path=image))
        return views

    def test_identifies_and_preserves_original_input_and_orientation(self):
        with patch("ip_object_name.core.request_object_name", return_value="\u30d8\u30c3\u30c9\u30db\u30f3\u30b9\u30bf\u30f3\u30c9") as request:
            result = identify_object(self.mesh_path, replace(self.settings, up_dir="-Y"))
        self.assertEqual(result["status"], "identified")
        self.assertEqual(result["object_name"], "\u30d8\u30c3\u30c9\u30db\u30f3\u30b9\u30bf\u30f3\u30c9")
        self.assertEqual(result["up_dir"], "-Y")
        self.assertEqual(Path(result["input_mesh"]).read_bytes(), self.mesh_path.read_bytes())
        self.assertEqual(result["source_sha256"], hashlib.sha256(self.mesh_path.read_bytes()).hexdigest())
        self.assertEqual(len(result["render_images"]), 4)
        self.assertEqual(self.renderer.render_mesh_auto_kinematics_views.call_args.kwargs["up_dir"], "-Y")
        self.assertEqual(request.call_args.kwargs["model"], self.settings.model)
        saved = json.loads((Path(result["output_dir"]) / "object_name.json").read_text(encoding="utf-8"))
        self.assertEqual(saved, result)
        self.assertNotIn("test-only-not-a-real-key", json.dumps(saved))

    def test_render_only_does_not_need_a_key_or_call_vlm(self):
        with patch.dict(os.environ, {}, clear=True), patch("ip_object_name.core.request_object_name") as request:
            result = identify_object(self.mesh_path, self.settings, render_only=True)
        self.assertEqual(result["status"], "rendered")
        self.assertIsNone(result["object_name"])
        request.assert_not_called()

    def test_missing_key_fails_before_rendering(self):
        with patch.dict(os.environ, {}, clear=True):
            with self.assertRaises(SetupError):
                identify_object(self.mesh_path, self.settings)
        self.renderer.render_mesh_auto_kinematics_views.assert_not_called()

    def test_invalid_glb_fails_before_rendering(self):
        self.mesh_path.write_bytes(b"not a glb")
        with self.assertRaises(InvalidMeshError):
            identify_object(self.mesh_path, self.settings)
        self.renderer.render_mesh_auto_kinematics_views.assert_not_called()

    def test_truncated_glb_is_rejected(self):
        self.mesh_path.write_bytes(self.mesh_path.read_bytes()[:-4])
        with self.assertRaises(InvalidMeshError):
            validate_glb(self.mesh_path)

    def test_empty_or_unreadable_mesh_is_rejected(self):
        self.data_utils.load_trimesh = MagicMock(side_effect=ValueError("empty mesh"))
        with self.assertRaises(InvalidMeshError):
            identify_object(self.mesh_path, self.settings)
        self.renderer.render_mesh_auto_kinematics_views.assert_not_called()

    def test_missing_blender_is_reported(self):
        self.renderer.resolve_blender_binary.side_effect = FileNotFoundError("blender")
        with self.assertRaisesRegex(SetupError, "BLENDER_BIN"):
            check_environment(self.settings)

    def test_missing_render_images_prevent_vlm_request(self):
        self.renderer.render_mesh_auto_kinematics_views.side_effect = None
        self.renderer.render_mesh_auto_kinematics_views.return_value = []
        with patch("ip_object_name.core.request_object_name") as request:
            with self.assertRaises(RuntimeError):
                identify_object(self.mesh_path, self.settings)
        request.assert_not_called()

    def test_gemini_request_uses_images_and_name_only_schema(self):
        image = self.root / "view.png"
        image.write_bytes(PNG)
        client = MagicMock()
        client.models.generate_content.return_value = SimpleNamespace(text='{"object_name":"mug"}')
        with patch("google.genai.Client") as constructor:
            constructor.return_value.__enter__.return_value = client
            name = request_object_name([SimpleNamespace(image_path=image)], model="configured-model")
        self.assertEqual(name, "mug")
        call = client.models.generate_content.call_args.kwargs
        self.assertEqual(call["model"], "configured-model")
        self.assertEqual(call["config"].response_schema["required"], ["object_name"])
        image_parts = [part for part in call["contents"][0].parts if part.inline_data]
        self.assertEqual(image_parts[0].inline_data.data, PNG)

    def test_provider_failure_is_not_exposed_verbatim(self):
        client = MagicMock()
        client.models.generate_content.side_effect = RuntimeError("secret-provider-detail")
        with patch("google.genai.Client") as constructor:
            constructor.return_value.__enter__.return_value = client
            with self.assertRaises(VLMError) as error:
                request_object_name([], model="configured-model")
        self.assertNotIn("secret-provider-detail", str(error.exception))

    def test_invalid_prediction_is_rejected(self):
        for prediction in ({}, {"object_name": None}, {"object_name": "  "}, {"object_name": "x" * 121}, []):
            with self.subTest(prediction=prediction), self.assertRaises(VLMError):
                validate_prediction(prediction)

    def test_up_direction_is_normalized(self):
        self.assertEqual(normalize_up_dir("z"), "+Z")
        self.assertEqual(normalize_up_dir(" -y "), "-Y")
        with self.assertRaises(ValueError):
            normalize_up_dir("front")

    def test_api_upload_returns_name_and_retained_input(self):
        with TestClient(create_app(self.settings)) as client:
            with patch("ip_object_name.core.request_object_name", return_value="mug"):
                response = client.post(
                    "/identify-object",
                    files={"file": ("stand.glb", self.mesh_path.read_bytes(), "model/gltf-binary")},
                    data={"up_dir": "+Y"},
                )
        self.assertEqual(response.status_code, 200, response.text)
        result = response.json()
        self.assertEqual(result["object_name"], "mug")
        self.assertEqual(result["source_filename"], "stand.glb")
        self.assertEqual(result["up_dir"], "+Y")
        self.assertTrue(Path(result["input_mesh"]).is_file())

    def test_api_input_errors(self):
        with TestClient(create_app(self.settings)) as client:
            for filename, content, up_dir in (
                ("stand.obj", b"irrelevant", "+Z"),
                ("stand.glb", b"not a glb", "+Z"),
                ("stand.glb", self.mesh_path.read_bytes(), "front"),
            ):
                with self.subTest(filename=filename, up_dir=up_dir):
                    response = client.post(
                        "/identify-object", files={"file": (filename, content)}, data={"up_dir": up_dir}
                    )
                    self.assertEqual(response.status_code, 422, response.text)
            with patch("ip_object_name.api.MAX_UPLOAD_BYTES", 2):
                response = client.post("/identify-object", files={"file": ("large.glb", b"1234")})
            self.assertEqual(response.status_code, 413)

    def test_api_busy_and_failure_release_lock(self):
        app = create_app(self.settings)
        with TestClient(app) as client:
            app.state.inference_lock.acquire()
            try:
                response = client.post("/identify-object", files={"file": ("stand.glb", b"unused")})
                self.assertEqual(response.status_code, 409)
            finally:
                app.state.inference_lock.release()
            for error, expected_status in ((SetupError("setup"), 503), (VLMError("vlm"), 502)):
                with patch("ip_object_name.api.identify_object", side_effect=error):
                    response = client.post("/identify-object", files={"file": ("stand.glb", b"unused")})
                self.assertEqual(response.status_code, expected_status)
                self.assertFalse(app.state.inference_lock.locked())


if __name__ == "__main__":
    unittest.main()
