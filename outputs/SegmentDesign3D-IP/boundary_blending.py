"""Fixed rest-mesh weights for blending scale changes near shared boundaries."""
from __future__ import annotations

import heapq
import io
from collections import defaultdict
from dataclasses import replace

import numpy as np
import trimesh

from editing import validate_scales


METHOD = "reference_surface_blend_v3"
EDIT_METHOD = "edited_part_surface_blend_v4"
EDIT_APPLICATION = "edited_part"
DISTANCE_BASIS = "reference_triangle_surface"
RANGE_BASIS = "part_aabb_longest_side"
DEFAULT_RATIO = .6


def part_transition_size(part):
    """Use the longest side of the original part's AABB for every cut."""
    return float(np.ptp(part.vertices, axis=0).max()) if len(part.vertices) else 0.


def _distances(graph, seeds, limit=float("inf")):
    distances = np.full(len(graph), np.inf)
    queue = []
    for seed in seeds:
        distances[seed] = 0
        heapq.heappush(queue, (0.0, int(seed)))
    while queue:
        distance, node = heapq.heappop(queue)
        if distance != distances[node]:
            continue
        for neighbor, length in graph[node]:
            candidate = distance + length
            if candidate <= limit and candidate < distances[neighbor]:
                distances[neighbor] = candidate
                heapq.heappush(queue, (candidate, neighbor))
    return distances


def boundary_geometry(content, manifest, parts):
    """Validate rest-mesh correspondence and merge exact coordinate seams."""
    by_id = {part.part_id: part for part in parts}
    with np.load(io.BytesIO(content), allow_pickle=False) as data:
        if not {"vertices", "faces", "face_part_ids"}.issubset(data.files):
            raise ValueError("境界なじませには元メッシュの頂点・面・所属情報が必要です。")
        vertices, faces, labels = data["vertices"], data["faces"], data["face_part_ids"]
        if (vertices.ndim != 2 or vertices.shape[1] != 3 or not np.isfinite(vertices).all()
                or faces.ndim != 2 or faces.shape[1] != 3 or faces.dtype.kind not in "iu"
                or labels.shape != (len(faces),) or not set(labels.tolist()).issubset(by_id)
                or (len(faces) and (faces.min() < 0 or faces.max() >= len(vertices)))):
            raise ValueError("境界なじませ用の元メッシュが不正です。")
        points, canonical = np.unique(vertices, axis=0, return_inverse=True)
        local_ids = {}
        for record in manifest["parts"]:
            part = by_id[record["part_id"]]
            prefix = record.get("npz_prefix", f"part_{part.part_id:04d}")
            source = data[f"{prefix}_source_vertex_indices"]
            source_faces = data[f"{prefix}_source_face_indices"]
            if (source.shape != (len(part.vertices),) or source.dtype.kind not in "iu"
                    or (len(source) and (source.min() < 0 or source.max() >= len(vertices)))
                    or source_faces.shape != (len(part.faces),) or source_faces.dtype.kind not in "iu"
                    or (len(source_faces) and (source_faces.min() < 0 or source_faces.max() >= len(faces)))
                    or not np.array_equal(vertices[source], part.vertices)
                    or not np.array_equal(faces[source_faces], source[part.faces])
                    or not np.all(labels[source_faces] == part.part_id)):
                raise ValueError("元メッシュと編集パーツの頂点・面の対応が不正です。")
            local_ids[part.part_id] = canonical[source]
    return points, local_ids


def part_edge_graph(points, source_ids, part):
    nodes, node_for_local = np.unique(source_ids, return_inverse=True)
    node_index = {int(source): index for index, source in enumerate(nodes)}
    graph = [[] for _ in nodes]
    triangles = node_for_local[part.faces]
    edges = np.unique(np.sort(np.concatenate([triangles[:, [0, 1]], triangles[:, [1, 2]], triangles[:, [2, 0]]]), axis=1), axis=0)
    for a, b in edges:
        if a == b:
            continue
        length = float(np.linalg.norm(points[nodes[a]] - points[nodes[b]]))
        graph[a].append((int(b), length))
        graph[b].append((int(a), length))
    return node_for_local, node_index, graph


class _SurfaceDistanceQuery:
    """Reuse a reference mesh's spatial index, in a scale-independent frame."""

    def __init__(self, part):
        lower, upper = part.vertices.min(axis=0), part.vertices.max(axis=0)
        self.origin = lower + (upper - lower) / 2
        self.scale = float((upper - lower).max())
        if not np.isfinite(self.scale) or self.scale <= 0:
            raise ValueError(f"{part.name}: 接続先の表面距離を計算できません。")
        vertices = (part.vertices - self.origin) / self.scale
        triangles = vertices[part.faces]
        # Degenerate faces have no surface area. Skip them in the query only;
        # the input geometry and exported faces remain untouched.
        normal = np.cross(triangles[:, 1] - triangles[:, 0], triangles[:, 2] - triangles[:, 0])
        faces = part.faces[np.any(normal != 0, axis=1)]
        if not len(faces):
            raise ValueError(f"{part.name}: 距離計算に使える接続先の面がありません。")
        self.mesh = trimesh.Trimesh(vertices, faces, process=False)

    def distances(self, points):
        normalized = (points - self.origin) / self.scale
        result = np.empty(len(points))
        # Limit the size of temporary triangle-candidate arrays on detailed meshes.
        for start in range(0, len(points), 128):
            _, distance, _ = trimesh.proximity.closest_point(self.mesh, normalized[start:start + 128])
            result[start:start + 128] = distance * self.scale
        if not np.isfinite(result).all():
            raise ValueError("接続先の表面距離に不正な値があります。入力形状を確認してください。")
        return result


class _SurfaceQueries(dict):
    def __init__(self, parts):
        super().__init__()
        self.parts = {part.part_id: part for part in parts}

    def __missing__(self, part_id):
        query = self[part_id] = _SurfaceDistanceQuery(self.parts[part_id])
        return query


def reference_distance_field(points, local_sources, part, source_owners, queries):
    """Precompute surface distances and seam ownership independently of the band.

    Edge-path distances select reference ownership and reachable components only.
    The deformation falloff itself uses distance to the reference triangles.
    """
    node_for_local, node_index, graph = part_edge_graph(points, local_sources, part)
    node_sources = np.unique(local_sources)
    boundary = {node_index[source]: owner for source, owner in source_owners.items() if source in node_index}
    if not boundary:
        return None
    references = sorted(set(boundary.values()))
    paths = np.asarray([_distances(graph, [node for node, owner in boundary.items() if owner == reference])
                        for reference in references])
    nearest_path = paths.min(axis=0)
    reachable = np.isfinite(nearest_path)
    ownership = np.zeros_like(paths)
    for row, path in enumerate(paths):
        ownership[row, path == 0] = 1
        valid = np.isfinite(path) & (path > 0) & (nearest_path > 0)
        ownership[row, valid] = (nearest_path[valid] / path[valid]) ** 2
    totals = ownership.sum(axis=0)
    active = totals > 0
    ownership[:, active] /= totals[active]

    fields, nearest_surface = [], np.full(len(graph), np.inf)
    for row, reference in enumerate(references):
        if reference == part.part_id:
            continue
        distance = np.full(len(graph), np.inf)
        fixed = paths[row] == 0
        distance[fixed] = 0  # Pin every copy of the actual seam, without roundoff.
        query_nodes = np.flatnonzero(np.isfinite(paths[row]) & ~fixed)
        if len(query_nodes):
            distance[query_nodes] = queries[reference].distances(points[node_sources[query_nodes]])
        nearest_surface = np.minimum(nearest_surface, distance)
        fields.append({"reference_part_id": reference, "distances": distance[node_for_local],
                       "ownership": ownership[row, node_for_local]})
    # Self-owned cuts retain this part's own transform. Other connected parts
    # use that same transform as their reference at these cuts.
    nearest_surface[list(boundary)] = 0
    finite = np.isfinite(nearest_surface)
    return {"part_id": part.part_id, "name": part.name, "references": fields,
            "self_ownership": ownership[references.index(part.part_id), node_for_local] if part.part_id in references else np.zeros(len(local_sources)),
            "distances": nearest_surface[node_for_local],
            "depth": float(nearest_surface[finite].max()) if np.any(finite) else 0.,
            "part_size": part_transition_size(part),
            "boundary_vertices": int(np.count_nonzero(nearest_path[node_for_local] == 0)),
            "unreachable_vertices": int(np.count_nonzero(~reachable[node_for_local]))}


def boundary_anchor_samples(points, local_ids, connections):
    maps = {part: {int(source): int(index) for index, source in reversed(list(enumerate(ids)))} for part, ids in local_ids.items()}
    anchors = {}
    for connection in connections:
        samples = []
        for part_id in (connection.part_a, connection.part_b):
            weights = defaultdict(float)
            for a, b in connection.boundary_edges:
                length = float(np.linalg.norm(points[a] - points[b]))
                for source in (a, b):
                    weights[maps[part_id][source]] += length / (2 * connection.boundary_length)
            indices = sorted(weights)
            samples.append({"part_id": part_id, "indices": indices, "weights": [weights[index] for index in indices]})
        if all(sample["indices"] for sample in samples):
            anchors[str(connection.connection_id)] = samples
    return anchors


def build_blend_distances(content, manifest, parts, connections, selected_ids, root_id=None, connection_references=None):
    """Build immutable distance fields on the original mesh, once per selection.

    Unselected incident parts supply boundary targets first; ties prefer the
    existing root, then part ID. Every copy at a contact uses the same target.
    """
    selected = set(selected_ids)
    by_id = {part.part_id: part for part in parts}
    if any(type(part) is not int or part not in by_id or not len(by_id[part].faces) for part in selected):
        raise ValueError("境界なじませの対象パーツが不正です。")
    payload = {"method": METHOD, "distance_basis": DISTANCE_BASIS, "range_basis": RANGE_BASIS, "selected_ids": sorted(selected),
               "parts": {}, "anchors": {}, "reference_checks": [], "warnings": []}
    if not selected:
        return payload
    points, local_ids = boundary_geometry(content, manifest, parts)

    # Part-contact components at a source vertex avoid linking unrelated point
    # contacts. Only actual shared boundary edges create contact relationships.
    contacts = defaultdict(lambda: defaultdict(set))
    explicit = defaultdict(set)
    for connection in connections:
        for edge in connection.boundary_edges:
            for vertex in edge:
                if connection_references and connection.connection_id in connection_references:
                    reference = connection_references[connection.connection_id]
                    if reference not in (connection.part_a, connection.part_b):
                        raise ValueError("なじませの基準側が接続に含まれていません。")
                    explicit[vertex].add(reference)
                contacts[vertex][connection.part_a].add(connection.part_b)
                contacts[vertex][connection.part_b].add(connection.part_a)
    seeds = defaultdict(dict)
    for vertex, adjacency in contacts.items():
        unseen = set(adjacency)
        while unseen:
            component, queue = set(), [min(unseen)]
            while queue:
                part = queue.pop()
                if part in component:
                    continue
                component.add(part)
                unseen.discard(part)
                queue.extend(adjacency[part] - component)
            candidates = explicit[vertex] & component
            reference = min(candidates or component, key=lambda part: (part in selected, part != root_id, part))
            for part in component:
                seeds[part][vertex] = reference
            fixed = sorted(component - selected)
            if component & selected and len(fixed) > 1:
                payload["reference_checks"].append({"point": points[vertex].tolist(), "part_ids": fixed})

    queries = _SurfaceQueries(parts)
    for part_id in sorted(selected):
        part = by_id[part_id]
        field = reference_distance_field(points, local_ids[part_id], part, seeds[part_id], queries)
        if field is None:
            payload["warnings"].append(f"{part.name}: 対応する共有境界がないため、従来の変形を使います。")
            continue
        payload["parts"][str(part_id)] = field

    payload["anchors"] = boundary_anchor_samples(points, local_ids, connections)
    return payload


def build_edit_blend_distances(content, manifest, parts, connections, selected_ids):
    """Prepare each editing candidate's weights toward its actual neighbors.

    Both sides may be candidates. Each uses the other side's surface; neither
    becomes a fixed root just because its ID or the edit order comes first.
    """
    selected = set(selected_ids)
    by_id = {part.part_id: part for part in parts}
    if any(type(i) is not int or i not in by_id or not len(by_id[i].faces) for i in selected):
        raise ValueError("境界なじませの対象パーツが不正です。")
    payload = {"method": EDIT_METHOD, "application": EDIT_APPLICATION,
               "distance_basis": DISTANCE_BASIS, "range_basis": RANGE_BASIS,
               "selected_ids": sorted(selected), "parts": {}, "anchors": {},
               "reference_checks": [], "warnings": []}
    if not selected:
        return payload
    points, local_ids = boundary_geometry(content, manifest, parts)
    seeds = defaultdict(lambda: defaultdict(set))
    for connection in connections:
        for source, neighbor in ((connection.part_a, connection.part_b), (connection.part_b, connection.part_a)):
            for edge in connection.boundary_edges:
                for vertex in edge:
                    seeds[source][vertex].add(neighbor)
    queries = _SurfaceQueries(parts)
    for part_id in sorted(selected):
        owners = {vertex: min(neighbors) for vertex, neighbors in seeds[part_id].items()}
        field = reference_distance_field(points, local_ids[part_id], by_id[part_id], owners, queries)
        if field is None:
            payload["warnings"].append(f"{by_id[part_id].name}: 対応する共有境界がないため、従来の変形を使います。")
            continue
        payload["parts"][str(part_id)] = field
        if any(len(neighbors) > 1 for neighbors in seeds[part_id].values()):
            payload["warnings"].append(f"{by_id[part_id].name}: 同じ境界頂点に複数の接続先がある箇所は、パーツID順で相手を選びます。")
    payload["anchors"] = boundary_anchor_samples(points, local_ids, connections)
    return payload


def edit_blend_responses(blending, network, follow=True):
    """Attach the neighbor's response to this part's own unit scale change.

    Other parts' scale changes stay in the baseline automatic translation.
    This avoids blending their edits again or changing targets on slider focus.
    """
    if blending.get("application") != EDIT_APPLICATION:
        raise ValueError("編集パーツのなじませデータが不正です。")
    responses = {(r["source_id"], r["target_id"]): r["displacement"] for r in network["responses"]} if follow else {}
    specs = {}
    for part_id, spec in blending["parts"].items():
        specs[part_id] = {**spec, "application": EDIT_APPLICATION, "influences": [
            {**influence, "scale_displacement": responses.get((int(part_id), influence["reference_part_id"]), [0., 0., 0.])}
            for influence in spec["influences"]]}
    return {**blending, "parts": specs, "following_enabled": bool(follow)}


def blend_weights(distances, ratio=DEFAULT_RATIO):
    """Change the transition width without repeating any surface queries."""
    if type(ratio) not in (int, float) or not np.isfinite(ratio) or not 0 < ratio <= 1:
        raise ValueError("境界なじませの範囲が不正です。")
    payload = {key: value for key, value in distances.items() if key not in {"parts", "warnings"}}
    payload.update(ratio=float(ratio), parts={}, warnings=list(distances["warnings"]))
    for part_id, field in distances["parts"].items():
        radius = float(ratio * field["part_size"])
        kernels = []
        total = field["self_ownership"].copy()
        strength = np.where(total > 0, 1., 0.)
        for reference in field["references"]:
            d = reference["distances"]
            t = np.clip(d / radius, 0, 1) if radius > 0 else np.where(d == 0, 0., 1.)
            falloff = 1 - t*t*(3 - 2*t)
            kernel = falloff * reference["ownership"]
            kernels.append(kernel)
            total += kernel
            strength = np.maximum(strength, falloff)
        influences = []
        for reference, kernel in zip(field["references"], kernels):
            weights = np.divide(kernel * strength, total, out=np.zeros_like(total), where=total > 0)
            if np.any(weights > 0):
                influences.append({"reference_part_id": reference["reference_part_id"], "weights": weights.tolist()})
        strength = np.sum([item["weights"] for item in influences], axis=0) if influences else np.zeros(len(field["distances"]))
        transition = (strength > 0) & (strength < 1)
        if influences and not np.any(transition):
            payload["warnings"].append(f"{field['name']}: 遷移帯に中間頂点がありません。範囲を広げるか、境界付近の細分化が必要です。")
        if field["unreachable_vertices"]:
            payload["warnings"].append(f"{field['name']}: 境界へ到達できない頂点は従来の変形を使います。")
        payload["parts"][part_id] = {key: field[key] for key in ("part_id", "depth", "part_size", "boundary_vertices", "unreachable_vertices")}
        payload["parts"][part_id].update(influences=influences, radius=radius, transition_vertices=int(np.count_nonzero(transition)))
    return payload


def build_boundary_blend(content, manifest, parts, connections, selected_ids, ratio=DEFAULT_RATIO, root_id=None, connection_references=None):
    return blend_weights(build_blend_distances(content, manifest, parts, connections, selected_ids, root_id, connection_references), ratio)


def apply_boundary_blend(parts, baseline, scales, automatic, payload):
    scales = validate_scales(parts, scales)
    by_id = {part.part_id: part for part in parts}
    result = []
    for part, current in zip(parts, baseline):
        vertices = current.vertices.copy()
        for influence in payload.get("parts", {}).get(str(part.part_id), {}).get("influences", []):
            weights = np.asarray(influence["weights"], dtype=float)
            if payload.get("application") == EDIT_APPLICATION:
                # Only this part's own edit is attenuated. Contributions from
                # every other source remain unchanged in current.vertices.
                delta = scales[str(part.part_id)] - 1
                displacement = np.asarray(influence["scale_displacement"], dtype=float)
                vertices += (delta * weights)[:, None] * (displacement - (part.vertices - part.center))
                continue
            reference = by_id[influence["reference_part_id"]]
            # Preserve original coordinates exactly when scale is 1 and the
            # automatic displacement is 0, including very thin boundaries.
            target = part.vertices + (scales[str(reference.part_id)] - 1) * (part.vertices - reference.center) + automatic[reference.part_id]
            vertices += weights[:, None] * (target - current.vertices)
        result.append(replace(current, vertices=vertices))
    return tuple(result)


def blended_anchor_residuals(edited, connections, payload, fallback):
    by_id = {part.part_id: part for part in edited}
    result = dict(fallback)
    for connection in connections:
        samples = payload.get("anchors", {}).get(str(connection.connection_id))
        if samples:
            positions = [np.asarray(sample["weights"]) @ by_id[sample["part_id"]].vertices[sample["indices"]] for sample in samples]
            result[connection.connection_id] = float(np.linalg.norm(positions[0] - positions[1]))
    return result


def blend_metadata(payload, parts, scales, automatic):
    by_id = {part.part_id: part for part in parts}
    conflicts = 0
    tolerance = max((float(np.ptp(part.vertices, axis=0).max()) for part in parts if len(part.faces)), default=1) * 1e-8
    for check in payload.get("reference_checks", []):
        targets = []
        for part_id in check["part_ids"]:
            part = by_id[part_id]
            point = np.asarray(check["point"])
            targets.append(point + (scales[str(part_id)] - 1) * (point - part.center) + automatic[part_id])
        conflicts += any(np.linalg.norm(point - targets[0]) > tolerance for point in targets[1:])
    return {"method": payload["method"], "application": payload.get("application", "fixed_reference"),
            "active_scale_ids": [int(i) for i in payload["parts"] if scales[i] != 1],
            "distance_basis": payload["distance_basis"], "range_basis": payload["range_basis"], "selected_ids": payload["selected_ids"], "ratio": payload["ratio"],
            "parts": [{key: value for key, value in item.items() if key != "influences"} for item in payload["parts"].values()],
            "conflicting_fixed_vertices": conflicts}
