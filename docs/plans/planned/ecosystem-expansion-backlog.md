# Ecosystem Expansion Backlog

Master tracking file. Detailed plans live in dedicated files per area.

Current snapshot: Better Fullstack now has first-class schema and prompt support for eight ecosystems: TypeScript, React Native, Rust, Python, Go, Java, Elixir, and .NET. This backlog is now a mixed status index: checked items are shipped, while unchecked items remain candidates for deeper template, CLI, web builder, MCP, and docs work.

When updating this file, verify shipped status against `packages/types/src/schemas.ts`, `packages/types/src/option-metadata.ts`, and the ecosystem prompt/template tests rather than older plan text.

## Detailed Plans

| File | Scope |
|------|-------|
| [multi-ecosystem-parity-expansion.md](multi-ecosystem-parity-expansion.md) | Historical/current master plan for June 2026 parity batches; most Tier 1/2 library promotion work has shipped, remaining notes are deferred edge cases |
| **TypeScript** | |
| [typescript-category-expansion.md](typescript-category-expansion.md) | Expand existing TS categories: search, CMS, flags, observability, deploy, etc. |
| [typescript-new-categories.md](typescript-new-categories.md) | New TS categories: GraphQL, i18n, rate limiting, desktop, browser ext, PWA, docs |
| **Existing Ecosystems** | |
| [rust-ecosystem-expansion.md](rust-ecosystem-expansion.md) | Remaining Rust depth after shipped auth, caching, queues, templating, realtime, and observability |
| [go-ecosystem-expansion.md](go-ecosystem-expansion.md) | Remaining Go depth after shipped GraphQL, OAuth, config, queues, caching, realtime, testing, and observability |
| [python-ecosystem-expansion.md](python-ecosystem-expansion.md) | Remaining Python depth after shipped Starlette, Peewee, FastAPI Users, AI, Taskiq, CLI, testing, caching, realtime, and observability |
| **New Ecosystems** | |
| [new-ecosystems.md](new-ecosystems.md) | Index — links to individual ecosystem files below |
| [../completed/java-ecosystem-foundation-2026-04-29.md](../completed/java-ecosystem-foundation-2026-04-29.md) | ✅ Java foundation: Spring Boot, Maven/Gradle, Spring Data JPA, Spring Security, libraries, testing, docs |
| [java-ecosystem-follow-ups.md](java-ecosystem-follow-ups.md) | Remaining Java expansion: Micronaut, jOOQ, MyBatis, Keycloak, messaging, observability |
| [elixir-ecosystem.md](elixir-ecosystem.md) | Elixir foundation shipped; remaining follow-ups for deeper Phoenix/LiveView deployment and advanced library coverage |
| [../completed/dotnet-ecosystem-2026-06-10.md](../completed/dotnet-ecosystem-2026-06-10.md) | ✅ C# foundation shipped 2026-06-10: ASP.NET Core, EF Core, Dapper, Linq2DB, SignalR, multi-ecosystem backend |
| **Platform & Infra** | |
| [platform-features.md](platform-features.md) | Next platform/DX features after shipped MCP, add/history, dry-run, graph stacks, and preview |
| [mcp-incremental-library-updates.md](mcp-incremental-library-updates.md) | Generic MCP stack mutation follow-ups after initial broad tool support landed |
| [docker-and-devcontainers.md](docker-and-devcontainers.md) | Remaining container follow-up: non-monorepo/single-app mode |
| [payment-providers-expansion.md](payment-providers-expansion.md) | Creem.io, Autumn, Commet, and deeper Better Auth payment plugin integration |
| [community-requested-integrations.md](community-requested-integrations.md) | InstantDB, Intlayer, Plasmo, Effect HTTP, raw SQL, and other still-open requests |
| [mobile-react-native.md](mobile-react-native.md) | Remaining mobile depth after shipped navigation, UI, storage, testing, push, OTA, and deep-linking |
| [../completed/documentation-site-2026-04-29.md](../completed/documentation-site-2026-04-29.md) | ✅ Initial user-facing `/docs` site |
| [documentation-follow-ups.md](documentation-follow-ups.md) | Remaining docs: generated flag data, env/provider examples, stack guides |
| [../completed/ci-and-quality-follow-ups-2026-06-30.md](../completed/ci-and-quality-follow-ups-2026-06-30.md) | ✅ Historical quality backlog; active quality work now belongs in specific feature plans and ScaffBench/verification work |
| **Reference** | |
| [../completed/competitive-analysis-2026-05-21.md](../completed/competitive-analysis-2026-05-21.md) | Historical gap analysis vs better-t-stack |
| [../completed/codebase-issues-2026-04-04.md](../completed/codebase-issues-2026-04-04.md) | ✅ Bugs and quality issues from April 2026 audit (all resolved) |

## Quick Reference — All Pending Items

### Deploy
- [x] Add `vercel` ✅
- [x] Add `render` ✅
- [x] Add `netlify` ✅ (web-only v1)

### Auth
- [x] Add `kinde` ✅
- [x] Add `workos` ✅
- [x] Better Auth `organizations` plugin ✅

### Search
- [x] Add `algolia` ✅
- [x] Add `opensearch` ✅
- [x] Add `elasticsearch` ✅

### Feature Flags
- [x] Add `unleash`
- [x] Add `flagsmith`
- [x] Add `launchdarkly`

### Observability
- [x] Add `axiom` ✅
- [x] Add `betterstack` ✅
- [x] Add `datadog` ✅

### CMS
- [x] Add `directus` ✅
- [x] Add `keystatic` ✅

### Storage
- [ ] Add `supabase-storage`
- [x] Add `cloudinary` ✅

### Payments
- [ ] Add `creem`
- [ ] Add `autumn`
- [ ] Add `commet`

### API / GraphQL
- [x] Add `pothos` (GraphQL) ✅
- [x] Add `graphql-yoga` ✅
- [x] Add `apollo-server` ✅
- [x] Add OpenAPI scaffolding ✅
- [ ] Add `effect-http`

### i18n (new category)
- [x] Add `paraglide` ✅
- [x] Add `i18next` ✅
- [x] Add `next-intl` ✅
- [ ] Add `intlayer`

### Rate Limiting (new category)
- [x] Add `upstash-ratelimit` ✅
- [x] Add `arcjet` ✅

### Vector DB (new category)
- [x] Add `pgvector` ✅
- [x] Add `qdrant` ✅
- [x] Add `chroma` ✅
- [x] Add `pinecone` ✅

### Data Fetching (new category)
- [x] Add `swr` ✅

### UI Libraries
- [ ] Add `heroui`
- [x] Add `shadcn-svelte` ✅
- [x] Add mobile `gluestack-ui` ✅

### Monorepo
- [x] Add `nx` ✅

### Desktop / Extensions / Mobile
- [x] Add `tauri` ✅
- [x] Add `wxt` (browser extensions) ✅
- [ ] Add `plasmo` (browser extensions)
- [x] Add `pwa` addon ✅

### Infra / DevOps
- [x] Dockerfile generation for supported deploy/addon stacks ✅
- [x] `docker-compose.yml` generation for supported addon stacks ✅
- [x] DevContainer support ✅
- [x] GitHub Actions CI addon ✅
- [ ] Non-monorepo / single-app mode

### Python Frameworks
- [x] Add `flask` ✅
- [x] Add `litestar` ✅
- [x] Add `starlette` ✅

### Go Frameworks
- [x] Add `chi` ✅
- [x] Add `fiber` ✅
- [ ] Add `stdlib` (net/http)

### Rust Frameworks
- [x] Add `rocket` ✅
- [ ] Add `loco`
- [x] Add `diesel` ✅

### New Language Ecosystems
- [x] Add `java` foundation: Spring Boot, Maven/Gradle, Spring Data JPA, Spring Security, Java libraries/testing ✅
- [ ] Expand Java with Micronaut, jOOQ, MyBatis, Keycloak, messaging, and observability
- [x] Add `elixir` foundation: Phoenix, LiveView, Ecto, auth, REST/Absinthe, realtime, jobs, caching, observability, testing, deploy choices ✅
- [x] Add `c#/aspnet` (ASP.NET Core, EF Core) — full foundation + multi-ecosystem backend support ✅ Shipped 2026-06-10

### Mobile / React Native
- [x] React Native ecosystem foundation ✅
- [x] Navigation (expo-router, react-navigation) ✅
- [x] Mobile UI libs (tamagui, gluestack, nativewind/unistyles path) ✅
- [x] Mobile testing foundation (React Native Testing Library / Maestro choice) ✅
- [x] Push notifications (expo-notifications) ✅
- [x] OTA updates (expo-updates) ✅
- [x] Deep linking (expo-linking) ✅
- [ ] Capacitor (web → mobile)

### Documentation
- [x] User-facing `/docs` site ✅
- [x] Full CLI reference ✅
- [x] Interactive compatibility matrix ✅
- [x] Public roadmap page ✅
- [x] MCP tools reference ✅
- [x] Deployment target docs ✅

### CI / Quality
- [x] Phase 1 quality hardening ✅

### Platform / CLI
- [x] MCP server mode ✅
- [x] `add` command ✅
- [x] `history` command ✅
- [x] Project config (`bts.jsonc`) ✅
- [x] `--dry-run` flag ✅
- [x] Generic MCP stack updates for adding scaffold-time libraries to existing projects ✅
- [x] Cross-ecosystem graph stacks ✅
- [x] Web template preview API ✅
- [ ] Post-scaffold upgrade engine
- [ ] Public verified-combinations status/guarantee
