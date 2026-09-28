# Generated output

Use this guide when changing emitted files, template routing, or generated-project checks.
For a new option, first read [the addition checklist](adding-new-tool-options/README.md).

## Owners and change flow

`packages/types` owns valid selections and graph projections. `packages/template-generator`
produces the virtual file tree. CLI generation and web previews consume that generator.

Trace the selected value through compatibility, handler routing, dependencies, templates, and
post-processing. Rebuild affected producers before testing built consumers. Follow
[artifact regeneration](generated-artifacts-and-sync.md) rather than hand-editing embedded output.

## Output constraints

- Compare generated files with the selected graph, including stored settings. Shadcn detail
  settings are persisted and graph-owned; verify both round-trip config and emitted CSS,
  `components.json`, and dependencies.
- Emit helpers, imports, and variables only when the selected branch uses them. Fets request
  adapters and Go server addresses have previously caused unused-variable build failures.
- Backend-specific request context must agree with generated auth and API code. Type-check
  protected procedures, including Fets, instead of relying on a nullable placeholder session.
- Keep compatibility, feature handlers, and dependencies together. React Vite auth and non-React
  API support need matching files, not only allowed selections or installed packages.
- Use backend-aware path helpers. Redwood's self-contained layout differs from its separate-backend
  layout. Inspect compatibility for the supported API/UI choices rather than copying a matrix here.
- SvelteKit/SolidStart DaisyUI activation belongs in generated CSS with `@plugin "daisyui"`.
- Fresh uses its bare `fresh` JSR mapping; do not add an overlapping `fresh/` prefix. Use shared
  local-port helpers in generated guidance.
- Shared packages consumed by AdonisJS must follow NodeNext relative-import rules, including `.js`
  extensions, and declare their dependencies.
- Root generated `check-types` commands need `--if-present` where some apps lack that script.
- Better Auth's generated Kysely overrides live in `src/post-process/package-configs.ts` under the
  generator. Verify affected auth recipes before changing them.
- Existing-project updates compare against the formatted create-time scaffold baseline. Keep
  raw-template fixtures explicit so formatter changes do not masquerade as user edits.

## Verification

- Use the closest feature/ecosystem test and inspect meaningful generated behavior. Native compile
  checks and live framework assertions prove different things; report their limits.
- `apps/cli/test/support/template-snapshots.test.ts` covers representative output. Its normalizer
  handles CRLF and trailing whitespace; review intentional diffs rather than accepting bulk churn.
- `apps/cli/test/recommendations/cli-builder-sync.test.ts` must fail on parsing gaps and missing
  schema/prompt/builder values. Do not hide options such as explicit `none` behind unexplained skips.
- Run `bun run test:release` for release-sensitive generator changes. That lane must build its own
  prerequisites from a clean checkout.
- Root scratch ignore rules must not hide nested tracked tests: `/test/` and `test/` differ.

Use [testing/README.md](../../testing/README.md) for prompt-free scaffold runs, real runtime lanes,
published-package validation, and diagnostics.
