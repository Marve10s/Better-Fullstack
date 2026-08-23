# Existing-project Stack Graph workflows

This record covers the Phase 4 work that turned Stack Graph authority into repair, replacement,
local import, and comparison workflows.

## Shipped behavior

- The CLI `replace` command and matching MCP plan/apply tools replace one exact frontend, backend,
  mobile, or database Primary Role. They preserve stable custom IDs, rewire compatible owned
  capabilities, report migration and application-data boundaries, and use the stack-update
  transaction and recovery path.
- Automatic cross-ecosystem replacement stops when an owner-scoped capability belongs to the old
  ecosystem. The user must remove or replace that capability in a separate reviewed operation.
- `doctor --fix` and its MCP tools derive a canonical `bts.jsonc` from the authoritative Stack
  Graph. Planning is read-only. Apply requires the exact current-state token, binds only
  `bts.jsonc`, and records a recoverable preimage.
- The web builder reads `bts.jsonc` through the browser `File` API. It performs JSONC and schema
  validation locally, rejects invalid graph ownership, ignores stale flat compatibility caches,
  and never uploads or writes the project file.
- Imported configs use the shared update-support evaluator. The web view exposes the same
  eligibility, reason code, reason, and manual-review requirement as CLI and MCP reports.
- Saved and imported stack comparisons classify additions, removals, replacements, owner changes,
  and evidence changes before a user loads a saved stack or copies an imported command.

## Verification

Focused tests cover config repair planning, stale-token rejection, bounded apply and recovery,
canonical no-op behavior, frontend and mobile replacement, stable identity, owner rewiring, the
cross-ecosystem boundary, MCP plan/apply parity, local JSONC import, stale-cache precedence, shared
update eligibility, and graph comparison classification.

The browser workflow remains read-only until the user chooses `Copy CLI command` or `Load in
builder`. Loading changes only browser builder state. Project mutation still happens through a
reviewed CLI or MCP lifecycle operation.
