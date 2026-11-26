import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { PARAMETERS, normalizeEditControls, applyParameterVisibility } from '../src/edit_controls.js';
import { normalizeEditorArgs } from '../src/editor_args.js';

const parts = [0, 7, 13].map(part_id => ({part_id, center: [0, 0, 0], vertices: [[0, 0, 0]], faces: []}));
function selection(parameters = ['uniform_scale']) {
  return {version: 1, source: 'part_planner_text', parts: Object.fromEntries(parts.map((p, i) =>
    [String(p.part_id), {parameters: i ? [] : parameters, reason: i ? '対象外' : '要求に必要な操作'}]))};
}
function widget(empty = false) {
  return {row: {}, input: {}, output: {}, endpoints: {}, motionLabel: {}, empty,
    moveControls: [{}, {}, {}], moveInputs: [{}, {}, {}]};
}

test('only the selected scale or movement axes are visible and interactive', () => {
  for (const parameters of [['uniform_scale'], ['translate_u', 'translate_v'], ['translate_n'], PARAMETERS, []]) {
    const w = widget();
    applyParameterVisibility(w, {parameters, reason: '選択理由'});
    assert.equal(w.row.hidden, parameters.length === 0);
    assert.equal(w.row.title, '選択理由');
    assert.equal(w.input.hidden, !parameters.includes('uniform_scale'));
    assert.equal(w.output.hidden, w.input.hidden);
    assert.equal(w.endpoints.hidden, w.input.hidden);
    assert.equal(w.input.disabled, w.input.hidden);
    w.moveControls.forEach((control, axis) => {
      assert.equal(control.hidden, !parameters.includes(PARAMETERS[axis + 1]));
      assert.equal(w.moveInputs[axis].disabled, control.hidden);
    });
  }
  const empty = widget(true);
  applyParameterVisibility(empty, {parameters: PARAMETERS, reason: '面なし'});
  assert.equal(empty.input.disabled, true);
  assert.ok(empty.moveInputs.every(input => input.disabled));
});

test('all geometry and neutral parameters remain available when some controls are hidden', () => {
  const args = normalizeEditorArgs({source_key: 'selected', parts, edit_controls: selection()});
  assert.equal(args.parts.length, 3);
  assert.deepEqual(args.scales, {'0': 1, '7': 1, '13': 1});
  assert.deepEqual(args.offsets['7'], [0, 0, 0]);
  assert.deepEqual(args.edit_controls.parts['7'].parameters, []);
  const move = normalizeEditorArgs({source_key: 'selected', parts, edit_controls: selection(['translate_n'])});
  assert.notEqual(move.controls_key, args.controls_key);
});

test('legacy plans retain all operations, invalid or incomplete selections never silently enable them', () => {
  assert.equal(normalizeEditControls(null, parts).source, 'legacy_all');
  assert.deepEqual(normalizeEditControls(undefined, parts).parts['7'].parameters, PARAMETERS);
  for (const mutate of [s => {delete s.parts['7'];}, s => {s.parts['0'].parameters = ['rotate'];},
      s => {s.parts['0'].parameters = ['uniform_scale', 'uniform_scale'];}, s => {s.parts['0'].reason = '';},
      s => {s.parts['0'].parameters = null;}, s => {s.version = 2;}]) {
    const value = selection(); mutate(value);
    assert.throws(() => normalizeEditControls(value, parts), /編集パラメータ/);
  }
  const html = fs.readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.match(html, /\[hidden\]\s*\{display:none!important;/); // Author range styles must not override hidden controls.
});
