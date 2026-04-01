# Platform Features

CLI-level and DX improvements that go beyond adding libraries. These are structural features that improve the scaffolding experience.

---

## MCP Server (Model Context Protocol)

better-t-stack ships their CLI as an MCP server. AI agents (Claude Code, Cursor, Cline, Codex, etc.) can programmatically scaffold projects via MCP protocol.

- [ ] Implement MCP server mode for the CLI
  - Expose tools: `get_stack_guidance`, `get_schema`, `plan_project`, `create_project`
  - Allow AI agents to scaffold projects without manual CLI interaction
  - Register in MCP server directories

### Implementation
- New file: `apps/cli/src/mcp.ts`
- Use `@modelcontextprotocol/sdk` to expose tools
- Map existing CLI create logic to MCP tool handlers
- Add `--mcp` flag to start server mode

---

## MCP Addon

Auto-configure MCP servers for project tools into AI coding agents.

- [ ] Add MCP addon that installs MCP server configs for project dependencies
  - Map: drizzle, prisma, convex, supabase, better-auth, neon, etc. to their MCP servers
  - Target agents: Claude Code, Cursor, Cline, Codex, VS Code, Zed, etc.
  - Generate `.cursor/mcp.json`, `.claude/settings.json`, etc.

### Implementation
- Add `mcp` to `AppPlatformsSchema` (already exists in schema)
- Generate agent-specific config files based on stack choices
- Maintain registry of known MCP servers per dependency

---

## Skills Addon

Install curated AI coding agent skills/instructions.

- [ ] Add skills addon that installs agent instruction files
  - Sources: shadcn/ui, better-auth, prisma, hono, nuxt-ui, expo, clerk, etc.
  - Target agents: Claude Code (CLAUDE.md), Cursor (.cursorrules), Cline, etc.
  - Download from curated skill repositories

### Implementation
- Add `skills` to `AppPlatformsSchema` (already exists in schema)
- Map stack choices to relevant skill sources
- Generate/merge instruction files per agent

---

## `add` Command

Add features/addons to existing projects after initial scaffold.

- [ ] Implement `bfs add` command
  - Detect existing project config (read `.better-fullstack.json` or infer from files)
  - Allow adding: search, caching, auth, payments, email, etc. to an existing project
  - Modify package.json, add templates, update env files incrementally

### Implementation
- New command: `apps/cli/src/commands/add.ts`
- Project detection: scan for existing config markers
- Incremental template application: generate only new files, merge into existing package.json
- Critical: must not overwrite existing user modifications

---

## `history` Command

View and reproduce past scaffolded projects.

- [ ] Implement `bfs history` command
  - Store scaffold configs locally (in `~/.better-fullstack/history/`)
  - Show list of past projects with dates
  - Allow re-running any past scaffold command

### Implementation
- Save config JSON after each successful scaffold
- New command: `apps/cli/src/commands/history.ts`
- Output reproducible CLI command per entry

---

## Project Config File

Store scaffold configuration in each generated project.

- [ ] Generate `.better-fullstack.json` in every scaffolded project
  - Contains full config used to create the project
  - Enables `add` command to understand existing stack
  - Enables reproducible scaffolding

### Implementation
- Write config file as last step in `generator.ts`
- Include version, timestamp, full config object
- Used by `add` command for project detection

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

## Priority Order

1. **Project config file** (`.better-fullstack.json`) — prerequisite for `add` command
2. **`add` command** — highest impact DX feature, competitive gap
3. **MCP server** — AI-native scaffolding, major differentiator
4. **`--dry-run`** — simple, high value
5. **MCP addon** — AI agent integration
6. **Skills addon** — AI agent skills
7. **`history` command** — nice DX touch
8. **Cross-ecosystem stacks** — research phase only
9. **Template preview** — enhance existing web builder
