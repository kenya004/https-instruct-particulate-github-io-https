import test from 'node:test';
import assert from 'node:assert/strict';
import { solveTranslations, transformedAnchor } from '../src/connection_solver.js';

const parts = [0, 1, 2].map(part_id => ({part_id, center: [10.5 + part_id, 20, 30]}));

test('middle root moves both neighbors, root stays fixed', () => {
  const offsets = solveTranslations(parts, {'0': 1, '1': 2, '2': 1}, [
    {parent_id: 1, child_id: 0, anchor: [11, 20, 30]},
    {parent_id: 1, child_id: 2, anchor: [12, 20, 30]},
  ]);
  assert.deepEqual(offsets, {'0': [-.5, 0, 0], '1': [0, 0, 0], '2': [.5, 0, 0]});
});

test('translation reaches descendants and unconnected part stays put', () => {
  const offsets = solveTranslations([...parts, {part_id: 9, center: [100, 0, 0]}], {'0': 2, '1': 1, '2': 1, '9': 1}, [
    {parent_id: 0, child_id: 1, anchor: [11, 20, 30]},
    {parent_id: 1, child_id: 2, anchor: [12, 20, 30]},
  ]);
  assert.deepEqual(offsets, {'0': [0, 0, 0], '1': [.5, 0, 0], '2': [.5, 0, 0], '9': [0, 0, 0]});
});

test('both scaled parts meet, including reverse root and sparse IDs', () => {
  const parts = [{part_id: 3, center: [1, 2, 3]}, {part_id: 8, center: [3, 4, 5]}];
  const anchor = [2, 3, 4];
  for (const scales of [{'3': 3, '8': .1}, {'3': .1, '8': 3}, {'3': 1, '8': 1}]) {
    const offsets = solveTranslations(parts, scales, [{parent_id: 8, child_id: 3, anchor}]);
    const left = transformedAnchor(parts[0], scales['3'], anchor, offsets['3']);
    const right = transformedAnchor(parts[1], scales['8'], anchor, offsets['8']);
    left.forEach((value, axis) => assert.ok(Math.abs(value - right[axis]) < 1e-12));
    assert.deepEqual(offsets['8'], [0, 0, 0]);
  }
});

test('disabled following produces zero translations even for empty parts', () => {
  const offsets = solveTranslations([...parts, {part_id: 7, center: null}], {'0': 2, '1': 3, '2': .1, '7': 1}, []);
  assert.deepEqual(Object.values(offsets), [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]);
});

test('manual root motion does not propagate to children or grandchildren', () => {
  const offsets = solveTranslations(parts, {'0': 2, '1': 1, '2': 1}, [
    {parent_id: 0, child_id: 1, anchor: [11, 20, 30]},
    {parent_id: 1, child_id: 2, anchor: [12, 20, 30]},
  ], {'0': [0, 2, 0], '1': [0, 0, 1], '2': [0, 0, 0]});
  assert.deepEqual(offsets, {'0': [0, 2, 0], '1': [.5, 0, 1], '2': [.5, 0, 0]});
});

test('manual XYZ offsets apply with following disabled, including negative motion', () => {
  const offsets = solveTranslations(parts, {'0': 1, '1': 1, '2': 1}, [], {'1': [.3, -.6, .9]});
  assert.deepEqual(offsets, {'0': [0, 0, 0], '1': [.3, -.6, .9], '2': [0, 0, 0]});
  assert.deepEqual(solveTranslations(parts, {'0': 1, '1': 1, '2': 1}, [], {'1': [0, 0, 0]})['1'], [0, 0, 0]);
});
