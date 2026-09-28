# Integration backlog

Keep unfinished integration requests here. Libraries and ecosystems do not need separate planning
files. Check current code and demand before scheduling a row; this list does not establish that a
capability is missing or authorize its implementation. Priority follows the
[roadmap](../../next-updates-roadmap.md#conditional-work).

## Existing capability depth

| Outcome | What would close it |
| --- | --- |
| Provider setup | Clear credential and database/branch setup guidance, with safe MCP update defaults and explicit remote actions. |
| PostHog and Mastra examples | Generated behavior for any confirmed gaps in analytics, feature flags, or agent examples. |
| Mobile persistence | Device proof of TanStack Query offline/focus/network behavior and Legend State persistence/sync. |
| Phoenix depth | Browser-tested forms, streams, and auth; named advanced combinations that compile and test; practical gRPC, Broadway, and Nx examples. |
| Elixir deployments | Built releases for retained targets and a working two-node clustering/runtime configuration. |
| Rust Kafka | Provision librdkafka and CMake, build a generated `rdkafka` project with its lockfile, and prove a produce/consume round trip. |
| Organization billing | An explicit organization preset with subscription, signed webhook, persisted entitlement, allowed/denied requests, replay behavior, dashboard routes, and provider setup docs. |
| Deployment output | Real container/configuration checks for generated Docker, Compose, DevContainer, and GitHub Actions recipes. |
| Broader single-app output | A demanded graph shape with unambiguous paths/ownership, install/build/check/update proof, and consistent workspace-shape projection. Unsupported shapes remain monorepos. |

## Candidate additions

These are separate demand decisions, not a batch to implement.

- Raw SQL with connection pooling, typed query helpers, migrations, and a generated write/read
  through the backend. Selecting ORM `none` alone does not satisfy this request.
- InstantDB across React and React Native; Instructor structured-output examples.
- Memcached or Dragonfly where an additional maintained cache runtime is justified.
- TanStack DevTools with development-only, framework-aware placement.
- React Native Paper, WatermelonDB, Detox, or OneSignal, each with device-level evidence for its
  actual component, persisted record, interaction, or notification callback.
- A maintained mobile OTA strategy with upgrade and rollback proof.
- Plasmo beside WXT, with popup/content/background generation and Manifest V3 build evidence.
- Electrobun beside Tauri, with frontend compatibility and runtime install/build evidence.
- A generated Makefile or justfile only when repeated support reports show command-discovery trouble.

## Decisions before adding options

- Whether Gluestack needs a web/universal path beyond its mobile surface.
- How `nextui` migrates or aliases to HeroUI without breaking stored configs or URLs.
- Whether data fetching stays addon-shaped or needs a Capability Role.
- Whether an Effect HTTP API role fills a real gap beyond the existing Effect backend.
- How validated shadcn customization URLs can enter normal compatibility and generation checks.

## Shared acceptance

Use existing schema, graph, compatibility, and template ownership. Keep CLI, builder, and MCP
behavior consistent, including rejected combinations. Name the verification maintainer, exact recipe,
missing evidence stage, and runtime assertion before implementation. Follow the
[new-tool guide](../../guidelines/adding-new-tool-options/README.md) when adding options.

Backend HTTP proof does not establish native UI behavior. Keep mobile capabilities additive and
separately modeled; client-visible Expo environment values use the `EXPO_PUBLIC_` boundary.
Provider sandbox checks must record their API/fixture identities and protect credentials.

Create a separate active plan only when an approved task has unresolved design decisions or
multiple implementation steps that need coordination. Remove completed rows from this file.
