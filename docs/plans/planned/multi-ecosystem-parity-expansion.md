# Multi-Ecosystem Parity Expansion (Tier 1 + Tier 2)

**Status: In progress — started 2026-06-10 on `feat/stack-graph-phase0-batch0` (PR #220).**

Master plan for closing the category-asymmetry gap between ecosystems (Tier 1) and deepening
existing categories (Tier 2), plus the next new language (Kotlin). Supersedes the per-category
checklists in `go-ecosystem-expansion.md`, `python-ecosystem-expansion.md`,
`rust-ecosystem-expansion.md`, `java-ecosystem-follow-ups.md`, and the open items in
`elixir-ecosystem.md` / `dotnet-ecosystem.md` — those stay as background; ticking happens here.

Context: TypeScript has ~40 categories / 200+ options. Elixir is the strongest non-TS ecosystem
(15 categories / 45 options); Go is the weakest (6 categories / 18 options). Every category below
already exists in at least one peer ecosystem, so graph roles, prompt patterns, smoke verifiers,
and dep-freshness parsing all have a template to copy.

---

## End-to-end wiring checklist (per addition)

Every library/category must land across ALL of these layers (the .NET foundation is the model):

1. **`packages/types`**
   - `constants.ts` — `<ECO>_<CATEGORY>_VALUES`
   - `schemas.ts` — field on `ProjectConfigSchema` / `CreateInputSchema` (array fields use `z.array`)
   - `option-metadata.ts` — labels + descriptions
   - `stack-graph.ts` — `defineTools(...)` registration + category maps
     (`LEGACY_EXTRA_CATEGORIES_BY_ECOSYSTEM` for singles,
     `LEGACY_BACKEND_ARRAY_CATEGORIES_BY_ECOSYSTEM` **and** `LEGACY_ARRAY_CATEGORIES` for arrays —
     missing the second one silently lowers arrays as scalars, see the dotnet fix in `2fcbf0a7`)
   - `stack-graph.ts` — `isNativeEcosystemBackendServiceTool` branch when the category maps onto a
     shared backend-service role (email/observability/caching/search)
   - `compatibility.ts` — `GRAPH_DISABLED_REASON_BINDINGS` entry; use
     `candidateIdPrefix: "candidate:native"` for shared-service roles
2. **`apps/cli`**
   - ecosystem prompt file (`prompts/<eco>-ecosystem.ts`) + non-interactive flag
   - `prompts/multi-ecosystem-composer.ts` — prompt set in the backend-ecosystem flow
3. **`packages/template-generator`**
   - `.hbs` templates with real, compiling code; deps pinned in the ecosystem manifest template
     (`go.mod.hbs`, `pyproject.toml.hbs`, `Cargo.toml.hbs`, `pom.xml.hbs`/`build.gradle.hbs`,
     `mix.exs.hbs`, `*.csproj.hbs`) so `scripts/check-dep-versions.ts` picks them up automatically
   - `bun run --filter=@better-fullstack/template-generator generate-templates` + builds after edits
4. **`apps/web`**
   - `lib/constant.ts` — `TECH_OPTIONS` entries (verified icons), preset updates if relevant
   - solo builder tab renders the category; multi-ecosystem builder:
     `GRAPH_BACKEND_ADVANCED_CATEGORY_ORDER_BY_ECOSYSTEM` in `stack-builder.tsx`
   - docs page under `content/docs/ecosystems/<eco>.mdx` (flags + category table)
5. **Tests**
   - `packages/types/test/stack-graph.test.ts` — extend the ecosystem's round-trip property case
   - `apps/web/test/<eco>-ecosystem.test.ts` — preset/serialization coverage
   - `apps/cli` template snapshot/regression tests where templates branch
   - `testing/lib/generate-combos/options.ts` sampler + `render.ts` flags (every new flag MUST be
     emitted in non-interactive commands or smoke scaffolds hang at the prompt)
   - smoke presets (`testing/lib/presets.ts`) updated so new categories get CI compile coverage
6. **Verification**: full `bun run test`, `test:release`, and a local scaffold + native build
   (`go build` / `cargo check` / `python -m compileall` / `mvnw test` / `dotnet build`).

---

## Batch 1 — Go parity (Tier 1, biggest gap)

New categories:

- [ ] `goTesting` (multi-select): `testify`, `gomock`
- [ ] `goRealtime`: `gorilla-websocket`, `centrifuge`
- [ ] `goMessageQueue` (jobQueue role): `nats`, `watermill`
- [ ] `goCaching`: `redis` (go-redis), `ristretto` (in-process; modern replacement for groupcache)
- [ ] `goConfig`: `viper`, `koanf`
- [ ] `goObservability`: `opentelemetry`

Existing-category depth:

- [ ] `goApi` += `gqlgen` (GraphQL, schema-first codegen)
- [ ] `goWebFramework` += `stdlib` (net/http with Go 1.22+ pattern routing)
- [ ] `goOrm` += `bun` (uptrace/bun, SQL-shaped query builder)
- [ ] `goAuth` += `goth` (OAuth social login, 30+ providers)

## Batch 2 — Python parity (Tier 1 + Tier 2)

New categories:

- [ ] `pythonTesting` (multi-select): `pytest`, `hypothesis`
- [ ] `pythonCaching`: `redis-py`, `aiocache`
- [ ] `pythonRealtime`: `python-socketio`, `websockets`
- [ ] `pythonObservability`: `opentelemetry`
- [ ] `pythonCli` (multi-select): `typer`, `click`, `rich`

Existing-category depth:

- [ ] `pythonWebFramework` += `starlette`
- [ ] `pythonOrm` += `peewee`
- [ ] `pythonAuth` += `fastapi-users`
- [ ] `pythonAi` += `pydantic-ai`, `google-adk`, `smolagents`
- [ ] `pythonTaskQueue` += `taskiq`

## Batch 3 — Rust parity (Tier 1 + Tier 2)

New categories:

- [ ] `rustRealtime`: `tokio-tungstenite`
- [ ] `rustMessageQueue` (jobQueue role): `lapin` (RabbitMQ), `rdkafka` (Kafka)
- [ ] `rustObservability`: `opentelemetry`
- [ ] `rustTemplating`: `askama` (compile-time), `tera` (runtime)

Existing-category depth:

- [ ] `rustWebFramework` += `loco` ("Rails of Rust"), `poem`
- [ ] `rustAuth` += `torii` (OAuth/OIDC, passkeys, magic links)

Note: Rust testing is already covered as `rustLibraries` entries (tokio-test, mockall, proptest,
insta) — no new category; do not duplicate.

## Batch 4 — Java parity (Tier 1 + Tier 2)

New categories:

- [ ] `javaApi`: `spring-graphql`, `grpc-java`
- [ ] `javaLogging`: `logback` (explicit config), `log4j2`

Existing-category depth:

- [ ] `javaWebFramework` += `micronaut`
- [ ] `javaOrm` += `jooq`, `mybatis`
- [ ] `javaAuth` += `keycloak`
- [ ] `javaLibraries` += `spring-amqp` (RabbitMQ), `opentelemetry-java`

## Batch 5 — Elixir + .NET follow-ups (Tier 2)

- [ ] `elixirApi` += `grpc` (grpc-elixir)
- [ ] `elixirLibraries` (new multi-select): `broadway` (data ingestion), `nx` (Numerical Elixir)
- [ ] `dotnetValidation` (new): `fluentvalidation`, `data-annotations`

## Batch 6 — Kotlin (new language)

Decision (per `new-ecosystems.md`): Kotlin ships as a **Java-ecosystem extension**, not a
standalone ecosystem — it shares Maven/Gradle, Spring, and the JVM toolchain.

- [ ] `javaLanguage` field: `java` (default) | `kotlin` — switches templates to `.kt` sources,
      Kotlin Gradle/Maven plugins, kotlinx dependencies
- [ ] `javaWebFramework` += `ktor` (Kotlin-native; only valid with `javaLanguage: kotlin`)
- [ ] Compatibility rules: ktor ⇒ kotlin; spring-boot/quarkus/micronaut work with either language
- [ ] Smoke preset `java-kotlin-ktor` + docs section on the java ecosystem page

Zig stays on the watch list (web ecosystem still premature).

---

## Sequencing & constraints

- Batches land in order 1 → 6 on this branch; every batch must leave the full suite,
  `test:release`, and the smoke lanes green before the next starts.
- Multi-select categories must be added to **both** array maps in `stack-graph.ts` (see checklist
  item 1) — this is the bug class the dotnet batch hit.
- Any category mapping onto shared service roles (caching/observability/search/email) needs the
  native-tool whitelist branch, or the graph rejects the ecosystem's own tools.
- New prompts without a matching non-interactive flag in `testing/lib/generate-combos/render.ts`
  hang every smoke scaffold (exit 0, empty dir) — flags ship in the same commit as the prompt.
- The weekly dep-freshness automation needs **no changes** for new libraries in existing manifest
  templates; Batch 6 (Kotlin) must extend the Maven/Gradle parser only if Kotlin deps live in new
  template files.

## Out of scope (tracked elsewhere)

- Multi-ecosystem (`--part`) smoke presets — pre-existing gap for ALL ecosystems, tracked in
  `ci-and-quality.md`.
- TypeScript-exclusive service categories (payments, CMS, file storage, feature flags, i18n) for
  non-TS ecosystems — Tier 3, needs per-provider SDK evaluation first.
- "else frontend" ownership of validation/effect — see `single-source-of-truth-stack-graph.md`.
