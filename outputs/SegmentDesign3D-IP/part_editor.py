from pathlib import Path
import hashlib

import streamlit as st
import numpy as np
from streamlit.components.v1 import declare_component

from editing import editor_payload, editor_source_key, export_edited_glb, load_editable_parts, scale_parts, synchronize_editor, translate_parts, translation_controls
from connections import build_connection_plan, connection_payload, connection_residuals, detect_connections, follow_connections
from rejoining import export_rejoined_glb, export_rejoined_npz, has_rejoin_data, rejoin_input_key, rejoin_parts, rejoined_payload
from viewer import mesh_figure, mesh_viewer_config


_component_directory = Path(__file__).with_name("scale_component") / "dist"
_component_version = hashlib.sha256((_component_directory / "editor.js").read_bytes()).hexdigest()[:12]
_component = declare_component(f"part_scale_editor_{_component_version}", path=str(_component_directory))


@st.cache_data(show_spinner=False)
def _load(content: bytes, manifest: dict):
    parts = load_editable_parts(content, manifest)
    connections, warnings = detect_connections(content, parts)
    return parts, connections, warnings, has_rejoin_data(content, manifest)


def render_part_editor(result: dict, content: bytes, up_dir: str) -> None:
    parts, connections, warnings, can_rejoin = _load(content, result)
    source_key = editor_source_key(result, content)
    state = st.session_state.setdefault("part_editing", {})
    synchronize_editor(state, source_key, parts)
    available = [part.part_id for part in parts if len(part.faces)]
    names = {part.part_id: part.name for part in parts}
    root_id = st.selectbox("基準パーツ（拡大縮小の位置を固定）", available,
                           format_func=lambda index: f"{names[index]} (ID {index})", key=f"connection_root_{source_key}")
    follow = st.checkbox("接続位置に追従", value=True, disabled=not connections, key=f"connection_follow_{source_key}")
    show_anchors = st.checkbox("接続点を表示", value=True, disabled=not connections, key=f"connection_points_{source_key}")
    plan = build_connection_plan(parts, connections, root_id)
    layout = connection_payload(plan)
    for warning in warnings:
        st.warning(warning)
    if connections:
        st.caption(f"接続領域：{len(connections)} / 追従に使用：{len(plan.attachments) if follow else 0}。緑の点は位置の一致、橙の点と線はずれを表します。")
        st.caption("拡大縮小に伴う接続位置へ追従します。X/Y/Zの手動移動では接続点を維持しません。")
        if plan.unused_ids:
            st.warning("輪状の接続または同じパーツ間の複数接続があります。境界の長い接続を優先して追従し、使わない接続のずれも表示します。")
        if len(plan.roots) > 1:
            st.caption("基準パーツにつながらないグループは、それぞれID最小の非空パーツの位置を固定します。")
    elif len(available) > 1:
        st.info("共有境界を検出できませんでした。離れたメッシュや頂点位置の異なる境界には、自動で接続を作りません。")
    movement = translation_controls(parts)
    st.caption(f"X/Y/Z移動：入力モデルの座標軸・座標単位。各軸の範囲 ±{movement['limit']:.6g}、刻み {movement['step']:.6g}。")
    event = _component(
        source_key=source_key, parts=editor_payload(parts), scales=state["scales"],
        editor_protocol=2,
        offsets=state["offsets"], movement=movement,
        layout=layout, follow=bool(follow and connections), show_anchors=bool(show_anchors and connections),
        layout_key=f"{root_id}:{bool(follow)}:{bool(show_anchors)}",
        sequence=state["sequence"], up_dir=up_dir, default=None, key=f"part_scale_move_{source_key}",
    )
    synchronize_editor(state, source_key, parts, event)
    if follow and connections:
        edited, automatic = follow_connections(parts, state["scales"], plan)
    else:
        edited = scale_parts(parts, state["scales"])
        automatic = {part.part_id: np.zeros(3) for part in parts}
    # Manual offsets are applied after the whole attachment tree is solved; they never propagate.
    edited = translate_parts(edited, state["offsets"])
    translations = {part.part_id: automatic[part.part_id] + state["offsets"][str(part.part_id)] for part in parts}
    residuals = connection_residuals(parts, state["scales"], connections, translations)
    metadata = {**layout, "enabled": bool(follow and connections), "root_id": root_id,
                "automatic_translations": {str(index): value.tolist() for index, value in automatic.items()},
                "manual_translations": state["offsets"],
                "translations": {str(index): value.tolist() for index, value in translations.items()},
                "anchor_residuals": {str(index): value for index, value in residuals.items()}}
    state.update(edited_parts=edited, connections=metadata)
    if connections:
        with st.expander("検出した接続関係"):
            used = {item.connection_id for item in plan.attachments}
            st.dataframe([{"接続ID": item.connection_id, "パーツA": names[item.part_a], "パーツB": names[item.part_b],
                           "追従に使用": bool(follow and item.connection_id in used), "接続点のずれ（入力座標単位）": residuals[item.connection_id]}
                          for item in connections], hide_index=True, width="stretch")
    st.download_button(
        "編集後 GLB", export_edited_glb(edited, source_key=source_key, scales=state["scales"], connection_metadata=metadata, offsets=state["offsets"]),
        file_name=f"{result['segmentation_id']}_scaled.glb", mime="model/gltf-binary", icon=":material/download:", key="download_edited_glb",
    )
    revision = rejoin_input_key(source_key, state["scales"], metadata)
    if state.get("rejoined", {}).get("input_key") != revision:
        state.pop("rejoined", None)
    if st.button("一つのMeshへ結合", disabled=not can_rejoin, key="rejoin_mesh", icon=":material/join:"):
        try:
            with st.spinner("元の接続情報からメッシュを結合しています"):
                joined = rejoin_parts(content, result, parts, edited)
                state["rejoined"] = {"input_key": revision, "result": joined,
                                     "glb": export_rejoined_glb(joined, source_key=source_key), "npz": export_rejoined_npz(joined)}
        except Exception as error:
            st.error(f"メッシュを結合できません：{error}")
    if not can_rejoin:
        st.caption("結合には、元頂点・元面の対応情報を含む分割NPZが必要です。")
    if "rejoined" in state:
        saved = state["rejoined"]
        joined, statistics = saved["result"], saved["result"].statistics
        st.subheader("結合結果")
        st.caption(f"Mesh数：1 / 連結成分：{statistics['connected_components']} / 元の面：{statistics['original_faces']} / 追加した接続面：{statistics['bridge_faces']} / 統合した頂点：{statistics['welded_vertices']}")
        if statistics["ambiguous_edges"]:
            st.caption(f"3面以上が共有する境界エッジ{statistics['ambiguous_edges']}本は、橋渡し面の自動生成から除外しました。")
        st.plotly_chart(mesh_figure([rejoined_payload(joined)], up_dir=up_dir), width="stretch", key=f"rejoined_view_{revision}", config=mesh_viewer_config())
        st.download_button("結合後 GLB", saved["glb"], file_name=f"{result['segmentation_id']}_rejoined.glb",
                           mime="model/gltf-binary", key="download_rejoined_glb", icon=":material/download:")
        st.download_button("結合後 NPZ", saved["npz"], file_name=f"{result['segmentation_id']}_rejoined.npz",
                           mime="application/octet-stream", key="download_rejoined_npz", icon=":material/download:")
