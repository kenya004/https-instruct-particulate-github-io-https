from __future__ import annotations

import io
import json
import sys
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import numpy as np
import trimesh
from fastapi.testclient import TestClient
from filelock import FileLock

from ip_object_name import core
from ip_object_name.segmentation import InstructParticulateSegmenter, MeshPartition, SegmentationOptions, export_partition
from ip_object_name.store import ModelStore, write_json
from ip_object_name.workflow_api import create_app


class SegmentationTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.mesh = trimesh.creation.box(extents=[2, 4, 6])
        self.mesh.apply_translation([10, -20, 30])
        self.source = self.root / "source.glb"
        self.source.write_bytes(trimesh.Scene(self.mesh).export(file_type="glb"))
        self.store = ModelStore(self.root / "models")
        self.metadata = self.store.register(self.source, up_dir="+Y")
        self.metadata.update(status="completed", object_name="test object")
        self.store.save(self.metadata)
        self.model_id = self.metadata["model_id"]
        self.plan_id = "b" * 32
        self.folder = Path(self.metadata["input_mesh"]).parent / "planning" / self.plan_id
        self.plan = {
            "model_id": self.model_id, "plan_id": self.plan_id, "source_sha256": self.metadata["source_sha256"],
            "status": "planned", "summary": "test", "warnings": [],
            "parts": [
                {"part_id": 0, "name": "first", "label": "first", "description": "first region", "is_edit_target": True},
                {"part_id": 1, "name": "second", "label": "second", "description": "second region", "is_edit_target": False},
                {"part_id": 2, "name": "empty", "label": "empty", "description": "third region", "is_edit_target": False},
            ],
        }
        write_json(self.folder / "part_plan.json", self.plan)
        self.partition = MeshPartition(self.mesh.vertices.copy(), self.mesh.faces.copy(), np.arange(len(self.mesh.faces)) % 2, {"test_runner": True})
        self.runner = MagicMock(return_value=self.partition)
        settings = core.Settings(self.root / "repo", self.root / "legacy")
        self.client = TestClient(create_app(settings, models_root=self.store.root, segmentation_runner=self.runner))
        self.addCleanup(self.client.close)
        self.endpoint = f"/models/{self.model_id}/plans/{self.plan_id}/segment"

    def segment(self):
        response = self.client.post(self.endpoint, json={})
        self.assertEqual(response.status_code, 200, response.text)
        return response.json()

    def test_api_exports_independent_meshes_and_preserves_all_faces_and_ids(self):
        result = self.segment()
        self.assertEqual([part["part_id"] for part in result["parts"]], [0, 1, 2])
        self.assertEqual([part["face_count"] for part in result["parts"]], [6, 6, 0])
        self.assertIsNone(result["parts"][2]["geometry_name"])
        self.assertTrue(any("empty" in warning for warning in result["warnings"]))
        self.assertTrue(result["full_face_coverage"])
        self.runner.assert_called_once_with(Path(self.metadata["input_mesh"]), ["first", "second", "empty"], "+Y", SegmentationOptions())
        glb_response = self.client.get(result["files"]["parts.glb"])
        self.assertEqual(glb_response.status_code, 200)
        scene = trimesh.load(io.BytesIO(glb_response.content), file_type="glb", process=False)
        self.assertEqual(set(scene.geometry), {"part_0000", "part_0001"})
        self.assertEqual(len(scene.graph.nodes_geometry), 2)
        np.testing.assert_allclose(scene.bounds, self.mesh.bounds, atol=1e-6)
        self.assertEqual(sum(len(mesh.faces) for mesh in scene.geometry.values()), len(self.mesh.faces))
        for record in result["parts"][:2]:
            transform, name = scene.graph[record["node_name"]]
            np.testing.assert_allclose(transform, np.eye(4))
            self.assertEqual(name, record["geometry_name"])
        before = scene.geometry["part_0001"].vertices.copy()
        scene.geometry["part_0000"].vertices += 100
        np.testing.assert_array_equal(scene.geometry["part_0001"].vertices, before)
        npz_response = self.client.get(result["files"]["parts.npz"])
        with np.load(io.BytesIO(npz_response.content), allow_pickle=False) as data:
            np.testing.assert_array_equal(data["face_part_ids"], self.partition.face_part_ids)
            all_indices = []
            for index in range(3):
                prefix = f"part_{index:04d}"
                original_indices = data[f"{prefix}_source_face_indices"]
                original_vertices = data[f"{prefix}_source_vertex_indices"]
                local_faces = data[f"{prefix}_faces"]
                np.testing.assert_array_equal(original_vertices[local_faces], data["faces"][original_indices])
                np.testing.assert_array_equal(data[f"{prefix}_vertices"], data["vertices"][original_vertices])
                all_indices.extend(original_indices.tolist())
            self.assertEqual(sorted(all_indices), list(range(len(self.mesh.faces))))
        self.assertEqual(self.client.get(result["files"]["parts.json"]).json(), result)
        self.assertEqual(Path(self.metadata["input_mesh"]).read_bytes(), self.source.read_bytes())

    def test_each_execution_has_a_new_id_and_preserves_old_artifacts(self):
        first, second = self.segment(), self.segment()
        self.assertNotEqual(first["segmentation_id"], second["segmentation_id"])
        self.assertEqual(first["plan_id"], second["plan_id"])
        self.assertEqual(self.client.get(first["files"]["parts.glb"]).status_code, 200)
        saved = json.loads((self.folder / "segmentation.json").read_text(encoding="utf-8"))
        self.assertEqual(saved["segmentation_id"], second["segmentation_id"])

    def test_connectivity_defaults_on_and_can_be_disabled(self):
        self.assertTrue(SegmentationOptions().enforce_connectivity_per_part)
        result = self.segment()
        self.assertTrue(result["options"]["enforce_connectivity_per_part"])
        self.assertTrue(self.runner.call_args.args[3].enforce_connectivity_per_part)
        response = self.client.post(self.endpoint, json={"enforce_connectivity_per_part": False})
        self.assertEqual(response.status_code, 200, response.text)
        self.assertFalse(response.json()["options"]["enforce_connectivity_per_part"])
        self.assertFalse(self.runner.call_args.args[3].enforce_connectivity_per_part)

    def test_plan_is_bound_to_model_and_source(self):
        self.plan["model_id"] = "f" * 32
        write_json(self.folder / "part_plan.json", self.plan)
        self.assertEqual(self.client.post(self.endpoint, json={}).status_code, 422)
        self.runner.assert_not_called()

    def test_changed_source_cannot_be_segmented(self):
        Path(self.metadata["input_mesh"]).write_bytes(b"changed")
        self.assertEqual(self.client.post(self.endpoint, json={}).status_code, 422)
        self.runner.assert_not_called()

    def test_invalid_requests_and_busy_store(self):
        for value in ({"points_per_face": 0}, {"query_batch_size": 1}):
            self.assertEqual(self.client.post(self.endpoint, json=value).status_code, 422)
        self.assertEqual(self.client.post(self.endpoint.replace(self.plan_id, "invalid"), json={}).status_code, 422)
        self.assertEqual(self.client.post(self.endpoint.replace(self.plan_id, "c" * 32), json={}).status_code, 404)
        with FileLock(self.store.root / ".watch.lock", timeout=0):
            self.assertEqual(self.client.post(self.endpoint, json={}).status_code, 409)
        self.runner.assert_not_called()

    def test_failure_keeps_input_name_plan_and_does_not_serve_partial_outputs(self):
        self.runner.side_effect = RuntimeError("GPU failure")
        response = self.client.post(self.endpoint, json={})
        self.assertEqual(response.status_code, 502)
        current = self.store.get(self.model_id)
        self.assertEqual(current["status"], "completed")
        self.assertEqual(current["segmentation_status"], "failed")
        self.assertTrue((self.folder / "part_plan.json").is_file())
        run_id = current["latest_segmentation_id"]
        self.assertTrue((self.folder / "segmentations" / run_id / "error.json").is_file())
        path = f"/models/{self.model_id}/plans/{self.plan_id}/segmentations/{run_id}/files/parts.glb"
        self.assertEqual(self.client.get(path).status_code, 404)

    def test_artifacts_are_scoped_and_allowlisted(self):
        result = self.segment()
        path = result["files"]["parts.glb"]
        self.assertEqual(self.client.get(path.replace("parts.glb", "request.json")).status_code, 404)
        self.assertEqual(self.client.get(path.replace(result["segmentation_id"], "invalid")).status_code, 422)
        self.assertEqual(self.client.get(path.replace(self.plan_id, "c" * 32)).status_code, 404)

    def test_export_rejects_unassigned_or_invalid_faces(self):
        for labels in (np.full(len(self.mesh.faces), -1), np.full(len(self.mesh.faces), 3), np.zeros(1), np.zeros(len(self.mesh.faces))):
            with self.subTest(labels=labels.dtype):
                partition = MeshPartition(self.mesh.vertices, self.mesh.faces, labels, {})
                with self.assertRaises(ValueError):
                    export_partition(partition, self.plan, self.root / "bad", "d" * 32)


class UpstreamAdapterTests(unittest.TestCase):
    def test_whole_object_partition_skips_gpu_inference(self):
        mesh = trimesh.creation.box()
        app = MagicMock()
        app._prepare_geometry.return_value = SimpleNamespace(original_mesh=mesh, up_dir_rotation=np.eye(3), center=[0, 0, 0], scale=1)
        runner = InstructParticulateSegmenter(Path("missing-repo"))
        runner._app, runner._module = app, MagicMock()
        with patch.dict(sys.modules, {"torch": MagicMock()}):
            result = runner(Path("input.glb"), ["whole object"], "+Z", SegmentationOptions())
        app._ensure_model_loaded.assert_not_called()
        np.testing.assert_array_equal(result.face_part_ids, np.zeros(12, dtype=np.int32))
        self.assertTrue(result.diagnostics["single_part_passthrough"])

    def test_segmentation_disables_joints_and_restores_input_coordinates(self):
        source = trimesh.creation.box()
        source.apply_translation([10, 20, 30])
        rotation = trimesh.transformations.rotation_matrix(np.pi / 2, [1, 0, 0])
        rotated = source.copy()
        rotated.apply_transform(rotation)
        geometry = SimpleNamespace(original_mesh=rotated, normalized_mesh=rotated.copy(), up_dir_rotation=rotation[:3, :3], center=[1, 2, 3], scale=2)
        app = MagicMock(num_shape_points=100, sharp_point_ratio=0.1, checkpoint_path=Path("checkpoint.pt"))
        app._prepare_geometry.return_value = geometry
        app._ensure_model_loaded.return_value = (object(), "cuda")
        module = MagicMock()
        module.prepare_inference_batch_from_mesh.return_value = ({"test": "batch"}, np.arange(12))
        module.decode_face_part_ids.return_value = (np.arange(12) % 2, None)
        tensor = MagicMock()
        tensor.__getitem__.return_value = tensor
        tensor.detach.return_value = tensor
        tensor.cpu.return_value = tensor
        tensor.numpy.return_value = np.tile([0.6, 0.4], (12, 1))
        torch = MagicMock()
        torch.softmax.return_value = tensor
        torch.cuda.OutOfMemoryError = type("OutOfMemoryError", (RuntimeError,), {})
        runner = InstructParticulateSegmenter(Path("missing-repo"))
        runner._app, runner._module = app, module
        with patch.dict(sys.modules, {"torch": torch}):
            result = runner(Path("input.glb"), ["first", "second"], "+Y", SegmentationOptions())
        np.testing.assert_allclose(result.vertices, source.vertices)
        np.testing.assert_array_equal(result.faces, source.faces)
        self.assertEqual(module.prepare_inference_batch_from_mesh.call_args.kwargs["joint_specs"], [])
        self.assertFalse(module.run_batched_model_inference.call_args.kwargs["decode_joint_parameters"])
        self.assertEqual(module.prepare_inference_batch_from_mesh.call_args.kwargs["link_names"], ["first", "second"])


if __name__ == "__main__":
    unittest.main()
