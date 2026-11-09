import test from 'node:test';
import assert from 'node:assert/strict';
import { localOffset, normalizeMovementFrames, setLocalOffset, worldOffset } from '../src/translation_frames.js';

const frame = {basis: [[0, 1, 0], [0, 0, 1], [1, 0, 0]], labels: ['断面U', '断面V', '法線N']};
test('U, V and N move along the fitted section instead of the input XYZ axes', () => {
  assert.deepEqual(setLocalOffset([0, 0, 0], 0, 2, frame), [0, 2, 0]);
  assert.deepEqual(setLocalOffset([0, 0, 0], 1, 2, frame), [0, 0, 2]);
  assert.deepEqual(setLocalOffset([0, 0, 0], 2, 2, frame), [2, 0, 0]);
  assert.deepEqual(localOffset([1, 2, 3], frame), [2, 3, 1]);
});
test('oblique frames round-trip world motion while changing only one chosen coordinate', () => {
  const angle = .37, c = Math.cos(angle), s = Math.sin(angle);
  const rotated = {basis: [[c, -s, 0], [s, c, 0], [0, 0, 1]], labels: frame.labels};
  const original = [.4, -.7, 1.2], projected = localOffset(original, rotated);
  const restored = worldOffset(projected, rotated);
  restored.forEach((value, i) => assert.ok(Math.abs(value - original[i]) < 1e-12));
  const changed = localOffset(setLocalOffset(original, 1, 2, rotated), rotated);
  assert.ok(Math.abs(changed[0] - projected[0]) < 1e-12);
  assert.ok(Math.abs(changed[1] - 2) < 1e-12);
  assert.equal(changed[2], projected[2]);
  assert.deepEqual(original, [.4, -.7, 1.2]);
});
test('legacy arguments use input axes; invalid frames are rejected', () => {
  const parts = [{part_id: 3}, {part_id: 9}];
  const fallback = normalizeMovementFrames(null, parts);
  assert.deepEqual(fallback['3'].labels, ['X', 'Y', 'Z']);
  assert.deepEqual(worldOffset([1, 2, 3], fallback['9']), [1, 2, 3]);
  normalizeMovementFrames({'3': frame}, parts);
  for (const basis of [[[1, 0, 0], [1, 0, 0], [0, 0, 1]], [[1, 0, 0], [0, 1, 0], [0, 0, -1]], [[1, 0, 0], [0, NaN, 0], [0, 0, 1]]]) {
    assert.throws(() => normalizeMovementFrames({'3': {...frame, basis}}, parts), /移動軸/);
  }
});
