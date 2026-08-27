# Competitive Landscape - Scaffolding Tools (June 2026)

Research snapshot as of June 12, 2026. Sources: competitor repos/docs/changelogs, GitHub issues, HN/Reddit threads, and pricing pages. Like the May 21 better-t-stack analysis, this will go stale - verify against current releases before using as a roadmap source. Roadmap conclusions drawn from this snapshot live in `docs/reference/next-big-features.md`.

---

## Summary

- Better-Fullstack's moat is **multi-ecosystem breadth** (no competitor scaffolds TS + Rust + Go + Python + Java + .NET + Elixir) and **CI-tested combinations**.
- The **agent-interface gap with better-t-stack has closed**: both tools now ship MCP servers, dry-run planning, JSON modes, and post-scaffold `add` commands.
- The two areas where **nobody has shipped**: a post-scaffold upgrade engine (diff-aware template re-application) and a public verified-combinations guarantee.
- The default consumer of a scaffolder in 2026 is increasingly **an agent, not a human** - >51% of code committed to GitHub in early 2026 was AI-generated/assisted ([MIT Technology Review](https://www.technologyreview.com/2026/01/12/1130027/generative-coding-ai-software-2026-breakthrough-technology/)).

---

## Competitor Snapshots

### create-better-t-stack (closest direct competitor)

5.5k stars, 455 releases, v3.32.0 (June 8, 2026). Extremely high release velocity. TypeScript-only.

- All-in on agent workflows: local MCP server over stdio (`bts_plan_project`, `bts_create_project`, `bts_plan_addons`), `create-json`/`add-json` for LLM/CI-driven scaffolding, a `schema` introspection command, `--dry-run` planning, and an importable TypeScript `create()`/`add()` API ([docs](https://www.better-t-stack.dev/docs/cli/agent-workflows)). Mirrors our MCP tooling almost feature-for-feature.
- Post-scaffold growth via `bts add` for addons (Turborepo, Nx, PWA, Tauri, Electrobun, WXT, MCP, OpenTUI, Skills), keyed off a `bts.jsonc` stack-state file. **Addons only - no stack-capability additions.**
- Top user requests in [issues](https://github.com/AmanVarshney01/create-better-t-stack/issues): NestJS, Nuxt-Nitro, Effect HttpApi backends, Kysely, shadcn-as-monorepo-package, Docker/Compose generation, T3 Env, multiple frontends, TanStack Start without separate backend. Several of these we already have.
- Funding: sponsors + Vercel OSS Program only; "free forever."

### create-t3-app

Mature but slow-moving. Drizzle is now the community-default ORM; App Router only with Next.js 16/Turbopack.

- Top-reacted issues are Better-Auth integration (#2008/#2116), more auth options, and bundled testing setup - users asking for what we already offer ([repo](https://github.com/t3-oss/create-t3-app)).
- Years of "support the new Next.js/React Query/auth version" issues illustrate the combinatorial-staleness problem.

### create-next-app / Vercel

- Now ships **AGENTS.md by default (with CLAUDE.md referencing it)** in the recommended preset, plus minimal/empty-project flags ([CLI docs](https://nextjs.org/docs/app/api-reference/cli/create-next-app)). Agent-readiness is table stakes at the framework level.

### shadcn CLI (the sleeper threat)

Evolved from a UI tool into a general **code-distribution system**.

- `shadcn init` scaffolds full project templates (Next.js, Vite, Laravel, React Router, Astro, TanStack Start).
- March 2026 [CLI v4](https://ui.shadcn.com/docs/changelog/2026-03-cli-v4) + June 2026 "GitHub registries": any public repo with a `registry.json` can distribute components, hooks, design tokens, feature kits, agent instructions, CI workflows, templates, **codemods, and migration kits** - installed into projects users own ([registry docs](https://ui.shadcn.com/docs/registry)).
- Ships an MCP server and `shadcn/skills` for agents ([MCP docs](https://ui.shadcn.com/docs/mcp)).
- The "registry of installable capabilities" model is the strongest architectural idea in the space right now.

### Nx

- 2026 roadmap is explicitly "infrastructure for autonomous AI agents": generators positioned as deterministic tools agents invoke to avoid token-burn and hallucination (`nx-generate` skill), agentic migrations, Self-Healing CI with failure context flowing back to the local agent ([roadmap](https://nx.dev/blog/nx-2026-roadmap), [skills](https://nx.dev/blog/nx-ai-agent-skills)).
- Monetizes via usage-priced Nx Cloud; AI self-healing billed per token-credits ([pricing](https://nx.dev/pricing)).

### Turborepo `turbo gen`

- Maintained (993k weekly downloads) but stagnant feature-wise; investment goes to build features (devtools, microfrontends), not scaffolding ([blog](https://turborepo.dev/blog)).

### RedwoodSDK

- Pivoted entirely from RedwoodJS to a Cloudflare-native server-first React framework; 1.0 beta Oct 2025, Dec 2025 "unified platform" doubling down on Cloudflare primitives (D1, R2, Queues, Crons, passkey auth) ([site](https://rwsdk.com/), [repo](https://github.com/redwoodjs/sdk)).
- Lesson: batteries-included via one platform's primitives, at the cost of lock-in.

### Wasp / Open SaaS

- Approaching 1.0; repositioned as "the full-stack framework for the AI era."
- [Open SaaS](https://github.com/wasp-lang/open-saas) boilerplate is explicitly "AI-ready with tailored AGENTS.md, skills, and Claude Code plugin," plus auth, Stripe/Polar payments, jobs, S3 upload, one-command deploy.

### Loco (Rust)

- Active but small-team pace: v0.16 (mid-2025) added full OpenAPI 3.0 + Swagger/ReDoc/Scalar docs, redesigned Redis job system; earlier 2025 releases added scaffolding v2, smart migration generator, magic-link auth ([releases](https://github.com/loco-rs/loco/releases)).
- Validates demand for "Rails-for-Rust" generators - adjacent to our Rust ecosystem.

### SST

- v3 (Pulumi/Terraform engine) is the deploy-layer standard for the AWS crowd ([blog](https://sst.dev/blog/sst-v3/)).
- Monetizes via Console with per-active-resource pricing ([pricing update](https://sst.dev/blog/console-pricing-update/)).

### Encore

- TS/Go declarative-infra framework; Rust runtime under Node for performance; **Python support and Azure support announced for 2026** ([docs](https://encore.dev/docs/ts)).
- Monetizes via Encore Cloud tiers: free dev → paid DevOps automation in customer's AWS/GCP → enterprise ([pricing](https://encore.cloud/pricing)).

### Amplication

- 16k stars, still shipping (v3.15.0, Apr 2026); pivoted toward platform engineering: "live templates," service catalog, and **automatic handling of package updates/patches/versioning** for generated services; Jovu AI assistant ([repo](https://github.com/amplication/amplication)).

### refine.dev

- Refine Core v5 (Sept 2025), "Refine Core - A New Chapter" (Jan 2026); $3.8M raised; monetizing via Enterprise Edition for internal tooling ([announcement](https://refine.dev/blog/refine-investment-announcement/)).

### Paid boilerplates (ShipFast et al.)

- ShipFast ($199–299, 8,300+ buyers) remains the benchmark; crowded field (Makerkit, supastarter, MkSaaS, LaunchFast, Shipped.club $149) differentiating on multi-tenancy/RBAC and AI-readiness ([review](https://starterpick.com/blog/shipfast-review-2026), [comparison](https://dev.to/wsdevguy/launchfast-vs-shipfast-honest-comparison-for-2026-36m8)).
- supastarter now markets itself literally as a ["Claude Code Boilerplate"](https://supastarter.dev/claude-code-boilerplate).

---

## How Developers Start Projects in 2026

- **AI app builders (Lovable/Bolt/v0) took the prototype segment, not the production segment.** Consensus across 2026 comparisons: they handle scaffold + CRUD + basic auth, then "most successful Lovable projects start with the tool and move into a real editor like Cursor or Claude Code as they grow"; Bolt's code quality is "more variable" ([uibakery](https://uibakery.io/blog/lovable-vs-bolt-vs-v0), [lumberjack](https://lumberjack.so/lovable-vs-bolt-vs-v0-ai-app-builders-compared/)).
- CLIs still win on: code ownership, monorepo structure, non-TS ecosystems, deterministic/reviewable output, and CI/agent embedding.
- **The new default consumer of a scaffolder is an agent.** Nx's framing is canonical: generators give agents fast, deterministic, convention-correct code instead of token-expensive hallucination-prone generation ([Nx + AI](https://nx.dev/blog/nx-and-ai-why-they-work-together)). AGENTS.md is used by 20k+ OSS projects ([agents.md](https://agents.md/)).
- The "just ask Claude Code vs. use a starter" debate resolves to a middle ground: agents are good at *adapting* templates, bad at *re-deriving* infrastructure. Starters that ship agent context (CLAUDE.md/AGENTS.md, skills, MCP) get used by both audiences.

---

## Cross-Tool Pain Points (user-reported)

1. **Post-scaffold updates / template drift** - the #1 unsolved problem. HN "Why is it so hard to write a scaffolding tool" ([thread](https://news.ycombinator.com/item?id=33079544)): people "destroy and recreate an entire scaffold... then spend 10 minutes combing through all the changes." Python partially solved it with [`cruft update`](https://cruft.github.io/cruft/)/[`copier update`](https://copier.readthedocs.io/en/stable/updating/) (diff-based re-application + `cruft check` in CI); nothing equivalent exists in the JS scaffolder space. Amplication and Nx both monetize exactly this gap.
2. **Adding features after creation** - better-t-stack's `add` covers addons only, not stack capabilities; t3 has nothing. Users keep filing "add X to existing project" issues everywhere.
3. **Combinatorial staleness** - t3's top issues for years were version-bump requests; boilerplates ship "tons of features... creating a maintenance burden or significant work to safely delete unused code" ([HN](https://news.ycombinator.com/item?id=35174849)).
4. **Bloat vs. minimalism tension** - better-t-stack's pitch ("minimal templates, zero bloat") reacts to ShipFast-style kitchen sinks; conversely t3 users ask for *more*. Configurable depth wins.
5. **Trust in generated output** - AI-builder users hit production-hardening cliffs; CLI users want CI-tested combinations. Our combo-ledger testing is ahead of every competitor here, but nobody can see it - no one in the space advertises "all N combinations type-check in CI."

---

## Monetization Patterns Observed

- **Cloud/ops layer on free CLI** (dominant durable model): Nx Cloud (usage credits, AI self-healing per-token), Encore Cloud (free dev → paid DevOps automation in customer's cloud), SST Console (per active resource).
- **Enterprise edition / internal-platform play**: refine Enterprise, Amplication's platform-engineering catalog with auto-maintained services.
- **Paid templates**: ShipFast $199–299 one-time (~$130k+/mo at peak), supastarter/Makerkit $200–600, marketplaces (BoilerplateHub). Pro template tiers on top of a free CLI are proven - and our web builder is a natural storefront.
- **Sponsorships/OSS programs**: better-t-stack (Vercel OSS Program) - low ceiling.
