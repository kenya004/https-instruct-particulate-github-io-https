// Bridge used by the Python integration test with actual mesh-derived weights.
import fs from 'node:fs';
import { affineTransforms, normalizeBlending, writeBlendedPositions } from '../src/boundary_blending.js';
const args = JSON.parse(fs.readFileSync(0, 'utf8'));
const field = normalizeBlending(args.blending, args.parts);
const transforms = affineTransforms(args.parts, args.scales, args.automatic);
const result = {};
for (const part of args.parts) {
  if (!part.center) continue;
  const output = new Float32Array(part.vertices.length * 3);
  writeBlendedPositions(part, transforms, field.parts[String(part.part_id)] ?? {influences: []}, output);
  result[String(part.part_id)] = part.vertices.map((_, index) => part.center.map((value, axis) =>
    value + output[index * 3 + axis] + args.offsets[String(part.part_id)][axis]));
}
process.stdout.write(JSON.stringify(result));
