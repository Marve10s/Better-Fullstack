# Rust Ecosystem Expansion

Current state: 3 web frameworks (axum, actix-web, rocket), 2 WASM frontends (leptos, dioxus), 3 ORMs (sea-orm, sqlx, diesel), 2 API layers (tonic, async-graphql), 2 CLI tools (clap, ratatui), expanded core libraries, logging, error handling, caching, auth, realtime, message queue, observability, and templating categories.

Goal: bring Rust to feature parity with TypeScript's depth across all backend categories.

---

## Web Frameworks

- [x] Add `rocket` ✅ — 25k+ stars, convention-over-configuration, stable Rust support since v0.5. Appeals to Flask/Sinatra developers.
- [ ] Add `loco` — "Rails of Rust". Built-in ORM, migrations, CLI, templating. Fastest-growing Rust web framework. Ideal for CRUD-heavy scaffolding.
- [ ] Add `poem` — built on hyper/tokio, simpler API than Axum, lightweight. Good middle ground.

### Files to touch
- `packages/types/src/schemas.ts` — add values to `RustWebFrameworkSchema`
- `packages/types/src/option-metadata.ts` — add labels
- `apps/cli/src/prompts/rust-ecosystem.ts` — add prompt options
- `apps/web/src/lib/constant.ts` — add builder entries with icons/descriptions
- `packages/template-generator/templates/rust-base/` — add framework-specific templates

---

## ORMs / Database

- [x] Add `diesel` ✅ — 12k+ stars, most mature Rust ORM, compile-time query validation. "If it compiles, your queries are correct." Version 2.3.6+.

### Files to touch
- `packages/types/src/schemas.ts` — add to `RustOrmSchema`
- `packages/template-generator/templates/rust-base/crates/server/` — add Diesel database setup, models, migrations
- Diesel uses its own migration CLI (`diesel migration run`) — add to post-install instructions

---

## Error Handling (new category)

- [x] Add `anyhow` ✅ — standard application-level error handling. Ergonomic `?` operator, backtraces.
- [x] Add `thiserror` ✅ — derive macro for custom error types. Pairs with anyhow.
- [x] Add `eyre` ✅ — anyhow fork with customizable error reports (color-eyre for pretty backtraces).

### Implementation
- New schema: `RustErrorHandlingSchema = z.enum(["anyhow-thiserror", "eyre", "none"])`
- New prompt in `apps/cli/src/prompts/rust-ecosystem.ts`
- Add to `Cargo.toml` dependencies conditionally
- Generate error module scaffolding in `crates/server/src/error.rs`

---

## Logging / Tracing (new category)

- [x] Add `tracing` ✅ — de facto standard for structured logging and distributed tracing in async Rust. Built by Tokio team. Integrates with OpenTelemetry.
- [x] Add `env_logger` ✅ — simple environment-variable-configured logger. Good default for development.

### Implementation
- New schema: `RustLoggingSchema = z.enum(["tracing", "env-logger", "none"])`
- New prompt in `apps/cli/src/prompts/rust-ecosystem.ts`
- Generate tracing subscriber setup in `main.rs`
- Add `tracing-subscriber`, `tracing-opentelemetry` dependencies conditionally

---

## Auth (new category)

- [x] Add `oauth2` crate ✅ — complete OAuth 2.0 (RFC 6749), async/sync, PKCE support. The standard for OAuth in Rust.
- [x] Add `torii-rs` ✅ — modern auth framework path exposed as `torii`.

### Implementation
- New schema: `RustAuthSchema = z.enum(["oauth2", "torii", "none"])`
- New prompt in `apps/cli/src/prompts/rust-ecosystem.ts`
- Generate auth middleware and configuration module

---

## Caching (new category)

- [x] Add `moka` ✅ — high-performance concurrent in-memory cache. Used by crates.io in production. Java Caffeine-inspired.
- [x] Add `redis-rs` ✅ — official Redis client for Rust. Async support, connection pooling.

### Implementation
- New schema: `RustCachingSchema = z.enum(["moka", "redis", "none"])`
- Generate cache module in `crates/server/src/cache.rs`

---

## Message Queues (new category)

- [x] Add `lapin` ✅ — RabbitMQ client for Rust. Async, well-maintained. Standard for AMQP.
- [ ] Add `rdkafka` — Rust wrapper for librdkafka (Apache Kafka). Production-grade event streaming.

### Implementation
- Current schema: `RustMessageQueueSchema = z.enum(["lapin", "none"])`
- Generate queue consumer/producer scaffolding

---

## Template Engines (new category)

- [x] Add `askama` ✅ — compile-time template engine.
- [x] Add `tera` ✅ — runtime template engine.

### Implementation
- Current schema: `RustTemplatingSchema = z.enum(["askama", "tera", "none"])`
- Generate template directory and example templates

---

## WebSocket / Realtime (new category)

- [x] Add `tokio-tungstenite` ✅ — standard async WebSocket client/server for Rust.

### Implementation
- Add as optional feature in web framework templates
- Generate WebSocket handler example

---

## Observability (new category)

- [x] Add `opentelemetry-rust` ✅ — official OpenTelemetry SDK. Traces, metrics, logs. OTLP export.

### Implementation
- Integrate with `tracing` via `tracing-opentelemetry`
- Generate OTel configuration module

---

## Priority Order

1. **Loco or Poem** — decide whether either framework deserves first-class support beside Axum/Actix/Rocket.
2. **Kafka (`rdkafka`)** — remaining event-streaming candidate after RabbitMQ/Lapin.
3. **Generated-project checks** — expand `cargo check`/tests over richer Rust option combinations.
4. **Template depth pass** — verify shipped Torii/Lapin/Askama/Tera/OTel choices include meaningful generated usage and docs.
