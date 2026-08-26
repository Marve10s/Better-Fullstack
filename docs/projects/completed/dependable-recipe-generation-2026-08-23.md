# Dependable recipe generation

This record covers Phase 5 of the canonical product roadmap.

## Shipped behavior

- Recipe generation now resolves registered adapters with declared support, maintenance ownership,
  demand evidence, a golden verification recipe, owned artifacts, checks, and migration guidance.
- Framework-specific planning lives in adapters. The command handler runs one shared review-token,
  transaction, rollback, recovery, and lifecycle-result contract.
- Syntax discovery and hash-validated managed regions replace string-anchor edits. Full generated
  files and exact shared-region entries have separate ownership, so multiple recipes remain valid.
- The initial persistent TypeScript adapter generates a tRPC CRUD router, Drizzle SQLite schema,
  database query service, shared registrations, integration test, and local recipe guide. Better
  Auth projects use protected procedures; projects without auth use public procedures.
- `.better-fullstack/recipes/` records adapter versions, evidence, ownership, checks, and exact
  artifact hashes. `recipes check` verifies ownership. `recipes history` links records to recovery
  points.
- Generated `AGENTS.md` and `CLAUDE.md` documents now contain Stack Part ownership, evidence,
  installed-version authority, compatibility rules, and lifecycle-safe commands. Recipe additions
  update one hash-validated region.
- CLI `context --json` and MCP `bfs_get_project_context` return the same bounded versioned document
  without source code. Commands use a relative project path when possible, or an absolute path
  when that is required to target the inspected project.

## Verification

Focused tests prove tRPC and oRPC generation, authentication selection, planning without writes,
stale-token rejection, missing-anchor failure, exact managed ownership, two recipes sharing the
same regions, idempotency, every write-boundary rollback, registry admission, agent context, and
CLI/MCP structured parity.

`bun run test:recipe-runtime` generated a fresh project, installed its dependencies, applied the
Drizzle schema to a disposable SQLite database, executed the generated CRUD flow through tRPC, and
passed recipe ownership checks. The generated-project runtime workflow now runs that proof in CI.

The adapter registry still contains only the existing TypeScript paths. New adapters require
measured repeated demand and a named runtime verification maintainer before implementation.
