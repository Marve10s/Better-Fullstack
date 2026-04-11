# Python Ecosystem Expansion

Current state: 2 web frameworks (fastapi, django), 2 ORMs (sqlalchemy, sqlmodel), 1 validation (pydantic), 6 AI libs (langchain, llamaindex, openai-sdk, anthropic-sdk, langgraph, crewai), 1 task queue (celery), 1 quality tool (ruff).

Goal: bring Python to feature parity with TypeScript's depth across all backend categories.

---

## Web Frameworks

- [x] Add `flask` ✅ — 68k stars, #2 most-used Python web framework. Massive ecosystem, mature, well-documented. Essential given its popularity.
- [x] Add `litestar` ✅ — serious FastAPI competitor. 2x faster serialization (msgspec). Better route organization, built-in HTMX support. v3 supported until 2026.
- [ ] Add `starlette` — ASGI toolkit that powers FastAPI. Useful standalone for minimal high-performance async apps. Good "no-framework" option.

### Files to touch
- `packages/types/src/schemas.ts` — add values to `PythonWebFrameworkSchema`
- `packages/types/src/option-metadata.ts` — add labels
- `apps/cli/src/prompts/python-ecosystem.ts` — add prompt options
- `apps/web/src/lib/constant.ts` — add builder entries
- `packages/template-generator/templates/python-base/src/app/main.py.hbs` — add framework-specific app initialization

---

## ORMs / Database

- [ ] Add `tortoise-orm` — async-first ORM. Top write performance. Django-like API. Best for async apps with FastAPI/Litestar.
- [ ] Add `peewee` — 11k stars. Lightweight, simple. SQLite, MySQL, PostgreSQL, CockroachDB. Perfect for rapid prototyping.

### Files to touch
- `packages/types/src/schemas.ts` — add to `PythonOrmSchema`
- `packages/template-generator/templates/python-base/src/app/database.py.hbs` — add ORM-specific setup
- `packages/template-generator/templates/python-base/src/app/models.py.hbs` — add model definitions per ORM

---

## Auth (new category)

- [x] Add `authlib` ✅ — most comprehensive Python auth library. OAuth1, OAuth2, OpenID Connect, JWS, JWK, JWT. Used by 26%+ of REST API projects.
- [ ] Add `fastapi-users` — purpose-built auth for FastAPI. JWT, cookies, OAuth2, email verification. Async, multiple DB backends.
- [ ] Add `python-jose` — JWT library supporting multiple key types (HS256, RS256, ES256, EdDSA).

### Implementation
- New schema: `PythonAuthSchema = z.enum(["authlib", "fastapi-users", "jwt", "none"])`
- New prompt in `apps/cli/src/prompts/python-ecosystem.ts`
- Generate auth module in `src/app/auth.py`
- Generate middleware/dependency injection for chosen framework

---

## AI / ML (expand existing)

- [ ] Add `pydantic-ai` — built by Pydantic team. Type-safe AI agents. "FastAPI developer experience" for AI. Best type safety in Python AI.
- [ ] Add `google-adk` — Google Agent Development Kit. Code-first, multi-agent systems. Optimized for Gemini but model-agnostic.
- [ ] Add `smolagents` — HuggingFace's minimal agent library. ~1000 lines. Simple, hackable.

### Files to touch
- `packages/types/src/schemas.ts` — add to `PythonAiSchema`
- `packages/template-generator/templates/python-base/src/app/` — add client/schema files per new AI lib

---

## GraphQL (new category)

- [x] Add `strawberry` ✅ — default Python GraphQL library. Code-first, leverages type hints, async. Seamless FastAPI integration.
- [ ] Add `ariadne` — schema-first GraphQL. Batteries included (query cost validation, tracing).

### Implementation
- New schema: `PythonGraphqlSchema = z.enum(["strawberry", "ariadne", "none"])`
- Generate GraphQL schema, resolvers, and integration with chosen web framework

---

## Task Queues (expand existing)

- [ ] Add `dramatiq` — modern Celery alternative. 10x faster than Python-RQ. Simpler, more reliable.
- [ ] Add `taskiq` — fully async task queue. Integrates with FastAPI and aiohttp.
- [ ] Add `huey` — lightweight task queue. Minimal dependencies.

### Files to touch
- `packages/types/src/schemas.ts` — add to `PythonTaskQueueSchema`
- `packages/template-generator/templates/python-base/src/app/` — add task queue setup per choice

---

## CLI Tools (new category)

- [ ] Add `typer` — built by FastAPI's creator. Uses type hints for CLI argument parsing. Modern default for Python CLIs.
- [ ] Add `click` — 15k+ stars. Established CLI framework. Composable. Typer is built on top of it.
- [ ] Add `rich` — 50k+ stars. Beautiful terminal output — tables, progress bars, syntax highlighting.

### Implementation
- New schema: `PythonCliSchema = z.enum(["typer", "click", "none"])`
- New multi-select: `PythonCliLibrariesSchema` for Rich
- Generate CLI entry point with chosen framework

---

## Testing (new category)

- [ ] Add `hypothesis` — property-based testing. Generates random inputs to find edge cases. Pairs with pytest.
- [ ] Add `pytest` configuration scaffolding — conftest.py, fixtures, markers.

### Implementation
- New schema: `PythonTestingSchema = z.enum(["pytest", "pytest-hypothesis", "none"])`
- Improve existing `tests/` scaffolding with proper fixtures

---

## Caching (new category)

- [ ] Add `aiocache` — async cache manager. Redis, memcached, in-memory backends. Designed for FastAPI/Starlette.
- [ ] Add `redis-py` — standard Redis client. Sync and async support.

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

- [ ] Add `opentelemetry-python` — official OpenTelemetry SDK. Auto-instrumentation for Flask, FastAPI, Redis.

### Implementation
- New schema: `PythonObservabilitySchema = z.enum(["opentelemetry", "none"])`
- Generate OTel setup with auto-instrumentation

---

## Realtime (new category)

- [ ] Add `python-socketio` — Socket.IO server/client. Works with FastAPI, Flask, Django.
- [ ] Add `websockets` — production-ready async WebSocket library.

### Implementation
- New schema: `PythonRealtimeSchema = z.enum(["socketio", "websockets", "none"])`
- Generate WebSocket handler integration with chosen framework

---

## Priority Order

1. **flask** + **litestar** — framework diversity is the top gap
2. **authlib** + **fastapi-users** — auth is essential for real apps
3. **strawberry** — GraphQL is a major gap
4. **pydantic-ai** — AI is Python's strength, keep leading
5. **dramatiq** + **taskiq** — modern task queue alternatives
6. **typer** + **rich** — CLI tooling
7. **tortoise-orm** — async ORM alternative
8. **opentelemetry-python** — observability
9. **hypothesis** — advanced testing
10. Remaining categories
