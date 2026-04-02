# Elixir / Phoenix Ecosystem Expansion

Strong differentiator — no competing scaffolding tool covers Elixir well. Phoenix LiveView is unique: server-rendered reactive UI without JavaScript. The BEAM VM provides unmatched fault tolerance and hot code reloading.

---

## Web Framework

- [ ] Add `phoenix` — dominant Elixir web framework. No real competitors in the ecosystem.
  - LiveView for reactive server-rendered UI
  - Channels for WebSocket-based realtime
  - Built-in generators (`mix phx.gen.auth`, `mix phx.gen.live`, etc.)
  - HEEx templates (HTML + Elixir expressions)

---

## Database / ORM

- [ ] Add `ecto` — built-in ORM, tightly integrated with Phoenix. Changesets for validation, migrations, multi-repo support.
  - Supports PostgreSQL, MySQL, SQLite, MSSQL via adapters
  - Query composition via `Ecto.Query`
  - Schema-less queries for flexibility

---

## Realtime

Built-in — Phoenix Channels and LiveView handle this natively:
- **Phoenix Channels** — WebSocket-based pub/sub, presence tracking
- **LiveView** — server-rendered reactive components, no JS framework needed
- **LiveView Streams** — efficient list rendering for large datasets

---

## Authentication

- [ ] Add `phx_gen_auth` — built-in Phoenix auth generator. Email/password, session-based, secure defaults.
- [ ] Add `ueberauth` — OAuth/social login strategies. Pluggable architecture (GitHub, Google, Twitter, etc.).
- [ ] Add `guardian` — JWT-based auth. Token generation, refresh, revocation.

---

## Task Queues

- [ ] Add `oban` — de facto standard for background jobs. PostgreSQL-backed, cron scheduling, unique jobs, priorities, rate limiting. Pro version adds Web UI.

---

## API Styles

- [ ] Add `absinthe` — GraphQL toolkit for Elixir. Schema-first, subscriptions, dataloader for N+1 prevention.
- [ ] Add `grpc` (via `grpc-elixir`) — Protocol Buffers-based RPC.
- [ ] REST is default via Phoenix controllers/routers.

---

## Testing

- [ ] `exunit` — built-in test framework. Doctests, async tests, property-based testing via StreamData.
- [ ] Add `mox` — mock library following José Valim's "Mocks and explicit contracts" pattern.
- [ ] Add `wallaby` — browser-based integration testing (like Playwright for Elixir).

---

## Observability

- [ ] Add `telemetry` — built-in instrumentation library. Phoenix, Ecto, and most libraries emit telemetry events.
- [ ] Add `opentelemetry-erlang` — distributed tracing for BEAM.
- [ ] Add `prometheus_ex` — Prometheus metrics exporter.

---

## Deployment

- [ ] Add `fly.io` — first-class Elixir/Phoenix support, clustering via DNS.
- [ ] Add `docker` — multi-stage Dockerfile with `mix release`.
- [ ] Add `gigalixir` — Elixir-specific PaaS (Heroku-like but BEAM-optimized).

---

## Libraries / Utilities

- [ ] Add `jason` — fast JSON encoder/decoder (default in Phoenix).
- [ ] Add `req` — modern HTTP client (replaces HTTPoison).
- [ ] Add `broadway` — data ingestion / stream processing (Kafka, SQS, RabbitMQ).
- [ ] Add `nx` (Numerical Elixir) — tensors, ML, GPU computing on BEAM.

---

## Implementation Notes

- New schema value in `EcosystemSchema`: `"elixir"`
- Template directory: `packages/template-generator/templates/elixir-base/`
- Project structure: `lib/`, `config/`, `priv/`, `test/`
- Mix project with umbrella app support (monorepo equivalent)
- Build system: Mix (built-in, no choice needed)
- Package manager: Hex
- Elixir 1.17+ / OTP 27+ as default

### Challenges
- Phoenix has its own project structure conventions (different from all other ecosystems)
- Mix-based build system requires different template generation approach
- LiveView is unique — no equivalent concept in other ecosystems
- BEAM deployment (releases) has specific requirements (runtime config, clustering)
- Umbrella apps are Elixir's monorepo pattern — different from Turborepo/Nx

---

## Priority Order

1. **Phoenix** + Ecto + PostgreSQL — core stack
2. **phx_gen_auth** — auth is table stakes
3. **Oban** — background jobs
4. **Absinthe** — GraphQL (unique strength in Elixir)
5. **LiveView scaffolding** — the killer feature
6. **Fly.io deploy** — best Elixir hosting
7. Remaining categories
