from __future__ import annotations

import hashlib
from typing import Callable

from backend_client import BackendClient


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
        state["segmentation"] = previous
    for filename in filenames:
        if filename not in previous["artifacts"]:
            progress(f"分割結果を取得しています：{filename}")
            previous["artifacts"][filename] = client.download_artifact(previous["result"], filename)
    return previous
