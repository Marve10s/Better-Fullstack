# Better Fullstack Plugin

Use this plugin to scaffold and extend Better Fullstack projects through the official MCP server
instead of hand-writing boilerplate.

The plugin bundles:

- MCP server: `create-better-fullstack mcp`
- Skills: `scaffold-project` and `add-to-project`
- Codex manifest: `.codex-plugin/plugin.json`
- Repo marketplace catalog: `.agents/plugins/marketplace.json`

## How Agents Should Use It

1. Resolve the user's intent and pick sensible defaults only when the request is underspecified.
2. Call `bfs_get_guidance` and `bfs_get_schema` for current field semantics and allowed values.
3. Call `bfs_check_compatibility` before creating or changing a stack.
4. Call `bfs_plan_project` or `bfs_plan_stack_update` first. These are previews.
5. Call `bfs_create_project` or `bfs_apply_stack_update` only after the plan matches the request.
6. Keep installs disabled during agent scaffolding and report the exact install/test/dev commands.

## MCP Server Only

Any MCP client can run:

```toml
[mcp_servers.better-fullstack]
command = "npx"
args = ["-y", "create-better-fullstack@latest", "mcp"]
```
