from __future__ import annotations

import hashlib
import io
import json
import tempfile
import unittest
from dataclasses import replace
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import numpy as np
import trimesh
from fastapi.testclient import TestClient

from ip_object_name import core
from ip_object_name.pose import align_glb, rotation_to_z, unit_direction
from ip_object_name.store import ModelStore
from ip_object_name.workflow_api import create_app
from ip_object_name.segmentation import MeshPartition
import test_object_name as recognition_fixture
from test_planning import prediction as part_prediction


def world_vertices(path):
    scene = trimesh.load(path, force="scene", process=False)
    points = []
    for node in scene.graph.nodes_geometry:
        matrix, name = scene.graph[node]
        points.append(trimesh.transform_points(scene.geometry[name].vertices, matrix))
    return np.concatenate(points)


class PoseGeometryTests(unittest.TestCase):
    def test_arbitrary_and_opposite_up_directions_use_proper_rotations(self):
        for up in ([1, 2, 3], [0, 0, -1], [0, 0, 1], [-2, 3, -.9], [1e-7, 0, -1]):
            rotation = rotation_to_z(up)
            np.testing.assert_allclose(rotation @ unit_direction(up), [0, 0, 1], atol=1e-10)
            np.testing.assert_allclose(rotation.T @ rotation, np.eye(3), atol=1e-10)
            self.assertAlmostEqual(np.linalg.det(rotation), 1)

    def test_all_initial_render_frames_compose_with_prediction_and_ground_without_rescaling(self):
        with tempfile.TemporaryDirectory() as temporary:
            folder = Path(temporary)
            scene = trimesh.Scene()
            mesh = trimesh.creation.box(extents=[2, 3, 5])
            mesh.visual.face_colors = [50, 100, 150, 255]
            transform = trimesh.transformations.rotation_matrix(.63, [1, 2, 3])
            transform[:3, 3] = [4, -7, 13]
            scene.add_geometry(mesh, geom_name="box", node_name="first", transform=transform)
            second = np.eye(4); second[:3, 3] = [-10, 20, -3]
            scene.graph.update(frame_to="second", geometry="box", matrix=second)
            source = folder / "input.glb"; source.write_bytes(scene.export(file_type="glb"))
            original = source.read_bytes(); points = world_vertices(source)
            up_source = unit_direction([1, 2, 3])
            for up_dir in core.UP_DIRECTIONS:
                from ip_object_name.pose import _UP
                up_render = np.asarray(_UP[up_dir]) @ up_source
                target = folder / "oriented.glb"
                pose = align_glb(source, target, render_up_dir=up_dir, up_vector=up_render)
                matrix = np.asarray(pose["source_to_aligned"])
                np.testing.assert_allclose(matrix[:3, :3] @ up_source, [0, 0, 1], atol=1e-10)
                np.testing.assert_allclose(np.asarray(pose["aligned_to_source"]) @ matrix, np.eye(4), atol=1e-10)
                processed = world_vertices(target)
                expected = trimesh.transform_points(points, matrix)
                # Export can reorder nodes; compare all positions independently of order.
                np.testing.assert_allclose(np.sort(processed, axis=0), np.sort(expected, axis=0), atol=1e-5)
                self.assertAlmostEqual(processed[:, 2].min(), 0, places=5)
                self.assertEqual(source.read_bytes(), original)
                self.assertEqual(pose["processing_sha256"], hashlib.sha256(target.read_bytes()).hexdigest())
                output = trimesh.load(target, force="scene", process=False)
                self.assertEqual(len(output.graph.nodes_geometry), 2)
                self.assertEqual(len(output.geometry), 1)
                np.testing.assert_array_equal(next(iter(output.geometry.values())).visual.face_colors, mesh.visual.face_colors)

    def test_unknown_up_uses_manual_hint_and_does_not_invent_a_direction(self):
        with tempfile.TemporaryDirectory() as temporary:
            folder = Path(temporary); source = folder / "input.glb"
            source.write_bytes(trimesh.Scene(trimesh.creation.box()).export(file_type="glb"))
            pose = align_glb(source, folder / "oriented.glb", render_up_dir="-Y", up_vector=None)
            self.assertEqual(pose["status"], "manual_fallback")
            self.assertIsNone(pose["up_vector_render"])
            np.testing.assert_allclose(pose["up_vector_source"], [0, -1, 0])
            self.assertAlmostEqual(world_vertices(folder / "oriented.glb")[:, 2].min(), 0)

    def test_invalid_direction_is_rejected(self):
        for value in ([0, 0, 0], [1, 2], [float("nan"), 0, 1], [1e100, 0, 0]):
            with self.assertRaises(ValueError):
                unit_direction(value)


class PoseRequestTests(unittest.TestCase):
    def test_one_gemini_call_contains_all_existing_images_and_camera_bases(self):
        with tempfile.TemporaryDirectory() as temporary:
            image = Path(temporary) / "view.png"; image.write_bytes(recognition_fixture.PNG)
            views = [SimpleNamespace(image_path=image, camera_to_world=np.eye(4)) for _ in range(4)]
            client = MagicMock()
            client.models.generate_content.return_value = SimpleNamespace(text='{"object_name":"スタンド","up_vector":[0,2,0]}')
            with patch("ip_object_name.core._api_key", return_value="test-key"), patch("google.genai.Client") as constructor:
                constructor.return_value.__enter__.return_value = client
                result = core.request_object_analysis(views, model="configured-model")
            self.assertEqual(result, {"object_name": "スタンド", "up_vector": [0, 1, 0]})
            client.models.generate_content.assert_called_once()
            call = client.models.generate_content.call_args.kwargs
            self.assertEqual(call["model"], "configured-model")
            self.assertEqual(call["config"].response_schema["required"], ["object_name", "up_vector"])
            parts = call["contents"][0].parts
            self.assertEqual(sum(bool(part.inline_data) for part in parts), 4)
            self.assertEqual(sum("Camera basis" in (part.text or "") for part in parts), 4)
            self.assertNotIn("additional_properties", call["config"].response_schema)

    def test_unknown_or_invalid_response_does_not_trigger_a_second_request(self):
        for up, valid in ((None, True), ([0, 0, 0], False), ([1, 2], False)):
            with patch("ip_object_name.core._request_prediction", return_value={"object_name": "物体", "up_vector": up}) as request:
                if valid:
                    self.assertIsNone(core.request_object_analysis([], model="test")["up_vector"])
                else:
                    with self.assertRaises(core.VLMError):
                        core.request_object_analysis([], model="test")
                request.assert_called_once()


class PosePipelineTests(unittest.TestCase):
    setUp = recognition_fixture.RecognitionTests.setUp
    render = recognition_fixture.RecognitionTests.render
    def test_standalone_analysis_renders_once_and_keeps_original(self):
        with patch("ip_object_name.core.request_object_analysis", return_value={"object_name": "スタンド", "up_vector": [1, 1, 0]}) as analyze:
            result = core.identify_object(self.mesh_path, replace(self.settings, auto_orient=True, up_dir="-Y"))
        analyze.assert_called_once()
        self.renderer.render_mesh_auto_kinematics_views.assert_called_once()
        self.assertEqual(result["up_dir"], "+Z")
        self.assertEqual(result["source_up_dir"], "-Y")
        self.assertEqual(Path(result["original_input_mesh"]).read_bytes(), self.mesh_path.read_bytes())
        self.assertAlmostEqual(world_vertices(result["input_mesh"])[:, 2].min(), 0, places=5)

    def test_api_processing_glb_is_the_segmentation_source_and_retries_do_not_repeat_vlm(self):
        models = self.root / "models"
        observed = []
        def runner(path, names, up_dir, options):
            observed.append((path, up_dir))
            mesh = trimesh.load(path, force="mesh", process=False)
            return MeshPartition(mesh.vertices, mesh.faces, np.zeros(len(mesh.faces), dtype=np.int32), {})
        app = create_app(self.settings, models_root=models, segmentation_runner=runner)
        with TestClient(app) as client:
            registered = client.post("/models", files={"file": ("stand.glb", self.mesh_path.read_bytes())},
                                     data={"edit_request": "全体を大きく", "up_dir": "-Y", "auto_orient": "true"}).json()
            model_id = registered["model_id"]
            with patch("ip_object_name.core.request_object_analysis", return_value={"object_name": "物体", "up_vector": [0, 1, 1]}) as analyze:
                response = client.post(f"/models/{model_id}/recognize")
                self.assertEqual(response.status_code, 200, response.text)
                result = response.json()
                self.assertEqual(client.post(f"/models/{model_id}/recognize").status_code, 200)
            analyze.assert_called_once()
            self.renderer.render_mesh_auto_kinematics_views.assert_called_once()
            self.assertEqual(result["up_dir"], "+Z")
            self.assertEqual(Path(result["original_input_mesh"]).read_bytes(), self.mesh_path.read_bytes())
            self.assertNotEqual(result["input_sha256"], result["source_sha256"])
            with patch("ip_object_name.planning.request_part_plan", return_value=(part_prediction(), "test-model")):
                planned = client.post(f"/models/{model_id}/parts", json={"edit_request": "編集"})
            self.assertEqual(planned.status_code, 200, planned.text)
            segmented = client.post(f"/models/{model_id}/plans/{planned.json()['plan_id']}/segment", json={})
            self.assertEqual(segmented.status_code, 200, segmented.text)
            self.assertEqual(observed, [(Path(result["input_mesh"]), "+Z")])
            self.assertEqual(segmented.json()["orientation"], result["orientation"])
            artifacts = segmented.json()["files"]
            npz = client.get(artifacts["parts.npz"])
            with np.load(io.BytesIO(npz.content)) as arrays:
                self.assertAlmostEqual(arrays["vertices"][:, 2].min(), 0, places=5)


if __name__ == "__main__":
    unittest.main()
