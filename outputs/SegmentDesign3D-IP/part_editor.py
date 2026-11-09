from pathlib import Path
import hashlib
import io

import streamlit as st
import numpy as np
from streamlit.components.v1 import declare_component

from editing import editor_payload, editor_source_key, export_edited_glb, load_editable_parts, scale_parts, synchronize_editor, translation_controls
from connections import build_connection_plan, connection_payload, connection_residuals, detect_connections, follow_connections
from boundary_blending import apply_boundary_blend, blend_metadata, blended_anchor_residuals, build_boundary_blend
from boundary_motion import apply_boundary_motion, build_motion_distances, motion_metadata, motion_weights
from movement_axes import build_movement_frames
from mesh_overlaps import METHOD as OVERLAP_METHOD, assemble_parts, find_face_overlaps, only_new_overlaps, overlap_frame, part_face_ids
from rejoining import export_rejoined_glb, export_rejoined_npz, has_rejoin_data, rejoin_input_key, rejoin_parts, rejoined_payload
from viewer import mesh_figure, mesh_viewer_config


_component_directory = Path(__file__).with_name("scale_component") / "dist"
_component_version = hashlib.sha256((_component_directory / "editor.js").read_bytes()).hexdigest()[:12]
_component = declare_component(f"part_scale_editor_{_component_version}", path=str(_component_directory))


@st.cache_data(show_spinner=False)
def _load(content: bytes, manifest: dict, topology_version=2):
    # Version the cache because connections now also retain their source edges.
    parts = load_editable_parts(content, manifest)
    connections, warnings = detect_connections(content, parts)
    return parts, connections, warnings, has_rejoin_data(content, manifest)


@st.cache_data(show_spinner=False, max_entries=12)
def _load_blending(content, manifest, selected_ids, ratio, root_id):
    parts, connections, _, _ = _load(content, manifest, 2)
    return build_boundary_blend(content, manifest, parts, connections, selected_ids, ratio, root_id)


@st.cache_data(show_spinner=False, max_entries=12)
def _load_frames(content, manifest, up_dir, selected, enabled):
    parts, connections, _, _ = _load(content, manifest, 2)
    return build_movement_frames(content, parts, connections, up_dir, dict(selected), enabled=enabled)


@st.cache_data(show_spinner=False, max_entries=4)
def _load_motion_distances(content, manifest):
    parts, connections, _, _ = _load(content, manifest, 2)
    return build_motion_distances(content, manifest, parts, connections)


@st.cache_data(show_spinner=False, max_entries=12)
def _load_motion(content, manifest, ratios):
    distances = _load_motion_distances(content, manifest) if ratios else {"parts": {}, "anchors": {}}
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
    parts, _, _, can_rejoin = _load(content, manifest, 2)
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


def render_part_editor(result: dict, content: bytes, up_dir: str) -> None:
    parts, connections, warnings, can_rejoin = _load(content, result, 2)
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
        st.caption("拡大縮小に伴う接続位置へ追従します。移動操作で境界を残す場合は、下の移動方法から断面固定移動を選んでください。")
        if plan.unused_ids:
            st.warning("輪状の接続または同じパーツ間の複数接続があります。境界の長い接続を優先して追従し、使わない接続のずれも表示します。")
        if len(plan.roots) > 1:
            st.caption("基準パーツにつながらないグループは、それぞれID最小の非空パーツの位置を固定します。")
    elif len(available) > 1:
        st.info("共有境界を検出できませんでした。離れたメッシュや頂点位置の異なる境界には、自動で接続を作りません。")
    connected_ids = {index for item in connections for index in (item.part_a, item.part_b)}
    selected = st.multiselect("境界なじませを適用するパーツ", [index for index in available if index in connected_ids] if can_rejoin else [],
                             format_func=lambda index: f"{names[index]} (ID {index})", key=f"boundary_blend_parts_{source_key}")
    percent = st.slider("境界なじませの範囲（%）", 1, 100, 20, disabled=not selected, key=f"boundary_blend_range_{source_key}")
    st.caption("選択したパーツの境界を接続先に合わせ、内部へ向かって指定倍率に戻します。範囲は境界から最奥までのメッシュに沿った距離に対する割合です。手動XYZ移動は最後に加えます。")
    with st.spinner("境界からの距離を計算しています"):
        blending = _load_blending(content, result, tuple(sorted(selected)), percent / 100, root_id)
    for warning in blending["warnings"]:
        st.warning(warning)
    motion_ratios = {}
    with st.expander("パーツごとの移動方法"):
        for part in parts:
            enabled = can_rejoin and part.part_id in connected_ids and bool(len(part.faces))
            mode = st.selectbox(f"{part.name} の移動方法", ["全体移動", "断面固定移動"], disabled=not enabled,
                                key=f"boundary_motion_mode_{source_key}_{part.part_id}")
            fixed = enabled and mode == "断面固定移動"
            band = st.slider(f"{part.name} の遷移範囲（%）", 1, 100, 20, disabled=not fixed,
                             key=f"boundary_motion_range_{source_key}_{part.part_id}")
            if fixed:
                motion_ratios[part.part_id] = band / 100
        st.caption("断面固定移動は、移動前のすべての共有境界を固定し、メッシュに沿った距離に応じて指定移動量へ滑らかに近づけます。範囲は境界から最奥までの距離に対する割合です。")
    with st.spinner("断面固定移動の重みを準備しています"):
        motion = _load_motion(content, result, tuple(sorted(motion_ratios.items())))
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
    st.caption("未編集時にはない新しい交差ペアのFaceだけを赤く表示します。判定はスライダーを離した後に更新します。編集は制限せず、保存するモデルは元のパーツ色を保持します。")
    movement = translation_controls(parts)
    st.caption(f"全体移動は接触を維持しません。断面固定移動は操作前の境界を固定します。軸の矢印は赤＝U、緑＝V、青＝N。断面がないパーツは入力XYZです。入力座標の単位で各軸 ±{movement['limit']:.6g}、刻み {movement['step']:.6g}。")
    if follow and connections:
        edited, automatic = follow_connections(parts, state["scales"], plan)
    else:
        edited = scale_parts(parts, state["scales"])
        automatic = {part.part_id: np.zeros(3) for part in parts}
    uniform_parts = edited
    edited = apply_boundary_blend(parts, edited, state["scales"], automatic, blending)
    # Manual offsets are applied after the whole attachment tree is solved; they never propagate.
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
                "boundary_blending": blend_info, "movement_frames": frames, "boundary_motion": motion_metadata(motion)}
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
    event = _component(
        source_key=source_key, parts=editor_payload(parts), scales=state["scales"],
        editor_protocol=6, blending=blending, movement_frames=frames, show_movement_axes=show_axes,
        boundary_motion=motion, motion_key=repr(sorted(motion_ratios.items())),
        movement_key=f"{frame_mode}:{sorted(choices.items())}",
        blending_key=f"{root_id}:{sorted(selected)}:{percent}",
        offsets=state["offsets"], movement=movement, show_overlaps=show_overlaps, overlap_faces=overlap_faces,
        overlap_status=(f"新しく重なるFace：{len(overlap_report['face_ids'])}面 / {overlap_report['pair_count']}組" if overlap_report else "重なり表示はオフです"),
        layout=layout, follow=bool(follow and connections), show_anchors=bool(show_anchors and connections),
        layout_key=f"{root_id}:{bool(follow)}:{bool(show_anchors)}",
        sequence=state["sequence"], up_dir=up_dir, default=None, key=f"part_scale_move_{source_key}",
    )
    synchronize_editor(state, source_key, parts, event, movement_frames=frames)
    if state["sequence"] != sequence_before:
        # Return the diagnostics for the newly committed pose to the same iframe.
        st.rerun()
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
