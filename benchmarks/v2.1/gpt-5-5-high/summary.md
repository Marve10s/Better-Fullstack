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
gpt-5.5 | high | high | prompt | 61 | 5/13 | 38% | 0 | 38% | 5/13 | 5/13 | 38% (18-64) | 93% | — | — | 100% | 341.9s / 718.9s | 26033 | 1.415 | build-failed:6, lint-failed:3, stack-mismatch:8, validation-failed:8, toolchain-missing:1, typecheck-failed:2, install-failed:2

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | high | high | gpt-5.5 | prompt | fail | build-failed, lint-failed, stack-mismatch, validation-failed | 0 | 718.9s | 41001 | 2.561 | 95 | 20/21 | — | — | 0 | 2 |  | 1 |  | hit
rust-leptos-axum | 1 | high | high | gpt-5.5 | prompt | fail | build-failed, stack-mismatch, validation-failed | 0 | 385.6s | 23749 | 1.244 | 92 | 11/12 | — | — |  | 101 |  |  |  | hit
python-ingestion-api | 1 | high | high | gpt-5.5 | prompt | pass |  | 0 | 300.7s | 17030 | 0.981 | 100 | 13/13 | — | — | 0 |  | 0 |  |  | hit
go-realtime-api | 1 | high | high | gpt-5.5 | prompt | pass | stack-mismatch | 0 | 327.9s | 21115 | 1.116 | 92 | 12/13 | — | — | 0 | 0 |  |  |  | hit
multi-dotnet-ops | 1 | high | high | gpt-5.5 | prompt | fail | build-failed, lint-failed, stack-mismatch, toolchain-missing, validation-failed | 0 | 337.7s | 21298 | 1.021 | 92 | 12/13 | — | — | 0 | 1 |  | 1 |  | hit
ts-svelte-edge-orpc | 1 | high | high | gpt-5.5 | prompt | fail | build-failed, typecheck-failed, validation-failed | 0 | 539.9s | 34441 | 2.245 | 100 | 10/10 | — | — | 0 | 1 | 1 |  |  | hit
dotnet-blazor-cqrs | 1 | high | high | gpt-5.5 | prompt | fail | install-failed, validation-failed | 0 | 412.7s | 28816 | 1.445 | 100 | 13/13 | — | — | 1 |  |  |  |  | hit
multi-ts-go-grpc | 1 | high | high | gpt-5.5 | prompt | fail | build-failed, lint-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 600.8s | 41899 | 2.287 | 94 | 15/16 | — | — | 0 |  |  |  |  | miss
java-spring-jooq-keycloak | 1 | high | high | gpt-5.5 | prompt | fail | build-failed, validation-failed | 0 | 322.9s | 18854 | 0.974 | 100 | 14/14 | — | — |  | 1 |  |  |  | hit
elixir-broadway-absinthe | 1 | high | high | gpt-5.5 | prompt | pass |  | 0 | 492.0s | 33646 | 1.422 | 100 | 13/13 | — | — | 0 | 0 |  |  |  | miss
react-native-expo | 1 | high | high | gpt-5.5 | prompt | pass | stack-mismatch | 0 | 251.2s | 16136 | 0.858 | 88 | 7/8 | — | — | 0 |  | 0 |  |  | hit
frontier-polyglot-proto | 1 | high | high | gpt-5.5 | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 258.2s | 15994 | 0.808 | 75 | 3/4 | — | — | 0 |  |  |  |  | miss
frontier-effect-eventsourcing | 1 | high | high | gpt-5.5 | prompt | pass | stack-mismatch | 0 | 341.9s | 24454 | 1.428 | 75 | 3/4 | — | — | 0 | 0 | 0 |  |  | hit
