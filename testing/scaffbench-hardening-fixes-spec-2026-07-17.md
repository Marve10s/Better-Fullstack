# ScaffBench hardening — review-fix spec (round 2, 2026-07-17)

Union of two independent adversarial reviews (Fable 5 + GPT-5.6 Sol) of commit
a72440690. Fix ALL items. Same scope rules as round 1: only `scripts/**` and
script tests; do NOT touch `apps/web/**` (parallel stream owns it); no sweeps;
don't modify `testing/llm-benchmarks/**`. Acceptance: tsc scripts scope clean,
`bun test scripts/` green, a NEW regression test per item that asserts the
FAILURE scenario described (not just the helper's happy path). Append a
"Round 2" section to `testing/scaffbench-hardening-report-2026-07-17.md`.
End your final message with the exact line: FIXES COMPLETE

## A. Multi-trial aggregation drops no-project failures (both reviews, High)
`build-scaffbench-2-1-data.ts:112` — `scoredTrials = min(aggregate.scoredRuns,
measurable.length)` erases scored trials that produced no project/steps.
{no-project fail, pass, pass} → passRate 100. Fix: derive scored/pass counts
from EVERY raw trial's persisted outcome + corePass, counting scored
non-measurable trials as failures; assert exact equality with summary
aggregates and THROW on mismatch (never repair with min/max). Test must use a
failed trial with NO steps.

## B. Splice quality normalization (Fable #2)
`splice-scaffbench-2-1.ts:113-114` — `qualityPassCount: existing.qualityPassCount
?? (cell.fullPass ? 1 : 0)` turns fullPass:null into a measured 0. Fix:
null-propagate (`cell.fullPass === null ? null : ...`) for both count and rate.

## C. Prompt/spec install-policy contradiction (Sol #3, High)
`prompts.ts:41` allows installs; spec BODIES still forbid them (e.g.
`specs/frontier-polyglot-proto.ts:19`; grep all specs for install prohibitions).
Policy decision (final): self-verification is ALLOWED. Remove/reword every
"do not install" style line in spec bodies so they no longer contradict the
base prompt; where a spec means "the CLI scaffold step must use --no-install",
say exactly that. Add a prompt snapshot test asserting the generated prompt
for each pathMode contains no contradictory install instructions.

## D. Idle-kill is adapter-unsafe (both, High)
`agents/command.ts:43` counts only stdout bytes; all adapters enable it; agy
buffers everything. Fix: make idle timeout an adapter capability — enable ONLY
for verified streaming JSONL adapters (claude, codex, opencode, kilo), DISABLE
for agy. Count BOTH stdout and stderr bytes as activity. Suspend idle
enforcement while a tool call is in flight (tool-start event seen without its
completion) — a silent 30-min build inside a tool call must not be killed
(the new prompt explicitly invites installs/builds). Test: buffered-adapter
simulation (no stdout for > idle window, then output) survives when idle
disabled; in-flight tool-call suspension covered.

## E. Transient-network classification too loose (both, High)
`validation/classification.ts`:
- `\b5\d\d\b` with optional HTTP prefix matches "531 packages installed" when
  any registry URL appears in the tail. Require adjacency to HTTP/status/error
  context (e.g. /(?:HTTP|status(?: code)?|error)\D{0,10}5\d\d/i) AND a
  registry/package-manager fetch context.
- `\b429\b` matches version substrings like "0.429.1" (dots are word
  boundaries). Require the same HTTP/status/too-many-requests context.
- The 404 short-circuit at :23 returns false even when a genuine 503 is also
  present — only treat 404/version-not-found as model-owned when NO transient
  signature matches a DIFFERENT line.
- `isRecurringTransientFailure` (:37-43) must require actual retry evidence
  (the step was retried and failed transiently again), not the raw signature
  alone — otherwise pre-2.2 results re-summarized get silently reclassified.
  Keep raw signature only for cache exclusion.
- `scoring.ts:556` provider-infra regex: add \b anchors and require error-ish
  context; "capacity" inside prose or "14293" must not match. Tests: lifecycle
  script printing 429/DNS errors twice → model failure; "531 packages
  installed" → not transient; mixed 404+503 → transient; "0.429.1" → not.

## F. opencode zero-usage vs refusal (Sol #8)
`agents/opencode.ts` — track assistant text/refusal events; the provider-infra
signature must require reason:"unknown" + zero usage + no tools + NO assistant
text. A refusal/moderation with text is a model failure. Negative test.

## G. Workspace membership + solution coverage (both, High)
`validation/index.ts` — `dropNestedRoots` never parses membership; .NET builds
only `solutions[0]`. Fix: parse actual membership (bun/npm `workspaces` globs,
`[workspace] members` in Cargo.toml, sln project references; python: keep
current heuristic but emit steps). A discovered manifest not covered by a
parent workspace/solution gets validated independently; when it cannot be
(overflow, unsupported), emit an explicit FAILING `unvalidated:<root>` step —
never silence. For .NET: build preferred solution + independently build
uncovered csproj.

## H. Unbounded validation time (Sol #11)
Add a total per-project validation deadline (default 45 min, constant) and a
generous root cap (e.g. 12); overflow emits explicit failed `unvalidated:<root>`
steps. Wire into the multi-root loops.

## I. Repeat ID stability (Sol #10)
`runner.ts:875` omits `-r01` when repeats===1. Fix: ALWAYS suffix new run IDs
with the trial number; on resume, migrate/match legacy unsuffixed IDs as trial
1 (do not regenerate them); reject resuming a dir whose recorded runProtocol
(repeats/seed) conflicts with the current invocation unless artifacts align.

## J. Budget-exhaustion on estimates (Fable #6)
`scoring.ts:501-523` — flipping a PASSING run to budget-exhausted off a
hand-maintained price estimate is fragile. Apply post-hoc budget exhaustion
only when estimated cost exceeds cap * 1.25 (tolerance constant), and record
`budgetEstimated: true` in the outcome evidence. Test the tolerance boundary.

## K. Timeout usage salvage accuracy (Fable #7)
`agents/claude.ts` — salvage currently takes the LAST usage-bearing message
(per-message usage → undercount). Fix: SUM per-message usage across the
partial stream. `agents/codex.ts` — summing `turn.completed` usages assumes
per-turn deltas; add a monotonic-cumulative detector: if successive usage
totals are non-decreasing supersets, take the last instead of summing. Comment
the heuristic; test both shapes.

## L. --skip-validation mislabeled (Fable #11)
`runner.ts:304-310` — skip-validation runs persist outcome "model-failure".
They must persist an explicit unmeasured/skipped outcome that scoring treats
as not-scored (excluded from denominators), with a test.

## M. Python import smoke safety (Fable #10)
`validation/index.ts:842-863` — first-alphabetical module can shadow an
installed package (vacuous pass) or execute arbitrary top-level code. Fix:
import the project's module via importlib from its FILE PATH (spec_from_file_
location) so the project source is what's imported; prefer packages containing
an __init__; skip modules whose name collides with an installed distribution
only when file-path import is impossible. Keep configured mypy/pyright as the
preferred gate. Test: missing third-party import in project source must fail
validateProject end-to-end (fixture).

## N. introducedAt is one bucket (Fable #12)
All specs say 2026-07-10 (file-split date). Backfill from when each spec's
CONTENT landed: use `git log -S '<spec id>' --reverse` over the deleted
`scripts/scaffbench-v2-lib.ts` history and PR dates. Expected shape: original
5 core specs late June (v2 readiness 2026-06-30); expansion batches 1-3 in
early July (PR #282 era, before the 2026-07-06 fable5 run for the 13-spec
suite). Exact dates from git history, not guesses; document the command used
per spec in the report.

## O. Test-quality gaps called out by Sol (implement alongside the above)
- Repeat aggregation test WITH a stepless failed trial (item A).
- Shuffle/interleave test covering cross-round adjacency + resume with changed
  repeat count (item I).
- Expo test asserting install → export ORDERING in the planned steps.
- Python end-to-end missing-import failure (item M).
- .NET solution-coverage test: sln + orphan csproj → orphan built or failing
  step emitted (item G).
- Nested independent bun/cargo root with broken child → child validated (G).
- Idle-timeout tests per item D.
- Prompt snapshot test per item C.
- Adversarial classification fixtures per items E/F.
