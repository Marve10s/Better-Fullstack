# Supported update window

This project tracks support-policy activation. The [support policy](../../update-support-policy.md)
and [lifecycle contract](../../reference/lifecycle-contract-v2.md) describe the shipped behavior.

## Current boundary

- Manifest v2 records generator, template-set, schema, and operation provenance.
- Stack and scaffold updates bind apply to the reviewed plan and use integrity-checked recovery
  points for managed file writes.
- The release workflow now archives an executable eight-ecosystem fixture and binds it to the
  release receipt. A later release can replay that exact source state with the target binaries.
- The cross-version harness applies realistic user edits, verifies each generated project, proves
  exact recovery, and binds its report to both releases. Published qualification reports now
  pass v2.6.5 -> v2.6.7 and v2.6.7 -> v2.6.8 across all eight recipes.
- The 2026-08-12 public-repository qualification proves adopted-baseline planning, apply, and exact
  recovery. It does not prove historical release compatibility.
- The machine-readable update policy stays in qualification until the published-binary evidence
  is reviewed and the window is activated. CLI and MCP report manual review outside that window.
- Recovery points can be listed, shown, verified, restored, and pruned through CLI and MCP. Prune
  keeps unfinished and invalid entries.
- Pre-manifest projects can inspect likely Stack Parts and uncertainty without writing. Only an
  exact current-state token can create an adopted-unverified baseline.
- The opt-in update action opens a pull request only after support eligibility, verified lineage,
  deterministic planning, complete checks, and path-bounded apply pass. It attaches a SHA-bound
  receipt and pushes only a generated branch.

## Evidence checked 2026-09-25

The [v2.6.7 qualification report](https://github.com/Marve10s/Better-Fullstack/releases/download/v2.6.7/cross-version-qualification.v1.json)
and [v2.6.8 qualification report](https://github.com/Marve10s/Better-Fullstack/releases/download/v2.6.8/cross-version-qualification.v1.json)
each report eight passing cases, verified builds, and exact recovery. They cover adjacent published
fixture-bearing releases, not every earlier version or every possible stack.

The [20-repository adopted-baseline cohort](../../evidence/external-upgrade-validation-2026-08-12.md)
remains separate evidence for protecting user edits. It does not establish release lineage.

`packages/types/src/stack/update-support.ts` still declares `status: "qualification"`, no supported
releases, and zero qualified consecutive releases. The remaining task is policy activation and
client verification, not producing the first fixture-bearing releases.

## Remaining outcomes

- [ ] Reconcile the published receipts, exact source/target versions, and separate adopted cohort
      with the rolling-window contract. Choose only directly supported source/target pairs.
- [ ] Activate that bounded window in the machine-readable policy and prove matching eligibility,
      reason codes, and manual-review boundaries through CLI, JSON, MCP, and builder import.
- [ ] Update public support claims only after the policy and client checks pass.

## Completion

Close this project when the policy advertises only the reviewed window and all shared clients
agree. Documentation cleanup does not activate the policy.
