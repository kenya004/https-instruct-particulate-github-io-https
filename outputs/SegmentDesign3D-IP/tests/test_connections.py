from __future__ import annotations

import io
import json
import unittest
from dataclasses import replace
from pathlib import Path
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from backend_client import BackendClient
from connections import Connection, build_connection_plan, connection_payload, connection_residuals, detect_connections, follow_connections
from editing import export_edited_glb, load_editable_parts
from test_preparation import part_plan


def prism_geometry(count=3):
    vertices = np.array([[10 + x, 20 + y, 30 + z] for x in range(count + 1)
                         for y, z in [(-.5, -.5), (.5, -.5), (.5, .5), (-.5, .5)]])
    faces, labels = [[0, 3, 2], [0, 2, 1]], [0, 0]
    for part_id in range(count):
        for side in range(4):
            a, b = part_id * 4 + side, part_id * 4 + (side + 1) % 4
            faces.extend([[a, b, b + 4], [a, b + 4, a + 4]])
            labels.extend([part_id, part_id])
    end = count * 4
    faces.extend([[end, end + 1, end + 2], [end, end + 2, end + 3]])
    labels.extend([count - 1, count - 1])
    return vertices, np.asarray(faces), np.asarray(labels)


def connection_fixture(count=3, geometry=None):
    vertices, faces, labels = prism_geometry(count) if geometry is None else geometry
    arrays = {"vertices": vertices, "faces": faces, "face_part_ids": labels}
    records, scene = [], trimesh.Scene()
    for part_id in sorted(set(labels.tolist())):
        selected = np.flatnonzero(labels == part_id)
        indices, inverse = np.unique(faces[selected].reshape(-1), return_inverse=True)
        prefix = f"part_{part_id:04d}"
        mesh = trimesh.Trimesh(vertices=vertices[indices], faces=inverse.reshape(-1, 3), process=False)
        arrays.update({f"{prefix}_vertices": mesh.vertices, f"{prefix}_faces": mesh.faces,
                       f"{prefix}_source_vertex_indices": indices, f"{prefix}_source_face_indices": selected})
        color = ["#d77a35", "#168b83", "#8266aa"][part_id % 3]
        mesh.visual.face_colors = trimesh.visual.color.hex_to_rgba(color)
        scene.add_geometry(mesh, geom_name=prefix, node_name=f"node_{prefix}")
        records.append({"part_id": part_id, "name": ["left section", "middle section", "right section"][part_id % 3],
                        "label": "test", "description": "test", "is_edit_target": True, "color": color,
                        "npz_prefix": prefix, "geometry_name": prefix, "node_name": f"node_{prefix}",
                        "vertex_count": len(mesh.vertices), "face_count": len(mesh.faces), "is_watertight": mesh.is_watertight})
    manifest = {"model_id": "a" * 32, "plan_id": "b" * 32, "segmentation_id": "c" * 32,
                "status": "completed", "parts": records, "warnings": []}
    buffer = io.BytesIO()
    np.savez_compressed(buffer, **arrays)
    return manifest, {"parts.npz": buffer.getvalue(), "parts.glb": scene.export(file_type="glb"), "parts.json": json.dumps(manifest).encode()}


class ConnectionTests(unittest.TestCase):
    def setUp(self):
        self.manifest, self.artifacts = connection_fixture()
        self.parts = load_editable_parts(self.artifacts["parts.npz"], self.manifest)
        self.connections, self.warnings = detect_connections(self.artifacts["parts.npz"], self.parts)

    def test_shared_boundary_centers_and_lengths(self):
        self.assertEqual(self.warnings, ())
        self.assertEqual([(item.part_a, item.part_b) for item in self.connections], [(0, 1), (1, 2)])
        for item, x in zip(self.connections, [11, 12]):
            np.testing.assert_allclose(item.anchor, [x, 20, 30])
            self.assertEqual(item.boundary_length, 4)
            self.assertEqual(item.edge_count, 4)

    def test_middle_root_moves_both_neighbors_and_preserves_all_anchors(self):
        plan = build_connection_plan(self.parts, self.connections, 1)
        scales = {"0": 1, "1": 2, "2": 1}
        edited, offsets = follow_connections(self.parts, scales, plan)
        np.testing.assert_allclose(offsets[0], [-.5, 0, 0])
        np.testing.assert_allclose(offsets[1], [0, 0, 0])
        np.testing.assert_allclose(offsets[2], [.5, 0, 0])
        np.testing.assert_allclose(edited[1].center, self.parts[1].center)
        self.assertTrue(all(value < 1e-12 for value in connection_residuals(self.parts, scales, self.connections, offsets).values()))
        np.testing.assert_allclose(np.ptp(edited[0].vertices, axis=0), np.ptp(self.parts[0].vertices, axis=0))
        self.assertFalse(self.parts[0].vertices.flags.writeable)

    def test_translation_propagates_along_chain(self):
        plan = build_connection_plan(self.parts, self.connections, 0)
        edited, offsets = follow_connections(self.parts, {"0": 2, "1": 1, "2": 1}, plan)
        np.testing.assert_allclose(offsets[1], [.5, 0, 0])
        np.testing.assert_allclose(offsets[2], [.5, 0, 0])
        np.testing.assert_allclose(edited[2].center, [13, 20, 30])

    def test_scaling_follower_and_switching_root_are_computed_from_original(self):
        scales = {"0": 2, "1": .5, "2": 1.5}
        for root in (0, 2, 1, 0):
            plan = build_connection_plan(self.parts, self.connections, root)
            edited, offsets = follow_connections(self.parts, scales, plan)
            np.testing.assert_allclose(edited[root].center, self.parts[root].center)
            self.assertLess(max(connection_residuals(self.parts, scales, self.connections, offsets).values()), 1e-12)
        restored, offsets = follow_connections(self.parts, {"0": 1, "1": 1, "2": 1}, plan)
        for original, part in zip(self.parts, restored):
            np.testing.assert_array_equal(part.vertices, original.vertices)

    def test_exact_coordinate_duplicates_at_uv_seams_are_supported(self):
        vertices, faces, labels = prism_geometry()
        exploded = vertices[faces].reshape(-1, 3)
        manifest, artifacts = connection_fixture(geometry=(exploded, np.arange(len(exploded)).reshape(-1, 3), labels))
        parts = load_editable_parts(artifacts["parts.npz"], manifest)
        connections, warnings = detect_connections(artifacts["parts.npz"], parts)
        self.assertEqual(warnings, ())
        self.assertEqual(len(connections), 2)
        np.testing.assert_allclose([item.anchor for item in connections], [[11, 20, 30], [12, 20, 30]])

    def test_two_separate_boundaries_are_not_averaged_and_extra_constraint_is_reported(self):
        vertices, faces, labels = prism_geometry(2)
        other = vertices + [0, 4, 0]
        manifest, artifacts = connection_fixture(geometry=(np.vstack([vertices, other]), np.vstack([faces, faces + len(vertices)]), np.tile(labels, 2)))
        parts = load_editable_parts(artifacts["parts.npz"], manifest)
        connections, _ = detect_connections(artifacts["parts.npz"], parts)
        self.assertEqual(len(connections), 2)
        self.assertEqual(sorted(item.anchor[1] for item in connections), [20, 24])
        plan = build_connection_plan(parts, connections, 0)
        self.assertEqual(len(plan.unused_ids), 1)
        _, offsets = follow_connections(parts, {"0": 2, "1": 1}, plan)
        residuals = connection_residuals(parts, {"0": 2, "1": 1}, connections, offsets)
        self.assertAlmostEqual(residuals[plan.attachments[0].connection_id], 0)
        self.assertGreater(residuals[plan.unused_ids[0]], 1)

    def test_boundary_center_uses_length_not_vertex_count(self):
        # Subdivide one side of the connection ring unequally; the center stays the same.
        vertices, faces, labels = prism_geometry(2)
        vertex = (vertices[4] + vertices[5]) / 2
        vertices = np.vstack([vertices, vertex])
        updated_faces, updated_labels = [], []
        for face, label in zip(faces, labels):
            if 4 in face and 5 in face:
                third = next(int(index) for index in face if index not in (4, 5))
                updated_faces.extend([[4, len(vertices) - 1, third], [len(vertices) - 1, 5, third]])
                updated_labels.extend([label, label])
            else:
                updated_faces.append(face)
                updated_labels.append(label)
        manifest, artifacts = connection_fixture(geometry=(vertices, np.asarray(updated_faces), np.asarray(updated_labels)))
        parts = load_editable_parts(artifacts["parts.npz"], manifest)
        connections, _ = detect_connections(artifacts["parts.npz"], parts)
        np.testing.assert_allclose(connections[0].anchor, [11, 20, 30])
        self.assertEqual(connections[0].edge_count, 5)

    def test_nonmanifold_boundary_is_not_guessed(self):
        vertices = np.array([[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1], [0, -1, 0]], dtype=float)
        faces = np.array([[0, 1, 2], [0, 1, 3], [0, 1, 4]])
        manifest, artifacts = connection_fixture(geometry=(vertices, faces, np.array([0, 1, 2])))
        parts = load_editable_parts(artifacts["parts.npz"], manifest)
        connections, warnings = detect_connections(artifacts["parts.npz"], parts)
        self.assertEqual(connections, ())
        self.assertIn("3面以上", warnings[0])

    def test_point_contact_and_small_gap_do_not_create_connections(self):
        triangle = np.array([[0, 0, 0], [1, 0, 0], [0, 1, 0]], dtype=float)
        for other in (-triangle, triangle + [0, 0, 1e-9]):
            with self.subTest(other=other.tolist()):
                manifest, artifacts = connection_fixture(geometry=(np.vstack([triangle, other]), np.array([[0, 1, 2], [3, 4, 5]]), np.array([0, 1])))
                parts = load_editable_parts(artifacts["parts.npz"], manifest)
                connections, warnings = detect_connections(artifacts["parts.npz"], parts)
                self.assertEqual(connections, ())
                self.assertEqual(warnings, ())

    def test_disconnected_and_empty_parts_do_not_move_or_become_roots(self):
        disconnected = replace(self.parts[0], part_id=9, vertices=self.parts[0].vertices + [100, 0, 0])
        empty = replace(self.parts[0], part_id=7, vertices=np.zeros((0, 3)), faces=np.zeros((0, 3), dtype=int))
        parts = self.parts + (disconnected, empty)
        plan = build_connection_plan(parts, self.connections, 1)
        self.assertEqual(plan.roots, (1, 9))
        edited, offsets = follow_connections(parts, {"0": 1, "1": 2, "2": 1, "9": 1, "7": 1}, plan)
        np.testing.assert_array_equal(edited[3].vertices, disconnected.vertices)
        self.assertEqual(offsets[7].tolist(), [0, 0, 0])
        with self.assertRaises(ValueError):
            build_connection_plan(parts, self.connections, 7)

    def test_cycle_prefers_longer_boundaries_and_payload_is_parent_first(self):
        extra = Connection(2, 0, 2, np.array([11.5, 20, 30]), .1, 1)
        plan = build_connection_plan(self.parts, self.connections + (extra,), 2)
        self.assertEqual(plan.unused_ids, (2,))
        payload = connection_payload(plan)
        self.assertEqual([(item["parent_id"], item["child_id"]) for item in payload["attachments"]], [(2, 1), (1, 0)])

    def test_glb_contains_followed_positions_and_metadata(self):
        plan = build_connection_plan(self.parts, self.connections, 1)
        scales = {"0": 1, "1": 2, "2": 1}
        edited, offsets = follow_connections(self.parts, scales, plan)
        blob = export_edited_glb(edited, source_key="test", scales=scales, connection_metadata={"root_id": 1})
        scene = trimesh.load(io.BytesIO(blob), file_type="glb", process=False)
        np.testing.assert_allclose(scene.geometry["part_0000"].bounds.mean(axis=0), [10, 20, 30])
        np.testing.assert_allclose(scene.geometry["part_0002"].bounds.mean(axis=0), [13, 20, 30])
        self.assertEqual(scene.metadata["connection_following"]["root_id"], 1)


class ConnectionInterfaceTests(unittest.TestCase):
    def test_root_change_and_follow_toggle_update_python_mesh_without_segmentation(self):
        manifest, artifacts = connection_fixture()
        path = Path(__file__).resolve().parents[1] / "app.py"
        app = AppTest.from_file(str(path)).run()
        app.get("file_uploader")[0].set_value(("input.glb", artifacts["parts.glb"], "model/gltf-binary")).run()
        app.text_area[0].set_value("Scale the middle section.").run()
        plan = {**part_plan("Scale the middle section."), "parts": manifest["parts"], "part_names": [part["name"] for part in manifest["parts"]]}
        with patch.object(BackendClient, "register", return_value={"model_id": "a" * 32}), patch.object(BackendClient, "recognize", return_value={"object_name": "object"}), patch.object(BackendClient, "plan", return_value=plan):
            app.button[0].click().run()
        with patch.object(BackendClient, "segment", return_value=manifest), patch.object(BackendClient, "download_artifact", side_effect=lambda result, name: artifacts[name]):
            app.button(key="segment").click().run()
        self.assertEqual(len(app.exception), 0)
        source = app.session_state["part_editing"]["source_key"]
        app.selectbox(key=f"connection_root_{source}").set_value(1).run()
        event = {"source_key": source, "sequence": 1, "scales": {"0": 1, "1": 2, "2": 1}}
        with patch("part_editor._component", return_value=event):
            app.run()
        state = app.session_state["part_editing"]
        np.testing.assert_allclose(state["edited_parts"][0].center, [10, 20, 30])
        np.testing.assert_allclose(state["edited_parts"][2].center, [13, 20, 30])
        self.assertEqual(state["connections"]["root_id"], 1)
        self.assertTrue(state["connections"]["enabled"])
        app.checkbox(key=f"connection_follow_{source}").set_value(False).run()
        state = app.session_state["part_editing"]
        np.testing.assert_allclose(state["edited_parts"][0].center, [10.5, 20, 30])
        self.assertFalse(state["connections"]["enabled"])
        app.checkbox(key=f"connection_follow_{source}").set_value(True).run()
        app.selectbox(key=f"connection_root_{source}").set_value(0).run()
        state = app.session_state["part_editing"]
        np.testing.assert_allclose(state["edited_parts"][0].center, [10.5, 20, 30])
        np.testing.assert_allclose(state["edited_parts"][2].center, [13.5, 20, 30])
        self.assertEqual(len(app.exception), 0)


if __name__ == "__main__":
    unittest.main()
