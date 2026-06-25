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
- `summary.md` with a leaderboard and run table
- `runs/<id>/prompt.txt`
- `runs/<id>/canonical-command.txt`
- `runs/<id>/claude.stdout.json`
- `runs/<id>/claude.stderr.log`

## Scoring Signals

Primary quality signal:

- validation pass/fail across install, build, typecheck, native checks, and optional quality gates

Secondary diagnostic signals:

- right-library score from `bts.jsonc` or strict dependency/source/file markers
- command discipline and tool-path compliance
- failure taxonomy tags
- average cost, output tokens, and wall time
- Wilson 95% interval for repeated pass rates

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

## Notes

- `--route-check` is implemented as an opt-in lane only. Do not use it for default runs unless the
  benchmark owner explicitly wants dev servers started. It uses Better-Fullstack project metadata,
  so prompt-only projects without `bts.jsonc` are skipped instead of guessed.
- `default` is not a reasoning level. The harness records the requested effort and a known effective
  reasoning value when the model default is known.
- Current homepage V2 data remains the June 24-25 single-spec Opus sweep. The homepage table is now
  ready to display 2.1 repeat counts, confidence intervals, command discipline, and failure tags.
