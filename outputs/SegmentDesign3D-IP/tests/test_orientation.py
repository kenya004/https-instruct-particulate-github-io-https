from __future__ import annotations

import base64
import copy
import json
import unittest
from pathlib import Path
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from backend_client import BackendClient
from orientation import CAMERA_EYE, display_axis_titles, orient_bounds, orient_points, source_to_display
from test_connections import connection_fixture
from test_preparation import part_plan
from viewer import load_mesh_payloads, mesh_figure


DIRECTIONS = ("+Z", "-Z", "+Y", "-Y", "+X", "-X")


def chart_vertices(chart):
    trace = json.loads(chart.proto.spec)["data"][0]
    def decode(value):
        if isinstance(value, dict):
            return np.frombuffer(base64.b64decode(value["bdata"]), dtype=value["dtype"])
        return np.asarray(value)
    return np.column_stack([decode(trace[axis]) for axis in "xyz"])


def editor_app(manifest, content):
    import streamlit as st
    from part_editor import render_part_editor
    direction = st.selectbox("検証用の上方向", ["+Z", "-Z", "+Y", "-Y", "+X", "-X"], key="test_up_dir")
    render_part_editor(manifest, content, direction)


class OrientationTests(unittest.TestCase):
    def setUp(self):
        mesh = trimesh.creation.box(extents=[2, 4, 8])
        mesh.apply_translation([10, 20, 30])
        self.content = trimesh.Scene(mesh).export(file_type="glb")
        self.meshes = load_mesh_payloads(self.content)
        self.vertices = np.asarray(self.meshes[0]["vertices"])

    def test_six_declared_up_axes_map_to_positive_z_and_round_trip_without_reflection(self):
        for direction in DIRECTIONS:
            rotation = source_to_display(direction)
            up = np.zeros(3)
            up["XYZ".index(direction[-1])] = 1 if direction[0] == "+" else -1
            np.testing.assert_array_equal(rotation @ up, [0, 0, 1])
            np.testing.assert_array_equal(rotation.T @ rotation, np.eye(3))
            self.assertAlmostEqual(np.linalg.det(rotation), 1)
            np.testing.assert_array_equal(orient_points(self.vertices, direction) @ rotation, self.vertices)
        # Match the upstream +Y -> +Z rotation, including its horizontal axes.
        np.testing.assert_array_equal(orient_points([[1, 2, 3]], "+Y"), [[1, -3, 2]])
        np.testing.assert_array_equal(orient_points([[1, 2, 3]], "-X"), [[3, 2, -1]])

    def test_preview_rotates_geometry_not_just_camera_and_preserves_source(self):
        original = copy.deepcopy(self.meshes)
        for direction in DIRECTIONS:
            figure = mesh_figure(self.meshes, up_dir=direction)
            shown = np.column_stack([figure.data[0].x, figure.data[0].y, figure.data[0].z])
            np.testing.assert_array_equal(shown, orient_points(self.vertices, direction))
            self.assertEqual(figure.layout.scene.camera.up.to_plotly_json(), {"x": 0, "y": 0, "z": 1})
            self.assertEqual(figure.layout.scene.camera.eye.to_plotly_json(), CAMERA_EYE)
            self.assertEqual(figure.layout.scene.dragmode, "turntable")
            self.assertEqual(figure.layout.scene.zaxis.title.text, display_axis_titles(direction)[2])
        self.assertEqual(self.meshes, original)

    def test_fixed_bounds_and_face_colors_follow_the_same_rotation(self):
        mesh = {**self.meshes[0], "face_colors": ["#168b83"] * (len(self.meshes[0]["faces"]) // 4)}
        bounds = np.array([self.vertices.min(axis=0), self.vertices.max(axis=0)])
        for direction in DIRECTIONS:
            rotated = orient_points(self.vertices, direction)
            expected = np.array([rotated.min(axis=0), rotated.max(axis=0)])
            np.testing.assert_array_equal(orient_bounds(bounds, direction), expected)
            figure = mesh_figure([mesh], up_dir=direction, bounds=bounds)
            for axis, lower, upper in zip("xyz", *expected):
                limits = getattr(figure.layout.scene, axis + "axis").range
                self.assertLess(limits[0], lower)
                self.assertGreater(limits[1], upper)
            self.assertEqual(list(figure.data[0].facecolor), mesh["face_colors"])
        self.assertEqual(display_axis_titles("+Y"), ["X", "-Z", "Y（上）"])

    def test_view_revision_changes_only_when_the_up_direction_changes(self):
        first = mesh_figure(self.meshes, up_dir="+Z")
        second = mesh_figure(self.meshes, up_dir="+Y")
        again = mesh_figure(self.meshes, up_dir="+Z")
        self.assertNotEqual(first.layout.scene.uirevision, second.layout.scene.uirevision)
        self.assertEqual(first.layout.scene.uirevision, again.layout.scene.uirevision)
        for invalid in ("Y", "", None, "++Z"):
            with self.subTest(invalid=invalid), self.assertRaises(ValueError):
                source_to_display(invalid)


class OrientationInterfaceTests(unittest.TestCase):
    def test_input_direction_rotates_preview_and_resets_preparation_then_reaches_backend(self):
        mesh = trimesh.creation.box(extents=[2, 4, 8])
        mesh.apply_translation([10, 20, 30])
        content = trimesh.Scene(mesh).export(file_type="glb")
        original = np.asarray(load_mesh_payloads(content)[0]["vertices"])
        app = AppTest.from_file(str(Path(__file__).resolve().parents[1] / "app.py")).run()
        app.get("file_uploader")[0].set_value(("asymmetric.glb", content, "model/gltf-binary")).run()
        app.text_area[0].set_value("Make the handle longer.").run()
        ids = set()
        for direction in DIRECTIONS:
            app.selectbox(key="up_dir").set_value(direction).run()
            self.assertEqual(len(app.exception), 0)
            self.assertNotIn("plan", app.session_state["preparation"])
            np.testing.assert_array_equal(chart_vertices(app.get("plotly_chart")[0]), orient_points(original, direction))
            ids.add(app.get("plotly_chart")[0].proto.id)
            with patch.object(BackendClient, "register", return_value={"model_id": "a" * 32}) as register, patch.object(BackendClient, "recognize", return_value={"object_name": "object"}), patch.object(BackendClient, "plan", return_value=part_plan()):
                app.button[0].click().run()
            self.assertEqual(register.call_args.args[-1], direction)
            self.assertIn("plan", app.session_state["preparation"])
        self.assertEqual(len(ids), 6)
        self.assertEqual(app.get("file_uploader")[0].value.getvalue(), content)

    def test_editing_and_rejoined_preview_share_direction_without_rotating_exported_data(self):
        manifest, artifacts = connection_fixture()
        app = AppTest.from_function(editor_app, args=(manifest, artifacts["parts.npz"])).run()
        state = app.session_state["part_editing"]
        event = {"source_key": state["source_key"], "sequence": 1, "scales": {"0": 1, "1": 1.5, "2": 1}}
        with patch("part_editor._component", return_value=event):
            app.run()
        app.button(key="rejoin_mesh").click().run()
        saved = app.session_state["part_editing"]["rejoined"]
        vertices, glb, npz = saved["result"].mesh.vertices.copy(), saved["glb"], saved["npz"]
        edited = [part.vertices.copy() for part in app.session_state["part_editing"]["edited_parts"]]
        for direction in DIRECTIONS:
            with patch("part_editor._component", return_value=None) as component:
                app.selectbox(key="test_up_dir").set_value(direction).run()
            self.assertEqual(len(app.exception), 0)
            self.assertEqual(component.call_args.kwargs["up_dir"], direction)
            np.testing.assert_array_equal(chart_vertices(app.get("plotly_chart")[0]), orient_points(vertices, direction))
            current = app.session_state["part_editing"]
            self.assertEqual(current["rejoined"]["glb"], glb)
            self.assertEqual(current["rejoined"]["npz"], npz)
            for part, expected in zip(current["edited_parts"], edited):
                np.testing.assert_array_equal(part.vertices, expected)


if __name__ == "__main__":
    unittest.main()
