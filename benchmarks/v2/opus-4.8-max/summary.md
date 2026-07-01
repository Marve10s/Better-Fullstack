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
claude-opus-4-8 | max | max | mcp | 70 | 2/4 | 1/5 | 50% | 2/5 | 2/5 | n<8 | 100% | 99% | — | 100% | 157.4s / 594.9s | 19819 | 1.824 | format-failed:1, lint-failed:2, validation-failed:3, toolchain-missing:1
claude-opus-4-8 | max | max | cli | 70 | 2/4 | 1/5 | 50% | 2/5 | 2/5 | n<8 | 100% | 95% | — | 100% | 416.1s / 681.0s | 34506 | 2.170 | format-failed:1, lint-failed:2, validation-failed:3, toolchain-missing:1
claude-opus-4-8 | max | max | prompt | 36 | 0/4 | 1/5 | 0% | 0/5 | 0/5 | n<8 | 84% | — | — | 100% | 900.3s / 900.4s |  |  | claude-error:5, claude-timeout:5, doctor-failed:2, lint-failed:4, stack-mismatch:3, typecheck-failed:1, validation-failed:5, build-failed:1, format-failed:1, test-failed:2, install-failed:1, toolchain-missing:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
ai-search-workbench | 1 | max | max | claude-opus-4-8 | prompt | fail | claude-error, claude-timeout, doctor-failed, lint-failed, stack-mismatch, typecheck-failed, validation-failed | 143 | 900.3s |  |  | 67 | 14/21 | — | — | 0 | 0 | 2 | 1 | 0
ai-search-workbench | 1 | max | max | claude-opus-4-8 | mcp | pass |  | 0 | 152.1s | 12101 | 1.599 | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
ai-search-workbench | 1 | max | max | claude-opus-4-8 | cli | pass |  | 0 | 416.1s | 30233 | 2.089 | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
rust-leptos-axum | 1 | max | max | claude-opus-4-8 | prompt | fail | build-failed, claude-error, claude-timeout, format-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 143 | 900.3s |  |  | 92 | 11/12 | — | — |  | 101 |  | 101 | 101
rust-leptos-axum | 1 | max | max | claude-opus-4-8 | mcp | fail | format-failed, lint-failed, validation-failed | 0 | 157.4s | 13094 | 1.236 | 100 | 12/12 | 22/22 | — |  | 0 |  | 101 | 0
rust-leptos-axum | 1 | max | max | claude-opus-4-8 | cli | fail | format-failed, lint-failed, validation-failed | 0 | 396.5s | 30137 | 1.698 | 100 | 12/12 | 21/22 | — |  | 0 |  | 101 | 0
python-ingestion-api | 1 | max | max | claude-opus-4-8 | prompt | fail | claude-error, claude-timeout, lint-failed, test-failed, validation-failed | 143 | 900.4s |  |  | 100 | 13/13 | — | — | 0 |  | 0 | 1 | 4
python-ingestion-api | 1 | max | max | claude-opus-4-8 | mcp | fail | lint-failed, validation-failed | 0 | 196.2s | 14912 | 1.851 | 100 | 13/13 | 17/18 | — | 0 |  | 0 | 1 | 0
python-ingestion-api | 1 | max | max | claude-opus-4-8 | cli | fail | lint-failed, validation-failed | 0 | 443.4s | 32720 | 1.790 | 100 | 13/13 | 16/18 | — | 0 |  | 0 | 1 | 0
go-realtime-api | 1 | max | max | claude-opus-4-8 | prompt | fail | claude-error, claude-timeout, install-failed, validation-failed | 143 | 900.3s |  |  | 100 | 13/13 | — | — | 1 |  |  |  | 
go-realtime-api | 1 | max | max | claude-opus-4-8 | mcp | pass |  | 0 | 133.3s | 11010 | 1.127 | 100 | 13/13 | 15/15 | — | 0 | 0 |  | 0 | 0
go-realtime-api | 1 | max | max | claude-opus-4-8 | cli | pass |  | 0 | 369.8s | 27001 | 1.779 | 100 | 13/13 | 14/15 | — | 0 | 0 |  | 0 | 0
multi-dotnet-ops | 1 | max | max | claude-opus-4-8 | prompt | inconclusive | claude-error, claude-timeout, doctor-failed, lint-failed, stack-mismatch, toolchain-missing, validation-failed | 143 | 900.3s |  |  | 62 | 8/13 | — | — | 127 | 0 |  | 1 | 0
multi-dotnet-ops | 1 | max | max | claude-opus-4-8 | mcp | inconclusive | toolchain-missing, validation-failed | 0 | 594.9s | 47979 | 3.306 | 100 | 13/13 | 19/19 | — | 127 | 0 | 0 | 0 | 0
multi-dotnet-ops | 1 | max | max | claude-opus-4-8 | cli | inconclusive | toolchain-missing, validation-failed | 0 | 681.0s | 52440 | 3.495 | 100 | 13/13 | 19/19 | — | 127 | 0 | 0 | 0 | 0
