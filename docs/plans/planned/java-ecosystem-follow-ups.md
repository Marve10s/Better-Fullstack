# Java Ecosystem Follow-Ups

The Java ecosystem foundation shipped in `v1.6.2`. This plan tracks the remaining Java expansion work after Spring Boot, Maven/Gradle, Spring Data JPA, Spring Security, Java libraries, and Java testing libraries landed.

---

## Web Frameworks

- [ ] Add `quarkus` — cloud-native, GraalVM-optimized, faster startup and lower memory than Spring Boot.
- [ ] Add `micronaut` — compile-time DI, low memory footprint, GraalVM native-image support.

## ORM / Data Access

- [ ] Add `jooq` — type-safe SQL query builder and code generation from database schema.
- [ ] Add `mybatis` — XML/annotation SQL mapping for complex legacy schemas.

## Authentication

- [ ] Add `keycloak` integration for open-source IAM, SSO, social login, and enterprise identity setups.

## API Styles

- [ ] Add `spring-graphql`
- [ ] Add `grpc-java`
- [ ] Add `openapi-generator`

## Task Queues / Messaging

- [ ] Add `spring-batch`
- [ ] Add `spring-kafka`
- [ ] Add `rabbitmq` via Spring AMQP

## Observability

- [ ] Add `micrometer`
- [ ] Add `opentelemetry-java`
- [ ] Expand Spring Actuator examples beyond dependency wiring

## Logging

- [ ] Add explicit `logback` configuration templates
- [ ] Add `log4j2` as an alternative logger

## Runtime Validation

- [ ] Add CI/runtime validation for generated Maven projects
- [ ] Add CI/runtime validation for generated Gradle projects
- [ ] Run generated `./mvnw test` and `./gradlew test` in a Java-enabled smoke lane

## Future Implementation Notes

- Keep Java compatibility logic in `packages/types/src/compatibility.ts` aligned with template-handler support.
- Keep generated Maven and Gradle dependencies covered by `scripts/check-dep-versions.ts`.
- Add new Java options as vertical slices: schema, metadata, compatibility, CLI, web, template, docs, snapshots, and smoke coverage together.
