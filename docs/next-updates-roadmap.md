# Better Fullstack product roadmap

> **Canonical roadmap, updated 2026-08-23.** This document is derived from the current CLI,
> Stack Graph, templates, web builder, MCP server, workflows, tests, and telemetry code. Older
> feature plans are implementation history or depth backlogs. When they disagree with this file,
> this file wins.

Execution records follow the [project lifecycle](projects/README.md). Production telemetry work
follows the [backend runbook](../packages/backend/README.md).

## Product decision

Better Fullstack should become the lifecycle system for full-stack projects, not a catalog that
stops after scaffolding. Its core promise is:

**choose -> create -> understand -> change -> verify -> upgrade -> recover**

A user or coding agent should be able to inspect a project, propose a deterministic change, review
the exact effect, apply it safely, and prove the result works. The tool should never claim more
than its current evidence supports.

This produces three product priorities:

1. Prove the current product before expanding the catalog.
2. Make updates and recovery the source of repeat value.
3. Give humans, CI, and coding agents the same typed lifecycle contracts.

Theoretical combination count is not a product metric. A smaller set of runtime-verified recipes
is more valuable than a large set of combinations that only generate files.

## Shipped foundation

- Eight ecosystem surfaces: TypeScript, React Native, Rust, Python, Go, Java, Elixir, and .NET,
  plus universal database parts.
- A multi-ecosystem Stack Graph with Primary Roles, Capability Roles, Provided Capabilities, and
  compatibility rules.
- A visual builder with command generation, preview, shareable URL state, saved stacks, and ZIP
  downloads that contain `bts.jsonc` and a manifest-v2 baseline.
- CLI commands for `create`, `status`, `add`, `remove`, `update`, `check`/`doctor`, `gen`,
  `registry`, `recommend`, `history`, and `mcp`.
- Preview-first stack changes, token-bound apply, three-way scaffold updates, recovery points, and
  operation history.
- MCP tools, an installable coding-agent plugin, and generated project instructions.
- Release guards, generated-project smoke workflows, published-package checks, and verification
  evidence machinery.
- Privacy-bounded aggregate telemetry and an operator-only internal decision room.

## Current truth

The next phase starts from these observed constraints, not from feature counts.

| Area                  | Current state                                                                                                                                                                                     | Product consequence                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| Public verification   | The generated evidence document currently reports 0 of 12 PR core smoke cases, no release-guard receipt, and no published-package receipt.                                                         | Verification must become a current CI artifact before it can support a public quality claim.       |
| Release publication   | The release workflow can tag and create a GitHub release before all packages are built, published, and smoke-tested. It does not consume the full required CI result for the exact SHA.           | Publication needs an exact-SHA, resumable state model before verification evidence can be trusted. |
| Ecosystem coverage    | The smoke and template matrices do not present one consistent proof across all eight ecosystem surfaces.                                                                                          | Start with one representative core recipe per ecosystem, including React Native and .NET.          |
| Update window         | Existing cross-version fixtures are provenance-only and explicitly unupgradeable. External validation adopted a fresh manifest-v2 baseline rather than upgrading from an older published release. | Do not advertise a historical support window yet. Build executable release fixtures first.         |
| Mutation safety       | `add`, `remove`, and `update` use preview and recovery safeguards. `gen` and local `registry` writes do not use the same operation model.                                                         | One mutation contract must cover every command that changes a project.                             |
| Runtime truth         | Several tests prove files, dependencies, or source strings rather than live framework behavior. Some generated surfaces still contain follow-up setup or placeholder behavior.                    | Classify evidence and add runtime proofs for the recipes users are told to trust.                  |
| Stack Graph authority | Project metadata, the `shadcn*` settings cluster, and `elixirJson` remain outside full graph authority.                                                                                           | Settle the remaining settings model before adding more projections or direct graph editing.        |
| MCP contracts         | Several tools return structured content without declaring an output schema.                                                                                                                       | Every structured tool needs the same versioned contract used by CLI JSON.                          |
| Production feedback   | The telemetry implementation is present, but activation and reconciliation remain operator-only work.                                                                                             | Product bets should wait for a successful operator drill and enough decision coverage.             |
| Planning state        | Active and backlog documents still describe some shipped work as unfinished.                                                                                                                      | Planning-state reconciliation must be part of the release process.                                 |

## Implementation status

The repository implementation for Phases 0 through 6 is complete as of 2026-08-23. The local
contracts, generators, lifecycle paths, shared client surfaces, evidence machinery, recipe proof,
recommendation evaluation, and decision-coverage aggregation have executable tests.

Three exit conditions require evidence outside this working tree and remain open:

1. The historical update window needs fixtures from two consecutive published manifest-v2
   releases.
2. The eight-ecosystem runtime claim needs a clean-SHA receipt produced by the release workflow.
3. Production telemetry needs the maintenance-owner drill and at least 80 percent covered eligible
   decisions before it can justify a product expansion.

These gates do not invalidate the local implementation. They prevent local tests from being
reported as published-release or production proof.

## Dependency map

```text
Required CI and release truth
  -> public build evidence
  -> executable release fixtures
      -> supported update window

Stack Graph authority + transaction gap audit
  -> consistent lifecycle contracts and projections
      -> safe generation and local registry writes
          -> runtime-verified recipe depth
              -> import, compare, replace, and policy workflows

Telemetry activation
  -> evidence-backed demand decisions
      -> conditional registry, ecosystem, and hosted-service bets
```

The phases below are ordered by dependency, not by calendar date. A phase may start early when its
dependencies are satisfied, but it should not bypass its exit gate.

## Phase 0: make every claim reproducible

Goal: a release, documentation claim, badge, and roadmap state must be traceable to the exact code
and package artifacts that produced it.

| ID    | Task                                                                                                                                                                                                                                                                                                             | Done when                                                                                                                                                                                                                                                                                                     |
| ----- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T0.1  | Reconcile project documents against executable behavior. Move shipped manifest-v2, history, recovery, and constrained single-app work out of active or backlog plans. Re-audit Java Actuator and similar depth items before retaining them.                                                                      | `docs/projects/` contains only accepted unfinished outcomes, completed work has a historical home, and the planning-state tests pass.                                                                                                                                                                         |
| T0.2  | Perform the telemetry maintenance-owner activation, bounded reconciliation, and exact-deployment legacy quarantine drills from the backend runbook. Preserve the retired deployment and its historical data.                                                                                                     | The maintenance owner records the production identities, activation result, reconciliation result or reviewed dry run, export location, and rollback path. Both `POST /track` and `OPTIONS /track` return `410` without CORS, and event counts remain unchanged.                                              |
| T0.3  | Define public capability evidence levels: `listed`, `generated`, `build-verified`, and `runtime-verified`. Remove language that treats dependency presence or theoretical compatibility as runtime proof.                                                                                                        | CLI, web, MCP, and docs use the same definitions and do not display a higher level than the evidence receipt allows.                                                                                                                                                                                          |
| T0.4  | Refactor release publication into a resumable state model. Consume successful required CI for the exact SHA, build and verify all package tarballs before publication, preflight every package and version, publish exact artifacts, run installed-package smoke checks, then create the tag and GitHub release. | A failed release resumes without rebuilding different bytes or silently skipping a partially published package. Fault injection at every irreversible boundary cannot produce a success tag or GitHub release. Authoritative toolchain versions are pinned; floating versions run only as an advisory canary. |
| T0.5  | Produce an immutable verification receipt for the exact commit and release candidate. Include the required-CI run, commit SHA, pinned toolchain, schema and template versions, package versions, matrix cases, timestamps, and results.                                                                          | CI creates the receipt from clean inputs and rejects missing, dirty, partial, stale, or mismatched evidence. The release consumes that exact receipt rather than rerunning a narrower substitute.                                                                                                             |
| T0.6  | Unify the core build-proof matrix. Add one representative clean install and build case for each of the eight ecosystem surfaces.                                                                                                                                                                                 | The matrix covers TypeScript, React Native, Rust, Python, Go, Java, Elixir, and .NET on the exact release candidate. Failures identify the Stack Part and failed stage. Runtime behavior remains a separate Phase 3 evidence level.                                                                           |
| T0.7  | Publish a verification page and badge from the current receipt. Keep product verification separate from Fixproof results.                                                                                                                                                                                          | A user can see what passed, what was not run, evidence age, commit, package version, and maturity level. Missing evidence renders non-green.                                                                                                                                                                  |
| T0.8  | Add a privacy-safe support bundle and structured issue forms. Reuse `doctor --json` data, redact paths and raw errors, and require consent before copying anything.                                                                                                                                              | A failed operation can produce a bounded report containing versions, selected Stack Part identifiers, lifecycle state, and redacted diagnostics, with no source, prompts, secrets, environment values, URLs, or personal paths.                                                                               |
| T0.9  | Make planning and public-claim checks part of the release guard.                                                                                                                                                                                                                                                 | A release fails when canonical docs contradict shipped behavior, evidence refers to another commit, or a public maturity label exceeds its receipt.                                                                                                                                                           |
| T0.10 | Add output schemas and contract tests for every existing MCP tool that returns structured content. Share response types with CLI JSON where the underlying service is shared.                                                                                                                                    | Status, check, removal, project update, recovery, and stack update success and failure payloads validate against declared schemas.                                                                                                                                                                            |

### Phase 0 exit gate

- One release candidate consumes successful required CI for its exact SHA and completes the new
  prepublication sequence from clean tarballs.
- The public verification artifact is generated by CI for the current commit and covers all eight
  ecosystem surfaces at its declared evidence level.
- Telemetry operations have recorded activation, reconciliation, export, and exact-deployment
  quarantine results. Both legacy tracking request methods return `410` without mutation or CORS.
- Active and backlog documents contain no known shipped outcomes.
- Every current MCP structured response validates against its declared output schema.

## Phase 1: establish a real supported update window

Goal: turn `update` from a same-baseline recovery tool into a versioned product contract.

| ID   | Task                                                                                                                                                                                                                                                                            | Done when                                                                                                                                                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T1.1 | Archive an executable scaffold fixture for every manifest-v2 release. Record the exact CLI, generator, template set, schema, lockfile, and package provenance needed to replay it.                                                                                              | The release workflow stores a fixture that a later checkout can actually upgrade, not only inspect.                                                                                                                                          |
| T1.2 | Define a rolling support policy. State which source releases can update to which targets, how long the window lasts, and what happens outside it.                                                                                                                               | The policy is machine-readable and documented. No historical window is advertised until two consecutive manifest-v2 releases pass it.                                                                                                        |
| T1.3 | Build a cross-version harness that installs the source release, creates the fixture, applies realistic user edits, upgrades with the target release, and verifies build plus recovery.                                                                                          | CI exercises the oldest and newest releases in the supported window and proves byte-exact recovery of managed files.                                                                                                                         |
| T1.4 | Cover merge and filesystem outcomes, not only happy paths. Include clean auto-merge, user-only edits, generator-only edits, compatible dual edits, conflicts, deleted files, renamed files, missing baselines, interrupted apply, and failed writes.                            | Each case has a declared result, keeps user work, and produces a useful plan or recovery path.                                                                                                                                               |
| T1.5 | Expose `supportedFrom`, `supportedTo`, eligibility, reason, and required manual review in the shared project report.                                                                                                                                                            | Human CLI output, `--json`, and MCP derive the same answer from one service. Web parity follows the local import task in Phase 4.                                                                                                            |
| T1.6 | Add recovery discovery and retention commands. Support list, show, apply, verify, and prune operations with integrity checks.                                                                                                                                                   | Users can recover without copying a UUID from lost terminal output, and pruning cannot delete the only valid recovery point for an unfinished operation.                                                                                     |
| T1.7 | Run two separate qualification cohorts. Use fixtures created by each published source release to prove historical compatibility. Use adopted public repositories only to stress user edits, planning, apply, and recovery. Keep the 2026-08-12 exercise in the second category. | Published-binary fixtures cover the declared window across representative ecosystems. At least 20 adopted public repositories complete plan, apply, and exact recovery with no lost user changes, without being labeled historical upgrades. |
| T1.8 | Add an opt-in GitHub Action for `update --check`. It may open a pull request only when the plan is eligible, deterministic, conflict-free, and verified.                                                                                                                        | The action never pushes directly to a protected branch, never applies a manual-review plan, and attaches the verification receipt to its pull request.                                                                                       |
| T1.9 | Design a read-only adoption flow for projects created before manifest v2. Detect likely Stack Parts, show uncertainty, and require explicit confirmation before writing a baseline.                                                                                             | Adoption records unverified lineage and never presents inferred history as a supported upgrade.                                                                                                                                              |

### Phase 1 exit gate

- Two consecutive manifest-v2 releases pass the executable cross-version matrix.
- The supported window is visible and identical in CLI human output, CLI JSON, and MCP.
- Published-binary fixtures prove the historical window. The adopted-repository cohort separately
  proves planning, user-edit handling, apply, and exact recovery.
- Every supported upgrade outcome can be previewed, verified, and recovered.

## Phase 2: settle domain authority and mutation contracts

Goal: one domain model should drive project changes, and every existing-project write should follow
the same safety invariants where its side effects allow it.

The repository already shares `project-transaction` recovery across stack and scaffold updates, and
`add` and `remove` already use the stack-update planner. This phase starts with a gap audit. It does
not assume that a new Project Mutation module or a forced merge of distinct update engines is the
right answer.

Complete the Stack Graph authority work in T2.1 through T2.5 before consolidating lifecycle
contracts in T2.7. This prevents a shared contract from encoding Legacy Flat Config ambiguity.

| ID    | Task                                                                                                                                                                                                                           | Done when                                                                                                                                                          |
| ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| T2.1  | Decide authority for the `shadcn*` settings cluster. Model settings on the owning Stack Part or record a narrow, documented reason they remain project metadata.                                                               | Create, update, URL state, manifests, and previews preserve one authoritative value.                                                                               |
| T2.2  | Decide authority for `elixirJson` and any remaining ecosystem-specific settings outside the graph.                                                                                                                             | The setting has one owning Stack Part or one explicit project-metadata boundary, with no competing flat mutation path.                                             |
| T2.3  | Inventory and remove graph-to-flat round trips that can change meaning. Keep Legacy Flat Config only as a bounded compatibility projection.                                                                                    | Direct graph mutations remain stable after every supported projection and reload.                                                                                  |
| T2.4  | Consolidate compatibility rules and alternatives around Role Bindings and Provided Capabilities.                                                                                                                               | CLI, web, generator, and MCP return the same reason and suggested replacement for the same invalid graph.                                                          |
| T2.5  | Add property tests for multi-owner databases, multiple services, mobile plus web clients, capability replacement, and option round trips.                                                                                      | Generated graphs preserve owning Stack Parts, bindings, capabilities, and settings across schema, URL, command, and manifest projections.                          |
| T2.6  | Audit the existing transaction and lifecycle-contract modules. Map preview, review-token, preimage, write, history, recovery, and package-manager behavior for `add`, `remove`, `update`, `gen`, and local `registry`.         | The audit identifies proven drift, duplication, and uncovered side-effect boundaries without proposing a replacement for behavior that is already shared.          |
| T2.7  | Consolidate versioned operation-plan and result contracts where T2.6 proves drift. Include affected Stack Parts, files, dependencies, compatibility decisions, manual-review reasons, checks, recovery identity, and warnings. | CLI JSON and MCP can represent every existing-project mutation without command-specific prose parsing or unnecessary coupling between distinct engines.            |
| T2.8  | Resolve the audited gaps at the narrowest stable boundary. Preserve the existing transaction primitive and keep stack-update and scaffold-update logic separate when their domain rules differ.                                | Duplicate safety logic identified by T2.6 is removed, while current `add`, `remove`, and `update` behavior remains covered by contract tests.                      |
| T2.9  | Move `gen` writes behind preview and token-bound apply before expanding the command.                                                                                                                                           | Generation plans show every file and router or entry-point edit, stale anchors fail before writes, and partial writes have a recovery path.                        |
| T2.10 | Move current local `registry` installation behind plan, token-bound apply, and recovery before accepting remote sources.                                                                                                       | Current local pack files, dependency changes, and metadata merges are inspectable and recoverable. Registry-specific update and uninstall remain conditional bets. |
| T2.11 | Separate filesystem transactions from package-manager and toolchain side effects. Record preconditions and compensating actions rather than claiming full atomicity where it is impossible.                                    | A failure report says which files were restored, which external side effects occurred, and which manual action remains.                                            |
| T2.12 | Add fault-injection tests at each write and side-effect boundary.                                                                                                                                                              | Tests prove no user file is silently lost when a process stops, a disk write fails, a dependency install fails, or a review token becomes stale.                   |
| T2.13 | Version lifecycle contracts and document compatibility rules for agent clients.                                                                                                                                                | A client can detect a breaking schema change and fall back without parsing prose.                                                                                  |

### Phase 2 exit gate

- Every selectable setting has one documented authority, and supported projections preserve graph
  meaning.
- Existing-project writing commands follow documented preview, approval, history, and recovery
  invariants within their stated side-effect boundaries.
- `gen` and current local `registry` writes use plan and bounded recovery.
- Fault-injection tests prove bounded recovery for filesystem writes and precise reporting for
  external side effects.

## Phase 3: replace catalog confidence with recipe evidence

Goal: users should know which outcomes are generated, which build, and which have executed their
advertised behavior.

| ID   | Task                                                                                                                                                                                                                                                       | Done when                                                                                                                                              |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| T3.1 | Inventory every Stack Part and recipe by evidence level. Detect TODO branches, placeholder generated files, dependency-only integrations, and post-create manual setup.                                                                                    | Every public option has a maintenance owner, maturity level, last verified version, and an honest limitation or is removed from the supported surface. |
| T3.2 | Promote one Phase 0 build-proof case per ecosystem into a golden runtime recipe. Prefer common, maintainable paths over maximum feature count.                                                                                                             | Each ecosystem has a named recipe with exact generation inputs, expected commands, and a runtime assertion beyond install or build.                    |
| T3.3 | Prove generated command behavior where files and builds are insufficient. Start with Rust CLI command branches, Go gRPC generation after reproducing its current behavior, GraphQL server mounting, auth flows, database migrations, and health endpoints. | The test calls the generated behavior through its real boundary and fails when the integration is only present on disk.                                |
| T3.4 | Route existing quality backlogs through the evidence model. Reproduce Rust Kafka, Java Actuator, Elixir database, mobile backend, payment, and raw SQL claims before fixing or closing them.                                                               | Each retained item names the failed evidence stage and the recipe needed to close it.                                                                  |
| T3.5 | Show evidence next to choices in builder, CLI, MCP, and generated stack pages. Explain disabled or lower-maturity options using structured compatibility reasons.                                                                                          | Users can distinguish stable paths from experimental paths before generating a project.                                                                |
| T3.6 | Automatically downgrade stale evidence when templates, schema, toolchain versions, or relevant dependencies change.                                                                                                                                        | A previously green badge cannot survive a material producer change without a new receipt.                                                              |
| T3.7 | Add a quarantine path for failing options. Keep the schema history, but hide or mark an option experimental until its verification maintainer restores the declared evidence level.                                                                        | A known-broken option cannot remain presented as runtime-verified.                                                                                     |
| T3.8 | Measure maintenance cost per verified recipe. Include flaky runs, repair time, dependency churn, and verification-maintainer coverage.                                                                                                                     | Catalog decisions account for recurring proof cost, not only initial implementation cost.                                                              |

### Phase 3 exit gate

- Every public Stack Part has an evidence level and current maintenance owner.
- All eight golden recipes build from clean installs and pass their declared runtime assertion.
- Public surfaces display evidence freshness and fail closed after relevant changes.
- No supported option relies on package presence or source-string checks as its only proof.

## Phase 4: turn graph authority into existing-project workflows

Goal: use the settled Stack Graph and lifecycle contracts to help users inspect, repair, compare,
and replace project architecture safely.

| ID   | Task                                                                                                                                                                                                                                                                    | Done when                                                                                                                                   |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| T4.1 | Reproduce the remaining Primary Role replacement gaps before scheduling implementation. Check frontend and mobile replacement, stable identity rewiring, and owner-scoped dependent capabilities. Preserve the existing replacement plans and application-data warning. | Proven missing cases receive bounded tasks. Cases already handled by stack update move to completed history instead of being reimplemented. |
| T4.2 | Add safe `doctor --fix` plans for graph/config drift. Use the Phase 2 mutation contracts rather than writing during diagnosis.                                                                                                                                          | Every fix is previewable, token-bound, and recoverable within its stated boundary.                                                          |
| T4.3 | Add local builder import for `bts.jsonc`. Parse locally, show the imported Stack Graph and diagnostics, and require explicit export or CLI apply.                                                                                                                       | A user can understand an existing configuration without uploading project files or granting the browser filesystem write access.            |
| T4.4 | Add web projection of the Phase 1 supported update window after local import exists.                                                                                                                                                                                    | Builder import, CLI human output, CLI JSON, and MCP show the same eligibility, reason, and manual-review requirement.                       |
| T4.5 | Add compare views for saved stacks and imported configs. Show Stack Part additions, removals, replacements, owning-Stack-Part changes, and evidence changes.                                                                                                            | Users can review architectural change before copying a command or applying a project mutation.                                              |

### Phase 4 exit gate

- Unhandled Primary Role replacement cases are documented and either implemented or explicitly
  outside the automatic-migration boundary.
- Diagnosis never writes without a reviewed mutation plan.
- Existing-project import remains local and read-only until the user chooses an explicit action.
- Supported-window and comparison results remain identical across their shared projections.

## Phase 5: make post-scaffold generation dependable

Goal: generate working vertical slices inside an existing project without fragile string edits.

Do not expand `gen` by ecosystem count first. Its current TypeScript tRPC/oRPC resource path is
in-memory and edits entry points through source anchors. Reliability and persistence should come
before more adapters.

| ID   | Task                                                                                                                                                                                                    | Done when                                                                                                                                                                       |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T5.1 | Create a Recipe Generation design around registered ecosystem adapters, declared inputs, owned files, structured edits, idempotency, checks, and undo.                                                  | The design supports the current TypeScript path without embedding framework rules in the command handler.                                                                       |
| T5.2 | Replace regex or string-anchor entry-point edits with framework-aware transforms or managed regions that detect user changes.                                                                           | Re-running a recipe is idempotent, missing anchors fail during planning, and user code outside owned regions is untouched.                                                      |
| T5.3 | Ship one persistence-aware TypeScript vertical slice. When a supported database and ORM are selected, generate schema, migration guidance, service/router logic, validation, and a client example.      | A generated create/read/update/delete flow runs against the selected persistence layer and passes an integration test.                                                          |
| T5.4 | Add recipe-level plan, apply, check, history, and recovery through the Phase 2 mutation contracts.                                                                                                      | A user or agent can preview and undo the complete slice as one operation.                                                                                                       |
| T5.5 | Extend the existing generated `AGENTS.md` and `CLAUDE.md` context. Add owning Stack Parts, evidence, installed-version references, owned paths, compatibility rules, and lifecycle-safe regeneration.   | Existing generated instructions stay current after supported project mutations and point coding agents at local, version-matched context where licenses and packaging allow it. |
| T5.6 | Add a deterministic `context` or `explain --json` surface for tools. It should report project roles, capabilities, commands, evidence, owning Stack Parts, and safe next actions without exposing code. | CLI and MCP return the same bounded, versioned context document.                                                                                                                |
| T5.7 | Add adapters only when telemetry and requests identify a repeated job. Require a golden recipe and verification maintainer before implementation.                                                       | Each new adapter enters with runtime proof and an explicit verification maintainer.                                                                                             |

### Phase 5 exit gate

- The TypeScript vertical slice is persistent, idempotent, previewable, verified, and recoverable.
- Generated agent context matches the installed versions and current Stack Graph.
- At least one human client and one MCP client complete the same recipe through shared contracts.
- New adapters have demonstrated demand and a runtime verification maintainer.

## Phase 6: improve selection without surrendering determinism

Goal: help users choose a sound stack while keeping schema rules and evidence authoritative.

| ID   | Task                                                                                                                                                                                        | Done when                                                                                                                                                                                                                                                               |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| T6.1 | Add Phase 3 evidence and shared CLI/MCP parity to the existing editable starter tracks for SaaS, API, mobile, Java, Rust, and internal-tool outcomes.                                       | Each starter track expands into the same editable Stack Graph across supported clients and shows its evidence level before creation.                                                                                                                                    |
| T6.2 | Explain compatibility decisions and alternatives in plain language from structured rule metadata.                                                                                           | The same explanation appears in builder, CLI, and MCP, and links to the owning Stack Part or capability.                                                                                                                                                                |
| T6.3 | Add filters for evidence level, runtime, deployment target, package manager, database, auth, and workspace shape.                                                                           | Filters never create a graph the schema would reject and remain serializable in URL state.                                                                                                                                                                              |
| T6.4 | Evaluate a model-backed recommendation layer only if measured failures show the existing deterministic keyword and preset recommender is insufficient. Do not collect prompts in telemetry. | A controlled evaluation shows a meaningful improvement over the deterministic baseline. Every proposed graph is schema-valid, cites constraints and evidence, and requires normal review before creation. Otherwise, the deterministic recommender remains the product. |
| T6.5 | Measure selection outcomes. Track anonymous create completion, incompatibility recovery, abandoned plans, chosen evidence levels, and repeat lifecycle use.                                 | The decision room can distinguish discoverability problems from missing capabilities with at least 80 percent decision coverage.                                                                                                                                        |

### Phase 6 exit gate

- Existing starter tracks show verified evidence and remain fully editable.
- Deterministic recommendations, and any later model-backed proposals, are schema-valid,
  evidence-aware, and explainable.
- Product decisions use aggregate outcomes without collecting prompts, code, paths, secrets, raw
  errors, or other user content.

## Independent benchmark lane

Fixproof measures coding agents on sealed, real issues from private and public codebases with hidden
tests. It is not generated-project verification and does not depend on Phases 1 through 6.

| ID  | Task                                                                                                                  | Done when                                                                                                                    |
| --- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| B1  | Prepare the first Fixproof board from sealed tasks sourced from private and public codebases, graded by hidden tests. | Results cover the defined cohort, stay separate from product verification, and never control the product verification badge. |

## Conditional bets

These are credible future directions, not current commitments. Each has an explicit start gate.

### Remote and private registry

Start only when local registry use and direct requests show repeated demand after Phase 2. A remote
registry requires integrity hashes, provenance, namespaces, compatibility enforcement, preview and
diff, token-bound apply, updates, uninstall, credential redaction, and a ban on arbitrary install
scripts. The [shadcn registry](https://ui.shadcn.com/docs/registry) and
[MCP integration](https://ui.shadcn.com/docs/mcp) show the value of composable registries, but
Better Fullstack must solve trust for multi-ecosystem project mutations rather than copy a UI-only
distribution model.

### Team policy

Start when teams repeatedly use update checks or private recipes. A policy file could declare
required and forbidden Stack Parts, minimum evidence levels, approved sources, version channels,
and CI behavior. Policy evaluation must remain local, deterministic, and available through CLI
JSON and MCP.

### Hosted update pull requests

Start only after the opt-in GitHub Action has meaningful adoption and a low manual-review rate. A
hosted service adds account, secret, repository-permission, abuse, and support costs. It should not
precede a reliable local update engine.

### Broader single-app and deployment output

The constrained thin single-app mode already supports selected self-contained web stacks. Expand
it, Docker output, Dev Containers, or deployment templates only for verified recipes with a clear
verification maintainer. Generated deployment files must pass build and runtime checks for their
declared target.

### New ecosystems and libraries

Accept additions when they fill a verified recipe, have repeated demand, close a strategic or
security gap, or arrive with a maintenance sponsor. Every addition still follows the mandatory
new-tool guideline and enters at an honest evidence level.

## Work that should not start now

- Do not add ecosystems or libraries to raise the option count.
- Do not fetch remote registry packs before local registry mutations use the shared safety model.
- Do not expand `gen` across languages before the current path is persistent and recoverable.
- Do not promise browser execution for every ecosystem or multi-service graph.
- Do not publish Fixproof as a product guarantee before its coverage and scoring are calibrated.
- Do not add direct solo Stack Graph editing before the remaining settings authority decisions.
- Do not delete the retired analytics source or its historical data.
- Do not call a dependency, generated file, source string, or theoretical combination runtime proof.
- Do not advertise historical upgrades until executable fixtures cover published source releases.

## Existing project routing

| Existing document or topic                       | Roadmap home                                                                                                        |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `active/platform-features.md`                    | Archive shipped manifest, history, and recovery work. Move genuine cross-version work into Phase 1.                 |
| `active/single-source-of-truth-stack-graph.md`   | Phase 2 contains the remaining settings authority and projection work.                                              |
| `active/documentation-follow-ups.md`             | Phase 0 owns compatibility examples, public-claim alignment, and planning-state cleanup.                            |
| Docker and Dev Containers backlog                | Keep conditional. Route generated deployment proof through Phase 3 before broadening output.                        |
| Single-app backlog                               | Reframe around expanding the shipped constrained mode, not implementing it from zero.                               |
| Ecosystem depth backlogs                         | Route each claim through Phase 3 evidence and verification-maintainer gates.                                        |
| Payments, organization preset, and raw SQL       | Consider as golden recipe or vertical-slice candidates only when demand and runtime verification maintenance exist. |
| TypeScript, community, and new-category backlogs | Keep as demand intake, not scheduled roadmap commitments.                                                           |
| Registry backlog                                 | Keep conditional until the Phase 2 mutation gate and demand gate pass.                                              |
| Fixproof                                         | Keep in the independent benchmark lane, separate from generated-project proof.                                      |

## Product scorecard

| Measure                             | Baseline                                                             | Target                                                                                                                        |
| ----------------------------------- | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Current public verification receipt | Missing or incomplete for the current claim                          | One fail-closed receipt for the exact release candidate                                                                       |
| Core ecosystem proof                | No single current public matrix across all eight surfaces            | Eight build-proof cases, then eight golden recipes with declared runtime evidence                                             |
| Supported update window             | No executable historical release window                              | A documented rolling window proven across at least two consecutive manifest-v2 releases                                       |
| Filesystem mutation safety          | `gen` and `registry` sit outside the strongest lifecycle safeguards  | Every existing-project writing command uses preview, bound approval, history, and bounded recovery                            |
| MCP structured contracts            | Output schema coverage is incomplete                                 | Every structured response validates against a versioned schema shared with CLI JSON                                           |
| Stack Part maturity                 | Public options are not consistently classified by proof              | Every public option has a maintenance owner, evidence level, freshness, and limitation                                        |
| Stack Graph authority               | A small settings cluster remains outside graph authority             | One documented authority for every selectable setting                                                                         |
| Upgrade qualification               | Recovery exercise used a newly adopted baseline                      | Published-binary fixtures prove the historical window; 20 adopted repositories separately prove user-edit and recovery safety |
| Decision coverage                   | Telemetry code exists; production coverage awaits the operator drill | Operator-verified reporting and at least 80 percent coverage before data-driven expansion decisions                           |
| Theoretical combinations            | Large and easy to increase                                           | No target                                                                                                                     |

## First execution queue

This is the recommended order for the next issue-writing pass:

1. T0.1: reconcile active, backlog, completed, and canonical roadmap state.
2. T0.4: design and test the resumable release publication state model.
3. T0.5: define the verification receipt and produce it in CI.
4. T0.10: declare and validate current MCP structured-response schemas.
5. T0.6: close the eight-ecosystem build-proof matrix.
6. T0.7: publish current evidence with fail-closed badge behavior.
7. T1.1: capture executable fixtures in every manifest-v2 release.
8. T1.2: approve the supported update-window policy.
9. T1.3 and T1.4: build the cross-version and merge-outcome harness.
10. T1.5: expose eligibility through the shared report.
11. T2.1 through T2.5: settle Stack Graph authority and projection behavior.
12. T2.6: audit existing transaction and lifecycle-contract gaps.
13. T2.7 and T2.8: consolidate only the contract and safety gaps proven by the audit.

T0.2 is an operator-only task and can run in parallel with repository work. Do not block
safe local engineering on production access, but do not use telemetry to justify a product bet
until the drill and coverage gate pass.

## Intake and review policy

Every proposed roadmap item should answer:

1. Which lifecycle step or verified recipe improves?
2. What user failure or repeated demand supports it?
3. Which Stack Part, Role Binding, Provided Capability, or project-service boundary contains it?
4. What is the smallest real proof of the advertised behavior?
5. What happens to user work when it fails halfway through?
6. Which CLI, JSON, MCP, web, manifest, and documentation contracts change?
7. Which verification maintainer keeps its receipt current after dependency updates?

Review this roadmap after each release. Move shipped outcomes to completed history, update the
scorecard from current evidence, and reorder only when a reliability incident, measured demand, or
changed product constraint justifies it.

## External direction signals

These sources support the direction but do not override repository evidence:

- [Next.js agent guidance](https://nextjs.org/docs/app/guides/ai-agents) packages version-matched
  framework context and generated agent instructions, which supports Phase 5's local-context work.
- [Nx's 2026 roadmap](https://nx.dev/blog/nx-2026-roadmap) emphasizes migrations, CI, and agent
  operation on existing workspaces, which supports prioritizing lifecycle depth over setup alone.
- [Copier's update model](https://copier.readthedocs.io/en/v8.0.0/updating/) documents three-way
  template updates, which reinforces Better Fullstack's investment in provenance and merge proof.
- [shadcn skills](https://ui.shadcn.com/docs/skills) and registries show demand for agent-readable,
  composable building blocks. Better Fullstack should add them only through its own graph,
  compatibility, evidence, and recovery contracts.
