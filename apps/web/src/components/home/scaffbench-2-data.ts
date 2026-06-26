// AUTO-GENERATED from a ScaffBench 2 run summary.json (see scripts/build-benchmark-data.ts).
// Source run: opus48-default-2026-06-26 · model claude-opus-4-8 · effort default · 15 cells.
export type ScaffbenchPath = "mcp" | "cli" | "prompt";

export type ScaffbenchCell = {
  path: ScaffbenchPath;
  spec: string;
  /** false when the run timed out / produced no project (excluded from rates). */
  measured: boolean;
  corePass: boolean;
  fullPass: boolean;
  costUsd: number | null;
  outTokens: number | null;
  steps: number;
};

export const SCAFFBENCH2_META = {
  model: "claude-opus-4-8",
  effort: "default",
  harnessVersion: "2.0.0",
  generatorVersion: "2.1.1",
  generatedAt: "2026-06-26T00:56:27.088Z",
} as const;

export const SCAFFBENCH2_SPECS = ["ai-search-workbench","rust-leptos-axum","python-ingestion-api","go-realtime-api","multi-dotnet-ops"] as const;

export const SCAFFBENCH2_CELLS: readonly ScaffbenchCell[] = [
  {
    "path": "prompt",
    "spec": "ai-search-workbench",
    "measured": false,
    "corePass": false,
    "fullPass": false,
    "costUsd": null,
    "outTokens": null,
    "steps": 93
  },
  {
    "path": "mcp",
    "spec": "ai-search-workbench",
    "measured": true,
    "corePass": true,
    "fullPass": true,
    "costUsd": 1.2901379999999998,
    "outTokens": 7963,
    "steps": 9
  },
  {
    "path": "cli",
    "spec": "ai-search-workbench",
    "measured": true,
    "corePass": true,
    "fullPass": true,
    "costUsd": 1.0284950000000002,
    "outTokens": 14168,
    "steps": 10
  },
  {
    "path": "prompt",
    "spec": "rust-leptos-axum",
    "measured": true,
    "corePass": false,
    "fullPass": false,
    "costUsd": 3.5187459999999993,
    "outTokens": 56222,
    "steps": 42
  },
  {
    "path": "mcp",
    "spec": "rust-leptos-axum",
    "measured": true,
    "corePass": true,
    "fullPass": false,
    "costUsd": 1.1515914999999999,
    "outTokens": 5168,
    "steps": 6
  },
  {
    "path": "cli",
    "spec": "rust-leptos-axum",
    "measured": true,
    "corePass": true,
    "fullPass": false,
    "costUsd": 1.585712,
    "outTokens": 22347,
    "steps": 19
  },
  {
    "path": "prompt",
    "spec": "python-ingestion-api",
    "measured": true,
    "corePass": true,
    "fullPass": false,
    "costUsd": 2.316778999999999,
    "outTokens": 31262,
    "steps": 47
  },
  {
    "path": "mcp",
    "spec": "python-ingestion-api",
    "measured": true,
    "corePass": true,
    "fullPass": false,
    "costUsd": 1.1882139999999999,
    "outTokens": 6036,
    "steps": 8
  },
  {
    "path": "cli",
    "spec": "python-ingestion-api",
    "measured": true,
    "corePass": true,
    "fullPass": false,
    "costUsd": 0.7584619999999999,
    "outTokens": 8254,
    "steps": 11
  },
  {
    "path": "prompt",
    "spec": "go-realtime-api",
    "measured": true,
    "corePass": false,
    "fullPass": false,
    "costUsd": 4.242322,
    "outTokens": 62537,
    "steps": 59
  },
  {
    "path": "mcp",
    "spec": "go-realtime-api",
    "measured": true,
    "corePass": true,
    "fullPass": true,
    "costUsd": 1.2794015,
    "outTokens": 5119,
    "steps": 8
  },
  {
    "path": "cli",
    "spec": "go-realtime-api",
    "measured": true,
    "corePass": true,
    "fullPass": true,
    "costUsd": 1.1336225,
    "outTokens": 14881,
    "steps": 15
  },
  {
    "path": "prompt",
    "spec": "multi-dotnet-ops",
    "measured": false,
    "corePass": false,
    "fullPass": false,
    "costUsd": null,
    "outTokens": null,
    "steps": 30
  },
  {
    "path": "mcp",
    "spec": "multi-dotnet-ops",
    "measured": false,
    "corePass": false,
    "fullPass": false,
    "costUsd": null,
    "outTokens": null,
    "steps": 1
  },
  {
    "path": "cli",
    "spec": "multi-dotnet-ops",
    "measured": false,
    "corePass": false,
    "fullPass": false,
    "costUsd": null,
    "outTokens": null,
    "steps": 0
  }
];
