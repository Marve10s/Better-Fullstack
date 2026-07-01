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
kilo/nvidia/nemotron-3-ultra-550b-a55b:free | default |  | prompt | 20 | 0/7 | 0% | 0 | 0% | 0/7 | 0/7 | n<8 | 19% | — | — | 100% | 209.2s / 943.7s | 3891 | 0.000 | build-failed:2, lint-failed:2, stack-mismatch:7, typecheck-failed:1, validation-failed:7, install-failed:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | default |  | kilo/nvidia/nemotron-3-ultra-550b-a55b:free | prompt | fail | build-failed, lint-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 943.7s | 16315 | 0.000 | 33 | 7/21 | — | — | 0 | 1 | 1 | 1 |  | miss
python-ingestion-api | 1 | default |  | kilo/nvidia/nemotron-3-ultra-550b-a55b:free | prompt | fail | stack-mismatch, validation-failed | 0 | 167.5s | 370 | 0.000 | 8 | 1/13 | — | — |  |  |  |  |  | miss
go-realtime-api | 1 | default |  | kilo/nvidia/nemotron-3-ultra-550b-a55b:free | prompt | fail | stack-mismatch, validation-failed | 0 | 209.2s | 197 | 0.000 | 8 | 1/13 | — | — |  |  |  |  |  | miss
multi-dotnet-ops | 1 | default |  | kilo/nvidia/nemotron-3-ultra-550b-a55b:free | prompt | fail | build-failed, lint-failed, stack-mismatch, validation-failed | 0 | 165.1s | 2655 | 0.000 | 15 | 2/13 | — | — | 0 | 1 |  | 1 |  | miss
dotnet-blazor-cqrs | 1 | default |  | kilo/nvidia/nemotron-3-ultra-550b-a55b:free | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 485.0s | 6143 | 0.000 | 54 | 7/13 | — | — | 1 |  |  |  |  | miss
java-spring-jooq-keycloak | 1 | default |  | kilo/nvidia/nemotron-3-ultra-550b-a55b:free | prompt | fail | stack-mismatch, validation-failed | 0 | 185.5s | 311 | 0.000 | 7 | 1/14 | — | — |  |  |  |  |  | miss
elixir-broadway-absinthe | 1 | default |  | kilo/nvidia/nemotron-3-ultra-550b-a55b:free | prompt | fail | stack-mismatch, validation-failed | 0 | 316.3s | 1246 | 0.000 | 8 | 1/13 | — | — |  |  |  |  |  | miss
