import io
import json
import shutil
import subprocess
import unittest
from pathlib import Path
from unittest.mock import patch
import numpy as np
from streamlit.testing.v1 import AppTest
from editing import load_editable_parts
from editing_policy import policy_for
from connections import detect_connections, build_connection_plan
from test_connection_overlap import support_fixture
from test_capping import pack, prism
from test_solid_workflow import solid_editor_app
from rejoining import export_rejoined_npz, export_rejoined_glb


def policy_fixture(mixed=False, attachment=False):
    if attachment:
        _, content, _, _ = support_fixture()
        with np.load(io.BytesIO(content), allow_pickle=False) as d:
            manifest, content, _ = pack(d['vertices'], d['faces'], 1-d['face_part_ids'])
        manifest['parts'][0]['name']='handle'
        manifest['parts'][1]['name']='cup_body'
        relations=[(1,0,'cap_union')]
    else:
        manifest, content, _ = pack(*prism())
        relations=[(1,0,'blend'),(1,2,'cap_union' if mixed else 'blend')]
    manifest['editing_policy']={'version':1,'source':'part_planner_text','base_part_id':1,'relations':[
        {'parent_id':p,'child_id':c,'reference_part_id':p,'deform_part_id':c,
         'relationship':'continuous' if mode=='blend' else 'attachment','mode':mode,'reason':'編集要求による推定'}
        for p,c,mode in relations]}
    return manifest,content


class AutoEditingPolicyTests(unittest.TestCase):
    def start(self, **kwargs):
        manifest, content=policy_fixture(**kwargs)
        app=AppTest.from_function(solid_editor_app,args=(manifest,content),default_timeout=60).run()
        self.assertFalse(app.exception)
        self.assertFalse(app.error)
        key=app.session_state['part_editing']['source_key']
        return app,key,manifest,content

    def move(self,app,key,offsets,scales=None,sequence=1):
        state=app.session_state['part_editing']
        event={'source_key':key,'sequence':sequence,'scales':scales or state['scales'],'offsets':offsets}
        with patch('part_editor._component',return_value=event):
            app.run()
        self.assertFalse(app.exception)
        self.assertFalse(app.error)
        return app.session_state['part_editing']

    def test_attachment_automatically_uses_body_even_when_handle_is_first(self):
        app,key,_,_=self.start(attachment=True)
        self.assertEqual(app.selectbox(key=f'connection_root_{key}').value,1)
        state=app.session_state['part_editing']
        self.assertEqual(state['connections']['boundary_blending']['selected_ids'],[])
        app.button(key='solid_close_parts').click().run()
        self.move(app,key,{'0':[0,0,.2],'1':[0,0,0]})
        app.button(key='solid_extend_parts').click().run()
        extension=app.session_state['part_editing']['solid_extension']
        self.assertTrue(extension['complete'])
        self.assertEqual(extension['reports'][0]['parent_id'],1)
        self.assertEqual(extension['reports'][0]['child_id'],0)
        self.assertGreater(extension['result'].statistics['extension_faces'],0)

    def test_continuous_regions_automatically_blend_and_weld_without_caps(self):
        app,key,_,_=self.start()
        self.assertFalse(any(b.key=='solid_close_parts' for b in app.button))
        state=self.move(app,key,{'0':[.1,0,0],'1':[0,0,0],'2':[0,0,0]}, {'0':1.2,'1':1.,'2':1.})
        self.assertEqual(state['connections']['boundary_blending']['selected_ids'],[0,2])
        self.assertEqual(state['connections']['anchor_residuals']['0'],0)
        app.button(key='blend_join').click().run()
        joined=app.session_state['part_editing']['blend_joined']['result']
        self.assertEqual(joined.statistics['bridge_faces'],0)
        self.assertTrue(joined.mesh.is_watertight)
        self.assertTrue(any(b.key=='download_blend_stl' for b in app.get('download_button')))
        self.assertFalse(app.exception)

    def test_mixed_connections_blend_one_cut_and_extend_the_other(self):
        app,key,_,_=self.start(mixed=True)
        self.assertEqual(app.session_state['part_editing']['connections']['boundary_blending']['selected_ids'],[0])
        app.button(key='solid_close_parts').click().run()
        self.move(app,key,{'0':[.1,0,0],'1':[0,0,0],'2':[.3,0,0]})
        app.button(key='solid_extend_parts').click().run()
        extension=app.session_state['part_editing']['solid_extension']
        self.assertTrue(extension['complete'],extension)
        self.assertEqual(len(extension['reports']),2)
        blend=[r for r in extension['reports'] if r.get('mode')=='blend'][0]
        self.assertEqual(blend['length'],0)
        attach=[r for r in extension['reports'] if r['child_id']==2][0]
        self.assertGreater(attach['length'],.3)
        app.button(key='boolean_union').click().run()
        self.assertFalse(app.exception)
        self.assertFalse(app.error)
        self.assertIn('solid_union', app.session_state['part_editing'])
    def test_reference_translation_keeps_the_blended_boundary_coincident(self):
        app,key,_,_=self.start()
        state=self.move(app,key,{'0':[0,0,0],'1':[.2,.1,0],'2':[0,0,0]})
        self.assertTrue(all(abs(v)<1e-12 for v in state['connections']['anchor_residuals'].values()))

    def test_chain_of_three_parts_has_matching_boundaries_in_preview_and_export(self):
        manifest,content=policy_fixture()
        manifest['editing_policy']['base_part_id']=0
        first,second=manifest['editing_policy']['relations']
        first.update(parent_id=0,child_id=1,reference_part_id=0,deform_part_id=1)
        second.update(parent_id=1,child_id=2,reference_part_id=1,deform_part_id=2)
        app=AppTest.from_function(solid_editor_app,args=(manifest,content),default_timeout=60).run()
        key=app.session_state['part_editing']['source_key']
        state=self.move(app,key,{'0':[.2,.1,0],'1':[.1,-.2,0],'2':[-.1,.3,0]}, {'0':1.2,'1':.9,'2':1.1})
        self.assertTrue(all(abs(v)<1e-12 for v in state['connections']['anchor_residuals'].values()))
        with patch('part_editor._component',return_value=None) as component:
            app.run()
        args=component.call_args.kwargs
        node=shutil.which('node')
        self.assertIsNotNone(node)
        data={name:args[name] for name in ('parts','scales','blending','boundary_motion','offsets')}
        data['automatic']=state['connections']['automatic_translations']
        directory=Path(__file__).resolve().parents[1]/'scale_component'
        result=subprocess.run([node,'tests/motion_preview_fixture.mjs'],input=json.dumps(data),
            cwd=directory,text=True,capture_output=True,check=True)
        preview=json.loads(result.stdout)
        for part in state['edited_parts']:
            np.testing.assert_allclose(preview['vertices'][str(part.part_id)],part.vertices,atol=2e-6)
        app.button(key='blend_join').click().run()
        joined=app.session_state['part_editing']['blend_joined']['result']
        self.assertEqual(joined.statistics['bridge_faces'],0)
        metadata=state['connections']
        with np.load(io.BytesIO(export_rejoined_npz(joined,editing_metadata=metadata)),allow_pickle=False) as data:
            self.assertEqual(json.loads(data['metadata_json'].item())['editing_policy'],metadata['editing_policy'])
        glb=export_rejoined_glb(joined,source_key=key,editing_metadata=metadata)
        length=int.from_bytes(glb[12:16],'little')
        self.assertEqual(json.loads(glb[20:20+length])['extras']['editing']['editing_policy'],metadata['editing_policy'])

    def test_attachment_reference_override_changes_extension_side_and_invalidates_old_result(self):
        app,key,_,_=self.start(attachment=True)
        app.button(key='solid_close_parts').click().run()
        app.button(key='solid_extend_parts').click().run()
        before=app.session_state['part_editing']['solid_extension']
        self.assertEqual(before['reports'][0]['child_id'],0)
        app.selectbox(key=f'policy_{key}_0_1_reference').set_value(0).run()
        self.assertNotIn('solid_extension',app.session_state['part_editing'])
        app.button(key='solid_extend_parts').click().run()
        after=app.session_state['part_editing']['solid_extension']
        self.assertNotEqual(before['input_key'],after['input_key'])
        self.assertEqual(after['reports'][0]['parent_id'],0)
        self.assertEqual(after['reports'][0]['child_id'],1)
        self.assertFalse(app.error)

    def test_policy_can_be_overridden_and_legacy_plans_keep_manual_controls(self):
        app,key,_,_=self.start()
        app.selectbox(key=f'policy_{key}_0_1_mode').set_value('cap_union').run()
        self.assertEqual(app.session_state['part_editing']['connections']['boundary_blending']['selected_ids'],[2])
        self.assertTrue(any(b.key=='solid_close_parts' for b in app.button))
        manifest,content=policy_fixture()
        del manifest['editing_policy']
        old=AppTest.from_function(solid_editor_app,args=(manifest,content),default_timeout=60).run()
        oldkey=old.session_state['part_editing']['source_key']
        self.assertTrue(old.multiselect(key=f'boundary_blend_parts_{oldkey}'))
        with self.assertRaises(ValueError):
            policy_for(manifest,{'model_id':'wrong','plan_id':manifest['plan_id'],'editing_policy':{}})

if __name__=='__main__':
    unittest.main()
