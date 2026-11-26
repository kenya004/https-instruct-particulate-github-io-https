import fs from 'node:fs';
import { solveTranslations } from '../src/connection_solver.js';
import { affineTransforms, writeBlendedPositions } from '../src/boundary_blending.js';
const args = JSON.parse(fs.readFileSync(0, 'utf8'));
const automatic = solveTranslations(args.parts, args.scales, args.layout);
const transforms = affineTransforms(args.parts, args.scales, automatic);
const vertices = {};
for (const part of args.parts) {
  if (!part.center) continue;
  const id = String(part.part_id), output = new Float32Array(part.vertices.length * 3);
  writeBlendedPositions(part, transforms, args.blending?.parts?.[id] ?? {influences: []}, output,
    args.offsets[id], args.motion?.parts?.[id], args.offsets);
  vertices[id] = part.vertices.map((_, i) => part.center.map((value, axis) => value + output[i * 3 + axis]));
}
process.stdout.write(JSON.stringify({automatic, vertices}));
