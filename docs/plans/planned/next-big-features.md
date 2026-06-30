# Next Big Features — Prioritized Opportunities

Synthesis of internal readiness (codebase, plan docs, GitHub issues) and external evidence
(competitive landscape as of June 12, 2026 — see `docs/plans/planned/competitive-landscape-2026-06-12.md`).
Updated 2026-06-30 after the June parity batches shipped vector DB, Apollo Server, OpenAPI,
Paraglide, OpenSearch, Keystatic, Cloudinary, SWR, shadcn-svelte, DevContainers, GitHub Actions,
mobile feature categories, generic MCP stack updates, and broad Go/Python/Rust/Java/Elixir/.NET
template coverage.

## Framing

Better-Fullstack's moat is multi-ecosystem breadth plus tested combinations. The June work shifted
the product from "broad but uneven" toward "broad and increasingly wired": ScaffBench 2 exists,
schema/template coverage exists, generic MCP stack updates exist, vector DB and mobile categories
exist, and many old backlog rows are now real options. The biggest opportunities are now the two
things **no scaffolder has shipped well**: a post-scaffold upgrade engine and a public
verified-combinations guarantee. Both build directly on the stack-graph and validation foundation.

---

## Tier 1 — Headline features (high leverage, nobody has them)

### 1. Post-scaffold upgrade engine (`bfs update`)

The #1 unsolved problem across the entire space. Users regenerate scaffolds and hand-diff the changes; the Python world partially solved it (`cruft update`/`copier update` diff-based re-application + `cruft check` in CI); Amplication ("live templates", automatic package updates) and Nx (agentic migrations, Self-Healing CI) both *monetize* exactly this gap. No JS-ecosystem scaffolder has it.

- **Shape**: diff-aware template re-application keyed off `bts.jsonc` (which already records the stack as a graph — Phase 4 finalized the shape) plus a recorded template/CLI version; a `bfs check` CI mode that flags drift from the current template version.
- **Why us**: the stack graph + `bts.jsonc` is precisely the lockfile this needs; `add`/`bfs_add_feature` already prove the mutate-existing-project plumbing.
- **Dependencies**: stack graph Phase 3 completion (graph-native compatibility rules); shares machinery with item 2 — design them together.

### 2. Incremental capability additions to existing projects

Plan doc already exists: `docs/plans/planned/mcp-incremental-library-updates.md`. Generic
`bfs_plan_stack_update` / `bfs_apply_stack_update` tools have started landing and now cover broad
create-time stack fields, compatibility adjustment reporting, additive file/dependency/env updates,
and many cross-ecosystem library additions. This is no longer a blank-slate feature; it is an
expansion and hardening track.

- **Next shape**: promote the generic MCP update layer into a CLI/user-facing `bfs add capability`
  flow, harden overwrite/conflict handling, and cover the remaining high-risk transformations.
- This is also the agent-workflow unlock: agents can enhance existing projects, not just scaffold new ones.

### 3. Public verified-combinations guarantee

We run thousands of scaffold/type-check tests (3,067 CLI tests, smoke scaffolds per commit, the combo ledger in `testing/`) but none of it is visible. Turn it into a public "every published combination compiles/type-checks in CI" badge plus a per-combo status page.

- Directly answers the trust pain point that drives users away from AI builders (variable output quality) and stale starters (t3's years of version-bump issues). No competitor markets this today.
- Near-zero build cost relative to value — the data already exists.
- **Prerequisite**: fix the failure classes our own LLM benchmarks exposed first (heavy-TS runs had 8/9 build failures from Storybook dependency issues) so the claim holds.

---

## Tier 2 — Agent-native deepening (high demand, strong fit)

### 4. Per-stack skills + in-project generators

The default consumer of a scaffolder in 2026 is an agent. create-next-app ships AGENTS.md by default; Open SaaS markets "skills + Claude Code plugin"; Nx ships generators-as-agent-tools (`nx-generate` skill); shadcn ships `shadcn/skills`. We have `--ai-docs` and the skills/MCP addons — the upgrade is:

- **Installable agent plugin**: bundle the existing MCP server, scaffold/add skills, and plugin
  metadata so agents can discover Better Fullstack as a product surface instead of relying on
  repo-local setup instructions.
- **Stack-specific skills**: generated docs/skills that explain how to add a route, run migrations, or add a test *in this exact combo* — not generic boilerplate.
- **In-project generators**: `bfs gen resource <name>` style deterministic codegen inside scaffolded repos, per ecosystem (Loco's migration-first generators are the model). Agents prefer invoking deterministic tools over free-form generation.
- Our own LLM benchmark data (36 runs; MCP path avg 66.9s vs prompt-only 170.7s) is the marketing material for this.

### 5. Prompt-to-stack on the web builder

Meet the Lovable-shaped expectation: natural language → recommended config via the existing compatibility engine → reviewable CLI command/JSON. Keeps the deterministic-output advantage while lowering the commitment barrier. The plumbing (`bfs_plan_project`, compatibility auto-adjustment) already exists. Related: template preview in builder (`docs/plans/planned/platform-features.md`) lowers the same commitment barrier.

### 6. Registry for community/private capability packs

shadcn's 2026 "GitHub registries" model (any repo with `registry.json` distributes feature kits, codemods, agent instructions) is the strongest architectural idea in the space and our enterprise/monetization wedge: let teams publish their own addons/templates without forking the generator.

- Monetization path: free CLI + paid "pro capability packs" (wired-up payments/multi-tenancy/RBAC — proven willingness-to-pay at $149–600 per ShipFast/Makerkit/supastarter) and/or a team registry; longer term, a cloud layer (upgrade PRs as a service, à la Nx self-healing) is the durable model.

---

## Tier 3 — Nearer-term concrete items

- **Payments and SaaS billing depth** — Creem, Autumn, Commet, Better Auth payment plugin wiring, and an opinionated organizations + billing + entitlement preset.
- **Non-monorepo mode** — Docker/Compose/DevContainer shipped; the remaining workspace request is a single-app mode.
- **Stack graph Phase 3 completion** (compatibility consolidation, ~60% done per `docs/plans/planned/single-source-of-truth-stack-graph.md`) — enabling work for Tier 1 items 1 and 2.
- **Generated-project CI quality** — GitHub Actions addon exists; next step is making generated CI workflows run meaningful install/typecheck/build/test checks per ecosystem.
- **AI chat example modernization** — migrate the TypeScript AI example surface to AI SDK 7 response helpers, shared chat UI components where available, and generated-project checks for the main web/backend/native presets.
- **Integration backlog** — InstantDB, Intlayer, Plasmo, Effect HTTP, raw SQL/no-ORM, Supabase Storage, HeroUI naming/compatibility, and deeper template-quality passes for already-added libraries.

---

## Suggested sequencing

One coherent arc on the same foundation, with two parallel low-coupling tracks:

```
Stack graph cleanup ──► Harden stack updates (#2) ──► Upgrade engine (#1)  [main arc]
Generated CI + ScaffBench roll-up ──► Verified-combos trust page (#3)       [parallel]
Per-stack skills + generators (#4)                                          [parallel]
```

Treat the upgrade engine (#1) as the headline feature for the next major version — it is the one thing users of every competitor are asking for that no one has built.
