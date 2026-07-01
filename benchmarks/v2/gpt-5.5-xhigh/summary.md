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
gpt-5.5 | xhigh | xhigh | mcp | 55 | 1/4 | 1/5 | 25% | 1/5 | 1/5 | n<8 | 98% | 96% | — | 100% | 183.1s / 690.1s | 23353 | 1.876 | typecheck-failed:2, validation-failed:4, format-failed:1, lint-failed:3, build-failed:1, stack-mismatch:1, test-failed:1, toolchain-missing:1
gpt-5.5 | xhigh | xhigh | cli | 55 | 1/4 | 1/5 | 25% | 1/5 | 1/5 | n<8 | 100% | 98% | — | 100% | 287.9s / 834.9s | 27159 | 2.259 | build-failed:1, format-failed:2, typecheck-failed:1, validation-failed:4, lint-failed:2, toolchain-missing:1
gpt-5.5 | xhigh | xhigh | prompt | 53 | 1/4 | 1/5 | 25% | 1/5 | 1/5 | n<8 | 92% | — | — | 100% | 759.6s / 900.0s | 45036 | 2.342 | build-failed:2, claude-timeout:2, doctor-failed:2, format-failed:1, lint-failed:4, test-failed:3, typecheck-failed:1, validation-failed:4, stack-mismatch:3, toolchain-missing:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
ai-search-workbench | 1 | xhigh | xhigh | gpt-5.5 | prompt | fail | build-failed, claude-timeout, doctor-failed, format-failed, lint-failed, test-failed, typecheck-failed, validation-failed | 0 | 900.0s |  |  | 100 | 21/21 | — | — | 0 | 1 | 1 | 1 | 1
ai-search-workbench | 1 | xhigh | xhigh | gpt-5.5 | mcp | fail | typecheck-failed, validation-failed | 0 | 690.1s | 43175 | 3.658 | 100 | 21/21 | 24/24 | — | 0 | 0 | 1 | 0 | 0
ai-search-workbench | 1 | xhigh | xhigh | gpt-5.5 | cli | fail | build-failed, format-failed, typecheck-failed, validation-failed | 0 | 834.9s | 56479 | 4.768 | 100 | 21/21 | 24/24 | — | 0 | 1 | 1 | 0 | 0
rust-leptos-axum | 1 | xhigh | xhigh | gpt-5.5 | prompt | fail | build-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 759.6s | 59891 | 3.419 | 92 | 11/12 | — | — |  | 101 |  | 101 | 101
rust-leptos-axum | 1 | xhigh | xhigh | gpt-5.5 | mcp | fail | format-failed, lint-failed, validation-failed | 0 | 141.0s | 10201 | 0.915 | 100 | 12/12 | 22/22 | — |  | 0 |  | 101 | 0
rust-leptos-axum | 1 | xhigh | xhigh | gpt-5.5 | cli | fail | format-failed, lint-failed, validation-failed | 0 | 182.4s | 12958 | 0.841 | 100 | 12/12 | 21/22 | — |  | 0 |  | 101 | 0
python-ingestion-api | 1 | xhigh | xhigh | gpt-5.5 | prompt | fail | lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 592.8s | 24665 | 1.256 | 92 | 12/13 | — | — | 0 |  | 0 | 1 | 1
python-ingestion-api | 1 | xhigh | xhigh | gpt-5.5 | mcp | fail | lint-failed, validation-failed | 0 | 183.1s | 11905 | 1.004 | 100 | 13/13 | 17/18 | — | 0 |  | 0 | 1 | 0
python-ingestion-api | 1 | xhigh | xhigh | gpt-5.5 | cli | fail | lint-failed, validation-failed | 0 | 253.2s | 16842 | 1.409 | 100 | 13/13 | 17/18 | — | 0 |  | 0 | 1 | 0
go-realtime-api | 1 | xhigh | xhigh | gpt-5.5 | prompt | pass |  | 0 | 670.8s | 50553 | 2.351 | 100 | 13/13 | — | — | 0 | 0 |  | 0 | 0
go-realtime-api | 1 | xhigh | xhigh | gpt-5.5 | mcp | pass |  | 0 | 119.7s | 9015 | 0.800 | 100 | 13/13 | 15/15 | — | 0 | 0 |  | 0 | 0
go-realtime-api | 1 | xhigh | xhigh | gpt-5.5 | cli | pass |  | 0 | 287.9s | 19234 | 1.535 | 100 | 13/13 | 15/15 | — | 0 | 0 |  | 0 | 0
multi-dotnet-ops | 1 | xhigh | xhigh | gpt-5.5 | prompt | inconclusive | claude-timeout, doctor-failed, lint-failed, stack-mismatch, toolchain-missing, validation-failed | 0 | 900.0s |  |  | 77 | 10/13 | — | — | 127 | 0 |  | 1 | 0
multi-dotnet-ops | 1 | xhigh | xhigh | gpt-5.5 | mcp | inconclusive | build-failed, lint-failed, stack-mismatch, test-failed, toolchain-missing, typecheck-failed, validation-failed | 0 | 646.7s | 42468 | 3.005 | 92 | 12/13 | 16/19 | — | 127 | 1 | 1 | 1 | 127
multi-dotnet-ops | 1 | xhigh | xhigh | gpt-5.5 | cli | inconclusive | toolchain-missing, validation-failed | 0 | 426.0s | 30280 | 2.743 | 100 | 13/13 | 19/19 | — | 127 | 0 | 0 | 0 | 0
