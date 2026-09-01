# Better Fullstack Plugin

Connect your coding agents to Better Fullstack so they scaffold and extend projects through the
official MCP server instead of hand-writing boilerplate.

## Install

One command detects the agents and editors on your machine and wires all of them at once, the MCP
server plus both skills:

```bash
npx create-better-fullstack@latest install
```

It covers Claude Code, Codex CLI, Gemini CLI, OpenCode, Cursor, Windsurf, and Zed. Claude Code,
Codex, and Gemini go through their own `mcp add` commands; the others get their config file
edited in place, with a timestamped backup written next to any file the installer touches and
unrelated keys left byte for byte as they were. Skills land in `~/.agents/skills/` and
`~/.claude/skills/`, which the four skill-reading agents all pick up.

Useful flags:

- `--dry-run` prints every command and file change without doing anything
- `--only mcp` or `--only skills` installs one half
- `--agent codex` (repeatable) restricts the targets
- `--uninstall` removes exactly what the installer added, and nothing else
- `--json` emits a machine-readable receipt

See the [install reference](https://better-fullstack.dev/docs/cli/install) for the full behavior.

## What agents get

- MCP server: `create-better-fullstack mcp`, exposing the `bfs_*` tools
- Skills: `scaffold-project` and `add-to-project`, namespaced in Claude Code as
  `better-fullstack:scaffold-project` and `better-fullstack:add-to-project`

## How agents should use it

1. Resolve the user's intent and pick sensible defaults only when the request is underspecified.
2. Call `bfs_get_guidance` and `bfs_get_schema` for current field semantics and allowed values.
3. Call `bfs_check_compatibility` before creating or changing a stack.
4. Call `bfs_plan_project` or `bfs_plan_stack_update` first. These are previews.
5. Call `bfs_create_project` or `bfs_apply_stack_update` only after the plan matches the request.
6. Keep installs disabled during agent scaffolding and report the exact install/test/dev commands.

## Manual setup

Use these when the installer does not cover your client.

Claude Code, as a plugin from this repository's marketplace:

```bash
claude plugin marketplace add Marve10s/Better-Fullstack
claude plugin install better-fullstack@better-fullstack
```

The interactive `/plugin` flow works too.

Codex reads the repo marketplace catalog at `.agents/plugins/marketplace.json`, which points at
this plugin bundle through the repo-root-relative `./plugin` source.

Any other MCP client can run the server directly:

```toml
[mcp_servers.better-fullstack]
command = "npx"
args = ["-y", "create-better-fullstack@latest", "mcp"]
```

## What this bundle contains

- Portable Agent Plugins v1 manifest (`plugin.json`) and MCP configuration (`mcp.json`)
- Codex manifest: `.codex-plugin/plugin.json`
- Claude Code manifest: `.claude-plugin/plugin.json`
- The two skills under `skills/`

The portable manifest uses the open Agent Plugins 1.0 format. Compatible clients discover skills
from `skills/` and the MCP server from `mcp.json`; the client-specific manifests stay in place
for clients that have not adopted the portable format.
