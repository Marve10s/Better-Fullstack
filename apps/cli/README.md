# Better Fullstack

Scaffold configurable fullstack apps across web, mobile, and backend ecosystems — the CLI wires your selected stack together.

## Quick Start

```bash
# Using npm
npm create better-fullstack@latest

# Using npx
npx create-better-fullstack@latest

# Using pnpm
pnpm create better-fullstack@latest

# Using bun
bun create better-fullstack@latest

# Using yarn
yarn create better-fullstack@latest
```

Bun is required only when the generated project selects Bun as its runtime or package manager. Node.js with npm is enough for Node-based projects.

## Web Builder

Configure your stack visually — pick every option from a UI, preview your choices, and get a ready-to-run command.

**[Open the App Builder →](https://better-fullstack.dev/new)**

## Features

- **Broad stack catalog** — frontend, backend, database, auth, payments, AI, DevOps, and more
- **Multi-ecosystem projects** — compose web, mobile, and backend stacks across supported ecosystems
- **Visual builder** — configure your stack in the browser
- **Lifecycle-aware** — create, add, update, check, and generate from the recorded project model
- **Compatibility-checked** — invalid selections are rejected or safely adjusted before generation

## CLI Flags

```bash
--yes              # Accept all defaults
--yolo             # Scaffold a random stack — good for exploring
--template <name>  # Use a preset (t3, mern, pern, uniwind)
--ecosystem <lang> # Choose the primary project ecosystem
--part <binding>   # Add a multi-ecosystem stack part, e.g. frontend:typescript:next
--workspace-shape # Workspace layout (monorepo, qualifying single-app)
--version-channel  # Dependency channel: stable, latest, beta
--no-git           # Skip git initialization
--no-install       # Skip dependency installation
--verify           # Run generated project checks without starting dev servers
--package-manager  # Package manager (bun, pnpm, npm, yarn)
--verbose          # Show detailed output
```

## Multi-Ecosystem Example

Use repeated `--part` flags to bind each generated app or capability to an ecosystem:

```bash
bun create better-fullstack@latest my-mixed-app \
  --part frontend:typescript:next \
  --part backend:go:gin \
  --part backend.orm:go:gorm \
  --part database:universal:postgres
```

## Existing Projects

Generated projects record their selected stack in `bts.jsonc` and their scaffold baseline in
`bts.lock.json`.

```bash
npx create-better-fullstack@latest add --email resend --dry-run
npx create-better-fullstack@latest update
npx create-better-fullstack@latest check --json
npx create-better-fullstack@latest gen resource post --dry-run
```

Use `--workspace-shape single-app` only for thin Next.js or TanStack Start self-backend projects.
Selections that require sibling database, auth, API, service, native, or deployment packages use
the default monorepo layout.

## Choosing a starter track

The web builder, CLI, and MCP server use the same seven schema-valid starter tracks and the same
fail-closed evidence inventory.

```bash
npx create-better-fullstack@latest tracks --runtime python --database postgres
npx create-better-fullstack@latest compatibility --track java-api --category search --option algolia
npx create-better-fullstack@latest recommend --brief "a secure Java API"
```

`tracks --json` returns exact editable Stack Parts, compatibility results, evidence, and filters.
`recommend` uses the deterministic scorer. A controlled release gate keeps a model layer disabled
while the deterministic baseline remains accurate, repeatable, and schema-valid.

## Links

- [Website](https://better-fullstack.dev)
- [GitHub](https://github.com/Marve10s/Better-Fullstack)
- [npm](https://www.npmjs.com/package/create-better-fullstack)
