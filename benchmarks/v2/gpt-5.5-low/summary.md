# ScaffBench 2 Run

Harness: 2.0.0
Agent: Claude Code (single agent; single model family per row)
Specs: ai-search-workbench, rust-leptos-axum, python-ingestion-api, go-realtime-api, multi-dotnet-ops
Repeats: 1
Prompt style: explicit

## Path × effort summary

This is an ablation across creation paths and reasoning effort for one agent
(Claude Code), not a cross-vendor leaderboard. Pass rate is over *scored* runs:
infra-inconclusive runs (missing toolchain, validation timeout, exhausted token
budget, or a crash with no output) are excluded from the denominator. "Wired
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

| Model | Effort | Effective reasoning | Path | Index | Pass@1 | Inconclusive | Macro | pass@k | pass^k | CI95 | Wired libs | Faithful | Acceptance | Command discipline | Median / p95 | Avg output tokens | Avg cost | Failure tags |
| --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |
gpt-5.5 | low | low | cli | 70 | 2/4 | 1/5 | 50% | 2/5 | 2/5 | n<8 | 98% | 96% | — | 100% | 128.3s / 246.1s | 5802 |  | format-failed:1, lint-failed:3, validation-failed:3, stack-mismatch:1, stack-unwired:1, toolchain-missing:1
gpt-5.5 | low | low | mcp | 53 | 1/4 | 1/5 | 25% | 1/5 | 1/5 | n<8 | 97% | 97% | — | 90% | 67.1s / 384.2s | 6676 |  | format-failed:3, validation-failed:4, lint-failed:3, command-discipline:1, stack-mismatch:2, tool-violation:1, build-failed:1, toolchain-missing:1
gpt-5.5 | low | low | prompt | 38 | 0/4 | 1/5 | 0% | 0/5 | 0/5 | n<8 | 92% | — | — | 100% | 210.3s / 299.3s | 10985 |  | install-failed:2, stack-mismatch:5, validation-failed:5, build-failed:2, lint-failed:3, test-failed:2, doctor-failed:1, toolchain-missing:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
ai-search-workbench | 1 | low | low | gpt-5.5 | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 299.3s | 15647 |  | 90 | 19/21 | — | — | 1 |  |  |  | 
ai-search-workbench | 1 | low | low | gpt-5.5 | mcp | fail | format-failed, validation-failed | 0 | 67.1s | 2651 |  | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
ai-search-workbench | 1 | low | low | gpt-5.5 | cli | pass |  | 0 | 191.0s | 5383 |  | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
rust-leptos-axum | 1 | low | low | gpt-5.5 | prompt | fail | build-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 135.5s | 7441 |  | 92 | 11/12 | — | — |  | 101 |  | 101 | 101
rust-leptos-axum | 1 | low | low | gpt-5.5 | mcp | fail | format-failed, lint-failed, validation-failed | 0 | 62.5s | 2364 |  | 100 | 12/12 | 22/22 | — |  | 0 |  | 101 | 0
rust-leptos-axum | 1 | low | low | gpt-5.5 | cli | fail | format-failed, lint-failed, validation-failed | 0 | 128.3s | 3833 |  | 100 | 12/12 | 21/22 | — |  | 0 |  | 101 | 0
python-ingestion-api | 1 | low | low | gpt-5.5 | prompt | fail | lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 183.3s | 7853 |  | 92 | 12/13 | — | — | 0 |  | 0 | 1 | 2
python-ingestion-api | 1 | low | low | gpt-5.5 | mcp | fail | command-discipline, lint-failed, stack-mismatch, tool-violation, validation-failed | 0 | 142.2s | 6951 |  | 92 | 12/13 | — | — | 0 |  | 0 | 1 | 0
python-ingestion-api | 1 | low | low | gpt-5.5 | cli | fail | lint-failed, validation-failed | 0 | 108.5s | 4366 |  | 100 | 13/13 | 17/18 | — | 0 |  | 0 | 1 | 0
go-realtime-api | 1 | low | low | gpt-5.5 | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 244.7s | 12096 |  | 92 | 12/13 | — | — | 1 |  |  |  | 
go-realtime-api | 1 | low | low | gpt-5.5 | mcp | pass |  | 0 | 56.1s | 1933 |  | 100 | 13/13 | 15/15 | — | 0 | 0 |  | 0 | 0
go-realtime-api | 1 | low | low | gpt-5.5 | cli | pass |  | 0 | 68.3s | 2913 |  | 100 | 13/13 | 14/15 | — | 0 | 0 |  | 0 | 0
multi-dotnet-ops | 1 | low | low | gpt-5.5 | prompt | inconclusive | build-failed, doctor-failed, lint-failed, stack-mismatch, toolchain-missing, validation-failed | 0 | 210.3s | 11887 |  | 92 | 12/13 | — | — | 127 | 1 |  | 1 | 0
multi-dotnet-ops | 1 | low | low | gpt-5.5 | mcp | inconclusive | build-failed, format-failed, lint-failed, stack-mismatch, toolchain-missing, validation-failed | 0 | 384.2s | 19483 |  | 92 | 12/13 | 17/19 | — | 127 | 1 |  | 1 | 0
multi-dotnet-ops | 1 | low | low | gpt-5.5 | cli | inconclusive | lint-failed, stack-mismatch, stack-unwired, toolchain-missing, validation-failed | 0 | 246.1s | 12517 |  | 92 | 12/13 | 19/19 | — | 127 | 0 |  | 1 | 0
