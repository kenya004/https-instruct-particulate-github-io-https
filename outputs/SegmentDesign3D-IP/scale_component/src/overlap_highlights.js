export function normalizeOverlapFaces(value, parts) {
  const result = {};
  for (const part of parts) {
    const ids = value?.[String(part.part_id)] ?? [];
    if (!Array.isArray(ids) || !ids.every(id => Number.isInteger(id) && id >= 0 && id < part.faces.length / 3)) {
      throw new Error('重なり表示のFace対応が不正です。');
    }
    result[String(part.part_id)] = ids;
  }
  return result;
}

export function highlightPositions(positions, indices, faceIds, output = new Float32Array(faceIds.length * 9)) {
  let offset = 0;
  for (const face of faceIds) {
    for (let corner = 0; corner < 3; corner += 1) {
      const vertex = indices[face * 3 + corner] * 3;
      for (let axis = 0; axis < 3; axis += 1) output[offset++] = positions[vertex + axis];
    }
  }
  return output;
}
