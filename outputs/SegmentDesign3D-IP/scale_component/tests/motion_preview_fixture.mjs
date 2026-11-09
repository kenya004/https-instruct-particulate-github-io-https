import fs from 'node:fs';
import { affineTransforms, sampledAnchor, writeBlendedPositions } from '../src/boundary_blending.js';
import { normalizeBoundaryMotion } from '../src/boundary_motion.js';
const args = JSON.parse(fs.readFileSync(0, 'utf8'));
const motion = normalizeBoundaryMotion(args.boundary_motion, args.parts);
const transforms = affineTransforms(args.parts, args.scales, args.automatic);
const vertices = {}, anchors = {}, byId = new Map(args.parts.map(part => [part.part_id, part]));
for (const part of args.parts) {
  if (!part.center) continue;
  const id = String(part.part_id), output = new Float32Array(part.vertices.length * 3);
  writeBlendedPositions(part, transforms, args.blending.parts[id] ?? {influences: []}, output, args.offsets[id], motion.parts[id]);
  vertices[id] = part.vertices.map((_, index) => part.center.map((value, axis) => value + output[index * 3 + axis]));
}
for (const [id, samples] of Object.entries(motion.anchors)) {
  anchors[id] = samples.map(sample => sampledAnchor(sample, byId, transforms, args.blending, args.offsets, motion));
}
process.stdout.write(JSON.stringify({vertices, anchors}));
