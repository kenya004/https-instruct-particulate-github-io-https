"""Surface intersections for diagnostic highlighting; does not repair meshes.

A BVH finds candidate face pairs. Vectorized triangle tests distinguish positive
coplanar area and crossing segments from ordinary shared-edge/vertex contact.
All arithmetic is relative to a centered, normalized copy of the coordinates.
"""
from __future__ import annotations

import numpy as np


METHOD = "triangle_bvh_overlap_v3"


def overlap_frame(vertices):
    """Keep this original-model frame fixed when checking later edits."""
    vertices = np.asarray(vertices, dtype=float)
    if not len(vertices):
        return {"origin": [0.0, 0.0, 0.0], "scale": 1.0}
    lower, upper = vertices.min(axis=0), vertices.max(axis=0)
    return {"origin": ((lower + upper) / 2).tolist(), "scale": float((upper - lower).max()) or 1.0}


def _plane_interval(triangles, distances, direction, tolerance):
    projected = np.einsum("pvi,pi->pv", triangles, direction)
    next_distance = np.roll(distances, -1, axis=1)
    crossing = ((distances > tolerance) & (next_distance < -tolerance)) | ((distances < -tolerance) & (next_distance > tolerance))
    ratio = np.divide(distances, distances - next_distance, out=np.zeros_like(distances), where=crossing)
    intersections = projected + ratio * (np.roll(projected, -1, axis=1) - projected)
    values = np.concatenate([projected, intersections], axis=1)
    valid = np.concatenate([np.abs(distances) <= tolerance, crossing], axis=1)
    return np.where(valid, values, np.inf).min(axis=1), np.where(valid, values, -np.inf).max(axis=1)


def _strict_inside(triangles, normals, points, tolerance):
    edges = np.roll(triangles, -1, axis=1) - triangles
    sides = np.einsum("pvi,pi->pv", np.cross(edges, points[:, None] - triangles), normals)
    return np.all(sides > tolerance * np.linalg.norm(edges, axis=2), axis=1)


def _intersecting_pairs(triangles, normals, pairs, tolerance):
    a, b = triangles[pairs[:, 0]], triangles[pairs[:, 1]]
    na, nb = normals[pairs[:, 0]], normals[pairs[:, 1]]
    da = np.einsum("pi,pi->p", a[:, 0], na)
    db = np.einsum("pi,pi->p", b[:, 0], nb)
    distances_a = np.einsum("pvi,pi->pv", a, nb) - db[:, None]
    distances_b = np.einsum("pvi,pi->pv", b, na) - da[:, None]
    separated = ((distances_a.min(axis=1) > tolerance) | (distances_a.max(axis=1) < -tolerance)
                 | (distances_b.min(axis=1) > tolerance) | (distances_b.max(axis=1) < -tolerance))
    active = np.flatnonzero(~separated)
    result = np.zeros(len(pairs), dtype=bool)
    if not len(active):
        return pairs[result]
    a, b, na, nb, da, db, distances_a, distances_b = [item[active] for item in (a, b, na, nb, da, db, distances_a, distances_b)]
    coplanar = (np.abs(distances_a).max(axis=1) <= tolerance) & (np.abs(distances_b).max(axis=1) <= tolerance)
    indices = np.flatnonzero(coplanar)
    if len(indices):
        ca, cb, normal = a[indices], b[indices], na[indices]
        edges = np.concatenate([np.roll(ca, -1, axis=1) - ca, np.roll(cb, -1, axis=1) - cb], axis=1)
        axes = np.cross(normal[:, None], edges)
        pa, pb = np.einsum("pki,pvi->pkv", axes, ca), np.einsum("pki,pvi->pkv", axes, cb)
        overlap = np.minimum(pa.max(axis=2), pb.max(axis=2)) - np.maximum(pa.min(axis=2), pb.min(axis=2))
        positive_area = np.all(overlap > tolerance * np.linalg.norm(axes, axis=2), axis=1)
        result[active[indices[positive_area]]] = True
    indices = np.flatnonzero(~coplanar)
    if len(indices):
        line = np.cross(na[indices], nb[indices])
        norm = np.linalg.norm(line, axis=1)
        valid = norm > 1e-10
        indices, line, norm = indices[valid], line[valid], norm[valid]
        if len(indices):
            direction = line / norm[:, None]
            lo_a, hi_a = _plane_interval(a[indices], distances_a[indices], direction, tolerance)
            lo_b, hi_b = _plane_interval(b[indices], distances_b[indices], direction, tolerance)
            lower, upper = np.maximum(lo_a, lo_b), np.minimum(hi_a, hi_b)
            valid = upper - lower > tolerance
            indices, line, norm, direction = indices[valid], line[valid], norm[valid], direction[valid]
            if len(indices):
                origin = (da[indices, None] * np.cross(nb[indices], line) + db[indices, None] * np.cross(line, na[indices])) / norm[:, None] ** 2
                middle = (lower[valid] + upper[valid]) / 2
                point = origin + (middle - np.einsum("pi,pi->p", origin, direction))[:, None] * direction
                # Shared boundary edges alone are legitimate, even across parts.
                crossing = _strict_inside(a[indices], na[indices], point, tolerance) | _strict_inside(b[indices], nb[indices], point, tolerance)
                result[active[indices[crossing]]] = True
    return pairs[result]


def find_face_overlaps(vertices, faces, *, tolerance=1e-9, frame=None):
    vertices, faces = np.asarray(vertices, dtype=float), np.asarray(faces, dtype=np.int64)
    if (vertices.ndim != 2 or vertices.shape[1] != 3 or not np.isfinite(vertices).all()
            or faces.ndim != 2 or faces.shape[1] != 3
            or (len(faces) and (faces.min() < 0 or faces.max() >= len(vertices)))):
        raise ValueError("交差検査用の頂点・面が不正です。")
    frame = overlap_frame(vertices) if frame is None else frame
    origin, extent = np.asarray(frame["origin"], dtype=float), float(frame["scale"])
    if (origin.shape != (3,) or not np.isfinite(origin).all() or not np.isfinite(extent) or extent <= 0
            or not np.isfinite(tolerance) or tolerance <= 0):
        raise ValueError("交差検査用の基準座標・許容誤差が不正です。")
    report = {"method": METHOD, "face_ids": [], "face_count": len(faces), "pair_count": 0,
              "pairs": np.empty((0, 2), dtype=np.int64), "sample_pairs": [], "tolerance": tolerance * extent,
              "frame": {"origin": origin.tolist(), "scale": extent}}
    if len(faces) < 2:
        return report
    points = (vertices - origin) / extent
    triangles = points[faces]
    normals = np.cross(triangles[:, 1] - triangles[:, 0], triangles[:, 2] - triangles[:, 0])
    areas = np.linalg.norm(normals, axis=1)
    valid = np.flatnonzero(areas > tolerance ** 2)
    normals = np.divide(normals, areas[:, None], out=np.zeros_like(normals), where=areas[:, None] > 0)
    lower, upper = triangles.min(axis=1), triangles.max(axis=1)
    centers = (lower + upper) / 2
    nodes = []

    def build(ids):
        index = len(nodes)
        lo, hi = lower[ids].min(axis=0), upper[ids].max(axis=0)
        nodes.append((lo, hi, ids, None))
        if len(ids) > 12:
            axis = int(np.argmax(np.ptp(centers[ids], axis=0)))
            middle = len(ids) // 2
            order = np.argpartition(centers[ids, axis], middle)
            children = (build(ids[order[:middle]]), build(ids[order[middle:]]))
            nodes[index] = (lo, hi, None, children)
        return index

    if len(valid) < 2:
        return report
    root = build(valid)
    stack, pending, pending_count = [(root, root)], [], 0
    marked = np.zeros(len(faces), dtype=bool)
    detected = []

    def check_pending():
        nonlocal pending_count
        if not pending:
            return
        pairs = _intersecting_pairs(triangles, normals, np.concatenate(pending), tolerance)
        report["pair_count"] += len(pairs)
        if len(pairs):
            detected.append(pairs)
            marked[pairs.reshape(-1)] = True
            report["sample_pairs"].extend(pairs[:max(0, 100 - len(report["sample_pairs"]))].tolist())
        pending.clear()
        pending_count = 0

    while stack:
        left, right = stack.pop()
        lo_a, hi_a, ids_a, children_a = nodes[left]
        lo_b, hi_b, ids_b, children_b = nodes[right]
        if np.any(np.minimum(hi_a, hi_b) < np.maximum(lo_a, lo_b) - tolerance):
            continue
        if left == right and children_a is not None:
            a, b = children_a
            stack.extend([(a, a), (a, b), (b, b)])
        elif children_a is not None or children_b is not None:
            if children_b is None or (children_a is not None and np.prod(hi_a - lo_a) >= np.prod(hi_b - lo_b)):
                stack.extend((child, right) for child in children_a)
            else:
                stack.extend((left, child) for child in children_b)
        else:
            ia, ib = np.meshgrid(ids_a, ids_b, indexing="ij")
            mask = np.all(np.minimum(upper[ia], upper[ib]) >= np.maximum(lower[ia], lower[ib]) - tolerance, axis=2)
            if left == right:
                mask &= ia < ib
            pairs = np.sort(np.column_stack([ia[mask], ib[mask]]), axis=1)
            if len(pairs):
                pending.append(pairs)
                pending_count += len(pairs)
            if pending_count >= 16384:
                check_pending()
    check_pending()
    report.update(face_ids=np.flatnonzero(marked).tolist(), tolerance=tolerance * extent,
                  pairs=np.concatenate(detected) if detected else np.empty((0, 2), dtype=np.int64))
    return report


def only_new_overlaps(report, reference, *, face_keys=None, reference_face_keys=None, uniform_groups=None):
    """Subtract complete unordered face pairs, not faces or truncated samples.

    Keys identify original faces after rejoining/reordering. Newly generated
    bridge faces must have unique keys absent from the reference mesh.
    Faces with the same nonnegative uniform group underwent one positive
    uniform scaling/translation, so cannot develop new internal intersections.
    Locally deformed or newly generated faces use group -1 and remain checked.
    """
    pairs = np.asarray(report["pairs"], dtype=np.int64).reshape(-1, 2)
    reference_pairs = np.asarray(reference["pairs"], dtype=np.int64).reshape(-1, 2)

    def encode(pairs, keys, count):
        keys = np.arange(count, dtype=np.int64) if keys is None else np.asarray(keys, dtype=np.int64)
        if keys.shape != (count,) or len(np.unique(keys)) != count:
            raise ValueError("交差比較用のFace対応が不正です。")
        mapped = np.ascontiguousarray(np.sort(keys[pairs], axis=1))
        return mapped.view(np.dtype([("a", np.int64), ("b", np.int64)])).reshape(-1)

    current_keys = encode(pairs, face_keys, report["face_count"])
    original_keys = encode(reference_pairs, reference_face_keys, reference["face_count"])
    new_pairs = pairs[~np.isin(current_keys, original_keys)]
    ignored_reference_count = len(pairs) - len(new_pairs)
    ignored_uniform_count = 0
    if uniform_groups is not None:
        groups = np.asarray(uniform_groups, dtype=np.int64)
        if groups.shape != (report["face_count"],) or np.any(groups < -1):
            raise ValueError("交差比較用のパーツ変形区分が不正です。")
        left, right = groups[new_pairs[:, 0]], groups[new_pairs[:, 1]]
        unchanged_internal = (left >= 0) & (left == right)
        ignored_uniform_count = int(np.count_nonzero(unchanged_internal))
        new_pairs = new_pairs[~unchanged_internal]
    return {**report, "comparison": "new_face_pairs", "pairs": new_pairs,
            "face_ids": np.unique(new_pairs).tolist(), "pair_count": len(new_pairs),
            "sample_pairs": new_pairs[:100].tolist(), "total_pair_count": report["pair_count"],
            "reference_pair_count": reference["pair_count"], "ignored_pair_count": len(pairs) - len(new_pairs),
            "ignored_reference_pair_count": ignored_reference_count, "ignored_uniform_pair_count": ignored_uniform_count}


def assemble_parts(parts):
    vertices, faces, slices, offset, face_offset = [], [], {}, 0, 0
    for part in parts:
        vertices.append(part.vertices)
        faces.append(part.faces + offset)
        slices[str(part.part_id)] = (face_offset, face_offset + len(part.faces))
        offset += len(part.vertices)
        face_offset += len(part.faces)
    return np.concatenate(vertices), np.concatenate(faces), slices


def part_face_ids(report, slices):
    ids = np.asarray(report["face_ids"], dtype=int)
    return {part_id: (ids[(ids >= lower) & (ids < upper)] - lower).tolist() for part_id, (lower, upper) in slices.items()}
