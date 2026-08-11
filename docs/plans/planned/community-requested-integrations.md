# Community-Requested Integrations

Smaller feature requests from GitHub issues across both repos that do not warrant individual plan
files. Status was refreshed on 2026-08-07; completed rows remain visible to prevent duplicate work.

---

## UI Libraries

### Gluestack (better-t-stack #962)

- [ ] Decide whether a separate web/universal Gluestack path is worth adding, or whether mobile-only is enough.

---

## API Styles

### Effect-ts HTTP API (better-t-stack #815)

- [ ] Add `effect-http` — Effect-ts as both backend framework and API layer. Type-safe, composable, built-in error handling. Alternative to tRPC/oRPC for Effect users.
  - **When:** `--effect effect` or `--effect effect-full` is selected
  - **Package:** `@effect/platform`
  - **Category:** API (conditional on Effect selection)

---

## Database

### DB without ORM (better-t-stack #983)

- [ ] Add `raw-sql` or `none` ORM option — raw SQL with type-safe query builders. For teams that want full SQL control.
  - **Packages:** `postgres` (for pg), `mysql2`, `better-sqlite3` + hand-written types
  - **Template:** Connection pool setup, typed query helpers, raw migration files
  - **Category:** ORM (value: "none" with actual DB connection setup, not just skipping)

### InstantDB (better-t-stack #886)

- [ ] Add `instantdb` — realtime database for React + React Native. Optimistic updates, offline-first, relational queries. Firebase alternative with better DX.
  - **Package:** `@instantdb/react`
  - **Category:** Database (similar to Convex — managed, realtime)

---

## i18n

### Intlayer (better-t-stack #888)

- [x] Add `intlayer` with framework-specific providers, dependencies, compatibility, and tests.
  - **Package:** `intlayer`, `next-intlayer` or `react-intlayer`
  - **Template:** Provider setup, per-component declaration files, locale config
  - **Category:** i18n (alongside paraglide, i18next, next-intl — already tracked in typescript-new-categories.md)

---

## AI Agent Frameworks

### Mastra (better-t-stack #633)

- [ ] Verify generated template depth and add quality assertions if it is still dependency-light.
  - **Category:** AI SDK (already tracked — ensure template is comprehensive)

---

## DevTools / Addons

### TanStack DevTools (better-t-stack #856)

- [ ] Add `tanstack-devtools` addon — debugging overlay for TanStack Query, Router, and Form.
  - **Packages:** `@tanstack/react-query-devtools`, `@tanstack/router-devtools`
  - **Template:** DevTools component in root layout (dev-only)
  - **Category:** Addon

### shadcn Customization URLs (better-t-stack #728)

- [ ] Support importing custom shadcn/ui config via URL — shadcn's new feature allows sharing base-UI customization as URLs. Users could paste a shadcn config URL during scaffolding.
  - **Category:** Enhancement to existing shadcn/ui flow

---

## Browser Extensions

### Plasmo (better-t-stack #575)

- [ ] Add `plasmo` — browser extension framework. Supports React, Vue, Svelte. Manifest V3, hot reload, CSUI (Content Script UI). More batteries-included than WXT.
  - **Package:** `plasmo`
  - **Template:** `popup.tsx`, `content.tsx`, `background.ts`, manifest generation
  - **Category:** Addon (alongside WXT — already tracked in typescript-new-categories.md)

---

## Priority Order

1. **Creem.io** (see `payment-providers-expansion.md`)
2. **DB without ORM / raw SQL** — common request for SQL purists
3. **InstantDB** — realtime/offline database option for React + React Native
4. **Plasmo** — browser extensions
5. **Effect HTTP API** — if Effect-heavy stacks keep showing up in benchmarks/issues
6. **Mastra quality pass** — make sure the generated output is more than dependency wiring
7. Remaining items
