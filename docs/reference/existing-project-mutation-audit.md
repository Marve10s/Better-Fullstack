# Existing-project mutation audit

This audit covers the Phase 2 command set: `add`, `remove`, `update`, `gen`, and local
`registry add`. The source registry is `scripts/mutation-contract-audit.ts`. Its validator checks
the implementation markers and this document during the release guard.

All machine-readable lifecycle results use `contractVersion: "2"`. Clients must check the version
before reading fields. Version 2 adds affected Stack Parts, files, dependencies, compatibility
decisions, manual-review reasons, checks, side effects, history, recovery identity, and warnings.

| Command        | Plan and approval                                                                                                                          | Filesystem boundary                                                                     | History and recovery                                                                       | External boundary                                                                                                      |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- |
| `add`          | The stack-update planner supports `--dry-run`. The explicit command approves ordinary changes. Architecture swaps require acknowledgement. | The shared project transaction binds preimages and rolls back generated files.          | Scaffold history and recovery metadata record the operation.                               | Optional dependency installation runs after the filesystem commit. Contract v2 reports its status and recovery action. |
| `remove`       | A part-removal adapter issues an exact review token over the stack-update plan.                                                            | It uses the stack-update engine and shared transaction.                                 | Scaffold history and recovery metadata record the operation.                               | Dependency installation remains a manual action.                                                                       |
| `update`       | Scaffold update and stack update issue exact review tokens. Their domain planners remain separate.                                         | Both use the shared project transaction and exact preimages.                            | Scaffold history and recovery metadata record the operation.                               | Template update does not run a package manager.                                                                        |
| `gen`          | The plan returns the resource and router-index bodies. Apply requires the unchanged token.                                                 | Both files use one transaction. A stale router anchor blocks the plan before any write. | Recovery metadata records output hashes and supports automatic rollback or later recovery. | No external side effect.                                                                                               |
| `registry add` | The local-pack plan returns pack files, dependency manifests, environment edits, and metadata merges. Apply requires the unchanged token.  | Every output uses one transaction and exact preimages. Remote sources remain rejected.  | Recovery metadata records output hashes and supports automatic rollback or later recovery. | The command edits dependency manifests but never runs a package manager. It reports the required install action.       |

## Findings and narrow fixes

The audit did not find a reason to replace the existing transaction primitive or merge the stack and
scaffold planners. `add` and `remove` already use stack update. Both update engines already share
recovery.

The original `gen` path wrote a resource before router wiring was known to be safe. It now plans the
two exact files, rejects stale anchors, requires a token, and applies through the shared transaction.

The original local registry path wrote pack files, package manifests, environment files, its lock,
and `bts.jsonc` directly. It now plans every final byte and applies them through one transaction.
Remote registry sources stay disabled.

Stack update, scaffold update, and removal duplicated plan hashing. They now use one canonical
review-token helper while keeping their different domain rules.

Package-manager and toolchain processes cannot be part of the byte-for-byte filesystem transaction.
Version 2 reports those side effects, their status, and a compensating action. A restored filesystem
does not imply that an external process was undone.

## Other write boundaries

Project adoption is a create-only exception. Its token binds the complete project state, and apply
publishes a new derived `bts.lock.json` with link-if-absent. It cannot replace user bytes, and its
first history entry records `baseline-adoption`.

`replace` shares the removal and stack-update engine. `doctor --fix` has its own token-bound
transaction contract. Recovery apply restores an existing recovery point, while destructive prune
holds the same project lock. The maintainer-only `update-deps` command updates generator source and
is not an existing generated-project lifecycle command.
