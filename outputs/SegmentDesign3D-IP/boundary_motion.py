"""Manual displacement fading to zero at every original shared boundary."""
from __future__ import annotations

from collections import defaultdict
from dataclasses import replace

import numpy as np

from boundary_blending import _distances, boundary_anchor_samples, boundary_geometry, part_edge_graph
from editing import validate_offsets


METHOD = "boundary_fixed_translation_v1"


def build_motion_distances(content, manifest, parts, connections):
    """Compute immutable edge-path distances once, independent of band width."""
    if not connections:
        return {"parts": {}, "anchors": {}}
    points, local_ids = boundary_geometry(content, manifest, parts)
    seeds = defaultdict(set)
    for connection in connections:
        for edge in connection.boundary_edges:
            for part_id in (connection.part_a, connection.part_b):
                seeds[part_id].update(edge)
    fields = {}
    for part in parts:
        if not seeds[part.part_id] or not len(part.faces):
            continue
        node_for_local, node_index, graph = part_edge_graph(points, local_ids[part.part_id], part)
        boundary = [node_index[source] for source in seeds[part.part_id] if source in node_index]
        if not boundary:
            continue
        nearest = _distances(graph, boundary)
        finite = np.isfinite(nearest)
        fields[str(part.part_id)] = {"part_id": part.part_id, "name": part.name,
            "distances": nearest[node_for_local], "depth": float(nearest[finite].max())}
    return {"parts": fields, "anchors": boundary_anchor_samples(points, local_ids, connections)}


def motion_weights(distances, ratios):
    """Smoothstep: boundary=0, beyond ratio * maximum boundary distance=1."""
    payload = {"method": METHOD, "parts": {}, "anchors": distances["anchors"] if ratios else {}, "warnings": []}
    for part_id, ratio in ratios.items():
        field = distances["parts"].get(str(part_id))
        if field is None or type(ratio) not in (int, float) or not np.isfinite(ratio) or not 0 < ratio <= 1:
            raise ValueError("断面固定移動の対象パーツまたは範囲が不正です。")
        nearest = field["distances"]
        finite = np.isfinite(nearest)
        radius = float(ratio * field["depth"])
        weights = np.ones(len(nearest))
        if radius > 0:
            t = np.clip(nearest[finite] / radius, 0, 1)
            weights[finite] = t * t * (3 - 2 * t)
        else:
            weights[finite] = 0
        boundary = nearest == 0
        transition = (weights > 0) & (weights < 1)
        if not np.any(transition):
            payload["warnings"].append(f"{field['name']}: 遷移帯に中間頂点がありません。範囲を広げるか、境界付近の細分化が必要です。")
        if not np.any(weights > 0):
            payload["warnings"].append(f"{field['name']}: 全頂点が固定境界上にあるため、このパーツは移動しません。")
        if np.any(~finite):
            payload["warnings"].append(f"{field['name']}: 境界へつながらない頂点は全体移動と同じ移動量を使います。")
        payload["parts"][str(part_id)] = {"part_id": field["part_id"], "ratio": float(ratio),
            "weights": weights.tolist(), "depth": field["depth"], "radius": radius,
            "boundary_vertices": int(np.count_nonzero(boundary)), "transition_vertices": int(np.count_nonzero(transition)),
            "unreachable_vertices": int(np.count_nonzero(~finite))}
    return payload


def apply_boundary_motion(parts, offsets, payload):
    offsets = validate_offsets(parts, offsets)
    result = []
    for part in parts:
        spec = payload["parts"].get(str(part.part_id))
        delta = np.asarray(offsets[str(part.part_id)])
        if spec is not None:
            delta = np.asarray(spec["weights"])[:, None] * delta
        result.append(replace(part, vertices=part.vertices + delta, faces=part.faces.copy()))
    return tuple(result)


def motion_metadata(payload):
    return {"method": payload["method"], "selected_ids": sorted(int(key) for key in payload["parts"]),
            "parts": {key: {name: value for name, value in spec.items() if name != "weights"}
                      for key, spec in payload["parts"].items()}}
