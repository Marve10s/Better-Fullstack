<!--
```text
██████╗ ███████╗████████╗████████╗███████╗██████╗
██╔══██╗██╔════╝╚══██╔══╝╚══██╔══╝██╔════╝██╔══██╗
██████╔╝█████╗     ██║      ██║   █████╗  ██████╔╝
██╔══██╗██╔══╝     ██║      ██║   ██╔══╝  ██╔══██╗
██████╔╝███████╗   ██║      ██║   ███████╗██║  ██║
╚═════╝ ╚══════╝   ╚═╝      ╚═╝   ╚══════╝╚═╝  ╚═╝

███████╗██╗   ██╗██╗     ██╗     ███████╗████████╗ █████╗  ██████╗██╗  ██╗
██╔════╝██║   ██║██║     ██║     ██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝
█████╗  ██║   ██║██║     ██║     ███████╗   ██║   ███████║██║     █████╔╝
██╔══╝  ██║   ██║██║     ██║     ╚════██║   ██║   ██╔══██║██║     ██╔═██╗
██║     ╚██████╔╝███████╗███████╗███████║   ██║   ██║  ██║╚██████╗██║  ██╗
╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝
```
-->

<div align="center">

<img src="https://raw.githubusercontent.com/Marve10s/Better-Fullstack/main/apps/web/public/og/better-fullstack-terminal-preview-1200x630.png" alt="Better Fullstack terminal-style preview showing CLI scaffolding output" width="100%" />

<br>

**Scaffold production-ready fullstack apps in TypeScript, React Native, Rust, Go, Python, Java, .NET, and Elixir — pick your stack, the CLI wires it together.**

<br>

[![Version](https://img.shields.io/npm/v/create-better-fullstack?style=for-the-badge&colorA=18181B&colorB=28CF8D)](https://www.npmjs.com/package/create-better-fullstack)
&nbsp;
[![Downloads](https://img.shields.io/npm/dm/create-better-fullstack?style=for-the-badge&colorA=18181B&colorB=28CF8D)](https://www.npmjs.com/package/create-better-fullstack)
&nbsp;
[![License](https://img.shields.io/github/license/Marve10s/Better-Fullstack?style=for-the-badge&colorA=18181B&colorB=28CF8D)](LICENSE)

</div>

<br>

## Why Better Fullstack?

Most scaffolding tools lock you into one framework and one opinion. Better Fullstack doesn't.

- **Broad stack catalog** — frontend, backend, database, ORM, auth, API layer, payments, AI, DevOps, and more
- **Multi-ecosystem projects** — compose web, mobile, and backend stacks across TypeScript, React Native, Rust, Go, Python, Java, .NET, and Elixir
- **Visual builder** — configure your stack in the browser, get a ready-to-run CLI command
- **Lifecycle-aware** — create, add, update, check, and generate from the recorded `bts.jsonc` project model
- **Compatibility-checked** — the planner rejects or adjusts invalid selections before files are generated

<details>
<summary><strong>What's in the catalog?</strong></summary>
<br>

| Category         | Examples                                                                                                     |
| ---------------- | ------------------------------------------------------------------------------------------------------------ |
| Web frontends    | Next.js, Nuxt, SvelteKit, SolidStart, Angular, Qwik, Astro, TanStack Start, TanStack Router, React Router    |
| Backends         | Hono, Elysia, Fastify, Express, NestJS, AdonisJS, Axum, Rocket, FastAPI, Flask, Litestar, Spring Boot        |
| Mobile           | Expo / React Native with navigation, UI, storage, push, OTA options                                          |
| Databases & ORMs | PostgreSQL, MySQL, SQLite, MongoDB — Drizzle, Prisma, MikroORM, TypeORM, Sequelize, SQLx, Diesel             |
| API layer        | tRPC, oRPC, ts-rest, OpenAPI, GraphQL                                                                        |
| Auth & payments  | Better-Auth, Clerk, Auth.js, Auth0, Supabase Auth, WorkOS — Stripe, Paddle, LemonSqueezy, RevenueCat         |
| Extras           | AI SDKs, job queues, realtime, caching, search, file storage, i18n, feature flags, vector DBs, observability |

Explore every option in the **[App Builder →](https://better-fullstack.dev/new)**

</details>

<br>

## ⚡ Quick Start

<table>
<tr>
<td width="50%">

### 🌐 Web Builder (Recommended)

Configure your stack visually — pick every option from a UI, preview your choices, and get a ready-to-run command.

### **[Open the App Builder →](https://better-fullstack.dev/new)**

</td>
<td width="50%">

### 💻 CLI

```bash
npm create better-fullstack@latest
```

```bash
bun create better-fullstack@latest
```

```bash
pnpm create better-fullstack@latest
```

```bash
npx create-better-fullstack@latest
```

```bash
yarn create better-fullstack@latest
```

</td>
</tr>
</table>

<details>
<summary><strong>CLI Flags</strong></summary>
<br>

```bash
--yes              # Accept all defaults
--yolo             # Scaffold a random stack — good for exploring
--template <name>  # Use a preset (t3, mern, pern, uniwind)
--ecosystem <lang> # Choose the primary project ecosystem
--part <binding>   # Add a multi-ecosystem stack part, e.g. frontend:typescript:next
--workspace-shape # Choose monorepo or a qualifying flat single-app layout
--version-channel  # Dependency channel: stable, latest, beta
--no-git           # Skip git initialization
--no-install       # Skip dependency installation
--verify           # Run generated project checks without starting dev servers
--verbose          # Show detailed output
```

</details>

<br>

## 🔁 Project Lifecycle

Better Fullstack keeps the selected stack in `bts.jsonc` and the generated baseline in
`bts.lock.json`. Use `add --dry-run` before changing capabilities, `update` before applying newer
templates, `check --json` for a machine-readable project diagnosis, and `gen ... --dry-run` for supported
in-project generation. See the **[lifecycle guide →](https://better-fullstack.dev/docs/getting-started/lifecycle/)**.

Flat `single-app` output is available for thin Next.js and TanStack Start self-backend projects.
Stacks that need separate database, auth, API, service, native, or deployment packages remain
monorepos.

<br>

## 🤖 AI Agents

Install the Claude Code plugin bundle:

```bash
claude plugin marketplace add Marve10s/Better-Fullstack
claude plugin install better-fullstack@better-fullstack
```

- **Codex plugin catalog** — `.agents/plugins/marketplace.json`
- **Any MCP client** — `npx -y create-better-fullstack@latest mcp`
- **Docs** — [better-fullstack.dev/docs/ai/plugin](https://better-fullstack.dev/docs/ai/plugin)

<br>

Ask any agent to build your stack — the **skill** runs the scaffold workflow, and the **MCP** exposes `bfs_*` tools (check compatibility, plan, create) to any client.

<br>

## 🤝 Contributing

See the [Contributing Guide](.github/CONTRIBUTING.md). Open an issue before starting work on new features.

```bash
git clone https://github.com/Marve10s/Better-Fullstack.git && cd Better-Fullstack
bun install
bun dev:cli    # CLI development
bun dev:web    # Website development
```

<br>

## 💬 Community

[![X](https://img.shields.io/badge/X-@MARVELOUSBC-18181B?style=for-the-badge&logo=x&logoColor=white)](https://x.com/MARVELOUSBC)
&nbsp;
[![Telegram](https://img.shields.io/badge/Telegram-Chat-18181B?style=for-the-badge&logo=telegram&logoColor=white)](https://t.me/TheCr1nge)
&nbsp;
[![GitHub](https://img.shields.io/badge/GitHub-Marve10s-18181B?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Marve10s)

Got questions or feedback? Open a [GitHub issue](https://github.com/Marve10s/Better-Fullstack/issues) or reach out on socials.

<br>

## 💛 Sponsors

If Better Fullstack saves you time, consider supporting:

[![GitHub Sponsors](https://img.shields.io/badge/GitHub_Sponsors-Sponsor-EA4AAA?style=for-the-badge&logo=githubsponsors&logoColor=white)](https://github.com/sponsors/Marve10s)
&nbsp;
[![Patreon](https://img.shields.io/badge/Patreon-Support-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/c/marve10s)

<br>

<!--
Star History is hidden while GitHub restricts stargazer data to repo admins and
collaborators, which makes the chart render an error placard instead of a graph:
https://star-history.com/blog/github-stargazer-api-restriction
Restore this block once the API is public again.

## 📈 Star History

<div align="center">
  <a href="https://star-history.com/#Marve10s/Better-Fullstack&Date">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=Marve10s/Better-Fullstack&type=Date&theme=dark" />
      <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=Marve10s/Better-Fullstack&type=Date" />
      <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=Marve10s/Better-Fullstack&type=Date" width="600" />
    </picture>
  </a>
</div>
-->

## License

MIT. Better Fullstack was originally forked from [Better T Stack](https://github.com/AmanVarshney01/create-better-t-stack) by [Aman Varshney](https://github.com/AmanVarshney01) and is now independently maintained with its own direction.
