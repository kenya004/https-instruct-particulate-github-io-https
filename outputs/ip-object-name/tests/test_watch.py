from __future__ import annotations

import base64
import contextlib
import io
import json
import os
import shutil
import sys
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import trimesh
from filelock import FileLock

from ip_object_name import core
from ip_object_name.store import ModelStore, SourceChangedError
from ip_object_name.watch import FolderWatcher, main


PNG = base64.b64decode(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+jgekAAAAASUVORK5CYII="
)


class InboxTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.root = Path(self.temporary.name)
        self.inbox = self.root / "inbox"
        self.inbox.mkdir()
        self.store = ModelStore(self.root / "models")
        self.settings = core.Settings(self.root / "repo", self.root / "legacy", model="configured-vlm")
        self.glb = trimesh.Scene(trimesh.creation.box()).export(file_type="glb")
        self.renderer = SimpleNamespace(
            DEFAULT_AUTO_KINEMATICS_AZIMUTHS=(-45, 45, 135, 215),
            DEFAULT_RENDER_RESOLUTION=512,
            DEFAULT_RENDER_PITCH_DEG=70,
            DEFAULT_BLENDER_RENDER_SAMPLES=256,
            render_mesh_auto_kinematics_views=MagicMock(side_effect=self.render),
        )
        data = SimpleNamespace(load_trimesh=lambda p: trimesh.load(p, force="mesh", process=False))
        patches = [
            patch("ip_object_name.core._upstream", return_value=(self.renderer, data)),
            patch("ip_object_name.core.check_environment", return_value={"blender_bin": "/usr/bin/blender"}),
            patch("ip_object_name.core.request_object_name", return_value="test object"),
            patch.dict(os.environ, {"GEMINI_API_KEY": "test-secret"}),
            contextlib.redirect_stdout(io.StringIO()),
        ]
        self.stack = contextlib.ExitStack()
        self.addCleanup(self.stack.close)
        entered = [self.stack.enter_context(item) for item in patches]
        self.vlm = entered[2]

    def render(self, mesh, *, output_dir, **kwargs):
        output_dir.mkdir(parents=True)
        image = output_dir / "view_000.png"
        image.write_bytes(PNG)
        return [SimpleNamespace(image_path=image)]

    def add_glb(self, name="stand.glb"):
        path = self.inbox / name
        path.write_bytes(self.glb)
        return path

    def watcher(self, **kwargs):
        return FolderWatcher(self.inbox, self.store, self.settings, settle_seconds=kwargs.pop("settle_seconds", 0), **kwargs)

    def test_registration_keeps_input_once_and_stable_id(self):
        path = self.add_glb()
        first = self.store.register(path, up_dir="-Y")
        second = self.store.register(path, up_dir="+Z")
        self.assertEqual(first["model_id"], second["model_id"])
        self.assertEqual(second["up_dir"], "-Y")
        self.assertEqual(first["status"], "pending")
        self.assertIsNone(first["units"])
        self.assertEqual(Path(first["input_mesh"]).read_bytes(), self.glb)
        self.assertEqual(len(list(self.store.root.glob("*/input.glb"))), 1)
        self.vlm.assert_not_called()

    def test_replaced_input_registers_new_model_and_keeps_previous_snapshot(self):
        path = self.add_glb()
        first = self.store.register(path, up_dir="+Z")
        path.write_bytes(b"new input version")
        second = self.store.register(path, up_dir="+Z")
        self.assertNotEqual(first["model_id"], second["model_id"])
        self.assertEqual(Path(first["input_mesh"]).read_bytes(), self.glb)
        self.assertEqual(Path(second["input_mesh"]).read_bytes(), b"new input version")

    def test_input_changed_during_copy_is_not_registered(self):
        path = self.add_glb()
        copyfile = shutil.copyfile

        def changing_copy(source, target):
            copyfile(source, target)
            path.write_bytes(b"changed during copy")

        with patch("ip_object_name.store.shutil.copyfile", side_effect=changing_copy):
            with self.assertRaises(SourceChangedError):
                self.store.register(path, up_dir="+Z")
        self.assertEqual(list(self.store.root.iterdir()), [])

    def test_restart_does_not_repeat_completed_request(self):
        self.add_glb()
        result = self.watcher().scan()[0]
        self.assertEqual(result["status"], "completed")
        self.assertEqual(self.vlm.call_count, 1)
        restarted = FolderWatcher(self.inbox, ModelStore(self.store.root), self.settings, settle_seconds=0)
        self.assertEqual(restarted.scan(), [])
        self.assertEqual(self.vlm.call_count, 1)

    def test_result_references_registered_input_and_captures_prompt(self):
        self.add_glb()
        result = self.watcher().scan()[0]
        folder = self.store.root / result["model_id"]
        saved = json.loads((folder / "recognition" / "object_name.json").read_text(encoding="utf-8"))
        self.assertEqual(saved["model_id"], result["model_id"])
        self.assertEqual(saved["input_mesh"], str(folder / "input.glb"))
        self.assertEqual(saved["vlm_model"], "configured-vlm")
        self.assertEqual(saved["resolution"], 512)
        prompt = Path(result["recognition_result"]).with_name("system_prompt.md").read_text(encoding="utf-8")
        self.assertNotIn("headphone", prompt)
        self.assertNotIn("mug", prompt)
        render_args = self.renderer.render_mesh_auto_kinematics_views.call_args.kwargs
        self.assertEqual(render_args["mesh_path"], folder / "input.glb")
        self.assertEqual(len(list(folder.rglob("input.glb"))), 1)

    def test_partial_extension_and_unsettled_files_are_not_processed(self):
        partial = self.inbox / "stand.glb.partial"
        partial.write_bytes(self.glb)
        watcher = self.watcher(settle_seconds=2)
        self.assertEqual(watcher.scan(), [])
        self.vlm.assert_not_called()
        partial.rename(self.inbox / "stand.glb")
        with patch("ip_object_name.watch.time.monotonic", return_value=0):
            self.assertEqual(watcher.scan(), [])
        self.assertTrue(watcher.waiting)
        with patch("ip_object_name.watch.time.monotonic", return_value=3):
            self.assertEqual(len(watcher.scan()), 1)
        self.assertFalse(watcher.waiting)

    def test_changed_file_resets_settle_timer(self):
        path = self.add_glb()
        watcher = self.watcher(settle_seconds=2)
        with patch("ip_object_name.watch.time.monotonic", return_value=0):
            watcher.scan()
        before = path.stat()
        os.utime(path, ns=(before.st_atime_ns, before.st_mtime_ns + 1_000_000))
        with patch("ip_object_name.watch.time.monotonic", return_value=3):
            self.assertEqual(watcher.scan(), [])
        self.vlm.assert_not_called()
        with patch("ip_object_name.watch.time.monotonic", return_value=6):
            self.assertEqual(len(watcher.scan()), 1)

    def test_invalid_glb_does_not_stop_other_inputs(self):
        (self.inbox / "a-invalid.glb").write_bytes(b"not a glb")
        self.add_glb("b-valid.GLB")
        results = self.watcher().scan()
        self.assertEqual([r["status"] for r in results], ["failed", "completed"])
        self.assertEqual(self.vlm.call_count, 1)

    def test_failed_requests_are_not_retried_without_explicit_flag(self):
        self.add_glb()
        self.vlm.side_effect = core.VLMError("provider failure test-secret")
        first = self.watcher().scan()[0]
        self.assertEqual(first["status"], "failed")
        self.assertNotIn("test-secret", json.dumps(first))
        self.assertEqual(self.watcher().scan(), [])
        retry = self.watcher(retry_failed=True)
        self.vlm.side_effect = None
        second = retry.scan()[0]
        self.assertEqual(first["model_id"], second["model_id"])
        self.assertEqual(second["status"], "completed")
        self.assertEqual(len(list((self.store.root / first["model_id"] / "recognition").glob("*/request.json"))), 2)
        self.assertEqual(retry.scan(), [])

    def test_interrupted_requests_are_recorded_without_automatic_api_call(self):
        metadata = self.store.register(self.add_glb(), up_dir="+Z")
        metadata["status"] = "processing"
        self.store.save(metadata)
        self.assertEqual(self.store.mark_interrupted(), 1)
        self.assertEqual(self.store.get(metadata["model_id"])["error"]["type"], "Interrupted")
        self.assertEqual(self.watcher().scan(), [])
        self.vlm.assert_not_called()

    def test_cli_once_uses_requested_model_and_exits(self):
        self.add_glb()
        arguments = [
            "watch", "--inbox", str(self.inbox), "--models-dir", str(self.store.root),
            "--model", "explicit-model", "--up-dir=-Y", "--settle-seconds", "0", "--once",
        ]
        with patch.object(sys, "argv", arguments):
            self.assertEqual(main(), 0)
        self.assertEqual(self.vlm.call_args.kwargs["model"], "explicit-model")
        self.assertEqual(self.renderer.render_mesh_auto_kinematics_views.call_args.kwargs["up_dir"], "-Y")
        self.assertFalse(FileLock(self.store.root / ".watch.lock").is_locked)

    def test_cli_rejects_second_watcher(self):
        arguments = ["watch", "--inbox", str(self.inbox), "--models-dir", str(self.store.root), "--once"]
        with FileLock(self.store.root / ".watch.lock", timeout=0):
            with patch.object(sys, "argv", arguments):
                self.assertEqual(main(), 1)
        self.vlm.assert_not_called()


if __name__ == "__main__":
    unittest.main()
