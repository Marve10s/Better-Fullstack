# Agent Documentation

This directory is Better-Fullstack's repository knowledge base for coding agents. Start from
`AGENTS.md`; use this file only when a task needs deeper project context or documentation changes.

## Authority

When documents disagree, prefer them in this order:

1. `AGENTS.md` for project-wide instructions and routing.
2. `docs/guidelines/` for reusable engineering constraints and workflows.
3. `docs/next-updates-roadmap.md` for current product direction and priority.
4. `docs/projects/active/` for the design currently being executed.
5. `docs/projects/backlog/` for accepted future work.
6. `docs/reference/` for current technical contracts and operating references.

Executable source, schemas, tests, and generated output remain the source of truth for current
behavior. Reference documents must never override them.

## Routes

- `docs/guidelines/README.md` - reusable guidance; open only the topic relevant to the task
- `docs/projects/README.md` - active projects and conditional backlog
- `docs/reference/README.md` - current contracts, inventories, and operating references
- `docs/next-updates-roadmap.md` - canonical product direction and priority order
- `docs/update-support-policy.md` - rolling update-window contract and current qualification state
- `docs/verified-combinations.md` - generated compatibility evidence
- `testing/README.md` - production-package and smoke-test workspace
- `apps/web/content/docs/` - user-facing product documentation

## Maintenance

- Keep each unfinished outcome in one project file; the roadmap links to its owner.
- Use the shared integration backlog for library and ecosystem requests. Separate plans are for
  approved work with unresolved design or coordination needs, not descriptions of individual tools.
- Distinguish implemented code, published release proof, production measurement, and conditional
  requests. Inspect release assets before carrying a missing-evidence claim forward.
- Put durable rules in `docs/guidelines/`, not project histories.
- When work finishes, update the roadmap, preserve still-current constraints in the owning guide,
  and delete the project file. Git history is the archive for completed and superseded work.
- Delete retired runbooks and unused research instead of moving them into another Markdown archive.
- Keep references only when current code, verification, or operations still uses them.
- Keep backlog files limited to accepted, unfinished outcomes. Re-audit claims against schemas,
  templates, tests, and current upstream status before using them as implementation instructions.
- Update the relevant index and all consumers whenever a document is added, moved, or removed.
- Run `bun run test:agent-docs` after documentation moves or link changes.
