# Recipe generation contract

This reference records the Phase 5 design for dependable post-scaffold generation. Product
priority remains in `docs/next-updates-roadmap.md`.

## Authority

The adapter registry owns recipe support. The `gen` command selects an adapter and runs the shared
mutation workflow. It does not contain framework-specific templates or entry-point editing rules.

Each adapter declares an ID, adapter version, supported recipe kinds, maintenance owner, demand
evidence, golden verification recipe, Stack Part owner, persistent boundary, planned artifacts,
verification checks, and migration guidance. Registry validation rejects duplicate IDs or missing
admission evidence.

The initial persistent adapter supports Bun-managed TypeScript monorepos with tRPC, Drizzle,
SQLite, and either Better Auth or no authentication. The existing TypeScript tRPC/oRPC in-memory
behavior remains a bounded fallback. Other stacks fail with the reasons returned by each adapter.

## Mutation workflow

Planning resolves the adapter, validates syntax-aware anchors and managed-region hashes, computes
exact postimages and preimage hashes, prepares agent-context updates, and adds a deterministic
recipe record. The review token binds the project, recipe, adapter version, paths, actions,
preimages, and postimages.

Apply recomputes the plan. It accepts only the exact current token and writes every artifact through
one project transaction. The recovery point covers the entire vertical slice. A failure at any
write boundary restores all bound preimages.

Full generated files belong to one recipe and use whole-file hashes. Shared router, schema, and
agent-document regions use hash-validated markers. A recipe records and validates only its exact
entry within the shared region, so later recipes can add entries without invalidating prior
ownership. User code outside managed regions is never rewritten.

## Local records and checks

Apply stores schema-versioned records under `.better-fullstack/recipes/`. A record contains the
adapter and recipe versions, maintainer, demand evidence, owning Stack Part, persistence status,
owned artifacts, verification checks, and migration guidance.

`recipes check` verifies whole-file hashes, managed-region integrity, and exact owned entries. It is
read-only and does not execute declared commands. Runtime verification remains explicit because it
can install dependencies, migrate a database, or execute application code. `recipes history`
correlates records with the generic `gen` recovery transactions.

## Runtime proof

`bun run test:recipe-runtime` generates a fresh supported project from current embedded templates,
applies the reviewed resource recipe, installs the generated dependencies, applies the Drizzle
schema to a disposable SQLite database, executes the generated tRPC CRUD integration test, and
checks recipe ownership. The generated-project proof workflow runs this lane in CI.

## Agent context

Generated `AGENTS.md` and `CLAUDE.md` files name current Stack Parts, ownership, evidence,
installed-version authority, compatibility boundaries, and lifecycle-safe commands. Recipe updates
use one managed region in existing documents.

CLI `context --json` and MCP `bfs_get_project_context` call the same service. Its schema-versioned
document contains roles, capabilities, evidence, version references, compatibility results,
recipes, commands, update support, and safe next actions. It excludes source code and absolute
project paths.
