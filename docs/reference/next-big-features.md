# Next Big Features - Prioritized Opportunities

> **Superseded for priority decisions on 2026-08-07.** Retained as opportunity research. Use
> `docs/next-updates-roadmap.md` for current sequencing; several features described below have
> shipped since this analysis.

Synthesis of internal readiness (codebase, plan docs, GitHub issues) and external evidence
(competitive landscape as of June 12, 2026 - see `docs/reference/competitive-landscape-2026-06-12.md`).
Updated 2026-06-30 to focus on the highest-leverage remaining product opportunities.

## Framing

Better-Fullstack's moat is multi-ecosystem breadth plus tested combinations. The June work shifted
the product from "broad but uneven" toward "broad and increasingly wired": schema/template coverage
exists, generic MCP stack updates exist, vector DB and mobile categories exist, and many old backlog
rows are now real options. The biggest opportunities are now the two
things **no scaffolder has shipped well**: a post-scaffold upgrade engine and a public
verified-combinations guarantee. Both build directly on the stack-graph and validation foundation.

---

## Tier 1 - Headline features (high leverage, nobody has them)

### 1. Post-scaffold upgrade engine (`update`) - baseline shipped

This was the #1 unsolved problem identified by the June 2026 research. Better Fullstack has since
shipped a baseline-aware dry-run/apply/check engine; the opportunity is now cross-version
reliability, recovery, and public evidence rather than first implementation.

- **Shipped shape**: diff-aware template re-application keyed off `bts.jsonc` and `bts.lock.json`,
  with safe apply and a CI-oriented check mode.
- **Why us**: the stack graph + `bts.jsonc` is precisely the lockfile this needs; `add`/`bfs_add_feature` already prove the mutate-existing-project plumbing.
- **Remaining depth**: recorded version history, cross-version fixtures, recoverable patch/backup
  output, and real-repository validation.

### 2. Incremental capability additions to existing projects

Plan doc already exists: `docs/projects/completed/mcp-incremental-library-updates.md`. Generic
`bfs_plan_stack_update` / `bfs_apply_stack_update` tools have started landing and now cover broad
create-time stack fields, compatibility adjustment reporting, additive file/dependency/env updates,
and many cross-ecosystem library additions. This is no longer a blank-slate feature; it is an
expansion and hardening track.

- **Next shape**: promote the generic MCP update layer into a CLI/user-facing `bfs add capability`
  flow, harden overwrite/conflict handling, and cover the remaining high-risk transformations.
- This is also the agent-workflow unlock: agents can enhance existing projects, not just scaffold new ones.

### 3. Public verified-combinations guarantee

We run scaffold/type-check tests, smoke scaffolds, and release guards. The generated
status artifact now lives at `docs/verified-combinations.md`, with a public docs page at
`/docs/reference/verified-combinations` and a Shields-compatible endpoint at
`/api/verified-combinations`; each surface links to source artifacts, rerun commands, and owner areas
for failure triage.

- Directly answers the trust pain point that drives users away from AI builders (variable output quality) and stale starters (t3's years of version-bump issues). No competitor markets this today.
- Keep the claim scoped to rows with current Pass evidence; matrix-only/configured rows should stay visible but not count as green.
- Add public links to owning template areas and failure artifacts so failures are actionable.

---

## Tier 2 - Agent-native deepening (high demand, strong fit)

### 4. Per-stack skills + in-project generators

The default consumer of a scaffolder in 2026 is an agent. create-next-app ships AGENTS.md by default; Open SaaS markets "skills + Claude Code plugin"; Nx ships generators-as-agent-tools (`nx-generate` skill); shadcn ships `shadcn/skills`. We have `--ai-docs` and the skills/MCP addons - the upgrade is:

- **Installable agent plugin**: bundle the existing MCP server, scaffold/add skills, and plugin
  metadata so agents can discover Better Fullstack as a product surface instead of relying on
  repo-local setup instructions.
- **Stack-specific skills**: generated docs/skills that explain how to add a route, run migrations, or add a test _in this exact combo_ - not generic boilerplate.
- **In-project generators**: `bfs gen resource <name>` style deterministic codegen inside scaffolded repos, per ecosystem (Loco's migration-first generators are the model). Agents prefer invoking deterministic tools over free-form generation.
- Our own LLM benchmark data (36 runs; MCP path avg 66.9s vs prompt-only 170.7s) is the marketing material for this.

### 5. Prompt-to-stack on the web builder

Meet the Lovable-shaped expectation: natural language → recommended config via the existing compatibility engine → reviewable CLI command/JSON. Keeps the deterministic-output advantage while lowering the commitment barrier. The plumbing (`bfs_plan_project`, compatibility auto-adjustment) already exists. Related: template preview in builder (`docs/projects/backlog/platform-features.md`) lowers the same commitment barrier.

### 6. Registry for community/private capability packs

shadcn's 2026 "GitHub registries" model (any repo with `registry.json` distributes feature kits, codemods, agent instructions) is the strongest architectural idea in the space and our enterprise/monetization wedge: let teams publish their own addons/templates without forking the generator.

- Monetization path: free CLI + paid "pro capability packs" (wired-up payments/multi-tenancy/RBAC - proven willingness-to-pay at $149–600 per ShipFast/Makerkit/supastarter) and/or a team registry; longer term, a cloud layer (upgrade PRs as a service, à la Nx self-healing) is the durable model.

---

## Tier 3 - Nearer-term concrete items

- **Payments and SaaS billing depth** - Creem, Autumn, Commet, Better Auth payment plugin wiring, and an opinionated organizations + billing + entitlement preset.
- **Non-monorepo mode** - the remaining workspace request is a single-app mode.
- **Stack graph Phase 4 storage/settings cleanup** - compatibility consolidation has shipped for promoted graph-owned roles; remaining graph work is retiring flat-authoritative storage/settings paths as new categories move into graph ownership.
- **More evidence surfaces** - published-package smoke now covers Bun, npm, and pnpm package installs; next verification depth should target additional package specs and richer generated-project checks.
- **AI chat example modernization** - migrate the TypeScript AI example surface to AI SDK 7 response helpers, shared chat UI components where available, and generated-project checks for the main web/backend/native presets.
- **Integration backlog** - InstantDB, Intlayer, Plasmo, Effect HTTP, raw SQL/no-ORM, Supabase Storage, HeroUI naming/compatibility, and deeper template-quality passes for already-added libraries.

---

## Suggested sequencing

One coherent arc on the same foundation, with two parallel low-coupling tracks:

```
Stack graph cleanup ──► Harden stack updates (#2) ──► Upgrade engine (#1)  [main arc]
Verified-combinations page/badge ──► More evidence surfaces (#3)          [parallel]
Per-stack skills + generators (#4)                                          [parallel]
```

Treat upgrade reliability-not the already-shipped baseline command-as the headline lifecycle track
for the next major version.
