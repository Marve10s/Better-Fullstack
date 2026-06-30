# Testing, Release, And Upstream

Use this guide when deciding what to verify after changes or when working on release-facing and upstream-maintenance tasks.

## Default verification strategy

Run the narrowest checks that cover the changed area:

- `bun run --cwd packages/types build` for shared type and metadata changes
- `bun run --cwd apps/web lint` for builder, route, or preview changes
- `bun run --cwd apps/cli lint` for prompt, CLI, or parity changes
- `bun test <path>` for focused regressions

For changes that affect stack options, generated output, compatibility, or preview correctness, also run:

```bash
bun run test:release
```

That release lane currently covers:

- installable plugin bundle validation
- CLI template snapshots
- AI example generated-output regression checks
- CLI/web option parity
- web preview config tests

Additional focused release-facing checks:

- `bun run test:plugin-bundle` validates the local installable agent plugin manifest, marketplace entry, MCP command, icon paths, and bundled skills.
- `bun run test:ai-examples` runs the CLI AI/chat example suite from the `apps/cli` package context so workspace package resolution matches local package scripts.
- `bun run test:published-package -- --specifier <npm-tag-or-version>` validates the already-published npm package through Bun, npm, and pnpm scaffold runs. Use this only after a package has been published to npm.

## Important package-specific notes

- `apps/cli` lint already includes the sync test, so a parity regression can appear as a lint failure.
- Not every generated frontend template defines `check-types`. Root commands should use `--if-present` semantics when filtering across packages.
- `apps/web` route changes can require a build to regenerate `routeTree.gen.ts` before type checks settle.
- CLI parity and generator tests exercise built workspace packages in a few places. After changing `packages/types/src/*` or `packages/template-generator/src/*`, rebuild those packages before trusting CLI builder-sync, ecosystem generator tests, or scaffold output.
- `packages/template-generator/tsconfig.json` includes `src/**/*`; tests under `packages/template-generator/test/` need their own TypeScript coverage or an expanded include set.
- The broad legacy runtime matrix in `apps/cli/test/e2e/e2e.e2e.ts` is not the PR-stable runtime contract. PR runtime confidence should come from `testing/smoke-test.ts --dev-check --strict`, Playwright builder tests, and `apps/cli/test/e2e/web-command-roundtrip.test.ts`.

## Release workflow expectations

- `.github/workflows/test.yaml` runs a dedicated `Release Guard` job before broader build checks.
- `.github/workflows/release.yaml` also runs the release verification lane before publishing packages.
- `.github/workflows/pr-preview.yaml` and `.github/workflows/release.yaml` run the published-package smoke lane after publishing npm packages, because that check needs the real npm tag/version to be visible.
- Published packages are versioned independently inside the release workflow. Do not hand-edit version bumps casually during unrelated feature work.
- Keep Bun pinned for deterministic release verification, but prefer the Node/npm publish path for actual package publishing. Treat publish-tooling changes in `.github/workflows/release.yaml` as release-sensitive.

## CI build-order notes

- The CI lint job builds `@better-fullstack/types` before running `validate:tech-links`, so workspace alias imports work in `apps/web`. If a new pre-build CI step is added that touches web source, ensure types are built first.
- Scaffold and smoke harnesses should resolve the CLI binary from `apps/cli/package.json` and self-build needed workspace packages instead of assuming `apps/cli/dist/cli.mjs` already exists.
- Preserve structured CLI scaffold diagnostics, expected-file checks, and CI artifact uploads in `testing/lib/cli-scaffold.ts`-based harnesses; they are what make web-command round-trip and package-manager failures debuggable.
- Keep plugin validation in `test:release` dependency-light. The repo-owned validator should not require Python packages or external plugin tooling to catch manifest/path drift in CI.

## Upstream maintenance

### Weekly CI workflow

`.github/workflows/upstream-gap.yml` runs every Monday and generates a grouped gap report for `apps/cli`, `apps/web`, `packages/template-generator`, and `packages/types`. The report is posted in the workflow summary and appended to the tracking issue.

### Local usage

```bash
# Markdown report
bun run upstream-gap-report
# or
bun run scripts/upstream-gap-report.ts --markdown

# JSON output
bun run scripts/upstream-gap-report.ts --json

# Compare against a specific base ref
bun run scripts/upstream-gap-report.ts --base origin/main --markdown

# Limit displayed commits per area
bun run scripts/upstream-gap-report.ts --markdown --max-per-area 25
```

The report classifies likely backport candidates into `reliability`, `dependency-safety`, and `compatibility`. Treat it as advisory — no automatic merge/cherry-pick in CI.

### Backport procedure

1. Pick commits from the report by area and impact. Prefer reliability, DX, and compatibility fixes first; skip upstream architectural shifts that conflict with this fork.
2. Implement manually — avoid large cherry-picks unless the change is isolated and low-risk.
3. Keep Better-Fullstack-specific naming and architecture choices intact.
4. Run gates:
   - `bun run check`
   - `bun run build`
   - `cd apps/cli && bun test cli-builder-sync`
   - `cd apps/web && bun run build`
5. Open focused PRs by theme (stability, commands, web parity, etc.).

Use `docs/plans/README.md` as the stable entry point for current planning documents.
