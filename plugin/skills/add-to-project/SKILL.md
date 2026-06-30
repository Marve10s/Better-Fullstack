---
name: add-to-project
description: Add capabilities, addons, deployment targets, generated CI, services, or stack updates to an existing Better Fullstack project. Use when the current repo has bts.jsonc or the user asks to extend a generated project. Prefer bfs_plan_stack_update and bfs_apply_stack_update; use legacy addon tools only for addon/deploy-only flows.
metadata:
  priority: 8
  docs:
    - "https://better-fullstack.dev"
---

# Add to an Existing Better Fullstack Project

Use the Better Fullstack MCP server for existing-project updates. Do not hand-edit generated stack
metadata or guess which template files belong to a capability.

## Workflow

1. Confirm the project directory and ensure it contains `bts.jsonc`.
2. Call `bfs_get_guidance` and `bfs_get_schema`.
3. For capability changes, call `bfs_plan_stack_update` with the target `projectDir` and requested
   stack fields.
4. Review the preview, including blockers, file changes, dependency changes, env changes, and
   compatibility adjustments.
5. Call `bfs_apply_stack_update` only when the plan is acceptable.
6. For legacy addon/deploy-only changes, call `bfs_plan_addition` before `bfs_add_feature`.
7. Report changed files and the exact install/test commands.

## Rules

- Keep update semantics preview-first.
- Prefer additive updates first: generated CI, docs, observability, email, search, vector DB, file
  storage, rate limiting, and mobile capabilities.
- Treat database, ORM, auth, API, and payment-provider swaps as risky and make compatibility changes
  explicit.
- Set installs disabled unless the user asks for dependency installation.
- Do not start a dev server.
