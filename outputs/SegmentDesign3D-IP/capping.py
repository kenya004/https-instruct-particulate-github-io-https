"""Caps for segmentation cuts, derived from the current independent parts.

Original surface coordinates and provenance are retained. Planar projection is
used for triangulation and diagnostics, never to flatten boundary vertices.
"""
from __future__ import annotations

from collections import defaultdict
from copy import deepcopy
from dataclasses import dataclass, replace
import hashlib
import io
import json

import numpy as np
import trimesh

from boundary_blending import boundary_geometry
from editing import EditablePart
from mesh_overlaps import find_face_overlaps, overlap_frame
from movement_axes import boundary_plane
from rejoining import _edge_groups


METHOD = "segmentation_cut_caps_v5"
MAX_PLANARITY = .02  # maximum point-to-plane distance / boundary bounding diagonal
TRIANGULATIONS = {"point_only": "内点判定のみ（試行）", "earcut": "Earcut（従来）",
                  "center_fan": "中心から放射状に生成"}


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

    @property
    def is_cap_center(self):
        if "cap_center_vertex_ids" in self.statistics:
            centers = np.zeros(len(self.part.vertices), dtype=bool)
            centers[np.asarray(self.statistics["cap_center_vertex_ids"], dtype=np.int64)] = True
            return centers
        return self.source_vertex_indices < 0

    @property
    def is_extension(self):
        extensions = np.zeros(len(self.part.faces), dtype=bool)
        extensions[np.asarray(self.statistics.get("extension_face_ids", []), dtype=np.int64)] = True
        return extensions


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


def _triangulate_point_only(vertices, rings, frame):
    """Experimental boundary-order clipping: only strict 2D interior blocks a candidate.

    Convexity and projected/3D triangle area never decide acceptance. Boundary
    edges still need to close consistently; triangle quality is diagnosed later.
    """
    if len(rings) != 1:
        raise _InvalidCut("内点判定のみの試行は穴のない単一輪郭が対象です。中空断面はEarcut（従来）を選んでください。")
    loop = np.asarray(rings[0], dtype=np.int64)
    xy = _project(vertices, loop, frame)
    remaining = list(range(len(loop)))
    triangles, sample = [], []
    cursor, stalled, tested, rejected = 1, 0, 0, 0
    while len(remaining) >= 3:
        cursor %= len(remaining)
        a, b, c = (remaining[(cursor + delta) % len(remaining)] for delta in (-1, 0, 1))
        other = [index for index in remaining if index not in (a, b, c)]
        triangle = xy[[a, b, c]]
        edges = np.roll(triangle, -1, axis=0) - triangle
        relative = xy[other, None, :] - triangle[None, :, :]
        sides = edges[None, :, 0] * relative[:, :, 1] - edges[None, :, 1] * relative[:, :, 0]
        tolerance = 1e-12 * np.linalg.norm(edges, axis=1)
        # Edge/corner coincidence is not *strict* interior. A collapsed 2D
        # triangle has no strict interior, and is therefore allowed here.
        inside = np.all(sides > tolerance, axis=1) | np.all(sides < -tolerance, axis=1)
        blocked = bool(np.any(inside))
        tested += 1
        rejected += int(blocked)
        if len(sample) < 100:
            sample.append({"vertices": loop[[a, b, c]].tolist(), "accepted": not blocked,
                           "interior_vertices": loop[np.asarray(other, dtype=int)[inside]].tolist()})
        if blocked:
            stalled += 1
            if stalled >= len(remaining):
                raise _InvalidCut("残る輪郭を一周しましたが、他の頂点を内部に含まない候補がありません。途中の蓋は追加せず保留しました。")
            cursor += 1
            continue
        # Reverse the existing surface's boundary direction for the cap.
        triangles.append([int(loop[a]), int(loop[c]), int(loop[b])])
        remaining.pop(cursor)
        stalled = 0
        # The old next vertex is now at the same list position. Start there.
    triangles = np.asarray(triangles, dtype=np.int64)
    boundary, ambiguous = _boundary(triangles)
    required = {(int(b), int(a)) for a, b in zip(loop, np.roll(loop, -1))}
    if ambiguous or {tuple(map(int, edge)) for edge in boundary} != required:
        raise _InvalidCut("試行した蓋の境界辺と元の輪郭が一致しません。")
    return triangles, {"method": "projected_point_only_v1", "tested_candidates": tested,
        "rejected_interior": rejected, "accepted_candidates": len(triangles),
        "convexity_check": False, "triangle_area_check": False, "strict_interior": True,
        "order": "first ABC, then advance to the next surviving middle vertex",
        "candidate_sample": sample, "candidate_sample_truncated": tested > len(sample)}


def _triangulate_center_fan(vertices, rings, frame, center_index, polygon_type, union_all):
    """Keep a complete fan for comparison, including concave-footprint problems."""
    if len(rings) != 1:
        raise _InvalidCut("中心からの放射状生成は穴のない単一輪郭が対象です。中空断面はEarcut（従来）を選んでください。")
    loop = np.asarray(rings[0], dtype=np.int64)
    center = frame["center"].copy()
    # Reverse every existing boundary edge, sharing one new vertex per cut.
    triangles = np.column_stack([np.full(len(loop), center_index, dtype=np.int64), np.roll(loop, -1), loop])
    xy = _project(vertices, loop, frame)
    polygon = polygon_type(xy)
    patches = [polygon_type([np.zeros(2), a, b]) for a, b in zip(xy, np.roll(xy, -1, axis=0))]
    covered = union_all([patch for patch in patches if patch.area > 0])
    outside = float(covered.difference(polygon).area)
    uncovered = float(polygon.difference(covered).area)
    overlap = max(0.0, float(sum(patch.area for patch in patches) - covered.area))
    tolerance = max(polygon.area, 1e-12) * 1e-8
    return triangles, center, {"method": "boundary_center_fan_v1", "center_vertex": center_index,
        "center": center.tolist(), "center_method": "edge_length_weighted_boundary_midpoints",
        "start_independent": True, "projected_coverage_valid": max(outside, uncovered, overlap) <= tolerance,
        "projected_outside_area": outside, "projected_uncovered_area": uncovered,
        "projected_overlap_area": overlap, "projected_area_tolerance": tolerance}


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


def _source_cut_data(content, manifest, original):
    """Immutable source topology shared by the start controls and cap generation."""
    _, local_sources = boundary_geometry(content, manifest, original)
    records = {record["part_id"]: record for record in manifest["parts"]}
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
    return local_sources, cuts, ambiguous, original_open, provenance


def _seam_faces(part, sources):
    # Only exact copies of a common source point share an index. Keep positions.
    representatives, keys = [], {}
    for index, (source, point) in enumerate(zip(sources, part.vertices)):
        representatives.append(keys.setdefault((int(source), *point), index))
    return np.asarray(representatives, dtype=np.int64), np.asarray(representatives, dtype=np.int64)[part.faces]


def _loop_key(part_id, source_ids):
    # A cyclic shift, reversed traversal, or a change of scene pose keeps the ID.
    edges = np.sort(np.column_stack([source_ids, np.roll(source_ids, -1)]), axis=1)
    edges = edges[np.lexsort((edges[:, 1], edges[:, 0]))]
    return f"{part_id}:" + hashlib.sha256(np.asarray(edges, dtype="<i8").tobytes()).hexdigest()[:20]


def _cut_loop_catalog(original, local_sources, cuts):
    catalog = []
    for part in original:
        sources = local_sources[part.part_id]
        _, faces = _seam_faces(part, sources)
        boundary, _ = _boundary(faces)
        selected = np.array([tuple(sorted(map(int, sources[edge]))) in cuts[part.part_id] for edge in boundary], dtype=bool)
        loops, _ = _loops(boundary[selected])
        for index, loop in enumerate(loops):
            catalog.append({"loop_key": _loop_key(part.part_id, sources[loop]), "part_id": part.part_id,
                            "name": part.name, "loop_id": index, "vertices": loop.tolist(), "vertex_count": len(loop)})
    return catalog


def cut_loop_catalog(content, manifest, original):
    """List closed cuts before projection, so even a currently skipped cut can be selected."""
    local_sources, cuts, _, _, _ = _source_cut_data(content, manifest, original)
    return _cut_loop_catalog(original, local_sources, cuts)


def _source_ring_edges(source_ids):
    return tuple(sorted(tuple(sorted((int(a), int(b))))
                        for a, b in zip(source_ids, np.roll(source_ids, -1))))


def _cap_geometry_statistics(part, before, sources, cut_edges, base_count, check_intersections):
    """Also used after replacing a cap, so face diagnostics describe the output."""
    faces = part.faces
    mesh = trimesh.Trimesh(vertices=part.vertices, faces=faces, process=False)
    cap_triangles = part.vertices[faces[base_count:]]
    frame = overlap_frame(before.vertices)
    doubled_areas = np.linalg.norm(np.cross((cap_triangles[:, 1] - cap_triangles[:, 0]) / frame["scale"],
                                            (cap_triangles[:, 2] - cap_triangles[:, 0]) / frame["scale"]), axis=1)
    degenerate = (np.flatnonzero(doubled_areas <= 1e-18) + base_count).tolist()
    cap_pairs = np.zeros((0, 2), dtype=np.int64)
    if check_intersections and len(cap_triangles):
        report = find_face_overlaps(part.vertices, faces, frame=frame)
        pairs = np.asarray(report["pairs"], dtype=np.int64).reshape(-1, 2)
        cap_pairs = pairs[np.any(pairs >= base_count, axis=1)]
    remaining, _ = _boundary(faces)
    remaining_cut = sum(tuple(sorted(map(int, sources[edge]))) in cut_edges
                        for edge in remaining if np.all(edge < len(before.vertices)))
    return {"cut_boundary_edges_after": int(remaining_cut), "remaining_boundary_edges": len(remaining),
            "degenerate_cap_faces": len(degenerate), "degenerate_cap_face_ids": degenerate,
            "is_watertight": bool(mesh.is_watertight) if len(faces) else False,
            "is_winding_consistent": bool(mesh.is_winding_consistent),
            "intersections_checked": check_intersections,
            "cap_overlap_pairs": cap_pairs.tolist(), "cap_overlap_face_ids": np.unique(cap_pairs).tolist(),
            "cap_overlap_pair_count": len(cap_pairs)}


def _mapped_triangulation(info, vertex_map, vertices):
    info = deepcopy(info)
    if "center_vertex" in info:
        info["center_vertex"] = vertex_map[info["center_vertex"]]
        info["center"] = vertices[info["center_vertex"]].tolist()
    for candidate in info.get("candidate_sample", []):
        for field in ("vertices", "interior_vertices"):
            candidate[field] = [vertex_map[node] for node in candidate[field]]
    return info


def _reuse_shared_caps(records, original, local_sources, cuts, current_loop_owners, tolerance, check_intersections):
    """Reuse a whole patch only for an unambiguous, oppositely directed source cut.

    Coordinates decide whether an immutable pairing is still in contact; they
    never establish a pairing or weld vertices. Each ring must have exactly two
    owners in both the rest mesh and the current cuts, including skipped cuts.
    """
    rest_loop_owners = defaultdict(list)
    for item in _cut_loop_catalog(original, local_sources, cuts):
        part_id = item["part_id"]
        key = _source_ring_edges(local_sources[part_id][item["vertices"]])
        rest_loop_owners[key].append(part_id)
    groups = defaultdict(list)
    for index, record in enumerate(records):
        sources = local_sources[record.part.part_id]
        for section in record.statistics["sections"]:
            rings = [np.asarray(ring, dtype=np.int64) for ring in section["boundary_loops"]]
            nodes = np.concatenate(rings)
            # A repeated canonical node would make the correspondence ambiguous.
            if len(set(map(int, sources[nodes]))) != len(nodes):
                continue
            ring_keys = [_source_ring_edges(sources[ring]) for ring in rings]
            key = (ring_keys[0], tuple(sorted(ring_keys[1:])))
            directed = {(int(sources[a]), int(sources[b])) for ring in rings
                        for a, b in zip(ring, np.roll(ring, -1))}
            groups[key].append({"index": index, "section": section, "ring_keys": ring_keys,
                                "nodes": dict(zip(map(int, sources[nodes]), map(int, nodes))),
                                "directed": directed})
    replacements, vertices = defaultdict(dict), {}
    shared_count = 0
    for key in sorted(groups):
        entries = groups[key]
        if len(entries) != 2:
            continue
        part_ids = sorted(records[entry["index"]].part.part_id for entry in entries)
        if (part_ids[0] == part_ids[1]
                or any(sorted(rest_loop_owners[ring]) != part_ids
                       or sorted(current_loop_owners[ring]) != part_ids for ring in entries[0]["ring_keys"])):
            continue
        # A requested nonzero start wins over the default. If both are changed,
        # the smaller part ID wins, independently of input/dictionary order.
        source, target = sorted(entries, key=lambda entry: (
            not any(start["start_offset"] for start in entry["section"]["start_vertices"]),
            records[entry["index"]].part.part_id))
        if target["directed"] != {(b, a) for a, b in source["directed"]}:
            continue
        source_record, target_record = (records[entry["index"]] for entry in (source, target))
        source_nodes = sorted(source["nodes"])
        source_ids = [source["nodes"][node] for node in source_nodes]
        target_ids = [target["nodes"][node] for node in source_nodes]
        delta = source_record.part.vertices[source_ids] - target_record.part.vertices[target_ids]
        if np.any(np.linalg.norm(delta, axis=1) > tolerance):
            continue
        source_section, target_section = source["section"], target["section"]
        vertex_map = dict(zip(source_ids, target_ids))
        source_center = source_section["triangulation"].get("center_vertex")
        target_center = target_section["triangulation"].get("center_vertex")
        if (source_center is None) != (target_center is None):
            continue
        if source_center is not None:
            vertex_map[source_center] = target_center
        patch = source_record.part.faces[source_record.cap_ids == source_section["cap_id"]]
        if any(int(node) not in vertex_map for node in np.unique(patch)):
            continue
        shared_patch = np.array([[vertex_map[int(node)] for node in face[::-1]] for face in patch], dtype=np.int64)
        boundary, nonmanifold = _boundary(shared_patch)
        required = {(int(b), int(a)) for ring in target_section["boundary_loops"]
                    for a, b in zip(ring, np.roll(ring, -1))}
        if nonmanifold or set(map(tuple, boundary)) != required:
            continue
        target_index = target["index"]
        if source_center is not None:
            if target_index not in vertices:
                vertices[target_index] = target_record.part.vertices.copy()
            vertices[target_index][target_center] = source_record.part.vertices[source_center]
        target_vertices = vertices.get(target_index, target_record.part.vertices)
        target_section["triangulation"] = _mapped_triangulation(source_section["triangulation"], vertex_map, target_vertices)
        target_section["added_faces"] = len(shared_patch)
        replacements[target_index][target_section["cap_id"]] = shared_patch
        shared_source = {"part_id": source_record.part.part_id, "cap_id": source_section["cap_id"],
                         "start_vertices": source_section["start_vertices"]}
        for entry, peer in ((source, target), (target, source)):
            entry["section"].update(shared_cap=True, shared_cap_id=shared_count,
                paired_part_id=records[peer["index"]].part.part_id, paired_cap_id=peer["section"]["cap_id"],
                shared_cap_source=deepcopy(shared_source), shared_cap_reversed=entry is target)
        shared_count += 1
    before_by_id = {part.part_id: part for part in original}
    for index, record in enumerate(records):
        stats = record.statistics
        stats["shared_caps_count"] = sum(section["shared_cap"] for section in stats["sections"])
        if index not in replacements:
            continue
        base_count = int(np.count_nonzero(~record.is_cap))
        patches = [replacements[index].get(section["cap_id"], record.part.faces[record.cap_ids == section["cap_id"]])
                   for section in stats["sections"]]
        added = np.vstack(patches)
        flags = np.concatenate([np.full(len(patch), section["cap_id"], dtype=np.int64)
                                for section, patch in zip(stats["sections"], patches)])
        part = replace(record.part, vertices=vertices.get(index, record.part.vertices),
                       faces=np.vstack([record.part.faces[:base_count], added]))
        stats.update(added_faces=len(added), added_vertices=int(np.count_nonzero(record.is_cap_center)),
                     projected_problem_sections=sum(not section["triangulation"].get("projected_coverage_valid", True)
                                                    for section in stats["sections"]))
        stats.update(_cap_geometry_statistics(part, before_by_id[part.part_id], local_sources[part.part_id],
                                             cuts[part.part_id], base_count, check_intersections))
        records[index] = replace(record, part=part,
            source_face_indices=np.r_[record.source_face_indices[:base_count], np.full(len(added), -1, dtype=np.int64)],
            cap_ids=np.r_[record.cap_ids[:base_count], flags])
    return shared_count


def cap_parts(content: bytes, manifest: dict, original, edited, *, max_planarity=MAX_PLANARITY,
              allow_nonplanar=False, triangulation="earcut", start_offsets=None, shared_caps=False,
              check_intersections=True) -> CappingResult:
    """Close original cuts on current parts; optionally reuse coincident paired caps.

    Successful sections expose ordered local ``boundary_loops``. Shared sections
    additionally identify their peer, canonical ``source_boundary_edges``, and
    the actual ``shared_cap_source`` (including its requested start positions).
    ``shared_caps_count`` counts distinct patches globally and shared sections
    per part. The coincidence tolerance is 1e-10 times the overall rest extent.
    Disabling ``check_intersections`` leaves overlap arrays empty and marks
    ``intersections_checked`` false; other geometry diagnostics still run.
    """
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
    if type(shared_caps) is not bool:
        raise ValueError("共有する蓋の設定は真偽値で指定してください。")
    if type(check_intersections) is not bool:
        raise ValueError("面の交差確認の設定は真偽値で指定してください。")
    if triangulation not in TRIANGULATIONS:
        raise ValueError("断面の三角形分割方式が不正です。")
    offsets = {} if start_offsets is None else start_offsets.copy() if isinstance(start_offsets, dict) else None
    if offsets is None or any(not isinstance(key, str) or type(value) is not int for key, value in offsets.items()):
        raise ValueError("開始頂点の設定は断面IDと整数の対応で指定してください。")
    local_sources, cuts, ambiguous, original_open, provenance = _source_cut_data(content, manifest, original)
    if offsets:
        known = {item["loop_key"]: item for item in _cut_loop_catalog(original, local_sources, cuts)}
        if set(offsets) - set(known):
            raise ValueError("開始頂点の対象断面が元のモデルにありません。")
        offsets = {key: value % known[key]["vertex_count"] for key, value in offsets.items() if value % known[key]["vertex_count"]}
    if triangulation == "center_fan":
        offsets = {}  # The complete fan is independent of boundary traversal start.
    current = {part.part_id: part for part in edited}
    if set(current) != {part.part_id for part in original} or len(current) != len(edited):
        raise ValueError("断面閉鎖の対象パーツが一致しません。")
    seen_starts = set()
    current_loop_owners = defaultdict(list)
    result, next_cap = [], 0
    for before in original:
        part = current[before.part_id]
        if (part.vertices.shape != before.vertices.shape or not np.isfinite(part.vertices).all()
                or not np.array_equal(part.faces, before.faces)):
            raise ValueError("断面閉鎖前にパーツの頂点数や面の構成が変更されています。")
        representatives, base = _seam_faces(part, local_sources[part.part_id])
        boundary, nonmanifold = _boundary(base)
        boundary_sources = [tuple(sorted(map(int, local_sources[part.part_id][edge]))) for edge in boundary]
        is_cut = np.array([edge in cuts[part.part_id] for edge in boundary_sources], dtype=bool)
        original_open_count = sum(edge in original_open for edge in boundary_sources)
        loops, skipped = _loops(boundary[is_cut])
        if shared_caps:
            for loop in loops:
                current_loop_owners[_source_ring_edges(local_sources[part.part_id][loop])].append(part.part_id)
        regions, invalid, loop_planarity = _cap_regions(part.vertices, loops, max_planarity, Polygon, allow_nonplanar=allow_nonplanar)
        skipped.extend(invalid)
        starts_by_key = {}
        for info, loop in zip(loop_planarity, loops):
            loop_key = _loop_key(part.part_id, local_sources[part.part_id][loop])
            seen_starts.add(loop_key)
            offset = offsets.get(loop_key, 0) % len(loop)
            shifted = np.roll(loop, -offset)
            start_info = {"loop_key": loop_key, "start_offset": offset, "start_vertex": int(shifted[0]),
                          "vertex_count": len(loop), "first_candidate": shifted[:3].tolist()}
            starts_by_key[loop_key] = start_info
            info.update(start_info)
        added, cap_ids, closed, centers = [], [], [], []
        for rings, frame in regions:
            section_starts = [starts_by_key[_loop_key(part.part_id, local_sources[part.part_id][ring])] for ring in rings]
            shifted_rings = [np.roll(ring, -info["start_offset"]) for ring, info in zip(rings, section_starts)]
            try:
                if triangulation == "point_only":
                    triangles, triangle_info = _triangulate_point_only(part.vertices, shifted_rings, frame)
                elif triangulation == "center_fan":
                    triangles, center, triangle_info = _triangulate_center_fan(
                        part.vertices, rings, frame, len(part.vertices) + len(centers), Polygon, union_all)
                else:
                    triangles = _triangulate(part.vertices, shifted_rings, frame, earcut, Polygon, union_all)
                    triangle_info = {"method": "earcut"}
            except (ValueError, RuntimeError) as error:
                skipped.append({"reason": str(error), "boundary_edges": sum(map(len, rings)), "start_vertices": section_starts})
                continue
            if triangulation == "center_fan":
                centers.append(center)
            added.extend(triangles.tolist())
            cap_ids.extend([next_cap] * len(triangles))
            closed.append({"cap_id": next_cap, "loops": len(rings), "holes": len(rings) - 1,
                           "boundary_loops": [ring.tolist() for ring in shifted_rings],
                           "source_boundary_edges": [list(edge) for edge in sorted(
                               edge for ring in rings for edge in _source_ring_edges(local_sources[part.part_id][ring]))],
                           "shared_cap": False,
                           "boundary_edges": sum(map(len, rings)), "added_faces": len(triangles),
                           "added_vertices": int(triangulation == "center_fan"),
                           "planarity": frame["planarity"], "nonplanar": frame["planarity"] > max_planarity,
                           "triangulation": triangle_info, "start_vertices": section_starts})
            next_cap += 1
        faces = np.vstack([base, np.asarray(added, dtype=np.int64).reshape(-1, 3)])
        vertices = np.vstack([part.vertices, np.asarray(centers, dtype=float).reshape(-1, 3)])
        updated = replace(part, vertices=vertices, faces=faces)
        source_vertices, source_faces = provenance[part.part_id]
        if centers:
            source_vertices = np.r_[source_vertices.astype(np.int64), np.full(len(centers), -1, dtype=np.int64)]
        flags = np.r_[np.full(len(base), -1, dtype=np.int64), np.asarray(cap_ids, dtype=np.int64)]
        statistics = {"part_id": part.part_id, "name": part.name, "closed_sections": len(closed), "closed_loops": sum(c["loops"] for c in closed),
            "sections": closed, "skipped": skipped, "loop_planarity": loop_planarity,
            "nonplanar_sections": sum(c["nonplanar"] for c in closed), "cut_boundary_edges_before": int(is_cut.sum()),
            "original_open_edges": original_open_count,
            "other_boundary_edges": int((~is_cut).sum()) - original_open_count,
            "ambiguous_source_edges": ambiguous[part.part_id],
            "nonmanifold_edges": nonmanifold, "added_faces": len(added), "added_vertices": len(centers),
            "cap_center_vertex_ids": list(range(len(part.vertices), len(vertices))),
            "projected_problem_sections": sum(not c["triangulation"].get("projected_coverage_valid", True) for c in closed),
            "shared_caps_count": 0,
            "welded_seam_vertices": len(representatives) - len(set(representatives)),
            **_cap_geometry_statistics(updated, before, local_sources[part.part_id], cuts[part.part_id], len(base), check_intersections)}
        result.append(CappedPart(updated, source_vertices, np.r_[source_faces, np.full(len(added), -1, dtype=np.int64)], flags, statistics))
    if set(offsets) - seen_starts:
        raise ValueError("開始頂点の対象断面を現在の編集形状で特定できません。境界のつながりを確認してください。")
    shared_count = 0
    rest_vertices = np.vstack([part.vertices for part in original])
    shared_tolerance = overlap_frame(rest_vertices)["scale"] * 1e-10
    if shared_caps:
        shared_count = _reuse_shared_caps(result, original, local_sources, cuts, current_loop_owners, shared_tolerance, check_intersections)
    statistics = {"method": METHOD, "max_planarity": max_planarity, "allow_nonplanar": allow_nonplanar, "triangulation": triangulation,
                  "start_offsets": offsets,
                  "shared_caps": shared_caps, "shared_caps_count": shared_count, "shared_cap_tolerance": shared_tolerance,
                  "check_intersections": check_intersections,
                  "added_vertices": sum(p.statistics["added_vertices"] for p in result),
                  "projected_problem_sections": sum(p.statistics["projected_problem_sections"] for p in result),
                  "degenerate_cap_faces": sum(p.statistics["degenerate_cap_faces"] for p in result),
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
    return {"format_version": 2, "method": METHOD, "editor_source_key": source_key, "editing": editing_metadata,
            "generated_vertex_source_index": -1,
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
        mesh.metadata.update(part_id=part.part_id, part_name=part.name, cap_face_indices=np.flatnonzero(record.is_cap).tolist(),
                             cap_center_vertex_indices=np.flatnonzero(record.is_cap_center).tolist(),
                             extension_face_indices=np.flatnonzero(record.is_extension).tolist())
        scene.add_geometry(mesh, geom_name=part.geometry_name, node_name=part.node_name, transform=np.eye(4))
    return scene.export(file_type="glb")


def export_capped_npz(result, *, source_key, editing_metadata):
    arrays = {"metadata_json": np.array(json.dumps(_export_metadata(result, source_key, editing_metadata), ensure_ascii=False))}
    for record in result.parts:
        part = record.part
        prefix = f"part_{part.part_id:04d}"
        arrays.update({f"{prefix}_vertices": part.vertices, f"{prefix}_faces": part.faces,
            f"{prefix}_source_vertex_indices": record.source_vertex_indices,
            f"{prefix}_is_cap_center": record.is_cap_center,
            f"{prefix}_source_face_indices": record.source_face_indices,
            f"{prefix}_face_part_ids": np.full(len(part.faces), part.part_id, dtype=np.int32),
            f"{prefix}_face_colors": np.tile(trimesh.visual.color.hex_to_rgba(part.color), (len(part.faces), 1)),
            f"{prefix}_is_cap": record.is_cap, f"{prefix}_cap_ids": record.cap_ids,
            f"{prefix}_is_extension": record.is_extension})
    buffer = io.BytesIO()
    np.savez_compressed(buffer, **arrays)
    return buffer.getvalue()
