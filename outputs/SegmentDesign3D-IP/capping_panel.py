"""Button-triggered cut closure, kept separate from the live editing mesh."""
import hashlib
import json

import numpy as np
import streamlit as st
import plotly.graph_objects as go

from capping import METHOD, TRIANGULATIONS, cap_parts, capped_payloads, cut_loop_catalog, export_capped_glb, export_capped_npz
from editing import load_editable_parts
from orientation import orient_points
from viewer import mesh_figure, mesh_viewer_config


@st.cache_data(show_spinner=False, max_entries=4)
def _start_catalog(content, manifest):
    return cut_loop_catalog(content, manifest, load_editable_parts(content, manifest))


def render_capping(state, content, manifest, original, edited, revision, metadata, up_dir, enabled):
    st.subheader("断面の閉鎖")
    st.caption("分割で生じた断面へ、パーツごとに蓋を作ります。現在の倍率・移動・なじませを反映した形状を使います。")
    triangulation = st.selectbox("三角形の作り方", list(TRIANGULATIONS), format_func=TRIANGULATIONS.get,
                                disabled=not enabled, key="cap_triangulation")
    center_fan = triangulation == "center_fan"
    if triangulation == "point_only":
        st.caption("輪郭順に連続する3頂点を調べ、投影した三角形の内部に別の頂点がある場合だけ不採用にします。辺上・同位置の点は内部に含めず、候補の面積・凸角は判定しません。穴のない単一輪郭が対象です。")
    elif center_fan:
        st.caption("断面の境界辺の長さで重み付けした中心Oを1頂点追加し、隣り合う境界頂点と三角形を作ります。境界は動かさず、開始頂点によらず同じ蓋になります。中空断面は保留します。")
    allow_nonplanar = st.checkbox("非平面の断面も生成を試す", value=False, disabled=not enabled, key="try_nonplanar_caps",
        help="オンにすると非平面性が2%を超えても生成を試します。境界頂点の3D位置、輪郭の検査、蓋の交差表示は維持します。")
    catalog = _start_catalog(content, manifest) if enabled else []
    by_key = {item["loop_key"]: item for item in catalog}
    offsets = {loop_key: int(value) % by_key[loop_key]["vertex_count"]
               for loop_key, value in state.get("cap_start_offsets", {}).items() if loop_key in by_key}
    offsets = {loop_key: value for loop_key, value in offsets.items() if value}
    active_loop, regenerate = None, False
    if catalog:
        selected_loop = st.selectbox("開始頂点を変える断面", list(by_key),
            format_func=lambda k: f"{by_key[k]['name']} / 断面 {by_key[k]['loop_id'] + 1}（{by_key[k]['vertex_count']}頂点）",
            disabled=center_fan, key=f"cap_start_loop_{state['source_key']}")
        active_loop = by_key[selected_loop] if not center_fan else None
        next_column, reset_column = st.columns(2)
        advance = next_column.button("開始頂点を次へ", key="cap_start_next", disabled=center_fan, icon=":material/skip_next:")
        reset = reset_column.button("開始頂点を初期化", key="cap_start_reset", disabled=center_fan, icon=":material/restart_alt:")
        if not center_fan and (advance or reset):
            value = (offsets.get(selected_loop, 0) + 1) % active_loop["vertex_count"] if advance else 0
            if value:
                offsets[selected_loop] = value
            else:
                offsets.pop(selected_loop, None)
            regenerate = True
        if active_loop:
            offset = offsets.get(selected_loop, 0)
            ring = active_loop["vertices"]
            candidate = [ring[(offset + i) % len(ring)] for i in range(3)]
            candidate_label = "最初の候補" if triangulation == "point_only" else "入力輪郭の先頭3頂点"
            st.caption(f"開始位置：{offset + 1}/{len(ring)} / 開始頂点番号：{candidate[0]} / {candidate_label}：{candidate[0]}, {candidate[1]}, {candidate[2]}。番号はパーツ内の頂点番号です。")
            st.caption("次へ・初期化を押すと、選択した断面の開始位置を変えて蓋を再生成します。一周すると最初へ戻り、他の断面の設定は保持します。")
        else:
            st.caption("放射状生成では開始頂点の変更は使いません。他の方式へ戻すと、これまでの開始位置を使用できます。")
    state["cap_start_offsets"] = offsets
    applied_offsets = {} if center_fan else offsets
    key = hashlib.sha256(f"{METHOD}:{revision}:{allow_nonplanar}:{triangulation}:{json.dumps(applied_offsets, sort_keys=True)}".encode()).hexdigest()
    if state.get("capped", {}).get("input_key") != key:
        state.pop("capped", None)
    generate = st.button("断面を閉じる", key="cap_parts", disabled=not enabled, icon=":material/format_shapes:")
    if generate or regenerate:
        state.pop("capped", None)
        try:
            with st.spinner("切断境界の蓋を作成・検査しています"):
                result = cap_parts(content, manifest, original, edited, allow_nonplanar=allow_nonplanar,
                                   triangulation=triangulation, start_offsets=applied_offsets)
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
    st.caption(f"閉じた断面：{statistics['closed_sections']}領域 / 境界ループ：{statistics['closed_loops']}本 / 保留：{statistics['skipped_sections']}件 / 追加した蓋：{statistics['added_faces']}面 / 追加頂点：{statistics['added_vertices']}個")
    st.caption(f"三角形の作り方：{TRIANGULATIONS[statistics['triangulation']]}")
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
        if info["degenerate_cap_faces"]:
            st.warning(f"{info['name']}: 3Dで面積が0または極小の蓋が {info['degenerate_cap_faces']}面あります。試行結果として保持しています。")
        if info["projected_problem_sections"]:
            st.warning(f"{info['name']}: 放射状の蓋が、投影した輪郭から張り出す・重なる・覆い残す断面が {info['projected_problem_sections']}領域あります。比較用に結果を保持しています。")
    with st.expander("断面の診断"):
        st.dataframe([{"パーツ": p.part.name, "閉じた断面": p.statistics["closed_sections"],
            "うち非平面": p.statistics["nonplanar_sections"],
            "追加面": p.statistics["added_faces"], "追加頂点": p.statistics["added_vertices"], "保留": len(p.statistics["skipped"]),
            "放射状の投影不整合": p.statistics["projected_problem_sections"],
            "面積0・極小の蓋": p.statistics["degenerate_cap_faces"],
            "残る切断境界辺": p.statistics["cut_boundary_edges_after"], "元からの開口辺": p.statistics["original_open_edges"],
            "その他の境界辺": p.statistics["other_boundary_edges"],
            "残る全境界辺": p.statistics["remaining_boundary_edges"], "水密": p.statistics["is_watertight"],
            "面の向き整合": p.statistics["is_winding_consistent"], "蓋の交差組数": p.statistics["cap_overlap_pair_count"]}
            for p in result.parts], hide_index=True, width="stretch")
        measurements = [{"パーツ": p.part.name, "輪郭ID": loop["loop_id"], "境界辺": loop["boundary_edges"],
                         "開始位置": loop["start_offset"] + 1, "開始頂点番号": loop["start_vertex"],
                         "非平面性（%）": None if loop["planarity"] is None else round(loop["planarity"] * 100, 2),
                         "基準値2%超": loop["exceeds_planarity_limit"]}
                        for p in result.parts for loop in p.statistics["loop_planarity"]]
        if measurements:
            st.caption("検出した輪郭の非平面性（生成できなかった輪郭も含みます）")
            st.dataframe(measurements, hide_index=True, width="stretch")
        centers = [{"パーツ": p.part.name, "断面ID": section["cap_id"],
                    "中心頂点番号": section["triangulation"]["center_vertex"],
                    "中心X": section["triangulation"]["center"][0],
                    "中心Y": section["triangulation"]["center"][1],
                    "中心Z": section["triangulation"]["center"][2],
                    "投影で過不足・重複なし": section["triangulation"]["projected_coverage_valid"]}
                   for p in result.parts for section in p.statistics["sections"]
                   if section["triangulation"]["method"] == "boundary_center_fan_v1"]
        if centers:
            st.caption("放射状に生成した蓋の中心（編集用の座標）")
            st.dataframe(centers, hide_index=True, width="stretch")
    names = {p.part.part_id: p.part.name for p in result.parts if len(p.part.faces)}
    selected = st.selectbox("蓋付き表示パーツ", [None, *names], format_func=lambda i: "全パーツ" if i is None else names[i], key="capped_part_view")
    highlight = st.checkbox("蓋を強調表示", value=False, key="highlight_caps")
    overlaps = st.checkbox("蓋に関係する交差を表示", value=True, key="cap_overlaps")
    show_centers = st.checkbox("中心頂点を表示", value=True, key="show_cap_centers") if center_fan else False
    payloads = capped_payloads(result, part_id=selected, highlight_caps=highlight, show_overlaps=overlaps)
    figure = mesh_figure(payloads, up_dir=up_dir)
    if active_loop and (selected is None or selected == active_loop["part_id"]):
        vertex = active_loop["vertices"][offsets.get(active_loop["loop_key"], 0)]
        current = next(part for part in edited if part.part_id == active_loop["part_id"])
        point = orient_points(current.vertices[[vertex]], up_dir)[0]
        figure.add_trace(go.Scatter3d(x=[point[0]], y=[point[1]], z=[point[2]], mode="markers+text", text=["A"],
            textposition="top center", marker=dict(size=7, color="#f2c94c", line=dict(color="#66520a", width=1)),
            name="開始頂点", showlegend=False, hovertemplate=f"開始頂点：{vertex}<extra></extra>"))
        st.caption("黄色の点Aは、選択した断面の開始頂点です。保存するモデルには追加しません。")
    if show_centers:
        locations = [(p.part.vertices[index], f"{p.part.name} / 頂点 {index}")
                     for p in result.parts if selected is None or p.part.part_id == selected
                     for index in np.flatnonzero(p.is_cap_center)]
        if locations:
            points = orient_points([point for point, _ in locations], up_dir)
            figure.add_trace(go.Scatter3d(x=points[:, 0].tolist(), y=points[:, 1].tolist(), z=points[:, 2].tolist(),
                mode="markers+text", text=["O"] * len(locations), textposition="top center",
                marker=dict(size=7, color="#f2c94c", line=dict(color="#66520a", width=1)),
                name="断面中心", showlegend=False, customdata=[label for _, label in locations],
                hovertemplate="中心頂点：%{customdata}<extra></extra>"))
            st.caption("黄色の点Oは、蓋に追加した中心頂点です。中心頂点もGLB・NPZに保存します。")
    st.plotly_chart(figure, width="stretch", key=f"capped_view_{key}_{up_dir}", config=mesh_viewer_config())
    st.caption("強調色と赤色は確認用です。保存する面は元のパーツ色を保持します。編集後はボタンを押して蓋を再生成してください。")
    st.download_button("蓋付き GLB", saved["glb"], file_name=f"{manifest['segmentation_id']}_capped.glb", mime="model/gltf-binary", key="download_capped_glb")
    st.download_button("蓋付き NPZ", saved["npz"], file_name=f"{manifest['segmentation_id']}_capped.npz", mime="application/octet-stream", key="download_capped_npz")
