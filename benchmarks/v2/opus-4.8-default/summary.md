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
claude-opus-4-8 | default |  | mcp | 64 | 2/4 | 1/5 | 50% | 2/5 | 2/5 | n<8 | 80% | 100% | — | 90% | 80.0s / 1039.7s | 6072 | 1.227 | format-failed:1, lint-failed:2, validation-failed:3, claude-error:1, claude-timeout:1, command-discipline:1, project-not-found:1, stack-mismatch:1, tool-violation:1
claude-opus-4-8 | default |  | cli | 63 | 2/4 | 1/5 | 50% | 2/5 | 2/5 | n<8 | 80% | 94% | — | 87% | 335.2s / 928.5s | 14913 | 1.127 | format-failed:1, lint-failed:2, validation-failed:3, claude-error:1, claude-timeout:1, command-discipline:1, project-not-found:1, stack-mismatch:1, tool-violation:1
claude-opus-4-8 | default |  | prompt | 38 | 0/4 | 1/5 | 0% | 0/5 | 0/5 | n<8 | 91% | — | — | 100% | 728.6s / 979.1s | 50007 | 3.359 | build-failed:2, claude-error:2, claude-timeout:2, doctor-failed:2, lint-failed:3, test-failed:3, typecheck-failed:1, validation-failed:5, format-failed:1, stack-mismatch:2, install-failed:1, toolchain-missing:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
ai-search-workbench | 1 | default |  | claude-opus-4-8 | prompt | fail | build-failed, claude-error, claude-timeout, doctor-failed, lint-failed, test-failed, typecheck-failed, validation-failed | 143 | 900.3s |  |  | 100 | 21/21 | — | — | 0 | 1 | 1 | 1 | 1
ai-search-workbench | 1 | default |  | claude-opus-4-8 | mcp | pass |  | 0 | 106.2s | 7963 | 1.290 | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
ai-search-workbench | 1 | default |  | claude-opus-4-8 | cli | pass |  | 0 | 182.8s | 14168 | 1.028 | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
rust-leptos-axum | 1 | default |  | claude-opus-4-8 | prompt | fail | build-failed, format-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 642.5s | 56222 | 3.519 | 92 | 11/12 | — | — |  | 101 |  | 101 | 101
rust-leptos-axum | 1 | default |  | claude-opus-4-8 | mcp | fail | format-failed, lint-failed, validation-failed | 0 | 68.7s | 5168 | 1.152 | 100 | 12/12 | 22/22 | — |  | 0 |  | 101 | 0
rust-leptos-axum | 1 | default |  | claude-opus-4-8 | cli | fail | format-failed, lint-failed, validation-failed | 0 | 335.2s | 22347 | 1.586 | 100 | 12/12 | 21/22 | — |  | 0 |  | 101 | 0
python-ingestion-api | 1 | default |  | claude-opus-4-8 | prompt | fail | lint-failed, test-failed, validation-failed | 0 | 379.7s | 31262 | 2.317 | 100 | 13/13 | — | — | 0 |  | 0 | 1 | 4
python-ingestion-api | 1 | default |  | claude-opus-4-8 | mcp | fail | lint-failed, validation-failed | 0 | 80.0s | 6036 | 1.188 | 100 | 13/13 | 18/18 | — | 0 |  | 0 | 1 | 0
python-ingestion-api | 1 | default |  | claude-opus-4-8 | cli | fail | lint-failed, validation-failed | 0 | 129.5s | 8254 | 0.758 | 100 | 13/13 | 16/18 | — | 0 |  | 0 | 1 | 0
go-realtime-api | 1 | default |  | claude-opus-4-8 | prompt | fail | install-failed, validation-failed | 0 | 728.6s | 62537 | 4.242 | 100 | 13/13 | — | — | 1 |  |  |  | 
go-realtime-api | 1 | default |  | claude-opus-4-8 | mcp | pass |  | 0 | 75.5s | 5119 | 1.279 | 100 | 13/13 | 15/15 | — | 0 | 0 |  | 0 | 0
go-realtime-api | 1 | default |  | claude-opus-4-8 | cli | pass |  | 0 | 420.6s | 14881 | 1.134 | 100 | 13/13 | 14/15 | — | 0 | 0 |  | 0 | 0
multi-dotnet-ops | 1 | default |  | claude-opus-4-8 | prompt | inconclusive | claude-error, claude-timeout, doctor-failed, stack-mismatch, toolchain-missing, validation-failed | 143 | 979.1s |  |  | 62 | 8/13 | — | — | 127 | 0 |  | 0 | 0
multi-dotnet-ops | 1 | default |  | claude-opus-4-8 | mcp | inconclusive | claude-error, claude-timeout, command-discipline, project-not-found, stack-mismatch, tool-violation, validation-failed | 143 | 1039.7s |  |  | 0 | 0/13 | — | — |  |  |  |  | 
multi-dotnet-ops | 1 | default |  | claude-opus-4-8 | cli | inconclusive | claude-error, claude-timeout, command-discipline, project-not-found, stack-mismatch, tool-violation, validation-failed | 143 | 928.5s |  |  | 0 | 0/13 | — | — |  |  |  |  | 
