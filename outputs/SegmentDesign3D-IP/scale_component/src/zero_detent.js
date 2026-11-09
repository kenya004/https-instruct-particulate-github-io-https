// Pointer-only hysteresis around zero. Keyboard and assistive input stay exact.
export function createZeroDetent() {
  let active = false, latched = false;
  return {
    begin(value) { active = true; latched = value === 0; },
    end() { active = false; latched = false; },
    get latched() { return latched; },
    snap(value, min, max) {
      if (!active || !Number.isFinite(value) || !Number.isFinite(min) || !Number.isFinite(max)
          || min >= 0 || max <= 0 || max <= min) {
        latched = false;
        return value;
      }
      const span = max - min;
      // Enter within 1% of the full range, leave beyond 2% to avoid jitter.
      const radius = span * (latched ? .02 : .01);
      const epsilon = Number.EPSILON * Math.max(span, Math.abs(value)) * 8;
      latched = Math.abs(value) <= radius + epsilon;
      return latched ? 0 : value;
    },
  };
}

export function bindZeroDetent(input, onInput, onPointerStart) {
  const detent = createZeroDetent();
  const end = () => {
    detent.end();
    input.classList.remove('zero-snap');
  };
  input.addEventListener('pointerdown', () => {
    detent.begin(Number(input.value));
    onPointerStart();
  });
  input.addEventListener('keydown', end);
  input.addEventListener('change', end);
  input.addEventListener('pointercancel', end);
  input.addEventListener('input', () => {
    const value = detent.snap(Number(input.value), Number(input.min), Number(input.max));
    input.value = String(value);
    input.classList.toggle('zero-snap', detent.latched);
    onInput(value);
  });
  return {end};
}
