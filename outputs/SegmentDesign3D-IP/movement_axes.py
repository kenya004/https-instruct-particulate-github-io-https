"""Stable translation frames from the original shared boundary curves."""
from __future__ import annotations

import io

import numpy as np

from orientation import source_to_display


def boundary_plane(segments):
    """Fit a plane to uniform arc length, independent of edge subdivision."""
    segments = np.asarray(segments, dtype=float)
    lengths = np.linalg.norm(segments[:, 1] - segments[:, 0], axis=1)
    valid = lengths > 0
    segments, lengths = segments[valid], lengths[valid]
    if not len(lengths):
        raise ValueError("境界に長さのある辺がありません。")
    weights = lengths / lengths.sum()
    center = np.sum(segments.mean(axis=1) * weights[:, None], axis=0)
    a, b = (segments - center).transpose(1, 0, 2)
    # Exact second moment of each line segment, rather than sampling vertices.
    covariance = (
        np.einsum("i,ij,ik->jk", weights, a, a) / 3
        + np.einsum("i,ij,ik->jk", weights, b, b) / 3
        + np.einsum("i,ij,ik->jk", weights, a, b) / 6
        + np.einsum("i,ij,ik->jk", weights, b, a) / 6
    )
    eigenvalues, eigenvectors = np.linalg.eigh(covariance)
    if eigenvalues[1] <= max(eigenvalues[2], np.finfo(float).tiny) * 1e-10:
        raise ValueError("境界が点または直線に近いため、平面を決められません。")
    return center, eigenvectors[:, 0], float(np.sqrt(max(eigenvalues[0], 0))), float(np.sqrt(max(eigenvalues.sum(), 0)))


def build_movement_frames(content, parts, connections, up_dir, selected=None, *, enabled=True):
    selected = selected or {}
    rotation = source_to_display(up_dir)
    by_id = {part.part_id: part for part in parts}
    by_connection = {item.connection_id: item for item in connections}
    points = None
    if enabled and connections:
        with np.load(io.BytesIO(content), allow_pickle=False) as data:
            points = np.unique(data["vertices"], axis=0)
    frames = {}
    for part in parts:
        frame = {"basis": np.eye(3).tolist(), "labels": ["X", "Y", "Z"], "connection_id": None,
                 "method": "input_xyz", "origin": None if part.center is None else part.center.tolist(), "warning": None}
        frames[str(part.part_id)] = frame
        candidates = sorted((item for item in connections if part.part_id in (item.part_a, item.part_b)),
                            key=lambda item: (-item.boundary_length, item.connection_id))
        if not enabled or not candidates or not len(part.faces):
            continue
        connection = by_connection.get(selected.get(part.part_id, candidates[0].connection_id))
        if connection is None or connection.connection_id not in {item.connection_id for item in candidates}:
            raise ValueError("移動方向の基準接続がパーツに属していません。")
        try:
            if not connection.boundary_edges:
                raise ValueError("元の境界エッジがありません。")
            center, normal, rms, span = boundary_plane(points[np.asarray(connection.boundary_edges)])
        except ValueError as error:
            frame["warning"] = f"{part.name}: {error} 入力XYZを使います。"
            continue
        other = by_id[connection.part_b if part.part_id == connection.part_a else connection.part_a]
        # Part centers decide the sign only, never the plane's orientation.
        outward = part.center - other.center
        sign = float(normal @ outward)
        if abs(sign) <= np.linalg.norm(outward) * 1e-10:
            sign = float(normal @ rotation[2])
        if abs(sign) <= 1e-10:
            sign = float(normal[np.argmax(np.abs(normal))])
        if sign < 0:
            normal = -normal
        # Give U a stable relation to the displayed horizontal input axis.
        tangent = rotation[0] - normal * float(rotation[0] @ normal)
        if np.linalg.norm(tangent) < 1e-8:
            tangent = rotation[1] - normal * float(rotation[1] @ normal)
        tangent /= np.linalg.norm(tangent)
        second = np.cross(normal, tangent)
        frame.update(basis=np.array([tangent, second, normal]).tolist(), labels=["断面U", "断面V", "法線N"],
                     connection_id=connection.connection_id, method="boundary_plane", origin=center.tolist(), plane_rms=rms,
                     relative_plane_error=rms / span)
        if rms / span > .05:
            frame["warning"] = f"{part.name}: 境界の平面からのずれが大きいため、近似した移動軸を表示して確認してください。"
    return frames
