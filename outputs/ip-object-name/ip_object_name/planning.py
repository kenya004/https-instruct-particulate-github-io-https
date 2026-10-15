from __future__ import annotations

import hashlib
import json
from importlib.metadata import version
from pathlib import Path
from uuid import uuid4

from pydantic import BaseModel, ConfigDict, Field, ValidationError, field_validator, model_validator

from . import core
from .store import ModelStore, error_details, utc_now, write_json


class PlannedRegion(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    name: str = Field(min_length=1, max_length=80)
    label: str = Field(min_length=1, max_length=80)
    description: str = Field(min_length=1, max_length=300)
    is_edit_target: bool

    @field_validator("name", "label", "description")
    @classmethod
    def clean_text(cls, value: str) -> str:
        value = " ".join(value.split())
        if not value:
            raise ValueError("Part fields cannot be blank.")
        return value


class PartPlanPrediction(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    summary: str = Field(min_length=1, max_length=600)
    parts: list[PlannedRegion] = Field(min_length=1, max_length=32)
    warnings: list[str] = Field(max_length=10)

    @model_validator(mode="after")
    def distinct_names(self):
        names = [part.name.casefold() for part in self.parts]
        if len(set(names)) != len(names):
            raise ValueError("Part names must be distinct.")
        return self


def normalize_edit_request(value: str) -> str:
    request = value.strip()
    if not request or len(request) > 4000:
        raise ValueError("Enter an editing request between 1 and 4000 characters.")
    return request


def _part_plan_response_schema() -> dict:
    # Keep the API schema separate from strict local Pydantic validation.
    return {
        "type": "OBJECT",
        "properties": {
            "summary": {"type": "STRING"},
            "parts": {
                "type": "ARRAY", "minItems": 1, "maxItems": 32,
                "items": {
                    "type": "OBJECT",
                    "properties": {
                        "name": {"type": "STRING"},
                        "label": {"type": "STRING"},
                        "description": {"type": "STRING"},
                        "is_edit_target": {"type": "BOOLEAN"},
                    },
                    "required": ["name", "label", "description", "is_edit_target"],
                },
            },
            "warnings": {"type": "ARRAY", "maxItems": 10, "items": {"type": "STRING"}},
        },
        "required": ["summary", "parts", "warnings"],
    }


def request_part_plan(object_name: str, edit_request: str, *, model: str) -> tuple[PartPlanPrediction, str | None]:
    from google import genai
    from google.genai import types

    prompt = Path(__file__).with_name("part-plan-system-prompt.md").read_text(encoding="utf-8")
    payload = json.dumps({"object_name": object_name, "edit_request": edit_request}, ensure_ascii=False)
    try:
        with genai.Client(api_key=core._api_key(), http_options=types.HttpOptions(timeout=120_000)) as client:
            response = client.models.generate_content(
                model=model,
                contents=payload,
                config=types.GenerateContentConfig(
                    system_instruction=prompt,
                    response_mime_type="application/json",
                    response_schema=_part_plan_response_schema(),
                ),
            )
    except core.SetupError:
        raise
    except Exception as error:
        raise core.VLMError("Part-list generation failed. Check model access, network, and quota.") from error
    try:
        prediction = PartPlanPrediction.model_validate_json(response.text)
    except (TypeError, ValueError, ValidationError) as error:
        raise core.VLMError("The LLM returned an invalid part list.") from error
    return prediction, getattr(response, "model_version", None)


def plan_registered_model(store: ModelStore, model_id: str, edit_request: str, *, model: str) -> dict:
    edit_request = normalize_edit_request(edit_request)
    metadata = store.get(model_id)
    if metadata["status"] != "completed" or not metadata.get("object_name"):
        raise ValueError("Recognize the object name before generating a part list.")
    if metadata["object_name"].strip().casefold() in {"\u4e0d\u660e", "unknown"}:
        raise ValueError("The object category is unknown; a part list cannot be generated reliably.")
    plan_id = uuid4().hex
    folder = Path(metadata["input_mesh"]).parent
    run_dir = folder / "planning" / plan_id
    run_dir.mkdir(parents=True)
    prompt = Path(__file__).with_name("part-plan-system-prompt.md").read_text(encoding="utf-8")
    request = {
        "model_id": model_id, "plan_id": plan_id,
        "object_name": metadata["object_name"], "edit_request": edit_request,
        "llm_model": model, "created_at": utc_now(),
        "google_genai_version": version("google-genai"),
        "prompt_sha256": hashlib.sha256(prompt.encode("utf-8")).hexdigest(),
        "input_modalities": ["text"], "generation_parameters": "API defaults; JSON schema specified.",
    }
    write_json(run_dir / "request.json", request)
    write_json(folder / "edit_request.json", {"edit_request": edit_request, "updated_at": utc_now()})
    (run_dir / "system_prompt.md").write_text(prompt, encoding="utf-8")
    try:
        prediction, returned_version = request_part_plan(metadata["object_name"], edit_request, model=model)
        result = {
            **request, "status": "planned", "returned_model_version": returned_version,
            "summary": prediction.summary, "warnings": prediction.warnings,
            "parts": [{"part_id": index, **part.model_dump()} for index, part in enumerate(prediction.parts)],
            "part_names": [part.name for part in prediction.parts],
            "input_mesh": metadata["input_mesh"], "source_sha256": metadata["source_sha256"],
        }
        write_json(run_dir / "part_plan.json", result)
        write_json(folder / "planning" / "part_plan.json", result)
        metadata.update(planning_status="completed", latest_plan_id=plan_id)
        store.save(metadata)
        return result
    except Exception as error:
        write_json(run_dir / "error.json", error_details(error))
        metadata.update(planning_status="failed", latest_plan_id=plan_id)
        store.save(metadata)
        raise
