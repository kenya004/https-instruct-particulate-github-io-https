import test from 'node:test';
import assert from 'node:assert/strict';
import { BufferGeometry, Float32BufferAttribute, Group, LineSegments, Mesh, Vector3 } from 'three';
import { applyDisplayOrientation, CAMERA_EYE, DISPLAY_UP, sourceToDisplay } from '../src/orientation.js';

const directions = ['+Z', '-Z', '+Y', '-Y', '+X', '-X'];
function close(actual, expected) {
  assert.ok(actual.distanceTo(expected) < 1e-10, `${actual.toArray()} != ${expected.toArray()}`);
}

for (const direction of directions) {
  test(`${direction}: meshes, anchors and source-axis motion share a Z-up display frame`, () => {
    const root = new Group(), geometry = new BufferGeometry();
    geometry.setAttribute('position', new Float32BufferAttribute([0, 0, 0, 1, 2, 3, 2, 1, 4], 3));
    const mesh = new Mesh(geometry), anchors = new LineSegments(geometry.clone());
    mesh.position.set(2, 3, 4);
    anchors.position.copy(mesh.position);
    root.add(mesh, anchors);
    const sourceVertices = [...geometry.attributes.position.array];
    applyDisplayOrientation(root, direction);
    const rotation = sourceToDisplay(direction);
    const sourceUp = new Vector3();
    sourceUp['xyz'['XYZ'.indexOf(direction[1])]] = direction[0] === '+' ? 1 : -1;
    close(sourceUp.applyMatrix4(rotation), new Vector3(...DISPLAY_UP));
    assert.ok(Math.abs(rotation.determinant() - 1) < 1e-12);
    const point = new Vector3(1, 2, 3);
    close(mesh.localToWorld(point.clone()), point.clone().add(mesh.position).applyMatrix4(rotation));
    close(anchors.localToWorld(point.clone()), mesh.localToWorld(point.clone()));
    const before = mesh.getWorldPosition(new Vector3());
    mesh.position.x += 5;
    root.updateMatrixWorld(true);
    close(mesh.getWorldPosition(new Vector3()).sub(before), new Vector3(5, 0, 0).applyMatrix4(rotation));
    assert.deepEqual([...geometry.attributes.position.array], sourceVertices);
    assert.deepEqual(CAMERA_EYE, [1.5, -2, 1.5]);
  });
}

test('switching direction replaces the display rotation without accumulating edits', () => {
  const root = new Group(), child = new Group();
  child.position.set(1, 2, 3);
  root.add(child);
  for (const direction of [...directions, '+Y', '+Z']) {
    applyDisplayOrientation(root, direction);
    close(child.getWorldPosition(new Vector3()), child.position.clone().applyMatrix4(sourceToDisplay(direction)));
  }
  close(child.getWorldPosition(new Vector3()), new Vector3(1, 2, 3));
  assert.throws(() => sourceToDisplay('Y'), /上方向/);
});
