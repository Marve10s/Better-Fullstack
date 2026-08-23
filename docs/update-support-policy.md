# Update support policy

Better Fullstack does not yet advertise a historical update window. The policy remains in
`qualification` until two consecutive manifest-v2 releases pass the executable cross-version
matrix. The current source list is empty, so `supportedFrom` and `supportedTo` are both `null`.

The executable policy lives in `packages/types/src/update-support.ts`. Project status returns its
decision through the same service for CLI human output, CLI JSON, and MCP.

## Current outcomes

- A project with verified manifest-v2 lineage from the exact installed CLI release is eligible for
  same-release template reconciliation. This does not count as historical upgrade evidence.
- A project without manifest v2 or verified source lineage requires manual review. Better Fullstack
  does not claim that its source release is supported.
- A project from another release requires manual review while the policy is in qualification. A
  plan and recovery point may still help an operator, but they do not turn the operation into a
  supported historical upgrade.

## Rolling window

After qualification, the policy may list at most two consecutive manifest-v2 releases. The first
entry becomes `supportedFrom`, and the latest qualified target becomes `supportedTo`. A release
enters the list only after its published binary fixture proves generation provenance, realistic user
edits, target upgrade, build verification, interruption handling, and exact managed-file recovery.

The oldest release leaves the window when a newer consecutive release qualifies. Projects outside
the list remain manual-review operations. Better Fullstack does not infer or backfill verified
lineage for projects created before manifest v2.

## Machine-readable result

Each successful project report includes these fields:

- `supportedFrom` and `supportedTo`, which remain `null` before qualification.
- `sourceVersion` and `targetVersion` as exact release identities when known.
- `eligibility`, which is `same-release`, `supported`, or `manual-review-required`.
- `eligible`, `historicalUpgrade`, and `requiresManualReview` as explicit booleans.
- `reasonCode` and `reason` for stable automation and human explanation.

Consumers must use `reasonCode` for control flow. The prose reason may change without a contract
version change.

## Executable release fixtures

Every release now prepares `upgrade-fixture.v1.json` from the exact package tarballs before npm
publication. The bundle contains one project for each of the eight ecosystem surfaces. It binds
the source commit, package hashes, CLI and generator versions, template set, schema, generation
command, Stack Parts, file modes, file hashes, file bytes, `bts.jsonc`, and `bts.lock.json`.

The release receipt binds the fixture digest. The fixture is also a GitHub release asset. A later
release materializes the prior asset, injects a realistic user edit, plans and applies with its
exact candidate CLI tarball, verifies byte-exact recovery, reapplies, and runs the ecosystem build
verifier. Before the first fixture-bearing release exists, the receipt records
`awaiting-prior-fixture` instead of inventing a supported window. A partial prior evidence set or a
failed qualification blocks the release.

## Declared merge and filesystem outcomes

| Case                   | Declared plan and apply result                                                                                    |
| ---------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `clean-auto-merge`     | A baseline-matching structured file receives safe template additions and remains recoverable.                     |
| `user-only-edit`       | The file is classified as user-edited and is never selected for apply.                                            |
| `generator-only-edit`  | The file is actionable drift, receives exact reviewed bytes, and advances its baseline.                           |
| `compatible-dual-edit` | Structured template additions merge while unrelated user keys and scripts remain exact.                           |
| `conflict`             | Divergence on both sides is non-actionable and retains the user's bytes and old baseline.                         |
| `deleted-file`         | A locally deleted baseline file remains absent and is not silently re-added.                                      |
| `user-rename`          | The missing original is a local edit; the unowned renamed path remains untouched.                                 |
| `template-rename`      | The new template path is additive, the prior path is reported as removed, and the prior path is not auto-deleted. |
| `missing-baseline`     | Structured changes require manual review; apply is unavailable without a readable manifest-v2 baseline.           |
| `interrupted-apply`    | A pending transaction remains discoverable and can restore every journaled preimage.                              |
| `failed-write`         | A reported write failure rolls operation-owned files and the manifest back to exact preimages.                    |

`scripts/validate-update-qualification.ts` binds each declared case to its focused test. The release
guard fails if a case loses either its documented result or its executable evidence.

## Separate qualification cohorts

Published-binary fixtures are the only source of historical-window evidence. The adopted public
repository cohort remains a stress test for user-edit protection, apply, and exact recovery. It
does not supply source-release lineage and cannot activate the rolling window.
