# Lifecycle Commands and MCP

Use this guide for create, add, update, check/doctor, gen, history, registry, and their MCP surfaces.

## Lifecycle Model

```text
create -> verify -> add/update -> review -> apply -> verify -> regenerate/check
```

- `create` materializes a validated stack and records its scaffold baseline.
- `add` adds requested capabilities without replacing unrelated selections.
- stack update changes the selected architecture and may require migration acknowledgement.
- template `update` re-renders the same config and classifies drift against the baseline.
- `check`/`doctor` diagnose the current project without pretending to prove every runtime.
- `gen` performs supported code generation inside the selected project.

Do not overload one command with another command’s semantics.

## Plan and Apply

- Mutating workflows expose a read-only plan before apply.
- A plan must not create files, alter config, install dependencies, or refresh baselines.
- CLI default/dry-run and MCP plan tools call the same core planner used by apply.
- Apply consumes the same normalized request and must not silently decide a different stack.
- JSON output must carry enough structured information for an agent to review without parsing prose.
- Architecture replacements report migration steps before mutation.
- If acknowledgement is required, enforce it in the core operation, not only terminal prompts.

## Existing Project Safety

`bts.jsonc` records selected architecture. `bts.lock.json` records the formatted scaffold
baseline used to distinguish:

- untouched generated files;
- template-only drift;
- user-only edits;
- simultaneous divergence/conflict;
- new or removed generated files;
- structured merges;
- manual-review files.

Rules:

- Never treat current disk content as if it were the old generated baseline.
- Never overwrite a file that diverged from its baseline unless the merge strategy explicitly
  proves the user edit is preserved.
- User deletion counts as a local edit; do not silently re-add the deleted key/file.
- Without a baseline, classify conservatively and instruct adoption/record-baseline.
- Only files reconciled to the current render advance their baseline.
- Conflicted/manual files retain their old baseline so the next run still detects the divergence.

## Structured Merges

Structured merge support is an allowlist, not a license for arbitrary rewriting.

- Preserve user-owned keys in `package.json`.
- Add or update generator-owned dependencies/scripts only when baseline comparison makes it safe.
- Preserve user values in environment examples; merge required variable names and comments
  conservatively.
- Invalid or baseline-less structured files become manual review.
- Formatting happens before hashing/comparison so formatter-only differences do not masquerade as
  user edits.

## Additive vs Replacement Changes

- Adding from `none` to a capability is normally additive.
- Replacing database, ORM, auth, API, or backend is architecture-sensitive.
- Data, schemas, sessions, routes, and source code are not migrated merely because config changes.
- The plan must state manual migration boundaries.
- Array capabilities merge uniquely and support explicit clearing.
- Preserve unrelated graph owners and services.

## CLI and MCP Parity

MCP is a transport for the product model, not a separate product.

- MCP guidance points agents toward schema, compatibility, plan, then apply/create.
- MCP tool input uses the same schemas and aliases as CLI.
- Plan/create and plan/apply pairs return matching compatibility adjustments and warnings.
- MCP create/add/update do not claim dependencies were installed when they were not.
- Error codes are stable identifiers; free-form internal exceptions are not an API.
- Manual-review blockers, migration steps, install commands, and changed files remain structured.
- When adding a CLI lifecycle feature, update or explicitly rule out the corresponding MCP surface.

## Non-Interactive Behavior

- Every agent/CI path must be fully prompt-free.
- Pass explicit `none` for optional categories when reproducibility matters.
- `--no-install --no-git` avoids unrelated side effects in validation/scaffolding workflows.
- Dry-run must be safe to repeat.
- JSON mode must not depend on terminal formatting or interactive cancellation behavior.
- Respect the scripted CLI guidance before matrix runs.

## Telemetry

- Track normalized command names, statuses, counts, and product identifiers only.
- Never pass raw arguments, prompts, paths, config file contents, or exception messages as
  dimensions.
- Started, succeeded, failed, and cancelled are distinct lifecycle outcomes.
- Telemetry failure must not make the command fail.

## Verification

Choose tests that prove the changed boundary:

- core planner tests for classification and safety;
- CLI tests for flags, JSON, exit behavior, and prompt avoidance;
- MCP tests for schemas and structured parity;
- graph/command round-trip tests for configuration changes;
- generated output tests for files and baseline behavior;
- smoke presets when runtime evidence matters.

Release-sensitive lifecycle changes require `bun run test:release`.
