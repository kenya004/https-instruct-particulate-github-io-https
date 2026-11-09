import { normalizeBlending } from './boundary_blending.js';

export function normalizeBoundaryMotion(value, parts) {
  if (value == null) return {parts: {}, anchors: {}};
  const fail = () => { throw new Error('断面固定移動の頂点対応または重みが不正です。'); };
  if (typeof value !== 'object' || Array.isArray(value)) fail();
  const byId = new Map(parts.map(part => [String(part.part_id), part]));
  const specs = {};
  for (const [id, spec] of Object.entries(value.parts ?? {})) {
    const part = byId.get(id);
    if (!part?.center || !Array.isArray(spec?.weights) || spec.weights.length !== part.vertices.length
        || !spec.weights.every(weight => typeof weight === 'number' && Number.isFinite(weight) && weight >= 0 && weight <= 1)) fail();
    const ratio = spec.ratio ?? .2;
    if (typeof ratio !== 'number' || !Number.isFinite(ratio) || ratio <= 0 || ratio > 1) fail();
    specs[id] = {...spec, ratio};
  }
  const {anchors} = normalizeBlending({anchors: value.anchors}, parts);
  return {...value, parts: specs, anchors};
}
