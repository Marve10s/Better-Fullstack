# User-Facing Documentation Site

No public documentation site exists yet. Users rely on CLI `--help`, the web builder, and GitHub README. A docs site would improve onboarding, reduce support questions, and enable community contributions. GitHub #119 also had users asking for a public roadmap.

---

## Core Docs Structure

### Getting Started

- [ ] Quick start guide (scaffold first project in under 2 minutes)
- [ ] Installation options: `bun create better-fullstack@latest`, `npx`, `pnpm create`
- [ ] Interactive vs non-interactive mode walkthrough
- [ ] First project tutorial: pick a stack, scaffold, run dev server, deploy

### Stack Guides

- [ ] Per-ecosystem overview (TypeScript, Rust, Go, Python)
- [ ] Frontend framework guides (Next.js, TanStack, Svelte, Solid, Nuxt, Angular, etc.)
- [ ] Backend framework guides (Hono, Express, Fastify, Elysia, NestJS, AdonisJS, etc.)
- [ ] Database + ORM pairing guide (which ORM works best with which DB)
- [ ] Auth provider comparison (better-auth vs Clerk vs Auth0 vs Stack-auth vs Supabase-auth)

### Compatibility Reference

- [ ] Interactive compatibility matrix — which options work together
- [ ] Known limitations and workarounds
- [ ] Auto-generated from `compatibility-rules.ts` so it stays in sync

### CLI Reference

- [ ] All commands: `create`, `add`, `history`, `mcp`, `builder`
- [ ] All flags with descriptions and defaults
- [ ] Auto-generated from CLI schema/commander definitions
- [ ] Non-interactive mode flag requirements per ecosystem

### MCP / AI Agent Integration

- [ ] How to connect Better-Fullstack MCP to Claude Code, Cursor, VS Code, and other agents.
- [ ] MCP tools reference (bfs_plan_project, bfs_create_project, etc.)
- [ ] Skills addon: what gets installed, how to customize
- [ ] MCP addon: which servers get configured per stack

### Deployment Guides

- [ ] Per-target deployment walkthrough (Cloudflare, Fly, Railway, Docker, SST)
- [ ] Environment variable setup per provider
- [ ] Database provisioning guides (Turso, Neon, Supabase, PlanetScale, etc.)

---

## Public Roadmap

Requested by community in GitHub #119.

- [ ] Public roadmap page on docs site
  - Pulls from `docs/plans/planned/` files or a curated subset
  - Shows what's done, in progress, and planned
  - Enables community voting or discussion on priorities
  - Could be a simple page linking to GitHub milestones/projects

---

## Implementation Options

### Option A: Fumadocs (recommended)

Already an addon in our schema. Dogfood our own scaffolding.
- MDX-based, Next.js powered
- Full-text search built-in
- Auto-generated API docs from TypeScript
- Could live in `apps/docs/` in the monorepo

### Option B: Starlight

Also an addon. Astro-based, simpler.
- Markdown-only, fast builds
- Built-in search, i18n
- Good for pure documentation (no interactive components)

### Option C: VitePress

Popular in the Vue/Vite ecosystem.
- Markdown + Vue components
- Fast, lightweight
- Used by many OSS projects (Vite, Vitest, Pinia)

---

## Auto-Generation Targets

Keep docs in sync with code by generating from source:

| Doc Section | Source |
|------------|--------|
| CLI flags reference | `apps/cli/src/index.ts` commander definitions |
| Stack options | `packages/types/src/schemas.ts` enum values |
| Compatibility matrix | `apps/cli/src/utils/compatibility-rules.ts` |
| MCP tools reference | `apps/cli/src/mcp.ts` tool definitions |
| Changelog | Git tags + `CHANGELOG.md` |

---

## Priority Order

1. **Getting started guide** — reduces first-use friction
2. **CLI reference** — most asked-about, auto-generable
3. **Compatibility matrix** — saves users from trial-and-error
4. **Stack guides** — helps users make informed choices
5. **Public roadmap** — community engagement
6. **Deployment guides** — post-scaffold help
7. **MCP docs** — AI agent users
