# Codebase Issues

Validated issues found during April 2026 audit. Each item was verified against the actual code.

---

## P0 — Ship Blockers

### ~~1. Kysely empty Database interface~~ ✅ Fixed
- Now includes `ExampleTable` when auth != "better-auth".

### ~~2. Drizzle schema barrel file exports nothing~~ ✅ Fixed
- Added database-specific example schema templates (postgres, mysql, sqlite) and updated barrel to export from `./example.js` when auth is not better-auth/nextauth.

---

## P1 — Quality

### ~~3. Silent addon setup failures~~ ✅ Fixed
- `addons-setup.ts` now wraps both in try-catch, captures failures as warnings, and returns them.

### ~~4. Untested ORM + auth combinations~~ ✅ Fixed
- Added 11 tests: Drizzle+Clerk, Drizzle+StackAuth+MySQL, Drizzle+Auth0+MySQL, Prisma+Clerk, Prisma+StackAuth+MySQL, Prisma+Auth0+MySQL, Prisma+SupabaseAuth+MySQL, Kysely+NextAuth, Kysely+StackAuth, Kysely+SupabaseAuth, Kysely+Auth0. Previous batch added Kysely+BetterAuth, Kysely+Clerk, Kysely+noAuth.

### 5. No network retry for addon setup
- **Files:** `apps/cli/src/helpers/addons/mcp-setup.ts:327-335`, `apps/cli/src/helpers/addons/skills-setup.ts:294-302`
- **Problem:** Single try/catch, no retry mechanism. Network timeout = silent failure.
- **Fix:** Add simple retry with backoff (2-3 attempts).
- [ ] Add retry logic to mcp-setup
- [ ] Add retry logic to skills-setup

---

## P2 — Polish

### ~~6. Missing trailing newlines (52 .hbs files)~~ ✅ Fixed
- All .hbs files now have proper trailing newlines.

### ~~7. Mixed tabs/spaces in payment templates~~ ✅ Fixed
- Payment templates now use consistent spaces.

### ~~8. "Choose web" prompt message~~ ✅ Fixed
- Now says "Select web framework".

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

### ~~12. No dependency vulnerability scanning~~ ✅ Fixed
- Added `package-ecosystem: "npm"` to `.github/dependabot.yml`.

### ~~13. No SAST scanning~~ ✅ Fixed
- CodeQL workflow added at `.github/workflows/codeql.yaml` (push, PR, weekly schedule).

### ~~14. No release approval gates~~ ✅ Fixed
- Added `environment: npm-publish` to release workflow. Requires creating the environment with protection rules in GitHub settings.

### ~~15. No SBOM generation~~ ✅ Fixed
- Added `--provenance` flag to all `bun publish` commands in release workflow.

### ~~16. No code coverage in CI~~ ✅ Fixed
- Replaced `bun run test` with `bun run --filter=create-better-fullstack test:coverage` in CI, with artifact upload.

### 17. No accessibility testing
- **Problem:** Playwright tests use Chromium only with no axe-core or a11y assertions.
- **Fix:** Add `@axe-core/playwright` and a11y checks to web E2E tests.
- [ ] Add a11y testing

### 18. No cross-browser testing
- **File:** `apps/web/playwright.config.ts:15-20`
- **Problem:** Only Chromium configured. No Firefox or WebKit.
- **Fix:** Add Firefox and WebKit to Playwright projects config.
- [ ] Add cross-browser testing
