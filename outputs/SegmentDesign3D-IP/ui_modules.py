"""Refresh local view modules when a long-running Streamlit server reruns the app."""

import hashlib
import importlib
import sys
from pathlib import Path


def refresh_ui_modules(names=("viewer", "part_editor"), directory=None):
    directory = Path(directory) if directory is not None else Path(__file__).parent
    dependency_changed = False
    for name in names:
        digest = hashlib.sha256((directory / f"{name}.py").read_bytes()).hexdigest()
        module = sys.modules.get(name)
        if module is None:
            module = importlib.import_module(name)
            dependency_changed = True
        elif dependency_changed or getattr(module, "_ui_source_digest", None) != digest:
            importlib.invalidate_caches()
            module = importlib.reload(module)
            dependency_changed = True
        module._ui_source_digest = digest
