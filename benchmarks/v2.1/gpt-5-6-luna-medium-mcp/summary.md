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
gpt-5.6-luna | medium | medium | mcp | 76 | 7/11 | 64% | 0 | 64% | 7/11 | 7/11 | 64% (35-85) | 90% | 83% | — | 100% | 69.2s / 130.0s | 4057 | 0.202 | install-failed:2, stack-mismatch:2, validation-failed:4, build-failed:2, typecheck-failed:2

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test | Validation cache |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
ai-search-workbench | 1 | medium | medium | gpt-5.6-luna | mcp | pass |  | 0 | 68.1s | 3486 | 0.148 | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 |  |  | miss
rust-leptos-axum | 1 | medium | medium | gpt-5.6-luna | mcp | pass |  | 0 | 69.2s | 3044 | 0.208 | 100 | 12/12 | 21/22 | — |  | 0 |  |  |  | miss
python-ingestion-api | 1 | medium | medium | gpt-5.6-luna | mcp | pass |  | 0 | 65.3s | 3463 | 0.137 | 100 | 13/13 | 17/18 | — | 0 |  | 0 |  |  | miss
go-realtime-api | 1 | medium | medium | gpt-5.6-luna | mcp | pass |  | 0 | 93.8s | 5211 | 0.299 | 100 | 13/13 | 14/15 | — | 0 | 0 |  |  |  | miss
multi-dotnet-ops | 1 | medium | medium | gpt-5.6-luna | mcp | fail | install-failed, stack-mismatch, validation-failed | 0 | 90.7s | 5261 | 0.216 | 46 | 6/13 | 5/19 | — | 1 | 0 |  |  |  | miss
ts-svelte-edge-orpc | 1 | medium | medium | gpt-5.6-luna | mcp | fail | install-failed, validation-failed | 0 | 59.1s | 2593 | 0.196 | 100 | 10/10 | 14/14 | — | 1 |  |  |  |  | miss
dotnet-blazor-cqrs | 1 | medium | medium | gpt-5.6-luna | mcp | pass |  | 0 | 66.4s | 3247 | 0.208 | 100 | 13/13 | 17/17 | — | 0 | 0 |  |  |  | miss
multi-ts-go-grpc | 1 | medium | medium | gpt-5.6-luna | mcp | fail | build-failed, stack-mismatch, typecheck-failed, validation-failed | 0 | 130.0s | 8506 | 0.329 | 44 | 7/16 | 2/16 | — | 0 | 126 | 126 |  |  | miss
java-spring-jooq-keycloak | 1 | medium | medium | gpt-5.6-luna | mcp | pass |  | 0 | 76.6s | 4210 | 0.161 | 100 | 14/14 | 27/27 | — |  | 0 |  |  |  | miss
elixir-broadway-absinthe | 1 | medium | medium | gpt-5.6-luna | mcp | pass |  | 0 | 75.9s | 3203 | 0.172 | 100 | 13/13 | 18/19 | — | 0 | 0 |  |  |  | miss
react-native-expo | 1 | medium | medium | gpt-5.6-luna | mcp | fail | build-failed, typecheck-failed, validation-failed | 0 | 46.4s | 2403 | 0.146 | 100 | 8/8 | 9/9 | — | 0 | 126 | 126 |  |  | miss
