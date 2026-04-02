# CI / Testing / Quality Infrastructure

Consolidates the P3 security items from `codebase-issues.md` plus testing gaps identified during audits. The goal is production-grade CI that catches real issues without slowing down development.

---

## Dependency Scanning

### Dependabot for npm (codebase-issues #12)

- [ ] Add `package-ecosystem: "npm"` to `.github/dependabot.yml`
  - Currently only monitors `github-actions`
  - Should cover: root, `apps/cli`, `apps/web`, `packages/template-generator`, `packages/types`
  - Group minor/patch updates to reduce PR noise

### npm audit in CI

- [ ] Add `npm audit` or `bun audit` step to test workflow
  - Run on PRs, fail on high/critical vulnerabilities
  - Allow suppression via `.npmrc` audit config for known false positives

---

## Static Analysis / SAST (codebase-issues #13)

- [ ] Add CodeQL workflow for TypeScript/JavaScript
  - `.github/workflows/codeql.yml`
  - Schedule: weekly + on PR
  - Languages: `javascript-typescript`
  - Default queries + security-extended query suite
  - Low effort, high value — catches injection, XSS, prototype pollution

---

## Code Coverage (codebase-issues #16)

- [ ] Add coverage step to CI workflow
  - `apps/cli/package.json` already has `test:coverage` script — just needs to run in CI
  - Upload coverage reports as artifacts
  - Consider Codecov or Coveralls for PR comments showing coverage delta
  - Set initial threshold low (e.g., 40%) and ratchet up over time

---

## Release Safety (codebase-issues #14, #15)

### Release approval gates

- [ ] Add GitHub environment protection rule for npm publish
  - Create `production` environment in repo settings
  - Require manual approval before `bun publish`
  - Currently auto-publishes on `chore(release):` commit to main — no human gate

### Supply chain attestation

- [ ] Add `--provenance` flag to `bun publish` commands
  - npm provenance links published packages to specific GitHub Actions runs
  - Free, no runtime cost, improves supply chain trust
  - Also consider SBOM generation via CycloneDX or Syft

---

## Template Validation

### Automated type-checking matrix

- [ ] CI job that scaffolds + type-checks a matrix of popular stack combinations
  - Run weekly (too slow for every PR)
  - Cover: every frontend × top 3 backends × top 2 ORMs × top 2 auth
  - Use `bun run check-types` per generated project
  - Report failures as GitHub issue comments

### ORM + Auth test gaps (codebase-issues #4)

- [ ] Add test cases for untested combinations:
  - Kysely + any auth provider (0 tests currently)
  - Clerk + Prisma, Clerk + TypeORM, Clerk + MikroORM, Clerk + Sequelize
  - Stack-auth + Prisma + MySQL
  - Auth0 + Prisma + MySQL/SQLite
  - Supabase-auth + Prisma + MySQL/SQLite

---

## Accessibility Testing (codebase-issues #17)

- [ ] Add `@axe-core/playwright` to web E2E tests
  - Run a11y checks on key pages: builder, landing, docs
  - WCAG 2.1 AA as baseline
  - Add to existing Playwright test suite in `apps/web`

---

## Cross-Browser Testing (codebase-issues #18)

- [ ] Add Firefox and WebKit to Playwright config
  - Currently Chromium-only in `apps/web/playwright.config.ts`
  - At minimum add WebKit (Safari-like) — catches flexbox/grid rendering differences
  - Firefox optional but recommended

---

## Addon Setup Reliability (codebase-issues #5)

- [ ] Add retry logic to MCP and Skills addon setup
  - Currently single try/catch — network timeout = silent failure
  - Add 2-3 retries with exponential backoff
  - Files: `apps/cli/src/helpers/addons/mcp-setup.ts`, `skills-setup.ts`

---

## Priority Order

1. **Dependabot npm + npm audit** — lowest effort, catches real vulnerabilities
2. **CodeQL SAST** — single workflow file, catches security issues
3. **Code coverage in CI** — script already exists, just wire it up
4. **Release approval gates** — protects against accidental publishes
5. **Provenance / SBOM** — supply chain trust, single flag change
6. **ORM + Auth test gaps** — prevents regression in untested combos
7. **Template validation matrix** — catches template bugs before users do
8. **Cross-browser testing** — add WebKit to Playwright
9. **Accessibility testing** — a11y baseline
10. **Addon retry logic** — reliability improvement
