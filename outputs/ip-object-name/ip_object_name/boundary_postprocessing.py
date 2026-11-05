from __future__ import annotations

import json
from time import perf_counter
from uuid import uuid4

import numpy as np

from .connectivity import BOUNDARY_METHOD, refine_two_edge_boundary
from .segmentation import ARTIFACTS, MeshPartition, artifact_path, export_partition, load_plan
from .store import ModelStore, error_details, utc_now, write_json


def refine_saved_boundary(store: ModelStore, model_id: str, plan_id: str, parent_id: str) -> dict:
    metadata, plan, folder = load_plan(store, model_id, plan_id)
    source_path = artifact_path(store, model_id, plan_id, parent_id, "parts.npz")
    parent = json.loads(artifact_path(store, model_id, plan_id, parent_id, "parts.json").read_text(encoding="utf-8"))
    if ((parent.get("model_id"), parent.get("plan_id"), parent.get("segmentation_id")) != (model_id, plan_id, parent_id)
            or parent.get("status") != "completed" or parent.get("source_sha256") != plan["source_sha256"]):
        raise ValueError("The source segmentation does not match the registered model and plan.")
    if [(part["part_id"], part["name"]) for part in parent["parts"]] != [(part["part_id"], part["name"]) for part in plan["parts"]]:
        raise ValueError("The source segmentation's parts do not match the plan.")
    if parent.get("diagnostics", {}).get("connectivity", {}).get("boundary_regularization") is not None:
        raise ValueError("旧版の自動補正記録を含む結果は、更新後に再分割してください。")

    segmentation_id = uuid4().hex
    run_dir = folder / "segmentations" / segmentation_id
    run_dir.mkdir(parents=True)
    write_json(run_dir / "request.json", {
        "model_id": model_id, "plan_id": plan_id, "segmentation_id": segmentation_id,
        "parent_segmentation_id": parent_id, "method": BOUNDARY_METHOD, "created_at": utc_now(),
    })
    started = perf_counter()
    try:
        with np.load(source_path, allow_pickle=False) as data:
            vertices, faces, original_labels = data["vertices"], data["faces"], data["face_part_ids"]
        labels, diagnostics = refine_two_edge_boundary(vertices, faces, original_labels, len(plan["parts"]))
        partition = MeshPartition(vertices, faces, labels, {**parent.get("diagnostics", {}), "boundary": diagnostics})
        result = export_partition(partition, plan, run_dir, segmentation_id)
        result.update(parent_segmentation_id=parent_id, method=BOUNDARY_METHOD, postprocessing=diagnostics,
                      options=parent.get("options", {}))
        history = parent.get("processing_order", [parent["method"]] if parent.get("method") else [])
        result["processing_order"] = [*history, BOUNDARY_METHOD]
        if diagnostics["unresolved_boundary_faces"]:
            result["warnings"].append(
                f"2辺共有の条件を満たせない境界Faceが{diagnostics['unresolved_boundary_faces']}面残っています。"
                "パーツの存続・移動先との共有Edge数を優先し、未解消の面を保持しています。")
        if not diagnostics["changed_faces"]:
            result["warnings"].append("2辺共有の条件で移動できる境界Faceはありませんでした。")
        base = f"/models/{model_id}/plans/{plan_id}/segmentations/{segmentation_id}/files"
        result["files"] = {name: f"{base}/{name}" for name in ARTIFACTS}
        result["total_processing_seconds"] = perf_counter() - started
        write_json(run_dir / "parts.json", result)
        write_json(folder / "boundary_refinement.json", result)
        metadata.update(boundary_status="completed", latest_boundary_segmentation_id=segmentation_id,
                        boundary_source_segmentation_id=parent_id, boundary_plan_id=plan_id)
        store.save(metadata)
        return result
    except Exception as error:
        write_json(run_dir / "error.json", error_details(error))
        metadata.update(boundary_status="failed", latest_boundary_segmentation_id=segmentation_id,
                        boundary_source_segmentation_id=parent_id, boundary_plan_id=plan_id)
        store.save(metadata)
        raise
