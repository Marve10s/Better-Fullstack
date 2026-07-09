export type ChangelogRelease = {
  version: string;
  publishedAt: string;
  displayDate: string;
  isLatest?: boolean;
  href: string;
  title?: string;
  summary?: string;
  highlights?: string[];
  image?: {
    src: string;
    alt: string;
    credit: string;
    creditHref: string;
  };
};

const RELEASE_BASE_URL = "https://github.com/Marve10s/Better-Fullstack/releases/tag";

export const changelogReleases: ChangelogRelease[] = [
  {
    version: "v2.1.7",
    publishedAt: "2026-07-09T19:27:13Z",
    displayDate: "July 9, 2026",
    isLatest: true,
    href: `${RELEASE_BASE_URL}/v2.1.7`,
    title: "A smoother first run, Kotlin everywhere, and safer project updates",
    summary:
      "Better Fullstack 2.1.7 makes starting a project more flexible and returning to one more dependable. Choose how guided you want the CLI to be, use Kotlin as a first-class option in solo and multi-ecosystem stacks, and keep evolving projects without losing their shape, language, or release-channel choices.",
    highlights: [
      "Start interactive projects your way: jump to the Web Builder, choose Core for a quick setup, Full for every choice, or Custom for only the sections you care about—across solo and multi-ecosystem stacks.",
      "Choose Kotlin directly in the Web Builder and multi-ecosystem composer, or keep it grouped with Java; saved configurations, history, copied commands, and later updates remember your selection.",
      "Keep evolving projects with more confidence: `bfs add`, `bfs update`, and MCP-created projects retain a current baseline, preserve single-app layouts and native backend choices, and avoid unnecessary update conflicts.",
      "Use release channels predictably: latest and beta selections remain on the channel you chose, while generated commands preserve the details needed to reproduce the same stack.",
      "Install community capability packs with project-contained writes and reliable failure reporting, making them safer to use in scripts and agent workflows.",
      "Read localized docs, guides, and posts in the selected language from the first page response, without an English body briefly appearing before the page settles.",
      "Explore the new ScaffBench MCP path on the homepage, including DeepSeek V4 Flash results across the core benchmark suite.",
      "Move a builder stack into Claude Code faster with a copy-ready plugin install command in the share dialog.",
      "Create fresh projects more reliably across Next.js workspaces, Vinext with Strapi, Upstash Redis, Java testing, and multi-ecosystem commands.",
      "Anonymous usage reporting now distinguishes successful and failed runs, CLI and MCP entry points, and new versus returning installs while keeping error messages and local paths out of telemetry.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Abstract colorful gradient artwork",
      credit: "Unsplash",
      creditHref:
        "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    version: "v2.1.6",
    publishedAt: "2026-07-06T18:32:26Z",
    displayDate: "July 6, 2026",
    href: `${RELEASE_BASE_URL}/v2.1.6`,
    title: "Safer updates, steadier stack commands, and template fixes",
    summary:
      "This patch hardens the project update flow, tightens CLI and builder parity for multi-ecosystem stacks, and fixes the generator paths found during release review. SolidStart Autumn, self-backend file storage, RevenueCat native env output, Go Bleve, Java Kotlin, and web build stability all get sharper edges for users.",
    highlights: [
      "Made `bfs update` safer by preserving intentionally deleted baseline files and rejecting conflicting dry-run, check, apply, and baseline-recording flag combinations before they can write lock data.",
      "Aligned generated commands across the web builder and CLI for React Native RevenueCat payments, single-app TypeScript workspace shape, Go Bleve search, and Java Kotlin language selections.",
      "Fixed payment and storage templates so SolidStart Autumn emits its success route and dependency, self-backend file storage lands in the web app, Autumn self-hosted URLs target the app API, and RevenueCat native projects receive an offering ID env key.",
      "Improved JSON error handling for registry add failures so automation receives structured `ok: false` responses instead of raw thrown errors.",
      "Reduced localized-content pressure in the web build by splitting generated MDX bundles by locale and section, then aligning local builds with the Vercel memory setting.",
      "Verified the changes with targeted CLI, types, template-generator, web builder, app build, and full `test:release` coverage before release.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Abstract colorful gradient artwork",
      credit: "Unsplash",
      creditHref:
        "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    version: "v2.1.5",
    publishedAt: "2026-07-03T13:38:36Z",
    displayDate: "July 3, 2026",
    href: `${RELEASE_BASE_URL}/v2.1.5`,
    title: "Patch release for Astro TinaCMS and Elysia AI smoke fixes",
    summary:
      "This patch repairs the generated stack found by the post-merge smoke run: Astro TinaCMS configs now load safely under Tina's Node build process, Elysia AI routes narrow JSON request bodies before reading messages, and the release workflow is more resilient when published package smoke runs before npm propagation finishes.",
    highlights: [
      "Fixed Astro + TinaCMS generated projects by reading `PUBLIC_TINA_CLIENT_ID` from `process.env`, matching how Tina evaluates config during build.",
      "Fixed Elysia + AI example type-checking by narrowing `context.request.json()` to optional `UIMessage[]` messages before streaming chat responses.",
      "Added regression coverage for both generated outputs and validated the failing smoke combination through install, build, and type-check.",
      "Hardened release recovery so reruns can still verify already-published npm versions and retry published-package smoke while npm metadata propagates.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Abstract colorful gradient artwork",
      credit: "Unsplash",
      creditHref:
        "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    version: "v2.1.4",
    publishedAt: "2026-07-03T12:40:54Z",
    displayDate: "July 3, 2026",
    href: `${RELEASE_BASE_URL}/v2.1.4`,
    title: "Verified stack updates, Supabase Auth for TanStack Start, and release hardening",
    summary:
      "This release turns the stack graph into a more visible source of truth: public verified-combination docs, an API badge endpoint, planner-backed CLI add flows, and tighter generated-project CI coverage. It also ships Supabase Auth for TanStack Start fullstack projects and fixes the final release-blocking generator regressions found by broad smoke coverage.",
    highlights: [
      "Added Supabase Auth support for TanStack Start fullstack projects, including server/browser clients, OAuth callback routing, login and dashboard routes, env typing, user-menu wiring, and cookie preservation.",
      "Published verified-combination evidence through docs, generated web data, and a Shields-compatible API endpoint so release claims are backed by smoke, ScaffBench, and release-guard artifacts.",
      "Routed explicit `create-better-fullstack add` stack flags through the stack-update planner/apply path, with dry-run previews, edited-file blockers, richer graph summaries, and regression coverage.",
      "Hardened generated GitHub Actions output for graph-selected addons across TypeScript and graph-only Rust, Python, Go, Java, Elixir, and .NET projects.",
      "Fixed TanStack Start OpenAPI/Kysely smoke failures by always declaring React Query devtools where the base template imports it, and updated the release snapshots.",
      "Registered the new CLI `check` docs page in navigation and refreshed planning docs around graph authority, verified combinations, and the next stack-update phase.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Abstract colorful gradient artwork",
      credit: "Unsplash",
      creditHref:
        "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    version: "v2.1.3",
    publishedAt: "2026-06-29T20:06:24Z",
    displayDate: "June 29, 2026",
    href: `${RELEASE_BASE_URL}/v2.1.3`,
    title: "ScaffBench 2 agent benchmark, hardened templates, and reliable payments",
    summary:
      "This release rebuilds the AI-agent scaffolding benchmark as ScaffBench 2 with honest, reproducible scoring and a live homepage leaderboard. It also makes every generated template pass its own type-check and format gates, fixes all five payment providers, and repairs a wave of stack combinations across the TypeScript, Rust, Go, Python, Java, and Elixir ecosystems.",
    highlights: [
      "Rebuilt the AI-agent benchmark as ScaffBench 2: a per-spec solvability gate, reproducibility metadata, pass@k / pass^k scoring, and an honest read-only quality gate, plus opencode/Kilo and GPT/Codex agent adapters and free-tier models on an 8-config homepage leaderboard with Core/Full tabs.",
      "Made generated templates pass their own type-check and format gates — Biome 2.5 preset, Rust cargo fmt --check + clippy -D warnings, Python ruff, gofmt-clean Go, and the Java Testcontainers 2.x rename — so fresh scaffolds stay green.",
      "Fixed all five payment providers: added env schema for Dodo, Paddle, and Lemon Squeezy, async Paddle webhook verification, Lemon Squeezy SDK type alignment, and stopped pinning a stale Stripe apiVersion.",
      "Repaired a batch of stack combos: Nuxt oRPC auth context, Kysely auth schema types, OpenAPI tsconfig base path, Qwik Rolldown chunk names, Solid TanStack Router route tree, and Svelte Better Auth builds.",
      "The homepage hero release badge now auto-updates from the latest GitHub release, and the benchmark leaderboard ships with real run data.",
      "Pinned MikroORM SQLite to the v7 driver and Deno to 2.8.x, and expanded MCP stack-update coverage to keep generated installs and CI reliable.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Abstract colorful gradient artwork",
      credit: "Unsplash",
      creditHref:
        "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    version: "v2.1.0",
    publishedAt: "2026-06-23T17:12:32Z",
    displayDate: "June 23, 2026",
    href: `${RELEASE_BASE_URL}/v2.1.0`,
    title: "More stack options, stronger CLI workflows, and Astro 7-ready templates",
    summary:
      "This release adds Apollo Server, Keystatic, Paraglide, OpenSearch, vector databases, DevContainers, and GitHub Actions CI to the stack graph. It also improves CLI and MCP workflows, refreshes template dependencies, and keeps Astro projects on Astro 7-compatible integrations.",
    highlights: [
      "Added Apollo Server, Keystatic, Paraglide, OpenSearch, DevContainer, and GitHub Actions CI options across the CLI, schema, builder, compatibility rules, and generated templates.",
      "Added a new vector database category with pgvector, Qdrant, Chroma, and Pinecone support for AI and semantic-search scaffolds.",
      "Added bfs doctor, telemetry controls, config/history-driven creates, better scaffold rollback behavior, and AGENTS.md as the default AI-docs output.",
      "Expanded MCP with structured outputs, tool annotations, list_presets, recommend_stack, targetDir, and ecosystem-aware compatibility guidance.",
      "Updated Astro integrations for Astro 7 compatibility and gated Keystatic to Next.js until @keystatic/astro supports Astro 7.",
      "Hardened release safety with compatibility property tests, schema-template coverage, API literal drift guards, stricter smoke checks, and refreshed generated outputs.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Abstract colorful gradient artwork",
      credit: "Unsplash",
      creditHref:
        "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    version: "v2.0.3",
    publishedAt: "2026-06-17T00:00:00Z",
    displayDate: "June 17, 2026",
    href: `${RELEASE_BASE_URL}/v2.0.3`,
    title: "OpenAPI clients and Nx workspace tooling",
    summary:
      "This release adds OpenAPI API generation and Nx root tooling across the CLI, web builder, template generator, snapshots, and release checks. It also fixes the Vinext OpenAPI health check env key and makes Nx database scripts use explicit targets so db:* scripts work reliably.",
    highlights: [
      "Added OpenAPI as a first-class API option across CLI prompts, web builder state, compatibility metadata, generated templates, preview wiring, and snapshot coverage.",
      "Added Nx workspace tooling as an addon/root-tooling path with generated workspace scripts, CLI/web parity, and matrix coverage.",
      "Hardened Nx database scripts by emitting explicit targets for db:* commands, preserving package-script targets that contain colons.",
      "Fixed Vinext OpenAPI clients to read env.VITE_SERVER_URL for health checks instead of the Next-only NEXT_PUBLIC_SERVER_URL.",
      "Expanded release coverage with OpenAPI and Nx snapshots, package config regression tests, CLI addon tests, and strict smoke checks.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Abstract colorful gradient artwork",
      credit: "Unsplash",
      creditHref:
        "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    version: "v2.0.2",
    publishedAt: "2026-06-12T00:00:00Z",
    displayDate: "June 12, 2026",
    href: `${RELEASE_BASE_URL}/v2.0.2`,
    title: "Agent benchmark, .NET ecosystem, and a 42% lighter install",
    summary:
      "This release benchmarks how AI agents scaffold with Better Fullstack and publishes the results on the homepage, adds .NET as a first-class ecosystem on the new stack graph, and ships a much leaner install. It also fixes four scaffold bugs the benchmark itself uncovered.",
    highlights: [
      "Benchmarked frontier models scaffolding the same project specs three ways — prompt-only, our CLI, and our MCP server. Agents on the MCP path finished up to 7× faster with 4× fewer output tokens; the full results live on the homepage with an interactive chart.",
      "Redesigned the MCP page with one-paste setup for Claude Code, Codex, Gemini CLI, Cursor, VS Code, Claude Desktop, Windsurf, and Zed.",
      "Added .NET as a first-class ecosystem, plus an enterprise tier, backend-utils, and Render/Netlify deployment options on the stack graph (Phases 0–4).",
      "Cut install size by 42% (122 MB → 71 MB) and the web entry chunk by 32%.",
      "Added starter tracks: curated, goal-based stack presets for common product shapes.",
      "Fixed Storybook scaffolds on Next.js projects: framework detection now handles multi-frontend stacks and story types import from the renderer package, so generated apps type-check and build.",
      "Fixed multi-ecosystem database packages missing their ORM dependencies and auth schema, and added the missing expo-network dependency for Better Auth on the unistyles native template.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Abstract colorful gradient artwork",
      credit: "Unsplash",
      creditHref:
        "https://images.unsplash.com/photo-1777711391050-7e0cefd4b33b?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    version: "v2.0.0 + v2.0.1",
    publishedAt: "2026-06-06T00:00:00Z",
    displayDate: "June 6, 2026",
    href: `${RELEASE_BASE_URL}/v2.0.1`,
    title: "Multi-ecosystem support + shadcn/ui hotfix",
    summary:
      "Better Fullstack 2.0 introduces multi-ecosystem project generation, a new stack graph model, scoped CLI parts, and a redesigned builder for composing full products across frontend, backend, database, and mobile roles. The 2.0.1 hotfix repairs shadcn/ui prompt back-navigation during interactive scaffolds.",
    highlights: [
      "Fixed a CLI crash when pressing back on nested shadcn/ui prompts, including the color theme step, by propagating prompt navigation instead of storing it as a theme value.",
      "Added the stack graph foundation so projects can model connected frontend, backend, database, mobile, and ecosystem-specific parts instead of one flat stack.",
      "Added scoped CLI part parsing, validation, and reproducible command output for multi-ecosystem generation.",
      "Redesigned the web builder around Frontend, Backend, Database, Mobile, and Finalize steps with a first-class Multi-Ecosystem mode.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1779446183287-4c75bbaae734?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Abstract diagonal motion blur in pink, coral, and teal tones",
      credit: "Unsplash",
      creditHref:
        "https://images.unsplash.com/photo-1779446183287-4c75bbaae734?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    version: "v1.8.1",
    publishedAt: "2026-05-26T18:05:00Z",
    displayDate: "May 26, 2026",
    href: `${RELEASE_BASE_URL}/v1.8.1`,
    title: "Requested stack options",
    summary:
      "This release adds the requested TypeScript stack options across the CLI, web builder, compatibility rules, generated templates, and end-to-end scaffold coverage.",
    highlights: [
      "Added shadcn-svelte for SvelteKit UI, evlog logging, Directus CMS, Cloudinary file storage, and SWR data fetching as first-class stack choices.",
      "Wired the new options through metadata, search, resource links, dependency generation, env output, template handlers, and CLI/web parity paths.",
      "Expanded regression coverage for generated projects, including Directus, Cloudinary, evlog, SWR, shadcn-svelte, Nuxt runtime config, and Vinext compatibility.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1779446183287-4c75bbaae734?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Abstract diagonal motion blur in pink, coral, and teal tones",
      credit: "Unsplash",
      creditHref:
        "https://images.unsplash.com/photo-1779446183287-4c75bbaae734?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    version: "v1.8.0",
    publishedAt: "2026-05-24T13:38:37Z",
    displayDate: "May 24, 2026",
    href: `${RELEASE_BASE_URL}/v1.8.0`,
    title: "Elixir and React Native ecosystems",
    summary:
      "This release adds Elixir as a first-class Phoenix ecosystem, splits React Native into a dedicated mobile ecosystem, and hardens generated-app CI with PostgreSQL, BEAM, strict smoke tests, and Playwright coverage.",
    highlights: [
      "Added Phoenix and Phoenix LiveView scaffolds with Ecto/PostgreSQL, auth, REST, Absinthe, realtime, jobs, email, caching, testing, Docker, and release setup.",
      "Added React Native as a standalone Expo ecosystem with navigation, UI, storage, testing, push notifications, OTA updates, and deep-linking options.",
      "Expanded release safety with PostgreSQL-backed smoke lanes, BEAM setup, strict core/broad generated-app checks, Playwright builder tests, and package-manager coverage.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1779446183287-4c75bbaae734?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Abstract diagonal motion blur in pink, coral, and teal tones",
      credit: "Unsplash",
      creditHref:
        "https://images.unsplash.com/photo-1779446183287-4c75bbaae734?q=80&w=1015&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    version: "v1.7.1",
    publishedAt: "2026-05-08T13:21:17Z",
    displayDate: "May 8, 2026",
    href: `${RELEASE_BASE_URL}/v1.7.1`,
    title: "Expanded ecosystem tools",
    summary:
      "This release broadens the stack builder and CLI with new UI, Python, Rust, Go, and Java options, plus generator safeguards for the new Python API and type-checking paths.",
    highlights: [
      "Added TypeScript UI options for MUI and Ant Design, plus new shadcn/ui Luma and Sera styles with Heroicons and React Icons support.",
      "Expanded Python with Haystack, Django REST Framework, Django Ninja, RQ, Dramatiq, Huey, Ariadne, mypy, and Pyright, including Django-only API validation and a generated mypy config that matches scaffolded code.",
      "Expanded Rust, Go, and Java with uuid, Chrono, Reqwest, config, DashMap, parking_lot, Secrecy, Tokio Util, utoipa, Proptest, Insta, urfave/cli, Logrus, Quarkus, Resilience4j, Spring WebFlux, Spring Batch, Spring Kafka, Spring Mail, Spring Boot DevTools, Micrometer Prometheus, and Thymeleaf.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "A close-up of computer hardware and cables",
      credit: "Unsplash",
      creditHref:
        "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  },
  {
    version: "v1.7.0",
    publishedAt: "2026-05-07T13:52:15Z",
    displayDate: "May 7, 2026",
    href: `${RELEASE_BASE_URL}/v1.7.0`,
    title: "Shared stack translation, steadier scaffolds",
    summary:
      "This release moves stack selection meaning into shared types, aligns CLI and web compatibility checks, and hardens fresh pnpm scaffolds for pnpm v10 installs.",
    highlights: [
      "Added a shared stack selection translation layer in @better-fullstack/types for preview configs, default detection, URL state, normalization, and web command generation.",
      "Deepened shared compatibility helpers so CLI and web can rely on the same structured API/frontend and TanStack AI/frontend rule surface.",
      "Fixed fresh pnpm scaffold installs under pnpm v10 by allowing dependency build scripts during the first install path.",
    ],
  },
  {
    version: "v1.6.3",
    publishedAt: "2026-05-01T23:00:49Z",
    displayDate: "May 1, 2026",
    href: `${RELEASE_BASE_URL}/v1.6.3`,
    title: "AI CLI joins the TypeScript stack",
    summary:
      "This release adds ai-cli as a first-class TypeScript AI tooling option, wires it through generated app scripts and docs, and ships curated presets that prove the integration across common web stacks.",
    highlights: [
      "Added the ai-cli option across the TypeScript schema, CLI prompts, web builder, dependency generation, root package scripts, README output, and API key guidance.",
      "Introduced ready-to-run ai-cli presets for a Next.js agent workbench, a React Router plus Hono stack, and a frontend-only React Vite lab.",
      "Hardened generated TypeScript templates around Better Auth dashboards, env typing, Drizzle imports, React Router metadata, and Biome/shadcn lint behavior.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=900&auto=format&fit=crop",
      alt: "A developer workstation with code on a monitor",
      credit: "Unsplash",
      creditHref:
        "https://unsplash.com/photos/turned-on-monitor-displaying-programming-codes-2EJCSULRwC8",
    },
  },
  {
    version: "v1.6.2",
    publishedAt: "2026-04-29T18:24:21Z",
    displayDate: "Apr 29, 2026",
    href: `${RELEASE_BASE_URL}/v1.6.2`,
    title: "Docs shipped, Java leveled up",
    summary:
      "The latest release adds the new docs experience, expands Java into a fuller Spring Boot generation path, and hardens generator, smoke, and release coverage around the larger stack surface.",
    highlights: [
      "New documentation pages for getting started, CLI usage, MCP, AI-agent docs, ecosystem guides, and option references.",
      "Expanded Java support with Liquibase, Springdoc OpenAPI, Lombok, MapStruct, Caffeine, AssertJ, REST Assured, WireMock, Awaitility, ArchUnit, jqwik, and broader Testcontainers coverage.",
      "More release safety through broader Java tests, smoke fixes, dependency refreshes, and a hardened npm publish path.",
    ],
    image: {
      src: "https://images.unsplash.com/photo-1777026050794-a5e4ef7cd254?q=80&w=900&auto=format&fit=crop",
      alt: "A white bullet train passing a mountain",
      credit: "Unsplash",
      creditHref:
        "https://unsplash.com/photos/a-white-bullet-train-speeds-past-a-mountain-9H6ZPRr7j6Q",
    },
  },
  {
    version: "v1.6.1",
    publishedAt: "2026-04-21T18:25:26Z",
    displayDate: "Apr 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.6.1`,
  },
  {
    version: "v1.6.0",
    publishedAt: "2026-04-11T14:47:51Z",
    displayDate: "Apr 11, 2026",
    href: `${RELEASE_BASE_URL}/v1.6.0`,
  },
  {
    version: "v1.5.4",
    publishedAt: "2026-04-11T14:45:03Z",
    displayDate: "Apr 11, 2026",
    href: `${RELEASE_BASE_URL}/v1.5.4`,
  },
  {
    version: "v1.5.3",
    publishedAt: "2026-04-07T14:02:10Z",
    displayDate: "Apr 7, 2026",
    href: `${RELEASE_BASE_URL}/v1.5.3`,
  },
  {
    version: "v1.5.2",
    publishedAt: "2026-04-02T18:06:53Z",
    displayDate: "Apr 2, 2026",
    href: `${RELEASE_BASE_URL}/v1.5.2`,
  },
  {
    version: "v1.5.1",
    publishedAt: "2026-04-02T11:17:51Z",
    displayDate: "Apr 2, 2026",
    href: `${RELEASE_BASE_URL}/v1.5.1`,
  },
  {
    version: "v1.5.0",
    publishedAt: "2026-03-28T19:40:09Z",
    displayDate: "Mar 28, 2026",
    href: `${RELEASE_BASE_URL}/v1.5.0`,
  },
  {
    version: "v1.4.16",
    publishedAt: "2026-03-28T17:42:01Z",
    displayDate: "Mar 28, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.16`,
  },
  {
    version: "v1.4.15",
    publishedAt: "2026-03-17T20:15:44Z",
    displayDate: "Mar 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.15`,
  },
  {
    version: "v1.4.14",
    publishedAt: "2026-03-17T12:21:28Z",
    displayDate: "Mar 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.14`,
  },
  {
    version: "v1.4.13",
    publishedAt: "2026-03-15T16:00:19Z",
    displayDate: "Mar 15, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.13`,
  },
  {
    version: "v1.4.12",
    publishedAt: "2026-03-15T14:53:33Z",
    displayDate: "Mar 15, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.12`,
  },
  {
    version: "v1.4.11",
    publishedAt: "2026-03-13T08:17:28Z",
    displayDate: "Mar 13, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.11`,
  },
  {
    version: "v1.4.10",
    publishedAt: "2026-03-12T16:32:59Z",
    displayDate: "Mar 12, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.10`,
  },
  {
    version: "v1.4.9",
    publishedAt: "2026-03-12T10:24:04Z",
    displayDate: "Mar 12, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.9`,
  },
  {
    version: "v1.4.8",
    publishedAt: "2026-03-09T13:35:33Z",
    displayDate: "Mar 9, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.8`,
  },
  {
    version: "v1.4.7",
    publishedAt: "2026-03-08T12:20:00Z",
    displayDate: "Mar 8, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.7`,
  },
  {
    version: "v1.3.18",
    publishedAt: "2026-03-08T11:50:19Z",
    displayDate: "Mar 8, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.18`,
  },
  {
    version: "v1.4.6",
    publishedAt: "2026-03-04T16:33:31Z",
    displayDate: "Mar 4, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.6`,
  },
  {
    version: "v1.4.5",
    publishedAt: "2026-03-04T14:54:23Z",
    displayDate: "Mar 4, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.5`,
  },
  {
    version: "v1.4.4",
    publishedAt: "2026-03-04T13:48:38Z",
    displayDate: "Mar 4, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.4`,
  },
  {
    version: "v1.4.3",
    publishedAt: "2026-03-03T16:37:15Z",
    displayDate: "Mar 3, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.3`,
  },
  {
    version: "v1.4.2",
    publishedAt: "2026-03-03T16:18:52Z",
    displayDate: "Mar 3, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.2`,
  },
  {
    version: "v1.4.1",
    publishedAt: "2026-03-02T21:28:21Z",
    displayDate: "Mar 2, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.1`,
  },
  {
    version: "v1.4.0",
    publishedAt: "2026-02-25T00:13:34Z",
    displayDate: "Feb 25, 2026",
    href: `${RELEASE_BASE_URL}/v1.4.0`,
  },
  {
    version: "v1.3.17",
    publishedAt: "2026-02-24T01:09:47Z",
    displayDate: "Feb 24, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.17`,
  },
  {
    version: "v1.3.16",
    publishedAt: "2026-02-21T12:54:29Z",
    displayDate: "Feb 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.16`,
  },
  {
    version: "v1.3.15",
    publishedAt: "2026-02-20T13:04:54Z",
    displayDate: "Feb 20, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.15`,
  },
  {
    version: "v1.3.14",
    publishedAt: "2026-02-18T20:03:26Z",
    displayDate: "Feb 18, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.14`,
  },
  {
    version: "v1.3.13",
    publishedAt: "2026-02-17T21:57:42Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.13`,
  },
  {
    version: "v1.3.12",
    publishedAt: "2026-02-17T21:37:31Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.12`,
  },
  {
    version: "v1.3.11",
    publishedAt: "2026-02-17T21:22:52Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.11`,
  },
  {
    version: "v1.3.10",
    publishedAt: "2026-02-17T21:08:55Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.10`,
  },
  {
    version: "v1.3.9",
    publishedAt: "2026-02-17T20:53:40Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.9`,
  },
  {
    version: "v1.3.8",
    publishedAt: "2026-02-17T14:12:38Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.8`,
  },
  {
    version: "v1.3.7",
    publishedAt: "2026-02-17T13:34:52Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.7`,
  },
  {
    version: "v1.3.6",
    publishedAt: "2026-02-17T13:30:56Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.6`,
  },
  {
    version: "v1.3.5",
    publishedAt: "2026-02-17T12:56:46Z",
    displayDate: "Feb 17, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.5`,
  },
  {
    version: "v1.3.4",
    publishedAt: "2026-02-16T23:45:41Z",
    displayDate: "Feb 16, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.4`,
  },
  {
    version: "v1.3.3",
    publishedAt: "2026-02-15T10:40:06Z",
    displayDate: "Feb 15, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.3`,
  },
  {
    version: "v1.3.2",
    publishedAt: "2026-01-29T01:02:59Z",
    displayDate: "Jan 29, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.2`,
  },
  {
    version: "v1.3.1",
    publishedAt: "2026-01-28T23:25:42Z",
    displayDate: "Jan 28, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.1`,
  },
  {
    version: "v1.3.0",
    publishedAt: "2026-01-28T11:10:28Z",
    displayDate: "Jan 28, 2026",
    href: `${RELEASE_BASE_URL}/v1.3.0`,
  },
  {
    version: "v1.2.0",
    publishedAt: "2026-01-28T10:25:26Z",
    displayDate: "Jan 28, 2026",
    href: `${RELEASE_BASE_URL}/v1.2.0`,
  },
  {
    version: "v1.1.15",
    publishedAt: "2026-01-24T21:24:29Z",
    displayDate: "Jan 24, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.15`,
  },
  {
    version: "v1.1.16",
    publishedAt: "2026-01-24T21:10:43Z",
    displayDate: "Jan 24, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.16`,
  },
  {
    version: "v1.1.14",
    publishedAt: "2026-01-24T17:42:00Z",
    displayDate: "Jan 24, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.14`,
  },
  {
    version: "v1.1.12",
    publishedAt: "2026-01-23T15:16:11Z",
    displayDate: "Jan 23, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.12`,
  },
  {
    version: "v1.1.11",
    publishedAt: "2026-01-23T13:53:50Z",
    displayDate: "Jan 23, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.11`,
  },
  {
    version: "v1.1.10",
    publishedAt: "2026-01-22T20:59:11Z",
    displayDate: "Jan 22, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.10`,
  },
  {
    version: "v1.1.9",
    publishedAt: "2026-01-22T16:47:10Z",
    displayDate: "Jan 22, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.9`,
  },
  {
    version: "v1.1.8",
    publishedAt: "2026-01-21T20:26:31Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.8`,
  },
  {
    version: "v1.1.7",
    publishedAt: "2026-01-21T19:47:34Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.7`,
  },
  {
    version: "v1.1.6",
    publishedAt: "2026-01-21T18:40:27Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.6`,
  },
  {
    version: "v1.1.5",
    publishedAt: "2026-01-21T18:35:39Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.5`,
  },
  {
    version: "v1.1.4",
    publishedAt: "2026-01-21T18:12:45Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.4`,
  },
  {
    version: "v1.1.3",
    publishedAt: "2026-01-21T17:44:59Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.3`,
  },
  {
    version: "v1.1.2",
    publishedAt: "2026-01-21T16:55:49Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.2`,
  },
  {
    version: "v1.1.1",
    publishedAt: "2026-01-21T16:50:53Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.1`,
  },
  {
    version: "v1.1.0",
    publishedAt: "2026-01-21T16:28:39Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.1.0`,
  },
  {
    version: "v1.0.5",
    publishedAt: "2026-01-21T15:44:38Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.0.5`,
  },
  {
    version: "v1.0.3",
    publishedAt: "2026-01-21T15:25:04Z",
    displayDate: "Jan 21, 2026",
    href: `${RELEASE_BASE_URL}/v1.0.3`,
  },
];

export const latestChangelogRelease = changelogReleases[0];
