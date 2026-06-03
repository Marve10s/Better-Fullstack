# Better Fullstack

Scaffold production-ready fullstack apps in seconds. Pick your stack from 425 options — the CLI wires everything together.

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

- **425 options** — frontend, backend, database, auth, payments, AI, DevOps, and more
- **7 ecosystems** — TypeScript, React Native, Rust, Python, Go, Java, Elixir
- **Visual builder** — configure your stack in the browser
- **Wired for you** — every picked integration is preconfigured and working out of the box

## CLI Flags

```bash
--yes              # Accept all defaults
--yolo             # Scaffold a random stack — good for exploring
--template <name>  # Use a preset (t3, mern, pern, uniwind)
--ecosystem <lang> # Start in typescript, react-native, rust, python, go, java, or elixir mode
--part <binding>   # Add a multi-ecosystem stack part, e.g. frontend:typescript:next
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

## Links

- [Website](https://better-fullstack.dev)
- [GitHub](https://github.com/Marve10s/Better-Fullstack)
- [npm](https://www.npmjs.com/package/create-better-fullstack)
