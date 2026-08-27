# Java Actuator runtime evidence

The Spring Actuator depth follow-up is complete.

The Java golden recipe generates Spring Boot with Maven, jOOQ, local H2, and
`spring-boot-starter-actuator`. It runs the generated tests, starts the generated application with
the Maven wrapper, and requires an HTTP 200 response containing `"status":"UP"` from
`/actuator/health`.

The release proof binds that result to the release SHA, catalog version, recipe definition version,
toolchain record, and capability producer fingerprint. A missing, stale, failed, or mismatched
receipt lowers `spring-actuator` to listed evidence.
