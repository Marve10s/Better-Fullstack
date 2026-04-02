# Better-Fullstack MCP Server

[MCP](https://modelcontextprotocol.io) server for scaffolding fullstack projects with AI agents. Supports TypeScript, Rust, Python, and Go ecosystems with 270+ configurable options.

Works with Claude Code, Cursor, VS Code Copilot, Windsurf, Claude Desktop, Zed, Cline, and any MCP-compatible client.

## Setup

**Claude Code:**

```bash
claude mcp add --transport stdio better-fullstack -- npx create-better-fullstack mcp
```

**Cursor** (`.cursor/mcp.json`):

```json
{
  "mcpServers": {
    "better-fullstack": {
      "command": "npx",
      "args": ["-y", "create-better-fullstack", "mcp"]
    }
  }
}
```

**VS Code** (`.vscode/mcp.json`):

```json
{
  "servers": {
    "better-fullstack": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "create-better-fullstack", "mcp"]
    }
  }
}
```

<details>
<summary>Claude Desktop, Windsurf, Zed, Cline</summary>

**Claude Desktop** (`claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "better-fullstack": {
      "command": "npx",
      "args": ["-y", "create-better-fullstack", "mcp"]
    }
  }
}
```

**Windsurf** (`~/.codeium/windsurf/mcp_config.json`):

```json
{
  "mcpServers": {
    "better-fullstack": {
      "command": "npx",
      "args": ["-y", "create-better-fullstack", "mcp"]
    }
  }
}
```

**Zed** (`settings.json`):

```json
{
  "context_servers": {
    "better-fullstack": {
      "command": {
        "path": "npx",
        "args": ["-y", "create-better-fullstack", "mcp"]
      }
    }
  }
}
```

**Cline / Roo Code** (MCP settings):

```json
{
  "mcpServers": {
    "better-fullstack": {
      "command": "npx",
      "args": ["-y", "create-better-fullstack", "mcp"]
    }
  }
}
```

</details>

## Tools

### Discovery

- **`bfs_get_guidance`** — Returns workflow rules, field semantics, and critical constraints. Call this first.
- **`bfs_get_schema`** — Returns valid options for any or all configuration categories (50+ categories across all ecosystems).
- **`bfs_check_compatibility`** — Validates a stack combination and returns auto-adjusted selections with warnings.

### Project Creation

- **`bfs_plan_project`** — Dry-run: generates a project in-memory and returns the file tree without writing to disk.
- **`bfs_create_project`** — Scaffolds a new project to disk. Requires `projectName` (kebab-case). Dependencies are **not** installed — tell the user to run install manually.

### Existing Projects

- **`bfs_plan_addition`** — Validates proposed addons against an existing project's `bts.jsonc` config.
- **`bfs_add_feature`** — Adds addons/features to an existing project.

## Resources

- **`docs://compatibility-rules`** — Which frontend/backend/API/ORM combinations are valid.
- **`docs://stack-options`** — All available technology options per category.
- **`docs://getting-started`** — Quick-start recipes for each ecosystem.

## Usage

Once registered, describe what you want in natural language:

> "Create a fullstack TypeScript app with TanStack Router, Hono, Drizzle, and PostgreSQL"

> "Scaffold a Rust API with Axum and SQLx"

> "Add Biome and Turborepo to my existing project"

The agent calls `bfs_get_guidance` → `bfs_check_compatibility` → `bfs_plan_project` → `bfs_create_project` automatically.

## Tips

- **`frontend` is an array** — supports multiple frontends in one monorepo (e.g., `["next", "native-bare"]`).
- **`"none"` means skip** — it disables a feature entirely, not "use the default".
- **Set `ecosystem` first** — it determines which fields are relevant. TypeScript fields are ignored for Rust/Python/Go and vice versa.
- **Dependencies are never installed** — the server skips install to avoid timeouts. After scaffolding, run `cd <project> && bun install` (or your package manager).
- **Call `bfs_check_compatibility` before creating** — it auto-fixes invalid combos (e.g., tRPC + Svelte → oRPC) and returns warnings.

## License

MIT
