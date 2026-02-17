# Better Fullstack CLI

A CLI-first toolkit for building Full Stack applications. Skip the configuration. Ship the code.

## Quick Start

```bash
# Using bun (recommended)
bun create better-fullstack@latest

# Using pnpm
pnpm create better-fullstack@latest

# Using npm
npx create-better-fullstack@latest
```

## Usage

```bash
Usage: create-better-fullstack [project-directory] [options]

Options:
  -V, --version                   Output the version number
  -y, --yes                       Use default configuration
  --yolo                          Random configuration (experimental)
  --database <type>               Database type (none, sqlite, postgres, mysql, mongodb)
  --orm <type>                    ORM type (drizzle, prisma, mongoose, typeorm, kysely, mikroorm, sequelize, none)
  --auth <type>                   Authentication (better-auth, clerk, nextauth, none)
  --payments <type>               Payments (polar, stripe, lemon-squeezy, paddle, dodo, none)
  --frontend <types...>           Frontend types
  --backend <framework>           Backend framework
  --runtime <runtime>             Runtime (bun, node, workers, none)
  --api <type>                    API type (trpc, orpc, ts-rest, garph, none)
  --addons <types...>             Additional addons
  --examples <types...>           Examples to include (ai, none)
  --git / --no-git                Initialize git repository
  --package-manager <pm>          Package manager (npm, pnpm, bun)
  --install / --no-install        Install dependencies
  --db-setup <setup>              Database setup
  -h, --help                      Display help
```

## Examples

```bash
# Default configuration
npx create-better-fullstack --yes

# With specific options
npx create-better-fullstack --database postgres --orm drizzle --auth better-auth --addons pwa biome

# Elysia backend with Node.js
npx create-better-fullstack --backend elysia --runtime node

# Multiple frontends (web + native)
npx create-better-fullstack --frontend tanstack-router native-bare
```

## Add Command

Add addons to an existing Better Fullstack project. The `add` command reads your `bts.jsonc` config, detects the installed stack, and offers compatible addons.

```bash
# Interactive mode (recommended) - run from your project root
create-better-fullstack add

# Non-interactive with specific addons
create-better-fullstack add --addons turborepo biome

# Skip dependency installation (config-only update)
create-better-fullstack add --addons oxlint --skip-install

# Specify a different project directory
create-better-fullstack add --cwd ./my-project --addons lefthook
```

### Supported Addons

| Category      | Addons                                               |
| ------------- | ---------------------------------------------------- |
| Tooling       | turborepo, biome, oxlint, ultracite, husky, lefthook |
| Documentation | starlight, fumadocs                                  |
| Extensions    | pwa, tauri, opentui, wxt, ruler                      |
| Testing       | msw, storybook                                       |

### Limitations (MVP)

- Only TypeScript ecosystem projects are supported. Rust, Python, and Go support is planned.
- The command installs dependencies but does not scaffold configuration files (e.g., `biome.json`, `.storybook/`). Run the addon's init command after adding.
- Addon compatibility is validated against your frontend framework. Some addons (e.g., PWA, Storybook) require specific frontends.

### Error Handling

The `add` command uses a typed Result pattern internally. The programmatic API returns structured results:

```typescript
import { add } from "create-better-fullstack";

const result = await add({ addons: ["turborepo"], cwd: "./my-project" });
if (result.ok) {
  console.log("Added:", result.value.addedAddons);
} else {
  console.error("Error:", result.error);
}
```

## Project Structure

```
my-app/
├── apps/
│   ├── web/          # Frontend application
│   ├── server/       # Backend API
│   ├── native/       # (optional) Mobile application
│   └── docs/         # (optional) Documentation site
├── packages/         # Shared packages
└── README.md
```
