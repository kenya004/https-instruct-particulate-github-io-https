"""Boolean union of closed parts, retaining triangle ancestry and semantic colors.

Manifold runs identify input parts; face IDs identify *local input triangles*,
including generated caps and extensions. Neither colors nor ancestry are inferred
from proximity after the operation. Coordinates are conditioned only internally.
"""
from __future__ import annotations

from dataclasses import dataclass
import io
import json
from numbers import Real
import struct

import numpy as np
import trimesh

from capping import CappingResult
from mesh_overlaps import find_face_overlaps


METHOD = "manifold_boolean_union_v1"
FACE_KINDS = {0: "original", 1: "cap", 2: "extension"}


@dataclass(frozen=True)
class UnionResult:
    mesh: trimesh.Trimesh
    face_part_ids: np.ndarray
    source_face_indices: np.ndarray
    face_kinds: np.ndarray
    statistics: dict
    palette: dict[int, str]


def _json_copy(value):
    """Snapshot metadata and reject values that cannot be written losslessly."""
    try:
        return json.loads(json.dumps(value, ensure_ascii=False, allow_nan=False))
    except (TypeError, ValueError, OverflowError) as error:
        raise ValueError("結合の設定情報を保存できません。数値や文字列を確認してください。") from error


def _frame(vertices):
    lower, upper = vertices.min(axis=0), vertices.max(axis=0)
    with np.errstate(over="ignore", invalid="ignore"):
        origin = lower / 2 + upper / 2
        scale = float(np.max(upper - lower))
    if not np.isfinite(scale) or scale <= 0:
        raise ValueError("結合する形状の大きさが不正です。")
    return origin, scale


def _indices(values, size, label, *, minimum=-1):
    values = np.asarray(values)
    if (values.shape != (size,) or (values.size and (values.dtype.kind not in "iu"
            or values.min() < minimum or values.max() > np.iinfo(np.int64).max))):
        raise ValueError(f"{label}の対応情報が不正です。")
    return values.astype(np.int64, copy=True)


def _geometry(vertices, faces):
    vertices, faces = np.asarray(vertices), np.asarray(faces)
    if (vertices.ndim != 2 or vertices.shape[1] != 3 or vertices.dtype.kind not in "fiu"
            or not np.isfinite(vertices).all()):
        raise ValueError("結合する頂点の座標が不正です。")
    if (faces.ndim != 2 or faces.shape[1] != 3 or faces.dtype.kind not in "iu" or not len(faces)
            or faces.min() < 0 or faces.max() >= len(vertices)):
        raise ValueError("結合する面と頂点の対応が不正です。")
    return np.array(vertices, dtype=np.float64), np.array(faces, dtype=np.int64)


def _vertex_links(faces):
    """Each vertex link must be one cycle, even at a pinched closed surface."""
    corners = np.arange(faces.size).reshape(-1, 3)
    edges = np.stack([faces, np.roll(faces, -1, axis=1)], axis=2).reshape(-1, 2)
    order = np.lexsort(np.sort(edges, axis=1).T[::-1])
    # Watertightness has already established exactly two entries for every edge.
    a, b = order[::2], order[1::2]
    start, end = corners.reshape(-1), np.roll(corners, -1, axis=1).reshape(-1)
    links = np.vstack([np.column_stack([start[a], end[b]]), np.column_stack([end[a], start[b]])])
    labels = trimesh.graph.connected_component_labels(links, node_count=faces.size)
    order = np.argsort(faces.reshape(-1), kind="stable")
    same_vertex = np.diff(faces.reshape(-1)[order]) == 0
    if np.any(same_vertex & (np.diff(labels[order]) != 0)):
        raise ValueError("一点でつながる不正な頂点があります。面のつながりを確認してください。")


def _inside_shell(point, triangles):
    """Absolute solid-angle winding; no ray direction or spatial-index dependency."""
    a, b, c = np.moveaxis(triangles - point, 1, 0)
    la, lb, lc = (np.linalg.norm(v, axis=1) for v in (a, b, c))
    numerator = np.einsum("ij,ij->i", a, np.cross(b, c))
    denominator = (la * lb * lc + np.einsum("ij,ij->i", a, b) * lc
                   + np.einsum("ij,ij->i", b, c) * la + np.einsum("ij,ij->i", c, a) * lb)
    return abs(float(np.arctan2(numerator, denominator).sum())) > np.pi


def _validate_mesh(vertices, faces):
    """Check topology, geometric intersections and oriented shells, without repair."""
    vertices, faces = _geometry(vertices, faces)
    origin, scale = _frame(vertices[np.unique(faces)])
    points = (vertices - origin) / scale
    triangles = points[faces]
    edges = triangles[:, 1:] - triangles[:, :1]
    area2 = np.linalg.norm(np.cross(edges[:, 0], edges[:, 1]), axis=1)
    edge2 = np.max(np.sum(edges ** 2, axis=2), axis=1)
    if np.any(area2 <= np.maximum(1e-24, 32 * np.finfo(float).eps * edge2)):
        raise ValueError("面が退化しています。面積が0の面や細すぎる面を確認してください。")
    if len(np.unique(np.sort(faces, axis=1), axis=0)) != len(faces):
        raise ValueError("重複した面があります。")
    mesh = trimesh.Trimesh(vertices=points, faces=faces, process=False)
    if not mesh.is_watertight:
        raise ValueError("形状に穴や不正な辺があります。すべてのパーツを閉じてください。")
    if not mesh.is_winding_consistent:
        raise ValueError("面の向きがそろっていません。")
    _vertex_links(faces)
    overlaps = find_face_overlaps(points, faces, tolerance=1e-10,
                                  frame={"origin": [0, 0, 0], "scale": 1.0})
    if overlaps["pair_count"]:
        raise ValueError("形状が自己交差しています。交差した面を修正してください。")
    labels = trimesh.graph.connected_component_labels(mesh.face_adjacency, node_count=len(faces))
    shells = [triangles[labels == label] for label in np.unique(labels)]
    positive, signed_volume = 0, 0.0
    for shell in shells:
        depth = sum(_inside_shell(shell[0, 0], other) for other in shells if other is not shell)
        center = shell.reshape(-1, 3).mean(axis=0)
        shifted = shell - center
        volume = float(np.einsum("ij,ij->i", shifted[:, 0],
                                 np.cross(shifted[:, 1], shifted[:, 2])).sum() / 6)
        if not np.isfinite(volume) or volume == 0:
            raise ValueError("形状の体積が0または不正です。")
        if (volume > 0) != (depth % 2 == 0):
            raise ValueError("形状の内側と外側の面の向きが逆です。")
        positive += depth % 2 == 0
        signed_volume += volume
    with np.errstate(over="ignore", under="ignore", invalid="ignore"):
        volume = float(np.longdouble(signed_volume) * scale * scale * scale)
    if not np.isfinite(volume) or volume <= 0:
        raise ValueError("形状の体積を正しく計算できません。座標の大きさを確認してください。")
    return {"is_watertight": True, "is_winding_consistent": True, "is_volume": True,
            "connected_components": int(positive), "surface_components": len(shells),
            "volume": volume, "degenerate_faces": 0, "self_intersection_pair_count": 0}


def validate_solid(vertices, faces):
    """Inspect a welded result using the same checks as Boolean/STL output."""
    return _validate_mesh(vertices, faces)


def _engine_status(solid, engine):
    if solid.status() != engine.Error.NoError:
        raise ValueError("結合エンジンが形状を処理できませんでした。閉じた面と面の向きを確認してください。")
    if solid.is_empty():
        raise ValueError("結合エンジンが空の形状を返しました。")


def union_parts(capped: CappingResult, *, metadata=None) -> UnionResult:
    """Union closed parts; empty records are skipped, invalid solids are rejected.

    ``extension_face_ids`` are local input face indices and take precedence over
    cap flags. A split output triangle inherits its input triangle's source ID.
    Generated triangles retain source -1, not an invented original face index.
    """
    context = _json_copy({} if metadata is None else metadata)
    inputs, part_records, palette = [], [], {}
    for record in capped.parts:
        part = record.part
        if (isinstance(part.part_id, (bool, np.bool_)) or not isinstance(part.part_id, (int, np.integer))
                or part.part_id < 0 or part.part_id > np.iinfo(np.int64).max or part.part_id in palette):
            raise ValueError("パーツのIDが不正か重複しています。")
        part_id = int(part.part_id)
        try:
            color = trimesh.visual.color.hex_to_rgba(part.color)
            if color.shape != (4,):
                raise ValueError
        except (ValueError, TypeError, AttributeError) as error:
            raise ValueError("パーツの色が不正です。") from error
        palette[part_id] = part.color
        description = {"part_id": part_id, "name": part.name, "color": part.color,
                       "geometry_name": part.geometry_name, "node_name": part.node_name,
                       "input_faces": len(part.faces), "skipped_empty": not len(part.faces)}
        part_records.append(description)
        if not len(part.faces):
            continue
        vertices, faces = _geometry(part.vertices, part.faces)
        sources = _indices(record.source_face_indices, len(faces), "元の面")
        _indices(record.source_vertex_indices, len(vertices), "元の頂点")
        caps = _indices(record.cap_ids, len(faces), "蓋の面")
        extensions = np.asarray(record.statistics.get("extension_face_ids", []))
        if (extensions.ndim != 1 or (extensions.size and
                (extensions.dtype.kind not in "iu" or extensions.min() < 0 or extensions.max() >= len(faces)))):
            raise ValueError("延長した面の対応情報が不正です。")
        kinds = (caps >= 0).astype(np.uint8)
        kinds[extensions.astype(np.int64)] = 2
        _validate_mesh(vertices, faces)
        inputs.append((record, vertices, faces, sources, caps, kinds))
    if not inputs:
        raise ValueError("結合できる面がありません。")
    try:
        import manifold3d as engine
    except ImportError as error:
        raise ValueError("結合にはmanifold3dが必要です。実行環境に追加してください。") from error
    origin, scale = _frame(np.vstack([item[1][np.unique(item[2])] for item in inputs]))
    relations, solids = {}, []
    try:
        first_id = engine.Manifold.reserve_ids(len(inputs))
        for offset, item in enumerate(inputs):
            record, vertices, faces, sources, caps, kinds = item
            original_id = first_id + offset
            # Explicit IDs prevent Manifold from coalescing coplanar input faces.
            source = engine.Mesh64(
                np.ascontiguousarray((vertices - origin) / scale),
                np.ascontiguousarray(faces, dtype=np.uint64),
                run_index=np.array([0, faces.size], dtype=np.uint64),
                run_original_id=np.array([original_id], dtype=np.uint32),
                face_id=np.arange(len(faces), dtype=np.uint64))
            solid = engine.Manifold(source)
            _engine_status(solid, engine)
            relations[original_id] = (record.part.part_id, sources, caps, kinds)
            solids.append(solid)
        solid = engine.Manifold.batch_boolean(solids, engine.OpType.Add)
        _engine_status(solid, engine)
        output = solid.to_mesh64()
    except Exception as error:
        raise ValueError("結合エンジンでエラーが発生しました。入力形状を確認してください。") from error
    vertices, faces = _geometry(output.vert_properties[:, :3], output.tri_verts)
    # Honor topological merge vectors; coincident but unrelated vertices are not welded.
    remap = np.arange(len(vertices))
    merge_from = _indices(output.merge_from_vert, len(output.merge_from_vert), "結合結果の頂点", minimum=0)
    merge_to = _indices(output.merge_to_vert, len(merge_from), "結合結果の頂点", minimum=0)
    if (len(merge_from) and (merge_from.max() >= len(vertices) or merge_to.max() >= len(vertices))):
        raise ValueError("結合結果の頂点の対応が不正です。")
    for a, b in zip(merge_from, merge_to):
        remap[int(a)] = int(b)
    for _ in range(len(remap)):
        updated = remap[remap]
        if np.array_equal(updated, remap):
            break
        remap = updated
    else:
        raise ValueError("結合結果の頂点の対応が不正です。")
    if np.any(remap[merge_from] != remap[merge_to]):
        raise ValueError("結合結果の頂点の対応が不正です。")
    kept, inverse = np.unique(remap, return_inverse=True)
    vertices, faces = vertices[kept] * scale + origin, inverse[faces]
    face_count = len(faces)
    part_ids, sources, local_ids, cap_ids = (np.full(face_count, -1, dtype=np.int64) for _ in range(4))
    kinds = np.full(face_count, 255, dtype=np.uint8)
    runs = np.asarray(output.run_index, dtype=np.uint64)
    ancestry = np.asarray(output.face_id, dtype=np.uint64)
    if (len(runs) != len(output.run_original_id) + 1 or not len(runs)
            or runs[0] != 0 or runs[-1] != 3 * face_count or np.any(runs % 3)
            or np.any(runs[1:] < runs[:-1]) or ancestry.shape != (face_count,)):
        raise ValueError("結合結果の面の対応情報がありません。")
    for index, original_id in enumerate(output.run_original_id):
        if original_id not in relations:
            raise ValueError("結合結果の元パーツを特定できません。")
        part_id, source_faces, caps, face_kinds = relations[original_id]
        begin, end = int(runs[index] // 3), int(runs[index + 1] // 3)
        ids = ancestry[begin:end]
        if ids.size and ids.max() >= len(source_faces):
            raise ValueError("結合結果の元の面を特定できません。")
        ids = ids.astype(np.int64)
        part_ids[begin:end], local_ids[begin:end] = part_id, ids
        sources[begin:end], cap_ids[begin:end], kinds[begin:end] = source_faces[ids], caps[ids], face_kinds[ids]
    if np.any(part_ids < 0) or np.any(kinds > 2):
        raise ValueError("結合結果に対応するパーツがありません。")
    validation = _validate_mesh(vertices, faces)
    colors = np.array([trimesh.visual.color.hex_to_rgba(palette[int(i)]) for i in part_ids], dtype=np.uint8)
    mesh = trimesh.Trimesh(vertices=vertices, faces=faces, face_colors=colors, process=False)
    mesh.remove_unreferenced_vertices()
    mesh.face_attributes.update(input_face_indices=local_ids, cap_ids=cap_ids)
    for description in part_records:
        description["output_faces"] = int(np.count_nonzero(part_ids == description["part_id"]))
    statistics = {"method": METHOD, "engine": "manifold3d", "input_parts": len(inputs),
                  "skipped_empty_parts": len(capped.parts) - len(inputs),
                  "input_faces": sum(len(item[2]) for item in inputs), "output_faces": face_count,
                  "output_vertices": len(mesh.vertices), **validation,
                  "original_faces": int(np.count_nonzero(kinds == 0)),
                  "cap_faces": int(np.count_nonzero(kinds == 1)),
                  "extension_faces": int(np.count_nonzero(kinds == 2)),
                  "normalization": {"origin": origin.tolist(), "scale": scale},
                  "printable": False, "printability": "not_assessed",
                  "printability_note": "形状の検査のみです。造形寸法、肉厚、材料、装置の条件は確認していません。"}
    mesh.metadata["boolean_union"] = _json_copy({"parts": part_records, "metadata": context,
                                                  "capping_statistics": capped.statistics})
    return UnionResult(mesh, part_ids, sources, kinds, statistics, palette)


def union_payload(result: UnionResult) -> dict:
    return {"name": "Boolean Union", "vertices": result.mesh.vertices.tolist(),
            "faces": np.column_stack([np.full(len(result.mesh.faces), 3), result.mesh.faces]).reshape(-1).tolist(),
            "color": "#e28b3e", "face_colors": [result.palette[int(i)] for i in result.face_part_ids]}


def _check_result(result):
    _validate_mesh(result.mesh.vertices, result.mesh.faces)
    size = len(result.mesh.faces)
    parts = _indices(result.face_part_ids, size, "結合後のパーツ", minimum=0)
    _indices(result.source_face_indices, size, "結合後の元の面")
    kinds = _indices(result.face_kinds, size, "結合後の面の種類", minimum=0)
    if np.any(kinds > 2) or not set(parts.tolist()).issubset(result.palette):
        raise ValueError("結合後の面の色や種類の対応が不正です。")


def _export_metadata(result, source_key, editing_metadata):
    return _json_copy({"format_version": 1, "method": METHOD, "editor_source_key": source_key,
                       "editing": {} if editing_metadata is None else editing_metadata,
                       **result.mesh.metadata.get("boolean_union", {}), "statistics": result.statistics,
                       "palette": result.palette, "face_kinds": FACE_KINDS,
                       "generated_face_source_index": -1, "coordinate_units": "source_units"})


def export_union_npz(result: UnionResult, *, source_key, editing_metadata=None) -> bytes:
    _check_result(result)
    arrays = {"vertices": np.asarray(result.mesh.vertices, dtype=np.float64),
              "faces": np.asarray(result.mesh.faces, dtype=np.int64), "face_part_ids": result.face_part_ids,
              "source_face_indices": result.source_face_indices, "face_kinds": result.face_kinds,
              "face_colors": np.array([trimesh.visual.color.hex_to_rgba(result.palette[int(i)])
                                       for i in result.face_part_ids], dtype=np.uint8),
              "metadata_json": np.array(json.dumps(_export_metadata(result, source_key, editing_metadata),
                                                   ensure_ascii=False, allow_nan=False))}
    for name in ("input_face_indices", "cap_ids"):
        if name in result.mesh.face_attributes:
            arrays[name] = _indices(result.mesh.face_attributes[name], len(result.mesh.faces), name)
    buffer = io.BytesIO()
    np.savez_compressed(buffer, **arrays)
    return buffer.getvalue()


def export_union_glb(result: UnionResult, *, source_key, editing_metadata=None) -> bytes:
    """One mesh/node with material groups and per-primitive triangle provenance.

    Positions remain in source units. A standard node translation retains large
    world offsets without rounding small geometry away in glTF's float32 buffer.
    Primitive extras refer to triangles in their exported index-buffer order.
    """
    _check_result(result)
    metadata = _export_metadata(result, source_key, editing_metadata)
    origin, _ = _frame(result.mesh.vertices)
    with np.errstate(over="ignore", under="ignore", invalid="ignore"):
        positions = np.asarray(result.mesh.vertices - origin, dtype="<f4")
    try:
        _validate_mesh(positions, result.mesh.faces)
    except ValueError as error:
        raise ValueError("GLBの座標精度で形状を保存できません。元の座標の大きさを確認してください。") from error
    tree = {"asset": {"version": "2.0", "generator": "SegmentDesign3D-IP"}, "scene": 0,
            "scenes": [{"nodes": [0]}], "nodes": [{"name": "boolean_union", "mesh": 0, "translation": origin.tolist()}],
            "meshes": [], "materials": [], "accessors": [], "bufferViews": [],
            "extras": {"boolean_union": metadata}}
    binary = bytearray()

    def accessor(array, component_type, kind, target, bounds=False):
        binary.extend(b"\x00" * (-len(binary) % 4))
        array = np.ascontiguousarray(array)
        view = len(tree["bufferViews"])
        tree["bufferViews"].append({"buffer": 0, "byteOffset": len(binary), "byteLength": array.nbytes, "target": target})
        binary.extend(array.tobytes())
        record = {"bufferView": view, "componentType": component_type, "count": len(array), "type": kind}
        if bounds:
            record.update(min=array.min(axis=0).tolist(), max=array.max(axis=0).tolist())
        index = len(tree["accessors"])
        tree["accessors"].append(record)
        return index

    position = accessor(positions, 5126, "VEC3", 34962, bounds=True)
    normal = accessor(np.asarray(result.mesh.vertex_normals, dtype="<f4"), 5126, "VEC3", 34962)
    names = {p["part_id"]: p["name"] for p in metadata.get("parts", [])}
    primitives = []
    for part_id in sorted(set(result.face_part_ids.tolist())):
        color = trimesh.visual.color.hex_to_rgba(result.palette[part_id]) / 255
        material = len(tree["materials"])
        name = names.get(part_id, f"part_{part_id:04d}")
        tree["materials"].append({"name": name, "doubleSided": False,
                                 "pbrMetallicRoughness": {"baseColorFactor": color.tolist(), "metallicFactor": 0, "roughnessFactor": 1},
                                 "extras": {"part_id": part_id, "part_name": name}})
        ids = np.flatnonzero(result.face_part_ids == part_id)
        indices = accessor(np.asarray(result.mesh.faces[ids].reshape(-1), dtype="<u4"), 5125, "SCALAR", 34963)
        provenance = {"part_id": part_id, "part_name": name, "face_indices": ids.tolist(),
                      "source_face_indices": result.source_face_indices[ids].tolist(),
                      "face_kinds": result.face_kinds[ids].tolist()}
        for key in ("input_face_indices", "cap_ids"):
            if key in result.mesh.face_attributes:
                values = _indices(result.mesh.face_attributes[key], len(result.mesh.faces), key)
                provenance[key] = values[ids].tolist()
        primitives.append({"attributes": {"POSITION": position, "NORMAL": normal}, "indices": indices,
                           "material": material, "mode": 4, "extras": provenance})
    tree["meshes"].append({"name": "boolean_union", "primitives": primitives})
    tree["buffers"] = [{"byteLength": len(binary)}]
    encoded = json.dumps(tree, ensure_ascii=False, separators=(",", ":"), allow_nan=False).encode("utf-8")
    encoded += b" " * (-len(encoded) % 4)
    binary.extend(b"\x00" * (-len(binary) % 4))
    length = 12 + 8 + len(encoded) + 8 + len(binary)
    return (struct.pack("<4sII", b"glTF", 2, length) + struct.pack("<I4s", len(encoded), b"JSON")
            + encoded + struct.pack("<I4s", len(binary), b"BIN\x00") + binary)


def export_union_stl(result: UnionResult, *, mm_per_unit=1.0) -> bytes:
    """Binary STL in millimeters; reject invalid scales and float32 collapse."""
    try:
        factor = float(mm_per_unit)
    except (TypeError, ValueError, OverflowError):
        factor = float("nan")
    if (isinstance(mm_per_unit, (bool, np.bool_)) or not isinstance(mm_per_unit, Real)
            or not np.isfinite(factor) or factor <= 0):
        raise ValueError("1単位あたりのmmは0より大きい有限の数値にしてください。")
    _check_result(result)
    with np.errstate(over="ignore", under="ignore", invalid="ignore"):
        vertices = np.asarray(result.mesh.vertices * factor, dtype=np.float32)
    try:
        _validate_mesh(vertices, result.mesh.faces)
    except ValueError as error:
        raise ValueError("STLの座標精度で形状を保存できません。mm換算倍率や元の座標を確認してください。") from error
    mesh = trimesh.Trimesh(vertices=vertices.astype(float), faces=result.mesh.faces.copy(), process=False)
    content = trimesh.exchange.stl.export_stl(mesh)
    header = f"SegmentDesign3D-IP Boolean Union; units=mm; mm_per_unit={factor:.10g}".encode("ascii")
    return header[:80].ljust(80, b" ") + content[80:]
