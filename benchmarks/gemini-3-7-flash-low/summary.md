# ScaffBench 3.0 Run

Harness: 3.1.0
Agent: Antigravity (single agent; single model family per row)
Specs: ai-search-workbench, rust-leptos-axum, python-ingestion-api, go-realtime-api, multi-dotnet-ops, ts-svelte-edge-orpc, dotnet-blazor-cqrs, multi-ts-go-grpc, java-spring-jooq-keycloak, elixir-broadway-absinthe, react-native-expo, frontier-polyglot-proto, frontier-effect-eventsourcing
Repeats: 1
Prompt style: explicit

## Path × effort summary

This is an ablation across creation paths and reasoning effort for one agent
(Antigravity), not a cross-vendor leaderboard. Pass rate is over *scored* runs.
Provider, harness, and validation infrastructure outcomes are inconclusive and
excluded; budget and generation-deadline exhaustion remain scored failures.

"Pass@1" is the CORE pass rate, install + build + typecheck + native compile,
i.e. does the project actually build and run. "Quality" is the stricter advisory
tier (core + lint/format; tests, doctor and route run and are reported but
affect no score): a project can be Pass@1-green but Quality-red because it is
mis-formatted or a style-lint warns. Formatting is a quality metric, never a
brokenness verdict, so it does not move Pass@1. "Wired
libs" is scored from the generated artifact (deps + imports + files);
"Faithful" is the assisted-path bts.jsonc-vs-requested diagnostic.

Reliability is reported per spec, not pooled: "Macro" is the mean of per-spec
pass rates; "pass@k" counts specs solved on at least one repeat and "pass^k"
specs solved on every repeat. The Wilson "CI95" is shown only when a cell has
≥ 8 scored runs (below that it reads `n<8`, since e.g. 3/3 and 0/3
intervals overlap and the interval is not informative).

"Index" is the single rankable 0-100 composite the table is sorted by. Each
spec earns a graded score: 60% for a Core pass, 20% for the share of lint and
format gates green (tests are not scored), and 20% for the stack score (wired libs,
traps, restraint). The index is the difficulty-weighted mean of those per-spec
scores (spec difficulty 1, 2, or 3 is pinned in the spec file), times 100.
Latency is median / p95 (wall-clock
moves with provider load, so the mean alone is misleading over small samples).

| Model | Effort | Effective reasoning | Path | Index | Pass@1 | Quality | Inconclusive | Macro | pass@k | pass^k | CI95 | Wired libs | Faithful | Acceptance | Command discipline | Median / p95 | Avg output tokens | Avg cost | Publication | Failure tags |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- |
gemini-3.7-flash | low | low | prompt | 63 | 8/13 | 3/13 | 0 | 62% | 8/13 | 8/13 | 62% (36-82) | 98% | – | – | 100% | 233.2s / 558.9s |  |  | ranked | test-failed:11, build-failed:5, format-failed:10, install-failed:3, lint-failed:9, typecheck-failed:3, validation-failed:5, stack-mismatch:3

## Introduction cohorts

| Introduced | Specs | Pass@1 | Pass rate |
| --- | ---: | ---: | ---: |
| 2026-08-21 | 13 | 8/13 | 62% |

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
elixir-broadway-absinthe | 1 | low | low | gemini-3.7-flash | prompt | pass | test-failed | 0 | 558.9s |  |  | 100 | 20/20 | – | – | 0 | 0 |  |  | 1 | miss
python-ingestion-api | 1 | low | low | gemini-3.7-flash | prompt | model-failure | build-failed, format-failed, install-failed, lint-failed, test-failed, typecheck-failed, validation-failed | 0 | 76.1s |  |  | 100 | 16/16 | – | – | 1 |  |  |  |  | miss
frontier-effect-eventsourcing | 1 | low | low | gemini-3.7-flash | prompt | pass | format-failed, lint-failed, test-failed | 0 | 140.0s |  |  | 100 | 14/14 | – | – | 0 | 0 | 0 |  |  | miss
react-native-expo | 1 | low | low | gemini-3.7-flash | prompt | model-failure | build-failed, format-failed, lint-failed, test-failed, typecheck-failed, validation-failed | 0 | 258.8s |  |  | 100 | 13/13 | – | – | 0 | 1 |  |  |  | miss
go-realtime-api | 1 | low | low | gemini-3.7-flash | prompt | pass | format-failed, test-failed | 0 | 136.0s |  |  | 100 | 16/16 | – | – | 0 | 0 |  | 0 |  | miss
java-spring-jooq-keycloak | 1 | low | low | gemini-3.7-flash | prompt | pass |  | 0 | 207.1s |  |  | 100 | 28/28 | – | – |  | 0 |  |  | 0 | miss
rust-leptos-axum | 1 | low | low | gemini-3.7-flash | prompt | pass | format-failed, lint-failed, test-failed | 0 | 452.9s |  |  | 100 | 24/24 | – | – |  | 0 |  |  |  | miss
multi-ts-go-grpc | 1 | low | low | gemini-3.7-flash | prompt | model-failure | build-failed, format-failed, install-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 233.4s |  |  | 91 | 20/22 | – | – | 1 |  |  |  |  | miss
ai-search-workbench | 1 | low | low | gemini-3.7-flash | prompt | model-failure | build-failed, format-failed, install-failed, lint-failed, stack-mismatch, test-failed, typecheck-failed, validation-failed | 0 | 90.7s |  |  | 85 | 23/27 | – | – | 1 |  |  |  |  | miss
frontier-polyglot-proto | 1 | low | low | gemini-3.7-flash | prompt | pass | format-failed, lint-failed, test-failed | 0 | 233.2s |  |  | 100 | 10/10 | – | – | 0 | 0 | 0 |  |  | miss
multi-dotnet-ops | 1 | low | low | gemini-3.7-flash | prompt | pass | format-failed, lint-failed, stack-mismatch, test-failed | 0 | 222.7s |  |  | 94 | 17/18 | – | – | 0 | 0 | 0 | 1 | 1 | miss
ts-svelte-edge-orpc | 1 | low | low | gemini-3.7-flash | prompt | model-failure | build-failed, format-failed, lint-failed, test-failed, validation-failed | 0 | 526.4s |  |  | 100 | 13/13 | – | – | 0 | 1 |  |  |  | miss
dotnet-blazor-cqrs | 1 | low | low | gemini-3.7-flash | prompt | pass |  | 0 | 291.2s |  |  | 100 | 24/24 | – | – | 0 | 0 |  |  | 0 | miss
