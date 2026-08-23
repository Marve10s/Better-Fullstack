# Lifecycle provenance and recovery foundation, 2026-08-23

This note records the lifecycle work that shipped before the supported historical update window.

## Verified as shipped

- Manifest v2 records CLI, generator, template-set, schema, and operation provenance in
  `apps/cli/src/utils/scaffold-manifest.ts`.
- Project and stack update apply paths bind writes to the reviewed plan instead of recalculating a
  different operation at apply time.
- `apps/cli/src/utils/project-transaction.ts` provides integrity-checked preimages and recovery
  points for managed filesystem transactions.
- Human status output, CLI JSON, and MCP derive project health and update reporting from shared
  project-report services.
- The 2026-08-12 external qualification applied and recovered adopted manifest-v2 baselines across
  20 public repositories without losing the injected local edit.

## Boundary retained for future work

- The committed cross-version fixtures are provenance-only and explicitly unupgradeable.
- The external qualification adopted a current baseline. It is recovery evidence, not proof that
  an older published release can update to a newer one.
- Package-manager and generated-toolchain side effects remain outside the managed filesystem
  transaction boundary.

The active `../active/platform-features.md` project owns executable source-release fixtures, the
rolling support policy, shared eligibility reporting, and the two separate qualification cohorts.
