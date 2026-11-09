import test from 'node:test';
import assert from 'node:assert/strict';
import { affineTransforms, sampledAnchor, writeBlendedPositions } from '../src/boundary_blending.js';
import { normalizeBoundaryMotion } from '../src/boundary_motion.js';
import { normalizeEditorArgs } from '../src/editor_args.js';

const part = {part_id: 7, center: [1, 0, 0], vertices: [[0, 0, 0], [1, 0, 0], [2, 0, 0]], faces: [0, 1, 2]};
const field = {parts: {'7': {weights: [0, .5, 1], ratio: .2}}, anchors: {}};

test('boundary stays fixed and intermediate/far vertices receive weighted motion', () => {
  const transforms = affineTransforms([part], {'7': 1}, {'7': [0, 0, 0]});
  const output = new Float32Array(9);
  writeBlendedPositions(part, transforms, {influences: []}, output, [0, 2, 0], field.parts['7']);
  assert.deepEqual([...output], [-1, 0, 0, 0, 1, 0, 1, 2, 0]);
  writeBlendedPositions(part, transforms, {influences: []}, output, [0, 0, 0], field.parts['7']);
  assert.deepEqual([...output], [-1, 0, 0, 0, 0, 0, 1, 0, 0]);
});

test('connection samples follow weighted geometry and whole motion remains compatible', () => {
  const transforms = affineTransforms([part], {'7': 1}, {'7': [0, 0, 0]});
  const byId = new Map([[7, part]]), blending = {parts: {}}, offsets = {'7': [0, 2, 0]};
  const sample = {part_id: 7, indices: [0], weights: [1]};
  assert.deepEqual(sampledAnchor(sample, byId, transforms, blending, offsets, field), [0, 0, 0]);
  assert.deepEqual(sampledAnchor(sample, byId, transforms, blending, offsets), [0, 2, 0]);
});

test('missing legacy fields disable boundary-fixed movement', () => {
  for (const value of [null, undefined, {parts: null, anchors: null}]) assert.deepEqual(normalizeBoundaryMotion(value, [part]).parts, {});
  const args = normalizeEditorArgs({source_key: 'test', parts: [part], scales: {'7': 1}});
  assert.deepEqual(args.boundary_motion, {parts: {}, anchors: {}});
});

test('invalid vertex mappings, weights, and ratios are rejected before rendering', () => {
  for (const spec of [{weights: [0, 1]}, {weights: [0, NaN, 1]}, {weights: [0, -1, 1]}, {weights: [0, .5, 1], ratio: 0}]) {
    assert.throws(() => normalizeBoundaryMotion({parts: {'7': spec}}, [part]), /断面固定移動/);
  }
});
