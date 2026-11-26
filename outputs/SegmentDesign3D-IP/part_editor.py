from pathlib import Path
import hashlib
import io

import streamlit as st
import numpy as np
from streamlit.components.v1 import declare_component

from editing import editor_payload, editor_source_key, export_edited_glb, load_editable_parts, scale_parts, synchronize_editor, translation_controls
from connections import build_connection_plan, build_following_network, connection_payload, connection_residuals, detect_connections, follow_connected_parts, following_diagnostics
from connection_planes import NETWORK_FOLLOW_METHOD, GEOMETRY_VERSION
from boundary_blending import DEFAULT_RATIO, EDIT_METHOD as BLEND_METHOD, apply_boundary_blend, blend_metadata, blended_anchor_residuals, build_blend_distances, build_edit_blend_distances, blend_weights, edit_blend_responses
from boundary_motion import METHOD as MOTION_METHOD, apply_boundary_motion, build_motion_distances, motion_metadata, motion_weights, motion_from_blending
from movement_axes import build_movement_frames
from mesh_overlaps import METHOD as OVERLAP_METHOD, assemble_parts, find_face_overlaps, only_new_overlaps, overlap_frame, part_face_ids
from rejoining import export_rejoined_glb, export_rejoined_npz, has_rejoin_data, rejoin_input_key, rejoin_parts, rejoined_payload
from viewer import mesh_figure, mesh_viewer_config
from capping_panel import render_capping
from solid_panel import closed_editor_payload, render_closure_stage, render_solid_result, render_blended_result
from editing_policy import render_policy, connection_settings


_component_directory = Path(__file__).with_name("scale_component") / "dist"
_component_version = hashlib.sha256((_component_directory / "editor.js").read_bytes()).hexdigest()[:12]
_component = declare_component(f"part_scale_editor_{_component_version}", path=str(_component_directory))


@st.cache_data(show_spinner=False)
def _load(content: bytes, manifest: dict, topology_version=GEOMETRY_VERSION):
    # Version the cache because connections now also retain their contact planes.
    parts = load_editable_parts(content, manifest)
    connections, warnings = detect_connections(content, parts)
    return parts, connections, warnings, has_rejoin_data(content, manifest)


@st.cache_data(show_spinner=False, max_entries=6)
def _load_following_network(content, manifest, preferred_pairs=(), method=NETWORK_FOLLOW_METHOD):
    parts, connections, _, _ = _load(content, manifest, GEOMETRY_VERSION)
    relations = [{"parent_id": a, "child_id": b} for a, b in preferred_pairs]
    return build_following_network(parts, connections, relations)


@st.cache_data(show_spinner=False, max_entries=6)
def _load_blend_distances(content, manifest, selected_ids, root_id, connection_ids=None, references=(), range_method=BLEND_METHOD):
    parts, connections, _, _ = _load(content, manifest, GEOMETRY_VERSION)
    if connection_ids is not None:
        connections = tuple(c for c in connections if c.connection_id in connection_ids)
    if range_method == BLEND_METHOD:
        return build_edit_blend_distances(content, manifest, parts, connections, selected_ids)
    return build_blend_distances(content, manifest, parts, connections, selected_ids, root_id, dict(references))


@st.cache_data(show_spinner=False, max_entries=12)
def _load_blending(content, manifest, selected_ids, ratio, root_id, connection_ids=None, references=(), range_method=BLEND_METHOD):
    fields = _load_blend_distances(content, manifest, selected_ids, root_id, connection_ids, references, range_method)
    return blend_weights(fields, ratio)


@st.cache_data(show_spinner=False, max_entries=12)
def _load_frames(content, manifest, up_dir, selected, enabled):
    parts, connections, _, _ = _load(content, manifest, GEOMETRY_VERSION)
    return build_movement_frames(content, parts, connections, up_dir, dict(selected), enabled=enabled)


@st.cache_data(show_spinner=False, max_entries=4)
def _load_motion_distances(content, manifest, connection_ids=None, range_method=MOTION_METHOD, selected_ids=None):
    parts, connections, _, _ = _load(content, manifest, GEOMETRY_VERSION)
    if connection_ids is not None:
        connections = tuple(c for c in connections if c.connection_id in connection_ids)
    return build_motion_distances(content, manifest, parts, connections, selected_ids)


@st.cache_data(show_spinner=False, max_entries=12)
def _load_motion(content, manifest, ratios, connection_ids=None, range_method=MOTION_METHOD):
    distances = _load_motion_distances(content, manifest, connection_ids, range_method, tuple(i for i, _ in ratios)) if ratios else {"parts": {}, "anchors": {}}
    return motion_weights(distances, dict(ratios))


@st.cache_data(show_spinner=False, max_entries=8)
def _check_overlaps(signature, _vertices, _faces, _frame):
    return find_face_overlaps(_vertices, _faces, frame=_frame)


def _overlaps(vertices, faces, frame=None):
    # Hash every coordinate: sampled hashes could miss small local edits.
    frame = overlap_frame(vertices) if frame is None else frame
    frame_bytes = np.asarray([*frame["origin"], frame["scale"]], dtype=np.float64).tobytes()
    schema = repr((vertices.shape, vertices.dtype.str, faces.shape, faces.dtype.str)).encode()
    signature = hashlib.sha256(OVERLAP_METHOD.encode() + frame_bytes + schema + vertices.tobytes() + faces.tobytes()).hexdigest()
    return _check_overlaps(signature, vertices, faces, frame)


@st.cache_data(show_spinner=False, max_entries=4)
def _reference_overlaps(content, manifest, method):
    parts, _, _, can_rejoin = _load(content, manifest, GEOMETRY_VERSION)
    vertices, faces, _ = assemble_parts(parts)
    report = _overlaps(vertices, faces)
    source_face_ids = None
    if can_rejoin:
        with np.load(io.BytesIO(content), allow_pickle=False) as data:
            ids = []
            for record in manifest["parts"]:
                prefix = record.get("npz_prefix", f"part_{record['part_id']:04d}")
                ids.append(data[f"{prefix}_source_face_indices"])
            source_face_ids = np.concatenate(ids)
    return report, source_face_ids


def render_part_editor(result: dict, content: bytes, up_dir: str, analysis=None) -> None:
    parts, connections, warnings, can_rejoin = _load(content, result, GEOMETRY_VERSION)
    source_key = editor_source_key(result, content)
    state = st.session_state.setdefault("part_editing", {})
    synchronize_editor(state, source_key, parts)
    available = [part.part_id for part in parts if len(part.faces)]
    names = {part.part_id: part.name for part in parts}
    policy = render_policy(result, analysis, parts, connections, source_key)
    auto_selected, blend_references, blend_ids = connection_settings(policy, connections)
    # This reference is only for closure/extension roles, not following or blending.
    root_id = policy["base_part_id"] if policy and policy["base_part_id"] in available else available[0]
    preferred_pairs = tuple(sorted((r["parent_id"], r["child_id"]) for r in policy["relations"])) if policy else ()
    with st.expander("詳細な形状編集設定"):
        if policy is None:
            root_id = st.selectbox("閉鎖・延長の本体（手動構成）", available,
                format_func=lambda index: f"{names[index]} (ID {index})", key=f"assembly_reference_{source_key}")
        follow = st.checkbox("編集したパーツから接続先へ追従", value=True, disabled=not connections, key=f"connection_follow_{source_key}")
        show_anchors = st.checkbox("接続点を表示", value=True, disabled=not connections, key=f"connection_points_{source_key}")
        plan = build_connection_plan(parts, connections, root_id, preferred_relations=policy["relations"] if policy else ())
        network = _load_following_network(content, result, preferred_pairs, NETWORK_FOLLOW_METHOD)
        layout = {**connection_payload(plan), **network}
        for warning in warnings:
            st.warning(warning)
        for attachment in plan.attachments:
            for warning in attachment.warnings:
                st.warning(f"{names[attachment.parent_id]} / {names[attachment.child_id]}: {warning}")
        if connections:
            plane_count = sum(len(a.planes) for a in plan.attachments)
            st.caption(f"接続領域：{len(connections)} / 追従の基準面：{plane_count if follow else 0}。丸印と線は断面中心のずれを表示します。方向追従では中心の一致を拘束しません。")
            st.caption("倍率を変えたパーツから、つながる別パーツへ法線方向の変位を伝えます。固定した追従の基準はありません。自分の倍率変更では自分を平行移動させず、複数の倍率変更は合成します。")
            if plan.unused_ids:
                st.warning("輪状の接続、または平面を取得できない接続が残っています。検出した接続関係で追従に使う領域を確認してください。")
            if len(plan.roots) > 1:
                st.caption("離れたグループの間では、追従を伝えません。")
        elif len(available) > 1:
            st.info("共有境界を検出できませんでした。離れたメッシュや頂点位置の異なる境界には、自動で接続を作りません。")
        connected_ids = {index for item in connections for index in (item.part_a, item.part_b)}
        if policy is None:
            selected = st.multiselect("境界なじませを適用するパーツ", [index for index in available if index in connected_ids] if can_rejoin else [],
                                     format_func=lambda index: f"{names[index]} (ID {index})", key=f"boundary_blend_parts_{source_key}")
        else:
            selected = list(auto_selected)
            st.caption("編集時になじませるパーツ：" + (", ".join(names[i] for i in selected) or "なし"))
        percent = st.slider("境界なじませの範囲（%）", 1, 100, int(DEFAULT_RATIO * 100), disabled=not selected, key=f"boundary_blend_range_{source_key}")
        st.caption("編集したパーツ自身の変形量を境界付近で調整し、追従後の接続先に合わせます。両方の編集は合成します。距離と重みは元の形状から計算して再利用し、幅は元のパーツのBoxの最長辺に対する割合（初期値60%）です。")
        with st.spinner("接続先の表面までの距離と重みを準備しています"):
            blending = _load_blending(content, result, tuple(sorted(selected)), percent / 100, None,
                blend_ids if policy else None, blend_references, BLEND_METHOD)
        blending = edit_blend_responses(blending, network, follow=bool(follow and connections))
        for warning in blending["warnings"]:
            st.warning(warning)
        motion_ratios = {}
        if policy:
            motion_ratios = {part_id: percent / 100 for part_id in selected}
            st.caption("なじませる接続では、移動したパーツ自身の移動量も境界で0へなじませます。閉鎖して再結合する断面は自由に移動します。")
        else:
            with st.expander("パーツごとの移動方法"):
                for part in parts:
                    enabled = can_rejoin and part.part_id in connected_ids and bool(len(part.faces))
                    mode = st.selectbox(f"{part.name} の移動方法", ["全体移動", "断面固定移動"], disabled=not enabled,
                                        key=f"boundary_motion_mode_{source_key}_{part.part_id}")
                    fixed = enabled and mode == "断面固定移動"
                    band = st.slider(f"{part.name} の遷移範囲（%）", 1, 100, int(DEFAULT_RATIO * 100), disabled=not fixed,
                                     key=f"boundary_motion_range_{source_key}_{part.part_id}")
                    if fixed:
                        motion_ratios[part.part_id] = band / 100
                st.caption("断面固定移動は、移動前のすべての共有境界を固定し、接続先の表面から離れるほど指定移動量へ滑らかに近づけます。幅は元のパーツを囲むBoxの最長辺に対する割合で、初期値60%です。")
        with st.spinner("断面固定移動の重みを準備しています"):
            motion = motion_from_blending(blending) if policy else _load_motion(content, result, tuple(sorted(motion_ratios.items())), range_method=MOTION_METHOD)
        for warning in motion["warnings"]:
            st.warning(warning)
        frame_mode = st.selectbox("移動方向の基準", ["断面の近似平面", "入力XYZ"], key=f"movement_mode_{source_key}")
        choices = {}
        with st.expander("移動軸の基準接続"):
            for part_id in available:
                candidates = sorted((item for item in connections if part_id in (item.part_a, item.part_b)),
                                    key=lambda item: (-item.boundary_length, item.connection_id))
                if len(candidates) > 1:
                    labels = {item.connection_id: f"{names[item.part_b if item.part_a == part_id else item.part_a]} / 接続 {item.connection_id}" for item in candidates}
                    choices[part_id] = st.selectbox(names[part_id], list(labels), format_func=lambda index, labels=labels: labels[index],
                                                   disabled=frame_mode == "入力XYZ", key=f"movement_connection_{source_key}_{part_id}")
            st.caption("複数の接続がある場合、初期値は境界が最も長い接続です。移動軸は元の境界から計算し、倍率や移動によって回転しません。")
        frames = _load_frames(content, result, up_dir, tuple(sorted(choices.items())), frame_mode != "入力XYZ")
        for frame in frames.values():
            if frame["warning"]:
                st.warning(frame["warning"])
        show_axes = st.checkbox("移動軸を表示", value=True, key=f"movement_axes_show_{source_key}")
        show_overlaps = st.checkbox("Faceの重なりを表示", value=True, key=f"show_overlaps_{source_key}")
        st.caption("未編集時にはない新しい交差ペアのFaceだけを赤く表示します。判定はスライダーを離した後に更新します。赤色は表示専用で、保存するモデルは元のパーツ色を保持します。")
        movement = translation_controls(parts)
        # Narrow the displayed controls while preserving validation of earlier edits.
        movement = {name: value * .2 for name, value in movement.items()}
        st.caption(f"全体移動はパーツ全体を動かし、断面固定移動は操作前の境界を固定します。軸の矢印は赤＝U、緑＝V、青＝N。断面がないパーツは入力XYZです。入力座標の単位で各軸 ±{movement['limit']:.6g}、刻み {movement['step']:.6g}。")
    if follow and connections:
        edited, automatic = follow_connected_parts(parts, state["scales"], network)
    else:
        edited = scale_parts(parts, state["scales"])
        automatic = {part.part_id: np.zeros(3) for part in parts}
    uniform_parts = edited
    edited = apply_boundary_blend(parts, edited, state["scales"], automatic, blending)
    baseline = edited
    # Manual offsets are applied after automatic following; they never propagate.
    edited = apply_boundary_motion(edited, state["offsets"], motion)
    # Both boundary blending and boundary-fixed movement can create local
    # deformation. Only exact uniform poses may skip internal overlap checks.
    uniform_ids = {part.part_id for part, uniform in zip(edited, uniform_parts)
                   if np.array_equal(part.vertices, uniform.vertices + state["offsets"][str(part.part_id)])}
    translations = {part.part_id: automatic[part.part_id] + state["offsets"][str(part.part_id)] for part in parts}
    residuals = connection_residuals(parts, state["scales"], connections, translations)
    samples = {**blending["anchors"], **motion["anchors"]}
    residuals = blended_anchor_residuals(edited, connections, {"anchors": samples}, residuals)
    blend_info = blend_metadata(blending, parts, state["scales"], automatic)
    if blend_info["conflicting_fixed_vertices"]:
        st.warning("同じ境界頂点に接する複数の未選択パーツの位置が一致していません。基準パーツ、次にID順で接続先を選びます。")
    metadata = {**layout, "enabled": bool(follow and connections), "root_id": root_id,
                "automatic_translations": {str(index): value.tolist() for index, value in automatic.items()},
                "manual_translations": state["offsets"],
                "translations": {str(index): value.tolist() for index, value in translations.items()},
                "anchor_residuals": {str(index): value for index, value in residuals.items()},
                "following_planes": following_diagnostics(parts, state["scales"], plan, automatic, compare_deformed_planes=True) if follow else [],
                "boundary_blending": blend_info, "movement_frames": frames, "boundary_motion": motion_metadata(motion)}
    if policy:
        metadata["editing_policy"] = {**policy, "base_part_id": root_id}
    all_blend = bool(policy and policy["relations"] and all(r["mode"] == "blend" for r in policy["relations"]))
    if all_blend:
        closed_snapshot, solid_settings = None, {}
        state.pop("solid_extension", None)
        state.pop("solid_union", None)
    else:
        state.pop("blend_joined", None)
        closed_snapshot, solid_settings = render_closure_stage(
            state, result, content, parts, baseline, metadata, up_dir, can_rejoin)
    solid_payload = closed_editor_payload(closed_snapshot, source_key)
    overlap_report, overlap_faces = None, {}
    reference_report, reference_face_ids = None, None
    if show_overlaps:
        vertices, faces, slices = assemble_parts(edited)
        uniform_groups = np.concatenate([np.full(len(part.faces), part.part_id if part.part_id in uniform_ids else -1,
                                                dtype=np.int64) for part in parts])
        with st.spinner("Faceの重なりを検査しています"):
            reference_report, reference_face_ids = _reference_overlaps(content, result, OVERLAP_METHOD)
            overlap_report = only_new_overlaps(_overlaps(vertices, faces, reference_report["frame"]), reference_report,
                                               uniform_groups=uniform_groups)
        overlap_faces = part_face_ids(overlap_report, slices)
        count = len(overlap_report["face_ids"])
        st.caption(f"新しく重なるFace：{count}面 / {overlap_report['pair_count']}組。未編集時の交差ペアは表示から除外しています。")
    state.update(edited_parts=edited, connections=metadata, overlap_report=overlap_report)
    sequence_before = state["sequence"]
    st.subheader("なじませながら形状を編集" if all_blend else "② パーツの形状を編集・移動")
    st.caption("連続した接続にはなじませを適用します。独立部品の接続部は③で延長します。" if policy else
        "移動しても①の蓋を保持します。接続のための移動制限・自動巻き戻しは行いません。接続部の延長は③を押した時に作成します。")
    if motion_ratios and policy is None:
        st.info("断面固定移動を選んでいるパーツがあります。断面を動かして延長を確認する場合は「詳細な形状編集設定 → パーツごとの移動方法」で全体移動を選んでください。")
    event = _component(
        source_key=source_key, parts=editor_payload(parts), scales=state["scales"],
        editor_protocol=11, blending=blending, movement_frames=frames, show_movement_axes=show_axes,
        solid_connections=solid_payload,
        boundary_motion=motion, motion_key=repr((motion["method"], sorted(motion_ratios.items()), blend_ids)),
        movement_key=f"{frame_mode}:{sorted(choices.items())}",
        blending_key=f"{BLEND_METHOD}:{sorted(selected)}:{percent}:{blend_ids}:{bool(follow)}",
        offsets=state["offsets"], movement=movement, show_overlaps=show_overlaps, overlap_faces=overlap_faces,
        overlap_status=(f"新しく重なるFace：{len(overlap_report['face_ids'])}面 / {overlap_report['pair_count']}組" if overlap_report else "重なり表示はオフです"),
        layout=layout, follow=bool(follow and connections), show_anchors=bool(show_anchors and connections),
        layout_key=f"{NETWORK_FOLLOW_METHOD}:{preferred_pairs}:{bool(follow)}:{bool(show_anchors)}",
        sequence=state["sequence"], up_dir=up_dir, default=None, key=f"part_scale_move_{source_key}",
    )
    synchronize_editor(state, source_key, parts, event, movement_frames=frames)
    if state["sequence"] != sequence_before:
        # Return the diagnostics for the newly committed pose to the same iframe.
        st.rerun()
    if connections:
        with st.expander("検出した接続関係"):
            used = {index for item in plan.attachments for plane in item.planes for index in plane["connection_ids"]}
            st.dataframe([{"接続ID": item.connection_id, "パーツA": names[item.part_a], "パーツB": names[item.part_b],
                           "追従に使用": bool(follow and item.connection_id in used), "接続点のずれ（入力座標単位）": residuals[item.connection_id]}
                          for item in connections], hide_index=True, width="stretch")
            if metadata["following_planes"]:
                st.dataframe([{"パーツA": names[row["parent_id"]], "パーツB": names[row["child_id"]],
                    "まとめた接続ID": ", ".join(map(str, row["connection_ids"])),
                    "法線X": row["normal"][0], "法線Y": row["normal"][1], "法線Z": row["normal"][2],
                    "法線方向の残差": row["normal_residual"]} for row in metadata["following_planes"]], hide_index=True, width="stretch")
                if any(row["normal_residual"] > movement["limit"] * 1e-7 for row in metadata["following_planes"]):
                    st.warning("一つの平行移動では複数の接続面を合わせられないため、法線方向のずれが残っています。なじませ・延長・結合の結果を確認してください。")
    st.download_button(
        "編集後 GLB", export_edited_glb(edited, source_key=source_key, scales=state["scales"], connection_metadata=metadata, offsets=state["offsets"]),
        file_name=f"{result['segmentation_id']}_scaled.glb", mime="model/gltf-binary", icon=":material/download:", key="download_edited_glb",
    )
    revision = rejoin_input_key(source_key, state["scales"], metadata)
    if all_blend:
        render_blended_result(state, result, content, parts, edited, revision, metadata, up_dir)
        return
    render_solid_result(state, result, content, parts, plan, solid_settings, closed_snapshot, motion, revision, metadata, up_dir)
    with st.expander("従来の閉鎖・再結合を比較（詳細）"):
        render_capping(state, content, result, parts, edited, revision, metadata, up_dir, can_rejoin)
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
            payload = rejoined_payload(joined)
            if show_overlaps:
                with st.spinner("結合後のFaceの重なりを検査しています"):
                    face_keys = np.where(joined.source_face_indices >= 0, joined.source_face_indices, -1 - np.arange(len(joined.mesh.faces)))
                    joined_vertices, joined_faces = np.asarray(joined.mesh.vertices), np.asarray(joined.mesh.faces)
                    joined_groups = np.full(len(joined_faces), -1, dtype=np.int64)
                    original_ids = np.flatnonzero(joined.source_face_indices >= 0)
                    assembled_ids = np.argsort(reference_face_ids)[joined.source_face_indices[original_ids]]
                    # Welding can move original vertices slightly. Only retain the
                    # uniform exemption for faces whose coordinates stayed exact;
                    # all changed originals and all new bridge faces are checked.
                    preserved = np.all(joined_vertices[joined_faces[original_ids]] == vertices[faces[assembled_ids]], axis=(1, 2))
                    joined_groups[original_ids[preserved]] = uniform_groups[assembled_ids[preserved]]
                    report = only_new_overlaps(_overlaps(joined_vertices, joined_faces, reference_report["frame"]),
                                               reference_report, face_keys=face_keys, reference_face_keys=reference_face_ids,
                                               uniform_groups=joined_groups)
                saved["overlap_report"] = report
                marked = set(report["face_ids"])
                payload["face_colors"] = ["#e12b35" if index in marked else color for index, color in enumerate(payload["face_colors"])]
                bridges = sum(bool(joined.is_bridge[index]) for index in marked)
                st.caption(f"結合後の新しく重なるFace：{len(marked)}面（うち追加面：{bridges}面）/ {report['pair_count']}組。未編集時の交差ペアは表示から除外しています。")
            st.plotly_chart(mesh_figure([payload], up_dir=up_dir), width="stretch", key=f"rejoined_view_{revision}_{up_dir}", config=mesh_viewer_config())
            st.download_button("結合後 GLB", saved["glb"], file_name=f"{result['segmentation_id']}_rejoined.glb",
                               mime="model/gltf-binary", key="download_rejoined_glb", icon=":material/download:")
            st.download_button("結合後 NPZ", saved["npz"], file_name=f"{result['segmentation_id']}_rejoined.npz",
                               mime="application/octet-stream", key="download_rejoined_npz", icon=":material/download:")
