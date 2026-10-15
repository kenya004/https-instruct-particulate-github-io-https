from __future__ import annotations

import json
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import trimesh
import httpx
from fastapi.testclient import TestClient
from filelock import FileLock
from pydantic import ValidationError

from ip_object_name import core
from ip_object_name.planning import PartPlanPrediction, normalize_edit_request, request_part_plan
from ip_object_name.store import ModelStore
from ip_object_name.workflow_api import create_app


def prediction():
    return PartPlanPrediction.model_validate({
        "summary": "\u6301\u3061\u624b\u3092\u7de8\u96c6\u5bfe\u8c61\u306b\u3057\u307e\u3059\u3002",
        "parts": [
            {"name": "handle", "label": "\u6301\u3061\u624b", "description": "the gripping region", "is_edit_target": True},
            {"name": "head", "label": "\u5148\u7aef", "description": "the working region", "is_edit_target": False},
        ],
        "warnings": [],
    })


class PlanningTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.settings = core.Settings(self.root / "repo", self.root / "legacy", model="recognition-model")
        self.models = self.root / "models"
        self.app = create_app(self.settings, models_root=self.models, planner_model="planning-model")
        self.client = TestClient(self.app)
        self.addCleanup(self.client.close)
        self.glb = trimesh.Scene(trimesh.creation.box()).export(file_type="glb")

    def register(self):
        response = self.client.post("/models", files={"file": ("wrench.glb", self.glb)}, data={"edit_request": "Make the handle longer.", "up_dir": "+Y"})
        self.assertEqual(response.status_code, 201, response.text)
        return response.json()

    def recognize(self, model_id):
        def fake_recognition(store, identifier, settings, **kwargs):
            metadata = store.get(identifier)
            metadata.update(status="completed", object_name="\u30ec\u30f3\u30c1")
            store.save(metadata)
            return metadata

        with patch.object(ModelStore, "recognize", fake_recognition):
            response = self.client.post(f"/models/{model_id}/recognize")
        self.assertEqual(response.status_code, 200, response.text)

    def test_upload_name_then_plan_preserves_identity_and_text(self):
        model = self.register()
        self.assertEqual(model["source_filename"], "wrench.glb")
        self.assertEqual(model["up_dir"], "+Y")
        self.assertEqual(Path(model["input_mesh"]).read_bytes(), self.glb)
        folder = Path(model["input_mesh"]).parent
        self.assertEqual(json.loads((folder / "edit_request.json").read_text())["edit_request"], "Make the handle longer.")
        self.recognize(model["model_id"])
        with patch("ip_object_name.planning.request_part_plan", return_value=(prediction(), "reported-model-version")) as generate:
            response = self.client.post(f"/models/{model['model_id']}/parts", json={"edit_request": "Make the handle longer."})
        self.assertEqual(response.status_code, 200, response.text)
        result = response.json()
        self.assertEqual(result["model_id"], model["model_id"])
        self.assertEqual(result["part_names"], ["handle", "head"])
        self.assertEqual([p["part_id"] for p in result["parts"]], [0, 1])
        self.assertEqual(result["input_mesh"], model["input_mesh"])
        self.assertEqual(result["returned_model_version"], "reported-model-version")
        generate.assert_called_once_with("\u30ec\u30f3\u30c1", "Make the handle longer.", model="planning-model")
        saved = json.loads((folder / "planning" / "part_plan.json").read_text(encoding="utf-8"))
        self.assertEqual(saved, result)
        self.assertEqual(len(list(folder.rglob("input.glb"))), 1)

    def test_changed_request_uses_same_model_and_retains_each_plan(self):
        model = self.register()
        self.recognize(model["model_id"])
        with patch("ip_object_name.planning.request_part_plan", return_value=(prediction(), None)):
            first = self.client.post(f"/models/{model['model_id']}/parts", json={"edit_request": "Make the handle longer."}).json()
            second = self.client.post(f"/models/{model['model_id']}/parts", json={"edit_request": "Make the head wider."}).json()
        self.assertNotEqual(first["plan_id"], second["plan_id"])
        self.assertEqual(first["model_id"], second["model_id"])
        folder = Path(model["input_mesh"]).parent
        self.assertEqual(len(list((folder / "planning").glob("*/part_plan.json"))), 2)

    def test_planning_requires_recognized_category(self):
        model = self.register()
        endpoint = f"/models/{model['model_id']}/parts"
        with patch("ip_object_name.planning.request_part_plan") as generate:
            self.assertEqual(self.client.post(endpoint, json={"edit_request": "Make it longer."}).status_code, 409)
            store = ModelStore(self.models)
            model.update(status="completed", object_name="\u4e0d\u660e")
            store.save(model)
            self.assertEqual(self.client.post(endpoint, json={"edit_request": "Make it longer."}).status_code, 422)
        generate.assert_not_called()

    def test_invalid_upload_and_blank_request_are_rejected(self):
        for filename, data, request in (("wrong.obj", self.glb, "edit"), ("bad.glb", b"bad", "edit"), ("ok.glb", self.glb, "   ")):
            with self.subTest(filename=filename):
                response = self.client.post("/models", files={"file": (filename, data)}, data={"edit_request": request})
                self.assertEqual(response.status_code, 422)
        with self.assertRaises(ValueError):
            normalize_edit_request("x" * 4001)

    def test_model_ids_and_store_lock_are_checked(self):
        self.assertEqual(self.client.get("/models/invalid").status_code, 422)
        self.assertEqual(self.client.get("/models/" + "0" * 32).status_code, 404)
        self.models.mkdir(exist_ok=True)
        with FileLock(self.models / ".watch.lock", timeout=0):
            response = self.client.post("/models", files={"file": ("ok.glb", self.glb)}, data={"edit_request": "edit"})
        self.assertEqual(response.status_code, 409)

    def test_plan_failure_is_recorded_without_losing_name_or_original(self):
        model = self.register()
        self.recognize(model["model_id"])
        with patch("ip_object_name.planning.request_part_plan", side_effect=core.VLMError("provider failure")):
            response = self.client.post(f"/models/{model['model_id']}/parts", json={"edit_request": "Make it longer."})
        self.assertEqual(response.status_code, 502)
        current = self.client.get(f"/models/{model['model_id']}").json()
        self.assertEqual(current["status"], "completed")
        self.assertEqual(current["planning_status"], "failed")
        self.assertEqual(current["object_name"], "\u30ec\u30f3\u30c1")
        self.assertTrue(list(Path(model["input_mesh"]).parent.glob("planning/*/error.json")))

    def test_duplicate_or_blank_regions_are_rejected(self):
        value = prediction().model_dump()
        value["parts"][1]["name"] = "HANDLE"
        with self.assertRaises(ValidationError):
            PartPlanPrediction.model_validate(value)
        value["parts"][1]["name"] = "   "
        with self.assertRaises(ValidationError):
            PartPlanPrediction.model_validate(value)

    def test_llm_receives_only_category_and_edit_request(self):
        client = MagicMock()
        client.models.generate_content.return_value = SimpleNamespace(text=prediction().model_dump_json(), model_version="provider-version")
        with patch("google.genai.Client") as constructor, patch("ip_object_name.core._api_key", return_value="test-key"):
            constructor.return_value.__enter__.return_value = client
            result, returned_version = request_part_plan("\u30ec\u30f3\u30c1", "Make the handle longer.", model="selected-model")
        arguments = client.models.generate_content.call_args.kwargs
        self.assertEqual(json.loads(arguments["contents"]), {"object_name": "\u30ec\u30f3\u30c1", "edit_request": "Make the handle longer."})
        self.assertEqual(arguments["model"], "selected-model")
        prompt = arguments["config"].system_instruction
        self.assertIn("First infer the object's constituent parts", prompt)
        self.assertIn("Then use the editing request", prompt)
        self.assertIn("every mesh region must belong to exactly one listed part", prompt)
        self.assertIn("exhaustive, mutually exclusive partition", prompt)
        self.assertIn("repositioning the connected parts", prompt)
        self.assertIn("one whole-object region is sufficient", prompt)
        self.assertIn("require downstream geometric validation", prompt)
        self.assertEqual(returned_version, "provider-version")
        self.assertEqual(result.parts[0].name, "handle")

    def test_sdk_wire_schema_omits_unsupported_additional_properties(self):
        from google import genai
        from google.genai import types

        requests = []

        def respond(request):
            body = json.loads(request.content)
            requests.append(body)
            schema = body["generationConfig"]["responseSchema"]
            for keyword in ("additional_properties", "additionalProperties"):
                self.assertNotIn(keyword, json.dumps(schema))
            self.assertEqual(set(schema["required"]), {"summary", "parts", "warnings"})
            self.assertEqual(set(schema["properties"]["parts"]["items"]["required"]), {"name", "label", "description", "is_edit_target"})
            return httpx.Response(200, json={
                "candidates": [{"content": {"role": "model", "parts": [{"text": prediction().model_dump_json()}]}, "finishReason": "STOP"}],
                "modelVersion": "test-version",
            })

        client = genai.Client(api_key="test-key", http_options=types.HttpOptions(client_args={"transport": httpx.MockTransport(respond)}))
        with patch("google.genai.Client", return_value=client), patch("ip_object_name.core._api_key", return_value="test-key"):
            result, returned_version = request_part_plan("wrench", "Make the handle longer.", model="test-model")
        self.assertEqual(len(requests), 1)
        self.assertEqual(result.parts[0].name, "handle")
        self.assertEqual(returned_version, "test-version")

    def test_local_validation_still_forbids_extra_fields(self):
        for nested in (False, True):
            with self.subTest(nested=nested):
                value = prediction().model_dump()
                target = value["parts"][0] if nested else value
                target["unexpected"] = "not allowed"
                with self.assertRaises(ValidationError):
                    PartPlanPrediction.model_validate(value)


if __name__ == "__main__":
    unittest.main()
