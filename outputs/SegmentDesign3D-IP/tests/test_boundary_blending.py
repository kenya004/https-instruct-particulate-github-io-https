from __future__ import annotations

import io
import json
import shutil
import subprocess
import unittest
from dataclasses import replace
from pathlib import Path
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from backend_client import BackendClient
from boundary_blending import apply_boundary_blend, blend_metadata, blended_anchor_residuals, build_boundary_blend
from connections import build_connection_plan, detect_connections, follow_connections
from editing import editor_payload, export_edited_glb, load_editable_parts, scale_parts, translate_parts
from rejoining import rejoin_input_key, rejoin_parts
from test_connections import connection_fixture, prism_geometry
from test_preparation import part_plan


def dense_fixture(three=False, exploded=False, island=False, sparse=False):
    steps = 210 if three else 110
    vertices, faces, labels = prism_geometry(steps)
    vertices[:, 0] = 10 + (vertices[:, 0] - 10) / 10
    labels = np.where(labels < 10, 0, np.where(labels < 110, 1, 2))
    if sparse:
        labels = np.array([7, 15, 21])[labels]
    if island:
        faces = np.vstack([faces, [[len(vertices), len(vertices) + 1, len(vertices) + 2]]])
        vertices = np.vstack([vertices, [[100, 100, 100], [101, 100, 100], [100, 101, 100]]])
        labels = np.r_[labels, 1]
    if exploded:
        vertices = vertices[faces].reshape(-1, 3)
        faces = np.arange(len(vertices)).reshape(-1, 3)
    manifest, artifacts = connection_fixture(geometry=(vertices, faces, labels))
    content = artifacts["parts.npz"]
    parts = load_editable_parts(content, manifest)
    connections, _ = detect_connections(content, parts)
    return manifest, artifacts, parts, connections


def evaluate(parts, connections, field, scales, root=0, follow=True):
    if follow:
        base, automatic = follow_connections(parts, scales, build_connection_plan(parts, connections, root))
    else:
        base, automatic = scale_parts(parts, scales), {part.part_id: np.zeros(3) for part in parts}
    return apply_boundary_blend(parts, base, scales, automatic, field), base, automatic


class BoundaryBlendingTests(unittest.TestCase):
    def setUp(self):
        self.manifest, self.artifacts, self.parts, self.connections = dense_fixture()
        self.content = self.artifacts["parts.npz"]
        self.field = build_boundary_blend(self.content, self.manifest, self.parts, self.connections, [1], root_id=0)
        self.scales = {"0": 1, "1": 2}

    def test_twenty_percent_band_matches_boundary_and_preserves_full_interior_scale(self):
        field = self.field["parts"]["1"]
        self.assertAlmostEqual(field["depth"], 10)
        self.assertAlmostEqual(field["radius"], 2)
        edited, base, _ = evaluate(self.parts, self.connections, self.field, self.scales)
        part = self.parts[1]
        seam, middle, outside = [np.isclose(part.vertices[:, 0], x) for x in (11, 12, 14)]
        np.testing.assert_allclose(edited[1].vertices[seam], part.vertices[seam])
        np.testing.assert_allclose(edited[1].vertices[middle], .5 * (part.vertices[middle] + base[1].vertices[middle]))
        np.testing.assert_allclose(edited[1].vertices[outside], base[1].vertices[outside])
        np.testing.assert_array_equal(edited[0].vertices, self.parts[0].vertices)
        for original, changed in zip(self.parts, edited):
            np.testing.assert_array_equal(changed.faces, original.faces)
            self.assertEqual(changed.vertices.shape, original.vertices.shape)
            self.assertFalse(original.vertices.flags.writeable)

    def test_follow_disabled_still_matches_target_and_manual_motion_remains_independent(self):
        edited, _, automatic = evaluate(self.parts, self.connections, self.field, self.scales, follow=False)
        moved = translate_parts(edited, {"0": [0, 0, 0], "1": [1, -2, 3]})
        np.testing.assert_allclose(moved[1].vertices, edited[1].vertices + [1, -2, 3])
        np.testing.assert_array_equal(moved[0].vertices, edited[0].vertices)
        residuals = blended_anchor_residuals(moved, self.connections, self.field, {})
        self.assertAlmostEqual(residuals[0], np.sqrt(14))
        self.assertEqual(blend_metadata(self.field, self.parts, self.scales, automatic)["conflicting_fixed_vertices"], 0)

    def test_multiple_targets_and_part_order_do_not_change_common_boundary(self):
        manifest, artifacts, parts, connections = dense_fixture(three=True)
        for selected in ([1], [0, 1, 2]):
            field = build_boundary_blend(artifacts["parts.npz"], manifest, parts, connections, selected, .8, 1)
            scales = {"0": .75, "1": 1.6, "2": 1.1}
            edited, _, _ = evaluate(parts, connections, field, scales, root=1)
            reverse, _, _ = evaluate(tuple(reversed(parts)), connections, field, scales, root=1)
            for forward, backward in zip(edited, reversed(reverse)):
                np.testing.assert_allclose(forward.vertices, backward.vertices)
            joined = rejoin_parts(artifacts["parts.npz"], manifest, parts, edited)
            self.assertEqual(joined.statistics["bridge_faces"], 0)
            self.assertTrue(joined.mesh.is_watertight)

    def test_exact_duplicate_vertices_sparse_ids_and_disconnected_regions(self):
        for options, selected, root in [({"exploded": True}, 1, 0), ({"sparse": True}, 15, 7), ({"island": True}, 1, 0)]:
            manifest, artifacts, parts, connections = dense_fixture(**options)
            field = build_boundary_blend(artifacts["parts.npz"], manifest, parts, connections, [selected], root_id=root)
            scales = {str(part.part_id): 2 if part.part_id == selected else 1 for part in parts}
            edited, base, _ = evaluate(parts, connections, field, scales, root=root)
            joined = rejoin_parts(artifacts["parts.npz"], manifest, parts, edited)
            self.assertEqual(joined.statistics["bridge_faces"], 0)
            if options.get("island"):
                unreachable = parts[1].vertices[:, 0] > 90
                np.testing.assert_allclose(edited[1].vertices[unreachable], base[1].vertices[unreachable])
                self.assertEqual(field["parts"]["1"]["unreachable_vertices"], 3)

    def test_empty_selection_is_legacy_compatible_and_reset_has_no_accumulation(self):
        field = build_boundary_blend(b"not needed", {}, self.parts, (), [])
        edited, base, _ = evaluate(self.parts, self.connections, field, self.scales)
        for a, b in zip(edited, base):
            np.testing.assert_array_equal(a.vertices, b.vertices)
        evaluate(self.parts, self.connections, self.field, self.scales)
        restored, _, _ = evaluate(self.parts, self.connections, self.field, {"0": 1, "1": 1})
        for a, b in zip(restored, self.parts):
            np.testing.assert_array_equal(a.vertices, b.vertices)

    def test_range_controls_band_width_and_coarse_mesh_is_reported(self):
        wider = build_boundary_blend(self.content, self.manifest, self.parts, self.connections, [1], .4)
        edited, base, _ = evaluate(self.parts, self.connections, wider, self.scales)
        mask = np.isclose(self.parts[1].vertices[:, 0], 14)
        self.assertFalse(np.allclose(edited[1].vertices[mask], base[1].vertices[mask]))
        manifest, artifacts = connection_fixture(2)
        parts = load_editable_parts(artifacts["parts.npz"], manifest)
        connections, _ = detect_connections(artifacts["parts.npz"], parts)
        coarse = build_boundary_blend(artifacts["parts.npz"], manifest, parts, connections, [1])
        self.assertTrue(any("中間頂点" in warning for warning in coarse["warnings"]))

    def test_export_rejoin_and_cache_identity_include_blending(self):
        edited, base, automatic = evaluate(self.parts, self.connections, self.field, self.scales)
        metadata = {"root_id": 0, "enabled": True, "translations": {str(key): value.tolist() for key, value in automatic.items()},
                    "boundary_blending": blend_metadata(self.field, self.parts, self.scales, automatic)}
        glb = export_edited_glb(edited, source_key="test", scales=self.scales, connection_metadata=metadata)
        scene = trimesh.load(io.BytesIO(glb), file_type="glb", process=False)
        for part in edited:
            np.testing.assert_allclose(scene.geometry[part.geometry_name].vertices, part.vertices, atol=2e-6)
        joined = rejoin_parts(self.content, self.manifest, self.parts, edited)
        self.assertEqual(joined.statistics["bridge_faces"], 0)
        self.assertTrue(joined.mesh.is_watertight)
        for record in self.manifest["parts"]:
            np.testing.assert_array_equal(joined.mesh.visual.face_colors[joined.face_part_ids == record["part_id"]],
                                          np.tile(trimesh.visual.color.hex_to_rgba(record["color"]), (record["face_count"], 1)))
        other = {**metadata, "boundary_blending": {**metadata["boundary_blending"], "ratio": .4}}
        self.assertNotEqual(rejoin_input_key("test", self.scales, metadata), rejoin_input_key("test", self.scales, other))

    def test_invalid_range_target_or_source_correspondence_is_rejected(self):
        for selected, ratio in [([100], .2), ([True], .2), ([1], 0), ([1], 1.1), ([1], float("nan"))]:
            with self.subTest(selected=selected, ratio=ratio), self.assertRaises(ValueError):
                build_boundary_blend(self.content, self.manifest, self.parts, self.connections, selected, ratio)
        wrong = (self.parts[0], replace(self.parts[1], vertices=self.parts[1].vertices + [1, 0, 0]))
        with self.assertRaisesRegex(ValueError, "対応"):
            build_boundary_blend(self.content, self.manifest, wrong, self.connections, [1])

    def test_javascript_preview_matches_python_export_for_real_rest_mesh_weights(self):
        node = shutil.which("node") or str(Path.home() / ".cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe")
        if not Path(node).exists():
            self.skipTest("Node is needed for cross-language parity")
        directory = Path(__file__).resolve().parents[1] / "scale_component"
        for follow in (True, False):
            edited, _, automatic = evaluate(self.parts, self.connections, self.field, self.scales, follow=follow)
            offsets = {"0": [.1, -.2, .3], "1": [-.3, .2, -.1]}
            edited = translate_parts(edited, offsets)
            data = {"parts": editor_payload(self.parts), "scales": self.scales, "automatic": {str(k): v.tolist() for k, v in automatic.items()},
                    "blending": self.field, "offsets": offsets}
            process = subprocess.run([node, "tests/preview_fixture.mjs"], input=json.dumps(data), cwd=directory, text=True, capture_output=True, check=True)
            result = json.loads(process.stdout)
            for part in edited:
                np.testing.assert_allclose(result[str(part.part_id)], part.vertices, atol=2e-6)


class BoundaryBlendingInterfaceTests(unittest.TestCase):
    def test_select_parts_twenty_percent_default_rejoin_and_config_changes(self):
        manifest, artifacts, parts, _ = dense_fixture()
        app = AppTest.from_file(str(Path(__file__).resolve().parents[1] / "app.py")).run()
        app.get("file_uploader")[0].set_value(("input.glb", artifacts["parts.glb"], "model/gltf-binary")).run()
        app.text_area[0].set_value("Make the middle section wider.").run()
        plan = {**part_plan("Make the middle section wider."), "parts": manifest["parts"], "part_names": [part["name"] for part in manifest["parts"]]}
        with patch.object(BackendClient, "register", return_value={"model_id": "a" * 32}), patch.object(BackendClient, "recognize", return_value={"object_name": "object"}), patch.object(BackendClient, "plan", return_value=plan):
            app.button[0].click().run()
        with patch.object(BackendClient, "segment", return_value=manifest), patch.object(BackendClient, "download_artifact", side_effect=lambda result, name: artifacts[name]):
            app.button(key="segment").click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual([item.value for item in app.error], [])
        key = app.session_state["part_editing"]["source_key"]
        target_key, range_key = f"boundary_blend_parts_{key}", f"boundary_blend_range_{key}"
        self.assertEqual(app.slider(key=range_key).value, 20)
        self.assertTrue(app.slider(key=range_key).disabled)
        self.assertIn("middle section (ID 1)", app.multiselect(key=target_key).options)
        app.multiselect(key=target_key).set_value([1]).run()
        self.assertFalse(app.slider(key=range_key).disabled)
        event = {"source_key": key, "sequence": 1, "scales": {"0": 1, "1": 2}}
        with patch("part_editor._component", return_value=event):
            app.run()
        state = app.session_state["part_editing"]
        self.assertEqual(state["connections"]["boundary_blending"]["selected_ids"], [1])
        self.assertAlmostEqual(state["connections"]["boundary_blending"]["ratio"], .2)
        seam = np.isclose(parts[1].vertices[:, 0], 11)
        np.testing.assert_allclose(state["edited_parts"][1].vertices[seam], parts[1].vertices[seam])
        app.button(key="rejoin_mesh").click().run()
        self.assertIn("rejoined", app.session_state["part_editing"])
        app.slider(key=range_key).set_value(40).run()
        self.assertNotIn("rejoined", app.session_state["part_editing"])
        app.multiselect(key=target_key).set_value([]).run()
        self.assertEqual(app.session_state["part_editing"]["connections"]["boundary_blending"]["selected_ids"], [])
        self.assertEqual(len(app.exception), 0)


if __name__ == "__main__":
    unittest.main()
