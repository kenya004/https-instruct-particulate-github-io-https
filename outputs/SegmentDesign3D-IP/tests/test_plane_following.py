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
from connection_planes import FOLLOW_METHOD, NETWORK_FOLLOW_METHOD, contact_plane_response
from connections import Connection, build_connection_plan, connection_payload, detect_connections, follow_connections, following_diagnostics
from editing import EditablePart, editor_payload, export_edited_glb, scale_parts
from test_capping import pack
from test_reference_surface_blending import handle_fixture
from test_solid_workflow import solid_editor_app


def box_part(part_id, center):
    mesh = trimesh.creation.box([2, 2, 2])
    return EditablePart(part_id, f'part {part_id}', '#168b83', f'part_{part_id}', f'node_{part_id}',
                        mesh.vertices + center, mesh.faces)


def synthetic_contact(index, anchor, normal, length=4):
    return Connection(index, 0, 1, np.asarray(anchor, dtype=float), length, 4,
                      plane_normal=np.asarray(normal, dtype=float), plane_error=0.)


class PlaneFollowingTests(unittest.TestCase):
    def fixture(self, rotation=None):
        manifest, content, parts, connections = handle_fixture()
        if rotation is not None:
            with np.load(io.BytesIO(content), allow_pickle=False) as data:
                manifest, content, parts = pack(data['vertices'] @ rotation.T, data['faces'], data['face_part_ids'])
            connections, _ = detect_connections(content, parts)
        plan = build_connection_plan(parts, connections, 0)
        return manifest, content, parts, plan

    def test_two_cuts_share_a_plane_and_handle_edit_never_translates_itself(self):
        manifest, content, parts, plan = self.fixture()
        self.assertEqual(len(plan.connections), 2)
        self.assertEqual(len(plan.attachments[0].planes), 1)
        self.assertEqual(plan.attachments[0].planes[0]['connection_ids'], [0, 1])
        self.assertEqual(plan.unused_ids, ())
        scales = {'0': 1., '1': 1.3}
        followed, offsets = follow_connections(parts, scales, plan)
        free = scale_parts(parts, scales)
        for current, expected in zip(followed, free):
            np.testing.assert_array_equal(current.vertices, expected.vertices)
        np.testing.assert_array_equal(offsets[1], [0, 0, 0])
        blend = blend_weights(build_blend_distances(content, manifest, parts, plan.connections, [1], 0), .6)
        a = apply_boundary_blend(parts, followed, scales, offsets, blend)
        b = apply_boundary_blend(parts, free, scales, {0:np.zeros(3), 1:np.zeros(3)}, blend)
        np.testing.assert_array_equal(a[1].vertices, b[1].vertices)

    def test_body_edit_moves_handle_only_along_contact_normal_in_oblique_coordinates(self):
        rotation = trimesh.transformations.rotation_matrix(.61, [1, 2, 3])[:3, :3]
        for basis in (np.eye(3), rotation):
            _, _, parts, plan = self.fixture(basis)
            scales = {'0': 1.2, '1': 1.}
            edited, offsets = follow_connections(parts, scales, plan)
            expected = basis @ [.1, 0, 0]  # body spans x=-1..0 and the contact plane is x=0
            np.testing.assert_allclose(offsets[1], expected, atol=1e-12)
            scales['1'] = 1.4
            _, again = follow_connections(parts, scales, plan)
            np.testing.assert_allclose(again[1], offsets[1], atol=1e-12)
            self.assertTrue(all(row['normal_residual'] < 1e-12 for row in following_diagnostics(parts, scales, plan, again)))

    def test_cut_centers_have_equal_weight_and_tangential_components_are_excluded(self):
        parent, child = box_part(0, [0, 0, 0]), box_part(1, [3, 0, 0])
        contacts = [synthetic_contact(0, [.5, 4, 0], [1, 0, 0], 1),
                    synthetic_contact(1, [1.5, -2, 0], [1, 0, 0], 100)]
        planes, projection, response, _ = contact_plane_response(contacts, parent, child)
        self.assertEqual(len(planes), 1)
        np.testing.assert_allclose(planes[0]['origin'], [1, 1, 0])
        np.testing.assert_allclose(response, [1, 0, 0])
        np.testing.assert_allclose(projection @ [2, 3, 4], [2, 0, 0])
        reverse = contact_plane_response(list(reversed(contacts)), parent, child)
        np.testing.assert_array_equal(reverse[1], projection)
        np.testing.assert_array_equal(reverse[2], response)

    def test_different_directions_and_opposite_faces_are_not_merged(self):
        parent, child = box_part(0, [0, 0, 0]), box_part(1, [3, 3, 0])
        contacts = [synthetic_contact(0, [1, 0, 0], [1, 0, 0]),
                    synthetic_contact(1, [0, 1, 0], [0, 1, 0])]
        planes, projection, response, _ = contact_plane_response(contacts, parent, child)
        self.assertEqual(len(planes), 2)
        np.testing.assert_allclose(projection, np.diag([1, 1, 0]), atol=1e-12)
        np.testing.assert_allclose(response, [1, 1, 0], atol=1e-12)
        opposing = [contacts[0], synthetic_contact(1, [-1, 0, 0], [-1, 0, 0])]
        plan = build_connection_plan((parent, child), tuple(opposing), 0)
        self.assertEqual(len(plan.attachments[0].planes), 2)
        _, offsets = follow_connections((parent, child), {'0':2,'1':1}, plan)
        np.testing.assert_allclose(offsets[1], [0,0,0], atol=1e-12)
        rows = following_diagnostics((parent, child), {'0':2,'1':1}, plan, offsets)
        np.testing.assert_allclose([row['normal_residual'] for row in rows], [1, 1])

    def test_missing_plane_keeps_the_part_in_place_and_reports_the_unresolved_contact(self):
        parts = box_part(0, [0,0,0]), box_part(1, [3,0,0])
        contact = replace(synthetic_contact(0, [1,0,0], [1,0,0]), plane_normal=None)
        plan = build_connection_plan(parts, (contact,), 0)
        _, offsets = follow_connections(parts, {'0':2,'1':3}, plan)
        np.testing.assert_array_equal(offsets[1], [0,0,0])
        self.assertEqual(plan.unused_ids, (0,))
        self.assertTrue(plan.attachments[0].warnings)

    def test_javascript_solver_and_export_match_after_combined_edits(self):
        manifest, content, parts, plan = self.fixture(trimesh.transformations.rotation_matrix(.42, [1,1,0])[:3,:3])
        scales = {'0':1.2, '1':1.4}
        base, automatic = follow_connections(parts, scales, plan)
        layout = connection_payload(plan)
        blending = blend_weights(build_blend_distances(content, manifest, parts, plan.connections, [1], 0), .6)
        motion = motion_from_blending(blending)
        offsets = {'0':[.1,.2,0], '1':[-.1,0,.2]}
        edited = apply_boundary_motion(apply_boundary_blend(parts, base, scales, automatic, blending), offsets, motion)
        args = {'parts':editor_payload(parts), 'scales':scales, 'layout':layout, 'blending':blending,
                'motion':motion, 'offsets':offsets}
        node = shutil.which('node')
        self.assertIsNotNone(node)
        process = subprocess.run([node,'tests/plane_follow_preview_fixture.mjs'],input=json.dumps(args),
            cwd=Path(__file__).resolve().parents[1]/'scale_component',text=True,capture_output=True,check=True)
        preview = json.loads(process.stdout)
        for part in edited:
            np.testing.assert_allclose(preview['automatic'][str(part.part_id)],automatic[part.part_id],atol=1e-12)
            np.testing.assert_allclose(preview['vertices'][str(part.part_id)],part.vertices,atol=2e-6)
        metadata = {**layout,'root_id':0,'enabled':True,'translations':{str(k):v.tolist() for k,v in automatic.items()}}
        blob = export_edited_glb(edited,source_key='plane-follow',scales=scales,offsets=offsets,connection_metadata=metadata)
        scene = trimesh.load(io.BytesIO(blob),file_type='glb',process=False)
        self.assertEqual(scene.metadata['connection_following']['following_method'],FOLLOW_METHOD)
        for part in edited:
            np.testing.assert_allclose(scene.geometry[part.geometry_name].vertices,part.vertices,atol=2e-6)

    def test_ui_follow_toggle_keeps_handle_scale_unchanged_and_exports_plane_diagnostics(self):
        manifest, content, _, _ = self.fixture()
        manifest['editing_policy'] = {'version':1,'source':'part_planner_text','base_part_id':0,'relations':[
            {'parent_id':0,'child_id':1,'reference_part_id':0,'deform_part_id':1,'relationship':'continuous',
             'mode':'blend','reason':'取っ手の変形を確認'}]}
        app = AppTest.from_function(solid_editor_app,args=(manifest,content),default_timeout=60).run()
        key = app.session_state['part_editing']['source_key']
        event = {'source_key':key,'sequence':1,'scales':{'0':1.,'1':1.3},'offsets':{'0':[0,0,0],'1':[0,0,0]}}
        with patch('part_editor._component',return_value=event):
            app.run()
        state = app.session_state['part_editing']
        before = state['edited_parts'][1].vertices.copy()
        self.assertEqual(state['connections']['automatic_translations']['1'],[0,0,0])
        self.assertEqual(state['connections']['following_planes'][0]['connection_ids'],[0,1])
        self.assertEqual(state['connections']['following_method'],NETWORK_FOLLOW_METHOD)
        self.assertGreater(np.linalg.norm(state['connections']['automatic_translations']['0']),0)
        app.checkbox(key=f'connection_follow_{key}').set_value(False).run()
        np.testing.assert_array_equal(app.session_state['part_editing']['connections']['automatic_translations']['0'],[0,0,0])
        app.checkbox(key=f'connection_follow_{key}').set_value(True).run()
        np.testing.assert_array_equal(app.session_state['part_editing']['edited_parts'][1].vertices,before)
        self.assertFalse(app.exception)
        self.assertFalse(app.error)


if __name__ == '__main__':
    unittest.main()
