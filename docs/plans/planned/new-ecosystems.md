# New Language Ecosystems

> **Watch list refreshed 2026-08-07.** Kotlin/Ktor and Kotlin Compose have shipped as JVM/composed
> app surfaces; they are not a separate solo wizard ecosystem. This file tracks only genuinely new
> solo-ecosystem decisions.

Candidates for entirely new language ecosystem support beyond TypeScript, React Native, Rust, Go,
Python, Java, Elixir, and .NET.

---

## Detailed Plans

| File                                                         | Language          | Effort       | Priority                                                    |
| ------------------------------------------------------------ | ----------------- | ------------ | ----------------------------------------------------------- |
| [java-ecosystem-follow-ups.md](java-ecosystem-follow-ups.md) | Java expansion    | Medium/Large | Follow-up — gRPC, Actuator examples, and runtime validation |
| [elixir-ecosystem.md](elixir-ecosystem.md)                   | Elixir follow-ups | Large        | Deeper Phoenix/LiveView coverage                            |

---

## Watch List (not ready for implementation)

### Zig

- Rapidly growing community (game dev, systems programming)
- Interop with C libraries without overhead
- Growing web ecosystem (zap HTTP framework)
- **Status:** Premature — wait for web ecosystem maturity before investing

### Kotlin

- Shares Java ecosystem (Spring Boot, Ktor)
- Available as a JVM language and through Ktor plus Compose app parts
- **Status:** Shipped as an extension; no separate solo ecosystem planned

---

## Priority Order

1. **Zig** — watch and wait
