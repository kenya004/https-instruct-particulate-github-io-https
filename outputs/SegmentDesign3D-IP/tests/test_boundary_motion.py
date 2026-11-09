from __future__ import annotations

import io
import json
import shutil
import subprocess
import unittest
from pathlib import Path
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from boundary_blending import apply_boundary_blend, build_boundary_blend, blended_anchor_residuals
from boundary_motion import apply_boundary_motion, build_motion_distances, motion_metadata, motion_weights
from connections import build_connection_plan, follow_connections
from editing import editor_payload, export_edited_glb, translate_parts
from rejoining import rejoin_input_key, rejoin_parts
from test_boundary_blending import dense_fixture
from test_connections import connection_fixture
from test_orientation import editor_app


class BoundaryMotionTests(unittest.TestCase):
    def test_boundary_is_fixed_at_pre_motion_pose_and_band_moves_smoothly(self):
        manifest, artifacts, parts, connections = dense_fixture()
        distances = build_motion_distances(artifacts["parts.npz"], manifest, parts, connections)
        motion = motion_weights(distances, {1: .2})
        scales = {"0": 1.1, "1": 1.4}
        base, automatic = follow_connections(parts, scales, build_connection_plan(parts, connections, 0))
        blend = build_boundary_blend(artifacts["parts.npz"], manifest, parts, connections, [1], root_id=0)
        base = apply_boundary_blend(parts, base, scales, automatic, blend)
        offset = np.array([.4, -.8, .6]); offsets = {"0": [0, 0, 0], "1": offset.tolist()}
        edited = apply_boundary_motion(base, offsets, motion)
        seam, halfway, far = [np.isclose(parts[1].vertices[:, 0], x) for x in (11, 12, 14)]
        np.testing.assert_array_equal(edited[1].vertices[seam], base[1].vertices[seam])
        np.testing.assert_allclose(edited[1].vertices[halfway], base[1].vertices[halfway] + .5 * offset)
        np.testing.assert_allclose(edited[1].vertices[far], base[1].vertices[far] + offset)
        np.testing.assert_array_equal(edited[0].vertices, base[0].vertices)
        residuals = blended_anchor_residuals(edited, connections, motion, {})
        self.assertLess(max(residuals.values()), 1e-12)
        for original, current in zip(parts, edited):
            np.testing.assert_array_equal(current.faces, original.faces)
            self.assertFalse(original.vertices.flags.writeable)
        restored = apply_boundary_motion(base, {"0": [0, 0, 0], "1": [0, 0, 0]}, motion)
        for current, expected in zip(restored, base):
            np.testing.assert_array_equal(current.vertices, expected.vertices)

    def test_two_connections_stay_fixed_while_the_middle_moves(self):
        manifest, artifacts, parts, connections = dense_fixture(three=True)
        field = motion_weights(build_motion_distances(artifacts["parts.npz"], manifest, parts, connections), {1: .2})
        offsets = {"0": [0, 0, 0], "1": [0, 2, 0], "2": [0, 0, 0]}
        edited = apply_boundary_motion(parts, offsets, field)
        seam = np.isclose(parts[1].vertices[:, 0], 11) | np.isclose(parts[1].vertices[:, 0], 21)
        middle = np.isclose(parts[1].vertices[:, 0], 16)
        halfway = np.isclose(parts[1].vertices[:, 0], 11.5)
        np.testing.assert_array_equal(edited[1].vertices[seam], parts[1].vertices[seam])
        np.testing.assert_allclose(edited[1].vertices[middle], parts[1].vertices[middle] + [0, 2, 0])
        np.testing.assert_allclose(edited[1].vertices[halfway], parts[1].vertices[halfway] + [0, 1, 0])
        joined = rejoin_parts(artifacts["parts.npz"], manifest, parts, edited)
        self.assertEqual(joined.statistics["bridge_faces"], 0)
        self.assertTrue(joined.mesh.is_watertight)

    def test_seam_duplicates_sparse_ids_and_unreachable_regions(self):
        for options, selected in (({"exploded": True}, 1), ({"sparse": True}, 15), ({"island": True}, 1)):
            manifest, artifacts, parts, connections = dense_fixture(**options)
            distances = build_motion_distances(artifacts["parts.npz"], manifest, parts, connections)
            motion = motion_weights(distances, {selected: .2})
            offsets = {str(part.part_id): [0, 1, 0] if part.part_id == selected else [0, 0, 0] for part in parts}
            edited = apply_boundary_motion(parts, offsets, motion)
            target = next(part for part in parts if part.part_id == selected)
            current = next(part for part in edited if part.part_id == selected)
            seam = np.isclose(target.vertices[:, 0], 11)
            np.testing.assert_array_equal(current.vertices[seam], target.vertices[seam])
            if options.get("island"):
                island = target.vertices[:, 0] > 90
                np.testing.assert_allclose(current.vertices[island], target.vertices[island] + [0, 1, 0])
                self.assertEqual(motion["parts"][str(selected)]["unreachable_vertices"], 3)

    def test_missing_interior_and_disconnected_geometry_are_explicit(self):
        manifest, artifacts = connection_fixture()
        from editing import load_editable_parts
        from connections import detect_connections
        parts = load_editable_parts(artifacts["parts.npz"], manifest)
        connections, _ = detect_connections(artifacts["parts.npz"], parts)
        motion = motion_weights(build_motion_distances(artifacts["parts.npz"], manifest, parts, connections), {1: .2})
        self.assertTrue(any("全頂点" in warning for warning in motion["warnings"]))
        np.testing.assert_array_equal(motion["parts"]["1"]["weights"], 0)
        self.assertEqual(build_motion_distances(b"unused", {}, parts, ())["parts"], {})
        with self.assertRaises(ValueError):
            motion_weights({"parts": {}, "anchors": {}}, {1: .2})

    def test_mode_range_cache_and_export_preserve_requested_parameters_and_colors(self):
        manifest, artifacts, parts, connections = dense_fixture()
        distances = build_motion_distances(artifacts["parts.npz"], manifest, parts, connections)
        motion = motion_weights(distances, {1: .2})
        offsets = {"0": [0, 0, 0], "1": [0, 1, 0]}
        for value in (0, 1.1, float("nan"), True):
            with self.assertRaises(ValueError):
                motion_weights(distances, {1: value})
        base = {"root_id": 0, "enabled": True, "translations": offsets, "boundary_motion": motion_metadata(motion)}
        wider = {**base, "boundary_motion": motion_metadata(motion_weights(distances, {1: .4}))}
        self.assertNotEqual(rejoin_input_key("source", {"0": 1, "1": 1}, base), rejoin_input_key("source", {"0": 1, "1": 1}, wider))
        edited = apply_boundary_motion(parts, offsets, motion)
        glb = export_edited_glb(edited, source_key="source", scales={"0": 1, "1": 1}, connection_metadata=base, offsets=offsets)
        scene = trimesh.load(io.BytesIO(glb), file_type="glb", process=False)
        for current in edited:
            geometry = scene.geometry[current.geometry_name]
            np.testing.assert_allclose(geometry.vertices, current.vertices, atol=2e-6)
            np.testing.assert_array_equal(geometry.visual.face_colors[0], trimesh.visual.color.hex_to_rgba(current.color))

    def test_javascript_positions_and_connection_diagnostics_match_python(self):
        node = shutil.which("node") or str(Path.home() / ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe")
        if not Path(node).exists():
            self.skipTest("Node is needed for cross-language parity")
        directory = Path(__file__).resolve().parents[1] / "scale_component"
        manifest, artifacts, parts, connections = dense_fixture(three=True)
        motion = motion_weights(build_motion_distances(artifacts["parts.npz"], manifest, parts, connections), {1: .2})
        scales = {"0": 1.2, "1": .9, "2": 1.1}
        base, automatic = follow_connections(parts, scales, build_connection_plan(parts, connections, 0))
        blending = build_boundary_blend(artifacts["parts.npz"], manifest, parts, connections, [1], .2, 0)
        base = apply_boundary_blend(parts, base, scales, automatic, blending)
        offsets = {"0": [0, 0, 0], "1": [.3, -.2, .5], "2": [.1, .2, -.1]}
        edited = apply_boundary_motion(base, offsets, motion)
        data = {"parts": editor_payload(parts), "scales": scales, "automatic": {str(k): v.tolist() for k, v in automatic.items()},
                "blending": blending, "boundary_motion": motion, "offsets": offsets}
        process = subprocess.run([node, "tests/motion_preview_fixture.mjs"], input=json.dumps(data), cwd=directory, text=True, capture_output=True, check=True)
        result = json.loads(process.stdout)
        for part in edited:
            np.testing.assert_allclose(result["vertices"][str(part.part_id)], part.vertices, atol=2e-6)
        by_id = {part.part_id: part for part in edited}
        for connection_id, samples in motion["anchors"].items():
            expected = [np.asarray(sample["weights"]) @ by_id[sample["part_id"]].vertices[sample["indices"]] for sample in samples]
            np.testing.assert_allclose(result["anchors"][connection_id], expected, atol=1e-12)


class BoundaryMotionInterfaceTests(unittest.TestCase):
    def test_mode_band_translation_rejoin_and_reset(self):
        manifest, artifacts, parts, _ = dense_fixture()
        app = AppTest.from_function(editor_app, args=(manifest, artifacts["parts.npz"]), default_timeout=10).run()
        state = app.session_state["part_editing"]; key = state["source_key"]
        mode_key, range_key = f"boundary_motion_mode_{key}_1", f"boundary_motion_range_{key}_1"
        self.assertEqual(app.selectbox(key=mode_key).value, "全体移動")
        self.assertEqual(app.slider(key=range_key).value, 20)
        self.assertTrue(app.slider(key=range_key).disabled)
        app.selectbox(key=mode_key).set_value("断面固定移動").run()
        self.assertFalse(app.slider(key=range_key).disabled)
        event = {"source_key": key, "sequence": 1, "scales": {"0": 1, "1": 1}, "offsets": {"0": [0, 0, 0], "1": [0, 2, 0]}}
        with patch("part_editor._component", return_value=event) as component:
            app.run()
        self.assertEqual(len(app.exception), 0)
        current = app.session_state["part_editing"]
        seam = np.isclose(parts[1].vertices[:, 0], 11)
        np.testing.assert_array_equal(current["edited_parts"][1].vertices[seam], parts[1].vertices[seam])
        self.assertLess(max(current["connections"]["anchor_residuals"].values()), 1e-12)
        self.assertEqual(current["connections"]["boundary_motion"]["selected_ids"], [1])
        self.assertIn("1", component.call_args.kwargs["boundary_motion"]["parts"])
        app.button(key="rejoin_mesh").click().run()
        self.assertEqual(app.session_state["part_editing"]["rejoined"]["result"].statistics["bridge_faces"], 0)
        app.slider(key=range_key).set_value(40).run()
        self.assertNotIn("rejoined", app.session_state["part_editing"])
        app.selectbox(key=mode_key).set_value("全体移動").run()
        np.testing.assert_allclose(app.session_state["part_editing"]["edited_parts"][1].vertices[seam], parts[1].vertices[seam] + [0, 2, 0])
        app.selectbox(key=mode_key).set_value("断面固定移動").run()
        with patch("part_editor._component", return_value={**event, "sequence": 2, "offsets": {"0": [0, 0, 0], "1": [0, 0, 0]}}):
            app.run()
        np.testing.assert_array_equal(app.session_state["part_editing"]["edited_parts"][1].vertices, parts[1].vertices)

    def test_boundary_motion_is_checked_for_internal_overlaps(self):
        manifest, artifacts, _, _ = dense_fixture()
        app = AppTest.from_function(editor_app, args=(manifest, artifacts["parts.npz"]), default_timeout=10).run()
        key = app.session_state["part_editing"]["source_key"]
        app.selectbox(key=f"boundary_motion_mode_{key}_1").set_value("断面固定移動").run()
        event = {"source_key": key, "sequence": 1, "scales": {"0": 1, "1": 1}, "offsets": {"0": [0, 0, 0], "1": [0, 2, 0]}}
        with patch("part_editor._component", return_value=event), patch("part_editor.only_new_overlaps", wraps=__import__('mesh_overlaps').only_new_overlaps) as compare:
            app.run()
        groups = compare.call_args.kwargs["uniform_groups"]
        self.assertTrue(np.all(groups[:manifest["parts"][0]["face_count"]] == 0))
        self.assertTrue(np.all(groups[manifest["parts"][0]["face_count"]:] == -1))


if __name__ == "__main__":
    unittest.main()
