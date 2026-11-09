"""Display-only Z-up transforms, matching upstream data_utils.py exactly.

Python and the browser share orientation.json. Stored meshes and editing
parameters always remain in the input scene's coordinate system.
"""
from __future__ import annotations

import json
from itertools import product
from pathlib import Path

import numpy as np


_CONFIG = json.loads(Path(__file__).with_suffix(".json").read_text(encoding="utf-8"))
CAMERA_EYE = dict(zip("xyz", _CONFIG["camera_eye"]))


def source_to_display(up_dir: str) -> np.ndarray:
    if not isinstance(up_dir, str) or up_dir not in _CONFIG["source_to_z_up"]:
        raise ValueError("上方向には +X, -X, +Y, -Y, +Z, -Z を指定してください。")
    return np.array(_CONFIG["source_to_z_up"][up_dir], dtype=float)


def orient_points(points, up_dir: str) -> np.ndarray:
    return np.asarray(points, dtype=float) @ source_to_display(up_dir).T


def orient_bounds(bounds, up_dir: str) -> np.ndarray:
    lower, upper = np.asarray(bounds, dtype=float)
    corners = orient_points(list(product(*zip(lower, upper))), up_dir)
    return np.array([corners.min(axis=0), corners.max(axis=0)])


def display_axis_titles(up_dir: str) -> list[str]:
    titles = []
    for axis, row in enumerate(source_to_display(up_dir)):
        source = int(np.flatnonzero(row)[0])
        label = ("-" if row[source] < 0 else "") + "XYZ"[source]
        titles.append(label + ("（上）" if axis == 2 else ""))
    return titles
