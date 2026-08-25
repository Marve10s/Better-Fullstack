# ScaffBench hardening — implementation spec (2026-07-17)

Synthesized from two independent research reports (Fable 5 + GPT-5.6 Sol) over
`scripts/scaffbench/`, the 2026-07-10 validator audit, and reference practice
from SWE-bench Verified / Terminal-Bench / Aider / LiveCodeBench.

SCOPE RULES

- You may modify: `scripts/scaffbench/**`, `scripts/benchmarks/build-scaffbench-data.ts`,
  `scripts/benchmarks/build-scaffbench-2-1-data.ts`, `scripts/benchmarks/splice-scaffbench-2-1.ts`,
  and test files under `scripts/`.
- Do NOT modify anything under `apps/web/` (a parallel work stream owns it).
- Do NOT run benchmark sweeps. Do NOT touch `testing/llm-benchmarks/` run dirs
  (a live sweep is writing there).
- Acceptance: `bun x tsc --noEmit -p .` clean for the touched tsconfig scope (or
  the repo's existing check for scripts), `bun test scripts/` (existing harness
  tests, e.g. scaffbench-v2-lib.test.ts) green, plus NEW regression tests for
  each numbered item below. Write a change report to
  `testing/scaffbench-hardening-report-2026-07-17.md` listing per item: files
  touched, behavior change, test added.
- Bump `HARNESS_VERSION` to "2.2.0" and `VALIDATION_CACHE_VERSION` to 4 once,
  with comments summarizing this batch.

## 1. Automatic infra-vs-model classification (replaces hand-purging)

1a. `agents/opencode.ts` — `parseOpencodeResult` currently hardcodes
`terminal_reason: undefined`. Derive it from the JSONL stream: error events,
`step_finish` with `reason` values, zero-usage detection. A run with zero output
tokens, no tool events, and no project directory must classify as
`provider-infra`, never model-failure. opencode masks provider 429s by retrying
internally then emitting `reason:"unknown"` with zero tokens — detect exactly
that signature.

1b. `scoring.ts` — replace the binary infra-inconclusive logic with evidence-
backed outcome categories: `success | model-failure | provider-infra |
harness-infra | validation-infra | budget-exhausted | deadline-exhausted`.
Preserve the current three-way rollup for aggregate compatibility
(provider/harness/validation-infra all count as inconclusive), but persist the
fine-grained category on the run result for the board/notes.

1c. Transient-network signatures: in the validation step classifier, match
install-class step stderr/stdout tails against a narrow list (EAI_AGAIN,
ENOTFOUND, ETIMEDOUT, ECONNRESET, HTTP 429, 5xx from registries, TLS
handshake). On first match retry that step once (`validation/index.ts`); if it
recurs → `validation-infra`. Registry 404 / nonexistent package version is a
MODEL failure, not infra — keep that distinction explicit and tested.

1d. `validation/cache.ts` (`cacheableValidation`) — never cache a failure whose
steps match a transient signature; keep caching timeouts/spawnErrors excluded
as today; cache green results always.

1e. Fix the every-timeout-is-infra hole (audit F4): a CORE-step timeout is a
model failure unless a transient signature or spawn-level evidence indicates
infra (a model-authored watch-mode build must not erase the run from the
denominator). An ADVISORY-step timeout must not invalidate an already-measured
core verdict.

1f. Distinguish exit-127-from-project-script (model failure: their script
references a missing binary) from harness-level missing toolchain
(harness-infra). Record spawn error codes on steps.

## 2. Timeout & accounting

2a. `agents/command.ts` + each `parse*Result` — on `timedOut`, salvage token/
cost accounting from the partial event stream (walk the same JSONL events; for
codex sum `turn.completed`/usage events seen so far; for opencode sum
`step-finish` parts; for claude use the last result-bearing event). The result
must carry usage even when the process was SIGTERMed.

2b. Tag timed-out runs `timeout-progressing` vs `timeout-stuck` from event
timestamps: tool/file activity within the last 10 minutes of the window →
progressing. Both score as failures; persist the tag on the result.

2c. Idle timeout: kill a generation after 20 minutes with NO stream activity
(no stdout bytes), classified `timeout-stuck`, separate from the hard ceiling.
Implement in the command runner via last-activity tracking.

2d. Per-spec hard-ceiling scaling: optional `timeoutMultiplier?: number` on
`BenchmarkSpec` (default 1) applied to `CLAUDE_TIMEOUT_MS` in the runner (rename
that constant to `GEN_TIMEOUT_MS`; keep an alias export if referenced widely).

2e. Budget normalization: only the Claude adapter receives `maxBudgetUsd`.
Record in run metadata, per run: the budget policy actually in force
(`budgetEnforced: boolean`, value). Where codex/opencode report cumulative cost
in-stream, detect budget exhaustion post-hoc (cost > cap) and classify
`budget-exhausted` instead of silently letting it ride.

## 3. Scoring & index

3a. `constants.ts` `SCAFFBENCH_INDEX_WEIGHTS` — make path-dependent: prompt
lane {validation: 0.75, wiredLibs: 0.25, discipline: 0} (discipline is 100% in
all 317 published cells — a constant, not a signal); assisted lanes keep
{0.6, 0.25, 0.15}. Mirror wherever weights are consumed (`summary.ts`,
`build-scaffbench-2-1-data.ts` W, splice script W).

3b. Gate the composite: a row with zero validation passes cannot exceed index
= 0.25 \* wired mean (i.e. no discipline floor). Simply follows from 3a for the
prompt lane; assert with a test.

3c. Consistency: validation aggregates exclude infra-inconclusive runs but
wired/discipline means currently average over ALL runs (`summary.ts`). Compute
every component over the same eligible (scored) trial set.

3d. Quality-tier honesty: `qualityPassed` returns vacuous true when the quality
gate never ran. Persist `qualityGateRequested` in `ProjectValidation`; when not
requested, quality is `"na"`, not pass. `fullPass` consumers
(build-scaffbench-data.ts) treat "na" as null/unavailable, not false and not
true.

## 4. Trial integrity (prerequisite for repeats)

4a. `build-scaffbench-2-1-data.ts` and `splice-scaffbench-2-1.ts` key results
by `path|specId` only — a multi-trial dir silently publishes an arbitrary
trial. Key by `model|effort|path|spec|trial`; when trials > 1, derive cell
verdicts from aggregate pass counts (pass rate, pass@k, pass^k are already
computed in `summary.ts`), and emit per-cell `trials: number`.

4b. `runner.ts` — interleave repeats: trial loop OUTSIDE the spec loop so trial
2 of spec A doesn't immediately follow trial 1 (temporal decorrelation).
Randomize spec order within a trial with a seeded shuffle; record the seed in
metadata.

4c. `summary.ts` / metadata: add `publicationEligibility`: a row is
`"ranked"`-eligible when all its cells share suite version, harness version,
validator cache version, prompt version (add a PROMPT_VERSION constant), agent
adapter, and trials >= a `MIN_RANKED_TRIALS` constant (set 3; single-trial
sweeps mark `"exploratory"`). This is metadata only — no behavior change to
sweeps.

## 5. Validator v4 (verdict-changing; VALIDATION_CACHE_VERSION → 4)

5a. .NET: prefer building the `.sln`/`.slnx` when present; otherwise build
EVERY discovered `.csproj` root (namespaced steps machinery exists). Remove the
current build-only-`apps/server`-or-roots[0] behavior.

5b. Python: if the project configures a typechecker (mypy.ini / pyright section
in pyproject) run it; else run an entry-module import smoke
(`python -c "import <pkg>"` against the src layout); keep `compileall` as an
additional syntax gate. Missing third-party imports must fail.

5c. Rust: `cargo check --workspace --all-targets` minimum (current: bare
`cargo check`).

5d. Go: replace mutating `go mod tidy` gate with `go mod download` +
`go build ./...`; run tidy as ADVISORY diff (report, don't gate).

5e. Expo/React Native: add non-interactive `npx expo export` (or
`expo export --platform web` when web configured) as the build step; exit-126
class failures should surface the actual command error.

5f. Spec-declared codegen prerequisites: `prerequisiteCommands?: string[][]` on
`BenchmarkSpec`, run in order before component builds (e.g. `buf generate`,
`sqlc generate`). Wire frontier-polyglot-proto's proto codegen as the first
user.

5g. Remove/raise the 3-root validation cap; an unvalidated root must surface as
its own failed/na step, never silently allow a pass.

5h. Cache identity: include platform, arch, and `collectToolchainVersions()`
output hash in `validationCacheKey`; include file modes and symlink targets in
`hashProjectSource`.

## 6. Batch-4 features (behind flags; no default behavior change)

6a. `--repair` flag: after `validatePendingResults`, for each failed cell
re-invoke the SAME agent in the archived project dir with the failing step's
stderr tail (~50 lines) appended to a short repair prompt; re-validate; store
as `repair` result alongside pass@1 (new field, not a new path). Skipped
entirely without the flag.

6b. `scaffbench calibrate --spec <id>`: runs the spec on a weak model
(opencode/deepseek-v4-flash-free) and a strong model (config default) once
each, prints keep/cut per the weak-fails/strong-passes rule from constants.ts
comments. New subcommand file; reuse runner machinery.

6c. `introducedAt: string` (ISO date) on every `BenchmarkSpec` (backfill:
existing 13 specs use their git introduction dates — find via `git log
--follow --diff-filter=A -- <specfile>`); surface per-cohort pass rates in
`summary.md` output.

6d. Discrimination report: in `build-scaffbench-2-1-data.ts`, emit (stderr) a
per-spec pass spread across models; flag ceiling (>90% pass) and floor (0%)
specs.

## Explicitly OUT of scope

- Registry snapshotting/containerized validation (live registries are the
  bench's subject matter — drift is managed by 5h + run-metadata stamps).
- Retrofitting functional verifiers/oracles onto all existing specs.
- Any `apps/web` change.
- Re-scoring the published board (that's a separate operator action after this
  lands).
