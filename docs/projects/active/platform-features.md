# Supported update window

This project tracks the unfinished work in roadmap Phase 1. The shipped manifest-v2, history,
review-token, transaction, recovery-point, and shared-report foundation is recorded in
`../completed/lifecycle-provenance-and-recovery-foundation-2026-08-23.md`. The qualification-state
support policy, shared eligibility report, and recovery management workflows are recorded in
`../completed/update-policy-and-recovery-management-2026-08-23.md`. Executable fixture capture,
cross-version qualification, and declared update outcomes are recorded in
`../completed/executable-update-qualification-infrastructure-2026-08-23.md`. Token-bound adoption
and receipt-backed update automation are recorded in
`../completed/safe-update-automation-and-adoption-2026-08-23.md`.

## Current boundary

- Manifest v2 records generator, template-set, schema, and operation provenance.
- Stack and scaffold updates bind apply to the reviewed plan and use integrity-checked recovery
  points for managed file writes.
- The release workflow now archives an executable eight-ecosystem fixture and binds it to the
  release receipt. A later release can replay that exact source state with the target binaries.
- The cross-version harness applies realistic user edits, verifies each generated project, proves
  exact recovery, and binds its report to both releases. No two consecutive published releases
  have run this new flow yet.
- The 2026-08-12 public-repository qualification proves adopted-baseline planning, apply, and exact
  recovery. It does not prove historical release compatibility.
- The machine-readable update policy stays in qualification state until two consecutive
  manifest-v2 releases pass the published-binary harness. CLI and MCP report manual review outside
  the qualified window.
- Recovery points can be listed, shown, verified, restored, and pruned through CLI and MCP. Prune
  keeps unfinished and invalid entries.
- Pre-manifest projects can inspect likely Stack Parts and uncertainty without writing. Only an
  exact current-state token can create an adopted-unverified baseline.
- The opt-in update action opens a pull request only after support eligibility, verified lineage,
  deterministic planning, complete checks, and path-bounded apply pass. It attaches a SHA-bound
  receipt and pushes only a generated branch.

## Remaining outcomes

- [ ] Publish two consecutive manifest-v2 releases through the executable fixture and
      cross-version qualification flow.
- [ ] Record the published-binary cohort separately from the adopted-repository recovery cohort,
      then activate only the window proven by both release receipts.

## Completion

Close this project after two consecutive manifest-v2 releases pass the executable window, the
shared clients report the same eligibility, and both qualification cohorts meet their separate
acceptance gates without lost user changes.
