"""Use the existing text planner's decisions; never classify mesh geometry."""
import streamlit as st


def policy_for(manifest, analysis=None):
    candidate = manifest.get("editing_policy")
    if candidate is None and analysis is not None:
        if any(analysis.get(k) != manifest.get(k) for k in ("model_id", "plan_id")):
            raise ValueError("接続方針と分割結果のIDが一致しません。")
        candidate = analysis.get("editing_policy")
    if candidate is None:
        return None
    known = {p["part_id"] for p in manifest["parts"]}
    if (not isinstance(candidate, dict) or candidate.get("version") != 1
            or candidate.get("base_part_id") not in known or not isinstance(candidate.get("relations"), list)):
        raise ValueError("LLMの基準パーツが分割結果にありません。")
    pairs, parents = set(), {}
    for r in candidate.get("relations", []):
        pair = frozenset((r["parent_id"], r["child_id"]))
        if (len(pair) != 2 or not pair <= known or pair in pairs
                or {r["reference_part_id"], r["deform_part_id"]} != pair
                or r["mode"] not in {"blend", "cap_union"}
                or r.get("relationship") != ("continuous" if r["mode"] == "blend" else "attachment")
                or not isinstance(r.get("reason"), str) or not r["reason"].strip()
                or r["child_id"] == candidate["base_part_id"] or r["child_id"] in parents):
            raise ValueError("LLMの接続方針に不正な参照・重複があります。")
        pairs.add(pair)
        parents[r["child_id"]] = r["parent_id"]
    for part in known:
        seen = set()
        while part in parents:
            if part in seen:
                raise ValueError("LLMの付属関係が循環しています。")
            seen.add(part)
            part = parents[part]
    return candidate


def policy_rows(policy, names):
    return [{"本体側": names[r["parent_id"]], "付属・連続領域": names[r["child_id"]],
             "方式": "なじませ" if r["mode"] == "blend" else "閉鎖して再結合",
             "基準側": "接続先" if r["mode"] == "blend" else names[r["reference_part_id"]],
             "変形側": "編集したパーツ" if r["mode"] == "blend" else names[r["deform_part_id"]],
             "判定理由": r["reason"]} for r in policy["relations"]]


def render_policy(manifest, analysis, parts, connections, source_key):
    try:
        prediction = policy_for(manifest, analysis)
    except (KeyError, TypeError, ValueError) as error:
        st.warning(f"自動接続方針を適用できません：{error}")
        return None
    if prediction is None:
        return None
    names = {p.part_id: p.name for p in parts}
    available = {p.part_id for p in parts if len(p.faces)}
    root = prediction["base_part_id"]
    if root not in available:
        st.warning(f"推定された本体 {names[root]} に面がないため、基準側を確認してください。")
    expected = {frozenset((r["parent_id"], r["child_id"])): r for r in prediction["relations"]}
    actual = {frozenset((c.part_a, c.part_b)) for c in connections}
    for pair in expected.keys() - actual:
        st.warning("推定された接続の共有境界がありません：" + " / ".join(names[i] for i in sorted(pair)))
    relations = []
    with st.expander("LLMによる接続方針・変更", expanded=True):
        st.caption(f"推定された本体：{names[root]}。物体名と編集要求からの推定です。形状の滑らかさを測定した分類ではありません。")
        for pair in sorted(actual, key=lambda p: tuple(sorted(p))):
            a, b = sorted(pair)
            original = expected.get(pair)
            if original is None:
                reference = root if root in pair else a
                original = {"parent_id": reference, "child_id": next(i for i in pair if i != reference),
                    "reference_part_id": reference, "deform_part_id": next(i for i in pair if i != reference),
                    "mode": "cap_union", "reason": "この接続はLLMの推定に含まれません。方式を確認してください。"}
                st.warning(original["reason"])
            prefix = f"policy_{source_key}_{a}_{b}"
            mode = st.selectbox(f"{names[a]} / {names[b]} の接続方式", ["blend", "cap_union"],
                index=["blend", "cap_union"].index(original["mode"]),
                format_func=lambda m: "なじませ" if m == "blend" else "閉鎖して再結合", key=prefix + "_mode")
            reference = original["reference_part_id"]
            if mode == "blend":
                st.caption("なじませは編集したパーツに適用します。両方の編集は合成し、固定の基準側は使いません。")
            else:
                reference = st.selectbox(f"{names[a]} / {names[b]} の基準側", [a, b],
                    index=[a, b].index(original["reference_part_id"]), format_func=names.__getitem__, key=prefix + "_reference")
            relations.append({**original, "mode": mode,
                "relationship": "continuous" if mode == "blend" else "attachment",
                "blend_application": "edited_part" if mode == "blend" else None,
                "reference_part_id": reference, "deform_part_id": b if reference == a else a})
        runtime = {**prediction, "relations": relations}
        if relations:
            st.dataframe(policy_rows(runtime, names), hide_index=True, width="stretch")
    return runtime


def connection_settings(policy, connections):
    if policy is None:
        return None, (), ()
    by_pair = {frozenset((r["parent_id"], r["child_id"])): r for r in policy["relations"]}
    selected, references = set(), []
    for c in connections:
        r = by_pair.get(frozenset((c.part_a, c.part_b)))
        if r and r["mode"] == "blend":
            selected.update((c.part_a, c.part_b))
            references.append(c.connection_id)
    return tuple(sorted(selected)), (), tuple(sorted(references))
