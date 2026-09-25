# Web builder and URL state

Use this guide for stack selection, share URLs, preview generation, and builder routing.

## State ownership

- `packages/types/src/stack/stack-translation.ts` owns `StackSelectionState`, defaults, URL keys,
  parsing, normalization, and serialization. Web re-exports the type as `StackState` from
  `apps/web/src/lib/stack/stack-defaults.ts`.
- Import shared helpers from `@better-fullstack/types/stack-translation`; do not add a web-only
  parser or alias map.
- `apps/web/src/lib/builder/preview-config.ts` projects normalized state into generator input.
- UI category keys can differ from state keys: `TECH_OPTIONS.ai` maps to `aiSdk`. Preserve the
  mapping in selection reads, writes, and command generation.
- Add shareable fields to shared defaults and `STACK_SELECTION_URL_KEYS`. Check the search schema
  in `apps/web/src/lib/stack/stack-search-schema.ts` and use its shared `EcosystemSchema`.

## Rendering and routing

- Reuse existing controls in `apps/web/src/components`. Labels and category order should consume
  shared metadata; for example, the Go builder order derives from `GO_CATEGORY_ORDER`.
- Keep ecosystem visibility filtering in `apps/web/src/components/stack-builder/utils.ts`
  consistent across every option render path. A disabled reason does not hide an irrelevant option.
- Keep heavy parsing and generator imports behind the builder's lazy boundaries. Check the current
  `stack-builder-page` entry before changing eager route imports or adding `validateSearch`.
- Route modules generate `apps/web/src/routeTree.gen.ts` during the web build. Keep scratch files
  outside `apps/web/src/routes`; do not assume a custom ignore rule exists in Vite configuration.
- Docs source uses `virtual:content-meta`, `virtual:localized-content`, and MDX loaders with the
  `@web-root/content/` alias. Preserve browser/SSR loader separation in `apps/web/vite.config.ts`.
- Route loader data must be serializable. Resolve MDX components in the rendering layer.

## Verification

Use focused preview, state, and command-parity tests in `apps/web/test/builder/` and
`apps/web/test/stack/`. Run web lint for source changes and `bun run build:web` when route generation
or bundling changes. Web lint compiles Paraglide, so inspect pre-existing generated changes first.

For browser checks, inspect the current controls rather than assuming an old accordion layout.
Exercise the changed selection, its shared URL, and the resulting preview or command. Do not start
a development server unless the user asks.
