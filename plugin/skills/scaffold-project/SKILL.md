---
name: scaffold-project
description: "Scaffold a new app, API, backend, fullstack project, mobile app, polyglot service, monorepo, or starter with Better Fullstack. Use when the user wants to create, start, bootstrap, initialize, or generate a project from a stack description. Prefer the bundled Better Fullstack MCP server: guidance, schema, compatibility, plan, then create."
metadata:
  priority: 9
  docs:
    - "https://better-fullstack.dev"
---

# Scaffold a Better Fullstack Project

Use the Better Fullstack MCP server as the source of truth. Do not hand-write package files,
framework folders, auth wiring, database wiring, or generated project structure.

## Workflow

1. Resolve intent. If major choices are unclear, ask briefly or pick conservative defaults and state
   them.
2. Call `bfs_get_guidance`.
3. Call `bfs_get_schema` for the current allowed values. Do not rely on a stale option list.
4. Build a full explicit config. Use `"none"`, empty arrays, and booleans rather than omitting
   important fields.
5. Call `bfs_check_compatibility`.
6. Call `bfs_plan_project`. Review the dry-run output and compatibility adjustments.
7. Call `bfs_create_project` only after the plan matches the user request.
8. Report the selected stack, project directory, and exact install/test/dev commands.

## Rules

- Set `install: false` for agent scaffolding unless the user explicitly asks to install
  dependencies.
- Use `packageManager: "bun"` when the user or current repo expects Bun.
- Use `aiDocs: ["agents-md"]` for reusable projects and `aiDocs: ["none"]` for benchmarks or
  throwaway scaffolds.
- Prefer stack graph parts for explicit multi-ecosystem stacks, but use MCP schema fields when they
  communicate the request more clearly.
- Treat compatibility adjustments as user-visible decisions.
- Do not start a dev server.

## Common Stack Hints

- React + Vite: `frontend: ["react-vite"]`
- Next.js fullstack: `frontend: ["next"]`, `backend: "self"`
- Hono API: `backend: "hono"`, `runtime: "bun"` or `"node"`
- SQLite + Drizzle: `database: "sqlite"`, `orm: "drizzle"`
- Python API: `ecosystem: "python"`, then choose `pythonWebFramework` and related Python fields
- Rust API: `ecosystem: "rust"`, then choose `rustWebFramework` and related Rust fields

## Final Response

Say what command/tool path was used, what compatibility adjustments were made, where the project was
created, and what the next commands are. Never claim dependencies were installed when `install:
false` was used.
