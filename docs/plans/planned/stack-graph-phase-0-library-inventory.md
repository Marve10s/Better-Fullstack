# Stack-Graph Phase 0 — Library Inventory & Phase 2 Work Plan

> Deliverable of Phase 0 from [single-source-of-truth-stack-graph.md](./single-source-of-truth-stack-graph.md).
> Status: **Inventory complete (2026-06-09)**. Companion deliverable: structural round-trip tests in `packages/types/test/stack-graph.test.ts`.

This catalogs every flat `ProjectConfig` field, its target graph role, owner part, supported ecosystems, selection mode, and where its compatibility rules live today — so Phase 2 (promote libraries to owned parts) can be executed in planned batches instead of discovered incrementally.

All line references are as of commit `7a1580b2`.

---

## 1. Current registry coverage (what the graph already knows)

`STACK_TOOL_DEFINITIONS` (`packages/types/src/stack-graph.ts:190-253`) registers:

| Already registered | Roles | Ecosystems |
|---|---|---|
| Web/native frontends, backends, databases | `frontend`, `mobile`, `backend`, `database` | typescript, react-native, rust (frontend), all legacy backends |
| Capabilities | `orm`, `api`, `auth` | typescript, react-native, rust, python, go, java, elixir |
| Ecosystem extras (partial) | `caching` (rust), `validation`/`jobQueue`/`api` (python), `api`/`jobQueue`/`validation`/`email`/`caching`/`observability`/`testing`/`deploy` (elixir) | rust, python, elixir |
| Convex | `backend` + provided `database`/`api` | typescript |

**Importer/exporter asymmetry (existing bug surface):** `legacyProjectConfigToStackParts` (`stack-graph.ts:624-710`) only emits frontend/mobile/backend/database/orm/api/auth. The following categories are **registered in the tool registry but never imported from flat config**: `rustCaching`, `pythonValidation`, `pythonTaskQueue`, `pythonGraphql`, `elixirRealtime`, `elixirJobs`, `elixirValidation`, `elixirEmail`, `elixirCaching`, `elixirObservability`, `elixirTesting`, `elixirDeploy`. The exporter *can* lower them via `legacyCategory`, so graph→flat works but flat→graph silently drops them. Phase 2 must close this gap first — it is the cheapest correctness win and exercises the exact code paths library promotion needs.

**Role collisions to fix:** `pythonGraphql` and `pythonApi` both register under role `api`; `elixirRealtime` and `elixirApi` both register under role `api`. Two selected parts with the same `(owner, role)` trip `DUPLICATE_ROLE_SCOPE` (`stack-graph.ts:987-998`), so e.g. Django REST Framework + Strawberry, or Absinthe + Channels, cannot coexist in the graph even though the flat config allows both. Fix: add a `realtime` role (exists as a flat category, missing from `StackPartRoleSchema`) and decide whether GraphQL servers get their own role or `api` allows designated multi-selection (see §5).

---

## 2. Inventory — TypeScript/web library fields

Roles marked **NEW** do not exist in `StackPartRoleSchema` (`packages/types/src/schemas.ts:11-45`) yet. "Owner" is the proposed `ownerPartId` target; "solo collapse" means the single-ecosystem default owner.

| Flat field | Options (excl. none) | Graph role | Owner part | Mode | Compatibility rules today |
|---|---|---|---|---|---|
| `cssFramework` | 4 | `css` | frontend | single | `getDisabledReason` `compatibility.ts:2177-2197` (requires web frontend; shadcn/daisyui/nextui force tailwind); `getCompatibleCSSFrameworks:3288` |
| `uiLibrary` | 14 | `ui` | frontend | single | `UI_LIBRARY_COMPATIBILITY:2646-2816` (frontend × css matrix); `uiLibrary` branch `:2246`; `getCompatibleUILibraries:3252` |
| `forms` | 6 | `forms` | frontend | single | Fresh/Preact rule `:2152`; `getCompatibleFormLibraries:3302` |
| `stateManagement` | 9 | `stateManagement` | frontend | single | Fresh/Preact rules `:2157-2167` |
| `animation` | 5 | **`animation`** | frontend | single | Lottie×Fresh `:2170` |
| `fileUpload` | 3 | **`fileUpload`** | frontend | single | none found |
| `i18n` | 2 | `i18n` | frontend | single | `:2400-2411` (next-intl ↔ next) |
| `analytics` | 2 | `analytics` | frontend | single | none found |
| `validation` | 7 | `validation` | backend (shared; see §5 Q3) | single | none found (TS); api-layer coupling implicit in templates |
| `testing` | 5 | `testing` | frontend (playwright/cypress) — see §5 Q3 | single | none found |
| `logging` | 3 | `logging` | backend | single | none found |
| `observability` | 3 | `observability` | backend | single | `:1935-1949` (non-TS → sentry only; java needs build tool) |
| `email` | 8 | `email` | backend | single | `:1910-1930` (non-TS → resend only; convex/none backend excluded) |
| `search` | 4 | `search` | backend | single | `:1973-1987` (non-TS → meilisearch only) |
| `caching` | 1 | `caching` | backend | single | `:1954-1968` (non-TS → upstash-redis only) |
| `jobQueue` | 4 | `jobQueue` | backend | single | none found (TS) |
| `realtime` | 6 | **`realtime`** | backend | single | none found (TS) |
| `fileStorage` | 3 | `fileStorage` | backend | single | backend-self constraints `:1510,1582` |
| `payments` | 5 | `payments` | backend | single | polar rule `:1880`; backend-self `:1576` |
| `cms` | 5 | `cms` | backend (payload needs `next` frontend → cross-owner rule) | single | `:1901-1905` |
| `featureFlags` | 5 | `featureFlags` | backend | single | none found |
| `ai` | 11 | `ai` | backend | single | chat-sdk coupling `:1992`; tanstack-ai × frontend `:1997-2013` |
| `effect` | 2 | **`effect`** | backend | single | none found |
| `webDeploy` | 6 | `deploy` | frontend | single | `:2346-2358` |
| `serverDeploy` | 6 | `deploy` | backend | single | `:2358-2400`; many per-backend rules `:1504-1672` |
| `dbSetup` | 9 | **`dbSetup`** (or `settings.provider` on database part) | database | single | `:1780-1821` (db × provider matrix) |
| `runtime` | 3 | `runtime` (role exists, unregistered) | backend | single | `:1723-1748`; per-backend rules `:1489+` |
| `astroIntegration` | 4 | — settings on frontend part | frontend | setting | `:1844-1857` |
| `shadcnBase/Style/IconLibrary/ColorTheme/BaseColor/Font/Radius` | — | — settings on `ui` part | frontend | setting | shadcn-only prompts |
| `addons` | 24 | split: see §3 | mixed | **multi** | `ADDON_COMPATIBILITY:2818-2933`; `appPlatforms` rules `:2018-2079`; `validateAddonCompatibility:3214` |
| `examples` | 3 | **`examples`** | project-root or backend | **multi** | `:2084-2143` (heavy frontend×backend×runtime coupling) |
| `aiDocs` | 3 | stays flat (docs files, not stack tools) | — | multi | none |

Stays flat (not stack parts): `packageManager`, `versionChannel`, `git`, `install`, `projectName/Dir/relativePath`.

## 3. The `addons` bag must be split before promotion

`option-metadata.ts:537-567` already splits addons into web-builder categories — reuse that split as graph roles:

| Addon subset | Graph role | Owner |
|---|---|---|
| pwa, tauri, wxt, opentui | `appPlatform` (exists) | frontend |
| biome, husky, lefthook, oxlint, ultracite | `codeQuality` (exists) | **workspace** (see §5 Q1) |
| starlight, fumadocs | `documentation` (exists) | workspace |
| swr, tanstack-query/table/virtual/db/pacer | **`dataFetching`** | frontend |
| msw, storybook | `testing` (second selected part per scope — needs multi) | frontend |
| turborepo, docker-compose, ruler, mcp, skills | workspace tooling | workspace |

## 4. Inventory — mobile and non-TS ecosystems

| Flat field | Graph role | Owner | Notes |
|---|---|---|---|
| `mobileNavigation` | **`navigation`** | mobile | rules `compatibility.ts:2215` |
| `mobileUI` | `ui` | mobile | uniwind/unistyles ↔ frontend variant rules `:2219+` |
| `mobileTesting` | `testing` | mobile | |
| `mobileStorage` | **`storage`** | mobile | |
| `mobilePush` / `mobileOTA` / `mobileDeepLinking` | **`push`** / **`ota`** / **`deepLinking`** (or settings on mobile part — 1 option each) | mobile | recommend settings until ≥2 options exist |
| `rustLogging`, `goLogging` | `logging` | backend | |
| `rustErrorHandling` | **`errorHandling`** | backend | |
| `rustCli`, `goCli` | **`cli`** | backend | |
| `rustLibraries`, `javaLibraries`, `javaTestingLibraries`, `pythonAi` | **`libraries`** / `ai` (pythonAi) | backend | **multi** — needs multi-select scopes |
| `pythonQuality`, `elixirQuality` | `codeQuality` | workspace/backend | |
| `javaBuildTool` | **`buildTool`** | backend | referenced by java email/search/caching rules `:1914-1982` — cross-category context needed |
| `elixirHttp`, `elixirJson` | **`httpClient`** / settings | backend | jason is single-option → setting |

New roles required (recommendation): `realtime`, `animation`, `fileUpload`, `effect`, `dbSetup`, `dataFetching`, `examples`, `navigation`, `storage`, `buildTool`, `cli`, `errorHandling`, `httpClient`, `libraries`. (`push`/`ota`/`deepLinking` deferred as settings.)

**Scale:** promoting everything above adds ~250 tool registrations (TS ~168, mobile 13, rust 23, python 10, go 7, java 27, elixir 6).

## 5. Design decisions Phase 2 must settle (with recommendations)

1. **Workspace-level tools don't fit the owner model.** `validateStackParts` requires every non-primary part to have an owner (`MISSING_OWNER_PART`, `stack-graph.ts:936-944`), but turborepo/biome/husky/starlight configure the repo, not a part. **Recommend:** allow ownerless parts for a whitelisted set of workspace roles (`codeQuality`, `documentation`, plus workspace tooling) rather than inventing a synthetic root part.
2. **Multi-select scopes.** `DUPLICATE_ROLE_SCOPE` forbids two selected parts per `(owner, role)`, but `addons`, `examples`, `rustLibraries`, `javaLibraries`, `javaTestingLibraries`, `pythonAi`, `aiDocs` are arrays. **Recommend:** per-role `allowMultiple` flag in the registry, enforced in `validateStackParts`.
3. **Shared-owner libraries** (`validation`, `testing`, `effect` span web+server in TS). **Recommend:** owner = backend when present, else frontend (deterministic solo collapse); multi mode may add one part per owner later without schema change.
4. **GraphQL role collision** (§1). **Recommend:** add `realtime` role now; keep `pythonGraphql` under `api` and accept mutual exclusion with `pythonApi` in the graph (flat config already treats them as alternatives in practice), revisit if a real stack needs both.
5. **`dbSetup`:** owned part (role `dbSetup`, owner database) rather than a setting — it has 9 options and its own compatibility matrix.
6. **Cross-owner compatibility context.** Library rules need richer context than `getStackPartCompatibilityIssue` currently passes: cms→frontend toolId, addons→frontend+backend+runtime, email/search/caching→`javaBuildTool` sibling, cssFramework→`ui` sibling. `primaryToolIdsByRole` + `siblingToolIdsByRole` (`stack-graph.ts:76-84`) already cover most; java rules additionally need sibling lookup by the new `buildTool` role — no new mechanism, just registration order.

## 6. Phase 2 execution plan (batched)

Each batch = registry entries + importer/exporter round-trip + CLI `--part` emission + round-trip tests; UIs read options through `getStackPartOptions` so they pick up new roles with minimal change.

1. ~~**Batch 0 — close the existing asymmetry**~~ ✅ Shipped 2026-06-09: `LEGACY_EXTRA_CATEGORIES_BY_ECOSYSTEM` imports the 10 safe categories as backend-owned parts; elixir tools in `ELIXIR_UNSUPPORTED_GRAPH_TOOLS` stay flat-only so imported configs never fail `validateStackParts` (all three fatal validation sites traced: `config-validation.ts:1035,1169`, `stack-translation.ts:990`). Original caveats, all honored:
   - Defer `pythonGraphql` and `elixirRealtime` to Batch 1 — both collide with the `api` role (§1) and need the `realtime`/graphql decision first. Batch 0 imports the other 10 categories.
   - `ELIXIR_UNSUPPORTED_GRAPH_TOOLS` (`stack-graph.ts:120-133`) rejects `fly`/`gigalixir` deploys and `ueberauth`/`guardian`/`nimble-options`/`nebulex`/`opentelemetry`/`prom_ex`/`mox`/`bypass`/`wallaby` — all valid flat solo selections today. Importing them would make `validateStackParts` flag previously-valid solo configs. Trace every `validateStackParts` caller (bts-config migration, web builder, MCP) before importing elixir extras, or scope the unsupported-tool check to graph-authored parts (`source !== "legacy"`).
   - Do **not** add the extras categories to `GRAPH_PROJECTION_DEFAULT_LEGACY_CATEGORIES` in this batch: in multi mode the CLI passes libraries as plain flags (not `--part`), so resetting those fields in `stackGraphToLegacyProjectConfigForEcosystem` would drop selections that exist only as flat flags. That move belongs to the batch that makes the CLI emit library `--part` specs.
2. **Batch 1 — backend-owned singles (TS):** logging, email, search, caching, observability, jobQueue, fileStorage, featureFlags, payments, realtime (new role), ai, cms. Simple ownership, few cross-owner rules.
3. **Batch 2 — frontend-owned singles (TS):** css, ui (+shadcn settings), forms, stateManagement, animation (new), fileUpload (new), i18n, analytics. Port `UI_LIBRARY_COMPATIBILITY` into graph checks.
4. **Batch 3 — deploy/runtime/dbSetup:** webDeploy/serverDeploy as `deploy` parts under frontend/backend owners; runtime under backend; dbSetup under database. Heaviest per-backend rule porting.
5. **Batch 4 — multi-select:** addons split (§3), examples, aiDocs decision; requires decisions §5.1–5.2 implemented first.
6. **Batch 5 — mobile + remaining ecosystem categories** (§4).
7. **Batch 6 (Phase 3 entry) —** partially shipped on PR #220: `compareLegacyConfigToStackParts` is test-only, shared graph compatibility helper data now lives outside `compatibility.ts`, and `getDisabledReason` routes promoted frontend/mobile library branches plus the first backend Payments/CMS/AI and Java build-tool/library branches through graph candidate checks. Remaining work: move the rest of the backend/ecosystem library-specific disables (for example shared non-TypeScript email/search/caching/observability rules and unsupported Elixir generated-tool rules) into graph checks and retire the corresponding flat fallbacks.

Files touched per batch: `packages/types/src/stack-graph.ts` (registry + translation), `schemas.ts` (roles), `compatibility.ts` (rule consolidation, Phase 3), `apps/cli/src/utils/generate-reproducible-command.ts` (emit `--part` instead of flag, lines 99+/217+), `apps/cli/src/utils/bts-config.ts` (migration), `apps/web/src/components/stack-builder/stack-builder.tsx:521-600`, `packages/template-generator/src/generator.ts` (projection must stay byte-identical — guarded by scaffold snapshot tests).
