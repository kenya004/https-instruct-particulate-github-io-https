import importlib
import sys
import tempfile
import unittest
from pathlib import Path

from ui_modules import refresh_ui_modules


class ViewModuleRefreshTests(unittest.TestCase):
    def test_stale_imports_refresh_dependents_but_unchanged_reruns_preserve_objects(self):
        names = ("_test_turntable_view", "_test_turntable_panel")
        with tempfile.TemporaryDirectory() as temporary:
            directory = Path(temporary)
            (directory / f"{names[0]}.py").write_text("def mode(): return 'old'\n", encoding="utf8")
            (directory / f"{names[1]}.py").write_text(f"from {names[0]} import mode\n", encoding="utf8")
            sys.path.insert(0, temporary)
            try:
                panel = importlib.import_module(names[1])
                old = panel.mode
                (directory / f"{names[0]}.py").write_text("def mode(): return 'turntable rotation'\n", encoding="utf8")
                refresh_ui_modules(names, directory)
                self.assertEqual(panel.mode(), "turntable rotation")
                self.assertIsNot(panel.mode, old)
                current = panel.mode
                refresh_ui_modules(names, directory)
                self.assertIs(panel.mode, current)
                (directory / f"{names[0]}.py").write_text("def mode(): return 'updated turntable rotation'\n", encoding="utf8")
                refresh_ui_modules(names, directory)
                self.assertEqual(panel.mode(), "updated turntable rotation")
            finally:
                sys.path.remove(temporary)
                for name in names:
                    sys.modules.pop(name, None)


if __name__ == "__main__":
    unittest.main()
