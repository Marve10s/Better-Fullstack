# Guidelines

This folder contains extended project guidance for AI agents working in Better-Fullstack.

Usage rules:

- Do not read every file here by default. Start from `AGENTS.md`, then open only the guideline file that matches the task.
- Keep these files focused on reusable project knowledge, not one-off task notes.
- If a guideline becomes stale, update the guideline and the `AGENTS.md` index together.

Files:

- `architecture-and-ownership.md` - monorepo layout, package responsibilities, and where edits belong
- `stack-graph-and-config-authority.md` - authoritative Stack Parts, owner scope, derived flat config, projection rules, and graph-safe mutations
- `lifecycle-commands-and-mcp.md` - command semantics, plan/apply boundaries, scaffold baselines, user-edit protection, and MCP parity
- `generated-artifacts-and-sync.md` - generated outputs, their producers, dirty-worktree safety, and regeneration commands
- `telemetry-privacy-and-internal-tools.md` - client/server telemetry privacy, safe outcomes, aggregate access, and internal authorization
- `public-docs-i18n-and-seo.md` - canonical public content, pending-translation fallback, generated references, Markdown/LLM surfaces, and SEO
- `stack-options-and-compatibility.md` - canonical option metadata, aliases, schema ownership, and compatibility constraints
- `generator-change-playbook.md` - template-generation change flow, snapshot expectations, and output validation
- `web-builder-and-url-state.md` - stack builder state handling, URL encoding, lazy loading constraints, and route gotchas
- `testing-release-and-upstream.md` - verification commands, release-focused CI, and upstream backport workflow
- `capability-evidence-levels.md` - shared public proof levels and fail-closed claim rules
- `preview-publishing-security.md` - secure PR preview artifact/publish boundary and environment runbook
- `adding-new-tool-options/README.md` - source checklist, new-category wiring, routing constraints, and verification

Scaffold execution and published-package procedures live in [testing/README.md](../../testing/README.md).
