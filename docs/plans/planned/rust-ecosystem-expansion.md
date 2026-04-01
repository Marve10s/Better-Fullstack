# Rust Ecosystem Expansion

Current state: 2 web frameworks (axum, actix-web), 2 ORMs (sea-orm, sqlx), 2 API layers (tonic, async-graphql), 2 CLI tools (clap, ratatui), 6 libraries (serde, validator, jsonwebtoken, argon2, tokio-test, mockall).

Goal: bring Rust to feature parity with TypeScript's depth across all backend categories.

---

## Web Frameworks

- [ ] Add `rocket` — 25k+ stars, convention-over-configuration, stable Rust support since v0.5. Appeals to Flask/Sinatra developers.
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

- [ ] Add `diesel` — 12k+ stars, most mature Rust ORM, compile-time query validation. "If it compiles, your queries are correct." Version 2.3.6+.

### Files to touch
- `packages/types/src/schemas.ts` — add to `RustOrmSchema`
- `packages/template-generator/templates/rust-base/crates/server/` — add Diesel database setup, models, migrations
- Diesel uses its own migration CLI (`diesel migration run`) — add to post-install instructions

---

## Error Handling (new category)

- [ ] Add `anyhow` — standard application-level error handling. Ergonomic `?` operator, backtraces.
- [ ] Add `thiserror` — derive macro for custom error types. Pairs with anyhow.
- [ ] Add `eyre` — anyhow fork with customizable error reports (color-eyre for pretty backtraces).

### Implementation
- New schema: `RustErrorHandlingSchema = z.enum(["anyhow-thiserror", "eyre", "none"])`
- New prompt in `apps/cli/src/prompts/rust-ecosystem.ts`
- Add to `Cargo.toml` dependencies conditionally
- Generate error module scaffolding in `crates/server/src/error.rs`

---

## Logging / Tracing (new category)

- [ ] Add `tracing` — de facto standard for structured logging and distributed tracing in async Rust. Built by Tokio team. Integrates with OpenTelemetry.
- [ ] Add `env_logger` — simple environment-variable-configured logger. Good default for development.

### Implementation
- New schema: `RustLoggingSchema = z.enum(["tracing", "env-logger", "none"])`
- New prompt in `apps/cli/src/prompts/rust-ecosystem.ts`
- Generate tracing subscriber setup in `main.rs`
- Add `tracing-subscriber`, `tracing-opentelemetry` dependencies conditionally

---

## Auth (new category)

- [ ] Add `oauth2` crate — complete OAuth 2.0 (RFC 6749), async/sync, PKCE support. The standard for OAuth in Rust.
- [ ] Add `torii-rs` — modern auth framework: OAuth/OIDC social login, passkeys/WebAuthn, magic links. Multiple storage backends (SQLite, Postgres, MySQL).

### Implementation
- New schema: `RustAuthSchema = z.enum(["oauth2", "torii", "none"])`
- New prompt in `apps/cli/src/prompts/rust-ecosystem.ts`
- Generate auth middleware and configuration module

---

## Caching (new category)

- [ ] Add `moka` — high-performance concurrent in-memory cache. Used by crates.io in production. Java Caffeine-inspired.
- [ ] Add `redis-rs` — official Redis client for Rust. Async support, connection pooling.

### Implementation
- New schema: `RustCachingSchema = z.enum(["moka", "redis", "none"])`
- Generate cache module in `crates/server/src/cache.rs`

---

## Message Queues (new category)

- [ ] Add `lapin` — RabbitMQ client for Rust. Async, well-maintained. Standard for AMQP.
- [ ] Add `rdkafka` — Rust wrapper for librdkafka (Apache Kafka). Production-grade event streaming.

### Implementation
- New schema: `RustMessageQueueSchema = z.enum(["rabbitmq", "kafka", "none"])`
- Generate queue consumer/producer scaffolding

---

## Template Engines (new category)

- [ ] Add `askama` — compile-time template engine (Jinja-based). Type-safe, fastest performance.
- [ ] Add `tera` — runtime template engine (Jinja2/Django-inspired). Dynamic template loading.

### Implementation
- New schema: `RustTemplateEngineSchema = z.enum(["askama", "tera", "none"])`
- Generate template directory and example templates

---

## WebSocket / Realtime (new category)

- [ ] Add `tokio-tungstenite` — standard async WebSocket client/server for Rust.

### Implementation
- Add as optional feature in web framework templates
- Generate WebSocket handler example

---

## Observability (new category)

- [ ] Add `opentelemetry-rust` — official OpenTelemetry SDK. Traces, metrics, logs. OTLP export.

### Implementation
- Integrate with `tracing` via `tracing-opentelemetry`
- Generate OTel configuration module

---

## Priority Order

1. **anyhow + thiserror** — every Rust project needs error handling (quick win)
2. **tracing** — every Rust project needs logging (quick win)
3. **diesel** — most requested ORM alternative
4. **rocket** + **loco** — framework diversity
5. **oauth2** + **torii-rs** — auth is essential for real apps
6. **moka** + **redis-rs** — caching
7. **opentelemetry-rust** — observability
8. Remaining categories
