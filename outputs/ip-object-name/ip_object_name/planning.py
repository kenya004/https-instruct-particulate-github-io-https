from __future__ import annotations

import hashlib
import json
from importlib.metadata import version
from pathlib import Path
from uuid import uuid4
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, ValidationError, field_validator, model_validator

from . import core
from .store import ModelStore, error_details, utc_now, write_json


EditParameter = Literal["uniform_scale", "translate_u", "translate_v", "translate_n"]


class PlannedRegion(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    name: str = Field(min_length=1, max_length=80)
    label: str = Field(min_length=1, max_length=80)
    description: str = Field(min_length=1, max_length=300)
    is_edit_target: bool
    # None is only for loading saved plans created before parameter selection.
    edit_parameters: list[EditParameter] | None = Field(default=None, max_length=4)
    parameter_reason: str | None = Field(default=None, min_length=1, max_length=400)

    @field_validator("name", "label", "description")
    @classmethod
    def clean_text(cls, value: str) -> str:
        value = " ".join(value.split())
        if not value:
            raise ValueError("Part fields cannot be blank.")
        return value

    @model_validator(mode="after")
    def valid_parameters(self):
        if self.edit_parameters is None and self.parameter_reason is None:
            return self
        if self.edit_parameters is None or self.parameter_reason is None or not self.parameter_reason.strip():
            raise ValueError("Specify edit parameters and their selection reason for every part.")
        if len(set(self.edit_parameters)) != len(self.edit_parameters):
            raise ValueError("Edit parameters must not be duplicated.")
        if not self.is_edit_target and self.edit_parameters:
            raise ValueError("Unedited parts cannot have editing controls; they may follow automatically.")
        self.parameter_reason = " ".join(self.parameter_reason.split())
        return self


class PlannedConnection(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    parent: str = Field(min_length=1, max_length=80)
    child: str = Field(min_length=1, max_length=80)
    relationship: Literal["attachment", "continuous"]
    mode: Literal["cap_union", "blend"]
    reference_part: str = Field(min_length=1, max_length=80)
    deform_part: str = Field(min_length=1, max_length=80)
    reason: str = Field(min_length=1, max_length=400)


class PartPlanPrediction(BaseModel):
    model_config = ConfigDict(extra="forbid", strict=True)
    summary: str = Field(min_length=1, max_length=600)
    parts: list[PlannedRegion] = Field(min_length=1, max_length=32)
    warnings: list[str] = Field(max_length=10)
    # Defaults allow reading earlier saved plans. New provider replies require both.
    base_part: str | None = None
    connections: list[PlannedConnection] | None = Field(default=None, max_length=64)

    @model_validator(mode="after")
    def distinct_names(self):
        names = [part.name.casefold() for part in self.parts]
        if len(set(names)) != len(names):
            raise ValueError("Part names must be distinct.")
        if self.base_part is None and self.connections is None:
            return self
        known = {part.name for part in self.parts}
        if self.base_part not in known or self.connections is None:
            raise ValueError("Specify a known base part and its connection policy.")
        parents, pairs = {}, set()
        for link in self.connections:
            if not {link.parent, link.child, link.reference_part, link.deform_part}.issubset(known):
                raise ValueError("Connection references an unknown part.")
            pair = frozenset((link.parent, link.child))
            if len(pair) != 2 or pair in pairs or {link.reference_part, link.deform_part} != pair:
                raise ValueError("Connection endpoints, reference or deformation side are invalid.")
            if (link.relationship == "continuous") != (link.mode == "blend"):
                raise ValueError("Continuous relations use blend; attachments use cap_union.")
            if link.child == self.base_part or link.child in parents:
                raise ValueError("The base cannot be a child; each part has at most one structural parent.")
            pairs.add(pair)
            parents[link.child] = link.parent
        for name in known:
            seen = set()
            while name in parents:
                if name in seen:
                    raise ValueError("Attachment relationships must not contain a cycle.")
                seen.add(name)
                name = parents[name]
        return self

    def editing_policy(self):
        if self.base_part is None:
            return None
        ids = {part.name: i for i, part in enumerate(self.parts)}
        return {"version": 1, "source": "part_planner_text", "base_part_id": ids[self.base_part],
            "relations": [{"parent_id": ids[r.parent], "child_id": ids[r.child],
                "relationship": r.relationship, "mode": r.mode,
                "reference_part_id": ids[r.reference_part], "deform_part_id": ids[r.deform_part],
                "reason": r.reason} for r in self.connections]}


def normalize_edit_request(value: str) -> str:
    request = value.strip()
    if not request or len(request) > 4000:
        raise ValueError("Enter an editing request between 1 and 4000 characters.")
    return request


def _part_plan_response_schema() -> dict:
    # Keep array lengths out of Gemini's decoding schema. Bounded arrays of
    # multi-field objects can exceed the provider's constraint-state budget.
    # The prompt requests the limits; PartPlanPrediction enforces them locally.
    return {
        "type": "OBJECT",
        "properties": {
            "summary": {"type": "STRING"},
            "parts": {
                "type": "ARRAY",
                "items": {
                    "type": "OBJECT",
                    "properties": {
                        "name": {"type": "STRING"},
                        "label": {"type": "STRING"},
                        "description": {"type": "STRING"},
                        "is_edit_target": {"type": "BOOLEAN"},
                        "edit_parameters": {"type": "ARRAY", "items": {"type": "STRING",
                            "enum": ["uniform_scale", "translate_u", "translate_v", "translate_n"]}},
                        "parameter_reason": {"type": "STRING"},
                    },
                    "required": ["name", "label", "description", "is_edit_target", "edit_parameters", "parameter_reason"],
                },
            },
            "warnings": {"type": "ARRAY", "items": {"type": "STRING"}},
            "base_part": {"type": "STRING"},
            "connections": {"type": "ARRAY", "items": {"type": "OBJECT", "properties": {
                "parent": {"type": "STRING"}, "child": {"type": "STRING"},
                "relationship": {"type": "STRING", "enum": ["attachment", "continuous"]},
                "mode": {"type": "STRING", "enum": ["cap_union", "blend"]},
                "reference_part": {"type": "STRING"}, "deform_part": {"type": "STRING"},
                "reason": {"type": "STRING"}},
                "required": ["parent", "child", "relationship", "mode", "reference_part", "deform_part", "reason"]}},
        },
        "required": ["summary", "parts", "warnings", "base_part", "connections"],
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
        if prediction.base_part is None or prediction.connections is None:
            raise ValueError("The LLM omitted the editing policy.")
        if any(p.edit_parameters is None or p.parameter_reason is None for p in prediction.parts):
            raise ValueError("The LLM omitted editing parameter selection.")
        if any(p.is_edit_target and not p.edit_parameters for p in prediction.parts):
            raise ValueError("The LLM must select an exact or closest available control for each edit target.")
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
            "editing_policy": prediction.editing_policy(),
            "input_mesh": metadata["input_mesh"], "source_sha256": metadata["source_sha256"],
            "input_sha256": metadata.get("input_sha256", metadata["source_sha256"]),
            "up_dir": metadata["up_dir"], "orientation": metadata.get("orientation"),
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
