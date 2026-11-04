import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { createHash } from 'node:crypto';
import { normalizeEditorArgs } from '../src/editor_args.js';
import { solveTranslations } from '../src/connection_solver.js';

const parts = [0, 7].map((part_id, index) => ({part_id, name: `part ${part_id}`,
  vertices: [[10 + 3 * index, 20, 30], [11 + 3 * index, 20, 30], [10 + 3 * index, 21, 31]],
  faces: [0, 1, 2], center: [10.5 + 3 * index, 20.5, 30.5]}));
const legacy = {source_key: 'legacy', parts, scales: {'0': 1, '7': 2}, sequence: 0, up_dir: '+Z'};

test('old payloads without movement fields work on first render and subsequent renders', () => {
  for (let sequence = 0; sequence < 3; sequence += 1) {
    const args = normalizeEditorArgs({...legacy, sequence});
    assert.deepEqual(Object.fromEntries(Object.entries(args.offsets)), {'0': [0, 0, 0], '7': [0, 0, 0]});
    assert.deepEqual(Object.fromEntries(Object.entries(args.scales)), legacy.scales);
    assert.deepEqual(args.movement, {limit: 4, step: .004});
    assert.equal(args.supports_movement, false);
    assert.deepEqual(solveTranslations(args.parts, args.scales, args.layout.attachments, args.offsets), args.offsets);
  }
});

test('null optional objects and missing per-part values have explicit defaults', () => {
  const args = normalizeEditorArgs({...legacy, scales: null, offsets: null, movement: null,
    layout: {connections: null, attachments: null}, up_dir: null, sequence: null});
  assert.deepEqual(args.scales, {'0': 1, '7': 1});
  assert.deepEqual(args.offsets, {'0': [0, 0, 0], '7': [0, 0, 0]});
  assert.deepEqual(args.layout.connections, []);
  assert.deepEqual(args.layout.attachments, []);
  assert.equal(args.sequence, 0);
  assert.equal(args.up_dir, '+Z');
});

test('current payloads retain movement and values without mutating server arguments', () => {
  const input = {...legacy, offsets: {'0': [.4, -.8, 1.2]}, movement: {limit: 4, step: .004},
    follow: true, show_anchors: true, layout_key: 'current'};
  const args = normalizeEditorArgs(input);
  assert.equal(args.supports_movement, true);
  assert.deepEqual(args.offsets['0'], [.4, -.8, 1.2]);
  assert.deepEqual(args.offsets['7'], [0, 0, 0]);
  assert.equal(args.follow, true);
  assert.equal(args.layout_key, 'current');
  args.offsets['0'][0] = 1;
  assert.equal(input.offsets['0'][0], .4);
});

test('invalid required geometry or numeric values give actionable errors', () => {
  assert.throws(() => normalizeEditorArgs(null), /パーツデータ/);
  assert.throws(() => normalizeEditorArgs({...legacy, parts: []}), /パーツデータ/);
  assert.throws(() => normalizeEditorArgs({...legacy, offsets: {'0': [0, null, 1]}}), /移動量/);
  assert.throws(() => normalizeEditorArgs({...legacy, scales: {'0': NaN}}), /倍率/);
});

test('built HTML requests the current bundle using its content hash', () => {
  const bundle = fs.readFileSync(new URL('../dist/editor.js', import.meta.url));
  const version = createHash('sha256').update(bundle).digest('hex').slice(0, 12);
  const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.ok(html.includes(`src="./editor.js?v=${version}"`));
});
