# Testing, Release, And Upstream

Use this guide when deciding what to verify after changes or when working on release-facing and upstream-maintenance tasks.
Scaffold commands, published-package cycles, and runtime-proof procedures live in
[testing/README.md](../../testing/README.md).

## Default verification strategy

Run the narrowest checks that cover the changed area:

- `bun run --cwd packages/types build` for shared type and metadata changes
- `bun run --cwd apps/web lint` for builder, route, or preview changes
- `bun run --cwd apps/cli lint` for prompt, CLI, or parity changes
- `bun test <path>` for focused regressions

For changes that affect stack options, generated output, compatibility, or preview correctness, also run:

```bash
bun run test
bun run test:release
```

The root `package.json` is authoritative for the lane's exact composition. It builds core packages,
runs `bun run test:scripts` (every test under `scripts/` and `testing/`), and runs the release-only
validators: agent docs, plugin bundle, preview and release workflows, public evidence claims,
capability evidence, recommendations, update qualification and actions, mutation contracts, the
built MCP protocol, and tech links. Package tests, including template output and builder parity,
run in `bun run test`, which CI runs on every pull request.
Runtime and published-package proof have separate commands; passing structural tests does not
establish that a generated application runs.

Additional focused release-facing checks:

- `bun run test:plugin-bundle` validates the local installable agent plugin manifest, marketplace entry, MCP command, icon paths, and bundled skills.
- `bun test test/generation/examples.test.ts` from `apps/cli` runs the CLI AI/chat example suite with the package's own workspace resolution.
- `bun test apps/cli/test/lifecycle/add-history-commands.test.ts` covers the user-facing `add` command, including stack-update dry-runs and apply flows.
- `bun test apps/cli/test/lifecycle/stack-update.test.ts` covers the lower-level planner/apply conflict model and create-time stack-field coverage.
- `bun run test:published-package -- --specifier <npm-tag-or-version>` validates the already-published npm package through Bun, npm, and pnpm scaffold runs. Use this only after a package has been published to npm.

## Important package-specific notes

- `apps/cli` lint already includes the sync test, so a parity regression can appear as a lint failure.
- Not every generated frontend template defines `check-types`. Root commands should use `--if-present` semantics when filtering across packages.
- `apps/web` route changes can require a build to regenerate `routeTree.gen.ts` before type checks settle.
- CLI parity and generator tests exercise built workspace packages in a few places. After changing `packages/types/src/*` or `packages/template-generator/src/*`, rebuild those packages before trusting CLI builder-sync, ecosystem generator tests, or scaffold output.
- `packages/template-generator/tsconfig.json` includes `src/**/*`; tests under `packages/template-generator/test/` need their own TypeScript coverage or an expanded include set.
- Runtime verification runs after pushes to main, on schedule, or through manual dispatch.
  The strict smoke suites, Playwright builder tests, and web-command roundtrip tests validate
  generated projects separately from PR lint.

## Release workflow expectations

- Pull requests run lint and tests. The final `Build Check` preserves the required check name and
  fails when either fails; Release Guard and the web build run only after pushes to main.
- After pushes to main, `.github/workflows/test.yaml` runs `Release Guard`, lint, tests, and the web
  build in parallel. `Build Check` fails when any prerequisite fails.
  Release Guard owns the core package and CLI builds; Web Build owns the Vercel-parity web build.
- `.github/workflows/release.yaml` starts after successful required CI on the exact main-branch
  release commit. It packs artifacts, runs generated-project proof, captures upgrade fixtures,
  qualifies the previous fixture, and binds the evidence into a SHA-bound release receipt before
  publication. It also runs the native Crystal, Ruby, and PHP HTTP proofs described in
  `testing/README.md`. It does not independently rerun the root `test:release` command.
- `.github/workflows/pr-preview-build.yaml` builds preview tarballs without secrets. Publication
  requires the protected `npm-preview` environment and its package-scoped credential. Preview and
  release workflows run published-package smoke checks after npm publication. Verify live
  environment settings separately; their current values are not recorded by the workflow file.
- Release artifacts use the versions already recorded in each package manifest. The workflow
  checks the release commit version against the CLI manifest; it does not choose or bump versions.
  `scripts/release/release-state.ts` owns artifact identity, preflight, publication, and recovery.
- The public `/changelog` page renders the checked-in `apps/web/content/changelog/index.mdx`, generated
  from the GitHub Releases API. After the release workflow creates a GitHub release, run
  `bun run --cwd apps/web changelog:sync` and commit the regenerated file. The site never fetches
  GitHub at request or build time.
- Keep Bun pinned for deterministic release verification, but prefer the Node/npm publish path for actual package publishing. Treat publish-tooling changes in `.github/workflows/release.yaml` as release-sensitive.
- See `preview-publishing-security.md` before changing preview workflow permissions, artifacts, secrets, or environments.

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
bun run scripts/maintenance/upstream-gap-report.ts --markdown

# JSON output
bun run scripts/maintenance/upstream-gap-report.ts --json

# Compare against a specific base ref
bun run scripts/maintenance/upstream-gap-report.ts --base origin/main --markdown

# Limit displayed commits per area
bun run scripts/maintenance/upstream-gap-report.ts --markdown --max-per-area 25
```

The report classifies likely backport candidates into `reliability`, `dependency-safety`, and `compatibility`. Treat it as advisory - no automatic merge/cherry-pick in CI.

### Backport procedure

1. Pick commits from the report by area and impact. Prefer reliability, DX, and compatibility fixes first; skip upstream architectural shifts that conflict with this fork.
2. Implement manually - avoid large cherry-picks unless the change is isolated and low-risk.
3. Keep Better-Fullstack-specific naming and architecture choices intact.
4. Run affected package checks, `bun run test`, and `bun run test:release` for stack/generator changes. Add the web
   build when routes or bundles change. Root `bun run check` formats the whole repository; avoid it
   for a scoped backport in a dirty worktree.
5. Keep each backport focused by theme. Commit, push, and PR creation need the user's authorization.
