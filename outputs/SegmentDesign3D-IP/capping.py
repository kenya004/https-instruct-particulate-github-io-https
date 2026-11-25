"""Caps for segmentation cuts, derived from the current independent parts.

Original surface coordinates and provenance are retained. Planar projection is
used only to choose triangles, never to flatten the actual boundary vertices.
"""
from __future__ import annotations

from collections import defaultdict
from dataclasses import dataclass, replace
import io
import json

import numpy as np
import trimesh

from boundary_blending import boundary_geometry
from editing import EditablePart
from mesh_overlaps import find_face_overlaps, overlap_frame
from movement_axes import boundary_plane
from rejoining import _edge_groups


METHOD = "segmentation_cut_caps_v2"
MAX_PLANARITY = .02  # maximum point-to-plane distance / boundary bounding diagonal


@dataclass(frozen=True)
class CappedPart:
    part: EditablePart
    source_vertex_indices: np.ndarray
    source_face_indices: np.ndarray
    cap_ids: np.ndarray
    statistics: dict

    @property
    def is_cap(self):
        return self.cap_ids >= 0


@dataclass(frozen=True)
class CappingResult:
    parts: tuple[CappedPart, ...]
    statistics: dict


class _InvalidCut(ValueError):
    pass


def _boundary(faces):
    directed, _, order, starts, counts = _edge_groups(faces)
    return directed[order[starts[counts == 1]]], int(np.count_nonzero(counts > 2))


def _loops(edges):
    """Keep complete directed cycles; report open or branching cut components."""
    incident = defaultdict(list)
    for index, (a, b) in enumerate(edges):
        incident[int(a)].append(index)
        incident[int(b)].append(index)
    remaining = set(range(len(edges)))
    loops, skipped = [], []
    while remaining:
        queue, component = [min(remaining)], set()
        while queue:
            index = queue.pop()
            if index in component:
                continue
            component.add(index)
            for vertex in edges[index]:
                queue.extend(set(incident[int(vertex)]) - component)
        remaining -= component
        outgoing, incoming = defaultdict(list), defaultdict(list)
        for index in component:
            a, b = map(int, edges[index])
            outgoing[a].append(b)
            incoming[b].append(a)
        vertices = set(outgoing) | set(incoming)
        if any(len(outgoing[v]) != 1 or len(incoming[v]) != 1 for v in vertices):
            skipped.append({"reason": "切断境界が閉じていないか分岐しています。元の開口部との接続や面の向きを確認してください。",
                            "boundary_edges": len(component)})
            continue
        first, loop = min(vertices), []
        current = first
        while current not in loop:
            loop.append(current)
            current = outgoing[current][0]
        if current != first or len(loop) != len(component) or len(loop) < 3:
            skipped.append({"reason": "単純な閉じた切断境界として取り出せません。", "boundary_edges": len(component)})
            continue
        loops.append(np.asarray(loop, dtype=np.int64))
    return loops, skipped


def _plane(vertices, loop):
    points = vertices[loop]
    center, normal, _, _ = boundary_plane(np.stack([points, np.roll(points, -1, axis=0)], axis=1))
    scale = float(np.linalg.norm(np.ptp(points, axis=0)))
    if scale <= 0:
        raise _InvalidCut("断面の大きさが0です。")
    error = float(np.abs((points - center) @ normal).max() / scale)
    auxiliary = np.eye(3)[np.argmin(np.abs(normal))]
    u = np.cross(normal, auxiliary)
    u /= np.linalg.norm(u)
    return {"center": center, "normal": normal, "basis": np.array([u, np.cross(normal, u)]),
            "scale": scale, "planarity": error}


def _project(vertices, loop, frame):
    return (vertices[loop] - frame["center"]) @ frame["basis"].T / frame["scale"]


def _preserve_collinear_vertices(faces, rings, xy):
    """Earcut may drop collinear ring nodes. Split cap edges to keep every seam."""
    locations = {int(node): (ring, i) for ring in rings for i, node in enumerate(ring)}
    expected = {tuple(sorted((int(a), int(b)))) for ring in rings for a, b in zip(ring, np.roll(ring, -1))}
    while True:
        boundary, _ = _boundary(np.asarray(faces, dtype=np.int64))
        missing = next(((int(a), int(b)) for a, b in boundary if tuple(sorted((int(a), int(b)))) not in expected), None)
        if missing is None:
            return np.asarray(faces, dtype=np.int64)
        a, b = missing
        ring, start = locations[a]
        if b not in ring:
            raise _InvalidCut("三角形分割が境界の穴を保持できませんでした。")
        choices = []
        for step in (1, -1):
            path = [a]
            for distance in range(1, len(ring)):
                node = int(ring[(start + step * distance) % len(ring)])
                path.append(node)
                if node == b:
                    break
            delta = xy[b] - xy[a]
            norm = float(delta @ delta)
            path_points = np.asarray([xy[node] for node in path])
            t = (path_points - xy[a]) @ delta / max(norm, np.finfo(float).tiny)
            error = np.linalg.norm(path_points - xy[a] - t[:, None] * delta, axis=1)
            if len(path) > 2 and np.all(error < 1e-12) and np.all(np.diff(t) > 0):
                choices.append(path)
        if not choices:
            raise _InvalidCut("三角形分割が元の境界辺を保持できませんでした。")
        path = min(choices, key=len)
        for index, triangle in enumerate(faces):
            for j in range(3):
                if triangle[j] == a and triangle[(j + 1) % 3] == b:
                    other = triangle[(j + 2) % 3]
                    faces[index:index + 1] = [[p, q, other] for p, q in zip(path, path[1:])]
                    break
            else:
                continue
            break
        else:
            raise _InvalidCut("境界辺に対応する三角形がありません。")


def _triangulate(vertices, rings, frame, earcut, polygon_type, union_all):
    ids = np.concatenate(rings)
    projected = _project(vertices, ids, frame)
    offsets = np.cumsum([len(ring) for ring in rings], dtype=np.uint32)
    polygon = polygon_type(projected[:offsets[0]], [projected[a:b] for a, b in zip(offsets[:-1], offsets[1:])])
    if not polygon.is_valid or polygon.area <= 1e-14:
        raise _InvalidCut("投影した断面の輪郭が交差、接触、または退化しています。")
    triangles = ids[earcut.triangulate_float64(projected, offsets).reshape(-1, 3)]
    xy = {int(index): point for index, point in zip(ids, projected)}
    triangles = _preserve_collinear_vertices(triangles.tolist(), rings, xy)
    if not len(triangles):
        raise _InvalidCut("蓋の三角形を生成できませんでした。")
    patches = [polygon_type([xy[int(i)] for i in face]) for face in triangles]
    union = union_all(patches)
    tolerance = max(polygon.area, 1e-12) * 1e-8
    if (any(p.area <= 1e-16 for p in patches) or union.symmetric_difference(polygon).area > tolerance
            or sum(p.area for p in patches) - union.area > tolerance):
        raise _InvalidCut("蓋が断面を過不足なく覆うことを確認できませんでした。")
    boundary, ambiguous = _boundary(triangles)
    required = {(int(b), int(a)) for ring in rings for a, b in zip(ring, np.roll(ring, -1))}
    found = {tuple(map(int, edge)) for edge in boundary}
    if found == {(b, a) for a, b in required}:
        triangles = triangles[:, ::-1]
        found = {(b, a) for a, b in found}
    if ambiguous or found != required:
        raise _InvalidCut("内外の輪郭の向き、または境界辺の対応が不整合です。")
    return triangles


def _cap_regions(vertices, loops, limit, polygon_type, *, allow_nonplanar=False):
    """Group nested, nearly coplanar rings; disjoint cuts remain independent."""
    valid, skipped, failed, diagnostics = [], [], [], []
    for index, loop in enumerate(loops):
        info = {"loop_id": index, "boundary_edges": len(loop), "planarity": None,
                "exceeds_planarity_limit": False}
        diagnostics.append(info)
        try:
            frame = _plane(vertices, loop)
            info.update(planarity=frame["planarity"], exceeds_planarity_limit=frame["planarity"] > limit)
            if info["exceeds_planarity_limit"] and not allow_nonplanar:
                raise _InvalidCut(f"断面の非平面性が大きいため保留しました（{frame['planarity']:.1%}、上限{limit:.1%}）。")
            polygon = polygon_type(_project(vertices, loop, frame))
            if not polygon.is_valid or polygon.area <= 1e-14:
                raise _InvalidCut("断面を投影すると輪郭が交差、または退化します。")
            valid.append({"loop": loop, "frame": frame})
        except ValueError as error:
            skipped.append({"reason": str(error), "boundary_edges": len(loop)})
            failed.append(loop)
    # A rejected inner ring must not silently turn its enclosing annulus into
    # a disk. Conservatively withhold intersecting footprints in the same slab.
    filtered = []
    for item in valid:
        frame = item["frame"]
        xy = _project(vertices, item["loop"], frame)
        blocked = False
        for loop in failed:
            heights = (vertices[loop] - frame["center"]) @ frame["normal"] / frame["scale"]
            other = _project(vertices, loop, frame)
            if (heights.min() <= limit and heights.max() >= -limit
                    and np.all(xy.min(axis=0) <= other.max(axis=0))
                    and np.all(other.min(axis=0) <= xy.max(axis=0))):
                blocked = True
                break
        if blocked:
            skipped.append({"reason": "同じ断面内に処理できない輪郭があり、内側の穴を保護するため保留しました。",
                            "boundary_edges": len(item["loop"])})
        else:
            filtered.append(item)
    valid = filtered
    groups = list(range(len(valid)))
    invalid = set()

    def root(i):
        while groups[i] != i:
            i = groups[i]
        return i

    for i, a in enumerate(valid):
        for j in range(i):
            b = valid[j]
            fa, fb = a["frame"], b["frame"]
            tolerance = limit * max(fa["scale"], fb["scale"]) + max(fa["scale"], fb["scale"]) * 1e-10
            if allow_nonplanar:
                # Matched warped inner/outer rings can share a section even
                # though they do not lie in the plane. Use their measured
                # departures, rather than a larger global proximity threshold.
                tolerance = max(tolerance, fa["planarity"] * fa["scale"], fb["planarity"] * fb["scale"]) + 1e-10 * max(fa["scale"], fb["scale"])
            heights_a = (vertices[a["loop"]] - fa["center"]) @ fa["normal"]
            heights_b = (vertices[b["loop"]] - fa["center"]) @ fa["normal"]
            same_section = (abs(fa["normal"] @ fb["normal"]) >= np.cos(np.deg2rad(5))
                and np.abs(heights_b).max() <= tolerance
                and np.abs((vertices[a["loop"]] - fb["center"]) @ fb["normal"]).max() <= tolerance)
            if not same_section:
                # A projected nested ring might be a hole, not a second disk.
                # If its warped slab intersects this section but the planes
                # cannot be reconciled, retain both openings and report it.
                if allow_nonplanar and max(fa["planarity"], fb["planarity"]) > limit:
                    slab_tolerance = limit * max(fa["scale"], fb["scale"])
                    if heights_b.min() <= heights_a.max() + slab_tolerance and heights_b.max() >= heights_a.min() - slab_tolerance:
                        pa, pb = [polygon_type(_project(vertices, item["loop"], fa)) for item in (a, b)]
                        if pa.is_valid and pb.is_valid and (pa.contains(pb) or pb.contains(pa)):
                            invalid.update((i, j))
                continue
            pa, pb = [polygon_type(_project(vertices, item["loop"], fa)) for item in (a, b)]
            if not pa.is_valid or not pb.is_valid:
                invalid.update((i, j))
            elif pa.contains(pb) or pb.contains(pa):
                groups[root(i)] = root(j)
            elif pa.intersects(pb):
                invalid.update((i, j))
    grouped = defaultdict(list)
    for i in range(len(valid)):
        grouped[root(i)].append(i)
    regions = []
    for indices in grouped.values():
        # If one nested ring is invalid, never fill its enclosing disk instead.
        if invalid.intersection(indices):
            skipped.append({"reason": "同じ断面付近の内外輪郭を特定できないか、交差・接触・投影の退化があります。",
                            "boundary_edges": sum(len(valid[i]["loop"]) for i in indices)})
            continue
        frame = max((valid[i]["frame"] for i in indices), key=lambda f: f["scale"])
        polygons = {i: polygon_type(_project(vertices, valid[i]["loop"], frame)) for i in indices}
        if any(not p.is_valid for p in polygons.values()):
            skipped.append({"reason": "共通平面で断面を表現できません。", "boundary_edges": sum(len(valid[i]["loop"]) for i in indices)})
            continue
        parents = {i: min((j for j in indices if j != i and polygons[j].contains(polygons[i])),
                          key=lambda j: polygons[j].area, default=None) for i in indices}
        for i in indices:
            depth, parent = 0, parents[i]
            while parent is not None:
                depth += 1
                parent = parents[parent]
            if depth % 2 == 0:
                holes = [j for j in indices if parents[j] == i]
                rings = [i, *holes]
                region_frame = {**frame, "planarity": max(valid[j]["frame"]["planarity"] for j in rings)}
                regions.append(([valid[j]["loop"] for j in rings], region_frame))
    return regions, skipped, diagnostics


def cap_parts(content: bytes, manifest: dict, original, edited, *, max_planarity=MAX_PLANARITY, allow_nonplanar=False) -> CappingResult:
    """Close only original segmentation cuts on each *current* part, on CPU."""
    try:
        import mapbox_earcut as earcut
        from shapely import union_all
        from shapely.geometry import Polygon
    except ImportError as error:
        raise RuntimeError("断面閉鎖には追加ライブラリが必要です。WindowsのUI環境で python -m pip install -r requirements.txt を実行してください。") from error
    if not np.isfinite(max_planarity) or not 0 < max_planarity <= .1:
        raise ValueError("断面の非平面性の許容割合が不正です。")
    if type(allow_nonplanar) is not bool:
        raise ValueError("非平面断面の試行設定は真偽値で指定してください。")
    _, local_sources = boundary_geometry(content, manifest, original)
    records = {record["part_id"]: record for record in manifest["parts"]}
    current = {part.part_id: part for part in edited}
    if set(current) != set(records) or len(current) != len(edited):
        raise ValueError("断面閉鎖の対象パーツが一致しません。")
    with np.load(io.BytesIO(content), allow_pickle=False) as data:
        _, canonical = np.unique(data["vertices"], axis=0, return_inverse=True)
        directed, incident, order, starts, counts = _edge_groups(canonical[data["faces"]])
        labels = data["face_part_ids"]
        cuts, ambiguous, original_open = defaultdict(set), defaultdict(int), set()
        for start, count in zip(starts, counts):
            entries = order[start:start + count]
            edge = tuple(sorted(map(int, directed[entries[0]])))
            if count == 1:
                original_open.add(edge)
            owners = set(map(int, labels[incident[entries]]))
            if len(owners) < 2:
                continue
            if count != 2:
                for part_id in owners:
                    ambiguous[part_id] += 1
                continue
            for part_id in owners:
                cuts[part_id].add(edge)
        provenance = {}
        for part in original:
            prefix = records[part.part_id].get("npz_prefix", f"part_{part.part_id:04d}")
            provenance[part.part_id] = (data[f"{prefix}_source_vertex_indices"].copy(), data[f"{prefix}_source_face_indices"].copy())
    result, next_cap = [], 0
    for before in original:
        part = current[before.part_id]
        if (part.vertices.shape != before.vertices.shape or not np.isfinite(part.vertices).all()
                or not np.array_equal(part.faces, before.faces)):
            raise ValueError("断面閉鎖前にパーツの頂点数や面の構成が変更されています。")
        # Weld only exact copies from the same source point, in this derived mesh.
        # Retain the vertex array itself, so source correspondence is still direct.
        representatives, keys = [], {}
        for index, (source, point) in enumerate(zip(local_sources[part.part_id], part.vertices)):
            key = (int(source), *point)
            representatives.append(keys.setdefault(key, index))
        base = np.asarray(representatives, dtype=np.int64)[part.faces]
        boundary, nonmanifold = _boundary(base)
        boundary_sources = [tuple(sorted(map(int, local_sources[part.part_id][edge]))) for edge in boundary]
        is_cut = np.array([edge in cuts[part.part_id] for edge in boundary_sources], dtype=bool)
        original_open_count = sum(edge in original_open for edge in boundary_sources)
        loops, skipped = _loops(boundary[is_cut])
        regions, invalid, loop_planarity = _cap_regions(part.vertices, loops, max_planarity, Polygon, allow_nonplanar=allow_nonplanar)
        skipped.extend(invalid)
        added, cap_ids, closed = [], [], []
        for rings, frame in regions:
            try:
                triangles = _triangulate(part.vertices, rings, frame, earcut, Polygon, union_all)
            except (ValueError, RuntimeError) as error:
                skipped.append({"reason": str(error), "boundary_edges": sum(map(len, rings))})
                continue
            added.extend(triangles.tolist())
            cap_ids.extend([next_cap] * len(triangles))
            closed.append({"cap_id": next_cap, "loops": len(rings), "holes": len(rings) - 1,
                           "boundary_edges": sum(map(len, rings)), "added_faces": len(triangles),
                           "planarity": frame["planarity"], "nonplanar": frame["planarity"] > max_planarity})
            next_cap += 1
        faces = np.vstack([base, np.asarray(added, dtype=np.int64).reshape(-1, 3)])
        updated = replace(part, vertices=part.vertices.copy(), faces=faces)
        mesh = trimesh.Trimesh(vertices=updated.vertices, faces=faces, process=False)
        source_vertices, source_faces = provenance[part.part_id]
        flags = np.r_[np.full(len(base), -1, dtype=np.int64), np.asarray(cap_ids, dtype=np.int64)]
        cap_pairs = np.zeros((0, 2), dtype=np.int64)
        if added:
            report = find_face_overlaps(updated.vertices, faces, frame=overlap_frame(before.vertices))
            pairs = np.asarray(report["pairs"], dtype=np.int64).reshape(-1, 2)
            cap_pairs = pairs[np.any(pairs >= len(base), axis=1)]
        remaining, _ = _boundary(faces)
        remaining_cut = sum(tuple(sorted(map(int, local_sources[part.part_id][edge]))) in cuts[part.part_id] for edge in remaining)
        statistics = {"part_id": part.part_id, "name": part.name, "closed_sections": len(closed), "closed_loops": sum(c["loops"] for c in closed),
            "sections": closed, "skipped": skipped, "loop_planarity": loop_planarity,
            "nonplanar_sections": sum(c["nonplanar"] for c in closed), "cut_boundary_edges_before": int(is_cut.sum()),
            "cut_boundary_edges_after": int(remaining_cut), "original_open_edges": original_open_count,
            "other_boundary_edges": int((~is_cut).sum()) - original_open_count,
            "remaining_boundary_edges": len(remaining), "ambiguous_source_edges": ambiguous[part.part_id],
            "nonmanifold_edges": nonmanifold, "added_faces": len(added),
            "welded_seam_vertices": len(representatives) - len(set(representatives)),
            "is_watertight": bool(mesh.is_watertight) if len(faces) else False,
            "is_winding_consistent": bool(mesh.is_winding_consistent),
            "cap_overlap_pairs": cap_pairs.tolist(), "cap_overlap_face_ids": np.unique(cap_pairs).tolist(),
            "cap_overlap_pair_count": len(cap_pairs)}
        result.append(CappedPart(updated, source_vertices, np.r_[source_faces, np.full(len(added), -1, dtype=np.int64)], flags, statistics))
    statistics = {"method": METHOD, "max_planarity": max_planarity, "allow_nonplanar": allow_nonplanar,
                  "nonplanar_sections": sum(p.statistics["nonplanar_sections"] for p in result),
                  "closed_sections": sum(p.statistics["closed_sections"] for p in result),
                  "closed_loops": sum(p.statistics["closed_loops"] for p in result),
                  "skipped_sections": sum(len(p.statistics["skipped"]) for p in result),
                  "added_faces": sum(p.statistics["added_faces"] for p in result),
                  "parts": [p.statistics for p in result]}
    return CappingResult(tuple(result), statistics)


def capped_payloads(result, *, part_id=None, highlight_caps=False, show_overlaps=True):
    payloads = []
    for record in result.parts:
        part = record.part
        if not len(part.faces) or (part_id is not None and part.part_id != part_id):
            continue
        marked = set(record.statistics["cap_overlap_face_ids"]) if show_overlaps else set()
        colors = ["#e12b35" if i in marked else "#62b6cb" if highlight_caps and cap else part.color for i, cap in enumerate(record.is_cap)]
        payloads.append({"name": part.name, "part_id": part.part_id, "vertices": part.vertices.tolist(),
                         "faces": np.column_stack([np.full(len(part.faces), 3), part.faces]).reshape(-1).tolist(),
                         "color": part.color, "face_colors": colors})
    return payloads


def _export_metadata(result, source_key, editing_metadata):
    return {"format_version": 1, "method": METHOD, "editor_source_key": source_key, "editing": editing_metadata,
            "statistics": result.statistics, "parts": [{"part_id": r.part.part_id, "name": r.part.name,
                "color": r.part.color, "npz_prefix": f"part_{r.part.part_id:04d}",
                "geometry_name": r.part.geometry_name, "node_name": r.part.node_name} for r in result.parts]}


def export_capped_glb(result, *, source_key, editing_metadata):
    scene = trimesh.Scene()
    scene.metadata.update(capping=_export_metadata(result, source_key, editing_metadata))
    for record in result.parts:
        part = record.part
        if not len(part.faces):
            continue
        mesh = trimesh.Trimesh(vertices=part.vertices.copy(), faces=part.faces.copy(), process=False)
        mesh.visual.face_colors = trimesh.visual.color.hex_to_rgba(part.color)
        mesh.metadata.update(part_id=part.part_id, part_name=part.name, cap_face_indices=np.flatnonzero(record.is_cap).tolist())
        scene.add_geometry(mesh, geom_name=part.geometry_name, node_name=part.node_name, transform=np.eye(4))
    return scene.export(file_type="glb")


def export_capped_npz(result, *, source_key, editing_metadata):
    arrays = {"metadata_json": np.array(json.dumps(_export_metadata(result, source_key, editing_metadata), ensure_ascii=False))}
    for record in result.parts:
        part = record.part
        prefix = f"part_{part.part_id:04d}"
        arrays.update({f"{prefix}_vertices": part.vertices, f"{prefix}_faces": part.faces,
            f"{prefix}_source_vertex_indices": record.source_vertex_indices,
            f"{prefix}_source_face_indices": record.source_face_indices,
            f"{prefix}_face_part_ids": np.full(len(part.faces), part.part_id, dtype=np.int32),
            f"{prefix}_face_colors": np.tile(trimesh.visual.color.hex_to_rgba(part.color), (len(part.faces), 1)),
            f"{prefix}_is_cap": record.is_cap, f"{prefix}_cap_ids": record.cap_ids})
    buffer = io.BytesIO()
    np.savez_compressed(buffer, **arrays)
    return buffer.getvalue()
