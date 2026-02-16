# Better-Fullstack vs Better-T-Stack: Comparison & Adoption Plan

> Analysis date: 2026-02-15
> Upstream repo: [AmanVarshney01/create-better-t-stack](https://github.com/AmanVarshney01/create-better-t-stack) (v3.21.0, ~4.9K stars)
> Our repo: [Marve10s/Better-Fullstack](https://github.com/Marve10s/Better-Fullstack) (v1.3.2)

---

## What Changed Upstream (Jan-Feb 2026)

### Major New Features

| Feature                            | Commit   | Description                                                                                                                                                                                                                            |
| ---------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`add` command**                  | 5a27c0c8 | Post-scaffolding addon installation to existing projects. Reads `bts.jsonc`, filters installed addons, processes templates, writes files, installs deps. Works interactively and via CLI flags.                                        |
| **`history` command**              | 5a27c0c8 | Persists every project creation to `~/.local/share/better-t-stack/history.json` using `env-paths`. Stores full config + `reproducibleCommand`. Supports `--json`, `--limit`, `--clear`.                                                |
| **Skills addon**                   | 5a27c0c8 | Installs AI coding agent skills (Vercel, Anthropic, Better Auth, Hono, etc.) curated per detected stack. Supports 20+ agents (Cursor, Claude Code, Cline, Copilot, Codex, etc.).                                                       |
| **MCP addon**                      | b1d58193 | Configures Model Context Protocol servers per project config (context7, cloudflare-docs, shadcn/ui, neon, polar MCP, etc.). Supports project-level and global scope. Targets Cursor, Claude Code, Codex, VS Code, Zed, Claude Desktop. |
| **`better-result` error handling** | 032cfd91 | Migrated all error handling from try/catch to Rust-inspired `Result<T, E>` monad. Tagged errors with `UserCancelledError`, `CLIError`, etc. Every async op wrapped in `Result.tryPromise`.                                             |
| **Astro frontend**                 | bebdac06 | New frontend option with Handlebars templates for pages, auth, todo example.                                                                                                                                                           |
| **Command module extraction**      | 33af750a | Extracted history, meta, sponsors commands into dedicated `commands/` modules.                                                                                                                                                         |
| **Preview mode guard**             | f8cc5955 | `shouldSkipExternalCommands()` across all addon setup functions for docs/testing without executing package managers.                                                                                                                   |

### Architecture Changes

- Moved to `trpc-cli` v0.12.2 for CLI command routing (same as us)
- Custom navigable prompts with `@clack/core` for "press b to go back"
- `AsyncLocalStorage` for implicit CLI context (silent, verbose, project info)
- Programmatic API: `create()`, `add()`, `createVirtual()` exports
- Handlebars templates embedded at build time into `templates.generated.ts`
- `tsdown` for ESM `.mjs` output (same as us)
- `oxfmt` + `oxlint` (same as us)

---

## What We Compared

### Shared DNA (same patterns)

| Pattern           | Better-T-Stack                        | Better-Fullstack                      |
| ----------------- | ------------------------------------- | ------------------------------------- |
| CLI framework     | `trpc-cli`                            | `trpc-cli`                            |
| Prompts           | `@clack/core` + `@clack/prompts`      | `@clack/core` + `@clack/prompts`      |
| Templates         | Handlebars + `templates.generated.ts` | Handlebars + `templates.generated.ts` |
| Template engine   | Virtual FS + `writeTree`              | `memfs` + `fs-writer`                 |
| Build tool        | `tsdown`                              | `tsdown`                              |
| Linting           | `oxfmt` + `oxlint`                    | `oxfmt` + `oxlint`                    |
| Monorepo          | TurboRepo + Bun workspaces            | TurboRepo + Bun workspaces            |
| Schema validation | Zod v4                                | Zod v4                                |
| AST manipulation  | `ts-morph`                            | `ts-morph`                            |
| Config format     | `bts.jsonc`                           | `bts.config.json`                     |

### Where We Diverge

| Area                       | Better-T-Stack                                   | Better-Fullstack                                                       |
| -------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
| **Scope**                  | TypeScript-only (15 frontends, 6 backends)       | Multi-language: TypeScript, Rust, Python, Go (115+ libs, 4 ecosystems) |
| **Ecosystem breadth**      | ~15 addons, ~50 total options                    | 150+ libs across 25+ categories, 4 language ecosystems                 |
| **Error handling**         | `better-result` (Result monad)                   | Standard try/catch                                                     |
| **Post-scaffold commands** | `add`, `history`                                 | None                                                                   |
| **AI integration**         | MCP addon, Skills addon, AGENTS.md, `.opencode/` | AGENTS.md only                                                         |
| **Dep management**         | Manual                                           | Automated `check-deps`, `sync-versions`, weekly GitHub Action          |
| **Testing**                | Basic tests                                      | Matrix testing, E2E, snapshot, sync tests, compatibility tests         |
| **API layer**              | tRPC, oRPC                                       | tRPC, oRPC, ts-rest, Garph, Effect/RPC                                 |
| **Web builder**            | React SPA                                        | TanStack Start (SSR)                                                   |
| **Programmatic API**       | `create()`, `add()`, `createVirtual()`           | `virtual` export                                                       |
| **Back navigation**        | Custom navigable prompts ("press b")             | Custom navigable prompts                                               |
| **Release**                | Changesets                                       | Custom `bump` script + GitHub Actions                                  |

---

## What We Can Copy Directly

These features are self-contained and can be adopted with minimal modification:

### 1. `add` Command (HIGH PRIORITY)

**What it does**: Adds addons/libraries to an existing Better-Fullstack project without re-scaffolding.

**Why we need it**: Our project has 115+ library options. Users should be able to add Sentry, BullMQ, or Stripe to an existing project without starting over.

**What to copy**:

- The `add-handler.ts` pattern: read config file, detect installed addons, filter available ones, process templates, write files, install deps
- Interactive multi-select for addon picking
- Non-interactive mode via CLI flags
- Both `--addons biome,husky` and interactive prompt flow

**What to modify**:

- Config file is `bts.config.json` for us (not `bts.jsonc`)
- We have 4 ecosystems (TS, Rust, Python, Go) so the addon filtering must be ecosystem-aware
- Our addon list is much larger -- need category grouping in the prompt (e.g. "Testing", "Payments", "AI SDKs")
- Need to handle cross-ecosystem addons (Docker, Sentry work everywhere) vs ecosystem-specific ones (Effect-ts only for TS)

### 2. `history` Command (MEDIUM PRIORITY)

**What it does**: Tracks every project creation with full config + a reproducible CLI command.

**What to copy**:

- `env-paths` for XDG-compliant storage (`~/.local/share/better-fullstack/history.json`)
- `--json`, `--limit`, `--clear` flags
- `reproducibleCommand` generation from config

**What to modify**:

- Our config has more fields (ecosystem, language-specific options) so the serialization is larger
- Consider adding `--filter` by ecosystem (`--filter rust`)
- Could show last-used config as default in interactive mode

### 3. `better-result` Error Handling (HIGH PRIORITY)

**What it does**: Replaces try/catch with typed `Result<T, E>` monad. Tagged errors with `.is()` discriminator.

**Why we need it**: Our CLI has many async operations across 4 ecosystems. Explicit error types would prevent silent failures and make error reporting cleaner.

**What to copy**:

- `better-result` library adoption
- `TaggedError` pattern for `UserCancelledError`, `CLIError`, `TemplateError`, `DependencyError`
- `Result.tryPromise({ try, catch })` for all async ops
- Centralized `displayError()` function

**What to modify**:

- We have ecosystem-specific errors (Cargo failures, pip failures, go mod failures) that need their own tagged types
- Integration with our existing `consola` logger
- Gradual migration -- can adopt per-module instead of big-bang

### 4. MCP Addon (MEDIUM PRIORITY)

**What it does**: Configures Model Context Protocol servers based on the project stack.

**What to copy**:

- The curation pattern: map stack choices to relevant MCP servers
- Multi-agent support (Cursor, Claude Code, VS Code, etc.)
- Both project-level and global installation scopes
- `add-mcp` CLI tool integration

**What to modify**:

- We need MCP recommendations for all 4 ecosystems:
  - **TypeScript**: context7, shadcn/ui, neon, cloudflare, etc.
  - **Rust**: cargo-docs, rustup, crates.io MCP servers
  - **Python**: pypi, FastAPI docs, Django docs MCP servers
  - **Go**: go-docs, pkg.go.dev MCP servers
- Cross-ecosystem MCPs (Sentry, Docker, PostgreSQL) should be offered to all

### 5. Skills Addon (LOW PRIORITY)

**What it does**: Installs AI coding skills from curated sources per stack.

**What to copy**:

- The pattern of recommending skills based on detected stack
- Multi-agent targeting

**What to modify**:

- Skills for Rust, Python, Go ecosystems (these don't exist upstream)
- Lower priority since the MCP addon covers similar ground

### 6. Preview/Dry-Run Mode (MEDIUM PRIORITY)

**What it does**: `shouldSkipExternalCommands()` guard lets the CLI run without executing external tools.

**What to copy**:

- The guard pattern across all setup functions
- Useful for our web builder's "preview" feature and for testing

**What to modify**:

- We already have `createVirtual()` but it doesn't cover addon setup functions
- Need to extend the guard to all ecosystem-specific tooling (cargo, pip, go)

---

## What We Should NOT Copy

| Feature                    | Reason                                              |
| -------------------------- | --------------------------------------------------- |
| `trpc-cli` migration       | We already use it                                   |
| Navigable prompts          | We already have this                                |
| Handlebars template system | We already have this with `memfs` (arguably better) |
| Astro frontend support     | We already support it                               |
| `tsdown` build             | We already use it                                   |
| `.opencode/` directory     | Too specific to OpenCode agent                      |

---

## What We Should Build That They Don't Have

These are features where our project's multi-ecosystem scope creates unique opportunities:

### 1. Cross-Ecosystem Addons

They can't do this because they're TypeScript-only. We can offer:

- "Add Docker" to any ecosystem
- "Add Sentry" with language-specific SDKs
- "Add CI/CD" with ecosystem-aware pipelines
- "Add OpenTelemetry" with language-specific instrumentation

### 2. Ecosystem Migration

Since we support 4 ecosystems, we could offer:

- "Add a Python microservice to your TypeScript project"
- "Add a Rust CLI tool to your monorepo"
- This is a unique differentiator

### 3. Dependency Health Dashboard

We already have `check-deps` and `sync-versions`. Combine with the `history` command to offer:

- "Check health of your Better-Fullstack project"
- Show outdated deps, security vulnerabilities, missing config

### 4. Stack Comparison

Leverage our web builder to show:

- "Compare TypeScript + Hono + Drizzle vs Rust + Axum + SeaORM"
- Performance benchmarks, ecosystem maturity, community size

---

## Implementation Priority

| Priority | Feature                        | Effort            | Impact                                                 |
| -------- | ------------------------------ | ----------------- | ------------------------------------------------------ |
| P0       | `add` command                  | Large (1-2 weeks) | High -- transforms CLI from one-shot to lifecycle tool |
| P0       | `better-result` error handling | Medium (3-5 days) | High -- cleaner error reporting across 4 ecosystems    |
| P1       | `history` command              | Small (1-2 days)  | Medium -- better UX, reproducible configs              |
| P1       | MCP addon                      | Medium (3-5 days) | Medium -- AI-native development support                |
| P1       | Preview/dry-run mode           | Small (1-2 days)  | Medium -- enables testing and web preview              |
| P2       | Skills addon                   | Medium (3-5 days) | Low -- nice to have                                    |
| P2       | Cross-ecosystem addons         | Large (1-2 weeks) | High -- unique differentiator but complex              |

---

## Key Dependencies to Add

```
better-result     # Result monad for error handling
env-paths         # XDG-compliant data/config paths (for history)
```

---

## Summary

Better-T-Stack is moving from "scaffold once" to "project lifecycle tool" with `add` and `history` commands, and from "code generator" to "AI-native dev environment" with MCP and Skills addons. Their `better-result` migration is a solid architectural improvement.

We should adopt their lifecycle and error-handling patterns while leveraging our unique multi-ecosystem advantage (4 languages, 150+ libs) to build features they can't -- cross-ecosystem addons, migration tooling, and language-aware MCP recommendations. Our testing infrastructure (matrix tests, sync tests, dep checking) is already more mature than theirs, so we have a strong foundation to build on.
