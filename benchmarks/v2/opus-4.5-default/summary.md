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
claude-opus-4-5 | default |  | cli | 70 | 2/4 | 1/5 | 50% | 2/5 | 2/5 | n<8 | 100% | 93% | — | 100% | 114.3s / 142.2s | 5028 | 0.845 | format-failed:1, lint-failed:2, validation-failed:3, toolchain-missing:1
claude-opus-4-5 | default |  | mcp | 70 | 2/4 | 1/5 | 50% | 2/5 | 2/5 | n<8 | 98% | 87% | — | 100% | 55.7s / 369.1s | 6780 | 1.745 | format-failed:1, lint-failed:2, validation-failed:3, stack-mismatch:1, toolchain-missing:1
claude-opus-4-5 | default |  | prompt | 45 | 1/5 | 0 | 20% | 1/5 | 1/5 | n<8 | 73% | — | — | 100% | 312.9s / 459.8s | 32941 | 1.878 | build-failed:3, doctor-failed:1, lint-failed:3, stack-mismatch:4, test-failed:3, typecheck-failed:1, validation-failed:4, format-failed:1, install-failed:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
ai-search-workbench | 1 | default |  | claude-opus-4-5 | prompt | fail | build-failed, doctor-failed, lint-failed, stack-mismatch, test-failed, typecheck-failed, validation-failed | 0 | 459.8s | 48214 | 2.488 | 90 | 19/21 | — | — | 0 | 1 | 2 | 1 | 1
ai-search-workbench | 1 | default |  | claude-opus-4-5 | mcp | pass |  | 0 | 55.7s | 3290 | 1.322 | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
ai-search-workbench | 1 | default |  | claude-opus-4-5 | cli | pass |  | 0 | 142.2s | 7209 | 1.007 | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
rust-leptos-axum | 1 | default |  | claude-opus-4-5 | prompt | fail | build-failed, format-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 264.5s | 26009 | 1.504 | 92 | 11/12 | — | — |  | 101 |  | 101 | 101
rust-leptos-axum | 1 | default |  | claude-opus-4-5 | mcp | fail | format-failed, lint-failed, validation-failed | 0 | 58.2s | 2111 | 1.164 | 100 | 12/12 | 22/22 | — |  | 0 |  | 101 | 0
rust-leptos-axum | 1 | default |  | claude-opus-4-5 | cli | fail | format-failed, lint-failed, validation-failed | 0 | 112.9s | 4427 | 0.771 | 100 | 12/12 | 21/22 | — |  | 0 |  | 101 | 0
python-ingestion-api | 1 | default |  | claude-opus-4-5 | prompt | fail | install-failed, validation-failed | 0 | 338.4s | 33235 | 1.673 | 100 | 13/13 | — | — | 1 |  |  |  | 
python-ingestion-api | 1 | default |  | claude-opus-4-5 | mcp | fail | lint-failed, validation-failed | 0 | 45.4s | 2361 | 1.190 | 100 | 13/13 | 18/18 | — | 0 |  | 0 | 1 | 0
python-ingestion-api | 1 | default |  | claude-opus-4-5 | cli | fail | lint-failed, validation-failed | 0 | 56.6s | 2313 | 0.580 | 100 | 13/13 | 16/18 | — | 0 |  | 0 | 1 | 0
go-realtime-api | 1 | default |  | claude-opus-4-5 | prompt | fail | build-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 312.9s | 33448 | 1.655 | 85 | 11/13 | — | — | 0 | 1 |  | 1 | 1
go-realtime-api | 1 | default |  | claude-opus-4-5 | mcp | pass |  | 0 | 39.0s | 1851 | 1.083 | 100 | 13/13 | 15/15 | — | 0 | 0 |  | 0 | 0
go-realtime-api | 1 | default |  | claude-opus-4-5 | cli | pass |  | 0 | 114.3s | 5325 | 0.862 | 100 | 13/13 | 14/15 | — | 0 | 0 |  | 0 | 0
multi-dotnet-ops | 1 | default |  | claude-opus-4-5 | prompt | pass | stack-mismatch | 0 | 301.1s | 23801 | 2.069 | 0 | 0/13 | — | — |  |  |  |  | 
multi-dotnet-ops | 1 | default |  | claude-opus-4-5 | mcp | inconclusive | stack-mismatch, toolchain-missing, validation-failed | 0 | 369.1s | 24287 | 3.967 | 92 | 12/13 | 7/19 | — | 127 |  |  |  | 
multi-dotnet-ops | 1 | default |  | claude-opus-4-5 | cli | inconclusive | toolchain-missing, validation-failed | 0 | 134.3s | 5867 | 1.004 | 100 | 13/13 | 17/19 | — | 127 | 0 | 0 | 0 | 0
