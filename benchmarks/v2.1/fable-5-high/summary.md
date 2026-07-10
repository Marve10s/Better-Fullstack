# ScaffBench 2 Run

Harness: 2.0.0
Agent: Claude Code (single agent; single model family per row)
Specs: elixir-broadway-absinthe
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
claude-fable-5 | high | high | prompt | 57 | 4/13 | 31% | 0 | 31% | 4/13 | 4/13 | 31% (13-58) | 95% | — | — | 100% | 508.5s / 1193.5s | 58839 | 4.941 | typecheck-failed:4, validation-failed:9, build-failed:5, stack-mismatch:5, install-failed:4, lint-failed:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | high | high | claude-fable-5 | prompt | fail | typecheck-failed, validation-failed | 0 | 938.4s | 97497 | 7.590 | 100 | 21/21 | — | — | 0 | 0 | 2 |  |  | miss
rust-leptos-axum | 1 | high | high | claude-fable-5 | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 438.8s | 42203 | 3.887 | 92 | 11/12 | — | — |  | 101 |  |  |  | miss
python-ingestion-api | 1 | high | high | claude-fable-5 | prompt | pass |  | 0 | 326.4s | 25151 | 2.840 | 100 | 13/13 | — | — | 0 |  | 0 |  |  | miss
go-realtime-api | 1 | high | high | claude-fable-5 | prompt | fail | install-failed, validation-failed | 0 | 632.9s | 64195 | 5.092 | 100 | 13/13 | — | — | 1 |  |  |  |  | miss
multi-dotnet-ops | 1 | high | high | claude-fable-5 | prompt | fail | build-failed, lint-failed, stack-mismatch, validation-failed | 0 | 496.6s | 48467 | 4.163 | 92 | 12/13 | — | — | 0 | 1 |  | 1 |  | miss
ts-svelte-edge-orpc | 1 | high | high | claude-fable-5 | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 357.2s | 34168 | 2.879 | 100 | 10/10 | — | — | 0 | 2 | 2 |  |  | miss
dotnet-blazor-cqrs | 1 | high | high | claude-fable-5 | prompt | fail | install-failed, validation-failed | 0 | 874.7s | 89158 | 7.172 | 100 | 13/13 | — | — | 1 |  |  |  |  | miss
multi-ts-go-grpc | 1 | high | high | claude-fable-5 | prompt | fail | install-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 765.1s | 78881 | 6.596 | 88 | 14/16 | — | — | 0 |  |  |  |  | miss
java-spring-jooq-keycloak | 1 | high | high | claude-fable-5 | prompt | fail | build-failed, validation-failed | 0 | 1193.5s | 111731 | 9.060 | 100 | 14/14 | — | — |  | 1 |  |  |  | miss
elixir-broadway-absinthe | 1 | high | high | claude-fable-5 | prompt | pass |  | 0 | 693.4s | 63316 | 5.437 | 100 | 13/13 | — | — | 0 | 0 |  |  |  | miss
react-native-expo | 1 | high | high | claude-fable-5 | prompt | pass | stack-mismatch | 0 | 414.7s | 36883 | 3.115 | 88 | 7/8 | — | — | 0 |  | 0 |  |  | miss
frontier-polyglot-proto | 1 | high | high | claude-fable-5 | prompt | fail | build-failed, install-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 318.7s | 25712 | 2.574 | 75 | 3/4 | — | — |  |  |  |  |  | miss
frontier-effect-eventsourcing | 1 | high | high | claude-fable-5 | prompt | pass |  | 0 | 508.5s | 47540 | 3.829 | 100 | 4/4 | — | — | 0 | 0 | 0 |  |  | miss
