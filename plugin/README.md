# Better Fullstack Plugin

Use this plugin to scaffold and extend Better Fullstack projects through the official MCP server
instead of hand-writing boilerplate.

The plugin bundles:

- MCP server: `create-better-fullstack mcp`
- Skills: `scaffold-project` and `add-to-project`
- Codex manifest: `.codex-plugin/plugin.json`
- Claude Code manifest: `.claude-plugin/plugin.json`
- Repo-root Codex marketplace catalog: `.agents/plugins/marketplace.json`
- Repo-root Claude Code marketplace catalog: `.claude-plugin/marketplace.json`

## How Agents Should Use It

1. Resolve the user's intent and pick sensible defaults only when the request is underspecified.
2. Call `bfs_get_guidance` and `bfs_get_schema` for current field semantics and allowed values.
3. Call `bfs_check_compatibility` before creating or changing a stack.
4. Call `bfs_plan_project` or `bfs_plan_stack_update` first. These are previews.
5. Call `bfs_create_project` or `bfs_apply_stack_update` only after the plan matches the request.
6. Keep installs disabled during agent scaffolding and report the exact install/test/dev commands.

## Claude Code

Add this repository as a Claude Code plugin marketplace, then install the plugin:

```bash
claude plugin marketplace add Marve10s/Better-Fullstack
claude plugin install better-fullstack@better-fullstack
```

You can also install it from Claude Code's interactive `/plugin` flow.

Claude Code namespaces the bundled skills as `better-fullstack:scaffold-project` and
`better-fullstack:add-to-project`.

## Codex

Use the repo marketplace catalog at `.agents/plugins/marketplace.json`. It points at this
shared plugin bundle through the repo-root relative `./plugin` source.

## MCP Server Only

Any MCP client can run:

```toml
[mcp_servers.better-fullstack]
command = "npx"
args = ["-y", "create-better-fullstack@latest", "mcp"]
```
