from dataclasses import replace
import json
from pathlib import Path
import shutil
import subprocess
import unittest
from unittest.mock import patch

import numpy as np
import trimesh

from capping import cap_parts, export_capped_npz
from connection_overlap import (connections_from_closed, constrain_offsets, constraint_payload, evaluate_connections, extend_closed,
                                diagnose_extension, pose_closed, prepare_connections, reports_valid, suppress_connection_overlaps)
from connections import build_connection_plan, detect_connections
from connections import connection_payload
from editing import EditablePart, editor_payload
from mesh_overlaps import assemble_parts, find_face_overlaps
from test_capping import pack, hollow_prism, prism


def support_fixture(thickness=1):
    base = trimesh.creation.box([10, 10, thickness], transform=trimesh.transformations.translation_matrix([0, 0, thickness / 2]))
    post = trimesh.creation.box([2, 2, 4], transform=trimesh.transformations.translation_matrix([0, 0, thickness + 2]))
    joined = trimesh.boolean.union([base, post], engine="manifold")
    labels = (joined.triangles_center[:, 2] > thickness + 1e-7).astype(int)
    manifest, content, parts = pack(joined.vertices, joined.faces, labels)
    connections, _ = detect_connections(content, parts)
    plan = build_connection_plan(parts, connections, 0)
    return manifest, content, parts, plan


def double_connection_fixture():
    meshes = [trimesh.creation.box(size, transform=trimesh.transformations.translation_matrix(center))
              for size, center in [([1, 10, 6], [-.5, 0, 0]), ([3, 1, 1], [1.5, 0, 2]),
                                   ([3, 1, 1], [1.5, 0, -2]), ([1, 1, 5], [2.5, 0, 0])]]
    joined = trimesh.boolean.union(meshes, engine="manifold")
    manifest, content, parts = pack(joined.vertices, joined.faces, (joined.triangles_center[:, 0] > 1e-7).astype(int))
    connections, _ = detect_connections(content, parts)
    return manifest, content, parts, build_connection_plan(parts, connections, 0)


def hollow_fixture():
    manifest, content, parts = pack(*hollow_prism())
    connections, _ = detect_connections(content, parts)
    return manifest, content, parts, build_connection_plan(parts, connections, 0)


def intersection_fixture(*, created_by_extension=False):
    """A second closed component in the post intersects it before or after extrusion."""
    import io
    _, content, _, _ = support_fixture()
    size, center = ([1, 1, .2], [1.1, 0, .6]) if created_by_extension else ([2, 1, 1], [1, 0, 3])
    extra = trimesh.creation.box(size, transform=trimesh.transformations.translation_matrix(center))
    with np.load(io.BytesIO(content), allow_pickle=False) as data:
        vertices = np.vstack([data["vertices"], extra.vertices])
        faces = np.vstack([data["faces"], extra.faces + len(data["vertices"])])
        labels = np.r_[data["face_part_ids"], np.ones(len(extra.faces), dtype=int)]
    manifest, content, parts = pack(vertices, faces, labels)
    connections, _ = detect_connections(content, parts)
    return manifest, content, parts, build_connection_plan(parts, connections, 0)


def concave_cap_fixture():
    section = [[0, 0], [3, 0], [3, 3], [2, 3], [2, 1], [1, 1], [1, 3], [0, 3]]
    ends = [[0, 1, 4], [1, 2, 3], [1, 3, 4], [0, 4, 5], [0, 5, 7], [5, 6, 7]]
    manifest, content, parts = pack(*prism(section, ends))
    connections, _ = detect_connections(content, parts)
    return manifest, content, parts, build_connection_plan(parts, connections, 0)


class ConnectionOverlapTests(unittest.TestCase):
    def test_self_intersection_diagnostics_do_not_discard_extended_geometry(self):
        from boolean_union import union_parts
        for created in (False, True):
            with self.subTest(created_by_extension=created):
                manifest, content, parts, plan = intersection_fixture(created_by_extension=created)
                closed = cap_parts(content, manifest, parts, parts, triangulation="center_fan", shared_caps=True)
                context = connections_from_closed(content, manifest, parts, closed, plan, allow_intersections=True)
                posed = pose_closed(context, {"0": [0, 0, 0], "1": [0, 0, .5]}, {})
                reports = evaluate_connections(context, posed, strict=False)
                self.assertTrue(reports_valid(reports))
                generated = extend_closed(context, posed, reports, validate_self=False)
                result = diagnose_extension(context, posed, generated)
                self.assertGreater(result.statistics["extension_faces"], 0)
                self.assertGreater(result.statistics["self_intersection_pair_count"], 0)
                if created:
                    self.assertEqual(result.statistics["pre_extension_self_intersection_pair_count"], 0)
                else:
                    self.assertGreater(result.statistics["pre_extension_self_intersection_pair_count"], 0)
                self.assertNotIn("self_intersection_pairs", generated.parts[1].statistics)
                for record in result.parts:
                    ids = record.statistics["self_intersection_face_ids"]
                    self.assertTrue(all(0 <= face < len(record.part.faces) for face in ids))
                    self.assertEqual(set(ids), set(np.asarray(record.statistics["self_intersection_pairs"]).reshape(-1)))
                with self.assertRaisesRegex(ValueError, "自己交差"):
                    union_parts(result)

    def test_projected_cap_overlap_is_allowed_for_the_extension_preview(self):
        manifest, content, parts, plan = concave_cap_fixture()
        closed = cap_parts(content, manifest, parts, parts, triangulation="center_fan", shared_caps=True)
        self.assertGreater(closed.statistics["projected_problem_sections"], 0)
        with self.assertRaisesRegex(ValueError, "投影の不整合"):
            connections_from_closed(content, manifest, parts, closed, plan)
        context = connections_from_closed(content, manifest, parts, closed, plan, allow_intersections=True)
        reports = evaluate_connections(context, closed, strict=False)
        generated = extend_closed(context, closed, reports, validate_self=False)
        result = diagnose_extension(context, closed, generated)
        self.assertGreater(result.statistics["self_intersection_pair_count"], 0)

    def test_saved_caps_extend_past_five_percent_without_being_recreated(self):
        from boolean_union import union_parts
        from capping import cap_parts
        manifest, content, parts, plan = support_fixture()
        closed = cap_parts(content, manifest, parts, parts, triangulation="center_fan", shared_caps=True)
        with patch("connection_overlap.cap_parts", side_effect=AssertionError("Reuse the saved caps")):
            context = connections_from_closed(content, manifest, parts, closed, plan)
        offsets = {"0": [0, 0, 0], "1": [0, 0, .5]}
        posed = pose_closed(context, offsets, {})
        reports = evaluate_connections(context, posed)
        self.assertTrue(reports_valid(reports))
        self.assertIsNone(reports[0]["maximum"])
        self.assertAlmostEqual(reports[0]["length"], .52)
        result = extend_closed(context, posed, reports, validate_self=True)
        self.assertAlmostEqual(union_parts(result).mesh.volume, 118)
        self.assertEqual(offsets["1"], [0, 0, .5])

    @unittest.skipUnless(shutil.which("node"), "Node.js is required for preview parity")
    def test_saved_closure_browser_preview_matches_python_after_free_movement(self):
        from solid_panel import closed_editor_payload
        context, zero = self.prepare()
        snapshot = {"context": context, "result": context.base}
        payload = closed_editor_payload(snapshot, "staged-parity")
        offsets = {**zero, "1": [7, 0, .5]}
        expected = pose_closed(context, offsets, {})
        manifest, content, parts, plan = support_fixture()
        args = {"source_key": "staged-parity", "parts": editor_payload(parts), "scales": {"0": 1, "1": 1},
                "offsets": offsets, "follow": False, "solid_connections": payload}
        program = """import fs from 'node:fs';
import {evaluateConnections} from './scale_component/src/connection_constraints.js';
process.stdout.write(JSON.stringify(evaluateConnections(JSON.parse(fs.readFileSync(0,'utf8')))));"""
        process = subprocess.run([shutil.which("node"), "--input-type=module", "-e", program],
            input=json.dumps(args), text=True, capture_output=True, check=True, cwd=Path(__file__).resolve().parents[1])
        preview = json.loads(process.stdout)
        self.assertTrue(preview["preview_only"])
        self.assertEqual(preview["stats"]["rays"], 0)
        for record in expected.parts:
            actual = preview["preview"]["parts"][str(record.part.part_id)]
            np.testing.assert_allclose(actual["vertices"], record.part.vertices, atol=1e-12)
            np.testing.assert_array_equal(np.asarray(actual["faces"]).reshape(-1, 3), record.part.faces[record.is_cap])

    def prepare(self, fixture=support_fixture):
        manifest, content, parts, plan = fixture()
        context = prepare_connections(content, manifest, parts, parts, plan)
        return context, {str(p.part_id): [0, 0, 0] for p in parts}

    def test_contact_stays_unextended_and_tangent_motion_builds_a_closed_collar(self):
        context, zero = self.prepare()
        initial = pose_closed(context, zero, {})
        reports = evaluate_connections(context, initial)
        self.assertTrue(reports_valid(reports))
        self.assertEqual(reports[0]["length"], 0)
        before = [p.part.vertices.copy() for p in context.base.parts]
        moved = pose_closed(context, {**zero, "1": [.4, 0, 0]}, {})
        reports = evaluate_connections(context, moved)
        self.assertTrue(reports_valid(reports))
        self.assertAlmostEqual(reports[0]["depth"], .02)
        self.assertAlmostEqual(reports[0]["length"], .02)
        self.assertAlmostEqual(reports[0]["maximum"], .1)
        result = extend_closed(context, moved, reports, validate_self=True)
        self.assertGreater(result.statistics["extension_faces"], 0)
        for record in result.parts:
            mesh = trimesh.Trimesh(record.part.vertices, record.part.faces, process=False)
            self.assertTrue(mesh.is_volume)
            self.assertEqual(len(record.source_vertex_indices), len(record.part.vertices))
            self.assertEqual(len(record.source_face_indices), len(record.part.faces))
        for record, unchanged in zip(context.base.parts, before):
            np.testing.assert_array_equal(record.part.vertices, unchanged)

    def test_normal_gap_plus_depth_and_five_percent_limit(self):
        context, zero = self.prepare()
        near = pose_closed(context, {**zero, "1": [0, 0, .05]}, {})
        reports = evaluate_connections(context, near)
        self.assertTrue(reports_valid(reports))
        self.assertAlmostEqual(reports[0]["length"], .07)
        far = {**zero, "1": [0, 0, .2]}
        self.assertFalse(reports_valid(evaluate_connections(context, pose_closed(context, far, {}))))
        accepted, reports, clamped = constrain_offsets(context, zero, far, {})
        self.assertTrue(clamped)
        self.assertTrue(reports_valid(reports))
        self.assertGreater(accepted["1"][2], .079)
        self.assertLessEqual(accepted["1"][2], .080001)

    def test_platform_edge_stops_motion_before_a_partial_footprint_falls_off(self):
        context, zero = self.prepare()
        requested = {**zero, "1": [4.2, 0, 0]}
        accepted, reports, clamped = constrain_offsets(context, zero, requested, {})
        self.assertTrue(clamped)
        self.assertLessEqual(accepted["1"][0], 4)
        self.assertTrue(reports_valid(reports))

    def test_wall_thickness_reduces_depth_without_punching_through(self):
        context, zero = self.prepare(lambda: support_fixture(.05))
        moved = pose_closed(context, {**zero, "1": [.2, 0, 0]}, {})
        reports = evaluate_connections(context, moved)
        self.assertTrue(reports_valid(reports))
        self.assertAlmostEqual(reports[0]["depth"], .005)
        self.assertAlmostEqual(reports[0]["length"], .005)

    def test_axial_extension_of_a_hollow_part_preserves_the_inner_void(self):
        from boolean_union import union_parts
        manifest, content, parts, plan = hollow_fixture()
        context = prepare_connections(content, manifest, parts, parts, plan, triangulation="earcut")
        offsets = {"0": [0, 0, 0], "1": [.02, 0, 0], "2": [0, 0, 0]}
        posed = pose_closed(context, offsets, {})
        reports = evaluate_connections(context, posed)
        self.assertTrue(reports_valid(reports), reports)
        ready = extend_closed(context, posed, reports, validate_self=True)
        result = union_parts(ready)
        self.assertTrue(result.mesh.is_volume)
        self.assertAlmostEqual(result.mesh.volume, 36)

    def test_all_connections_are_checked_even_when_following_uses_only_one(self):
        context, zero = self.prepare(double_connection_fixture)
        self.assertEqual(len(context.regions), 2)
        small = evaluate_connections(context, pose_closed(context, {**zero, "1": [0, 0, .1]}, {}))
        self.assertTrue(reports_valid(small))
        self.assertTrue(all(r["length"] > 0 for r in small))
        broken = evaluate_connections(context, pose_closed(context, {**zero, "1": [0, 0, .6]}, {}))
        self.assertEqual(sum(r["valid"] for r in broken), 1)
        self.assertFalse(reports_valid(broken))

    def test_payload_and_fixed_boundary_motion_keep_the_original_vertex_mapping(self):
        context, zero = self.prepare()
        payload = constraint_payload(context, context.base)
        self.assertEqual(payload["depth_ratio"], .01)
        self.assertEqual(payload["max_extension_ratio"], .05)
        count = context.original_counts[1]
        weights = np.ones(count)
        region = context.regions[0]
        weights[np.unique(np.concatenate(region["child_loops"]))] = 0
        posed = pose_closed(context, {**zero, "1": [.2, 0, 0]}, {"parts": {"1": {"weights": weights}}})
        self.assertEqual(evaluate_connections(context, posed)[0]["status"], "contact")

    def test_only_intended_contact_intersections_are_hidden(self):
        parent = EditablePart(0, "body", "#aaaaaa", None, None,
            np.array([[-10, -10, 0], [10, -10, 0], [0, 10, 0]], dtype=float), np.array([[0, 1, 2]]))
        child = EditablePart(1, "handle", "#bbbbbb", None, None, np.array([
            [-.2, 0, -1], [.2, 0, -1], [0, 0, .02],
            [4, -.2, -1], [4, .2, -1], [4, 0, 1],
            [0, -.2, -.5], [0, .2, -.5], [0, 0, .5]], dtype=float),
            np.arange(9).reshape(-1, 3))
        parts = (parent, child)
        vertices, faces, _ = assemble_parts(parts)
        report = find_face_overlaps(vertices, faces)
        connection = {"valid": True, "status": "extended", "parent_id": 0, "child_id": 1,
                      "cap_id": 7, "normal": [0, 0, -1], "length": .02, "width": .4}
        region = {"cap_id": 7, "child_loops": [[0, 1, 2]]}
        filtered = suppress_connection_overlaps(report, parts, [connection], [region])
        self.assertGreater(filtered["intentional_connection_pairs"], 0)
        pairs = {tuple(pair) for pair in filtered["pairs"]}
        self.assertNotIn((0, 1), pairs)  # Contact inside the collar footprint.
        self.assertIn((0, 2), pairs)  # Same two parts, but a different distant crossing.
        self.assertIn((1, 3), pairs)  # Self-intersections are always retained.
        self.assertEqual(filtered["face_ids"], sorted(set(np.asarray(filtered["pairs"]).reshape(-1))))

    @unittest.skipUnless(shutil.which("node"), "Node.js is required for preview parity")
    def test_actual_mesh_fixtures_match_browser_connection_evaluation(self):
        program = """import fs from 'node:fs';
import {evaluateConnections} from './scale_component/src/connection_constraints.js';
const args=JSON.parse(fs.readFileSync(0,'utf8'));
const result=evaluateConnections(args);
process.stdout.write(JSON.stringify({valid:result.valid,reports:result.reports}));"""
        for fixture, offsets, triangulation in [(support_fixture, [.4, 0, 0], "center_fan"),
                                 (support_fixture, [0, 0, .2], "center_fan"),
                                 (support_fixture, [0, 0, 0], "center_fan"),
                                 (double_connection_fixture, [0, 0, .1], "center_fan"),
                                 (double_connection_fixture, [0, 0, .6], "center_fan"),
                                 (hollow_fixture, [.02, 0, 0], "earcut")]:
            with self.subTest(fixture=fixture.__name__, offset=offsets):
                manifest, content, parts, plan = fixture()
                context = prepare_connections(content, manifest, parts, parts, plan, triangulation=triangulation)
                requested = {str(p.part_id): [0, 0, 0] for p in parts}
                requested["1"] = offsets
                posed = pose_closed(context, requested, {})
                reports = evaluate_connections(context, posed)
                args = {"source_key": "parity", "parts": editor_payload(parts), "scales": {str(p.part_id): 1 for p in parts},
                        "offsets": requested, "layout": connection_payload(plan), "follow": False,
                        "blending": {"parts": {}, "anchors": {}}, "boundary_motion": {"parts": {}},
                        "solid_connections": constraint_payload(context, context.base)}
                process = subprocess.run([shutil.which("node"), "--input-type=module", "-e", program],
                    input=json.dumps(args), text=True, capture_output=True, check=True,
                    cwd=Path(__file__).resolve().parents[1])
                actual = json.loads(process.stdout)
                self.assertEqual(actual["valid"], reports_valid(reports), actual)
                for expected, preview in zip(reports, actual["reports"]):
                    self.assertEqual(expected["valid"], preview["valid"])
                    if expected["valid"]:
                        self.assertAlmostEqual(expected["length"], preview["length"], places=7)


if __name__ == "__main__":
    unittest.main()
