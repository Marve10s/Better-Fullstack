# Docker Follow-Ups & DevContainers

Highly requested across both Better-Fullstack (#76 non-monorepo) and better-t-stack (#557, #806, #821). Docker is essential for self-hosted deployments and consistent dev environments. Status refreshed on 2026-06-30; only unfinished follow-ups remain here.

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

- Docker generation is opt-in through deploy targets or the `docker-compose` addon
- Existing deploy targets such as Fly.io and Railway use Dockerfiles where applicable
- DevContainers are optional through the `devcontainer` addon and generate stack-aware `.devcontainer/` files.
- Consider generating a `Makefile` or `justfile` with common Docker commands

---

## Priority Order

1. **Non-monorepo mode** — architectural change, larger effort
2. **Generated Docker/CI quality checks** — ensure Docker, Compose, DevContainer, and GitHub Actions outputs are exercised in focused generated-project tests
