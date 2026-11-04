import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export function createTurntableControls(camera, element, up) {
  // OrbitControls captures the up-axis in its constructor; set it before creation.
  camera.up.copy(up);
  const controls = new OrbitControls(camera, element);
  controls.enableDamping = true;
  return controls;
}
