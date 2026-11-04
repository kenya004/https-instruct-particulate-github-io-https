from __future__ import annotations

import io
import json
import struct
import unittest
from dataclasses import replace
from pathlib import Path
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from backend_client import BackendClient
from connections import build_connection_plan, detect_connections, follow_connections
from editing import load_editable_parts
from rejoining import export_rejoined_glb, export_rejoined_npz, has_rejoin_data, rejoin_input_key, rejoin_parts, rejoined_payload
from test_connections import connection_fixture, prism_geometry
from test_preparation import part_plan
from test_segmentation import segmentation_fixture
from viewer import mesh_figure


class RejoiningTests(unittest.TestCase):
    def setUp(self):
        self.manifest, self.artifacts = connection_fixture()
        self.content = self.artifacts["parts.npz"]
        self.parts = load_editable_parts(self.content, self.manifest)
        self.connections, _ = detect_connections(self.content, self.parts)

    def edited(self, scales=None, root=1):
        scales = scales or {"0": 1, "1": 2, "2": 1}
        return follow_connections(self.parts, scales, build_connection_plan(self.parts, self.connections, root))[0]

    def test_unedited_rejoin_restores_original_topology_and_colors(self):
        joined = rejoin_parts(self.content, self.manifest, self.parts, self.parts)
        self.assertEqual(joined.statistics["bridge_faces"], 0)
        self.assertEqual(joined.statistics["welded_vertices"], 8)
        self.assertEqual(joined.statistics["connected_components"], 1)
        self.assertEqual(len(joined.mesh.vertices), 16)
        self.assertTrue(joined.mesh.is_watertight)
        with np.load(io.BytesIO(self.content)) as source:
            np.testing.assert_array_equal(joined.mesh.vertices[joined.mesh.faces], source["vertices"][source["faces"]])
            np.testing.assert_array_equal(joined.face_part_ids, source["face_part_ids"])
        self.assert_original_colors(joined)

    def assert_original_colors(self, joined):
        expected = np.array([trimesh.visual.color.hex_to_rgba(joined.palette[int(index)]) for index in joined.face_part_ids])
        np.testing.assert_array_equal(joined.mesh.visual.face_colors, expected)

    def test_scaled_parts_gain_bridges_without_changing_original_faces(self):
        edited = self.edited()
        copies = [part.vertices.copy() for part in edited]
        joined = rejoin_parts(self.content, self.manifest, self.parts, edited)
        self.assertEqual(joined.statistics["bridge_faces"], 16)
        self.assertEqual(joined.statistics["bridged_edges"], 8)
        self.assertEqual(joined.statistics["connected_components"], 1)
        self.assertTrue(joined.mesh.is_watertight)
        self.assertTrue(joined.mesh.is_winding_consistent)
        with np.load(io.BytesIO(self.content)) as source:
            for part in edited:
                face_ids = source[f"part_{part.part_id:04d}_source_face_indices"]
                np.testing.assert_array_equal(joined.mesh.vertices[joined.mesh.faces[face_ids]], part.vertices[part.faces])
        for part, before in zip(edited, copies):
            np.testing.assert_array_equal(part.vertices, before)
        self.assert_original_colors(joined)
        self.assertEqual(set(joined.face_part_ids[joined.is_bridge]), {0, 1, 2})

    def test_junctions_between_three_parts_are_closed_without_intersection_repair(self):
        mesh = trimesh.creation.icosphere(subdivisions=1)
        angles = np.arctan2(mesh.triangles_center[:, 1], mesh.triangles_center[:, 0])
        labels = np.minimum(((angles + np.pi) * 3 / (2 * np.pi)).astype(int), 2)
        manifest, artifacts = connection_fixture(geometry=(mesh.vertices, mesh.faces, labels))
        parts = load_editable_parts(artifacts["parts.npz"], manifest)
        shifts = ([0, 0, 0], [.1, .2, 0], [-.1, .05, .3])
        edited = tuple(replace(part, vertices=part.vertices + shifts[part.part_id]) for part in parts)
        joined = rejoin_parts(artifacts["parts.npz"], manifest, parts, edited)
        self.assertGreater(joined.statistics["junction_faces"], 0)
        self.assertEqual(joined.statistics["connected_components"], 1)
        self.assertTrue(joined.mesh.is_watertight)

    def test_uv_seams_use_original_coincident_positions(self):
        vertices, faces, labels = prism_geometry()
        exploded = vertices[faces].reshape(-1, 3)
        manifest, artifacts = connection_fixture(geometry=(exploded, np.arange(len(exploded)).reshape(-1, 3), labels))
        parts = load_editable_parts(artifacts["parts.npz"], manifest)
        joined = rejoin_parts(artifacts["parts.npz"], manifest, parts, parts)
        self.assertEqual(len(joined.mesh.vertices), 16)
        self.assertEqual(joined.statistics["bridge_faces"], 0)
        self.assertTrue(joined.mesh.is_watertight)

    def test_empty_parts_and_gaps_without_original_contact_do_not_get_artificial_bridges(self):
        vertices, faces, labels = prism_geometry(1)
        other = vertices + [100, 0, 0]
        manifest, artifacts = connection_fixture(geometry=(np.vstack([vertices, other]), np.vstack([faces, faces + len(vertices)]), np.r_[labels, labels + 1]))
        manifest["parts"].append({**manifest["parts"][0], "part_id": 7, "name": "empty part", "npz_prefix": "part_0007",
                                  "vertex_count": 0, "face_count": 0, "geometry_name": None, "node_name": None})
        with np.load(io.BytesIO(artifacts["parts.npz"])) as data:
            arrays = {key: data[key] for key in data.files}
        arrays.update(part_0007_vertices=np.zeros((0, 3)), part_0007_faces=np.zeros((0, 3), dtype=int),
                      part_0007_source_vertex_indices=np.zeros(0, dtype=int), part_0007_source_face_indices=np.zeros(0, dtype=int))
        buffer = io.BytesIO()
        np.savez_compressed(buffer, **arrays)
        artifacts["parts.npz"] = buffer.getvalue()
        parts = load_editable_parts(artifacts["parts.npz"], manifest)
        joined = rejoin_parts(artifacts["parts.npz"], manifest, parts, parts)
        self.assertEqual(joined.statistics["connected_components"], 2)
        self.assertEqual(joined.statistics["bridge_faces"], 0)
        self.assertEqual(len(joined.mesh.faces), len(faces) * 2)

    def test_missing_or_corrupted_source_correspondence_is_rejected(self):
        manifest, artifacts = segmentation_fixture()
        self.assertFalse(has_rejoin_data(artifacts["parts.npz"], manifest))
        with np.load(io.BytesIO(self.content)) as data:
            arrays = {key: data[key] for key in data.files}
        arrays["part_0000_source_vertex_indices"] = arrays["part_0000_source_vertex_indices"][::-1]
        buffer = io.BytesIO()
        np.savez_compressed(buffer, **arrays)
        with self.assertRaisesRegex(ValueError, "対応が一致"):
            rejoin_parts(buffer.getvalue(), self.manifest, self.parts, self.edited())

    def test_mesh_topology_changes_are_rejected(self):
        edited = list(self.edited())
        edited[0] = replace(edited[0], faces=edited[0].faces[::-1])
        with self.assertRaisesRegex(ValueError, "構成が変更"):
            rejoin_parts(self.content, self.manifest, self.parts, tuple(edited))

    def test_single_glb_mesh_shares_vertex_accessor_and_preserves_palette_materials(self):
        joined = rejoin_parts(self.content, self.manifest, self.parts, self.edited())
        blob = export_rejoined_glb(joined, source_key="test")
        magic, version, length = struct.unpack_from("<4sII", blob)
        self.assertEqual((magic, version, length), (b"glTF", 2, len(blob)))
        json_length = struct.unpack_from("<I", blob, 12)[0]
        tree = json.loads(blob[20:20 + json_length])
        self.assertEqual(len(tree["meshes"]), 1)
        self.assertEqual(len(tree["nodes"]), 1)
        primitives = tree["meshes"][0]["primitives"]
        self.assertEqual(len(primitives), 3)
        self.assertEqual({item["attributes"]["POSITION"] for item in primitives}, {0})
        self.assertEqual(tree["accessors"][0]["count"], len(joined.mesh.vertices))
        for primitive in primitives:
            material = tree["materials"][primitive["material"]]
            color = material["pbrMetallicRoughness"]["baseColorFactor"]
            expected = trimesh.visual.color.hex_to_rgba(joined.palette[material["extras"]["part_id"]]) / 255
            np.testing.assert_allclose(color, expected)
            self.assertNotIn("COLOR_0", primitive["attributes"])
        loaded = trimesh.load(io.BytesIO(blob), file_type="glb", process=False, merge_primitives=True)
        self.assertEqual(len(loaded.geometry), 1)
        self.assertEqual(sum(len(mesh.faces) for mesh in loaded.geometry.values()), len(joined.mesh.faces))

    def test_npz_retains_welded_topology_labels_and_added_face_flags(self):
        joined = rejoin_parts(self.content, self.manifest, self.parts, self.edited())
        with np.load(io.BytesIO(export_rejoined_npz(joined)), allow_pickle=False) as data:
            np.testing.assert_array_equal(data["vertices"], joined.mesh.vertices)
            np.testing.assert_array_equal(data["faces"], joined.mesh.faces)
            np.testing.assert_array_equal(data["face_part_ids"], joined.face_part_ids)
            self.assertEqual(int(data["is_bridge"].sum()), 16)
            self.assertTrue(np.all(data["source_face_indices"][data["is_bridge"]] == -1))
            mesh = trimesh.Trimesh(data["vertices"], data["faces"], process=False)
            self.assertTrue(mesh.is_watertight)
            self.assertEqual(mesh.body_count, 1)

    def test_preview_is_one_trace_with_per_face_colors(self):
        joined = rejoin_parts(self.content, self.manifest, self.parts, self.edited())
        figure = mesh_figure([rejoined_payload(joined)], up_dir="+Z")
        self.assertEqual(figure.layout.scene.dragmode, "turntable")
        self.assertEqual(len(figure.data), 1)
        self.assertEqual(list(figure.data[0].facecolor), [joined.palette[int(index)] for index in joined.face_part_ids])

    def test_revision_tracks_editing_settings(self):
        metadata = {"root_id": 0, "enabled": True, "translations": {"0": [0, 0, 0]}}
        first = rejoin_input_key("source", {"0": 1}, metadata)
        self.assertNotEqual(first, rejoin_input_key("other", {"0": 1}, metadata))
        self.assertNotEqual(first, rejoin_input_key("source", {"0": 2}, metadata))
        self.assertNotEqual(first, rejoin_input_key("source", {"0": 1}, {**metadata, "enabled": False}))


class RejoiningInterfaceTests(unittest.TestCase):
    def test_button_creates_colored_joined_result_and_editing_invalidates_it(self):
        manifest, artifacts = connection_fixture()
        app = AppTest.from_file(str(Path(__file__).resolve().parents[1] / "app.py")).run()
        app.get("file_uploader")[0].set_value(("input.glb", artifacts["parts.glb"], "model/gltf-binary")).run()
        app.text_area[0].set_value("Scale middle.").run()
        plan = {**part_plan("Scale middle."), "parts": manifest["parts"]}
        with patch.object(BackendClient, "register", return_value={"model_id": "a" * 32}), patch.object(BackendClient, "recognize", return_value={"object_name": "object"}), patch.object(BackendClient, "plan", return_value=plan):
            app.button[0].click().run()
        with patch.object(BackendClient, "segment", return_value=manifest), patch.object(BackendClient, "download_artifact", side_effect=lambda result, name: artifacts[name]):
            app.button(key="segment").click().run()
        source = app.session_state["part_editing"]["source_key"]
        app.selectbox(key=f"connection_root_{source}").set_value(1).run()
        event = {"source_key": source, "sequence": 1, "scales": {"0": 1, "1": 2, "2": 1}}
        with patch("part_editor._component", return_value=event):
            app.run()
        self.assertNotIn("rejoined", app.session_state["part_editing"])
        app.button(key="rejoin_mesh").click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.error), 0)
        saved = app.session_state["part_editing"]["rejoined"]
        self.assertEqual(saved["result"].statistics["connected_components"], 1)
        self.assertEqual(saved["result"].statistics["bridge_faces"], 16)
        self.assertTrue(app.get("download_button"))
        app.checkbox(key=f"connection_points_{source}").set_value(False).run()
        self.assertIn("rejoined", app.session_state["part_editing"])
        event = {**event, "sequence": 2, "scales": {"0": 1, "1": 1.5, "2": 1}}
        with patch("part_editor._component", return_value=event):
            app.run()
        self.assertNotIn("rejoined", app.session_state["part_editing"])
        app.button(key="rejoin_mesh").click().run()
        self.assertIn("rejoined", app.session_state["part_editing"])
        app.checkbox(key=f"connection_follow_{source}").set_value(False).run()
        self.assertNotIn("rejoined", app.session_state["part_editing"])


if __name__ == "__main__":
    unittest.main()
