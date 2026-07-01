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
kilo/nvidia/nemotron-3-super-120b-a12b:free | default |  | prompt | 44 | 2/5 | 0 | 40% | 2/5 | 2/5 | n<8 | 21% | — | — | 100% | 827.5s / 900.0s | 16993 | 0.000 | claude-error:1, claude-timeout:1, install-failed:1, stack-mismatch:5, validation-failed:3, build-failed:1, format-failed:1, lint-failed:2, test-failed:2
kilo/nvidia/nemotron-3-super-120b-a12b:free | default |  | cli | 44 | 1/4 | 1/5 | 25% | 1/5 | 1/5 | n<8 | 60% | 95% | — | 93% | 127.3s / 430.2s | 11458 | 0.000 | stack-mismatch:3, build-failed:2, format-failed:2, lint-failed:2, test-failed:2, validation-failed:4, typecheck-failed:1, command-discipline:1, project-not-found:1, tool-violation:1, toolchain-missing:1
kilo/nvidia/nemotron-3-super-120b-a12b:free | default |  | mcp | 26 | 0/4 | 1/5 | 0% | 0/5 | 0/5 | n<8 | 54% | 83% | — | 80% | 145.7s / 324.5s | 7874 | 0.000 | build-failed:1, format-failed:1, typecheck-failed:3, validation-failed:5, command-discipline:2, project-not-found:2, stack-mismatch:4, tool-violation:2, lint-failed:1, test-failed:1, toolchain-missing:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
ai-search-workbench | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | mcp | fail | build-failed, format-failed, typecheck-failed, validation-failed | 0 | 145.7s | 6868 | 0.000 | 100 | 21/21 | 23/24 | — | 0 | 127 | 127 | 0 | 0
ai-search-workbench | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | cli | pass | stack-mismatch | 0 | 430.2s | 32106 | 0.000 | 10 | 2/21 | — | — |  |  |  |  | 
ai-search-workbench | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | prompt | fail | claude-error, claude-timeout, install-failed, stack-mismatch, validation-failed | null | 900.0s | 21307 | 0.000 | 29 | 6/21 | — | — | 1 |  |  |  | 
rust-leptos-axum | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | mcp | fail | command-discipline, project-not-found, stack-mismatch, tool-violation, validation-failed | 0 | 121.1s | 3566 | 0.000 | 0 | 0/12 | — | — |  |  |  |  | 
rust-leptos-axum | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | cli | fail | build-failed, format-failed, lint-failed, test-failed, validation-failed | 0 | 151.5s | 13010 | 0.000 | 100 | 12/12 | 21/22 | — |  | 101 |  | 101 | 101
rust-leptos-axum | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | prompt | fail | build-failed, format-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 460.3s | 24721 | 0.000 | 58 | 7/12 | — | — |  | 101 |  | 101 | 101
python-ingestion-api | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | mcp | fail | lint-failed, stack-mismatch, test-failed, typecheck-failed, validation-failed | 0 | 324.5s | 18773 | 0.000 | 92 | 12/13 | 16/18 | — | 0 |  | 2 | 2 | 2
python-ingestion-api | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | cli | fail | lint-failed, test-failed, typecheck-failed, validation-failed | 0 | 127.3s | 6291 | 0.000 | 100 | 13/13 | 17/18 | — | 0 |  | 2 | 2 | 2
python-ingestion-api | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | prompt | pass | stack-mismatch | 0 | 877.9s | 14656 | 0.000 | 8 | 1/13 | — | — |  |  |  |  | 
go-realtime-api | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | mcp | fail | command-discipline, project-not-found, stack-mismatch, tool-violation, validation-failed | 0 | 27.3s | 154 | 0.000 | 0 | 0/13 | — | — |  |  |  |  | 
go-realtime-api | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | cli | fail | command-discipline, project-not-found, stack-mismatch, tool-violation, validation-failed | 0 | 19.7s | 580 | 0.000 | 0 | 0/13 | — | — |  |  |  |  | 
go-realtime-api | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | prompt | fail | lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 827.5s | 9073 | 0.000 | 8 | 1/13 | — | — | 0 | 0 |  | 1 | 1
multi-dotnet-ops | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | mcp | inconclusive | stack-mismatch, toolchain-missing, typecheck-failed, validation-failed | 0 | 213.5s | 10009 | 0.000 | 77 | 10/13 | 12/19 | — | 127 |  | 1 | 0 | 0
multi-dotnet-ops | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | cli | inconclusive | build-failed, format-failed, stack-mismatch, toolchain-missing, validation-failed | 0 | 86.5s | 5301 | 0.000 | 92 | 12/13 | 18/19 | — | 127 | 127 | 0 | 0 | 0
multi-dotnet-ops | 1 | default |  | kilo/nvidia/nemotron-3-super-120b-a12b:free | prompt | pass | stack-mismatch | 0 | 305.7s | 15207 | 0.000 | 0 | 0/13 | — | — |  |  |  |  | 
