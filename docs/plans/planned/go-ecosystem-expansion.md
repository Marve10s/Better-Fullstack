# Go Ecosystem Expansion

Current state: 2 web frameworks (gin, echo), 2 ORMs (gorm, sqlc), 1 API layer (grpc-go), 2 CLI tools (cobra, bubbletea), 1 logging (zap).

Goal: bring Go to feature parity with TypeScript's depth across all backend categories.

---

## Web Frameworks

- [ ] Add `fiber` — 38k+ stars, Express.js-like API, built on FastHTTP. Attracts Node.js developers migrating to Go. 11% adoption among Go devs.
- [ ] Add `chi` — 18k+ stars, lightweight, zero-dependency, built on net/http stdlib. Popular for microservices. Fully standard-library compatible.
- [ ] Add `stdlib` (net/http) — Go 1.22+ pattern routing makes the standard library viable without any framework. Offer as a "no framework" option.

### Files to touch
- `packages/types/src/schemas.ts` — add values to `GoWebFrameworkSchema`
- `packages/types/src/option-metadata.ts` — add labels
- `apps/cli/src/prompts/go-ecosystem.ts` — add prompt options
- `apps/web/src/lib/constant.ts` — add builder entries
- `packages/template-generator/templates/go-base/cmd/server/` — add framework-specific main.go and handler patterns

---

## ORMs / Database

- [ ] Add `ent` — 15k+ stars, code-first ORM by Meta. Compile-time safety, graph traversal API, explicit schema definitions. Best for complex data models.
- [ ] Add `bun` — lightweight, PostgreSQL-focused ORM with SQL-shaped query builder. Less overhead than GORM.

### Files to touch
- `packages/types/src/schemas.ts` — add to `GoOrmSchema`
- `packages/template-generator/templates/go-base/internal/database/` — add Ent schema definitions and Bun setup

---

## Auth (new category)

- [ ] Add `casbin` — 17k+ stars. Authorization standard for Go. Supports ACL, RBAC, ABAC models. Dozens of storage adapters.
- [ ] Add `golang-jwt` (v5) — standard JWT library for Go. Token-based auth essential.
- [ ] Add `goth` — OAuth social login. 30+ providers (Google, GitHub, etc.). Clean Go API.

### Implementation
- New schema: `GoAuthSchema = z.enum(["casbin", "jwt", "goth", "none"])`
- New prompt in `apps/cli/src/prompts/go-ecosystem.ts`
- Generate auth middleware in `internal/auth/`
- Generate JWT token helpers and OAuth callback handlers

---

## GraphQL (new category)

- [ ] Add `gqlgen` — dominant Go GraphQL library. Schema-first with code generation. Full type safety. Production-proven.

### Implementation
- Add to `GoApiSchema` — extend with `gqlgen` alongside `grpc-go`
- Generate `graph/` directory with schema, resolvers, and generated code
- Add `gqlgen.yml` configuration

---

## Logging

- [ ] Add `zerolog` — zero-allocation JSON logger. Fastest in many benchmarks. JSON-first approach.
- [ ] Add `slog` — Go 1.21+ stdlib structured logging. Future-proof, no external dependencies.

### Files to touch
- `packages/types/src/schemas.ts` — add to `GoLoggingSchema`
- `packages/template-generator/templates/go-base/` — add logger initialization per choice

---

## Config Management (new category)

- [ ] Add `viper` — 27k+ stars, de facto Go config standard. JSON, TOML, YAML, HCL, envfile. Live reloading.
- [ ] Add `koanf` — lightweight Viper alternative. Better abstractions, fewer dependencies.

### Implementation
- New schema: `GoConfigSchema = z.enum(["viper", "koanf", "none"])`
- Generate config loading module in `internal/config/`

---

## Message Queues (new category)

- [ ] Add `nats` — most idiomatic Go messaging system. Lightweight, fast. JetStream for persistence.
- [ ] Add `watermill` — event-driven framework. Supports Kafka, RabbitMQ, HTTP. Excellent for event-driven architectures.

### Implementation
- New schema: `GoMessageQueueSchema = z.enum(["nats", "watermill", "none"])`
- Generate publisher/subscriber scaffolding in `internal/messaging/`

---

## Caching (new category)

- [ ] Add `go-redis` — standard Redis client for Go. With `go-redis/cache` for high-level caching with TinyLFU.
- [ ] Add `groupcache` — Google's in-process distributed cache. No external dependencies.

### Implementation
- New schema: `GoCachingSchema = z.enum(["redis", "groupcache", "none"])`
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

- [ ] Add `opentelemetry-go` — official OpenTelemetry SDK. Traces, metrics, logs. Industry standard.

### Implementation
- New schema: `GoObservabilitySchema = z.enum(["opentelemetry", "none"])`
- Generate OTel setup with framework middleware integration

---

## WebSocket / Realtime (new category)

- [ ] Add `gorilla/websocket` — industry standard WebSocket library for Go.
- [ ] Add `centrifuge` — scalable real-time messaging library. Chat, live updates, notifications.

### Implementation
- New schema: `GoRealtimeSchema = z.enum(["gorilla-websocket", "centrifuge", "none"])`
- Generate WebSocket handler in `internal/ws/`

---

## Testing (new category)

- [ ] Add `testify` — 23k+ stars. Most popular Go testing toolkit. Assertions, mocking, suites.
- [ ] Add `gomock` — official mock generation for interfaces.

### Implementation
- New schema: `GoTestingSchema = z.enum(["testify", "gomock", "none"])`
- Generate test scaffolding with chosen framework

---

## Priority Order

1. **fiber** + **chi** — framework diversity is the top request
2. **zerolog** + **slog** — complete the logging story
3. **gqlgen** — GraphQL is a major gap
4. **viper** — config management is essential
5. **casbin** + **golang-jwt** — auth
6. **ent** — enterprise ORM alternative
7. **testify** — testing standard
8. **opentelemetry-go** — observability
9. **nats** — messaging
10. Remaining categories
