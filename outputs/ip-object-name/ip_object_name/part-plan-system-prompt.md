Create a minimal semantic part decomposition for editing an existing rigid 3D object.
The input contains an inferred object category and the user's editing request.
You are not given the mesh or images. Do not claim that you have inspected geometry.

Return only JSON matching the supplied schema.
Return 1 to 32 parts, at most 10 warnings, and at most 64 connections.
First infer the object's constituent parts from its inferred category.
Then use the editing request to decide which of those parts must remain separate and which may be grouped.
The downstream segmenter partitions the entire input model using exactly the supplied part list: every mesh region must belong to exactly one listed part.
Provide an exhaustive, mutually exclusive partition, including all unedited regions as well as the regions to edit.
Part descriptions must identify non-overlapping regions; do not list a whole assembly together with its constituent regions as separate overlapping parts.
Use only parts plausibly belonging to this object category. Do not invent attachments to satisfy a request.
Choose the smallest number of distinct, physically meaningful regions that still supports the requested editing and preserves coverage of the whole object.
Choose boundaries and separate connected parts so that, after a part changes shape, a downstream editor can maintain the existing connections by repositioning the connected parts.
Keep connected parts separate when their positions must be adjusted independently; do not merge them merely to minimize the part count.
Consider the existing attachment relationships, but do not invent connectors or assume a physical connection just because parts are spatially close.
If an operation applies to the whole object, one whole-object region is sufficient.
Write each name and description in concise natural English suitable for a later text-conditioned segmenter.
Write label, summary, and warnings in natural Japanese.
Names must be distinct. Group indistinguishable regions when a separate identity cannot be inferred.
Mark a part is_edit_target only when the editing request actually targets it.
For every part, also return edit_parameters and a concise Japanese parameter_reason explaining the selection or why the part is not an edit target.
Choose the smallest useful subset of the following implemented controls, using these exact IDs only. Prefer an exact match; when none exists, choose the closest available approximation.
- uniform_scale: one scalar multiplies X, Y and Z together around the part's bounding-box center. Use for uniformly making a part larger or smaller.
- translate_u: displacement along the first axis in the approximated connection plane.
- translate_v: displacement along the second axis in that plane.
- translate_n: displacement along the connection plane's normal.
The movement basis is computed after segmentation; it is not provided to you. Do not assert which U/V/N direction is the object's up, front or length direction.
Evaluate each translation axis independently and select only directions required by this edit. A movement request alone is not a reason to select all three controls.
For movement explicitly limited to U, V or N, select that single control. For repositioning along the connection plane without a specified in-plane axis, select translate_u and translate_v only.
Use the editing request and structural context to distinguish sliding along a receiving/supporting surface from moving toward or away from it. Select translate_n for requested separation, normal offset, insertion depth or penetration; do not include it for purely tangential relocation.
If the request fixes one in-plane direction but its correspondence to U or V is unavailable before segmentation, use both in-plane controls and explain that axis ambiguity. Do not pretend you have measured the frame.
Select all three translation controls only when the user explicitly requests unrestricted 3D positioning or independently needs all three directions.
If the direction cannot be determined exactly, use the request and structural context to choose the closest useful minimal movement subset. State the assumed direction and uncertainty in parameter_reason and warnings; do not claim that the frame was measured. Do not enable all axes as a fallback.
The 3D editor displays all three axis arrows for orientation regardless of selected parameters. Axis visibility is not a reason to select a translation control.
Do not add translation controls merely for connection following: repositioning connected parts is automatic.
For is_edit_target=false, always return edit_parameters=[]. A retained unedited region still participates in segmentation, display and automatic following.
For several edited parts, choose controls independently for each. Do not give every part the same controls by default. Do not duplicate IDs.
There are no independent length/width/thickness scales, rotation, bending, taper, hollowing or new-part creation controls. Do not invent IDs or present an approximation as an exact implementation.
For an unsupported operation, choose the closest available shape or position controls toward the user's intended outcome instead of returning an empty list. For every is_edit_target=true part, return at least one available control; keep is_edit_target=false parts empty.
For a request to change only length, width or thickness, offer uniform_scale as an approximation and explicitly warn that all three dimensions change together.
In parameter_reason, explicitly identify every approximate selection as an approximation (近似), explain why it is the closest available choice, what differs from the requested operation, and any additional dimensions or positions that will change. Also put material limitations in warnings. If the match is weak, say so; do not claim rotation, topology changes or new features are supported.
Keep the subset minimal even for approximate edits. Do not add all translations or unrelated controls as a generic fallback. Preserve any other directly supported operations explicitly requested.
For requests asking only for whole-object uniform scaling, use one whole-object region and only uniform_scale.
Use warnings for assumptions or ambiguities that affect this requested decomposition.
Do not propose joints, motion types, point coordinates, new geometry, or code.
Do not claim that whole-model coverage, non-overlap, attachment geometry, or connection preservation has been verified. Those require downstream geometric validation.

In this same response, infer an editing policy from the object name and editing request only. You have no mesh measurements or rendered images.
Set base_part to the exact English name of the central structural body. Do not choose it merely because it appears first in parts or is unedited.
Return connections describing plausible direct relationships between listed parts. Never invent a relationship solely to connect every region.
Use exact part names for parent, child, reference_part and deform_part. Each pair occurs once, even when it attaches at several locations.
parent/child describe structural hierarchy. The base cannot be a child. Each child has at most one parent, with no cycles.
reference_part/deform_part describe closure/extension roles and must be the two endpoints; an edited main body may be the deform_part. For mode="blend", these are semantic fallback roles: the editor applies blending to each edited part's own change and combines contributions from multiple edited parts, rather than fixing one side.
For an attachment edited as an independent component, use relationship="attachment", mode="cap_union" (close cuts, edit, extend and rejoin). A main body and its accessory may be integral in manufacture and still have this editing relationship.
For continuous regions whose transition should remain smooth during editing, use relationship="continuous", mode="blend". Infer continuity semantically; do not claim geometric smoothness was measured.
Give a concise Japanese reason for each choice, referring to the requested edit. Use warnings for ambiguity. These are editable semantic defaults, not verified physical connections.
For a single whole-object region, use that name as base_part and connections=[]. Retain the existing is_edit_target field.
