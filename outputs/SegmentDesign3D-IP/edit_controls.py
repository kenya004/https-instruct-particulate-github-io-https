"""Resolve the text planner's parameter whitelist without hiding mesh geometry."""
import numpy as np


PARAMETERS = ("uniform_scale", "translate_u", "translate_v", "translate_n")
PARAMETER_LABELS = dict(zip(PARAMETERS, ("一様倍率", "U移動", "V移動", "N移動")))


def _selection(records):
    if all(p.get("edit_parameters") is None and p.get("parameter_reason") is None for p in records):
        return None
    selected = {}
    for part in records:
        part_id, parameters, reason = part["part_id"], part.get("edit_parameters"), part.get("parameter_reason")
        if (type(part_id) is not int or part_id in selected or not isinstance(parameters, list)
                or any(not isinstance(p, str) or p not in PARAMETERS for p in parameters)
                or len(set(parameters)) != len(parameters)
                or not isinstance(reason, str) or not reason.strip()
                or type(part.get("is_edit_target")) is not bool
                or (not part["is_edit_target"] and parameters)):
            raise ValueError("編集パラメータの選択結果が不正です。パーツ構成を再作成してください。")
        selected[part_id] = {"parameters": [p for p in PARAMETERS if p in parameters], "reason": reason.strip()}
    return selected


def controls_for(manifest, analysis=None):
    records = manifest["parts"]
    selected = _selection(records)
    if selected is None and analysis is not None:
        candidate = _selection(analysis["parts"])
        if candidate is not None:
            if any(analysis.get(k) != manifest.get(k) for k in ("model_id", "plan_id")):
                raise ValueError("編集パラメータの分析と分割結果が一致しません。")
            if {p["part_id"]: p["name"] for p in records} != {p["part_id"]: p["name"] for p in analysis["parts"]}:
                raise ValueError("編集パラメータとパーツIDの対応が一致しません。")
            selected = candidate
    legacy = selected is None
    if legacy:
        selected = {p["part_id"]: {"parameters": list(PARAMETERS), "reason": "以前の分析結果：全操作を表示"} for p in records}
    return {"version": 1, "source": "legacy_all" if legacy else "part_planner_text",
            "parts": {str(p["part_id"]): selected[p["part_id"]] for p in records}}


def parameter_text(part):
    parameters = part.get("edit_parameters")
    if parameters is None:
        return "未選択（以前の分析結果）"
    return "、".join(PARAMETER_LABELS[p] for p in parameters) or "なし"


def validate_control_changes(parts, before_scales, before_offsets, scales, offsets, controls, frames=None, reset=False):
    if controls is None or controls["source"] == "legacy_all":
        return
    if reset:
        if any(scales[str(p.part_id)] != 1 or any(offsets[str(p.part_id)]) for p in parts):
            raise ValueError("初期化イベントに初期値以外が含まれています。")
        return
    extent = max((float(np.ptp(p.vertices, axis=0).max()) for p in parts if len(p.faces)), default=1.)
    for part in parts:
        key = str(part.part_id)
        allowed = controls["parts"][key]["parameters"]
        if "uniform_scale" not in allowed and scales[key] != before_scales[key]:
            raise ValueError("分析で選択されていない倍率操作です。")
        delta = np.asarray(offsets[key]) - before_offsets[key]
        local = np.asarray(frames[key]["basis"]) @ delta if frames is not None else delta
        if any(abs(local[i]) > extent * 1e-10 for i, name in enumerate(PARAMETERS[1:]) if name not in allowed):
            raise ValueError("分析で選択されていない方向への移動です。")
