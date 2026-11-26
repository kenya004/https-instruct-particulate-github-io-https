import test from 'node:test';
import assert from 'node:assert/strict';
import { solveTranslations, transformedAnchor } from '../src/connection_solver.js';

const parts = [0, 1, 2].map(part_id => ({part_id, center: [10.5 + part_id, 20, 30]}));
function contact(parent_id, child_id, anchor, normal = [1,0,0], source = parts) {
  const parent = source.find(p => p.part_id === parent_id);
  const displacement = normal.reduce((sum,n,i) => sum + n * (anchor[i] - parent.center[i]), 0);
  return {parent_id,child_id,anchor,following_method:'reference_plane_normal_v1',
    projection:normal.map(a => normal.map(b => a*b)),scale_displacement:normal.map(n => n*displacement)};
}

test('unit scales keep original anchors and exactly zero translations near thin boundaries', () => {
  const parts = [{part_id: 0, center: [.5, .5, .05]}, {part_id: 1, center: [.5, .5, .3000000005]}];
  const anchor = [.95, 0, 1e-9];
  for (const [parent_id, child_id] of [[0, 1], [1, 0]]) {
    const offsets = solveTranslations(parts, {'0': 1, '1': 1}, [contact(parent_id, child_id, anchor, [0,0,1], parts)]);
    assert.deepEqual(offsets, {'0': [0, 0, 0], '1': [0, 0, 0]});
    for (const part of parts) assert.deepEqual(transformedAnchor(part, 1, anchor), anchor);
  }
});

test('middle root moves both neighbors, root stays fixed', () => {
  const offsets = solveTranslations(parts, {'0': 1, '1': 2, '2': 1}, [
    contact(1,0,[11,20,30]),
    contact(1,2,[12,20,30]),
  ]);
  assert.deepEqual(offsets, {'0': [-.5, 0, 0], '1': [0, 0, 0], '2': [.5, 0, 0]});
});

test('translation reaches descendants and unconnected part stays put', () => {
  const offsets = solveTranslations([...parts, {part_id: 9, center: [100, 0, 0]}], {'0': 2, '1': 1, '2': 1, '9': 1}, [
    contact(0,1,[11,20,30]),
    contact(1,2,[12,20,30]),
  ]);
  assert.deepEqual(offsets, {'0': [0, 0, 0], '1': [.5, 0, 0], '2': [.5, 0, 0], '9': [0, 0, 0]});
});

test('follower scaling never changes its own automatic translation, including sparse IDs', () => {
  const parts = [{part_id: 3, center: [1, 2, 3]}, {part_id: 8, center: [3, 4, 5]}];
  const anchor = [2, 3, 4];
  for (const childScale of [.1,1,3]) {
    const scales = {'3':childScale,'8':2};
    const offsets = solveTranslations(parts, scales, [contact(8,3,anchor,[1,0,0],parts)]);
    assert.deepEqual(offsets['3'], [-1,0,0]);
    assert.deepEqual(offsets['8'], [0, 0, 0]);
  }
});

test('disabled following produces zero translations even for empty parts', () => {
  const offsets = solveTranslations([...parts, {part_id: 7, center: null}], {'0': 2, '1': 3, '2': .1, '7': 1}, []);
  assert.deepEqual(Object.values(offsets), [[0, 0, 0], [0, 0, 0], [0, 0, 0], [0, 0, 0]]);
});

test('manual root motion does not propagate to children or grandchildren', () => {
  const offsets = solveTranslations(parts, {'0': 2, '1': 1, '2': 1}, [
    contact(0,1,[11,20,30]),
    contact(1,2,[12,20,30]),
  ], {'0': [0, 2, 0], '1': [0, 0, 1], '2': [0, 0, 0]});
  assert.deepEqual(offsets, {'0': [0, 2, 0], '1': [.5, 0, 1], '2': [.5, 0, 0]});
});

test('tangential reference movement is removed and malformed direction data gives a plain error', () => {
  const source = [{part_id:0,center:[0,0,0]},{part_id:1,center:[4,0,0]}];
  const attachment=contact(0,1,[1,3,2],[1,0,0],source);
  assert.deepEqual(solveTranslations(source,{'0':2,'1':1},[attachment])['1'],[1,0,0]);
  for (const value of [{parent_id:0,child_id:1,anchor:[1,0,0]}, {...attachment,projection:[[1,0,0]]},
    {...attachment,scale_displacement:[NaN,0,0]}]) {
    assert.throws(() => solveTranslations(source,{'0':2,'1':1},[value]), /接続方向/);
  }
});

test('manual XYZ offsets apply with following disabled, including negative motion', () => {
  const offsets = solveTranslations(parts, {'0': 1, '1': 1, '2': 1}, [], {'1': [.3, -.6, .9]});
  assert.deepEqual(offsets, {'0': [0, 0, 0], '1': [.3, -.6, .9], '2': [0, 0, 0]});
  assert.deepEqual(solveTranslations(parts, {'0': 1, '1': 1, '2': 1}, [], {'1': [0, 0, 0]})['1'], [0, 0, 0]);
});

test('each edited part drives the other side and consecutive edits have no root switch', () => {
  const source = [{part_id:0,center:[-.5,0,0]},{part_id:1,center:[1.5,0,0]}];
  const network = {following_method:'each_edited_part_drives_contacts_v1',responses:[
    {source_id:0,target_id:1,displacement:[.5,0,0]}, {source_id:1,target_id:0,displacement:[-1.5,0,0]}]};
  const a = solveTranslations(source,{'0':1.3,'1':1},network);
  assert.deepEqual(a['0'],[0,0,0]);
  assert.ok(Math.abs(a['1'][0]-.15)<1e-12);
  const b = solveTranslations(source,{'0':1.3,'1':1.2},network);
  assert.deepEqual(b['1'],a['1']);
  assert.ok(Math.abs(b['0'][0]+.3)<1e-12);
  const restored = solveTranslations(source,{'0':1,'1':1},network,{'0':[0,.2,0]});
  assert.deepEqual(restored,{'0':[0,.2,0],'1':[0,0,0]});
  for (const response of [{source_id:0,target_id:0,displacement:[1,0,0]},
    {source_id:0,target_id:7,displacement:[1,0,0]}, {source_id:0,target_id:1,displacement:[NaN,0,0]}]) {
    assert.throws(() => solveTranslations(source,{'0':1,'1':1},{...network,responses:[response]}),/追従元/);
  }
});
