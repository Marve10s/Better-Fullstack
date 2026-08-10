---
name: better-fullstack
description: Scaffold, plan, or extend Better Fullstack projects with the generator, CLI, or MCP server. Use when a user asks to create, generate, or scaffold a fullstack starter; choose a Better Fullstack stack; add Better Fullstack addons; compare agent scaffolding paths; or avoid hand-authoring boilerplate project files.
---

# Better Fullstack

Use the Better Fullstack generator as the source of truth for starter generation. Do not hand-write a full starter when a trusted Better Fullstack interface can produce it.

## Choose The Path

Use an already-available CLI by default. The benchmarked best framing is: map the stack, dry-run the CLI, then run the same non-interactive command for real.

Use MCP only when the user explicitly asks for MCP, when CLI access is unavailable, or when the request needs structured schema lookup beyond what a concise CLI command can safely express. If using MCP, start with `bfs_get_guidance`, then use schema, compatibility, plan, and create/add tools in that order.

Use a trusted Better Fullstack interface in this order:

1. A local CLI path provided by the prompt or current repository.
2. A preinstalled Better Fullstack command available on `PATH`.
3. An attached Better Fullstack MCP server or tool.
4. A command explicitly provided or approved by the user.

If none is available, ask the user for the command, service, tool, or docs source they want used. Do not invent a bootstrap command.

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
<better-fullstack-cli> create my-app \
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
<better-fullstack-cli> create api-app \
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
<better-fullstack-cli> add --project-dir ./my-app --addons biome turborepo --no-install
```

For MCP lifecycle work, use this sequence:

1. `bfs_get_project_status` reads configuration and manifest prerequisites without running
   toolchains or writing files.
2. `bfs_check_project` runs every generated target check. It requires installed dependencies and
   required toolchains; missing prerequisites are failures. It does not rewrite Better Fullstack
   source/configuration directly, though build tools may fetch dependencies and write locks,
   caches, compiler output, or build artifacts.
3. `bfs_plan_project_update` reads current-template drift. It returns a `reviewToken` only when a
   supported manifest-v1 baseline exists and all exact structured-merge content fits the 32 KiB
   per-file MCP review bound. Oversized content is withheld with size/SHA metadata and no token.
4. After explicit approval, pass the same absolute project path and exact unchanged token to
   `bfs_apply_project_update` with `acknowledgeUnprovenManifestV1: true`. Missing, stale,
   cross-project, or bounded-review-ineligible tokens fail closed. Apply destructively overwrites
   currently actionable template files and advances the v1 manifest without installing dependencies.

Manifest v1 does not prove generator release/SHA provenance or cross-version eligibility, and the
current apply path has no transactional backup or automated recovery. Do not promise those Wave 1
guarantees.

## Final Response

Report the command or tool path used, any compatibility adjustments, the project directory, and the next install/test/run commands. Do not claim dependencies are installed when `--no-install` or MCP creation skipped them.
