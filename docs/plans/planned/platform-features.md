# Platform Features

CLI-level and DX improvements that go beyond adding libraries. This file now tracks what remains
after MCP, add/history, dry-run, cross-ecosystem stack graph, and preview support shipped.

---

## ~~MCP Server (Model Context Protocol)~~ ✅ Done

Implemented in `apps/cli/src/mcp.ts`. Subcommand: `create-better-fullstack mcp` (stdio transport). Exposes `bfs_get_guidance`, `bfs_get_schema`, `bfs_plan_project`, `bfs_create_project`, `bfs_add_feature`, etc.

---

## ~~MCP Addon~~ ✅ Done

Implemented in `apps/cli/src/helpers/addons/mcp-setup.ts`. Auto-configures MCP servers (Convex, shadcn, Next Devtools, Nuxt Docs, Svelte Docs, Astro Docs, Cloudflare Docs, Polar, etc.) for 9+ AI agents (Cursor, Claude Code, VS Code, Zed, etc.).

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

## ~~Cross-Ecosystem Stacks~~ ✅ Done

Allow combining ecosystems in a single monorepo (e.g., Rust backend + TypeScript frontend).

- [x] Research and implement graph-based cross-ecosystem stacks
  - Rust API server + React/Svelte/Vue frontend
  - Go API server + React frontend
  - Python FastAPI + React frontend
  - Shared monorepo with language-specific workspaces

Implemented through stack graph parts (`--part role:ecosystem:tool`) and multi-ecosystem projection in
`packages/types/src/stack-translation.ts`, `packages/types/src/stack-graph.ts`, the CLI command
generator, and the web builder.

---

## ~~Dry Run Mode~~ ✅ Done

Implemented via `--dry-run` flag on the `create` command. Generates project in-memory using `generateVirtualProject()`, displays full file tree and file/directory counts, then exits without writing to disk. Reproducible command is also shown.

---

## ~~Template Preview~~ ✅ Done

Show generated code in the web builder before scaffolding.

- [x] Enhance web builder with file preview
  - Show key generated files (main app, config, env) based on stack selection
  - Allow users to inspect code before running CLI
  - Implemented through `/api/preview` and browser-safe virtual generation

---

## Post-Scaffold Upgrade Engine

The next major platform feature is `bfs update` / `bfs check`: diff-aware template re-application
against an existing `bts.jsonc` stack, with reviewable file changes and CI drift checks.

- [ ] Record enough scaffold metadata to know the generator/template version used
- [ ] Compare current generated output against the latest template output without overwriting user code
- [ ] Produce a reviewable patch or update plan
- [ ] Add a CI-friendly `bfs check` mode that reports template drift
- [ ] Share conflict detection with MCP stack-update apply logic

---

## Doctor / Health Command

Turn the existing verification and ScaffBench learnings into a local command users can run inside a
generated project.

- [ ] Add `bfs doctor` or `create-better-fullstack doctor --project-dir`
- [ ] Validate `bts.jsonc`, dependency/package-manager consistency, required env vars, and generated scripts
- [ ] Run the narrowest generated-project checks available for the selected ecosystem
- [ ] Return structured JSON for agents and CI

---

## Public Verified-Combination Status

Better Fullstack already has release guard, schema/template coverage, smoke presets, and ScaffBench
2. The product gap is making that quality visible and trustworthy.

- [ ] Generate a public status artifact from smoke/ScaffBench/release results
- [ ] Publish a verified-combinations page or badge
- [ ] Make failures actionable by linking spec, stack command, logs, and owning template area

---

## Priority Order (remaining)

1. **Post-scaffold upgrade engine** — next major moat feature
2. **Public verified-combination status** — turns quality work into product trust
3. **Doctor / health command** — agent-friendly generated-project diagnostics
4. **Prompt-to-stack builder assistant** — natural language to validated stack
