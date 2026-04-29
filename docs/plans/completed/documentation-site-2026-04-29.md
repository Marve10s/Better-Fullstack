# User-Facing Documentation Site

Status: completed in `v1.6.2`.

The first public documentation surface now lives in `apps/web/content/docs` and is served by the web app under `/docs`. The release moved the project away from README-only onboarding and into a structured docs experience backed by the same option metadata used by the builder and generator.

---

## Shipped Scope

### Getting Started

- [x] Installation guide
- [x] First project guide
- [x] Quick start style docs entry point
- [x] Package-manager tabs for install/create commands

### CLI Docs

- [x] `create` command page
- [x] `add` command page
- [x] Non-interactive command examples
- [x] Package-manager-specific command rendering

### Ecosystem Docs

- [x] Ecosystem overview index
- [x] TypeScript guide
- [x] Python guide
- [x] Rust guide
- [x] Go guide
- [x] Java guide

### Option Reference

- [x] Option reference index
- [x] TypeScript options
- [x] Python options
- [x] Rust options
- [x] Go options
- [x] Java options
- [x] Dynamic option/category count components

### AI / MCP

- [x] AI overview page
- [x] MCP page
- [x] `llms.txt` update

### Docs Runtime / UI

- [x] Docs routes under `apps/web/src/routes/docs`
- [x] Docs source registry under `apps/web/src/lib/docs`
- [x] Sidebar
- [x] Table of contents
- [x] Search dialog
- [x] Page actions
- [x] MDX callouts
- [x] Code blocks
- [x] Package-manager tabs
- [x] Theme flash fix
- [x] Docs content glob fix
- [x] Serializable TanStack Start loader data

---

## Validation

- `bun run test:release`
- `bun run --cwd apps/web validate:tech-links`
- Release workflow for `v1.6.2`

---

## Follow-Up Backlog

The remaining docs work is tracked in `docs/plans/planned/documentation-follow-ups.md`:

- Public roadmap page
- Interactive compatibility matrix
- Auto-generated full CLI reference
- Deeper deployment guides
- Deeper framework/provider comparison guides
