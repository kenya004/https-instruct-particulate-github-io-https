// Coordinates remain in the input scene. Attachments are ordered parent first.
export function transformedAnchor(part, scale, anchor, translation = [0, 0, 0]) {
  return anchor.map((value, axis) => value + (scale - 1) * (value - part.center[axis]) + translation[axis]);
}

export function solveTranslations(parts, scales, attachments, offsets = {}) {
  const byId = new Map(parts.map(part => [part.part_id, part]));
  const translations = Object.fromEntries(parts.map(part => [String(part.part_id), [0, 0, 0]]));
  for (const attachment of attachments) {
    const parent = byId.get(attachment.parent_id);
    const child = byId.get(attachment.child_id);
    // Subtract anchor displacements so unit scales produce exact zero motion.
    translations[String(child.part_id)] = attachment.anchor.map((value, axis) =>
      (scales[String(parent.part_id)] - 1) * (value - parent.center[axis]) + translations[String(parent.part_id)][axis]
      - (scales[String(child.part_id)] - 1) * (value - child.center[axis]));
  }
  // Add manual motion after solving every connection, so children do not follow it.
  return Object.fromEntries(parts.map(part => {
    const id = String(part.part_id);
    return [id, translations[id].map((value, axis) => value + (offsets[id]?.[axis] ?? 0))];
  }));
}
