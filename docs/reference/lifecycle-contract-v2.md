# Lifecycle contract version 2

Better Fullstack returns a versioned lifecycle object for existing-project plans and results. The
current contract version is `"2"`. The CLI source of truth is
`apps/cli/src/utils/lifecycle-contract.ts`; MCP output schemas are in
`apps/cli/src/utils/mcp-lifecycle-output-schemas.ts`.

## Client rule

A client must read `lifecycle.contractVersion` before it interprets any lifecycle field. MCP clients
can also read `bfs_get_guidance.lifecycleContract` to discover the versions supported by the
running server.

When the version is `"2"`, the client may read the structured fields below. When the version is
unknown, the client must not apply the operation. It should treat the result as unsupported, show
the result as opaque diagnostic data, and require a compatible client or human review. It must not
recover meaning by parsing text messages.

Adding an optional field does not change the contract version. Removing a field, changing a field's
meaning or type, or changing an enum requires a new version. The server may support more than one
version during a migration; `bfs_get_guidance.lifecycleContract.supportedVersions` is authoritative
for that process.

## Version 2 fields

Every lifecycle result includes:

- `operation`, `status`, and `projectDir`.
- `affected.stackParts`, `affected.files`, and `affected.dependencies`.
- `compatibilityDecisions`, `manualReviewReasons`, `checks`, and `warnings`.
- `sideEffects`, with filesystem, package-manager, and toolchain work reported separately.
- `history` and `recovery`, including the recovery identity when one exists.
- `provenance`, `changes`, `blockers`, and `nextActions`.

Operation plans add `review` and `preconditions`. A writing apply must use the exact token from the
current plan. The token is an acknowledgement binding, not an authentication credential.

## Side-effect boundary

The filesystem transaction can restore only its bound paths. A package manager or toolchain can
write caches, lockfiles, downloaded artifacts, or remote state outside that set. Version 2 reports
each such process as a separate side effect and supplies a compensating action when one is known.
Clients must not infer that `status: "rolled-back"` reversed an external process.

## CLI and MCP parity

The CLI exposes lifecycle version 2 in JSON output for the existing-project mutation paths. `gen`
uses `--json` for its plan or apply result. `registry add` uses `--json`. Update, removal, Primary
Role replacement, and `doctor --fix` retain the same structured lifecycle boundary.

MCP exposes the same schemas for project update, stack changes, removal, Primary Role replacement,
graph/config repair, in-project generation, and local registry installation. Each writing workflow
has separate plan and apply tools so an agent never needs to extract approval state from prose.
