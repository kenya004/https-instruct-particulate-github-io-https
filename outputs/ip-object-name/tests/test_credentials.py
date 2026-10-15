from __future__ import annotations

import ast
import importlib
import json
import os
import subprocess
import tempfile
import unittest
from pathlib import Path
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

from install_local_settings import migrate
from ip_object_name import core
from ip_object_name.credentials import CredentialSettingsError, configured_api_key


class CredentialTests(unittest.TestCase):
    def test_local_key_takes_priority_and_is_trimmed(self):
        with patch("ip_object_name.credentials.importlib.import_module", return_value=SimpleNamespace(GEMINI_API_KEY=" local-key ")):
            with patch.dict(os.environ, {"GEMINI_API_KEY": "old-env-key"}):
                self.assertEqual(configured_api_key(), "local-key")

    def test_missing_or_empty_local_settings_falls_back_to_environment(self):
        missing = ModuleNotFoundError(name="ip_object_name.local_settings")
        for value in (missing, SimpleNamespace(GEMINI_API_KEY="")):
            kwargs = {"side_effect": value} if isinstance(value, Exception) else {"return_value": value}
            with self.subTest(value=type(value).__name__), patch("ip_object_name.credentials.importlib.import_module", **kwargs):
                with patch.dict(os.environ, {"GEMINI_API_KEY": "", "GOOGLE_API_KEY": "fallback-key"}, clear=True):
                    self.assertEqual(configured_api_key(), "fallback-key")

    def test_missing_key_is_optional_for_render_only(self):
        with patch("ip_object_name.credentials.configured_api_key", return_value=None):
            self.assertIsNone(core._api_key(required=False))
            with self.assertRaises(core.SetupError):
                core._api_key()

    def test_local_syntax_errors_do_not_expose_source_or_key(self):
        with patch("ip_object_name.credentials.importlib.import_module", side_effect=SyntaxError("secret-key-in-source")):
            with self.assertRaises(CredentialSettingsError) as caught:
                configured_api_key()
        self.assertNotIn("secret-key-in-source", str(caught.exception))

    def test_import_errors_inside_settings_are_not_silently_ignored(self):
        with patch("ip_object_name.credentials.importlib.import_module", side_effect=ModuleNotFoundError(name="bad_dependency")):
            with self.assertRaises(CredentialSettingsError):
                configured_api_key()

    def test_nonstring_local_key_is_rejected_without_printing_it(self):
        with patch("ip_object_name.credentials.importlib.import_module", return_value=SimpleNamespace(GEMINI_API_KEY={"private": "secret"})):
            with self.assertRaises(CredentialSettingsError) as caught:
                configured_api_key()
        self.assertNotIn("secret", str(caught.exception))

    def test_check_environment_reports_local_file_configuration(self):
        renderer = SimpleNamespace(resolve_blender_binary=MagicMock(return_value="/usr/bin/blender"))
        with patch("ip_object_name.credentials.configured_api_key", return_value="local-file-key"):
            with patch("ip_object_name.core._upstream", return_value=(renderer, None)):
                result = core.check_environment(core.Settings(Path("repo"), Path("output")))
        self.assertTrue(result["api_key_configured"])
        self.assertNotIn("local-file-key", json.dumps(result))


class MigrationTests(unittest.TestCase):
    def setUp(self):
        self.temporary = tempfile.TemporaryDirectory()
        self.addCleanup(self.temporary.cleanup)
        self.repo = Path(self.temporary.name)
        self.package = self.repo / "ip_object_name"
        self.package.mkdir()
        self.bundle = Path(__file__).resolve().parents[1]
        self.original = '''import os
os.environ["GEMINI_API_KEY"] = "legacy-test-key"
DEFAULT_MODEL = "user-selected-model"

def _api_key():
    key = os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
    return key

def check_environment(settings):
    return {
        "api_key_configured": bool(os.getenv("GEMINI_API_KEY")),
        "user_setting": "preserve this",
    }
'''
        (self.package / "core.py").write_text(self.original, encoding="utf-8")
        (self.repo / ".gitignore").write_text("data/\n", encoding="utf-8")

    def test_migration_preserves_key_and_user_settings(self):
        self.assertTrue(migrate(self.repo, self.bundle))
        updated = (self.package / "core.py").read_text(encoding="utf-8")
        ast.parse(updated)
        self.assertNotIn("legacy-test-key", updated)
        self.assertNotIn('os.environ["GEMINI_API_KEY"]', updated)
        self.assertIn('DEFAULT_MODEL = "user-selected-model"', updated)
        self.assertIn('"user_setting": "preserve this"', updated)
        self.assertIn("bool(_api_key(required=False))", updated)
        local = (self.package / "local_settings.py").read_text(encoding="utf-8")
        self.assertIn('GEMINI_API_KEY = "legacy-test-key"', local)
        self.assertTrue((self.package / "credentials.py").is_file())

    def test_second_migration_does_not_duplicate_rules_or_overwrite_existing_key(self):
        migrate(self.repo, self.bundle)
        first = (self.package / "local_settings.py").read_bytes()
        migrate(self.repo, self.bundle)
        self.assertEqual(first, (self.package / "local_settings.py").read_bytes())
        self.assertEqual((self.repo / ".gitignore").read_text().count("ip_object_name/local_settings.py"), 1)
        self.assertEqual((self.package / "core.py").read_text().count("def _api_key("), 1)

    def test_existing_local_key_is_preserved(self):
        local = self.package / "local_settings.py"
        local.write_text('GEMINI_API_KEY = "existing-local-key"\n', encoding="utf-8")
        migrate(self.repo, self.bundle)
        self.assertIn("existing-local-key", local.read_text())
        self.assertNotIn("legacy-test-key", (self.package / "core.py").read_text())

    def test_nonliteral_assignment_stops_before_modifying_files(self):
        content = self.original.replace('"legacy-test-key"', 'get_key_from_elsewhere()')
        (self.package / "core.py").write_text(content, encoding="utf-8")
        with self.assertRaises(ValueError):
            migrate(self.repo, self.bundle)
        self.assertEqual((self.package / "core.py").read_text(), content)
        self.assertFalse((self.package / "local_settings.py").exists())

    def test_migrated_reader_works_without_an_environment_key(self):
        migrate(self.repo, self.bundle)
        initializer = self.package / "__init__.py"
        initializer.write_text("", encoding="utf-8")
        # Import only the temporary package's settings reader, not its core fixture.
        spec = importlib.util.spec_from_file_location("migration_test_package", initializer, submodule_search_locations=[str(self.package)])
        package = importlib.util.module_from_spec(spec)
        import sys

        with patch.dict(sys.modules, {"migration_test_package": package}), patch.dict(os.environ, {}, clear=True):
            reader = importlib.import_module("migration_test_package.credentials")
            self.assertEqual(reader.configured_api_key(), "legacy-test-key")
        sys.modules.pop("migration_test_package.credentials", None)
        sys.modules.pop("migration_test_package.local_settings", None)

    def test_git_ignores_local_key_but_not_template(self):
        migrate(self.repo, self.bundle)
        subprocess.run(["git", "init", "--quiet", str(self.repo)], check=True, capture_output=True)
        secret = subprocess.run(["git", "check-ignore", "ip_object_name/local_settings.py"], cwd=self.repo, capture_output=True)
        template = subprocess.run(["git", "check-ignore", "ip_object_name/local_settings.example.py"], cwd=self.repo, capture_output=True)
        self.assertEqual(secret.returncode, 0)
        self.assertEqual(template.returncode, 1)


if __name__ == "__main__":
    unittest.main()
