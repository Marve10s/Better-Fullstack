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
kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | default |  | prompt | 17 | 0/12 | 0% | 0 | 0% | 0/12 | 0/12 | 0% (0-24) | 7% | — | — | 100% | 92.5s / 321.1s | 12565 | 0.000 | project-not-found:8, stack-mismatch:12, validation-failed:12, install-failed:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
rust-leptos-axum | 1 | default |  | kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | prompt | fail | project-not-found, stack-mismatch, validation-failed | 0 | 79.1s | 6920 | 0.000 | 0 | 0/12 | — | — |  |  |  |  |  | 
python-ingestion-api | 1 | default |  | kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | prompt | fail | project-not-found, stack-mismatch, validation-failed | 0 | 134.9s | 12679 | 0.000 | 0 | 0/13 | — | — |  |  |  |  |  | 
go-realtime-api | 1 | default |  | kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | prompt | fail | project-not-found, stack-mismatch, validation-failed | 0 | 183.5s | 15920 | 0.000 | 0 | 0/13 | — | — |  |  |  |  |  | 
multi-dotnet-ops | 1 | default |  | kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | prompt | fail | project-not-found, stack-mismatch, validation-failed | 0 | 321.1s | 34444 | 0.000 | 0 | 0/13 | — | — |  |  |  |  |  | 
ts-svelte-edge-orpc | 1 | default |  | kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 186.8s | 13660 | 0.000 | 80 | 8/10 | — | — | 1 |  |  |  |  | miss
dotnet-blazor-cqrs | 1 | default |  | kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | prompt | fail | project-not-found, stack-mismatch, validation-failed | 0 | 69.6s | 0 | 0.000 | 0 | 0/13 | — | — |  |  |  |  |  | 
multi-ts-go-grpc | 1 | default |  | kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | prompt | fail | project-not-found, stack-mismatch, validation-failed | 0 | 19.9s | 1462 | 0.000 | 0 | 0/16 | — | — |  |  |  |  |  | 
java-spring-jooq-keycloak | 1 | default |  | kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | prompt | fail | project-not-found, stack-mismatch, validation-failed | 0 | 181.6s | 14099 | 0.000 | 0 | 0/14 | — | — |  |  |  |  |  | 
elixir-broadway-absinthe | 1 | default |  | kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | prompt | fail | stack-mismatch, validation-failed | 0 | 92.5s | 13386 | 0.000 | 8 | 1/13 | — | — |  |  |  |  |  | miss
react-native-expo | 1 | default |  | kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | prompt | fail | stack-mismatch, validation-failed | 0 | 53.8s | 5261 | 0.000 | 0 | 0/8 | — | — |  |  |  |  |  | miss
frontier-polyglot-proto | 1 | default |  | kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | prompt | fail | project-not-found, stack-mismatch, validation-failed | 0 | 194.1s | 32000 | 0.000 | 0 | 0/4 | — | — |  |  |  |  |  | 
frontier-effect-eventsourcing | 1 | default |  | kilo/nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free | prompt | fail | stack-mismatch, validation-failed | 0 | 12.1s | 946 | 0.000 | 0 | 0/4 | — | — |  |  |  |  |  | miss
