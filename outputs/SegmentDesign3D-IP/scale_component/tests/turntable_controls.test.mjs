import test from 'node:test';
import assert from 'node:assert/strict';
import { PerspectiveCamera, Vector3 } from 'three';
import { createTurntableControls } from '../src/turntable_controls.js';

for (const [name, axis] of Object.entries({'+X': [1, 0, 0], '-X': [-1, 0, 0], '+Y': [0, 1, 0], '-Y': [0, -1, 0], '+Z': [0, 0, 1], '-Z': [0, 0, -1]})) {
  test(`turntable yaw preserves the ${name} up-axis without roll`, () => {
    const camera = new PerspectiveCamera(38, 1, .01, 1000);
    camera.position.set(3, -4, 5);
    const up = new Vector3(...axis);
    const controls = createTurntableControls(camera, null, up);
    controls.enableDamping = false;
    controls.target.set(.3, -.2, .1);
    controls.update();
    const before = camera.position.clone();
    const relative = before.clone().sub(controls.target);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 6;
    controls.update(.2);
    const after = camera.position.clone().sub(controls.target);
    assert.ok(Math.abs(after.dot(up) - relative.dot(up)) < 1e-10);
    assert.ok(Math.abs(after.length() - relative.length()) < 1e-10);
    assert.ok(camera.position.distanceTo(before) > .01);
    assert.ok(camera.up.distanceTo(up) < 1e-12);
    const cameraRight = new Vector3(1, 0, 0).applyQuaternion(camera.quaternion);
    assert.ok(Math.abs(cameraRight.dot(up)) < 1e-10);
  });
}
