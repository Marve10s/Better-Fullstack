# ScaffBench reports

ScaffBench measures how well AI coding agents **start real full-stack projects**. Not edit existing
code, but scaffold a working project from scratch. The core question: does the generated project
actually install and build?

This directory holds the open-sourced run reports for the current suite. Reports from suites 1, 2,
and 2.1 were removed when suite 3.0 reset the protocol. Their numbers are not comparable to 3.0
results, so keeping them here invited apples-to-oranges reading. Recover them from git history if
you need them.

```
benchmarks/
  <model>-<effort>/  one folder per published run of suite 3.0
```

Each run folder contains:

- **`summary.json`**: the aggregate leaderboard, per-spec cells (`bySpecCell`), and per-run results
  (validation steps, wired-libraries score, cost, tokens).
- **`summary.md`**: a human-readable version of the same.

## What's not here

The raw generated projects and their build artifacts (`node_modules`, cargo/target, .venv) run to
roughly 16 GB and stay out of the repo. These reports are the scored summaries. The numbers, not the
gigabytes.

## How runs are scored

- **Core pass@1**: does the project install, build, type-check, and native-compile (`cargo check`,
  `go build`, `dotnet build`, `mvn`, `mix`)? Everything hinges on this.
- **Full pass@1**: the headline. Core, plus every applicable quality gate (lint, format, tests) green
  on a clean machine.
- **Wired libraries**: did the agent actually use the libraries the spec calls for? Scored against
  the dependencies, imports, and files present in the generated tree, not names it mentioned.
  Trap and restraint markers (a forbidden ORM, a forbidden build tool) live in the same score.
- **Index** (0-100): the board's sort key. Every spec earns a graded score, 0.6 for a Core pass,
  0.2 for the share of lint and format gates green, and 0.2 for wired libraries. Tests are not
  scored, since the harness can only run the tests the model wrote. The index is the mean of those
  scores weighted by spec difficulty (1 easy, 2 hard, 3 frontier, pinned in each spec), times 100.
  Cost, time, and lines of code are shown beside the index and never enter it.
- **Run outcome**: every run is `success`, `model-failure`, or `infra-inconclusive`. Toolchain stalls
  and un-measurable runs are excluded from the rate. A generation timeout counts as a model failure,
  as in SWE-bench.

Suite 3.0 scores the prompt path only: no scaffolder, the agent hand-writes every file. That is the
purest measure of raw capability.

The live board is at [better-fullstack.com/benchmark](https://better-fullstack.com/benchmark).
