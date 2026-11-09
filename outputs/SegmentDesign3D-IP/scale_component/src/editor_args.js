import { normalizeBlending } from "./boundary_blending.js";

function record(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function inferredMovement(parts) {
  const lower = [Infinity, Infinity, Infinity], upper = [-Infinity, -Infinity, -Infinity];
  for (const part of parts) {
    for (const point of part.vertices) {
      for (let axis = 0; axis < 3; axis += 1) {
        lower[axis] = Math.min(lower[axis], point[axis]);
        upper[axis] = Math.max(upper[axis], point[axis]);
      }
    }
  }
  const extent = Math.max(...upper.map((value, axis) => value - lower[axis]));
  const limit = Number.isFinite(extent) && extent > 0 ? extent : 1;
  return { limit, step: limit / 1000 };
}

export function normalizeEditorArgs(value) {
  const args = record(value);
  if (!Array.isArray(args.parts) || !args.parts.length || typeof args.source_key !== "string" || !args.source_key) {
    throw new Error("編集用のパーツデータを受け取れませんでした。画面を再読み込みしてください。");
  }
  const rawScales = record(args.scales), rawOffsets = record(args.offsets);
  const scales = {}, offsets = {};
  for (const part of args.parts) {
    const id = String(part.part_id);
    const scale = rawScales[id] ?? 1;
    const offset = rawOffsets[id] ?? [0, 0, 0];
    if (typeof scale !== "number" || !Number.isFinite(scale) || scale < 0.1 || scale > 3) {
      throw new Error("パーツの倍率が不正です。");
    }
    if (!Array.isArray(offset) || offset.length !== 3 || !offset.every(item => typeof item === "number" && Number.isFinite(item))) {
      throw new Error("パーツのX/Y/Z移動量が不正です。");
    }
    scales[id] = scale;
    offsets[id] = [...offset];
  }
  const rawMovement = record(args.movement);
  const hasMovement = Number.isFinite(rawMovement.limit) && rawMovement.limit > 0 && Number.isFinite(rawMovement.step) && rawMovement.step > 0;
  const movement = hasMovement ? { limit: rawMovement.limit, step: rawMovement.step } : inferredMovement(args.parts);
  const rawLayout = record(args.layout);
  const layout = { ...rawLayout,
    connections: Array.isArray(rawLayout.connections) ? rawLayout.connections : [],
    attachments: Array.isArray(rawLayout.attachments) ? rawLayout.attachments : [] };
  return { ...args, scales, offsets, movement, layout, blending: normalizeBlending(args.blending, args.parts),
    blending_key: args.blending_key ?? "legacy",
    source_key: args.source_key,
    sequence: Number.isInteger(args.sequence) && args.sequence >= 0 ? args.sequence : 0,
    layout_key: args.layout_key ?? JSON.stringify(layout),
    up_dir: /^[+-][XYZ]$/.test(args.up_dir) ? args.up_dir : "+Z",
    follow: args.follow === true,
    show_anchors: args.show_anchors === true,
    supports_movement: hasMovement && args.offsets !== null && typeof args.offsets === "object" && !Array.isArray(args.offsets) };
}
