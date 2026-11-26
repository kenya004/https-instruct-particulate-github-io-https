// Coordinates remain in the input scene. Attachments are ordered parent first.
export function transformedAnchor(part, scale, anchor, translation = [0, 0, 0]) {
  return anchor.map((value, axis) => value + (scale - 1) * (value - part.center[axis]) + translation[axis]);
}

export function solveTranslations(parts, scales, layout, offsets = {}) {
  const byId = new Map(parts.map(part => [part.part_id, part]));
  const translations = Object.fromEntries(parts.map(part => [String(part.part_id), [0, 0, 0]]));
  const vector = value => Array.isArray(value) && value.length === 3
    && value.every(item => typeof item === 'number' && Number.isFinite(item));
  if (layout?.following_method === 'each_edited_part_drives_contacts_v1') {
    if (!Array.isArray(layout.responses)) throw new Error('編集パーツからの追従データが不正です。');
    for (const response of layout.responses) {
      if (response.source_id === response.target_id || !byId.get(response.source_id)?.center
          || !byId.get(response.target_id)?.center || !vector(response.displacement)) {
        throw new Error('追従元と接続先のパーツデータが不正です。');
      }
      const delta = scales[String(response.source_id)] - 1;
      if (!Number.isFinite(delta)) throw new Error('追従元の倍率が不正です。');
      response.displacement.forEach((value, axis) => { translations[String(response.target_id)][axis] += delta * value; });
    }
  } else {
    const attachments = Array.isArray(layout) ? layout : layout?.attachments ?? [];
    for (const attachment of attachments) {
      const parent = byId.get(attachment.parent_id);
      const child = byId.get(attachment.child_id);
      const projection = attachment.projection, displacement = attachment.scale_displacement;
      if (!parent?.center || !child?.center || attachment.following_method !== 'reference_plane_normal_v1'
          || !Array.isArray(projection) || projection.length !== 3 || !projection.every(vector) || !vector(displacement)) {
        throw new Error('接続方向の追従データが不正です。Windows側のUIを再起動して画面を読み込み直してください。');
      }
      translations[String(child.part_id)] = projection.map((row, axis) =>
        row.reduce((value, coefficient, index) => value + coefficient * translations[String(parent.part_id)][index], 0)
        + (scales[String(parent.part_id)] - 1) * displacement[axis]);
    }
  }
  // Add manual motion after solving every connection, so children do not follow it.
  return Object.fromEntries(parts.map(part => {
    const id = String(part.part_id);
    return [id, translations[id].map((value, axis) => value + (offsets[id]?.[axis] ?? 0))];
  }));
}
