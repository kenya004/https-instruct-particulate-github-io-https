import test from 'node:test';
import assert from 'node:assert/strict';
import { highlightPositions, normalizeOverlapFaces } from '../src/overlap_highlights.js';

test('diagnostic triangles copy only the selected faces without changing geometry or colors', () => {
  const positions = new Float32Array([0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0]);
  const indices = [0, 1, 2, 0, 2, 3];
  const original = [...positions];
  assert.deepEqual([...highlightPositions(positions, indices, [1])], [0, 0, 0, 1, 1, 0, 0, 1, 0]);
  assert.deepEqual([...positions], original);
  const output = new Float32Array(9);
  assert.equal(highlightPositions(positions, indices, [0], output), output);
  assert.deepEqual([...output], [0, 0, 0, 1, 0, 0, 1, 1, 0]);
});

test('legacy messages clear highlights and stale face mappings are rejected', () => {
  const parts = [{part_id: 7, faces: [0, 1, 2, 0, 2, 3]}];
  assert.deepEqual(normalizeOverlapFaces(null, parts), {'7': []});
  assert.deepEqual(normalizeOverlapFaces({'7': [0, 1]}, parts), {'7': [0, 1]});
  for (const ids of [[-1], [2], [1.5], null, ['0']]) {
    if (ids === null) continue;
    assert.throws(() => normalizeOverlapFaces({'7': ids}, parts), /Face対応/);
  }
});
