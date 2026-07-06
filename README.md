```
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

<div align="center">

**Scaffold production-ready fullstack apps in seconds. Browse 450+ tools across seven ecosystems — the CLI wires everything together.**

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

- **450+ tools** — frontend, backend, database, auth, payments, AI, DevOps, and more
- **7 ecosystems** — TypeScript, React Native, Rust, Python, Go, Java, Elixir — with more coming
- **Visual builder** — configure your stack in the browser, get a ready-to-run CLI command
- **Wired for you** — no manual glue code; every picked integration is preconfigured and working out of the box

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
--ecosystem <lang> # Start in typescript, react-native, rust, python, go, java, or elixir mode
--part <binding>   # Add a multi-ecosystem stack part, e.g. frontend:typescript:next
--version-channel  # Dependency channel: stable, latest, beta
--no-git           # Skip git initialization
--no-install       # Skip dependency installation
--verify           # Run generated project checks without starting dev servers
--verbose          # Show detailed output
```

</details>

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

## Built Like a Product, Not a Template

Better Fullstack is organized around the decisions that matter: pick an ecosystem, choose the layers you actually need, and ship a runnable project without hand-wiring the glue.

<div align="center">
<table>
<tr>
<td width="33%">
<strong>450+ tools</strong><br>
Only the relevant options surface for the stack you pick.
</td>
<td width="33%">
<strong>7 ecosystems</strong><br>
TypeScript, React Native, Rust, Python, Go, Java, Elixir.
</td>
<td width="33%">
<strong>One command</strong><br>
Visual builder or CLI, same generated output.
</td>
</tr>
</table>
</div>

<br>

<details>
<summary><strong>Ecosystem Surface</strong> — TypeScript · React Native · Rust · Python · Go · Java · Elixir</summary>
<br>

| | |
| --- | --- |
| **TypeScript** | The default — all integrations below are available |
| **React Native** | Expo · native-bare · Uniwind · Unistyles · mobile navigation, storage, testing, push, OTA, and deep linking |
| **Rust** | Axum · Actix Web · Leptos · Dioxus · SeaORM · SQLx · tonic · async-graphql |
| **Python** | FastAPI · Django · SQLAlchemy · SQLModel · Pydantic · LangChain · CrewAI · Celery |
| **Go** | Gin · Echo · GORM · sqlc · gRPC · Cobra · BubbleTea · Zap |
| **Java** | Spring Boot · Maven · Gradle · Spring Data JPA · Spring Security · JUnit · Testcontainers |
| **Elixir** | Phoenix · Phoenix LiveView · Ecto SQL · Absinthe · Channels · Oban · Swoosh · Credo |

</details>

<details>
<summary><strong>Application Primitives</strong></summary>
<br>

**TypeScript**
| | |
| --- | --- |
| **Frontend** | Next.js · Nuxt · SvelteKit · SolidStart · Astro · Qwik · Angular · RedwoodJS · Fresh · React Native |
| **Backend** | Hono · Express · Fastify · Elysia · feTS · NestJS · AdonisJS · Nitro · Encore · Convex |
| **API** | tRPC · oRPC · ts-rest · GraphQL (Garph) |

**Rust**
| | |
| --- | --- |
| **Frontend** | Leptos · Dioxus |
| **Backend** | Axum · Actix Web |
| **API** | tonic (gRPC) · async-graphql |

**Python**
| | |
| --- | --- |
| **Backend** | FastAPI · Django |

**Go**
| | |
| --- | --- |
| **Backend** | Gin · Echo |
| **API** | gRPC |

</details>

<details>
<summary><strong>Persistence</strong></summary>
<br>

**TypeScript**
| | |
| --- | --- |
| **Database** | PostgreSQL · MySQL · SQLite · MongoDB |
| **ORM** | Drizzle · Prisma · TypeORM · Kysely · MikroORM · Sequelize · Mongoose |
| **Hosting** | Turso · Neon · Supabase · PlanetScale · MongoDB Atlas · Cloudflare D1 · Upstash |

**Rust**
| | |
| --- | --- |
| **ORM** | SeaORM · SQLx |

**Python**
| | |
| --- | --- |
| **ORM** | SQLAlchemy · SQLModel |

**Go**
| | |
| --- | --- |
| **ORM** | GORM · sqlc |

Databases and hosting providers are shared across all ecosystems.

</details>

<details>
<summary><strong>Platform Services</strong></summary>
<br>

**TypeScript**
| | |
| --- | --- |
| **Auth** | Better Auth · Clerk · NextAuth · Supabase Auth · Auth0 |
| **Payments** | Stripe · Polar · Lemon Squeezy · Paddle · Dodo |
| **Email** | React Email + Resend · Nodemailer · Postmark · SendGrid · AWS SES · Mailgun |
| **Real-time** | Socket.IO · PartyKit · Ably · Pusher · Liveblocks · Yjs |
| **Jobs** | BullMQ · Trigger.dev · Inngest · Temporal |

**Python**
| | |
| --- | --- |
| **Jobs** | Celery |
| **Validation** | Pydantic |

</details>

<details>
<summary><strong>AI Stack</strong></summary>
<br>

**TypeScript**
| | |
| --- | --- |
| **SDKs** | Vercel AI · Mastra · VoltAgent · LangGraph · OpenAI Agents · Google ADK · LangChain · LlamaIndex |

**Python**
| | |
| --- | --- |
| **SDKs** | LangChain · LlamaIndex · OpenAI SDK · Anthropic SDK · LangGraph · CrewAI |

</details>

<details>
<summary><strong>Frontend Extras</strong> <sub>(TypeScript)</sub></summary>
<br>

| | |
| --- | --- |
| **UI** | shadcn/ui · Radix · Headless UI · Chakra · Mantine · DaisyUI · NextUI · Park UI · Base UI |
| **State** | Zustand · Jotai · Redux Toolkit · XState · TanStack Store |
| **Forms** | TanStack Form · React Hook Form · Formik · Conform |
| **Animation** | Framer Motion · GSAP · React Spring |
| **Styling** | Tailwind CSS · SCSS · Less |

</details>

<details>
<summary><strong>DevOps & Tooling</strong></summary>
<br>

**TypeScript**
| | |
| --- | --- |
| **Testing** | Vitest · Playwright · Jest · Cypress |
| **Deploy** | Cloudflare · Fly.io · Railway · Docker · SST |
| **Observability** | OpenTelemetry · Pino · Winston |
| **Tooling** | Turborepo · Biome · Oxlint · Husky · Lefthook · Storybook · MSW |
| **Desktop/PWA** | Tauri · PWA · WXT (browser extensions) |
| **Docs** | Starlight · Fumadocs |

**Rust**
| | |
| --- | --- |
| **Libraries** | Serde · Validator · jsonwebtoken · Argon2 · tokio-test · Mockall |
| **CLI** | Clap · Ratatui |

**Python**
| | |
| --- | --- |
| **Tooling** | Ruff |

**Go**
| | |
| --- | --- |
| **Logging** | Zap |
| **CLI** | Cobra · BubbleTea |

</details>

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

[![Patreon](https://img.shields.io/badge/Patreon-Support-F96854?style=for-the-badge&logo=patreon&logoColor=white)](https://www.patreon.com/c/marve10s)

<br>

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

<br>

## License

MIT. Better Fullstack is now maintained as a standalone project, with original inspiration from [create-better-t-stack](https://github.com/AmanVarshney01/create-better-t-stack) by [Aman Varshney](https://github.com/AmanVarshney01).
