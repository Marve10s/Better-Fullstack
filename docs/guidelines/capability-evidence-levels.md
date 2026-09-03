# Capability evidence levels

Use these levels for CLI, MCP, web, documentation, release receipts, and issue reports. A public
claim must not exceed the current receipt-backed level.

## Listed

Proves: The Stack Part exists in the canonical schema and can be checked for compatibility.

Does not prove: The generator emits files or that a generated project installs, builds, or runs.

Required evidence: a canonical schema entry and executable compatibility coverage.

## Generated

Proves: The current generator emits the declared files and structural assertions pass for an exact
version.

Does not prove: Dependencies install or that the generated project builds or runs.

Required evidence: listed evidence, a SHA-bound generator receipt, and structural assertions.

## Build verified

Proves: A clean generated project installs dependencies and completes its declared compile, build,
type-check, or test stages on recorded toolchains.

Does not prove: A server starts or that a user-visible protocol and behavior work at runtime.

Required evidence: generated evidence, a clean install, declared build stages, and an exact commit
and toolchain receipt.

## Runtime verified

Proves: A build-verified project starts and passes declared live protocol and behavior assertions.

Does not prove: Behavior outside the recorded recipe, assertions, environment, or evidence age.

Required evidence: build-verified evidence, a live process or device exercise, declared protocol
assertions, and declared behavior assertions.

## Fail-closed rules

- Missing, stale, dirty, partial, failed, or revision-mismatched evidence lowers the displayed level.
- A later-stage result cannot skip an earlier prerequisite.
- Dependency presence, generated source strings, theoretical compatibility, and skipped checks are
  never runtime proof.
- Fixproof evaluates coding agents. It does not raise a product capability evidence level.
