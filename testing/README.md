# Generated-project testing

Choose the smallest lane that proves the changed behavior. Repository check selection and release
rules live in [testing and release guidance](../docs/guidelines/testing-release-and-upstream.md).
This file owns scaffold execution, published-package validation, and runtime-proof procedures.

## Lanes

| Command | Proof |
| --- | --- |
| `bun run test:smoke:pr-core` | Curated core generated-project checks. |
| `bun run test:smoke:pr-broad` | Additional curated frontend/ecosystem checks. |
| `bun run test:e2e:package-managers` | Default `--yes` path across package managers. |
| `bun test apps/cli/test/e2e/web-command-roundtrip.test.ts --timeout 600000` | Web-produced commands against the built CLI. |
| `bun run testing/generated-project-proof.ts` | Named ecosystem recipes crossing live behavior boundaries. |
| `bun run testing/php-runtime-proof.ts` | Fresh PHP/Slim install, native build/tests, parsed HTTP responses, rejected input, and shutdown. |
| `bun run test:recipe-runtime` | Generated persistent resource CRUD and ownership checks. |
| `bun run test:elixir-release` | A generated production Mix release with two-node discovery and RPC in both directions. |
| `bun run test:published-package -- --specifier <tag-or-version>` | Already-published npm package through the installed-package smoke harness. |

Smoke presets use Bun installs except as noted below. Package-manager correctness belongs in its
dedicated matrix, including Yarn inference and CI immutable/hardened installs. Preset groups in
`testing/lib/presets.ts` are `pr-core`, `pr-broad`, and their `all` union.

A preset can add `runtimeChecks`. `production-start` serves the built web app with its `serve`
script and requests the listed routes. `docker-image` runs after the usual install, build, and
type check pass: it builds `apps/server/Dockerfile` from the project root, runs the image, and
requests `/`. It needs a running Docker daemon, and `--strict` (as in `test:smoke:pr-core`) fails
without one. A preset with `packageManager: "pnpm"` installs with pnpm, since Bun cannot resolve
pnpm `catalog:` versions, so pnpm must be on `PATH`; its scripts still run through `bun run`.
`--dev-check` loads a web page, so it is skipped for a project without a web frontend.

## Crystal native proof

`bun run testing/crystal-runtime-proof.ts --output <directory>` requires Crystal 1.22.1 and Shards 0.20.0 after building core packages. Pass `--framework lucky`, `athena`, or `marten` to prove another framework; Kemal is the default. Pass `--orm crystal-db`, `avram`, or `marten-orm` to add a database layer; Avram needs a reachable PostgreSQL in `DATABASE_URL` and `TEST_DATABASE_URL`. Pass `--auth jwt`, `kemal-session`, or `marten-auth` to prove sign-in. Pass `--testing spectator`, `spec-kemal`, or `none` to change the generated test tooling; `none` skips the spec step. Pass `--validation athena-validator`, `active-model`, or `marten-schema` to validate greeting names with a library. Pass `--cache memory`, `file`, or `redis` to prove a TTL-cached route; `redis` needs a reachable server in `REDIS_URL`. Pass `--jobs sidekiq`, `mosquito`, or `tasker` to prove a background greeting job; the Redis queues also need `REDIS_URL`, and the proof starts `bin/worker` beside the server. It creates a fresh native project, installs and compiles the framework, runs specs, and checks real HTTP responses and shutdown. CI and release preparation run the default Kemal recipe with no flags; other selections need their own run. The output preserves the generated project, toolchain, dependency lockfile, producer identity, and results as an experimental observation, separately from the eight-recipe public receipt.

## Prompt-free execution

- Use explicit stack flags without `--yes`; the default-path matrix tests `--yes` separately.
- Use `--ai-docs none` to avoid that prompt and `--no-git` to skip repository initialization.
  Pass explicit shadcn detail selections when testing shadcn, including `--shadcn-base`.
- Use `--no-install` for generation-only runs. Such runs do not prove dependency or runtime behavior.
- Silent create and addon setup must use deterministic defaults rather than fall through to prompts.
  Exit code zero with an empty project directory is a failure.
- For existing-project changes, inspect an explicit `add --project-dir <dir> --dry-run` plan before
  apply. Keep dependency installation separate unless it is the behavior under test.
- Check the current compatibility rules before selecting a matrix. Test rejected graphs deliberately,
  not as accidental runtime failures. Validate emitted files as well as persisted config.
- Prompt-resolver tests must exercise real resolvers. Filtered defaults must be available choices;
  explicitly resolve injected CI state rather than inheriting ambient `process.env.CI` accidentally.

## Published-package cycles

The package must already exist on npm before the installed-package smoke lane can run. Follow the
workflow's pinned toolchain setup; this guide does not authorize a publication.

For a manual cycle, inspect `combos-*.json` to avoid duplicating old coverage, select a bounded batch,
and run `bun create better-fullstack@<version>` with explicit choices. Resolve and record the exact
version when testing `@latest`. `testing/generate-combos.ts` can generate candidate combinations.

Install and run the ecosystem's relevant checks. A scaffold-only result, Python syntax compilation,
Rust type checking, a full build, and a live request are different evidence levels. Native tools
such as `protoc` may be prerequisites for specific recipes.

When a published package fails, record that failure separately from a local fix. Rebuild changed
workspace packages and the CLI before retesting locally; do not report a local pass as a changed
npm package. Remove temporary projects when their checks end.

Write `combos-YYYY-MM-DD.json` with exact selections/commands, published version, performed checks,
pass/fail, concrete issue details, and local-fix results. Preserve existing ledgers.

## Generated-project runtime proof

The proof needs a clean checkout at a full commit SHA, registry access, and all declared toolchains.
Use `.github/workflows/generated-project-proof.yaml` for exact setup and versions. From the root:

```bash
bun install --frozen-lockfile
bun run --cwd packages/types build
bun run --cwd packages/project-lifecycle build
bun run --cwd packages/template-generator build
bun run --cwd apps/cli build
bun test testing/generated-project-proof.test.ts apps/web/test/project/project-download.test.ts
bun test apps/web/test/project/browser-cli-lifecycle.test.ts --timeout 600000
bun run test:recipe-runtime
bun run testing/generated-project-proof.ts
```

Every required row and step must execute successfully. Missing tools, skipped required steps,
dirty inputs, or a mismatched SHA fail proof. Native backend HTTP checks do not prove device UI;
current-runtime checks do not prove historical upgrades. See the
[capability inventory](../docs/reference/capability-evidence-inventory.md) for recipe boundaries.

The native PHP proof runs separately in CI and releases. It needs PHP 8.5.12 and Composer 2.10.3
with the `dom`, `filter`, `json`, `libxml`, `mbstring`, and `xmlwriter` extensions. It covers only
Slim with no database, addons, or examples; Laravel, Symfony, ORMs, auth, and other PHP options
need their own runtime proof before a runtime claim. It records its CLI hash, source revision,
dirty state, toolchain versions, Composer lockfile, and native results. This observation does not
change the versioned eight-case upgrade fixture or promote public capability evidence. Successful
runs remove their temporary project; failed runs retain it for diagnosis.

Results under `testing/.smoke-output/generated-project-proof/` include
`generated-project-proof.json`, its Markdown summary, and `capability-runtime-receipt.json`.
Browser ZIP lifecycle checks must also preserve the non-green state of an uninstalled extraction.

## Ruby HTTP proof

Ruby has a separate experimental Sinatra proof. Use Ruby 3.4.11 and Bundler 4.0.21, build the repository producers above, then run:

```sh
bun run testing/ruby-runtime-proof.ts --output testing/.smoke-output/ruby-runtime-proof
```

The proof covers only Sinatra with no database, addons, or examples; other Ruby frameworks and options need their own runtime proof. The runner installs the generated native service, checks syntax, runs Minitest/Rack tests, and verifies live JSON responses, invalid-input rejection, and shutdown. It records toolchains, producer identity, the generated lockfile, and step results. CI and release preparation require this separate gate. Its observation does not change the eight golden runtime recipes, historical upgrade fixtures, or public capability qualification.
## Elixir release proof

Run `bun run test:elixir-release` with Elixir 1.17 or newer, compatible OTP, Hex, Rebar,
and registry access. This opt-in lane builds the CLI prerequisites, generates an isolated
headless clustered release, fetches production dependencies, builds the release, and runs
two nodes over loopback. It checks the shared-cookie requirement, discovery, and RPC in
both directions, then stops its nodes and removes the generated project. It does not
deploy to Fly or Gigalixir or build a Docker image.

## WebContainer proof

Use the real browser runtime when verifying Edit & Run. Follow
`.github/workflows/webcontainer-proof.yaml` for toolchain setup and prerequisites. After building
shared types and the generator, install the required Playwright browser and run from `apps/web`:

```bash
bunx playwright test --grep @webcontainer-proof
```

Success requires reaching Ready, editing generated source through the editor, rerunning, and
observing the changed text in the served iframe. A blocked network request or missing runtime fails
proof. Diagnostics live in `apps/web/test-results/` and `apps/web/playwright-report/`.

## Build inputs and diagnostics

Built-CLI lanes need current types, generator, and CLI artifacts. Follow the shared scaffold helper's
binary resolution and self-build behavior; do not assume a stale `dist/cli.mjs` is suitable.
Respect the repository's resource limits before installs, builds, browsers, or full matrices.

Preserve exact command, cwd, timeout, exit code/signal, stdout/stderr tails, generated-directory
snapshot, and missing expected files in scaffold failures. Core/broad smoke output lives under
`testing/.smoke-output/`; CLI round-trip and package-manager artifacts use their `.smoke-*` folders.
Fix the generator or harness instead of replacing runtime checks with source markers.
