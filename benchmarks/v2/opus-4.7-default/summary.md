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
claude-opus-4-7 | default | xhigh | cli | 70 | 2/4 | 1/5 | 50% | 2/5 | 2/5 | n<8 | 100% | 98% | — | 100% | 179.6s / 305.3s | 9499 | 1.033 | format-failed:1, lint-failed:2, validation-failed:3, toolchain-missing:1
claude-opus-4-7 | default | xhigh | mcp | 69 | 2/4 | 1/5 | 50% | 2/5 | 2/5 | n<8 | 94% | 98% | — | 100% | 46.6s / 104.7s | 3311 | 1.140 | format-failed:1, lint-failed:2, validation-failed:3, stack-mismatch:1, toolchain-missing:1
claude-opus-4-7 | default | xhigh | prompt | 39 | 0/4 | 1/5 | 0% | 0/5 | 0/5 | n<8 | 95% | — | — | 100% | 419.5s / 684.1s | 33662 | 3.201 | install-failed:1, validation-failed:5, build-failed:3, format-failed:1, lint-failed:4, stack-mismatch:3, test-failed:4, doctor-failed:1, toolchain-missing:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
ai-search-workbench | 1 | default | xhigh | claude-opus-4-7 | prompt | fail | install-failed, validation-failed | 0 | 684.1s | 50030 | 4.975 | 100 | 21/21 | — | — | 1 |  |  |  | 
ai-search-workbench | 1 | default | xhigh | claude-opus-4-7 | mcp | pass |  | 0 | 42.1s | 2953 | 1.078 | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
ai-search-workbench | 1 | default | xhigh | claude-opus-4-7 | cli | pass |  | 0 | 168.7s | 7929 | 0.892 | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
rust-leptos-axum | 1 | default | xhigh | claude-opus-4-7 | prompt | fail | build-failed, format-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 355.3s | 22755 | 2.158 | 92 | 11/12 | — | — |  | 101 |  | 101 | 101
rust-leptos-axum | 1 | default | xhigh | claude-opus-4-7 | mcp | fail | format-failed, lint-failed, validation-failed | 0 | 53.8s | 2406 | 1.054 | 100 | 12/12 | 22/22 | — |  | 0 |  | 101 | 0
rust-leptos-axum | 1 | default | xhigh | claude-opus-4-7 | cli | fail | format-failed, lint-failed, validation-failed | 0 | 305.3s | 12569 | 1.332 | 100 | 12/12 | 21/22 | — |  | 0 |  | 101 | 0
python-ingestion-api | 1 | default | xhigh | claude-opus-4-7 | prompt | fail | lint-failed, test-failed, validation-failed | 0 | 512.8s | 34495 | 3.492 | 100 | 13/13 | — | — | 0 |  | 0 | 1 | 4
python-ingestion-api | 1 | default | xhigh | claude-opus-4-7 | mcp | fail | lint-failed, validation-failed | 0 | 46.6s | 2818 | 1.070 | 100 | 13/13 | 18/18 | — | 0 |  | 0 | 1 | 0
python-ingestion-api | 1 | default | xhigh | claude-opus-4-7 | cli | fail | lint-failed, validation-failed | 0 | 179.6s | 9521 | 1.045 | 100 | 13/13 | 18/18 | — | 0 |  | 0 | 1 | 0
go-realtime-api | 1 | default | xhigh | claude-opus-4-7 | prompt | fail | build-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 419.5s | 32341 | 2.767 | 92 | 12/13 | — | — | 0 | 1 |  | 1 | 1
go-realtime-api | 1 | default | xhigh | claude-opus-4-7 | mcp | pass |  | 0 | 38.8s | 1920 | 1.038 | 100 | 13/13 | 15/15 | — | 0 | 0 |  | 0 | 0
go-realtime-api | 1 | default | xhigh | claude-opus-4-7 | cli | pass |  | 0 | 93.4s | 4477 | 0.640 | 100 | 13/13 | 14/15 | — | 0 | 0 |  | 0 | 0
multi-dotnet-ops | 1 | default | xhigh | claude-opus-4-7 | prompt | inconclusive | build-failed, doctor-failed, lint-failed, stack-mismatch, test-failed, toolchain-missing, validation-failed | 0 | 381.8s | 28690 | 2.614 | 92 | 12/13 | — | — | 127 | 1 |  | 1 | 1
multi-dotnet-ops | 1 | default | xhigh | claude-opus-4-7 | mcp | inconclusive | stack-mismatch, toolchain-missing, validation-failed | 0 | 104.7s | 6456 | 1.458 | 69 | 9/13 | 17/19 | — | 127 |  |  |  | 
multi-dotnet-ops | 1 | default | xhigh | claude-opus-4-7 | cli | inconclusive | toolchain-missing, validation-failed | 0 | 207.8s | 12999 | 1.256 | 100 | 13/13 | 19/19 | — | 127 | 0 | 0 | 0 | 0
