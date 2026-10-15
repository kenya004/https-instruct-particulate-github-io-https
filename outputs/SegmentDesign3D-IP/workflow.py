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
