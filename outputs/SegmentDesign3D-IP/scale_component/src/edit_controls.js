export const PARAMETERS = ['uniform_scale', 'translate_u', 'translate_v', 'translate_n'];

export function normalizeEditControls(value, parts) {
  if (value == null) return {version: 1, source: 'legacy_all', parts: Object.fromEntries(
    parts.map(p => [String(p.part_id), {parameters: [...PARAMETERS], reason: '以前の分析結果：全操作を表示'}]))};
  const fail = () => { throw new Error('編集パラメータの選択結果が不正です。パーツ構成を再作成してください。'); };
  if (value.version !== 1 || !['legacy_all', 'part_planner_text'].includes(value.source)
      || value.parts == null || typeof value.parts !== 'object' || Array.isArray(value.parts)
      || Object.keys(value.parts).length !== parts.length) fail();
  const specs = {};
  for (const part of parts) {
    const id = String(part.part_id), spec = value.parts[id];
    if (!Array.isArray(spec?.parameters) || !spec.parameters.every(p => PARAMETERS.includes(p))
        || new Set(spec.parameters).size !== spec.parameters.length
        || typeof spec.reason !== 'string' || !spec.reason.trim()) fail();
    specs[id] = {parameters: PARAMETERS.filter(p => spec.parameters.includes(p)), reason: spec.reason};
  }
  return {version: 1, source: value.source, parts: specs};
}

export function applyParameterVisibility(widget, selection) {
  const parameters = selection.parameters;
  widget.parameters = parameters;
  widget.row.hidden = parameters.length === 0;
  widget.row.title = selection.reason;
  const scale = parameters.includes('uniform_scale');
  widget.input.hidden = widget.output.hidden = widget.endpoints.hidden = !scale;
  widget.input.disabled = widget.empty || !scale;
  widget.motionLabel.hidden = !parameters.some(p => p !== 'uniform_scale');
  widget.moveControls.forEach((control, axis) => {
    const enabled = parameters.includes(PARAMETERS[axis + 1]);
    control.hidden = !enabled;
    widget.moveInputs[axis].disabled = widget.empty || !enabled;
  });
}
