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
- `bun run testing/generated-project-proof.ts`
  Generates one fresh project for each of the eight supported ecosystems. Every row installs or
  builds and then crosses a live HTTP, gRPC, authentication, migration, or generated-command
  boundary. It writes SHA-bound evidence under `testing/.smoke-output/generated-project-proof/`.
- `bun run test:recipe-runtime`
  Generates a fresh supported TypeScript project, applies a reviewed persistent resource recipe,
  installs dependencies, applies its Drizzle schema, runs CRUD through tRPC, and verifies local
  recipe ownership.

Keep these lanes separate. A package-manager regression should fail the package-manager lane, not the smoke presets, and a runtime template regression should fail the relevant preset group.

The generated-project proof lane is stricter than exploratory smoke coverage. Every declared
toolchain must exist, every exact matrix row must be present, and every required step must execute
successfully. Missing tools, skipped required steps, a dirty workspace, or a non-full/mismatched
Git SHA produce non-green evidence and a nonzero exit. The lane proves only the behavior declared
by each recipe. It does not claim behavior outside those assertions or version-to-version upgrade
safety.

## Curated Generated-Project Proof

Run this section independently when changing generation, browser ZIP lifecycle files, CLI
lifecycle behavior, or polyglot templates.

Prerequisites:

- A clean Git worktree checked out at a real commit, so evidence can bind to the full 40-character
  SHA.
- Node.js, Bun, `bunx`, Go, `uv`, Rust/Cargo, Java, Elixir/Mix, and the .NET SDK on `PATH`.
- Network access to the package registries used by every matrix row.

From the repository root:

```bash
bun install --frozen-lockfile
bun run --cwd packages/types build
bun run --cwd packages/template-generator build
bun test testing/generated-project-proof.test.ts apps/web/test/project/project-download.test.ts
bun test apps/web/test/project/browser-cli-lifecycle.test.ts --timeout 120000
bun run test:recipe-runtime
bun run testing/generated-project-proof.ts
```

Success means both contract-test commands pass and the runner exits zero for TypeScript, React
Native, Rust, Python, Go, Java, Elixir, and .NET. The browser lifecycle contract deliberately checks
an extracted, uninstalled ZIP as non-green, then proves current update planning plus public add
dry-run and apply recognition without installing dependencies.

Evidence is written to
`testing/.smoke-output/generated-project-proof/generated-project-proof.json`; the readable summary
is `testing/.smoke-output/generated-project-proof/generated-project-proof.md`. The capability
projection is `testing/.smoke-output/generated-project-proof/capability-runtime-receipt.json`. On failure, inspect
each recorded command, duration, exit/timeout status, and stdout/stderr tail in the JSON. Missing
toolchains, skipped steps, a dirty worktree, or a short/mismatched SHA are proof failures, not
warnings.

## Real WebContainer Proof

Run this section independently when changing Edit & Run, the browser generator, template packages,
or builder state translation. It uses the actual WebContainer runtime; no external secrets are
required, but browser network access is required for runtime boot and package installation.

Prerequisites are Node.js 22, Bun, Chromium dependencies, and network access. From the repository
root:

```bash
bun install --frozen-lockfile
bun run --cwd packages/types build
bun run --cwd packages/template-generator build
bunx playwright install chromium --with-deps
cd apps/web
bunx playwright test --grep @webcontainer-proof
```

Success is one tagged Playwright test reaching **Ready**, observing the generated source file,
editing it through the real code editor, rerunning the project, and finding the changed text in the
served iframe. A missing runtime, blocked network request, install failure, or timeout fails the
proof. Diagnostics are written to `apps/web/test-results/` and the HTML report to
`apps/web/playwright-report/`; CI uploads them as the `webcontainer-proof-report` artifact.

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
   - `testing/.smoke-output/generated-project-proof/generated-project-proof.json`
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
