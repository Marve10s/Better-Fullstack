# Agent Documentation

This directory is Better-Fullstack's repository knowledge base for coding agents. Start from
`AGENTS.md`; use this file only when a task needs deeper project context or documentation changes.

## Authority

When documents disagree, prefer them in this order:

1. `AGENTS.md` for project-wide instructions and routing.
2. `docs/guidelines/` for reusable engineering constraints and workflows.
3. `docs/reference/` for current technical contracts and operating references.

Executable source, schemas, tests, and generated output remain the source of truth for current
behavior. Reference documents must never override them.

The repository keeps no roadmap or plan documents. Git history, pull requests, and release notes
record what shipped; GitHub issues hold requests.

## Routes

- `docs/guidelines/README.md` - reusable guidance; open only the topic relevant to the task
- `docs/reference/README.md` - current contracts, inventories, and operating references
- `docs/update-support-policy.md` - rolling update-window contract and current qualification state
- `testing/README.md` - production-package and smoke-test workspace
- `apps/web/content/docs/` - user-facing product documentation

## Maintenance

- Put durable rules in `docs/guidelines/`, not in plans or task notes.
- Distinguish implemented code, published release proof, and production measurement. Inspect
  release assets before carrying a missing-evidence claim forward.
- Delete retired runbooks and unused research instead of moving them into another Markdown archive.
- Keep references only when current code, verification, or operations still uses them.
- Update the relevant index and all consumers whenever a document is added, moved, or removed.
- Run `bun run test:agent-docs` after documentation moves or link changes.
