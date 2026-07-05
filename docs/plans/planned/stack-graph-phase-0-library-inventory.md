# Stack-Graph Phase 0 — Library Inventory & Phase 2 Work Plan

> Deliverable of Phase 0 from [single-source-of-truth-stack-graph.md](./single-source-of-truth-stack-graph.md).
> Status: **Reference inventory with remaining Phase 3/4 follow-up**. Companion deliverable: structural round-trip tests in `packages/types/test/stack-graph.test.ts`.

This catalogs every flat `ProjectConfig` field, its target graph role, owner part, supported ecosystems, selection mode, and where its compatibility rules live today — so Phase 2 (promote libraries to owned parts) can be executed in planned batches instead of discovered incrementally.

All line references are as of commit `7a1580b2`.

---

## 1. Current registry coverage (what the graph already knows)

`STACK_TOOL_DEFINITIONS` (`packages/types/src/stack-graph.ts:190-253`) registers:

| Already registered | Roles | Ecosystems |
|---|---|---|
| Web/native frontends, backends, databases | `frontend`, `mobile`, `backend`, `database` | typescript, react-native, rust (frontend), all legacy backends |
| Capabilities | `orm`, `api`, `auth`, `graphql` | typescript, react-native, rust, python, go, java, elixir |
| Ecosystem extras (partial) | `caching` (rust), `validation`/`jobQueue`/`graphql` (python), `realtime`/`jobQueue`/`validation`/`email`/`caching`/`observability`/`testing`/`deploy` (elixir) | rust, python, elixir |
| Convex | `backend` + provided `database`/`api` | typescript |

**Importer/exporter asymmetry (closed for promoted categories):** `legacyProjectConfigToStackParts` now imports the promoted ecosystem extras as backend-owned parts and `stackPartsToLegacyProjectConfigPartial` lowers them back through their `legacyCategory`. Keep new promotions covered with flat→graph→flat tests so the graph stays authoritative instead of drifting back to flat-only fields.

**Role collisions fixed:** `pythonGraphql` uses `graphql`, and Elixir realtime selections use `realtime`, so REST/API and realtime/GraphQL-style capabilities no longer fight over the backend `api` scope.

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
| `testing` | 5 | `testing` | **backend** (shared; owner=backend when present, else flat — see §5 Q3) | single | none found — **promoted** (backend-owned so the framework never shares a scope with the frontend-owned msw/storybook testing addons) |
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
| `effect` | 2 | `effect` | backend | single | Effect backend defaults/locks this to `effect-full` and locks `validation` to `effect-schema`; other Effect-compatible tools remain selectable |
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

New roles required (recommendation): `dataFetching`, `examples`, `buildTool`, `cli`, `errorHandling`, `httpClient`, `libraries`. Previously planned roles such as `realtime`, `animation`, `fileUpload`, `effect`, `dbSetup`, `navigation`, and `storage` now exist in `StackPartRoleSchema`; keep their registrations and translations covered as graph ownership expands. (`push`/`ota`/`deepLinking` deferred as settings.)

**Scale:** promoting everything above adds ~250 tool registrations (TS ~168, mobile 13, rust 23, python 10, go 7, java 27, elixir 6).

## 5. Design decisions Phase 2 must settle (with recommendations)

1. **Workspace-level tools don't fit the owner model.** `validateStackParts` requires every non-primary part to have an owner (`MISSING_OWNER_PART`, `stack-graph.ts:936-944`), but turborepo/biome/husky/starlight configure the repo, not a part. **Recommend:** allow ownerless parts for a whitelisted set of workspace roles (`codeQuality`, `documentation`, plus workspace tooling) rather than inventing a synthetic root part.
2. **Multi-select scopes.** `DUPLICATE_ROLE_SCOPE` forbids two selected parts per `(owner, role)`, but `addons`, `examples`, `rustLibraries`, `javaLibraries`, `javaTestingLibraries`, `pythonAi`, `aiDocs` are arrays. **Recommend:** per-role `allowMultiple` flag in the registry, enforced in `validateStackParts`.
3. **Shared-owner libraries** (`validation`, `testing`, `effect` span web+server in TS). **Recommend:** owner = backend when present, else flat-only (deterministic solo collapse); multi mode may add one part per owner later without schema change. **Settled/implemented:** `validation`, `effect`, and `testing` all import as backend-owned singles (`LEGACY_TYPESCRIPT_BACKEND_SINGLE_CATEGORIES`) and stay flat-only without a TypeScript backend. `testing` is deliberately backend-owned so the framework part never shares a `(owner, role)` scope with the frontend-owned msw/storybook `testing` addons (which would otherwise trip `DUPLICATE_ROLE_SCOPE`); the flat↔graph round-trip discriminates framework vs addon tools by toolId via `getAddonStackPartBinding`. Effect backend is the special case: selecting `backend=effect` must default/lock the backend-owned Effect services to `effect-full` and validation to `effect-schema`, while still allowing compatible choices such as TanStack Form or frontend libraries.
4. **GraphQL role collision** (§1). **Settled:** `pythonGraphql` now imports/exports as backend-owned `graphql`, so Python API and GraphQL selections can coexist without a duplicate `api` role.
5. **`dbSetup`:** owned part (role `dbSetup`, owner database) rather than a setting — it has 9 options and its own compatibility matrix.
6. **Cross-owner compatibility context.** Library rules need richer context than `getStackPartCompatibilityIssue` currently passes: cms→frontend toolId, addons→frontend+backend+runtime, email/search/caching→`javaBuildTool` sibling, cssFramework→`ui` sibling. `primaryToolIdsByRole` + `siblingToolIdsByRole` (`stack-graph.ts:76-84`) already cover most; java rules additionally need sibling lookup by the new `buildTool` role — no new mechanism, just registration order.

## 6. Remaining Phase 4 / Settings Follow-Up

Keep this file as the library-role reference while finishing the graph authority cleanup.

- [x] `testing` (TypeScript test runner: vitest/playwright/vitest-playwright/jest/cypress) is promoted as a backend-owned graph single, round-tripping legacy↔graph and graph-authoritative in both the generator projection and persistence normalization. It is the last non-settings-shaped TypeScript library category; every remaining flat-only field is now either intentionally flat (project metadata) or settings-shaped (`shadcn*`, `elixirJson`).
- [ ] **Remaining flat-only, settings-shaped (deferred as a larger migration):** the seven `shadcn*` detail settings and single-option `elixirJson`. Unlike `astroIntegration` (one field on the always-present frontend part), `shadcn*` is seven correlated fields on a conditional `ui` part with a wide consumer surface (generator template-processor, `css-ui-deps`, reproducible-command, bts-config persistence, prompts, web builder — 18+ files) and enum values that are not `"none"`-defaulted, so the graph-projection reset semantics differ from the promoted categories. Keep both flat until their final graph-settings shape is settled.
- [x] Phase 3 compatibility consolidation is complete for promoted graph-owned roles: disabled reasons for promoted library, ecosystem, addon/example, deploy, database setup, mobile, Java/.NET/Elixir, and shared backend-service categories route through graph candidate checks and graph-complete bindings are authoritative.
- [ ] Continue treating global backend locks and settings-shaped constraints as flat until their final graph-settings shape is settled.
- [ ] Keep graph-derived cache behavior covered for CLI config writes, add/deploy updates, MCP responses, reproducible command generation, URL/import paths, config-file replay, and history replay as more categories move into graph ownership.

Files touched per batch: `packages/types/src/stack-graph.ts` (registry + translation), `schemas.ts` (roles), `compatibility.ts` (rule consolidation, Phase 3), `apps/cli/src/utils/generate-reproducible-command.ts` (emit `--part` instead of flag, lines 99+/217+), `apps/cli/src/utils/bts-config.ts` (migration), `apps/web/src/components/stack-builder/stack-builder.tsx:521-600`, `packages/template-generator/src/generator.ts` (projection must stay byte-identical — guarded by scaffold snapshot tests).
