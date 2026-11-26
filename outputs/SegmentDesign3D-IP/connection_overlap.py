"""Closed connection collars, generated explicitly after independent movement."""
from __future__ import annotations

from dataclasses import dataclass, replace
import copy
import hashlib

import numpy as np
import trimesh

from capping import CappedPart, CappingResult, _plane, _source_cut_data, cap_parts
from mesh_overlaps import _intersecting_pairs, _plane_interval, _strict_inside, find_face_overlaps, overlap_frame


METHOD = "closed_connection_overlap_v3"
DEPTH_RATIO = .01
MAX_EXTENSION_RATIO = .05


class ConnectionLimit(ValueError):
    pass


@dataclass
class ConnectionContext:
    base: CappingResult
    regions: list[dict]
    original_counts: dict[int, int]
    depth_ratio: float
    max_extension_ratio: float | None
    frame: dict


def _edges(loops, sources):
    return frozenset(tuple(sorted((int(sources[a]), int(sources[b]))))
                     for loop in loops for a, b in zip(loop, np.roll(loop, -1)))


def _roles(plan):
    roles = {frozenset((a.parent_id, a.child_id)): (a.parent_id, a.child_id) for a in plan.attachments}
    depth = {root: 0 for root in plan.roots}
    for item in plan.attachments:
        depth[item.child_id] = depth[item.parent_id] + 1
    for connection in plan.connections:
        pair = frozenset((connection.part_a, connection.part_b))
        if pair not in roles:
            parent, child = sorted(pair, key=lambda p: (depth.get(p, 0), p))
            roles[pair] = (parent, child)
    return roles


def prepare_connections(content, manifest, original, baseline, plan, *, triangulation="center_fan",
                        allow_nonplanar=True, depth_ratio=DEPTH_RATIO, max_extension_ratio=MAX_EXTENSION_RATIO):
    """Compatibility helper; the UI closes parts and creates connections separately."""
    closed = cap_parts(content, manifest, original, baseline, triangulation=triangulation,
                       allow_nonplanar=allow_nonplanar, shared_caps=True, check_intersections=False)
    return connections_from_closed(content, manifest, original, closed, plan, depth_ratio=depth_ratio,
                                   max_extension_ratio=max_extension_ratio)


def closed_context(closed, original, *, depth_ratio=DEPTH_RATIO, max_extension_ratio=None):
    """A lightweight pose/preview context, including partially closed results."""
    nonempty = [p.part.vertices for p in closed.parts if len(p.part.faces)]
    return ConnectionContext(closed, [], {p.part_id: len(p.vertices) for p in original},
                             depth_ratio, max_extension_ratio, overlap_frame(np.concatenate(nonempty)))


def connections_from_closed(content, manifest, original, closed, plan, *, depth_ratio=DEPTH_RATIO,
                            max_extension_ratio=None, allow_intersections=False):
    """Build extension correspondence from the saved caps without capping again."""
    try:
        import rtree  # Spatial queries used when checking the closed receiving part.
    except ImportError as error:
        raise RuntimeError("延長には追加ライブラリが必要です。WindowsのUI環境で python -m pip install -r requirements.txt を実行してください。") from error
    if not np.isfinite(depth_ratio) or not 0 < depth_ratio <= .25:
        raise ValueError("食い込み深さは0より大きく25%以下にしてください。")
    if max_extension_ratio is not None and (not np.isfinite(max_extension_ratio)
            or not depth_ratio <= max_extension_ratio <= .25):
        raise ValueError("最大延長量の設定が不正です。")
    for record in closed.parts:
        if not len(record.part.faces):
            continue
        if not record.statistics["is_watertight"] or not record.statistics["is_winding_consistent"]:
            details = f"残る境界辺 {record.statistics['remaining_boundary_edges']}本 / 面向き整合 {'あり' if record.statistics['is_winding_consistent'] else 'なし'}"
            raise ConnectionLimit(f"{record.part.name}: 延長には閉じた、面の向きが整ったパーツが必要です（{details}）。①の閉鎖診断を確認してください。")
        if record.statistics["degenerate_cap_faces"] or (record.statistics["projected_problem_sections"] and not allow_intersections):
            raise ConnectionLimit(f"{record.part.name}: 蓋に退化面または投影の不整合があります。蓋の方式を変更してください。")
    local_sources, _, _, _, _ = _source_cut_data(content, manifest, original)
    records = {p.part.part_id: p for p in closed.parts}
    roles = _roles(plan)
    regions = []
    for record in closed.parts:
        child = record.part.part_id
        for section in record.statistics["sections"]:
            loops = section["boundary_loops"]
            edges = _edges(loops, local_sources[child])
            matching = [c for c in plan.connections if child in (c.part_a, c.part_b)
                        and set(c.boundary_edges).issubset(edges)]
            if not matching:
                continue
            assignments = {roles[frozenset((c.part_a, c.part_b))] for c in matching}
            if all(owner[0] == child for owner in assignments):
                continue
            if len(assignments) != 1 or next(iter(assignments))[1] != child:
                raise ConnectionLimit(f"{record.part.name}: 一つの断面に複数の接続先があり、延長対象を決められません。")
            parent = next(iter(assignments))[0]
            if set().union(*(set(c.boundary_edges) for c in matching)) != set(edges):
                raise ConnectionLimit(f"{record.part.name}: 断面と元の接続辺の対応が不完全です。")
            other = records[parent]
            paired = next((s for s in other.statistics["sections"]
                           if _edges(s["boundary_loops"], local_sources[parent]) == edges), None)
            if paired is None:
                raise ConnectionLimit(f"{record.part.name}: 相手側の閉じた断面を特定できません。")
            parent_nodes = {int(local_sources[parent][i]): int(i) for ring in paired["boundary_loops"] for i in ring}
            pairs = [[int(i), parent_nodes[int(local_sources[child][i])]] for ring in loops for i in ring]
            normal = _plane(record.part.vertices, np.asarray(loops[0]))["normal"]
            cap_faces = record.part.faces[record.cap_ids == section["cap_id"]]
            tri = record.part.vertices[cap_faces]
            outward = np.cross(tri[:, 1] - tri[:, 0], tri[:, 2] - tri[:, 0]).sum(axis=0)
            if normal @ outward < 0:
                normal = -normal
            regions.append({"connection_ids": [c.connection_id for c in matching], "parent_id": parent,
                "child_id": child, "cap_id": section["cap_id"], "child_loops": loops,
                "parent_loops": paired["boundary_loops"], "pairs": pairs, "normal": normal.tolist(),
                "cap_faces": cap_faces.tolist()})
    covered = {connection_id for region in regions for connection_id in region["connection_ids"]}
    if covered != {c.connection_id for c in plan.connections}:
        raise ConnectionLimit("元のすべての接続に対応する閉じた断面を取り出せません。断面の診断を確認してください。")
    context = closed_context(closed, original, depth_ratio=depth_ratio, max_extension_ratio=max_extension_ratio)
    context.regions = regions
    return context


def pose_closed(context, offsets, motion):
    records = []
    for record in context.base.parts:
        part, stats = record.part, copy.deepcopy(record.statistics)
        count = context.original_counts[part.part_id]
        delta = np.asarray(offsets[str(part.part_id)], dtype=float)
        spec = motion.get("parts", {}).get(str(part.part_id))
        weights = np.asarray(spec["weights"]) if spec else np.ones(count)
        vertices = part.vertices.copy()
        vertices[:count] += weights[:, None] * delta
        # Every boundary of fixed-boundary motion has weight zero. Whole-part
        # translations move generated cap vertices by precisely the same delta.
        generated_delta = np.zeros(3) if spec else delta
        vertices[count:] += generated_delta
        for section in stats["sections"]:
            info = section["triangulation"]
            if "center_vertex" in info:
                info["center"] = vertices[info["center_vertex"]].tolist()
        records.append(replace(record, part=replace(part, vertices=vertices), statistics=stats))
    return CappingResult(tuple(records), {**context.base.statistics, "parts": [p.statistics for p in records]})


def section_width(points, normal):
    auxiliary = np.eye(3)[np.argmin(np.abs(normal))]
    u = np.cross(normal, auxiliary)
    u /= np.linalg.norm(u)
    xy = (points - points[0]) @ np.array([u, np.cross(normal, u)]).T
    return float(np.ptp(xy, axis=0).min())


class _SolidQuery:
    def __init__(self, part, frame):
        self.origin, self.scale = np.asarray(frame["origin"]), frame["scale"]
        self.mesh = trimesh.Trimesh((part.vertices - self.origin) / self.scale, part.faces, process=False)

    def intervals(self, points, normal, maximum, tolerance):
        points = (points - self.origin) / self.scale
        far = float(np.linalg.norm(points, axis=1).max() + np.linalg.norm(self.mesh.vertices, axis=1).max()) + 1
        start = points - normal * far
        positions, rays, _ = self.mesh.ray.intersects_location(start, np.tile(normal, (len(points), 1)), multiple_hits=True)
        values = np.einsum("ij,j->i", positions - points[rays], normal) * self.scale
        candidates, midpoints = [], []
        for ray in range(len(points)):
            ordered = sorted(values[rays == ray])
            hits = []
            for value in ordered:
                if not hits or value - hits[-1] > tolerance:
                    hits.append(float(value))
            for a, b in zip(hits, hits[1:]):
                if b - a > tolerance and b > tolerance and a <= maximum + tolerance:
                    candidates.append((ray, a, b))
                    midpoints.append(points[ray] + normal * ((a + b) / (2 * self.scale)))
        result = np.full((len(points), 2), np.nan)
        if midpoints:
            midpoints = np.asarray(midpoints)
            inside = self.mesh.contains(midpoints)
            if np.any(~inside):
                _, distances, _ = trimesh.proximity.closest_point(self.mesh, midpoints[~inside])
                inside[~inside] = distances <= tolerance / self.scale * 4
            for (ray, a, b), valid in zip(candidates, inside):
                if valid and not np.isfinite(result[ray, 0]):
                    result[ray] = [a, b]
        return result

    def cap_crosses(self, triangles):
        original = self.mesh.triangles
        tip = (triangles - self.origin) / self.scale
        combined = np.concatenate([original, tip])
        normals = np.cross(combined[:, 1] - combined[:, 0], combined[:, 2] - combined[:, 0])
        lengths = np.linalg.norm(normals, axis=1)
        normals /= np.maximum(lengths[:, None], np.finfo(float).tiny)
        pairs = []
        for index, triangle in enumerate(tip):
            bounds = np.r_[triangle.min(axis=0) - 1e-9, triangle.max(axis=0) + 1e-9]
            pairs.extend((int(face), len(original) + index) for face in self.mesh.triangles_tree.intersection(bounds))
        if not pairs:
            return False
        crossed = _intersecting_pairs(combined, normals, np.asarray(pairs, dtype=np.int64), 1e-9)
        for parent_face, tip_face in crossed:
            if np.linalg.norm(np.cross(normals[parent_face], normals[tip_face])) <= 1e-10:
                return True
            intersection = _intersection_points(combined[[parent_face, tip_face]], {"origin": [0, 0, 0], "scale": 1.0})
            midpoint = intersection.mean(axis=0)
            # An end-cap edge may lie on an outer receiver wall. Only an
            # intersection through the cap interior invalidates containment.
            if _strict_inside(combined[tip_face][None], normals[tip_face][None], midpoint[None], 1e-9)[0]:
                return True
        return False


def evaluate_connections(context, closed, *, max_samples=None, strict=True, queries=None):
    by_id = {p.part.part_id: p for p in closed.parts}
    queries = {} if queries is None else queries
    reports = []
    tolerance = context.frame["scale"] * 1e-9
    for region in context.regions:
        parent, child = by_id[region["parent_id"]].part, by_id[region["child_id"]].part
        pair = np.asarray(region["pairs"], dtype=np.int64)
        report = {"connection_ids": region["connection_ids"], "parent_id": parent.part_id,
                  "child_id": child.part_id, "cap_id": region["cap_id"], "valid": True,
                  "length": 0.0, "depth": 0.0, "normal": region["normal"], "status": "contact"}
        if np.max(np.linalg.norm(child.vertices[pair[:, 0]] - parent.vertices[pair[:, 1]], axis=1)) <= tolerance:
            reports.append(report)
            continue
        normal = np.asarray(region["normal"])
        width = section_width(child.vertices[region["child_loops"][0]], normal)
        requested_depth = width * context.depth_ratio
        cap_triangles = child.vertices[np.asarray(region["cap_faces"])]
        # Search the whole receiving solid. This is a finite geometric search
        # range, not a movement or five-percent extension constraint.
        maximum = (float(np.linalg.norm(np.ptp(np.vstack([parent.vertices, cap_triangles.reshape(-1, 3)]), axis=0)))
                   + context.frame["scale"]) if context.max_extension_ratio is None else width * context.max_extension_ratio
        report.update(width=width, maximum=None if context.max_extension_ratio is None else maximum,
                      requested_depth=requested_depth)
        samples = np.unique(np.concatenate([cap_triangles.reshape(-1, 3), cap_triangles.mean(axis=1),
                            ((cap_triangles + np.roll(cap_triangles, -1, axis=1)) / 2).reshape(-1, 3)]), axis=0)
        if max_samples and len(samples) > max_samples:
            samples = samples[np.linspace(0, len(samples) - 1, max_samples, dtype=int)]
        query_key = (parent.part_id, hashlib.sha256(parent.vertices.tobytes()).digest())
        query = queries.setdefault(query_key, None)
        if query is None:
            query = queries[query_key] = _SolidQuery(parent, context.frame)
        choices = []
        for direction in (normal, -normal):
            intervals = query.intervals(samples, direction, maximum, tolerance)
            if not np.isfinite(intervals).all():
                continue
            depth = min(requested_depth, float(np.min(intervals[:, 1] - intervals[:, 0])) * .1)
            if depth <= tolerance * 8:
                continue
            length = max(0.0, float(intervals[:, 0].max()) + depth)
            upper = min(maximum, float(intervals[:, 1].min()) - depth)
            if length > upper + tolerance:
                continue
            if strict and query.cap_crosses(cap_triangles + direction * length):
                continue
            contact = samples + direction * intervals[:, :1]
            points = np.vstack([samples, samples + direction * length, contact])
            choices.append((length, direction, depth, [points.min(axis=0).tolist(), points.max(axis=0).tolist()]))
        if not choices:
            reason = ("断面の法線方向に、断面全体が入る接続先を見つけられません。移動位置と方向を確認してください。"
                      if context.max_extension_ratio is None else "指定した延長範囲では断面全体の食い込みを作れません。")
            report.update(valid=False, status="blocked", reason=reason)
        else:
            length, direction, depth, bounds = choices[0]
            report.update(length=length, normal=direction.tolist(), depth=depth,
                          contact_bounds=bounds, status="extended" if length > tolerance else "overlap")
        reports.append(report)
    return reports


def reports_valid(reports):
    return all(report["valid"] for report in reports)


def extend_closed(context, closed, reports, *, validate_self=False):
    if not reports_valid(reports):
        raise ConnectionLimit("接続を維持できない断面があります。移動量を小さくしてください。")
    regions = {r["cap_id"]: r for r in context.regions}
    records = []
    for record in closed.parts:
        part = record.part
        vertices, faces = part.vertices.tolist(), part.faces.tolist()
        sources, source_faces, cap_ids = record.source_vertex_indices.tolist(), record.source_face_indices.tolist(), record.cap_ids.tolist()
        extension_ids, center_ids = [], set(np.flatnonzero(record.is_cap_center).tolist())
        statistics = copy.deepcopy(record.statistics)
        for report in reports:
            if report["child_id"] != part.part_id or report["length"] <= context.frame["scale"] * 1e-9:
                continue
            cap_id = report["cap_id"]
            region = regions[cap_id]
            selected = [i for i, value in enumerate(cap_ids) if value == cap_id]
            cap = np.asarray([faces[i] for i in selected], dtype=np.int64)
            nodes = np.unique(cap)
            delta = np.asarray(report["normal"]) * report["length"]
            mapping = {}
            for node in nodes:
                mapping[int(node)] = len(vertices)
                vertices.append((np.asarray(vertices[node]) + delta).tolist())
                sources.append(-1)
                if int(node) in center_ids:
                    center_ids.discard(int(node))
                    center_ids.add(mapping[int(node)])
            selected_set = set(selected)
            keep = [i for i in range(len(faces)) if i not in selected_set]
            remap_faces = {old: new for new, old in enumerate(keep)}
            extension_ids = [remap_faces[i] for i in extension_ids if i in remap_faces]
            faces, source_faces, cap_ids = [faces[i] for i in keep], [source_faces[i] for i in keep], [cap_ids[i] for i in keep]
            for ring in region["child_loops"]:
                for a, b in zip(ring, np.roll(ring, -1)):
                    extension_ids.extend([len(faces), len(faces) + 1])
                    faces.extend([[int(b), int(a), mapping[int(a)]], [int(b), mapping[int(a)], mapping[int(b)]]])
                    source_faces.extend([-1, -1])
                    cap_ids.extend([-1, -1])
            faces.extend([[mapping[int(i)] for i in face] for face in cap])
            source_faces.extend([-1] * len(cap))
            cap_ids.extend([cap_id] * len(cap))
            section = next(s for s in statistics["sections"] if s["cap_id"] == cap_id)
            section.update(extension_length=report["length"], extension_direction=report["normal"],
                           tip_loops=[[mapping[int(i)] for i in ring] for ring in region["child_loops"]])
            if "center_vertex" in section["triangulation"]:
                index = mapping[section["triangulation"]["center_vertex"]]
                section["triangulation"].update(center_vertex=index, center=vertices[index])
        updated = replace(part, vertices=np.asarray(vertices, dtype=float).reshape(-1, 3), faces=np.asarray(faces, dtype=np.int64).reshape(-1, 3))
        mesh = trimesh.Trimesh(updated.vertices, updated.faces, process=False)
        statistics.update(extension_face_ids=extension_ids, cap_center_vertex_ids=sorted(center_ids),
                          is_watertight=bool(mesh.is_watertight), is_winding_consistent=bool(mesh.is_winding_consistent),
                          is_volume=bool(mesh.is_volume),
                          added_faces=len(faces) - (len(part.faces) - record.statistics["added_faces"]),
                          added_vertices=len(vertices) - context.original_counts[part.part_id])
        if validate_self and len(part.faces) and (not mesh.is_volume):
            raise ConnectionLimit(f"{part.name}: 延長後に有効な閉じた立体を作れませんでした。")
        if validate_self and len(part.faces):
            triangle = updated.vertices[updated.faces] / context.frame["scale"]
            areas = np.linalg.norm(np.cross(triangle[:, 1] - triangle[:, 0], triangle[:, 2] - triangle[:, 0]), axis=1)
            if np.any(areas <= 1e-18):
                raise ConnectionLimit(f"{part.name}: 延長後に面積が0または極小の面があります。")
            overlaps = find_face_overlaps(updated.vertices, updated.faces, frame=context.frame)
            if overlaps["pair_count"]:
                raise ConnectionLimit(f"{part.name}: 延長後のパーツ内部に面の交差があります。")
        records.append(CappedPart(updated, np.asarray(sources, dtype=np.int64), np.asarray(source_faces, dtype=np.int64),
                                  np.asarray(cap_ids, dtype=np.int64), statistics))
    return CappingResult(tuple(records), {**closed.statistics, "method": METHOD, "connections": reports,
        "depth_ratio": context.depth_ratio, "max_extension_ratio": context.max_extension_ratio,
        "extension_faces": sum(len(r.statistics["extension_face_ids"]) for r in records),
        "added_faces": sum(r.statistics["added_faces"] for r in records),
        "added_vertices": sum(r.statistics["added_vertices"] for r in records), "parts": [r.statistics for r in records]})


def diagnose_extension(context, before, result):
    """Annotate a generated result; intersections never discard its geometry."""
    previous = {record.part.part_id: record.part for record in before.parts}
    records = []
    for record in result.parts:
        part = record.part
        original = previous[part.part_id]
        reference = find_face_overlaps(original.vertices, original.faces, frame=context.frame)
        report = find_face_overlaps(part.vertices, part.faces, frame=context.frame)
        triangles = (part.vertices[part.faces] - context.frame["origin"]) / context.frame["scale"]
        area = np.linalg.norm(np.cross(triangles[:, 1] - triangles[:, 0],
                                      triangles[:, 2] - triangles[:, 0]), axis=1)
        statistics = {**record.statistics, "self_intersections_checked": True,
            "pre_extension_self_intersection_pair_count": reference["pair_count"],
            "self_intersection_pair_count": report["pair_count"],
            "self_intersection_pairs": report["pairs"].tolist(),
            "self_intersection_face_ids": report["face_ids"],
            "degenerate_face_count": int(np.count_nonzero(area <= 1e-18))}
        records.append(replace(record, statistics=statistics))
    return CappingResult(tuple(records), {**result.statistics, "self_intersections_checked": True,
        "self_intersection_pair_count": sum(r.statistics["self_intersection_pair_count"] for r in records),
        "pre_extension_self_intersection_pair_count": sum(r.statistics["pre_extension_self_intersection_pair_count"] for r in records),
        "parts": [r.statistics for r in records]})


def constrain_offsets(context, before, requested, motion):
    queries = {}
    initial = evaluate_connections(context, pose_closed(context, before, motion), max_samples=48, strict=False, queries=queries)
    if not reports_valid(initial):
        # Allow recovery after enabling this mode on a previously disconnected pose.
        repaired = evaluate_connections(context, pose_closed(context, requested, motion), queries=queries)
        if reports_valid(repaired):
            return copy.deepcopy(requested), repaired, False
        return copy.deepcopy(before), initial, True
    delta = {key: np.asarray(requested[key]) - before[key] for key in before}
    widths = [section_width(context.base.parts[next(i for i, p in enumerate(context.base.parts)
                               if p.part.part_id == region["child_id"])].part.vertices[region["child_loops"][0]],
                             np.asarray(region["normal"])) for region in context.regions]
    step = max(min(widths, default=context.frame["scale"]) * context.max_extension_ratio * .5, context.frame["scale"] * 1e-8)
    distance = max((float(np.linalg.norm(v)) for v in delta.values()), default=0)
    count = max(1, int(np.ceil(distance / step)))
    # A very large single jump advances conservatively; subsequent drag events
    # continue from the accepted value rather than jumping across a forbidden gap.
    target = min(1.0, 64 / count)
    count = min(count, 64)
    accepted, failed = 0.0, None
    for fraction in np.linspace(0, target, count + 1)[1:]:
        candidate = {key: (np.asarray(before[key]) + fraction * delta[key]).tolist() for key in before}
        reports = evaluate_connections(context, pose_closed(context, candidate, motion), max_samples=48, strict=False, queries=queries)
        if not reports_valid(reports):
            failed = float(fraction)
            break
        accepted = float(fraction)
    if failed is not None:
        for _ in range(12):
            fraction = (accepted + failed) / 2
            candidate = {key: (np.asarray(before[key]) + fraction * delta[key]).tolist() for key in before}
            if reports_valid(evaluate_connections(context, pose_closed(context, candidate, motion), max_samples=48,
                                                  strict=False, queries=queries)):
                accepted = fraction
            else:
                failed = fraction
    candidate = {key: (np.asarray(before[key]) + accepted * delta[key]).tolist() for key in before}
    reports = evaluate_connections(context, pose_closed(context, candidate, motion), queries=queries)
    if not reports_valid(reports):
        candidate = copy.deepcopy(before)
        reports = evaluate_connections(context, pose_closed(context, candidate, motion), queries=queries)
    return candidate, reports, any(not np.allclose(candidate[k], requested[k], atol=context.frame["scale"] * 1e-9, rtol=0) for k in before)


def constraint_payload(context, closed):
    records = {}
    for record in closed.parts:
        if not len(record.part.faces):
            continue
        centers = [{"index": s["triangulation"]["center_vertex"], "loop": s["boundary_loops"][0]}
                   for s in record.statistics["sections"] if "center_vertex" in s["triangulation"]]
        records[str(record.part.part_id)] = {"vertices": record.part.vertices.tolist(), "faces": record.part.faces.reshape(-1).tolist(),
            "original_vertex_count": context.original_counts[record.part.part_id], "centers": centers}
    digest = hashlib.sha256()
    for part in context.base.parts:
        digest.update(str(part.part.part_id).encode())
        digest.update(part.part.vertices.tobytes())
        digest.update(part.part.faces.tobytes())
    signature = digest.hexdigest()[:16]
    return {"enabled": True, "revision": f"{METHOD}:{signature}:{context.depth_ratio}:{context.max_extension_ratio}",
            "depth_ratio": context.depth_ratio, "max_extension_ratio": context.max_extension_ratio,
            "parts": records, "regions": context.regions, "frame": context.frame}


def _intersection_points(triangles, frame):
    points = (triangles - frame["origin"]) / frame["scale"]
    a, b = points
    normals = np.cross(points[:, 1] - points[:, 0], points[:, 2] - points[:, 0])
    normals /= np.maximum(np.linalg.norm(normals, axis=1)[:, None], np.finfo(float).tiny)
    na, nb = normals
    line = np.cross(na, nb)
    norm = float(np.linalg.norm(line))
    if norm <= 1e-10:
        from shapely.geometry import Polygon
        u = a[1] - a[0]
        u /= np.linalg.norm(u)
        basis = np.array([u, np.cross(na, u)])
        patch = Polygon((a - a[0]) @ basis.T).intersection(Polygon((b - a[0]) @ basis.T))
        if patch.is_empty or patch.geom_type != "Polygon":
            return np.empty((0, 3))
        intersection = np.asarray(patch.exterior.coords) @ basis + a[0]
    else:
        direction = line / norm
        da, db = float(a[0] @ na), float(b[0] @ nb)
        origin = (da * np.cross(nb, line) + db * np.cross(line, na)) / norm ** 2
        lo_a, hi_a = _plane_interval(a[None], ((a @ nb) - db)[None], direction[None], 1e-9)
        lo_b, hi_b = _plane_interval(b[None], ((b @ na) - da)[None], direction[None], 1e-9)
        values = np.array([max(lo_a[0], lo_b[0]), min(hi_a[0], hi_b[0])])
        intersection = origin + (values - origin @ direction)[:, None] * direction
    return intersection * frame["scale"] + frame["origin"]


def suppress_connection_overlaps(report, parts, reports, regions):
    """Hide intended inter-part crossings only in the bounded collar footprint."""
    by_id = {p.part_id: p for p in parts}
    face_counts = np.cumsum([0] + [len(p.faces) for p in parts])
    zones = []
    by_cap = {r["cap_id"]: r for r in regions}
    for connection in reports:
        if not connection["valid"] or connection["status"] == "contact":
            continue
        region = by_cap[connection["cap_id"]]
        points = by_id[connection["child_id"]].vertices[np.concatenate(region["child_loops"])]
        tip = points + np.asarray(connection["normal"]) * connection["length"]
        bounds = np.asarray(connection.get("contact_bounds", []), dtype=float).reshape(-1, 3)
        all_points = np.vstack([points, tip, bounds])
        padding = max(float(connection.get("width", 0)) * .01, report["tolerance"] * 4)
        zones.append((frozenset((connection["parent_id"], connection["child_id"])), all_points.min(axis=0) - padding,
                      all_points.max(axis=0) + padding))
    kept, removed = [], 0
    for first, second in np.asarray(report["pairs"]).reshape(-1, 2):
        a, b = np.searchsorted(face_counts[1:], [first, second], side="right")
        ids = frozenset((parts[a].part_id, parts[b].part_id))
        intended = False
        matching_zones = [(low, high) for pair, low, high in zones if pair == ids and a != b]
        if matching_zones:
            triangles = np.stack([parts[a].vertices[parts[a].faces[first - face_counts[a]]],
                                  parts[b].vertices[parts[b].faces[second - face_counts[b]]]])
            intersection = _intersection_points(triangles, report["frame"])
            intended = bool(len(intersection)) and any(np.all(intersection >= low) and np.all(intersection <= high)
                                                       for low, high in matching_zones)
        if intended:
            removed += 1
        else:
            kept.append((int(first), int(second)))
    pairs = np.asarray(kept, dtype=np.int64).reshape(-1, 2)
    return {**report, "pairs": pairs, "pair_count": len(pairs), "face_ids": np.unique(pairs).tolist(),
            "sample_pairs": pairs[:100].tolist(), "intentional_connection_pairs": removed}
