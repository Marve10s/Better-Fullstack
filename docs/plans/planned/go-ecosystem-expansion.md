# Go Ecosystem Expansion

Current state: 4 web frameworks (gin, echo, fiber, chi), 3 ORMs (gorm, sqlc, ent), 2 API layers (grpc-go, gqlgen), 3 CLI tools (cobra, bubbletea, urfave-cli), 4 logging options (zap, zerolog, slog, logrus), 3 auth options (casbin, jwt, goth), testing, realtime, messaging, caching, config, and observability categories.

Goal: bring Go to feature parity with TypeScript's depth across all backend categories.

---

## Web Frameworks

- [x] Add `fiber` ✅ — 38k+ stars, Express.js-like API, built on FastHTTP. Attracts Node.js developers migrating to Go. 11% adoption among Go devs.
- [x] Add `chi` ✅ — 18k+ stars, lightweight, zero-dependency, built on net/http stdlib. Popular for microservices. Fully standard-library compatible.
- [ ] Add `stdlib` (net/http) — Go 1.22+ pattern routing makes the standard library viable without any framework. Offer as a "no framework" option.

### Files to touch
- `packages/types/src/schemas.ts` — add values to `GoWebFrameworkSchema`
- `packages/types/src/option-metadata.ts` — add labels
- `apps/cli/src/prompts/go-ecosystem.ts` — add prompt options
- `apps/web/src/lib/constant.ts` — add builder entries
- `packages/template-generator/templates/go-base/cmd/server/` — add framework-specific main.go and handler patterns

---

## ORMs / Database

- [x] Add `ent` ✅ — 15k+ stars, code-first ORM by Meta. Compile-time safety, graph traversal API, explicit schema definitions. Best for complex data models.
- [ ] Add `bun` — lightweight, PostgreSQL-focused ORM with SQL-shaped query builder. Less overhead than GORM.

### Files to touch
- `packages/types/src/schemas.ts` — add to `GoOrmSchema`
- `packages/template-generator/templates/go-base/internal/database/` — add Ent schema definitions and Bun setup

---

## Auth (new category)

- [x] Add `casbin` ✅ — 17k+ stars. Authorization standard for Go. Supports ACL, RBAC, ABAC models. Dozens of storage adapters.
- [x] Add `golang-jwt` (v5) ✅ — standard JWT library for Go. Token-based auth essential.
- [x] Add `goth` ✅ — OAuth social login. 30+ providers (Google, GitHub, etc.). Clean Go API.

### Implementation
- New schema: `GoAuthSchema = z.enum(["casbin", "jwt", "goth", "none"])`
- New prompt in `apps/cli/src/prompts/go-ecosystem.ts`
- Generate auth middleware in `internal/auth/`
- Generate JWT token helpers and OAuth callback handlers

---

## GraphQL (new category)

- [x] Add `gqlgen` ✅ — dominant Go GraphQL library. Schema-first with code generation. Full type safety. Production-proven.

### Implementation
- Add to `GoApiSchema` — extend with `gqlgen` alongside `grpc-go`
- Generate `graph/` directory with schema, resolvers, and generated code
- Add `gqlgen.yml` configuration

---

## Logging

- [x] Add `zerolog` ✅ — zero-allocation JSON logger. Fastest in many benchmarks. JSON-first approach.
- [x] Add `slog` ✅ — Go 1.21+ stdlib structured logging. Future-proof, no external dependencies.

### Files to touch
- `packages/types/src/schemas.ts` — add to `GoLoggingSchema`
- `packages/template-generator/templates/go-base/` — add logger initialization per choice

---

## Config Management (new category)

- [x] Add `viper` ✅ — de facto Go config standard.
- [x] Add `koanf` ✅ — lightweight Viper alternative.

### Implementation
- New schema: `GoConfigSchema = z.enum(["viper", "koanf", "none"])`
- Generate config loading module in `internal/config/`

---

## Message Queues (new category)

- [x] Add `nats` ✅ — most idiomatic Go messaging system. Lightweight, fast. JetStream for persistence.
- [x] Add `watermill` ✅ — event-driven framework. Supports Kafka, RabbitMQ, HTTP.

### Implementation
- New schema: `GoMessageQueueSchema = z.enum(["nats", "watermill", "none"])`
- Generate publisher/subscriber scaffolding in `internal/messaging/`

---

## Caching (new category)

- [x] Add `go-redis` ✅ — standard Redis client for Go.
- [x] Add `ristretto` ✅ — high-performance in-process cache selected instead of `groupcache`.

### Implementation
- Current schema: `GoCachingSchema = z.enum(["redis", "ristretto", "none"])`
- Generate cache helper in `internal/cache/`

---

## Search (new category)

- [ ] Add `meilisearch-go` — official Go SDK for Meilisearch. Fast, typo-tolerant.
- [ ] Add `bleve` — full-text search library in pure Go. Embedded, no external service needed.

### Implementation
- New schema: `GoSearchSchema = z.enum(["meilisearch", "bleve", "none"])`
- Generate search client in `internal/search/`

---

## Observability (new category)

- [x] Add `opentelemetry-go` ✅ — official OpenTelemetry SDK. Traces, metrics, logs. Industry standard.

### Implementation
- New schema: `GoObservabilitySchema = z.enum(["opentelemetry", "none"])`
- Generate OTel setup with framework middleware integration

---

## WebSocket / Realtime (new category)

- [x] Add `gorilla/websocket` ✅ — industry standard WebSocket library for Go.
- [x] Add `centrifuge` ✅ — scalable real-time messaging library. Chat, live updates, notifications.

### Implementation
- New schema: `GoRealtimeSchema = z.enum(["gorilla-websocket", "centrifuge", "none"])`
- Generate WebSocket handler in `internal/ws/`

---

## Testing (new category)

- [x] Add `testify` ✅ — most popular Go testing toolkit.
- [x] Add `gomock` ✅ — official mock generation for interfaces.

### Implementation
- New schema: `GoTestingSchema = z.enum(["testify", "gomock", "none"])`
- Generate test scaffolding with chosen framework

---

## Priority Order

1. **stdlib `net/http` framework option** — only web-framework addition still called out here.
2. **Bun ORM/query builder** — decide if it is worth adding beside GORM, SQLC, and Ent.
3. **Search category** — Meilisearch/Bleve or a shared search projection for Go.
4. **Generated-project quality checks** — run `go test` / `go build` coverage for richer option combinations.
5. **Template depth pass** — make sure shipped categories include meaningful usage, not just deps.
