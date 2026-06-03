# Single Source of Truth for the Stack Graph

> **Active design doc — keep this updated as decisions land.**
> Status: **Phase 1 landed (foundation); Phases 2–4 planned**
> Branch in question: `feat/multi-ecosystem-stack-graph` (shipped in PR #209)
> Last updated: 2026-06-02

## Active State (read this first)

- **Goal:** Move toward a *single source of truth* for stack configuration so Solo and Multi-Ecosystem creation cannot drift apart.
- **What shipped (PR #209):** the **stack-graph model** (`packages/types/src/stack-graph.ts`), graph-shaped schemas/compatibility/translation, CLI scoped `--part` parsing/emission, graph threading through the template generator, and the multi-ecosystem web builder redesign. The graph currently lives **alongside** the flat `ProjectConfig` (dual representation); it is not yet the sole source of truth.
- **Direction:** The **graph (`stackParts`) becomes the single source of truth**; the flat `ProjectConfig` becomes a *derived, generator-only projection*. Foundation is in place; the authority flip and library promotion are the remaining work (see Phases 2–4).
- **Settled decision:** Libraries are **owned by their part** (`ownerPartId`), the same way `orm`/`api`/`auth` already work — not global per-project fields. (Not yet implemented — Phase 2.)
- **Constraint:** Neither Solo nor Multi is "legacy." Both are first-class creation modes. (See memory: project-creation-modes.) "Legacy" only ever refers to the flat config *data shape*.

---

## Problem Statement

Today configuration truth lives in two places, and which one is authoritative **flips depending on the creation mode**. That flip is the root drift risk that `compareLegacyConfigToStackParts` was written to detect after the fact instead of preventing.

## Current Reality (grounded in code)

There are **two categories** of configuration data and they behave differently:

### 1. Structural parts — frontend / backend / mobile / database (+ orm / api / auth)

- `legacyProjectConfigToStackParts` (`packages/types/src/stack-graph.ts:584-690`) round-trips **only** these roles.
- Authority **flips by mode**:
  - **Solo:** flat fields (`backend`, `goWebFramework`, …) are authoritative; the graph is derived on read (`apps/cli/src/utils/bts-config.ts` migration).
  - **Multi:** `stackPartSpecs` is authoritative; `stackPatchFromGraphSpecs` (`apps/web/src/components/stack-builder/stack-builder.tsx:521-600`) mirrors the graph back down into the flat fields.
- This mode-dependent flip is the real drift surface. `compareLegacyConfigToStackParts` (`stack-graph.ts:782-814`) exists to catch divergence.

### 2. Libraries — cssFramework / uiLibrary / mobileNavigation / testing / logging / forms / addons / examples / …

- Flat fields in **both** modes; **never** round-tripped through the graph (`legacyProjectConfigToStackParts` does not emit them).
- The CLI appends them as plain flags (`--css-framework scss`) alongside `--part` specs.
- **Schema is already ready:** `StackPartRoleSchema` (`packages/types/src/schemas.ts:11-45`) already defines 30 roles including `css`, `ui`, `testing`, `logging`, `forms`, `validation`, `observability`, `caching`, `stateManagement`, etc. The graph *can* represent libraries as owned parts today — the translation layer just doesn't use those roles.

## Why libraries genuinely differ between modes

- **Solo:** a library has exactly one possible owner (the single ecosystem), so a global flat field like `cssFramework` is unambiguous — it implicitly belongs to "the frontend."
- **Multi:** `cssFramework: "scss"` is ambiguous — does it belong to the TS web frontend, the React Native mobile, or both? A single global field cannot say. The correct home is a `css` part with `ownerPartId` pointing at the specific part it configures.

**Key insight:** This is not "graph vs flat." Structural data has a mode-dependent *owner of truth* (a real drift bug); library data has a representation that is *correct for solo but lossy for multi*. Making libraries **owned parts** turns the per-mode difference into an ownership/rendering detail rather than two separate truths.

## Decisions

| Decision | Choice | Notes |
|---|---|---|
| Source of truth | **Graph (`stackParts`)** — tentative, exploring | Flat `ProjectConfig` becomes a derived, generator-only projection. Solo = a one-ecosystem graph with implicit single owners. |
| Library scoping | **Owned by their part** (`ownerPartId`) | Solo writes one owner → collapses to today's behavior. Multi can scope per part. Mirrors how `orm`/`api`/`auth` already work. |
| Mode framing | Both first-class | Neither Solo nor Multi is "legacy." |

## Target Model (proposed)

1. **Graph is authoritative for everything** — structural parts *and* libraries.
2. **Flat `ProjectConfig` is a pure derived projection** consumed only by the generator/templates. Never stored as authority, never edited directly.
3. **Solo = a graph constrained to one ecosystem** with implicit single owners. Library scoping collapses automatically (one owner → no ambiguity), so today's solo behavior is preserved without special-casing.
4. **Libraries promoted to owned parts** (`css`/`ui`/`testing`/`logging`/… with `ownerPartId`). No global flat-field ambiguity in multi.
5. `compareLegacyConfigToStackParts` stops being a drift guard and becomes (or is replaced by) a pure one-way transform graph → flat view.

## Open Questions (to resolve before implementation)

1. **Migration / phasing:** Promote libraries into the graph in one pass, or land "graph authoritative for structure" first and migrate libraries in a follow-up?
2. **Storage shape (`bts.jsonc`):** Store only `stackParts` and derive the rest, or keep flat fields persisted as a cache with the graph marked authoritative?
3. **Solo UI:** Keep editing flat-style fields and translate-through to the graph on write, or re-platform the solo builder onto the graph directly?
4. **Tool registry cost:** Every library field needs a registration in `STACK_TOOL_DEFINITIONS` with role + ecosystem(s) + compatibility rules. How many library roles, and which ecosystems each supports? (Need an inventory pass.)
5. **Compatibility rules:** Library compatibility currently lives in `compatibility.ts` (e.g. UI-library/frontend matrices). How do those map onto graph `getStackPartCompatibilityIssue` checks without duplicating logic?
6. **Backward compat:** External callers (MCP, saved URLs, existing `bts.jsonc`) still emit flat fields. The flat → graph importer (`legacyProjectConfigToStackParts`) must become lossless across libraries too.

## Risks

- **Large surface:** every library category touches the tool registry, compatibility engine, translation layer, both UIs, the CLI flag generator, and the generator.
- **Compatibility duplication:** risk of two compatibility systems (flat `compatibility.ts` vs graph `getStackPartCompatibilityIssue`) drifting — ideally consolidate.
- **URL/state back-compat:** existing shared builder URLs encode flat selections; the importer must keep round-tripping them.
- **Generator coupling:** templates read flat `ProjectConfig`; the derived projection must stay byte-for-byte equivalent to avoid scaffold regressions.

## Phased Implementation Sketch

- **Phase 0 — Inventory & invariants:** catalog every library field, its role, supported ecosystems, and existing compatibility rules. Add round-trip property tests proving flat ↔ graph is lossless for *structural* parts first.
- **Phase 1 — Graph foundation + structural round-trip (LANDED in PR #209):** the graph model, schemas, compatibility hooks, translation layer, CLI `--part` parsing/emission, generator threading, and the multi-ecosystem builder shipped. The graph and flat config coexist (dual representation); `compareLegacyConfigToStackParts` is still a **runtime** drift guard, not yet demoted to a test-only assertion, and the mode-dependent authority flip is not yet removed. Finishing that flip is the remaining Phase 1 work.
- **Phase 2 — Promote libraries to owned parts:** register library tools, add `ownerPartId` scoping, extend the importer/exporter, update both UIs to write library parts. Solo collapses to single-owner. *Not started — libraries are still flat fields.*
- **Phase 3 — Consolidate compatibility:** route library compatibility through the graph engine; retire duplicated flat rules. *Not started — flat `compatibility.ts` and graph `getStackPartCompatibilityIssue` still coexist.*
- **Phase 4 — Storage cleanup:** decide final `bts.jsonc` shape (graph-only vs graph+cache). *Not started.*

## Reference Map (files)

- `packages/types/src/stack-graph.ts` — graph engine, translation (`legacyProjectConfigToStackParts:584`, `stackPartsToLegacyProjectConfigPartial:702`, `compareLegacyConfigToStackParts:782`).
- `packages/types/src/schemas.ts:11-45` — `StackPartRoleSchema` (30 roles, library roles already present).
- `packages/types/src/compatibility.ts` — current flat compatibility engine (UI library / addon / API-frontend matrices).
- `packages/types/src/stack-translation.ts` — URL/UI ↔ ProjectConfig ↔ stackParts translation.
- `apps/web/src/components/stack-builder/stack-builder.tsx:521-600` — `stackPatchFromGraphSpecs` (graph → flat mirror in multi mode).
- `apps/cli/src/utils/bts-config.ts` — persistence + legacy↔graph migration.
- `apps/cli/src/utils/generate-reproducible-command.ts` — flag/`--part` emission.
- `packages/template-generator/src/generator.ts` — `processGraphTemplates`, consumes flat projection per ecosystem.

## Decision Log

- **2026-05-29:** Created doc. Chose "libraries owned by their part." Leaning toward "graph as single source of truth" but not committed — exploring via this doc, no code changes yet.
- **2026-06-02:** Phase 1 foundation shipped in PR #209 (`feat/multi-ecosystem-stack-graph`): stack-graph model + schemas/compatibility/translation, CLI `--part` round-trip, generator threading, and the multi-ecosystem builder redesign. Graph coexists with the flat config rather than replacing it; Phases 2–4 (library promotion, compatibility consolidation, storage cleanup) and the structural authority flip remain open follow-ups.
