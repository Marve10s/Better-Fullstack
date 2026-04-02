# TypeScript — Expand Existing Categories

These are additions to categories that already exist but need more options.

---

## Search (current: meilisearch, typesense)

- [ ] Add `algolia` — managed search-as-a-service. Largest in the market. Instant search, faceting, analytics.
- [ ] Add `opensearch` — AWS-backed open-source fork of Elasticsearch. Good for AWS-heavy stacks.
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

## CMS (current: payload, sanity, strapi, tinacms)

- [ ] Add `directus` — 28k+ stars. Database-first headless CMS. No-code admin panel. Works with any SQL database. Multi-tenancy. Real-time WebSocket support.
- [ ] Add `keystatic` — by Thinkmill (Keystone.js creators). Git-backed CMS for Astro, Next.js, Remix. Markdown/MDX-first.

---

## Feature Flags (current: growthbook, posthog)

- [ ] Add `flagsmith` — open-source, lightweight, cross-platform. REST API. Self-hostable.
- [ ] Add `unleash` — open-source feature flag management. Enterprise-ready. Gradual rollouts.
- [ ] Add `launchdarkly` — enterprise standard. Best governance and compliance. Worth including for enterprise users.

---

## Observability (current: opentelemetry, sentry, grafana)

- [ ] Add `axiom` — modern log management. Serverless-friendly, pay-per-use. Growing in Vercel/Next.js ecosystem.
- [ ] Add `betterstack` — uptime monitoring + logs. Developer-friendly. Good default for smaller teams.
- [ ] Add `datadog` — enterprise observability platform. APM, logs, infrastructure. Industry standard.

---

## Analytics (current: plausible, umami)

- [ ] Add `posthog` (full platform) — all-in-one: analytics, session replay, feature flags, experiments, error tracking, surveys. Replaces multiple tools.

### Note
PostHog is already a feature flags option. Consider promoting it to analytics category too, or making it a cross-category integration.

---

## Caching (current: upstash-redis)

- [ ] Add `redis` (standalone) — self-hosted Redis. For teams not using Upstash serverless.
- [ ] Add `memcached` — in-memory caching. Simpler than Redis for pure caching use cases.
- [ ] Add `dragonfly` — Redis-compatible, 25x faster. Modern drop-in replacement.

---

## Auth (current: better-auth, clerk, nextauth, stack-auth, supabase-auth, auth0)

- [ ] Add `kinde` — developer-friendly auth with generous free tier. Growing fast.
- [ ] Add `workos` — enterprise auth (SSO, SCIM, directory sync). Best for B2B SaaS.

---

## Deploy — Web (current: cloudflare, fly, railway, docker, sst)

- [ ] Add `vercel` — most popular for Next.js/React. Zero-config deployments.
- [ ] Add `render` — simple PaaS. Good for full-stack apps. Auto-deploys from git.
- [ ] Add `netlify` — strong for static/JAMstack. Edge functions, forms, identity.

---

## Deploy — Server (current: cloudflare, fly, railway, docker, sst)

- [ ] Add `vercel` — serverless functions, edge middleware.
- [ ] Add `render` — managed services, background workers.

---

## File Storage (current: s3, r2)

- [ ] Add `supabase-storage` — S3-compatible storage with Supabase. Row-level security, CDN, image transformations.
- [ ] Add `cloudinary` — managed media storage, transformation, and CDN. Image/video optimization, AI-based cropping. (GitHub #80)

---

## Database Setup (current: turso, neon, prisma-postgres, planetscale, mongodb-atlas, supabase, upstash, d1, docker)

- [ ] Add `planetscale` — MySQL-compatible serverless (Vitess-based). Branching, non-blocking schema changes.
- [ ] Add `prisma-postgres` — managed Prisma database. Tightest Prisma integration.
- [ ] Add `d1` — Cloudflare's managed SQLite. Edge-native.

### Note
These may already be in the schema — verify current state before implementing.

---

## AI SDK (current: vercel-ai, mastra, voltagent, langgraph, openai-agents, google-adk, modelfusion, langchain, llamaindex, tanstack-ai)

- [ ] Add `anthropic-sdk` (direct) — if not already available via vercel-ai. Claude API direct integration.
- [ ] Add `instructor` — structured output extraction from LLMs. Works with any provider. Pydantic-validated responses.

---

## Monorepo (current: turborepo only)

- [ ] Add `nx` — enterprise monorepo tool. Project graph, module boundaries, code generation, distributed caching. Better for large teams (30+). Steeper learning curve but pays off at scale.

### Implementation
- Mutually exclusive with turborepo
- Generate `nx.json`, `project.json` files instead of turbo.json
- Adjust workspace scripts

---

## UI Library (current: 12 options)

- [ ] Add `heroui` — formerly NextUI, rebranded Jan 2025. Growing beyond Next.js. Beautiful defaults.

---

## Data Fetching (new section)

No dedicated data-fetching category currently. TanStack Query is available as an addon but SWR is not.

- [ ] Add `swr` — Vercel's stale-while-revalidate data fetching. Smaller bundle than TanStack Query, simpler API. React-only. (GitHub #79, maintainer positive)

---

## API (current: trpc, orpc, ts-rest, garph)

- [ ] Add `rest` / `openapi` — plain REST scaffolding with auto-generated OpenAPI spec and Swagger UI. No RPC overhead. (better-t-stack #631)
- [ ] Add `effect-http` — Effect-ts as API layer. Type-safe, composable. For `--effect` users. (better-t-stack #815)

---

## Priority Order

1. **Deploy** (vercel, render, netlify) — highest user demand
2. **Search** (algolia, opensearch) — natural expansion
3. **REST/OpenAPI** — most common API pattern, currently missing
4. **CMS** (directus, keystatic) — fills gaps
5. **Feature Flags** (flagsmith, unleash) — enterprise demand
6. **Observability** (axiom, betterstack, datadog) — production readiness
7. **Auth** (kinde, workos) — more choices
8. **Nx** — enterprise monorepo
9. Remaining categories
