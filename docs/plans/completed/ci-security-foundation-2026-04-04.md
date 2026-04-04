# CI / Security Foundation (2026-04-04)

## Status

- [x] Dependabot npm scanning enabled
- [x] CodeQL SAST workflow added
- [x] Code coverage wired into CI with artifact upload
- [x] npm provenance enabled for package publishes

## Evidence

- `.github/dependabot.yml` includes an `npm` update block for the repository root.
- `.github/workflows/codeql.yaml` runs CodeQL on `push`, `pull_request`, and a weekly schedule for `javascript-typescript`.
- `.github/workflows/test.yaml` runs `bun run --filter=create-better-fullstack test:coverage` and uploads `apps/cli/coverage` as an artifact.
- `.github/workflows/release.yaml` publishes `packages/types`, `packages/template-generator`, `apps/cli`, and `packages/create-bfs` with `bun publish --access public --provenance`.

## Follow-up Still Planned

- Cross-browser testing is still open (tracked in `ci-and-quality.md`).
