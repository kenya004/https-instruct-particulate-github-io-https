from __future__ import annotations

import copy
import io
import unittest
from pathlib import Path
from unittest.mock import MagicMock, patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from backend_client import BackendClient
from orientation import aligned_mesh_payloads, orient_points
from test_connections import connection_fixture, prism_geometry
from test_orientation import chart_vertices
from test_preparation import part_plan
from viewer import load_mesh_payloads
from workflow import prepare_parts


def pose_fixture():
    transform = trimesh.transformations.rotation_matrix(.7, [1, 2, 3])
    transform[:3, 3] = [2, -5, -9]
    return {"applied": True, "status": "estimated", "source_to_aligned": transform.tolist(),
            "aligned_to_source": np.linalg.inv(transform).tolist(), "ground_z": 0.0}


class AutoOrientationTests(unittest.TestCase):
    def test_preview_transform_is_applied_once_without_mutating_original(self):
        meshes = load_mesh_payloads(trimesh.Scene(trimesh.creation.box()).export(file_type="glb"))
        original = copy.deepcopy(meshes); pose = pose_fixture()
        a = aligned_mesh_payloads(meshes, pose); b = aligned_mesh_payloads(meshes, pose)
        expected = trimesh.transform_points(np.asarray(meshes[0]["vertices"]), np.asarray(pose["source_to_aligned"]))
        np.testing.assert_allclose(a[0]["vertices"], expected)
        self.assertEqual(a, b)
        self.assertEqual(meshes, original)
        self.assertIs(aligned_mesh_payloads(meshes, None), meshes)
        with self.assertRaises(ValueError):
            aligned_mesh_payloads(meshes, {"applied": True, "source_to_aligned": np.zeros((4, 4)).tolist()})

    def test_name_request_keeps_pose_for_retry_and_switching_auto_mode_registers_again(self):
        client = MagicMock(base_url="http://localhost:8004")
        client.register.return_value = {"model_id": "a" * 32}
        pose = pose_fixture()
        client.recognize.return_value = {"object_name": "物体", "up_dir": "+Z", "orientation": pose}
        client.plan.return_value = part_plan()
        arguments = dict(filename="input.glb", content=b"opaque-test-input", edit_request="edit", up_dir="-Y", progress=lambda _: None)
        state = {}
        prepare_parts(state, client, **arguments)
        prepare_parts(state, client, **arguments)
        self.assertEqual(client.recognize.call_count, 1)
        self.assertEqual(state["orientation"], pose)
        self.assertEqual(state["model_up_dir"], "+Z")
        prepare_parts(state, client, **arguments, auto_orient=False)
        self.assertEqual(client.recognize.call_count, 2)
        self.assertEqual(client.register.call_args.kwargs["auto_orient"], False)

    def test_input_segmentation_editor_and_joined_views_share_processing_z_up_coordinates(self):
        vertices, faces, labels = prism_geometry(2)
        vertices[:, 2] -= vertices[:, 2].min()
        manifest, artifacts = connection_fixture(geometry=(vertices, faces, labels))
        scene = trimesh.load(io.BytesIO(artifacts["parts.glb"]), file_type="glb", force="scene", process=False)
        pose = pose_fixture()
        scene.apply_transform(np.asarray(pose["aligned_to_source"]))
        content = scene.export(file_type="glb")
        path = Path(__file__).resolve().parents[1] / "app.py"
        app = AppTest.from_file(str(path), default_timeout=10).run()
        app.get("file_uploader")[0].set_value(("input.glb", content, "model/gltf-binary")).run()
        app.selectbox(key="up_dir").set_value("-X").run()
        app.text_area[0].set_value("edit").run()
        with patch.object(BackendClient, "register", return_value={"model_id": "a" * 32}) as register, \
             patch.object(BackendClient, "recognize", return_value={"object_name": "物体", "up_dir": "+Z", "orientation": pose}), \
             patch.object(BackendClient, "plan", return_value=part_plan("edit")):
            app.button[0].click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertTrue(register.call_args.kwargs["auto_orient"])
        expected = aligned_mesh_payloads(load_mesh_payloads(content), pose)
        np.testing.assert_allclose(chart_vertices(app.get("plotly_chart")[0]), expected[0]["vertices"], atol=1e-6)
        with patch.object(BackendClient, "segment", return_value=manifest), \
             patch.object(BackendClient, "download_artifact", side_effect=lambda result, name: artifacts[name]), \
             patch("part_editor._component", return_value=None) as component:
            app.button(key="segment").click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.error), 0)
        self.assertEqual(component.call_args.kwargs["up_dir"], "+Z")
        shown = load_mesh_payloads(artifacts["parts.glb"])[0]["vertices"]
        np.testing.assert_allclose(chart_vertices(app.get("plotly_chart")[1]), shown)
        app.button(key="rejoin_mesh").click().run()
        self.assertEqual(len(app.exception), 0)
        joined = app.session_state["part_editing"]["rejoined"]["result"]
        np.testing.assert_allclose(chart_vertices(app.get("plotly_chart")[-1]), joined.mesh.vertices)
        app.toggle(key="auto_orient").set_value(False).run()
        self.assertEqual(len(app.exception), 0)
        self.assertNotIn("model_id", app.session_state["preparation"])
        original = load_mesh_payloads(content)[0]["vertices"]
        np.testing.assert_allclose(chart_vertices(app.get("plotly_chart")[0]), orient_points(original, "-X"))
        self.assertEqual(app.get("file_uploader")[0].value.getvalue(), content)


if __name__ == "__main__":
    unittest.main()
