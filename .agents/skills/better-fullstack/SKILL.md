---
name: better-fullstack
description: Scaffold, plan, or extend Better Fullstack projects with the generator, CLI, or MCP server. Use when a user asks to create, generate, or scaffold a fullstack starter; choose a Better Fullstack stack; add Better Fullstack addons; compare agent scaffolding paths; or avoid hand-authoring boilerplate project files.
---

# Better Fullstack

Use Better Fullstack CLI as the source of truth for starter generation. Do not hand-write a full starter when the generator can produce it.

## Choose The Path

Use the CLI by default. The benchmarked best framing is: map the stack, dry-run the CLI, then run the same non-interactive command for real.

Use MCP only when the user explicitly asks for MCP, when CLI access is unavailable, or when the request needs structured schema lookup beyond what a concise CLI command can safely express. If using MCP, start with `bfs_get_guidance`, then use schema, compatibility, plan, and create/add tools in that order.

If the prompt provides a local CLI path, use that. Otherwise use the package runner available in the environment, such as `bunx create-better-fullstack@latest` or `npx -y create-better-fullstack@latest`.

## Default CLI Workflow

1. Map the user's stack into Better Fullstack graph parts and flat flags.
2. Build one non-interactive command.
3. Run it with `--dry-run`.
4. If the dry run succeeds, run the same command without `--dry-run`.
5. If the CLI rejects a combination, adjust to the closest valid Better Fullstack stack and report the adjustment.

## CLI Rules

- Create exactly the requested project directory, using a relative project name.
- Prefer `create <project-name> --part ...` for explicit or multi-ecosystem stacks.
- Pass `--no-install --no-git` for agent-driven scaffolding unless the user explicitly asks for side effects.
- Pass `--package-manager bun` when the user or project expects Bun.
- Pass `--ai-docs agents-md` for reusable projects, or `--ai-docs none` for benchmarks and throwaway scaffolds.
- Use `none` explicitly for categories the user wants disabled.
- Do not start a dev server.

## Mapping Hints

- React + Vite: `frontend:typescript:react-vite`
- Hono: `backend:typescript:hono`
- Bun runtime: `backend.runtime:typescript:bun`
- SQLite: `database:universal:sqlite`
- Drizzle: `backend.orm:typescript:drizzle`
- tRPC: `backend.api:typescript:trpc`
- Tailwind: `frontend.css:typescript:tailwind`
- DaisyUI: `frontend.ui:typescript:daisyui`
- Pino: `backend.logging:typescript:pino`
- Biome: `codeQuality:universal:biome`

## Graph Part Examples

Use graph parts as `category:ecosystem:option`.

```bash
bunx create-better-fullstack@latest my-app \
  --part frontend:typescript:react-vite \
  --part backend:typescript:hono \
  --part database:universal:sqlite \
  --part backend.runtime:typescript:bun \
  --part backend.api:typescript:trpc \
  --part backend.orm:typescript:drizzle \
  --part frontend.css:typescript:tailwind \
  --part frontend.ui:typescript:daisyui \
  --part backend.logging:typescript:pino \
  --part codeQuality:universal:biome \
  --forms none \
  --validation none \
  --ai-docs none \
  --package-manager bun \
  --no-install \
  --no-git
```

```bash
bunx create-better-fullstack@latest api-app \
  --part backend:python:fastapi \
  --part database:universal:postgres \
  --part backend.orm:python:sqlmodel \
  --part backend.validation:python:pydantic \
  --part backend.auth:python:jwt \
  --part codeQuality:python:ruff \
  --ai-docs agents-md \
  --no-install \
  --no-git
```

## Existing Projects

For a generated project with `bts.jsonc`, use the Better Fullstack `add` command or MCP add tools. Addons are arrays, for example:

```bash
bunx create-better-fullstack@latest add --project-dir ./my-app --addons biome turborepo --no-install
```

## Final Response

Report the command or tool path used, any compatibility adjustments, the project directory, and the next install/test/run commands. Do not claim dependencies are installed when `--no-install` or MCP creation skipped them.
