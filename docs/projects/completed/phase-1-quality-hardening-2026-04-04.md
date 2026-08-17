# Phase 1 Quality Hardening (2026-04-04)

## Status

- [x] Release approval gates verified on GitHub
- [x] Bun audit added to PR CI
- [x] Weekly template matrix upgraded to generated-project typechecks
- [x] Addon installer retry logic added
- [x] Accessibility checks added to web Playwright tests
- [x] Remaining Clerk ORM auth coverage added
- [x] Post-install guidance improved for known Prisma/Turso gaps
- [x] CLI help text expanded for key commands
- [x] Full post-install sweep: auth, payment, db-setup, and ORM coverage completed

## Evidence

- Verified `npm-publish` environment protections with `gh api repos/Marve10s/Better-Fullstack/environments/npm-publish`, which now returns a required reviewer rule.
- `.github/workflows/test.yaml` adds a `security-audit` job that runs `bun audit --audit-level high` with `continue-on-error: true` (informational — current transitive deps have known highs that can't be patched yet).
- `.github/workflows/template-matrix.yaml` now runs weekly/manual generated-project smoke verification for curated presets: `t3`, `tanstack-fullstack`, `react-hono`, `sveltekit`, `astro-sanity`, and `nuxt-fullstack`.
- The matrix workflow now builds `packages/types`, `packages/template-generator`, and `apps/cli` before running `bun run test:smoke -- --preset <preset>`.
- Each preset lane uploads its smoke output as a GitHub Actions artifact for failure triage.
- `apps/cli/src/helpers/addons/retry-install.ts` now provides shared retry/backoff handling used by `mcp-setup.ts` and `skills-setup.ts`.
- `apps/web/test/e2e/a11y.spec.ts` adds axe-core accessibility checks for the landing page and stack builder.
- `apps/cli/test/auth.test.ts` now covers Clerk with `typeorm`, `mikroorm`, and `sequelize`.
- `apps/cli/src/helpers/core/post-installation.ts` now gives actionable Turso + Prisma and Prisma + MongoDB + Docker guidance.
- `apps/cli/src/index.ts` now gives more descriptive help text for `create`, `add`, and `mcp`.
- `apps/cli/src/helpers/core/post-installation.ts` now provides setup instructions for:
  - Auth providers: NextAuth (secret + OAuth), Auth0 (domain/keys + docs link), Stack Auth (dashboard + 3 keys), Supabase Auth (dashboard + 3 keys)
  - Payment providers: Stripe (API keys + local webhook CLI), Lemon Squeezy, Paddle, Dodo (dashboard links + env vars)
  - Database setup: Neon, Supabase, Prisma Postgres, MongoDB Atlas, Upstash (dashboard links + env vars), Turso+Drizzle (CLI + push + docs)
  - ORM gap: TypeORM/MikroORM/Sequelize/Kysely no longer show the misleading "manual setup required" message; docker start is shown when applicable
  - Polar: instructions now appear for all auth providers, not only better-auth

## Validation

- `~/.bun/bin/bun test apps/cli/test/retry-install.test.ts` -> PASS
- `~/.bun/bin/bun test apps/cli/test/auth.test.ts --test-name-pattern "should scaffold (TypeORM|MikroORM|Sequelize) with Clerk"` -> PASS
- `~/.bun/bin/bun run --cwd apps/cli check-types` -> PASS
- `~/.bun/bin/bun run test:smoke -- --preset react-hono --output testing/.smoke-output/react-hono-local` -> PASS
- `~/.bun/bin/bun run --cwd apps/web lint` -> PASS (existing warnings only)
- Playwright accessibility checks were not run locally because the repo instructions prohibit starting a dev server unless explicitly requested.
- `~/.bun/bin/bun run --cwd apps/cli check-types` -> PASS (after post-install sweep)
- `~/.bun/bin/bun run --cwd apps/web lint` -> PASS (0 errors, existing warnings only)
