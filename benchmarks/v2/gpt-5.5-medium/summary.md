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
gpt-5.5 | medium | medium | cli | 70 | 2/4 | 1/5 | 50% | 2/5 | 2/5 | n<8 | 100% | 96% | — | 100% | 119.0s / 215.8s | 6486 |  | format-failed:1, lint-failed:2, validation-failed:3, toolchain-missing:1
gpt-5.5 | medium | medium | mcp | 55 | 1/4 | 1/5 | 25% | 1/5 | 1/5 | n<8 | 98% | 97% | — | 100% | 83.1s / 369.1s | 6079 |  | format-failed:3, validation-failed:4, lint-failed:3, build-failed:1, stack-mismatch:1, test-failed:1, toolchain-missing:1, typecheck-failed:1
gpt-5.5 | medium | medium | prompt | 39 | 0/4 | 1/5 | 0% | 0/5 | 0/5 | n<8 | 94% | — | — | 100% | 258.2s / 369.9s | 15421 |  | build-failed:3, doctor-failed:2, lint-failed:4, stack-mismatch:4, test-failed:3, validation-failed:5, install-failed:1, toolchain-missing:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
ai-search-workbench | 1 | medium | medium | gpt-5.5 | prompt | fail | build-failed, doctor-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 369.9s | 21556 |  | 95 | 20/21 | — | — | 0 | 1 |  | 1 | 1
ai-search-workbench | 1 | medium | medium | gpt-5.5 | mcp | fail | format-failed, validation-failed | 0 | 83.1s | 3956 |  | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
ai-search-workbench | 1 | medium | medium | gpt-5.5 | cli | pass |  | 0 | 136.3s | 7627 |  | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
rust-leptos-axum | 1 | medium | medium | gpt-5.5 | prompt | fail | build-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 258.2s | 14795 |  | 92 | 11/12 | — | — |  | 101 |  | 101 | 101
rust-leptos-axum | 1 | medium | medium | gpt-5.5 | mcp | fail | format-failed, lint-failed, validation-failed | 0 | 96.2s | 3454 |  | 100 | 12/12 | 22/22 | — |  | 0 |  | 101 | 0
rust-leptos-axum | 1 | medium | medium | gpt-5.5 | cli | fail | format-failed, lint-failed, validation-failed | 0 | 119.0s | 5026 |  | 100 | 12/12 | 21/22 | — |  | 0 |  | 101 | 0
python-ingestion-api | 1 | medium | medium | gpt-5.5 | prompt | fail | lint-failed, stack-mismatch, validation-failed | 0 | 162.7s | 8307 |  | 92 | 12/13 | — | — | 0 |  | 0 | 1 | 0
python-ingestion-api | 1 | medium | medium | gpt-5.5 | mcp | fail | lint-failed, validation-failed | 0 | 65.2s | 2834 |  | 100 | 13/13 | 17/18 | — | 0 |  | 0 | 1 | 0
python-ingestion-api | 1 | medium | medium | gpt-5.5 | cli | fail | lint-failed, validation-failed | 0 | 107.9s | 5072 |  | 100 | 13/13 | 17/18 | — | 0 |  | 0 | 1 | 0
go-realtime-api | 1 | medium | medium | gpt-5.5 | prompt | fail | install-failed, validation-failed | 0 | 229.1s | 13738 |  | 100 | 13/13 | — | — | 1 |  |  |  | 
go-realtime-api | 1 | medium | medium | gpt-5.5 | mcp | pass |  | 0 | 60.5s | 2398 |  | 100 | 13/13 | 15/15 | — | 0 | 0 |  | 0 | 0
go-realtime-api | 1 | medium | medium | gpt-5.5 | cli | pass |  | 0 | 87.9s | 4058 |  | 100 | 13/13 | 14/15 | — | 0 | 0 |  | 0 | 0
multi-dotnet-ops | 1 | medium | medium | gpt-5.5 | prompt | inconclusive | build-failed, doctor-failed, lint-failed, stack-mismatch, test-failed, toolchain-missing, validation-failed | 0 | 305.7s | 18708 |  | 92 | 12/13 | — | — | 127 | 1 |  | 1 | 1
multi-dotnet-ops | 1 | medium | medium | gpt-5.5 | mcp | inconclusive | build-failed, format-failed, lint-failed, stack-mismatch, test-failed, toolchain-missing, typecheck-failed, validation-failed | 0 | 369.1s | 17755 |  | 92 | 12/13 | 17/19 | — | 127 | 127 | 2 | 1 | 127
multi-dotnet-ops | 1 | medium | medium | gpt-5.5 | cli | inconclusive | toolchain-missing, validation-failed | 0 | 215.8s | 10645 |  | 100 | 13/13 | 19/19 | — | 127 | 0 | 0 | 0 | 0
