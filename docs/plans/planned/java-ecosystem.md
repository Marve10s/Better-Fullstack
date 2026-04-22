# Java Ecosystem Expansion

Requested in GitHub issue #119. Community interest is high — multiple contributors offered PRs. Java is the most-used backend language globally and a strong enterprise play.

---

## Web Frameworks

- [ ] Add `spring-boot` — #1 enterprise Java framework. Massive ecosystem (Spring Cloud, Spring Security, Spring Data). Auto-configuration, embedded servers.
- [ ] Add `quarkus` — cloud-native, GraalVM-optimized. Faster startup and lower memory than Spring Boot. Growing in Kubernetes-first teams.
- [ ] Add `micronaut` — compile-time DI (no reflection). Low memory footprint, GraalVM native-image support. Good middle ground between Spring and Quarkus.

---

## ORM / Data Access

- [ ] Add `spring-data-jpa` (Hibernate) — de facto standard. Automatic CRUD repos, query derivation, auditing. Pairs with any JPA-compliant DB.
- [ ] Add `jooq` — type-safe SQL query builder (like Kysely for Java). Code generation from DB schema. Best for teams that want SQL control.
- [ ] Add `mybatis` — XML/annotation-based SQL mapping. Popular in Asia-Pacific enterprise. Good for complex legacy schemas.

---

## Authentication

- [ ] Add `spring-security` — comprehensive auth framework. OAuth2, OIDC, SAML, LDAP, JWT. Deep integration with Spring Boot.
- [ ] Add `keycloak` — open-source IAM. SSO, social login, admin console. Self-hosted or cloud. Common in enterprise.

---

## API Styles

- [ ] Add `spring-graphql` — official Spring GraphQL integration. Schema-first or annotation-based. Pairs with GraphiQL.
- [ ] Add `grpc-java` — high-performance RPC. Protocol Buffers. Strong for microservice-to-microservice communication.
- [ ] Add `openapi-generator` — generate REST API stubs from OpenAPI specs. Auto-generates controllers, DTOs, and validation.

---

## Testing

- [ ] Add `junit5` — standard unit testing framework.
- [ ] Add `mockito` — mocking framework. Most-used in Java testing.
- [ ] Add `testcontainers` — Docker-based integration tests. Spin up real databases, message brokers, etc. in tests.

---

## Task Queues / Messaging

- [ ] Add `spring-batch` — batch processing framework. Job scheduling, retry, partitioning.
- [ ] Add `spring-kafka` — Kafka integration. Consumer groups, exactly-once semantics.
- [ ] Add `rabbitmq` (via spring-amqp) — message broker integration.

---

## Observability

- [ ] Add `micrometer` — metrics facade (like SLF4J for metrics). Exports to Prometheus, Datadog, New Relic, etc.
- [ ] Add `spring-actuator` — health checks, metrics, env info. Built into Spring Boot.
- [ ] Add `opentelemetry-java` — distributed tracing, auto-instrumentation agent.

---

## Logging

- [ ] Add `logback` — default Spring Boot logger. SLF4J backend.
- [ ] Add `log4j2` — async logging, structured output. Alternative to Logback.

---

## Build System

Maven and Gradle are the two options:
- [ ] Add `maven` — XML-based, convention-over-configuration. Most enterprise teams use this.
- [ ] Add `gradle` — Groovy/Kotlin DSL, faster incremental builds. Preferred by Android and modern projects.

---

## Implementation Notes

- New schema value in `EcosystemSchema`: `"java"`
- Template directory: `packages/template-generator/templates/java-base/`
- Project structure follows Maven/Gradle conventions: `src/main/java/`, `src/main/resources/`, `src/test/`
- `pom.xml` or `build.gradle.kts` generation based on build tool choice
- Spring Boot uses `application.yml` / `application.properties` for config
- Java 21 LTS as default (virtual threads, pattern matching, records)

### Challenges
- Java build systems (Maven/Gradle) are complex — template generation must handle dependency management differently than npm/cargo/pip
- Spring Boot auto-configuration means less boilerplate but more implicit behavior to template
- Quarkus and Micronaut have different DI approaches — need separate template sets

---

## Priority Order

1. **Spring Boot** + Maven — covers 80% of Java demand
2. **JPA/Hibernate** — most common data access
3. **Spring Security** — auth is table stakes
4. **JUnit 5 + Mockito** — testing basics
5. **Quarkus** — cloud-native alternative
6. **Gradle** — alternative build tool
7. Remaining categories

---

## Better-Fullstack rollout checklist

Use the new-ecosystem workflow from `docs/guidelines/adding-new-tool-options/README.md` as the baseline, then implement Java in vertical slices instead of trying to land every category at once.

### Phase 0 - ecosystem foundation

Goal: make `java` a first-class ecosystem everywhere the repo models stack state, URL state, CLI flags, MCP planning, and saved config.

- **Schema + metadata**
  - `packages/types/src/schemas.ts`
  - `packages/types/src/types.ts`
  - `packages/types/src/option-metadata.ts`
  - `packages/types/src/compatibility.ts`
  - `packages/types/src/defaults.ts`
  - `packages/types/src/json-schema.ts`
- **CLI + MCP + persisted config**
  - `apps/cli/src/index.ts`
  - `apps/cli/src/create-command-input.ts`
  - `apps/cli/src/mcp.ts`
  - `apps/cli/src/constants.ts`
  - `apps/cli/src/utils/bts-config.ts`
  - `apps/cli/src/utils/config-processing.ts`
  - `apps/cli/src/helpers/core/command-handlers.ts`
  - `apps/cli/src/utils/generate-reproducible-command.ts`
  - `apps/cli/src/prompts/config-prompts.ts`
  - `apps/cli/src/prompts/prompt-resolver-registry.ts`
  - `apps/cli/src/prompts/java-ecosystem.ts` (new)
- **Web builder + URL state**
  - `apps/web/src/lib/constant.ts`
  - `apps/web/src/lib/tech-icons.ts`
  - `apps/web/src/lib/tech-resource-links.ts`
  - `apps/web/src/lib/preview-config.ts`
  - `apps/web/src/lib/stack-defaults.ts`
  - `apps/web/src/lib/stack-url-keys.ts`
  - `apps/web/src/lib/stack-url-state.ts`
  - `apps/web/src/lib/stack-utils.ts`
  - `apps/web/src/lib/stack-contract.ts`
  - `apps/web/src/lib/stack-project-config-base.ts`

Recommended Java category set for the first pass:

- `javaWebFramework`
- `javaBuildTool`
- `javaOrm`
- `javaAuth`
- `javaTesting`

Keep everything else out of scope until the first vertical slice scaffolds cleanly.

### Phase 1 - MVP vertical slice

Goal: ship the smallest useful Java stack from the current priority order.

- `ecosystem: "java"`
- `javaWebFramework: "spring-boot"`
- `javaBuildTool: "maven"`
- `javaOrm: "none"`
- `javaAuth: "none"`
- `javaTesting: "none"`

Files to land in this phase:

- `packages/template-generator/templates/java-base/`
  - `pom.xml.hbs`
  - `.gitignore`
  - `.env.example`
  - `README.md` support files as needed
  - `src/main/java/.../Application.java.hbs`
  - `src/main/java/.../controller/HealthController.java.hbs`
  - `src/main/resources/application.yml.hbs`
  - `src/test/java/.../ApplicationTests.java.hbs`
- `packages/template-generator/src/template-handlers/java-base.ts` (new)
- `packages/template-generator/src/template-handlers/index.ts`
- `packages/template-generator/src/generator.ts`
- `packages/template-generator/src/processors/readme-generator.ts`
- `packages/template-generator/src/processors/ai-docs-generator.ts`
- `apps/cli/src/helpers/core/post-installation.ts`

Architecture choice:

- Follow the **Go-style monolithic handler** from the guideline: boolean/path skips plus empty-file skipping.
- Keep framework, build-tool, ORM, auth, and testing differences in shared `.hbs` files where possible.
- Reserve directory-level skips for truly optional modules, not for every framework branch.

### Phase 2 - JPA / Hibernate

Goal: make the default Java stack actually useful for database-backed apps.

- Add `javaOrm: "spring-data-jpa"`
- Extend `pom.xml.hbs`, `application.yml.hbs`, entity/repository/service templates, and DB config docs
- Verify compatibility with existing shared database choices before enabling every DB/setup combination

### Phase 3 - Spring Security

Goal: cover the default auth story for Spring Boot.

- Add `javaAuth: "spring-security"`
- Add security config, basic auth wiring, and env var/docs updates
- Treat this as a Java-specific auth category rather than forcing `spring-security` into shared `auth`

### Phase 4 - Testing basics

Goal: move the Java scaffold from demoable to maintainable.

- Add `javaTesting: "junit5"` and `javaTesting: "mockito"` or a combined selection model if needed
- Add service/controller test templates
- Update generated README and post-install guidance with test commands

### Phase 5 - second framework / second build tool

Only after Phases 0-4 are stable:

- `javaWebFramework: "quarkus"`
- `javaBuildTool: "gradle"`

Do not start Quarkus and Gradle before Spring Boot + Maven is proven through release tests.

## Repo-specific gotchas to account for

- `apps/cli/test/cli-builder-sync.test.ts` reads built `packages/types/dist`, not only source. Rebuild `packages/types` before trusting parity failures or passes.
- The generic new-ecosystem guideline is close, but this repo also requires Java awareness in:
  - `packages/types/src/defaults.ts`
  - `packages/types/src/json-schema.ts`
  - `apps/cli/src/create-command-input.ts`
  - `apps/cli/src/utils/config-processing.ts`
  - `apps/cli/src/prompts/prompt-resolver-registry.ts`
  - `apps/web/src/lib/stack-contract.ts`
  - `apps/web/src/lib/stack-project-config-base.ts`
- Existing ecosystems already use ecosystem-scoped auth fields (`rustAuth`, `pythonAuth`, `goAuth`). Java should follow that pattern with `javaAuth`.

## Verification gates per phase

Run the narrowest useful checks while building, then the release lane before calling the ecosystem ready:

```bash
~/.bun/bin/bun run --cwd packages/types build
~/.bun/bin/bun test apps/cli/test/java-ecosystem.test.ts
~/.bun/bin/bun test apps/web/test/java-ecosystem.test.ts
~/.bun/bin/bun test apps/cli/test/generate-reproducible-command.test.ts
~/.bun/bin/bun test apps/cli/test/cli-builder-sync.test.ts
~/.bun/bin/bun run test:release
```

Recommended new tests:

- `apps/cli/test/java-ecosystem.test.ts`
- `apps/web/test/java-ecosystem.test.ts`
- `apps/cli/test/template-snapshots.test.ts` coverage for Java presets

## Definition of done for the first Java release

- Java appears in schema, CLI, MCP tools, builder UI, URL state, and saved `bts.jsonc`
- `bfs_plan_project` and `bfs_create_project` accept Java inputs end-to-end
- Spring Boot + Maven scaffold generates a runnable project with README/CLAUDE docs using correct Java commands
- Release tests pass without special-casing Java outside the normal ecosystem flow
