# Java Ecosystem Follow-Ups

> **Status refreshed 2026-08-07.** Micronaut, OpenAPI Generator, and Log4j2 have shipped. This file
> now tracks only the remaining JVM depth work.

---

## Web Frameworks

- [x] Add `micronaut` — compile-time DI, low memory footprint, GraalVM native-image support.

## API Styles

- [x] Add Java gRPC as the `grpc` Java API value
- [x] Add `openapi-generator`

## Observability

- [ ] Expand Spring Actuator examples beyond dependency wiring

## Logging

- [x] Add `log4j2` as an alternative logger

## Runtime Validation

- [ ] Add CI/runtime validation for generated Maven projects
- [ ] Add CI/runtime validation for generated Gradle projects
- [ ] Run generated `./mvnw test` and `./gradlew test` in a Java-enabled smoke lane

## Future Implementation Notes

- Keep Java compatibility logic in `packages/types/src/compatibility.ts` aligned with template-handler support.
- Keep generated Maven and Gradle dependencies covered by `scripts/check-dep-versions.ts`.
- Add new Java options as vertical slices: schema, metadata, compatibility, CLI, web, template, docs, snapshots, and smoke coverage together.

## Priority Order

1. **Generated Maven/Gradle runtime validation** — make the existing Java surface trustworthy under smoke/ScaffBench.
2. **Actuator example depth** — go beyond dependency wiring.
