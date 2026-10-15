from __future__ import annotations

import json
import os

import streamlit as st

from backend_client import BackendClient, BackendError
from viewer import load_mesh_payloads, mesh_figure
from workflow import input_identity, prepare_parts


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
        {"ID": part["part_id"], "パーツ名": part["label"], "分割用名称": part["name"], "形状の説明": part["description"], "編集対象": part["is_edit_target"]}
        for part in plan["parts"]
    ]
    st.dataframe(rows, hide_index=True, width="stretch")
    for warning in plan.get("warnings", []):
        st.warning(warning)
    with download:
        st.download_button("JSON", json.dumps(plan, ensure_ascii=False, indent=2), file_name=f"part_plan_{plan['model_id']}.json", mime="application/json", icon=":material/download:", width="stretch")
else:
    st.caption("未作成")
