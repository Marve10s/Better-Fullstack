# Docker & DevContainers

Highly requested across both Better-Fullstack (#76 non-monorepo) and better-t-stack (#557, #806, #821). Docker is essential for self-hosted deployments and consistent dev environments.

---

## Dockerfile Generation

- [ ] Generate `Dockerfile` per app in the monorepo
  - Multi-stage builds: `deps → build → runtime`
  - Runtime-aware: Node.js (alpine), Bun, Deno, Rust (distroless), Python (slim), Go (scratch)
  - Proper `.dockerignore` generation
  - Monorepo-aware: copy only the relevant workspace package + shared deps

### Template per backend runtime

| Runtime | Base Image | Build | Final |
|---------|-----------|-------|-------|
| Node.js | `node:22-alpine` | Install + build | Copy dist + `node_modules` (prod) |
| Bun | `oven/bun:1` | Install + build | Copy dist |
| Rust | `rust:1-slim` | `cargo build --release` | `gcr.io/distroless/cc` |
| Python | `python:3.13-slim` | pip/uv install | Copy venv |
| Go | `golang:1.23` | `go build` | `scratch` or `gcr.io/distroless/static` |

---

## Docker Compose

- [ ] Generate `docker-compose.yml` at monorepo root
  - Services: web app, API server, database, cache, search
  - Database service based on `--database` choice:
    - PostgreSQL: `postgres:16-alpine`
    - MySQL: `mysql:8`
    - MongoDB: `mongo:7`
    - SQLite: volume mount only (no service needed)
  - Cache service when `--caching upstash-redis`: `redis:7-alpine` (local dev)
  - Search service when search is selected: `meilisearch`, `typesense`, `elasticsearch`
  - Volume mounts for persistence
  - Health checks for dependency ordering
  - `.env` file reference for secrets

### Example structure
```yaml
services:
  web:
    build: ./apps/web
    ports: ["3000:3000"]
    depends_on: [api]
  api:
    build: ./apps/server
    ports: ["3001:3001"]
    depends_on:
      db:
        condition: service_healthy
    env_file: .env
  db:
    image: postgres:16-alpine
    volumes: [db-data:/var/lib/postgresql/data]
    healthcheck: ...
volumes:
  db-data:
```

---

## DevContainers

- [ ] Generate `.devcontainer/devcontainer.json`
  - Based on docker-compose for full environment
  - VS Code extensions pre-configured per stack
  - Port forwarding for all services
  - Post-create command: install deps + run migrations

### Extension mapping

| Stack Choice | VS Code Extensions |
|-------------|-------------------|
| TypeScript | `dbaeumer.vscode-eslint`, `esbenp.prettier-vscode` |
| Rust | `rust-lang.rust-analyzer` |
| Python | `ms-python.python`, `ms-python.vscode-pylance` |
| Go | `golang.go` |
| Prisma | `Prisma.prisma` |
| Docker | `ms-azuretools.vscode-docker` |
| Tailwind | `bradlc.vscode-tailwindcss` |

---

## Non-Monorepo / Single-App Mode

Related request from GitHub (#76, better-t-stack #678): scaffold a single app without Turborepo.

- [ ] Add `--monorepo false` or `--single-app` flag
  - Flatten project structure: no `apps/`, no `packages/`
  - Single `package.json` at root
  - No Turborepo, no workspace configuration
  - Simpler Dockerfile (no workspace copying)
  - Useful for small projects, quick prototypes, or teams that don't want monorepo complexity

### Implementation
- Skip Turborepo/Nx workspace setup
- Merge `apps/web` and `apps/server` into root (or colocate)
- Adjust all template paths
- Single `tsconfig.json` instead of project references
- This is a significant architectural change — needs careful design

---

## Implementation Notes

- Docker generation should be opt-in: `--docker` flag or addon
- Integrate with existing deploy targets (fly.io, railway use Dockerfiles)
- DevContainers are always optional — generate alongside Docker when `--devcontainer` is passed
- Consider generating a `Makefile` or `justfile` with common Docker commands

---

## Priority Order

1. **Dockerfile per app** — most basic, highest value
2. **docker-compose.yml** — local dev environment
3. **DevContainers** — onboarding DX
4. **Non-monorepo mode** — architectural change, larger effort
