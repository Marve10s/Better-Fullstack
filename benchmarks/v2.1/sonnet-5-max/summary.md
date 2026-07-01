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
claude-sonnet-5 | max | max | prompt | 46 | 2/11 | 18% | 2/13 | 18% | 2/13 | 2/13 | 18% (5-48) | 81% | — | — | 100% | 2074.9s / 3887.9s | 126811 | 5.880 | build-failed:6, lint-failed:2, typecheck-failed:2, validation-failed:11, stack-mismatch:7, install-failed:2, claude-error:3, claude-timeout:3, project-not-found:2

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | max | max | claude-sonnet-5 | prompt | fail | build-failed, lint-failed, typecheck-failed, validation-failed | 0 | 1768.0s | 188079 | 5.996 | 100 | 21/21 | — | — | 0 | 2 | 2 | 1 |  | miss
rust-leptos-axum | 1 | max | max | claude-sonnet-5 | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 3113.7s | 217208 | 11.992 | 92 | 11/12 | — | — |  | 101 |  |  |  | miss
python-ingestion-api | 1 | max | max | claude-sonnet-5 | prompt | pass |  | 0 | 1858.5s | 5502 | 0.939 | 100 | 13/13 | — | — | 0 |  | 0 |  |  | miss
go-realtime-api | 1 | max | max | claude-sonnet-5 | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 1541.1s | 179707 | 7.356 | 92 | 12/13 | — | — | 1 |  |  |  |  | hit
multi-dotnet-ops | 1 | max | max | claude-sonnet-5 | prompt | fail | build-failed, lint-failed, stack-mismatch, validation-failed | 0 | 2074.9s | 182012 | 7.967 | 92 | 12/13 | — | — | 0 | 1 | 0 | 1 |  | miss
ts-svelte-edge-orpc | 1 | max | max | claude-sonnet-5 | prompt | fail | build-failed, validation-failed | 0 | 952.6s | 92636 | 3.487 | 100 | 10/10 | — | — | 0 | 1 |  |  |  | miss
dotnet-blazor-cqrs | 1 | max | max | claude-sonnet-5 | prompt | fail | build-failed, validation-failed | 0 | 2055.3s | 14886 | 1.372 | 100 | 13/13 | — | — | 0 | 1 |  |  |  | hit
multi-ts-go-grpc | 1 | max | max | claude-sonnet-5 | prompt | fail | stack-mismatch, validation-failed | 0 | 2414.1s | 248104 | 11.462 | 88 | 14/16 | — | — |  |  |  |  |  | hit
java-spring-jooq-keycloak | 1 | max | max | claude-sonnet-5 | prompt | fail | build-failed, install-failed, validation-failed | 0 | 2940.8s | 11414 | 0.836 | 100 | 14/14 | — | — | 1 | 1 |  |  |  | miss
elixir-broadway-absinthe | 1 | max | max | claude-sonnet-5 | prompt | pass |  | 0 | 1294.4s | 128562 | 7.387 | 100 | 13/13 | — | — | 0 | 0 |  |  |  | miss
react-native-expo | 1 | max | max | claude-sonnet-5 | prompt | fail | claude-error, claude-timeout, stack-mismatch, typecheck-failed, validation-failed | 143 | 3690.6s |  |  | 88 | 7/8 | — | — | 0 |  | 2 | 0 |  | miss
frontier-polyglot-proto | 1 | max | max | claude-sonnet-5 | prompt | inconclusive | claude-error, claude-timeout, project-not-found, stack-mismatch, validation-failed | 143 | 3887.9s |  |  | 0 | 0/4 | — | — |  |  |  |  |  | 
frontier-effect-eventsourcing | 1 | max | max | claude-sonnet-5 | prompt | inconclusive | claude-error, claude-timeout, project-not-found, stack-mismatch, validation-failed | 143 | 3755.2s |  |  | 0 | 0/4 | — | — |  |  |  |  |  | 
