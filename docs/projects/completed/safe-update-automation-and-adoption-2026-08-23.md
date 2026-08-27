# Safe update automation and adoption, 2026-08-23

This note records the repository work for roadmap tasks T1.8 and T1.9. It does not activate a
historical support window. Published release qualification remains in the active project.

## Pre-manifest adoption

- The `adopt` CLI and `bfs_plan_project_adoption` MCP tool build the same read-only plan.
- The plan reports likely Stack Parts, each declaration source, medium or low confidence,
  current-template path and byte evidence, and the limits of that evidence.
- The confirmation token binds the canonical project, raw config, current baseline hashes,
  inferred parts, evidence, and uncertainty. A changed project or existing manifest makes it
  invalid.
- CLI and MCP confirmation create only `bts.lock.json`. The manifest records
  `adopted-unverified`, null source versions, current on-disk structured baselines, and no claim of
  historical compatibility.
- The old `update --record-baseline` path is now a safety stop that directs users to adoption and
  does not write.

## Opt-in update action

- `.github/actions/update-check` requires a clean checkout, exact CLI version, shared support
  eligibility, verified manifest-v2 recovery, and a complete generated-target check.
- It compares two canonical plans around the check and blocks conflicts, manual files, retained
  removals, unsafe paths, toolchain writes, and any nondeterminism.
- Check-only mode reports or fails on verified drift. Pull request mode applies only the reviewed
  token and rejects any changed path outside the plan and manifest.
- Pull request mode pushes only a generated `better-fullstack/update-<run-id>-<attempt>` branch. It
  never pushes the base branch.
- Every run uploads a SHA-bound update receipt. A created pull request embeds the final receipt and
  digest in its body.
- The release gate validates immutable action dependency pins, branch safety, receipt attachment,
  documentation, and the executable decision gate.

## Remaining boundary

The action cannot bypass the machine-readable support policy. Until two consecutive published
manifest-v2 releases qualify, historical projects continue to require manual review.
