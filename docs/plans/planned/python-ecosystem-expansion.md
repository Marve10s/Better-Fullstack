# Python Ecosystem Expansion

Current state: 5 web frameworks (fastapi, django, flask, litestar, starlette), 4 ORMs (sqlalchemy, sqlmodel, tortoise-orm, peewee), 1 validation option (pydantic), 10 AI libs, 3 auth options, 5 task queues, 2 GraphQL options, 3 quality options, plus testing, caching, realtime, observability, and CLI-tool categories.

Goal: bring Python to feature parity with TypeScript's depth across all backend categories.

---

## Web Frameworks

- [x] Add `flask` ✅ — 68k stars, #2 most-used Python web framework. Massive ecosystem, mature, well-documented. Essential given its popularity.
- [x] Add `litestar` ✅ — serious FastAPI competitor. 2x faster serialization (msgspec). Better route organization, built-in HTMX support. v3 supported until 2026.
- [x] Add `starlette` ✅ — ASGI toolkit that powers FastAPI. Useful standalone for minimal high-performance async apps.

### Files to touch
- `packages/types/src/schemas.ts` — add values to `PythonWebFrameworkSchema`
- `packages/types/src/option-metadata.ts` — add labels
- `apps/cli/src/prompts/python-ecosystem.ts` — add prompt options
- `apps/web/src/lib/constant.ts` — add builder entries
- `packages/template-generator/templates/python-base/src/app/main.py.hbs` — add framework-specific app initialization

---

## ORMs / Database

- [x] Add `tortoise-orm` ✅ — async-first ORM. Top write performance. Django-like API. Best for async apps with FastAPI/Litestar.
- [x] Add `peewee` ✅ — lightweight, simple ORM for rapid prototyping.

### Files to touch
- `packages/types/src/schemas.ts` — add to `PythonOrmSchema`
- `packages/template-generator/templates/python-base/src/app/database.py.hbs` — add ORM-specific setup
- `packages/template-generator/templates/python-base/src/app/models.py.hbs` — add model definitions per ORM

---

## Auth (new category)

- [x] Add `authlib` ✅ — most comprehensive Python auth library. OAuth1, OAuth2, OpenID Connect, JWS, JWK, JWT. Used by 26%+ of REST API projects.
- [x] Add `fastapi-users` ✅ — purpose-built auth for FastAPI.
- [x] Add `jwt` ✅ — JWT auth path for token-based Python apps.

### Implementation
- New schema: `PythonAuthSchema = z.enum(["authlib", "fastapi-users", "jwt", "none"])`
- New prompt in `apps/cli/src/prompts/python-ecosystem.ts`
- Generate auth module in `src/app/auth.py`
- Generate middleware/dependency injection for chosen framework

---

## AI / ML (expand existing)

- [x] Add `pydantic-ai` ✅ — type-safe AI agents from the Pydantic ecosystem.
- [x] Add `google-adk` ✅ — Google Agent Development Kit.
- [x] Add `smolagents` ✅ — HuggingFace's minimal agent library.

### Files to touch
- `packages/types/src/schemas.ts` — add to `PythonAiSchema`
- `packages/template-generator/templates/python-base/src/app/` — add client/schema files per new AI lib

---

## GraphQL (new category)

- [x] Add `strawberry` ✅ — default Python GraphQL library. Code-first, leverages type hints, async. Seamless FastAPI integration.
- [x] Add `ariadne` ✅ — schema-first GraphQL. Batteries included (query cost validation, tracing).

### Implementation
- New schema: `PythonGraphqlSchema = z.enum(["strawberry", "ariadne", "none"])`
- Generate GraphQL schema, resolvers, and integration with chosen web framework

---

## Task Queues (expand existing)

- [x] Add `dramatiq` ✅ — modern Celery alternative. 10x faster than Python-RQ. Simpler, more reliable.
- [x] Add `taskiq` ✅ — fully async task queue.
- [x] Add `huey` ✅ — lightweight task queue. Minimal dependencies.

### Files to touch
- `packages/types/src/schemas.ts` — add to `PythonTaskQueueSchema`
- `packages/template-generator/templates/python-base/src/app/` — add task queue setup per choice

---

## CLI Tools (new category)

- [x] Add `typer` ✅ — type-hint driven CLI argument parsing.
- [x] Add `click` ✅ — established composable CLI framework.
- [x] Add `rich` ✅ — terminal output, tables, progress, syntax highlighting.

### Implementation
- Current schema: `PythonCliSchema = z.enum(["typer", "click", "rich", "none"])`
- Generate CLI entry point with chosen framework

---

## Testing (new category)

- [x] Add `hypothesis` ✅ — property-based testing.
- [x] Add `pytest` configuration scaffolding ✅ — test setup and fixtures.

### Implementation
- Current schema: `PythonTestingSchema = z.enum(["pytest", "hypothesis", "none"])`
- Improve existing `tests/` scaffolding with proper fixtures

---

## Caching (new category)

- [x] Add `aiocache` ✅ — async cache manager.
- [x] Add `redis-py` ✅ — standard Redis client.

### Implementation
- New schema: `PythonCachingSchema = z.enum(["aiocache", "redis", "none"])`
- Generate cache module in `src/app/cache.py`

---

## Search (new category)

- [ ] Add `meilisearch-python` — official Meilisearch SDK. Fast, typo-tolerant.
- [ ] Add `elasticsearch-py` — official Elasticsearch client. Full-text search at scale.

### Implementation
- New schema: `PythonSearchSchema = z.enum(["meilisearch", "elasticsearch", "none"])`
- Generate search client in `src/app/search.py`

---

## Observability (new category)

- [x] Add `opentelemetry-python` ✅ — official OpenTelemetry SDK.

### Implementation
- New schema: `PythonObservabilitySchema = z.enum(["opentelemetry", "none"])`
- Generate OTel setup with auto-instrumentation

---

## Realtime (new category)

- [x] Add `python-socketio` ✅ — Socket.IO server/client.
- [x] Add `websockets` ✅ — production-ready async WebSocket library.

### Implementation
- Current schema: `PythonRealtimeSchema = z.enum(["python-socketio", "websockets", "none"])`
- Generate WebSocket handler integration with chosen framework

---

## Priority Order

1. **Search category** — Meilisearch/Elasticsearch remain the obvious Python-specific service gap.
2. **Generated-project checks** — exercise `uv sync`, compile/test, and framework-specific route checks for richer combos.
3. **Template depth pass** — verify each shipped AI/auth/task/cache/realtime option has meaningful generated usage.
4. **Provider setup docs** — Python-specific env/provider instructions for Redis, OTel, auth, and AI SDKs.
