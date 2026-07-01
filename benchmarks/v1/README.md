# ScaffBench 1

The original breadth benchmark: a **cross-vendor build-pass sweep** across 15 models and three creation
paths (prompt / MCP / CLI), asking one question — *does the generated project install and build?*

> **Reconstructed.** v1's raw per-run artifacts are no longer retained, so this folder is a structured
> summary of the published aggregate numbers (`summary.json` / `summary.md`), not raw runs. It's kept
> for continuity with v2 and v2.1.

## What it showed

Through the assisted paths (MCP / CLI) almost every model reached ~100% build-pass — the scaffolder does
the load-bearing work. On the **prompt path** (agent hand-writes everything) the field spread out, which
is exactly the gap ScaffBench 2 and 2.1 drill into with harder, multi-ecosystem specs.

See `summary.md` for the model-by-path table and `summary.json` for the full structured data.
