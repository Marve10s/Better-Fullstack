# Codebase Issues

Validated issues found during April 2026 audit. Each item was verified against the actual code.

---

## P0 — Ship Blockers

### 1. Kysely empty Database interface
- **File:** `packages/template-generator/templates/db/kysely/base/src/schema/index.ts.hbs`
- **Problem:** When auth != "better-auth", generates an empty `interface Database {}`. No Kysely schema files exist outside the auth conditional. Any Kysely project without better-auth has a broken DB layer.
- **Fix:** Add a fallback interface with at least a placeholder table, or generate a minimal schema regardless of auth choice.
- [ ] Fix template
- [ ] Add tests for Kysely + non-better-auth combos

### 2. Drizzle schema barrel file exports nothing
- **File:** `packages/template-generator/templates/db/drizzle/base/src/schema/index.ts.hbs`
- **Problem:** When auth != "better-auth", the file only contains `export {}`. The auth schema re-export is wrapped in `{{#if (eq auth "better-auth")}}`. Projects using Drizzle with Clerk/Stack-auth/Auth0/Supabase-auth have an empty schema barrel.
- **Fix:** Ensure each auth provider that uses Drizzle generates its own schema exports, or provide a base schema that always exists.
- [ ] Fix template
- [ ] Add tests for Drizzle + Clerk, Drizzle + Stack-auth, Drizzle + Auth0, Drizzle + Supabase-auth

---

## P1 — Quality

### 3. Silent addon setup failures
- **Files:** `apps/cli/src/helpers/addons/mcp-setup.ts:327-335`, `apps/cli/src/helpers/addons/skills-setup.ts:294-302`
- **Problem:** MCP and Skills addon setup failures are caught with `log.warn()` only. The `addHandler()` at `apps/cli/src/helpers/core/add-handler.ts:172` does not check the return value of `setupAddons()`, so it returns `success: true` even when addons failed to install.
- **Fix:** Return failure status from setup functions. Track failed addons and include them in the result.
- [ ] Fix mcp-setup.ts
- [ ] Fix skills-setup.ts
- [ ] Fix addHandler to propagate setup failures

### 4. Untested ORM + auth combinations (14+ gaps)
- **File:** `apps/cli/test/auth.test.ts`
- **Problem:** These combos have zero tests:
  - Kysely + any auth provider (0 tests total)
  - Clerk + Prisma, Clerk + TypeORM, Clerk + MikroORM, Clerk + Sequelize
  - Stack-auth + Prisma + MySQL
  - Auth0 + Prisma + MySQL/SQLite
  - Supabase-auth + Prisma + MySQL/SQLite
- **Fix:** Add test cases for each. Prioritize Kysely combos since they hit issue #1.
- [ ] Add Kysely + auth tests
- [ ] Add remaining ORM + auth combo tests

### 5. No network retry for addon setup
- **Files:** `apps/cli/src/helpers/addons/mcp-setup.ts:327-335`, `apps/cli/src/helpers/addons/skills-setup.ts:294-302`
- **Problem:** Single try/catch, no retry mechanism. Network timeout = silent failure.
- **Fix:** Add simple retry with backoff (2-3 attempts).
- [ ] Add retry logic to mcp-setup
- [ ] Add retry logic to skills-setup

---

## P2 — Polish

### 6. Missing trailing newlines (52 .hbs files)
- **Problem:** 52 template files don't end with a newline. POSIX convention violation, causes diff noise.
- **Sample files:**
  - `templates/frontend/solid/vite.config.ts.hbs`
  - `templates/frontend/react/tanstack-router/vite.config.ts.hbs`
  - `templates/packages/env/package.json.hbs`
- **Fix:** Automated script to add trailing newlines to all .hbs files.
- [ ] Fix all 52 files

### 7. Mixed tabs/spaces in payment templates
- **Problem:** Payment TypeScript templates use tabs, rest of codebase uses spaces.
- **Files:**
  - `templates/payments/polar/server/base/src/lib/payments.ts.hbs`
  - `templates/payments/paddle/server/base/src/lib/paddle.ts.hbs`
  - `templates/payments/lemon-squeezy/server/base/src/lib/lemon-squeezy.ts.hbs`
- **Fix:** Convert tabs to spaces in TypeScript .hbs files. Svelte/Vue can keep tabs (their convention).
- [ ] Fix payment TypeScript templates

### 8. "Choose web" prompt message
- **File:** `apps/cli/src/prompts/frontend.ts:131`
- **Problem:** Prompt says `"Choose web"` instead of a descriptive message like "Select web framework".
- **Fix:** Change to `"Select web framework"`.
- [ ] Fix prompt message

### 9. Shadcn color options: 21 items, no grouping
- **File:** `apps/cli/src/prompts/shadcn-options.ts:54-76`
- **Problem:** 21 color theme options in a flat list with no visual grouping or default highlight.
- **Fix:** Group by temperature (neutral/cool/warm) or add a "recommended" marker.
- [ ] Improve color theme UX

### 10. Incomplete post-install instructions
- **File:** `apps/cli/src/helpers/core/post-installation.ts`
- **Problems:**
  - Line 350-355: Prisma + MongoDB + Docker warning says "may not work" with no actionable steps
  - Line 145-147: Fresh note says "requires deno on PATH" with no install link
  - Turso + Prisma: just says "Follow Turso's Prisma guide"
- **Fix:** Add actionable steps, install commands, or doc links for each.
- [ ] Fix Prisma + MongoDB + Docker instructions
- [ ] Fix Fresh instructions
- [ ] Review all post-install instructions for completeness

### 11. Terse help text
- **File:** `apps/cli/src/index.ts`
- **Problem:** Command descriptions are 5-10 words with no usage context:
  - `add`: "Add addons to an existing Better Fullstack project" (doesn't mention deployment options)
  - `mcp`: "Start MCP server for AI agent integration (stdio transport)" (doesn't explain what agents can do)
  - `builder`: "Open the web-based stack builder" (no URL hint)
- **Fix:** Expand descriptions with examples or key details.
- [ ] Improve help descriptions

---

## P3 — Security

### 12. No dependency vulnerability scanning
- **File:** `.github/dependabot.yml`
- **Problem:** Dependabot only monitors `github-actions`, not npm packages. No `npm audit`, Snyk, or Trivy in any CI workflow.
- **Fix:** Add `package-ecosystem: "npm"` to dependabot.yml or add `npm audit` step to CI.
- [ ] Enable npm dependency scanning

### 13. No SAST scanning
- **Problem:** No CodeQL, SonarQube, or any static application security testing workflow in `.github/workflows/`.
- **Fix:** Add CodeQL workflow for TypeScript/JavaScript analysis.
- [ ] Add CodeQL workflow

### 14. No release approval gates
- **File:** `.github/workflows/release.yaml`
- **Problem:** Release triggers automatically on push to main when commit starts with `chore(release):`. No manual approval, no environment protection rules.
- **Fix:** Add GitHub environment protection rule requiring manual approval before NPM publish.
- [ ] Add release environment with approval requirement

### 15. No SBOM generation
- **Problem:** `bun publish --access public` used without `--provenance` flag. No SBOM tools (CycloneDX, Syft) configured.
- **Fix:** Add `--provenance` to publish commands for npm supply chain attestation.
- [ ] Add provenance to publish

### 16. No code coverage in CI
- **File:** `apps/cli/package.json:103` has `test:coverage` script, but it's never run in CI.
- **Fix:** Add coverage step to CI, upload reports as artifacts.
- [ ] Add coverage to CI workflow

### 17. No accessibility testing
- **Problem:** Playwright tests use Chromium only with no axe-core or a11y assertions.
- **Fix:** Add `@axe-core/playwright` and a11y checks to web E2E tests.
- [ ] Add a11y testing

### 18. No cross-browser testing
- **File:** `apps/web/playwright.config.ts:15-20`
- **Problem:** Only Chromium configured. No Firefox or WebKit.
- **Fix:** Add Firefox and WebKit to Playwright projects config.
- [ ] Add cross-browser testing
