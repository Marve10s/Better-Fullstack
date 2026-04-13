The role of this file is to describe common mistakes and confusion points that agents might encounter as they work in this project. If you ever encounter something in the project that surprises you, please alert the developer working with you and indicate that this is the case in the AgentMD file to help prevent future agents from having the same issue.

## Guidelines

Do not read files in `docs/guidelines/` by default. Treat this section as an index and only open a guideline file when the user request clearly matches that topic.

See `docs/guidelines/` for deeper reference on these topics:

- `README.md` - folder purpose, usage rules, and quick index for all guideline files
- `architecture-and-ownership.md` - monorepo package ownership and where changes belong
- `stack-options-and-compatibility.md` - schema source of truth, canonical option metadata, aliases, and compatibility rules
- `generator-change-playbook.md` - how option changes flow through templates, snapshots, CLI output, and web previews
- `web-builder-and-url-state.md` - stack builder state, URL parsing, lazy-route constraints, and preview wiring
- `testing-release-and-upstream.md` - targeted verification commands, release guard expectations, and upstream backport workflow
- `scripted-cli-runs.md` - safe non-interactive CLI usage, prompt-avoidance flags, and matrix-testing caveats
- `production-package-testing.md` - how to use the `testing/` workspace for published npm-package validation cycles
- `template-output-and-validation.md` - template conditional logic, generated output validation, sync test discipline, and framework-specific constraints
- `adding-new-tool-options/` - **read this subfolder when adding any new library, tool, or category** to any ecosystem (TypeScript, Rust, Go, Python). Covers every file that must be touched, with worked examples, template handler reference, test patterns, and routing gotchas (Convex skips, self-backend, frontend array detection, processor ordering)

## Git Remotes and Pull Requests

This is a fork. There are two remotes:

- `origin` → `Marve10s/Better-Fullstack` (our fork — **always create PRs here**)
- `upstream` → `AmanVarshney01/create-better-t-stack` (the upstream project — never push PRs here)

When creating pull requests, always target `--repo Marve10s/Better-Fullstack`. Do not let `gh pr create` default to the upstream repo.

## Workflow

- Never start the dev server (`turbo dev`, `bun run dev`, `vite dev`, etc.) unless explicitly asked to.
- After code changes, run the smallest verification set that proves the modified area still works. Prefer package-local `bun run lint`, `bun run test`, `bun run build`, or specific `bun test <file>` commands over broad workspace sweeps.
- For release-sensitive stack or generator changes, run `bun run test:release` from the repo root. That lane covers template snapshots, CLI/builder parity, and preview-config regressions.
- Surprise worth remembering: `apps/cli/test/cli-builder-sync.test.ts` reads the built `packages/types/dist` output via the workspace package, not just the source files. After changing `packages/types/src/*`, rebuild `packages/types` before trusting that parity test.
- Surprise worth remembering: `react-vite` originally received auth dependencies from `packages/template-generator/src/processors/auth-deps.ts` without receiving matching auth templates from `packages/template-generator/src/template-handlers/auth.ts`. When expanding `react-vite`, verify both dependency processors and template handlers are updated together.
- Surprise worth remembering: `packages/types/src/compatibility.ts` can allow an API option for a frontend before `packages/template-generator/src/template-handlers/api.ts` knows how to emit matching web/client templates for that frontend. When expanding non-React API support, verify compatibility rules, template-handler branches, and `templates/api/<option>/...` coverage stay in sync.
- Surprise worth remembering: `pythonAi` and `rustLibraries` drifted between CLI schemas/project-config arrays and web `StackState` single-value modeling. When touching parity, defaults, URL state, or command generation for Python/Rust ecosystem options, verify selection mode stays aligned across `packages/types`, `apps/cli`, and `apps/web`.
- Surprise worth remembering: `apps/cli/test/e2e/e2e.e2e.ts` is a broader legacy runtime matrix than the PR-stable contract. Keep it on `schedule` / `workflow_dispatch` unless you are actively stabilizing the generated-app matrix; PR runtime coverage should come from `testing/smoke-test.ts --dev-check --strict`, Playwright builder tests, and `apps/cli/test/e2e/web-command-roundtrip.test.ts`.
- Surprise worth remembering: `apps/cli/src/prompts/prompt-resolver-registry.ts` can drift if it recreates prompt coverage from raw schema values instead of importing the actual prompt resolver modules. When changing CLI prompt exposure, update the prompt resolver itself and the registry coverage contexts together so parity tests keep exercising real prompt logic.
- Surprise worth remembering: frontend-filtered prompt defaults can become invalid for the resolved option set. `apps/cli/src/prompts/forms.ts` once defaulted to `tanstack-form` even when Fresh-only selections left `none` as the only valid option. When changing conditional prompt options, verify the resolver `initialValue` is always present in the resolved options.
- Surprise worth remembering: web builder Playwright specs can become flaky if they click `category-toggle-*` for sections that are already open by default. That collapses the section and can leave tests racing stale duplicated `command-output` nodes during UI transitions. For builder e2e tests, click option cards directly unless the category is in `INITIALLY_COLLAPSED_SET`, and scope `command-output` locators to visible elements.
- Surprise worth remembering: `testing/smoke-test.ts` used to hardcode `apps/cli/dist/cli.mjs` and assume the built CLI artifact already existed in CI. The smoke harness now resolves the binary path from `apps/cli/package.json` and self-builds `packages/types`, `packages/template-generator`, and `apps/cli` when needed. Keep future smoke or scaffold harnesses on that contract instead of reintroducing a fixed dist-path assumption.
- Surprise worth remembering: TanStack Start route generation in `apps/web` only reads ignore settings from `tanstackStart({ router: ... })` in `apps/web/vite.config.ts`, not from top-level plugin options. Any `createFileRoute` scratch/design file left in `apps/web/src/routes` will be pulled into `routeTree.gen.ts` and build output unless it matches `routeFileIgnorePrefix`/`routeFileIgnorePattern`.

## Bun

Bun is the default package manager and script runner. Use `bun install`, `bun run <script>`, `bun test`, and `bunx`. Do not switch to npm, pnpm, yarn, npx, or ad hoc `node` wrappers unless a file explicitly requires it.
- In this WSL setup, `bun` on `PATH` can resolve to the Windows install instead of native Linux Bun. For Turbo runs and published-package verification, prefer `~/.bun/bin/bun` and `~/.bun/bin/bunx` explicitly.
