# Java Ecosystem Follow-Ups

The Java ecosystem foundation shipped in `v1.6.2`. Status was refreshed on 2026-06-30 after the June parity batches added jOOQ, MyBatis, Keycloak, Spring GraphQL, Spring AMQP, OpenTelemetry Java, explicit Logback config, and related template coverage.

---

## Web Frameworks

- [ ] Add `micronaut` — compile-time DI, low memory footprint, GraalVM native-image support.

## ORM / Data Access

- [x] Add `jooq` ✅ — type-safe SQL query builder and code generation from database schema.
- [x] Add `mybatis` ✅ — XML/annotation SQL mapping for complex legacy schemas.

## Authentication

- [x] Add `keycloak` integration ✅ for open-source IAM, SSO, social login, and enterprise identity setups.

## API Styles

- [x] Add `spring-graphql` ✅
- [ ] Add `grpc-java`
- [ ] Add `openapi-generator`
- [x] Add `springdoc-openapi` ✅ through Java libraries.

## Task Queues / Messaging

- [x] Add `spring-batch`
- [x] Add `spring-kafka`
- [x] Add `rabbitmq` via Spring AMQP ✅

## Observability

- [x] Add `micrometer-prometheus`
- [x] Add `opentelemetry-java` ✅
- [ ] Expand Spring Actuator examples beyond dependency wiring

## Logging

- [x] Add explicit `logback` configuration templates ✅
- [ ] Add `log4j2` as an alternative logger

## Runtime Validation

- [ ] Add CI/runtime validation for generated Maven projects
- [ ] Add CI/runtime validation for generated Gradle projects
- [ ] Run generated `./mvnw test` and `./gradlew test` in a Java-enabled smoke lane

## Future Implementation Notes

- Keep Java compatibility logic in `packages/types/src/compatibility.ts` aligned with template-handler support.
- Keep generated Maven and Gradle dependencies covered by `scripts/check-dep-versions.ts`.
- Add new Java options as vertical slices: schema, metadata, compatibility, CLI, web, template, docs, snapshots, and smoke coverage together.

## Priority Order

1. **Generated Maven/Gradle runtime validation** — make the shipped Java surface trustworthy under smoke/ScaffBench.
2. **Micronaut** — only major Java framework candidate still listed.
3. **gRPC Java** — deferred because protoc/build-plugin work needs a careful vertical slice.
4. **Actuator example depth** — go beyond dependency wiring.
5. **Log4j2** — optional logging alternative if user demand appears.
