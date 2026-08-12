# Java Ecosystem Follow-Ups

> **Status refreshed 2026-08-12.** Micronaut, Java gRPC, OpenAPI Generator, Log4j2, Maven runtime
> validation, and Gradle runtime validation have shipped. This file tracks one remaining depth task.

## Spring Actuator Depth

- [ ] Expand Spring Actuator examples beyond dependency wiring.

Acceptance requires meaningful generated behavior—such as a documented health or metrics workflow—
with template assertions and generated Maven/Gradle evidence. A dependency-only change is not
complete.

## Durable Constraints

- Keep Java compatibility in `packages/types/src/compatibility.ts` aligned with template handlers.
- Keep Maven and Gradle dependencies covered by `scripts/check-dep-versions.ts`.
- Add Java capabilities as vertical slices: schema, metadata, compatibility, CLI, web, templates,
  public docs, focused tests, and generated-project evidence.
