import test from 'node:test';
import assert from 'node:assert/strict';
import { affineTransforms, blendedPoint, normalizeBlending, sampledAnchor, writeBlendedPositions } from '../src/boundary_blending.js';
import { normalizeEditorArgs } from '../src/editor_args.js';

const parts = [
  {part_id: 7, center: [10, 20, 30], vertices: [[11, 20, 30], [12, 20, 30], [13, 20, 30]], faces: [0, 1, 2]},
  {part_id: 15, center: [12, 20, 30], vertices: [[11, 20, 30], [12, 20, 30], [13, 20, 30]], faces: [0, 1, 2]},
  {part_id: 21, center: [14, 20, 30], vertices: [[13, 20, 30]], faces: []},
];
const scales = {'7': 1, '15': 2, '21': 1};
const automatic = {'7': [0, 0, 0], '15': [1, 0, 0], '21': [2, 0, 0]};
const field = {parts: {'15': {influences: [{reference_part_id: 7, weights: [1, .5, 0]}]}},
  anchors: {'0': [{part_id: 7, indices: [0], weights: [1]}, {part_id: 15, indices: [0], weights: [1]}]}};

test('boundary, half strength and interior use the same affine targets', () => {
  const transforms = affineTransforms(parts, scales, automatic);
  const spec = field.parts['15'];
  assert.deepEqual(blendedPoint(parts[1], 0, transforms, spec), [11, 20, 30]);
  assert.deepEqual(blendedPoint(parts[1], 1, transforms, spec), [12.5, 20, 30]);
  assert.deepEqual(blendedPoint(parts[1], 2, transforms, spec), [15, 20, 30]);
  const buffer = new Float32Array(9);
  writeBlendedPositions(parts[1], transforms, spec, buffer);
  assert.deepEqual([...buffer], [-1, 0, 0, .5, 0, 0, 3, 0, 0]);
  // Geometry is always recomputed from immutable rest positions.
  writeBlendedPositions(parts[1], transforms, spec, buffer);
  assert.deepEqual([...buffer], [-1, 0, 0, .5, 0, 0, 3, 0, 0]);
});

test('blended diagnostics follow actual geometry; manual offsets apply afterwards', () => {
  const transforms = affineTransforms(parts, scales, automatic), byId = new Map(parts.map(part => [part.part_id, part]));
  const offsets = {'7': [0, 0, 0], '15': [0, 2, 0], '21': [0, 0, 0]};
  assert.deepEqual(sampledAnchor(field.anchors['0'][0], byId, transforms, field, offsets), [11, 20, 30]);
  assert.deepEqual(sampledAnchor(field.anchors['0'][1], byId, transforms, field, offsets), [11, 22, 30]);
  assert.deepEqual(blendedPoint(parts[1], 0, transforms, field.parts['15']), [11, 20, 30]);
});

test('multiple reference targets are combined from the baseline, independently of order', () => {
  const transforms = affineTransforms(parts, scales, automatic);
  const spec = {influences: [{reference_part_id: 7, weights: [.5, .3, 0]}, {reference_part_id: 21, weights: [.5, .2, 1]}]};
  const first = blendedPoint(parts[1], 0, transforms, spec);
  assert.deepEqual(first, [12, 20, 30]);
  assert.deepEqual(blendedPoint(parts[1], 0, transforms, {influences: [...spec.influences].reverse()}), first);
});

test('legacy payloads and null optional blend data stay compatible', () => {
  for (const value of [undefined, null, {parts: null, anchors: null}]) {
    const args = normalizeEditorArgs({source_key: 'test', parts, scales, blending: value});
    assert.deepEqual(args.blending.parts, {});
    assert.deepEqual(args.blending.anchors, {});
  }
  assert.deepEqual(normalizeBlending(field, parts), field);
});

test('invalid source indices and inconsistent weights are rejected before drawing', () => {
  for (const spec of [
    {influences: [{reference_part_id: 99, weights: [1, 0, 0]}]},
    {influences: [{reference_part_id: 7, weights: [1, 0]}]},
    {influences: [{reference_part_id: 7, weights: [1, NaN, 0]}]},
    {influences: [{reference_part_id: 7, weights: [1, 0, 0]}, {reference_part_id: 21, weights: [.1, 0, 0]}]},
  ]) assert.throws(() => normalizeBlending({parts: {'15': spec}}, parts), /重み/);
  const bad = structuredClone(field);
  bad.anchors['0'][1].indices = [10];
  assert.throws(() => normalizeBlending(bad, parts), /頂点対応/);
});
