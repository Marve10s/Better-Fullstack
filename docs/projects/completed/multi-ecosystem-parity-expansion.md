# Multi-Ecosystem Parity Expansion (Tier 1 + Tier 2)

**Status: Historical implementation plan - shipped surface re-audited 2026-08-07.**

Master plan for closing the category-asymmetry gap between ecosystems (Tier 1) and deepening
existing categories (Tier 2), plus the next new language (Kotlin). The remaining checklist is the deferred edge-case work.

Context: TypeScript has ~40 categories / 200+ options. Elixir is the strongest non-TS ecosystem
(15 categories / 45 options); Go is the weakest (6 categories / 18 options). Every category below
already exists in at least one peer ecosystem, so graph roles, prompt patterns, smoke verifiers,
and dep-freshness parsing all have a template to copy.

---

## End-to-end wiring checklist (per addition)

Every library/category must land across ALL of these layers (the .NET foundation is the model):

1. **`packages/types`**
   - `constants.ts` - `<ECO>_<CATEGORY>_VALUES`
   - `schemas.ts` - field on `ProjectConfigSchema` / `CreateInputSchema` (array fields use `z.array`)
   - `option-metadata.ts` - labels + descriptions
   - `stack-graph.ts` - `defineTools(...)` registration + category maps
     (`LEGACY_EXTRA_CATEGORIES_BY_ECOSYSTEM` for singles,
     `LEGACY_BACKEND_ARRAY_CATEGORIES_BY_ECOSYSTEM` **and** `LEGACY_ARRAY_CATEGORIES` for arrays -
     missing the second one silently lowers arrays as scalars, see the dotnet fix in `2fcbf0a7`)
   - `stack-graph.ts` - `isNativeEcosystemBackendServiceTool` branch when the category maps onto a
     shared backend-service role (email/observability/caching/search)
   - `compatibility.ts` - `GRAPH_DISABLED_REASON_BINDINGS` entry; use
     `candidateIdPrefix: "candidate:native"` for shared-service roles
2. **`apps/cli`**
   - ecosystem prompt file (`prompts/<eco>-ecosystem.ts`) + non-interactive flag
   - `prompts/multi-ecosystem-composer.ts` - prompt set in the backend-ecosystem flow
3. **`packages/template-generator`**
   - `.hbs` templates with real, compiling code; deps pinned in the ecosystem manifest template
     (`go.mod.hbs`, `pyproject.toml.hbs`, `Cargo.toml.hbs`, `pom.xml.hbs`/`build.gradle.hbs`,
     `mix.exs.hbs`, `*.csproj.hbs`) so `scripts/maintenance/check-dep-versions.ts` picks them up automatically
   - `bun run --filter=@better-fullstack/template-generator generate-templates` + builds after edits
4. **`apps/web`**
   - `lib/constant.ts` - `TECH_OPTIONS` entries (verified icons), preset updates if relevant
   - solo builder tab renders the category; multi-ecosystem builder:
     `GRAPH_BACKEND_ADVANCED_CATEGORY_ORDER_BY_ECOSYSTEM` in `stack-builder.tsx`
   - docs page under `content/docs/ecosystems/<eco>.mdx` (flags + category table)
5. **Tests**
   - `packages/types/test/stack/stack-graph.test.ts` - extend the ecosystem's round-trip property case
   - `apps/web/test/<eco>-ecosystem.test.ts` - preset/serialization coverage
   - `apps/cli` template snapshot/regression tests where templates branch
   - `testing/lib/generate-combos/options.ts` sampler + `render.ts` flags (every new flag MUST be
     emitted in non-interactive commands or smoke scaffolds hang at the prompt)
   - smoke presets (`testing/lib/presets.ts`) updated so new categories get CI compile coverage
6. **Verification**: full `bun run test`, `test:release`, and a local scaffold + native build
   (`go build` / `cargo check` / `python -m compileall` / `mvnw test` / `dotnet build`).

---

## Batch 1 - Go parity

- [x] `goWebFramework` += `stdlib` with Go 1.22 mux handlers
- [x] `goOrm` += `bun` (uptrace/bun) with database and handler branches

## Batch 3 - Rust parity

- [x] `rustMessageQueue` += `rdkafka` generation and focused tests
- [ ] Add native `rdkafka` build evidence when smoke lanes install librdkafka/cmake

- [x] `rustWebFramework` += `loco`, `poem` with framework branches and tests

Note: Rust testing is already covered as `rustLibraries` entries (tokio-test, mockall, proptest,
insta) - no new category; do not duplicate.

## Batch 4 - Java parity

- [x] `javaWebFramework` += `micronaut`

## Batch 6 - Kotlin (new language)

Decision (per [the ecosystem watch list](../../reference/new-ecosystems-watch-list.md)): Kotlin ships
as a **Java-ecosystem extension**, not a
standalone ecosystem - it shares Maven/Gradle, Spring, and the JVM toolchain.

- [x] `javaLanguage` field: `java` (default) | `kotlin` - switches templates to `.kt` sources,
      Kotlin Gradle/Maven plugins, kotlinx dependencies
- [x] `javaWebFramework` += `ktor` (Kotlin-native; only valid with `javaLanguage: kotlin`)
- [x] Compatibility rules: ktor ⇒ kotlin; spring-boot/quarkus/micronaut work with either language
- [x] Smoke preset and Java ecosystem docs for Kotlin/Ktor

Zig stays on the watch list (web ecosystem still premature).

---

## Sequencing & constraints

- Batches land in order 1 → 6 on this branch; every batch must leave the full suite,
  `test:release`, and the smoke lanes green before the next starts.
- Multi-select categories must be added to **both** array maps in `stack-graph.ts` (see checklist
  item 1) - this is the bug class the dotnet batch hit.
- Any category mapping onto shared service roles (caching/observability/search/email) needs the
  native-tool whitelist branch, or the graph rejects the ecosystem's own tools.
- New prompts without a matching non-interactive flag in `testing/lib/generate-combos/render.ts`
  hang every smoke scaffold (exit 0, empty dir) - flags ship in the same commit as the prompt.
- The weekly dep-freshness automation needs **no changes** for new libraries in existing manifest
  templates; Batch 6 (Kotlin) must extend the Maven/Gradle parser only if Kotlin deps live in new
  template files.

## Out of scope (tracked elsewhere)

- Multi-ecosystem (`--part`) smoke presets - pre-existing gap for ALL ecosystems, tracked in
  current ScaffBench/verification work.
- TypeScript-exclusive service categories (payments, CMS, file storage, feature flags, i18n) for
  non-TS ecosystems - Tier 3, needs per-provider SDK evaluation first.
- "else frontend" ownership of validation/effect - see `single-source-of-truth-stack-graph.md`.
