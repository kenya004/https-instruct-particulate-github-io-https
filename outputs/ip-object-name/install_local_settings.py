"""Migrate an existing WSL installation without printing or committing its key."""
from __future__ import annotations

import argparse
import ast
import json
import os
import shutil
import tempfile
from pathlib import Path


def _is_key_target(target: ast.expr) -> bool:
    return (
        isinstance(target, ast.Subscript)
        and isinstance(target.value, ast.Attribute)
        and isinstance(target.value.value, ast.Name)
        and target.value.value.id == "os"
        and target.value.attr == "environ"
        and isinstance(target.slice, ast.Constant)
        and target.slice.value in {"GEMINI_API_KEY", "GOOGLE_API_KEY"}
    )


def _write_private(path: Path, content: str) -> None:
    descriptor, temporary = tempfile.mkstemp(prefix=".local-settings-", dir=path.parent)
    try:
        with os.fdopen(descriptor, "w", encoding="utf-8", newline="\n") as output:
            output.write(content)
        os.replace(temporary, path)
        path.chmod(0o600)
    finally:
        Path(temporary).unlink(missing_ok=True)


def migrate(repo: Path, bundle: Path) -> bool:
    package = repo / "ip_object_name"
    core_path = package / "core.py"
    text = core_path.read_text(encoding="utf-8")
    tree = ast.parse(text)
    lines = text.splitlines(keepends=True)
    upstream_text = (bundle / "ip_object_name" / "core.py").read_text(encoding="utf-8")
    upstream_lines = upstream_text.splitlines(keepends=True)
    replacement = next(node for node in ast.parse(upstream_text).body if isinstance(node, ast.FunctionDef) and node.name == "_api_key")
    new_function = "".join(upstream_lines[replacement.lineno - 1:replacement.end_lineno])
    edits = []
    legacy_keys = {}
    for node in tree.body:
        if isinstance(node, ast.Assign) and any(_is_key_target(target) for target in node.targets):
            if len(node.targets) != 1 or not isinstance(node.value, ast.Constant) or not isinstance(node.value.value, str):
                raise ValueError("Nonliteral API-key assignment found. Move it to local_settings.py manually first.")
            legacy_keys[node.targets[0].slice.value] = node.value.value.strip()
            edits.append((node.lineno - 1, node.end_lineno, ""))
        if isinstance(node, ast.FunctionDef) and node.name == "_api_key":
            for assignment in ast.walk(node):
                if isinstance(assignment, ast.Assign) and any(isinstance(t, ast.Name) and t.id == "key" for t in assignment.targets):
                    if isinstance(assignment.value, ast.Constant) and isinstance(assignment.value.value, str):
                        legacy_keys.setdefault("GEMINI_API_KEY", assignment.value.value.strip())
            edits.append((node.lineno - 1, node.end_lineno, new_function))
        if isinstance(node, ast.FunctionDef) and node.name == "check_environment":
            for dictionary in ast.walk(node):
                if isinstance(dictionary, ast.Dict):
                    for key, value in zip(dictionary.keys, dictionary.values):
                        if isinstance(key, ast.Constant) and key.value == "api_key_configured":
                            if value.lineno != value.end_lineno:
                                raise ValueError("The configuration check has changed. Migration stopped without editing core.py.")
                            index = value.lineno - 1
                            encoded = lines[index].encode("utf-8")
                            updated = (encoded[:value.col_offset] + b"bool(_api_key(required=False))" + encoded[value.end_col_offset:]).decode("utf-8")
                            edits.append((index, index + 1, updated))
    function_count = sum(isinstance(node, ast.FunctionDef) and node.name == "_api_key" for node in tree.body)
    if function_count != 1:
        raise ValueError("Expected one _api_key function. Migration stopped without editing core.py.")
    for start, end, value in sorted(edits, reverse=True):
        lines[start:end] = [value]
    updated_core = "".join(lines)
    ast.parse(updated_core)

    local_path = package / "local_settings.py"
    if local_path.exists():
        local_tree = ast.parse(local_path.read_text(encoding="utf-8"))
        local_value = next((node.value for node in local_tree.body if isinstance(node, ast.Assign) and any(isinstance(t, ast.Name) and t.id == "GEMINI_API_KEY" for t in node.targets)), None)
        if not isinstance(local_value, ast.Constant) or not isinstance(local_value.value, str):
            raise ValueError("Existing local_settings.py must define GEMINI_API_KEY as a string.")
        key = local_value.value.strip()
    else:
        key = ""
    if not key:
        key = legacy_keys.get("GEMINI_API_KEY") or legacy_keys.get("GOOGLE_API_KEY") or os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY") or ""

    # Ignore the secret and bytecode before creating the local settings file.
    ignore_path = repo / ".gitignore"
    ignore = ignore_path.read_text(encoding="utf-8") if ignore_path.exists() else ""
    rules = ["ip_object_name/local_settings.py", "__pycache__/", "*.py[cod]"]
    missing = [rule for rule in rules if rule not in ignore.splitlines()]
    if missing:
        ignore_path.write_text(ignore.rstrip("\n") + "\n" + "\n".join(missing) + "\n", encoding="utf-8")
    if not local_path.exists() or not local_value.value.strip():
        _write_private(local_path, "# Local credential; excluded from Git.\nGEMINI_API_KEY = " + json.dumps(key, ensure_ascii=True) + "\n")
    else:
        local_path.chmod(0o600)
    for filename in ("credentials.py", "local_settings.example.py"):
        source = bundle / "ip_object_name" / filename
        destination = package / filename
        if source.resolve() != destination.resolve():
            shutil.copyfile(source, destination)
    core_path.write_text(updated_core, encoding="utf-8")
    return bool(key)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--repo", type=Path, default=Path.cwd())
    args = parser.parse_args()
    try:
        configured = migrate(args.repo.expanduser().resolve(), Path(__file__).resolve().parent)
    except Exception:
        print("Migration failed. No secret is printed. Check the file layout and Python syntax before retrying.")
        return 1
    print("Local settings installed. Existing model settings were preserved. No Git commands were run.")
    print("API key configured: " + ("yes" if configured else "no; edit ip_object_name/local_settings.py"))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
