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
- Added coverage for Drizzle+Clerk, Drizzle+StackAuth+MySQL, Drizzle+Auth0+MySQL, Prisma+Clerk, Prisma+StackAuth+MySQL, Prisma+Auth0+MySQL, Prisma+SupabaseAuth+MySQL, TypeORM+Clerk, MikroORM+Clerk, Sequelize+Clerk, Kysely+NextAuth, Kysely+StackAuth, Kysely+SupabaseAuth, and Kysely+Auth0. Previous batch added Kysely+BetterAuth, Kysely+Clerk, and Kysely+noAuth.

### ~~5. No network retry for addon setup~~ ✅ Fixed
- Added shared retry/backoff handling in `apps/cli/src/helpers/addons/retry-install.ts` and wired it into both addon installers.

---

## P2 — Polish

### ~~6. Missing trailing newlines (52 .hbs files)~~ ✅ Fixed
- All .hbs files now have proper trailing newlines.

### ~~7. Mixed tabs/spaces in payment templates~~ ✅ Fixed
- Payment templates now use consistent spaces.

### ~~8. "Choose web" prompt message~~ ✅ Fixed
- Now says "Select web framework".

### ~~9. Shadcn color options: 21 items, no grouping~~ ✅ Fixed
- `apps/cli/src/prompts/shadcn-options.ts` now groups shadcn color themes by neutral/cool/warm families.

### ~~10. Incomplete post-install instructions~~ ✅ Fixed
- Broad review completed. Added setup guidance for auth providers (NextAuth, Auth0, Stack Auth, Supabase Auth), payment providers (Stripe, Lemon Squeezy, Paddle, Dodo), database setup services (Neon, Supabase, Prisma Postgres, MongoDB Atlas, Upstash, Turso+Drizzle), fixed misleading "manual setup required" message for TypeORM/MikroORM/Sequelize/Kysely, and removed the incorrect `auth === "better-auth"` gate on Polar instructions.

### ~~11. Terse help text~~ ✅ Fixed
- `apps/cli/src/index.ts` now gives more descriptive help text for `create`, `add`, `builder`, and `mcp`.

---

## P3 — Security

Verified-complete CI/security items were moved to `docs/plans/completed/ci-security-foundation-2026-04-04.md`:
- Dependabot npm scanning
- CodeQL SAST workflow
- npm provenance on publish
- code coverage in CI

### ~~14. Release approval gates~~ ✅ Fixed
- Verified with `gh api repos/Marve10s/Better-Fullstack/environments/npm-publish` that the `npm-publish` environment exists and has a required reviewer rule.

### ~~17. No accessibility testing~~ ✅ Fixed
- Added `@axe-core/playwright` and serious/critical accessibility checks for the landing page and stack builder in `apps/web/test/e2e/a11y.spec.ts`.

### 18. No cross-browser testing
- Tracked in `docs/plans/planned/ci-and-quality.md` (remaining backlog item).
