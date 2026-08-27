# Capability recipe evidence

This project implements Phase 3 of `docs/next-updates-roadmap.md`.

## Implemented

- The canonical inventory covers every public option with an owner, maturity, evidence level,
  freshness state, and limitation.
- The source audit detects TODO branches, placeholders, manual setup, and dependency-only
  candidates.
- Eight named runtime recipes cover the supported ecosystems and publish a versioned capability
  receipt.
- The release receipt embeds runtime evidence and the public web report fails closed on stale,
  malformed, partial, failed, or revision-mismatched evidence.
- The CLI, MCP server, builder, and stack pages read the same inventory.
- Quarantine and maintenance-cost contracts are executable and tested.
- The generated Rust CLI has working `info`, `start`, and `check` branches.
- The generated Go gRPC example passes a real client and server call.
- Hono mounts GraphQL Yoga with Better Auth context.

## Exit gate still open

The eight-recipe workflow must run from a clean committed SHA before Phase 3 can move to
`completed/`. Local focused checks prove the inventory, receipt validation, Go gRPC call, generated
Rust build, and user-facing projections. They cannot create eligible release evidence from the
current dirty worktree.

Move this file to `completed/` only after the `Generated Project Runtime Proof` workflow publishes
one receipt where all eight recipe results pass at their current definition versions.
