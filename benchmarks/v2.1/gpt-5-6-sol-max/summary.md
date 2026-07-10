# ScaffBench 2 Run

Harness: 2.0.0
Agent: Codex (single agent; single model family per row)
Specs: ai-search-workbench, rust-leptos-axum, python-ingestion-api, go-realtime-api, multi-dotnet-ops, ts-svelte-edge-orpc, dotnet-blazor-cqrs, multi-ts-go-grpc, java-spring-jooq-keycloak, elixir-broadway-absinthe, react-native-expo, frontier-polyglot-proto, frontier-effect-eventsourcing
Repeats: 1
Prompt style: explicit

## Path × effort summary

This is an ablation across creation paths and reasoning effort for one agent
(Codex), not a cross-vendor leaderboard. Pass rate is over *scored* runs:
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
gpt-5.6-sol | max | max | prompt | 61 | 5/13 | 38% | 0 | 38% | 5/13 | 5/13 | 38% (18-64) | 93% | — | — | 100% | 1147.8s / 5433.3s | 77753 | 4.718 | build-failed:7, validation-failed:8, stack-mismatch:8, lint-failed:1, typecheck-failed:4, claude-timeout:1, install-failed:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | max | max | gpt-5.6-sol | prompt | fail | build-failed, validation-failed | 0 | 1388.6s | 91295 | 6.135 | 100 | 21/21 | — | — | 0 | 2 |  |  |  | miss
rust-leptos-axum | 1 | max | max | gpt-5.6-sol | prompt | pass | stack-mismatch | 0 | 923.3s | 65725 | 4.274 | 92 | 11/12 | — | — |  | 0 |  |  |  | miss
python-ingestion-api | 1 | max | max | gpt-5.6-sol | prompt | pass |  | 0 | 1181.2s | 92029 | 4.326 | 100 | 13/13 | — | — | 0 |  | 0 |  |  | miss
go-realtime-api | 1 | max | max | gpt-5.6-sol | prompt | pass | stack-mismatch | 0 | 1556.1s | 112603 | 6.192 | 92 | 12/13 | — | — | 0 | 0 |  |  |  | miss
multi-dotnet-ops | 1 | max | max | gpt-5.6-sol | prompt | fail | build-failed, lint-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 1033.0s | 74180 | 3.311 | 92 | 12/13 | — | — | 0 | 1 | 2 | 1 |  | miss
ts-svelte-edge-orpc | 1 | max | max | gpt-5.6-sol | prompt | fail | build-failed, validation-failed | 0 | 1147.8s | 84305 | 5.437 | 100 | 10/10 | — | — | 0 | 1 |  |  |  | miss
dotnet-blazor-cqrs | 1 | max | max | gpt-5.6-sol | prompt | fail | build-failed, claude-timeout, stack-mismatch, validation-failed | 0 | 5433.3s |  |  | 77 | 10/13 | — | — | 0 | 1 |  |  |  | miss
react-native-expo | 1 | max | max | gpt-5.6-sol | prompt | fail | stack-mismatch, typecheck-failed, validation-failed | 0 | 3697.5s | 48250 | 4.198 | 88 | 7/8 | — | — | 0 |  | 2 |  |  | miss
frontier-polyglot-proto | 1 | max | max | gpt-5.6-sol | prompt | fail | build-failed, install-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 1052.9s | 67694 | 4.474 | 75 | 3/4 | — | — |  |  |  |  |  | miss
frontier-effect-eventsourcing | 1 | max | max | gpt-5.6-sol | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 1166.1s | 70407 | 4.956 | 100 | 4/4 | — | — | 0 | 1 | 2 |  |  | miss
multi-ts-go-grpc | 1 | max | max | gpt-5.6-sol | prompt | pass | stack-mismatch | 0 | 1060.0s | 72340 | 3.832 | 94 | 15/16 | — | — | 0 |  |  |  |  | miss
java-spring-jooq-keycloak | 1 | max | max | gpt-5.6-sol | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 1070.6s | 79410 | 4.254 | 93 | 13/14 | — | — |  | 1 |  |  |  | miss
elixir-broadway-absinthe | 1 | max | max | gpt-5.6-sol | prompt | pass |  | 0 | 1122.7s | 74802 | 5.223 | 100 | 13/13 | — | — | 0 | 0 |  |  |  | miss
