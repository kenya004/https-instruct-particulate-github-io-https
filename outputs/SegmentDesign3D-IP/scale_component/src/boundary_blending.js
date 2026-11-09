// Use the Python-precomputed rest-mesh weights for both preview and export.
export function affineTransforms(parts, scales, automatic) {
  return Object.fromEntries(parts.filter(part => part.center).map(part => {
    const scale = scales[String(part.part_id)];
    return [String(part.part_id), { scale,
      shift: part.center.map((value, axis) => (1 - scale) * value + automatic[String(part.part_id)][axis]) }];
  }));
}

export function blendedPoint(part, index, transforms, spec) {
  const point = part.vertices[index], own = transforms[String(part.part_id)];
  const baseline = point.map((value, axis) => own.scale * value + own.shift[axis]);
  const result = [...baseline];
  for (const influence of spec?.influences ?? []) {
    const weight = influence.weights[index];
    if (!weight) continue;
    const reference = transforms[String(influence.reference_part_id)];
    for (let axis = 0; axis < 3; axis += 1) {
      result[axis] += weight * (reference.scale * point[axis] + reference.shift[axis] - baseline[axis]);
    }
  }
  return result;
}

export function writeBlendedPositions(part, transforms, spec, output, offset = [0, 0, 0], motion = null) {
  const own = transforms[String(part.part_id)];
  // Write local coordinates directly; no temporary vectors per vertex.
  for (let index = 0; index < part.vertices.length; index += 1) {
    const point = part.vertices[index];
    for (let axis = 0; axis < 3; axis += 1) {
      const baseline = own.scale * point[axis] + own.shift[axis];
      let value = baseline;
      for (const influence of spec.influences) {
        const reference = transforms[String(influence.reference_part_id)];
        value += influence.weights[index] * (reference.scale * point[axis] + reference.shift[axis] - baseline);
      }
      output[index * 3 + axis] = value + (motion?.weights[index] ?? 1) * offset[axis] - part.center[axis];
    }
  }
}

export function sampledAnchor(sample, byId, transforms, blending, offsets, motion = {parts: {}}) {
  const part = byId.get(sample.part_id), result = [0, 0, 0];
  const spec = motion.parts[String(sample.part_id)];
  let manualWeight = 0;
  for (const [index, vertex] of sample.indices.entries()) {
    const point = blendedPoint(part, vertex, transforms, blending.parts[String(part.part_id)]);
    for (let axis = 0; axis < 3; axis += 1) result[axis] += sample.weights[index] * point[axis];
    manualWeight += sample.weights[index] * (spec?.weights[vertex] ?? 1);
  }
  return result.map((value, axis) => value + (spec ? manualWeight : 1) * offsets[String(part.part_id)][axis]);
}

export function normalizeBlending(value, parts) {
  if (value == null) return { parts: {}, anchors: {} };
  const byId = new Map(parts.map(part => [part.part_id, part]));
  const specs = value.parts ?? {}, anchors = value.anchors ?? {};
  const fail = () => { throw new Error("境界なじませの頂点対応または重みが不正です。"); };
  for (const [id, spec] of Object.entries(specs)) {
    const part = byId.get(Number(id));
    if (!part?.center || !Array.isArray(spec?.influences)) fail();
    const sums = new Float64Array(part.vertices.length);
    const references = new Set();
    for (const influence of spec.influences) {
      if (!byId.get(influence.reference_part_id)?.center || references.has(influence.reference_part_id)
          || !Array.isArray(influence.weights) || influence.weights.length !== part.vertices.length) fail();
      references.add(influence.reference_part_id);
      for (const [index, weight] of influence.weights.entries()) {
        if (typeof weight !== "number" || !Number.isFinite(weight) || weight < 0 || weight > 1) fail();
        sums[index] += weight;
        if (sums[index] > 1 + 1e-8) fail();
      }
    }
  }
  for (const samples of Object.values(anchors)) {
    if (!Array.isArray(samples) || samples.length !== 2) fail();
    for (const sample of samples) {
      const part = byId.get(sample?.part_id);
      if (!part?.center || !Array.isArray(sample.indices) || !sample.indices.length
          || !Array.isArray(sample.weights) || sample.indices.length !== sample.weights.length) fail();
      let sum = 0;
      for (const [i, vertex] of sample.indices.entries()) {
        const weight = sample.weights[i];
        if (!Number.isInteger(vertex) || vertex < 0 || vertex >= part.vertices.length
            || typeof weight !== "number" || !Number.isFinite(weight) || weight < 0) fail();
        sum += weight;
      }
      if (Math.abs(sum - 1) > 1e-8) fail();
    }
  }
  return { ...value, parts: specs, anchors };
}
