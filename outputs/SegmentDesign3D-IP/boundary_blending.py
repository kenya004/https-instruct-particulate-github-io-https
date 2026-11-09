"""Fixed rest-mesh weights for blending scale changes near shared boundaries."""
from __future__ import annotations

import heapq
import io
from collections import defaultdict
from dataclasses import replace

import numpy as np

from editing import validate_scales


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


def build_boundary_blend(content, manifest, parts, connections, selected_ids, ratio=0.2, root_id=None):
    """Use exact seam correspondence and edge-path distances on the rest mesh.

    Unselected incident parts supply boundary targets first; ties prefer the
    existing root, then part ID. Every copy at a contact uses the same target.
    """
    selected = set(selected_ids)
    by_id = {part.part_id: part for part in parts}
    if (any(type(part) is not int or part not in by_id or not len(by_id[part].faces) for part in selected)
            or type(ratio) not in (int, float) or not np.isfinite(ratio) or not 0 < ratio <= 1):
        raise ValueError("境界なじませの対象パーツまたは範囲が不正です。")
    payload = {"method": "boundary_blend_v1", "selected_ids": sorted(selected), "ratio": float(ratio),
               "parts": {}, "anchors": {}, "reference_checks": [], "warnings": []}
    if not selected:
        return payload
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

    # Part-contact components at a source vertex avoid linking unrelated point
    # contacts. Only actual shared boundary edges create contact relationships.
    contacts = defaultdict(lambda: defaultdict(set))
    for connection in connections:
        for edge in connection.boundary_edges:
            for vertex in edge:
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
            reference = min(component, key=lambda part: (part in selected, part != root_id, part))
            for part in component:
                seeds[part][vertex] = reference
            fixed = sorted(component - selected)
            if component & selected and len(fixed) > 1:
                payload["reference_checks"].append({"point": points[vertex].tolist(), "part_ids": fixed})

    for part_id in sorted(selected):
        part = by_id[part_id]
        nodes, node_for_local = np.unique(local_ids[part_id], return_inverse=True)
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
        boundary = {node_index[source]: reference for source, reference in seeds[part_id].items() if source in node_index}
        if not boundary:
            payload["warnings"].append(f"{part.name}: 対応する共有境界がないため、従来の変形を使います。")
            continue
        nearest = _distances(graph, boundary)
        finite = np.isfinite(nearest)
        depth = float(nearest[finite].max())
        radius = float(ratio * depth)
        strength = np.zeros(len(nodes))
        if radius > 0:
            t = np.minimum(nearest[finite] / radius, 1)
            strength[finite] = 1 - t * t * (3 - 2 * t)
        else:
            strength[nearest == 0] = 1
        references = sorted(set(boundary.values()))
        kernels = np.zeros((len(references), len(nodes)))
        for row, reference in enumerate(references):
            source_nodes = [node for node, owner in boundary.items() if owner == reference]
            if len(references) == 1:
                kernels[row, finite] = 1
                continue
            distances = _distances(graph, source_nodes, radius)
            zero = distances == 0
            valid = np.isfinite(distances) & (distances > 0) & (distances < radius) & (nearest > 0)
            kernels[row, valid] = (nearest[valid] / distances[valid]) ** 2 * (1 - distances[valid] / radius) ** 2
            kernels[row, zero] = 1
        total = kernels.sum(axis=0)
        active = total > 0
        kernels[:, active] /= total[active]
        influences = []
        for reference, kernel in zip(references, kernels):
            weights = strength * kernel
            if reference != part_id and np.any(weights > 0):
                influences.append({"reference_part_id": reference, "weights": weights[node_for_local].tolist()})
        transition = finite & (nearest > 0) & (nearest < radius)
        if influences and not np.any(transition):
            payload["warnings"].append(f"{part.name}: 遷移帯に中間頂点がありません。範囲を広げるか、境界付近の細分化が必要です。")
        if np.any(~finite):
            payload["warnings"].append(f"{part.name}: 境界へ到達できない頂点は従来の変形を使います。")
        payload["parts"][str(part_id)] = {"part_id": part_id, "influences": influences, "depth": depth,
            "radius": radius, "boundary_vertices": int(np.count_nonzero(nearest[node_for_local] == 0)),
            "transition_vertices": int(np.count_nonzero(transition[node_for_local])),
            "unreachable_vertices": int(np.count_nonzero(~finite[node_for_local]))}

    # Weighted boundary-vertex samples make anchor diagnostics reflect the
    # deformed geometry, rather than the old uniform-scale approximation.
    maps = {part: {int(source): int(index) for index, source in reversed(list(enumerate(ids)))} for part, ids in local_ids.items()}
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
            payload["anchors"][str(connection.connection_id)] = samples
    return payload


def apply_boundary_blend(parts, baseline, scales, automatic, payload):
    scales = validate_scales(parts, scales)
    by_id = {part.part_id: part for part in parts}
    result = []
    for part, current in zip(parts, baseline):
        vertices = current.vertices.copy()
        for influence in payload.get("parts", {}).get(str(part.part_id), {}).get("influences", []):
            reference = by_id[influence["reference_part_id"]]
            weights = np.asarray(influence["weights"], dtype=float)
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
    return {"method": payload["method"], "selected_ids": payload["selected_ids"], "ratio": payload["ratio"],
            "parts": [{key: value for key, value in item.items() if key != "influences"} for item in payload["parts"].values()],
            "conflicting_fixed_vertices": conflicts}
