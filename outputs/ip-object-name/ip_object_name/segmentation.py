from __future__ import annotations

import hashlib
import importlib
import json
import sys
from dataclasses import asdict, dataclass
from pathlib import Path
from uuid import uuid4

import numpy as np
import trimesh

from . import core
from .planning import PartPlanPrediction
from .store import ModelStore, error_details, utc_now, write_json


PART_COLORS = ["#d77a35", "#168b83", "#8266aa", "#cf5265", "#447bb5", "#8b9b37", "#bd689d", "#687a86"]
ARTIFACTS = {"parts.glb": "model/gltf-binary", "parts.npz": "application/octet-stream", "parts.json": "application/json"}


@dataclass(frozen=True)
class SegmentationOptions:
    points_per_face: int = 1
    query_batch_size: int = 2048
    strict_face_postprocess: bool = True
    enforce_connectivity_per_part: bool = True

    def __post_init__(self):
        if not 1 <= self.points_per_face <= 8 or not 128 <= self.query_batch_size <= 8192:
            raise ValueError("Invalid segmentation sampling or batch size.")


@dataclass
class MeshPartition:
    vertices: np.ndarray
    faces: np.ndarray
    face_part_ids: np.ndarray
    diagnostics: dict


def validate_id(value: str) -> str:
    if len(value) != 32 or any(char not in "0123456789abcdef" for char in value):
        raise ValueError("Invalid plan or segmentation ID.")
    return value


def load_plan(store: ModelStore, model_id: str, plan_id: str) -> tuple[dict, dict, Path]:
    metadata = store.get(model_id)
    folder = Path(metadata["input_mesh"]).parent / "planning" / validate_id(plan_id)
    plan = json.loads((folder / "part_plan.json").read_text(encoding="utf-8"))
    if plan.get("model_id") != model_id or plan.get("plan_id") != plan_id or plan.get("source_sha256") != metadata["source_sha256"]:
        raise ValueError("The part plan does not belong to this model.")
    if plan.get("status") != "planned":
        raise ValueError("A completed part plan is required.")
    parts = plan["parts"]
    PartPlanPrediction.model_validate({
        "summary": plan["summary"], "warnings": plan["warnings"],
        "parts": [{key: value for key, value in part.items() if key != "part_id"} for part in parts],
    })
    if [part.get("part_id") for part in parts] != list(range(len(parts))):
        raise ValueError("Part IDs must retain the plan's zero-based order.")
    return metadata, plan, folder


class InstructParticulateSegmenter:
    def __init__(self, repo_root: Path):
        self.repo_root = repo_root.resolve()
        self._app = None
        self._module = None

    def _load(self):
        if self._app is None:
            if not (self.repo_root / "app.py").is_file():
                raise core.SetupError("Instruct-Particulate app.py was not found.")
            sys.path.insert(0, str(self.repo_root))
            module = importlib.import_module("app")
            if Path(module.__file__).resolve() != self.repo_root / "app.py":
                raise core.SetupError("A different app module is already loaded. Run the API from the Instruct-Particulate repository.")
            self._app = module.InstructParticulateApp(output_root=self.repo_root / "data" / "segmentation_runtime")
            self._module = module
        return self._app, self._module

    def __call__(self, mesh_path: Path, names: list[str], up_dir: str, options: SegmentationOptions) -> MeshPartition:
        app, module = self._load()
        import torch

        geometry = app._prepare_geometry(mesh_path, up_dir)
        diagnostics = {"engine": "Instruct-Particulate", "joint_specs": [], "decode_joint_parameters": False}
        if len(names) == 1:
            labels = np.zeros(len(geometry.original_mesh.faces), dtype=np.int32)
            diagnostics["single_part_passthrough"] = True
        else:
            model, device = app._ensure_model_loaded()
            try:
                batch, query_faces = module.prepare_inference_batch_from_mesh(
                    geometry.normalized_mesh, num_shape_points=app.num_shape_points,
                    num_query_points=len(geometry.normalized_mesh.faces) * options.points_per_face,
                    num_query_points_per_face_for_seg=options.points_per_face,
                    sharp_point_ratio=app.sharp_point_ratio, link_names=names, joint_specs=[], device=device,
                )
                output = module.run_batched_model_inference(
                    model, query_batch_size=options.query_batch_size,
                    no_point_prompt_for_unique_text=True, decode_joint_parameters=False, **batch,
                )
                probabilities = torch.softmax(output["segmentation_logits"], dim=-1)[0].detach().cpu().numpy()
                if probabilities.shape != (len(query_faces), len(names)) or not np.isfinite(probabilities).all():
                    raise ValueError("The segmenter returned invalid point probabilities.")
                labels, _ = module.decode_face_part_ids(
                    geometry.normalized_mesh, point_part_ids=probabilities.argmax(axis=-1).astype(np.int32),
                    point_part_probabilities=probabilities.astype(np.float32),
                    query_face_indices=np.asarray(query_faces, dtype=np.int64),
                    input_part_ids=np.arange(len(names), dtype=np.int32),
                    strict=options.strict_face_postprocess,
                    enforce_connectivity_per_part=options.enforce_connectivity_per_part,
                )
                diagnostics.update(device=str(device), checkpoint=str(app.checkpoint_path), query_points=len(query_faces))
            except torch.cuda.OutOfMemoryError as error:
                raise RuntimeError("CUDA memory exhausted. Stop other GPU workloads and retry; query batch size can be reduced.") from error
            finally:
                torch.cuda.empty_cache()
        # Upstream original_mesh is Z-up. Restore input-scene coordinates, not normalized coordinates.
        rotation = np.asarray(geometry.up_dir_rotation, dtype=np.float64)
        vertices = np.asarray(geometry.original_mesh.vertices, dtype=np.float64) @ rotation
        diagnostics.update(
            input_to_z_up_rotation=rotation.tolist(), normalization_center=np.asarray(geometry.center).tolist(),
            normalization_scale=float(geometry.scale),
        )
        for filename in ("app.py", "infer.py", "instruct_particulate/utils/inference_utils.py"):
            source = self.repo_root / filename
            if source.is_file():
                diagnostics.setdefault("upstream_source_sha256", {})[filename] = hashlib.sha256(source.read_bytes()).hexdigest()
        return MeshPartition(vertices, np.asarray(geometry.original_mesh.faces, dtype=np.int64), np.asarray(labels), diagnostics)


def export_partition(partition: MeshPartition, plan: dict, run_dir: Path, segmentation_id: str) -> dict:
    vertices = np.asarray(partition.vertices, dtype=np.float64)
    faces = np.asarray(partition.faces)
    labels = np.asarray(partition.face_part_ids)
    parts = plan["parts"]
    if vertices.ndim != 2 or vertices.shape[1] != 3 or not len(vertices) or not np.isfinite(vertices).all():
        raise ValueError("Invalid partition vertices.")
    if faces.ndim != 2 or faces.shape[1] != 3 or not len(faces) or faces.dtype.kind not in "iu":
        raise ValueError("The partition must contain triangle faces.")
    if faces.min() < 0 or faces.max() >= len(vertices):
        raise ValueError("Invalid partition vertex indices.")
    if labels.shape != (len(faces),) or labels.dtype.kind not in "iu" or labels.min() < 0 or labels.max() >= len(parts):
        raise ValueError("Every face must belong to exactly one planned part.")
    arrays = {"vertices": vertices, "faces": faces.astype(np.int64), "face_part_ids": labels.astype(np.int32)}
    scene = trimesh.Scene()
    records = []
    warnings = ["分割境界の穴埋め・水密化、接続関係の検証は行っていません。"]
    for part in parts:
        part_id = part["part_id"]
        prefix = f"part_{part_id:04d}"
        face_indices = np.flatnonzero(labels == part_id)
        selected_faces = faces[face_indices]
        source_vertices, inverse = np.unique(selected_faces.reshape(-1), return_inverse=True)
        local_vertices = vertices[source_vertices].copy()
        local_faces = inverse.reshape(-1, 3)
        arrays.update({
            f"{prefix}_vertices": local_vertices, f"{prefix}_faces": local_faces,
            f"{prefix}_source_vertex_indices": source_vertices, f"{prefix}_source_face_indices": face_indices,
        })
        color = PART_COLORS[part_id % len(PART_COLORS)]
        record = {**part, "color": color, "geometry_name": prefix if len(face_indices) else None,
                  "node_name": f"node_{prefix}" if len(face_indices) else None,
                  "npz_prefix": prefix, "vertex_count": len(local_vertices), "face_count": len(local_faces)}
        if len(face_indices):
            mesh = trimesh.Trimesh(vertices=local_vertices, faces=local_faces, process=False)
            mesh.visual.face_colors = trimesh.visual.color.hex_to_rgba(color)
            mesh.metadata.update(part_id=part_id, part_name=part["name"])
            record["is_watertight"] = bool(mesh.is_watertight)
            scene.add_geometry(mesh, geom_name=prefix, node_name=f"node_{prefix}", transform=np.eye(4))
        else:
            record["is_watertight"] = False
            warnings.append(f"{part['label']} に割り当てられた面がありません。パーツIDは維持しています。")
        records.append(record)
    manifest = {
        "format_version": 1, "status": "completed", "model_id": plan["model_id"], "plan_id": plan["plan_id"],
        "segmentation_id": segmentation_id, "source_sha256": plan["source_sha256"], "created_at": utc_now(),
        "coordinate_frame": "input_scene", "units": "unchanged_from_input; physical units are not inferred",
        "face_index_space": "flattened mesh loaded by Instruct-Particulate, not original GLB primitive indices",
        "vertex_count": len(vertices), "face_count": len(faces), "parts": records, "warnings": warnings,
        "full_face_coverage": True, "diagnostics": partition.diagnostics,
        "appearance": "semantic colors; original textures are not copied",
    }
    run_dir.mkdir(parents=True, exist_ok=True)
    scene.export(run_dir / "parts.glb", file_type="glb")
    np.savez_compressed(run_dir / "parts.npz", **arrays)
    write_json(run_dir / "parts.json", manifest)
    return manifest


def segment_registered_model(store: ModelStore, model_id: str, plan_id: str, runner, options: SegmentationOptions) -> dict:
    metadata, plan, folder = load_plan(store, model_id, plan_id)
    source = Path(metadata["input_mesh"])
    with source.open("rb") as stream:
        if hashlib.file_digest(stream, "sha256").hexdigest() != metadata["source_sha256"]:
            raise ValueError("The registered input GLB has changed. Register it again.")
    segmentation_id = uuid4().hex
    run_dir = folder / "segmentations" / segmentation_id
    run_dir.mkdir(parents=True)
    write_json(run_dir / "request.json", {
        "model_id": model_id, "plan_id": plan_id, "segmentation_id": segmentation_id,
        "up_dir": metadata["up_dir"], "part_names": [part["name"] for part in plan["parts"]],
        "source_sha256": metadata["source_sha256"], "options": asdict(options), "created_at": utc_now(),
    })
    try:
        partition = runner(source, [part["name"] for part in plan["parts"]], metadata["up_dir"], options)
        manifest = export_partition(partition, plan, run_dir, segmentation_id)
        manifest["options"] = asdict(options)
        base = f"/models/{model_id}/plans/{plan_id}/segmentations/{segmentation_id}/files"
        manifest["files"] = {name: f"{base}/{name}" for name in ARTIFACTS}
        write_json(run_dir / "parts.json", manifest)
        write_json(folder / "segmentation.json", manifest)
        metadata.update(segmentation_status="completed", latest_segmentation_id=segmentation_id, segmentation_plan_id=plan_id)
        store.save(metadata)
        return manifest
    except Exception as error:
        write_json(run_dir / "error.json", error_details(error))
        metadata.update(segmentation_status="failed", latest_segmentation_id=segmentation_id, segmentation_plan_id=plan_id)
        store.save(metadata)
        raise


def artifact_path(store: ModelStore, model_id: str, plan_id: str, segmentation_id: str, filename: str) -> Path:
    if filename not in ARTIFACTS:
        raise FileNotFoundError("Unknown segmentation artifact.")
    _, _, folder = load_plan(store, model_id, plan_id)
    run_dir = folder / "segmentations" / validate_id(segmentation_id)
    manifest = json.loads((run_dir / "parts.json").read_text(encoding="utf-8"))
    if manifest.get("status") != "completed" or (run_dir / "error.json").exists():
        raise FileNotFoundError("This segmentation did not complete.")
    if (manifest["model_id"], manifest["plan_id"], manifest["segmentation_id"]) != (model_id, plan_id, segmentation_id):
        raise ValueError("The segmentation does not belong to this model and plan.")
    path = run_dir / filename
    if not path.is_file():
        raise FileNotFoundError(filename)
    return path
