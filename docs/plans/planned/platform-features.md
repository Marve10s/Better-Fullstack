# Platform Features

CLI-level and DX improvements that go beyond adding libraries. These are structural features that improve the scaffolding experience.

---

## ~~MCP Server (Model Context Protocol)~~ ✅ Done

Implemented in `apps/cli/src/mcp.ts`. Subcommand: `create-better-fullstack mcp` (stdio transport). Exposes `bfs_get_guidance`, `bfs_get_schema`, `bfs_plan_project`, `bfs_create_project`, `bfs_add_feature`, etc.

---

## ~~MCP Addon~~ ✅ Done

Implemented in `apps/cli/src/helpers/addons/mcp-setup.ts`. Auto-configures MCP servers (Convex, shadcn, Next Devtools, Nuxt Docs, Svelte Docs, Astro Docs, Cloudflare Docs, Polar, etc.) for 9+ AI agents (Cursor, Claude Code, Codex, VS Code, Zed, etc.).

---

## ~~Skills Addon~~ ✅ Done

Implemented in `apps/cli/src/helpers/addons/skills-setup.ts`. 16 curated skill sources, 25+ target agents.

---

## ~~`add` Command~~ ✅ Done

Implemented in `apps/cli/src/helpers/core/add-handler.ts`. CLI: `create-better-fullstack add [options]`. Reads `bts.jsonc` config to detect existing stack.

---

## ~~`history` Command~~ ✅ Done

Implemented in `apps/cli/src/commands/history.ts`. Options: `--limit`, `--clear`, `--json`. Stores history in `~/.better-fullstack/history/`.

---

## ~~Project Config File~~ ✅ Done

Generates `bts.jsonc` (not `.better-fullstack.json`) in every scaffolded project. Contains full config with schema reference. Used by `add` command for project detection.

---

## Cross-Ecosystem Stacks

Allow combining ecosystems in a single monorepo (e.g., Rust backend + TypeScript frontend).

- [ ] Research feasibility of cross-ecosystem stacks
  - Rust API server + React/Svelte/Vue frontend
  - Go API server + React frontend
  - Python FastAPI + React frontend
  - Shared monorepo with language-specific workspaces

### Implementation challenges
- Template generators are currently isolated per ecosystem
- Would need a "mixed" ecosystem mode
- Shared env vars, docker-compose, workspace configuration
- This is a large architectural change — research first, implement later

---

## Dry Run Mode

Preview what would be generated without writing files.

- [ ] Add `--dry-run` flag
  - Show file tree that would be created
  - Show dependencies that would be added
  - Show env variables that would be generated
  - No filesystem writes

### Implementation
- VirtualFileSystem already exists — just skip the write step
- Output file list, dep list, env list to terminal

---

## Template Preview

Show generated code in the web builder before scaffolding.

- [ ] Enhance web builder with file preview
  - Show key generated files (main app, config, env) based on stack selection
  - Allow users to inspect code before running CLI
  - Already partially implemented via `/api/preview` endpoint

---

## Priority Order (remaining)

1. **`--dry-run`** — simple, high value (MCP has it via `bfs_plan_project`, CLI does not)
2. **Cross-ecosystem stacks** — research phase only
3. **Template preview** — enhance existing web builder
