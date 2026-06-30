// AUTO-GENERATED from the ScaffBench V2.1 run summaries (see scripts/build-scaffbench-2-1-data.ts).
// V2.1 is the expanded 13-spec suite (adds Java + Elixir ecosystems and two
// prompt-only frontier specs; .NET validated for real). First run: Claude Opus
// 4.8 at low effort, Prompt path only — a single-agent ablation on the new suite,
// so the leaderboard shows one model row until more configs are run. Per-cell
// signals from the harness bySpecCell aggregate; corePass derived from validation
// steps minus the quality gate; steps from the saved trajectory; cost metered.
import type { ScaffbenchCell, ScaffbenchModel } from "./scaffbench-2-data";

export const SCAFFBENCH21_META = {
  harnessVersion: "2.0.0",
  generatorVersion: "2.1.3",
  generatedAt: "2026-06-30T13:37:52.148Z",
  indexWeights: { macroPass: 0.6, wired: 0.25, cmd: 0.15 },
} as const;

export const SCAFFBENCH21_SPECS = ["ai-search-workbench","rust-leptos-axum","python-ingestion-api","go-realtime-api","multi-dotnet-ops","ts-svelte-edge-orpc","dotnet-blazor-cqrs","multi-ts-go-grpc","java-spring-jooq-keycloak","elixir-broadway-absinthe","react-native-expo","frontier-polyglot-proto","frontier-effect-eventsourcing"] as const;

export const SCAFFBENCH21_MODELS: readonly ScaffbenchModel[] = [
  {
    "key": "claude-opus-4-8|low",
    "model": "claude-opus-4-8",
    "effort": "low",
    "effectiveReasoning": "low",
    "provider": "claude",
    "label": "Opus 4.8",
    "sortIndex": 52
  }
];

export const SCAFFBENCH21_CELLS: readonly ScaffbenchCell[] = [
  {
    "modelKey": "claude-opus-4-8|low",
    "path": "prompt",
    "spec": "ai-search-workbench",
    "scored": true,
    "corePass": false,
    "fullPass": false,
    "wiredPct": 90,
    "cmdPct": 100,
    "costUsd": 3.0851255,
    "outTokens": 35195,
    "steps": 73
  },
  {
    "modelKey": "claude-opus-4-8|low",
    "path": "prompt",
    "spec": "rust-leptos-axum",
    "scored": true,
    "corePass": false,
    "fullPass": false,
    "wiredPct": 92,
    "cmdPct": 100,
    "costUsd": 1.030279,
    "outTokens": 14078,
    "steps": 26
  },
  {
    "modelKey": "claude-opus-4-8|low",
    "path": "prompt",
    "spec": "python-ingestion-api",
    "scored": true,
    "corePass": true,
    "fullPass": true,
    "wiredPct": 100,
    "cmdPct": 100,
    "costUsd": 1.542961,
    "outTokens": 18772,
    "steps": 42
  },
  {
    "modelKey": "claude-opus-4-8|low",
    "path": "prompt",
    "spec": "go-realtime-api",
    "scored": true,
    "corePass": true,
    "fullPass": true,
    "wiredPct": 92,
    "cmdPct": 100,
    "costUsd": 1.736254,
    "outTokens": 26363,
    "steps": 36
  },
  {
    "modelKey": "claude-opus-4-8|low",
    "path": "prompt",
    "spec": "multi-dotnet-ops",
    "scored": true,
    "corePass": true,
    "fullPass": false,
    "wiredPct": 92,
    "cmdPct": 100,
    "costUsd": 1.64473,
    "outTokens": 21178,
    "steps": 42
  },
  {
    "modelKey": "claude-opus-4-8|low",
    "path": "prompt",
    "spec": "ts-svelte-edge-orpc",
    "scored": true,
    "corePass": false,
    "fullPass": false,
    "wiredPct": 100,
    "cmdPct": 100,
    "costUsd": 1.45217525,
    "outTokens": 18532,
    "steps": 38
  },
  {
    "modelKey": "claude-opus-4-8|low",
    "path": "prompt",
    "spec": "dotnet-blazor-cqrs",
    "scored": true,
    "corePass": false,
    "fullPass": false,
    "wiredPct": 100,
    "cmdPct": 100,
    "costUsd": 1.323207,
    "outTokens": 17874,
    "steps": 33
  },
  {
    "modelKey": "claude-opus-4-8|low",
    "path": "prompt",
    "spec": "multi-ts-go-grpc",
    "scored": true,
    "corePass": false,
    "fullPass": false,
    "wiredPct": 94,
    "cmdPct": 100,
    "costUsd": 2.031828,
    "outTokens": 28724,
    "steps": 44
  },
  {
    "modelKey": "claude-opus-4-8|low",
    "path": "prompt",
    "spec": "java-spring-jooq-keycloak",
    "scored": true,
    "corePass": false,
    "fullPass": false,
    "wiredPct": 100,
    "cmdPct": 100,
    "costUsd": 1.41092675,
    "outTokens": 23301,
    "steps": 27
  },
  {
    "modelKey": "claude-opus-4-8|low",
    "path": "prompt",
    "spec": "elixir-broadway-absinthe",
    "scored": true,
    "corePass": false,
    "fullPass": false,
    "wiredPct": 100,
    "cmdPct": 100,
    "costUsd": 3.01265125,
    "outTokens": 36376,
    "steps": 66
  },
  {
    "modelKey": "claude-opus-4-8|low",
    "path": "prompt",
    "spec": "react-native-expo",
    "scored": true,
    "corePass": false,
    "fullPass": false,
    "wiredPct": 88,
    "cmdPct": 100,
    "costUsd": 0.86470075,
    "outTokens": 10886,
    "steps": 24
  },
  {
    "modelKey": "claude-opus-4-8|low",
    "path": "prompt",
    "spec": "frontier-polyglot-proto",
    "scored": true,
    "corePass": false,
    "fullPass": false,
    "wiredPct": 75,
    "cmdPct": 100,
    "costUsd": 0.86831175,
    "outTokens": 12045,
    "steps": 22
  },
  {
    "modelKey": "claude-opus-4-8|low",
    "path": "prompt",
    "spec": "frontier-effect-eventsourcing",
    "scored": true,
    "corePass": false,
    "fullPass": false,
    "wiredPct": 100,
    "cmdPct": 100,
    "costUsd": 0.802224,
    "outTokens": 13824,
    "steps": 15
  }
];
