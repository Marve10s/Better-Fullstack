# Executable update qualification infrastructure, 2026-08-23

This note records the repository work for roadmap tasks T1.1, T1.3, and T1.4. It does not claim
that Better Fullstack has qualified a historical support window. That claim still requires two
consecutive published releases to complete the flow.

## Executable release fixtures

- `scripts/release/capture-release-fixture.ts` creates projects with the exact packed release binaries for
  TypeScript, React Native, Rust, Python, Go, Java, Elixir, and .NET.
- `scripts/release/release-fixture.ts` stores every file as exact bytes, modes, and hashes. It also records
  package integrity, lifecycle provenance, Stack Parts, and the generation command.
- The release receipt binds the fixture digest and case IDs to the source commit and package
  manifest. The release workflow publishes that fixture as a release asset.

## Cross-version qualification

- `scripts/release/cross-version-upgrade.ts` verifies the source release receipt before materializing any
  fixture.
- The harness installs the exact target tarballs, applies a managed user edit, plans and applies the
  target update, proves exact recovery, reapplies the plan, and runs the strict ecosystem verifier.
- `scripts/release/qualify-previous-release.ts` records an explicit awaiting state for the first
  fixture-bearing release. Later releases must download the previous fixture and receipt and pass
  the full qualification before their own receipt can be created.
- The qualification report is bound to the target package manifest and published as a separate
  release asset.

## Declared update outcomes

- `docs/update-support-policy.md` declares the expected result for clean merges, user-only edits,
  generator-only edits, compatible dual edits, conflicts, deletion, user and template renames,
  missing baselines, interrupted apply, and failed writes.
- Focused transaction and scaffold-upgrade tests prove those results and exact rollback behavior.
- `scripts/release/validate-update-qualification.ts` prevents a declared result from losing its executable
  test. The validator runs in the release gate.

## Remaining boundary

The machine-readable historical window remains empty. The active project tracks the first two
published executions, separate cohort evidence, the opt-in update action, and pre-manifest-v2
adoption.
