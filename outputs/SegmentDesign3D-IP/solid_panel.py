"""Explicit closure, free movement, extension, and Boolean output stages."""
import hashlib
import json
from dataclasses import replace

import numpy as np
import streamlit as st

from boolean_union import UnionResult, export_union_glb, export_union_npz, export_union_stl, union_parts, union_payload, validate_solid
from capping import METHOD as CAP_METHOD, TRIANGULATIONS, cap_parts, capped_payloads, export_capped_glb, export_capped_npz
from connection_overlap import (METHOD, closed_context, connections_from_closed, constraint_payload,
                                diagnose_extension, evaluate_connections, extend_closed, pose_closed, reports_valid)
from mesh_overlaps import METHOD as OVERLAP_METHOD
from viewer import mesh_figure, mesh_viewer_config
from rejoining import rejoin_parts, rejoined_payload, export_rejoined_glb, export_rejoined_npz


def _discard_extension(state):
    state.pop("solid_extension", None)
    state.pop("solid_union", None)


def _closure_key(content, manifest, baseline, settings):
    digest = hashlib.sha256(f"{CAP_METHOD}:{OVERLAP_METHOD}".encode() + content + json.dumps(manifest, sort_keys=True).encode())
    digest.update(repr((settings["triangulation"], settings["allow_nonplanar"])).encode())
    for part in baseline:
        digest.update(str(part.part_id).encode())
        digest.update(part.vertices.tobytes())
        digest.update(part.faces.tobytes())
    return digest.hexdigest()


def _plot(result, up_dir, key, *, part_id=None, highlight=False, self_intersections=False):
    payloads = capped_payloads(result, part_id=part_id, highlight_caps=highlight, show_overlaps=False)
    if self_intersections:
        records = {r.part.part_id: r for r in result.parts}
        for payload in payloads:
            marked = records[payload["part_id"]].statistics.get("self_intersection_face_ids", [])
            for face in marked:
                payload["face_colors"][face] = "#e12b35"
    st.plotly_chart(mesh_figure(payloads, up_dir=up_dir),
                    key=key, width="stretch", config=mesh_viewer_config())


def _downloads(result, state, manifest, metadata, stage):
    label, suffix = ("閉鎖したパーツ", "closed_parts") if stage == "closed" else ("延長したパーツ", "overlap_parts")
    st.download_button(f"{label} GLB", export_capped_glb(result, source_key=state["source_key"], editing_metadata=metadata),
        file_name=f"{manifest['segmentation_id']}_{suffix}.glb", mime="model/gltf-binary", key=f"download_{suffix}_glb")
    st.download_button(f"{label} NPZ", export_capped_npz(result, source_key=state["source_key"], editing_metadata=metadata),
        file_name=f"{manifest['segmentation_id']}_{suffix}.npz", key=f"download_{suffix}_npz")


def _closure_diagnostics(result):
    st.dataframe([{"パーツ": r.part.name, "閉じた断面": r.statistics["closed_sections"],
        "保留": len(r.statistics["skipped"]), "残る切断境界辺": r.statistics["cut_boundary_edges_after"],
        "元からの開口辺": r.statistics["original_open_edges"], "その他の境界辺": r.statistics["other_boundary_edges"],
        "残る全境界辺": r.statistics["remaining_boundary_edges"],
        "水密": r.statistics["is_watertight"], "面の向き整合": r.statistics["is_winding_consistent"]}
        for r in result.parts], hide_index=True, width="stretch")
    for record in result.parts:
        info = record.statistics
        for skipped in info["skipped"]:
            st.warning(f"{record.part.name}: {skipped['reason']}（境界辺 {skipped['boundary_edges']}本）")
        if len(record.part.faces) and (not info["is_watertight"] or not info["is_winding_consistent"]):
            st.warning(f"{record.part.name}: 閉じた立体の条件を満たしていません。境界辺・面の向きと保留理由を確認してください。移動操作は続けられます。")
        if info["degenerate_cap_faces"] or info["projected_problem_sections"]:
            st.warning(f"{record.part.name}: 蓋の退化面 {info['degenerate_cap_faces']}面 / 投影の不整合 {info['projected_problem_sections']}領域。蓋の方式を変えて①を押してください。")
        if info["cap_overlap_pair_count"]:
            st.warning(f"{record.part.name}: 蓋に関係する交差が {info['cap_overlap_pair_count']}組あります。")


def render_closure_stage(state, manifest, content, original, baseline, metadata, up_dir, available):
    """A button creates the cap snapshot. Movement does not invalidate it."""
    st.subheader("① 断面を閉じる")
    st.caption("①閉鎖 → ②スライダーで自由に移動 → ③ボタンで延長 → ④Boolean結合。各段階の形状を別々に確認できます。")
    source_key = state["source_key"]
    settings = {}
    with st.expander("蓋と食い込みの設定"):
        settings["triangulation"] = st.selectbox("蓋の作り方", ["center_fan", "earcut", "point_only"],
            format_func=TRIANGULATIONS.get, key=f"solid_triangulation_{source_key}")
        settings["allow_nonplanar"] = st.checkbox("非平面の断面も生成を試す（確認用）", value=True,
            key=f"solid_nonplanar_{source_key}")
        settings["depth_ratio"] = st.number_input("食い込み深さ（断面幅の%）", .1, 20.0, 1.0, .1,
            key=f"solid_depth_{source_key}") / 100
        st.caption("中空断面にはEarcutを選んでください。延長量は移動後の隙間＋食い込み深さです。薄い受け側では深さを壁厚の10%以下に抑えます。")
    key = _closure_key(content, manifest, baseline, settings)
    if state.get("solid_closure_key") != key:
        state["solid_closure_key"] = key
        state.pop("solid_closed", None)
        state.pop("solid_close_error", None)
        _discard_extension(state)
    state.pop("solid_notice", None)
    if st.button("① 断面を閉じる", disabled=not available, key="solid_close_parts", icon=":material/format_shapes:"):
        state.pop("solid_closed", None)
        state.pop("solid_close_error", None)
        _discard_extension(state)
        try:
            with st.spinner("断面の蓋を作成して診断しています"):
                result = cap_parts(content, manifest, original, baseline, triangulation=settings["triangulation"],
                    allow_nonplanar=settings["allow_nonplanar"], shared_caps=True, check_intersections=True)
                state["solid_closed"] = {"input_key": key, "result": result,
                    "context": closed_context(result, original), "metadata": metadata}
        except Exception as error:
            state["solid_close_error"] = str(error)
    if state.get("solid_close_error"):
        st.error(f"断面を閉じられません：{state['solid_close_error']}")
    snapshot = state.get("solid_closed")
    if snapshot is None:
        st.info("最初に①を押して閉鎖結果を確認してください。倍率・なじませ・蓋の設定を変えた場合も①から作り直します。")
        return None, settings
    result = snapshot["result"]
    _closure_diagnostics(result)
    with st.expander("閉鎖直後の形状を確認"):
        names = {r.part.part_id: r.part.name for r in result.parts if len(r.part.faces)}
        selected = st.selectbox("閉鎖結果の表示パーツ", [None, *names],
            format_func=lambda i: "全パーツ" if i is None else names[i], key=f"solid_closed_view_{source_key}")
        highlight = st.checkbox("追加した蓋を強調表示", value=True, key=f"solid_closed_highlight_{source_key}")
        _plot(result, up_dir, f"solid_closed_plot_{source_key}_{up_dir}", part_id=selected, highlight=highlight)
        st.caption("①を押した時の閉鎖形状です。移動後の形状は②の編集画面で確認します。")
        _downloads(result, state, manifest, {"stage": "closed", "connection_following": snapshot["metadata"]}, "closed")
    return snapshot, settings


def closed_editor_payload(snapshot, source_key):
    if snapshot is None:
        return None
    payload = constraint_payload(snapshot["context"], snapshot["result"])
    payload.update(source_key=source_key, preview_only=True)
    for record in snapshot["result"].parts:
        if len(record.part.faces):
            payload["parts"][str(record.part.part_id)]["preview_faces"] = record.part.faces[record.is_cap].reshape(-1).tolist()
    return payload


def render_solid_result(state, manifest, content, original, plan, settings, snapshot, motion, revision, metadata, up_dir):
    st.subheader("③ 接続部を延長する")
    st.caption("②で動かした位置から接続部を延ばします。交差があっても生成結果を表示・保存し、交差箇所を赤く確認できます。")
    key = hashlib.sha256(f"{METHOD}:{revision}:{state.get('solid_closure_key')}:{settings['depth_ratio']}".encode()).hexdigest()
    if state.get("solid_extension", {}).get("input_key") != key:
        _discard_extension(state)
    posed = pose_closed(snapshot["context"], state["offsets"], motion) if snapshot else None
    if st.button("③ 接続部を延長する", disabled=snapshot is None, key="solid_extend_parts", icon=":material/open_in_full:"):
        _discard_extension(state)
        saved = {"input_key": key, "reports": [], "result": None, "complete": False}
        state["solid_extension"] = saved
        try:
            with st.spinner("移動後の断面から延長方向と長さを調べています"):
                policy = metadata.get("editing_policy")
                context = connections_from_closed(content, manifest, original, snapshot["result"], plan,
                    depth_ratio=settings["depth_ratio"], allow_intersections=True,
                    role_overrides=policy["relations"] if policy else ())
                if policy:
                    modes = {frozenset((r["parent_id"], r["child_id"])): r["mode"] for r in policy["relations"]}
                    attached = [r for r in context.regions if modes.get(frozenset((r["parent_id"], r["child_id"]))) != "blend"]
                    reports = evaluate_connections(replace(context, regions=attached), posed, strict=False)
                    by_id = {r.part.part_id: r.part for r in posed.parts}
                    for region in context.regions:
                        if region in attached:
                            continue
                        pairs = np.asarray(region["pairs"])
                        valid = bool(np.max(np.linalg.norm(by_id[region["child_id"]].vertices[pairs[:, 0]] -
                            by_id[region["parent_id"]].vertices[pairs[:, 1]], axis=1)) <= context.frame["scale"] * 1e-9)
                        reports.append({"connection_ids": region["connection_ids"], "parent_id": region["parent_id"],
                            "child_id": region["child_id"], "cap_id": region["cap_id"], "mode": "blend",
                            "valid": valid, "status": "contact" if valid else "blocked", "length": 0., "depth": 0.,
                            "normal": region["normal"], "reason": "なじませる境界が一致していません。基準側と編集側を確認してください。"})
                else:
                    reports = evaluate_connections(context, posed, strict=False)
                saved["reports"] = reports
                result = extend_closed(context, posed, [r for r in reports if r["valid"]], validate_self=False)
                saved.update(result=result, complete=reports_valid(reports))
                try:
                    saved["result"] = diagnose_extension(context, posed, result)
                except Exception as error:
                    saved["diagnostic_error"] = str(error)
        except Exception as error:
            saved["error"] = str(error)
    saved = state.get("solid_extension")
    if saved is None:
        st.info("移動後に③を押してください。移動量だけを変更した場合、①の閉鎖結果は保持します。")
    else:
        names = {r.part.part_id: r.part.name for r in snapshot["result"].parts}
        if saved["reports"]:
            st.dataframe([{"接続ID": ", ".join(map(str, r["connection_ids"])), "受け側": names[r["parent_id"]],
                "付属側": names[r["child_id"]], "状態": {"contact": "断面一致・延長なし", "extended": "延長して食い込み",
                    "overlap": "既存の重なり", "blocked": "延長できません"}[r["status"]],
                "延長量": r["length"], "食い込み深さ": r["depth"]} for r in saved["reports"]], hide_index=True, width="stretch")
            for report in saved["reports"]:
                if not report["valid"]:
                    st.warning(f"{names[report['child_id']]} / 接続 {report['connection_ids']}: {report['reason']}")
        if saved.get("error"):
            st.error(f"接続部を延長できません：{saved['error']}")
        if saved.get("diagnostic_error"):
            st.warning(f"交差診断を完了できませんでした。生成した形状は保持しています：{saved['diagnostic_error']}")
        if saved["result"] is not None:
            if saved["result"].statistics.get("self_intersections_checked"):
                st.dataframe([{"パーツ": r.part.name,
                    "延長前の内部交差（組）": r.statistics["pre_extension_self_intersection_pair_count"],
                    "延長後の内部交差（組）": r.statistics["self_intersection_pair_count"]}
                    for r in saved["result"].parts], hide_index=True, width="stretch")
                if saved["result"].statistics["self_intersection_pair_count"]:
                    st.warning("パーツ内部に交差があります。延長結果は確認用に保持しています。④では結合前に形状を検査します。")
            show_intersections = st.checkbox("パーツ内部の交差を赤く表示", value=True,
                key=f"solid_show_intersections_{state['source_key']}")
            _plot(saved["result"], up_dir, f"solid_extension_plot_{state['source_key']}_{up_dir}", self_intersections=show_intersections)
            st.caption("赤色は確認用です。GLB・NPZにはパーツ色を保持し、交差診断も記録します。受け側との重なりは接続のために作成しています。")
            if not saved["complete"]:
                st.caption("延長できた接続だけを表示しています。④へ進むには残りの接続も確認してください。")
            _downloads(saved["result"], state, manifest, {"stage": "extended", "connections": saved["reports"],
                "settings": settings, "complete": saved["complete"], "connection_following": metadata}, "extended")
    st.subheader("④ Booleanで統合")
    ready = bool(saved and saved["complete"] and saved["result"] is not None)
    editing_metadata = {"model_id": manifest["model_id"], "segmentation_id": manifest["segmentation_id"],
                        "connection_following": metadata, "solid_settings": settings, "up_dir": up_dir}
    if st.button("④ Booleanで統合", disabled=not ready, key="boolean_union", icon=":material/join:"):
        state.pop("solid_union", None)
        try:
            with st.spinner("閉じたパーツをBoolean結合し、内部面と形状を検査しています"):
                joined = union_parts(saved["result"], metadata=editing_metadata)
                state["solid_union"] = {"input_key": key, "result": joined,
                    "glb": export_union_glb(joined, source_key=state["source_key"], editing_metadata=editing_metadata),
                    "npz": export_union_npz(joined, source_key=state["source_key"], editing_metadata=editing_metadata)}
        except Exception as error:
            st.error(f"Boolean結合できません：{error}")
    if "solid_union" not in state:
        return
    union = state["solid_union"]
    joined = union["result"]
    with st.expander("Boolean結合の診断"):
        st.json(joined.statistics)
    st.plotly_chart(mesh_figure([union_payload(joined)], up_dir=up_dir), width="stretch",
                    key=f"solid_union_view_{state['source_key']}_{up_dir}", config=mesh_viewer_config())
    st.download_button("Boolean結合 GLB", union["glb"], file_name=f"{manifest['segmentation_id']}_union.glb",
                        mime="model/gltf-binary", key="download_union_glb")
    st.download_button("Boolean結合 NPZ", union["npz"], file_name=f"{manifest['segmentation_id']}_union.npz", key="download_union_npz")
    factor = st.number_input("STL出力：1座標単位を何mmにするか", min_value=.000001, max_value=1000000.0,
                            value=1.0, format="%.6f", key=f"stl_mm_{state['source_key']}")
    extents = np.ptp(joined.mesh.vertices, axis=0) * factor
    st.caption(f"STLの外形寸法：X {extents[0]:.6g} mm / Y {extents[1]:.6g} mm / Z {extents[2]:.6g} mm。肉厚・強度・スライサーの層表示も確認してください。")
    if joined.statistics["connected_components"] != 1:
        st.warning("分離した立体が残っています。一体の印刷用STLの出力は保留します。接続を確認してください。")
        return
    if union.get("stl_factor") != factor:
        try:
            union.update(stl_factor=factor, stl=export_union_stl(joined, mm_per_unit=factor), stl_error=None)
        except ValueError as error:
            union.update(stl_factor=factor, stl=None, stl_error=str(error))
    if union.get("stl_error"):
        st.warning(f"STL出力を保留しています：{union['stl_error']}")
    else:
        st.download_button("印刷用 STL", union["stl"], file_name=f"{manifest['segmentation_id']}_union_mm.stl",
                           mime="model/stl", key="download_union_stl")


def render_blended_result(state, manifest, content, original, edited, revision, metadata, up_dir):
    """Continuous-only models use matched source vertices, with no extrusion."""
    st.subheader("なじませによる接続")
    st.caption("なじませを反映した境界の対応頂点を結合します。倍率・移動を変えたら一体化を押し直してください。")
    if state.get("blend_joined", {}).get("input_key") != revision:
        state.pop("blend_joined", None)
    if st.button("なじませて一体化", key="blend_join"):
        state.pop("blend_joined", None)
        try:
            joined = rejoin_parts(content, manifest, original, edited)
            state["blend_joined"] = {"input_key": revision, "result": joined,
                "glb": export_rejoined_glb(joined, source_key=state["source_key"], editing_metadata=metadata),
                "npz": export_rejoined_npz(joined, editing_metadata=metadata)}
        except Exception as error:
            st.error(f"境界を結合できません：{error}")
    if "blend_joined" not in state:
        return
    saved = state["blend_joined"]
    joined = saved["result"]
    st.plotly_chart(mesh_figure([rejoined_payload(joined)], up_dir=up_dir), width="stretch",
        key=f"blend_joined_plot_{state['source_key']}_{up_dir}", config=mesh_viewer_config())
    st.download_button("結合したモデル GLB", saved["glb"],
        file_name=f"{manifest['segmentation_id']}_blended.glb", mime="model/gltf-binary", key="download_blend_glb")
    st.download_button("結合したモデル NPZ", saved["npz"],
        file_name=f"{manifest['segmentation_id']}_blended.npz", key="download_blend_npz")
    factor = st.number_input("STL出力：1座標単位を何mmにするか", min_value=.000001, max_value=1000000.,
        value=1., format="%.6f", key=f"stl_mm_{state['source_key']}")
    if "validation" not in saved and "validation_error" not in saved:
        try:
            if joined.statistics["bridge_faces"]:
                raise ValueError("なじませる境界が一致していません。接続先の設定を確認してください。")
            saved["validation"] = validate_solid(joined.mesh.vertices, joined.mesh.faces)
            if saved["validation"]["connected_components"] != 1:
                raise ValueError("分離した立体が残っています。")
        except ValueError as error:
            saved["validation_error"] = str(error)
    if saved.get("validation_error"):
        st.warning(f"STL出力を保留しています：{saved['validation_error']}")
        return
    if saved.get("stl_factor") != factor:
        try:
            result = UnionResult(joined.mesh, joined.face_part_ids, joined.source_face_indices,
                np.zeros(len(joined.mesh.faces), dtype=np.int64), saved["validation"], {p.part_id:p.color for p in original})
            saved.update(stl_factor=factor, stl=export_union_stl(result, mm_per_unit=factor), stl_error=None)
        except ValueError as error:
            saved.update(stl_factor=factor, stl=None, stl_error=str(error))
    if saved.get("stl_error"):
        st.warning(f"STL出力を保留しています：{saved['stl_error']}")
    else:
        st.download_button("印刷用 STL", saved["stl"], file_name=f"{manifest['segmentation_id']}_blended_mm.stl",
            mime="model/stl", key="download_blend_stl")
