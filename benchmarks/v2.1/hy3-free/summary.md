# ScaffBench 2 Run

Harness: 2.0.0
Agent: opencode (single agent; single model family per row)
Specs: ai-search-workbench, rust-leptos-axum, python-ingestion-api, go-realtime-api, multi-dotnet-ops, ts-svelte-edge-orpc, dotnet-blazor-cqrs, multi-ts-go-grpc, java-spring-jooq-keycloak, elixir-broadway-absinthe, react-native-expo, frontier-polyglot-proto, frontier-effect-eventsourcing
Repeats: 1
Prompt style: explicit

## Path × effort summary

This is an ablation across creation paths and reasoning effort for one agent
(opencode), not a cross-vendor leaderboard. Pass rate is over *scored* runs:
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
opencode/hy3-free | default |  | prompt | 43 | 1/10 | 10% | 1/11 | 10% | 1/11 | 1/11 | 10% (2-40) | 86% | — | — | 100% | 526.9s / 4368.7s | 22950 | 0.000 | install-failed:4, stack-mismatch:7, validation-failed:10, build-failed:6, typecheck-failed:1, lint-failed:1, claude-error:2, project-not-found:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | default |  | opencode/hy3-free | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 603.9s | 34832 | 0.000 | 95 | 20/21 | — | — | 1 |  |  |  |  | miss
rust-leptos-axum | 1 | default |  | opencode/hy3-free | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 615.1s | 29782 | 0.000 | 92 | 11/12 | — | — |  | 101 |  |  |  | miss
python-ingestion-api | 1 | default |  | opencode/hy3-free | prompt | pass |  | 0 | 192.0s | 12325 | 0.000 | 100 | 13/13 | — | — | 0 |  | 0 |  |  | miss
go-realtime-api | 1 | default |  | opencode/hy3-free | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 526.9s | 24264 | 0.000 | 92 | 12/13 | — | — | 1 |  |  |  |  | miss
multi-dotnet-ops | 1 | default |  | opencode/hy3-free | prompt | fail | build-failed, install-failed, stack-mismatch, validation-failed | 0 | 305.1s | 16345 | 0.000 | 92 | 12/13 | — | — | 1 | 1 |  |  |  | miss
ts-svelte-edge-orpc | 1 | default |  | opencode/hy3-free | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 434.3s | 24892 | 0.000 | 100 | 10/10 | — | — | 0 | 1 | 2 |  |  | miss
dotnet-blazor-cqrs | 1 | default |  | opencode/hy3-free | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 275.4s | 16022 | 0.000 | 92 | 12/13 | — | — | 0 | 1 |  |  |  | miss
multi-ts-go-grpc | 1 | default |  | opencode/hy3-free | prompt | fail | build-failed, lint-failed, stack-mismatch, validation-failed | 0 | 318.0s | 23258 | 0.000 | 88 | 14/16 | — | — |  |  |  |  |  | miss
java-spring-jooq-keycloak | 1 | default |  | opencode/hy3-free | prompt | fail | build-failed, validation-failed | 0 | 781.4s | 39701 | 0.000 | 100 | 14/14 | — | — |  | 1 |  |  |  | miss
elixir-broadway-absinthe | 1 | default |  | opencode/hy3-free | prompt | fail | claude-error, install-failed, validation-failed | null | 4368.7s | 8077 | 0.000 | 100 | 13/13 | — | — | 1 |  |  |  |  | miss
react-native-expo | 1 | default |  | opencode/hy3-free | prompt | inconclusive | claude-error, project-not-found, stack-mismatch, validation-failed | null | 1145.6s |  |  | 0 | 0/8 | — | — |  |  |  |  |  | 
