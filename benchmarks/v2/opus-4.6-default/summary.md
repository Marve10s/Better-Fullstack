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
claude-opus-4-6 | default | high | cli | 70 | 2/4 | 1/5 | 50% | 2/5 | 2/5 | n<8 | 100% | 95% | — | 100% | 106.2s / 291.8s | 5765 | 0.668 | format-failed:1, lint-failed:2, validation-failed:3, toolchain-missing:1
claude-opus-4-6 | default | high | mcp | 69 | 2/4 | 1/5 | 50% | 2/5 | 2/5 | n<8 | 97% | 85% | — | 100% | 52.5s / 251.9s | 4596 | 0.966 | format-failed:1, lint-failed:2, validation-failed:3, stack-mismatch:1, toolchain-missing:1
claude-opus-4-6 | default | high | prompt | 34 | 0/5 | 0 | 0% | 0/5 | 0/5 | n<8 | 75% | — | — | 100% | 250.1s / 445.8s | 24461 | 1.334 | build-failed:2, doctor-failed:1, lint-failed:2, stack-mismatch:4, test-failed:3, typecheck-failed:1, validation-failed:5, format-failed:1, install-failed:1, project-not-found:1

## Runs

| Spec | Trial | Effort | Effective reasoning | Model | Path | Validation | Failure tags | Claude exit | Time | Output tokens | Cost | Wired % | Wired | Faithful | Acceptance | Install | Build | Typecheck | Lint | Test |
| --- | ---: | --- | --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
ai-search-workbench | 1 | default | high | claude-opus-4-6 | prompt | fail | build-failed, doctor-failed, lint-failed, stack-mismatch, test-failed, typecheck-failed, validation-failed | 0 | 445.8s | 43940 | 2.059 | 90 | 19/21 | — | — | 0 | 1 | 2 | 1 | 1
ai-search-workbench | 1 | default | high | claude-opus-4-6 | mcp | pass |  | 0 | 50.2s | 2686 | 0.785 | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
ai-search-workbench | 1 | default | high | claude-opus-4-6 | cli | pass |  | 0 | 93.4s | 4252 | 0.546 | 100 | 21/21 | 24/24 | — | 0 | 0 | 0 | 0 | 0
rust-leptos-axum | 1 | default | high | claude-opus-4-6 | prompt | fail | build-failed, format-failed, lint-failed, stack-mismatch, test-failed, validation-failed | 0 | 153.4s | 13621 | 0.705 | 92 | 11/12 | — | — |  | 101 |  | 101 | 101
rust-leptos-axum | 1 | default | high | claude-opus-4-6 | mcp | fail | format-failed, lint-failed, validation-failed | 0 | 52.5s | 1847 | 0.746 | 100 | 12/12 | 22/22 | — |  | 0 |  | 101 | 0
rust-leptos-axum | 1 | default | high | claude-opus-4-6 | cli | fail | format-failed, lint-failed, validation-failed | 0 | 116.3s | 3664 | 0.496 | 100 | 12/12 | 21/22 | — |  | 0 |  | 101 | 0
python-ingestion-api | 1 | default | high | claude-opus-4-6 | prompt | fail | install-failed, validation-failed | 0 | 206.9s | 16992 | 0.914 | 100 | 13/13 | — | — | 1 |  |  |  | 
python-ingestion-api | 1 | default | high | claude-opus-4-6 | mcp | fail | lint-failed, validation-failed | 0 | 64.3s | 1945 | 0.744 | 100 | 13/13 | 18/18 | — | 0 |  | 0 | 1 | 0
python-ingestion-api | 1 | default | high | claude-opus-4-6 | cli | fail | lint-failed, validation-failed | 0 | 60.3s | 2181 | 0.430 | 100 | 13/13 | 16/18 | — | 0 |  | 0 | 1 | 0
go-realtime-api | 1 | default | high | claude-opus-4-6 | prompt | fail | stack-mismatch, test-failed, validation-failed | 0 | 250.1s | 24777 | 1.123 | 92 | 12/13 | — | — | 0 | 0 |  | 0 | 1
go-realtime-api | 1 | default | high | claude-opus-4-6 | mcp | pass |  | 0 | 51.7s | 1680 | 0.646 | 100 | 13/13 | 15/15 | — | 0 | 0 |  | 0 | 0
go-realtime-api | 1 | default | high | claude-opus-4-6 | cli | pass |  | 0 | 106.2s | 4467 | 0.579 | 100 | 13/13 | 14/15 | — | 0 | 0 |  | 0 | 0
multi-dotnet-ops | 1 | default | high | claude-opus-4-6 | prompt | fail | project-not-found, stack-mismatch, validation-failed | 0 | 362.3s | 22974 | 1.871 | 0 | 0/13 | — | — |  |  |  |  | 
multi-dotnet-ops | 1 | default | high | claude-opus-4-6 | mcp | inconclusive | stack-mismatch, toolchain-missing, validation-failed | 0 | 251.9s | 14822 | 1.912 | 85 | 11/13 | 5/19 | — | 127 |  |  |  | 
multi-dotnet-ops | 1 | default | high | claude-opus-4-6 | cli | inconclusive | toolchain-missing, validation-failed | 0 | 291.8s | 14260 | 1.288 | 100 | 13/13 | 19/19 | — | 127 | 0 | 0 | 0 | 0
