# ScaffBench: code-volume metric (LoC) - implementation spec

Motivation: two rows can both pass a spec while one wrote 1k lines and the
other 10k. Code volume is a visible dimension (like tokens/cost/steps), NOT
part of the index.

SCOPE: `scripts/**` only (harness + publishers + a backfill script + tests).
Do NOT touch `apps/web/**` - the web consumer is being built in parallel and
will read the exact field shapes defined here. No benchmark sweeps.
Acceptance: tsc scripts scope clean; `cd scripts && bun test .` green
(root-cwd bun test loses child pipes on this machine - always run from
scripts/); new regression tests per item. Append a section to
testing/scaffbench-hardening-report-2026-07-17.md. End with exactly: LOC COMPLETE

## 1. measureProjectCode(dir) - new module scripts/scaffbench/code-metrics.ts

Walk the generated project (the ARCHIVED generation output, pre-validation):

- Skip directories: node_modules, target, .git, deps, \_build, vendor, Pods,
  .venv, .dart_tool, .gradle, obj, bin, dist, build, .next, .expo, coverage
  (reuse/share the validation walk skip-list where practical).
- Skip machine-generated lockfiles by NAME: bun.lock, bun.lockb,
  package-lock.json, yarn.lock, pnpm-lock.yaml, Cargo.lock, go.sum, mix.lock,
  poetry.lock, uv.lock, Pipfile.lock, packages.lock.json, composer.lock,
  Gemfile.lock, gradle.lockfile.
- Skip binaries: any file whose first 8KB contains a NUL byte; also by
  extension (png,jpg,jpeg,gif,webp,ico,pdf,woff,woff2,ttf,otf,eot,zip,jar,
  wasm,keystore,p8,p12,db,sqlite).
- Count every remaining file: lines (newline count, +1 for unterminated last
  line of non-empty files), bytes.
  Return { files: number, lines: number, bytes: number }.

## 2. Persist at scoring time

In the runner where scoreProject runs on generatedDir (generation phase,
BEFORE validation installs anything), compute measureProjectCode and persist
on the run result as `codeMetrics: { files, lines, bytes }` (null/absent when
no project dir). Add to types.ts.

## 3. Aggregates

summary.ts bySpecCell: `avgLines` (mean over SCORED trials, same eligibility
set as other metrics; null when nothing scored). Leaderboard rows: `avgLines`
mean over scored cells.

## 4. Publishers

- build-scaffbench-2-1-data.ts PublishedCell: add `lines: number | null` -
  from cell aggregate avgLines when present, else recompute mean from raw
  results' codeMetrics, else null (legacy summaries).
- splice normalization: null-propagate (existing cells without the field
  stay null; never fabricate).
- build-scaffbench-2-2-data.ts cells: emit `lines` the same way.

## 5. Backfill script scripts/benchmarks/backfill-scaffbench-code-metrics.ts

For each dir passed as argv (default: the three 2.2 cohort dirs under
testing/llm-benchmarks/v2-codex-{sol,terra,luna}/gpt-5-6-\*-high-r3-2026-07-17):
for every result with a projectDir that exists on disk, compute
measureProjectCode and write codeMetrics into summary.json results (idempotent;
skip results that already have codeMetrics unless --force). Recompute the
bySpecCell avgLines aggregates consistently. NOTE: archived projects were
PRUNED of node_modules/target etc. - the skip list makes this a no-op
difference, which is the point; state this in a comment.
Then RUN the backfill on the three cohort dirs and regenerate
apps/web/src/components/home/scaffbench-2-2-data.ts is FORBIDDEN (web scope) -
instead just run the backfill so summaries carry codeMetrics; the operator
regenerates the web data file.

## 6. Tests (scripts/, assert failure scenarios)

- lockfiles and binaries excluded; nested skip dirs excluded; unterminated
  last line counted.
- cell avgLines uses scored trials only.
- publisher null-propagation for legacy cells without the field.
- backfill idempotency.
