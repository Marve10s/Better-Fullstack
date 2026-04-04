# CI / Testing / Quality Infrastructure

Tracks the quality backlog that remains after the verified CI/security baseline and Phase 1 hardening work moved into `docs/plans/completed/ci-security-foundation-2026-04-04.md` and `docs/plans/completed/phase-1-quality-hardening-2026-04-04.md`.

---

## Template Validation

- [x] Scheduled matrix validation now runs generated-project typechecks
  - `.github/workflows/template-matrix.yaml` now builds `packages/types`, `packages/template-generator`, and `apps/cli`
  - The weekly/manual workflow runs `testing/smoke-test.ts` for curated representative presets: `t3`, `tanstack-fullstack`, `react-hono`, `sveltekit`, `astro-sanity`, and `nuxt-fullstack`
  - Each preset job uploads its smoke-test output as an artifact for failure triage

---

## Cross-Browser Testing (codebase-issues #18)

- [ ] Add Firefox and WebKit to Playwright config
  - Currently Chromium-only in `apps/web/playwright.config.ts`
  - At minimum add WebKit (Safari-like) — catches flexbox/grid rendering differences
  - Firefox optional but recommended

---

## Priority Order

1. **Cross-browser testing** — broadens web confidence beyond Chromium
