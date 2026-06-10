# Ecosystem Expansion Backlog

Master tracking file. Detailed plans live in dedicated files per area.

Current snapshot: Better Fullstack now has first-class schema and prompt support for eight ecosystems: TypeScript, React Native, Rust, Python, Go, Java, Elixir, and .NET. This backlog is now a mixed status index: checked items are shipped, while unchecked items remain candidates for deeper template, CLI, web builder, MCP, and docs work.

When updating this file, verify shipped status against `packages/types/src/schemas.ts`, `packages/types/src/option-metadata.ts`, and the ecosystem prompt/template tests rather than older plan text.

## Detailed Plans

| File | Scope |
|------|-------|
| **TypeScript** | |
| [typescript-category-expansion.md](typescript-category-expansion.md) | Expand existing TS categories: search, CMS, flags, observability, deploy, etc. |
| [typescript-new-categories.md](typescript-new-categories.md) | New TS categories: GraphQL, i18n, rate limiting, desktop, browser ext, PWA, docs |
| **Existing Ecosystems** | |
| [rust-ecosystem-expansion.md](rust-ecosystem-expansion.md) | 10 new categories for Rust (frameworks, ORMs, auth, logging, caching, queues, etc.) |
| [go-ecosystem-expansion.md](go-ecosystem-expansion.md) | 12 new categories for Go (frameworks, ORMs, auth, GraphQL, config, queues, etc.) |
| [python-ecosystem-expansion.md](python-ecosystem-expansion.md) | 12 new categories for Python (frameworks, ORMs, auth, GraphQL, CLI, testing, etc.) |
| **New Ecosystems** | |
| [new-ecosystems.md](new-ecosystems.md) | Index — links to individual ecosystem files below |
| [../completed/java-ecosystem-foundation-2026-04-29.md](../completed/java-ecosystem-foundation-2026-04-29.md) | ✅ Java foundation: Spring Boot, Maven/Gradle, Spring Data JPA, Spring Security, libraries, testing, docs |
| [java-ecosystem-follow-ups.md](java-ecosystem-follow-ups.md) | Remaining Java expansion: Micronaut, jOOQ, MyBatis, Keycloak, messaging, observability |
| [elixir-ecosystem.md](elixir-ecosystem.md) | Elixir foundation shipped; remaining follow-ups for deeper Phoenix/LiveView deployment and advanced library coverage |
| [dotnet-ecosystem.md](dotnet-ecosystem.md) | ✅ C# foundation shipped 2026-06-10: ASP.NET Core, EF Core, Dapper, SignalR, multi-ecosystem backend |
| **Platform & Infra** | |
| [platform-features.md](platform-features.md) | CLI features: dry-run, cross-ecosystem, template preview (MCP/add/history done) |
| [mcp-incremental-library-updates.md](mcp-incremental-library-updates.md) | Future MCP stack mutation layer for adding scaffold-time libraries to existing projects |
| [docker-and-devcontainers.md](docker-and-devcontainers.md) | Remaining Docker follow-ups: DevContainers and non-monorepo mode |
| [payment-providers-expansion.md](payment-providers-expansion.md) | Creem.io, Autumn, Commet, Better Auth orgs plugin |
| [community-requested-integrations.md](community-requested-integrations.md) | Cloudinary, SWR, shadcn-svelte, REST API, InstantDB, Intlayer, Plasmo, etc. |
| [mobile-react-native.md](mobile-react-native.md) | Navigation, mobile UI libs, testing, push, Capacitor, OTA updates |
| [../completed/documentation-site-2026-04-29.md](../completed/documentation-site-2026-04-29.md) | ✅ Initial user-facing `/docs` site |
| [documentation-follow-ups.md](documentation-follow-ups.md) | Remaining docs: generated flag data, env/provider examples, stack guides |
| [ci-and-quality.md](ci-and-quality.md) | Remaining quality backlog: cross-browser testing (CI/security foundation + Phase 1 hardening completed) |
| **Reference** | |
| [../completed/competitive-analysis-2026-05-21.md](../completed/competitive-analysis-2026-05-21.md) | Historical gap analysis vs better-t-stack |
| [../completed/codebase-issues-2026-04-04.md](../completed/codebase-issues-2026-04-04.md) | ✅ Bugs and quality issues from April 2026 audit (all resolved) |

## Quick Reference — All Pending Items

### Deploy
- [x] Add `vercel` ✅
- [x] Add `render` ✅
- [x] Add `netlify` ✅ (web-only v1)

### Auth
- [ ] Add `kinde`
- [ ] Add `workos`
- [ ] Better Auth `organizations` plugin

### Search
- [x] Add `algolia` ✅
- [ ] Add `opensearch`
- [x] Add `elasticsearch` ✅

### Feature Flags
- [x] Add `unleash`
- [x] Add `flagsmith`
- [x] Add `launchdarkly`

### Observability
- [ ] Add `axiom`
- [ ] Add `betterstack`
- [ ] Add `datadog`

### CMS
- [ ] Add `directus`
- [ ] Add `keystatic`

### Storage
- [ ] Add `supabase-storage`
- [ ] Add `cloudinary`

### Payments
- [ ] Add `creem`
- [ ] Add `autumn`
- [ ] Add `commet`

### API / GraphQL
- [x] Add `pothos` (GraphQL) ✅
- [x] Add `graphql-yoga` ✅
- [ ] Add `apollo-server`
- [ ] Add `rest` / OpenAPI scaffolding
- [ ] Add `effect-http`

### i18n (new category)
- [ ] Add `paraglide`
- [x] Add `i18next` ✅
- [x] Add `next-intl` ✅
- [ ] Add `intlayer`

### Rate Limiting (new category)
- [ ] Add `upstash-ratelimit`
- [ ] Add `arcjet`

### Data Fetching (new category)
- [ ] Add `swr`

### UI Libraries
- [ ] Add `heroui`
- [ ] Add `shadcn-svelte`
- [ ] Add `gluestack`

### Monorepo
- [ ] Add `nx`

### Desktop / Extensions / Mobile
- [x] Add `tauri` ✅
- [x] Add `wxt` (browser extensions) ✅
- [ ] Add `plasmo` (browser extensions)
- [x] Add `pwa` addon ✅

### Infra / DevOps
- [x] Dockerfile generation for supported deploy/addon stacks ✅
- [x] `docker-compose.yml` generation for supported addon stacks ✅
- [ ] DevContainer support
- [ ] Non-monorepo / single-app mode

### Python Frameworks
- [x] Add `flask` ✅
- [x] Add `litestar` ✅
- [ ] Add `starlette`

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
- [ ] Push notifications (expo-notifications)
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
- [ ] MCP stack updates for adding scaffold-time libraries to existing projects
- [ ] Cross-ecosystem stacks (research)
