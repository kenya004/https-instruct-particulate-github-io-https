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
Use warnings for assumptions or ambiguities that affect this requested decomposition.
Do not propose joints, motion types, point coordinates, new geometry, or code.
Do not claim that whole-model coverage, non-overlap, attachment geometry, or connection preservation has been verified. Those require downstream geometric validation.

In this same response, infer an editing policy from the object name and editing request only. You have no mesh measurements or rendered images.
Set base_part to the exact English name of the central structural body. Do not choose it merely because it appears first in parts or is unedited.
Return connections describing plausible direct relationships between listed parts. Never invent a relationship solely to connect every region.
Use exact part names for parent, child, reference_part and deform_part. Each pair occurs once, even when it attaches at several locations.
parent/child describe structural hierarchy. The base cannot be a child. Each child has at most one parent, with no cycles.
reference_part/deform_part describe this edit: hold the reference boundary as the target and deform the other part. They must be the two endpoints; an edited main body may be the deform_part.
For an attachment edited as an independent component, use relationship="attachment", mode="cap_union" (close cuts, edit, extend and rejoin). A main body and its accessory may be integral in manufacture and still have this editing relationship.
For continuous regions whose transition should remain smooth during editing, use relationship="continuous", mode="blend". Infer continuity semantically; do not claim geometric smoothness was measured.
Give a concise Japanese reason for each choice, referring to the requested edit. Use warnings for ambiguity. These are editable semantic defaults, not verified physical connections.
For a single whole-object region, use that name as base_part and connections=[]. Retain the existing is_edit_target field.
