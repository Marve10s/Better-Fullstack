# Deployment and workspace-shape follow-ups

Docker, Docker Compose, DevContainer output, and a constrained single-app workspace shape have
shipped. This backlog contains only broader outcomes that still need demand and verification.

## Shipped boundary

- `workspaceShape: "single-app"` flattens qualifying thin self-contained Next.js and TanStack Start
  projects into one root application.
- Compatibility normalizes unsupported single-app requests back to `monorepo`. Separate backend,
  database, auth, API, and container services remain monorepo-only.
- `docker-compose`, `devcontainer`, and deployment targets generate stack-aware files for their
  supported recipes.

The historical foundation is recorded in
`../completed/deployment-docs-and-docker-foundation-2026-05-21.md`.

## Broader single-app coverage

Start only after measured demand identifies a concrete recipe outside the shipped thin mode.

- [ ] Name the exact graph shape and explain how its multiple Primary Roles collapse without path,
      package, command, or ownership ambiguity.
- [ ] Keep `workspaceShape` authoritative across CLI, web, config, manifest, generator, and update
      reporting.
- [ ] Prove clean install, build, generated checks, and lifecycle update for each added recipe.
- [ ] Keep unsupported graphs fail-closed as monorepos rather than flattening partial output.

## Deployment output evidence

- [ ] Add focused generated-project checks for Dockerfiles, Compose, DevContainer, and generated
      GitHub Actions output.
- [ ] Run the smallest real container or configuration validation for each advertised golden
      recipe.
- [ ] Expose the resulting build or runtime evidence instead of treating file presence as proof.

## Conditional convenience commands

Consider a generated `Makefile` or `justfile` only after repeated support reports show that the
existing package and container commands are hard to discover. Any generated command must run in
the representative recipe evidence lane.
