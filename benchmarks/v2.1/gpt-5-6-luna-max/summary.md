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
gpt-5.6-luna | max | max | prompt | 61 | 5/13 | 38% | 0 | 38% | 5/13 | 5/13 | 38% (18-64) | 94% | — | — | 100% | 898.9s / 5867.9s | 67589 | 0.828 | build-failed:6, lint-failed:2, stack-mismatch:8, typecheck-failed:4, validation-failed:8, install-failed:2, claude-timeout:1, claude-error:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | max | max | gpt-5.6-luna | prompt | fail | build-failed, lint-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 1018.5s | 69542 | 1.041 | 95 | 20/21 | — | — | 0 | 2 | 1 | 1 |  | miss
rust-leptos-axum | 1 | max | max | gpt-5.6-luna | prompt | pass | stack-mismatch | 0 | 764.5s | 54674 | 0.700 | 92 | 11/12 | — | — |  | 0 |  |  |  | miss
python-ingestion-api | 1 | max | max | gpt-5.6-luna | prompt | pass | stack-mismatch | 0 | 626.9s | 48360 | 0.521 | 92 | 12/13 | — | — | 0 |  | 0 |  |  | miss
go-realtime-api | 1 | max | max | gpt-5.6-luna | prompt | pass | stack-mismatch | 0 | 898.9s | 74286 | 0.680 | 92 | 12/13 | — | — | 0 | 0 |  |  |  | miss
multi-dotnet-ops | 1 | max | max | gpt-5.6-luna | prompt | fail | build-failed, lint-failed, stack-mismatch, validation-failed | 0 | 848.1s | 67550 | 0.637 | 92 | 12/13 | — | — | 0 | 1 |  | 1 |  | miss
ts-svelte-edge-orpc | 1 | max | max | gpt-5.6-luna | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 1331.2s | 109275 | 1.722 | 100 | 10/10 | — | — | 0 | 126 | 2 |  |  | miss
dotnet-blazor-cqrs | 1 | max | max | gpt-5.6-luna | prompt | fail | install-failed, validation-failed | 0 | 888.4s | 73517 | 0.711 | 100 | 13/13 | — | — | 1 |  |  |  |  | miss
multi-ts-go-grpc | 1 | max | max | gpt-5.6-luna | prompt | fail | build-failed, claude-timeout, stack-mismatch, typecheck-failed, validation-failed | 0 | 5867.9s |  |  | 94 | 15/16 | — | — | 0 |  | 1 |  |  | miss
frontier-polyglot-proto | 1 | max | max | gpt-5.6-luna | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 4267.1s | 58550 | 0.491 | 75 | 3/4 | — | — |  |  |  |  |  | miss
frontier-effect-eventsourcing | 1 | max | max | gpt-5.6-luna | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 958.1s | 74627 | 1.350 | 100 | 4/4 | — | — | 0 | 1 | 2 |  |  | miss
java-spring-jooq-keycloak | 1 | max | max | gpt-5.6-luna | prompt | pass |  | 0 | 644.8s | 53356 | 0.467 | 100 | 14/14 | — | — |  | 0 |  |  |  | miss
elixir-broadway-absinthe | 1 | max | max | gpt-5.6-luna | prompt | fail | build-failed, claude-error, validation-failed | 1 | 913.8s |  |  | 100 | 13/13 | — | — | 0 | 1 |  |  |  | miss
react-native-expo | 1 | max | max | gpt-5.6-luna | prompt | pass | stack-mismatch | 0 | 707.0s | 59747 | 0.788 | 88 | 7/8 | — | — | 0 |  | 0 |  |  | miss
