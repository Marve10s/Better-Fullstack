# TypeScript — Expand Existing Categories

These are additions to categories that already exist. Status was refreshed against
`packages/types/src/schemas.ts`, `packages/template-generator/templates/`, CLI prompts, and web
builder metadata on 2026-06-30.

---

## Search

- [x] Add `algolia` ✅ — managed search-as-a-service. Largest in the market. Instant search, faceting, analytics.
- [x] Add `opensearch` ✅ — AWS-backed open-source fork of Elasticsearch. Good for AWS-heavy stacks.
- [x] Add `elasticsearch` ✅ Merged. Now in `SearchSchema`.

### Files to touch per addition
- `packages/types/src/schemas.ts` — add to `SearchSchema`
- `packages/template-generator/src/processors/search-deps.ts` — add dependency
- `packages/template-generator/src/processors/env-vars.ts` — add env variables
- `packages/template-generator/src/utils/add-deps.ts` — add version
- `packages/template-generator/templates/search/{name}/server/base/src/lib/search.ts.hbs` — new template
- `apps/web/src/lib/constant.ts` — builder entry
- `apps/web/src/lib/tech-icons.ts` — icon
- `apps/web/src/lib/tech-resource-links.ts` — docs/github links

---

## CMS

- [x] Add `directus` ✅ — database-first headless CMS.
- [x] Add `keystatic` ✅ — Git-backed CMS for Astro/Next-style content workflows.

## Feature Flags

- [x] Add `flagsmith` ✅ — open-source, lightweight, cross-platform.
- [x] Add `unleash` ✅ — open-source feature flag management.
- [x] Add `launchdarkly` ✅ — enterprise feature flag provider.

## Observability

- [x] Add `axiom` ✅ — modern log management.
- [x] Add `betterstack` ✅ — uptime monitoring + logs.
- [x] Add `datadog` ✅ — enterprise observability platform.

## Analytics

- [ ] Add `posthog` (full platform) — all-in-one: analytics, session replay, feature flags, experiments, error tracking, surveys. Replaces multiple tools.

### Note
PostHog is already a feature flags option. Consider promoting it to analytics category too, or making it a cross-category integration.

---

## Caching (current: upstash-redis)

- [ ] Add `redis` (standalone) — self-hosted Redis. For teams not using Upstash serverless.
- [ ] Add `memcached` — in-memory caching. Simpler than Redis for pure caching use cases.
- [ ] Add `dragonfly` — Redis-compatible, 25x faster. Modern drop-in replacement.

---

## Auth

- [x] Add `kinde` ✅ — developer-friendly auth.
- [x] Add `workos` ✅ — enterprise auth with SSO/directory-sync positioning.
- [x] Add `better-auth-organizations` ✅ — Better Auth organization plugin path with generated organization schema/client/server wiring.

## Deploy — Web

- [x] Add `vercel` ✅ — most popular for Next.js/React. Zero-config deployments.
- [x] Add `render` ✅ — simple PaaS.
- [x] Add `netlify` ✅ — web/server deploy option with compatibility rules.

## Deploy — Server

- [x] Add `vercel` ✅ — serverless functions, edge middleware.
- [x] Add `render` ✅ — managed services/background worker deployment target.
- [x] Add `netlify` ✅ — server deploy target for supported backend/runtime combinations.

## File Storage

- [ ] Add `supabase-storage` — S3-compatible storage with Supabase. Row-level security, CDN, image transformations.
- [x] Add `cloudinary` ✅ — managed media storage, transformation, and CDN. (GitHub #80)

## Database Setup

- [x] `planetscale`, `prisma-postgres`, and `d1` are already first-class database setup options.
- [ ] Revisit generated provider setup depth: credentials, branch/database creation hints, and MCP stack-update defaults.

---

## AI SDK (current: vercel-ai, mastra, voltagent, langgraph, openai-agents, google-adk, modelfusion, langchain, llamaindex, tanstack-ai)

- [ ] Add `anthropic-sdk` (direct) — if not already available via vercel-ai. Claude API direct integration.
- [ ] Add `instructor` — structured output extraction from LLMs. Works with any provider. Pydantic-validated responses.

---

## Monorepo (current: turborepo only)

- [x] Add `nx` ✅ — enterprise monorepo tool with `nx.json`, package scripts, and mutual-exclusion compatibility with Turborepo.

### Implementation
- Mutually exclusive with turborepo
- Generate `nx.json`, `project.json` files instead of turbo.json
- Adjust workspace scripts

---

## UI Library

- [ ] Add `heroui` — formerly NextUI, rebranded Jan 2025. Growing beyond Next.js. Beautiful defaults.
- [x] Add `shadcn-svelte` ✅ — shipped as a Svelte-compatible UI library option.

---

## Data Fetching

- [x] Add `swr` ✅ — shipped as an addon/data-fetching option for compatible web frontends. (GitHub #79)
- [ ] Decide whether data-fetching should stay addon-shaped or become a dedicated stack graph role alongside TanStack Query.

---

## API

- [x] Add `openapi` ✅ — REST/OpenAPI scaffolding with generated API reference path. (better-t-stack #631)
- [x] Add `apollo-server` ✅ — Apollo Server GraphQL API option.
- [ ] Add `effect-http` — Effect-ts as API layer. Type-safe, composable. For `--effect` users. (better-t-stack #815)

---

## Priority Order

1. **Payments depth** — Creem, Autumn, Commet, plus Better Auth payment-plugin wiring.
2. **Generated-project CI quality** — polish the GitHub Actions addon and make generated projects self-checking.
3. **Analytics depth** — decide whether PostHog should exist in analytics as well as feature flags.
4. **Caching expansion** — standalone Redis, Dragonfly, or Memcached if demand justifies more than Upstash.
5. **Supabase Storage** — remaining obvious storage provider gap.
6. **Effect HTTP** — API layer for Effect-heavy stacks.
7. **HeroUI** — revisit naming/compatibility now that `nextui` already exists.
8. **Data-fetching role** — decide whether SWR/TanStack Query should move out of addon semantics.
