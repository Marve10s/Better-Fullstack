# MCP Incremental Library Updates

> **Implementation history — superseded for priority decisions on 2026-08-07.** Generic MCP
> plan/apply and the CLI `add` lifecycle now cover the broad stack surface described below. Keep this
> file for regression context; use `docs/next-updates-roadmap.md` for current priorities.

> Historical implementation detail: `bfs_plan_stack_update` / `bfs_apply_stack_update` accept the
> broad create-time stack fields, generate the proposed
> project virtually, merge package/env changes where safe, add new generated files, replace
> unedited generated files, and refuse user-edited overwrite cases. The legacy
> `bfs_plan_addition` / `bfs_add_feature` addon path remains for compatibility. Regression
> coverage now includes the first user-facing CLI slice: explicit `add` stack flags such as
> `--email resend` route through the same planner/apply machinery, `--dry-run` previews without
> mutating `bts.jsonc`, and addon-only `add --addons ...` keeps its idempotent user-facing
> messages while using the safer update path. Planner comparisons now account for the formatted
> scaffold output produced by `create` while still accepting raw generated-template baselines in
> focused fixtures.
> Existing regression coverage includes renamed project folders, placeholder-free array additions
> (`frontend`, `addons`, `examples`, `aiDocs`), broad TypeScript service categories,
> Resend/Sentry cross-ecosystem candidates, broad generated Python/Go/Rust/Java/.NET/Elixir
> category updates, shared non-TypeScript caching/search services, and a flat-field
> persistence regression for Elixir JSON when only universal graph tooling is selected.
> A wider flat-field audit also covered paired compatibility cases such as D1/Workers,
> Polar/Better Auth, Dodo/Payload/Keystatic/Next Intl on Next.js, Svelte/Solid UI
> libraries, server deploy variants, and Chat SDK self-backend examples. Follow-up fixes
> preserve `astroIntegration` in `bts.jsonc` and prevent untouched generated binary
> assets (for example favicons) from being misclassified as user-edited blockers.
> Stack updates now also report compatibility adjustments from the planner and can expand
> known required bundles, starting with `payments=polar` automatically planning the required
> Better Auth + SQLite + Drizzle dependencies when the caller did not explicitly select
> conflicting auth/database/ORM values. Self-backend projects are normalized to the
> compatibility engine's frontend-scoped shape during planning (`self-next`, etc.) and
> mapped back to `backend=self` before generation, so supported updates such as the
> Chat SDK example on Next.js self-backend are no longer removed as "unsupported".
> Chat SDK's Hono and Nuxt self-backend profiles are now expanded to their hidden
> prerequisites as well: Hono profile updates select the Node runtime, and the
> Hono/Nuxt profiles select Vercel AI SDK when the caller did not request a conflicting
> AI SDK. Tailwind-backed UI libraries (`shadcn-ui`, `shadcn-svelte`, `daisyui`,
> `nextui`, and `park-ui`) now select Tailwind CSS automatically when the existing
> project has no compatible CSS framework. Direct Better Auth updates now select
> SQLite + Drizzle when the existing project has no database/ORM, matching the
> dependency bundle previously covered only through Polar, and frontend-only
> TypeScript projects now add a Hono + Bun server when the requested supported
> feature needs a standalone backend (for example Better Auth, email, rate
> limiting, file storage, caching, queues, realtime, search, vector DB,
> observability, logging, payments, database, ORM, database setup, API, or server
> deployment). Direct ORM updates now also select SQLite when the existing project
> has no database, so the ORM is not cleared before generation. Hono server
> deployment updates now select the required runtime for supported targets:
> Workers for Cloudflare and Node for Netlify Functions. React Native mobile UI
> updates now select the matching native frontend variant for Uniwind and Unistyles,
> and API-only TypeScript projects now select a native-bare app when requested
> mobile features require a native frontend. Mixed TypeScript/native graph
> projection and `bts.jsonc` persistence now preserve mobile feature fields, so
> generated native files receive options such as MMKV, Tamagui, Expo Updates,
> Expo Notifications, Expo Linking, and React Native Testing Library instead of
> silently rendering the native baseline.
> API-only TypeScript projects now also infer a Next.js web app for templated
> payment providers, so Stripe, Lemon Squeezy, Paddle, Polar, and Dodo updates add
> both the server payment helper and the web success route instead of only the
> backend half. Polar keeps its existing hidden prerequisites: Better Auth,
> SQLite, and Drizzle.
> API-only TypeScript projects now also gain a web frontend when a requested
> update needs one: React + Vite is the conservative default, while known
> frontend-specific options select their owner (`next-intl` selects Next.js and
> Payload/Keystatic CMS select Next.js, and `shadcn-svelte` selects Svelte).
> Web-app platform addons such as PWA and Tauri now also select React + Vite
> when they are added to an API-only TypeScript project.
> Cloudflare D1 updates are dependency-expanded before generic database compatibility
> rules run, so asking only for `dbSetup=d1` now plans the required SQLite + Drizzle +
> Workers + Hono + Cloudflare deploy bundle instead of clearing the database setup.
> The same pre-compatibility dependency expansion now covers the other database setup
> providers with unambiguous defaults: Turso, Neon, Prisma Postgres, PlanetScale,
> MongoDB Atlas, Supabase, Upstash, and Docker.
> Regression coverage now also includes at least one explicit stack-update path for every
> supported create-time update key, including graph `part` updates, package/version
> metadata, web deploy, Rust frontend, Effect/forms, and the shadcn detail fields.
> A value-level audit found and fixed a Go Better Auth projection gap: `auth=go-better-auth`
> on Go projects now survives `bts.jsonc` graph persistence and graph-mode generation, so
> MCP updates add the Go Better Auth server file, environment keys, and `go.mod` dependency.
> The same audit found an Elixir validation drift where `nimble-options` was exposed by
> schema/prompts but still blocked as "not generated"; the Elixir template now generates
> a NimbleOptions item input module and stack updates can add it to existing Phoenix apps.
> Elixir deploy drift is shrinking too: `fly` and `gigalixir` now generate platform files
> (`fly.toml` and `Procfile`) and can be added through the generic MCP stack-update path.
> Elixir caching now covers both exposed cache choices: `nebulex` generates a supervised
> local cache module and config instead of being blocked as dependency-only scaffolding.
> Elixir observability now has generated setup for the previously blocked values:
> `opentelemetry` installs the Phoenix telemetry handler during application startup, and
> `prom_ex` generates a PromEx module, supervisor entry, config, and `/metrics` plug.
> Elixir testing now has generated usage for the previously blocked values: `mox`
> generates a behaviour boundary, mock module, and expectation test; `bypass` generates
> an HTTP fake test; and `wallaby` enables the test endpoint and generates a browser
> feature test for Phoenix projects.
> Elixir auth now covers all exposed auth values: `guardian` generates a token
> implementation plus JSON token endpoints, and `ueberauth` generates provider config,
> controller plug wiring, and `/auth/:provider` routes ready for strategy packages.
> Elixir ORM now separates plain `ecto` from `ecto-sql`: plain Ecto generates schemas
> and changeset-backed catalog functions without Repo/Postgres files, while `ecto-sql`
> remains the Repo, migration, sandbox, and database setup path.
> Elixir LiveView Streams are now explicit generated realtime support: selecting
> `elixirRealtime=live-view-streams` on a Phoenix LiveView app adds the stream-backed
> `/items` LiveView route and module through the generic MCP stack-update path.
> .NET deploy drift is shrinking as well: `dotnetDeploy=azure` now generates an
> Azure Developer CLI Container Apps config, and `dotnetDeploy=aws` now generates an
> AWS Copilot load-balanced service manifest. Both cloud targets reuse the generated
> ASP.NET Core Docker publish path and can be added through MCP stack updates.
> .NET ORM coverage now includes `dotnetOrm=dapper`: the template adds Dapper plus
> the matching ADO.NET provider and renders Minimal API todo endpoints backed by
> Dapper queries, so MCP stack updates can patch existing .NET projects beyond EF Core.
> .NET ORM coverage now also includes `dotnetOrm=linq2db`: the template adds the
> Linq2DB package plus the matching provider and renders Minimal API todo endpoints
> backed by mapped Linq2DB table access, making the full exposed .NET ORM set addable.
> .NET web framework coverage now includes `dotnetWebFramework=aspnet-mvc`: the
> template registers MVC controllers and maps controller routes, with the todo API
> rendered as an `[ApiController]` instead of duplicate Minimal API endpoints.
> Addon drift is shrinking as well: `addons=ultracite` now has deterministic generator
> output for the quiet/default setup path, adding the root Biome config that extends
> `ultracite/biome/core`, the Ultracite/Biome dev dependencies, and root lint/fix/doctor
> scripts so generic MCP stack updates can add it without running the external installer.
> `addons=wxt` is now addable through the same generic path: the generator emits the
> default React WXT extension app under `apps/extension`, including WXT config,
> background/content/popup entrypoints, package scripts, and the package name/port
> adjustment that the CLI wrapper applies after `wxt init`.
> `addons=opentui` now emits the default core OpenTUI app under `apps/tui`, with
> a Bun-driven package, TypeScript config, and real `@opentui/core` renderer entrypoint
> based on the documented core setup. MCP stack updates can add it as a workspace
> app without invoking the external `create-tui` command.
> `addons=fumadocs` now emits a deterministic Fumadocs Next/MDX docs app under
> `apps/docs`, including local MDX content, Fumadocs source config, search route,
> package scripts, and root docs scripts. MCP stack updates can add it without
> invoking `create-fumadocs-app`.
> `addons=skills` now emits a deterministic project-local Better Fullstack skill
> under `.agents/skills/better-fullstack`, so MCP stack updates add useful skill
> files instead of relying on the interactive external skills installer.
> The remaining .NET schema-only options are now represented in the base template:
> `dotnetWebFramework=aspnet-blazor` emits Razor component files and Blazor routing,
> `dotnetAuth=duende-identityserver` wires Duende IdentityServer, and
> `dotnetAuth=auth0-aspnet` wires Auth0 ASP.NET Core authentication.
> Phase 4 graph-authority guard coverage now reaches the stack-update planner/apply
> boundary: if top-level `bts.jsonc` cache fields drift from `stackParts`,
> `bfs_plan_stack_update` still plans from the graph-derived stack, and
> `bfs_apply_stack_update` writes refreshed frontend/backend/cache metadata back
> to `bts.jsonc`. The planner/apply path also preserves existing scoped graph
> ownership for unchanged parts during unrelated flat-field updates, so a
> backend-scoped TypeScript database part does not degrade into an ownerless
> universal database part when adding another capability such as Resend email,
> and direct flat updates to that value keep the existing scoped graph shape.
> MCP graph preview coverage now asserts the same authority rule for stale flat
> cache fields and scoped stack specs. Disabled `none` graph parts from older
> or stale configs no longer appear in human/agent preview metadata such as
> `effectiveStack` and `stackPartSpecs`. URL/import graph state now ignores
> stale flat URL fields when `part` specs are present and treats explicit
> `*:none` graph specs as disabled cache values instead of invalid graph tools.
> Reproducible command generation now follows the same rule: graph-owned
> selections are emitted from `stackParts`, disabled `*:none` specs are not
> emitted as `--part` values, and stale top-level scalar or array cache fields
> do not leak back into generated commands for graph-owned categories.
> CLI config summaries now also filter disabled `*:none` graph specs when
> rendering the human-facing stack part list.
> Phase 3 compatibility consolidation also now routes addon/example disabled
> reasons through graph candidates for PWA/Tauri-style app platforms,
> data-fetching addons such as TanStack Query, workspace tooling such as
> Docker Compose/Backend Utils, and generated examples such as AI and Chat
> SDK, shrinking duplicated flat-only branches.
> Promoted frontend library Fresh/Preact incompatibilities for forms, state
> management, and animation are likewise covered by graph owner-tool checks
> instead of duplicated flat branches.
> TypeScript web/server deploy disabled reasons now route through graph
> deploy candidates as well, so unsupported frontend deploy targets and
> Hono/runtime server deploy constraints share the graph compatibility source.
> Database setup disabled reasons now route through graph-owned database
> candidates too, covering provider/database pairings plus D1/Docker runtime
> constraints without another flat compatibility copy.
> Graph-complete disabled-reason bindings now report whether the graph actually
> evaluated a candidate. For authoritative categories such as CSS, i18n, deploy,
> database setup, and promoted mobile-owned categories, a clean graph result now
> stops older flat fallback branches from second-guessing the graph source.
> Phase 3 compatibility consolidation is now complete for the promoted graph-owned
> role surface: frontend UI checks include Astro integration settings when
> available, addon/example graph checks cover TanStack/Astro and Nx/Turborepo
> conflicts, backend-service owner checks cover TypeScript email/rate-limit
> constraints, Java/.NET/Elixir ecosystem bindings are authoritative, and
> graph-complete categories no longer fall through to duplicated flat library
> branches. Global backend locks and explicit setting-shaped checks remain flat
> by design until their graph-settings shape is settled.
> The remaining mobile-owned single categories, mobile push, OTA, and deep
> linking, are now graph roles too. React Native graph projection round-trips
> them as owner-scoped mobile parts while preserving the existing flat cache
> fields for generator/template compatibility.
> Stack selection and reproducible command generation now emit those mobile
> push/OTA/deep-linking selections as `mobile.*` graph parts when a mobile
> graph owner exists, so stale flat `--mobile-*` cache flags no longer leak
> back into graph-authored commands.
> URL/import graph state, MCP graph preview, and the stack-update planner/apply
> boundary now assert the same rule for those mobile graph roles: stale top-level
> `mobile*` cache fields are ignored when `stackParts` contains owner-scoped
> mobile push, OTA, and deep linking selections, and `bfs_apply_stack_update`
> rewrites the derived cache back to the graph-selected values.
> `bts.jsonc` read/write normalization now applies that rule directly too:
> explicit owner-scoped mobile `none` graph parts prevent older non-`none`
> flat mobile cache values from being preserved during graph persistence, while
> older native configs without those graph roles can still migrate their flat
> mobile feature fields.
> External config replays now share the same normalization path: `create
--config` file/directory sources and full `--from-history` config snapshots
> are projected through the graph-derived cache before becoming create flags,
> so stale flat mobile cache fields cannot override owner-scoped graph parts
> during project replay.

## Delivered Baseline (historical goal)

The MCP server now adds scaffold-time libraries and service integrations to existing Better
Fullstack projects instead of being limited to addon-style tooling.

`bfs_plan_project` and `bfs_create_project` scaffold new projects.
`bfs_plan_stack_update` and `bfs_apply_stack_update` cover the broad create-time field surface for
existing projects. `bfs_plan_addition` and `bfs_add_feature` remain intentionally narrower for
addons and deploy targets.

The remaining step is hardening: cross-version fixtures, clearer recovery artifacts, more
real-repository evidence, and explicit migration guidance for architecture changes.

## Delivered MCP Tools

The two preview-first tools are shipped:

- `bfs_plan_stack_update`: read `bts.jsonc`, merge requested stack fields, run compatibility, and return a dry-run update plan.
- `bfs_apply_stack_update`: apply a previously reviewed update plan to disk with dependency installation disabled.

The plan output should include:

- requested changes and adjusted stack values
- files to add
- files to patch
- dependencies and dev dependencies to add
- environment variables to add
- scripts/config updates
- compatibility warnings
- manual-review blockers

## Historical Implementation Shape

Build reusable category update handlers instead of expanding the current addon path.

Each handler should expose a common contract:

- `detect(config, projectDir)`: inspect current files and existing selection state
- `plan(currentConfig, requestedConfig)`: produce file/dependency/env/script operations
- `apply(plan)`: apply operations only after planning succeeds
- `verify(plan)`: optional focused checks or generated-file assertions

The existing template generator can remain the source of truth for new-project scaffolding, but incremental updates need patch-aware operations that read existing files and avoid replacing user-edited code.

## Phased Scope

### Phase 1: Low-risk services

Start with categories whose generated code is mostly additive:

- `email=resend`
- `observability=sentry`
- caching clients
- search clients
- file storage clients
- analytics and feature-flag clients

These usually require dependencies, env vars, helper files, and one small app initialization hook.

### Phase 2: Framework-sensitive features

Add categories that touch routing, middleware, or framework conventions:

- auth providers
- payments
- CMS
- API layers
- GraphQL
- database setup helpers

These need stronger conflict detection because they can affect app entrypoints, route trees, middleware, schemas, and generated examples.

### Phase 3: Architecture-changing features

Handle features that can change project shape:

- database or ORM swaps
- backend or runtime changes
- frontend additions
- cross-ecosystem stacks

These may need explicit migration workflows rather than automatic patching.

## Safety Rules

- Always plan before applying.
- Never overwrite user-edited files without detecting divergence.
- Refuse or require manual review when a target file has changed beyond a known generated marker.
- Refuse incompatible provider swaps unless a migration path exists.
- Update `bts.jsonc` only after file operations succeed.
- Keep dependency installation disabled in MCP mode; return install and test commands instead.
- Preserve existing `addons` behavior as a separate path until stack updates are proven stable.

## Data Model

Extend project config tracking so existing projects know which scaffold-time categories have been applied.

Options:

- keep using top-level `bts.jsonc` fields for selected categories
- add an `appliedFeatures` or `featureHistory` object for provenance
- store generated file markers where useful, but do not rely on markers alone for conflict detection

The implementation should avoid double-applying env vars, helper files, route handlers, middleware, scripts, and dependencies.

## Testing Strategy

For each category/ecosystem pair:

- scaffold a baseline project
- run `bfs_plan_stack_update`
- assert the plan includes expected files, dependencies, env vars, and config changes
- run `bfs_apply_stack_update`
- assert generated files and `bts.jsonc` are updated
- run focused type or build checks where feasible

Add negative coverage for:

- missing `bts.jsonc`
- incompatible requested providers
- Java `javaBuildTool=none` for SDK-backed features
- existing custom files that would be overwritten
- duplicate application of the same feature

## First Candidate

Use the recently added cross-ecosystem service work as the proving ground:

- Resend email for TypeScript, Python, Go, Rust, and Java
- Sentry observability for TypeScript, Python, Go, Rust, and Java

These integrations exercise the important mechanics while keeping the initial blast radius manageable.
