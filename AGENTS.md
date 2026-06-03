This file provides the small set of project-wide instructions agents should read before working in Better-Fullstack. Keep detailed, area-specific guidance in `docs/guidelines/` instead of growing this file with task notes.

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
- `remotion-video-style.md` - default visual style, color system, motion rules, and branding for Remotion videos in this project
- `design-reading-guide.md` - ordered index of design-related markdown (agent skills + BF video style), precedence when sources conflict, and commands to verify coverage
- `adding-new-tool-options/` - **read this subfolder when adding any new library, tool, or category** to any ecosystem (TypeScript, Rust, Go, Python). Covers every file that must be touched, with worked examples, template handler reference, test patterns, and routing edge cases (Convex skips, self-backend, frontend array detection, processor ordering)

## Workflow

- Never start the dev server (`turbo dev`, `bun run dev`, `vite dev`, etc.) unless explicitly asked to.
- After code changes, run the smallest verification set that proves the modified area still works. Prefer package-local `bun run lint`, `bun run test`, `bun run build`, or specific `bun test <file>` commands over broad workspace sweeps.
- For release-sensitive stack or generator changes, run `bun run test:release` from the repo root. That lane covers template snapshots, CLI/builder parity, and preview-config regressions.

## Bun

Bun is the default package manager and script runner. Use `bun install`, `bun run <script>`, `bun test`, and `bunx`. Do not switch to npm, pnpm, yarn, npx, or ad hoc `node` wrappers unless a file explicitly requires it.
- In this WSL setup, `bun` on `PATH` can resolve to the Windows install instead of native Linux Bun. For Turbo runs and published-package verification, prefer `~/.bun/bin/bun` and `~/.bun/bin/bunx` explicitly.
