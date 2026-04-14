# Testing Playbook

## Runtime Lanes

The runtime hardening stack is split into separate lanes on purpose.

- `bun run test:smoke:pr-core`
  Runs the representative curated runtime matrix used on pull requests for the most important product scenarios.
- `bun run test:smoke:pr-broad`
  Runs the broader curated runtime matrix used on pull requests for additional frontend and ecosystem coverage.
- `bun run test:e2e:package-managers`
  Verifies the default `--yes` path against `npm`, `pnpm`, `bun`, and `yarn`.
- `bun test apps/cli/test/e2e/web-command-roundtrip.test.ts --timeout 600000`
  Verifies web-generated commands against the built CLI.

Keep these lanes separate. A package-manager regression should fail the package-manager lane, not the smoke presets, and a runtime template regression should fail the relevant preset group.

## Preset Groups

`testing/lib/presets.ts` exposes deterministic preset groups:

- `pr-core`
  Use this when validating the main PR runtime contract or iterating on the most representative scenarios.
- `pr-broad`
  Use this when validating the extended PR runtime contract or iterating on secondary but still required scenarios.
- `all`
  Union of `pr-core` and `pr-broad`. Useful for local sweeps and for checking group coverage.

Smoke presets intentionally keep `packageManager: "bun"`. TypeScript generated-app verification still runs with `bun install`, `build`, and `dev-check` in these presets. Package-manager correctness belongs in the dedicated default-path matrix.

## Standard Flow

1. Choose the narrowest lane that matches the change.
2. Build the required packages first for built-CLI lanes:
   ```bash
   ~/.bun/bin/bun run --cwd packages/types build
   ~/.bun/bin/bun run --cwd packages/template-generator build
   ~/.bun/bin/bun run --cwd apps/cli build
   ```
3. Run the targeted lane:
   ```bash
   ~/.bun/bin/bun run test:smoke:pr-core
   ~/.bun/bin/bun run test:smoke:pr-broad
   ~/.bun/bin/bun run test:e2e:package-managers
   ~/.bun/bin/bun test apps/cli/test/e2e/web-command-roundtrip.test.ts --timeout 600000
   ```
4. Inspect the generated artifacts under:
   - `testing/.smoke-output/core/`
   - `testing/.smoke-output/broad/`
   - `apps/cli/.smoke-web-command-roundtrip/`
   - `apps/cli/.smoke-default-package-managers/`
5. Fix generator or harness bugs in the repo rather than weakening assertions.

## Real Verification Rules

Smoke verification stays real:

- TypeScript: `bun install`, `build`, `dev-check`, advisory `lint`
- Rust: `cargo check`
- Python: `uv sync --all-extras`, `compileall`, advisory `ruff`
- Go: `go mod tidy`, `go build`, advisory `go vet`

Do not turn curated presets into marker-only checks.

## Diagnostics

Built-CLI scaffold failures should come from the shared structured diagnostics helper. Preserve these fields when changing the harness:

- exact command
- cwd
- timeout state
- exit code and signal
- stdout/stderr tails
- generated-project directory snapshot
- missing expected files when applicable

This contract is used by round-trip tests, the package-manager matrix, and smoke scaffolding so CI artifacts stay actionable.
