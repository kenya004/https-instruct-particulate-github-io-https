from __future__ import annotations

import hashlib
import io
import math
from dataclasses import dataclass, replace

import numpy as np
import trimesh


MIN_SCALE = 0.1
MAX_SCALE = 3.0
SCALE_STEP = 0.01


@dataclass(frozen=True)
class EditablePart:
    part_id: int
    name: str
    color: str
    geometry_name: str | None
    node_name: str | None
    vertices: np.ndarray
    faces: np.ndarray

    @property
    def center(self) -> np.ndarray | None:
        if not len(self.faces):
            return None
        return (self.vertices.min(axis=0) + self.vertices.max(axis=0)) / 2


def load_editable_parts(content: bytes, manifest: dict) -> tuple[EditablePart, ...]:
    parts = []
    seen = set()
    with np.load(io.BytesIO(content), allow_pickle=False) as data:
        for record in manifest["parts"]:
            part_id = record["part_id"]
            if type(part_id) is not int or part_id < 0 or part_id in seen:
                raise ValueError("編集対象のパーツIDが不正です。")
            seen.add(part_id)
            prefix = record.get("npz_prefix", f"part_{part_id:04d}")
            vertices = np.array(data[f"{prefix}_vertices"], dtype=np.float64, copy=True)
            faces = np.array(data[f"{prefix}_faces"], copy=True)
            if vertices.ndim != 2 or vertices.shape[1] != 3 or not np.isfinite(vertices).all():
                raise ValueError("編集対象の頂点データが不正です。")
            if faces.ndim != 2 or faces.shape[1] != 3 or faces.dtype.kind not in "iu":
                raise ValueError("編集対象の面データが不正です。")
            if len(faces) and (faces.min() < 0 or faces.max() >= len(vertices)):
                raise ValueError("編集対象の面インデックスが不正です。")
            if len(vertices) != record["vertex_count"] or len(faces) != record["face_count"]:
                raise ValueError("編集用NPZとパーツ対応表が一致しません。")
            vertices.setflags(write=False)
            faces = faces.astype(np.int64)
            faces.setflags(write=False)
            parts.append(EditablePart(part_id, record["name"], record["color"], record["geometry_name"], record["node_name"], vertices, faces))
    if not parts or not any(len(part.faces) for part in parts):
        raise ValueError("編集できるパーツがありません。")
    return tuple(parts)


def validate_scales(parts: tuple[EditablePart, ...], values: dict) -> dict[str, float]:
    if not isinstance(values, dict) or set(values) != {str(part.part_id) for part in parts}:
        raise ValueError("倍率とパーツIDの対応が不正です。")
    result = {}
    for part in parts:
        value = values[str(part.part_id)]
        if type(value) not in (int, float) or not math.isfinite(value) or not MIN_SCALE <= value <= MAX_SCALE:
            raise ValueError("倍率は0.1から3.0の範囲で指定してください。")
        if not len(part.faces) and value != 1:
            raise ValueError("面のないパーツは編集できません。")
        result[str(part.part_id)] = float(value)
    return result


def scale_parts(parts: tuple[EditablePart, ...], scales: dict) -> tuple[EditablePart, ...]:
    scales = validate_scales(parts, scales)
    edited = []
    for part in parts:
        center = part.center
        scale = scales[str(part.part_id)]
        vertices = part.vertices.copy()
        if center is not None and scale != 1:
            vertices = center + scale * (part.vertices - center)
        edited.append(replace(part, vertices=vertices, faces=part.faces.copy()))
    return tuple(edited)


def translation_controls(parts: tuple[EditablePart, ...]) -> dict[str, float]:
    nonempty = [part.vertices for part in parts if len(part.faces)]
    lower = np.min([vertices.min(axis=0) for vertices in nonempty], axis=0)
    upper = np.max([vertices.max(axis=0) for vertices in nonempty], axis=0)
    limit = float((upper - lower).max())
    if not math.isfinite(limit) or limit <= 0:
        limit = 1.0
    return {"limit": limit, "step": limit / 1000}


def validate_offsets(parts: tuple[EditablePart, ...], values: dict, *, limit: float | None = None) -> dict[str, list[float]]:
    if not isinstance(values, dict) or set(values) != {str(part.part_id) for part in parts}:
        raise ValueError("移動量とパーツIDの対応が不正です。")
    result = {}
    for part in parts:
        value = values[str(part.part_id)]
        if not isinstance(value, (list, tuple)) or len(value) != 3 or any(type(item) not in (int, float) or not math.isfinite(item) for item in value):
            raise ValueError("移動量にはX・Y・Zの有限な数値を指定してください。")
        if limit is not None and any(abs(item) > limit * (1 + 1e-12) for item in value):
            raise ValueError("移動量がスライダーの範囲外です。")
        if not len(part.faces) and any(item != 0 for item in value):
            raise ValueError("面のないパーツは移動できません。")
        result[str(part.part_id)] = [float(item) for item in value]
    return result


def translate_parts(parts: tuple[EditablePart, ...], offsets: dict) -> tuple[EditablePart, ...]:
    offsets = validate_offsets(parts, offsets)
    return tuple(replace(part, vertices=part.vertices + offsets[str(part.part_id)], faces=part.faces.copy()) for part in parts)


def editor_source_key(manifest: dict, content: bytes) -> str:
    identity = ":".join(manifest[key] for key in ("model_id", "plan_id", "segmentation_id"))
    return hashlib.sha256(identity.encode() + b":" + content).hexdigest()


def synchronize_editor(state: dict, source_key: str, parts: tuple[EditablePart, ...], event=None) -> dict:
    if state.get("source_key") != source_key:
        state.clear()
        state.update(source_key=source_key, scales={str(part.part_id): 1.0 for part in parts}, sequence=0)
    if state.get("offsets") is None:
        state["offsets"] = {str(part.part_id): [0.0, 0.0, 0.0] for part in parts}
    if event is not None:
        if not isinstance(event, dict):
            raise ValueError("編集イベントの形式が不正です。")
        if event.get("source_key") != source_key:
            return state
        sequence = event.get("sequence")
        if type(sequence) is not int or sequence < 1:
            raise ValueError("編集イベントの順序が不正です。")
        if sequence > state["sequence"]:
            scales = validate_scales(parts, event.get("scales"))
            offsets = validate_offsets(parts, event.get("offsets", state["offsets"]), limit=translation_controls(parts)["limit"])
            state.update(scales=scales, offsets=offsets, sequence=sequence)
    return state


def editor_payload(parts: tuple[EditablePart, ...]) -> list[dict]:
    return [{
        "part_id": part.part_id, "name": part.name, "color": part.color,
        "vertices": part.vertices.tolist(), "faces": part.faces.reshape(-1).tolist(),
        "center": None if part.center is None else part.center.tolist(),
    } for part in parts]


def export_edited_glb(parts: tuple[EditablePart, ...], *, source_key: str, scales: dict, connection_metadata: dict | None = None, offsets: dict | None = None) -> bytes:
    scene = trimesh.Scene()
    for part in parts:
        if not len(part.faces):
            continue
        mesh = trimesh.Trimesh(vertices=part.vertices.copy(), faces=part.faces.copy(), process=False)
        mesh.visual.face_colors = trimesh.visual.color.hex_to_rgba(part.color)
        mesh.metadata.update(part_id=part.part_id, part_name=part.name)
        scene.add_geometry(mesh, geom_name=part.geometry_name, node_name=part.node_name, transform=np.eye(4))
    scene.metadata.update(editor_source_key=source_key, uniform_scales=scales)
    if offsets is not None:
        scene.metadata["manual_translations"] = offsets
    if connection_metadata is not None:
        scene.metadata["connection_following"] = connection_metadata
    return scene.export(file_type="glb")
