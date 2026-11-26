import { affineTransforms, writeBlendedPositions } from "./boundary_blending.js";
import { solveTranslations } from "./connection_solver.js";

// This is a bounded, sampled preview. The server performs the exact solid check.
const SAMPLE_LIMIT = 64;
const LEAF_SIZE = 8;
const normalized = new WeakSet();
const normalizationCache = new WeakMap();
const geometryCache = new WeakMap();
const record = value => value !== null && typeof value === "object" && !Array.isArray(value);
const finite = value => typeof value === "number" && Number.isFinite(value);
const vector = value => Array.isArray(value) && value.length === 3 && value.every(finite);
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const faceKey = (a, b, c) => [a, b, c].sort((x, y) => x - y).join(",");
const copyOffsets = offsets => Object.fromEntries(Object.entries(offsets).map(([id, point]) => [id, [...point]]));

export function normalizeSolidConnections(value, parts, sourceKey) {
  if (value == null || value?.enabled === false) return null;
  if (record(value) && value.source_key != null && value.source_key !== sourceKey) return null;
  if (normalized.has(value)) return value.source_key === sourceKey ? value : null;
  const cached = record(value) && normalizationCache.get(value);
  if (cached && cached.parts === parts && cached.sourceKey === sourceKey) return cached.payload;
  const payload = { enabled: true, preview_only: value?.preview_only === true, source_key: sourceKey, revision: "", depth_ratio: .01,
    max_extension_ratio: .05, parts: {}, regions: [] };
  const fail = () => { throw new Error("閉鎖形状のプレビューまたは頂点対応が不正です。"); };
  try {
    if (!record(value) || value.enabled !== true || typeof value.revision !== "string"
        || !record(value.parts) || !Array.isArray(value.regions)) fail();
    payload.revision = value.revision;
    payload.depth_ratio = value.depth_ratio ?? .01;
    payload.max_extension_ratio = value.max_extension_ratio ?? .05;
    if (!finite(payload.depth_ratio) || payload.depth_ratio <= 0 || !finite(payload.max_extension_ratio)
        || payload.max_extension_ratio <= 0 || payload.depth_ratio > payload.max_extension_ratio) fail();
    const byId = new Map(parts.map(part => [String(part.part_id), part]));
    const indices = (items, count, minimum = 3) => {
      if (!Array.isArray(items) || items.length < minimum
          || !items.every(index => Number.isInteger(index) && index >= 0 && index < count)) fail();
      return [...items];
    };
    const loop = (items, count) => {
      const result = indices(items, count);
      if (result[0] === result.at(-1)) result.pop();
      if (new Set(result).size < 3 || new Set(result).size !== result.length) fail();
      return result;
    };
    for (const [id, spec] of Object.entries(value.parts)) {
      const part = byId.get(id);
      if (!part || !vector(part.center) || !record(spec) || !Array.isArray(spec.vertices)
          || !spec.vertices.every(vector) || !Number.isInteger(spec.original_vertex_count)
          || spec.original_vertex_count !== part.vertices.length || spec.vertices.length < part.vertices.length) fail();
      const faces = indices(spec.faces, spec.vertices.length);
      if (faces.length % 3 || !Array.isArray(spec.centers ?? [])) fail();
      const seen = new Set();
      const centers = (spec.centers ?? []).map(center => {
        if (!record(center) || !Number.isInteger(center.index) || center.index < part.vertices.length
            || center.index >= spec.vertices.length || seen.has(center.index)) fail();
        seen.add(center.index);
        return { index: center.index, loop: loop(center.loop, part.vertices.length) };
      });
      if (faces.some(index => index >= part.vertices.length && !seen.has(index))) fail();
      const previewFaces = spec.preview_faces == null ? null : indices(spec.preview_faces, spec.vertices.length, 0);
      if (previewFaces && previewFaces.length % 3) fail();
      payload.parts[id] = { vertices: spec.vertices.map(point => [...point]), faces,
        preview_faces: previewFaces, original_vertex_count: part.vertices.length, centers };
    }
    for (const [id, part] of byId) if (part.vertices.length && !payload.parts[id]) fail();
    if (value.frame != null) {
      if (!record(value.frame) || !vector(value.frame.origin) || !finite(value.frame.scale) || value.frame.scale <= 0) fail();
      payload.frame = { origin: [...value.frame.origin], scale: value.frame.scale };
    } else {
      const lower = [Infinity, Infinity, Infinity], upper = [-Infinity, -Infinity, -Infinity];
      for (const spec of Object.values(payload.parts)) for (const point of spec.vertices) {
        for (let axis = 0; axis < 3; axis += 1) {
          lower[axis] = Math.min(lower[axis], point[axis]);
          upper[axis] = Math.max(upper[axis], point[axis]);
        }
      }
      const scale = Math.max(...upper.map((value, axis) => value - lower[axis]));
      payload.frame = { origin: lower.map((value, axis) => (value + upper[axis]) / 2),
        scale: finite(scale) && scale > 0 ? scale : 1 };
    }
    payload.regions = value.regions.map((region, index) => {
      if (!record(region)) fail();
      const parent = payload.parts[String(region.parent_id)], child = payload.parts[String(region.child_id)];
      if (!parent || !child || String(region.parent_id) === String(region.child_id) || !vector(region.normal)
          || !Array.isArray(region.connection_ids) || !region.connection_ids.length
          || !region.connection_ids.every(id => typeof id === "string" || Number.isInteger(id))
          || !Array.isArray(region.child_loops) || !region.child_loops.length
          || !Array.isArray(region.parent_loops) || !region.parent_loops.length
          || !Array.isArray(region.pairs) || !Array.isArray(region.cap_faces)) fail();
      const length = Math.hypot(...region.normal);
      if (!finite(length) || length < 1e-12) fail();
      const pairs = region.pairs.map(pair => {
        if (!Array.isArray(pair) || pair.length !== 2) fail();
        indices([pair[0]], child.original_vertex_count, 1);
        indices([pair[1]], parent.original_vertex_count, 1);
        return [...pair];
      });
      const capFaces = region.cap_faces.map(face => {
        if (face?.length !== 3) fail();
        const result = indices(face, child.vertices.length);
        if (result.some(index => index >= child.original_vertex_count && !child.centers.some(center => center.index === index))) fail();
        return result;
      });
      return { region_index: index, connection_ids: [...region.connection_ids], parent_id: String(region.parent_id),
        child_id: String(region.child_id), cap_id: region.cap_id, pairs, cap_faces: capFaces,
        child_loops: region.child_loops.map(items => loop(items, child.original_vertex_count)),
        parent_loops: region.parent_loops.map(items => loop(items, parent.original_vertex_count)),
        normal: region.normal.map(item => item / length) };
    });
  } catch (error) {
    // An enabled malformed payload fails closed without breaking legacy controls.
    payload.error = error.message;
  }
  normalized.add(payload);
  if (record(value)) normalizationCache.set(value, { parts, sourceKey, payload });
  return payload;
}

function buildBVH(positions, faces) {
  const order = Array.from({ length: faces.length / 3 }, (_, index) => index);
  const centers = new Float64Array(faces.length);
  for (let face = 0; face < order.length; face += 1) {
    for (let axis = 0; axis < 3; axis += 1) {
      centers[face * 3 + axis] = (positions[faces[face * 3] * 3 + axis]
        + positions[faces[face * 3 + 1] * 3 + axis] + positions[faces[face * 3 + 2] * 3 + axis]) / 3;
    }
  }
  function split(start, end) {
    const node = { start, end, bounds: new Float64Array(6), left: null, right: null };
    if (end - start <= LEAF_SIZE) return node;
    const lower = [Infinity, Infinity, Infinity], upper = [-Infinity, -Infinity, -Infinity];
    for (let i = start; i < end; i += 1) {
      for (let axis = 0; axis < 3; axis += 1) {
        const value = centers[order[i] * 3 + axis];
        lower[axis] = Math.min(lower[axis], value);
        upper[axis] = Math.max(upper[axis], value);
      }
    }
    const sizes = upper.map((value, axis) => value - lower[axis]);
    const axis = sizes.indexOf(Math.max(...sizes));
    const sorted = order.slice(start, end).sort((a, b) => centers[a * 3 + axis] - centers[b * 3 + axis]);
    for (let i = 0; i < sorted.length; i += 1) order[start + i] = sorted[i];
    const middle = (start + end) >>> 1;
    node.left = split(start, middle);
    node.right = split(middle, end);
    return node;
  }
  const tree = { root: split(0, order.length), order, positions, faces };
  refitBVH(tree);
  return tree;
}

function refitBVH(tree) {
  const { positions, faces, order } = tree;
  function visit(node) {
    const box = node.bounds;
    box.set([Infinity, Infinity, Infinity, -Infinity, -Infinity, -Infinity]);
    if (node.left) {
      visit(node.left);
      visit(node.right);
      for (let axis = 0; axis < 3; axis += 1) {
        box[axis] = Math.min(node.left.bounds[axis], node.right.bounds[axis]);
        box[axis + 3] = Math.max(node.left.bounds[axis + 3], node.right.bounds[axis + 3]);
      }
    } else {
      for (let i = node.start; i < node.end; i += 1) {
        for (let corner = 0; corner < 3; corner += 1) {
          const index = faces[order[i] * 3 + corner] * 3;
          for (let axis = 0; axis < 3; axis += 1) {
            box[axis] = Math.min(box[axis], positions[index + axis]);
            box[axis + 3] = Math.max(box[axis + 3], positions[index + axis]);
          }
        }
      }
    }
  }
  visit(tree.root);
}

function intersectsBox(box, origin, direction, epsilon) {
  let lower = -Infinity, upper = Infinity;
  for (let axis = 0; axis < 3; axis += 1) {
    if (Math.abs(direction[axis]) < 1e-14) {
      if (origin[axis] < box[axis] - epsilon || origin[axis] > box[axis + 3] + epsilon) return false;
    } else {
      const a = (box[axis] - epsilon - origin[axis]) / direction[axis];
      const b = (box[axis + 3] + epsilon - origin[axis]) / direction[axis];
      lower = Math.max(lower, Math.min(a, b));
      upper = Math.min(upper, Math.max(a, b));
      if (lower > upper) return false;
    }
  }
  return true;
}

// Scalar, double-sided Moller-Trumbore. Closed edge hits also cover rays running
// on side walls: the end caps bound the inside-or-on-surface interval.
function rayIntervals(tree, origin, direction, epsilon, stats) {
  stats.rays += 1;
  const hits = [], stack = [tree.root], { positions: p, faces, order } = tree;
  while (stack.length) {
    const node = stack.pop();
    if (!intersectsBox(node.bounds, origin, direction, epsilon)) continue;
    if (node.left) { stack.push(node.left, node.right); continue; }
    for (let i = node.start; i < node.end; i += 1) {
      stats.triangle_tests += 1;
      const face = order[i] * 3, a = faces[face] * 3, b = faces[face + 1] * 3, c = faces[face + 2] * 3;
      const e1x = p[b] - p[a], e1y = p[b + 1] - p[a + 1], e1z = p[b + 2] - p[a + 2];
      const e2x = p[c] - p[a], e2y = p[c + 1] - p[a + 1], e2z = p[c + 2] - p[a + 2];
      const hx = direction[1] * e2z - direction[2] * e2y;
      const hy = direction[2] * e2x - direction[0] * e2z;
      const hz = direction[0] * e2y - direction[1] * e2x;
      const determinant = e1x * hx + e1y * hy + e1z * hz;
      const area = Math.hypot(e1y * e2z - e1z * e2y, e1z * e2x - e1x * e2z, e1x * e2y - e1y * e2x);
      if (Math.abs(determinant) <= area * 1e-12 || area === 0) continue;
      const tx = origin[0] - p[a], ty = origin[1] - p[a + 1], tz = origin[2] - p[a + 2];
      const inverse = 1 / determinant, u = (tx * hx + ty * hy + tz * hz) * inverse;
      // Convert distance tolerance to barycentric edge tolerances. A fixed
      // barycentric epsilon rejects near-surface rays on small/thin triangles.
      const toleranceScale = epsilon * Math.abs(inverse);
      const uTolerance = Math.max(1e-12, toleranceScale * Math.hypot(hx, hy, hz));
      if (u < -uTolerance) continue;
      const qx = ty * e1z - tz * e1y, qy = tz * e1x - tx * e1z, qz = tx * e1y - ty * e1x;
      const v = (direction[0] * qx + direction[1] * qy + direction[2] * qz) * inverse;
      const vx = e1y * direction[2] - e1z * direction[1];
      const vy = e1z * direction[0] - e1x * direction[2];
      const vz = e1x * direction[1] - e1y * direction[0];
      const vTolerance = Math.max(1e-12, toleranceScale * Math.hypot(vx, vy, vz));
      const sumTolerance = Math.max(1e-12, toleranceScale * Math.hypot(hx + vx, hy + vy, hz + vz));
      if (v < -vTolerance || u + v > 1 + sumTolerance) continue;
      hits.push({ t: (e2x * qx + e2y * qy + e2z * qz) * inverse, sign: Math.sign(determinant) });
    }
  }
  hits.sort((a, b) => a.t - b.t);
  const crossings = [];
  for (let i = 0; i < hits.length;) {
    const first = hits[i++];
    let tangent = false;
    while (i < hits.length && hits[i].t - first.t <= epsilon) {
      if (hits[i].sign !== first.sign) tangent = true;
      i += 1;
    }
    if (!tangent) crossings.push(first.t);
  }
  if (crossings.length % 2) return []; // Ambiguous/open receiver: fail conservatively.
  const intervals = [];
  for (let i = 0; i < crossings.length; i += 2) {
    if (crossings[i + 1] - crossings[i] > epsilon && crossings[i + 1] > epsilon) {
      intervals.push([crossings[i], crossings[i + 1]]);
    }
  }
  return intervals;
}

function sampled(items, count) {
  if (items.length <= count) return items;
  return Array.from({ length: count }, (_, i) => items[Math.floor(i * items.length / count)]);
}

function regionSamples(region) {
  const boundary = [...new Set([...region.child_loops.flat(), ...region.cap_faces.flat()])].map(index => [index]);
  const edgeMap = new Map();
  for (const loop of [...region.child_loops, ...region.cap_faces]) for (let i = 0; i < loop.length; i += 1) {
    const a = loop[i], b = loop[(i + 1) % loop.length];
    edgeMap.set(a < b ? `${a},${b}` : `${b},${a}`, [a, b]);
  }
  const edges = [...edgeMap.values()];
  const caps = region.cap_faces;
  if (boundary.length + edges.length + caps.length <= SAMPLE_LIMIT) return [...boundary, ...edges, ...caps];
  const vertices = sampled(boundary, 32), midpoints = sampled(edges, 16);
  const faces = sampled(caps, SAMPLE_LIMIT - vertices.length - midpoints.length);
  // Spend any unused cap budget on boundary samples first.
  return [...sampled(boundary, SAMPLE_LIMIT - midpoints.length - faces.length), ...midpoints, ...faces];
}

function makeState(payload, parts) {
  const sources = new Map(parts.map(part => [String(part.part_id), part]));
  const entries = new Map();
  for (const [id, spec] of Object.entries(payload.parts)) {
    const source = sources.get(id), originalFaces = new Set();
    for (let i = 0; i < source.faces.length; i += 3) originalFaces.add(faceKey(...source.faces.slice(i, i + 3)));
    const capFaces = spec.preview_faces == null ? [] : [...spec.preview_faces];
    if (spec.preview_faces == null) for (let i = 0; i < spec.faces.length; i += 3) {
      if (!originalFaces.has(faceKey(...spec.faces.slice(i, i + 3)))) capFaces.push(...spec.faces.slice(i, i + 3));
    }
    entries.set(id, { source, spec, capFaces, positions: new Float64Array(spec.vertices.flat()),
      local: new Float64Array(source.vertices.length * 3), bvh: null, needsRefit: true });
  }
  return { entries, sources: parts, samples: payload.regions.map(regionSamples) };
}

function deform(state, args, scales, offsets) {
  const automatic = solveTranslations(args.parts, scales, args.follow ? args.layout : []);
  const transforms = affineTransforms(args.parts, scales, automatic);
  for (const [id, entry] of state.entries) {
    const { source, spec, positions, local } = entry;
    writeBlendedPositions(source, transforms, args.blending?.parts?.[id] ?? { influences: [] }, local,
      offsets[id] ?? [0, 0, 0], args.boundary_motion?.parts?.[id], offsets);
    let changed = false;
    entry.maxCoordinate = 1;
    for (let i = 0; i < local.length; i += 1) {
      const value = local[i] + source.center[i % 3];
      if (!finite(value)) throw new Error("閉鎖形状の候補座標が不正です。");
      entry.maxCoordinate = Math.max(entry.maxCoordinate, Math.abs(value));
      if (value !== positions[i]) changed = true;
      positions[i] = value;
    }
    for (const center of spec.centers) {
      let total = 0;
      const sum = [0, 0, 0];
      for (let i = 0; i < center.loop.length; i += 1) {
        const a = center.loop[i] * 3, b = center.loop[(i + 1) % center.loop.length] * 3;
        const length = Math.hypot(positions[a] - positions[b], positions[a + 1] - positions[b + 1], positions[a + 2] - positions[b + 2]);
        total += length;
        for (let axis = 0; axis < 3; axis += 1) sum[axis] += length * (positions[a + axis] + positions[b + axis]) / 2;
      }
      for (let axis = 0; axis < 3; axis += 1) {
        const value = total > 0 ? sum[axis] / total : positions[center.loop[0] * 3 + axis];
        if (positions[center.index * 3 + axis] !== value) changed = true;
        positions[center.index * 3 + axis] = value;
      }
    }
    entry.needsRefit ||= changed;
  }
}

const pointAt = (positions, index) => [positions[index * 3], positions[index * 3 + 1], positions[index * 3 + 2]];

function sectionWidth(region, positions) {
  const normal = region.normal, helper = [0, 0, 0];
  helper[normal.map(Math.abs).indexOf(Math.min(...normal.map(Math.abs)))] = 1;
  const u = cross(normal, helper), length = Math.hypot(...u);
  for (let i = 0; i < 3; i += 1) u[i] /= length;
  const v = cross(normal, u), lower = [Infinity, Infinity], upper = [-Infinity, -Infinity];
  const origin = pointAt(positions, region.child_loops[0][0]);
  for (const index of region.child_loops[0]) {
    const point = pointAt(positions, index).map((value, axis) => value - origin[axis]);
    for (const [axis, basis] of [u, v].entries()) {
      const value = dot(point, basis);
      lower[axis] = Math.min(lower[axis], value);
      upper[axis] = Math.max(upper[axis], value);
    }
  }
  return Math.min(upper[0] - lower[0], upper[1] - lower[1]);
}

function coincident(region, child, parent, epsilon) {
  const children = new Set(region.child_loops.flat()), parents = new Set(region.parent_loops.flat());
  const pairedChildren = new Set(), pairedParents = new Set();
  if (!region.pairs.length) return false;
  for (const [a, b] of region.pairs) {
    if (Math.hypot(...[0, 1, 2].map(axis => child[a * 3 + axis] - parent[b * 3 + axis])) > epsilon) return false;
    pairedChildren.add(a);
    pairedParents.add(b);
  }
  return [...children].every(index => pairedChildren.has(index)) && [...parents].every(index => pairedParents.has(index));
}

function evaluateRegion(region, state, payload, stats) {
  const child = state.entries.get(region.child_id), parent = state.entries.get(region.parent_id);
  const width = sectionWidth(region, child.positions);
  const epsilon = Math.max(payload.frame.scale * 1e-9, Number.EPSILON * child.maxCoordinate * 8);
  const report = { region_index: region.region_index, connection_ids: region.connection_ids,
    parent_id: region.parent_id, child_id: region.child_id, cap_id: region.cap_id,
    width, maximum: width * payload.max_extension_ratio, requested_depth: width * payload.depth_ratio,
    length: 0, depth: 0, direction: null, sample_count: 0, valid: false, reason: "no_common_length" };
  if (coincident(region, child.positions, parent.positions, epsilon)) return { ...report, valid: true, reason: "contact" };
  if (!finite(width) || width <= epsilon) return { ...report, reason: "degenerate_section" };
  if (!parent.bvh) {
    parent.bvh = buildBVH(parent.positions, parent.spec.faces);
    stats.bvh_builds += 1;
    parent.needsRefit = false;
  } else if (parent.needsRefit) {
    refitBVH(parent.bvh);
    stats.bvh_refits += 1;
    parent.needsRefit = false;
  }
  const samples = state.samples[region.region_index].map(indices => {
    const point = [0, 0, 0];
    for (const index of indices) for (let axis = 0; axis < 3; axis += 1) point[axis] += child.positions[index * 3 + axis] / indices.length;
    return point;
  });
  report.sample_count = samples.length;
  for (const sign of [1, -1]) {
    const direction = region.normal.map(value => value * sign);
    let entryMaximum = -Infinity, exitMinimum = Infinity, thickness = Infinity, complete = true;
    for (const sample of samples) {
      const interval = rayIntervals(parent.bvh, sample, direction, epsilon, stats)
        .find(([entry]) => entry <= report.maximum + epsilon);
      if (!interval) { complete = false; break; }
      entryMaximum = Math.max(entryMaximum, interval[0]);
      exitMinimum = Math.min(exitMinimum, interval[1]);
      thickness = Math.min(thickness, interval[1] - interval[0]);
    }
    const depth = Math.min(report.requested_depth, .1 * thickness);
    const length = Math.max(0, entryMaximum + depth), upper = Math.min(report.maximum, exitMinimum - depth);
    if (complete && samples.length && depth > epsilon * 8 && length <= upper + epsilon) {
      return { ...report, valid: true, reason: length > epsilon ? "extension" : "overlap", direction, depth, length };
    }
  }
  return report;
}

function previewGeometry(state, payload, reports) {
  const parts = {};
  for (const [id, entry] of state.entries) {
    parts[id] = { vertices: Array.from({ length: entry.positions.length / 3 }, (_, i) => pointAt(entry.positions, i)),
      faces: [...entry.capFaces] };
  }
  for (const report of reports) {
    if (!report.valid || !report.length) continue;
    const region = payload.regions[report.region_index], part = parts[region.child_id];
    const caps = new Set(region.cap_faces.map(face => faceKey(...face)));
    const keep = [];
    for (let i = 0; i < part.faces.length; i += 3) {
      if (!caps.has(faceKey(...part.faces.slice(i, i + 3)))) keep.push(...part.faces.slice(i, i + 3));
    }
    part.faces = keep;
    const moved = new Map();
    const shift = index => {
      if (!moved.has(index)) {
        moved.set(index, part.vertices.length);
        part.vertices.push(part.vertices[index].map((value, axis) => value + report.direction[axis] * report.length));
      }
      return moved.get(index);
    };
    for (const face of region.cap_faces) part.faces.push(...face.map(shift));
    for (const loop of region.child_loops) {
      for (let i = 0; i < loop.length; i += 1) {
        const a = loop[i], b = loop[(i + 1) % loop.length], c = shift(b), d = shift(a);
        part.faces.push(b, a, d, b, d, c);
      }
    }
  }
  return { parts };
}

function evaluate(args, scales, offsets, withPreview = true) {
  const payload = normalizeSolidConnections(args.solid_connections, args.parts, args.source_key);
  const stats = { rays: 0, triangle_tests: 0, bvh_builds: 0, bvh_refits: 0 };
  const base = { enabled: Boolean(payload), valid: true, reports: [], preview: { parts: {} }, stats };
  if (!payload) return base;
  try {
    if (payload.error) throw new Error(payload.error);
    let state = geometryCache.get(payload);
    if (!state || state.sources !== args.parts) {
      state = makeState(payload, args.parts);
      geometryCache.set(payload, state);
    }
    deform(state, args, scales, offsets);
    if (payload.preview_only) {
      return { ...base, preview_only: true,
        preview: withPreview ? previewGeometry(state, payload, []) : base.preview };
    }
    const reports = payload.regions.map(region => evaluateRegion(region, state, payload, stats));
    return { ...base, valid: reports.every(report => report.valid), reports,
      preview: withPreview ? previewGeometry(state, payload, reports) : base.preview };
  } catch (error) {
    return { ...base, valid: false, reports: [{ valid: false, reason: "invalid_payload", message: error.message }] };
  }
}

export function evaluateConnections(args, scales = args.scales, offsets = args.offsets) {
  return evaluate(args, scales, offsets);
}

export function limitConnectionOffset(args, scales, beforeOffsets, requestedOffsets) {
  const before = copyOffsets(beforeOffsets), requested = copyOffsets(requestedOffsets);
  let accepted = evaluate(args, scales, before, false), fraction = 0;
  const result = (evaluation, offsets, clamped, extra = {}) => ({ ...evaluation,
    ...evaluateConnections(args, scales, offsets), offsets, clamped, fraction, ...extra });
  if (!accepted.enabled) { fraction = 1; return result(accepted, requested, false); }
  if (!accepted.valid) {
    const recovery = evaluate(args, scales, requested, false);
    if (recovery.valid) { fraction = 1; return result(recovery, requested, false, { reason: "recovered" }); }
    return result(accepted, before, true, { reason: "invalid_start", blocked_reports: recovery.reports });
  }
  const ids = args.parts.map(part => String(part.part_id));
  const distance = Math.max(0, ...ids.map(id => Math.hypot(...requested[id].map((value, axis) => value - before[id][axis]))));
  if (!distance) { fraction = 1; return result(accepted, requested, false); }
  const widths = accepted.reports.map(report => report.width).filter(value => finite(value) && value > 0);
  if (!widths.length) { fraction = 1; return result(evaluateConnections(args, scales, requested), requested, false); }
  const payload = normalizeSolidConnections(args.solid_connections, args.parts, args.source_key);
  const step = Math.max(Math.min(...widths) * Math.min(.01, payload.max_extension_ratio / 4), payload.frame.scale * 1e-8);
  const increment = Math.min(1, step / distance);
  const at = t => Object.fromEntries(ids.map(id => [id, before[id].map((value, axis) => value + (requested[id][axis] - value) * t)]));
  // Never jump to a distant valid endpoint across a gap in feasible offsets.
  for (let iteration = 0; iteration < 256; iteration += 1) {
    const next = Math.min(1, fraction + increment), candidate = evaluate(args, scales, at(next), false);
    if (!candidate.valid) {
      let high = next;
      for (let i = 0; i < 12; i += 1) {
        const middle = (fraction + high) / 2, check = evaluate(args, scales, at(middle), false);
        if (check.valid) { fraction = middle; accepted = check; } else high = middle;
      }
      return result(accepted, fraction === 0 ? before : at(fraction), true,
        { reason: "connection_limit", blocked_reports: candidate.reports });
    }
    fraction = next;
    accepted = candidate;
    if (fraction === 1) return result(accepted, requested, false);
  }
  // Very long moves are bounded to the segment actually checked this frame.
  return result(accepted, at(fraction), true, { reason: "step_limit" });
}
