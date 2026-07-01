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
claude-opus-4-8 | max | max | prompt | 53 | 3/13 | 23% | 0 | 23% | 3/13 | 3/13 | 23% (8-50) | 96% | — | — | 100% | 1901.2s / 3600.3s | 142059 | 8.493 | build-failed:4, lint-failed:2, typecheck-failed:4, validation-failed:10, stack-mismatch:5, install-failed:3, claude-error:1, claude-timeout:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | max | max | claude-opus-4-8 | prompt | fail | build-failed, lint-failed, typecheck-failed, validation-failed | 0 | 2193.9s | 179187 | 13.191 | 100 | 21/21 | — | — | 0 | 2 | 2 | 1 |  | miss
rust-leptos-axum | 1 | max | max | claude-opus-4-8 | prompt | pass | stack-mismatch | 0 | 1401.2s | 112604 | 6.455 | 92 | 11/12 | — | — |  | 0 |  |  |  | miss
python-ingestion-api | 1 | max | max | claude-opus-4-8 | prompt | pass |  | 0 | 2076.9s | 5821 | 0.368 | 100 | 13/13 | — | — | 0 |  | 0 |  |  | miss
go-realtime-api | 1 | max | max | claude-opus-4-8 | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 1443.9s | 124821 | 6.964 | 92 | 12/13 | — | — | 1 |  |  |  |  | miss
multi-dotnet-ops | 1 | max | max | claude-opus-4-8 | prompt | fail | lint-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 2503.9s | 188239 | 14.846 | 92 | 12/13 | — | — | 0 | 0 | 2 | 1 |  | miss
ts-svelte-edge-orpc | 1 | max | max | claude-opus-4-8 | prompt | fail | build-failed, claude-error, claude-timeout, typecheck-failed, validation-failed | 143 | 3600.3s |  |  | 100 | 10/10 | — | — | 0 | 1 | 1 |  |  | miss
dotnet-blazor-cqrs | 1 | max | max | claude-opus-4-8 | prompt | fail | install-failed, validation-failed | 0 | 1859.4s | 156780 | 9.925 | 100 | 13/13 | — | — | 155 |  |  |  |  | miss
multi-ts-go-grpc | 1 | max | max | claude-opus-4-8 | prompt | fail | stack-mismatch, validation-failed | 0 | 1901.2s | 165059 | 7.485 | 88 | 14/16 | — | — |  |  |  |  |  | miss
java-spring-jooq-keycloak | 1 | max | max | claude-opus-4-8 | prompt | pass |  | 0 | 2572.5s | 215400 | 10.913 | 100 | 14/14 | — | — | 0 | 0 |  |  |  | miss
elixir-broadway-absinthe | 1 | max | max | claude-opus-4-8 | prompt | fail | build-failed, validation-failed | 0 | 3390.3s | 262128 | 18.762 | 100 | 13/13 | — | — | 0 | 1 |  |  |  | miss
react-native-expo | 1 | max | max | claude-opus-4-8 | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 1156.9s | 88165 | 4.966 | 88 | 7/8 | — | — | 1 |  |  |  |  | miss
frontier-polyglot-proto | 1 | max | max | claude-opus-4-8 | prompt | fail | validation-failed | 0 | 680.5s | 59707 | 2.287 | 100 | 4/4 | — | — |  |  |  |  |  | miss
frontier-effect-eventsourcing | 1 | max | max | claude-opus-4-8 | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 1851.4s | 146791 | 5.759 | 100 | 4/4 | — | — | 0 | 2 | 2 |  |  | miss
