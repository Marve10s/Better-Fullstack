# Ecosystem Expansion Backlog

> **Demand-gated candidate inventory — updated 2026-08-07.** This is not the product priority list.
> Use `docs/next-updates-roadmap.md` for sequencing and verify every unchecked candidate against the
> executable schema/templates before implementation.

Detailed plans live in dedicated files per area.

Current snapshot: Better Fullstack now has first-class schema and prompt support for eight ecosystems: TypeScript, React Native, Rust, Python, Go, Java, Elixir, and .NET. This backlog now tracks only remaining candidates for deeper template, CLI, web builder, MCP, and docs work.

When updating this file, verify current status against `packages/types/src/schemas.ts`, `packages/types/src/option-metadata.ts`, and the ecosystem prompt/template tests rather than older plan text.

## Detailed Plans

| File                                                                       | Scope                                                                                                       |
| -------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| [multi-ecosystem-parity-expansion.md](multi-ecosystem-parity-expansion.md) | Remaining deferred edge cases from the June 2026 parity batches                                             |
| **TypeScript**                                                             |                                                                                                             |
| [typescript-category-expansion.md](typescript-category-expansion.md)       | Expand existing TS categories: analytics, caching, storage, AI SDK, UI, data-fetching, API                  |
| [typescript-new-categories.md](typescript-new-categories.md)               | New TS-facing surfaces still open: i18n, desktop, and browser extensions                                    |
| **Existing Ecosystems**                                                    |                                                                                                             |
| [rust-ecosystem-expansion.md](rust-ecosystem-expansion.md)                 | Remaining Rust depth: framework, Kafka, generated checks, and template usage                                |
| [go-ecosystem-expansion.md](go-ecosystem-expansion.md)                     | Remaining Go depth: stdlib, Bun ORM, search, generated checks, and template usage                           |
| [python-ecosystem-expansion.md](python-ecosystem-expansion.md)             | Remaining Python depth: search, generated checks, template usage, and provider docs                         |
| **New Ecosystems**                                                         |                                                                                                             |
| [new-ecosystems.md](new-ecosystems.md)                                     | Index — links to individual ecosystem files below                                                           |
| [java-ecosystem-follow-ups.md](java-ecosystem-follow-ups.md)               | Remaining Java gRPC/example/runtime-validation depth after Micronaut, OpenAPI Generator, and Log4j2 shipped |
| [elixir-ecosystem.md](elixir-ecosystem.md)                                 | Remaining follow-ups for deeper Phoenix/LiveView deployment and advanced library coverage                   |
| **Platform & Infra**                                                       |                                                                                                             |
| [platform-features.md](platform-features.md)                               | Next platform/DX features                                                                                   |
| [mcp-incremental-library-updates.md](mcp-incremental-library-updates.md)   | Generic MCP stack mutation follow-ups                                                                       |
| [docker-and-devcontainers.md](docker-and-devcontainers.md)                 | Remaining container follow-up: non-monorepo/single-app mode                                                 |
| [payment-providers-expansion.md](payment-providers-expansion.md)           | Creem.io, Autumn, Commet, and deeper Better Auth payment plugin integration                                 |
| [community-requested-integrations.md](community-requested-integrations.md) | InstantDB, Intlayer, Plasmo, Effect HTTP, raw SQL, and other still-open requests                            |
| [mobile-react-native.md](mobile-react-native.md)                           | Remaining mobile depth: UI, state/data, testing, push, web-to-mobile, OTA, and generated checks             |
| [documentation-follow-ups.md](documentation-follow-ups.md)                 | Remaining docs: generated flag data, env/provider examples, stack guides                                    |

## Shipped Since This Backlog Was Opened

### Storage

- [x] Add `supabase-storage`

### Payments

- [x] Add `creem`
- [x] Add `autumn`
- [x] Add `commet`

### Internationalization

- [x] Add `intlayer`

### Go

- [x] Add `stdlib` (net/http)
- [x] Add `bun` ORM

### Rust

- [x] Add `loco`
- [x] Add `poem`
- [x] Add `rdkafka` generation; native smoke-lane coverage remains below

### Mobile / app shells

- [x] Add `capacitor`

### JVM

- [x] Add Java gRPC as the `grpc` Java API value
- [x] Add Micronaut, OpenAPI Generator, and Log4j2
- [x] Add Kotlin/Ktor and Kotlin Compose app parts

## Quick Reference — Remaining Demand-Gated Items

### API / GraphQL

- [ ] Add `effect-http`

### UI Libraries

- [ ] Decide whether to rename or alias the existing `nextui` surface to HeroUI

### Desktop / Extensions / Mobile

- [ ] Add `plasmo` (browser extensions)

### Infra / DevOps

- [ ] Non-monorepo / single-app mode

- [ ] Add native `rdkafka` smoke coverage once lanes install librdkafka/cmake tooling

### Existing Language Ecosystems

- [ ] Deepen generated JVM runtime validation

### Mobile / React Native

- [ ] CodePush OTA

### Platform / CLI

- [x] Ship the baseline-aware post-scaffold `update` engine
- [x] Ship the `check` / `doctor` health command
- [ ] Harden lifecycle reliability with cross-version fixtures, recovery output, and real-repository evidence
