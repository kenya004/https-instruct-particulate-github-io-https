from __future__ import annotations

import heapq
from itertools import combinations
from time import perf_counter

import numpy as np
from scipy.sparse import coo_matrix
from scipy.sparse.csgraph import connected_components


def _edge_adjacency(faces):
    # Keep all incident faces, including edges with more than two incident
    # triangles. Vertex-only contact never appears in this graph.
    edges = np.sort(faces[:, [[0, 1], [1, 2], [2, 0]]].reshape(-1, 2), axis=1)
    unique, inverse, counts = np.unique(edges, axis=0, return_inverse=True, return_counts=True)
    order = np.argsort(inverse, kind="stable")
    starts = np.cumsum(counts) - counts
    shared = np.flatnonzero((counts == 2) & (unique[:, 0] != unique[:, 1]))
    adjacency = np.column_stack((order[starts[shared]] // 3, order[starts[shared] + 1] // 3))
    adjacency_edges = unique[shared]
    extra_pairs, extra_edges = [], []
    nonmanifold = np.flatnonzero((counts > 2) & (unique[:, 0] != unique[:, 1]))
    for edge in nonmanifold:
        incident = np.unique(order[starts[edge]:starts[edge] + counts[edge]] // 3)
        pairs = list(combinations(incident, 2))
        extra_pairs.extend(pairs)
        extra_edges.extend([unique[edge]] * len(pairs))
    if extra_pairs:
        adjacency = np.vstack((adjacency, extra_pairs))
        adjacency_edges = np.vstack((adjacency_edges, extra_edges))
    valid = adjacency[:, 0] != adjacency[:, 1]
    return adjacency[valid], adjacency_edges[valid], len(nonmanifold)


def _groups(adjacency, labels):
    same = adjacency[labels[adjacency[:, 0]] == labels[adjacency[:, 1]]]
    graph = coo_matrix((np.ones(len(same)), (same[:, 0], same[:, 1])),
                       shape=(len(labels), len(labels))).tocsr()
    count, groups = connected_components(graph, directed=False)
    _, first = np.unique(groups, return_index=True)
    return count, groups, labels[first]


def refine_edge_connectivity(mesh, face_part_ids, num_parts: int, *,
                             point_part_probabilities=None, query_face_indices=None):
    """Grow edge-connected regions from one retained component per nonempty part.

    Non-core components are assigned as whole groups, only through shared mesh
    edges to a region already connected to its core. Exactly coincident edge
    endpoints are identified for topology only; mesh arrays remain unchanged.
    Distance links are never used. Unreachable groups retain their old labels.
    """
    started = perf_counter()
    original = np.asarray(face_part_ids)
    faces = np.asarray(mesh.faces)
    vertices = np.asarray(mesh.vertices, dtype=np.float64)
    if (type(num_parts) is not int or num_parts < 1 or not len(faces)
            or original.shape != (len(faces),) or original.dtype.kind not in "iu"
            or original.min() < 0 or original.max() >= num_parts):
        raise ValueError("Connectivity requires one valid part ID for every face.")
    original = original.astype(np.int32, copy=True)
    areas = np.asarray(mesh.area_faces, dtype=np.float64)
    if not np.isfinite(areas).all():
        raise ValueError("Connectivity requires finite face areas.")
    if vertices.ndim != 2 or vertices.shape[1] != 3 or not np.isfinite(vertices).all():
        raise ValueError("Connectivity requires finite 3D vertices.")
    raw_adjacency, raw_edges, raw_nonmanifold = _edge_adjacency(faces)
    # GLB UV/normal seams may duplicate both endpoints of an otherwise shared
    # edge. Canonical IDs are used only in the analysis graph, never in exports.
    points, vertex_ids = np.unique(vertices, axis=0, return_inverse=True)
    duplicate_vertices = len(vertices) - len(points)
    if duplicate_vertices:
        adjacency, adjacency_edges, nonmanifold_edges = _edge_adjacency(vertex_ids[faces])
    else:
        adjacency, nonmanifold_edges = raw_adjacency, raw_nonmanifold
        # np.unique reorders vertices even when there are no duplicates.
        adjacency_edges = vertex_ids[raw_edges]
    count, groups, group_parts = _groups(adjacency, original)
    if duplicate_vertices:
        _, _, raw_group_parts = _groups(raw_adjacency, original)
    else:
        raw_group_parts = group_parts
    group_areas = np.bincount(groups, weights=areas, minlength=count)
    group_sizes = np.bincount(groups, minlength=count)
    means = np.zeros((len(faces), num_parts), dtype=np.float64)
    means[np.arange(len(faces)), original] = 1.0
    sampled_faces = 0
    if point_part_probabilities is not None:
        probabilities = np.asarray(point_part_probabilities, dtype=np.float64)
        indices = np.asarray(query_face_indices)
        if (probabilities.ndim != 2 or probabilities.shape[1] != num_parts
                or indices.shape != (len(probabilities),) or indices.dtype.kind not in "iu"
                or np.any(indices < -1) or np.any(indices >= len(faces))
                or not np.isfinite(probabilities).all() or np.any(probabilities < 0)
                or np.any(probabilities > 1)
                or not np.allclose(probabilities.sum(axis=1), 1.0, atol=1e-5)):
            raise ValueError("Invalid connectivity query probabilities or face indices.")
        valid = indices >= 0
        sums = np.zeros_like(means)
        counts = np.bincount(indices[valid], minlength=len(faces))
        np.add.at(sums, indices[valid], probabilities[valid])
        sampled = counts > 0
        means[sampled] = sums[sampled] / counts[sampled, None]
        sampled_faces = int(sampled.sum())

    # Equal sampling per face must not give small triangles more influence per
    # unit surface area. First average within a face, then weight by its area.
    confidence = np.zeros((count, num_parts), dtype=np.float64)
    np.add.at(confidence, groups, means * areas[:, None])
    nonzero = group_areas > 0
    confidence[nonzero] /= group_areas[nonzero, None]
    if np.any(~nonzero):
        unweighted = np.zeros_like(confidence)
        np.add.at(unweighted, groups, means)
        confidence[~nonzero] = unweighted[~nonzero] / group_sizes[~nonzero, None]

    assignments = np.full(count, -1, dtype=np.int32)
    cores = {}
    for part_id in np.unique(group_parts):
        candidates = np.flatnonzero(group_parts == part_id)
        core = max(candidates, key=lambda group: (group_areas[group], confidence[group, part_id], -group))
        assignments[core] = int(part_id)
        cores[int(part_id)] = int(core)

    # Compress the face graph to a component graph, retaining the total shared
    # boundary length for deterministic confidence ties.
    neighbors = [dict() for _ in range(count)]
    if len(adjacency):
        pairs = np.sort(groups[adjacency], axis=1)
        boundary = pairs[:, 0] != pairs[:, 1]
        pairs = pairs[boundary]
        edge_vertices = adjacency_edges[boundary]
        lengths = np.linalg.norm(points[edge_vertices[:, 0]] - points[edge_vertices[:, 1]], axis=1)
        unique, inverse = np.unique(pairs, axis=0, return_inverse=True)
        totals = np.bincount(inverse, weights=lengths, minlength=len(unique))
        for (left, right), length in zip(unique, totals):
            neighbors[left][int(right)] = float(length)
            neighbors[right][int(left)] = float(length)

    contacts = [dict() for _ in range(count)]
    queue = []

    def offer(group, part_id, length):
        total = contacts[group].get(part_id, 0.0) + length
        contacts[group][part_id] = total
        heapq.heappush(queue, (-float(confidence[group, part_id]), -total, group, part_id))

    for core, part_id in enumerate(assignments):
        if part_id >= 0:
            for neighbor, length in neighbors[core].items():
                if assignments[neighbor] < 0:
                    offer(neighbor, int(part_id), length)
    while queue:
        _, negative_length, group, part_id = heapq.heappop(queue)
        if assignments[group] >= 0 or contacts[group].get(part_id) != -negative_length:
            continue
        assignments[group] = part_id
        for neighbor, length in neighbors[group].items():
            if assignments[neighbor] < 0:
                offer(neighbor, part_id, length)

    unreachable = np.flatnonzero(assignments < 0)
    assignments[unreachable] = group_parts[unreachable]
    labels = assignments[groups]
    _, _, final_parts = _groups(adjacency, labels)
    before = np.bincount(group_parts, minlength=num_parts)
    after = np.bincount(final_parts, minlength=num_parts)
    raw_before = np.bincount(raw_group_parts, minlength=num_parts)
    if duplicate_vertices:
        _, _, raw_final_parts = _groups(raw_adjacency, labels)
        raw_after = np.bincount(raw_final_parts, minlength=num_parts)
    else:
        raw_after = after
    mesh_labels = np.zeros(len(faces), dtype=np.int32)
    mesh_components = _groups(adjacency, mesh_labels)[0]
    raw_mesh_components = _groups(raw_adjacency, mesh_labels)[0] if duplicate_vertices else mesh_components
    changed = labels != original
    diagnostics = {
        "method": "shared_edge_connectivity_v2",
        "component_definition": "shared edges with exactly coincident endpoints; no distance links; source arrays unchanged",
        "coordinate_matching": "exact; no rounding or distance tolerance",
        "source_vertex_count": len(vertices), "topology_vertex_count": len(points),
        "duplicate_vertex_count": duplicate_vertices,
        "mesh_components_by_vertex_id": int(raw_mesh_components),
        "mesh_components_by_coincident_edges": int(mesh_components),
        "core_selection": "largest surface area, then area-weighted model probability",
        "reassignment": "connected-core growth; area-weighted model probability, then shared boundary length",
        "changed_faces": int(changed.sum()), "changed_surface_area": float(areas[changed].sum()),
        "total_surface_area": float(areas.sum()), "sampled_faces": sampled_faces,
        "nonmanifold_edges": nonmanifold_edges,
        "all_nonempty_parts_connected": bool(np.all(after <= 1)),
        "all_nonempty_parts_connected_by_vertex_id": bool(np.all(raw_after <= 1)),
        "parts": [{"part_id": part_id, "components_before": int(before[part_id]),
                   "components_after": int(after[part_id]),
                   "vertex_id_components_before": int(raw_before[part_id]),
                   "vertex_id_components_after": int(raw_after[part_id]),
                   "core_surface_area": float(group_areas[cores[part_id]]) if part_id in cores else 0.0}
                  for part_id in range(num_parts)],
        "unresolved_components": [{"part_id": int(group_parts[group]), "face_count": int(group_sizes[group]),
                                   "surface_area": float(group_areas[group]), "reason": "no_edge_path_to_any_retained_core"}
                                  for group in unreachable],
        "elapsed_seconds": perf_counter() - started,
    }
    return labels.astype(np.int32, copy=False), diagnostics
