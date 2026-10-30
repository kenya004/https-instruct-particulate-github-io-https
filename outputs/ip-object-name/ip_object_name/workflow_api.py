from __future__ import annotations

import tempfile
from contextlib import contextmanager
from pathlib import Path

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.responses import FileResponse
from filelock import FileLock, Timeout
from pydantic import BaseModel, Field

from . import core
from .planning import normalize_edit_request, plan_registered_model
from .segmentation import ARTIFACTS, InstructParticulateSegmenter, SegmentationOptions, artifact_path, segment_registered_model
from .store import ModelStore, error_details, utc_now, write_json


MAX_UPLOAD_BYTES = 100 * 1024 * 1024


class PlanRequest(BaseModel):
    edit_request: str = Field(min_length=1, max_length=4000)


class SegmentRequest(BaseModel):
    points_per_face: int = Field(default=1, ge=1, le=8)
    query_batch_size: int = Field(default=2048, ge=128, le=8192)
    strict_face_postprocess: bool = True
    enforce_connectivity_per_part: bool = True


def create_app(settings: core.Settings | None = None, *, models_root: Path | None = None, planner_model: str | None = None, segmentation_runner=None) -> FastAPI:
    import os

    app = FastAPI(title="Instruct-Particulate Preparation API", version="0.2.0")
    app.state.settings = settings or core.Settings.from_env()
    root = (models_root or app.state.settings.repo_root / "data" / "models").expanduser().resolve()
    app.state.models_root = root
    app.state.planner_model = planner_model or os.getenv("IP_PART_PLANNER_MODEL") or app.state.settings.model
    app.state.segmentation_runner = segmentation_runner or InstructParticulateSegmenter(app.state.settings.repo_root)

    @contextmanager
    def locked_store():
        root.mkdir(parents=True, exist_ok=True)
        try:
            with FileLock(root / ".watch.lock", timeout=0):
                yield ModelStore(root)
        except Timeout:
            raise HTTPException(409, "The model store is busy. Stop the inbox watcher or wait for the current request.") from None

    def existing(store: ModelStore, model_id: str) -> dict:
        try:
            return store.get(model_id)
        except ValueError:
            raise HTTPException(422, "Invalid model ID.") from None
        except FileNotFoundError:
            raise HTTPException(404, "The model was not found.") from None

    @app.get("/health")
    def health():
        return {"status": "alive", "service": "ip-preparation", "recognition_model": app.state.settings.model, "planner_model": app.state.planner_model}

    @app.post("/models", status_code=201)
    def register(file: UploadFile = File(...), edit_request: str = Form(...), up_dir: str = Form("+Z")):
        try:
            try:
                request = normalize_edit_request(edit_request)
                direction = core.normalize_up_dir(up_dir)
            except ValueError as error:
                raise HTTPException(422, str(error)) from None
            filename = (file.filename or "").replace("\\", "/").rsplit("/", 1)[-1]
            if Path(filename).suffix.lower() != ".glb":
                raise HTTPException(422, "Upload a GLB file.")
            if file.size is not None and file.size > MAX_UPLOAD_BYTES:
                raise HTTPException(413, "GLB must be at most 100 MiB.")
            with locked_store() as store, tempfile.TemporaryDirectory(prefix="ip_import_") as temporary:
                source = Path(temporary) / filename
                size = 0
                with source.open("wb") as destination:
                    while chunk := file.file.read(1024 * 1024):
                        size += len(chunk)
                        if size > MAX_UPLOAD_BYTES:
                            raise HTTPException(413, "GLB must be at most 100 MiB.")
                        destination.write(chunk)
                try:
                    core.validate_glb(source)
                except core.InvalidMeshError as error:
                    raise HTTPException(422, str(error)) from None
                metadata = store.register(source, up_dir=direction)
                metadata["source_kind"] = "ui_upload"
                store.save(metadata)
                write_json(Path(metadata["input_mesh"]).parent / "edit_request.json", {"edit_request": request, "created_at": utc_now()})
                return metadata
        finally:
            file.file.close()

    @app.get("/models/{model_id}")
    def get_model(model_id: str):
        with locked_store() as store:
            return existing(store, model_id)

    @app.post("/models/{model_id}/recognize")
    def recognize(model_id: str, retry: bool = False):
        with locked_store() as store:
            metadata = existing(store, model_id)
            if metadata["status"] == "processing":
                store.mark_interrupted()
            result = store.recognize(model_id, app.state.settings, retry_failed=retry)
            if result["status"] != "completed":
                status = 503 if result.get("error", {}).get("type") == "SetupError" else 502
                raise HTTPException(status, {"model_id": model_id, "error": result.get("error")})
            return result

    @app.post("/models/{model_id}/parts")
    def parts(model_id: str, request: PlanRequest):
        with locked_store() as store:
            metadata = existing(store, model_id)
            if metadata["status"] != "completed":
                raise HTTPException(409, "Object-name recognition must finish first.")
            try:
                return plan_registered_model(store, model_id, request.edit_request, model=app.state.planner_model)
            except ValueError as error:
                raise HTTPException(422, str(error)) from None
            except core.SetupError as error:
                raise HTTPException(503, str(error)) from None
            except core.VLMError as error:
                raise HTTPException(502, error_details(error)) from None

    @app.post("/models/{model_id}/plans/{plan_id}/segment")
    def segment(model_id: str, plan_id: str, request: SegmentRequest):
        with locked_store() as store:
            existing(store, model_id)
            try:
                return segment_registered_model(store, model_id, plan_id, app.state.segmentation_runner, SegmentationOptions(**request.model_dump()))
            except FileNotFoundError:
                raise HTTPException(404, "The model or part plan was not found.") from None
            except ValueError as error:
                raise HTTPException(422, str(error)) from None
            except core.SetupError as error:
                raise HTTPException(503, str(error)) from None
            except Exception as error:
                raise HTTPException(502, error_details(error)) from None

    @app.get("/models/{model_id}/plans/{plan_id}/segmentations/{segmentation_id}/files/{filename}")
    def download(model_id: str, plan_id: str, segmentation_id: str, filename: str):
        with locked_store() as store:
            existing(store, model_id)
            try:
                path = artifact_path(store, model_id, plan_id, segmentation_id, filename)
            except FileNotFoundError:
                raise HTTPException(404, "The segmentation artifact was not found.") from None
            except ValueError as error:
                raise HTTPException(422, str(error)) from None
            return FileResponse(path, media_type=ARTIFACTS[filename], filename=filename)

    return app


app = create_app()
