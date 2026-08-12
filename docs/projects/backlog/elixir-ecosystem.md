# Elixir / Phoenix Ecosystem Expansion

Strong differentiator — no competing scaffolding tool covers Elixir well. Phoenix LiveView is unique: server-rendered reactive UI without JavaScript. The BEAM VM provides unmatched fault tolerance and hot code reloading.

Current status: only deeper follow-ups remain here.

---

## Follow-Ups

- [ ] Deepen Phoenix/LiveView generated examples with richer resources, forms, streams, and auth flows.
- [ ] Add generated-project validation that runs `mix compile` / `mix test` smoke lanes over advanced combinations.
- [ ] Harden deploy templates with clustering/runtime config details across Fly, Docker, Gigalixir, and Mix releases.
- [ ] Verify gRPC/Broadway/Nx choices include practical generated usage, not just dependency wiring.

---

## Implementation Notes

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

1. **Deepen Phoenix/LiveView generated examples** — richer resources, forms, streams, and auth flows.
2. **Generated-project validation** — run `mix compile` / `mix test` smoke lanes over advanced combinations.
3. **Harden deploy templates** — clustering/runtime config details across Fly, Docker, Gigalixir, and Mix releases.
4. **Template depth pass** — verify gRPC/Broadway/Nx choices include practical generated usage, not just dependency wiring.
