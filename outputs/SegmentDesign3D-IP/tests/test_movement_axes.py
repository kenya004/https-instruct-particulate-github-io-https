from __future__ import annotations

import io
import unittest
from pathlib import Path
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from connections import detect_connections
from editing import load_editable_parts, synchronize_editor, validate_offsets
from movement_axes import boundary_plane, build_movement_frames
from test_connections import connection_fixture, prism_geometry
from test_orientation import editor_app


class MovementAxesTests(unittest.TestCase):
    def setUp(self):
        self.manifest, self.artifacts = connection_fixture()
        self.content = self.artifacts["parts.npz"]
        self.parts = load_editable_parts(self.content, self.manifest)
        self.connections, _ = detect_connections(self.content, self.parts)

    def test_plane_axes_follow_the_actual_boundary_and_form_a_right_handed_frame(self):
        frames = build_movement_frames(self.content, self.parts, self.connections, "+Z")
        for part_id, expected_normal in [(0, [-1, 0, 0]), (1, [1, 0, 0]), (2, [1, 0, 0])]:
            frame = frames[str(part_id)]
            basis = np.asarray(frame["basis"])
            np.testing.assert_allclose(basis @ basis.T, np.eye(3))
            np.testing.assert_allclose(basis[2], expected_normal)
            self.assertAlmostEqual(np.linalg.det(basis), 1)
            self.assertAlmostEqual(frame["plane_rms"], 0)
            self.assertEqual(frame["labels"], ["断面U", "断面V", "法線N"])
        np.testing.assert_array_equal(frames["1"]["basis"], [[0, 1, 0], [0, 0, 1], [1, 0, 0]])

    def test_rotated_model_uses_rotated_cut_plane_instead_of_world_xyz(self):
        vertices, faces, labels = prism_geometry()
        rotation = trimesh.transformations.rotation_matrix(.72, [1, 2, 3])[:3, :3]
        manifest, artifacts = connection_fixture(geometry=(vertices @ rotation.T, faces, labels))
        parts = load_editable_parts(artifacts["parts.npz"], manifest)
        connections, _ = detect_connections(artifacts["parts.npz"], parts)
        frames = build_movement_frames(artifacts["parts.npz"], parts, connections, "+Z")
        normal = np.asarray(frames["1"]["basis"])[2]
        np.testing.assert_allclose(normal, rotation @ [1, 0, 0], atol=1e-12)
        self.assertGreater(abs(normal[1]), .1)
        world = np.array([.3, -.7, .8])
        basis = np.asarray(frames["1"]["basis"])
        np.testing.assert_allclose(basis.T @ (basis @ world), world, atol=1e-12)

    def test_arc_length_fit_is_independent_of_edge_subdivision(self):
        loop = np.array([[0, -1, -2], [0, 1, -2], [0, 1, 2], [0, -1, 2], [0, -1, -2]], dtype=float)
        segments = np.stack([loop[:-1], loop[1:]], axis=1)
        first = boundary_plane(segments)
        fine = np.linspace(loop[0], loop[1], 101)
        refined = np.concatenate([np.stack([fine[:-1], fine[1:]], axis=1), segments[1:]])
        second = boundary_plane(refined)
        for a, b in zip(first, second):
            np.testing.assert_allclose(a, b, atol=1e-12)

    def test_choice_of_connection_is_stable_and_unconnected_parts_fall_back_to_xyz(self):
        frames = build_movement_frames(self.content, self.parts, self.connections, "+Z", {1: 1})
        self.assertEqual(frames["1"]["connection_id"], 1)
        np.testing.assert_array_equal(frames["1"]["basis"][2], [-1, 0, 0])
        fallback = build_movement_frames(b"unused", self.parts, (), "+Y")
        disabled = build_movement_frames(b"unused", self.parts, self.connections, "+Y", enabled=False)
        for collection in (fallback, disabled):
            for frame in collection.values():
                self.assertEqual(frame["labels"], ["X", "Y", "Z"])
                np.testing.assert_array_equal(frame["basis"], np.eye(3))
        with self.assertRaises(ValueError):
            build_movement_frames(self.content, self.parts, self.connections, "+Z", {0: 1})
        with self.assertRaises(ValueError):
            boundary_plane([[[0, 0, 0], [1, 0, 0]], [[1, 0, 0], [2, 0, 0]]])

    def test_local_limits_accept_oblique_motion_and_frame_switch_keeps_the_position(self):
        frames = build_movement_frames(self.content, self.parts, self.connections, "+Z")
        angle = .4
        basis = np.array([[np.cos(angle), -np.sin(angle), 0], [np.sin(angle), np.cos(angle), 0], [0, 0, 1]])
        frames["1"] = {**frames["1"], "basis": basis.tolist()}
        offsets = {str(part.part_id): [0, 0, 0] for part in self.parts}
        offsets["1"] = (basis.T @ [2.9, 2.9, 0]).tolist()
        self.assertGreater(max(abs(value) for value in offsets["1"]), 3)
        validate_offsets(self.parts, offsets, limit=3, movement_frames=frames)
        with self.assertRaises(ValueError):
            validate_offsets(self.parts, offsets, limit=3)
        state = {"source_key": "test", "sequence": 0, "scales": {"0": 1, "1": 1, "2": 1}, "offsets": offsets}
        frames["1"]["basis"] = np.eye(3).tolist()
        synchronize_editor(state, "test", self.parts, {"source_key": "test", "sequence": 1, "scales": state["scales"], "offsets": offsets}, movement_frames=frames)
        np.testing.assert_array_equal(state["offsets"]["1"], offsets["1"])


class MovementAxesInterfaceTests(unittest.TestCase):
    def test_axes_are_available_for_every_part_and_changing_frame_preserves_manual_motion(self):
        manifest, artifacts = connection_fixture()
        app = AppTest.from_function(editor_app, args=(manifest, artifacts["parts.npz"])).run()
        self.assertEqual(len(app.exception), 0)
        source = app.session_state["part_editing"]["source_key"]
        self.assertEqual(app.selectbox(key=f"movement_mode_{source}").value, "断面の近似平面")
        with patch("part_editor._component", return_value=None) as component:
            app.run()
        frames = component.call_args.kwargs["movement_frames"]
        self.assertEqual(len(frames), 3)
        self.assertTrue(component.call_args.kwargs["show_movement_axes"])
        displacement = (np.asarray(frames["1"]["basis"]).T @ [.2, -.3, .4]).tolist()
        event = {"source_key": source, "sequence": 1, "scales": {"0": 1, "1": 1, "2": 1},
                 "offsets": {"0": [0, 0, 0], "1": displacement, "2": [0, 0, 0]}}
        before = app.session_state["part_editing"]["edited_parts"][1].vertices.copy()
        with patch("part_editor._component", return_value=event):
            app.run()
        np.testing.assert_allclose(app.session_state["part_editing"]["edited_parts"][1].vertices, before + displacement)
        for control, value in [(f"movement_connection_{source}_1", 1), (f"movement_mode_{source}", "入力XYZ")]:
            app.selectbox(key=control).set_value(value).run()
            np.testing.assert_allclose(app.session_state["part_editing"]["edited_parts"][1].vertices, before + displacement)
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.error), 0)


if __name__ == "__main__":
    unittest.main()
