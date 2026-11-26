"""Rest-shape contact planes shared by translation controls and following."""
import numpy as np


FOLLOW_METHOD = "reference_plane_normal_v1"
NETWORK_FOLLOW_METHOD = "each_edited_part_drives_contacts_v1"
GEOMETRY_VERSION = 3
GROUP_ANGLE_DEGREES = 15.


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


def contact_plane_response(connections, parent, child):
    """Group co-oriented cuts of one pair and compile a small linear response.

    Each cut has one vote, independent of perimeter or tessellation density.
    Opposite-facing contacts stay separate. The AABB centers set the normal's
    sign only; the orientation always comes from the boundary geometry.
    """
    groups, warnings = [], []
    cosine = np.cos(np.deg2rad(GROUP_ANGLE_DEGREES))
    for connection in sorted(connections, key=lambda c: c.connection_id):
        if connection.plane_normal is None:
            warnings.append(f"接続 {connection.connection_id}: 接続平面を取得できないため方向追従から除外します。")
            continue
        normal = np.asarray(connection.plane_normal, dtype=float).copy()
        outward = connection.anchor - parent.center
        sign = float(normal @ outward)
        tolerance = np.linalg.norm(outward) * 1e-10
        if abs(sign) <= tolerance:
            outward = child.center - parent.center
            sign = float(normal @ outward)
            tolerance = np.linalg.norm(outward) * 1e-10
        certain = abs(sign) > tolerance
        if not certain:
            sign = float(normal[np.argmax(np.abs(normal))])
        if sign < 0:
            normal = -normal
        # Do not infer a common facing direction when the sign is ambiguous.
        group = next((g for g in groups if certain and g[0][2]
                      and all(float(normal @ member[1]) >= cosine for member in g)), None)
        if group is None:
            group = []
            groups.append(group)
        group.append((connection, normal, certain))
        if connection.plane_error is not None and connection.plane_error > .05:
            warnings.append(f"接続 {connection.connection_id}: 断面が非平面のため近似した方向で追従します。")

    planes = []
    for group in groups:
        normal = np.mean([m[1] for m in group], axis=0)
        normal /= np.linalg.norm(normal)
        centers = np.asarray([m[0].anchor for m in group])
        origin = centers.mean(axis=0)
        spread = np.rad2deg(np.arccos(np.clip([normal @ m[1] for m in group], -1, 1))).max()
        planes.append({"connection_ids": [m[0].connection_id for m in group],
                       "origin": origin.tolist(), "normal": normal.tolist(),
                       "normal_spread_degrees": float(spread),
                       "offset_spread": float(np.max(np.abs((centers - origin) @ normal)))})
    if not planes:
        return (), np.zeros((3, 3)), np.zeros(3), tuple(warnings)
    normals = np.asarray([plane["normal"] for plane in planes])
    origins = np.asarray([plane["origin"] for plane in planes])
    # Minimum-norm translation for several direction groups. Opposing or
    # inconsistent planes leave a visible residual instead of rotating parts.
    response = np.linalg.pinv(normals, rcond=1e-3)
    projection = response @ normals
    projection[np.abs(projection) < 1e-14] = 0
    displacement = response @ np.einsum("ij,ij->i", normals, origins - parent.center)
    return tuple(planes), projection, displacement, tuple(warnings)
