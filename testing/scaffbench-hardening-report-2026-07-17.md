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

## Round 2 (2026-07-17)

Implemented every item in `testing/scaffbench-hardening-fixes-spec-2026-07-17.md`. Round 2 keeps all implementation and regression-test changes under `scripts/**`; this report append is the only requested change outside that tree. No file under `apps/web/**` or `testing/llm-benchmarks/**` was modified, and no benchmark sweep or development server was run.

Round-2 version stamps:

- `HARNESS_VERSION`: `2.2.1`
- `VALIDATION_CACHE_VERSION`: `5`
- `PROMPT_VERSION`: `2026-07-17-round-2`
- Total project-validation deadline: 45 minutes
- Validation root cap: 12
- Estimated-budget tolerance: 1.25× the configured cap

### A–O fixes and regressions

| Item | Files | Fix | Failure-scenario regression |
| --- | --- | --- | --- |
| A | `scripts/build-scaffbench-2-1-data.ts` | Derives scored/pass counts from each raw result's persisted outcome plus raw Core evidence. A scored stepless/no-project failure remains in the denominator. Summary `scoredRuns`/`passCount` mismatches now throw instead of being repaired with `min`. | `A counts a scored stepless failure and rejects aggregate mismatches` covers `{no project/no steps fail, pass, pass}` → `2/3`, plus corrupt aggregate rejection. |
| B | `scripts/splice-scaffbench-2-1.ts` | Null-propagates both quality count and rate when `fullPass` is `null`. | `B preserves null quality through splice normalization`. |
| C | `scripts/scaffbench/specs/*.ts` | Removes the contradictory dependency-install prohibition from every spec body while retaining the CLI scaffold's explicit `--no-install` policy. Self-verification installs remain allowed. | `C snapshots a non-contradictory install policy for every path mode` generates every spec under prompt/MCP/CLI modes, rejects prohibition wording, and snapshots the allowed install lines. |
| D | `scripts/scaffbench/agents/{command,agy,claude,codex,opencode}.ts`, `agents/index.ts`, `types.ts` | Makes idle enforcement an explicit adapter capability: Claude/Codex/opencode/Kilo only; agy disabled. Both stdout and stderr count as activity. JSONL tool-start/completion state suspends idle enforcement while a tool call is in flight; the hard deadline remains active. | `D treats stderr as activity and suspends idle kill during an in-flight tool` also verifies the buffered-adapter capability map and delayed buffered output. |
| E | `scripts/scaffbench/validation/classification.ts`, `scoring.ts` | Requires adjacent HTTP/status/error context for 429/5xx, package-fetch/registry context for HTTP transients, and line-distinct transient evidence when 404/version-not-found is also present. Recurrence now requires `retryCount > 0` plus `transientNetwork: true`; raw signatures remain available to cache exclusion. Provider-infra tokens are word-bounded and error-contextual. | `E rejects adversarial transient/provider false positives and requires retry evidence` covers `531 packages installed`, `0.429.1`, mixed 404+503, real 429, repeated raw lifecycle noise without retry evidence, genuine retry recurrence, capacity prose, and `14293`. |
| F | `scripts/scaffbench/agents/opencode.ts` | Tracks non-empty assistant text and refusal/moderation parts. The unknown/zero-usage/no-tool provider signature now additionally requires no assistant text. | `F keeps an opencode zero-usage refusal with assistant text model-owned`. |
| G | `scripts/scaffbench/validation/index.ts` | Parses bun/npm workspace globs (including object form, braces, exclusions), Cargo `[workspace]` members/excludes, and preferred-solution `.sln`/`.slnx` project membership. Nested manifests not actually covered by a parent are independently validated. A preferred .NET solution is built together with all uncovered `.csproj` files. Unhandled discovered roots emit failing `unvalidated:*` evidence. | `G builds a preferred .NET solution plus an uncovered orphan project` and `G validates broken nested bun and Cargo roots outside parent membership`. |
| H | `scripts/scaffbench/constants.ts`, `validation/index.ts` | Adds the 45-minute total deadline and 12-root cap across multi-root validation. Deadline and overflow paths emit explicit failing `unvalidated:*` steps. | `H caps validation roots and emits a failing step for overflow` and `H enforces a total validation deadline with explicit failure evidence`. |
| I | `scripts/scaffbench/runner.ts`, `types.ts` | New IDs always end in `-rNN`. Resume matching recognizes the legacy unsuffixed ID only as trial 1 without renaming/regenerating it. Summaries persist `{repeats, seed}` as `runProtocol`; conflicting resumes are rejected unless every existing artifact aligns with the current schedule. Round-boundary shuffles avoid same-spec adjacency when another runnable spec exists. | `I always suffixes run IDs and prevents same-spec cross-round adjacency` and `I resumes a legacy trial 1 when repeat count grows and rejects unaligned artifacts`. |
| J | `scripts/scaffbench/{constants,scoring,summary,runner,types}.ts` | Post-hoc estimated cost exhausts budget only above 1.25×. Estimated budget outcomes persist `outcomeEvidence.budgetEstimated: true`; directly reported budget terminal reasons are not mislabeled estimated. | `J tolerates estimated cost through 1.25x and persists estimated evidence above it`. |
| K | `scripts/scaffbench/agents/{claude,codex}.ts` | Claude partial accounting sums per-message usage. Codex uses the final usage snapshot when events are monotonically non-decreasing field-wise supersets; otherwise it sums per-turn deltas. | `K sums partial Claude messages and detects cumulative versus delta Codex usage`. |
| L | `scripts/scaffbench/{runner,scoring,summary,types}.ts` | `--skip-validation` persists `validation.skipped: true` and outcome `skipped`; skipped runs are excluded from scored and quality denominators and remain eligible for later validation. | `L persists skip-validation as skipped and excludes it from denominators`. |
| M | `scripts/scaffbench/validation/index.ts` | Prefers a package `__init__.py`, then loads the selected project source with `importlib.util.spec_from_file_location`, registers that exact module, and executes it from its file path. Configured mypy/pyright still take precedence. | `M imports the project package by file path so an installed-name collision cannot pass` uses a project package named `pip` whose source imports a missing dependency. |
| N | `scripts/scaffbench/specs/*.ts` | Replaces the file-split date with each spec content's first historical commit date. | `N uses content-introduction dates from git history instead of the file-split date`. |
| O | `scripts/scaffbench-hardening-round-2.test.ts` plus the implementation files above | Adds the requested stepless aggregation, prompt, idle, adversarial classification/refusal, workspace/Cargo/.NET, Python end-to-end, cross-round/resume, and Expo-ordering coverage. | `O executes Expo install before export in the actual validation plan` asserts `install` precedes Expo `build/export`; the other O gaps are asserted by their corresponding A, C, D, E, F, G, I, and M regressions above. |

### `introducedAt` provenance

Each command below was run against the deleted monolith's history. The author date of the first `-S` hit supplies the ISO day. PR history corroborates the cohorts: original ScaffBench 2.1 content merged in PR #252 on 2026-06-25, the restraint spec in PR #260 on 2026-06-25, and expansion batches 1–3 in PR #282 on 2026-06-30.

| Spec | Date | First content commit | Command used |
| --- | --- | --- | --- |
| `ai-search-workbench` | 2026-06-25 | `c1596178d` | `git log --all -S 'ai-search-workbench' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |
| `rust-leptos-axum` | 2026-06-25 | `c1596178d` | `git log --all -S 'rust-leptos-axum' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |
| `python-ingestion-api` | 2026-06-25 | `c1596178d` | `git log --all -S 'python-ingestion-api' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |
| `go-realtime-api` | 2026-06-25 | `c1596178d` | `git log --all -S 'go-realtime-api' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |
| `multi-dotnet-ops` | 2026-06-25 | `c1596178d` | `git log --all -S 'multi-dotnet-ops' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |
| `ts-minimal-restraint` | 2026-06-25 | `3b083e2ed` | `git log --all -S 'ts-minimal-restraint' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |
| `ts-svelte-edge-orpc` | 2026-06-30 | `24299a5e2` | `git log --all -S 'ts-svelte-edge-orpc' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |
| `dotnet-blazor-cqrs` | 2026-06-30 | `24299a5e2` | `git log --all -S 'dotnet-blazor-cqrs' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |
| `multi-ts-go-grpc` | 2026-06-30 | `24299a5e2` | `git log --all -S 'multi-ts-go-grpc' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |
| `java-spring-jooq-keycloak` | 2026-06-30 | `877ccbaf9` | `git log --all -S 'java-spring-jooq-keycloak' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |
| `elixir-broadway-absinthe` | 2026-06-30 | `877ccbaf9` | `git log --all -S 'elixir-broadway-absinthe' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |
| `react-native-expo` | 2026-06-30 | `b6ce0efc1` | `git log --all -S 'react-native-expo' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |
| `frontier-polyglot-proto` | 2026-06-30 | `b6ce0efc1` | `git log --all -S 'frontier-polyglot-proto' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |
| `frontier-effect-eventsourcing` | 2026-06-30 | `b6ce0efc1` | `git log --all -S 'frontier-effect-eventsourcing' --reverse --format='%h %aI %s' -- scripts/scaffbench-v2-lib.ts` |

### Round-2 verification

- `bun test scripts/scaffbench-hardening-round-2.test.ts` — **18 passed, 0 failed** (134 assertions).
- `bun test scripts/` — **123 passed, 0 failed** (414 assertions).
- `bunx tsc --noEmit -p scripts/scaffbench/tsconfig.json` — **clean**.
- Install-policy contradiction grep across `scripts/scaffbench/specs` and `prompts.ts` — **no matches**.
- `git diff --check` — **clean**.
