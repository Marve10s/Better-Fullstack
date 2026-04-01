# TypeScript — New Categories

These are entirely new option categories that don't exist yet in the TypeScript ecosystem.

---

## GraphQL (new category)

Currently no GraphQL option. API choices are limited to tRPC, oRPC, ts-rest, garph.

- [ ] Add `pothos` — most type-safe way to build GraphQL schemas in TypeScript. Code-first, zero runtime overhead. Pairs with GraphQL Yoga.
- [ ] Add `graphql-yoga` — batteries-included GraphQL server by The Guild. Cross-platform, spec-compliant. Works with Pothos, Nexus, TypeGraphQL.
- [ ] Add `apollo-server` — most well-known GraphQL server. Large ecosystem (Apollo Client, Federation). Enterprise-grade.

### Implementation
- Option 1: Add to existing `ApiSchema` as new values
- Option 2: Create separate `GraphqlSchema` category if GraphQL can coexist with REST/tRPC
- Generate schema definitions, resolvers, and client integration
- Add `@pothos/core`, `graphql-yoga`, `@apollo/server` to dependency version map
- Template: `packages/template-generator/templates/api/graphql/` directory

---

## Internationalization / i18n (new category)

No i18n support currently. Common requirement for production apps.

- [ ] Add `paraglide` (Inlang) — type-safe, compile-time i18n. Every key is a typed function. Zero runtime overhead. Official support for TanStack Start, SvelteKit, Astro.
- [ ] Add `i18next` — established standard. Largest ecosystem, most plugins. Framework adapters for React, Vue, Svelte.
- [ ] Add `next-intl` — best choice specifically for Next.js App Router.

### Implementation
- New schema: `I18nSchema = z.enum(["paraglide", "i18next", "next-intl", "none"])`
- New prompt: `apps/cli/src/prompts/i18n.ts`
- Generate locale files, translation setup, and framework-specific integration
- Compatibility: `next-intl` only with `next` frontend. `paraglide` with all except Angular/Qwik.

---

## Rate Limiting (new category)

No rate limiting support. Essential for production API security.

- [ ] Add `upstash-ratelimit` — serverless Redis-based rate limiting. Perfect for edge/serverless. Used in next-forge. Dynamic runtime limits.
- [ ] Add `arcjet` — security-focused: rate limiting + bot detection + shield protection. Growing in Next.js ecosystem.

### Implementation
- New schema: `RateLimitingSchema = z.enum(["upstash-ratelimit", "arcjet", "none"])`
- New prompt: `apps/cli/src/prompts/rate-limiting.ts`
- Generate middleware integration for chosen backend
- Add env vars for API keys/connection strings

---

## Desktop App (new category)

No desktop app support. better-t-stack has Tauri and Electrobun.

- [ ] Add `tauri` — Rust-based desktop framework. Small binaries, native performance. Supports all web frontends as shell.
- [ ] Add `electrobun` — alternative desktop framework. Also supports web frontends.

### Implementation
- Add as addon in `AppPlatformsSchema`
- Generate `src-tauri/` directory with Cargo.toml, tauri.conf.json, main.rs
- Add Tauri CLI to devDependencies
- Compatibility: requires a web frontend (not API-only)

---

## Browser Extension (new category)

No browser extension scaffolding. better-t-stack has WXT.

- [ ] Add `wxt` — cross-browser extension framework. Supports vanilla, Vue, React, Solid, Svelte templates. Manifest v3.

### Implementation
- Add as addon in `AppPlatformsSchema`
- Generate WXT project structure: `wxt.config.ts`, `entrypoints/`, `public/`
- Template variants per frontend framework choice

---

## PWA (new addon)

No Progressive Web App support.

- [ ] Add `pwa` addon — service worker, web app manifest, offline support.

### Implementation
- Add to `AppPlatformsSchema`
- Generate `manifest.json`, service worker registration
- Framework-specific: Next.js uses `next-pwa`, Vite uses `vite-plugin-pwa`
- Add appropriate plugin to framework config

---

## Docs Site (new addon)

No documentation site scaffolding.

- [ ] Add `fumadocs` — docs framework with multiple template variants (next-mdx, waku, react-router, tanstack-start, etc.).
- [ ] Add `starlight` — Astro-based documentation site. Simple, fast, built-in search.

### Implementation
- Already listed in `AppPlatformsSchema` (starlight, fumadocs)
- Generate docs workspace package with chosen framework
- Add to monorepo workspace configuration

---

## Priority Order

1. **GraphQL** (pothos + yoga) — most requested missing API pattern
2. **i18n** (paraglide + i18next) — common production requirement
3. **Rate Limiting** (upstash-ratelimit + arcjet) — security essential
4. **Tauri** — desktop app support, competitive gap
5. **PWA** — simple high-value addon
6. **WXT** — browser extensions
7. **Docs site** — fumadocs/starlight scaffolding
