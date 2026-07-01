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
claude-opus-4-8 | low | low | prompt | 52 | 3/13 | 15% | 0 | 23% | 3/13 | 3/13 | 23% (8-50) | 94% | — | — | 100% | 314.0s / 545.9s | 21319 | 1.600 | build-failed:7, lint-failed:2, stack-mismatch:7, typecheck-failed:2, validation-failed:10, install-failed:2

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | low | low | claude-opus-4-8 | prompt | fail | build-failed, lint-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 494.9s | 35195 | 3.085 | 90 | 19/21 | — | — | 0 | 1 | 1 | 1 |  | miss
rust-leptos-axum | 1 | low | low | claude-opus-4-8 | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 258.7s | 14078 | 1.030 | 92 | 11/12 | — | — |  | 101 |  |  |  | miss
python-ingestion-api | 1 | low | low | claude-opus-4-8 | prompt | pass |  | 0 | 272.8s | 18772 | 1.543 | 100 | 13/13 | — | — | 0 |  | 0 |  |  | miss
go-realtime-api | 1 | low | low | claude-opus-4-8 | prompt | pass | stack-mismatch | 0 | 388.4s | 26363 | 1.736 | 92 | 12/13 | — | — | 0 | 0 |  |  |  | miss
multi-dotnet-ops | 1 | low | low | claude-opus-4-8 | prompt | pass | lint-failed, stack-mismatch | 0 | 355.7s | 21178 | 1.645 | 92 | 12/13 | — | — | 0 | 0 |  | 1 |  | miss
ts-svelte-edge-orpc | 1 | low | low | claude-opus-4-8 | prompt | fail | build-failed, validation-failed | 0 | 314.0s | 18532 | 1.452 | 100 | 10/10 | — | — | 0 | 1 |  |  |  | miss
dotnet-blazor-cqrs | 1 | low | low | claude-opus-4-8 | prompt | fail | build-failed, validation-failed | 0 | 259.8s | 17874 | 1.323 | 100 | 13/13 | — | — | 0 | 1 |  |  |  | miss
multi-ts-go-grpc | 1 | low | low | claude-opus-4-8 | prompt | fail | stack-mismatch, validation-failed | 0 | 443.8s | 28724 | 2.032 | 94 | 15/16 | — | — |  |  |  |  |  | miss
java-spring-jooq-keycloak | 1 | low | low | claude-opus-4-8 | prompt | fail | build-failed, install-failed, validation-failed | 0 | 338.9s | 23301 | 1.411 | 100 | 14/14 | — | — | 1 | 1 |  |  |  | miss
elixir-broadway-absinthe | 1 | low | low | claude-opus-4-8 | prompt | fail | build-failed, validation-failed | 0 | 545.9s | 36376 | 3.013 | 100 | 13/13 | — | — | 0 | 1 |  |  |  | miss
react-native-expo | 1 | low | low | claude-opus-4-8 | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 188.6s | 10886 | 0.865 | 88 | 7/8 | — | — | 1 |  |  |  |  | miss
frontier-polyglot-proto | 1 | low | low | claude-opus-4-8 | prompt | fail | stack-mismatch, validation-failed | 0 | 283.1s | 12045 | 0.868 | 75 | 3/4 | — | — |  |  |  |  |  | miss
frontier-effect-eventsourcing | 1 | low | low | claude-opus-4-8 | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 183.5s | 13824 | 0.802 | 100 | 4/4 | — | — | 0 | 1 | 2 |  |  | miss
