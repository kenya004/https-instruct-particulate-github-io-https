from __future__ import annotations

import io

import numpy as np
import plotly.graph_objects as go
import trimesh


def load_mesh_payloads(content: bytes) -> list[dict]:
    scene = trimesh.load(io.BytesIO(content), file_type="glb", process=False)
    if isinstance(scene, trimesh.Trimesh):
        scene = trimesh.Scene(scene)
    meshes = []
    for node in scene.graph.nodes_geometry:
        transform, geometry_name = scene.graph[node]
        mesh = scene.geometry[geometry_name].copy()
        if not isinstance(mesh, trimesh.Trimesh) or not len(mesh.faces):
            continue
        mesh.apply_transform(transform)
        face_sizes = np.full((len(mesh.faces), 1), 3, dtype=np.int64)
        meshes.append({
            "name": str(node), "geometry_name": str(geometry_name), "vertices": mesh.vertices.tolist(),
            "faces": np.hstack((face_sizes, mesh.faces)).ravel().tolist(),
            "color": "#e28b3e",
        })
    if not meshes:
        raise ValueError("GLBに表示できるメッシュがありません。")
    return meshes


def load_segmented_payloads(content: bytes, manifest: dict) -> list[dict]:
    meshes = load_mesh_payloads(content)
    records = {part["geometry_name"]: part for part in manifest["parts"] if part["face_count"] > 0}
    if len(meshes) != len(records):
        raise ValueError("GLBとパーツ対応表のメッシュ数が一致しません。")
    seen = set()
    for mesh in meshes:
        part = records.get(mesh["geometry_name"])
        if part is None or mesh["geometry_name"] in seen or mesh["name"] != part["node_name"]:
            raise ValueError("GLB内のメッシュとパーツIDが対応しません。")
        if len(mesh["vertices"]) != part["vertex_count"] or len(mesh["faces"]) // 4 != part["face_count"]:
            raise ValueError("GLBとパーツ対応表の形状情報が一致しません。")
        seen.add(mesh["geometry_name"])
        mesh.update(part_id=part["part_id"], name=part["name"], color=part["color"])
    return meshes


# Adapted from the existing SegmentDesign3D app's Plotly mesh viewer.
def iter_triangle_faces(faces):
    index = 0
    while index < len(faces):
        point_count = int(faces[index])
        indices = [int(value) for value in faces[index + 1:index + 1 + point_count]]
        if point_count == 3 and len(indices) == 3:
            yield indices
        elif point_count == 4 and len(indices) == 4:
            yield [indices[0], indices[1], indices[2]]
            yield [indices[0], indices[2], indices[3]]
        index += point_count + 1


def mesh_figure(meshes: list[dict], *, up_dir: str, height: int = 430, bounds=None) -> go.Figure:
    traces = []
    for mesh in meshes:
        points = np.asarray(mesh["vertices"], dtype=np.float64)
        triangles = np.asarray(list(iter_triangle_faces(mesh["faces"])), dtype=np.int64)
        traces.append(go.Mesh3d(
            x=points[:, 0], y=points[:, 1], z=points[:, 2],
            i=triangles[:, 0], j=triangles[:, 1], k=triangles[:, 2],
            color=mesh["color"], name=mesh["name"], opacity=1.0, flatshading=False,
            lighting=dict(ambient=0.45, diffuse=0.65, specular=0.08, roughness=0.85, fresnel=0.0),
            showlegend=False, hoverinfo="skip",
        ))
    axis = dict(
        showbackground=True, backgroundcolor="rgba(246,247,249,0.55)",
        gridcolor="rgba(107,114,128,0.20)", showline=True, linecolor="#adb4b8",
        tickfont=dict(size=10, color="#5a6369"), nticks=5, showspikes=False,
    )
    up = {"x": 0, "y": 0, "z": 0}
    up[up_dir[-1].lower()] = -1 if up_dir.startswith("-") else 1
    figure = go.Figure(traces)
    axes = {name: dict(title=name.upper(), **axis) for name in ("x", "y", "z")}
    if bounds is not None:
        lower, upper = np.asarray(bounds)
        padding = max(float((upper - lower).max()) * 0.05, 1e-6)
        for index, name in enumerate(("x", "y", "z")):
            axes[name]["range"] = [float(lower[index] - padding), float(upper[index] + padding)]
    figure.update_layout(
        height=height, margin=dict(l=0, r=0, t=0, b=0), paper_bgcolor="white",
        uirevision=up_dir,
        scene=dict(aspectmode="data", xaxis=axes["x"], yaxis=axes["y"], zaxis=axes["z"], camera=dict(up=up)),
    )
    return figure
