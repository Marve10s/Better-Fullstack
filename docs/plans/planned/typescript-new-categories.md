# TypeScript — New Categories

These are new TypeScript-facing categories and addon-style surfaces. Status was refreshed on
2026-08-07 against the schema, template tree, CLI prompts, MCP fields, and web builder metadata.
Completed rows remain visible to prevent duplicate roadmap work.

---

## Internationalization / i18n

- [x] Add `intlayer` with framework compatibility, templates, CLI, and builder support.

### Implementation

- New schema: `I18nSchema = z.enum(["paraglide", "i18next", "next-intl", "none"])`
- New prompt: `apps/cli/src/prompts/i18n.ts`
- Generate locale files, translation setup, and framework-specific integration
- Compatibility: `next-intl` only with `next` frontend. `paraglide` with all except Angular/Qwik.

---

## Desktop App (new category)

Desktop support now has Tauri; Electrobun remains the open alternative runtime option.

- [ ] Add `electrobun` — alternative desktop framework. Also supports web frontends.

### Implementation

- Add as addon in `AppPlatformsSchema`
- Generate `src-tauri/` directory with Cargo.toml, tauri.conf.json, main.rs
- Add Tauri CLI to devDependencies
- Compatibility: requires a web frontend (not API-only)

---

## Browser Extension — Plasmo

WXT is already tracked above. Plasmo is a more batteries-included alternative.

- [ ] Add `plasmo` — browser extension framework. React/Vue/Svelte support. Manifest V3, hot reload, Content Script UI (CSUI). More opinionated than WXT.

---

## Priority Order

1. **Plasmo** — richer browser-extension option beyond WXT.
2. **Electrobun** — optional desktop alternative after Tauri.
3. **Registry/capability packs** — graduate addon-style surfaces into reusable community/private packs.
