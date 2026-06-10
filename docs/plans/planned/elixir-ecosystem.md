# Elixir / Phoenix Ecosystem Expansion

Strong differentiator — no competing scaffolding tool covers Elixir well. Phoenix LiveView is unique: server-rendered reactive UI without JavaScript. The BEAM VM provides unmatched fault tolerance and hot code reloading.

Current status: foundation shipped. The shared schemas, option metadata, CLI prompts, and template surface now include `ecosystem: "elixir"` plus Phoenix/Phoenix LiveView, Ecto, auth, REST/Absinthe, realtime, jobs, validation, HTTP, JSON, email, caching, observability, testing, quality, and deploy choices. This file now tracks the shipped baseline and the deeper follow-ups still worth doing.

---

## Web Framework

- [x] Add `phoenix` ✅ — dominant Elixir web framework. No real competitors in the ecosystem.
  - LiveView for reactive server-rendered UI
  - Channels for WebSocket-based realtime
  - Built-in generators (`mix phx.gen.auth`, `mix phx.gen.live`, etc.)
  - HEEx templates (HTML + Elixir expressions)
- [x] Add `phoenix-live-view` ✅ — first-class LiveView web framework option.

---

## Database / ORM

- [x] Add `ecto` / `ecto-sql` ✅ — built-in ORM, tightly integrated with Phoenix. Changesets for validation, migrations, multi-repo support.
  - Supports PostgreSQL, MySQL, SQLite, MSSQL via adapters
  - Query composition via `Ecto.Query`
  - Schema-less queries for flexibility

---

## Realtime

Built-in — Phoenix Channels and LiveView handle this natively:
- [x] **Phoenix Channels** ✅ — WebSocket-based pub/sub, presence tracking
- [x] **Presence / PubSub / LiveView Streams** ✅ — realtime choices represented in schema and metadata
- [x] **LiveView** ✅ — server-rendered reactive components, no JS framework needed

---

## Authentication

- [x] Add `phx_gen_auth` ✅ — built-in Phoenix auth generator. Email/password, session-based, secure defaults.
- [x] Add `ueberauth` ✅ — OAuth/social login strategies. Pluggable architecture (GitHub, Google, Twitter, etc.).
- [x] Add `guardian` ✅ — JWT-based auth. Token generation, refresh, revocation.

---

## Task Queues

- [x] Add `oban` ✅ — de facto standard for background jobs. PostgreSQL-backed, cron scheduling, unique jobs, priorities, rate limiting. Pro version adds Web UI.
- [x] Add `quantum` ✅ — scheduler option for cron-like Elixir jobs.

---

## API Styles

- [x] Add `absinthe` ✅ — GraphQL toolkit for Elixir. Schema-first, subscriptions, dataloader for N+1 prevention.
- [ ] Add `grpc` (via `grpc-elixir`) — Protocol Buffers-based RPC.
- [x] REST is default via Phoenix controllers/routers. ✅

---

## Testing

- [x] `exunit` ✅ — built-in test framework. Doctests, async tests, property-based testing via StreamData.
- [x] Add `mox` ✅ — mock library following José Valim's "Mocks and explicit contracts" pattern.
- [x] Add `bypass` ✅ — HTTP service mocking for tests.
- [x] Add `wallaby` ✅ — browser-based integration testing (like Playwright for Elixir).

---

## Observability

- [x] Add `telemetry` ✅ — built-in instrumentation library. Phoenix, Ecto, and most libraries emit telemetry events.
- [x] Add `opentelemetry-erlang` ✅ — distributed tracing for BEAM.
- [x] Add `prom_ex` ✅ — Prometheus metrics exporter.

---

## Deployment

- [x] Add `fly.io` ✅ — first-class Elixir/Phoenix support, clustering via DNS.
- [x] Add `docker` ✅ — multi-stage Dockerfile with `mix release`.
- [x] Add `gigalixir` ✅ — Elixir-specific PaaS (Heroku-like but BEAM-optimized).
- [x] Add `mix-release` ✅ — release packaging target.

---

## Libraries / Utilities

- [x] Add `jason` ✅ — fast JSON encoder/decoder (default in Phoenix).
- [x] Add `req` ✅ — modern HTTP client (replaces HTTPoison).
- [x] Add `finch` ✅ — low-level HTTP client option.
- [x] Add `swoosh` ✅ — email delivery library.
- [x] Add `cachex` / `nebulex` ✅ — caching choices.
- [x] Add `credo` / `dialyxir` / `sobelow` ✅ — code quality and security analysis choices.
- [ ] Add `broadway` — data ingestion / stream processing (Kafka, SQS, RabbitMQ).
- [ ] Add `nx` (Numerical Elixir) — tensors, ML, GPU computing on BEAM.

---

## Implementation Notes

- [x] New schema value in `EcosystemSchema`: `"elixir"` ✅
- [x] Template directory: `packages/template-generator/templates/elixir-base/` ✅
- [x] Project structure: `lib/`, `config/`, `priv/`, `test/` ✅
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

1. **Deepen Phoenix/LiveView generated examples** — richer resources, forms, streams, and auth flows
2. **Add Broadway** — ingestion/stream processing
3. **Add gRPC** — protobuf RPC support
4. **Add Nx** — numerical/ML experiments
5. **Harden deploy templates** — clustering/runtime config details across Fly, Docker, Gigalixir, and Mix releases
