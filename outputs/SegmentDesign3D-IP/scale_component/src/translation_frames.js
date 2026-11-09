export function localOffset(offset, frame) {
  return frame.basis.map(axis => axis.reduce((sum, value, i) => sum + value * offset[i], 0));
}

export function worldOffset(coordinates, frame) {
  return [0, 1, 2].map(axis => coordinates.reduce((sum, value, i) => sum + value * frame.basis[i][axis], 0));
}

export function setLocalOffset(offset, axis, value, frame) {
  const coordinates = localOffset(offset, frame);
  coordinates[axis] = value;
  return worldOffset(coordinates, frame);
}

export function normalizeMovementFrames(value, parts) {
  const frames = {};
  for (const part of parts) {
    const id = String(part.part_id);
    const frame = value?.[id] ?? {basis: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], labels: ['X', 'Y', 'Z'], method: 'input_xyz'};
    const basis = frame.basis;
    const fail = () => { throw new Error('パーツの移動軸が不正です。'); };
    if (!Array.isArray(basis) || basis.length !== 3 || !Array.isArray(frame.labels) || frame.labels.length !== 3
        || !frame.labels.every(label => typeof label === 'string')) fail();
    for (const axis of basis) {
      if (!Array.isArray(axis) || axis.length !== 3 || !axis.every(item => typeof item === 'number' && Number.isFinite(item))) fail();
    }
    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        const dot = basis[i].reduce((sum, item, k) => sum + item * basis[j][k], 0);
        if (Math.abs(dot - (i === j ? 1 : 0)) > 1e-7) fail();
      }
    }
    const [a, b, c] = basis;
    const determinant = a[0] * (b[1] * c[2] - b[2] * c[1]) - a[1] * (b[0] * c[2] - b[2] * c[0]) + a[2] * (b[0] * c[1] - b[1] * c[0]);
    if (Math.abs(determinant - 1) > 1e-7) fail();
    frames[id] = frame;
  }
  return frames;
}
