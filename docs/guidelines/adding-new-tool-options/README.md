# Adding tool options

Read this before adding a library, tool, category, or ecosystem. Use current neighboring code as
the implementation example. Do not copy a historical framework matrix or a second schema list.

## Start with the contract

Identify the generated behavior, supported graph shapes, verification maintainer, and smallest
real proof. Check that the option is not already available through another role or alias.
A dependency entry alone is not a working integration.

Follow [graph authority](../stack-graph-and-config-authority.md) for ownership and projections,
[option metadata](../stack-options-and-compatibility.md) for IDs and aliases, and
[evidence levels](../capability-evidence-levels.md) for public claims.

## Trace an existing option through these owners

Paths below are relative to the repository root. Edit only the layers affected by the addition.

| Boundary | Source to inspect | Required result |
| --- | --- | --- |
| Input and persisted config | `packages/types/src/config/schemas.ts` | Accepted values agree across create input, project config, and saved config. |
| Metadata and CLI flags | `packages/types/src/catalog/option-metadata.ts`, `packages/types/src/catalog/cli-flags.ts` | Stable IDs, aliases, labels, category order, selection mode, and public flags. |
| Graph ownership | `packages/types/src/stack/stack-graph.ts` | Registered tool, correct role/owner, provided capabilities, and reversible legacy projection. |
| Compatibility | `packages/types/src/stack/compatibility.ts`, `packages/types/src/capabilities/` | Shared reasons and constraints agree with what generation can produce. |
| Templates and routing | `packages/template-generator/templates/`, `src/template-handlers/`, `src/generator.ts` | Real generated behavior for every advertised frontend/backend family. Generator `src/` paths are package-relative. |
| Dependencies and environment | Generator `src/dependencies/add-deps.ts`, `src/processors/dependencies/`, `src/processors/config/env-vars.ts` | Dependencies, scripts, adapters, and server/client environment boundaries agree. |
| CLI | `apps/cli/src/run.ts`, `src/prompts/`, `src/config/` | Explicit flags and interactive selection produce the same config; CLI `src/` paths are package-relative. |
| MCP | `apps/cli/src/operations/`, `apps/cli/src/mcp/` | Shared operation schemas and handlers; do not create a parallel tool contract in the transport. |
| Saved config and commands | `apps/cli/src/config/bts-config.ts`, `apps/cli/src/lifecycle/generate-reproducible-command.ts` | Read/write and reproduced commands retain the selection. |
| Builder and URLs | `apps/web/src/lib/stack/constant.ts`, `packages/types/src/stack/stack-translation.ts`, `apps/web/src/lib/builder/preview-config.ts` | Builder choices, defaults, URL keys, commands, and previews round-trip. |
| Icons and links | `apps/web/src/lib/stack/tech-icons.ts`, `apps/web/src/lib/stack/tech-resource-links.ts` | Existing icon system and verified resource links. |
| User guidance | CLI `helpers/core/post-installation.ts`, generator `processors/config/` | Setup, README, and agent instructions name actual generated commands and remaining setup. |
| Evidence | `packages/types/src/capabilities/capability-inventory.ts` | Honest maturity, owner, limitation, and verification scope. |

A new value in an existing category often needs no new dispatch code. Inspect dynamic routing
before adding another branch. Use an existing option in the same role and ecosystem as the trace.

## Additional work for a category or ecosystem

- Add schema/type exports, appropriate defaults, prompt-group and multi-ecosystem composer wiring,
  CLI parsing, and shared operation input coverage. Do not hard-code all defaults to `none`.
- Wire graph registration and both projection directions. Array categories must remain arrays in
  the schema, metadata, graph maps, persistence, commands, and builder state. Inspect
  `LEGACY_ARRAY_CATEGORIES` as well as the ecosystem-specific array map.
- Add compatibility bindings for the new role, including shared backend-service roles when used.
  Check owner scope, multiple services, provided capabilities, and explicit empty selections.
- Extend command/URL keys, preview projection, error fallback config, and existing-project update
  handling. Preserve old IDs and URLs where aliases can do so.
- Extend `testing/lib/generate-combos/options.ts`, `render.ts`, and `testing/lib/presets.ts` when a
  new field needs sampling, command emission, or defaults. Missing explicit flags can cause prompts.
- For a new ecosystem, trace generator dispatch, native manifest ownership, generated commands,
  toolchain checks, and composed-project support. Do not translate TypeScript workspace assumptions
  into a native ecosystem without checking its existing patterns.

## Generator constraints

- Use path helpers in `packages/template-generator/src/platform/project-paths.ts`. Self-hosted
  frontends, standalone servers, Redwood, and composed graphs have different destinations.
- `frontend` is an array. Distinguish frontend family, concrete framework, Astro integration, and
  native variants; do not compare it to a string or assume one frontend owns every capability.
- Managed backends can provide capabilities or skip standalone handlers. Read the specific handler
  and capability rules before adding a guard; a universal Convex skip can hide supported behavior.
- Read `src/core/template-processor.ts` for prefix matching, filename mapping, helpers, and empty
  output handling. Native ecosystem handlers may render/filter files differently. Do not infer
  empty-file behavior from another handler.
- TypeScript dependency versions come from `src/dependencies/add-deps.ts`; native manifest templates
  own their ecosystem dependencies. Preserve catalog deduplication and package ownership.
- Preserve processor order. Database dependencies precede auth adapters; auth and payment templates
  precede auth-plugin edits. Check shared output paths before adding an overwrite.
- Workers bindings and client-exposed environment prefixes differ from ordinary server values.
  Use the existing environment processors rather than copying connection strings or secrets.
- Compatibility changes require matching handler branches, template directories, dependencies,
  and tests for each newly supported family. UI disablement alone is not enforcement.

See [generated-output guidance](../generator-change-playbook.md) and
[artifact regeneration](../generated-artifacts-and-sync.md) before changing generated files.

## Verification

Choose tests that prove behavior, including rejected combinations when compatibility changes.
Current examples live in `apps/cli/test/features/`, `test/ecosystems/`, and
`packages/types/test/stack/`. Inspect `runTRPCTest` and `createVirtual` at their definitions and
nearby tests instead of copying a second API reference from documentation.

Rebuild changed workspace producers before testing consumers of their built output. Run relevant
package checks, CLI/builder parity, and `bun run test:release` for stack/generator changes.
Use `bun run --cwd apps/web validate:tech-links` when adding icons or links.

Snapshots prove output changes, not runtime correctness. Exercise generated routes, commands,
authentication, persistence, or deployment behavior through their real boundary when claimed.
Follow [testing/README.md](../../../testing/README.md) for installed-package and runtime proof.
Do not update snapshots or weaken checks merely to make an unsupported combination pass.
