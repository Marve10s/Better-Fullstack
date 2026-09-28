# Stack Options And Compatibility

Use this guide when the task changes supported technologies, stack names, compatibility rules, or builder/CLI parity.

## Source of truth

- `packages/types/src/config/schemas.ts` defines the raw allowed values for CLI-facing schemas.
- `packages/types/src/catalog/option-metadata.ts` defines canonical option IDs, display labels, aliases, multi-select vs single-select semantics, and CLI value overrides.
- `packages/types/src/stack/compatibility.ts` defines invalid combinations and user-facing compatibility messages.
- `apps/web/src/lib/stack/constant.ts` exposes builder options and marketing copy for each category.
- `apps/cli/test/recommendations/cli-builder-sync.test.ts` is the guardrail that checks builder options against canonical metadata and schema values.

## Canonical metadata rules

- Keep IDs stable. Prefer adding aliases over renaming IDs when preserving old URLs or previously shared values matters.
- Put display-only naming changes in metadata and builder labels, not in schema IDs.
- Use `normalizeOptionId()` for alias handling instead of duplicating ad hoc normalization logic.
- Multi-select behavior is defined centrally in `OPTION_CATEGORY_METADATA`; do not re-encode category selection semantics in local components.
- Keep selection mode aligned across schema values, CLI project-config fields, and web `StackState`. Ecosystem-specific arrays such as `pythonAi` and `rustLibraries` should stay arrays everywhere they are modeled.

Current examples:

- `sveltekit` normalizes to canonical web frontend ID `svelte`.
- `self-sveltekit` normalizes to canonical backend ID `self-svelte`.
- Several fullstack backend variants map to one CLI value (`self`) even though the builder preserves distinct canonical IDs.

## When adding or changing an option

Read [adding-new-tool-options/README.md](adding-new-tool-options/README.md) before adding any
library, category, or ecosystem. It traces schema, graph ownership, generator, CLI/MCP, builder,
persistence, evidence, and verification together.

## Compatibility boundaries

- Evaluate shared compatibility against the complete normalized selection and owner graph. A
  frontend allowlist alone may not include backend, API, UI, or provided-capability constraints.
- Keep generated paths owner-aware; a frontend that owns its backend can have different paths from
  the same frontend composed with a standalone server.
- Avoid maintaining a second supported-combinations list here. Consult executable rules and tests
  when changing support, and prove both accepted and rejected cases through the affected consumers.
- Recheck backlog claims against schemas, metadata, handlers, and CLI helpers before implementing
  an integration. A request may already be partly or fully shipped.

## Sync-test discipline

- Do not exclude schema values from parity tests without a documented product reason.
- If an exclusion is truly necessary, document it in code and revisit it quickly. The previous `umami` exclusion masked a real builder drift.
