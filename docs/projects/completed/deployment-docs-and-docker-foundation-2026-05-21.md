# Deployment docs and Docker foundation, 2026-05-21

This note captures the completed deployment trust work verified on May 21, 2026.

## Verified as shipped

- Docker deployment templates exist for supported web and server targets under `packages/template-generator/templates/deploy/docker/`.
- Docker Compose addon templates exist under `packages/template-generator/templates/addons/docker-compose/`, including app Dockerfiles, root compose config, language-specific Dockerfiles, and Nginx config for static web output.
- Fly.io and Railway deployment targets include Dockerfile-backed templates for supported web and server stacks.
- Vercel deployment templates exist for supported web and server stacks.
- SST infrastructure templates exist for supported TypeScript layouts.
- Cloudflare deployment is compatibility-scoped to Workers/Hono server stacks.
- Public deployment guidance now lives under `apps/web/content/docs/sections/deployment.mdx` so deployment is one stack section rather than a top-level docs group.
- The `devcontainer` addon generates stack-aware `.devcontainer/` files and Compose overrides for
  supported recipes.
- The constrained `workspaceShape: "single-app"` mode flattens qualifying thin Next.js and TanStack
  Start self-contained applications.

## Still planned

- Broader single-app support beyond the qualifying thin self-contained web stacks.
- Runtime evidence for generated Docker, Compose, DevContainer, and GitHub Actions output.
- Broader deployment walkthroughs with provider-specific screenshots or CLI examples.
- Generic first-class REST/OpenAPI API option for TypeScript. Existing oRPC, feTS, and Java Springdoc support do not replace a dedicated `--api rest` / `--api openapi` option.
