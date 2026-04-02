# New Language Ecosystems

Candidates for entirely new language ecosystem support beyond TypeScript, Rust, Go, and Python. Each has a dedicated plan file with full category breakdowns.

---

## Detailed Plans

| File | Language | Effort | Priority |
|------|----------|--------|----------|
| [java-ecosystem.md](java-ecosystem.md) | Java (Spring Boot, Quarkus, Micronaut) | Large | 1 — highest community demand (GitHub #119) |
| [elixir-ecosystem.md](elixir-ecosystem.md) | Elixir (Phoenix, LiveView, Ecto) | Large | 2 — unique differentiator, no competing scaffolding tools |
| [dotnet-ecosystem.md](dotnet-ecosystem.md) | C# (ASP.NET Core, EF Core, SignalR) | Large | 3 — enterprise demand |

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

1. **Java** — largest developer base, highest community demand, enterprise play
2. **Elixir** — unique strengths (LiveView, BEAM), strong differentiator vs competitors
3. **C# / ASP.NET** — enterprise demand, high-performance
4. **Zig** — watch and wait
