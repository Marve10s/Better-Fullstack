# Better-Fullstack — Next Updates, Features & Improvements

> **Generated:** 2026-06-18 from a multi-agent analysis of `apps/cli`, `packages/template-generator`, `apps/web`, the MCP server, the testing/CI/release systems, and the competitive landscape.
>
> **How to read this:** Start at **🔴 Fix first** (active correctness/trust bugs). Then work the tiers in order — Tier 2 (quality foundation) is the unlock that makes everything else shippable with confidence. Appendices hold the dense, file-cited findings per subsystem.

---

## Strategic read

BFS has the **widest scaffolding surface in the market** — 8 ecosystems, 677 options, a web builder, *and* an MCP server. No competitor (including its TS-only upstream `create-better-t-stack`) matches that breadth. Three things cap the value of that breadth:

1. **Quality assurance gap** — generated projects are *not compiled in CI*, and the CLI reports "success" even when a project is broken. This is the root cause of nearly every template bug in project memory.
2. **Lifecycle gap** — BFS is a one-shot scaffolder. Competitors ship `astro add` / `sv add` (add features to existing projects) and `nx migrate` (codemod upgrades). BFS is one step from both.
3. **Under-marketed moat + dormant features** — the polyglot multi-ecosystem monorepo is the unique wedge but it's buried, and a showcase gallery + analytics dashboard are already built but not routed.

**The opportunity bet:** position BFS as **the deterministic, verified golden-path layer that AI agents scaffold into** — because AI app-builders (Lovable, v0, bolt) win greenfield demos but ship 45–80% vulnerable code and hit an iteration wall.

---

## 🔴 Fix first — correctness/trust bugs (not features)

These four together explain BFS's entire recurring-bug history. They bleed regardless of roadmap.

> **Implementation status (2026-06-18):** #1, #2, #3 **landed & verified**. #4 **substantially landed**: `check-types` added to 17 high-confidence generated packages (every documented drift target — better-auth/stripe, orpc/trpc context, heroui-native), enforced by a new coverage meta-test (`apps/cli/test/check-types-coverage.test.ts`) with a 12-entry documented allowlist; validated end-to-end on real installs (TS next+hono+trpc+drizzle+better-auth and react-native uniwind). Remaining allowlisted framework packages (nuxt/astro/angular/tanstack-start/redwood/convex) need per-framework check commands and are tracked as follow-ups. Side effect: regenerating the template bundle also fixed 10 stale-snapshot test failures.

| # | Bug | Where | Why it matters |
|---|---|---|---|
| 1 | **Install/db-setup errors are swallowed → CLI prints "Project created successfully" on broken projects** | `apps/cli/src/helpers/core/install-dependencies.ts` (catch+log, never rethrow); `db-setup.ts` (same) | Worst trust bug. Users get green "success" + history entry + analytics event on a broken scaffold. |
| 2 | **No rollback / cleanup on fatal failure** → half-scaffolded dir left behind | `apps/cli/src/helpers/core/create-project.ts` (catch path calls `exitWithError` with no cleanup) | Users must manually `rm` and can't cleanly retry. Add `--keep-on-error` escape hatch. |
| 3 | **CI "pass" is gated by a regex, not step success** — install/build/typecheck failures stay green unless error text matches curated `TEMPLATE_PATTERNS` | `testing/smoke-test.ts` (`classification === "template"` gate); `testing/lib/verify.ts` (regex classifier) | This is *why* the stripe/heroui/native bugs shipped. Highest-leverage single fix in the repo. |
| 4 | **~29 of 37 generated packages have no `check-types` script** (verifier silently skips them) | `testing/lib/verify.ts` (skip-when-absent); `templates/frontend/native/package.json.hbs`, `templates/auth/*`, `api/*` | Type drift ships silently — exactly the heroui-native & stripe-`apiVersion` drift in memory. |

**Fix approach (summary):**
- **#1** Collect per-step status (install, db-setup, build checks); rethrow or propagate failure so the outro reads "created with errors" + recovery hint; do **not** write history/fire analytics as "success" on failure.
- **#2** If the CLI created the target dir (not merge mode), `fs.remove` it on fatal error, or print exact recovery steps; add `--keep-on-error`.
- **#3** Replace the `classification === "template"` gate with "fail on any step where `!success && !skipped && !advisory`"; keep `environment` as the only soft class, but count + surface it.
- **#4** Add `"check-types": "tsc --noEmit"` (and `tsr generate &&` where needed) to every generated `package.json.hbs` lacking it; run `turbo check-types` across all workspace packages in the verifier; add a meta-test asserting every generated package defines it.

---

## 🟢 Tier 1 — Quick wins (high impact, low effort — mostly *finishing existing work*)

| Item | Effort | Notes |
|---|---|---|
| **Ship the `/showcase` route** | S | `apps/web/src/components/showcase/showcase-page.tsx` fully built, just unrouted. Social proof + SEO. |
| **Ship public `/analytics` "Popular / Trending stacks" page** | S–M | Dashboard + `analytics.getStats()` (`stackCombinations`, `dbOrmCombinations`) already exist and are unused. Doubles as a builder hint. |
| **Make `AGENTS.md` a *default* ai-docs output** (alongside CLAUDE.md) | S | create-next-app 16.2 default; now a Linux Foundation standard (60k+ repos). Currently opt-in only. |
| **Dynamic OG images for shared stacks** | M | No `og:image` exists today — every share unfurls as a generic terminal PNG. |
| **Fix the ".NET = 8th ecosystem" stat** across site/SEO/JSON-LD | S | `apps/web/src/lib/project-stats.ts` hardcodes `ECOSYSTEM_COUNT = 7`; under-sells the product to users *and* LLMs. |
| **Re-run from history**: `create --from-history <n>` / `--config <bts.jsonc>` | S | History already stores full config; `create()` already accepts one. |
| **First-run telemetry notice + `bfs telemetry` toggle** | S | Currently silent opt-out that sends the whole config — reputational/compliance risk. |
| **Fix MCP `astroIntegration` (latent bug) + stop hardcoding `aiDocs`** | S | MCP-built Astro projects can't pick a framework integration; agents can't request `agents-md`. |
| **⌘K command-palette search across 677 options** in the builder | M | Biggest builder friction is scrolling 48 categories. |

---

## 🟡 Tier 2 — Quality foundation (makes the breadth *trustworthy*)

The unlock that converts "677 options" from a liability into a guarantee. Two agents independently flagged this as the #1 systemic gap.

| Item | Effort | Impact |
|---|---|---|
| **PR-gate a minimal generated-project typecheck matrix** (~6–8 presets, one per ecosystem: real `install + check-types/build`) | M | High |
| **Emit `check-types` in every generated workspace package** + run `turbo check-types` across all | S–M | High |
| **Schema↔template coverage test** (every non-`none` enum value must have a real template — auto-catches the .NET "selectable but not generated" class) | M | High |
| **Property-test the compatibility engine** (3,733 lines / ~471 conditionals vs 56 example tests): idempotence, "adjusted config satisfies all constraints," "adjusted config scaffolds" | M | High |
| **Gate npm releases on a real smoke run** (today `release.yaml` runs only the static lane) | S–M | High |
| **Generated-project health roll-up** (aggregator job + pass/fail table; the weekly matrix has no aggregation) | S–M | Med-High |
| **API-literal drift guard** (stripe `apiVersion`, expo `web.output`, drizzle mysql `connection`) | M | Med-High |

---

## 🔵 Tier 3 — Lifecycle & moat (strategic bets for the next major)

| Item | Effort | Why it's the moat |
|---|---|---|
| **`bfs add` for *real* features** (db/auth/api/payments/email...) into existing projects, not just addons | L | Headline lifecycle gap. `astro add`/`sv add` prove demand; compatibility engine + `bts.jsonc` make it uniquely doable *cross-ecosystem*. MCP `plan_addition` has the bones. |
| **`bfs upgrade` migration engine** (ordered, reviewable codemods on top of `update-deps`) | L | Biggest *unsolved* problem in the space. `nx migrate` is the gold standard. |
| **`bfs doctor`** (validate `bts.jsonc`, deps, env vars, run build checks) | M | Mostly wiring existing `--verify` infra into a diagnostic command. |
| **MCP: structured outputs + tool annotations + `bfs_list_presets` + `bfs_recommend_stack`** (NL brief → validated stack) | M | Turns BFS from "schema you must fill" into "describe it and go." |
| **AI builder assistant on the web** ("describe your app → stack"), reusing the compatibility engine | L | Flagship differentiator for the 677-option overwhelm. |
| **Publish a Claude Code plugin / Agent Skill** (CLI+Skill pattern; keep MCP for orchestration) | S–M | Validated 2026 distribution; CLI tool-calls are 10–32× cheaper in tokens than MCP. |

---

## 🟣 Tier 4 — New integrations & growth

- **Vector DB category** (`pgvector`/Pinecone/Qdrant/Chroma/Weaviate) — S–M, High. The one obvious 2026 AI primitive missing, despite 11 TS + 10 Python AI SDKs.
- **GitHub Actions CI addon** — generated projects currently ship with *zero* CI. M, High.
- **Golden-path "complete app" templates** (SaaS-in-a-box: auth + billing + admin + marketing) vs today's `todo`/`ai` examples. M–L, High.
- **Programmatic per-combo SEO/GEO landing pages** ("Go + React monorepo starter") — owns long-tail no competitor can match. M, High.
- **Preview export: ZIP download + "Open in StackBlitz"** — turns the dead-end read-only preview into a try-it loop. M.
- **Short shareable links + a Convex `shares` table** (custom stacks currently get ugly `/new?...` URLs). M.
- **Reposition around the polyglot monorepo + "verified golden path for AI agents"**; add `create-better-t-stack` and AI app-builders to `/compare`; fix README "450+/7" vs MCP "677/8" inconsistency. S.

---

## Recommended sequencing

1. **Sprint 0 (now):** the four 🔴 correctness bugs + the Tier-1 "finish existing work" items (showcase, analytics, AGENTS.md default, .NET stat). Cheap; stops active bleeding and unlocks dormant value.
2. **Sprint 1:** Tier 2 quality foundation. Once generated projects are actually compiled in CI, everything else ships with confidence instead of via manual `bun create` discovery.
3. **Next major:** pick **one** flagship moat bet — recommend **`bfs add` for full features** first (compounds with the MCP story + AI builder assistant; plumbing partly exists).

> **Confidence note:** External competitive facts (version numbers, ARR, competitor features) are web-research dated June 2026 — sanity-check before using in marketing copy. Code-cited findings (file paths, the CI gating hole, swallowed errors) were verified against the repo.

---

# Appendices — detailed, file-cited findings

## Appendix A — CLI experience & architecture

**Current state:** oRPC router via `trpc-cli` (`apps/cli/src/run.ts`) exposes `create`/`add`/`history`/`update-deps`/`sponsors`/`docs`/`builder`/`mcp`. Interactive UX is `@clack/prompts` + a custom navigation layer (`prompts/navigable.ts`, `navigable-group.ts`) with back/forward and smart back-skip. ~150 zod flags (`create-command-input.ts`), `--yes`/`--yolo`/`--part`/`--dry-run`/`--verify`. Validation is imperative (`compatibility-rules.ts` ~808 lines + `config-validation.ts` ~1317 lines). Excellent per-ecosystem post-install instructions (`post-installation.ts`). Telemetry is opt-out.

**Gaps / bugs:**
- Install failures swallowed (`install-dependencies.ts:57-62`, plus `runCargoBuild`/`runUvSync`/`runGoModTidy`/`runMavenTests`/`runGradleTests`/`runMixCompile`) → false "success" (`command-handlers.ts:506`).
- DB-setup failures swallowed (`db-setup.ts:68-72`).
- No rollback on fatal error (`create-project.ts:129-137`).
- `add` command is addon/deploy-only (`run.ts:233-255`, `add-handler.ts`) — can't add db/orm/auth/api/payments/email/etc.
- No `upgrade`/`doctor`/`eject`/`migrate`/`config` commands.
- `update-deps` is maintainer-only but misleadingly named (`commands/update-deps.ts:47-69`).
- Telemetry: opt-out, no first-run notice, sends whole config (`utils/analytics.ts:18`).
- Auto-adjustments invisible under `--yes`/CI (gated on `!isSilent()`).
- Multi-ecosystem `.env`/README collisions, bypassable with `--yolo` (`generator.ts:166-179`).
- No final confirm gate in interactive mode; no re-run/edit-last-config; presets are TS/RN-only (`utils/templates.ts`: mern/pern/t3/uniwind).

**Top recommendations:** fix swallowed errors (S/High), rollback (M/High), `bfs add` for real features (L/High), `bfs doctor` (M/High), telemetry notice + toggle (S/High), `create --from-history`/`--config` (S/High), surface auto-adjustments in non-interactive (S/Med-High), final confirm gate (S/Med), per-ecosystem presets (M/Med-High), `create --json` (S/Med).

## Appendix B — Template generator & coverage

**Current state:** single generator runs in Node (CLI) + browser (web) via bundled `templates.generated.ts` (~2.3 MB). TS/RN use a modular pipeline (44 processors, 32 handlers, ~423 pinned versions in `utils/add-deps.ts`); non-TS ecosystems use one monolithic handler each + Handlebars-conditional dep files. Source of truth: `packages/types/src/schemas.ts`.

**Ecosystem depth:** TypeScript/RN/Python/Go/Java = production; Elixir = partial (ueberauth/guardian/gRPC are deps-only placeholders); **.NET = stub** (12 files / 439 lines, everything inline in `Program.cs.hbs`). Frontend breadth is excellent (next/nuxt/svelte/solid/astro/qwik/angular/redwood/fresh/react-router/tanstack-*/native) — coverage isn't the gap; **depth & integrations** are.

**Recurring bug classes:** `noUnusedLocals` unused imports/vars (fets/orpc/trpc/Go); node16/nodenext missing `.js` extensions (drizzle/mikroorm/sequelize/typeorm barrels); missing deps/generated files (graph `--part` empty `packages/database/package.json`; `@tanstack/react-form`; `routeTree.gen.ts`); in-code API drift invisible to version checks (stripe `apiVersion`, drizzle mysql `connection`, expo `web.output:"static"`).

**Missing integrations devs expect in 2026:** no vector DB anywhere; no CI/CD output in generated projects; no IaC (Terraform/Pulumi) / k8s/Helm; Clerk has no native/Expo; CMS all web-only; OpenAPI API server-only (no client).

**Top recommendations:** PR-gate generated-project typecheck (M/High); `check-types` in every package (S/High); schema↔template coverage test (M/High); GitHub Actions CI addon (M/High); vector DB category (M/High); decide .NET (implement to parity or prune schema) (L or S/High); in-code API-drift guard (M/Med-High); generalize auth0/kinde/workos/clerk beyond Next-only (M/Med-High); declarative tool-option manifest to collapse the 15–29-file add-an-option checklist (L/Med-High).

## Appendix C — Web platform & builder

**Current state:** TanStack Start app. Builder (`components/stack-builder/stack-builder.tsx`, ~3430 lines) serves `/new`, `/stack`, `/$stackShare`; 4 view tabs (command/preview/presets/saved); URL state via `stack-url-state.ts`; client-side preview via `@better-fullstack/template-generator/browser`. Saved stacks are localStorage-only. Clean share slugs only for the 8 default stacks. `compare.tsx` is a static competitor table. Convex backends (`packages/backend/convex`, `apps/analytics/convex`) hold analytics/showcase/testimonials/videos/tweets. SEO: llms.txt + sitemap + JSON-LD; 1 blog post.

**Gaps:**
- No dynamic OG images (`$stackShare.tsx`/`stack.tsx`/`new.tsx` set no `og:image`).
- No short links for custom stacks; no `shares` Convex table.
- Rich analytics captured but surfaced nowhere (`analytics.getStats()`; full dashboard built but unrouted).
- Showcase gallery built but unrouted (`showcase-page.tsx`).
- No search across 677 options in builder; 12 categories collapsed by default.
- Preview is a dead-end (no ZIP / Open-in-StackBlitz / WebContainer).
- No accounts/personalization; web builder is not instrumented.
- `.NET` under-reported: `project-stats.ts` hardcodes `ECOSYSTEM_COUNT = 7`, propagates to compare/llms.txt/JSON-LD.
- Thin blog, no RSS; pretty stack landing pages absent from sitemap.

**Top recommendations:** dynamic OG images (M/High); public "Popular/Trending" page from existing data (M/High); ⌘K option search (M/High); short links + `shares` table (M/High); fix .NET count (S/Med); wire `/showcase` (S–M/Med-High); instrument the builder (S–M/Med); preview ZIP + StackBlitz (M–L/High); AI builder assistant (L/High); RSS + extend search to guides/blog (S/Med).

## Appendix D — MCP server & AI integration

**Current state:** stdio-only server (`apps/cli/src/mcp.ts`, ~1348 lines). 7 tools (`bfs_get_guidance`/`get_schema`/`check_compatibility`/`plan_project`/`create_project`/`plan_addition`/`add_feature`), all returning JSON-in-text (no `structuredContent`/`outputSchema`/annotations). 3 resources (`docs://compatibility-rules`/`stack-options`/`getting-started`). No MCP prompts. `packages/create-bfs` is a pure alias. Install is local stdio across 8 agent presets.

**Gaps / bugs:**
- `bfs_create_project` hardcodes `process.cwd()` (`mcp.ts:1123`), no `targetDir`.
- Create surface narrower than CLI: omits `astroIntegration` (latent Astro bug — hardcoded `"none"` at `:628`), `aiDocs` (hardcoded `["claude-md"]` at `:637` — agents can't request `agents-md`), `analytics`/`effect`/`versionChannel`/`shadcn*`/`verify`/`part`.
- Throws away structured compat signal — uses `analyzeStackCompatibility` strings, ignores `evaluateCompatibility()` (`packages/types/src/compatibility.ts`) which already returns `code`/`optionId`/`suggestions`.
- Brownfield is addon-only + low-fidelity (plan and apply are different code paths; can overwrite files silently).
- No preset discovery; no NL→stack recommendation; thin per-option metadata (only `auth` has descriptions); token-heavy `plan_project` (full file list every call).

**Top recommendations:** expose missing create fields incl. aiDocs/astroIntegration (S/High); `targetDir` input (S/High); structured outputs + annotations (S–M/High); surface `evaluateCompatibility` issues+suggestions (S–M/High); `bfs_list_presets` (S–M/High); token-efficient `plan_project` (S/Med); brownfield safety + plan/apply fidelity (S–M/High); `bfs_recommend_stack` (M–L/High); `bfs_explain_option` + enrich metadata (M/Med-High); register MCP prompts (S/Med); hosted/remote MCP + registry listing (M–L/Med-High); expand `add_feature` to non-addon categories (L/High).

## Appendix E — Quality, testing, CI & release

**Current state:** 5 test layers, only smoke (`testing/smoke-test.ts` + `testing/lib/verify.ts`) actually scaffolds + installs + builds/typechecks; unit/snapshot/parity layers never compile. E2E (`apps/cli/test/e2e/e2e.e2e.ts`) is TS-only, 9 configs. Combo sampling = weighted random (seeded), deduped vs a 316-row ledger. Compatibility engine = 3,733 lines / ~471 conditionals vs **56** example tests. CI on PR runs static release-guard + lint + unit + web build + smoke-strict-core/broad; the real install+dev-server `e2e-runtime` job is schedule-only. Release (`release.yaml`) runs only the static `test:release` lane before publish. No observability/dashboard/roll-up.

**Risks (file-cited):**
1. CI pass/fail gated by regex classification, not step success (`smoke-test.ts:489-492`, `verify.ts:47-95`). Highest risk.
2. ~29/37 generated `package.json.hbs` lack `check-types`; verifier skips silently (`verify.ts:308-320`).
3. Releases not gated on generated-project health (`release.yaml:101-103`).
4. No rollback for stable releases (only canary can deprecate).
5. Compatibility engine under-tested (no property/idempotence/fuzz).
6. API-shape/literal drift never validated (stripe `apiVersion` at `templates/payments/stripe/server/base/src/lib/stripe.ts.hbs:5`).
7. Sampler sparse; `dotnet` excluded from nightly (`smoke-test.ts:27-35`); preset source-of-truth drift (`template-matrix.yaml` hardcodes 17 vs `presets.ts` groups).
8. Dep PRs auto-accept snapshots (`dep-freshness.yaml:67`, `deps-check.yaml:126`), masking regressions.
9. `upstream-gap.yml` is `workflow_dispatch`-only despite docs claiming a Monday cron.
10. Flaky timeouts self-mask (forced to `environment` → non-gating); graph/multi-ecosystem mode has zero compile coverage.

**Top recommendations:** fix the smoke gating hole (S/High); unify preset source-of-truth (S/Med); gate releases on real smoke (S–M/High); mandatory `check-types` everywhere (M/High); health roll-up (S–M/High); property-test compat engine (M/High); coverage-guided sampler + add dotnet + raise nightly count (M/High); API-literal drift detection (M/Med-High); stop auto-accepting snapshots in dep PRs (S/Med); wire upstream-gap cron (S/Low-Med); flaky-rate metric (M/Med); route-check in nightly pr-core (M/Med); graph compile coverage (M/Med); local pre-push static gate (S/Low).

## Appendix F — Competitive & market

**Landscape (June 2026):**
- **create-better-t-stack** (upstream sibling): v3.33.x, ~457 releases, ~5.5k stars, TS-only but deep; live `/analytics` + `/showcase`, 19 paying sponsors. BFS is far broader but BTS crushes it on release velocity, mindshare, community/growth infra.
- **create-t3-app**: stalled (~28.6k stars); explicitly no add-to-existing / no upgrade.
- **create-next-app** v16.2: AI-agent-first — ships `AGENTS.md` + `CLAUDE.md` by default, bundles version-matched docs for agents.
- **create-vite** (Vite 8 / Rolldown): pure framework starters; no lifecycle tooling.
- **create-astro / `astro add`**: gold-standard config-rewriting integration installer on existing projects; `--template <repo>`; `@astrojs/upgrade`.
- **`sv` (Svelte CLI)**: `sv add` (better-auth/drizzle/mcp/paraglide), `sv migrate`.
- **Nx**: `nx migrate` is the industry gold standard (ordered reviewable codemods + Migrate UI + agentic migrations); Nx MCP server; self-healing CI.
- **Turborepo**: `turbo gen` custom generators.
- **RedwoodJS**: sunset/split → CedarJS fork + RedwoodSDK (Cloudflare-only).
- **Wasp / OpenSaaS**: TS spec + Mage (AI app-from-prompt); OpenSaaS = batteries-included SaaS starter shipping AGENTS.md + agent skills.
- **Epic Stack / Bulletproof React**: opinionated templates/guides — Bulletproof's ~31.9k stars prove devs value conventions/docs as much as scaffolds.
- **AI app builders** (Lovable ~$400M ARR, v0 Platform API, bolt, Replit Agent, Cursor, Claude Code): generate full apps from prompts — but 45–80% ship vulnerable, and hit an iteration wall / React-only lock-in.

**Feature gaps to close:** automated project upgrade/migration (codemods); `add` that installs full integrations into existing projects; `AGENTS.md` as default; published Agent Skill / Claude Code plugin; golden-path SaaS-in-a-box templates; live showcase; public analytics; `--template <github-url>`; one-command deploy + "Open in" handoffs; sponsor monetization engine.

**Differentiation / trend bets:** double down on 8-ecosystem breadth + polyglot monorepo (`--part`); scaffolder-as-MCP with a compatibility engine; "deterministic golden-path layer for AI agents"; secure-by-default/verified-scaffold positioning; edge/serverless-first defaults; conventions/docs as product; TS-native config (`bts.jsonc` → optional typed `bfs.config.ts`).

**Top recommendations:** default AGENTS.md (S/High); ship `/showcase` (S/High); publish Agent Skill (S–M/High); public `/analytics` + trending (S–M/High); programmatic per-combo SEO pages (M/High); reframe positioning + fix stat inconsistencies + expand `/compare` (S/High); expand `add` to full integrations (M–L/High); `bfs upgrade` migration engine (L/High); golden-path complete-app templates (M–L/High); verified-scaffold guarantee/badge (S–M/Med-High); deploy + "Open in" buttons (M/Med); `--template <github-url>` (M/Med); sponsor engine (S–M/Med); edge-first preset + changelog page (M/Med).
