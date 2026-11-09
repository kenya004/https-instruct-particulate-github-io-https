import test from 'node:test';
import assert from 'node:assert/strict';
import { bindZeroDetent, createZeroDetent } from '../src/zero_detent.js';
import { localOffset, setLocalOffset } from '../src/translation_frames.js';

test('pointer motion enters zero from either side and can drag through to the other side', () => {
  for (const sign of [-1, 1]) {
    const detent = createZeroDetent();
    detent.begin(sign * .5);
    assert.equal(detent.snap(sign * .03, -1, 1), sign * .03);
    assert.equal(detent.snap(sign * .019, -1, 1), 0);
    assert.equal(detent.snap(-sign * .035, -1, 1), 0);
    assert.equal(detent.snap(-sign * .041, -1, 1), -sign * .041);
    assert.equal(detent.latched, false);
  }
});

test('hysteresis holds small pointer jitter and beginning at zero can still escape', () => {
  const detent = createZeroDetent();
  detent.begin(0);
  for (const value of [.01, -.015, .03, -.039]) assert.equal(detent.snap(value, -1, 1), 0);
  assert.equal(detent.snap(.05, -1, 1), .05);
  assert.equal(detent.snap(.03, -1, 1), .03);
  assert.equal(detent.snap(.01, -1, 1), 0);
});

test('snap thresholds follow model/range scale, while inactive input remains precise', () => {
  for (const limit of [1e-6, 1, 1e6]) {
    const detent = createZeroDetent();
    assert.equal(detent.snap(limit / 1000, -limit, limit), limit / 1000);
    detent.begin(limit / 2);
    assert.equal(detent.snap(.015 * limit, -limit, limit), 0);
    assert.equal(detent.snap(.05 * limit, -limit, limit), .05 * limit);
    detent.end();
    assert.equal(detent.snap(-limit / 1000, -limit, limit), -limit / 1000);
  }
});

class RangeInput extends EventTarget {
  constructor(value = '.5') {
    super();
    this.value = value; this.min = '-1'; this.max = '1';
    this.classes = new Set();
    this.classList = {remove: name => this.classes.delete(name), toggle: (name, present) => present ? this.classes.add(name) : this.classes.delete(name)};
  }
  send(type, value) {
    if (value !== undefined) this.value = String(value);
    this.dispatchEvent(new Event(type));
  }
}

test('range event binding displays/delivers zero, releases on change, and allows keyboard fine motion', () => {
  const input = new RangeInput(), values = [];
  let starts = 0;
  const binding = bindZeroDetent(input, value => values.push(value), () => { starts += 1; });
  input.send('pointerdown');
  input.send('input', .015);
  assert.equal(input.value, '0');
  assert.equal(values.at(-1), 0);
  assert.ok(input.classes.has('zero-snap'));
  input.send('input', -.03);
  assert.equal(values.at(-1), 0);
  input.send('input', -.05);
  assert.equal(values.at(-1), -.05);
  input.send('change');
  input.send('pointerdown');
  input.send('input', .01);
  assert.equal(values.at(-1), 0);
  input.send('keydown');
  input.send('input', .001);
  assert.equal(values.at(-1), .001);
  assert.equal(input.classes.has('zero-snap'), false);
  binding.end();
  assert.equal(starts, 2);
});

test('axis controls keep separate state and snap the chosen local axis without changing the others', () => {
  const angle = .37, c = Math.cos(angle), s = Math.sin(angle);
  const frame = {basis: [[c, -s, 0], [s, c, 0], [0, 0, 1]]};
  const original = [.4, -.7, 1.2], coordinates = localOffset(original, frame);
  let offset = [...original];
  const first = new RangeInput(), second = new RangeInput();
  bindZeroDetent(first, value => { offset = setLocalOffset(offset, 0, value, frame); }, () => {});
  const values = [];
  bindZeroDetent(second, value => values.push(value), () => {});
  first.send('pointerdown'); first.send('input', .01);
  second.send('input', .001);
  const result = localOffset(offset, frame);
  assert.ok(Math.abs(result[0]) < 1e-12);
  assert.ok(Math.abs(result[1] - coordinates[1]) < 1e-12);
  assert.equal(result[2], coordinates[2]);
  assert.equal(values.at(-1), .001);
  assert.deepEqual(original, [.4, -.7, 1.2]);
});

test('cancel ends capture and ranges without an interior zero do not snap', () => {
  const input = new RangeInput(), values = [];
  bindZeroDetent(input, value => values.push(value), () => {});
  input.send('pointerdown'); input.send('input', .01); input.send('pointercancel');
  input.send('input', .001);
  assert.equal(values.at(-1), .001);
  const detent = createZeroDetent();
  detent.begin(0);
  assert.equal(detent.snap(.01, .001, 1), .01);
});
