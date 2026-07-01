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
gpt-5.3-codex-spark | high | high | prompt | 42 | 1/13 | 8% | 0 | 8% | 1/13 | 1/13 | 8% (1-33) | 90% | — | — | 100% | 97.0s / 329.6s | 61252 |  | install-failed:6, stack-mismatch:9, validation-failed:12, build-failed:5, typecheck-failed:2

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | high | high | gpt-5.3-codex-spark | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 156.2s | 81406 |  | 86 | 18/21 | — | — | 1 |  |  |  |  | miss
rust-leptos-axum | 1 | high | high | gpt-5.3-codex-spark | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 329.6s | 59272 |  | 92 | 11/12 | — | — |  | 101 |  |  |  | miss
python-ingestion-api | 1 | high | high | gpt-5.3-codex-spark | prompt | pass | stack-mismatch | 0 | 47.0s | 44961 |  | 92 | 12/13 | — | — | 0 |  | 0 |  |  | miss
go-realtime-api | 1 | high | high | gpt-5.3-codex-spark | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 97.0s | 79836 |  | 85 | 11/13 | — | — | 1 |  |  |  |  | miss
multi-dotnet-ops | 1 | high | high | gpt-5.3-codex-spark | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 174.2s | 50455 |  | 85 | 11/13 | — | — | 0 | 1 |  |  |  | miss
ts-svelte-edge-orpc | 1 | high | high | gpt-5.3-codex-spark | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 124.7s | 65703 |  | 100 | 10/10 | — | — | 0 | 126 | 1 |  |  | miss
dotnet-blazor-cqrs | 1 | high | high | gpt-5.3-codex-spark | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 69.7s | 53909 |  | 92 | 12/13 | — | — | 1 |  |  |  |  | miss
multi-ts-go-grpc | 1 | high | high | gpt-5.3-codex-spark | prompt | fail | stack-mismatch, validation-failed | 0 | 162.8s | 89949 |  | 94 | 15/16 | — | — |  |  |  |  |  | miss
java-spring-jooq-keycloak | 1 | high | high | gpt-5.3-codex-spark | prompt | fail | build-failed, install-failed, validation-failed | 0 | 39.9s | 45340 |  | 100 | 14/14 | — | — | 1 | 1 |  |  |  | miss
elixir-broadway-absinthe | 1 | high | high | gpt-5.3-codex-spark | prompt | fail | install-failed, validation-failed | 0 | 178.0s | 74131 |  | 100 | 13/13 | — | — | 1 |  |  |  |  | miss
react-native-expo | 1 | high | high | gpt-5.3-codex-spark | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 38.4s | 35901 |  | 75 | 6/8 | — | — | 1 |  |  |  |  | miss
frontier-polyglot-proto | 1 | high | high | gpt-5.3-codex-spark | prompt | fail | stack-mismatch, validation-failed | 0 | 55.2s | 47729 |  | 75 | 3/4 | — | — |  |  |  |  |  | miss
frontier-effect-eventsourcing | 1 | high | high | gpt-5.3-codex-spark | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 63.4s | 67683 |  | 100 | 4/4 | — | — | 0 | 1 | 2 |  |  | miss
