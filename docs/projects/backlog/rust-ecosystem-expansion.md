# Rust Ecosystem Expansion

Loco, Poem, and `rdkafka` generation are shipped. This project remains open for one missing
high-fidelity evidence lane.

## Native Kafka Evidence

- [ ] Add generated `rdkafka` smoke coverage in a CI lane that deliberately provisions
      librdkafka and CMake.

Do not weaken or skip native dependency checks merely to make the generic lane green. The lane must
prove that the generated producer and dependency graph compile in the supported environment.

Generic Rust template-depth work remains ongoing maintenance rather than project scope.
