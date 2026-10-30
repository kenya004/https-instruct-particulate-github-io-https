from __future__ import annotations

import json
import os

import numpy as np
import streamlit as st

from backend_client import BackendClient, BackendError
from viewer import load_mesh_payloads, load_segmented_payloads, mesh_figure
from workflow import input_identity, prepare_parts, refine_parts_ccs, segment_parts


st.set_page_config(page_title="SegmentDesign3D IP", layout="wide")
st.markdown("""
<style>
[data-testid="stToolbar"], [data-testid="stDecoration"], footer {display:none;}
.block-container {padding:1rem 1.4rem 1.5rem; max-width:1500px;}
h1 {font-size:1.55rem!important; font-weight:650!important; letter-spacing:0!important;}
h2 {font-size:1.05rem!important; letter-spacing:0!important;}
h3 {font-size:1.05rem!important; letter-spacing:0!important;}
[data-testid="stVerticalBlock"] {gap:0.65rem;}
[data-testid="stFileUploaderDropzone"] {min-height:4.5rem;}
button {border-radius:4px!important;}
</style>
""", unsafe_allow_html=True)
st.title("SegmentDesign3D IP")

with st.sidebar:
    st.subheader("接続設定")
    base_url = st.text_input("推論サーバー", value=os.getenv("IP_BACKEND_URL", "http://localhost:8004"), key="backend_url")

if "preparation" not in st.session_state:
    st.session_state.preparation = {}
state = st.session_state.preparation
left, right = st.columns([1, 1.65], gap="large")

with left:
    st.subheader("入力")
    uploaded = st.file_uploader("GLBモデル", type=["glb"], key="model_file")
    up_dir = st.selectbox("モデルの上方向", ["+Z", "-Z", "+Y", "-Y", "+X", "-X"], key="up_dir")
    request = st.text_area("編集要求", height=170, max_chars=4000, key="edit_request")

content = uploaded.getvalue() if uploaded is not None else None
if content is None:
    state.clear()
elif state.get("input_identity") != input_identity(uploaded.name, content, up_dir, base_url):
    state.clear()
if state.get("plan") and state["plan"].get("edit_request") != request.strip():
    state.pop("plan", None)
    state.pop("segmentation", None)
    state.pop("ccs_refinement", None)

meshes = None
preview_error = None
if content is not None:
    try:
        meshes = load_mesh_payloads(content)
    except Exception:
        preview_error = "GLBを読み込めません。メッシュを含むファイルか確認してください。"

with left:
    submit = st.button("パーツ構成を作成", icon=":material/account_tree:", type="primary", width="stretch", disabled=not content or not request.strip() or preview_error is not None)
    if preview_error:
        st.error(preview_error)
    if submit:
        with st.status("処理を開始しています", expanded=True) as status:
            try:
                client = BackendClient(base_url)
                prepare_parts(
                    state, client, filename=uploaded.name, content=content,
                    edit_request=request, up_dir=up_dir,
                    progress=lambda label: status.update(label=label),
                )
                status.update(label="パーツ構成を作成しました", state="complete", expanded=False)
            except (BackendError, ValueError) as error:
                status.update(label="処理を完了できませんでした", state="error", expanded=True)
                st.error(str(error))
    st.subheader("オブジェクト")
    st.write(state.get("object_name") or "未推定")
    if state.get("model_id"):
        st.caption(f"ID: {state['model_id']}")

with right:
    st.subheader("入力モデル")
    if meshes:
        st.plotly_chart(mesh_figure(meshes, up_dir=up_dir), width="stretch", config={"displaylogo": False})
    else:
        with st.container(height=430, border=False):
            st.caption("未選択")

st.divider()
title, download = st.columns([4, 1])
with title:
    st.subheader("パーツ構成")
plan = state.get("plan")
if plan:
    st.write(plan["summary"])
    rows = [
        {"ID": part["part_id"], "パーツ名": part["name"], "形状の説明": part["description"], "編集対象": part["is_edit_target"]}
        for part in plan["parts"]
    ]
    st.dataframe(rows, hide_index=True, width="stretch")
    for warning in plan.get("warnings", []):
        st.warning(warning)
    with download:
        st.download_button("JSON", json.dumps(plan, ensure_ascii=False, indent=2), file_name=f"part_plan_{plan['model_id']}.json", mime="application/json", icon=":material/download:", width="stretch")
else:
    st.caption("未作成")

if plan:
    st.divider()
    st.subheader("分割結果")
    controls, display = st.columns([1, 2], gap="large")
    with controls:
        with st.expander("推論設定"):
            points_per_face = st.number_input("面ごとの推論点数", min_value=1, max_value=8, value=1, step=1)
            batch_size = st.selectbox("推論バッチサイズ", [512, 1024, 2048, 4096, 8192], index=2)
            connectivity = st.checkbox("パーツごとの連結性を強制", value=True)
        previous_segment = state.get("segmentation")
        segment_label = "分割を実行"
        if previous_segment:
            segment_label = "再分割" if all(name in previous_segment["artifacts"] for name in ("parts.glb", "parts.npz", "parts.json")) else "結果の取得を再開"
        if st.button(segment_label, icon=":material/scatter_plot:", width="stretch", key="segment"):
            with st.status("分割処理を開始しています", expanded=True) as status:
                try:
                    segment_parts(state, BackendClient(base_url), options={
                        "points_per_face": points_per_face, "query_batch_size": batch_size,
                        "strict_face_postprocess": True, "enforce_connectivity_per_part": connectivity,
                    }, progress=lambda label: status.update(label=label))
                    status.update(label="分割結果を取得しました", state="complete", expanded=False)
                except (BackendError, ValueError) as error:
                    status.update(label="分割処理を完了できませんでした", state="error", expanded=True)
                    st.error(str(error))
    segmentation = state.get("segmentation")
    if segmentation:
        with controls:
            with st.expander("CCS補正設定"):
                ccs_iterations = st.number_input("CCS最大反復数", min_value=1, max_value=30, value=5, step=1, key="ccs_iterations")
            previous_ccs = state.get("ccs_refinement")
            ccs_label = "CCS補正を実行"
            if previous_ccs and not all(name in previous_ccs["artifacts"] for name in ("parts.glb", "parts.npz", "parts.json")):
                ccs_label = "CCS結果の取得を再開"
            if st.button(ccs_label, icon=":material/auto_fix_high:", width="stretch", key="refine_ccs"):
                with st.status("CCS補正を開始しています", expanded=True) as status:
                    try:
                        refine_parts_ccs(state, BackendClient(base_url), options={"max_iterations": ccs_iterations}, progress=lambda label: status.update(label=label))
                        status.update(label="CCS補正結果を取得しました", state="complete", expanded=False)
                    except (BackendError, ValueError) as error:
                        status.update(label="CCS補正を完了できませんでした", state="error", expanded=True)
                        st.error(str(error))
        refinement = state.get("ccs_refinement")
        displayed = segmentation
        if refinement:
            with controls:
                choice = st.radio("表示結果", ["補正前", "CCS補正後"], index=1, horizontal=True,
                                  key=f"result_choice_{segmentation['result']['segmentation_id']}_{refinement['result']['segmentation_id']}")
            if choice == "CCS補正後":
                displayed = refinement
        result, artifacts = displayed["result"], displayed["artifacts"]
        with controls:
            st.dataframe([
                {"ID": part["part_id"], "パーツ": part["name"], "面数": part["face_count"], "水密": part["is_watertight"]}
                for part in result["parts"]
            ], hide_index=True, width="stretch")
            st.caption(f"分割ID: {result['segmentation_id']}")
            for warning in result.get("warnings", []):
                st.warning(warning)
            if result.get("postprocessing", {}).get("method") == "ccs_face_centroids_v1":
                diagnostics = result["postprocessing"]
                reasons = {"unchanged": "変化なし", "max_iterations": "反復上限", "cycle_detected": "状態の繰り返し"}
                st.metric("変更面数", diagnostics["changed_faces"])
                st.caption(f"補正: {diagnostics['elapsed_seconds']:.3f}秒 / 保存を含む処理: {result['total_processing_seconds']:.3f}秒")
                st.caption(f"終了理由: {reasons.get(diagnostics['stop_reason'], diagnostics['stop_reason'])}")
                with st.expander("補正診断"):
                    part_names = {part["part_id"]: part["name"] for part in result["parts"]}
                    st.dataframe([
                        {"パーツ": part_names[item["part_id"]], "面数（前）": item["faces_before"], "面数（後）": item["faces_after"],
                         "連結成分（前）": item["components_before"], "連結成分（後）": item["components_after"]}
                        for item in diagnostics["parts"]
                    ], hide_index=True, width="stretch")
                    skip_reasons = {"empty_part": "空パーツ", "no_points_in_overlap": "重複領域に代表点なし", "no_anchors_outside_overlap": "重複領域外の基準点なし", "would_empty_part": "パーツ消失を回避"}
                    if diagnostics["skipped_pairs"]:
                        st.dataframe([
                            {"パーツ": " / ".join(part_names[index] for index in item["part_ids"]),
                             "理由": skip_reasons.get(item["reason"], item["reason"]), "回数": item["occurrences"]}
                            for item in diagnostics["skipped_pairs"]
                        ], hide_index=True, width="stretch")
            for filename, mime, label in (("parts.glb", "model/gltf-binary", "GLB"), ("parts.npz", "application/octet-stream", "NPZ"), ("parts.json", "application/json", "対応表 JSON")):
                if filename in artifacts:
                    st.download_button(label, artifacts[filename], file_name=f"{result['segmentation_id']}_{filename}", mime=mime, icon=":material/download:", key=f"download_{filename}")
        with display:
            if "parts.glb" in artifacts:
                try:
                    split_meshes = load_segmented_payloads(artifacts["parts.glb"], result)
                    choices = [None] + [part["part_id"] for part in result["parts"]]
                    labels = {part["part_id"]: f"{part['part_id']}: {part['name']}" for part in result["parts"]}
                    selection = st.selectbox("表示パーツ", choices, format_func=lambda value: "全体" if value is None else labels[value], key=f"visible_part_{result['segmentation_id']}")
                    visible = split_meshes if selection is None else [mesh for mesh in split_meshes if mesh["part_id"] == selection]
                    if visible:
                        vertices = np.concatenate([np.asarray(mesh["vertices"]) for mesh in split_meshes])
                        bounds = np.array([vertices.min(axis=0), vertices.max(axis=0)])
                        st.plotly_chart(mesh_figure(visible, up_dir=up_dir, bounds=bounds), width="stretch", key="segmentation_view", config={"displaylogo": False})
                    else:
                        st.warning("このパーツに割り当てられた面はありません。")
                except Exception as error:
                    st.error(f"分割結果を表示できません：{error}")
            else:
                st.caption("表示用GLBは未取得です。")
    else:
        with display:
            st.caption("未分割")
