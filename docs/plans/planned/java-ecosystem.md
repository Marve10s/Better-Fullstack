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
