# MCP Incremental Library Updates

## Goal

Let the Better Fullstack MCP server add scaffold-time libraries and service integrations to existing Better Fullstack projects, not only addon-style tooling.

Today `bfs_plan_project` and `bfs_create_project` can scaffold the full stack surface for new projects. `bfs_plan_addition` and `bfs_add_feature` are intentionally narrower: they operate on `addons` such as MCP config, Biome, Storybook, TanStack helpers, Docker Compose, and similar isolated additions.

The next step is a safe stack mutation layer that can apply categories such as email, observability, auth, CMS, search, file storage, analytics, and caching to an existing project without overwriting user code.

## Proposed MCP Tools

Add two preview-first tools:

- `bfs_plan_stack_update`: read `bts.jsonc`, merge requested stack fields, run compatibility, and return a dry-run update plan.
- `bfs_apply_stack_update`: apply a previously reviewed update plan to disk with dependency installation disabled.

The plan output should include:

- requested changes and adjusted stack values
- files to add
- files to patch
- dependencies and dev dependencies to add
- environment variables to add
- scripts/config updates
- compatibility warnings
- manual-review blockers

## Implementation Shape

Build reusable category update handlers instead of expanding the current addon path.

Each handler should expose a common contract:

- `detect(config, projectDir)`: inspect current files and existing selection state
- `plan(currentConfig, requestedConfig)`: produce file/dependency/env/script operations
- `apply(plan)`: apply operations only after planning succeeds
- `verify(plan)`: optional focused checks or generated-file assertions

The existing template generator can remain the source of truth for new-project scaffolding, but incremental updates need patch-aware operations that read existing files and avoid replacing user-edited code.

## Phased Scope

### Phase 1: Low-risk services

Start with categories whose generated code is mostly additive:

- `email=resend`
- `observability=sentry`
- caching clients
- search clients
- file storage clients
- analytics and feature-flag clients

These usually require dependencies, env vars, helper files, and one small app initialization hook.

### Phase 2: Framework-sensitive features

Add categories that touch routing, middleware, or framework conventions:

- auth providers
- payments
- CMS
- API layers
- GraphQL
- database setup helpers

These need stronger conflict detection because they can affect app entrypoints, route trees, middleware, schemas, and generated examples.

### Phase 3: Architecture-changing features

Handle features that can change project shape:

- database or ORM swaps
- backend or runtime changes
- frontend additions
- cross-ecosystem stacks

These may need explicit migration workflows rather than automatic patching.

## Safety Rules

- Always plan before applying.
- Never overwrite user-edited files without detecting divergence.
- Refuse or require manual review when a target file has changed beyond a known generated marker.
- Refuse incompatible provider swaps unless a migration path exists.
- Update `bts.jsonc` only after file operations succeed.
- Keep dependency installation disabled in MCP mode; return install and test commands instead.
- Preserve existing `addons` behavior as a separate path until stack updates are proven stable.

## Data Model

Extend project config tracking so existing projects know which scaffold-time categories have been applied.

Options:

- keep using top-level `bts.jsonc` fields for selected categories
- add an `appliedFeatures` or `featureHistory` object for provenance
- store generated file markers where useful, but do not rely on markers alone for conflict detection

The implementation should avoid double-applying env vars, helper files, route handlers, middleware, scripts, and dependencies.

## Testing Strategy

For each category/ecosystem pair:

- scaffold a baseline project
- run `bfs_plan_stack_update`
- assert the plan includes expected files, dependencies, env vars, and config changes
- run `bfs_apply_stack_update`
- assert generated files and `bts.jsonc` are updated
- run focused type or build checks where feasible

Add negative coverage for:

- missing `bts.jsonc`
- incompatible requested providers
- Java `javaBuildTool=none` for SDK-backed features
- existing custom files that would be overwritten
- duplicate application of the same feature

## First Candidate

Use the recently added cross-ecosystem service work as the proving ground:

- Resend email for TypeScript, Python, Go, Rust, and Java
- Sentry observability for TypeScript, Python, Go, Rust, and Java

These integrations exercise the important mechanics while keeping the initial blast radius manageable.
