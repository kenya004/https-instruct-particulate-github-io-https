from __future__ import annotations

import io
from collections import defaultdict, deque
from dataclasses import dataclass, replace

import numpy as np

from editing import EditablePart, scale_parts, validate_scales
from connection_planes import FOLLOW_METHOD, NETWORK_FOLLOW_METHOD, boundary_plane, contact_plane_response


@dataclass(frozen=True)
class Connection:
    connection_id: int
    part_a: int
    part_b: int
    anchor: np.ndarray
    boundary_length: float
    edge_count: int
    boundary_edges: tuple[tuple[int, int], ...] = ()
    plane_normal: np.ndarray | None = None
    plane_error: float | None = None


@dataclass(frozen=True)
class Attachment:
    parent_id: int
    child_id: int
    connection_id: int
    planes: tuple[dict, ...]
    projection: np.ndarray
    scale_displacement: np.ndarray
    warnings: tuple[str, ...] = ()


@dataclass(frozen=True)
class ConnectionPlan:
    connections: tuple[Connection, ...]
    attachments: tuple[Attachment, ...]
    roots: tuple[int, ...]
    unused_ids: tuple[int, ...]


class _DisjointSet:
    def __init__(self, ids):
        self.parent = {int(index): int(index) for index in ids}

    def find(self, index):
        while self.parent[index] != index:
            self.parent[index] = self.parent[self.parent[index]]
            index = self.parent[index]
        return index

    def join(self, left, right):
        left, right = self.find(left), self.find(right)
        if left == right:
            return False
        self.parent[max(left, right)] = min(left, right)
        return True


def detect_connections(content: bytes, parts: tuple[EditablePart, ...]) -> tuple[tuple[Connection, ...], tuple[str, ...]]:
    """Find connected regions of edges between different face labels, before editing.

    Exactly coincident vertices are identified for topology only (UV/normal seams).
    No vertex coordinates in the editable parts are merged or changed.
    """
    with np.load(io.BytesIO(content), allow_pickle=False) as data:
        if not {"vertices", "faces", "face_part_ids"}.issubset(data.files):
            return (), ("NPZに全体の頂点・面・所属情報がないため、接続境界を検出できません。",)
        vertices = np.asarray(data["vertices"], dtype=np.float64)
        faces = np.asarray(data["faces"])
        labels = np.asarray(data["face_part_ids"])
    if vertices.ndim != 2 or vertices.shape[1] != 3 or not np.isfinite(vertices).all():
        raise ValueError("接続検出用の頂点データが不正です。")
    if faces.ndim != 2 or faces.shape[1] != 3 or faces.dtype.kind not in "iu":
        raise ValueError("接続検出用の面データが不正です。")
    if labels.shape != (len(faces),) or labels.dtype.kind not in "iu" or not set(labels.tolist()).issubset({part.part_id for part in parts}):
        raise ValueError("接続検出用の面の所属が不正です。")
    if len(faces) and (faces.min() < 0 or faces.max() >= len(vertices)):
        raise ValueError("接続検出用の面インデックスが不正です。")
    if not len(faces) or len(np.unique(labels)) < 2:
        return (), ()
    points, vertex_ids = np.unique(vertices, axis=0, return_inverse=True)
    triangles = vertex_ids[faces]
    edges = np.sort(np.concatenate([triangles[:, [0, 1]], triangles[:, [1, 2]], triangles[:, [2, 0]]]), axis=1)
    edge_labels = np.tile(labels, 3)
    valid = edges[:, 0] != edges[:, 1]
    edges, edge_labels = edges[valid], edge_labels[valid]
    unique, inverse, counts = np.unique(edges, axis=0, return_inverse=True, return_counts=True)
    if not len(unique):
        return (), ()
    order = np.argsort(inverse, kind="stable")
    starts = np.r_[0, np.cumsum(counts)[:-1]]
    low = np.minimum.reduceat(edge_labels[order], starts)
    high = np.maximum.reduceat(edge_labels[order], starts)
    ambiguous = int(np.count_nonzero((counts > 2) & (low != high)))
    warnings = (f"3面以上が共有する境界エッジ{ambiguous}本は、接続の自動判定から除外しました。",) if ambiguous else ()
    selected = np.flatnonzero((counts == 2) & (low != high))
    by_pair = defaultdict(list)
    for edge_id in selected:
        by_pair[(int(low[edge_id]), int(high[edge_id]))].append(unique[edge_id])
    connections = []
    for (left, right), pair_edges in sorted(by_pair.items()):
        pair_edges = np.asarray(pair_edges)
        groups = _DisjointSet(np.unique(pair_edges))
        for a, b in pair_edges:
            groups.join(int(a), int(b))
        components = defaultdict(list)
        for a, b in pair_edges:
            components[groups.find(int(a))].append((a, b))
        for _, component in sorted(components.items()):
            segments = points[np.asarray(component)]
            lengths = np.linalg.norm(segments[:, 1] - segments[:, 0], axis=1)
            total = float(lengths.sum())
            if total <= 0:
                continue
            anchor = np.sum(segments.mean(axis=1) * (lengths / total)[:, None], axis=0)
            anchor.setflags(write=False)
            try:
                _, normal, rms, span = boundary_plane(segments)
                normal.setflags(write=False)
                error = rms / span
            except ValueError:
                normal, error = None, None
            connections.append(Connection(len(connections), left, right, anchor, total, len(component),
                                          tuple((int(a), int(b)) for a, b in component), normal, error))
    return tuple(connections), warnings


def build_connection_plan(parts: tuple[EditablePart, ...], connections: tuple[Connection, ...], root_id: int, preferred_relations=(), response_cache=None) -> ConnectionPlan:
    ids = sorted(part.part_id for part in parts if len(part.faces))
    if root_id not in ids:
        raise ValueError("基準パーツには面のあるパーツを指定してください。")
    groups = _DisjointSet(ids)
    adjacency = defaultdict(list)
    # Prefer substantial boundaries; each additional constraint in a cycle is reported.
    preferred = {frozenset((r["parent_id"], r["child_id"])) for r in preferred_relations}
    children = {r["child_id"] for r in preferred_relations}
    preferred_roots = sorted({r["parent_id"] for r in preferred_relations} - children)
    for connection in sorted(connections, key=lambda item: (frozenset((item.part_a, item.part_b)) not in preferred, -item.boundary_length, item.connection_id)):
        if connection.part_a not in groups.parent or connection.part_b not in groups.parent:
            raise ValueError("接続先のパーツが存在しません。")
        if groups.join(connection.part_a, connection.part_b):
            adjacency[connection.part_a].append((connection.part_b, connection.connection_id))
            adjacency[connection.part_b].append((connection.part_a, connection.connection_id))
    by_id = {part.part_id: part for part in parts}
    by_pair = defaultdict(list)
    for connection in connections:
        by_pair[frozenset((connection.part_a, connection.part_b))].append(connection)
    visited, roots, attachments, used = set(), [], [], set()
    for root in [root_id] + [i for i in preferred_roots if i in ids and i != root_id] + [index for index in ids if index != root_id]:
        if root in visited:
            continue
        roots.append(root)
        visited.add(root)
        queue = deque([root])
        while queue:
            parent = queue.popleft()
            for child, connection_id in sorted(adjacency[parent]):
                if child in visited:
                    continue
                visited.add(child)
                pair_connections = by_pair[frozenset((parent, child))]
                key = (parent, child)
                if response_cache is not None and key in response_cache:
                    response = response_cache[key]
                else:
                    response = contact_plane_response(pair_connections, by_id[parent], by_id[child])
                    if response_cache is not None:
                        response_cache[key] = response
                planes, projection, displacement, warnings = response
                attachments.append(Attachment(parent, child, connection_id, planes, projection, displacement, warnings))
                used.update(index for plane in planes for index in plane["connection_ids"])
                queue.append(child)
    return ConnectionPlan(connections, tuple(attachments), tuple(roots), tuple(sorted({c.connection_id for c in connections} - used)))


def _directed_translations(parts, scales, plan):
    translations = {part.part_id: np.zeros(3) for part in parts}
    for attachment in plan.attachments:
        # Only changes on the reference side drive following. The child's own
        # scale never translates the child or changes its scaling center.
        translations[attachment.child_id] = (
            attachment.projection @ translations[attachment.parent_id]
            + (scales[str(attachment.parent_id)] - 1) * attachment.scale_displacement)
    return translations


def follow_connections(parts: tuple[EditablePart, ...], scales: dict, plan: ConnectionPlan) -> tuple[tuple[EditablePart, ...], dict[int, np.ndarray]]:
    """One directed response, also used to compile the root-free UI network."""
    scales = validate_scales(parts, scales)
    translations = _directed_translations(parts, scales, plan)
    edited = scale_parts(parts, scales)
    return tuple(replace(part, vertices=part.vertices + translations[part.part_id]) for part in edited), translations


def build_following_network(parts, connections, preferred_relations=()):
    """Compile each part's influence on every other part, excluding itself.

    Fixed rest-shape linear responses can be superposed. This makes consecutive
    edits independent of slider order and avoids jumps when the edited part changes.
    """
    ids = sorted(part.part_id for part in parts if len(part.faces))
    responses, cache = [], {}
    for source in ids:
        plan = build_connection_plan(parts, connections, source, preferred_relations, response_cache=cache)
        unit_edit = {str(part.part_id): 2. if part.part_id == source else 1. for part in parts}
        translations = _directed_translations(parts, unit_edit, plan)
        for target in ids:
            if source != target and np.any(translations[target] != 0):
                responses.append({"source_id": source, "target_id": target,
                                  "displacement": translations[target].tolist()})
    return {"following_method": NETWORK_FOLLOW_METHOD, "driver_ids": ids, "responses": responses}


def follow_connected_parts(parts, scales, network):
    scales = validate_scales(parts, scales)
    if network.get("following_method") != NETWORK_FOLLOW_METHOD:
        raise ValueError("編集パーツからの追従データが不正です。")
    translations = {part.part_id: np.zeros(3) for part in parts}
    for response in network["responses"]:
        source, target = response["source_id"], response["target_id"]
        if source == target or source not in translations or target not in translations:
            raise ValueError("追従元と接続先のパーツが不正です。")
        displacement = np.asarray(response["displacement"], dtype=float)
        if displacement.shape != (3,) or not np.isfinite(displacement).all():
            raise ValueError("接続先への変位データが不正です。")
        translations[target] += (scales[str(source)] - 1) * displacement
    edited = scale_parts(parts, scales)
    return tuple(replace(part, vertices=part.vertices + translations[part.part_id]) for part in edited), translations


def connection_residuals(parts: tuple[EditablePart, ...], scales: dict, connections: tuple[Connection, ...], translations: dict[int, np.ndarray]) -> dict[int, float]:
    by_id = {part.part_id: part for part in parts}
    residuals = {}
    for connection in connections:
        anchors = []
        for part_id in (connection.part_a, connection.part_b):
            part = by_id[part_id]
            anchors.append(connection.anchor + (scales[str(part_id)] - 1) * (connection.anchor - part.center) + translations[part_id])
        residuals[connection.connection_id] = float(np.linalg.norm(anchors[0] - anchors[1]))
    return residuals


def connection_payload(plan: ConnectionPlan) -> dict:
    connections = [{"connection_id": item.connection_id, "part_a": item.part_a, "part_b": item.part_b,
                    "anchor": item.anchor.tolist(), "boundary_length": item.boundary_length, "edge_count": item.edge_count}
                   for item in plan.connections]
    by_id = {item["connection_id"]: item for item in connections}
    return {"following_method": FOLLOW_METHOD, "connections": connections, "roots": list(plan.roots), "unused_ids": list(plan.unused_ids),
            "attachments": [{"parent_id": item.parent_id, "child_id": item.child_id, "connection_id": item.connection_id,
                             "anchor": by_id[item.connection_id]["anchor"], "following_method": FOLLOW_METHOD,
                             "planes": list(item.planes), "projection": item.projection.tolist(),
                             "scale_displacement": item.scale_displacement.tolist()} for item in plan.attachments]}


def following_diagnostics(parts, scales, plan, translations, compare_deformed_planes=False):
    by_id = {part.part_id: part for part in parts}
    rows = []
    for attachment in plan.attachments:
        parent = by_id[attachment.parent_id]
        for plane in attachment.planes:
            normal, origin = np.asarray(plane["normal"]), np.asarray(plane["origin"])
            desired = (scales[str(parent.part_id)] - 1) * (origin - parent.center) + translations[parent.part_id]
            actual = translations[attachment.child_id]
            if compare_deformed_planes:
                child = by_id[attachment.child_id]
                actual = actual + (scales[str(child.part_id)] - 1) * (origin - child.center)
            residual = abs(float(normal @ (actual - desired)))
            rows.append({"parent_id": parent.part_id, "child_id": attachment.child_id,
                         **plane, "normal_residual": residual})
    return rows
