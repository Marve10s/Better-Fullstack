# ScaffBench 2.1 Readiness

ScaffBench 2.1 turns the V2 single hard prompt into a small, repeatable suite. The goal is to keep
the current V2 results intact while making the next benchmark run harder, more reproducible, and
more diagnostic.

## Core Suite

The default `core` suite is intentionally BF-supported:

| Spec | Ecosystem | Main challenge |
| --- | --- | --- |
| `ai-search-workbench` | TypeScript | Distinguish Qdrant, OpenSearch, Inngest, oRPC, and full validation |
| `rust-leptos-axum` | Rust | Choose Leptos + Axum + SQLx + Tonic instead of nearby Rust alternatives |
| `python-ingestion-api` | Python | Avoid Django-only API tools while combining FastAPI, SQLModel, AI, queues, realtime, and quality |
| `go-realtime-api` | Go | Choose Chi, Ent, gRPC, NATS, Redis, and OpenTelemetry under explicit constraints |
| `multi-dotnet-ops` | Multi-ecosystem | Compose TypeScript frontend + .NET Minimal API backend through graph `--part` flags |

## Recommended Runs

Exploratory one-pass run:

```bash
bun run scripts/scaffbench-v2.ts \
  --model claude-opus-4-8 \
  --efforts high \
  --paths prompt,mcp,cli \
  --specs core
```

Publishable ScaffBench 2.1 run:

```bash
bun run scripts/scaffbench-v2.ts \
  --model claude-opus-4-8 \
  --efforts high \
  --paths prompt,mcp,cli \
  --specs core \
  --repeats 3 \
  --quality-gate \
  --doctor-check
```

Natural-prompt lane:

```bash
bun run scripts/scaffbench-v2.ts \
  --model claude-opus-4-8 \
  --efforts high \
  --paths prompt,mcp,cli \
  --specs core \
  --repeats 3 \
  --prompt-style natural
```

Browser route-check lane, which starts generated dev servers and runs Playwright against known
routes:

```bash
bun run scripts/scaffbench-v2.ts \
  --model claude-opus-4-8 \
  --efforts high \
  --paths mcp,cli \
  --specs ai-search-workbench \
  --quality-gate \
  --doctor-check \
  --route-check
```

Matrix-only artifact check, with no Claude calls:

```bash
bun run scripts/scaffbench-v2.ts \
  --write-matrix-only \
  --out-dir testing/.tmp-scaffbench-21
```

## Output Contract

Each run directory writes:

- `spec.json` with selected specs, canonical commands, and harness options
- `summary.json` with raw results, aggregate rows, confidence intervals, failure tags, and metadata
  (the metadata records the resolved `create-better-fullstack` version actually under test, the host
  toolchain versions — rustc/cargo/go/dotnet/python/uv/protoc/psql — and `environmentQualified: true`,
  since validation runs non-frozen network installs on those toolchains; `gitHead` only describes the
  local checkout, not the published generator the assisted paths exercise)
- `summary.md` with a leaderboard and run table
- `runs/<id>/prompt.txt`
- `runs/<id>/canonical-command.txt`
- `runs/<id>/claude.stdout.json`
- `runs/<id>/claude.stderr.log`

## Scoring Signals

Primary quality signal:

- validation pass/fail across install, build, typecheck, native checks, and optional quality gates

Right-library scoring is artifact-grounded for every path:

- `Wired libs` (primary) scores the libraries actually present in the generated
  tree (dependencies + source imports + required files) via strict markers.
- `Faithful` (assisted-path diagnostic) scores whether `bts.jsonc` echoes the
  requested stack. A 100% faithful but sub-100% wired run is tagged
  `stack-unwired` — the signature of a generator that recorded a library it
  never wired.

Secondary diagnostic signals:
- command discipline and tool-path compliance
- failure taxonomy tags
- average cost, output tokens, and wall time

Reliability is reported per spec, not pooled:
- `Macro` — mean of per-spec pass rates (each spec is one unit, so heterogeneous
  specs are not collapsed into a single binomial)
- `pass@k` — specs solved on at least one repeat; `pass^k` — specs solved on
  every repeat (consistency)
- Wilson 95% interval, shown only when a cell has at least 8 scored runs (below
  that it reads `n<8`, because e.g. 3/3 and 0/3 intervals overlap)

## Failure Tags

The harness emits stable failure tags:

- `project-not-found`
- `claude-timeout`
- `claude-error`
- `tool-violation`
- `command-discipline`
- `stack-mismatch`
- `install-failed`
- `build-failed`
- `typecheck-failed`
- `lint-failed`
- `format-failed`
- `test-failed`
- `doctor-failed`
- `route-failed`
- `validation-failed`
- `budget-exhausted`
- `toolchain-missing`
- `stack-unwired`

## Scope and run-outcome semantics (post-2.1 hardening)

- **Single-agent ablation, not a cross-vendor leaderboard.** The harness drives one agent (Claude
  Code); every row is one model family across creation paths and reasoning effort. The rendered
  summary heading and metadata say so explicitly. Cross-vendor comparison requires a second agent
  adapter and is out of scope until then.
- **CLI prompt no longer embeds the canonical command.** The agent must map requirements to flags
  itself; the full flag list is retained only in `canonical-command.txt`/`spec.json` for grading, so
  the CLI lane measures requirement→flag mapping rather than copy-fidelity.
- **Discovery lane (natural prompt + acceptance sets).** For specs with curated `acceptanceSets`,
  the natural prompt style does NOT name the required libraries — the agent infers them from the
  described capabilities, and scoring credits any accepted alternative (e.g. semantic search ∈
  {qdrant, pgvector, weaviate, …}) via an `Acceptance` (capability-satisfaction) column shown
  alongside the strict canonical `Wired` score. `ai-search-workbench` is curated; the other specs
  keep their explicit notes in the natural lane until their acceptance sets are added.
- **Agents run in an isolated workspace.** The agent's working directory is a temp dir disjoint from
  the grading tree, so the answer key (`canonical-command.txt`, `spec.json`, `summary.json`, sibling
  runs) is unreadable from the agent cwd via path traversal. The generated source is archived back
  under `runs/<id>/<project>` (excluding `node_modules`/build dirs) after scoring.
- **Three-way run outcome.** Each run is `success`, `model-failure`, or `infra-inconclusive`.
  Infra-inconclusive runs are excluded from the pass-rate denominator and surfaced in a dedicated
  `Inconclusive` column: a validation-step timeout, an exhausted token budget (`budget-exhausted`),
  a crash with no output, or `toolchain-missing` — raised only when the validator binary itself
  cannot be spawned (e.g. `cargo`/`uv`/`go`/`dotnet` absent). A generated script that runs and exits
  127 (a broken `build`/`test` script) stays a `model-failure`, as does a generation timeout (cf.
  SWE-bench).

## Per-spec solvability gate

`apps/cli/test/e2e/scaffbench-solvability.test.ts` scaffolds each spec from its
**own `canonicalFlags`** (not a hand-maintained preset that can drift) and runs
the harness's `validateProject` to assert the expected stack installs / builds /
type-checks. This guarantees a Better-Fullstack generator regression surfaces
here rather than being silently charged to the model in the benchmark. It is
toolchain-gated (a spec is skipped, with a logged warning, when its toolchain is
absent) and runs as the scheduled / `workflow_dispatch` `scaffbench-solvability`
CI job across all five ecosystems — it does not block per-PR checks. Run a
single ecosystem locally with
`SCAFFBENCH_SOLVABILITY_SPECS=<id> bun run scaffbench:solvability`.

Build dependencies beyond the language toolchain: `rust-leptos-axum` uses
Tonic/gRPC, whose build script compiles `.proto` files with `protoc` at
`cargo check` time, so `protobuf-compiler` must be installed (the CI job does
this). The first full CI run validated `ai-search-workbench`, `python-ingestion-api`,
`go-realtime-api`, and `multi-dotnet-ops`; `rust-leptos-axum` surfaced the missing
`protoc` build dependency — exactly the kind of environment gap this gate exists
to catch.

## Notes

- `--route-check` is implemented as an opt-in lane only. Do not use it for default runs unless the
  benchmark owner explicitly wants dev servers started. It uses Better-Fullstack project metadata,
  so prompt-only projects without `bts.jsonc` are skipped instead of guessed.
- `default` is not a reasoning level. The harness records the requested effort and a known effective
  reasoning value when the model default is known.
- Current homepage V2 data remains the June 24-25 single-spec Opus sweep. The homepage table is now
  ready to display 2.1 repeat counts, confidence intervals, command discipline, and failure tags.
