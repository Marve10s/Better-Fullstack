# ScaffBench 2 Run

Harness: 2.0.0
Agent: Codex (single agent; single model family per row)
Specs: elixir-broadway-absinthe
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
gpt-5.6-sol | high | high | prompt | 47 | 2/13 | 15% | 0 | 15% | 2/13 | 2/13 | 15% (4-42) | 92% | — | — | 100% | 471.1s / 814.4s | 32327 |  | lint-failed:2, stack-mismatch:8, typecheck-failed:4, validation-failed:11, install-failed:4, build-failed:6

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | high | high | gpt-5.6-sol | prompt | fail | lint-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 666.3s | 38807 |  | 95 | 20/21 | — | — | 0 | 0 | 2 | 1 |  | miss
rust-leptos-axum | 1 | high | high | gpt-5.6-sol | prompt | pass | stack-mismatch | 0 | 444.4s | 30006 |  | 92 | 11/12 | — | — |  | 0 |  |  |  | miss
python-ingestion-api | 1 | high | high | gpt-5.6-sol | prompt | pass | stack-mismatch | 0 | 375.2s | 22956 |  | 92 | 12/13 | — | — | 0 |  | 0 |  |  | miss
go-realtime-api | 1 | high | high | gpt-5.6-sol | prompt | fail | install-failed, validation-failed | 0 | 814.4s | 53613 |  | 100 | 13/13 | — | — | 1 |  |  |  |  | miss
multi-dotnet-ops | 1 | high | high | gpt-5.6-sol | prompt | fail | build-failed, lint-failed, stack-mismatch, validation-failed | 0 | 428.3s | 26636 |  | 92 | 12/13 | — | — | 0 | 1 |  | 1 |  | miss
ts-svelte-edge-orpc | 1 | high | high | gpt-5.6-sol | prompt | fail | build-failed, validation-failed | 0 | 697.1s | 43774 |  | 100 | 10/10 | — | — | 0 | 1 |  |  |  | miss
dotnet-blazor-cqrs | 1 | high | high | gpt-5.6-sol | prompt | fail | install-failed, validation-failed | 0 | 542.2s | 33748 |  | 100 | 13/13 | — | — | 1 |  |  |  |  | miss
java-spring-jooq-keycloak | 1 | high | high | gpt-5.6-sol | prompt | fail | build-failed, validation-failed | 0 | 471.1s | 28929 |  | 100 | 14/14 | — | — |  | 1 |  |  |  | miss
elixir-broadway-absinthe | 1 | high | high | gpt-5.6-sol | prompt | fail | build-failed, validation-failed | 0 | 595.6s | 33805 |  | 100 | 13/13 | — | — | 0 | 1 |  |  |  | miss
frontier-polyglot-proto | 1 | high | high | gpt-5.6-sol | prompt | fail | build-failed, install-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 411.4s | 27342 |  | 75 | 3/4 | — | — | 0 | 0 |  |  |  | miss
frontier-effect-eventsourcing | 1 | high | high | gpt-5.6-sol | prompt | fail | build-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 367.5s | 25064 |  | 75 | 3/4 | — | — | 0 | 1 | 2 |  |  | miss
multi-ts-go-grpc | 1 | high | high | gpt-5.6-sol | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 377.7s | 24732 |  | 88 | 14/16 | — | — |  |  |  |  |  | miss
react-native-expo | 1 | high | high | gpt-5.6-sol | prompt | fail | stack-mismatch, typecheck-failed, validation-failed | 0 | 487.0s | 30844 |  | 88 | 7/8 | — | — | 0 |  | 2 |  |  | miss
