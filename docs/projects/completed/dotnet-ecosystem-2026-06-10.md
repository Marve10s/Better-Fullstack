# C# / ASP.NET Ecosystem Expansion

**Status: ✅ Shipped 2026-06-10** — full foundation landed on `feat/stack-graph-phase0-batch0` (PR #220): schema, prompts, templates (net10.0), CLI flags, web builder (solo tab + multi-ecosystem backend), stack-graph parts, MCP, dep-freshness automation, smoke coverage, and docs.

Enterprise candidate. .NET is dominant in finance, healthcare, and government. ASP.NET Core is one of the highest-performance web frameworks (TechEmpower benchmarks). .NET 9+ has excellent minimal API support and growing interest from TypeScript developers.

---

## Web Frameworks

- [x] Add `aspnet-minimal` — ASP.NET Core Minimal APIs. Lightweight, lambda-style endpoints. Best for microservices and APIs.
- [x] Add `aspnet-mvc` — ASP.NET Core MVC. Controllers, views, model binding. Traditional enterprise pattern.
- [x] Add `aspnet-blazor` — Server-side or WASM interactive UI. C# instead of JavaScript for frontend. Unique like Phoenix LiveView.

---

## ORM / Data Access

- [x] Add `ef-core` (Entity Framework Core) — dominant .NET ORM. Code-first migrations, LINQ queries, change tracking. Supports SQL Server, PostgreSQL, MySQL, SQLite, Cosmos DB.
- [x] Add `dapper` — micro-ORM. Raw SQL with object mapping. High performance, no magic. Popular for read-heavy apps.
- [x] Add `linq2db` — lightweight LINQ provider. Direct SQL generation without heavy ORM overhead.

---

## Authentication

- [x] Add `aspnet-identity` — built-in auth system. User management, password hashing, 2FA, account confirmation. Integrates with EF Core.
- [x] Add `duende-identityserver` — OpenID Connect / OAuth2 server. SSO, API protection, federation. Enterprise standard.
- [x] Add `auth0-aspnet` — Auth0 SDK for ASP.NET. Managed auth with social login.

---

## API Styles

- [x] Add `graphql-hotchocolate` — most popular .NET GraphQL server. Code-first, schema-first, filtering, sorting, pagination.
- [x] Add `grpc-dotnet` — built-in gRPC support. Code-first or proto-first. Bidirectional streaming.
- [x] Add `minimal-api` — REST via ASP.NET Minimal APIs with OpenAPI/Swagger generation.

---

## Testing

- [x] Add `xunit` — most popular .NET test framework. Used by .NET team itself.
- [x] Add `nunit` — established alternative. Rich assertion library.
- [x] Add `moq` — mocking library. Interface-based mocking.
- [x] Add `testcontainers-dotnet` — Docker-based integration tests.

---

## Task Queues / Background Jobs

- [x] Add `hangfire` — background job processing. Dashboard UI, retry, scheduling. SQL Server or Redis storage.
- [x] Add `quartz-net` — enterprise job scheduler. Cron triggers, clustering, persistence.
- [x] Add `hosted-services` — built-in `IHostedService` / `BackgroundService` for simple background work.

---

## Realtime

- [x] Add `signalr` — built-in realtime framework. WebSocket, Server-Sent Events, Long Polling fallback. Hub pattern. Scales with Azure SignalR Service or Redis backplane.

---

## Observability

- [x] Add `opentelemetry-dotnet` — distributed tracing, metrics. Built-in support in .NET 8+.
- [x] Add `serilog` — structured logging. Sinks for Seq, Elasticsearch, Datadog, Application Insights, etc.
- [x] Add `nlog` — alternative structured logging. Flexible targets and layouts.
- [x] Add `health-checks` — built-in ASP.NET health check middleware. Custom checks for DB, Redis, external services.

---

## Caching

- [x] Add `redis` (via StackExchange.Redis) — distributed caching. Also supports `IDistributedCache` interface.
- [x] Add `memory-cache` — built-in `IMemoryCache`. In-process, no external dependency.

---

## Deployment

- [x] Add `docker` — multi-stage Dockerfile with `dotnet publish`.
- [x] Add `azure` — Azure App Service, Azure Container Apps. First-class .NET support.
- [x] Add `aws` — AWS Lambda (.NET), ECS, Elastic Beanstalk.

---

## Implementation Notes

- New schema value in `EcosystemSchema`: `"dotnet"` (or `"csharp"`)
- Template directory: `packages/template-generator/templates/dotnet-base/`
- Project structure: `.csproj` / `.sln` files, `Program.cs`, `appsettings.json`
- Build system: MSBuild via `dotnet` CLI
- Package manager: NuGet
- Target: .NET 9 LTS

### Challenges
- MSBuild/NuGet is a fundamentally different build system — `.csproj` XML, `nuget.config`, solution files
- .NET has its own project template system (`dotnet new`) which could be leveraged or conflicts with our approach
- Blazor WASM has unique build/deploy requirements (static files + .NET runtime in browser)
- Solution files (`.sln`) are .NET's monorepo equivalent

---

## Priority Order

1. **ASP.NET Minimal APIs** + EF Core + PostgreSQL — modern .NET default
2. **ASP.NET Identity** — auth
3. **xUnit** — testing
4. **Serilog** — logging
5. **SignalR** — realtime (unique built-in strength)
6. **Docker** — deployment
7. **Blazor** — C# frontend (unique differentiator)
8. Remaining categories
