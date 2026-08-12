# Generated CI and Verified Combinations

Status: completed baseline / archived on 2026-07-02.

This note captures the P0 slice that made generated-project CI useful and turned existing
verification outputs into a generated status artifact plus a public docs page.

---

## Generated CI Baseline

- [x] GitHub Actions templates use generated-project working directories for graph-owned non-TypeScript backends.
- [x] TypeScript and React Native projects only emit CI test steps when the selected stack generates test scripts.
- [x] Python workflows install dev/test extras and run pytest when testing is selected.
- [x] .NET workflows run tests only when a generated test project is present.
- [x] Virtual generator regression tests cover TypeScript, React Native, Rust, Python, Go, Java, Elixir, and .NET CI output.

Remaining depth belongs in future quality work that broadens generated-project checks and package
spec coverage.

## Verified Combinations Artifact

- [x] `scripts/record-release-guard.ts` records release-gate pass/fail evidence to `testing/.release-guard/summary.json`.
- [x] `scripts/build-verified-combinations.ts` generates `docs/verified-combinations.md` from smoke, ScaffBench, and release-guard evidence.
- [x] `scripts/build-verified-combinations.ts` also generates `apps/web/src/lib/docs/verified-combinations-data.ts` for the public docs page.
- [x] `/docs/reference/verified-combinations` publishes the current verified claim in the docs site.
- [x] `/api/verified-combinations` exposes a Shields-compatible badge endpoint backed by the same generated data.
- [x] `scripts/published-package-smoke.ts` records Bun, npm, and pnpm package-manager scaffold evidence to `testing/.published-package/summary.json`.
- [x] The generated artifact lists checked stacks, commands, ecosystem, validation steps, pass/fail state, and owner area.
- [x] Evidence rows and public summary cards link to source artifacts, rerun commands, and owning template/test areas.
- [x] The current claim is scoped to rows marked Pass; matrix-only and configured rows remain visible but are not green claims.

## Validation

- `bun test apps/cli/test/virtual-generator-regressions.test.ts`
- `bun test packages/template-generator/test/post-process/package-configs.test.ts`
- `bun run test:release:record`
- `bun run test:published-package`
- `bun run build:verified-combinations`
- `git diff --check`
