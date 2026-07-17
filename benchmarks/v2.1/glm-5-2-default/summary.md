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
opencode-go/glm-5.2 | default |  | prompt | 44 | 1/13 | 8% | 0 | 8% | 1/13 | 1/13 | 8% (1-33) | 95% | — | — | 100% | 445.8s / 1858.1s | 30669 | 0.884 | build-failed:9, lint-failed:2, stack-mismatch:7, typecheck-failed:6, validation-failed:12, install-failed:3

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | default |  | opencode-go/glm-5.2 | prompt | fail | build-failed, lint-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 504.1s | 22328 | 0.328 | 95 | 20/21 | — | — | 0 | 1 | 2 | 1 |  | miss
rust-leptos-axum | 1 | default |  | opencode-go/glm-5.2 | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 1858.1s | 57248 | 1.652 | 92 | 11/12 | — | — |  | 101 |  |  |  | miss
python-ingestion-api | 1 | default |  | opencode-go/glm-5.2 | prompt | pass |  | 0 | 367.9s | 18083 | 0.491 | 100 | 13/13 | — | — | 0 |  | 0 |  |  | miss
go-realtime-api | 1 | default |  | opencode-go/glm-5.2 | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 745.5s | 20442 | 0.385 | 92 | 12/13 | — | — | 0 | 1 |  |  |  | miss
multi-dotnet-ops | 1 | default |  | opencode-go/glm-5.2 | prompt | fail | build-failed, lint-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 373.7s | 20614 | 0.592 | 92 | 12/13 | — | — | 0 | 1 | 2 | 1 |  | miss
ts-svelte-edge-orpc | 1 | default |  | opencode-go/glm-5.2 | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 308.0s | 15848 | 0.461 | 100 | 10/10 | — | — | 0 | 1 | 2 |  |  | miss
dotnet-blazor-cqrs | 1 | default |  | opencode-go/glm-5.2 | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 558.6s | 24991 | 0.634 | 92 | 12/13 | — | — | 0 | 1 |  |  |  | miss
multi-ts-go-grpc | 1 | default |  | opencode-go/glm-5.2 | prompt | fail | install-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 1008.0s | 52526 | 1.678 | 81 | 13/16 | — | — |  |  |  |  |  | miss
java-spring-jooq-keycloak | 1 | default |  | opencode-go/glm-5.2 | prompt | fail | build-failed, validation-failed | 0 | 292.3s | 18942 | 0.459 | 100 | 14/14 | — | — |  | 1 |  |  |  | miss
elixir-broadway-absinthe | 1 | default |  | opencode-go/glm-5.2 | prompt | fail | install-failed, validation-failed | 0 | 445.8s | 23066 | 0.590 | 100 | 13/13 | — | — | 1 |  |  |  |  | miss
react-native-expo | 1 | default |  | opencode-go/glm-5.2 | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 244.1s | 14881 | 0.360 | 88 | 7/8 | — | — | 1 |  |  |  |  | miss
frontier-polyglot-proto | 1 | default |  | opencode-go/glm-5.2 | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 158.7s | 12901 | 0.194 | 100 | 4/4 | — | — |  |  |  |  |  | miss
frontier-effect-eventsourcing | 1 | default |  | opencode-go/glm-5.2 | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 1651.6s | 96833 | 3.674 | 100 | 4/4 | — | — | 0 | 2 | 2 |  |  | miss
