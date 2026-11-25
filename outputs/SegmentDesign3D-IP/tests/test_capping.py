from __future__ import annotations

from dataclasses import replace
import io
import json
import unittest
from unittest.mock import patch

import numpy as np
import trimesh

from capping import _triangulate_point_only, cap_parts, capped_payloads, cut_loop_catalog, export_capped_glb, export_capped_npz
from editing import load_editable_parts


def pack(vertices, faces, labels):
    vertices, faces, labels = np.asarray(vertices, dtype=float), np.asarray(faces, dtype=np.int64), np.asarray(labels)
    arrays = {"vertices": vertices, "faces": faces, "face_part_ids": labels}
    records = []
    for part_id in sorted(set(labels.tolist())):
        selected = np.flatnonzero(labels == part_id)
        indices, inverse = np.unique(faces[selected].reshape(-1), return_inverse=True)
        prefix = f"part_{part_id:04d}"
        local = inverse.reshape(-1, 3)
        arrays.update({f"{prefix}_vertices": vertices[indices], f"{prefix}_faces": local,
                       f"{prefix}_source_vertex_indices": indices, f"{prefix}_source_face_indices": selected})
        records.append({"part_id": part_id, "name": f"section {part_id}", "color": ["#d77a35", "#168b83", "#8266aa"][part_id % 3],
                        "npz_prefix": prefix, "geometry_name": prefix, "node_name": f"node_{prefix}",
                        "vertex_count": len(indices), "face_count": len(local)})
    manifest = {"model_id": "a" * 32, "plan_id": "b" * 32, "segmentation_id": "c" * 32, "parts": records}
    buffer = io.BytesIO()
    np.savez_compressed(buffer, **arrays)
    content = buffer.getvalue()
    return manifest, content, load_editable_parts(content, manifest)


def prism(section=None, triangles=None, rings=None):
    section = np.asarray(section if section is not None else [[0, 0], [2, 0], [2, 2], [0, 2]], dtype=float)
    triangles = np.asarray(triangles if triangles is not None else [[0, 1, 2], [0, 2, 3]])
    rings = rings or [list(range(len(section)))]
    size = len(section)
    vertices = np.array([[x, y, z] for x in [0, 1, 2, 3] for y, z in section])
    faces, labels = triangles[:, ::-1].tolist(), [0] * len(triangles)
    for step in range(3):
        for ring in rings:
            for i, j in zip(ring, ring[1:] + ring[:1]):
                a, b = step * size + i, step * size + j
                faces.extend([[a, b, b + size], [a, b + size, a + size]])
                labels.extend([step, step])
    faces.extend((triangles + 3 * size).tolist())
    labels.extend([2] * len(triangles))
    return vertices, np.asarray(faces), np.asarray(labels)


def hollow_prism():
    section = [[-2, -2], [2, -2], [2, 2], [-2, 2], [-1, -1], [1, -1], [1, 1], [-1, 1]]
    triangles = []
    for i in range(4):
        j = (i + 1) % 4
        triangles.extend([[i, j, j + 4], [i, j + 4, i + 4]])
    return prism(section, triangles, [[0, 1, 2, 3], [4, 7, 6, 5]])


def nonplanar_prism():
    angles = np.arange(8) * np.pi / 4
    section = np.column_stack([np.cos(angles), np.sin(angles)])
    vertices, faces, labels = prism(section, [[0, i, i + 1] for i in range(1, 7)])
    cuts = (vertices[:, 0] == 1) | (vertices[:, 0] == 2)
    # Eight-edge cuts with >10% nonplanarity, comparable to the reported case.
    vertices[cuts, 0] += .4 * np.sin(2 * np.arctan2(vertices[cuts, 2], vertices[cuts, 1]))
    return vertices, faces, labels


class PointOnlyTriangulationTests(unittest.TestCase):
    frame = {"center": np.zeros(3), "basis": np.array([[1, 0, 0], [0, 1, 0]]), "scale": 1.0}

    def test_concave_middle_vertex_is_accepted_even_outside_projected_polygon(self):
        vertices = np.array([[3, 3, 0], [1.5, 1.5, 1], [0, 3, 0], [0, 0, 0], [3, 0, 0]])
        triangles, info = _triangulate_point_only(vertices, [np.arange(5)], self.frame)
        np.testing.assert_array_equal(triangles[0], [0, 2, 1])
        self.assertEqual(info["rejected_interior"], 0)
        self.assertFalse(info["convexity_check"])
        self.assertFalse(info["triangle_area_check"])

    def test_another_remaining_vertex_strictly_inside_still_rejects_candidate(self):
        vertices = np.array([[0, 0, 0], [3, 0, 0], [0, 3, 0], [.5, .5, 0], [-1, 1, 0]])
        triangles, info = _triangulate_point_only(vertices, [np.arange(5)], self.frame)
        self.assertEqual(info["candidate_sample"][0], {"vertices": [0, 1, 2], "accepted": False, "interior_vertices": [3]})
        self.assertGreater(info["rejected_interior"], 0)
        self.assertFalse(any(set(face) == {0, 1, 2} for face in triangles))
        self.assertEqual(len(triangles), 3)

    def test_projected_coincidence_keeps_distinct_3d_vertices_and_zero_2d_area_face(self):
        vertices = np.array([[0, 0, 0], [1, 0, 0], [1, 0, 1], [1, 1, 0], [0, 1, 0]])
        triangles, info = _triangulate_point_only(vertices, [np.arange(5)], self.frame)
        np.testing.assert_array_equal(triangles[0], [0, 2, 1])
        first = vertices[triangles[0]]
        self.assertAlmostEqual(np.linalg.norm(np.cross(first[1] - first[0], first[2] - first[0])) / 2, .5)
        self.assertEqual(info["accepted_candidates"], 3)
        self.assertEqual(set(triangles.reshape(-1)), set(range(5)))

    def test_zero_3d_area_is_retained_and_recorded_instead_of_rejected(self):
        section = [[0, 0], [1, 0], [2, 0], [2, 2], [0, 2]]
        end_faces = [[0, 1, 4], [1, 3, 4], [1, 2, 3]]
        manifest, content, parts = pack(*prism(section, end_faces))
        result = cap_parts(content, manifest, parts, parts, triangulation="point_only")
        self.assertEqual(result.statistics["closed_sections"], 4)
        self.assertGreater(result.statistics["degenerate_cap_faces"], 0)
        for record, original in zip(result.parts, parts):
            np.testing.assert_array_equal(record.part.vertices, original.vertices)
            self.assertEqual(len(record.part.faces) - len(original.faces), 3 * record.statistics["closed_sections"])
            for face in record.statistics["degenerate_cap_face_ids"]:
                self.assertTrue(record.is_cap[face])
        with np.load(io.BytesIO(export_capped_npz(result, source_key="point-only", editing_metadata={})), allow_pickle=False) as data:
            saved = json.loads(data["metadata_json"].item())
            self.assertEqual(saved["statistics"]["triangulation"], "point_only")
            self.assertGreater(saved["statistics"]["degenerate_cap_faces"], 0)

    def test_hollow_sections_are_not_filled_as_disks_by_experimental_method(self):
        manifest, content, parts = pack(*hollow_prism())
        result = cap_parts(content, manifest, parts, parts, triangulation="point_only")
        self.assertEqual(result.statistics["added_faces"], 0)
        self.assertEqual(result.statistics["skipped_sections"], 4)
        self.assertTrue(all("Earcut" in skipped["reason"] for p in result.parts for skipped in p.statistics["skipped"]))
        conventional = cap_parts(content, manifest, parts, parts, triangulation="earcut")
        self.assertEqual(conventional.statistics["closed_sections"], 4)


class StartVertexTests(unittest.TestCase):
    def test_only_selected_cut_changes_and_current_geometry_is_preserved(self):
        manifest, content, parts = pack(*nonplanar_prism())
        catalog = cut_loop_catalog(content, manifest, parts)
        self.assertEqual([item["part_id"] for item in catalog], [0, 1, 1, 2])
        self.assertEqual(len({item["loop_key"] for item in catalog}), 4)
        target = catalog[1]
        edited = tuple(replace(p, vertices=p.vertices * 1.3 + [2, 3, 4]) for p in parts)
        baseline = cap_parts(content, manifest, parts, edited, allow_nonplanar=True, triangulation="point_only")
        shifted = cap_parts(content, manifest, parts, edited, allow_nonplanar=True, triangulation="point_only",
                            start_offsets={target["loop_key"]: 1})
        changed = 0
        for before, after, current in zip(baseline.parts, shifted.parts, edited):
            np.testing.assert_array_equal(after.part.vertices, current.vertices)
            np.testing.assert_array_equal(after.part.faces[:len(current.faces)], current.faces)
            self.assertTrue(after.statistics["is_watertight"])
            self.assertTrue(after.statistics["is_winding_consistent"])
            for first, second in zip(before.statistics["sections"], after.statistics["sections"]):
                initial, updated = first["start_vertices"][0], second["start_vertices"][0]
                self.assertEqual(first["planarity"], second["planarity"])
                first_faces = before.part.faces[before.cap_ids == first["cap_id"]]
                second_faces = after.part.faces[after.cap_ids == second["cap_id"]]
                if initial["loop_key"] == target["loop_key"]:
                    expected = target["vertices"][1:4]
                    self.assertEqual(updated["first_candidate"], expected)
                    self.assertEqual(updated["start_offset"], 1)
                    self.assertEqual(second["triangulation"]["candidate_sample"][0]["vertices"], expected)
                    self.assertFalse(np.array_equal(first_faces, second_faces))
                    changed += 1
                else:
                    self.assertEqual(initial, updated)
                    np.testing.assert_array_equal(first_faces, second_faces)
        self.assertEqual(changed, 1)
        with np.load(io.BytesIO(export_capped_npz(shifted, source_key="start-test", editing_metadata={})), allow_pickle=False) as data:
            saved = json.loads(data["metadata_json"].item())
        self.assertEqual(saved["statistics"]["start_offsets"], {target["loop_key"]: 1})

    def test_start_cycles_through_every_boundary_vertex_and_returns_to_original(self):
        manifest, content, parts = pack(*prism())
        target = cut_loop_catalog(content, manifest, parts)[0]
        baseline = cap_parts(content, manifest, parts, parts, triangulation="point_only")
        for offset in range(target["vertex_count"] + 1):
            result = cap_parts(content, manifest, parts, parts, triangulation="point_only",
                               start_offsets={target["loop_key"]: offset})
            loop = result.parts[0].statistics["loop_planarity"][0]
            self.assertEqual(loop["start_vertex"], target["vertices"][offset % target["vertex_count"]])
            self.assertEqual(loop["start_offset"], offset % target["vertex_count"])
        self.assertEqual(result.statistics["start_offsets"], {})
        for before, after in zip(baseline.parts, result.parts):
            np.testing.assert_array_equal(before.part.faces, after.part.faces)

    def test_earcut_inner_loop_start_preserves_hollow_sections(self):
        manifest, content, parts = pack(*hollow_prism())
        catalog = cut_loop_catalog(content, manifest, parts)
        result = cap_parts(content, manifest, parts, parts, triangulation="earcut",
                           start_offsets={item["loop_key"]: 1 for item in catalog})
        self.assertEqual(result.statistics["closed_sections"], 4)
        self.assertEqual(result.statistics["closed_loops"], 8)
        self.assertEqual(result.statistics["added_faces"], 32)
        for record in result.parts:
            self.assertTrue(record.statistics["is_watertight"])
            self.assertTrue(record.statistics["is_winding_consistent"])
            self.assertTrue(all(section["holes"] == 1 for section in record.statistics["sections"]))

    def test_skipped_nonplanar_loop_still_records_selected_start(self):
        manifest, content, parts = pack(*nonplanar_prism())
        target = cut_loop_catalog(content, manifest, parts)[0]
        result = cap_parts(content, manifest, parts, parts, start_offsets={target["loop_key"]: 2})
        self.assertEqual(result.statistics["added_faces"], 0)
        info = result.parts[0].statistics["loop_planarity"][0]
        self.assertEqual(info["start_offset"], 2)
        self.assertEqual(info["start_vertex"], target["vertices"][2])

    def test_invalid_start_settings_are_rejected(self):
        manifest, content, parts = pack(*prism())
        loop_key = cut_loop_catalog(content, manifest, parts)[0]["loop_key"]
        for offsets in ([0], {loop_key: True}, {loop_key: "1"}, {"unknown": 1}):
            with self.subTest(offsets=offsets), self.assertRaisesRegex(ValueError, "開始頂点"):
                cap_parts(content, manifest, parts, parts, start_offsets=offsets)


class CutCappingTests(unittest.TestCase):
    def test_two_separate_cuts_are_closed_on_each_independent_part(self):
        manifest, content, parts = pack(*prism())
        edited = tuple(replace(p, vertices=p.vertices * (1 + p.part_id / 5) + [0, p.part_id, 0]) for p in parts)
        before = [p.vertices.copy() for p in parts]
        result = cap_parts(content, manifest, parts, edited)
        self.assertEqual([p.statistics["closed_sections"] for p in result.parts], [1, 2, 1])
        self.assertEqual(result.statistics["closed_loops"], 4)
        self.assertEqual(result.statistics["added_faces"], 8)
        for original, current, record, untouched in zip(parts, edited, result.parts, before):
            self.assertTrue(record.statistics["is_watertight"])
            self.assertTrue(record.statistics["is_winding_consistent"])
            self.assertEqual(record.statistics["cut_boundary_edges_after"], 0)
            self.assertEqual(record.statistics["cap_overlap_pair_count"], 0)
            np.testing.assert_array_equal(original.vertices, untouched)
            np.testing.assert_array_equal(record.part.vertices, current.vertices)
            np.testing.assert_array_equal(record.part.vertices[record.part.faces[:len(original.faces)]], current.vertices[current.faces])
            self.assertTrue(np.all(record.source_face_indices[record.is_cap] == -1))

    def test_concave_section_is_not_filled_by_a_center_fan(self):
        section = [[0, 0], [2, 0], [2, 1], [1, 1], [1, 2], [0, 2]]
        triangles = [[0, 1, 3], [1, 2, 3], [0, 3, 5], [3, 4, 5]]
        manifest, content, parts = pack(*prism(section, triangles))
        result = cap_parts(content, manifest, parts, parts)
        self.assertEqual(result.statistics["skipped_sections"], 0)
        for record in result.parts:
            mesh = trimesh.Trimesh(vertices=record.part.vertices, faces=record.part.faces[record.is_cap], process=False)
            self.assertAlmostEqual(mesh.area, record.statistics["closed_sections"] * 3)
            self.assertTrue(record.statistics["is_watertight"])

    def test_curved_handle_with_two_attachments_to_the_same_body(self):
        mesh = trimesh.creation.torus(major_radius=3, minor_radius=.4, major_sections=32, minor_sections=12)
        labels = (mesh.triangles_center[:, 0] > 0).astype(int)
        manifest, content, parts = pack(mesh.vertices, mesh.faces, labels)
        edited = (parts[0], replace(parts[1], vertices=parts[1].center + 1.3 * (parts[1].vertices - parts[1].center)))
        result = cap_parts(content, manifest, parts, edited)
        self.assertEqual([p.statistics["closed_sections"] for p in result.parts], [2, 2])
        self.assertTrue(all(p.statistics["is_watertight"] for p in result.parts))
        self.assertTrue(all(p.statistics["is_winding_consistent"] for p in result.parts))
        self.assertTrue(all(p.statistics["cap_overlap_pair_count"] == 0 for p in result.parts))

    def test_hollow_section_keeps_inner_void_and_cap_orientation(self):
        manifest, content, parts = pack(*hollow_prism())
        result = cap_parts(content, manifest, parts, parts)
        self.assertEqual(result.statistics["closed_sections"], 4)
        self.assertEqual(result.statistics["closed_loops"], 8)
        for record in result.parts:
            mesh = trimesh.Trimesh(vertices=record.part.vertices, faces=record.part.faces, process=False)
            self.assertTrue(mesh.is_volume)
            self.assertAlmostEqual(mesh.volume, 12)
            area = trimesh.Trimesh(vertices=record.part.vertices, faces=record.part.faces[record.is_cap], process=False).area
            self.assertAlmostEqual(area, 12 * record.statistics["closed_sections"])
            self.assertEqual(record.statistics["cap_overlap_pair_count"], 0)

    def test_collinear_boundary_vertices_remain_shared_by_cap_and_side(self):
        section = [[0, 0], [1, 0], [2, 0], [2, 2], [0, 2]]
        triangles = [[0, 1, 4], [1, 3, 4], [1, 2, 3]]
        manifest, content, parts = pack(*prism(section, triangles))
        result = cap_parts(content, manifest, parts, parts)
        self.assertEqual(result.statistics["skipped_sections"], 0)
        self.assertTrue(all(r.statistics["is_watertight"] for r in result.parts))
        self.assertEqual(result.statistics["added_faces"], 12)

    def test_original_opening_is_kept_and_no_cut_means_no_cap(self):
        vertices, faces, labels = prism()
        manifest, content, parts = pack(vertices, faces[1:], labels[1:])
        result = cap_parts(content, manifest, parts, parts)
        self.assertEqual(result.parts[0].statistics["closed_sections"], 1)
        self.assertEqual(result.parts[0].statistics["original_open_edges"], 3)
        self.assertEqual(result.parts[0].statistics["remaining_boundary_edges"], 3)
        self.assertFalse(result.parts[0].statistics["is_watertight"])
        manifest, content, parts = pack(vertices, faces[1:], np.zeros(len(faces) - 1, dtype=int))
        result = cap_parts(content, manifest, parts, parts)
        self.assertEqual(result.statistics["added_faces"], 0)
        self.assertEqual(result.parts[0].statistics["remaining_boundary_edges"], 3)

    def test_cut_chain_ending_at_an_existing_opening_is_reported(self):
        vertices, faces, labels = prism()
        # This original hole removes one edge from the x=1 cut cycle.
        selected = np.ones(len(faces), dtype=bool)
        selected[3] = False
        manifest, content, parts = pack(vertices, faces[selected], labels[selected])
        result = cap_parts(content, manifest, parts, parts)
        self.assertGreater(result.statistics["skipped_sections"], 0)
        self.assertGreater(result.parts[0].statistics["cut_boundary_edges_after"], 0)

    def test_seam_copies_weld_in_derived_mesh_only_and_keep_provenance(self):
        vertices, faces, labels = prism()
        exploded = vertices[faces].reshape(-1, 3)
        manifest, content, parts = pack(exploded, np.arange(len(exploded)).reshape(-1, 3), labels * 4)
        result = cap_parts(content, manifest, parts, parts)
        self.assertEqual([p.part.part_id for p in result.parts], [0, 4, 8])
        for original, record in zip(parts, result.parts):
            self.assertGreater(record.statistics["welded_seam_vertices"], 0)
            self.assertTrue(record.statistics["is_watertight"])
            np.testing.assert_array_equal(record.part.vertices, original.vertices)
            self.assertEqual(len(record.source_vertex_indices), len(original.vertices))

    def test_nonplanar_boundary_is_not_flattened_and_bad_cuts_are_skipped(self):
        manifest, content, parts = pack(*prism())
        for displacement, expect_all in ((.002, True), (.9, False)):
            edited = []
            for part in parts:
                vertices = part.vertices.copy()
                seam = np.flatnonzero(np.all(vertices == [1, 0, 0], axis=1))
                vertices[seam, 0] += displacement
                edited.append(replace(part, vertices=vertices))
            result = cap_parts(content, manifest, parts, edited)
            self.assertEqual(result.statistics["closed_sections"] == 4, expect_all)
            for record, current in zip(result.parts, edited):
                np.testing.assert_array_equal(record.part.vertices, current.vertices)
            if not expect_all:
                self.assertGreater(result.statistics["skipped_sections"], 0)

    def test_nonplanar_opt_in_closes_eight_edge_cuts_without_moving_vertices(self):
        manifest, content, parts = pack(*nonplanar_prism())
        conservative = cap_parts(content, manifest, parts, parts)
        self.assertEqual(conservative.statistics["added_faces"], 0)
        self.assertEqual(conservative.statistics["skipped_sections"], 4)
        attempted = cap_parts(content, manifest, parts, parts, allow_nonplanar=True)
        self.assertEqual(attempted.statistics["closed_sections"], 4)
        self.assertEqual(attempted.statistics["nonplanar_sections"], 4)
        self.assertTrue(attempted.statistics["allow_nonplanar"])
        for original, capped in zip(parts, attempted.parts):
            self.assertTrue(capped.statistics["is_watertight"])
            self.assertTrue(capped.statistics["is_winding_consistent"])
            self.assertEqual(capped.statistics["cut_boundary_edges_after"], 0)
            np.testing.assert_array_equal(original.vertices, capped.part.vertices)
            np.testing.assert_array_equal(original.vertices[original.faces], capped.part.vertices[capped.part.faces[:len(original.faces)]])
            self.assertTrue(all(loop["planarity"] > .1 for loop in capped.statistics["loop_planarity"]))
            self.assertTrue(all(section["nonplanar"] for section in capped.statistics["sections"]))
        with np.load(io.BytesIO(export_capped_npz(attempted, source_key="nonplanar", editing_metadata={})), allow_pickle=False) as data:
            saved = json.loads(data["metadata_json"].item())
            self.assertTrue(saved["statistics"]["allow_nonplanar"])
            self.assertEqual(saved["statistics"]["nonplanar_sections"], 4)

    def test_warped_hollow_rings_remain_annuli_and_separate_ends_do_not_merge(self):
        vertices, faces, labels = hollow_prism()
        cuts = (vertices[:, 0] == 1) | (vertices[:, 0] == 2)
        vertices[cuts, 0] += .4 * vertices[cuts, 1] * vertices[cuts, 2] / 4
        manifest, content, parts = pack(vertices, faces, labels)
        result = cap_parts(content, manifest, parts, parts, allow_nonplanar=True)
        self.assertEqual(result.statistics["closed_sections"], 4)
        self.assertEqual(result.statistics["closed_loops"], 8)
        for record in result.parts:
            self.assertTrue(record.statistics["is_watertight"])
            self.assertTrue(all(section["holes"] == 1 for section in record.statistics["sections"]))
            np.testing.assert_array_equal(record.part.vertices, parts[record.part.part_id].vertices)

    def test_nonplanar_trial_still_reports_cap_intersections(self):
        vertices, faces, labels = nonplanar_prism()
        extra = np.array([[.5, -.3, 0], [1.5, -.3, 0], [1, .4, .4]])
        manifest, content, parts = pack(np.vstack([vertices, extra]), np.vstack([faces, np.arange(3) + len(vertices)]), np.r_[labels, 0])
        result = cap_parts(content, manifest, parts, parts, allow_nonplanar=True)
        self.assertGreater(result.parts[0].statistics["cap_overlap_pair_count"], 0)
        self.assertIn("#e12b35", capped_payloads(result, part_id=0)[0]["face_colors"])
        self.assertGreater(result.parts[0].statistics["nonplanar_sections"], 0)

    def test_invalid_inner_ring_does_not_turn_annulus_into_a_solid_disk(self):
        manifest, content, parts = pack(*hollow_prism())
        edited = []
        for part in parts:
            vertices = part.vertices.copy()
            vertices[np.all(vertices == [1, -1, -1], axis=1), 0] += .8
            edited.append(replace(part, vertices=vertices))
        result = cap_parts(content, manifest, parts, edited)
        self.assertEqual(result.parts[0].statistics["closed_sections"], 0)
        self.assertGreaterEqual(len(result.parts[0].statistics["skipped"]), 2)
        attempted = cap_parts(content, manifest, parts, edited, allow_nonplanar=True)
        self.assertEqual(attempted.parts[0].statistics["closed_sections"], 0)
        self.assertGreater(attempted.statistics["skipped_sections"], 0)

    def test_self_crossing_projected_ring_is_reported(self):
        manifest, content, parts = pack(*prism())
        edited = []
        for part in parts:
            vertices = part.vertices.copy()
            at_one = vertices[:, 0] == 1
            for i in np.flatnonzero(at_one):
                if np.array_equal(vertices[i, 1:], [2, 0]):
                    vertices[i, 1:] = [2, 2]
                elif np.array_equal(vertices[i, 1:], [2, 2]):
                    vertices[i, 1:] = [2, 0]
            edited.append(replace(part, vertices=vertices))
        result = cap_parts(content, manifest, parts, edited)
        self.assertGreater(result.statistics["skipped_sections"], 0)
        self.assertEqual(result.parts[0].statistics["added_faces"], 0)
        attempted = cap_parts(content, manifest, parts, edited, allow_nonplanar=True)
        self.assertGreater(attempted.statistics["skipped_sections"], 0)
        self.assertEqual(attempted.parts[0].statistics["added_faces"], 0)

    def test_cap_intersection_with_same_part_is_reported_and_highlights_are_display_only(self):
        vertices, faces, labels = prism()
        extra = np.array([[.5, .5, .5], [1.5, .5, .5], [1, 1.5, 1.5]])
        manifest, content, parts = pack(np.vstack([vertices, extra]), np.vstack([faces, np.arange(3) + len(vertices)]), np.r_[labels, 0])
        result = cap_parts(content, manifest, parts, parts)
        record = result.parts[0]
        self.assertGreater(record.statistics["cap_overlap_pair_count"], 0)
        payload = capped_payloads(result, part_id=0, highlight_caps=True)[0]
        self.assertIn("#e12b35", payload["face_colors"])
        payload = capped_payloads(result, part_id=0, highlight_caps=True, show_overlaps=False)[0]
        self.assertIn("#62b6cb", payload["face_colors"])
        self.assertNotIn("#e12b35", payload["face_colors"])

    def test_glb_npz_preserve_names_colors_and_identify_caps(self):
        manifest, content, parts = pack(*prism())
        result = cap_parts(content, manifest, parts, parts)
        metadata = {"manual_translations": {"0": [0, 0, 0]}}
        scene = trimesh.load(io.BytesIO(export_capped_glb(result, source_key="test", editing_metadata=metadata)), file_type="glb", process=False)
        self.assertEqual(len(scene.geometry), len(parts))
        for record in result.parts:
            mesh = scene.geometry[record.part.geometry_name]
            np.testing.assert_allclose(mesh.vertices, record.part.vertices)
            np.testing.assert_array_equal(mesh.visual.face_colors, np.tile(trimesh.visual.color.hex_to_rgba(record.part.color), (len(mesh.faces), 1)))
        with np.load(io.BytesIO(export_capped_npz(result, source_key="test", editing_metadata=metadata)), allow_pickle=False) as data:
            saved = json.loads(data["metadata_json"].item())
            self.assertEqual(saved["editor_source_key"], "test")
            self.assertEqual(saved["editing"], metadata)
            self.assertEqual([p["name"] for p in saved["parts"]], [p.name for p in parts])
            for record in result.parts:
                prefix = f"part_{record.part.part_id:04d}"
                np.testing.assert_array_equal(data[f"{prefix}_is_cap"], record.is_cap)
                np.testing.assert_array_equal(data[f"{prefix}_source_face_indices"], record.source_face_indices)
                self.assertTrue(np.all(data[f"{prefix}_face_part_ids"] == record.part.part_id))

    def test_changed_topology_or_broken_source_mapping_is_rejected(self):
        manifest, content, parts = pack(*prism())
        changed = [replace(parts[0], faces=parts[0].faces[:-1]), *parts[1:]]
        with self.assertRaises(ValueError):
            cap_parts(content, manifest, parts, changed)
        changed = [replace(parts[0], vertices=parts[0].vertices + .1), *parts[1:]]
        with self.assertRaises(ValueError):
            cap_parts(content, manifest, changed, changed)

    def test_nonmanifold_source_cut_is_reported_instead_of_closed(self):
        vertices, faces, labels = prism()
        # Three source faces now share a would-be cut edge at x=1.
        faces = np.vstack([faces, faces[3]])
        labels = np.r_[labels, labels[3]]
        manifest, content, parts = pack(vertices, faces, labels)
        result = cap_parts(content, manifest, parts, parts)
        self.assertGreater(result.parts[0].statistics["ambiguous_source_edges"], 0)
        self.assertGreater(result.statistics["skipped_sections"], 0)
        self.assertEqual(result.parts[0].statistics["closed_sections"], 0)

    def test_empty_parts_and_missing_correspondence_do_not_invent_geometry(self):
        manifest, content, _ = pack(*prism())
        manifest["parts"].append({"part_id": 7, "name": "empty section", "color": "#168b83", "npz_prefix": "part_0007",
                                  "geometry_name": None, "node_name": None, "vertex_count": 0, "face_count": 0})
        with np.load(io.BytesIO(content), allow_pickle=False) as data:
            arrays = {key: data[key] for key in data.files}
        for name in ("vertices", "faces"):
            arrays[f"part_0007_{name}"] = np.empty((0, 3), dtype=float if name == "vertices" else int)
        for name in ("source_vertex_indices", "source_face_indices"):
            arrays[f"part_0007_{name}"] = np.empty(0, dtype=int)
        buffer = io.BytesIO()
        np.savez_compressed(buffer, **arrays)
        content = buffer.getvalue()
        parts = load_editable_parts(content, manifest)
        result = cap_parts(content, manifest, parts, parts)
        self.assertEqual(result.parts[-1].part.part_id, 7)
        self.assertEqual(result.parts[-1].statistics["added_faces"], 0)
        self.assertEqual(len(capped_payloads(result)), 3)
        del arrays["part_0000_source_face_indices"]
        buffer = io.BytesIO()
        np.savez_compressed(buffer, **arrays)
        with self.assertRaises((ValueError, KeyError)):
            cap_parts(buffer.getvalue(), manifest, parts, parts)

    def test_model_scale_does_not_change_closed_cut_topology(self):
        vertices, faces, labels = prism()
        for scale in (1e-6, 1e6):
            manifest, content, parts = pack(vertices * scale, faces, labels)
            result = cap_parts(content, manifest, parts, parts)
            self.assertEqual(result.statistics["closed_sections"], 4)
            self.assertTrue(all(r.statistics["is_watertight"] for r in result.parts))
            self.assertTrue(all(r.statistics["cap_overlap_pair_count"] == 0 for r in result.parts))


def capping_editor_app(manifest, content):
    from part_editor import render_part_editor
    render_part_editor(manifest, content, "+Z")


class CutCappingInterfaceTests(unittest.TestCase):
    def test_next_start_regenerates_selected_cut_repeatedly_and_reset_keeps_other_cuts(self):
        from streamlit.testing.v1 import AppTest
        manifest, content, parts = pack(*prism())
        catalog = cut_loop_catalog(content, manifest, parts)
        app = AppTest.from_function(capping_editor_app, args=(manifest, content), default_timeout=30).run()
        state = app.session_state["part_editing"]
        selector = f"cap_start_loop_{state['source_key']}"
        self.assertNotIn("capped", state)
        app.button(key="cap_start_next").click().run()
        state = app.session_state["part_editing"]
        self.assertEqual(state["cap_start_offsets"], {catalog[0]["loop_key"]: 1})
        saved_key = state["capped"]["input_key"]
        app.selectbox(key=selector).set_value(catalog[1]["loop_key"]).run()
        self.assertEqual(app.session_state["part_editing"]["capped"]["input_key"], saved_key)
        app.button(key="cap_start_next").click().run()
        self.assertEqual(app.session_state["part_editing"]["cap_start_offsets"],
                         {catalog[0]["loop_key"]: 1, catalog[1]["loop_key"]: 1})
        for _ in range(catalog[1]["vertex_count"]):
            app.button(key="cap_start_next").click().run()
        self.assertEqual(app.session_state["part_editing"]["cap_start_offsets"][catalog[1]["loop_key"]], 1)
        app.button(key="cap_start_reset").click().run()
        state = app.session_state["part_editing"]
        self.assertEqual(state["cap_start_offsets"], {catalog[0]["loop_key"]: 1})
        self.assertEqual(state["capped"]["result"].statistics["start_offsets"], state["cap_start_offsets"])
        self.assertTrue(any("開始位置：1/4" in caption.value for caption in app.caption))
        figure = json.loads(app.get("plotly_chart")[-1].proto.spec)
        marker = next(trace for trace in figure["data"] if trace.get("name") == "開始頂点")
        self.assertEqual(marker["text"], ["A"])
        self.assertEqual(figure["layout"]["scene"]["dragmode"], "turntable")
        app.selectbox(key="capped_part_view").set_value(2).run()
        figure = json.loads(app.get("plotly_chart")[-1].proto.spec)
        self.assertFalse(any(trace.get("name") == "開始頂点" for trace in figure["data"]))
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.error), 0)

    def test_triangle_method_defaults_to_point_only_and_switch_invalidates_caps(self):
        from streamlit.testing.v1 import AppTest
        manifest, content, _ = pack(*prism())
        app = AppTest.from_function(capping_editor_app, args=(manifest, content), default_timeout=30).run()
        self.assertEqual(app.selectbox(key="cap_triangulation").value, "point_only")
        app.button(key="cap_parts").click().run()
        self.assertEqual(app.session_state["part_editing"]["capped"]["result"].statistics["triangulation"], "point_only")
        app.selectbox(key="cap_triangulation").set_value("earcut").run()
        self.assertNotIn("capped", app.session_state["part_editing"])
        app.button(key="cap_parts").click().run()
        self.assertEqual(app.session_state["part_editing"]["capped"]["result"].statistics["triangulation"], "earcut")
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.error), 0)

    def test_nonplanar_toggle_invalidates_caps_and_exposes_measurements(self):
        from streamlit.testing.v1 import AppTest
        manifest, content, _ = pack(*nonplanar_prism())
        app = AppTest.from_function(capping_editor_app, args=(manifest, content), default_timeout=30).run()
        self.assertFalse(app.checkbox(key="try_nonplanar_caps").value)
        app.button(key="cap_parts").click().run()
        self.assertEqual(app.session_state["part_editing"]["capped"]["result"].statistics["added_faces"], 0)
        app.checkbox(key="try_nonplanar_caps").set_value(True).run()
        self.assertNotIn("capped", app.session_state["part_editing"])
        app.button(key="cap_parts").click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.error), 0)
        stats = app.session_state["part_editing"]["capped"]["result"].statistics
        self.assertEqual(stats["nonplanar_sections"], 4)
        self.assertTrue(stats["allow_nonplanar"])
        self.assertTrue(any("非平面性（%）" in frame.value.columns for frame in app.dataframe))
        app.checkbox(key="highlight_caps").set_value(True).run()
        self.assertIn("capped", app.session_state["part_editing"])
        app.checkbox(key="try_nonplanar_caps").set_value(False).run()
        self.assertNotIn("capped", app.session_state["part_editing"])

    def test_button_preview_exports_and_edit_invalidation(self):
        from streamlit.testing.v1 import AppTest
        manifest, content, _ = pack(*prism())
        app = AppTest.from_function(capping_editor_app, args=(manifest, content), default_timeout=30).run()
        self.assertEqual(len(app.exception), 0)
        self.assertNotIn("capped", app.session_state["part_editing"])
        app.button(key="cap_parts").click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.error), 0)
        saved = app.session_state["part_editing"]["capped"]
        self.assertEqual(saved["result"].statistics["closed_sections"], 4)
        app.selectbox(key="capped_part_view").set_value(1).run()
        app.checkbox(key="highlight_caps").set_value(True).run()
        self.assertIn("capped", app.session_state["part_editing"])
        # Rejoining continues to consume the original editable surfaces, not caps.
        app.button(key="rejoin_mesh").click().run()
        self.assertEqual(app.session_state["part_editing"]["rejoined"]["result"].statistics["bridge_faces"], 0)
        key = app.session_state["part_editing"]["source_key"]
        event = {"source_key": key, "sequence": 1, "scales": {"0": 1, "1": 1.2, "2": 1},
                 "offsets": {"0": [0, 0, 0], "1": [0, 1, 0], "2": [0, 0, 0]}}
        with patch("part_editor._component", return_value=event):
            app.run()
        self.assertNotIn("capped", app.session_state["part_editing"])
        app.button(key="cap_parts").click().run()
        self.assertIn("capped", app.session_state["part_editing"])
        self.assertEqual(len(app.exception), 0)
        app.checkbox(key=f"connection_follow_{key}").set_value(False).run()
        self.assertNotIn("capped", app.session_state["part_editing"])

    def test_missing_optional_dependency_shows_actionable_error_without_stale_result(self):
        from streamlit.testing.v1 import AppTest
        manifest, content, _ = pack(*prism())
        app = AppTest.from_function(capping_editor_app, args=(manifest, content), default_timeout=30).run()
        with patch("capping_panel.cap_parts", side_effect=RuntimeError("追加ライブラリが必要です。pip install -r requirements.txt")):
            app.button(key="cap_parts").click().run()
        self.assertEqual(len(app.exception), 0)
        self.assertEqual(len(app.error), 1)
        self.assertIn("requirements.txt", app.error[0].value)
        self.assertNotIn("capped", app.session_state["part_editing"])


if __name__ == "__main__":
    unittest.main()
