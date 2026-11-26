import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateConnections, limitConnectionOffset, normalizeSolidConnections } from '../src/connection_constraints.js';
import { normalizeEditorArgs } from '../src/editor_args.js';
import { affineTransforms, writeBlendedPositions } from '../src/boundary_blending.js';
import { solveTranslations } from '../src/connection_solver.js';

const near = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);
const quad = (size, z) => [[-size, -size, z], [size, -size, z], [size, size, z], [-size, size, z]];
const center = vertices => [0, 1, 2].map(axis => vertices.reduce((sum, point) => sum + point[axis], 0) / vertices.length);
const sideFaces = () => [0, 1, 2, 3].flatMap(i => {
  const j = (i + 1) % 4;
  return [i, j, j + 4, i, j + 4, i + 4];
});

function supportFixture(thickness = 1) {
  const parentVertices = [...quad(5, -thickness), ...quad(5, 0), ...quad(1, 0)];
  const parentFaces = [0, 2, 1, 0, 3, 2, ...sideFaces()];
  const parentCap = [];
  for (let i = 0; i < 4; i += 1) {
    const j = (i + 1) % 4;
    parentFaces.push(i + 4, j + 4, j + 8, i + 4, j + 8, i + 8);
    parentCap.push([i + 8, j + 8, 12]);
  }
  const childVertices = [...quad(1, 0), ...quad(1, 4)];
  const childFaces = [...sideFaces(), 4, 5, 6, 4, 6, 7];
  const childCap = [0, 1, 2, 3].map(i => [(i + 1) % 4, i, 8]);
  const parts = [
    { part_id: 0, name: 'support', color: '#168b83', vertices: parentVertices, faces: parentFaces, center: [0, 0, -thickness / 2] },
    { part_id: 1, name: 'post', color: '#d77a35', vertices: childVertices, faces: childFaces, center: [0, 0, 2] },
  ];
  return { source_key: 'support-source', parts, scales: { '0': 1, '1': 1 }, offsets: { '0': [0, 0, 0], '1': [0, 0, 0] },
    movement: { limit: 10, step: .01 }, layout: { connections: [], attachments: [] }, follow: false,
    blending: { parts: {}, anchors: {} }, boundary_motion: { parts: {}, anchors: {} },
    solid_connections: { enabled: true, revision: 'support-v1', depth_ratio: .01, max_extension_ratio: .05,
      frame: { origin: [0, 0, 0], scale: 10 },
      parts: {
        '0': { vertices: [...parentVertices.map(point => [...point]), [0, 0, 0]], faces: [...parentFaces, ...parentCap.flat()],
          original_vertex_count: parentVertices.length, centers: [{ index: 12, loop: [8, 9, 10, 11] }] },
        '1': { vertices: [...childVertices.map(point => [...point]), [0, 0, 0]], faces: [...childFaces, ...childCap.flat()],
          original_vertex_count: childVertices.length, centers: [{ index: 8, loop: [0, 1, 2, 3] }] },
      },
      regions: [{ connection_ids: [0], parent_id: 0, child_id: 1, cap_id: 1,
        child_loops: [[0, 1, 2, 3]], parent_loops: [[8, 9, 10, 11]],
        pairs: [[0, 8], [1, 9], [2, 10], [3, 11]], normal: [0, 0, -1], cap_faces: childCap }] } };
}

const moved = (args, offset) => ({ ...args.offsets, '1': offset });

test('staged closure preview follows free movement without rays or automatic extension', () => {
  const args = supportFixture();
  args.solid_connections.preview_only = true;
  for (const offset of [[0, 0, .2], [8, 0, 4], [0, 0, 0]]) {
    const requested = moved(args, offset), original = JSON.stringify(requested);
    const result = evaluateConnections(args, args.scales, requested);
    assert.equal(result.preview_only, true);
    assert.equal(result.valid, true);
    assert.deepEqual(result.reports, []);
    assert.equal(result.stats.rays, 0);
    assert.equal(result.stats.bvh_builds, 0);
    assert.equal(result.preview.parts['1'].faces.length, 12);
    result.preview.parts['1'].vertices.slice(0, 4).forEach((point, index) => {
      point.forEach((value, axis) => near(value, args.parts[1].vertices[index][axis] + offset[axis]));
    });
    near(result.preview.parts['1'].vertices[8][2], offset[2]);
    assert.equal(JSON.stringify(requested), original);
  }
});

test('explicit cap faces keep seam remapping and an unsuccessful closure out of the overlay', () => {
  const args = supportFixture();
  args.solid_connections.preview_only = true;
  args.solid_connections.parts['1'].preview_faces = [];
  args.solid_connections.parts['0'].preview_faces = args.solid_connections.parts['0'].faces.slice(-12);
  const result = evaluateConnections(normalizeEditorArgs(args), args.scales, moved(args, [0, 0, .3]));
  assert.equal(result.valid, true);
  assert.deepEqual(result.preview.parts['1'].faces, []);
  assert.equal(result.preview.parts['0'].faces.length, 12);
  assert.equal(result.stats.rays, 0);
});

test('closure preview rejects malformed explicit cap indices without altering movement inputs', () => {
  const args = supportFixture();
  args.solid_connections.preview_only = true;
  args.solid_connections.parts['1'].preview_faces = [0, 1, 123456];
  const requested = moved(args, [0, 0, .5]);
  const result = evaluateConnections(args, args.scales, requested);
  assert.equal(result.valid, false);
  assert.deepEqual(requested['1'], [0, 0, .5]);
});

test('opt-in contacts have zero extension and separate current cap geometry without mutating inputs', () => {
  const args = supportFixture(), original = JSON.stringify(args);
  const result = evaluateConnections(args);
  assert.equal(result.enabled, true);
  assert.equal(result.valid, true);
  assert.equal(result.reports.length, 1);
  assert.equal(result.reports[0].reason, 'contact');
  assert.equal(result.reports[0].length, 0);
  assert.equal(result.stats.rays, 0);
  assert.equal(result.preview.parts['0'].faces.length, 12);
  assert.equal(result.preview.parts['1'].faces.length, 12);
  assert.equal(JSON.stringify(args), original);
  result.preview.parts['1'].vertices[0][0] = 123;
  assert.equal(evaluateConnections(args).preview.parts['1'].vertices[0][0], -1);
});

test('lateral motion adds depth and normal gaps add gap plus depth with the five-percent bound', () => {
  const args = supportFixture();
  const tangent = evaluateConnections(args, args.scales, moved(args, [.4, 0, 0]));
  assert.equal(tangent.valid, true);
  near(tangent.reports[0].width, 2);
  near(tangent.reports[0].depth, .02);
  near(tangent.reports[0].length, .02);
  assert.deepEqual(tangent.reports[0].direction, [0, 0, -1]);
  assert.equal(tangent.preview.parts['1'].faces.length, 36); // Four tip triangles plus eight side triangles.
  const nearGap = evaluateConnections(args, args.scales, moved(args, [0, 0, .05]));
  assert.equal(nearGap.valid, true);
  near(nearGap.reports[0].length, .07);
  const farGap = evaluateConnections(args, args.scales, moved(args, [0, 0, .2]));
  assert.equal(farGap.valid, false);
  assert.equal(farGap.reports[0].reason, 'no_common_length');
});

test('thin encountered walls reduce the shared depth and keep tip caps inside the receiver', () => {
  const args = supportFixture(.05);
  const result = evaluateConnections(args, args.scales, moved(args, [.2, 0, .02]));
  assert.equal(result.valid, true);
  near(result.reports[0].depth, .005);
  near(result.reports[0].length, .025);
  const derived = result.preview.parts['1'];
  for (const index of derived.faces.slice(0, 12)) near(derived.vertices[index][2], -.005);
});

test('descriptor normal is preferred, and its opposite is tried when only that direction reaches the parent', () => {
  const args = supportFixture();
  args.solid_connections.regions[0].normal = [0, 0, 1];
  const result = evaluateConnections(args, args.scales, moved(args, [.2, 0, .01]));
  assert.equal(result.valid, true);
  assert.deepEqual(result.reports[0].direction.map(value => value || 0), [0, 0, -1]);
  near(result.reports[0].length, .03);
});

test('offset guard finds the first boundary, returns actual offsets, and preserves exact zero', () => {
  const args = supportFixture(), requested = moved(args, [0, 0, .2]);
  const result = limitConnectionOffset(args, args.scales, args.offsets, requested);
  assert.equal(result.clamped, true);
  assert.equal(result.valid, true);
  assert.ok(result.offsets['1'][2] >= .07999 && result.offsets['1'][2] <= .080001);
  assert.ok(result.fraction > 0 && result.fraction < 1);
  assert.deepEqual(args.offsets['1'], [0, 0, 0]);
  assert.deepEqual(requested['1'], [0, 0, .2]);
  const zero = limitConnectionOffset(args, args.scales, result.offsets, args.offsets);
  assert.equal(zero.clamped, false);
  assert.deepEqual(zero.offsets['1'], [0, 0, 0]);
});

test('platform edge stops a partly unsupported footprint', () => {
  const args = supportFixture();
  const result = limitConnectionOffset(args, args.scales, args.offsets, moved(args, [4.2, 0, 0]));
  assert.equal(result.clamped, true);
  assert.equal(result.valid, true);
  assert.ok(result.offsets['1'][0] >= 3.999 && result.offsets['1'][0] <= 4.000001);
});

test('an invalid existing pose can recover directly, while another invalid request holds it in place', () => {
  const args = supportFixture(), invalid = moved(args, [0, 0, .3]);
  const hold = limitConnectionOffset(args, args.scales, invalid, moved(args, [0, 0, .4]));
  assert.equal(hold.valid, false);
  assert.equal(hold.clamped, true);
  assert.deepEqual(hold.offsets, invalid);
  const recovered = limitConnectionOffset(args, args.scales, invalid, args.offsets);
  assert.equal(recovered.valid, true);
  assert.equal(recovered.clamped, false);
  assert.equal(recovered.reason, 'recovered');
  assert.deepEqual(recovered.offsets, args.offsets);
});

test('scaling reports invalid connections without silently changing scales or offsets', () => {
  const args = supportFixture();
  args.scales['1'] = .5;
  const input = JSON.stringify(args);
  const result = evaluateConnections(args);
  assert.equal(result.valid, false);
  assert.equal(JSON.stringify(args), input);
  assert.equal(result.preview.parts['1'].faces.length, 12);
});

test('original vertices use the same following, blending and boundary motion as the body preview', () => {
  const args = supportFixture();
  args.follow = true;
  args.layout.attachments = [{ parent_id: 0, child_id: 1, anchor: [.2, -.3, 0], following_method:'reference_plane_normal_v1',
    projection:[[0,0,0],[0,0,0],[0,0,1]],scale_displacement:[0,0,-.5] }];
  args.scales = { '0': 1.1, '1': 1.2 };
  args.offsets = { '0': [.1, .2, .3], '1': [.3, -.1, .2] };
  args.blending.parts['1'] = { influences: [{ reference_part_id: 0, weights: [.2, .3, .4, .1, 0, 0, 0, 0] }] };
  args.boundary_motion.parts['1'] = { weights: [0, .1, .2, .3, .7, .8, .9, 1], ratio: .2 };
  const automatic = solveTranslations(args.parts, args.scales, args.layout.attachments);
  const transforms = affineTransforms(args.parts, args.scales, automatic), expected = new Float64Array(24);
  writeBlendedPositions(args.parts[1], transforms, args.blending.parts['1'], expected, args.offsets['1'], args.boundary_motion.parts['1']);
  const result = evaluateConnections(args), vertices = result.preview.parts['1'].vertices;
  assert.ok(vertices);
  for (let index = 0; index < 8; index += 1) for (let axis = 0; axis < 3; axis += 1) {
    near(vertices[index][axis], expected[index * 3 + axis] + args.parts[1].center[axis]);
  }
  let total = 0;
  const weighted = [0, 0, 0];
  for (let i = 0; i < 4; i += 1) {
    const a = vertices[i], b = vertices[(i + 1) % 4], length = Math.hypot(...a.map((value, axis) => value - b[axis]));
    total += length;
    for (let axis = 0; axis < 3; axis += 1) weighted[axis] += length * (a[axis] + b[axis]) / 2;
  }
  for (let axis = 0; axis < 3; axis += 1) near(vertices[8][axis], weighted[axis] / total);
});

test('fixed boundary weights retain paired contact despite body offsets', () => {
  const args = supportFixture();
  args.boundary_motion.parts['1'] = { weights: [0, 0, 0, 0, 1, 1, 1, 1], ratio: .2 };
  const result = evaluateConnections(args, args.scales, moved(args, [.5, .2, .1]));
  assert.equal(result.valid, true);
  assert.equal(result.reports[0].reason, 'contact');
  assert.equal(result.reports[0].length, 0);
});

test('posed payload coordinates are not offset a second time and generated centers are recomputed', () => {
  const args = supportFixture();
  args.offsets['1'] = [.4, 0, .05];
  args.solid_connections.parts['1'].vertices = args.solid_connections.parts['1'].vertices.map(point => point.map((value, axis) => value + args.offsets['1'][axis]));
  args.solid_connections.parts['1'].vertices[8] = [999, 999, 999];
  const result = evaluateConnections(args);
  assert.equal(result.valid, true);
  near(result.reports[0].length, .07);
  for (let axis = 0; axis < 3; axis += 1) near(result.preview.parts['1'].vertices[0][axis], [-.6, -1, .05][axis]);
  near(result.preview.parts['1'].vertices[8][0], .4);
  near(result.preview.parts['1'].vertices[8][2], .05);
});

test('source guards and absent, null or disabled payloads retain unrestricted legacy movement', () => {
  const args = supportFixture();
  const active = normalizeEditorArgs(args);
  assert.equal(active.solid_connections.enabled, true);
  assert.equal(active.solid_connections.source_key, args.source_key);
  for (const payload of [undefined, null, { enabled: false }, { ...args.solid_connections, source_key: 'another-source' }, active.solid_connections]) {
    const source_key = payload === active.solid_connections ? 'another-source' : args.source_key;
    const legacy = normalizeEditorArgs({ ...args, source_key, solid_connections: payload });
    assert.equal(legacy.solid_connections, null);
    const requested = moved(legacy, [10, 0, 3]);
    const result = limitConnectionOffset(legacy, legacy.scales, legacy.offsets, requested);
    assert.equal(result.enabled, false);
    assert.equal(result.clamped, false);
    assert.deepEqual(result.offsets, requested);
    assert.deepEqual(result.preview.parts, {});
  }
});

test('malformed enabled payloads fail closed with plain diagnostics', () => {
  for (const change of [
    payload => { payload.parts['1'].original_vertex_count = 99; },
    payload => { payload.parts['0'].faces[0] = -1; },
    payload => { payload.regions[0].normal = [0, 0, 0]; },
    payload => { payload.regions[0].pairs[0] = [0, 999]; },
    payload => { payload.parts['1'].centers = []; },
    payload => { payload.frame.scale = NaN; },
    payload => { delete payload.parts['1']; },
  ]) {
    const args = supportFixture();
    change(args.solid_connections);
    const result = evaluateConnections(args);
    assert.equal(result.enabled, true);
    assert.equal(result.valid, false);
    assert.equal(result.reports[0].reason, 'invalid_payload');
    assert.equal(typeof result.reports[0].message, 'string');
    const guarded = limitConnectionOffset(args, args.scales, args.offsets, moved(args, [.2, 0, 0]));
    assert.equal(guarded.clamped, true);
    assert.deepEqual(guarded.offsets, args.offsets);
  }
});

// Combine disconnected solids into one source part, retaining local original IDs.
function combineCopies(args, id, copies) {
  const source = args.parts.find(part => String(part.part_id) === id), spec = args.solid_connections.parts[id];
  const n = source.vertices.length, originalCount = n * copies.length;
  const remap = (index, copy) => index < n ? copy * n + index : originalCount + copy * spec.centers.length + index - n;
  const posed = (point, copy) => point.map((value, axis) => value * (copies[copy].scale?.[axis] ?? 1) + copies[copy].shift[axis]);
  source.vertices = copies.flatMap((_, copy) => source.vertices.map(point => posed(point, copy)));
  source.faces = copies.flatMap((_, copy) => source.faces.map(index => remap(index, copy)));
  source.center = center(source.vertices);
  args.solid_connections.parts[id] = {
    original_vertex_count: originalCount,
    vertices: [...source.vertices.map(point => [...point]), ...copies.flatMap((_, copy) => spec.vertices.slice(n).map(point => posed(point, copy)))],
    faces: copies.flatMap((_, copy) => spec.faces.map(index => remap(index, copy))),
    centers: copies.flatMap((_, copy) => spec.centers.map(item => ({ index: remap(item.index, copy), loop: item.loop.map(index => remap(index, copy)) }))),
  };
  return remap;
}

test('every contact is checked even when two regions connect the same sparse pair', () => {
  const args = supportFixture();
  const parent = combineCopies(args, '0', [{ shift: [0, 0, 0] }, { shift: [0, 12, 0], scale: [.3, .3, 1] }]);
  const child = combineCopies(args, '1', [{ shift: [0, 0, 0] }, { shift: [0, 12, 0] }]);
  const first = args.solid_connections.regions[0];
  first.cap_faces = first.cap_faces.map(face => face.map(index => child(index, 0)));
  const second = { ...first, cap_id: 2, connection_ids: [1],
    child_loops: first.child_loops.map(loop => loop.map(index => child(index, 1))),
    parent_loops: first.parent_loops.map(loop => loop.map(index => parent(index, 1))),
    pairs: first.pairs.map(([a, b]) => [child(a, 1), parent(b, 1)]),
    cap_faces: supportFixture().solid_connections.regions[0].cap_faces.map(face => face.map(index => child(index, 1))) };
  args.solid_connections.regions.push(second);
  args.solid_connections.frame.scale = 30;
  const result = evaluateConnections(args, args.scales, moved(args, [.6, 0, 0]));
  assert.equal(result.valid, false);
  assert.equal(result.reports.length, 2);
  assert.deepEqual(result.reports.map(report => report.valid), [true, false]);
});

test('segment checking cannot jump across an invalid gap to a distant valid receiver island', () => {
  const args = supportFixture();
  combineCopies(args, '0', [{ shift: [0, 0, 0] }, { shift: [12, 0, 0] }]);
  args.solid_connections.frame.scale = 22;
  const requested = moved(args, [12, 0, 0]);
  assert.equal(evaluateConnections(args, args.scales, requested).valid, true);
  const result = limitConnectionOffset(args, args.scales, args.offsets, requested);
  assert.equal(result.clamped, true);
  assert.equal(result.valid, true);
  assert.ok(result.offsets['1'][0] >= 3.999 && result.offsets['1'][0] <= 4.000001);
});

test('per-sample ray hits still fail when their feasible length intervals do not overlap', () => {
  const args = supportFixture(.05);
  for (const index of [1, 2]) args.parts[1].vertices[index][2] = .08;
  const result = evaluateConnections(args, args.scales, moved(args, [.2, 0, 0]));
  assert.equal(result.valid, false);
  assert.equal(result.reports[0].reason, 'no_common_length');
});

test('large receivers use a cached triangle BVH and refit only after parent deformation', () => {
  const args = supportFixture();
  combineCopies(args, '0', Array.from({ length: 300 }, (_, i) => ({ shift: [i * 20, 0, 0] })));
  args.solid_connections.frame.scale = 6000;
  const triangleCount = args.solid_connections.parts['0'].faces.length / 3;
  const initial = evaluateConnections(args, args.scales, moved(args, [.2, 0, 0]));
  assert.equal(initial.valid, true);
  assert.equal(initial.stats.bvh_builds, 1);
  assert.ok(initial.reports[0].sample_count <= 64);
  assert.ok(initial.stats.triangle_tests < initial.stats.rays * triangleCount / 20);
  const reused = evaluateConnections(args, args.scales, moved(args, [.3, 0, 0]));
  assert.equal(reused.valid, true);
  assert.equal(reused.stats.bvh_builds, 0);
  assert.equal(reused.stats.bvh_refits, 0);
  const refitted = evaluateConnections(args, args.scales, { '0': [.01, 0, 0], '1': [.3, 0, .01] });
  assert.equal(refitted.valid, true);
  assert.equal(refitted.stats.bvh_builds, 0);
  assert.equal(refitted.stats.bvh_refits, 1);
});

test('sparse part IDs and omitted empty manifest parts work, including unused generated vertices', () => {
  const args = supportFixture();
  args.parts[0].part_id = 7;
  args.parts[1].part_id = 99;
  args.parts.push({ part_id: 123, name: 'empty', vertices: [], faces: [], center: null });
  args.scales = { '7': 1, '99': 1, '123': 1 };
  args.offsets = { '7': [0, 0, 0], '99': [.2, 0, .01], '123': [0, 0, 0] };
  args.solid_connections.parts = { '7': args.solid_connections.parts['0'], '99': args.solid_connections.parts['1'] };
  args.solid_connections.parts['99'].vertices.push([999, 999, 999]);
  args.solid_connections.regions[0].parent_id = 7;
  args.solid_connections.regions[0].child_id = 99;
  const result = evaluateConnections(normalizeEditorArgs(args));
  assert.equal(result.enabled, true);
  assert.equal(result.valid, true);
  assert.equal(result.preview.parts['123'], undefined);
  near(result.reports[0].length, .03);
});

function prismFixture({ hollow = false, plate = false } = {}) {
  const ring = z => hollow ? [...quad(2, z), ...quad(1, z)]
    : quad(1, z).map(([x, y, height]) => [x, plate ? y * .01 : y, height]);
  const count = hollow ? 8 : 4, walls = [], cap = [];
  for (let i = 0; i < 4; i += 1) {
    const j = (i + 1) % 4;
    walls.push(i, j, j + count, i, j + count, i + count);
    if (hollow) {
      walls.push(j + 4, i + 4, i + 4 + count, j + 4, i + 4 + count, j + 4 + count);
      cap.push([i, j, j + 4], [i, j + 4, i + 4]);
    }
  }
  if (!hollow) cap.push([0, 1, 2], [0, 2, 3]);
  const bottom = cap.map(face => [...face].reverse()), top = cap.map(face => face.map(index => index + count));
  const parentVertices = [...ring(-2), ...ring(0)], childVertices = [...ring(0), ...ring(2)];
  const parts = [
    { part_id: 0, name: 'receiver prism', vertices: parentVertices, faces: [...walls, ...bottom.flat()], center: [0, 0, -1] },
    { part_id: 1, name: 'child prism', vertices: childVertices, faces: [...walls, ...top.flat()], center: [0, 0, 1] },
  ];
  const loops = [[0, 1, 2, 3], ...(hollow ? [[4, 7, 6, 5]] : [])];
  return { source_key: 'prism-source', parts, scales: { '0': 1, '1': 1 }, offsets: { '0': [0, 0, 0], '1': [0, 0, 0] },
    solid_connections: { enabled: true, revision: `prism-${hollow}-${plate}`, frame: { origin: [0, 0, 0], scale: 4 },
      depth_ratio: .01, max_extension_ratio: .05,
      parts: Object.fromEntries(parts.map(part => [String(part.part_id), { vertices: part.vertices.map(point => [...point]),
        faces: [...walls, ...bottom.flat(), ...top.flat()], original_vertex_count: part.vertices.length, centers: [] }])),
      regions: [{ connection_ids: [0], parent_id: 0, child_id: 1, cap_id: 1, normal: [0, 0, -1], cap_faces: bottom,
        child_loops: loops, parent_loops: loops.map(loop => loop.map(index => index + count)),
        pairs: Array.from({ length: count }, (_, index) => [index, index + count]) }] } };
}

test('axial rods, thin plates and hollow prisms accept cap rays on receiver side walls', () => {
  for (const options of [{}, { plate: true }, { hollow: true }]) {
    const args = prismFixture(options), width = options.plate ? .02 : options.hollow ? 4 : 2;
    const gap = width * .025, result = evaluateConnections(args, args.scales, moved(args, [0, 0, gap]));
    assert.equal(result.valid, true, JSON.stringify(options));
    near(result.reports[0].width, width);
    near(result.reports[0].length, gap + width * .01);
    assert.ok(result.reports[0].sample_count <= 64);
    assert.ok(result.preview.parts['1'].faces.length > args.solid_connections.regions[0].cap_faces.length * 3);
    const submerged = evaluateConnections(args, args.scales, moved(args, [0, 0, -width * .1]));
    assert.equal(submerged.valid, true);
    assert.equal(submerged.reports[0].length, 0);
    assert.equal(evaluateConnections(args, args.scales, moved(args, [0, 0, width * .1])).valid, false);
  }
});

test('surface ray tolerance follows the physical frame tolerance and rejects rays beyond it', () => {
  for (const options of [{}, { plate: true }, { hollow: true }]) {
    const args = prismFixture(options), tolerance = args.solid_connections.frame.scale * 1e-9;
    const gap = options.plate ? .0005 : .05;
    const surface = evaluateConnections(args, args.scales, moved(args, [tolerance * .5, 0, gap]));
    assert.equal(surface.valid, true, JSON.stringify(options));
    const outside = evaluateConnections(args, args.scales, moved(args, [tolerance * 8, 0, gap]));
    assert.equal(outside.valid, false, JSON.stringify(options));
  }
});
