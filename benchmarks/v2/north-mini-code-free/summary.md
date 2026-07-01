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
opencode/north-mini-code-free | default |  | cli | 73 | 3/4 | 0 | 75% | 3/4 | 3/4 | n<8 | 53% | 93% | — | 100% | 397.6s / 1163.9s | 15995 | 0.000 | claude-error:2, claude-timeout:1, stack-mismatch:3, build-failed:1, format-failed:1, lint-failed:1, test-failed:1, validation-failed:1
opencode/north-mini-code-free | default |  | mcp | 64 | 2/4 | 1/5 | 50% | 2/5 | 2/5 | n<8 | 80% | 96% | — | 90% | 44.5s / 900.0s | 2419 | 0.000 | format-failed:1, lint-failed:2, validation-failed:3, claude-error:1, claude-timeout:1, command-discipline:1, project-not-found:1, stack-mismatch:1, tool-violation:1
opencode/north-mini-code-free | default |  | prompt | 53 | 2/4 | 0 | 50% | 2/4 | 2/4 | n<8 | 30% | — | — | 100% | 247.3s / 900.0s | 17783 | 0.000 | install-failed:1, stack-mismatch:4, validation-failed:2, build-failed:1, format-failed:1, lint-failed:1, test-failed:1, claude-error:1, claude-timeout:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
ai-search-workbench | 1 | default |  | opencode/north-mini-code-free | mcp | pass |  | 0 | 97.4s | 4596 | 0.000 | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
ai-search-workbench | 1 | default |  | opencode/north-mini-code-free | cli | pass | claude-error, claude-timeout, stack-mismatch | null | 1163.9s | 4700 | 0.000 | 10 | 2/21 | — | — |  |  |  |  | 
ai-search-workbench | 1 | default |  | opencode/north-mini-code-free | prompt | fail | install-failed, stack-mismatch, validation-failed | 0 | 118.2s | 9966 | 0.000 | 10 | 2/21 | — | — | 1 |  |  |  | 
rust-leptos-axum | 1 | default |  | opencode/north-mini-code-free | mcp | fail | format-failed, lint-failed, validation-failed | 0 | 44.5s | 1931 | 0.000 | 100 | 12/12 | 21/22 | — |  | 0 |  | 101 | 0
rust-leptos-axum | 1 | default |  | opencode/north-mini-code-free | cli | fail | build-failed, format-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 572.8s | 35784 | 0.000 | 92 | 11/12 | — | — |  | 101 |  | 101 | 101
rust-leptos-axum | 1 | default |  | opencode/north-mini-code-free | prompt | fail | build-failed, format-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 247.3s | 13457 | 0.000 | 92 | 11/12 | — | — |  | 101 |  | 101 | 101
python-ingestion-api | 1 | default |  | opencode/north-mini-code-free | mcp | fail | lint-failed, validation-failed | 0 | 35.2s | 1659 | 0.000 | 100 | 13/13 | 17/18 | — | 0 |  | 0 | 1 | 0
python-ingestion-api | 1 | default |  | opencode/north-mini-code-free | cli | pass | claude-error, stack-mismatch | null | 397.6s | 19125 | 0.000 | 8 | 1/13 | — | — |  |  |  |  | 
python-ingestion-api | 1 | default |  | opencode/north-mini-code-free | prompt | pass | stack-mismatch | 0 | 557.2s | 37567 | 0.000 | 8 | 1/13 | — | — |  |  |  |  | 
go-realtime-api | 1 | default |  | opencode/north-mini-code-free | mcp | pass |  | 0 | 26.9s | 1491 | 0.000 | 100 | 13/13 | 14/15 | — | 0 | 0 |  | 0 | 0
go-realtime-api | 1 | default |  | opencode/north-mini-code-free | cli | pass |  | 0 | 57.2s | 4372 | 0.000 | 100 | 13/13 | 14/15 | — | 0 | 0 |  | 0 | 0
go-realtime-api | 1 | default |  | opencode/north-mini-code-free | prompt | pass | claude-error, claude-timeout, stack-mismatch | null | 900.0s | 10140 | 0.000 | 8 | 1/13 | — | — |  |  |  |  | 
multi-dotnet-ops | 1 | default |  | opencode/north-mini-code-free | mcp | inconclusive | claude-error, claude-timeout, command-discipline, project-not-found, stack-mismatch, tool-violation, validation-failed | null | 900.0s |  |  | 0 | 0/13 | — | — |  |  |  |  | 
