"""One rigid transform from the VLM's shared render frame to grounded Z-up."""
from __future__ import annotations

import hashlib
import os
from pathlib import Path

import numpy as np
import trimesh


METHOD = "vlm_up_and_ground_v1"
_UP = {
    "+X": [[0, 0, -1], [0, 1, 0], [1, 0, 0]],
    "-X": [[0, 0, 1], [0, 1, 0], [-1, 0, 0]],
    "+Y": [[1, 0, 0], [0, 0, -1], [0, 1, 0]],
    "-Y": [[1, 0, 0], [0, 0, 1], [0, -1, 0]],
    "+Z": np.eye(3), "-Z": [[1, 0, 0], [0, -1, 0], [0, 0, -1]],
}


def unit_direction(value):
    if value is None:
        return None
    if np.asarray(value).dtype.kind not in "iuf":
        raise ValueError("The estimated up direction must contain numbers.")
    vector = np.asarray(value, dtype=float)
    if vector.shape != (3,) or not np.isfinite(vector).all():
        raise ValueError("The estimated up direction must contain three finite numbers.")
    length = float(np.linalg.norm(vector))
    if not 1e-8 < length < 1e8:
        raise ValueError("The estimated up direction must be nonzero.")
    return vector / length


def rotation_to_z(up):
    up = unit_direction(up)
    if up is None:
        return np.eye(3)
    target = np.array([0.0, 0.0, 1.0])
    cosine = float(np.clip(up @ target, -1, 1))
    cross = np.cross(up, target)
    sine = float(np.linalg.norm(cross))
    if sine < 1e-15:
        return np.diag([1.0, -1.0, -1.0]) if cosine < 0 else np.eye(3)
    x, y, z = cross / sine
    skew = np.array([[0, -z, y], [z, 0, -x], [-y, x, 0]])
    return np.eye(3) + sine * skew + (1 - cosine) * (skew @ skew)


def align_glb(source: Path, target: Path, *, render_up_dir: str, up_vector) -> dict:
    """Preserve scene instances/materials and units; never mutate source GLB."""
    scene = trimesh.load(source, force="scene", process=False)
    points = []
    for node in scene.graph.nodes_geometry:
        matrix, name = scene.graph[node]
        geometry = scene.geometry[name]
        if isinstance(geometry, trimesh.Trimesh) and len(geometry.faces):
            # Only referenced vertices determine grounding.
            vertices = geometry.vertices[np.unique(geometry.faces)]
            points.append(trimesh.transform_points(vertices, matrix))
    if not points:
        raise ValueError("The GLB contains no triangle geometry to orient.")
    points = np.concatenate(points)
    if not np.isfinite(points).all():
        raise ValueError("The GLB contains nonfinite coordinates.")
    estimated = unit_direction(up_vector)
    initial = np.asarray(_UP[render_up_dir], dtype=float)
    rotation = rotation_to_z(estimated) @ initial
    minimum_z = float((points @ rotation.T)[:, 2].min())
    transform = np.eye(4)
    transform[:3, :3] = rotation
    transform[2, 3] = -minimum_z
    scene.apply_transform(transform)
    target.parent.mkdir(parents=True, exist_ok=True)
    temporary = target.with_name(target.name + ".tmp")
    try:
        temporary.write_bytes(scene.export(file_type="glb"))
        os.replace(temporary, target)
    finally:
        temporary.unlink(missing_ok=True)
    with target.open("rb") as stream:
        digest = hashlib.file_digest(stream, "sha256").hexdigest()
    return {
        "method": METHOD, "applied": True,
        "status": "estimated" if estimated is not None else "manual_fallback",
        "render_up_dir": render_up_dir,
        "up_vector_render": None if estimated is None else estimated.tolist(),
        "up_vector_source": (initial.T @ (estimated if estimated is not None else [0, 0, 1])).tolist(),
        "source_to_aligned": transform.tolist(), "aligned_to_source": np.linalg.inv(transform).tolist(),
        "ground_z": 0.0, "processing_sha256": digest,
    }
