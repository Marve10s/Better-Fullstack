# ScaffBench reports

ScaffBench measures how well AI coding agents **start real full-stack projects** — not edit existing
code, but scaffold a working project from scratch. The core question across every version: *does the
generated project actually install and build?*

This directory holds the open-sourced run reports, organized by benchmark version.

```
benchmarks/
  v1/     cross-vendor build-pass sweep (reconstructed — see below)
  v2/     5-spec depth benchmark, 3 creation paths, June 2026
  v2.1/   13-spec expanded suite across 8 ecosystems, prompt path
```

Each version folder contains:

- **`<model>-<effort>/summary.json`** — one report per run: the aggregate leaderboard, per-spec cells
  (`bySpecCell`), and per-run results (validation steps, wired-libraries score, cost, tokens).
- **`<model>-<effort>/summary.md`** — a human-readable version of the same.
- **`specs.json`** — the spec definitions for that version (the projects each model was asked to build).

## What's *not* here

The raw generated projects and their build artifacts (`node_modules`, cargo/target, .venv, etc.) run to
~16 GB and stay out of the repo. These reports are the **scored summaries** — the numbers, not the
gigabytes. v1's raw artifacts are no longer retained, so `v1/` is **reconstructed** from the published
aggregate results and labeled as such.

## How runs are scored

- **CORE pass@1** — the headline: does the project install, build, type-check, and native-compile
  (`cargo check`, `go build`, `dotnet build`, `mvn`, `mix`)? Everything hinges on this.
- **Wired libraries** — did the agent actually *use* the libraries the spec calls for, scored against
  the dependencies / imports / files present in the generated tree (not just names it mentioned)?
- **Run outcome** — every run is `success`, `model-failure`, or `infra-inconclusive`. Toolchain stalls
  and un-measurable runs are excluded from the rate; a generation timeout counts as a model failure
  (as in SWE-bench).

## Creation paths

- **prompt** — no scaffolder; the agent hand-writes every file. The purest measure of raw capability.
- **mcp** — the agent scaffolds through the Better-Fullstack MCP tools.
- **cli** — the agent composes the Better-Fullstack CLI command.

See the [ScaffBench blog posts](https://better-fullstack.com/blog/scaffbench) for the write-ups.
