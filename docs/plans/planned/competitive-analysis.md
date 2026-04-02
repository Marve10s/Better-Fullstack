# Competitive Analysis — better-t-stack

Analysis of create-better-t-stack (5.2k stars, v3.27.0) as of April 2026.

---

## What They Have That We Don't

### High Priority Gaps (competitive differentiators)

| Feature | Their Implementation | Impact | Status |
|---------|---------------------|--------|--------|
| **MCP Server** | CLI runs as MCP server. AI agents scaffold projects programmatically. | High | ✅ Done |
| **`add` command** | Add addons/deployment to existing projects post-scaffold | High | ✅ Done |
| **Skills addon** | Installs curated AI coding agent skills from 19+ sources into 25+ agents | Medium | ✅ Done |
| **MCP addon** | Auto-configures MCP servers for 18+ tools into various AI agents | Medium | ✅ Done |
| **`history` command** | View/reproduce past scaffolds | Low | ✅ Done |
| **Tauri** | Desktop app addon. Supports all web frontends as shell (v3.24) | Medium | Planned |
| **Electrobun** | Alternative desktop framework. All web frontends supported | Low | Planned |
| **PWA** | Progressive Web App addon | Medium | Planned |
| **WXT** | Browser extension scaffolding (vanilla/vue/react/solid/svelte) | Low-Medium | Planned |
| **OpenTUI** | Terminal UI addon with core/react/solid templates | Low | Planned |
| **Nx** | Alternative monorepo tool to Turborepo (v3.23) | Medium | Planned |
| **Fumadocs** | Docs framework with 7 template variants | Low-Medium | Planned |
| **Starlight** | Astro-based docs site | Low-Medium | Planned |

### Database Provisioning (they have more providers)

| Provider | Status |
|----------|--------|
| PlanetScale | They have, we don't |
| MongoDB Atlas | They have, we don't |
| Prisma Postgres | They have, we don't |
| Cloudflare D1 | They have, we don't |

### Other

| Feature | Note |
|---------|------|
| Cloudflare Workers runtime | First-class runtime option (not just deploy target) |
| Lefthook | Git hooks addon (we have it too) |
| Ultracite | Opinionated linting with deep agent integrations |
| Project config file | `.better-t-stack.json` — we have `bts.jsonc` ✅ |

---

## What We Have That They Don't

### Major Advantages

| Feature | Our Advantage |
|---------|--------------|
| **Multi-ecosystem** | Rust, Go, Python — they are TypeScript-only |
| **Enterprise backends** | NestJS, AdonisJS — they only have lightweight frameworks |
| **More ORMs** | TypeORM, Sequelize, MikroORM, Kysely — they only have Drizzle, Prisma, Mongoose |
| **More frontends** | Angular, Qwik, Redwood, Fresh, Solid Start — broader framework coverage |
| **Multiple deploy targets** | Vercel, Railway, Fly.io, Docker, SST — they only have Cloudflare |
| **CMS integrations** | Payload, Sanity, Strapi, TinaCMS — they have none |
| **Caching** | Upstash Redis — they have none |
| **Search** | Meilisearch, Typesense — they have none |
| **File Storage** | S3, R2 — they have none |
| **File Upload** | Uploadthing, Filepond, Uppy — they have none |
| **Email** | 8 providers — they have none |
| **Realtime** | Socket.IO, PartyKit, Ably, Pusher, Liveblocks, Yjs — they have none |
| **Job Queues** | BullMQ, Trigger.dev, Inngest, Temporal — they have none |
| **Animation** | Framer Motion, GSAP, etc. — they have none |
| **Forms** | TanStack Form, React Hook Form, etc. — they have none |
| **State Management** | Zustand, Jotai, etc. — they have none |
| **Logging** | Pino, Winston — they have none |
| **Observability** | OpenTelemetry, Sentry, Grafana — they have none |
| **Validation** | 7 options — they have none (beyond Zod in templates) |
| **Effect** | Effect-ts integration — they have none |
| **UI library choice** | 12 options — they use shadcn implicitly |
| **CSS framework choice** | Tailwind, SCSS, Less, PostCSS — they are Tailwind-only |

---

## Strategic Takeaways

1. ~~**Close the AI/agent gap**~~ ✅ Done — MCP server, skills addon, MCP addon all shipped.
2. ~~**Ship `add` command**~~ ✅ Done — iterative post-scaffold additions implemented.
3. **Desktop/extensions are niche** — Tauri/WXT/PWA are nice-to-have, next priority tier.
4. **Our breadth is our moat** — multi-ecosystem, more integrations, more deploy targets. Keep expanding this.
5. **Their release cadence is aggressive** — 20+ releases in 3 months. We should match or exceed this for feature velocity.
