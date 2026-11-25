"""Button-triggered cut closure, kept separate from the live editing mesh."""
import hashlib

import streamlit as st

from capping import METHOD, cap_parts, capped_payloads, export_capped_glb, export_capped_npz
from viewer import mesh_figure, mesh_viewer_config


def render_capping(state, content, manifest, original, edited, revision, metadata, up_dir, enabled):
    st.subheader("断面の閉鎖")
    st.caption("分割で生じた断面へ、パーツごとに蓋を作ります。現在の倍率・移動・なじませを反映した形状を使います。")
    allow_nonplanar = st.checkbox("非平面の断面も生成を試す", value=False, disabled=not enabled, key="try_nonplanar_caps",
        help="オンにすると非平面性が2%を超えても生成を試します。境界頂点の3D位置、輪郭の検査、蓋の交差表示は維持します。")
    key = hashlib.sha256(f"{METHOD}:{revision}:{allow_nonplanar}".encode()).hexdigest()
    if state.get("capped", {}).get("input_key") != key:
        state.pop("capped", None)
    if st.button("断面を閉じる", key="cap_parts", disabled=not enabled, icon=":material/format_shapes:"):
        try:
            with st.spinner("切断境界の蓋を作成・検査しています"):
                result = cap_parts(content, manifest, original, edited, allow_nonplanar=allow_nonplanar)
                export_metadata = {"model_id": manifest["model_id"], "plan_id": manifest["plan_id"],
                    "segmentation_id": manifest["segmentation_id"], "source_sha256": manifest.get("source_sha256"),
                    "orientation": manifest.get("orientation"), "up_dir": up_dir,
                    "uniform_scales": state["scales"], "connection_following": metadata}
                state["capped"] = {"input_key": key, "result": result,
                    "glb": export_capped_glb(result, source_key=state["source_key"], editing_metadata=export_metadata),
                    "npz": export_capped_npz(result, source_key=state["source_key"], editing_metadata=export_metadata)}
        except Exception as error:
            st.error(f"断面を閉じられません：{error}")
    if not enabled:
        st.caption("断面閉鎖には、元頂点・元面の対応情報を含む分割NPZが必要です。")
    if "capped" not in state:
        return
    saved = state["capped"]
    result, statistics = saved["result"], saved["result"].statistics
    st.caption(f"閉じた断面：{statistics['closed_sections']}領域 / 境界ループ：{statistics['closed_loops']}本 / 保留：{statistics['skipped_sections']}件 / 追加した蓋：{statistics['added_faces']}面")
    if statistics["allow_nonplanar"]:
        st.caption(f"非平面の試行：オン / 2%を超えて生成した断面：{statistics['nonplanar_sections']}領域。非平面性の値は診断に記録しています。")
    st.caption("各パーツは独立したままです。蓋と同じパーツ内の交差を赤く表示します。水密性と造形適合性は別に確認してください。")
    if not statistics["added_faces"]:
        st.info("追加できる蓋はありませんでした。断面の診断を確認してください。")
    for record in result.parts:
        info = record.statistics
        for skipped in info["skipped"]:
            st.warning(f"{info['name']}: {skipped['reason']}（対象の境界辺 {skipped['boundary_edges']}本）")
        if info["ambiguous_source_edges"]:
            st.warning(f"{info['name']}: 3面以上が共有する切断境界 {info['ambiguous_source_edges']}辺は蓋の対象から除外しました。")
        if info["cap_overlap_pair_count"]:
            st.warning(f"{info['name']}: 蓋に関係する交差が {info['cap_overlap_pair_count']}組あります。")
        if info["other_boundary_edges"]:
            st.warning(f"{info['name']}: 元の開口・正常な切断境界に分類できない境界が {info['other_boundary_edges']}辺あります。継ぎ目のずれや非多様体を確認してください。")
    with st.expander("断面の診断"):
        st.dataframe([{"パーツ": p.part.name, "閉じた断面": p.statistics["closed_sections"],
            "うち非平面": p.statistics["nonplanar_sections"],
            "追加面": p.statistics["added_faces"], "保留": len(p.statistics["skipped"]),
            "残る切断境界辺": p.statistics["cut_boundary_edges_after"], "元からの開口辺": p.statistics["original_open_edges"],
            "その他の境界辺": p.statistics["other_boundary_edges"],
            "残る全境界辺": p.statistics["remaining_boundary_edges"], "水密": p.statistics["is_watertight"],
            "面の向き整合": p.statistics["is_winding_consistent"], "蓋の交差組数": p.statistics["cap_overlap_pair_count"]}
            for p in result.parts], hide_index=True, width="stretch")
        measurements = [{"パーツ": p.part.name, "輪郭ID": loop["loop_id"], "境界辺": loop["boundary_edges"],
                         "非平面性（%）": None if loop["planarity"] is None else round(loop["planarity"] * 100, 2),
                         "基準値2%超": loop["exceeds_planarity_limit"]}
                        for p in result.parts for loop in p.statistics["loop_planarity"]]
        if measurements:
            st.caption("検出した輪郭の非平面性（生成できなかった輪郭も含みます）")
            st.dataframe(measurements, hide_index=True, width="stretch")
    names = {p.part.part_id: p.part.name for p in result.parts if len(p.part.faces)}
    selected = st.selectbox("蓋付き表示パーツ", [None, *names], format_func=lambda i: "全パーツ" if i is None else names[i], key="capped_part_view")
    highlight = st.checkbox("蓋を強調表示", value=False, key="highlight_caps")
    overlaps = st.checkbox("蓋に関係する交差を表示", value=True, key="cap_overlaps")
    payloads = capped_payloads(result, part_id=selected, highlight_caps=highlight, show_overlaps=overlaps)
    st.plotly_chart(mesh_figure(payloads, up_dir=up_dir), width="stretch", key=f"capped_view_{key}_{up_dir}", config=mesh_viewer_config())
    st.caption("強調色と赤色は確認用です。保存する面は元のパーツ色を保持します。編集後はボタンを押して蓋を再生成してください。")
    st.download_button("蓋付き GLB", saved["glb"], file_name=f"{manifest['segmentation_id']}_capped.glb", mime="model/gltf-binary", key="download_capped_glb")
    st.download_button("蓋付き NPZ", saved["npz"], file_name=f"{manifest['segmentation_id']}_capped.npz", mime="application/octet-stream", key="download_capped_npz")
