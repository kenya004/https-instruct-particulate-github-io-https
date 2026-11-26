"""Manual displacement fading to zero at every original shared boundary."""
from __future__ import annotations

from collections import defaultdict
from dataclasses import replace

import numpy as np

from boundary_blending import DISTANCE_BASIS, RANGE_BASIS, EDIT_APPLICATION, _SurfaceQueries, boundary_anchor_samples, boundary_geometry, reference_distance_field
from editing import validate_offsets


METHOD = "reference_surface_translation_v3"
EDIT_METHOD = "edited_part_translation_v4"


def build_motion_distances(content, manifest, parts, connections, selected_ids=None):
    """Cache the closest connected reference surface for independent fixed motion."""
    if not connections:
        return {"parts": {}, "anchors": {}}
    points, local_ids = boundary_geometry(content, manifest, parts)
    selected = {part.part_id for part in parts} if selected_ids is None else set(selected_ids)
    if any(type(part_id) is not int or part_id not in {p.part_id for p in parts} for part_id in selected):
        raise ValueError("断面固定移動の対象パーツが不正です。")
    seeds = defaultdict(lambda: defaultdict(set))
    for connection in connections:
        for edge in connection.boundary_edges:
            for part_id in (connection.part_a, connection.part_b):
                reference = connection.part_b if part_id == connection.part_a else connection.part_a
                for vertex in edge:
                    seeds[part_id][vertex].add(reference)
    fields = {}
    queries = _SurfaceQueries(parts)
    for part in parts:
        if part.part_id not in selected or not seeds[part.part_id] or not len(part.faces):
            continue
        owners = {source: min(references) for source, references in seeds[part.part_id].items()}
        field = reference_distance_field(points, local_ids[part.part_id], part, owners, queries)
        if field is not None:
            fields[str(part.part_id)] = {key: value for key, value in field.items() if key != "references"}
    return {"parts": fields, "anchors": boundary_anchor_samples(points, local_ids, connections)}


def motion_weights(distances, ratios):
    """Smoothstep with one part-size-based transition width for all boundaries."""
    payload = {"method": METHOD, "distance_basis": DISTANCE_BASIS, "range_basis": RANGE_BASIS, "parts": {}, "anchors": distances["anchors"] if ratios else {}, "warnings": []}
    for part_id, ratio in ratios.items():
        field = distances["parts"].get(str(part_id))
        if field is None or type(ratio) not in (int, float) or not np.isfinite(ratio) or not 0 < ratio <= 1:
            raise ValueError("断面固定移動の対象パーツまたは範囲が不正です。")
        nearest = field["distances"]
        finite = np.isfinite(nearest)
        radius = float(ratio * field["part_size"])
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
            "weights": weights.tolist(), "depth": field["depth"], "radius": radius, "part_size": field["part_size"],
            "boundary_vertices": int(np.count_nonzero(boundary)), "transition_vertices": int(np.count_nonzero(transition)),
            "unreachable_vertices": field["unreachable_vertices"]}
    return payload


def apply_boundary_motion(parts, offsets, payload):
    offsets = validate_offsets(parts, offsets)
    result = []
    for part in parts:
        spec = payload["parts"].get(str(part.part_id))
        delta = np.asarray(offsets[str(part.part_id)])
        if spec is not None:
            delta = np.asarray(spec["weights"])[:, None] * delta
            for reference in spec.get("reference_influences", []):
                delta += np.asarray(reference["weights"])[:, None] * np.asarray(offsets[str(reference["reference_part_id"])])
        result.append(replace(part, vertices=part.vertices + delta, faces=part.faces.copy()))
    return tuple(result)


def motion_from_blending(blending):
    """Use the same band for scale and manual displacement.

    Edited-source blending only attenuates the part's own displacement. Legacy
    fixed-reference fields also inherit the selected reference's displacement.
    """
    own_edit = blending.get("application") == EDIT_APPLICATION
    payload = {"method": EDIT_METHOD if own_edit else METHOD,
               "application": EDIT_APPLICATION if own_edit else "fixed_reference",
               "distance_basis": DISTANCE_BASIS, "range_basis": RANGE_BASIS, "parts": {}, "anchors": blending["anchors"], "warnings": []}
    for part_id, field in blending["parts"].items():
        influences = field["influences"]
        if not influences:
            continue
        weights = np.clip(1 - np.sum([r["weights"] for r in influences], axis=0), 0, 1)
        payload["parts"][part_id] = {"part_id": field["part_id"], "ratio": blending["ratio"],
            "weights": weights.tolist(), "reference_influences": [] if own_edit else influences,
            "depth": field["depth"], "radius": field["radius"], "part_size": field["part_size"],
            "boundary_vertices": int(np.count_nonzero(weights == 0)),
            "transition_vertices": int(np.count_nonzero((weights > 0) & (weights < 1))),
            "unreachable_vertices": field["unreachable_vertices"]}
    return payload


def motion_metadata(payload):
    return {"method": payload["method"], "application": payload.get("application", "fixed_reference"),
            "distance_basis": payload["distance_basis"], "range_basis": payload["range_basis"], "selected_ids": sorted(int(key) for key in payload["parts"]),
            "parts": {key: {name: value for name, value in spec.items() if name not in {"weights", "reference_influences"}}
                      for key, spec in payload["parts"].items()}}
