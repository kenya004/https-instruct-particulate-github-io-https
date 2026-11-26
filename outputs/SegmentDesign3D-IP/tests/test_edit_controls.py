import copy
import io
import unittest
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from edit_controls import PARAMETERS, controls_for
from editing import editor_source_key, export_edited_glb, load_editable_parts, synchronize_editor
from test_connections import connection_fixture
from test_solid_workflow import solid_editor_app


def fixture(parameters=('uniform_scale',)):
    manifest, artifacts = connection_fixture()
    for p in manifest['parts']:
        p.update(is_edit_target=p['part_id'] == 1, edit_parameters=list(parameters) if p['part_id'] == 1 else [],
                 parameter_reason='要求に必要な操作だけを選択' if p['part_id'] == 1 else '編集対象外：自動追従を使用')
    return manifest, artifacts['parts.npz']


class EditControlsTests(unittest.TestCase):
    def test_selected_controls_use_part_ids_and_legacy_fallback_is_explicit(self):
        manifest, _ = fixture(('translate_v', 'translate_u'))
        selected = controls_for(manifest)
        self.assertEqual(selected['source'], 'part_planner_text')
        self.assertEqual(selected['parts']['1']['parameters'], ['translate_u', 'translate_v'])
        self.assertEqual(selected['parts']['0']['parameters'], [])
        old = copy.deepcopy(manifest)
        for p in old['parts']:
            del p['edit_parameters'], p['parameter_reason']
        self.assertEqual(controls_for(old)['source'], 'legacy_all')
        self.assertEqual(controls_for(old)['parts']['0']['parameters'], list(PARAMETERS))
        self.assertEqual(controls_for(old, manifest), selected)
        wrong = copy.deepcopy(manifest)
        wrong['plan_id'] = 'different'
        with self.assertRaises(ValueError):
            controls_for(old, wrong)
        wrong = copy.deepcopy(manifest)
        wrong['parts'][0]['name'] = 'different'
        with self.assertRaises(ValueError):
            controls_for(old, wrong)

    def test_invalid_partial_or_unsupported_selections_are_rejected(self):
        for change in (lambda p: p.update(edit_parameters=['length_scale']),
                       lambda p: p.update(edit_parameters=['translate_n', 'translate_n']),
                       lambda p: p.update(parameter_reason=' '),
                       lambda p: p.pop('edit_parameters'),
                       lambda p: p.update(is_edit_target=False)):
            manifest, _ = fixture()
            change(manifest['parts'][1])
            with self.subTest(change=change), self.assertRaises(ValueError):
                controls_for(manifest)

    def test_editor_keeps_hidden_meshes_and_automatic_following(self):
        manifest, content = fixture()
        rest = load_editable_parts(content, manifest)
        app = AppTest.from_function(solid_editor_app, args=(manifest, content), default_timeout=60)
        with patch('part_editor._component', return_value=None) as component:
            app.run()
        args = component.call_args.kwargs
        key = args['source_key']
        self.assertEqual(len(args['parts']), 3)
        self.assertEqual(args['edit_controls']['parts']['1']['parameters'], ['uniform_scale'])
        self.assertEqual(args['edit_controls']['parts']['0']['parameters'], [])
        self.assertTrue(args['show_movement_axes'])
        self.assertTrue(all(len(frame['basis']) == 3 for frame in args['movement_frames'].values()))
        event = {'source_key': key, 'sequence': 1, 'scales': {'0': 1., '1': 1.2, '2': 1.}}
        with patch('part_editor._component', return_value=event):
            app.run()
        self.assertFalse(app.exception)
        self.assertFalse(app.error)
        state = app.session_state['part_editing']
        for original, changed in zip(rest, state['edited_parts']):
            self.assertEqual(len(original.faces), len(changed.faces))
        self.assertTrue(np.linalg.norm(state['connections']['automatic_translations']['0']) > 0)
        self.assertEqual(state['scales']['0'], 1)
        self.assertEqual(state['offsets']['0'], [0, 0, 0])
        blob = export_edited_glb(state['edited_parts'], source_key=key, scales=state['scales'], connection_metadata=state['connections'])
        scene = trimesh.load(io.BytesIO(blob), file_type='glb', process=False)
        self.assertEqual(len(scene.geometry), 3)
        self.assertEqual(scene.metadata['connection_following']['edit_controls'], args['edit_controls'])

    def test_only_selected_oblique_axis_can_change_and_reset_remains_available(self):
        manifest, content = fixture(('translate_n',))
        parts = load_editable_parts(content, manifest)
        controls = controls_for(manifest)
        basis = trimesh.transformations.rotation_matrix(.4, [1, 2, 3])[:3, :3]
        frames = {str(p.part_id): {'basis': basis.tolist()} for p in parts}
        state = synchronize_editor({}, 'source', parts)
        offsets = copy.deepcopy(state['offsets'])
        offsets['1'] = (basis[2] * .01).tolist()
        synchronize_editor(state, 'source', parts, {'source_key': 'source', 'sequence': 1,
            'scales': state['scales'], 'offsets': offsets}, movement_frames=frames, controls=controls)
        accepted = copy.deepcopy(state)
        offsets['1'] = (basis[2] * .01 + basis[0] * .02).tolist()
        with self.assertRaisesRegex(ValueError, '選択されていない方向'):
            synchronize_editor(state, 'source', parts, {'source_key': 'source', 'sequence': 2,
                'scales': state['scales'], 'offsets': offsets}, movement_frames=frames, controls=controls)
        self.assertEqual(state, accepted)
        with self.assertRaisesRegex(ValueError, '選択されていない倍率'):
            synchronize_editor(state, 'source', parts, {'source_key': 'source', 'sequence': 2,
                'scales': {'0': 1., '1': 1.2, '2': 1.}}, movement_frames=frames, controls=controls)
        synchronize_editor(state, 'source', parts, {'source_key': 'source', 'sequence': 2,
            'reset': True, 'scales': {'0': 1., '1': 1., '2': 1.}, 'offsets': {str(p.part_id): [0, 0, 0] for p in parts}},
            movement_frames=frames, controls=controls)
        self.assertEqual(state['offsets']['1'], [0, 0, 0])
        state['scales']['0'] = 1.3  # A new plan/source must discard any previous pose.
        synchronize_editor(state, 'new-source', parts)
        self.assertEqual(state['scales']['0'], 1)

    def test_saved_plan_without_controls_remains_viewable(self):
        manifest, content = fixture(())
        manifest['parts'][1]['parameter_reason'] = '長さだけを変える機能は未対応です。'
        app = AppTest.from_function(solid_editor_app, args=(manifest, content), default_timeout=60)
        with patch('part_editor._component', return_value=None) as component:
            app.run()
        args = component.call_args.kwargs
        self.assertTrue(all(not s['parameters'] for s in args['edit_controls']['parts'].values()))
        self.assertEqual(len(args['parts']), 3)
        self.assertTrue(args['show_movement_axes'])
        self.assertTrue(any('編集操作が選択されていません' in item.value for item in app.info))
        self.assertFalse(app.exception)
        self.assertFalse(app.error)

    def test_approximate_control_keeps_its_explanation_and_minimal_selection(self):
        manifest, content = fixture()
        reason = '一様倍率で長さの変更を近似します。太さも同時に変化します。'
        manifest['parts'][1]['parameter_reason'] = reason
        app = AppTest.from_function(solid_editor_app, args=(manifest, content), default_timeout=60)
        with patch('part_editor._component', return_value=None) as component:
            app.run()
        args = component.call_args.kwargs
        self.assertEqual(args['edit_controls']['parts']['1'], {'parameters': ['uniform_scale'], 'reason': reason})
        self.assertTrue(all(not spec['parameters'] for i, spec in args['edit_controls']['parts'].items() if i != '1'))
        self.assertTrue(args['show_movement_axes'])
        self.assertFalse(app.exception)
        self.assertFalse(app.error)

    def test_stale_event_cannot_change_a_hidden_part_or_its_saved_values(self):
        manifest, content = fixture()
        app = AppTest.from_function(solid_editor_app, args=(manifest, content), default_timeout=60).run()
        key = editor_source_key(manifest, content)
        with patch('part_editor._component', return_value={'source_key': key, 'sequence': 1,
                'scales': {'0': 1.5, '1': 1., '2': 1.}}):
            app.run()
        self.assertFalse(app.exception)
        self.assertTrue(any('選択されていない倍率' in error.value for error in app.error))
        self.assertEqual(app.session_state['part_editing']['scales']['0'], 1)


if __name__ == '__main__':
    unittest.main()
