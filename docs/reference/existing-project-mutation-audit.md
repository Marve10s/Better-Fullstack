# Existing-project mutation audit

This audit covers the existing-project command set: `add`, `remove`, `update`, `gen`, and local
`registry add`. The source registry is `scripts/validation/mutation-contract-audit.ts`. Its validator checks
the implementation markers and this document during the release guard.

All machine-readable lifecycle results use `contractVersion: "2"`. Clients must check the version
before reading fields. Version 2 adds affected Stack Parts, files, dependencies, compatibility
decisions, manual-review reasons, checks, side effects, history, recovery identity, and warnings.

| Command        | Plan and approval                                                                                                                          | Filesystem boundary                                                                     | History and recovery                                                                       | External boundary                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `add`          | The stack-update planner supports `--dry-run`. The explicit command approves ordinary changes. Architecture swaps require acknowledgement. | The shared project transaction binds preimages and rolls back generated files.          | Scaffold history and recovery metadata record the operation.                               | Optional dependency installation runs after the filesystem commit. Contract v2 reports its status and recovery action. |
| `remove`       | A part-removal adapter issues an exact review token over the stack-update plan.                                                            | It uses the stack-update engine and shared transaction.                                 | Scaffold history and recovery metadata record the operation.                               | Dependency installation remains a manual action.                                                                       |
| `update`       | Scaffold update and stack update issue exact review tokens. Their domain planners remain separate.                                         | Both use the shared project transaction and exact preimages.                            | Scaffold history and recovery metadata record the operation.                               | Template update does not run a package manager.                                                                        |
| `gen`          | The adapter plans every recipe artifact and managed-region edit. Apply requires the unchanged token.                                                 | All recipe files, records, and agent-context edits use one transaction. Stale anchors or ownership hashes block mutation. | Recovery metadata records output hashes and supports automatic rollback or later recovery. | No external side effect.                                                                                               |
| `registry add` | The local-pack plan returns pack files, dependency manifests, environment edits, and metadata merges. Apply requires the unchanged token.  | Every output uses one transaction and exact preimages. Remote sources remain rejected.  | Recovery metadata records output hashes and supports automatic rollback or later recovery. | The command edits dependency manifests but never runs a package manager. It reports the required install action.       |

## Shared constraints

Stack and scaffold planners keep separate domain rules while sharing transaction, review-token,
and recovery primitives in `packages/project-lifecycle`. `add`, `remove`, and `replace` use the
stack-update engine.

`gen` now includes persistent and in-memory recipe adapters. Its write set is not limited to the
original two-file resource/router operation; see [the recipe contract](recipe-generation-contract.md).
Local registry installation includes pack files, manifests, environment edits, lock metadata, and
config in one transaction. Remote registry sources remain disabled.

Package-manager and toolchain processes are outside the byte-for-byte filesystem transaction.
Contract v2 reports their status and compensating actions. Restoring files does not undo an
external process.

## Other write boundaries

Project adoption is a create-only exception. Its token binds the complete project state, and apply
publishes a new derived `bts.lock.json` with link-if-absent. It cannot replace user bytes, and its
first history entry records `baseline-adoption`.

`replace` shares the removal and stack-update engine. `doctor --fix` has its own token-bound
transaction contract. Recovery apply restores an existing recovery point, while destructive prune
holds the same project lock. The maintainer-only `update-deps` command updates generator source and
is not an existing generated-project lifecycle command.
