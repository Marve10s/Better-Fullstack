# Stack Graph and Configuration Authority

Use this guide for `stackParts`, `bts.jsonc`, graph translation, ownership, compatibility, URL
state, reproducible commands, and any code that projects a stack into a flatter shape.

## Authority

- When `stackParts` exists, it is the authoritative stack graph.
- Top-level config fields are the Legacy Flat Config projection/cache.
- `graphSummary` and `effectiveStack` are derived display data.
- A flat-only config remains supported input and is lifted through
  `legacyProjectConfigToStackParts()`.
- Persisted graph config must be normalized through shared lowering; do not hand-maintain parallel
  flat values.

Changing a flat field without updating the graph is a bug even if one interface appears correct.

## Stack Part Identity

A Stack Part is identified by:

- its role;
- ecosystem adapter;
- tool ID;
- optional owner;
- explicit ID when a named service must remain stable;
- source: selected, inferred, or provided.

Primary Role parts have no owner. Capability Role parts usually carry `ownerPartId`. A Provided
Capability is derived and must not be serialized as if the user independently selected it.

## Ownership Rules

- Preserve explicit primary IDs for named services.
- Recompute canonical primary IDs when replacing their selected tool.
- Keep a Capability Role attached to its existing owner during updates.
- Remove scoped capabilities whose owner no longer exists.
- Do not merge same-role capabilities across different owners.
- Do not infer owner identity from array position or project-level ecosystem.
- A standalone database Primary Role is distinct from a database Capability Role owned by a
  backend/frontend.

Multi-backend and multi-ecosystem stacks make owner loss a correctness defect, not a display issue.

## Provided Capabilities

- Derive Provided Capabilities from selected parts and graph rules.
- Exclude provided parts from reproducible user selections.
- Never ask the user to choose a capability already supplied by a selected part.
- Recompute provided parts after mutations; do not preserve stale provided entries.
- Compatibility checks must evaluate the effective graph, including provided behavior.

## `none` and Empty Values

- `none` is a user-facing disable value, not a real generated Stack Part.
- Filter `none` from persisted selected parts.
- For multi-select Legacy Flat Config fields, explicit `none` means an empty selection.
- Do not confuse “no independent capability selected” with “capability absent”; it may be provided.
- Ecosystem-specific fields for ecosystems not represented by selected parts must normalize to
  their empty/default values.

## Projection Rules

Every graph mutation must keep these projections consistent where applicable:

- `bts.jsonc`;
- reproducible CLI commands;
- CLI prompts and summaries;
- MCP schema, guidance, plan, and apply responses;
- builder state and share URLs;
- preview/download config;
- history entries;
- public schema/option reference;
- telemetry’s bounded graph dimensions.

Prefer shared translation helpers over new mapping tables. If a projection needs information the
graph does not express, extend the graph contract instead of hiding state in a consumer.

## Compatibility

- Graph-native compatibility is authoritative for graph-shaped stacks.
- Legacy compatibility remains a supported projection/fallback, not a second policy.
- Disabled reasons explain impossible selections before mutation.
- Auto-adjustments may repair safe dependent choices and must be reported.
- Hard blocks protect combinations that cannot produce coherent output.
- Architecture replacements such as database, ORM, auth, API, or backend require explicit
  migration warnings; adding a previously absent capability should remain frictionless.

Never encode compatibility only in prompt filtering. Non-interactive CLI, MCP, URLs, and persisted
config can bypass prompts.

## Mutation Rules

- Start from the current graph when present.
- Merge requested Stack Part specs with non-provided current selections.
- When flat changes arrive for graph config, identify affected parts through their projection keys.
- Preserve unaffected parts, including custom IDs and owner scope.
- Replace affected parts, then re-derive missing graph parts from the proposed config.
- Prune orphaned scoped specs.
- Normalize, validate, and project only after the final graph is known.

Do not rebuild a multi-service graph solely from Legacy Flat Config; the projection cannot preserve
all owner identity.

## Settings

Part-specific settings belong with the part they configure when the graph models them. Temporary
Legacy Flat Config exceptions must:

- have one documented normalization path;
- preserve explicit graph values;
- not overwrite graph-bound values during persistence;
- include a migration path toward part-scoped settings.

## Tests

At minimum, cover:

- graph creation and canonical IDs;
- lowering to Legacy Flat Config;
- lifting flat config;
- provided capability derivation;
- multiple owners with the same Capability Role;
- replacement while preserving custom IDs;
- orphan pruning;
- `none` behavior;
- compatibility parity between graph and legacy entrypoints;
- reproducible command and builder URL round trips.

For release-sensitive graph changes, run `bun run test:release`.

## Review Traps

- A green single-ecosystem test does not prove owner preservation.
- Matching visible labels does not prove stable canonical IDs.
- Correct `bts.jsonc` flat fields do not prove `stackParts` is correct.
- Prompt behavior does not prove MCP or URL behavior.
- Snapshot changes do not prove round-trip identity.
