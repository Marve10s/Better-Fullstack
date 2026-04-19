# Java Ecosystem Expansion

Requested in GitHub issue #119. This plan replaces the earlier Java wishlist with an implementation plan aligned to the repo's "new ecosystem" workflow in `docs/guidelines/adding-new-tool-options/README.md` Scenario C.

Goal: ship Java as the fifth language ecosystem with a stable MVP first, then expand once generator, CLI, MCP, and web-builder parity are proven.

---

## MVP Scope

Phase 1 ships these six Java categories only:

- `javaWebFramework`: `spring-boot`, `quarkus`, `micronaut`, `none`
- `javaOrm`: `spring-data-jpa`, `jooq`, `none`
- `javaAuth`: `spring-security`, `none`
- `javaBuildSystem`: `maven`, `gradle`
- `javaLogging`: `logback`, `log4j2`, `none`
- `javaTesting`: `junit5`, `none`

Deliberately out of MVP:

- `mybatis`
- `keycloak`
- `spring-graphql`
- `grpc-java`
- `openapi-generator`
- `mockito`
- `testcontainers`
- task queues / messaging
- observability

These are phase-2+ additions because they add infra assumptions, code generation workflows, or materially more template branching than the base ecosystem needs.

---

## Design Decisions

### Defaults

- Default web framework: `spring-boot`
- Default ORM: `spring-data-jpa`
- Default auth: `none`
- Default build system: `maven`
- Default logging: `logback`
- Default testing: `junit5`

Rationale:

- Spring Boot + Maven + JPA is the most broadly expected baseline.
- `spring-security` should stay opt-in because it changes application structure and config more than logging or testing.
- `junit5` is the normal default for Java projects and keeps generated output closer to "real project" expectations than omitting tests.

### Template Strategy

Use a Go-style monolithic Java handler:

- `packages/template-generator/templates/java-base/`
- `packages/template-generator/src/template-handlers/java-base.ts`

Handler rules:

- boolean flags for framework/build/auth/orm/testing/logging combinations
- explicit path skips for mutually exclusive files
- empty-file skip for fully conditional templates

This is the safest pattern because Java will mix shared source layout with framework-specific entrypoints and config files.

### Project Shape

Base template structure should follow standard Java conventions:

```text
packages/template-generator/templates/java-base/
  pom.xml.hbs
  build.gradle.kts.hbs
  settings.gradle.kts.hbs
  src/main/java/com/example/
    Application.java.hbs
    controller/GreetingController.java.hbs
    config/SecurityConfig.java.hbs
    repository/...
    model/...
  src/main/resources/
    application.yml.hbs
    logback-spring.xml.hbs
    log4j2.xml.hbs
  src/test/java/com/example/
    ApplicationTest.java.hbs
  .gitignore
```

Notes:

- Maven and Gradle manifests are mutually exclusive.
- Logging config files should be mutually exclusive.
- Security files should only emit when auth is enabled.
- JPA and jOOQ should not share repository/data-access templates.

---

## Compatibility Rules

These rules need to exist before UI and CLI exposure so the system cannot compose invalid Java stacks.

### Hard constraints

- `javaBuildSystem` cannot be `none`
- `spring-security` only works with `spring-boot`
- `logback` and `log4j2` are mutually exclusive scalar choices in `javaLogging`
- `spring-data-jpa` and `jooq` are mutually exclusive scalar choices in `javaOrm`

### Expected compatibility posture

- `spring-data-jpa` should work with `spring-boot`, `quarkus`, and `micronaut` only if the template layer can emit valid project wiring for each framework
- `jooq` should work with all three frameworks only if the template layer emits consistent config and repository wiring
- `logback` should be valid across all Java frameworks
- `log4j2` should be valid across all Java frameworks only if manifests and config files are correctly swapped
- `junit5` should be valid across all Java frameworks and both build systems

If a combination is not implemented in templates, it must be blocked in `packages/types/src/compatibility.ts` rather than silently generating partial output.

### Auto-adjustment policy

Avoid silent rewrites for Java MVP. Prefer:

- explicit disabled reasons in builder/CLI
- hard blocks in compatibility analysis

The only acceptable auto-fill is assigning defaults when the user omitted a Java category entirely.

---

## Implementation Phases

## Phase 1: Schema and Type Foundation

Add Java as a first-class ecosystem and define all six categories.

Files:

- `packages/types/src/schemas.ts`
- `packages/types/src/types.ts`
- `packages/types/src/option-metadata.ts`
- `packages/types/src/compatibility.ts`

Work:

- add `"java"` to `EcosystemSchema`
- create `JavaWebFrameworkSchema`, `JavaOrmSchema`, `JavaAuthSchema`, `JavaBuildSystemSchema`, `JavaLoggingSchema`, `JavaTestingSchema`
- wire all Java fields through `CreateInputSchema`, `ProjectConfigSchema`, and `BetterTStackConfigSchema`
- export inferred Java types and `*_VALUES`
- add label overrides and category metadata
- add category display names and disabled-reason logic

Exit criteria:

- Type layer builds cleanly
- Java categories appear in all schema surfaces
- compatibility logic rejects unsupported combinations instead of allowing partial generation

## Phase 2: Generator Skeleton and Java Base Templates

Create the Java template tree and the generator entrypoint.

Files:

- `packages/template-generator/templates/java-base/`
- `packages/template-generator/src/template-handlers/java-base.ts`
- `packages/template-generator/src/template-handlers/index.ts`
- `packages/template-generator/src/generator.ts`
- `packages/template-generator/src/processors/readme-generator.ts`
- `packages/template-generator/src/processors/ai-docs-generator.ts`

Work:

- create Java base handler using Go-style boolean and skip rules
- add ecosystem dispatch in generator
- emit framework-specific entrypoints for Spring Boot, Quarkus, and Micronaut
- emit build-specific manifests for Maven and Gradle
- emit ORM-specific data-access templates for JPA and jOOQ
- emit optional security config for Spring Boot only
- emit optional test scaffold for JUnit 5
- wire README generation with Java framework/build descriptions
- wire AI docs generation with Java run/dev/test commands

Exit criteria:

- generator can produce a complete Java project for each supported MVP combination
- incompatible files are skipped cleanly
- no empty or broken files remain in generated output

## Phase 3: CLI, MCP, and Config Serialization

Expose Java throughout the CLI and machine-facing config surfaces.

Files:

- `apps/cli/src/prompts/java-ecosystem.ts`
- `apps/cli/src/prompts/config-prompts.ts`
- `apps/cli/src/index.ts`
- `apps/cli/src/mcp.ts`
- `apps/cli/src/utils/bts-config.ts`
- `apps/cli/src/constants.ts`
- `apps/cli/src/helpers/core/command-handlers.ts`
- `apps/cli/src/utils/generate-reproducible-command.ts`
- `apps/cli/src/helpers/core/post-installation.ts`

Work:

- add Java prompts and defaults
- register all Java CLI flags
- wire Java categories into MCP schema maps and project-config builders
- persist Java fields in `bts.jsonc`
- include Java fields in reproducible command generation
- add post-install instructions for JDK and Maven/Gradle usage

Exit criteria:

- CLI can create Java projects interactively and non-interactively
- MCP can plan and create Java projects with the same fields
- generated commands round-trip correctly

## Phase 4: Web Builder and URL State

Expose Java in the builder with parity to CLI behavior.

Files:

- `apps/web/src/lib/constant.ts`
- `apps/web/src/lib/tech-icons.ts`
- `apps/web/src/lib/tech-resource-links.ts`
- `apps/web/src/lib/preview-config.ts`
- `apps/web/src/lib/stack-defaults.ts`
- `apps/web/src/lib/stack-url-keys.ts`
- `apps/web/src/lib/stack-url-state.ts`
- `apps/web/src/lib/stack-utils.ts`

Work:

- add `java` ecosystem option
- add all six Java categories to `TECH_OPTIONS` and `ECOSYSTEM_CATEGORIES`
- assign icons and resource links
- map `StackState` to Java config fields
- add URL serialization keys for each Java category
- add Java command generation order

Exit criteria:

- builder can select Java and all MVP categories
- URL state round-trips correctly
- generated web command matches CLI naming

## Phase 5: Verification and Release Guard

Prove parity across type layer, generator, CLI, and web builder before expansion.

Files:

- `apps/cli/test/java-ecosystem.test.ts`
- `apps/cli/test/template-snapshots.test.ts`
- `apps/cli/test/generate-reproducible-command.test.ts`
- `apps/cli/test/add-history-commands.test.ts`
- `testing/lib/generate-combos/options.ts`
- `testing/lib/presets.ts`

Work:

- add focused Java generation tests
- add representative Java snapshot configs
- update command/history tests for Java flags
- add Java defaults to smoke-combo generation

Exit criteria:

- Java generation tests pass
- snapshots are stable
- release lane passes with Java included

---

## Required File Surface

This is the minimum expected change surface for Java MVP, based on Scenario C.

### Types and compatibility

- `packages/types/src/schemas.ts`
- `packages/types/src/types.ts`
- `packages/types/src/option-metadata.ts`
- `packages/types/src/compatibility.ts`

### Template generator

- `packages/template-generator/templates/java-base/`
- `packages/template-generator/src/template-handlers/java-base.ts`
- `packages/template-generator/src/template-handlers/index.ts`
- `packages/template-generator/src/generator.ts`
- `packages/template-generator/src/processors/readme-generator.ts`
- `packages/template-generator/src/processors/ai-docs-generator.ts`

### CLI and MCP

- `apps/cli/src/prompts/java-ecosystem.ts`
- `apps/cli/src/prompts/config-prompts.ts`
- `apps/cli/src/index.ts`
- `apps/cli/src/mcp.ts`
- `apps/cli/src/utils/bts-config.ts`
- `apps/cli/src/constants.ts`
- `apps/cli/src/helpers/core/command-handlers.ts`
- `apps/cli/src/utils/generate-reproducible-command.ts`
- `apps/cli/src/helpers/core/post-installation.ts`

### Web builder

- `apps/web/src/lib/constant.ts`
- `apps/web/src/lib/tech-icons.ts`
- `apps/web/src/lib/tech-resource-links.ts`
- `apps/web/src/lib/preview-config.ts`
- `apps/web/src/lib/stack-defaults.ts`
- `apps/web/src/lib/stack-url-keys.ts`
- `apps/web/src/lib/stack-url-state.ts`
- `apps/web/src/lib/stack-utils.ts`

### Tests and smoke coverage

- `apps/cli/test/java-ecosystem.test.ts`
- `apps/cli/test/template-snapshots.test.ts`
- `apps/cli/test/generate-reproducible-command.test.ts`
- `apps/cli/test/add-history-commands.test.ts`
- `testing/lib/generate-combos/options.ts`
- `testing/lib/presets.ts`

Note: `apps/cli/test/cli-builder-sync.test.ts` should auto-detect schema additions, but remember that it reads built `packages/types/dist`. Rebuild `packages/types` before trusting parity failures or passes after schema changes.

---

## Verification Plan

After implementation, run the smallest meaningful proof set first:

1. package-local type/generator tests for touched areas
2. `packages/types` build after schema changes
3. focused CLI Java tests
4. snapshot coverage for representative Java combinations

For release-sensitive Java ecosystem work, run from repo root:

```bash
~/.bun/bin/bun run test:release
```

This is required before considering Java MVP complete because the change touches schema parity, builder wiring, generator output, and preview config.

---

## Suggested Snapshot Matrix

At minimum, snapshots should cover:

1. `spring-boot` + `maven` + `spring-data-jpa` + `logback` + `junit5`
2. `spring-boot` + `gradle` + `jooq` + `spring-security` + `log4j2`
3. `quarkus` + `maven` + `spring-data-jpa` + `logback` + `junit5`
4. `micronaut` + `gradle` + `jooq` + `none` auth + `logback`

That matrix exercises:

- all three frameworks
- both build systems
- both ORMs
- both logging options
- auth on and off
- testing on and off

---

## Phase 2 Expansion Candidates

Only start these after Java MVP is stable in release tests:

1. `mockito`
2. `testcontainers`
3. `mybatis`
4. `spring-graphql`
5. `grpc-java`
6. `openapi-generator`
7. `keycloak`
8. messaging / task queue category
9. observability category

Order principle:

- first add features that stay inside project code and manifests
- then add features requiring external services or code generation
- last add categories that multiply compatibility branches across every framework

---

## Definition of Done

Java MVP is complete when all of the following are true:

- Java is selectable in CLI, MCP, and web builder
- all six MVP categories round-trip through config and URL state
- generator emits complete Java projects for supported combinations
- unsupported combinations are blocked with explicit reasons
- reproducible command output includes Java flags
- representative Java snapshots pass
- `test:release` passes

Anything short of that is partial wiring, not a shipped ecosystem.
