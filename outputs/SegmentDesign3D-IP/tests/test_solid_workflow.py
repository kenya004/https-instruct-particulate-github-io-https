import io
import json
import unittest
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from capping import export_capped_glb, export_capped_npz
from test_connection_overlap import (support_fixture, double_connection_fixture, hollow_fixture,
                                     intersection_fixture, concave_cap_fixture)


def solid_editor_app(manifest, content):
    from part_editor import render_part_editor
    render_part_editor(manifest, content, "+Z")


class SolidWorkflowTests(unittest.TestCase):
    def start(self, fixture=support_fixture, *, close=True):
        manifest, content, _, _ = fixture()
        app = AppTest.from_function(solid_editor_app, args=(manifest, content), default_timeout=60).run()
        key = app.session_state["part_editing"]["source_key"]
        if close:
            app.button(key="solid_close_parts").click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.error), 0)
        return app, key

    def move(self, app, key, offset, *, sequence=1, scale=1):
        event = {"source_key": key, "sequence": sequence, "scales": {"0": 1, "1": scale},
                 "offsets": {"0": [0, 0, 0], "1": offset}}
        with patch("part_editor._component", return_value=event):
            app.run()
        self.assertEqual(len(app.exception), 0)
        return app.session_state["part_editing"]

    def test_intersecting_extension_is_visible_downloadable_and_colored_only_in_preview(self):
        for created in (False, True):
            with self.subTest(created_by_extension=created):
                app, key = self.start(lambda: intersection_fixture(created_by_extension=created))
                self.move(app, key, [0, 0, .5])
                # Even a reported end-cap crossing must not gate the preview.
                with patch("connection_overlap._SolidQuery.cap_crosses", return_value=True):
                    app.button(key="solid_extend_parts").click().run()
                self.assertEqual(len(app.exception), 0)
                self.assertEqual(len(app.error), 0)
                saved = app.session_state["part_editing"]["solid_extension"]
                self.assertTrue(saved["complete"])
                self.assertGreater(saved["result"].statistics["self_intersection_pair_count"], 0)
                self.assertEqual(app.session_state["part_editing"]["offsets"]["1"], [0, 0, .5])
                figure = json.loads(app.get("plotly_chart")[-1].proto.spec)
                self.assertTrue(any("#e12b35" in trace.get("facecolor", []) for trace in figure["data"]))
                self.assertTrue(any(b.key == "download_overlap_parts_glb" for b in app.get("download_button")))
                self.assertTrue(any(b.key == "download_overlap_parts_npz" for b in app.get("download_button")))
                app.checkbox(key=f"solid_show_intersections_{key}").set_value(False).run()
                figure = json.loads(app.get("plotly_chart")[-1].proto.spec)
                self.assertFalse(any("#e12b35" in trace.get("facecolor", []) for trace in figure["data"]))
                with np.load(io.BytesIO(export_capped_npz(saved["result"], source_key=key, editing_metadata={})), allow_pickle=False) as data:
                    for record in saved["result"].parts:
                        expected = trimesh.visual.color.hex_to_rgba(record.part.color)
                        colors = data[f"part_{record.part.part_id:04d}_face_colors"]
                        np.testing.assert_array_equal(colors, np.tile(expected, (len(record.part.faces), 1)))
                    metadata = json.loads(data["metadata_json"].item())
                    self.assertGreater(metadata["statistics"]["self_intersection_pair_count"], 0)
                scene = trimesh.load(io.BytesIO(export_capped_glb(saved["result"], source_key=key, editing_metadata={})), file_type="glb", process=False)
                for record in saved["result"].parts:
                    mesh = scene.geometry[record.part.geometry_name]
                    np.testing.assert_array_equal(mesh.visual.face_colors,
                        np.tile(trimesh.visual.color.hex_to_rgba(record.part.color), (len(mesh.faces), 1)))
                app.button(key="boolean_union").click().run()
                self.assertNotIn("solid_union", app.session_state["part_editing"])
                self.assertTrue(any("自己交差" in e.value for e in app.error))
                self.assertIsNotNone(app.session_state["part_editing"]["solid_extension"]["result"])

    def test_failed_diagnostics_preserve_the_generated_extension(self):
        app, key = self.start()
        self.move(app, key, [0, 0, .2])
        with patch("solid_panel.diagnose_extension", side_effect=RuntimeError("diagnostic interrupted")):
            app.button(key="solid_extend_parts").click().run()
        saved = app.session_state["part_editing"]["solid_extension"]
        self.assertIsNotNone(saved["result"])
        self.assertTrue(saved["complete"])
        self.assertIn("diagnostic_error", saved)
        self.assertEqual(len(app.error), 0)
        self.assertFalse(app.button(key="boolean_union").disabled)
        app.button(key="boolean_union").click().run()
        self.assertIn("solid_union", app.session_state["part_editing"])

    def test_overlapping_fan_caps_can_be_previewed_and_rejected_at_boolean_stage(self):
        app, _ = self.start(concave_cap_fixture)
        app.button(key="solid_extend_parts").click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.error), 0)
        saved = app.session_state["part_editing"]["solid_extension"]
        self.assertTrue(saved["complete"])
        self.assertIsNotNone(saved["result"])
        self.assertGreater(saved["result"].statistics["self_intersection_pair_count"], 0)
        app.button(key="boolean_union").click().run()
        self.assertNotIn("solid_union", app.session_state["part_editing"])
        self.assertTrue(len(app.error))

    def test_buttons_run_distinct_stages_without_automatic_geometry_work(self):
        app, key = self.start(close=False)
        state = app.session_state["part_editing"]
        self.assertNotIn("solid_closed", state)
        self.assertNotIn("solid_extension", state)
        self.assertTrue(app.button(key="solid_extend_parts").disabled)
        self.assertTrue(app.button(key="boolean_union").disabled)
        self.assertFalse(any("solid_enabled" in str(c.key) for c in app.checkbox))
        self.assertFalse(any("solid_maximum" in str(c.key) for c in app.number_input))
        app.button(key="solid_close_parts").click().run()
        snapshot_key = app.session_state["part_editing"]["solid_closed"]["input_key"]
        with patch("solid_panel.cap_parts", side_effect=AssertionError("Movement must retain caps")), \
             patch("solid_panel.evaluate_connections", side_effect=AssertionError("Extension requires a button")):
            state = self.move(app, key, [0, 0, .2])
        self.assertEqual(state["offsets"]["1"], [0, 0, .2])
        self.assertEqual(state["solid_closed"]["input_key"], snapshot_key)
        self.assertNotIn("solid_extension", state)
        self.assertNotIn("solid_union", state)
        self.assertTrue(app.button(key="boolean_union").disabled)

    def test_free_move_beyond_former_limit_then_extension_and_boolean(self):
        app, key = self.start()
        self.assertEqual(app.number_input(key=f"solid_depth_{key}").value, 1)
        state = self.move(app, key, [0, 0, .2])
        self.assertEqual(state["sequence"], 1)
        self.assertEqual(state["offsets"]["1"][2], .2)  # Former connection limit was .08.
        app.button(key="solid_extend_parts").click().run()
        state = app.session_state["part_editing"]
        self.assertTrue(state["solid_extension"]["complete"])
        self.assertAlmostEqual(state["solid_extension"]["reports"][0]["length"], .22)
        self.assertGreater(state["solid_extension"]["result"].statistics["extension_faces"], 0)
        app.button(key="boolean_union").click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.error), 0)
        result = app.session_state["part_editing"]["solid_union"]["result"]
        self.assertEqual(result.statistics["connected_components"], 1)
        self.assertAlmostEqual(result.mesh.volume, 116.8, places=6)
        self.assertEqual(set(result.face_part_ids), {0, 1})
        self.assertTrue(any(b.key == "download_union_stl" for b in app.get("download_button")))

    def test_contact_closure_extension_and_union_keep_color_without_a_collar(self):
        app, _ = self.start()
        app.button(key="solid_extend_parts").click().run()
        extension = app.session_state["part_editing"]["solid_extension"]
        self.assertTrue(extension["complete"])
        self.assertEqual(extension["reports"][0]["status"], "contact")
        self.assertEqual(extension["result"].statistics["extension_faces"], 0)
        app.button(key="boolean_union").click().run()
        result = app.session_state["part_editing"]["solid_union"]["result"]
        self.assertAlmostEqual(result.mesh.volume, 116)
        self.assertTrue(np.all(result.face_kinds == 0))

    def test_scaling_invalidates_only_the_caps_and_never_rolls_back_the_scale(self):
        app, key = self.start()
        app.multiselect(key=f"boundary_blend_parts_{key}").set_value([1]).run()
        state = self.move(app, key, [0, 0, 0], scale=1.2)
        self.assertEqual(state["scales"]["1"], 1.2)
        self.assertNotIn("solid_closed", state)
        self.assertNotIn("solid_notice", state)
        app.button(key="solid_close_parts").click().run()
        app.button(key="solid_extend_parts").click().run()
        self.assertTrue(app.session_state["part_editing"]["solid_extension"]["complete"])
        app.button(key="boolean_union").click().run()
        self.assertGreater(app.session_state["part_editing"]["solid_union"]["result"].mesh.volume, 116)
        self.assertEqual(len(app.error), 0)

    def test_two_connections_report_partial_failure_without_rolling_back_movement(self):
        app, key = self.start(double_connection_fixture)
        state = self.move(app, key, [0, 0, .6])
        self.assertEqual(state["offsets"]["1"], [0, 0, .6])
        app.button(key="solid_extend_parts").click().run()
        extension = app.session_state["part_editing"]["solid_extension"]
        self.assertEqual(len(extension["reports"]), 2)
        self.assertEqual(sum(r["valid"] for r in extension["reports"]), 1)
        self.assertFalse(extension["complete"])
        self.assertIsNotNone(extension["result"])
        self.assertTrue(app.button(key="boolean_union").disabled)
        self.assertEqual(app.session_state["part_editing"]["offsets"]["1"], [0, 0, .6])
        self.move(app, key, [0, 0, 0], sequence=2)
        self.assertIn("solid_closed", app.session_state["part_editing"])
        self.assertNotIn("solid_extension", app.session_state["part_editing"])
        app.button(key="solid_extend_parts").click().run()
        self.assertTrue(app.session_state["part_editing"]["solid_extension"]["complete"])

    def test_caps_remain_for_diagnosis_when_they_cannot_close_the_mesh(self):
        app, key = self.start(hollow_fixture)
        snapshot = app.session_state["part_editing"]["solid_closed"]
        self.assertGreater(snapshot["result"].statistics["skipped_sections"], 0)
        self.assertTrue(any("Earcut" in item.value for item in app.warning))
        # A different part count still allows movement, even after a closure failure.
        event = {"source_key": key, "sequence": 1, "scales": {"0": 1, "1": 1, "2": 1},
                 "offsets": {"0": [0, 0, 0], "1": [.2, 0, 0], "2": [0, 0, 0]}}
        with patch("part_editor._component", return_value=event):
            app.run()
        self.assertEqual(app.session_state["part_editing"]["offsets"]["1"], [.2, 0, 0])
        app.button(key="solid_extend_parts").click().run()
        self.assertIn("error", app.session_state["part_editing"]["solid_extension"])
        self.assertEqual(app.session_state["part_editing"]["offsets"]["1"], [.2, 0, 0])
        self.assertEqual(len(app.exception), 0)

    def test_movement_and_depth_change_discard_extension_and_union_but_keep_caps(self):
        app, key = self.start()
        app.button(key="solid_extend_parts").click().run()
        app.button(key="boolean_union").click().run()
        closed_key = app.session_state["part_editing"]["solid_closed"]["input_key"]
        app.number_input(key=f"solid_depth_{key}").set_value(2.0).run()
        self.assertEqual(app.session_state["part_editing"]["solid_closed"]["input_key"], closed_key)
        self.assertNotIn("solid_extension", app.session_state["part_editing"])
        self.assertNotIn("solid_union", app.session_state["part_editing"])
        app.button(key="solid_extend_parts").click().run()
        app.button(key="boolean_union").click().run()
        self.move(app, key, [.2, 0, 0])
        self.assertEqual(app.session_state["part_editing"]["solid_closed"]["input_key"], closed_key)
        self.assertNotIn("solid_extension", app.session_state["part_editing"])
        self.assertNotIn("solid_union", app.session_state["part_editing"])

    def test_union_failure_does_not_reuse_a_previous_success(self):
        app, _ = self.start()
        app.button(key="solid_extend_parts").click().run()
        app.button(key="boolean_union").click().run()
        with patch("solid_panel.union_parts", side_effect=ValueError("入力の自己交差を確認してください。")):
            app.button(key="boolean_union").click().run()
        self.assertNotIn("solid_union", app.session_state["part_editing"])
        self.assertTrue(any("自己交差" in error.value for error in app.error))


if __name__ == "__main__":
    unittest.main()
