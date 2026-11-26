import io
import json
import shutil
import subprocess
import unittest
from pathlib import Path
from unittest.mock import patch

import numpy as np
import trimesh
from streamlit.testing.v1 import AppTest

from boundary_blending import (EDIT_METHOD, apply_boundary_blend, blend_weights, boundary_geometry,
                               build_edit_blend_distances, edit_blend_responses)
from boundary_motion import apply_boundary_motion, motion_from_blending
from connections import build_following_network, detect_connections, follow_connected_parts
from editing import editor_payload, export_edited_glb
from rejoining import rejoin_parts
from test_capping import pack
from test_reference_surface_blending import handle_fixture
from test_solid_workflow import solid_editor_app


class EditSourceBlendingTests(unittest.TestCase):
    def setUp(self):
        self.manifest, self.content, self.parts, self.connections = handle_fixture()
        self.network = build_following_network(self.parts, self.connections)
        self.fields = build_edit_blend_distances(self.content, self.manifest, self.parts, self.connections, [0, 1])

    def pose(self, scales, offsets=None, follow=True):
        blending = edit_blend_responses(blend_weights(self.fields, .6), self.network, follow)
        network = self.network if follow else {**self.network, 'responses': []}
        baseline, automatic = follow_connected_parts(self.parts, scales, network)
        edited = apply_boundary_blend(self.parts, baseline, scales, automatic, blending)
        if offsets is not None:
            edited = apply_boundary_motion(edited, offsets, motion_from_blending(blending))
        return edited, baseline, automatic, blending

    def assert_seams_match(self, edited):
        points, local_ids = boundary_geometry(self.content, self.manifest, self.parts)
        by_id = {part.part_id: part for part in edited}
        for connection in self.connections:
            sources = sorted({v for edge in connection.boundary_edges for v in edge})
            positions = []
            for part_id in (connection.part_a, connection.part_b):
                lookup = {v: i for i, v in enumerate(local_ids[part_id])}
                positions.append(by_id[part_id].vertices[[lookup[v] for v in sources]])
            np.testing.assert_allclose(*positions, atol=2e-12)

    def test_either_edited_side_is_blended_and_its_neighbor_only_follows(self):
        for source in (0, 1):
            scales = {str(i): 1.3 if i == source else 1. for i in (0, 1)}
            edited, baseline, _, _ = self.pose(scales)
            np.testing.assert_array_equal(edited[1-source].vertices, baseline[1-source].vertices)
            self.assertFalse(np.allclose(edited[source].vertices, baseline[source].vertices))
            self.assert_seams_match(edited)  # Both handle cuts, including tangential coordinates.
            self.assertEqual(len(self.connections), 2)

    def test_both_edits_are_superposed_and_reset_exactly(self):
        first, _, _, _ = self.pose({'0': 1.2, '1': 1.})
        second, _, _, _ = self.pose({'0': 1., '1': 1.3})
        combined, _, _, _ = self.pose({'0': 1.2, '1': 1.3})
        for rest, a, b, final in zip(self.parts, first, second, combined):
            np.testing.assert_allclose(final.vertices, a.vertices + b.vertices - rest.vertices, atol=2e-12)
        self.assert_seams_match(combined)
        restored, _, _, _ = self.pose({'0': 1., '1': 1.})
        for rest, final in zip(self.parts, restored):
            np.testing.assert_array_equal(final.vertices, rest.vertices)

    def test_following_off_pins_both_sides_to_the_original_cuts(self):
        edited, _, automatic, _ = self.pose({'0': 1.2, '1': 1.3}, follow=False)
        np.testing.assert_array_equal(list(automatic.values()), np.zeros((2, 3)))
        self.assert_seams_match(edited)
        points, local_ids = boundary_geometry(self.content, self.manifest, self.parts)
        sources = {v for c in self.connections for edge in c.boundary_edges for v in edge}
        for part in edited:
            seam = np.isin(local_ids[part.part_id], list(sources))
            np.testing.assert_allclose(part.vertices[seam], points[local_ids[part.part_id][seam]], atol=1e-12)

    def test_manual_motion_fades_only_the_edited_parts_own_offset(self):
        offsets = {'0': [0, 0, 0], '1': [.2, .1, -.1]}
        edited, _, _, blending = self.pose({'0': 1., '1': 1.}, offsets)
        np.testing.assert_array_equal(edited[0].vertices, self.parts[0].vertices)
        self.assertFalse(np.allclose(edited[1].vertices, self.parts[1].vertices))
        self.assert_seams_match(edited)
        self.assertTrue(all(not s['reference_influences'] for s in motion_from_blending(blending)['parts'].values()))

    def test_preview_export_and_welding_match_after_combined_oblique_edits(self):
        rotation = trimesh.transformations.rotation_matrix(.53, [1, 2, 1])[:3, :3]
        with np.load(io.BytesIO(self.content), allow_pickle=False) as data:
            self.manifest, self.content, self.parts = pack(data['vertices'] @ rotation.T, data['faces'], data['face_part_ids'])
        self.connections, _ = detect_connections(self.content, self.parts)
        self.network = build_following_network(self.parts, self.connections)
        self.fields = build_edit_blend_distances(self.content, self.manifest, self.parts, self.connections, [0, 1])
        scales, offsets = {'0': 1.2, '1': 1.3}, {'0': [.1, -.1, 0], '1': [-.1, 0, .1]}
        edited, _, automatic, blending = self.pose(scales, offsets)
        self.assert_seams_match(edited)
        args = {'parts': editor_payload(self.parts), 'scales': scales,
                'automatic': {str(k): v.tolist() for k, v in automatic.items()},
                'blending': blending, 'boundary_motion': motion_from_blending(blending), 'offsets': offsets}
        node = shutil.which('node')
        self.assertIsNotNone(node)
        result = subprocess.run([node, 'tests/motion_preview_fixture.mjs'], input=json.dumps(args), text=True,
            cwd=Path(__file__).resolve().parents[1] / 'scale_component', capture_output=True, check=True)
        preview = json.loads(result.stdout)
        blob = export_edited_glb(edited, source_key='edited-blending', scales=scales, offsets=offsets)
        scene = trimesh.load(io.BytesIO(blob), file_type='glb', process=False)
        for part in edited:
            np.testing.assert_allclose(preview['vertices'][str(part.part_id)], part.vertices, atol=2e-6)
            np.testing.assert_allclose(scene.geometry[part.geometry_name].vertices, part.vertices, atol=2e-6)
        joined = rejoin_parts(self.content, self.manifest, self.parts, edited)
        self.assertEqual(joined.statistics['bridge_faces'], 0)
        self.assertTrue(joined.mesh.is_watertight)

    def test_ui_edits_both_sides_without_a_blend_reference_selector(self):
        self.manifest['editing_policy'] = {'version': 1, 'base_part_id': 1, 'relations': [
            {'parent_id': 1, 'child_id': 0, 'reference_part_id': 1, 'deform_part_id': 0,
             'mode': 'blend', 'relationship': 'continuous', 'reason': '編集側を確認'}]}
        app = AppTest.from_function(solid_editor_app, args=(self.manifest, self.content), default_timeout=60).run()
        key = app.session_state['part_editing']['source_key']
        self.assertFalse(any(s.key == f'policy_{key}_0_1_reference' for s in app.selectbox))
        states = ({'0': 1.2, '1': 1.}, {'0': 1.2, '1': 1.3}, {'0': 1., '1': 1.3}, {'0': 1., '1': 1.})
        for sequence, scales in enumerate(states, 1):
            with patch('part_editor._component', return_value={'source_key': key, 'sequence': sequence, 'scales': scales}):
                app.run()
            state = app.session_state['part_editing']
            self.assertEqual(state['connections']['boundary_blending']['method'], EDIT_METHOD)
            self.assertEqual(state['connections']['boundary_blending']['active_scale_ids'], [int(i) for i, v in scales.items() if v != 1])
            expected, _, _, _ = self.pose(scales)
            for part, target in zip(state['edited_parts'], expected):
                np.testing.assert_allclose(part.vertices, target.vertices, atol=2e-12)
            self.assert_seams_match(state['edited_parts'])
            self.assertFalse(app.exception)
            self.assertFalse(app.error)


if __name__ == '__main__':
    unittest.main()
