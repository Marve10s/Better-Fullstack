# New Language Ecosystems

Candidates for entirely new language ecosystem support beyond TypeScript, React Native, Rust, Go, Python, Java, and Elixir. Java and Elixir have shipped as first-class ecosystems; this file now tracks the remaining new ecosystems and links follow-up work separately.

---

## Detailed Plans

| File | Language | Effort | Priority |
|------|----------|--------|----------|
| [../completed/java-ecosystem-foundation-2026-04-29.md](../completed/java-ecosystem-foundation-2026-04-29.md) | Java foundation | Done | Shipped in v1.6.2 |
| [java-ecosystem-follow-ups.md](java-ecosystem-follow-ups.md) | Java expansion | Medium/Large | Follow-up — Micronaut, jOOQ, Keycloak, messaging, observability |
| [elixir-ecosystem.md](elixir-ecosystem.md) | Elixir foundation and follow-ups | Done/Large | Foundation shipped; follow-ups remain for deeper Phoenix/LiveView coverage |
| [dotnet-ecosystem.md](dotnet-ecosystem.md) | C# (ASP.NET Core, EF Core, SignalR) | Large | 1 — enterprise demand |

---

## Watch List (not ready for implementation)

### Zig

- Rapidly growing community (game dev, systems programming)
- Interop with C libraries without overhead
- Growing web ecosystem (zap HTTP framework)
- **Status:** Premature — wait for web ecosystem maturity before investing

### Kotlin

- Shares Java ecosystem (Spring Boot, Ktor)
- Could be a variant of the Java ecosystem rather than standalone
- **Status:** Consider as Java ecosystem extension rather than separate ecosystem

---

## Priority Order

1. **C# / ASP.NET** — enterprise demand, high-performance
2. **Zig** — watch and wait
3. **Kotlin** — consider as a Java ecosystem extension rather than a separate ecosystem
