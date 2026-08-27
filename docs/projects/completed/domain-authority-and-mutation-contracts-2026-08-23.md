# Domain authority and mutation contracts

Completed on 2026-08-23. This project delivered roadmap Phase 2.

## Domain authority

`stackParts` is authoritative whenever a graph is present. Legacy flat fields remain a bounded
compatibility projection for templates, older config readers, and command flags.

The seven `shadcn*` settings belong to the selected TypeScript `ui` Stack Part whose tool is
`shadcn-ui`. `astroIntegration` belongs to the selected TypeScript Astro frontend Stack Part.
Typed Stack Part settings reject either group on the wrong owner. Old flat configs migrate missing
values once; explicit graph settings win over stale flat cache fields.

`elixirJson` remains explicit project metadata. Plain Elixir projects can select it without a
backend owner, so it does not belong to a Stack Part. The Stack Part schema rejects it in settings.

Graph-to-flat-to-graph projections retain named services, multiple owners, scoped databases,
mobile and web clients, provided capabilities, custom target paths, unknown future settings, and
source identity. Property and deterministic matrix tests cover schema, URL, command, manifest, and
capability-replacement paths.

Compatibility decisions now come from the shared graph and capability rules. CLI, web, generator,
and MCP use the same reason formatter and replacement alternatives.

## Mutation contracts

The audit in `docs/reference/existing-project-mutation-audit.md` proved that stack update and
scaffold update already shared the project transaction while retaining different domain planners.
It also found direct writes in `gen` and local registry installation.

Lifecycle contract version 2 now represents affected Stack Parts, files, dependencies,
compatibility decisions, manual-review reasons, checks, history, warnings, recovery identity, and
external side effects. CLI JSON and MCP expose the same generation and local-registry plan/apply
workflows. Client compatibility rules live in `docs/reference/lifecycle-contract-v2.md`.

`gen` now plans the resource and router edit before writing, rejects a missing or stale router
anchor, requires the exact review token, and applies both files in one recovery transaction.

Local registry installation now plans pack files, dependency manifests, environment edits, the
registry lock, and `bts.jsonc`. It requires the exact review token and applies every final byte in
one recovery transaction. Remote sources remain rejected.

Package-manager and toolchain work is reported separately from filesystem state. A failed install
does not claim to be rolled back with generated files. The result records the status and the
remaining action.

## Verification

The release guard includes the mutation audit validator and focused mutation contract suite. Tests
cover stale tokens, snapshot failure, every generation and registry write boundary, disk-write
failure, interrupted-process recovery, dependency-install failure, CLI JSON, and MCP parity.

The graph suite covers owner preservation, settings authority, multi-service graphs, scoped
databases, web plus mobile clients, capability replacement, and round trips across each supported
projection.
