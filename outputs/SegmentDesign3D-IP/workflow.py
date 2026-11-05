from __future__ import annotations

import hashlib
from typing import Callable

from backend_client import BackendClient

REFINEMENT_ORDERS = {
    "boundary_then_ccs": ("boundary_refinement", "ccs_refinement"),
    "ccs_then_boundary": ("ccs_refinement", "boundary_refinement"),
}
ORDER_LABELS = {"boundary_then_ccs": "2辺共有補正 → CCS補正", "ccs_then_boundary": "CCS補正 → 2辺共有補正"}
STAGE_LABELS = {"boundary_refinement": "2辺共有補正後", "ccs_refinement": "CCS補正後"}


def clear_refinements(state: dict):
    for key in ("boundary_refinement", "ccs_refinement", "refinement_runs"):
        state.pop(key, None)


def input_identity(filename: str, content: bytes, up_dir: str, base_url: str) -> str:
    digest = hashlib.sha256(content).hexdigest()
    return repr((filename, digest, up_dir, base_url.strip().rstrip("/")))


def prepare_parts(
    state: dict, client: BackendClient, *, filename: str, content: bytes,
    edit_request: str, up_dir: str, progress: Callable[[str], None],
) -> dict:
    request = edit_request.strip()
    if not request:
        raise ValueError("編集要求を入力してください。")
    identity = input_identity(filename, content, up_dir, client.base_url)
    if state.get("input_identity") != identity:
        state.clear()
        state["input_identity"] = identity
    state.pop("plan", None)
    state.pop("segmentation", None)
    clear_refinements(state)
    if not state.get("model_id"):
        progress("モデルを保存しています")
        model = client.register(filename, content, request, up_dir)
        state["model_id"] = model["model_id"]
    if not state.get("object_name"):
        progress("オブジェクト名を推定しています")
        model = client.recognize(state["model_id"])
        state["object_name"] = model["object_name"]
    progress("パーツ構成を作成しています")
    plan = client.plan(state["model_id"], request)
    state["plan"] = plan
    return plan


def segment_parts(state: dict, client: BackendClient, *, options: dict, progress: Callable[[str], None]) -> dict:
    plan = state.get("plan")
    if not plan:
        raise ValueError("先にパーツ構成を作成してください。")
    previous = state.get("segmentation")
    filenames = ("parts.glb", "parts.npz", "parts.json")
    # Resume interrupted downloads without spending GPU time on a second inference.
    if not previous or previous["result"]["plan_id"] != plan["plan_id"] or all(name in previous["artifacts"] for name in filenames):
        progress("モデルを分割しています")
        result = client.segment(plan["model_id"], plan["plan_id"], options)
        if result.get("status") != "completed" or (result.get("model_id"), result.get("plan_id")) != (plan["model_id"], plan["plan_id"]):
            raise ValueError("分割結果と入力モデル・パーツ構成の対応を確認できません。")
        previous = {"result": result, "artifacts": {}}
        clear_refinements(state)
        state["segmentation"] = previous
    for filename in filenames:
        if filename not in previous["artifacts"]:
            progress(f"分割結果を取得しています：{filename}")
            previous["artifacts"][filename] = client.download_artifact(previous["result"], filename)
    return previous


def boundary_already_applied(result: dict) -> bool:
    return result.get("diagnostics", {}).get("connectivity", {}).get("boundary_regularization") is not None


def _is_child(child: dict, parent: dict) -> bool:
    result, original = child["result"], parent["result"]
    return (result.get("model_id"), result.get("plan_id"), result.get("parent_segmentation_id")) == (
        original["model_id"], original["plan_id"], original["segmentation_id"])


def get_refinement_order(state: dict) -> str:
    order = state.get("refinement_order")
    if order is not None:
        if order not in REFINEMENT_ORDERS:
            raise ValueError("補正の順序を確認してください。")
        return order
    # Retain results from sessions that previously ran CCS directly on the input.
    root, ccs, boundary = state.get("segmentation"), state.get("ccs_refinement"), state.get("boundary_refinement")
    if root and ccs and _is_child(ccs, root) and (not boundary or _is_child(boundary, ccs)):
        return "ccs_then_boundary"
    return "boundary_then_ccs"


def _remember_active_run(state: dict):
    order = get_refinement_order(state)
    state.setdefault("refinement_runs", {})[order] = {
        key: state[key] for key in STAGE_LABELS if key in state
    }


def set_refinement_order(state: dict, order: str):
    if order not in REFINEMENT_ORDERS:
        raise ValueError("補正の順序を確認してください。")
    _remember_active_run(state)
    selected = state["refinement_runs"].get(order, {}).copy()
    for key in STAGE_LABELS:
        state.pop(key, None)
    state.update(selected)
    state["refinement_order"] = order


def result_stages(state: dict) -> list[tuple[str, dict]]:
    source = state.get("segmentation")
    if not source:
        return []
    stages = [("分割直後", source)]
    for key in REFINEMENT_ORDERS[get_refinement_order(state)]:
        result = state.get(key)
        if not result or not _is_child(result, source):
            break
        stages.append((STAGE_LABELS[key], result))
        source = result
    return stages


def refinement_input(state: dict, key: str) -> dict:
    source = state.get("segmentation")
    if not source:
        raise ValueError("先にモデルを分割してください。")
    first, second = REFINEMENT_ORDERS[get_refinement_order(state)]
    if key not in (first, second):
        raise ValueError("補正の種類を確認してください。")
    if key == second:
        previous = state.get(first)
        if not previous:
            raise ValueError(f"先に{STAGE_LABELS[first].removesuffix('後')}を実行してください。")
        if not _is_child(previous, source):
            raise ValueError("前段の結果と現在の分割結果が一致しません。前段の補正を再実行してください。")
        source = previous
    if not all(name in source["artifacts"] for name in ("parts.glb", "parts.npz", "parts.json")):
        raise ValueError("先に入力元の結果取得を再開してください。")
    return source


def ccs_input(state: dict) -> dict:
    return refinement_input(state, "ccs_refinement")


def _refine_parts(state, client, source, *, key, execute, label, progress):
    plan = state.get("plan")
    if not source or not plan:
        raise ValueError("先にモデルを分割してください。")
    original = source["result"]
    if (original["model_id"], original["plan_id"]) != (plan["model_id"], plan["plan_id"]):
        raise ValueError("分割結果と現在のパーツ構成が一致しません。")
    previous = state.get(key)
    filenames = ("parts.glb", "parts.npz", "parts.json")
    if not previous or previous["result"].get("parent_segmentation_id") != original["segmentation_id"] or all(name in previous["artifacts"] for name in filenames):
        progress(f"{label}を実行しています")
        result = execute(original)
        if result.get("status") != "completed" or (result.get("model_id"), result.get("plan_id"), result.get("parent_segmentation_id")) != (original["model_id"], original["plan_id"], original["segmentation_id"]):
            raise ValueError(f"{label}結果と元の分割結果の対応を確認できません。")
        previous = {"result": result, "artifacts": {}}
        state[key] = previous
        first, second = REFINEMENT_ORDERS[get_refinement_order(state)]
        if key == first:
            state.pop(second, None)
        _remember_active_run(state)
    for filename in filenames:
        if filename not in previous["artifacts"]:
            progress(f"{label}結果を取得しています：{filename}")
            previous["artifacts"][filename] = client.download_artifact(previous["result"], filename)
    return previous


def refine_parts_boundary(state: dict, client: BackendClient, *, progress: Callable[[str], None]) -> dict:
    source = refinement_input(state, "boundary_refinement")
    if source and boundary_already_applied(source["result"]):
        raise ValueError("この結果には旧版の自動境界補正が含まれます。一度再分割してください。")
    return _refine_parts(state, client, source, key="boundary_refinement", execute=client.refine_boundary,
                         label="2辺共有補正", progress=progress)


def refine_parts_ccs(state: dict, client: BackendClient, *, options: dict, progress: Callable[[str], None]) -> dict:
    return _refine_parts(state, client, ccs_input(state), key="ccs_refinement",
                         execute=lambda original: client.refine_ccs(original, options), label="CCS補正", progress=progress)
