from __future__ import annotations

import io
import json
import unittest
from pathlib import Path
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from backend_client import BackendClient
from editing import EditablePart, editor_payload, editor_source_key, export_edited_glb, load_editable_parts, scale_parts, synchronize_editor, validate_scales
from test_preparation import part_plan
from test_segmentation import segmentation_fixture


class EditingTests(unittest.TestCase):
    def setUp(self):
        self.manifest, self.artifacts = segmentation_fixture()
        self.parts = load_editable_parts(self.artifacts["parts.npz"], self.manifest)

    def test_independent_uniform_scale_keeps_bbox_center_and_faces(self):
        edited = scale_parts(self.parts, {"0": 2, "1": 1})
        np.testing.assert_allclose(edited[0].center, self.parts[0].center)
        np.testing.assert_allclose(np.ptp(edited[0].vertices, axis=0), 2 * np.ptp(self.parts[0].vertices, axis=0))
        np.testing.assert_array_equal(edited[1].vertices, self.parts[1].vertices)
        np.testing.assert_array_equal(edited[0].faces, self.parts[0].faces)
        self.assertFalse(np.shares_memory(edited[0].vertices, self.parts[0].vertices))
        self.assertFalse(self.parts[0].vertices.flags.writeable)

    def test_pivot_is_bbox_center_not_vertex_mean(self):
        vertices = np.array([[0, 0, 0], [10, 0, 0], [0, 2, 0], [0, 0, 4]], dtype=float)
        faces = np.array([[0, 1, 2], [0, 2, 3], [0, 3, 1], [1, 3, 2]])
        part = EditablePart(7, "asymmetric", "#168b83", "part_0007", "node_part_0007", vertices, faces)
        np.testing.assert_allclose(part.center, [5, 1, 2])
        self.assertFalse(np.allclose(part.center, vertices.mean(axis=0)))
        edited = scale_parts((part,), {"7": 2})[0]
        np.testing.assert_allclose(edited.vertices, part.center + 2 * (vertices - part.center))

    def test_returning_to_one_recovers_original_without_accumulation(self):
        for value in (3, 0.1, 2.45, 1):
            edited = scale_parts(self.parts, {"0": value, "1": 1})
        np.testing.assert_array_equal(edited[0].vertices, self.parts[0].vertices)

    def test_variable_part_count_and_sparse_ids(self):
        for ids in ([9], [0, 3, 8], list(range(7))):
            with self.subTest(ids=ids):
                parts = tuple(EditablePart(index, f"part {index}", "#168b83", f"part_{index:04d}", f"node_part_{index:04d}", self.parts[0].vertices, self.parts[0].faces) for index in ids)
                edited = scale_parts(parts, {str(index): 1.5 for index in ids})
                self.assertEqual([part.part_id for part in edited], ids)
                self.assertEqual([item["name"] for item in editor_payload(parts)], [f"part {index}" for index in ids])

    def test_empty_part_stays_visible_in_payload_but_has_no_mesh(self):
        empty = EditablePart(4, "empty part", "#8266aa", None, None, np.zeros((0, 3)), np.zeros((0, 3), dtype=np.int64))
        parts = self.parts + (empty,)
        payload = editor_payload(parts)
        self.assertEqual(payload[-1]["name"], "empty part")
        self.assertIsNone(payload[-1]["center"])
        edited = scale_parts(parts, {"0": 1, "1": 1, "4": 1})
        glb = export_edited_glb(edited, source_key="test", scales={"0": 1, "1": 1, "4": 1})
        self.assertEqual(len(trimesh.load(io.BytesIO(glb), file_type="glb", process=False).geometry), 2)
        with self.assertRaises(ValueError):
            validate_scales(parts, {"0": 1, "1": 1, "4": 2})

    def test_invalid_scales_are_rejected(self):
        for value in (0, -1, 3.01, float("nan"), float("inf"), True, "2"):
            with self.subTest(value=value), self.assertRaises(ValueError):
                scale_parts(self.parts, {"0": value, "1": 1})
        for values in ({"0": 1}, {"0": 1, "1": 1, "2": 1}, None):
            with self.subTest(values=values), self.assertRaises(ValueError):
                validate_scales(self.parts, values)

    def test_source_switch_resets_scales_and_rejects_stale_events(self):
        state = {}
        synchronize_editor(state, "first", self.parts)
        synchronize_editor(state, "first", self.parts, {"source_key": "first", "sequence": 1, "scales": {"0": 2, "1": 1}})
        self.assertEqual(state["scales"]["0"], 2)
        synchronize_editor(state, "second", self.parts, {"source_key": "first", "sequence": 2, "scales": {"0": 3, "1": 1}})
        self.assertEqual(state["scales"], {"0": 1, "1": 1})
        self.assertEqual(state["sequence"], 0)

    def test_duplicate_and_out_of_order_events_do_not_regress_state(self):
        state = {}
        synchronize_editor(state, "source", self.parts, {"source_key": "source", "sequence": 2, "scales": {"0": 2, "1": 1}})
        synchronize_editor(state, "source", self.parts, {"source_key": "source", "sequence": 1, "scales": {"0": 1.5, "1": 1}})
        self.assertEqual(state["scales"]["0"], 2)
        with self.assertRaises(ValueError):
            synchronize_editor(state, "source", self.parts, {"source_key": "source", "sequence": True, "scales": {"0": 1, "1": 1}})

    def test_source_identity_includes_result_and_npz_contents(self):
        first = editor_source_key(self.manifest, self.artifacts["parts.npz"])
        self.assertNotEqual(first, editor_source_key({**self.manifest, "segmentation_id": "d" * 32}, self.artifacts["parts.npz"]))
        self.assertNotEqual(first, editor_source_key(self.manifest, self.artifacts["parts.npz"] + b"changed"))

    def test_glb_contains_python_edited_geometry_in_input_coordinates(self):
        scales = {"0": 2, "1": 0.5}
        parts = scale_parts(self.parts, scales)
        content = export_edited_glb(parts, source_key="test", scales=scales)
        scene = trimesh.load(io.BytesIO(content), file_type="glb", process=False)
        self.assertEqual(set(scene.geometry), {"part_0000", "part_0001"})
        for part in parts:
            transform, name = scene.graph[part.node_name]
            np.testing.assert_allclose(transform, np.eye(4))
            np.testing.assert_allclose(scene.geometry[name].vertices, part.vertices, atol=1e-6)
            np.testing.assert_array_equal(scene.geometry[name].faces, part.faces)

    def test_manifest_mismatch_and_duplicate_ids_are_rejected(self):
        manifest = json.loads(json.dumps(self.manifest))
        manifest["parts"][0]["vertex_count"] += 1
        with self.assertRaises(ValueError):
            load_editable_parts(self.artifacts["parts.npz"], manifest)
        manifest = json.loads(json.dumps(self.manifest))
        manifest["parts"][1]["part_id"] = 0
        with self.assertRaises(ValueError):
            load_editable_parts(self.artifacts["parts.npz"], manifest)


class EditingInterfaceTests(unittest.TestCase):
    def test_python_commit_updates_mesh_and_new_segmentation_resets_editor(self):
        manifest, artifacts = segmentation_fixture()
        path = Path(__file__).resolve().parents[1] / "app.py"
        app = AppTest.from_file(str(path)).run()
        app.get("file_uploader")[0].set_value(("input.glb", artifacts["parts.glb"], "model/gltf-binary")).run()
        app.text_area[0].set_value("Make the handle longer.").run()
        with patch.object(BackendClient, "register", return_value={"model_id": "a" * 32}), patch.object(BackendClient, "recognize", return_value={"object_name": "object"}), patch.object(BackendClient, "plan", return_value=part_plan()):
            app.button[0].click().run()
        with patch.object(BackendClient, "segment", return_value=manifest), patch.object(BackendClient, "download_artifact", side_effect=lambda result, name: artifacts[name]):
            app.button(key="segment").click().run()
        self.assertEqual(len(app.exception), 0)
        state = app.session_state["part_editing"]
        self.assertEqual(state["scales"], {"0": 1, "1": 1})
        original = state["edited_parts"][0].vertices.copy()
        event = {"source_key": state["source_key"], "sequence": 1, "scales": {"0": 2, "1": 1}}
        with patch("part_editor._component", return_value=event):
            app.run()
        self.assertEqual(len(app.exception), 0)
        state = app.session_state["part_editing"]
        self.assertEqual(state["scales"]["0"], 2)
        np.testing.assert_allclose(np.ptp(state["edited_parts"][0].vertices, axis=0), np.ptp(original, axis=0) * 2)
        changed = {**manifest, "segmentation_id": "e" * 32}
        with patch.object(BackendClient, "segment", return_value=changed), patch.object(BackendClient, "download_artifact", side_effect=lambda result, name: artifacts[name]):
            app.button(key="segment").click().run()
        self.assertEqual(app.session_state["part_editing"]["scales"], {"0": 1, "1": 1})
        app.text_area[0].set_value("Change request.").run()
        self.assertNotIn("part_editing", app.session_state)


if __name__ == "__main__":
    unittest.main()
