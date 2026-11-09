import { Matrix4 } from "three";
import orientation from "../../orientation.json" with { type: "json" };

export const DISPLAY_UP = [0, 0, 1];
export const CAMERA_EYE = orientation.camera_eye;

export function sourceToDisplay(upDir) {
  const rows = orientation.source_to_z_up[upDir];
  if (!rows) throw new Error("モデルの上方向が不正です。");
  return new Matrix4().set(
    ...rows[0], 0,
    ...rows[1], 0,
    ...rows[2], 0,
    0, 0, 0, 1,
  );
}

export function applyDisplayOrientation(root, upDir) {
  // Replace the rotation, so toggling directions never accumulates rotations.
  root.quaternion.setFromRotationMatrix(sourceToDisplay(upDir));
  root.updateMatrixWorld(true);
}
