# Architecture and Ownership

Use this guide when a change crosses packages or when it is unclear which layer owns a behavior.
Use the domain terms in `CONTEXT.md`: Stack Part, Role Binding, Primary Role, Capability Role,
Provided Capability, and Legacy Flat Config.

## System Flow

```text
packages/types
  -> apps/cli prompts, commands, and MCP
  -> apps/web builder, URLs, previews, docs, and downloads
  -> packages/template-generator virtual project
  -> generated project on disk or in the browser
```

The shared model flows outward. UI or command code may present it, but must not redefine it.

## Package Ownership

### `packages/types`

Owns executable product vocabulary:

- config and Stack Part schemas;
- defaults and option metadata;
- graph construction, lowering, and translation;
- compatibility decisions and disabled reasons;
- aliases and canonical identifiers;
- CLI flag reference metadata;
- shared registry shapes.

Put a cross-interface rule here when CLI, web, and MCP must agree. Do not import from an app into
this package.

### `packages/template-generator`

Owns generated files and virtual-tree behavior:

- source templates under `templates/`;
- template handlers that decide which files enter the tree;
- dependency, environment, README, and package processors;
- post-processing and single-app flattening;
- preflight validation of generator-specific constraints;
- browser-safe and filesystem-neutral generation.

This package consumes validated config. It must not become a second schema or compatibility engine.

### `apps/cli`

Owns terminal and agent-facing orchestration:

- interactive prompts and non-interactive flags;
- create, add, update, check/doctor, gen, registry, history, and telemetry commands;
- `bts.jsonc` persistence and `bts.lock.json` baselines;
- installation and post-install instructions;
- MCP tool schemas, plan/apply pairs, and structured responses.

Core mutations belong in reusable helpers. CLI presentation and MCP adapters should call the same
core operation instead of implementing parallel behavior.

### `apps/web`

Owns public interaction and content:

- stack builder state and URL projections;
- compatibility presentation;
- preview, ZIP, and WebContainer flows;
- product docs, guides, blog, SEO, and localized messages;
- public analytics presentation.

The builder is not a schema authority. Options and compatibility originate in shared code.

### `packages/backend`

Owns the active Convex service and is the sole owner of telemetry ingestion, analytics aggregates,
the owner dashboard API, showcase data, and health checks. It serves the web app and CLI telemetry
endpoint; it is not emitted into generated projects. Authorization must remain server-side.
Generated Convex files are projections and are not hand-edited.

### `apps/analytics`

Is retired legacy Convex source retained as a no-mutation `/track` tombstone and historical-data
boundary. Do not add features or callers, reactivate ingest, or delete the app/data during ordinary
maintenance. Deployment quarantine requires the owner runbook in `apps/analytics/README.md`.

### `packages/create-bfs`

Owns the compatibility package name/entrypoint. Keep it a thin distribution surface; product logic
belongs in the CLI or shared packages.

## Placement Rules

- Schema, metadata, aliases, and compatibility belong in `packages/types`.
- File inclusion decisions belong in template handlers, not scattered processors.
- Package mutation belongs in processors, not repeated inside templates.
- A generated example belongs in a source `.hbs` template, not
  `src/templates.generated.ts`.
- CLI/MCP shared behavior belongs in a core helper with thin transport adapters.
- Browser state belongs in web builder modules; reusable stack semantics belong in shared types.
- User documentation belongs in `apps/web/content`; agent engineering rules belong in
  `docs/guidelines`.
- One-off designs move through `docs/projects/{backlog,active,completed}`.
- Research without accepted scope belongs in `docs/reference`.

## Dependency Direction

- Apps may depend on packages.
- `template-generator` may depend on `types`.
- `types` must remain independent of apps and generator implementation.
- Shared packages must not read app-local constants to recover metadata.
- Web-only code must not leak Node filesystem assumptions into browser generation.
- CLI-only terminal, process, or prompt code must not enter shared packages.

When a cycle appears, move the shared contract downward rather than importing the higher-level
implementation.

## Change Boundaries

### Option or capability changes

Use `adding-new-tool-options/`. A complete vertical slice normally reaches schemas, metadata,
compatibility, prompts, builder, templates/processors, docs/resource links, and focused tests.

### Graph or configuration changes

Use `stack-graph-and-config-authority.md`. Preserve Role Binding and owner identity; never update
only a Legacy Flat Config cache.

### Existing project mutations

Use `lifecycle-commands-and-mcp.md`. Plan before apply, preserve local edits, and keep CLI/MCP
results aligned.

### Generated outputs

Use `generated-artifacts-and-sync.md`. Find the producer and edit its source.

### Public site content

Use `public-docs-i18n-and-seo.md`. Keep English canonical, generated references schema-driven, and
SEO/agent surfaces aligned.

### Telemetry or internal analytics

Use `telemetry-privacy-and-internal-tools.md`. Treat privacy and authorization as two independent
server-enforced boundaries.

## Architectural Review Checklist

- Which package is authoritative for the changed decision?
- Are downstream interfaces consuming that authority or copying it?
- Does the change preserve Stack Part ownership and Provided Capabilities?
- Is there a generated projection that must be regenerated?
- Does the browser path avoid filesystem/process dependencies?
- Do CLI and MCP call the same core behavior?
- Are user edits protected in existing-project operations?
- Is the verification at the layer where the behavior is observable?
