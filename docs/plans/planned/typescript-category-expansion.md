# TypeScript — Expand Existing Categories

These are additions to categories that already exist. Status was refreshed against
`packages/types/src/schemas.ts`, `packages/template-generator/templates/`, CLI prompts, and web
builder metadata on 2026-08-07. Completed rows remain visible to prevent duplicate roadmap work.

---

## Analytics

- [x] Add `posthog` to analytics while retaining its feature-flags role.

### Note

PostHog is available in both analytics and feature flags. Remaining work is generated example and
provider-setup depth, not another schema value.

---

## Caching (current: upstash-redis)

- [x] Add `redis` (standalone) with ioredis helpers, environment values, and Docker Compose support.
- [ ] Add `memcached` — in-memory caching. Simpler than Redis for pure caching use cases.
- [ ] Add `dragonfly` — Redis-compatible, 25x faster. Modern drop-in replacement.

---

## File Storage

- [x] Add `supabase-storage` with generated server helpers and environment values.

## Database Setup

- [ ] Revisit generated provider setup depth: credentials, branch/database creation hints, and MCP stack-update defaults.

---

## AI SDK (current: vercel-ai, mastra, voltagent, langgraph, openai-agents, google-adk, modelfusion, langchain, llamaindex, tanstack-ai)

- [x] Add `anthropic-sdk` direct integration.
- [ ] Add `instructor` — structured output extraction from LLMs. Works with any provider. Pydantic-validated responses.

---

## UI Library

- [ ] Add `heroui` — formerly NextUI, rebranded Jan 2025. Growing beyond Next.js. Beautiful defaults.

---

## Data Fetching

- [ ] Decide whether data-fetching should stay addon-shaped or become a dedicated stack graph role alongside TanStack Query.

---

## API

- [ ] Add `effect-http` — Effect-ts as API layer. Type-safe, composable. For `--effect` users. (better-t-stack #815)

---

## Priority Order

1. **Payments depth** — Creem, Autumn, Commet, plus Better Auth payment-plugin wiring.
2. **Generated-project CI quality** — polish the GitHub Actions addon and make generated projects self-checking.
3. **Analytics depth** — deepen generated PostHog examples across its two roles.
4. **Caching expansion** — Dragonfly or Memcached if demand justifies more than Redis/Upstash.
5. **Effect HTTP** — API layer for Effect-heavy stacks.
6. **HeroUI** — revisit naming/compatibility now that `nextui` already exists.
7. **Data-fetching role** — decide whether SWR/TanStack Query should move out of addon semantics.
