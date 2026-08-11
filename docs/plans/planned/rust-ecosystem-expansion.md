# Rust Ecosystem Expansion

Current state includes the original Rust surface plus Loco, Poem, and `rdkafka` generation.
Only unfinished follow-ups remain below.

Goal: bring Rust to feature parity with TypeScript's depth across all backend categories.

---

## Web Frameworks

- [x] Add `loco` with framework-specific generation and tests.
- [x] Add `poem` with framework-specific generation and tests.

### Files to touch

- `packages/types/src/schemas.ts` — add values to `RustWebFrameworkSchema`
- `packages/types/src/option-metadata.ts` — add labels
- `apps/cli/src/prompts/rust-ecosystem.ts` — add prompt options
- `apps/web/src/lib/constant.ts` — add builder entries with icons/descriptions
- `packages/template-generator/templates/rust-base/` — add framework-specific templates

---

## Message Queues (new category)

- [x] Add `rdkafka` producer generation and dependency coverage.
- [ ] Add native `rdkafka` smoke coverage once CI lanes provide librdkafka/cmake tooling.

### Implementation

- Current schema: `RustMessageQueueSchema = z.enum(["lapin", "none"])`
- Generate queue consumer/producer scaffolding

---

## Priority Order

1. **Generated-project checks** — expand `cargo check`/tests over richer Rust option combinations.
2. **Native Kafka evidence** — add a lane with librdkafka/cmake.
3. **Template depth pass** — verify existing Torii/Lapin/Askama/Tera/OTel choices include meaningful generated usage and docs.
