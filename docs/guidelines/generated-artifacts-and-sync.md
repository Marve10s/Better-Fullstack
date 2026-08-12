# Generated Artifacts and Synchronization

Use this guide whenever a changed file says generated, generated files appear in status, or two
large files must remain synchronized.

## General Rule

Find the producer. Edit the authoritative input. Run the producer. Review both source and output.
Never make a durable fix only in generated output.

## Embedded Templates

- Source: `packages/template-generator/templates/**`
- Producer: `packages/template-generator/scripts/generate-templates.ts`
- Output: `packages/template-generator/src/templates.generated.ts`
- Command: `bun run --cwd packages/template-generator generate-templates`

Rules:

- Edit `.hbs` and static source templates, never the embedded map.
- Keep binary inputs in the template source tree; the producer copies them separately.
- Generated template paths use forward slashes.
- Template generation has a lock; do not start competing generators or delete a live lock.
- Package build regenerates templates, so unexpected output changes may expose uncommitted source
  template changes.

## Web Localization

- Source: `apps/web/messages/*.json` plus Paraglide configuration.
- Producer: `apps/web/scripts/compile-paraglide.ts`.
- Output: `apps/web/src/paraglide/**`.
- Command: `bun run --cwd apps/web i18n:compile`.

Edit message JSON, not generated message modules. Generated Paraglide churn already present in a
dirty worktree belongs to its author; do not overwrite or reformat it during unrelated docs work.

## CLI Reference Data

- Source: `packages/types/src/cli-flags.ts`.
- Producer: `apps/web/scripts/generate-cli-flags-data.ts`.
- Output: `apps/web/src/lib/docs/cli-flags-data.ts`.
- Command: `bun run --cwd apps/web docs:cli-flags`.

Do not hand-correct a flag, default, or accepted value in the output. Fix the shared registry so CLI
and docs change together.

## Stack SEO Pages

The web prebuild runs `apps/web/scripts/generate-stack-pages.ts`. Change its source data and shared
stack metadata rather than editing generated stack-page artifacts. Review route count and canonical
URLs when selection identifiers change.

## Generated Routes and Backend Types

- TanStack route trees are framework output; edit route modules and regenerate through the normal
  web build/typecheck path.
- Convex `_generated` files are projections; edit schema/functions and use the project’s Convex
  generation workflow when that task is authorized.
- Do not invent declarations in generated files to hide a source type error.

## Version Synchronization

`sync-versions` updates dependencies in source templates and reminds maintainers to rebuild the
embedded template map. Review dependency policy and source-template diffs before accepting the
generated file.

## Dirty Worktrees

- Establish whether generated changes predate the task.
- Do not regenerate a large surface merely because a nearby file is changed.
- If regeneration is necessary and overlaps user changes, stop and coordinate.
- Do not “clean” generated files with checkout/reset.
- Limit formatting to files owned by the current change.

## Verification

- Check the source diff first.
- Regenerate with the documented command.
- Confirm output is deterministic on a second run when practical.
- Run the narrow package build/test that consumes the artifact.
- Run template snapshots for template changes.
- Run `bun run test:release` for release-sensitive generator/schema projections.
