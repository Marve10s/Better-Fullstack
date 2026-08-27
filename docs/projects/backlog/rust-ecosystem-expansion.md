# Rust Ecosystem Expansion

Loco, Poem, and `rdkafka` generation are shipped. This project remains open for one missing
high-fidelity evidence lane.

## Native Kafka Evidence

- [ ] Add generated `rdkafka` smoke coverage in a CI lane that deliberately provisions
      librdkafka and CMake.

The current claim fails at `build-verified`. The generator emits the producer and dependency graph,
but the generic Rust lane does not provision or compile the native dependency chain.

The closing recipe must generate a named `rdkafka` project, provision librdkafka and CMake, run
`cargo build --locked`, start a local Kafka-compatible broker, and prove one generated produce and
consume round trip. Do not skip native dependency checks to make the generic lane green.

Generic Rust template-depth work remains ongoing maintenance rather than project scope.
