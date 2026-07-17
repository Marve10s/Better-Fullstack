# ScaffBench hardening change report (2026-07-17)

Implemented the complete `testing/scaffbench-hardening-spec-2026-07-17.md` scope. No benchmark sweep was run, no benchmark run directory was modified, and no file under `apps/web/` was changed.

Version stamps:

- `HARNESS_VERSION`: `2.2.0`
- `VALIDATION_CACHE_VERSION`: `4`
- `PROMPT_VERSION`: `2026-07-17`
- `MIN_RANKED_TRIALS`: `3`

## Per-item changes

| Item | Files touched | Behavior change | Regression test added |
| --- | --- | --- | --- |
| 1a | `scripts/scaffbench/agents/opencode.ts`, `scoring.ts`, `runner.ts`, `types.ts` | Parses opencode error/step-finish reasons and recognizes the exact unknown + zero-usage + no-tool + no-project provider-infra signature. | `1a derives opencode terminal reasons...` |
| 1b | `types.ts`, `scoring.ts`, `runner.ts`, `summary.ts` | Persists seven fine-grained outcomes and explicitly rolls only provider/harness/validation infra into the legacy inconclusive bucket. | `1b persists fine outcomes...` |
| 1c | `validation/classification.ts`, `validation/index.ts`, `scoring.ts` | Narrowly detects transient registry/network failures, retries install-class steps once, marks recurrence validation-infra, and keeps registry 404/model-version failures model-owned. | `1c retries a transient install once...` |
| 1d | `validation/cache.ts`, `validation/classification.ts` | Rejects timeout, spawn-error, and any transient-signature failure from the validation cache; green results remain cacheable. | `1d never caches transient failures...` |
| 1e | `scoring.ts` | Treats core timeouts as model failures unless backed by transient/spawn evidence; advisory timeouts do not erase a green core verdict. | `1e scores core timeouts...` |
| 1f | `agents/command.ts`, `types.ts`, `scoring.ts` | Records normalized spawn error codes and distinguishes harness-level missing binaries from project scripts that exit 127. | `1f separates project exit 127...` |
| 2a | `agents/command.ts`, `agents/claude.ts`, `agents/codex.ts`, `agents/opencode.ts`, `runner.ts` | Always parses partial streams after termination; Claude salvages the last usage-bearing event, Codex sums observed usage events, and opencode sums observed step finishes. | `2a salvages usage from partial...` |
| 2b | `agents/command.ts`, `types.ts`, `scoring.ts`, `runner.ts` | Persists `timeout-progressing`/`timeout-stuck` from received event timestamps and recent tool/file activity; both roll up as deadline failures. | `2b tags hard timeouts as progressing...` |
| 2c | `agents/command.ts`, all generation adapters, `constants.ts` | Adds a 20-minute stdout-idle generation timeout, distinct from the hard ceiling and always tagged stuck. | `2c kills stdout-idle generations...` |
| 2d | `types.ts`, `constants.ts`, all generation adapters, `runner.ts` | Adds per-spec `timeoutMultiplier`, applies it to `GEN_TIMEOUT_MS`, and retains `CLAUDE_TIMEOUT_MS` as a compatibility alias. | `2d applies per-spec timeout scaling...` |
| 2e | `types.ts`, `runner.ts`, `scoring.ts` | Persists each run's enforced/non-enforced budget policy; only Claude receives an enforced CLI cap, while Codex/opencode overages classify post-hoc as budget exhaustion. | `2e records enforcement policy...` |
| 3a | `constants.ts`, `summary.ts`, `build-scaffbench-data.ts`, `build-scaffbench-2-1-data.ts`, `splice-scaffbench-2-1.ts` | Uses prompt weights 75/25/0 and assisted weights 60/25/15 everywhere the index is computed or emitted. | `3a uses prompt and assisted...` |
| 3b | `summary.ts` | Removes the prompt-lane discipline floor, bounding zero-validation rows to 25% of wired-libraries mean. | `3b gates a zero-validation prompt cell...` |
| 3c | `summary.ts` | Computes validation, wired libraries, discipline, faithfulness, and acceptance over the same scored trial set. | `3c computes wired and discipline...` |
| 3d | `types.ts`, `validation/index.ts`, `validation/cache.ts`, `scoring.ts`, `summary.ts`, all three board-data scripts | Persists whether quality was requested, returns `"na"` when it was not, uses a quality-only denominator, and publishes unavailable full-pass as `null`. | `3d represents an unrequested quality gate...`; existing builder test also covers null. |
| 4a | `build-scaffbench-2-1-data.ts`, `splice-scaffbench-2-1.ts` | Keys exact results by model/effort/path/spec/trial and publishes trials, scored trials, pass count/rate, pass@k, and pass^k instead of choosing an arbitrary repeat. | `4a keys every trial...` |
| 4b | `runner.ts`, `types.ts`, `summary.ts` | Moves the repeat loop outside the spec loop, seed-shuffles specs per repeat, and stamps the deterministic seed in metadata/provenance. | `4b interleaves repeat rounds...` |
| 4c | `constants.ts`, `types.ts`, `runner.ts`, `summary.ts` | Adds suite/harness/cache/prompt/adapter/trial provenance and marks only consistent rows with at least three trials per cell `ranked`; others are `exploratory`. | `4c marks only version-consistent rows...` |
| 5a | `validation/index.ts` | Prefers `.sln`/`.slnx`; without one, restores/builds every discovered `.csproj` with namespaced steps. | `5a prefers a solution...` |
| 5b | `validation/index.ts` | Keeps `compileall`, runs configured mypy/pyright, or performs a src-layout entry-module import smoke that exposes missing runtime imports. | `5b runs configured Python typecheckers...` |
| 5c | `validation/index.ts` | Upgrades Rust validation to `cargo check --workspace --all-targets`. | `5c invokes cargo check...` |
| 5d | `validation/index.ts`, `scoring.ts` | Replaces mutating `go mod tidy` gating with `go mod download` + `go build ./...`; tidy runs against a disposable copy as an advisory diff. | `5d uses go mod download...` |
| 5e | `validation/index.ts` | Detects Expo packages and runs non-interactive `npx expo export`, adding `--platform web` when web dependencies are configured; raw exit-126 diagnostics remain intact. | `5e plans a non-interactive Expo export and preserves exit-126 diagnostics` |
| 5f | `types.ts`, `validation/index.ts`, `specs/frontier-polyglot-proto.ts` | Adds ordered `prerequisiteCommands`, gates builds on them, and wires `buf generate` for the polyglot proto spec. | `5f executes spec-declared prerequisites...` |
| 5g | `validation/index.ts` | Removes the three-root cap, validates every independent manifest root, and emits a failing skip when a discovered root/project cannot be validated. | `5g validates more than three...` |
| 5h | `validation/cache.ts`, `summary.ts` | Adds platform, architecture, and toolchain-version hash to cache identity; source hashing now includes modes, directory entries, and symlink targets. | `5h includes environment/toolchains...` |
| 6a | `types.ts`, `cli.ts`, `runner.ts` | Adds opt-in `--repair`; failed measured cells re-run the same adapter in the archive with a 50-line diagnostic prompt, revalidate, and store a separate repair result without replacing pass@1. | `6a keeps repair off by default...` |
| 6b | `calibrate.ts`, `cli.ts`, `runner.ts`, `index.ts` | Adds `scaffbench calibrate --spec <id>`, runs the fixed weak model and configured strong model once each through the runner, and prints keep/cut/inconclusive. | `6b parses calibrate...` |
| 6c | `types.ts`, every file under `specs/`, `summary.ts` | Backfills `introducedAt` from `git log --follow --diff-filter=A` (all current spec files resolve to `2026-07-10`) and renders introduction-cohort pass rates. | `6c backfills ISO introduction dates...` |
| 6d | `build-scaffbench-2-1-data.ts` | Emits a stderr discrimination row per spec with cross-model pass spread plus ceiling (>90%) and floor (0%) flags. | `6d reports per-spec model spread...` |

## Test and typecheck results

- `bun test scripts/` — **105 passed, 0 failed**.
- `bun x tsc --noEmit -p scripts/scaffbench/tsconfig.json` — **clean**.
- `git diff --check` — **clean**.

The focused TypeScript config is under `scripts/scaffbench/` and uses a dependency-light declaration shim for the dynamically imported route-check helpers, avoiding package build output or changes outside the permitted scope.

## Scope audit

- Modified implementation files only under `scripts/scaffbench/**`, the three permitted board-data scripts, and script tests.
- Added this required report under `testing/`.
- Did not modify `apps/web/**`.
- Did not modify any `testing/llm-benchmarks/**` run directory.
- Did not run a benchmark sweep or start a development server.
