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
opencode/mimo-v2.5-free | default |  | prompt | 36 | 0/13 | 0% | 0 | 0% | 0/13 | 0/13 | 0% (0-23) | 82% | — | — | 100% | 193.8s / 467.9s | 17822 | 0.000 | install-failed:5, stack-mismatch:10, validation-failed:12, build-failed:5, lint-failed:1, validation-deferred:1, project-not-found:1, typecheck-failed:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | default |  | opencode/mimo-v2.5-free | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 334.0s | 30950 | 0.000 | 81 | 17/21 | — | — | 1 |  |  |  |  | miss
rust-leptos-axum | 1 | default |  | opencode/mimo-v2.5-free | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 193.8s | 13207 | 0.000 | 92 | 11/12 | — | — |  | 101 |  |  |  | miss
python-ingestion-api | 1 | default |  | opencode/mimo-v2.5-free | prompt | fail | install-failed, validation-failed | 0 | 187.9s | 11681 | 0.000 | 100 | 13/13 | — | — | 2 |  |  |  |  | miss
go-realtime-api | 1 | default |  | opencode/mimo-v2.5-free | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 134.2s | 11591 | 0.000 | 92 | 12/13 | — | — | 0 | 1 |  |  |  | miss
multi-dotnet-ops | 1 | default |  | opencode/mimo-v2.5-free | prompt | fail | build-failed, install-failed, lint-failed, stack-mismatch, validation-failed | 0 | 256.7s | 16262 | 0.000 | 92 | 12/13 | — | — | 1 | 1 |  | 1 |  | miss
ts-svelte-edge-orpc | 1 | default |  | opencode/mimo-v2.5-free | prompt | fail | validation-deferred | 0 | 136.6s | 10426 | 0.000 | 100 | 10/10 | — | — |  |  |  |  |  | miss
dotnet-blazor-cqrs | 1 | default |  | opencode/mimo-v2.5-free | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 307.8s | 31509 | 0.000 | 92 | 12/13 | — | — | 0 | 1 |  |  |  | miss
multi-ts-go-grpc | 1 | default |  | opencode/mimo-v2.5-free | prompt | fail | stack-mismatch, validation-failed | 0 | 167.0s | 15420 | 0.000 | 75 | 12/16 | — | — |  |  |  |  |  | miss
java-spring-jooq-keycloak | 1 | default |  | opencode/mimo-v2.5-free | prompt | fail | project-not-found, stack-mismatch, validation-failed | 0 | 243.7s | 22129 | 0.000 | 0 | 0/14 | — | — |  |  |  |  |  | 
elixir-broadway-absinthe | 1 | default |  | opencode/mimo-v2.5-free | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 467.9s | 35028 | 0.000 | 92 | 12/13 | — | — | 1 |  |  |  |  | miss
react-native-expo | 1 | default |  | opencode/mimo-v2.5-free | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 222.1s | 15624 | 0.000 | 75 | 6/8 | — | — | 1 |  |  |  |  | miss
frontier-polyglot-proto | 1 | default |  | opencode/mimo-v2.5-free | prompt | fail | stack-mismatch, validation-failed | 0 | 113.7s | 8887 | 0.000 | 75 | 3/4 | — | — |  |  |  |  |  | miss
frontier-effect-eventsourcing | 1 | default |  | opencode/mimo-v2.5-free | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 100.3s | 8973 | 0.000 | 100 | 4/4 | — | — | 0 | 2 | 2 |  |  | miss
