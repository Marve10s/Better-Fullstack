# Java Ecosystem Foundation

Status: completed in `v1.6.2`.

Java is now a first-class Better Fullstack ecosystem across schemas, CLI prompts, MCP input, builder state, generated templates, tests, and docs. The initial foundation and first expansion focused on Spring Boot, Maven/Gradle, Spring Data JPA, Spring Security, production libraries, and testing libraries.

---

## Completed Scope

### Ecosystem Foundation

- [x] Added `ecosystem: "java"`
- [x] Added Java schema values and defaults
- [x] Added Java option metadata
- [x] Added Java compatibility rules
- [x] Added Java JSON schema output
- [x] Added Java CLI flags and prompts
- [x] Added Java prompt resolver registry coverage
- [x] Added Java MCP/config handling
- [x] Added Java web builder state and URL-state support
- [x] Added Java tech icon/resource metadata
- [x] Added proper Java language icon in the stack builder

### Build Tools

- [x] Maven
- [x] Gradle
- [x] Conditional `pom.xml` and `build.gradle.kts` generation

### Web Framework

- [x] Spring Boot
- [x] Spring Boot application template
- [x] Spring Boot `application.yml` template

### ORM / Data Access

- [x] Spring Data JPA
- [x] Entity/repository/service style generated output
- [x] Database migration compatibility for JPA-only migration libraries

### Authentication

- [x] Spring Security
- [x] Java-specific auth modeling through `javaAuth`

### Java Libraries

- [x] Spring Actuator
- [x] Spring Validation
- [x] Flyway
- [x] Liquibase
- [x] Springdoc OpenAPI
- [x] Lombok
- [x] MapStruct
- [x] Caffeine

### Java Testing Libraries

- [x] JUnit 5
- [x] Mockito
- [x] Testcontainers
- [x] AssertJ
- [x] REST Assured
- [x] WireMock
- [x] Awaitility
- [x] ArchUnit
- [x] jqwik

### Generated Examples

- [x] Liquibase changelog
- [x] MapStruct DTO mapping
- [x] Caffeine-backed Spring Cache example
- [x] ArchUnit architecture rule
- [x] jqwik property test
- [x] REST Assured HTTP test
- [x] WireMock HTTP test
- [x] Testcontainers test
- [x] Mapper/service tests

### Docs and Release Surface

- [x] Java ecosystem docs page
- [x] Java option reference page
- [x] Generated README/post-install guidance for Java projects
- [x] Java dependency freshness checks for Maven and Gradle templates

---

## Validation

- `bun run test:release`
- `bun test packages/template-generator/test/template-handlers/java-base.test.ts apps/cli/test/java-ecosystem.test.ts apps/web/test/java-ecosystem.test.ts`
- `bun test apps/cli/test/template-snapshots.test.ts`
- `bun run scripts/check-dep-versions.ts --ecosystem java`
- `bun run --cwd apps/web validate:tech-links`

Generated Java Maven/Gradle runtime tests were not run locally during implementation because that environment did not have a Java Runtime installed. Template structure and generated file content are covered by the repo test suite.

---

## Follow-Up Backlog

Remaining Java work now lives in `docs/plans/planned/java-ecosystem-follow-ups.md`.
