import io
import json
import shutil
import subprocess
import unittest
from dataclasses import replace
from pathlib import Path
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from boundary_blending import apply_boundary_blend, blend_weights, build_blend_distances
from boundary_motion import apply_boundary_motion, motion_from_blending
from connection_planes import NETWORK_FOLLOW_METHOD
from connections import (build_connection_plan, build_following_network, connection_payload, detect_connections,
                         follow_connected_parts, following_diagnostics)
from editing import editor_payload, editor_source_key, export_edited_glb
from test_capping import pack
from test_connections import connection_fixture
from test_reference_surface_blending import handle_fixture
from test_solid_workflow import solid_editor_app


class EditSourceFollowingTests(unittest.TestCase):
    def test_either_part_drives_its_neighbor_and_never_translates_itself(self):
        _, _, parts, connections = handle_fixture()
        network = build_following_network(parts, connections)
        _, cup_edit = follow_connected_parts(parts, {'0':1.3,'1':1}, network)
        np.testing.assert_array_equal(cup_edit[0], [0,0,0])
        np.testing.assert_allclose(cup_edit[1], [.15,0,0], atol=1e-12)
        _, handle_edit = follow_connected_parts(parts, {'0':1,'1':1.3}, network)
        np.testing.assert_array_equal(handle_edit[1], [0,0,0])
        np.testing.assert_allclose(handle_edit[0], [-.45,0,0], atol=1e-12)
        self.assertTrue(all(r['source_id'] != r['target_id'] for r in network['responses']))

    def test_alternating_edits_keep_the_current_edit_position_and_reset_exactly(self):
        _, _, parts, connections = handle_fixture()
        network = build_following_network(parts, connections)
        _, first = follow_connected_parts(parts, {'0':1.3,'1':1}, network)
        _, second = follow_connected_parts(parts, {'0':1.3,'1':1.2}, network)
        np.testing.assert_array_equal(second[1], first[1])
        _, third = follow_connected_parts(parts, {'0':1.4,'1':1.2}, network)
        np.testing.assert_array_equal(third[0], second[0])
        # Only current parameters determine the result; no rerooting or pose accumulation.
        follow_connected_parts(parts, {'0':1.,'1':1.2}, network)
        _, reverse_order = follow_connected_parts(parts, {'0':1.4,'1':1.2}, network)
        for part_id in third:
            np.testing.assert_array_equal(third[part_id], reverse_order[part_id])
        restored, offsets = follow_connected_parts(parts, {'0':1.,'1':1.}, network)
        for original, current in zip(parts, restored):
            np.testing.assert_array_equal(original.vertices, current.vertices)
            np.testing.assert_array_equal(offsets[original.part_id], [0,0,0])

    def test_three_parts_combine_all_sources_and_keep_normal_plane_contacts(self):
        from editing import load_editable_parts
        manifest, artifacts = connection_fixture()
        parts = load_editable_parts(artifacts['parts.npz'], manifest)
        connections, _ = detect_connections(artifacts['parts.npz'], parts)
        network = build_following_network(parts, connections)
        scales = {'0':1.2,'1':1.3,'2':1.4}
        _, offsets = follow_connected_parts(parts, scales, network)
        np.testing.assert_allclose([offsets[i] for i in range(3)], [[-.35,0,0],[-.1,0,0],[.25,0,0]],atol=1e-12)
        for root in (0,1,2):
            plan = build_connection_plan(parts, connections, root)
            self.assertTrue(all(row['normal_residual'] < 1e-12 for row in
                following_diagnostics(parts, scales, plan, offsets, compare_deformed_planes=True)))
        self.assertEqual(network, build_following_network(tuple(reversed(parts)), tuple(reversed(connections))))

    def test_disconnected_and_empty_parts_do_not_receive_or_send_motion(self):
        _, _, parts, connections = handle_fixture()
        island = replace(parts[0],part_id=9,vertices=parts[0].vertices + [50,0,0])
        empty = replace(parts[0],part_id=7,vertices=np.empty((0,3)),faces=np.empty((0,3),dtype=int))
        all_parts = parts + (island,empty)
        network = build_following_network(all_parts,connections)
        self.assertNotIn(7, network['driver_ids'])
        _, offsets = follow_connected_parts(all_parts,{'0':1.,'1':1.,'7':1.,'9':1.5},network)
        np.testing.assert_array_equal(list(offsets.values()), np.zeros((4,3)))

    def test_javascript_and_glb_use_combined_responses_with_surface_blending(self):
        manifest, content, _, _ = handle_fixture()
        rotation = trimesh.transformations.rotation_matrix(.53,[1,2,1])[:3,:3]
        with np.load(io.BytesIO(content),allow_pickle=False) as data:
            manifest,content,parts = pack(data['vertices'] @ rotation.T,data['faces'],data['face_part_ids'])
        connections,_ = detect_connections(content,parts)
        network = build_following_network(parts,connections)
        plan = build_connection_plan(parts,connections,0)
        layout = {**connection_payload(plan),**network}
        scales = {'0':1.3,'1':1.2}
        base, automatic = follow_connected_parts(parts,scales,network)
        blending = blend_weights(build_blend_distances(content,manifest,parts,connections,[1],0),.6)
        motion = motion_from_blending(blending)
        offsets = {'0':[.1,0,.2],'1':[0,-.1,0]}
        edited = apply_boundary_motion(apply_boundary_blend(parts,base,scales,automatic,blending),offsets,motion)
        args = {'parts':editor_payload(parts),'scales':scales,'layout':layout,'blending':blending,'motion':motion,'offsets':offsets}
        node = shutil.which('node')
        self.assertIsNotNone(node)
        result = subprocess.run([node,'tests/plane_follow_preview_fixture.mjs'],input=json.dumps(args),
            cwd=Path(__file__).resolve().parents[1]/'scale_component',text=True,capture_output=True,check=True)
        preview = json.loads(result.stdout)
        for part in edited:
            np.testing.assert_allclose(preview['automatic'][str(part.part_id)],automatic[part.part_id],atol=1e-12)
            np.testing.assert_allclose(preview['vertices'][str(part.part_id)],part.vertices,atol=2e-6)
        blob = export_edited_glb(edited,source_key='edit-source',scales=scales,offsets=offsets,connection_metadata=layout)
        scene = trimesh.load(io.BytesIO(blob),file_type='glb',process=False)
        self.assertEqual(scene.metadata['connection_following']['following_method'],NETWORK_FOLLOW_METHOD)
        for part in edited:
            np.testing.assert_allclose(scene.geometry[part.geometry_name].vertices,part.vertices,atol=2e-6)

    def test_ui_ignores_old_fixed_root_and_handles_edits_from_either_side(self):
        manifest,content,_,_ = handle_fixture()
        # Use Handle as the old structural base, matching the reported failing case.
        manifest['editing_policy'] = {'version':1,'source':'part_planner_text','base_part_id':1,'relations':[
            {'parent_id':1,'child_id':0,'reference_part_id':1,'deform_part_id':0,'relationship':'continuous',
             'mode':'blend','reason':'双方向の編集を確認'}]}
        key = editor_source_key(manifest,content)
        app = AppTest.from_function(solid_editor_app,args=(manifest,content),default_timeout=60)
        app.session_state[f'connection_root_{key}'] = 1
        app.run()
        self.assertFalse(any(item.key==f'connection_root_{key}' for item in app.selectbox))
        offsets = {'0':[0,0,0],'1':[0,0,0]}
        for sequence,scales in enumerate(({'0':1.3,'1':1.},{'0':1.3,'1':1.2},{'0':1.,'1':1.}),1):
            with patch('part_editor._component',return_value={'source_key':key,'sequence':sequence,'scales':scales,'offsets':offsets}):
                app.run()
            state = app.session_state['part_editing']
            self.assertEqual(state['connections']['following_method'],NETWORK_FOLLOW_METHOD)
            np.testing.assert_allclose(state['connections']['automatic_translations']['0'],[-1.5*(scales['1']-1),0,0],atol=1e-12)
            np.testing.assert_allclose(state['connections']['automatic_translations']['1'],[.5*(scales['0']-1),0,0],atol=1e-12)
            self.assertFalse(app.exception)
            self.assertFalse(app.error)


if __name__ == '__main__':
    unittest.main()
