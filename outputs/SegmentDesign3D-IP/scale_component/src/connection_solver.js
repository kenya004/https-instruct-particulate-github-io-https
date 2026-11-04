// Coordinates remain in the input scene. Attachments are ordered parent first.
export function transformedAnchor(part, scale, anchor, translation = [0, 0, 0]) {
  return anchor.map((value, axis) => part.center[axis] + scale * (value - part.center[axis]) + translation[axis]);
}

export function solveTranslations(parts, scales, attachments, offsets = {}) {
  const byId = new Map(parts.map(part => [part.part_id, part]));
  const translations = Object.fromEntries(parts.map(part => [String(part.part_id), [0, 0, 0]]));
  for (const attachment of attachments) {
    const parent = byId.get(attachment.parent_id);
    const child = byId.get(attachment.child_id);
    const parentAnchor = transformedAnchor(parent, scales[String(parent.part_id)], attachment.anchor, translations[String(parent.part_id)]);
    const childAnchor = transformedAnchor(child, scales[String(child.part_id)], attachment.anchor);
    translations[String(child.part_id)] = parentAnchor.map((value, axis) => value - childAnchor[axis]);
  }
  // Add manual motion after solving every connection, so children do not follow it.
  return Object.fromEntries(parts.map(part => {
    const id = String(part.part_id);
    return [id, translations[id].map((value, axis) => value + (offsets[id]?.[axis] ?? 0))];
  }));
}
