# TypeScript — New Categories

These are new TypeScript-facing categories and addon-style surfaces. Status was refreshed on
2026-06-30 against the schema, template tree, CLI prompts, MCP fields, and web builder metadata.

---

## GraphQL (new category)

- [x] Add `pothos` ✅ — most type-safe way to build GraphQL schemas in TypeScript. Code-first, zero runtime overhead. Pairs with GraphQL Yoga.
- [x] Add `graphql-yoga` ✅ — batteries-included GraphQL server by The Guild. Cross-platform, spec-compliant. Works with Pothos, Nexus, TypeGraphQL.
- [x] Add `apollo-server` ✅ — most well-known GraphQL server. Large ecosystem (Apollo Client, Federation). Enterprise-grade.

### Implementation
- Option 1: Add to existing `ApiSchema` as new values
- Option 2: Create separate `GraphqlSchema` category if GraphQL can coexist with REST/tRPC
- Generate schema definitions, resolvers, and client integration
- Add `@pothos/core`, `graphql-yoga`, `@apollo/server` to dependency version map
- Template: `packages/template-generator/templates/api/graphql/` directory

---

## Internationalization / i18n

- [x] Add `paraglide` (Inlang) ✅ — type-safe, compile-time i18n.
- [x] Add `i18next` ✅ — established standard. Largest ecosystem, most plugins. Framework adapters for React, Vue, Svelte.
- [x] Add `next-intl` ✅ — best choice specifically for Next.js App Router.
- [ ] Add `intlayer` — still tracked in `community-requested-integrations.md`.

### Implementation
- New schema: `I18nSchema = z.enum(["paraglide", "i18next", "next-intl", "none"])`
- New prompt: `apps/cli/src/prompts/i18n.ts`
- Generate locale files, translation setup, and framework-specific integration
- Compatibility: `next-intl` only with `next` frontend. `paraglide` with all except Angular/Qwik.

---

## Rate Limiting

- [x] Add `upstash-ratelimit` ✅ — serverless Redis-based rate limiting.
- [x] Add `arcjet` ✅ — security-focused rate limiting + shield protection.

### Implementation
- New schema: `RateLimitingSchema = z.enum(["upstash-ratelimit", "arcjet", "none"])`
- New prompt: `apps/cli/src/prompts/rate-limiting.ts`
- Generate middleware integration for chosen backend
- Add env vars for API keys/connection strings

---

## Desktop App (new category)

Desktop support now has Tauri; Electrobun remains the open alternative runtime option.

- [x] Add `tauri` ✅ — Rust-based desktop framework. Small binaries, native performance. Supports all web frontends as shell.
- [ ] Add `electrobun` — alternative desktop framework. Also supports web frontends.

### Implementation
- Add as addon in `AppPlatformsSchema`
- Generate `src-tauri/` directory with Cargo.toml, tauri.conf.json, main.rs
- Add Tauri CLI to devDependencies
- Compatibility: requires a web frontend (not API-only)

---

## Browser Extension (new category)

Browser extension scaffolding is now exposed through the WXT addon path.

- [x] Add `wxt` ✅ — cross-browser extension framework. Supports vanilla, Vue, React, Solid, Svelte templates. Manifest v3.

### Implementation
- Add as addon in `AppPlatformsSchema`
- Generate WXT project structure: `wxt.config.ts`, `entrypoints/`, `public/`
- Template variants per frontend framework choice

---

## PWA (new addon)

Progressive Web App support is now exposed as an addon for compatible web frontends.

- [x] Add `pwa` addon ✅ — service worker, web app manifest, offline support.

### Implementation
- Add to `AppPlatformsSchema`
- Generate `manifest.json`, service worker registration
- Framework-specific: Next.js uses `next-pwa`, Vite uses `vite-plugin-pwa`
- Add appropriate plugin to framework config

---

## Docs Site (new addon)

Documentation site scaffolding is now exposed through docs-site addons.

- [x] Add `fumadocs` ✅ — docs framework with multiple template variants (next-mdx, waku, react-router, tanstack-start, etc.).
- [x] Add `starlight` ✅ — Astro-based documentation site. Simple, fast, built-in search.

### Implementation
- Already listed in `AppPlatformsSchema` (starlight, fumadocs)
- Generate docs workspace package with chosen framework
- Add to monorepo workspace configuration

---

## Browser Extension — Plasmo

WXT is already tracked above. Plasmo is a more batteries-included alternative.

- [ ] Add `plasmo` — browser extension framework. React/Vue/Svelte support. Manifest V3, hot reload, Content Script UI (CSUI). More opinionated than WXT.

---

## Vector Database

Vector DB support is now a first-class category for TypeScript AI/semantic-search stacks.

- [x] Add `pgvector` ✅
- [x] Add `qdrant` ✅
- [x] Add `chroma` ✅
- [x] Add `pinecone` ✅

---

## Generated CI

- [x] Add `github-actions` addon ✅ — generated projects can now opt into GitHub Actions workflow scaffolding.
- [ ] Expand generated CI presets into a stronger verified-project default: install + typecheck/build/test per ecosystem.

---

## Priority Order

1. **Generated CI quality** — make generated GitHub Actions workflows a meaningful install/build/typecheck/test guard.
2. **Intlayer** — remaining i18n request after Paraglide/i18next/next-intl.
3. **Plasmo** — richer browser-extension option beyond WXT.
4. **Electrobun** — optional desktop alternative after Tauri.
5. **Registry/capability packs** — graduate addon-style surfaces into reusable community/private packs.
