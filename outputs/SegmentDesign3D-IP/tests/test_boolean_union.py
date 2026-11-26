from __future__ import annotations

from dataclasses import replace
import io
import json
from pathlib import Path
import struct
import tempfile
from types import SimpleNamespace
import unittest
from unittest.mock import patch

import manifold3d
import numpy as np
import trimesh

from boolean_union import export_union_glb, export_union_npz, export_union_stl, union_parts, union_payload
from capping import CappingResult, cap_parts
from mesh_overlaps import find_face_overlaps
from test_capping import hollow_prism, nonplanar_prism, pack, prism


def capped_fixture(*, geometry=None, triangulation="earcut"):
    manifest, content, parts = pack(*(prism() if geometry is None else geometry))
    return cap_parts(content, manifest, parts, parts, triangulation=triangulation)


def moved(record, offset):
    return replace(record, part=replace(record.part, vertices=record.part.vertices + offset))


def closed_mesh_fixture(meshes, *, same_part=False):
    vertices, faces, labels, offset = [], [], [], 0
    for index, mesh in enumerate(meshes):
        vertices.append(mesh.vertices)
        faces.append(mesh.faces + offset)
        labels.extend([0 if same_part else index] * len(mesh.faces))
        offset += len(mesh.vertices)
    return capped_fixture(geometry=(np.vstack(vertices), np.vstack(faces), np.array(labels)))


def glb_contents(blob):
    magic, version, length = struct.unpack_from("<4sII", blob)
    if (magic, version, length) != (b"glTF", 2, len(blob)):
        raise AssertionError("invalid GLB header")
    size, kind = struct.unpack_from("<I4s", blob, 12)
    if kind != b"JSON":
        raise AssertionError("missing JSON chunk")
    tree = json.loads(blob[20:20 + size])
    binary_size, kind = struct.unpack_from("<I4s", blob, 20 + size)
    if kind != b"BIN\x00" or binary_size != len(blob) - 28 - size:
        raise AssertionError("invalid binary chunk")
    return tree, blob[28 + size:]


def read_accessor(tree, binary, index):
    accessor = tree["accessors"][index]
    view = tree["bufferViews"][accessor["bufferView"]]
    dtype = {5125: "<u4", 5126: "<f4"}[accessor["componentType"]]
    width = {"SCALAR": 1, "VEC3": 3}[accessor["type"]]
    return np.frombuffer(binary, dtype=dtype, offset=view.get("byteOffset", 0),
                         count=accessor["count"] * width).reshape(-1, width)


class BooleanUnionTests(unittest.TestCase):
    def assert_ancestry(self, result, capped):
        """All output vertices lie in their claimed input triangle, with its winding."""
        records = {record.part.part_id: record for record in capped.parts}
        self.assertEqual(result.face_kinds.shape, (len(result.mesh.faces),))
        for part_id in set(result.face_part_ids.tolist()):
            mask = result.face_part_ids == part_id
            record = records[part_id]
            local = result.mesh.face_attributes["input_face_indices"][mask]
            np.testing.assert_array_equal(result.source_face_indices[mask], record.source_face_indices[local])
            expected = (record.cap_ids >= 0).astype(np.uint8)
            expected[np.asarray(record.statistics.get("extension_face_ids", []), dtype=int)] = 2
            np.testing.assert_array_equal(result.face_kinds[mask], expected[local])
            parent = record.part.vertices[record.part.faces[local]]
            triangles = result.mesh.vertices[result.mesh.faces[mask]]
            barycentric = trimesh.triangles.points_to_barycentric(np.repeat(parent, 3, axis=0), triangles.reshape(-1, 3))
            self.assertTrue(np.all(barycentric >= -1e-8))
            self.assertTrue(np.all(barycentric <= 1 + 1e-8))
            normal = np.cross(parent[:, 1] - parent[:, 0], parent[:, 2] - parent[:, 0])
            actual = np.cross(triangles[:, 1] - triangles[:, 0], triangles[:, 2] - triangles[:, 0])
            self.assertTrue(np.all(np.einsum("ij,ij->i", normal, actual) > 0))
            expected_color = np.tile(trimesh.visual.color.hex_to_rgba(record.part.color), (int(mask.sum()), 1))
            np.testing.assert_array_equal(result.mesh.visual.face_colors[mask], expected_color)

    def test_shared_contact_faces_merge_and_internal_caps_disappear(self):
        for triangulation in ("earcut", "center_fan"):
            with self.subTest(triangulation=triangulation):
                capped = capped_fixture(triangulation=triangulation)
                before = [(r.part.vertices.copy(), r.part.faces.copy(), r.source_face_indices.copy()) for r in capped.parts]
                result = union_parts(capped)
                self.assertTrue(result.mesh.is_volume)
                self.assertEqual(result.statistics["connected_components"], 1)
                self.assertAlmostEqual(result.mesh.volume, 12)
                self.assertAlmostEqual(result.mesh.area, 32)
                self.assertEqual(result.statistics["cap_faces"], 0)
                self.assertEqual(set(result.face_kinds.tolist()), {0})
                self.assertEqual(set(result.face_part_ids.tolist()), {0, 1, 2})
                self.assertFalse(result.statistics["printable"])
                self.assertEqual(result.statistics["printability"], "not_assessed")
                self.assert_ancestry(result, capped)
                for record, (vertices, faces, sources) in zip(capped.parts, before):
                    np.testing.assert_array_equal(record.part.vertices, vertices)
                    np.testing.assert_array_equal(record.part.faces, faces)
                    np.testing.assert_array_equal(record.source_face_indices, sources)

    def test_overlapping_boxes_remove_internal_triangles_and_retain_split_face_ancestry(self):
        base = capped_fixture()
        for offset, volume, area in (([-.5, 0, 0], 6, 20), ([-.5, 1, .5], 7.25, 26.5)):
            with self.subTest(offset=offset):
                capped = replace(base, parts=(base.parts[0], moved(base.parts[1], offset)))
                result = union_parts(capped)
                self.assertAlmostEqual(result.mesh.volume, volume)
                self.assertAlmostEqual(result.mesh.area, area)
                self.assertTrue(result.mesh.is_watertight)
                self.assertEqual(result.statistics["connected_components"], 1)
                self.assert_ancestry(result, capped)
                bounds = [(r.part.vertices.min(axis=0), r.part.vertices.max(axis=0)) for r in capped.parts]
                for index, record in enumerate(capped.parts):
                    centers = result.mesh.triangles_center[result.face_part_ids == record.part.part_id]
                    lower, upper = bounds[1 - index]
                    internal = np.all((centers > lower + 1e-8) & (centers < upper - 1e-8), axis=1)
                    self.assertFalse(internal.any())
                self.assertEqual(find_face_overlaps(result.mesh.vertices, result.mesh.faces)["pair_count"], 0)
        # Partial coverage must split at least one input cap triangle.
        ids = result.mesh.face_attributes["input_face_indices"][result.face_kinds == 1]
        self.assertGreater(len(ids), len(np.unique(ids)))

    def test_shared_nonplanar_caps_merge_when_prior_intersection_checks_are_disabled(self):
        for fixture in (prism, nonplanar_prism):
            for method in ("earcut", "center_fan"):
                with self.subTest(fixture=fixture.__name__, method=method):
                    geometry = fixture()
                    manifest, content, parts = pack(*geometry)
                    capped = cap_parts(content, manifest, parts, parts, shared_caps=True,
                                       allow_nonplanar=True, triangulation=method, check_intersections=False)
                    self.assertEqual(capped.statistics["shared_caps_count"], 2)
                    result = union_parts(capped)
                    self.assertTrue(result.mesh.is_volume)
                    self.assertEqual(result.statistics["connected_components"], 1)
                    self.assertEqual(result.statistics["cap_faces"], 0)
                    expected = trimesh.Trimesh(geometry[0], geometry[1], process=False)
                    self.assertAlmostEqual(result.mesh.volume, expected.volume)
                    self.assert_ancestry(result, capped)

    def test_partial_face_contact_merges_but_a_positive_gap_is_not_bridged(self):
        base = capped_fixture()
        for gap, components, area in ((0, 1, 29), (1e-6, 2, 32)):
            with self.subTest(gap=gap):
                capped = replace(base, parts=(base.parts[0], moved(base.parts[1], [gap, 1, .5])))
                result = union_parts(capped)
                self.assertAlmostEqual(result.mesh.volume, 8)
                self.assertAlmostEqual(result.mesh.area, area)
                self.assertEqual(result.statistics["connected_components"], components)
                self.assert_ancestry(result, capped)

    def test_contained_part_disappears_but_its_name_and_color_remain(self):
        capped = closed_mesh_fixture([trimesh.creation.box(extents=[4, 4, 4]), trimesh.creation.box()])
        result = union_parts(capped)
        self.assertAlmostEqual(result.mesh.volume, 64)
        self.assertEqual(set(result.face_part_ids.tolist()), {0})
        self.assertEqual(result.palette, {r.part.part_id: r.part.color for r in capped.parts})
        descriptions = result.mesh.metadata["boolean_union"]["parts"]
        self.assertEqual(descriptions[1]["name"], capped.parts[1].part.name)
        self.assertEqual(descriptions[1]["output_faces"], 0)

    def test_disjoint_solids_and_empty_records_are_not_claimed_printable(self):
        base = capped_fixture()
        empty = replace(base.parts[2], part=replace(base.parts[2].part, vertices=np.empty((0, 3)),
                        faces=np.empty((0, 3), dtype=int)), source_vertex_indices=np.empty(0, dtype=int),
                        source_face_indices=np.empty(0, dtype=int), cap_ids=np.empty(0, dtype=int))
        capped = replace(base, parts=(base.parts[0], moved(base.parts[1], [10, 0, 0]), empty))
        result = union_parts(capped)
        self.assertEqual(result.statistics["connected_components"], 2)
        self.assertEqual(result.statistics["input_parts"], 2)
        self.assertEqual(result.statistics["skipped_empty_parts"], 1)
        self.assertAlmostEqual(result.mesh.volume, 8)
        self.assertFalse(result.statistics["printable"])
        self.assert_ancestry(result, capped)
        with self.assertRaisesRegex(ValueError, "面がありません"):
            union_parts(replace(base, parts=(empty,)))
        with self.assertRaisesRegex(ValueError, "面がありません"):
            union_parts(CappingResult((), {}))

    def test_hollow_sections_and_correctly_oriented_enclosed_cavities_keep_voids(self):
        result = union_parts(capped_fixture(geometry=hollow_prism()))
        self.assertAlmostEqual(result.mesh.volume, 36)
        self.assertEqual(result.statistics["cap_faces"], 0)
        np.testing.assert_array_equal(result.mesh.contains([[1.5, 0, 0], [1.5, 1.5, 0]]), [False, True])
        inner = trimesh.creation.box()
        inner.invert()
        cavity = closed_mesh_fixture([trimesh.creation.box(extents=[4, 4, 4]), inner], same_part=True)
        result = union_parts(cavity)
        self.assertAlmostEqual(result.mesh.volume, 63)
        self.assertEqual(result.statistics["connected_components"], 1)
        self.assertEqual(result.statistics["surface_components"], 2)
        np.testing.assert_array_equal(result.mesh.contains([[0, 0, 0], [1.5, 0, 0]]), [False, True])

    def test_extension_face_ids_override_caps_and_preserve_generated_source_minus_one(self):
        base = capped_fixture(triangulation="center_fan")
        record = base.parts[1]
        extension_ids = np.flatnonzero(record.is_cap)[:3].tolist()
        record = replace(record, statistics={**record.statistics, "extension_face_ids": extension_ids})
        capped = replace(base, parts=(record,))
        result = union_parts(capped)
        self.assertEqual(set(result.face_kinds.tolist()), {0, 1, 2})
        self.assertEqual(result.statistics["extension_faces"], len(extension_ids))
        self.assertTrue(np.all(result.source_face_indices[result.face_kinds > 0] == -1))
        self.assert_ancestry(result, capped)

    def test_normalization_handles_small_large_and_far_translated_coordinates(self):
        base = capped_fixture()
        for scale, offset in ((1e-9, [0, 0, 0]), (1e9, [0, 0, 0]), (.01, [1e9, -1e9, 2e9])):
            with self.subTest(scale=scale, offset=offset):
                capped = replace(base, parts=tuple(replace(r, part=replace(r.part,
                                 vertices=r.part.vertices * scale + offset)) for r in base.parts))
                result = union_parts(capped)
                np.testing.assert_allclose(result.mesh.bounds, np.array([[0, 0, 0], [3, 2, 2]]) * scale + offset,
                                           rtol=0, atol=1e-6 * scale + 3e-7)
                self.assertAlmostEqual(result.statistics["volume"] / scale ** 3, 12, delta=5e-4)
                self.assertEqual(result.statistics["connected_components"], 1)
                self.assertEqual(result.statistics["cap_faces"], 0)

    def test_preview_is_one_mesh_with_semantic_face_colors(self):
        result = union_parts(capped_fixture())
        payload = union_payload(result)
        np.testing.assert_array_equal(payload["vertices"], result.mesh.vertices)
        np.testing.assert_array_equal(np.asarray(payload["faces"]).reshape(-1, 4)[:, 1:], result.mesh.faces)
        self.assertEqual(payload["face_colors"], [result.palette[int(i)] for i in result.face_part_ids])


class InvalidUnionTests(unittest.TestCase):
    def test_existing_hole_is_rejected_even_when_cut_caps_close(self):
        vertices, faces, labels = prism()
        capped = capped_fixture(geometry=(vertices, faces[1:], labels[1:]))
        with self.assertRaisesRegex(ValueError, "穴"):
            union_parts(capped)

    def test_degenerate_experimental_caps_are_rejected(self):
        geometry = prism([[0, 0], [1, 0], [2, 0], [2, 2], [0, 2]], [[0, 1, 4], [1, 3, 4], [1, 2, 3]])
        capped = capped_fixture(geometry=geometry, triangulation="point_only")
        self.assertGreater(capped.statistics["degenerate_cap_faces"], 0)
        with self.assertRaisesRegex(ValueError, "退化"):
            union_parts(capped)

    def test_inconsistent_and_inverted_winding_are_rejected(self):
        base = capped_fixture()
        for indices in ([0], np.arange(len(base.parts[0].part.faces))):
            with self.subTest(indices=indices):
                record = base.parts[0]
                faces = record.part.faces.copy()
                faces[indices] = faces[indices, ::-1]
                bad = replace(record, part=replace(record.part, faces=faces))
                with self.assertRaisesRegex(ValueError, "向き"):
                    union_parts(replace(base, parts=(bad,)))
        # A positive total volume must not hide an inverted disconnected component.
        inner = trimesh.creation.box()
        inner.invert()
        inner.apply_translation([10, 0, 0])
        capped = closed_mesh_fixture([trimesh.creation.box(extents=[4, 4, 4]), inner], same_part=True)
        with self.assertRaisesRegex(ValueError, "向き"):
            union_parts(capped)

    def test_closed_self_intersecting_input_is_rejected(self):
        second = trimesh.creation.box()
        second.apply_translation([.5, .3, .4])
        capped = closed_mesh_fixture([trimesh.creation.box(), second], same_part=True)
        record = capped.parts[0]
        self.assertTrue(trimesh.Trimesh(record.part.vertices, record.part.faces, process=False).is_volume)
        with self.assertRaisesRegex(ValueError, "自己交差"):
            union_parts(capped)

    def test_closed_surface_pinched_at_one_vertex_is_rejected(self):
        second = trimesh.creation.box()
        second.apply_translation([1, 1, 1])
        mesh = trimesh.util.concatenate([trimesh.creation.box(), second])
        mesh.merge_vertices()
        self.assertTrue(mesh.is_watertight)
        self.assertTrue(mesh.is_winding_consistent)
        capped = closed_mesh_fixture([mesh])
        with self.assertRaisesRegex(ValueError, "頂点"):
            union_parts(capped)

    def test_corrupted_geometry_or_provenance_is_rejected(self):
        base = capped_fixture()
        record = base.parts[0]
        bad_vertices = record.part.vertices.copy()
        bad_vertices[0, 0] = np.nan
        bad_faces = record.part.faces.copy()
        bad_faces[0, 0] = len(record.part.vertices)
        cases = [replace(record, part=replace(record.part, vertices=bad_vertices)),
                 replace(record, part=replace(record.part, faces=bad_faces)),
                 replace(record, source_face_indices=record.source_face_indices[:-1]),
                 replace(record, source_vertex_indices=record.source_vertex_indices[:-1]),
                 replace(record, cap_ids=record.cap_ids.astype(float)),
                 replace(record, statistics={"extension_face_ids": [-1]}),
                 replace(record, statistics={"extension_face_ids": [len(record.part.faces)]}),
                 replace(record, statistics={"extension_face_ids": [1.5]}),
                 replace(record, statistics={"extension_face_ids": [True]})]
        for index, bad in enumerate(cases):
            with self.subTest(case=index):
                with self.assertRaises(ValueError):
                    union_parts(replace(base, parts=(bad,)))
        with self.assertRaisesRegex(ValueError, "ID"):
            union_parts(replace(base, parts=(record, record)))
        with self.assertRaisesRegex(ValueError, "保存できません"):
            union_parts(base, metadata={"value": float("nan")})

    def test_engine_errors_and_empty_results_are_rejected(self):
        capped = capped_fixture()
        class FailedSolid:
            def status(self):
                return manifold3d.Error.NotManifold

        for solid in (FailedSolid(), manifold3d.Manifold()):
            with self.subTest(solid=type(solid)):
                with patch.object(manifold3d.Manifold, "batch_boolean", return_value=solid):
                    with self.assertRaisesRegex(ValueError, "結合エンジン"):
                        union_parts(capped)
        with patch.object(manifold3d.Manifold, "batch_boolean", side_effect=RuntimeError("failure")):
            with self.assertRaisesRegex(ValueError, "結合エンジン"):
                union_parts(capped)
        with patch.object(manifold3d.Manifold, "batch_boolean", side_effect=ValueError("native error")):
            with self.assertRaisesRegex(ValueError, "結合エンジン"):
                union_parts(capped)

    def test_success_status_does_not_bypass_output_geometry_or_ancestry_validation(self):
        operation = manifold3d.Manifold.batch_boolean
        for corruption in ("geometry", "ancestry", "runs"):
            def corrupt(solids, op):
                output = operation(solids, op).to_mesh64()
                fields = {key: getattr(output, key) for key in ("vert_properties", "tri_verts", "face_id",
                          "run_index", "run_original_id", "merge_from_vert", "merge_to_vert")}
                if corruption == "geometry":
                    vertices = output.vert_properties.copy()
                    vertices[output.tri_verts[0, 0]] = vertices[output.tri_verts[0, 1]]
                    fields["vert_properties"] = vertices
                elif corruption == "ancestry":
                    fields["face_id"] = np.full(len(output.tri_verts), 99999, dtype=np.uint64)
                else:
                    fields["run_index"] = [0]
                return SimpleNamespace(status=lambda: manifold3d.Error.NoError, is_empty=lambda: False,
                                       to_mesh64=lambda: SimpleNamespace(**fields))
            with self.subTest(corruption=corruption):
                with patch.object(manifold3d.Manifold, "batch_boolean", side_effect=corrupt):
                    with self.assertRaisesRegex(ValueError, "退化|元の面|対応情報"):
                        union_parts(capped_fixture())


class UnionExportTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        base = capped_fixture(triangulation="center_fan")
        record = base.parts[1]
        record = replace(record, statistics={**record.statistics,
                         "extension_face_ids": np.flatnonzero(record.is_cap)[:2].tolist()})
        cls.capped = replace(base, parts=(base.parts[0], moved(record, [-.5, 1, .5])))
        cls.context = {"extension": {"enabled": True, "max_distance": .25}, "name": "保存用"}
        cls.editing = {"scales": {"0": 1.2}, "translations": {"1": [0, 1, 0]}}
        cls.result = union_parts(cls.capped, metadata=cls.context)

    def test_npz_file_roundtrip_preserves_geometry_colors_ancestry_and_names_without_pickle(self):
        result = self.result
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / "union.npz"
            path.write_bytes(export_union_npz(result, source_key="source", editing_metadata=self.editing))
            with np.load(path, allow_pickle=False) as data:
                for key, expected in (("vertices", result.mesh.vertices), ("faces", result.mesh.faces),
                                      ("face_part_ids", result.face_part_ids), ("source_face_indices", result.source_face_indices),
                                      ("face_kinds", result.face_kinds), ("face_colors", result.mesh.visual.face_colors),
                                      ("input_face_indices", result.mesh.face_attributes["input_face_indices"]),
                                      ("cap_ids", result.mesh.face_attributes["cap_ids"])):
                    np.testing.assert_array_equal(data[key], expected)
                    self.assertNotEqual(data[key].dtype.kind, "O")
                mesh = trimesh.Trimesh(data["vertices"], data["faces"], process=False)
                self.assertTrue(mesh.is_volume)
                self.assertAlmostEqual(mesh.volume, 7.25)
                metadata = json.loads(data["metadata_json"].item())
        self.assertEqual(metadata["editor_source_key"], "source")
        self.assertEqual(metadata["editing"], self.editing)
        self.assertEqual(metadata["metadata"], self.context)
        self.assertEqual(metadata["generated_face_source_index"], -1)
        self.assertEqual(metadata["face_kinds"], {"0": "original", "1": "cap", "2": "extension"})
        self.assertEqual([(p["name"], p["color"]) for p in metadata["parts"]],
                         [(r.part.name, r.part.color) for r in self.capped.parts])

    def test_glb_file_roundtrip_uses_one_mesh_shared_positions_and_material_provenance(self):
        result = self.result
        blob = export_union_glb(result, source_key="source", editing_metadata=self.editing)
        tree, binary = glb_contents(blob)
        self.assertEqual(len(tree["meshes"]), 1)
        self.assertEqual(len(tree["nodes"]), 1)
        primitives = tree["meshes"][0]["primitives"]
        self.assertEqual(len(primitives), 2)
        self.assertEqual({p["attributes"]["POSITION"] for p in primitives}, {0})
        positions = read_accessor(tree, binary, 0) + tree["nodes"][0]["translation"]
        np.testing.assert_allclose(positions, result.mesh.vertices)
        seen = []
        for primitive in primitives:
            material = tree["materials"][primitive["material"]]
            provenance = primitive["extras"]
            part_id = provenance["part_id"]
            ids = provenance["face_indices"]
            seen.extend(ids)
            self.assertEqual(material["name"], self.capped.parts[part_id].part.name)
            expected = trimesh.visual.color.hex_to_rgba(result.palette[part_id]) / 255
            np.testing.assert_allclose(material["pbrMetallicRoughness"]["baseColorFactor"], expected)
            np.testing.assert_array_equal(read_accessor(tree, binary, primitive["indices"]).reshape(-1, 3), result.mesh.faces[ids])
            np.testing.assert_array_equal(provenance["source_face_indices"], result.source_face_indices[ids])
            np.testing.assert_array_equal(provenance["face_kinds"], result.face_kinds[ids])
            np.testing.assert_array_equal(provenance["input_face_indices"], result.mesh.face_attributes["input_face_indices"][ids])
            self.assertNotIn("COLOR_0", primitive["attributes"])
        self.assertEqual(sorted(seen), list(range(len(result.mesh.faces))))
        self.assertEqual(tree["extras"]["boolean_union"]["metadata"], self.context)
        for view in tree["bufferViews"]:
            self.assertEqual(view["byteOffset"] % 4, 0)
            self.assertLessEqual(view["byteOffset"] + view["byteLength"], len(binary))
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / "union.glb"
            path.write_bytes(blob)
            scene = trimesh.load(path, process=False, merge_primitives=True)
            self.assertEqual(len(scene.geometry), 1)
            mesh = scene.to_geometry()
            # Trimesh duplicates the shared POSITION buffer for each material
            # primitive on import. Recover that topology before solid checks.
            mesh.merge_vertices()
            self.assertTrue(mesh.is_volume)
            self.assertEqual(len(mesh.faces), len(result.mesh.faces))
            self.assertAlmostEqual(mesh.volume, 7.25, places=6)
            np.testing.assert_allclose(mesh.bounds, result.mesh.bounds)

    def test_glb_translation_retains_small_geometry_far_from_world_origin(self):
        base = capped_fixture()
        capped = replace(base, parts=tuple(replace(r, part=replace(r.part,
                         vertices=r.part.vertices * .01 + [1e9, -1e9, 2e9])) for r in base.parts))
        result = union_parts(capped)
        blob = export_union_glb(result, source_key="far")
        tree, binary = glb_contents(blob)
        local = read_accessor(tree, binary, 0)
        self.assertLess(np.abs(local).max(), 1)
        np.testing.assert_allclose(local + tree["nodes"][0]["translation"], result.mesh.vertices, rtol=0, atol=1e-7)
        scene = trimesh.load(io.BytesIO(blob), file_type="glb", process=False, merge_primitives=True)
        mesh = scene.to_geometry()
        np.testing.assert_allclose(mesh.bounds, result.mesh.bounds, rtol=0, atol=1e-7)
        with np.load(io.BytesIO(export_union_npz(result, source_key="far")), allow_pickle=False) as data:
            np.testing.assert_array_equal(data["vertices"], result.mesh.vertices)

    def test_stl_file_roundtrip_applies_mm_scaling_once(self):
        result = self.result
        vertices = result.mesh.vertices.copy()
        with tempfile.TemporaryDirectory() as folder:
            for factor in (1.0, 25.4):
                with self.subTest(factor=factor):
                    blob = export_union_stl(result, mm_per_unit=factor)
                    self.assertEqual(len(blob), 84 + len(result.mesh.faces) * 50)
                    self.assertIn(b"units=mm", blob[:80])
                    self.assertEqual(struct.unpack_from("<I", blob, 80)[0], len(result.mesh.faces))
                    path = Path(folder) / "union.stl"
                    path.write_bytes(blob)
                    mesh = trimesh.load(path, process=True)
                    self.assertTrue(mesh.is_volume)
                    self.assertAlmostEqual(mesh.volume / factor ** 3, 7.25, places=5)
                    np.testing.assert_allclose(mesh.bounds, result.mesh.bounds * factor, rtol=1e-6, atol=1e-6)
        np.testing.assert_array_equal(result.mesh.vertices, vertices)

    def test_stl_invalid_mm_scales_and_unrepresentable_coordinates_are_rejected(self):
        for factor in (0, -1, float("nan"), float("inf"), True, False, "1", None, 10 ** 400):
            with self.subTest(factor=factor):
                with self.assertRaisesRegex(ValueError, "mm"):
                    export_union_stl(self.result, mm_per_unit=factor)
        for factor in (1e300, 1e-300):
            with self.subTest(factor=factor):
                with self.assertRaisesRegex(ValueError, "STL"):
                    export_union_stl(self.result, mm_per_unit=factor)
        base = capped_fixture()
        far = replace(base, parts=tuple(moved(r, [1e12, 0, 0]) for r in base.parts))
        result = union_parts(far)
        with self.assertRaisesRegex(ValueError, "STL"):
            export_union_stl(result)

    def test_exports_revalidate_mesh_and_face_correspondence(self):
        bad = replace(self.result, source_face_indices=self.result.source_face_indices[:-1])
        for export in (export_union_glb, export_union_npz):
            with self.subTest(export=export.__name__):
                with self.assertRaisesRegex(ValueError, "対応"):
                    export(bad, source_key="bad")
        with self.assertRaisesRegex(ValueError, "対応"):
            export_union_stl(bad)
        mesh = self.result.mesh.copy()
        mesh.vertices[mesh.faces[0, 0]] = mesh.vertices[mesh.faces[0, 1]]
        bad = replace(self.result, mesh=mesh)
        with self.assertRaisesRegex(ValueError, "退化"):
            export_union_glb(bad, source_key="bad")

    def test_metadata_is_snapshotted_and_default_editing_metadata_is_empty(self):
        metadata = {"settings": {"extension": [1, 2]}}
        result = union_parts(self.capped, metadata=metadata)
        metadata["settings"]["extension"].append(3)
        with np.load(io.BytesIO(export_union_npz(result, source_key="snapshot")), allow_pickle=False) as data:
            saved = json.loads(data["metadata_json"].item())
        self.assertEqual(saved["metadata"]["settings"]["extension"], [1, 2])
        self.assertEqual(saved["editing"], {})


if __name__ == "__main__":
    unittest.main()
