from __future__ import annotations

import io
import unittest
from dataclasses import replace
from pathlib import Path
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from backend_client import BackendClient
from connections import build_connection_plan, detect_connections, follow_connections
from editing import export_edited_glb, load_editable_parts, scale_parts, synchronize_editor, translate_parts, translation_controls, validate_offsets
from test_connections import connection_fixture
from test_preparation import part_plan


class TranslationTests(unittest.TestCase):
    def setUp(self):
        self.manifest, self.artifacts = connection_fixture()
        self.parts = load_editable_parts(self.artifacts["parts.npz"], self.manifest)
        self.zero = {str(part.part_id): [0, 0, 0] for part in self.parts}

    def test_independent_xyz_offsets_keep_shapes_and_other_parts(self):
        offsets = {**self.zero, "1": [1.25, -.5, .75]}
        moved = translate_parts(self.parts, offsets)
        np.testing.assert_array_equal(moved[0].vertices, self.parts[0].vertices)
        np.testing.assert_array_equal(moved[2].vertices, self.parts[2].vertices)
        np.testing.assert_allclose(moved[1].vertices, self.parts[1].vertices + [1.25, -.5, .75])
        np.testing.assert_allclose(np.ptp(moved[1].vertices, axis=0), np.ptp(self.parts[1].vertices, axis=0))
        np.testing.assert_array_equal(moved[1].faces, self.parts[1].faces)
        self.assertFalse(self.parts[1].vertices.flags.writeable)

    def test_manual_root_movement_is_not_propagated_through_attachment_tree(self):
        connections, _ = detect_connections(self.artifacts["parts.npz"], self.parts)
        scaled, automatic = follow_connections(self.parts, {"0": 2, "1": 1, "2": 1}, build_connection_plan(self.parts, connections, 0))
        moved = translate_parts(scaled, {**self.zero, "0": [0, 2, 0], "1": [0, 0, 1]})
        np.testing.assert_allclose(moved[0].center, [10.5, 22, 30])
        np.testing.assert_allclose(moved[1].center, [12, 20, 31])
        np.testing.assert_allclose(moved[2].center, [13, 20, 30])
        np.testing.assert_allclose(automatic[2], [.5, 0, 0])

    def test_zero_restores_original_without_accumulating_movement(self):
        for offset in ([1, -2, 3], [-2, 1, 0], [0, 0, 0]):
            moved = translate_parts(scale_parts(self.parts, {"0": 1, "1": 1, "2": 1}), {**self.zero, "1": offset})
        np.testing.assert_array_equal(moved[1].vertices, self.parts[1].vertices)

    def test_range_and_step_follow_input_size_not_world_position_or_scaling(self):
        self.assertEqual(translation_controls(self.parts), {"limit": 3, "step": .003})
        shifted = tuple(replace(part, vertices=part.vertices + [1000, -500, 900]) for part in self.parts)
        self.assertEqual(translation_controls(shifted), translation_controls(self.parts))
        larger = tuple(replace(part, vertices=part.vertices * 10) for part in self.parts)
        self.assertEqual(translation_controls(larger), {"limit": 30, "step": .03})

    def test_invalid_and_empty_part_offsets_are_rejected(self):
        for value in ([1, 2], [0, 0, True], [0, 0, "1"], [float("nan"), 0, 0], [0, float("inf"), 0], 1):
            with self.subTest(value=value), self.assertRaises(ValueError):
                validate_offsets(self.parts, {**self.zero, "1": value})
        with self.assertRaises(ValueError):
            validate_offsets(self.parts, {"1": [0, 0, 0]})
        with self.assertRaises(ValueError):
            validate_offsets(self.parts, {**self.zero, "1": [3.1, 0, 0]}, limit=3)
        empty = replace(self.parts[0], part_id=7, vertices=np.zeros((0, 3)), faces=np.zeros((0, 3), dtype=int))
        self.assertEqual(validate_offsets(self.parts + (empty,), {**self.zero, "7": [0, 0, 0]})["7"], [0, 0, 0])
        with self.assertRaises(ValueError):
            validate_offsets(self.parts + (empty,), {**self.zero, "7": [1, 0, 0]})

    def test_state_resets_offsets_and_ignores_stale_events_atomically(self):
        state = {}
        event = {"source_key": "source", "sequence": 2, "scales": {"0": 1, "1": 1, "2": 1}, "offsets": {**self.zero, "1": [.3, -.6, .9]}}
        synchronize_editor(state, "source", self.parts, event)
        synchronize_editor(state, "source", self.parts, {**event, "sequence": 1, "offsets": self.zero})
        self.assertEqual(state["offsets"]["1"], [.3, -.6, .9])
        with self.assertRaises(ValueError):
            synchronize_editor(state, "source", self.parts, {**event, "sequence": 3, "scales": {"0": 2, "1": 2, "2": 2}, "offsets": {**self.zero, "1": [30, 0, 0]}})
        self.assertEqual(state["scales"]["0"], 1)
        self.assertEqual(state["sequence"], 2)
        synchronize_editor(state, "other", self.parts, event)
        self.assertEqual(state["offsets"], self.zero)

    def test_existing_session_with_missing_or_null_offsets_migrates_without_losing_scale(self):
        for extra in ({}, {"offsets": None}):
            state = {"source_key": "source", "sequence": 3, "scales": {"0": 1, "1": 2, "2": 1}, **extra}
            synchronize_editor(state, "source", self.parts)
            self.assertEqual(state["offsets"], self.zero)
            self.assertEqual(state["scales"]["1"], 2)
            self.assertEqual(state["sequence"], 3)

    def test_export_has_translated_vertices_and_manual_offset_metadata(self):
        offsets = {**self.zero, "1": [.3, -.6, .9]}
        moved = translate_parts(self.parts, offsets)
        blob = export_edited_glb(moved, source_key="source", scales={"0": 1, "1": 1, "2": 1}, offsets=offsets)
        scene = trimesh.load(io.BytesIO(blob), file_type="glb", process=False)
        np.testing.assert_allclose(scene.geometry["part_0001"].bounds.mean(axis=0), [11.8, 19.4, 30.9], atol=2e-6)
        self.assertEqual(scene.metadata["manual_translations"], offsets)


class TranslationInterfaceTests(unittest.TestCase):
    def test_manual_movement_breaks_contact_and_updates_rejoined_geometry(self):
        manifest, artifacts = connection_fixture()
        app = AppTest.from_file(str(Path(__file__).resolve().parents[1] / "app.py")).run()
        app.get("file_uploader")[0].set_value(("input.glb", artifacts["parts.glb"], "model/gltf-binary")).run()
        app.text_area[0].set_value("Move middle.").run()
        plan = {**part_plan("Move middle."), "parts": manifest["parts"]}
        with patch.object(BackendClient, "register", return_value={"model_id": "a" * 32}), patch.object(BackendClient, "recognize", return_value={"object_name": "object"}), patch.object(BackendClient, "plan", return_value=plan):
            app.button[0].click().run()
        with patch.object(BackendClient, "segment", return_value=manifest), patch.object(BackendClient, "download_artifact", side_effect=lambda result, name: artifacts[name]):
            app.button(key="segment").click().run()
        source = app.session_state["part_editing"]["source_key"]
        app.selectbox(key=f"connection_root_{source}").set_value(1).run()
        zero = {"0": [0, 0, 0], "1": [0, 0, 0], "2": [0, 0, 0]}
        event = {"source_key": source, "sequence": 1, "scales": {"0": 1, "1": 2, "2": 1}, "offsets": {**zero, "1": [.4, -.6, .2]}}
        with patch("part_editor._component", return_value=event):
            app.run()
        state = app.session_state["part_editing"]
        np.testing.assert_allclose(state["edited_parts"][0].center, [10, 20, 30])
        np.testing.assert_allclose(state["edited_parts"][1].center, [11.9, 19.4, 30.2])
        np.testing.assert_allclose(state["edited_parts"][2].center, [13, 20, 30])
        self.assertTrue(state["connections"]["enabled"])
        self.assertTrue(all(value > .7 for value in state["connections"]["anchor_residuals"].values()))
        app.button(key="rejoin_mesh").click().run()
        joined = app.session_state["part_editing"]["rejoined"]["result"]
        with np.load(io.BytesIO(artifacts["parts.npz"])) as data:
            ids = data["part_0001_source_face_indices"]
        np.testing.assert_allclose(joined.mesh.vertices[joined.mesh.faces[ids]], state["edited_parts"][1].vertices[state["edited_parts"][1].faces])
        event = {**event, "sequence": 2, "offsets": zero}
        with patch("part_editor._component", return_value=event):
            app.run()
        self.assertNotIn("rejoined", app.session_state["part_editing"])
        app.checkbox(key=f"connection_follow_{source}").set_value(False).run()
        event = {**event, "sequence": 3, "offsets": {**zero, "1": [0, 1, 0]}}
        with patch("part_editor._component", return_value=event):
            app.run()
        np.testing.assert_allclose(app.session_state["part_editing"]["edited_parts"][1].center, [11.5, 21, 30])
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.error), 0)


if __name__ == "__main__":
    unittest.main()
