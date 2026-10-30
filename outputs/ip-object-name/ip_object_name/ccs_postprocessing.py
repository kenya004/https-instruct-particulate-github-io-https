from __future__ import annotations

import hashlib
import json
from dataclasses import asdict, dataclass
from pathlib import Path
from time import perf_counter
from uuid import uuid4

import numpy as np
import trimesh
from scipy.sparse import coo_matrix
from scipy.sparse.csgraph import connected_components
from scipy.spatial import cKDTree

from .segmentation import ARTIFACTS, MeshPartition, artifact_path, export_partition, load_plan
from .store import ModelStore, error_details, utc_now, write_json


@dataclass(frozen=True)
class CCSOptions:
    max_iterations: int = 5

    def __post_init__(self):
        if type(self.max_iterations) is not int or not 1 <= self.max_iterations <= 30:
            raise ValueError("CCS max_iterations must be an integer between 1 and 30.")


def _component_counts(face_adjacency: np.ndarray, labels: np.ndarray, num_parts: int) -> list[int]:
    edges = face_adjacency[labels[face_adjacency[:, 0]] == labels[face_adjacency[:, 1]]]
    graph = coo_matrix((np.ones(len(edges)), (edges[:, 0], edges[:, 1])), shape=(len(labels), len(labels))).tocsr()
    _, components = connected_components(graph, directed=False)
    _, first = np.unique(components, return_index=True)
    return np.bincount(labels[first], minlength=num_parts).astype(int).tolist()


def _spheres(points: np.ndarray, labels: np.ndarray, num_parts: int) -> list[dict]:
    spheres = []
    for part_id in range(num_parts):
        indices = np.flatnonzero(labels == part_id)
        if not len(indices):
            spheres.append({"part_id": part_id, "center": None, "radius": None})
            continue
        center = points[indices].mean(axis=0)
        radius = float(np.linalg.norm(points[indices] - center, axis=1).max())
        spheres.append({"part_id": part_id, "center": center.tolist(), "radius": radius})
    return spheres


def refine_face_labels(vertices, faces, face_part_ids, num_parts: int, options: CCSOptions) -> tuple[np.ndarray, dict]:
    started = perf_counter()
    vertices, faces, original = np.asarray(vertices), np.asarray(faces), np.asarray(face_part_ids)
    if vertices.ndim != 2 or vertices.shape[1] != 3 or not len(vertices) or not np.isfinite(vertices).all():
        raise ValueError("Invalid CCS input vertices.")
    if faces.ndim != 2 or faces.shape[1] != 3 or not len(faces) or faces.dtype.kind not in "iu":
        raise ValueError("CCS requires a nonempty triangle mesh.")
    if faces.min() < 0 or faces.max() >= len(vertices):
        raise ValueError("Invalid CCS face vertex indices.")
    if not 1 <= num_parts <= 32 or original.shape != (len(faces),) or original.dtype.kind not in "iu" or original.min() < 0 or original.max() >= num_parts:
        raise ValueError("Every CCS input face must have one valid part ID.")
    labels = original.astype(np.int32, copy=True)
    points = np.asarray(vertices[faces], dtype=np.float64).mean(axis=1)
    before_spheres = _spheres(points, labels, num_parts)
    counts_before = np.bincount(labels, minlength=num_parts)
    mesh = trimesh.Trimesh(vertices=vertices, faces=faces, process=False)
    adjacency = np.asarray(mesh.face_adjacency, dtype=np.int64).reshape(-1, 2)
    components_before = _component_counts(adjacency, labels, num_parts)
    scale = float(np.linalg.norm(np.ptp(points, axis=0)))
    distance_tolerance = max(scale, np.finfo(float).tiny) * 1e-12
    skipped = {}
    iterations = []
    seen = {hashlib.sha256(labels.tobytes()).digest()}
    stop_reason = "max_iterations"

    def skip(left, right, reason):
        key = (left, right, reason)
        skipped[key] = skipped.get(key, 0) + 1

    for iteration in range(options.max_iterations):
        previous = labels.copy()
        changed_assignments = 0
        overlapping_pairs = 0
        # Stable pair order and frozen anchors within a pair make comparisons reproducible.
        for left in range(num_parts - 1):
            for right in range(left + 1, num_parts):
                left_ids, right_ids = np.flatnonzero(labels == left), np.flatnonzero(labels == right)
                if not len(left_ids) or not len(right_ids):
                    skip(left, right, "empty_part")
                    continue
                left_points, right_points = points[left_ids], points[right_ids]
                left_center, right_center = left_points.mean(axis=0), right_points.mean(axis=0)
                left_radius = np.linalg.norm(left_points - left_center, axis=1).max()
                right_radius = np.linalg.norm(right_points - right_center, axis=1).max()
                if np.linalg.norm(left_center - right_center) >= left_radius + right_radius:
                    continue
                overlapping_pairs += 1
                left_overlap = np.linalg.norm(left_points - right_center, axis=1) < right_radius
                right_overlap = np.linalg.norm(right_points - left_center, axis=1) < left_radius
                candidates = np.concatenate((left_ids[left_overlap], right_ids[right_overlap]))
                if not len(candidates):
                    skip(left, right, "no_points_in_overlap")
                    continue
                left_anchors, right_anchors = left_points[~left_overlap], right_points[~right_overlap]
                if not len(left_anchors) or not len(right_anchors):
                    skip(left, right, "no_anchors_outside_overlap")
                    continue
                left_distances, _ = cKDTree(left_anchors).query(points[candidates], k=1)
                right_distances, _ = cKDTree(right_anchors).query(points[candidates], k=1)
                tied = np.isclose(left_distances, right_distances, rtol=1e-12, atol=distance_tolerance)
                assignments = np.where(left_distances < right_distances, left, right).astype(np.int32)
                assignments[tied] = labels[candidates[tied]]
                # Both parts retain their anchors; keep a defensive nonempty check as well.
                remaining_left = len(left_ids) - np.count_nonzero(labels[candidates] == left) + np.count_nonzero(assignments == left)
                remaining_right = len(right_ids) - np.count_nonzero(labels[candidates] == right) + np.count_nonzero(assignments == right)
                if remaining_left == 0 or remaining_right == 0:
                    skip(left, right, "would_empty_part")
                    continue
                changed_assignments += int(np.count_nonzero(labels[candidates] != assignments))
                labels[candidates] = assignments
        changed_this_iteration = int(np.count_nonzero(labels != previous))
        iterations.append({"iteration": iteration + 1, "overlapping_pairs": overlapping_pairs,
                           "changed_assignments": changed_assignments, "changed_faces": changed_this_iteration})
        if not changed_this_iteration:
            stop_reason = "unchanged"
            break
        state_hash = hashlib.sha256(labels.tobytes()).digest()
        if state_hash in seen:
            stop_reason = "cycle_detected"
            break
        seen.add(state_hash)

    counts_after = np.bincount(labels, minlength=num_parts)
    if np.any((counts_before > 0) & (counts_after == 0)):
        raise ValueError("CCS must not empty a previously nonempty part.")
    components_after = _component_counts(adjacency, labels, num_parts)
    diagnostics = {
        "method": "ccs_face_centroids_v1", "representatives": "triangle_centroids",
        "paper_doi": "10.1007/s42979-025-04248-y", "paper_algorithm_reproduction": False,
        "cluster_merging": False, "options": asdict(options), "elapsed_seconds": perf_counter() - started,
        "changed_faces": int(np.count_nonzero(labels != original)), "stop_reason": stop_reason,
        "iterations": iterations, "spheres_before": before_spheres, "spheres_after": _spheres(points, labels, num_parts),
        "component_definition": "shared mesh edges; no distance bridges or vertex welding",
        "parts": [{"part_id": index, "faces_before": int(counts_before[index]), "faces_after": int(counts_after[index]),
                   "components_before": components_before[index], "components_after": components_after[index]}
                  for index in range(num_parts)],
        "skipped_pairs": [{"part_ids": [left, right], "reason": reason, "occurrences": count}
                          for (left, right, reason), count in sorted(skipped.items())],
    }
    return labels, diagnostics


def refine_saved_segmentation(store: ModelStore, model_id: str, plan_id: str, parent_id: str, options: CCSOptions) -> dict:
    metadata, plan, folder = load_plan(store, model_id, plan_id)
    source_path = artifact_path(store, model_id, plan_id, parent_id, "parts.npz")
    manifest_path = artifact_path(store, model_id, plan_id, parent_id, "parts.json")
    parent = json.loads(manifest_path.read_text(encoding="utf-8"))
    if parent["source_sha256"] != plan["source_sha256"]:
        raise ValueError("The source segmentation does not match the registered model.")
    expected_parts = [(part["part_id"], part["name"]) for part in plan["parts"]]
    if [(part["part_id"], part["name"]) for part in parent["parts"]] != expected_parts:
        raise ValueError("The source segmentation's parts do not match the plan.")
    segmentation_id = uuid4().hex
    run_dir = folder / "segmentations" / segmentation_id
    run_dir.mkdir(parents=True)
    write_json(run_dir / "request.json", {
        "model_id": model_id, "plan_id": plan_id, "segmentation_id": segmentation_id,
        "parent_segmentation_id": parent_id, "method": "ccs_face_centroids_v1", "options": asdict(options), "created_at": utc_now(),
    })
    started = perf_counter()
    try:
        with np.load(source_path, allow_pickle=False) as data:
            vertices, faces, original_labels = data["vertices"], data["faces"], data["face_part_ids"]
        labels, diagnostics = refine_face_labels(vertices, faces, original_labels, len(plan["parts"]), options)
        partition = MeshPartition(vertices, faces, labels, {**parent.get("diagnostics", {}), "ccs": diagnostics})
        result = export_partition(partition, plan, run_dir, segmentation_id)
        result.update(parent_segmentation_id=parent_id, method="ccs_face_centroids_v1", postprocessing=diagnostics,
                      options=parent.get("options", {}))
        for item in diagnostics["parts"]:
            if item["components_after"] > item["components_before"]:
                result["warnings"].append(f"{plan['parts'][item['part_id']]['name']}: 補正後に連結成分が増えています。")
        if diagnostics["skipped_pairs"]:
            result["warnings"].append("一部のパーツの組をスキップしました。補正診断で理由を確認できます。")
        if diagnostics["stop_reason"] in {"cycle_detected", "max_iterations"}:
            result["warnings"].append("CCS補正は反復上限または状態の繰り返しで終了しました。収束は保証されません。")
        if not diagnostics["changed_faces"]:
            result["warnings"].append("CCS補正による面の所属変更はありませんでした。")
        base = f"/models/{model_id}/plans/{plan_id}/segmentations/{segmentation_id}/files"
        result["files"] = {name: f"{base}/{name}" for name in ARTIFACTS}
        result["total_processing_seconds"] = perf_counter() - started
        write_json(run_dir / "parts.json", result)
        write_json(folder / "ccs_refinement.json", result)
        metadata.update(ccs_status="completed", latest_ccs_segmentation_id=segmentation_id,
                        ccs_source_segmentation_id=parent_id, ccs_plan_id=plan_id)
        store.save(metadata)
        return result
    except Exception as error:
        write_json(run_dir / "error.json", error_details(error))
        metadata.update(ccs_status="failed", latest_ccs_segmentation_id=segmentation_id,
                        ccs_source_segmentation_id=parent_id, ccs_plan_id=plan_id)
        store.save(metadata)
        raise
