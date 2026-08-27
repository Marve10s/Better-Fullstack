# Agent Documentation

This directory is Better-Fullstack's repository knowledge base for coding agents. Start from
`AGENTS.md`; use this file only when a task needs deeper project context or documentation changes.

## Authority

When documents disagree, prefer them in this order:

1. `AGENTS.md` for project-wide instructions and routing.
2. `CONTEXT.md` for the current domain language.
3. `docs/guidelines/` for reusable engineering constraints and workflows.
4. `docs/next-updates-roadmap.md` for current product direction and priority.
5. `docs/projects/active/` for the design currently being executed.
6. `docs/projects/backlog/` for accepted future work.
7. `docs/reference/` for time-bound research and technical inventories.
8. `docs/projects/completed/` for historical implementation context.

Executable source, schemas, tests, and generated output remain the source of truth for current
behavior. Reference and completed documents must never override them.

## Routes

- `docs/guidelines/README.md` - reusable guidance; open only the topic relevant to the task
- `docs/projects/README.md` - active, backlog, and completed project documents
- `docs/reference/README.md` - historical research and technical inventories
- `docs/next-updates-roadmap.md` - canonical product direction and priority order
- `docs/update-support-policy.md` - rolling update-window contract and current qualification state
- `docs/verified-combinations.md` - generated compatibility evidence
- `testing/README.md` - production-package and smoke-test workspace
- `benchmarks/README.md` - committed benchmark summaries
- `apps/web/content/docs/` - user-facing product documentation

## Maintenance

- Put durable rules in `docs/guidelines/`, not in project histories.
- Move a project when its lifecycle changes; do not leave completed or superseded work in
  `active/` or `backlog/` with only a status banner.
- Keep backlog files limited to accepted, unfinished outcomes. Move watch lists to `reference/`;
  move shipped or fully superseded scope to `completed/` instead of retaining checked sections.
- Re-audit backlog claims against schemas, templates, tests, and current upstream status before using
  them as implementation instructions.
- Before moving a completed project, extract any still-authoritative rule into a guideline or
  `CONTEXT.md`.
- Keep the relevant index updated whenever a document is added, moved, or removed.
- Run `bun run test:agent-docs` after documentation moves or link changes.
