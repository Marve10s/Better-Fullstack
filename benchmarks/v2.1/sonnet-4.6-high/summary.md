# ScaffBench 2 Run

Harness: 2.0.0
Agent: Claude Code (single agent; single model family per row)
Specs: ai-search-workbench, rust-leptos-axum, python-ingestion-api, go-realtime-api, multi-dotnet-ops, ts-svelte-edge-orpc, dotnet-blazor-cqrs, multi-ts-go-grpc, java-spring-jooq-keycloak, elixir-broadway-absinthe, react-native-expo, frontier-polyglot-proto, frontier-effect-eventsourcing
Repeats: 1
Prompt style: explicit

## Path × effort summary

This is an ablation across creation paths and reasoning effort for one agent
(Claude Code), not a cross-vendor leaderboard. Pass rate is over *scored* runs:
infra-inconclusive runs (missing toolchain, validation timeout, exhausted token
budget, or a crash with no output) are excluded from the denominator.

"Pass@1" is the CORE pass rate — install + build + typecheck + native compile,
i.e. does the project actually build and run. "Quality" is the stricter advisory
tier (core + lint/format/test/doctor/route): a project can be Pass@1-green but
Quality-red because it is mis-formatted or a style-lint warns. Formatting is a
quality metric, never a brokenness verdict, so it does not move Pass@1. "Wired
libs" is scored from the generated artifact (deps + imports + files);
"Faithful" is the assisted-path bts.jsonc-vs-requested diagnostic.

Reliability is reported per spec, not pooled: "Macro" is the mean of per-spec
pass rates; "pass@k" counts specs solved on at least one repeat and "pass^k"
specs solved on every repeat. The Wilson "CI95" is shown only when a cell has
≥ 8 scored runs (below that it reads `n<8`, since e.g. 3/3 and 0/3
intervals overlap and the interval is not informative).

"Index" is the single rankable 0-100 composite the table is sorted by:
60% macro validation + 25% wired-libs + 15% command discipline,
weighted toward the least saturated signal. Latency is median / p95 (wall-clock
moves with provider load, so the mean alone is misleading over small samples).

| Model | Effort | Effective reasoning | Path | Index | Pass@1 | Quality | Inconclusive | Macro | pass@k | pass^k | CI95 | Wired libs | Faithful | Acceptance | Command discipline | Median / p95 | Avg output tokens | Avg cost | Failure tags |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
claude-sonnet-4-6 | high | high | prompt | 41 | 1/12 | 8% | 1/13 | 8% | 1/13 | 1/13 | 8% (1-35) | 86% | — | — | 100% | 662.0s / 6109.4s | 40768 | 1.571 | build-failed:7, lint-failed:2, stack-mismatch:9, typecheck-failed:5, validation-failed:12, install-failed:3, claude-error:1, claude-timeout:1, project-not-found:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | high | high | claude-sonnet-4-6 | prompt | fail | build-failed, lint-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 879.1s | 61484 | 3.080 | 95 | 20/21 | — | — | 0 | 1 | 2 | 1 |  | miss
rust-leptos-axum | 1 | high | high | claude-sonnet-4-6 | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 402.5s | 26168 | 1.209 | 92 | 11/12 | — | — |  | 101 |  |  |  | miss
python-ingestion-api | 1 | high | high | claude-sonnet-4-6 | prompt | pass |  | 0 | 266.0s | 18624 | 0.766 | 100 | 13/13 | — | — | 0 |  | 0 |  |  | miss
go-realtime-api | 1 | high | high | claude-sonnet-4-6 | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 503.6s | 39238 | 1.313 | 92 | 12/13 | — | — | 0 | 1 |  |  |  | miss
multi-dotnet-ops | 1 | high | high | claude-sonnet-4-6 | prompt | fail | build-failed, lint-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 666.3s | 56785 | 2.249 | 92 | 12/13 | — | — | 0 | 1 | 2 | 1 |  | miss
ts-svelte-edge-orpc | 1 | high | high | claude-sonnet-4-6 | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 544.6s | 39404 | 1.507 | 100 | 10/10 | — | — | 0 | 1 | 2 |  |  | miss
dotnet-blazor-cqrs | 1 | high | high | claude-sonnet-4-6 | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 662.0s | 53126 | 2.135 | 92 | 12/13 | — | — | 1 |  |  |  |  | miss
multi-ts-go-grpc | 1 | high | high | claude-sonnet-4-6 | prompt | fail | stack-mismatch, validation-failed | 0 | 872.0s | 70758 | 2.017 | 88 | 14/16 | — | — |  |  |  |  |  | miss
java-spring-jooq-keycloak | 1 | high | high | claude-sonnet-4-6 | prompt | fail | build-failed, install-failed, validation-failed | 0 | 748.1s | 59561 | 1.635 | 100 | 14/14 | — | — | 1 | 1 |  |  |  | miss
elixir-broadway-absinthe | 1 | high | high | claude-sonnet-4-6 | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 534.7s | 34454 | 1.661 | 92 | 12/13 | — | — | 1 |  |  |  |  | miss
react-native-expo | 1 | high | high | claude-sonnet-4-6 | prompt | fail | stack-mismatch, typecheck-failed, validation-failed | 0 | 311.3s | 21182 | 0.867 | 75 | 6/8 | — | — | 0 |  | 1 |  |  | miss
frontier-polyglot-proto | 1 | high | high | claude-sonnet-4-6 | prompt | inconclusive | claude-error, claude-timeout, project-not-found, stack-mismatch, validation-failed | 143 | 6109.4s |  |  | 0 | 0/4 | — | — |  |  |  |  |  | 
frontier-effect-eventsourcing | 1 | high | high | claude-sonnet-4-6 | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 2002.9s | 8436 | 0.417 | 100 | 4/4 | — | — | 0 | 2 | 2 |  |  | miss
