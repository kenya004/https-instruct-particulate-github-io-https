from __future__ import annotations

import json
from urllib.parse import urlsplit

import requests


class BackendError(RuntimeError):
    pass


class BackendClient:
    def __init__(self, base_url: str):
        self.base_url = base_url.strip().rstrip("/")
        parsed = urlsplit(self.base_url)
        if parsed.scheme not in {"http", "https"} or not parsed.netloc or parsed.query or parsed.fragment:
            raise BackendError("接続先のURLを確認してください。")

    def _request(self, method: str, path: str, **kwargs) -> dict:
        try:
            response = requests.request(method, self.base_url + path, timeout=(10, 600), **kwargs)
        except requests.RequestException as error:
            raise BackendError("推論サーバーに接続できません。接続先とWSL側の起動状態を確認してください。") from error
        try:
            data = response.json()
        except ValueError as error:
            raise BackendError("推論サーバーからJSON形式の応答を受信できませんでした。") from error
        if not response.ok:
            detail = data.get("detail", data) if isinstance(data, dict) else data
            message = detail if isinstance(detail, str) else json.dumps(detail, ensure_ascii=False)
            raise BackendError(f"HTTP {response.status_code}: {message}")
        if not isinstance(data, dict):
            raise BackendError("推論サーバーの応答形式を確認してください。")
        return data

    def register(self, filename: str, content: bytes, edit_request: str, up_dir: str) -> dict:
        return self._request(
            "POST", "/models", files={"file": (filename, content, "model/gltf-binary")},
            data={"edit_request": edit_request, "up_dir": up_dir},
        )

    def recognize(self, model_id: str) -> dict:
        return self._request("POST", f"/models/{model_id}/recognize", params={"retry": "true"})

    def plan(self, model_id: str, edit_request: str) -> dict:
        return self._request("POST", f"/models/{model_id}/parts", json={"edit_request": edit_request})

    def segment(self, model_id: str, plan_id: str, options: dict) -> dict:
        return self._request("POST", f"/models/{model_id}/plans/{plan_id}/segment", json=options)

    def download_artifact(self, result: dict, filename: str) -> bytes:
        if filename not in {"parts.glb", "parts.npz", "parts.json"}:
            raise BackendError("取得するファイル名を確認してください。")
        path = f"/models/{result['model_id']}/plans/{result['plan_id']}/segmentations/{result['segmentation_id']}/files/{filename}"
        try:
            response = requests.request("GET", self.base_url + path, timeout=(10, 600))
        except requests.RequestException as error:
            raise BackendError("分割結果を取得できません。WSL側の起動状態を確認してください。") from error
        if not response.ok:
            raise BackendError(f"分割結果の取得に失敗しました（HTTP {response.status_code}）。")
        return response.content
