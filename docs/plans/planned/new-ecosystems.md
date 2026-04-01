# New Language Ecosystems

Candidates for entirely new language ecosystem support beyond TypeScript, Rust, Go, and Python.

---

## Elixir / Phoenix

Strong candidate. Elixir excels at realtime (LiveView), fault tolerance (BEAM VM), and concurrency.

### Why add
- Phoenix LiveView is unique — server-rendered reactive UI without JavaScript
- BEAM VM provides unmatched fault tolerance and hot code reloading
- Growing adoption for realtime apps (chat, collaboration, IoT)
- No competing scaffolding tool covers Elixir well
- Would be a unique differentiator vs better-t-stack

### Scope
- **Web Framework**: Phoenix (dominant, no real competitors)
- **Database**: Ecto (built-in ORM, tightly integrated)
- **Realtime**: Phoenix Channels, LiveView (built-in)
- **Task Queue**: Oban (de facto standard)
- **Auth**: phx_gen_auth (built-in generator), Ueberauth (OAuth)
- **Testing**: ExUnit (built-in)
- **API**: Absinthe (GraphQL), gRPC
- **CLI**: Mix tasks (built-in)

### Implementation
- New schema values in `EcosystemSchema`
- New prompt file: `apps/cli/src/prompts/elixir-ecosystem.ts`
- New template directory: `packages/template-generator/templates/elixir-base/`
- Phoenix project structure: `lib/`, `config/`, `priv/`, `test/`
- Mix project with umbrella app support

### Estimated effort
Large — Phoenix has its own project structure conventions and build system (Mix).

---

## C# / ASP.NET

Enterprise candidate. .NET is dominant in enterprise, finance, and gaming.

### Why add
- ASP.NET Core is one of the highest-performance web frameworks
- Massive enterprise adoption (banks, healthcare, government)
- .NET 8+ has excellent minimal API support
- Growing interest from TypeScript developers due to C# 12 improvements
- Strong tooling (dotnet CLI, NuGet, Entity Framework)

### Scope
- **Web Framework**: ASP.NET Core Minimal API, ASP.NET Core MVC
- **ORM**: Entity Framework Core (dominant), Dapper (micro-ORM)
- **Auth**: ASP.NET Identity, IdentityServer
- **API**: gRPC, GraphQL (HotChocolate)
- **Testing**: xUnit, NUnit
- **Realtime**: SignalR (built-in)
- **Task Queue**: Hangfire, Quartz.NET
- **Logging**: Serilog, NLog

### Implementation
- New schema values in `EcosystemSchema`
- New template directory: `packages/template-generator/templates/dotnet-base/`
- .csproj/sln project structure
- dotnet CLI integration

### Estimated effort
Large — .NET has its own project system (MSBuild, NuGet).

---

## Java / Spring Boot

Enterprise candidate. Still the most-used backend language globally.

### Why add
- Spring Boot is the #1 enterprise Java framework
- Massive existing developer base
- Strong microservices story (Spring Cloud)
- Kotlin support via same ecosystem

### Scope
- **Web Framework**: Spring Boot, Quarkus, Micronaut
- **ORM**: Spring Data JPA (Hibernate), jOOQ
- **Auth**: Spring Security
- **API**: GraphQL (Spring GraphQL), gRPC
- **Testing**: JUnit 5, Mockito
- **Task Queue**: Spring Batch
- **Observability**: Micrometer, Spring Actuator

### Estimated effort
Very large — Java/Maven/Gradle build systems are complex.

---

## Zig

Emerging candidate. Systems programming language growing fast.

### Why add
- Rapidly growing community (especially in game dev and systems programming)
- Interop with C libraries without overhead
- Growing web ecosystem (zap HTTP framework)
- Would be novel — no scaffolding tools exist for Zig web apps

### Scope
- Very early — web ecosystem is immature
- Better suited as a future watch item

### Estimated effort
Premature — wait for ecosystem maturity.

---

## Priority Order

1. **Elixir/Phoenix** — unique strengths (LiveView, BEAM), differentiator, manageable scope
2. **C#/ASP.NET** — enterprise demand, large developer base
3. **Java/Spring Boot** — largest developer base, complex but high impact
4. **Zig** — watch and wait for ecosystem maturity
