"""Shared-cut geometry tests; no Boolean engine or manifold3d is needed."""
from __future__ import annotations

from collections import defaultdict
from dataclasses import replace
import io
import json
import unittest
from unittest.mock import patch

import numpy as np
import trimesh
from shapely import union_all
from shapely.geometry import Polygon

from capping import _boundary, cap_parts, cut_loop_catalog, export_capped_glb, export_capped_npz
from mesh_overlaps import find_face_overlaps, overlap_frame
from test_capping import hollow_prism, nonplanar_prism, pack, prism


def sections(result):
    return [(record, section) for record in result.parts for section in record.statistics["sections"]]


def boundary_key(section):
    return tuple(map(tuple, section["source_boundary_edges"]))


def cap_faces(record, section):
    return record.part.faces[record.cap_ids == section["cap_id"]]


def cap_points(record, section):
    return record.part.vertices[cap_faces(record, section)]


class SharedCappingTests(unittest.TestCase):
    def assert_boundaries(self, result):
        for record, section in sections(result):
            rings = section["boundary_loops"]
            self.assertIsInstance(rings, list)
            self.assertEqual(len(rings), section["loops"])
            self.assertEqual(sum(map(len, rings)), section["boundary_edges"])
            for ring in rings:
                self.assertIsInstance(ring, list)
                self.assertEqual(len(set(ring)), len(ring))
                self.assertTrue(all(type(node) is int for node in ring))
                self.assertTrue(all(0 <= node < len(record.part.vertices) for node in ring))
            required = {(int(b), int(a)) for ring in rings for a, b in zip(ring, np.roll(ring, -1))}
            boundary, ambiguous = _boundary(cap_faces(record, section))
            self.assertEqual(ambiguous, 0)
            self.assertEqual(set(map(tuple, boundary)), required)
            self.assertEqual(len(cap_faces(record, section)), section["added_faces"])

    def assert_pairs(self, result, count):
        self.assertEqual(result.statistics["shared_caps_count"], count)
        pairs = defaultdict(list)
        for record, section in sections(result):
            if section["shared_cap"]:
                pairs[section["shared_cap_id"]].append((record, section))
        self.assertEqual(len(pairs), count)
        for pair in pairs.values():
            self.assertEqual(len(pair), 2)
            (a, sa), (b, sb) = pair
            self.assertEqual(sa["paired_part_id"], b.part.part_id)
            self.assertEqual(sb["paired_part_id"], a.part.part_id)
            self.assertEqual(sa["paired_cap_id"], sb["cap_id"])
            self.assertEqual(sb["paired_cap_id"], sa["cap_id"])
            self.assertEqual(boundary_key(sa), boundary_key(sb))
            self.assertEqual(sa["shared_cap_source"], sb["shared_cap_source"])
            self.assertNotEqual(sa["shared_cap_reversed"], sb["shared_cap_reversed"])
            np.testing.assert_allclose(cap_points(a, sa), cap_points(b, sb)[:, ::-1],
                                       rtol=0, atol=result.statistics["shared_cap_tolerance"])
        self.assertEqual(sum(p.statistics["shared_caps_count"] for p in result.parts), 2 * count)
        self.assert_boundaries(result)

    def assert_preserved(self, result, content, edited, *, seam_copies=False):
        current = {part.part_id: part for part in edited}
        with np.load(io.BytesIO(content), allow_pickle=False) as data:
            for record in result.parts:
                part = current[record.part.part_id]
                prefix = f"part_{part.part_id:04d}"
                n, f = len(part.vertices), len(part.faces)
                np.testing.assert_array_equal(record.part.vertices[:n], part.vertices)
                if seam_copies:
                    np.testing.assert_array_equal(record.part.vertices[record.part.faces[:f]], part.vertices[part.faces])
                else:
                    np.testing.assert_array_equal(record.part.faces[:f], part.faces)
                np.testing.assert_array_equal(record.source_vertex_indices[:n], data[f"{prefix}_source_vertex_indices"])
                np.testing.assert_array_equal(record.source_face_indices[:f], data[f"{prefix}_source_face_indices"])
                self.assertTrue(np.all(record.source_face_indices[f:] == -1))
                self.assertTrue(np.all(record.cap_ids[:f] == -1))
                self.assertTrue(np.all(record.cap_ids[f:] >= 0))
                self.assertTrue(np.all(record.source_vertex_indices[n:] == -1))
                self.assertEqual(len(record.source_vertex_indices), len(record.part.vertices))
                self.assertEqual(len(record.source_face_indices), len(record.part.faces))
                self.assertEqual(record.statistics["added_faces"], len(record.part.faces) - f)
                self.assertEqual(record.statistics["added_vertices"], len(record.part.vertices) - n)

    def test_default_remains_independent_and_exposes_actual_local_rings(self):
        manifest, content, parts = pack(*nonplanar_prism())
        for method in ("earcut", "point_only", "center_fan"):
            with self.subTest(method=method):
                default = cap_parts(content, manifest, parts, parts, allow_nonplanar=True, triangulation=method)
                explicit = cap_parts(content, manifest, parts, parts, allow_nonplanar=True, triangulation=method, shared_caps=False)
                self.assertEqual(default.statistics, explicit.statistics)
                self.assertFalse(default.statistics["shared_caps"])
                self.assert_pairs(default, 0)
                for a, b in zip(default.parts, explicit.parts):
                    np.testing.assert_array_equal(a.part.vertices, b.part.vertices)
                    np.testing.assert_array_equal(a.part.faces, b.part.faces)
                    for section in a.statistics["sections"]:
                        for ring, start in zip(section["boundary_loops"], section["start_vertices"]):
                            self.assertEqual(ring[:3], start["first_candidate"])

    def test_warped_sections_share_exact_opposite_patches_for_all_three_methods(self):
        vertices, faces, labels = nonplanar_prism()
        manifest, content, parts = pack(vertices, faces, labels)
        original_volume = trimesh.Trimesh(vertices=vertices, faces=faces, process=False).volume
        for method in ("earcut", "point_only", "center_fan"):
            with self.subTest(method=method):
                result = cap_parts(content, manifest, parts, parts, allow_nonplanar=True, triangulation=method, shared_caps=True)
                self.assert_pairs(result, 2)
                self.assert_preserved(result, content, parts)
                self.assertEqual([p.statistics["closed_sections"] for p in result.parts], [1, 2, 1])
                self.assertEqual([p.statistics["shared_caps_count"] for p in result.parts], [1, 2, 1])
                self.assertEqual(result.statistics["nonplanar_sections"], 4)
                self.assertEqual(result.statistics["added_vertices"], 4 if method == "center_fan" else 0)
                volumes = []
                for record in result.parts:
                    mesh = trimesh.Trimesh(vertices=record.part.vertices, faces=record.part.faces, process=False)
                    self.assertTrue(mesh.is_watertight)
                    self.assertTrue(mesh.is_winding_consistent)
                    self.assertEqual(record.statistics["cut_boundary_edges_after"], 0)
                    volumes.append(mesh.volume)
                # Opposite caps cancel exactly, even when the cut is not planar.
                self.assertAlmostEqual(sum(volumes), original_volume, places=12)
                by_cap = {section["cap_id"]: (record, section) for record, section in sections(result)}
                for record, section in sections(result):
                    peer, other = by_cap[section["paired_cap_id"]]
                    np.testing.assert_array_equal(cap_points(record, section), cap_points(peer, other)[:, ::-1])

    def test_changed_start_on_larger_id_drives_only_its_pair(self):
        manifest, content, parts = pack(*nonplanar_prism())
        target = next(item for item in cut_loop_catalog(content, manifest, parts) if item["part_id"] == 1)
        for method in ("earcut", "point_only"):
            with self.subTest(method=method):
                options = dict(allow_nonplanar=True, triangulation=method)
                baseline = cap_parts(content, manifest, parts, parts, shared_caps=True, **options)
                offsets = {target["loop_key"]: 1}
                changed = cap_parts(content, manifest, parts, parts, shared_caps=True, start_offsets=offsets, **options)
                independent = cap_parts(content, manifest, parts, parts, start_offsets=offsets, **options)
                target_section = next(s for r, s in sections(changed) if any(
                    start["loop_key"] == target["loop_key"] for start in s["start_vertices"]))
                affected = boundary_key(target_section)
                self.assert_pairs(changed, 2)
                old_by_cap = {s["cap_id"]: (r, s) for r, s in sections(baseline)}
                expected_by_cap = {s["cap_id"]: (r, s) for r, s in sections(independent)}
                for record, section in sections(changed):
                    if boundary_key(section) == affected:
                        actual_source = section["shared_cap_source"]
                        self.assertEqual(actual_source["part_id"], 1)
                        self.assertEqual(actual_source["start_vertices"][0]["start_offset"], 1)
                        if record.part.part_id == 1:
                            expected, expected_section = expected_by_cap[section["cap_id"]]
                            np.testing.assert_array_equal(cap_faces(record, section), cap_faces(expected, expected_section))
                    else:
                        old, old_section = old_by_cap[section["cap_id"]]
                        np.testing.assert_array_equal(cap_points(record, section), cap_points(old, old_section))
                self.assertEqual(changed.statistics["start_offsets"], offsets)

    def test_start_ties_and_reordered_inputs_choose_the_same_source_and_geometry(self):
        manifest, content, parts = pack(*nonplanar_prism())
        catalog = cut_loop_catalog(content, manifest, parts)
        first = catalog[0]
        peer = next(item for item in catalog if item["part_id"] == 1
                    and item["loop_key"].split(":", 1)[1] == first["loop_key"].split(":", 1)[1])
        offsets = {peer["loop_key"]: 1, first["loop_key"]: 2}
        options = dict(allow_nonplanar=True, triangulation="point_only", shared_caps=True)
        a = cap_parts(content, manifest, parts, parts, start_offsets=offsets, **options)
        b = cap_parts(content, manifest, parts[::-1], parts[::-1], start_offsets=dict(reversed(list(offsets.items()))), **options)
        self.assert_pairs(a, 2)
        self.assert_pairs(b, 2)
        by_part = {p.part.part_id: p for p in b.parts}
        for record in a.parts:
            other = by_part[record.part.part_id]
            np.testing.assert_array_equal(record.part.vertices, other.part.vertices)
            np.testing.assert_array_equal(record.part.faces, other.part.faces)
            for section in record.statistics["sections"]:
                if any(s["loop_key"] in offsets for s in section["start_vertices"]):
                    self.assertEqual(section["shared_cap_source"]["part_id"], 0)
                    self.assertEqual(section["shared_cap_source"]["start_vertices"][0]["start_offset"], 2)

    def test_middle_part_can_supply_two_independent_changed_cuts(self):
        manifest, content, parts = pack(*nonplanar_prism())
        middle = [item for item in cut_loop_catalog(content, manifest, parts) if item["part_id"] == 1]
        offsets = {item["loop_key"]: i + 1 for i, item in enumerate(middle)}
        result = cap_parts(content, manifest, parts, parts, allow_nonplanar=True,
                           triangulation="point_only", shared_caps=True, start_offsets=offsets)
        self.assert_pairs(result, 2)
        self.assertTrue(all(s["shared_cap_source"]["part_id"] == 1 for _, s in sections(result)))
        # Candidate diagnostics are translated back to each receiving part's IDs.
        for record, section in sections(result):
            local = set(section["boundary_loops"][0])
            for candidate in section["triangulation"]["candidate_sample"]:
                self.assertTrue(set(candidate["vertices"]) <= local)
                self.assertTrue(set(candidate["interior_vertices"]) <= local)
        self.assert_preserved(result, content, parts)

    def test_center_fan_copies_exact_centers_into_each_local_center_slot(self):
        manifest, content, parts = pack(*nonplanar_prism())
        moved = parts[1].vertices.copy()
        moved[:, 1] += 1e-12
        edited = (parts[0], replace(parts[1], vertices=moved), parts[2])
        options = dict(allow_nonplanar=True, triangulation="center_fan")
        independent = cap_parts(content, manifest, parts, edited, **options)
        result = cap_parts(content, manifest, parts, edited, shared_caps=True, **options)
        self.assert_pairs(result, 2)
        self.assert_preserved(result, content, edited)
        self.assertFalse(np.array_equal(independent.parts[0].part.vertices[-1], independent.parts[1].part.vertices[-2]))
        by_cap = {s["cap_id"]: (r, s) for r, s in sections(result)}
        for record, section in sections(result):
            info = section["triangulation"]
            peer, other = by_cap[section["paired_cap_id"]]
            center = record.part.vertices[info["center_vertex"]]
            np.testing.assert_array_equal(center, info["center"])
            np.testing.assert_array_equal(center, peer.part.vertices[other["triangulation"]["center_vertex"]])
            self.assertTrue(record.is_cap_center[info["center_vertex"]])
            self.assertEqual(section["added_vertices"], 1)
        self.assertEqual(result.parts[1].statistics["cap_center_vertex_ids"], [16, 17])

    def test_noncoincident_cut_stays_independent_while_other_cut_shares(self):
        manifest, content, parts = pack(*nonplanar_prism())
        edited = (parts[0], parts[1], replace(parts[2], vertices=parts[2].vertices + [0, .2, 0]))
        options = dict(allow_nonplanar=True, triangulation="point_only")
        independent = cap_parts(content, manifest, parts, edited, **options)
        result = cap_parts(content, manifest, parts, edited, shared_caps=True, **options)
        self.assert_pairs(result, 1)
        self.assertEqual([p.statistics["shared_caps_count"] for p in result.parts], [1, 1, 0])
        by_cap = {s["cap_id"]: (r, s) for r, s in sections(independent)}
        for record, section in sections(result):
            if not section["shared_cap"]:
                before, old = by_cap[section["cap_id"]]
                np.testing.assert_array_equal(cap_faces(record, section), cap_faces(before, old))
        self.assert_preserved(result, content, edited)

    def test_equal_coordinate_sets_need_matching_coordinates_for_each_source_vertex(self):
        manifest, content, parts = pack(*prism())
        vertices = parts[1].vertices.copy()
        ring = np.flatnonzero(vertices[:, 0] == 1)
        vertices[ring] = vertices[np.roll(ring, 1)]
        edited = (parts[0], replace(parts[1], vertices=vertices), parts[2])
        result = cap_parts(content, manifest, parts, edited, shared_caps=True)
        self.assert_pairs(result, 1)
        self.assertFalse(result.parts[0].statistics["sections"][0]["shared_cap"])

    def test_coincident_unrelated_cuts_keep_distinct_source_pairings(self):
        vertices, faces, labels = prism()
        manifest, content, parts = pack(np.vstack([vertices, vertices + [0, 10, 0]]),
                                        np.vstack([faces, faces + len(vertices)]), np.r_[labels, labels + 3])
        edited = tuple(replace(p, vertices=p.vertices - [0, 10, 0]) if p.part_id >= 3 else p for p in parts)
        result = cap_parts(content, manifest, parts, edited, shared_caps=True)
        self.assert_pairs(result, 4)
        self.assert_preserved(result, content, edited)
        for record, section in sections(result):
            self.assertEqual(record.part.part_id // 3, section["paired_part_id"] // 3)
        self.assertTrue(all(p.statistics["welded_seam_vertices"] == 0 for p in result.parts))

    def test_coincidence_tolerance_uses_rest_overall_size_at_small_and_large_scales(self):
        vertices, faces, labels = prism()
        for scale in (1e-6, 1.0, 1e6):
            manifest, content, parts = pack(vertices * scale, faces, labels)
            for delta, count in ((1e-12, 2), (1e-7, 0)):
                with self.subTest(scale=scale, delta=delta):
                    edited = tuple(replace(p, vertices=p.vertices * 100 + [0, scale * delta if p.part_id == 1 else 0, 0]) for p in parts)
                    result = cap_parts(content, manifest, parts, edited, shared_caps=True, check_intersections=False)
                    self.assertAlmostEqual(result.statistics["shared_cap_tolerance"] / scale, 3e-10, places=20)
                    self.assert_pairs(result, count)
                    self.assert_preserved(result, content, edited)

    def test_earcut_shared_annuli_preserve_holes_and_inner_start_changes(self):
        for warped in (False, True):
            with self.subTest(warped=warped):
                vertices, faces, labels = hollow_prism()
                if warped:
                    cuts = (vertices[:, 0] == 1) | (vertices[:, 0] == 2)
                    vertices[cuts, 0] += .4 * vertices[cuts, 1] * vertices[cuts, 2] / 4
                manifest, content, parts = pack(vertices, faces, labels)
                inner = next(item for item in cut_loop_catalog(content, manifest, parts)
                             if item["part_id"] == 1 and np.max(np.abs(parts[1].vertices[item["vertices"], 1:])) <= 1)
                result = cap_parts(content, manifest, parts, parts, allow_nonplanar=warped,
                                   shared_caps=True, start_offsets={inner["loop_key"]: 1})
                self.assert_pairs(result, 2)
                self.assertEqual(result.statistics["closed_loops"], 8)
                self.assertEqual(result.statistics["added_faces"], 32)
                annulus = Polygon([[-2, -2], [2, -2], [2, 2], [-2, 2]], [[[-1, -1], [1, -1], [1, 1], [-1, 1]]])
                for record, section in sections(result):
                    self.assertEqual(section["holes"], 1)
                    projected = [Polygon(triangle[:, 1:]) for triangle in cap_points(record, section)]
                    self.assertAlmostEqual(union_all(projected).symmetric_difference(annulus).area, 0)
                    self.assertAlmostEqual(sum(p.area for p in projected), 12)
                    self.assertTrue(record.statistics["is_watertight"])
                    self.assertTrue(record.statistics["is_winding_consistent"])
                self.assert_preserved(result, content, parts)

    def test_collinear_nodes_and_exploded_source_seams_keep_provenance(self):
        section = [[0, 0], [1, 0], [2, 0], [2, 2], [0, 2]]
        vertices, faces, labels = prism(section, [[0, 1, 4], [1, 3, 4], [1, 2, 3]])
        exploded = vertices[faces].reshape(-1, 3)
        manifest, content, parts = pack(exploded, np.arange(len(exploded)).reshape(-1, 3), labels * 4)
        result = cap_parts(content, manifest, parts, parts, shared_caps=True)
        self.assert_pairs(result, 2)
        self.assert_preserved(result, content, parts, seam_copies=True)
        for record in result.parts:
            self.assertTrue(record.statistics["is_watertight"])
            self.assertTrue(record.statistics["is_winding_consistent"])
            self.assertGreater(record.statistics["welded_seam_vertices"], 0)

    def test_three_source_owners_withhold_that_cut_and_keep_unambiguous_cut(self):
        vertices, faces, labels = prism()
        vertices = np.vstack([vertices, [1, 1, 1]])
        third = np.array([[4 + i, 4 + (i + 1) % 4, 16] for i in range(4)])
        manifest, content, parts = pack(vertices, np.vstack([faces, third]), np.r_[labels, [3] * 4])
        result = cap_parts(content, manifest, parts, parts, shared_caps=True)
        self.assert_pairs(result, 1)
        self.assertEqual(result.parts[0].statistics["closed_sections"], 0)
        self.assertGreater(result.parts[0].statistics["ambiguous_source_edges"], 0)
        self.assertEqual(result.parts[3].statistics["shared_caps_count"], 0)

    def test_annulus_and_separated_rings_are_not_partially_paired(self):
        manifest, content, parts = pack(*hollow_prism())
        vertices = parts[1].vertices.copy()
        inner = (vertices[:, 0] == 1) & (np.max(np.abs(vertices[:, 1:]), axis=1) <= 1)
        vertices[inner, 1] += 6
        edited = (parts[0], replace(parts[1], vertices=vertices), parts[2])
        result = cap_parts(content, manifest, parts, edited, shared_caps=True)
        self.assert_pairs(result, 1)
        self.assertFalse(result.parts[0].statistics["sections"][0]["shared_cap"])
        self.assertEqual(result.parts[0].statistics["sections"][0]["holes"], 1)
        self.assertEqual(result.parts[1].statistics["closed_sections"], 3)

    def test_ambiguous_catalog_ownership_withholds_sharing_even_with_two_current_owners(self):
        manifest, content, parts = pack(*prism())
        catalog = cut_loop_catalog(content, manifest, parts)
        # A repeated rest-loop entry cannot be disambiguated by current proximity.
        with patch("capping._cut_loop_catalog", return_value=[*catalog, catalog[0]]):
            result = cap_parts(content, manifest, parts, parts, shared_caps=True)
        self.assert_pairs(result, 1)
        self.assertFalse(result.parts[0].statistics["sections"][0]["shared_cap"])

    def test_skipped_nonplanar_and_unsupported_hollow_cuts_do_not_invent_shared_caps(self):
        for geometry, options in ((nonplanar_prism(), {}), (hollow_prism(), {"triangulation": "point_only"}),
                                  (hollow_prism(), {"triangulation": "center_fan"})):
            manifest, content, parts = pack(*geometry)
            result = cap_parts(content, manifest, parts, parts, shared_caps=True, **options)
            self.assert_pairs(result, 0)
            self.assertEqual(result.statistics["added_faces"], 0)
            self.assertEqual(result.statistics["added_vertices"], 0)
            self.assert_preserved(result, content, parts)

    def test_geometry_diagnostics_describe_replaced_faces(self):
        vertices, faces, labels = nonplanar_prism()
        extra = np.array([[.5, -.3, 0], [1.5, -.3, 0], [1, .4, .4]])
        manifest, content, parts = pack(np.vstack([vertices, extra]), np.vstack([faces, np.arange(3) + len(vertices)]), np.r_[labels, 0])
        result = cap_parts(content, manifest, parts, parts, allow_nonplanar=True, triangulation="point_only", shared_caps=True)
        self.assert_pairs(result, 2)
        self.assertGreater(result.parts[0].statistics["cap_overlap_pair_count"], 0)
        for record, before in zip(result.parts, parts):
            report = find_face_overlaps(record.part.vertices, record.part.faces, frame=overlap_frame(before.vertices))
            pairs = np.asarray(report["pairs"], dtype=int).reshape(-1, 2)
            expected = pairs[np.any(pairs >= len(before.faces), axis=1)]
            self.assertEqual(record.statistics["cap_overlap_pairs"], expected.tolist())
            self.assertEqual(record.statistics["cap_overlap_face_ids"], np.unique(expected).tolist())
            self.assertEqual(record.statistics["cap_overlap_pair_count"], len(expected))
            self.assertTrue(record.statistics["intersections_checked"])

    def test_exports_include_pairing_boundary_and_center_metadata(self):
        manifest, content, parts = pack(*prism())
        result = cap_parts(content, manifest, parts, parts, triangulation="center_fan", shared_caps=True)
        with np.load(io.BytesIO(export_capped_npz(result, source_key="shared", editing_metadata={})), allow_pickle=False) as data:
            metadata = json.loads(data["metadata_json"].item())
            self.assertEqual(metadata["statistics"], result.statistics)
            self.assertEqual(metadata["statistics"]["shared_caps_count"], 2)
            for record in result.parts:
                prefix = f"part_{record.part.part_id:04d}"
                np.testing.assert_array_equal(data[f"{prefix}_is_cap_center"], record.is_cap_center)
                np.testing.assert_array_equal(data[f"{prefix}_cap_ids"], record.cap_ids)
                np.testing.assert_array_equal(data[f"{prefix}_source_vertex_indices"], record.source_vertex_indices)
                np.testing.assert_array_equal(data[f"{prefix}_source_face_indices"], record.source_face_indices)
                self.assertEqual(data[f"{prefix}_is_extension"].dtype, np.dtype(bool))
                self.assertFalse(data[f"{prefix}_is_extension"].any())
        scene = trimesh.load(io.BytesIO(export_capped_glb(result, source_key="shared", editing_metadata={})), file_type="glb", process=False)
        for record in result.parts:
            self.assertEqual(scene.geometry[record.part.geometry_name].metadata["extension_face_indices"], [])

    def test_exports_separate_extension_sides_cap_tips_and_explicit_centers(self):
        manifest, content, parts = pack(*prism())
        result = cap_parts(content, manifest, parts, parts, triangulation="center_fan")
        original = result.parts[0]
        section = original.statistics["sections"][0]
        a, b = section["boundary_loops"][0][:2]
        added_vertex, added_face = len(original.part.vertices), len(original.part.faces)
        part = replace(original.part, vertices=np.vstack([original.part.vertices, [1.5, 1, 1]]),
                       faces=np.vstack([original.part.faces, [a, b, added_vertex]]))
        stats = {**original.statistics, "extension_face_ids": [added_face]}
        extended = replace(original, part=part, source_vertex_indices=np.r_[original.source_vertex_indices, -1],
                           source_face_indices=np.r_[original.source_face_indices, -1],
                           cap_ids=np.r_[original.cap_ids, -1], statistics=stats)
        result = replace(result, parts=(extended, *result.parts[1:]))
        with np.load(io.BytesIO(export_capped_npz(result, source_key="extension", editing_metadata={})), allow_pickle=False) as data:
            self.assertEqual(np.flatnonzero(data["part_0000_is_extension"]).tolist(), [added_face])
            self.assertFalse(data["part_0000_is_cap"][added_face])
            self.assertFalse(data["part_0000_is_cap_center"][added_vertex])
            np.testing.assert_array_equal(data["part_0000_is_cap"][:-1], original.is_cap)
            np.testing.assert_array_equal(data["part_0000_cap_ids"][:-1], original.cap_ids)
            self.assertFalse(data["part_0001_is_extension"].any())
        scene = trimesh.load(io.BytesIO(export_capped_glb(result, source_key="extension", editing_metadata={})), file_type="glb", process=False)
        mesh = scene.geometry[part.geometry_name]
        self.assertEqual(mesh.metadata["extension_face_indices"], [added_face])
        self.assertEqual(mesh.metadata["cap_face_indices"], np.flatnonzero(original.is_cap).tolist())
        self.assertEqual(mesh.metadata["cap_center_vertex_indices"], stats["cap_center_vertex_ids"])

    def test_explicit_cap_center_ids_override_negative_source_fallback(self):
        manifest, content, parts = pack(*prism())
        record = cap_parts(content, manifest, parts, parts).parts[0]
        sources = record.source_vertex_indices.copy()
        sources[[0, 2]] = -1
        fallback = replace(record, source_vertex_indices=sources, statistics={})
        np.testing.assert_array_equal(fallback.is_cap_center, sources < 0)
        for ids in ([], [1]):
            explicit = replace(fallback, statistics={"cap_center_vertex_ids": ids})
            expected = np.zeros(len(record.part.vertices), dtype=bool)
            expected[ids] = True
            np.testing.assert_array_equal(explicit.is_cap_center, expected)
            self.assertEqual(explicit.is_cap_center.dtype, np.dtype(bool))

    def test_intersection_checks_can_be_skipped_without_changing_geometry(self):
        section = [[0, 0], [3, 0], [3, 3], [2, 3], [2, 1], [1, 1], [1, 3], [0, 3]]
        ends = [[0, 1, 4], [1, 2, 3], [1, 3, 4], [0, 4, 5], [0, 5, 7], [5, 6, 7]]
        manifest, content, parts = pack(*prism(section, ends))
        for shared in (False, True):
            with self.subTest(shared=shared):
                checked = cap_parts(content, manifest, parts, parts, triangulation="center_fan", shared_caps=shared)
                self.assertTrue(checked.statistics["check_intersections"])
                self.assertTrue(all(p.statistics["cap_overlap_pair_count"] > 0 for p in checked.parts))
                with patch("capping.find_face_overlaps", side_effect=AssertionError("overlap checks must be skipped")):
                    skipped = cap_parts(content, manifest, parts, parts, triangulation="center_fan",
                                        shared_caps=shared, check_intersections=False)
                self.assertFalse(skipped.statistics["check_intersections"])
                self.assertEqual(skipped.statistics["projected_problem_sections"], 4)
                for a, b in zip(checked.parts, skipped.parts):
                    np.testing.assert_array_equal(a.part.vertices, b.part.vertices)
                    np.testing.assert_array_equal(a.part.faces, b.part.faces)
                    self.assertEqual(a.statistics["sections"], b.statistics["sections"])
                    self.assertFalse(b.statistics["intersections_checked"])
                    self.assertEqual(b.statistics["cap_overlap_pairs"], [])
                    self.assertEqual(b.statistics["cap_overlap_face_ids"], [])
                    self.assertEqual(b.statistics["cap_overlap_pair_count"], 0)
                    self.assertEqual(a.statistics["degenerate_cap_face_ids"], b.statistics["degenerate_cap_face_ids"])
                    self.assertTrue(b.statistics["is_watertight"])

    def test_new_options_require_booleans_and_keep_existing_validation(self):
        manifest, content, parts = pack(*prism())
        for name in ("shared_caps", "check_intersections"):
            for invalid in (0, 1, "true", None, np.bool_(True)):
                with self.subTest(name=name, value=invalid), self.assertRaises(ValueError):
                    cap_parts(content, manifest, parts, parts, **{name: invalid})
        for options in ({"max_planarity": 0}, {"allow_nonplanar": 1}, {"triangulation": "unknown"},
                        {"start_offsets": {"unknown": 1}}):
            with self.subTest(options=options), self.assertRaises(ValueError):
                cap_parts(content, manifest, parts, parts, shared_caps=True, **options)
        changed = (replace(parts[0], faces=parts[0].faces[:-1]), *parts[1:])
        with self.assertRaises(ValueError):
            cap_parts(content, manifest, parts, changed, shared_caps=True)


if __name__ == "__main__":
    unittest.main()
