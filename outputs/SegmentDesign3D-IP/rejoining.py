from __future__ import annotations

import hashlib
import io
import json
import struct
from collections import defaultdict
from dataclasses import dataclass

import numpy as np
import trimesh

from editing import EditablePart


@dataclass(frozen=True)
class RejoinedMesh:
    mesh: trimesh.Trimesh
    face_part_ids: np.ndarray
    source_face_indices: np.ndarray
    is_bridge: np.ndarray
    statistics: dict
    palette: dict[int, str]


def has_rejoin_data(content: bytes, manifest: dict) -> bool:
    required = {"vertices", "faces", "face_part_ids"}
    for part in manifest["parts"]:
        prefix = part.get("npz_prefix", f"part_{part['part_id']:04d}")
        required.update({f"{prefix}_source_vertex_indices", f"{prefix}_source_face_indices"})
    with np.load(io.BytesIO(content), allow_pickle=False) as data:
        return required.issubset(data.files)


def rejoin_input_key(source_key: str, scales: dict, connections: dict) -> str:
    settings = {"source": source_key, "scales": scales, "root": connections["root_id"],
                "follow": connections["enabled"], "translations": connections["translations"],
                "boundary_blending": connections.get("boundary_blending")}
    return hashlib.sha256(json.dumps(settings, sort_keys=True, allow_nan=False).encode()).hexdigest()


def _edge_groups(faces):
    directed = np.concatenate([faces[:, [0, 1]], faces[:, [1, 2]], faces[:, [2, 0]]])
    face_ids = np.tile(np.arange(len(faces)), 3)
    valid = directed[:, 0] != directed[:, 1]
    directed, face_ids = directed[valid], face_ids[valid]
    _, inverse, counts = np.unique(np.sort(directed, axis=1), axis=0, return_inverse=True, return_counts=True)
    order = np.argsort(inverse, kind="stable")
    starts = np.r_[0, np.cumsum(counts)[:-1]] if len(counts) else np.zeros(0, dtype=int)
    return directed, face_ids, order, starts, counts


def rejoin_parts(content: bytes, manifest: dict, original: tuple[EditablePart, ...], edited: tuple[EditablePart, ...]) -> RejoinedMesh:
    """Restore original adjacencies by welding coincident copies and bridging gaps.

    Part geometry and original faces are retained. Intersections are not corrected.
    Exact source-coordinate duplicates are treated as seams, as in connection detection.
    """
    if not has_rejoin_data(content, manifest):
        raise ValueError("NPZに結合に必要な元頂点・元面の対応情報がありません。")
    records = {part["part_id"]: part for part in manifest["parts"]}
    edited_by_id = {part.part_id: part for part in edited}
    if set(records) != {part.part_id for part in original} or set(records) != set(edited_by_id):
        raise ValueError("結合対象と元パーツのIDが一致しません。")
    with np.load(io.BytesIO(content), allow_pickle=False) as data:
        source_vertices = np.asarray(data["vertices"], dtype=np.float64)
        source_faces = np.asarray(data["faces"])
        labels = np.asarray(data["face_part_ids"])
        if source_vertices.ndim != 2 or source_vertices.shape[1] != 3 or not np.isfinite(source_vertices).all():
            raise ValueError("元頂点データが不正です。")
        if source_faces.ndim != 2 or source_faces.shape[1] != 3 or source_faces.dtype.kind not in "iu" or not len(source_faces):
            raise ValueError("元面データが不正です。")
        if source_faces.min() < 0 or source_faces.max() >= len(source_vertices) or labels.shape != (len(source_faces),) or labels.dtype.kind not in "iu" or not set(labels.tolist()).issubset(records):
            raise ValueError("元面と頂点・ラベルの対応が不正です。")
        _, canonical_ids = np.unique(source_vertices, axis=0, return_inverse=True)
        raw_vertices, raw_sources = [], []
        raw_faces = np.empty_like(source_faces, dtype=np.int64)
        seen_faces = np.zeros(len(source_faces), dtype=bool)
        offset = 0
        for part in original:
            current = edited_by_id[part.part_id]
            prefix = records[part.part_id].get("npz_prefix", f"part_{part.part_id:04d}")
            vertex_ids, face_ids = data[f"{prefix}_source_vertex_indices"], data[f"{prefix}_source_face_indices"]
            if vertex_ids.shape != (len(part.vertices),) or vertex_ids.dtype.kind not in "iu" or face_ids.shape != (len(part.faces),) or face_ids.dtype.kind not in "iu":
                raise ValueError("元頂点・元面インデックスの形式が不正です。")
            if len(vertex_ids) and (vertex_ids.min() < 0 or vertex_ids.max() >= len(source_vertices)):
                raise ValueError("元頂点インデックスが範囲外です。")
            if len(face_ids) and (face_ids.min() < 0 or face_ids.max() >= len(source_faces) or seen_faces[face_ids].any() or len(np.unique(face_ids)) != len(face_ids)):
                raise ValueError("元面インデックスが重複、または範囲外です。")
            if not np.array_equal(source_vertices[vertex_ids], part.vertices) or not np.array_equal(source_faces[face_ids], vertex_ids[part.faces]) or not np.all(labels[face_ids] == part.part_id):
                raise ValueError("NPZの全体形状と独立パーツの対応が一致しません。")
            if current.vertices.shape != part.vertices.shape or not np.isfinite(current.vertices).all() or not np.array_equal(current.faces, part.faces):
                raise ValueError("結合前にパーツの頂点数や面の構成が変更されています。")
            raw_vertices.append(current.vertices)
            raw_sources.append(canonical_ids[vertex_ids])
            raw_faces[face_ids] = current.faces + offset
            seen_faces[face_ids] = True
            offset += len(current.vertices)
    if not seen_faces.all():
        raise ValueError("元面に対応する編集後パーツがありません。")
    vertices = np.concatenate(raw_vertices)
    vertex_sources = np.concatenate(raw_sources)
    # Only copies of the same source point can be welded; unrelated close points stay separate.
    tolerance = max(float(np.linalg.norm(np.ptp(vertices, axis=0))), np.finfo(float).tiny) * 1e-10
    representatives = np.arange(len(vertices))
    grouped = np.argsort(vertex_sources, kind="stable")
    splits = np.flatnonzero(np.diff(vertex_sources[grouped])) + 1
    for group in np.split(grouped, splits):
        choices = []
        for index in group:
            match = next((candidate for candidate in choices if np.linalg.norm(vertices[index] - vertices[candidate]) <= tolerance), None)
            if match is None:
                choices.append(index)
            else:
                representatives[index] = match
    kept, remap = np.unique(representatives, return_inverse=True)
    vertices, vertex_sources = vertices[kept], vertex_sources[kept]
    faces = remap[raw_faces].tolist()
    part_ids = labels.astype(np.int32).tolist()
    original_count = len(faces)
    bridge_edge_count = 0
    canonical_faces = canonical_ids[source_faces]
    directed, edge_faces, order, starts, counts = _edge_groups(canonical_faces)
    ambiguous = 0

    def add_face(indices, part_id):
        if len(set(indices)) != 3:
            return
        triangle = vertices[indices]
        if not np.any(np.cross(triangle[1] - triangle[0], triangle[2] - triangle[0])):
            return
        faces.append([int(index) for index in indices])
        part_ids.append(int(part_id))

    for start, count in zip(starts, counts):
        entries = order[start:start + count]
        incident = edge_faces[entries]
        if len(set(labels[incident].tolist())) < 2:
            continue
        if count != 2:
            ambiguous += 1
            continue
        a_entry, b_entry = sorted(entries, key=lambda entry: int(labels[edge_faces[entry]]))
        a_face, b_face = int(edge_faces[a_entry]), int(edge_faces[b_entry])
        u, v = directed[a_entry]
        a_map = dict(zip(canonical_faces[a_face], faces[a_face]))
        b_map = dict(zip(canonical_faces[b_face], faces[b_face]))
        au, av, bu, bv = int(a_map[u]), int(a_map[v]), int(b_map[u]), int(b_map[v])
        if au == bu and av == bv:
            continue
        bridge_edge_count += 1
        # Opposite winding along each existing boundary edge. One triangle inherits each side's color.
        add_face([av, au, bu], labels[a_face])
        add_face([av, bu, bv], labels[b_face])

    # At junctions of 3+ parts, close only new loops whose vertices all came from one source point.
    directed, edge_faces, order, starts, counts = _edge_groups(np.asarray(faces, dtype=np.int64))
    junction_edges = defaultdict(list)
    for start in starts[counts == 1]:
        entry = order[start]
        u, v = directed[entry]
        if vertex_sources[u] == vertex_sources[v]:
            junction_edges[int(vertex_sources[u])].append((int(u), int(v), int(part_ids[edge_faces[entry]])))
    junction_faces_before = len(faces)
    for edges in junction_edges.values():
        outgoing = {u: (v, color) for u, v, color in edges}
        if len(outgoing) != len(edges) or len({v for _, v, _ in edges}) != len(edges):
            continue
        remaining = set(outgoing)
        while remaining:
            first = min(remaining)
            loop, current = [], first
            while current in remaining:
                remaining.remove(current)
                loop.append(current)
                current = outgoing[current][0]
            if current == first and len(loop) >= 3:
                for index in range(1, len(loop) - 1):
                    add_face([loop[0], loop[index + 1], loop[index]], outgoing[loop[index]][1])

    face_ids = np.asarray(part_ids, dtype=np.int32)
    palette = {part.part_id: part.color for part in original}
    color_table = {index: trimesh.visual.color.hex_to_rgba(color) for index, color in palette.items()}
    colors = np.asarray([color_table[int(index)] for index in face_ids])
    mesh = trimesh.Trimesh(vertices=vertices, faces=np.asarray(faces), face_colors=colors, process=False)
    statistics = {"original_faces": original_count, "bridge_faces": len(faces) - original_count,
                  "junction_faces": len(faces) - junction_faces_before, "bridged_edges": bridge_edge_count,
                  "welded_vertices": offset - len(vertices), "ambiguous_edges": ambiguous,
                  "connected_components": int(mesh.body_count)}
    return RejoinedMesh(mesh, face_ids, np.r_[np.arange(original_count), np.full(len(faces) - original_count, -1)],
                        np.arange(len(faces)) >= original_count, statistics, palette)


def rejoined_payload(joined: RejoinedMesh) -> dict:
    return {"name": "rejoined mesh", "vertices": joined.mesh.vertices.tolist(),
            "faces": np.column_stack([np.full(len(joined.mesh.faces), 3), joined.mesh.faces]).reshape(-1).tolist(),
            "color": "#e28b3e", "face_colors": [joined.palette[int(index)] for index in joined.face_part_ids]}


def export_rejoined_npz(joined: RejoinedMesh) -> bytes:
    buffer = io.BytesIO()
    np.savez_compressed(buffer, vertices=joined.mesh.vertices, faces=joined.mesh.faces,
                        face_part_ids=joined.face_part_ids, face_colors=joined.mesh.visual.face_colors,
                        source_face_indices=joined.source_face_indices, is_bridge=joined.is_bridge)
    return buffer.getvalue()


def export_rejoined_glb(joined: RejoinedMesh, *, source_key: str) -> bytes:
    """One glTF mesh/node, with shared positions and separate material groups.

    glTF has vertex colors, not face colors. Material groups retain sharp face colors
    without averaging colors or expanding every face into isolated vertices.
    """
    tree = {"asset": {"version": "2.0", "generator": "SegmentDesign3D-IP"}, "scene": 0,
            "scenes": [{"nodes": [0]}], "nodes": [{"name": "rejoined_mesh", "mesh": 0}],
            "meshes": [], "materials": [], "accessors": [], "bufferViews": [],
            "extras": {"editor_source_key": source_key, "rejoining": joined.statistics}}
    binary = bytearray()

    def accessor(array, component_type, kind, target, bounds=False):
        array = np.ascontiguousarray(array)
        view_id = len(tree["bufferViews"])
        tree["bufferViews"].append({"buffer": 0, "byteOffset": len(binary), "byteLength": array.nbytes, "target": target})
        binary.extend(array.tobytes())
        record = {"bufferView": view_id, "componentType": component_type, "count": len(array), "type": kind}
        if bounds:
            record.update(min=array.min(axis=0).tolist(), max=array.max(axis=0).tolist())
        index = len(tree["accessors"])
        tree["accessors"].append(record)
        return index

    position = accessor(np.asarray(joined.mesh.vertices, dtype="<f4"), 5126, "VEC3", 34962, bounds=True)
    normal = accessor(np.asarray(joined.mesh.vertex_normals, dtype="<f4"), 5126, "VEC3", 34962)
    primitives = []
    for part_id in sorted(set(joined.face_part_ids.tolist())):
        color = trimesh.visual.color.hex_to_rgba(joined.palette[part_id]) / 255
        material_id = len(tree["materials"])
        tree["materials"].append({"name": f"part_{part_id:04d}", "doubleSided": True,
                                 "pbrMetallicRoughness": {"baseColorFactor": color.tolist(), "metallicFactor": 0, "roughnessFactor": 1},
                                 "extras": {"part_id": part_id}})
        triangles = joined.mesh.faces[joined.face_part_ids == part_id]
        indices = accessor(np.asarray(triangles.reshape(-1), dtype="<u4"), 5125, "SCALAR", 34963)
        primitives.append({"attributes": {"POSITION": position, "NORMAL": normal}, "indices": indices,
                           "material": material_id, "mode": 4, "extras": {"part_id": part_id}})
    tree["meshes"].append({"name": "rejoined_mesh", "primitives": primitives})
    tree["buffers"] = [{"byteLength": len(binary)}]
    json_bytes = json.dumps(tree, separators=(",", ":"), allow_nan=False).encode()
    json_bytes += b" " * (-len(json_bytes) % 4)
    binary.extend(b"\x00" * (-len(binary) % 4))
    total = 12 + 8 + len(json_bytes) + 8 + len(binary)
    return struct.pack("<4sII", b"glTF", 2, total) + struct.pack("<I4s", len(json_bytes), b"JSON") + json_bytes + struct.pack("<I4s", len(binary), b"BIN\x00") + binary
