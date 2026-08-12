# Public Docs, i18n, and SEO

Use this guide for `apps/web/content`, docs navigation/search, localized content, CLI reference
tables, Markdown/LLM endpoints, structured metadata, and stack landing pages.

## Content Authority

- Product documentation lives in `apps/web/content/docs`.
- Guides live in `apps/web/content/guides`.
- Blog/changelog content follows its local content source.
- Repository project documents describe intent/history and must not duplicate public instructions.
- Shared schemas and CLI registries remain authoritative for accepted options, defaults, and flags.

## Frontmatter

Every public page must supply the fields required by its content loader. Keep:

- a concise title;
- a unique description that can serve search/SEO;
- accurate updated/review metadata where the collection requires it;
- locale/translation state consistent with the source loader;
- stable slugs and canonical route identity.

Do not fabricate freshness dates. Update them when the page was substantively reviewed.

## English and Translation Status

- English is canonical.
- A localized file marked `translationStatus: pending` deliberately falls back to English.
- Do not remove `pending` merely because the file exists.
- Remove it only after the localized body matches current English behavior and schema-derived
  references.
- Keep headings, links, code commands, option identifiers, and warnings semantically aligned.
- Never translate literal CLI flags, package names, Stack Part specs, env keys, or code identifiers.

## UI Messages

- Edit `apps/web/messages/*.json`.
- Keep key sets aligned with English.
- Compile Paraglide through `bun run --cwd apps/web i18n:compile`.
- Never hand-edit `apps/web/src/paraglide/**`.
- A new user-visible string should enter the message catalog unless local content architecture
  explicitly treats it as authored MDX.

## Schema-Derived Reference

- CLI flag tables come from `packages/types/src/cli-flags.ts`.
- Option inventories should derive from shared schema/metadata instead of manual lists.
- Compatibility examples may be authored, but accepted/rejected facts must be backed by executable
  compatibility behavior.
- Resource links and icons must use their validators.
- When an identifier changes, preserve documented aliases and review inbound links.

## Navigation and Search

- Add pages to the canonical sidebar/source metadata.
- Keep navigation labels task-oriented and avoid duplicate pages competing for the same intent.
- Search indexes use canonical/fallback content rules; pending translations must not index stale
  bodies as authoritative.
- Lazy MDX loading is intentional. Do not import the entire docs corpus into the app entry bundle.

## Markdown and Agent Surfaces

Public docs also feed:

- per-page Markdown variants;
- scoped agent indexes;
- `/llms.txt` and `/llms-full.txt`;
- `/sitemap.md`;
- conventional XML sitemap/routes.

A new or moved canonical page must remain discoverable through the appropriate human and agent
surfaces. Avoid separate hand-maintained copies of the page body.

## SEO

- Titles and descriptions describe the actual generated capability.
- Canonical URLs must be stable and locale-aware.
- Alternate-language links must not claim a pending/stale translation is current.
- Generated stack pages derive from canonical identifiers and metadata.
- Do not create near-duplicate landing pages that differ only by keyword order.
- Structured data must agree with visible content and current support.

## Code Examples

- Use current package manager conventions and non-interactive CLI syntax.
- Prefer explicit Stack Part specs for multi-ecosystem examples.
- Include `none` values when omission would make an example ambiguous.
- Never claim install, runtime, or deployment success that the documented workflow did not perform.
- Validate commands against the current parser or contract tests.

## Verification

Depending on scope, run:

- `bun run --cwd apps/web i18n:compile`;
- `bun run --cwd apps/web docs:cli-flags`;
- relevant docs/source/search tests;
- `bun run --cwd apps/web validate:tech-links`;
- web typecheck/build when route generation or loaders change;
- `bun run test:agent-docs` when repository Markdown moves or links change.

Inspect fallback behavior for at least one pending locale when changing source-loading rules.
