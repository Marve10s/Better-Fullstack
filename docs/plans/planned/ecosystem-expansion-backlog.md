# Ecosystem Expansion Backlog

Master tracking file. Detailed plans live in dedicated files per area.

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
| [java-ecosystem.md](java-ecosystem.md) | Java: Spring Boot, Quarkus, Micronaut, JPA, jOOQ, Spring Security, etc. |
| [elixir-ecosystem.md](elixir-ecosystem.md) | Elixir: Phoenix, Ecto, LiveView, Oban, Absinthe, etc. |
| [dotnet-ecosystem.md](dotnet-ecosystem.md) | C#: ASP.NET Core, EF Core, Dapper, SignalR, etc. |
| **Platform & Infra** | |
| [platform-features.md](platform-features.md) | CLI features: dry-run, cross-ecosystem, template preview (MCP/add/history done) |
| [docker-and-devcontainers.md](docker-and-devcontainers.md) | Dockerfile gen, docker-compose, DevContainers, non-monorepo mode |
| [payment-providers-expansion.md](payment-providers-expansion.md) | Creem.io, Autumn, Commet, Better Auth orgs plugin |
| [community-requested-integrations.md](community-requested-integrations.md) | Cloudinary, SWR, shadcn-svelte, REST API, InstantDB, Intlayer, Plasmo, etc. |
| [mobile-react-native.md](mobile-react-native.md) | Navigation, mobile UI libs, testing, push, Capacitor, OTA updates |
| [documentation-site.md](documentation-site.md) | User-facing docs: getting started, CLI ref, compatibility matrix, public roadmap |
| [ci-and-quality.md](ci-and-quality.md) | Remaining quality backlog: cross-browser testing (CI/security foundation + Phase 1 hardening completed) |
| **Reference** | |
| [competitive-analysis.md](competitive-analysis.md) | Gap analysis vs better-t-stack |
| [../completed/codebase-issues-2026-04-04.md](../completed/codebase-issues-2026-04-04.md) | ✅ Bugs and quality issues from April 2026 audit (all resolved) |

## Quick Reference — All Pending Items

### Deploy
- [ ] Add `vercel`
- [ ] Add `render`
- [ ] Add `netlify`

### Auth
- [ ] Add `kinde`
- [ ] Add `workos`
- [ ] Better Auth `organizations` plugin

### Search
- [ ] Add `algolia`
- [ ] Add `opensearch`
- [x] Add `elasticsearch` ✅

### Feature Flags
- [ ] Add `unleash`
- [ ] Add `flagsmith`
- [ ] Add `launchdarkly`

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
- [ ] Add `pothos` (GraphQL)
- [ ] Add `graphql-yoga`
- [ ] Add `apollo-server`
- [ ] Add `rest` / OpenAPI scaffolding
- [ ] Add `effect-http`

### i18n (new category)
- [ ] Add `paraglide`
- [ ] Add `i18next`
- [ ] Add `next-intl`
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
- [ ] Add `tauri`
- [ ] Add `wxt` (browser extensions)
- [ ] Add `plasmo` (browser extensions)
- [ ] Add `pwa` addon

### Infra / DevOps
- [ ] Dockerfile generation per app
- [ ] `docker-compose.yml` generation
- [ ] DevContainer support
- [ ] Non-monorepo / single-app mode

### Python Frameworks
- [ ] Add `flask`
- [ ] Add `litestar`
- [ ] Add `starlette`

### Go Frameworks
- [ ] Add `chi`
- [ ] Add `fiber`
- [ ] Add `stdlib` (net/http)

### Rust Frameworks
- [ ] Add `rocket`
- [ ] Add `loco`
- [ ] Add `diesel`

### New Language Ecosystems
- [ ] Add `java` (Spring Boot, Quarkus)
- [ ] Add `elixir` (Phoenix, LiveView)
- [ ] Add `c#/aspnet` (ASP.NET Core, EF Core)

### Mobile / React Native
- [ ] Navigation (expo-router, react-navigation)
- [ ] Mobile UI libs (tamagui, gluestack, nativewind)
- [ ] Mobile testing (maestro, detox)
- [ ] Push notifications (expo-notifications)
- [ ] Capacitor (web → mobile)

### Documentation
- [ ] User-facing docs site (Fumadocs or Starlight)
- [ ] Auto-generated CLI reference
- [ ] Interactive compatibility matrix
- [ ] Public roadmap page

### CI / Quality
- [x] Phase 1 quality hardening ✅

### Platform / CLI
- [x] MCP server mode ✅
- [x] `add` command ✅
- [x] `history` command ✅
- [x] Project config (`bts.jsonc`) ✅
- [x] `--dry-run` flag ✅
- [ ] Cross-ecosystem stacks (research)
