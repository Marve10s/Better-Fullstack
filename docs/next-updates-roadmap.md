# Better Fullstack — Current Next Updates Roadmap

> **Updated:** 2026-06-30 after auditing `docs/plans`, schemas, template directories, MCP tools,
> package scripts, smoke/ScaffBench harnesses, and web builder metadata.
>
> **How to read this:** Completed June work is summarized first so old roadmap items do not get
> re-selected. The recommended next update is the smallest product slice that compounds the current
> quality and stack-graph foundation.

---

## Current Baseline

Better Fullstack now has first-class support for eight ecosystems: TypeScript, React Native, Rust,
Python, Go, Java, Elixir, and .NET. The recent codebase has moved well beyond the older backlog:

- Generic stack graph parts and multi-ecosystem `--part role:ecosystem:tool` workflows are present.
- ScaffBench 2 exists (`bun run scaffbench:2`, `scaffbench:2:quality`, `scaffbench:solvability`).
- Schema/template coverage and check-types coverage guards exist in CLI tests.
- Generic MCP stack-update tools exist: `bfs_plan_stack_update` and `bfs_apply_stack_update`.
- TypeScript added OpenSearch, Apollo Server, OpenAPI, vector DBs, Paraglide, rate limiting,
  DevContainers, GitHub Actions, Cloudinary, SWR, shadcn-svelte, Keystatic, Directus, Axiom,
  Better Stack, Datadog, Kinde, WorkOS, and Better Auth organizations.
- React Native added navigation, UI, MMKV, Maestro/RNTL, Expo Notifications, Expo Updates, and
  Expo Linking.
- Go/Python/Rust/Java/Elixir/.NET parity batches added many categories that older plan docs still
  listed as future work.

---

## Recommended Next Update

### 1. Public Verified-Combination Status

This is the highest-leverage next product update because it turns Better Fullstack's quality work
into a visible promise.

- Publish a status page or generated markdown artifact from smoke, ScaffBench, and release-guard
  outputs.
- Show each checked stack, command, ecosystem, validation steps, pass/fail state, and owning template
  area.
- Add a small badge/claim only for the combinations the current harness actually verifies.
- Start with curated presets, not every theoretical combination.

Why now: ScaffBench 2, schema/template coverage, check-types coverage, package smoke presets, and
generated-project verifiers already exist. The gap is productizing the evidence.

### 2. Generated-Project CI Quality

The `github-actions` addon exists; the next step is making generated CI useful.

- Generate ecosystem-aware install/typecheck/build/test workflows.
- Keep workflows conservative: run only checks that the selected stack actually defines.
- Add a published-package smoke lane for preview/canary packages across Bun, npm, and pnpm so
  package metadata and registry installs are tested outside the source checkout.
- Add template tests that assert CI output for TypeScript, React Native, Rust, Python, Go, Java,
  Elixir, and .NET presets.
- Use this as the source data for the public verified-combinations page.

### 3. Harden MCP Stack Updates, Then Promote Them To User-Facing Add

Generic MCP stack updates have landed, but they should become a supported product path, not just an
agent interface.

- Keep `bfs_plan_stack_update` / `bfs_apply_stack_update` preview-first semantics.
- Add CLI affordances once the overwrite/conflict model is stable.
- Prioritize additive service updates first: email, observability, search, vector DB, file storage,
  rate limiting, mobile features, and generated CI.
- Keep risky architecture swaps behind explicit review: database, ORM, auth, API, payment provider.

### 4. Agent Plugin Distribution

Better Fullstack already has MCP tools, generated agent docs, and repo-local skills. The next
distribution step is a first-class agent plugin bundle that makes those surfaces installable as one
product.

- Package a plugin manifest with the Better Fullstack MCP server, scaffold/add skills, and install
  metadata for agent clients that support plugins.
- Reuse the existing `bfs_*` MCP flow instead of creating a parallel scaffolding path.
- Include skill triggers for project creation, additive stack updates, and existing-project addon
  workflows.
- Keep generated projects side-effect-light by default: plan first, create with installs disabled,
  then report exact install/test/dev commands.

### 5. AI Chat Example Modernization

The generated AI example should feel like a current product surface, not a bare streaming demo.

- Upgrade the TypeScript AI example surface to AI SDK 7 response helpers across supported backends.
- Prefer shared shadcn-style chat components for React web stacks when the selected UI setup
  supports them.
- Keep non-React and native examples aligned on the same message shape, transport assumptions, and
  env variables.
- Add snapshot and generated-project checks for at least Next, TanStack Start, Hono/Express/Elysia,
  and React Native AI presets.

### 6. Post-Scaffold Upgrade Engine

This is the next major-version moat after stack updates are stable.

- Record scaffold metadata: generator version, template version, stack graph, and selected package
  channel.
- Re-render the intended current template output and diff it against the user's project.
- Produce a reviewable plan instead of overwriting files.
- Add `bfs check` for CI drift detection and `bfs update` for guided patch application.

---

## Integration Backlog Worth Doing Next

These are still open after the docs refresh:

- Payments: `creem`, `autumn`, `commet`, Better Auth payment-plugin wiring, and an organizations +
  billing + entitlement preset.
- Data/storage: Supabase Storage, InstantDB, raw SQL/no-ORM mode.
- i18n/browser/desktop: Intlayer, Plasmo, Electrobun.
- API/runtime: Effect HTTP.
- Workspace shape: non-monorepo / single-app mode.
- Mobile depth: Capacitor, TanStack Query mobile offline defaults, Legend State/offline data.
- Ecosystem depth: Go stdlib and Bun ORM, Rust Loco/Poem and Kafka, Java Micronaut/gRPC/log4j2,
  Python search category, Elixir validation/deploy-depth passes.

---

## Not Next Anymore

Do not pick these from old docs as if they are still missing:

- .NET foundation
- Cross-ecosystem stack graph
- Template preview API
- DevContainers
- GitHub Actions addon
- Vector DB category
- OpenAPI and Apollo Server
- OpenSearch
- Paraglide
- Arcjet and Upstash RateLimit
- Cloudinary
- SWR
- shadcn-svelte
- Kinde, WorkOS, and Better Auth organizations
- Python Starlette/Peewee/FastAPI Users/Pydantic AI/Taskiq/CLI/testing/cache/realtime/OTel
- Go gqlgen/Goth/Viper/Koanf/NATS/Watermill/Redis/Ristretto/realtime/testing/OTel
- Rust Torii/Lapin/Askama/Tera/tokio-tungstenite/OpenTelemetry
- Java jOOQ/MyBatis/Keycloak/Spring GraphQL/Spring AMQP/OpenTelemetry/logback
- Elixir gRPC/Broadway/Nx advanced-library surface
