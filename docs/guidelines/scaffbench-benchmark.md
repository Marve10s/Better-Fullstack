# ScaffBench Benchmark

Read this before running ScaffBench, benchmarking a model/CLI, adding a spec, changing the harness, or publishing results. This document is the single home for harness rationale — the code stays comment-free; the "why" lives here.

ScaffBench measures whether an LLM coding agent can scaffold a **working, correctly-wired fullstack project** from a spec. The agent builds the project; the harness installs, builds, type-checks, and native-compiles it, then scores it.

## Current protocol (ScaffBench 2.2 — the baseline)

2.2 is the reset baseline; everything older is archived history. A published row must match ALL of:

| Field | Value |
| --- | --- |
| Harness | `2.2.2` |
| Suite | `2.1` (13 core specs) |
| Prompt version | `2026-07-17-round-2` (self-verify) |
| Validator cache | v6 |
| Quality gates | ON (the board metric is the Full tier) |
| Path | `prompt` only |

The published board is `apps/web/src/components/home/scaffbench-2-2-data.ts`; the publication guards (`assertBoardProtocol` et al. in `scripts/splice-scaffbench-2-2-row.ts`) reject rows assembled under any other protocol.

## Layout

- `scripts/scaffbench-v2.ts` — thin entry point: `bun scripts/scaffbench-v2.ts <flags>`.
- `scripts/scaffbench/` — the harness: `cli.ts` (flags), `runner.ts` (scheduling/generation/validation loop), `scoring.ts`, `summary.ts`, `validation/` (per-ecosystem validators + cache), `specs/`, `agents/` (per-CLI adapters + `routing.ts`).
- Tests: `scripts/scaffbench-v2-lib.test.ts`, `scripts/scaffbench-hardening*.test.ts`, `scripts/scaffbench-2-2-publication.test.ts`. Run all of them after any harness edit.
- `scripts/build-scaffbench-2-2-data.ts` — wholesale board regen from every dir in `RUN_SOURCES`.
- `scripts/splice-scaffbench-2-2-row.ts` — adds ONE run to the board, leaving existing rows byte-identical.

## Supported agents

The driving CLI is inferred from the model-id prefix by `providerForModel()` (`scripts/scaffbench/agents/routing.ts`):

| Prefix / pattern | Provider | Notes |
| --- | --- | --- |
| `pi/*` | Pi | |
| `kilocode/*`, `kilo/*` | Kilo Code | `kilocode/<id>` drives Kilo with an arbitrary provider id (disambiguates from opencode's `openai/*` and Kilo's credit-gated catalog). Adapter strips the prefix. |
| `opencode/*`, `opencode-go/*`, `cloudflare-ai-gateway/*`, `openai/*` | opencode | Free tier, paid Go subscription, gateway passthrough. `--dangerously-skip-permissions` is baked into the adapter — without it headless runs scaffold nothing. |
| `*gemini*` | Antigravity (`agy`) | Plain-text output: no token/cost/session data (fields show `—`). Effort is a name suffix, not a flag. |
| `gpt*`, `o<digit>*`, `codex*` | Codex | Effort → `model_reasoning_effort`; runs with `--ignore-user-config`. |
| anything else | Claude Code | Default. |

Adding a CLI = prefix branch in `providerForModel()` + a `runX` adapter + `parseXResult` + a routing test.

## Running a benchmark — the rules

**1. Serial only. Never run two benchmarks, or a benchmark plus other heavy work, on this machine at once.** The 2.2 GPT cohort ran three models in parallel and trial 1 scored systematically worst across all three (Full 11/39 vs 19 and 18 in later trials) — load contamination is real and indistinguishable from model quality after the fact. The harness itself is already serial (generation and validation both run at concurrency 1); keep the machine serial too. This includes other agent sessions mutating the repo mid-run.

**2. Launch with `--repeats 3`; stop after round 1 if the row is exploratory.** Trials run in rounds (all trial-1s first, freshly seeded spec order per round), and `--repeats` is locked into the out-dir protocol at launch — you can stop early and resume later, but you cannot grow a repeats-1 dir into 3. Single-trial Full scores carry ±3–4 specs of noise (2026-07-28 analysis of the 3-trial cohort: ~40% of specs flip outcomes between trials; simulated single-trial boards produced three different winners). Coarse placement is fine at 1 trial; ranking claims against a neighbor within ~3 specs need 3.

**3. Detach long runs.** Background shells get killed ~20–30 min after last output. Pattern:

```bash
nohup bun scripts/scaffbench-v2.ts --model <id> --efforts high --repeats 3 \
  --out-dir testing/llm-benchmarks/v2/<slug>-high-<date> \
  > testing/llm-benchmarks/v2/<slug>-high-<date>.log 2>&1 &
```

**4. Preflight checklist** (missing toolchains score specs inconclusive, silently weakening the row):

- `bun`, `cargo`, `go`, `dotnet`, `mix`, `java`, `uv` all on PATH.
- The driving CLI installed and authenticated (`opencode auth list`, `codex login status`, …).
- ≥20 GB free disk; broad sweeps have died on ENOSPC before.
- No other benchmark, validation, or agent session running.
- One run per out-dir, ever (runs are queue-locked per out-dir).

**5. Post-run checks before believing a summary:**

- Inconclusive count (`provider-infra`, `harness-infra`, `validation-infra`) — these are excluded from the pass denominator; more than a couple means the run needs repair, not publication.
- `skip` steps inside Full-tier failures — a skip is a gate that should have run but couldn't; if it points at a generated/vendored directory, suspect the validator, not the model (that class of bug is what validator v6 fixed).
- `deadline-exhausted` / `timeout-stuck` outcomes — real failures by classification, but eyeball whether the machine (not the model) was wedged.
- Zero-usage results on opencode — the CLI masks 429s as `reason: unknown` with zero tokens; purge and re-run those trials.
- `steps = 0` on opencode/Kilo rows is a known artifact (tool-steps are parsed from `claude.stdout.json` only).

## Flags reference

- `--model <id>` (default `opus`), `--efforts default|low|medium|high|xhigh|max` (comma list), `--repeats <n>`, `--out-dir <path>`, `--max-budget-usd <n>` (default 12/spec).
- `--specs core` (13, default) | comma list | `--list-specs`.
- `--paths prompt|mcp|cli` — default `prompt`. `mcp` is opt-in, `cli` legacy; neither is part of the methodology.
- `--prompt-style explicit|natural` — `natural` is the discovery lane.
- Two-phase: `--generate-only`, then `--validate-existing` (validation cached by source hash + cache version). `--force-revalidate` re-scores everything. Re-running the same out-dir resumes; completed trials are skipped.
- `--no-quality-gate` opts OUT of quality gates (they default on; a board row without them is unpublishable). `--doctor-check --route-check` add root-level advisory checks.
- `--skip-validation`, `--write-matrix-only`, `--repair`.

Timeouts and budgets (constants.ts): generation 90 min × spec multiplier (generous so only genuinely stuck agents hit it — a SIGTERM'd thoughtful run loses its cost accounting AND scores as a model failure), 20 min idle, validation 10 min/step, 45 min/project, root cap 12. The $/spec budget is the real cost backstop.

## Scoring

- **Index** (0–100): prompt path = 75% macro validation + 25% wired-libs (discipline saturates on the prompt path and is weighted 0); assisted paths = 60/25/15.
- **Core pass** = install + build + typecheck + native compile green. **Full pass** = Core AND every applicable quality gate (lint/format/test) green — a `skip` (gate that should have run but no tool was configured) disqualifies; `na` steps are excluded. Full ⊆ Core always; `passRate === 100` from the raw harness is never trusted directly (it was vacuously 100 on zero-step runs once).
- **Wired libs** = requested libraries actually present (deps + imports + files).
- **Eligibility**: `MIN_RANKED_TRIALS = 1` — a single-trial row ranks (a 13×3 cohort per row is prohibitively expensive; lowered 2026-07-25). Wilson intervals are suppressed below `MIN_CI_RUNS = 8` scored runs so no row over-claims precision. Per-cell `scoredTrials` is authoritative; board-level `trialsPerSpec` only reflects the first run source.
- Re-validation under a newer validator refreshes the result's `harnessVersion`/`validationCacheVersion` provenance (the verdict really was produced by the current validator); generation-side provenance (prompt version, adapter, trials, seed) is never touched.

## Validator notes

- Validation is membership-aware: nested `package.json`/`Cargo.toml` roots covered by a parent workspace validate through the parent; uncovered nested roots validate independently. Go modules always validate independently (`go build ./...` never descends into a nested module).
- v6: a `package.json` with none of `name`/`scripts`/`dependencies`/`devDependencies`/`workspaces` is a module-format marker (paraglide's generated output, dist markers), never a root. v5 cost Sol a Full pass this way.
- Java/Elixir validate only on an explicit `validationProfile.native` — file autodetect would run gradle on React Native's `android/` dir.
- An install-only root (no build script, no typecheck surface) measures nothing — the validator descends into workspace members so the verdict reflects code.
- Watcher-shaped builds can hang validation past every timeout (the per-step cap doesn't kill process trees). If `validate.log` mtime stalls >12 min, kill the tree. macOS has no `timeout`; use `gtimeout` or a PID kill loop.
- .NET specs need the .NET SDK; Antigravity runs never report cost/tokens.

## Publishing a row

1. The run must satisfy the protocol table above and be Full-tier (quality gates on).
2. Add the run dir to `RUN_SOURCES` in `build-scaffbench-2-2-data.ts` (and a `MODEL_LABELS` entry if the slug is ugly).
3. **Wholesale regen** (`bun run scripts/build-scaffbench-2-2-data.ts`) when every `RUN_SOURCES` dir exists on disk — this is the preferred, byte-reproducible path. **Splice** (`bun run scripts/splice-scaffbench-2-2-row.ts <run-dir>`) only when older cohort artifacts are gone; the splice guards verify the new row matches the board protocol exactly.
4. Commit the run's `summary.md` under `benchmarks/` (summaries only, never scaffolded trees). Archive the raw run dir as a tarball under `testing/llm-benchmarks/archives/` — re-validation after future validator fixes needs the project trees.
5. Update the blog (`apps/web/content/blog/scaffbench-2-2.mdx`): new rows aren't published until the narrative reflects them. Blog frontmatter needs a ≤170-char description and all 8 i18n bundles.
6. Tier placement: subscription models that report `cost = $0` (`opencode-go/*`) are PAID — only genuinely free ids (`*-free`, `:free`) go under the Free divider.

## Adding a spec

Calibration rule: run the candidate on a WEAK model (`opencode/deepseek-v4-flash-free`) and a STRONG model; keep it only if weak fails while strong passes. Both pass = saturated, cut it. "Fancy framework" is not "hard spec" — a free model once wired 100% of libs on 11/11 supported specs via MCP. Difficulty comes from traps (right-vs-plausible forks), restraint (penalize over-scaffolding), build-correctness, or pure engineering.

Parked candidates (validated design, not yet implemented):

- **Supported + traps** (needs canonicalFlags + expectedConfig + loose strictMarkers): `calcom-scheduling` (Next + tRPC + Prisma + Stripe; traps: tRPC not oRPC, Prisma not Drizzle, `self` backend, payments faithfulness), `twenty-crm` (NestJS + TypeORM + GraphQL; trap: TypeORM+better-auth has no adapter → auth:none), `novu-notifications` (NestJS + Mongoose + Redis; trap: Mongo not Postgres).
- **Frontier / prompt-only** (`supportedByBetterFullstack: false`): `frontier-vite-bundler` (build tool, not app), `frontier-redis-clone` (RESP protocol, Rust/Go), `frontier-crdt-collab`, `frontier-clickhouse-analytics`.
- **Rejected as saturating — do not re-propose**: convex-collab, astro-docs-site, qwik-storefront, umami-analytics.
- Difficulty multipliers worth exploring on existing specs: restraint scoring, discovery lane (`naturalPrompt` + acceptanceSets).

## History (archived — pre-reset)

V1 (original) → V2 (2026-06-26: opencode/Kilo adapters, first free-model study, vacuous-pass fix) → V2.1 (2026-06-30: 13 specs, prompt-only methodology, honest-pass fix, Codex/Antigravity adapters) → 2.2 (2026-07-17: self-verify prompt, 7-outcome classification, trial-keyed repeats, quality gates default-on, Full-tier board metric) → **2.2.2 (2026-07-28: validator v6, provenance refresh on re-validation, comment-free harness — the reset baseline)**. Pre-2.2 boards, blogs, and build scripts are historical; do not extend them.
