# Elixir / Phoenix Ecosystem Expansion

Phoenix LiveView provides server-rendered reactive UI without requiring a client JavaScript
framework. The generated projects follow Mix, OTP, and Phoenix conventions instead of translating
the TypeScript project layout.

Current status: only deeper follow-ups remain here.

## Follow-Ups

- [ ] Deepen Phoenix/LiveView generated examples with richer resources, forms, streams, and auth flows.
- [ ] Add generated-project validation that runs `mix compile` / `mix test` smoke lanes over advanced combinations.
- [ ] Harden deploy templates with clustering/runtime config details across Fly, Docker, Gigalixir, and Mix releases.
- [ ] Verify gRPC/Broadway/Nx choices include practical generated usage, not just dependency wiring.

## Evidence routing

The local database claim is now `runtime-verified` for the golden Phoenix recipe. The recipe runs
`mix ecto.create`, `mix ecto.migrate`, starts Phoenix, and calls `/api/health` against Ecto SQLite.

The remaining LiveView example work fails at `runtime-verified`. Its closing recipe must start the
generated application and drive the generated form, stream update, and auth transition through a
browser.

Advanced combinations fail at `build-verified`. Their closing matrix must name the exact option
sets and require `mix compile` plus `mix test` without skipped dependencies.

Deploy depth fails at `generated`. Its closing recipes must inspect a built release for each
retained target and start at least one clustered two-node configuration.

The gRPC, Broadway, and Nx depth claim fails at `runtime-verified`. Each retained option needs a
small generated behavior and a live assertion that would fail if only the dependency remained.

---

## Implementation Notes

- Mix project with umbrella app support (monorepo equivalent)
- Build system: Mix (built-in, no choice needed)
- Package manager: Hex
- Elixir 1.17+ / OTP 27+ as default

### Challenges

- Phoenix has its own project structure conventions.
- Mix requires a separate generation and verification path.
- LiveView needs browser assertions that do not apply to the other ecosystems.
- BEAM releases need runtime configuration and clustering checks.
- Umbrella apps use a different ownership model than Turborepo or Nx workspaces.

---

## Priority Order

1. Deepen Phoenix and LiveView resources, forms, streams, and auth flows.
2. Run `mix compile` and `mix test` over named advanced combinations.
3. Verify clustering and runtime configuration across retained deploy targets.
4. Give gRPC, Broadway, and Nx generated behavior beyond dependency wiring.
