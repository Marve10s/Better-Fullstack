# Scripted CLI Runs

Use this guide when the task involves non-interactive project generation, matrix tests, or automation around the CLI.

## Rules for non-interactive runs

- Do not combine `--yes` with explicit core stack flags like `--frontend`, `--css-framework`, or `--ui-library`. If you need explicit stack choices, skip `--yes`.
- Pass `--ai-docs none` if the run must avoid AI-doc prompts completely.
- When using `--ui-library shadcn-ui`, also pass explicit shadcn sub-options. At minimum include `--shadcn-base`, and ideally provide the full `--shadcn-*` set used by the test.
- Scripted scaffolds, smoke tests, and `create()` silent mode must not fall through to Clack prompts. Addon-specific setup paths should use deterministic defaults when prompt interactivity is disabled.

## Validation expectations

- Do not rely only on `bts.jsonc` for shadcn validation. Some shadcn sub-options are not persisted there yet.
- Validate generated output through files such as `components.json`, CSS, dependency manifests, and other emitted artifacts.
- If a scripted run ends with exit code `0`, still inspect whether the target directory is actually populated when shadcn prompts were expected. The CLI has historically returned success after leaving an empty directory in that scenario.

## Matrix caveats

- Respect known compatibility rules when constructing matrices. Avoid combinations that the product already blocks unless the test is intentionally exercising validation.
- Redwood combinations need special care: `api=none`, backend-aware path expectations, and limited UI-library support.
- `shadcn-ui` is intentionally incompatible with `svelte` and `solid-start`.
- For SvelteKit and SolidStart, prefer `daisyui`, `ark-ui`, `park-ui` (SolidStart only), or `none` when building valid non-shadcn matrices.
- Curated smoke presets intentionally install generated TypeScript apps with `bun install` regardless of the preset package manager. Package-manager correctness belongs in `apps/cli/test/e2e/default-package-manager-matrix.test.ts`.
- Keep Yarn package-manager inference and GitHub Actions hardened/immutable install behavior covered in the package-manager matrix.

## Prompt environment

- Prompt resolver coverage should import the actual prompt resolver modules, not recreate coverage from raw schema values.
- Conditional prompt defaults must always be present in the resolved option set after frontend or ecosystem filtering.
- When injecting prompt environment state, resolve CI defaults explicitly so `ci: undefined` remains an override instead of inheriting ambient `process.env.CI`.

## Recommended command style

- Use Bun-based invocation from the workspace.
- Prefer explicit flags over relying on defaults when the result must be deterministic.
- Capture generated output in a temp directory and inspect both console output and files on disk.
