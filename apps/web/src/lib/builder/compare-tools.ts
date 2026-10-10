import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  DEFAULT_X_IMAGE_URL,
  SITE_NAME,
  SITE_URL,
  canonicalUrl,
} from "@/lib/seo/seo";
import {
  COMPARISON_COUNTS,
  ECOSYSTEM_COUNT_LABEL,
  ECOSYSTEM_NAMES,
  OPTION_COUNT_LABEL,
} from "@/lib/project/project-stats";

export type ComparisonRow = {
  dimension: string;
  betterFullstack: string;
  competitor: string;
};

export type ComparisonSection = {
  heading: string;
  paragraphs: string[];
};

export type ComparisonFaq = {
  question: string;
  answer: string;
};

export type CompetitorComparison = {
  slug: string;
  competitorName: string;
  competitorUrl: string;
  competitorRepo: string;
  title: string;
  description: string;
  heading: string;
  /** Facts below were checked against public sources on this date. */
  factsCheckedOn: string;
  intro: string[];
  rows: ComparisonRow[];
  sections: ComparisonSection[];
  faqs: ComparisonFaq[];
};

const ECOSYSTEM_LIST = ECOSYSTEM_NAMES.join(", ");

const createT3App: CompetitorComparison = {
  slug: "create-t3-app",
  competitorName: "create-t3-app",
  competitorUrl: "https://create.t3.gg",
  competitorRepo: "https://github.com/t3-oss/create-t3-app",
  title: "Better Fullstack vs create-t3-app: 2026 Comparison",
  description: `create-t3-app scaffolds one curated Next.js stack. Better Fullstack scaffolds ${OPTION_COUNT_LABEL} options across ${ECOSYSTEM_COUNT_LABEL} ecosystems. A sourced, side-by-side comparison.`,
  heading: "Better Fullstack vs create-t3-app",
  factsCheckedOn: "2026-07-17",
  intro: [
    "create-t3-app and Better Fullstack solve the same problem - starting a typesafe fullstack app without a week of wiring - with opposite philosophies. create-t3-app scaffolds one deliberately minimal Next.js stack where each piece (tRPC, Prisma or Drizzle, NextAuth.js, Tailwind) is an on/off toggle. Better Fullstack is a configurable generator: you pick each layer from a catalog of " +
      `${OPTION_COUNT_LABEL} options across ${ECOSYSTEM_COUNT_LABEL} language ecosystems, and a compatibility engine validates the combination before anything is written to disk.`,
    "If you want exactly the T3 shape - Next.js with tRPC, Prisma/Drizzle, and NextAuth - create-t3-app remains a well-documented, widely-taught choice. If you want to choose your frontend, backend, database, or auth provider, or you need anything the T3 scope deliberately excludes - payments, mobile, i18n, another language - Better Fullstack scaffolds it preconfigured.",
  ],
  rows: [
    {
      dimension: "Philosophy",
      betterFullstack: "Configurable catalog, compatibility-checked",
      competitor: "One curated stack, minimal by design",
    },
    {
      dimension: "Language ecosystems",
      betterFullstack: ECOSYSTEM_LIST,
      competitor: "TypeScript only",
    },
    {
      dimension: "Frontend choice",
      betterFullstack: "Next.js, Nuxt, SvelteKit, SolidStart, Angular, Astro, TanStack Start, and more",
      competitor: "Next.js only",
    },
    {
      dimension: "Backend choice",
      betterFullstack: "Hono, Elysia, Fastify, NestJS, Axum, FastAPI, Spring Boot, and more",
      competitor: "Next.js API routes / server components",
    },
    {
      dimension: "Database / ORM",
      betterFullstack: `${COMPARISON_COUNTS.databases} databases, ${COMPARISON_COUNTS.orms} ORMs`,
      competitor: "Prisma or Drizzle (MySQL, Postgres, PlanetScale, SQLite)",
    },
    {
      dimension: "Auth",
      betterFullstack: `${COMPARISON_COUNTS.authProviders} providers (Better-Auth, Clerk, Auth.js, Auth0, …)`,
      competitor: "NextAuth.js (toggle)",
    },
    {
      dimension: "Payments",
      betterFullstack: `${COMPARISON_COUNTS.paymentProviders} providers (Stripe, Paddle, RevenueCat, …)`,
      competitor: "Not included (bring your own)",
    },
    {
      dimension: "Mobile",
      betterFullstack: "Expo / React Native in the same CLI",
      competitor: "Separate project (create-t3-turbo)",
    },
    {
      dimension: "Interfaces",
      betterFullstack: "CLI, visual web builder, MCP server for AI agents",
      competitor: "CLI (interactive prompts; experimental CI flags)",
    },
  ],
  sections: [
    {
      heading: "Two philosophies: curation versus configuration",
      paragraphs: [
        "create-t3-app is explicit about what it is: \"an opinionated project\", \"modular at its core\", and \"NOT an all-inclusive template\". Its documentation states plainly that for anything beyond the core pieces, \"we expect you to bring your own libraries\" - state management, deployment, payments, and i18n are all deliberately out of scope. That restraint is a feature: fewer choices, fewer moving parts, and a huge body of tutorials that all describe the same project shape.",
        "Better Fullstack takes the opposite bet: that the wiring between your chosen pieces - auth adapter to ORM, ORM to database, API layer to frontend client - is exactly the part worth automating, whatever the pieces are. Every option in the catalog is modeled in a compatibility graph, so invalid combinations are rejected or auto-adjusted before scaffolding, and the generated project type-checks out of the box.",
      ],
    },
    {
      heading: "What create-t3-app gives you",
      paragraphs: [
        "A Next.js + TypeScript application with up to seven toggleable technologies: tRPC, Prisma or Drizzle, NextAuth.js, Tailwind CSS, App Router or Pages Router, and a choice of four database providers. It is backed by one of the largest communities in the React ecosystem (29,000+ GitHub stars) and years of tutorials, videos, and Stack Overflow answers that assume its exact structure.",
        "It is also honest about its boundaries: no built-in i18n, no payments, no mobile target in the same CLI (the t3-oss organization maintains create-t3-turbo separately for a Turborepo + Expo variant), and non-interactive scaffolding is officially experimental.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        `A catalog instead of a fixed shape: ${OPTION_COUNT_LABEL} options across frontends, backends, databases, ORMs, auth, API layers, payments, AI integrations, job queues, realtime, i18n, and deployment - across ${ECOSYSTEM_COUNT_LABEL} language ecosystems (${ECOSYSTEM_LIST}). Web, mobile, and backend parts can be composed into one multi-ecosystem project.`,
        "The workflow is also broader than a CLI: a visual web builder lets you configure the stack in the browser and copy a ready-to-run command, and an MCP server exposes the same compatibility-checked scaffolding to AI agents like Claude Code and Codex.",
      ],
    },
    {
      heading: "Maintenance status, in dates",
      paragraphs: [
        "As of 2026-07-17: create-t3-app's latest release is v7.40.0 (published 2025-11-05) and its last repository push was 2025-12-13. Its npm downloads went from roughly 8,500/month in October 2025 to roughly 3,000/month in June 2026. Community members dispute any \"unmaintained\" framing, and the project remains MIT-licensed with an active issue tracker - we present the dates and let you judge the trajectory.",
        "Better Fullstack ships multiple releases per month; the changelog and commit history are public on GitHub.",
      ],
    },
    {
      heading: "When create-t3-app is the right choice",
      paragraphs: [
        "Pick create-t3-app if you want the community-blessed minimal Next.js starter: a single well-understood shape, maximum tutorial coverage, and no generator abstractions between you and the code. If your product is a Next.js app with tRPC and a Postgres database and you plan to hand-pick everything else, it does that job well.",
      ],
    },
    {
      heading: "Try the closest Better Fullstack equivalent",
      paragraphs: [
        "Better Fullstack ships a T3-style preset - `bun create better-fullstack@latest my-app --template t3` scaffolds the familiar Next.js + tRPC + Tailwind shape, with the option to swap any piece: Drizzle for Prisma, Better-Auth for NextAuth, or a separate Hono API server when the project outgrows API routes.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is create-t3-app still maintained?",
      answer:
        "Its most recent release is v7.40.0 (2025-11-05) and the repository's last push was 2025-12-13 (checked 2026-07-17). The project is not archived and community members consider the team active, but release cadence has slowed compared to earlier years.",
    },
    {
      question: "Can Better Fullstack scaffold the T3 stack?",
      answer:
        "Yes. The --template t3 preset scaffolds a Next.js + tRPC + Tailwind project, and every piece can be swapped: Drizzle or Prisma, Better-Auth or Auth.js, SQLite or PostgreSQL. The compatibility engine validates whatever combination you choose.",
    },
    {
      question: "What does Better Fullstack support that create-t3-app doesn't?",
      answer: `Choice of frontend and backend frameworks, ${ECOSYSTEM_COUNT_LABEL} language ecosystems (create-t3-app is TypeScript/Next.js only), native mobile in the same CLI, payments, AI integrations, i18n, job queues, a visual web builder, and an MCP server for AI agents.`,
    },
    {
      question: "Which is better for beginners?",
      answer:
        "create-t3-app's single shape means fewer decisions and more tutorials that match your project exactly. Better Fullstack's visual builder helps you explore options with compatibility checking, which suits beginners who already know roughly what stack they want.",
    },
  ],
};

const betterTStack: CompetitorComparison = {
  slug: "better-t-stack",
  competitorName: "Better-T-Stack",
  competitorUrl: "https://better-t-stack.dev",
  competitorRepo: "https://github.com/AmanVarshney01/create-better-t-stack",
  title: "Better Fullstack vs Better-T-Stack: 2026 Comparison",
  description: `Better Fullstack grew out of Better-T-Stack and expanded it beyond TypeScript to ${ECOSYSTEM_COUNT_LABEL} ecosystems. An honest, sourced comparison of the two scaffolding CLIs.`,
  heading: "Better Fullstack vs Better-T-Stack",
  factsCheckedOn: "2026-07-17",
  intro: [
    "Better Fullstack and Better-T-Stack are close relatives: Better Fullstack began with Better-T-Stack (create-better-t-stack) as its original inspiration and is now maintained as a standalone project. Both are menu-driven scaffolding CLIs with a visual web builder and MCP support; the core difference is scope. Better-T-Stack is deliberately TypeScript-only. Better Fullstack extends the same configurable-menu model to " +
      `${ECOSYSTEM_COUNT_LABEL} language ecosystems (${ECOSYSTEM_LIST}) and a wider integration catalog of ${OPTION_COUNT_LABEL} options.`,
    "One disambiguation up front: Better-T-Stack is unrelated to Better Stack (betterstack.com), the observability and uptime-monitoring company. Better-T-Stack is an open-source project scaffolding CLI by Aman Varshney.",
  ],
  rows: [
    {
      dimension: "Language ecosystems",
      betterFullstack: ECOSYSTEM_LIST,
      competitor: "TypeScript only",
    },
    {
      dimension: "Web frontends",
      betterFullstack: "Next.js, Nuxt, SvelteKit, Solid, Astro, Angular, Qwik, TanStack Start/Router, React Router, and more",
      competitor: "TanStack Router/Start, React Router, Next.js, Nuxt, Svelte, Solid, Astro",
    },
    {
      dimension: "Backends",
      betterFullstack: "Hono, Elysia, Express, Fastify, NestJS, AdonisJS, Convex, self - plus Axum, FastAPI, Gin, Spring Boot, and more in other ecosystems",
      competitor: "Hono, Express, Fastify, Elysia, Convex, self",
    },
    {
      dimension: "API layer",
      betterFullstack: `${COMPARISON_COUNTS.apis} options (tRPC, oRPC, ts-rest, OpenAPI, GraphQL, …)`,
      competitor: "tRPC or oRPC",
    },
    {
      dimension: "Auth",
      betterFullstack: `${COMPARISON_COUNTS.authProviders} providers (Better-Auth, Clerk, Auth.js, Auth0, Supabase, WorkOS, …)`,
      competitor: "Better Auth or Clerk",
    },
    {
      dimension: "Payments",
      betterFullstack: `${COMPARISON_COUNTS.paymentProviders} providers (Stripe, Paddle, LemonSqueezy, RevenueCat, …)`,
      competitor: "Polar",
    },
    {
      dimension: "Mobile",
      betterFullstack: "Expo / React Native with navigation, UI, storage, push, OTA options",
      competitor: "React Native (Bare, NativeWind/Uniwind, Unistyles)",
    },
    {
      dimension: "Visual web builder",
      betterFullstack: "Yes (better-fullstack.dev/new)",
      competitor: "Yes (better-t-stack.dev/new)",
    },
    {
      dimension: "MCP / AI agents",
      betterFullstack: "MCP server + Claude Code and Codex plugins",
      competitor: "MCP addon + Claude Code plugin",
    },
  ],
  sections: [
    {
      heading: "Shared DNA",
      paragraphs: [
        "Both projects follow the same core idea: instead of one fixed starter, present a menu for each layer of the stack, then generate a monorepo where the chosen pieces are wired together. Both are MIT-licensed, both offer a web-based stack builder that emits a ready-to-run CLI command, and both integrate with AI coding agents via MCP. Better Fullstack credits create-better-t-stack as its original inspiration, so the interaction model will feel familiar to users of either tool.",
      ],
    },
    {
      heading: "Where they differ: scope",
      paragraphs: [
        `Better-T-Stack stays intentionally within TypeScript: its option list covers TypeScript web frontends, TypeScript backends, and React Native. Better Fullstack generalizes the model to ${ECOSYSTEM_COUNT_LABEL} ecosystems - the same menu-driven flow scaffolds an Axum + Leptos Rust app, a FastAPI + SQLAlchemy Python service, or a Spring Boot backend, and multi-ecosystem projects can compose parts across languages (for example a TypeScript web app with a Go backend).`,
        `The integration catalog is also broader per layer: ${COMPARISON_COUNTS.apis} API-layer options including OpenAPI and GraphQL (Better-T-Stack offers tRPC or oRPC), ${COMPARISON_COUNTS.authProviders} auth providers (vs Better Auth or Clerk), ${COMPARISON_COUNTS.paymentProviders} payment providers (vs Polar), plus categories Better-T-Stack doesn't model as first-class choices: AI SDKs, job queues, realtime, caching, search, file storage, i18n, feature flags, vector databases, and observability.`,
      ],
    },
    {
      heading: "Where Better-T-Stack shines",
      paragraphs: [
        "It is a focused, very actively developed tool - multiple releases per week as of July 2026 - and its narrower scope means fewer templates to maintain per option and a tight default path (Hono + tRPC + Drizzle + Better Auth). As of July 2026 it is also the more downloaded of the two (roughly 11,900 npm downloads/month vs roughly 3,000 for Better Fullstack).",
        "If your work is entirely TypeScript and its menu covers your stack, Better-T-Stack is an excellent choice - that focus is exactly what it optimizes for.",
      ],
    },
    {
      heading: "When to choose Better Fullstack",
      paragraphs: [
        "Choose Better Fullstack when your stack crosses a boundary Better-T-Stack doesn't model: a non-TypeScript backend, REST/OpenAPI or GraphQL instead of tRPC-style RPC, an auth or payments provider outside its two options, or scaffold-time integrations like i18n, job queues, or vector databases. The compatibility engine validates all of it before generation, whatever the combination.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is Better Fullstack a fork of Better-T-Stack?",
      answer:
        "Better Fullstack started with create-better-t-stack by Aman Varshney as its original inspiration and is now maintained as a standalone project with its own codebase direction: multi-language ecosystems, a larger integration catalog, and a compatibility engine spanning all of it. The lineage is credited in the project README.",
    },
    {
      question: "Is Better-T-Stack the same as Better Stack?",
      answer:
        "No. Better Stack (betterstack.com) is an observability and uptime-monitoring company. Better-T-Stack (better-t-stack.dev) is an open-source CLI for scaffolding TypeScript projects. They are unrelated.",
    },
    {
      question: "Does Better-T-Stack support languages other than TypeScript?",
      answer:
        "No - it is TypeScript-only by design, covering TypeScript web frontends, backends, and React Native. For Rust, Go, Python, Java, .NET, or Elixir scaffolding with the same menu-driven flow, use Better Fullstack.",
    },
    {
      question: "Do both tools have a web builder and MCP support?",
      answer:
        "Yes. Both provide a visual stack builder that generates a CLI command, and both expose scaffolding to AI agents via MCP. Better Fullstack additionally ships a Codex plugin catalog alongside its Claude Code plugin.",
    },
  ],
};

const createNextApp: CompetitorComparison = {
  slug: "create-next-app",
  competitorName: "create-next-app",
  competitorUrl: "https://nextjs.org/docs/app/api-reference/cli/create-next-app",
  competitorRepo: "https://github.com/vercel/next.js/tree/canary/packages/create-next-app",
  title: "Better Fullstack vs create-next-app: 2026 Comparison",
  description: `create-next-app scaffolds a Next.js application. Better Fullstack scaffolds Next.js or another frontend plus backend, database, auth, and more from ${OPTION_COUNT_LABEL} options. A sourced comparison.`,
  heading: "Better Fullstack vs create-next-app",
  factsCheckedOn: "2026-10-06",
  intro: [
    "create-next-app is the official way to start a Next.js application. It creates a Next.js project from the default template or from an example, and its prompts cover the project setup: TypeScript, linter, Tailwind CSS, React Compiler, App Router, src directory, import alias, and an AGENTS.md file for coding agents.",
    `Better Fullstack starts one level higher. Next.js is one of its frontend options, and the same command also selects the backend, database, ORM, auth, payments, and other integrations from ${OPTION_COUNT_LABEL} options across ${ECOSYSTEM_COUNT_LABEL} ecosystems, then checks that the combination is compatible before writing files.`,
  ],
  rows: [
    {
      dimension: "Scope",
      betterFullstack: "Whole project: frontend, backend, data, auth, integrations",
      competitor: "A Next.js application",
    },
    {
      dimension: "Language ecosystems",
      betterFullstack: ECOSYSTEM_LIST,
      competitor: "TypeScript or JavaScript",
    },
    {
      dimension: "Frontend choice",
      betterFullstack: "Next.js, Nuxt, SvelteKit, Astro, TanStack Start, Angular, and more",
      competitor: "Next.js (App Router or Pages Router)",
    },
    {
      dimension: "Database / ORM",
      betterFullstack: `${COMPARISON_COUNTS.databases} databases, ${COMPARISON_COUNTS.orms} ORMs`,
      competitor: "Not part of the prompts (available through examples)",
    },
    {
      dimension: "Auth",
      betterFullstack: `${COMPARISON_COUNTS.authProviders} providers (Better-Auth, Clerk, Auth.js, …)`,
      competitor: "Not part of the prompts (available through examples)",
    },
    {
      dimension: "Linting",
      betterFullstack: "Biome, ESLint, Oxlint, Ultracite, and more as add-ons",
      competitor: "ESLint, Biome, or none",
    },
    {
      dimension: "Starting points",
      betterFullstack: "Option catalog, presets, or a visual builder",
      competitor: "Default template, official examples, or any public GitHub example",
    },
    {
      dimension: "Interfaces",
      betterFullstack: "CLI, visual web builder, MCP server for AI agents",
      competitor: "CLI (interactive prompts or flags)",
    },
  ],
  sections: [
    {
      heading: "What create-next-app gives you",
      paragraphs: [
        "The recommended defaults produce a TypeScript Next.js app with ESLint, Tailwind CSS, the App Router, and an AGENTS.md file. Flags such as --js, --biome, --no-linter, --src-dir, --api (route handlers only), and --empty adjust that shape, and --use-npm, --use-pnpm, --use-yarn, or --use-bun choose the package manager.",
        "For anything beyond the base app, create-next-app relies on examples: --example accepts an official example from the Next.js repository or the URL of any public GitHub repository.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        `Better Fullstack treats Next.js as one choice in a larger project. You can keep Next.js as a fullstack app or pair it with a separate backend such as Hono, Elysia, Fastify, or NestJS, then add an API layer (${COMPARISON_COUNTS.apis} options including tRPC, oRPC, and GraphQL), a database and ORM, auth, payments, email, job queues, and AI SDKs.`,
        "Every selection passes through the same compatibility rules before generation, so a combination that does not fit together is rejected or adjusted instead of producing a project that fails later. Projects can also be monorepos with web, mobile, and backend apps side by side.",
      ],
    },
    {
      heading: "When create-next-app is the right choice",
      paragraphs: [
        "Pick create-next-app when you want a Next.js app that matches the official documentation exactly, or when one of the official examples already covers the integration you need. It is the reference starting point for Next.js and is released alongside Next.js itself.",
      ],
    },
    {
      heading: "Try the closest Better Fullstack equivalent",
      paragraphs: [
        "The nextjs-minimal preset scaffolds Next.js with Tailwind CSS and shadcn/ui and no database or backend: `bun create better-fullstack@latest my-app --template nextjs-minimal`. From there, the `add` command can extend the project with capabilities such as email, observability, or deployment targets.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does Better Fullstack use create-next-app under the hood?",
      answer:
        "No. Better Fullstack generates projects from its own templates, so the Next.js app it writes is wired to the other pieces you selected, such as the API layer, ORM, and auth provider.",
    },
    {
      question: "Can create-next-app add a database or auth?",
      answer:
        "Not through its prompts. Its options cover the Next.js setup itself. You can start from an official or community example that includes a database or auth, or add those libraries yourself after scaffolding.",
    },
    {
      question: "Which should I use for a plain Next.js app?",
      answer:
        "Either works. create-next-app is the official tool and matches the Next.js docs. Better Fullstack's nextjs-minimal preset is a comparable starting point if you expect to add a backend, database, or other integrations later.",
    },
  ],
};

const createVite: CompetitorComparison = {
  slug: "create-vite",
  competitorName: "create-vite",
  competitorUrl: "https://vite.dev/guide/",
  competitorRepo: "https://github.com/vitejs/vite/tree/main/packages/create-vite",
  title: "Better Fullstack vs create-vite: 2026 Comparison",
  description: `create-vite starts a frontend project from a basic Vite template. Better Fullstack scaffolds a whole project from ${OPTION_COUNT_LABEL} options across ${ECOSYSTEM_COUNT_LABEL} ecosystems. A sourced comparison.`,
  heading: "Better Fullstack vs create-vite",
  factsCheckedOn: "2026-10-06",
  intro: [
    "create-vite is the official scaffolder for Vite. The Vite guide describes it as \"a tool to quickly start a project from a basic template for popular frameworks\". You pick a template such as react-ts, vue-ts, or svelte-ts, and you get a small frontend project with Vite already configured.",
    `Better Fullstack covers a different stage. Its Vite-based frontends are one layer of a project that can also include a backend, database, auth, and other integrations, chosen from ${OPTION_COUNT_LABEL} options and checked for compatibility before any file is written.`,
  ],
  rows: [
    {
      dimension: "Scope",
      betterFullstack: "Whole project: frontend, backend, data, auth, integrations",
      competitor: "A frontend project from a basic template",
    },
    {
      dimension: "Language ecosystems",
      betterFullstack: ECOSYSTEM_LIST,
      competitor: "TypeScript or JavaScript",
    },
    {
      dimension: "Frontend choice",
      betterFullstack: "React + Vite, Vue 3 + Vite, vanilla Vite, TanStack Router, React Router, and more",
      competitor: "Vanilla, Vue, React, Preact, Lit, Svelte, Solid, Qwik",
    },
    {
      dimension: "Backend / database",
      betterFullstack: `Optional backend, ${COMPARISON_COUNTS.databases} databases, ${COMPARISON_COUNTS.orms} ORMs`,
      competitor: "Not included",
    },
    {
      dimension: "Styling and UI",
      betterFullstack: `Tailwind, SCSS, and others, plus ${COMPARISON_COUNTS.uiLibraries} UI libraries`,
      competitor: "Template defaults",
    },
    {
      dimension: "Community templates",
      betterFullstack: "Presets maintained in the project",
      competitor: "Awesome Vite list, fetched with tools such as tiged",
    },
    {
      dimension: "Interfaces",
      betterFullstack: "CLI, visual web builder, MCP server for AI agents",
      competitor: "CLI (interactive prompts or --template)",
    },
  ],
  sections: [
    {
      heading: "What create-vite gives you",
      paragraphs: [
        "Run `npm create vite@latest` (or the yarn, pnpm, bun, or deno equivalent) and choose a template. The official presets are vanilla, vue, react, preact, lit, svelte, solid, and qwik, each with a TypeScript variant, and `--template` skips the prompt.",
        "The templates are intentionally basic. For templates that include other tools or target other frameworks, the Vite guide points to the community-maintained Awesome Vite list.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        `Better Fullstack offers Vite-based frontends (React + Vite, Vue 3 + Vite, and a vanilla TypeScript Vite app) next to routers and meta-frameworks such as TanStack Router, React Router, Next.js, and SvelteKit. Around that frontend it can add a backend, an API layer, a database and ORM, auth, payments, testing, and deployment configuration.`,
        "The compatibility engine checks the whole selection before generation. For example, it allows only GraphQL and OpenAPI API layers with a standalone Vite frontend and suggests a React-based frontend when you want tRPC or oRPC.",
      ],
    },
    {
      heading: "When create-vite is the right choice",
      paragraphs: [
        "Pick create-vite when you want a minimal frontend project, a library playground, or a starting point you plan to shape yourself. It has few moving parts and follows the official Vite templates for each framework.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does Better Fullstack use Vite?",
      answer:
        "Yes, for several frontends. React + Vite, Vue 3 + Vite, and the vanilla TypeScript Vite option use Vite directly, and other options such as TanStack Router use Vite as their build tool.",
    },
    {
      question: "Can create-vite scaffold a backend?",
      answer:
        "No. Its official templates are frontend projects. A backend, database, or auth setup has to come from a community template or be added by hand.",
    },
    {
      question: "Which is better for a quick frontend prototype?",
      answer:
        "create-vite is the shorter path when you only need a frontend. Better Fullstack is the better fit when the prototype needs a backend, database, or auth from the start.",
    },
  ],
};

const createExpoApp: CompetitorComparison = {
  slug: "create-expo-app",
  competitorName: "create-expo-app",
  competitorUrl: "https://docs.expo.dev/more/create-expo/",
  competitorRepo: "https://github.com/expo/expo/tree/main/packages/create-expo",
  title: "Better Fullstack vs create-expo-app: 2026 Comparison",
  description:
    "create-expo-app starts a new Expo and React Native project. Better Fullstack scaffolds Expo apps with mobile libraries, plus web and backend parts in the same project. A sourced comparison.",
  heading: "Better Fullstack vs create-expo-app",
  factsCheckedOn: "2026-10-06",
  intro: [
    "create-expo-app is Expo's official command-line tool to \"create and set up a new Expo and React Native project\". Its templates range from a blank app to the default template with Expo Router and TypeScript, and it can also start from any project in the expo/examples repository.",
    "Better Fullstack includes Expo as one of its frontend options. Besides the app itself, it can configure navigation, styling, device storage, testing, push notifications, over-the-air updates, and a set of Expo libraries, and it can place the mobile app next to a web app and a backend in one monorepo.",
  ],
  rows: [
    {
      dimension: "Scope",
      betterFullstack: "Mobile app, optionally with web and backend apps",
      competitor: "An Expo and React Native app",
    },
    {
      dimension: "Starting points",
      betterFullstack: "Expo + StyleSheet, Expo + Uniwind, Expo + Unistyles",
      competitor: "default, blank, blank-typescript, tabs, bare-minimum, or an expo/examples project",
    },
    {
      dimension: "Navigation",
      betterFullstack: "Expo Router or React Navigation",
      competitor: "Expo Router in the default and tabs templates",
    },
    {
      dimension: "UI and styling",
      betterFullstack: "Tamagui, gluestack-ui, Uniwind, Unistyles",
      competitor: "Template defaults or examples",
    },
    {
      dimension: "Device features",
      betterFullstack: "MMKV, push notifications, OTA updates, deep linking, Expo libraries",
      competitor: "Added after scaffolding",
    },
    {
      dimension: "Backend / API",
      betterFullstack: `${COMPARISON_COUNTS.apis} API options, backends across ${ECOSYSTEM_COUNT_LABEL} ecosystems`,
      competitor: "Not included",
    },
    {
      dimension: "Interfaces",
      betterFullstack: "CLI, visual web builder, MCP server for AI agents",
      competitor: "CLI (interactive prompts or flags)",
    },
  ],
  sections: [
    {
      heading: "What create-expo-app gives you",
      paragraphs: [
        "The default template is a multi-screen app with Expo Router and TypeScript. The tabs template adds file-based tab navigation, blank and blank-typescript keep dependencies minimal, and bare-minimum includes the native directories. The --example flag starts from a project in the expo/examples repository, --yes accepts the defaults, and the tool also writes an AGENTS.md file unless you pass --no-agents-md.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        "Better Fullstack treats the mobile app as part of a larger selection. You choose the styling approach (StyleSheet, Uniwind, or Unistyles), navigation (Expo Router or React Navigation), and optional pieces such as Tamagui or gluestack-ui, MMKV storage, Maestro or React Native Testing Library, expo-notifications, expo-updates, expo-linking, and Expo libraries like expo-camera or expo-location.",
        "The same command can add a web frontend and a backend with an API layer, auth, and payments (including RevenueCat), so the mobile and web clients share one project and one set of compatibility rules.",
      ],
    },
    {
      heading: "When create-expo-app is the right choice",
      paragraphs: [
        "Pick create-expo-app when you are building a standalone mobile app and want to follow the Expo documentation step by step, or when an existing example in expo/examples already matches what you need.",
      ],
    },
    {
      heading: "Try the closest Better Fullstack equivalent",
      paragraphs: [
        "The expo-bare preset scaffolds an Expo app with no backend: `bun create better-fullstack@latest my-app --template expo-bare`. The uniwind preset does the same with Uniwind styling.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does Better Fullstack generate a standard Expo project?",
      answer:
        "Yes. The mobile options generate Expo and React Native code that uses the libraries you selected directly, so the usual Expo tooling and documentation apply.",
    },
    {
      question: "Can create-expo-app set up a backend?",
      answer:
        "Its templates are mobile apps. A backend can come from an example in expo/examples or be set up separately.",
    },
    {
      question: "Can one Better Fullstack project contain a web app and a mobile app?",
      answer:
        "Yes. A project can include a web frontend and an Expo app side by side, sharing a backend and API layer.",
    },
  ],
};

const createTurbo: CompetitorComparison = {
  slug: "create-turbo",
  competitorName: "create-turbo",
  competitorUrl: "https://turborepo.dev/docs/reference/create-turbo",
  competitorRepo: "https://github.com/vercel/turborepo/tree/main/packages/create-turbo",
  title: "Better Fullstack vs create-turbo: 2026 Comparison",
  description: `create-turbo starts a new Turborepo monorepo from an example. Better Fullstack generates a Turborepo monorepo whose apps come from ${OPTION_COUNT_LABEL} options. A sourced comparison.`,
  heading: "Better Fullstack vs create-turbo",
  factsCheckedOn: "2026-10-06",
  intro: [
    "create-turbo is the official way to start a Turborepo monorepo. Its default example contains two Next.js apps, a shared React component package, and shared ESLint and TypeScript configuration, and --example can start from any other Turborepo example or a GitHub URL.",
    "Better Fullstack also generates monorepos with Turborepo by default. The difference is what goes inside: instead of a fixed example, the apps and packages come from the stack you select, such as a web frontend, a backend, a mobile app, a database package, and an auth setup, all wired together.",
  ],
  rows: [
    {
      dimension: "Focus",
      betterFullstack: "The apps and integrations inside the monorepo",
      competitor: "The monorepo structure and task runner",
    },
    {
      dimension: "Default contents",
      betterFullstack: "Whatever stack you select",
      competitor: "Two Next.js apps, a shared UI package, ESLint and TypeScript configs",
    },
    {
      dimension: "Language ecosystems",
      betterFullstack: ECOSYSTEM_LIST,
      competitor: "JavaScript and TypeScript examples",
    },
    {
      dimension: "Monorepo tool",
      betterFullstack: "Turborepo by default, Nx as an alternative, or a single-app layout for simple apps",
      competitor: "Turborepo",
    },
    {
      dimension: "Starting points",
      betterFullstack: "Option catalog, presets, or a visual builder",
      competitor: "Core-maintained and community-maintained examples, or a GitHub URL",
    },
    {
      dimension: "Interfaces",
      betterFullstack: "CLI, visual web builder, MCP server for AI agents",
      competitor: "CLI",
    },
  ],
  sections: [
    {
      heading: "What create-turbo gives you",
      paragraphs: [
        "Running `npx create-turbo@latest` creates the default example: `docs` and `web` Next.js apps, a `@repo/ui` component library shared by both, `@repo/eslint-config`, and `@repo/typescript-config`, with TypeScript, ESLint, and Prettier set up. Flags select the package manager, a Turborepo version, or a different example, and the Turborepo docs list core-maintained and community-maintained examples.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        "Better Fullstack uses Turborepo as the default task runner for the monorepos it generates. It can use Nx instead, and simple Next.js or TanStack Start apps can use a flat single-app layout. The apps inside are built from your selections: a frontend, a backend, an API layer, a database and ORM, auth, payments, and other integrations, with the shared packages and task configuration that combination needs.",
        `It also reaches past JavaScript. With ${ECOSYSTEM_COUNT_LABEL} ecosystems in the catalog, a project can combine a TypeScript web app with a backend written in another supported language.`,
      ],
    },
    {
      heading: "When create-turbo is the right choice",
      paragraphs: [
        "Pick create-turbo when you want to learn Turborepo from its reference layout, when one of its examples already matches your apps, or when you plan to move existing packages into a new monorepo yourself.",
      ],
    },
  ],
  faqs: [
    {
      question: "Do Better Fullstack projects use Turborepo?",
      answer:
        "By default, yes. Monorepo projects include Turborepo configuration. You can choose Nx instead, and simple Next.js or TanStack Start apps can use a single-app layout without a monorepo tool.",
    },
    {
      question: "Can create-turbo add a database or auth?",
      answer:
        "Not as a prompt. Those pieces come from the example you pick, such as with-prisma, or from libraries you add after scaffolding.",
    },
    {
      question: "Can I add Turborepo to an existing project instead?",
      answer:
        "Yes. The Turborepo documentation describes adding it to an existing repository, which is often simpler than scaffolding a new one when the code already exists.",
    },
  ],
};

const nx: CompetitorComparison = {
  slug: "nx",
  competitorName: "Nx",
  competitorUrl: "https://nx.dev/docs/reference/create-nx-workspace",
  competitorRepo: "https://github.com/nrwl/nx",
  title: "Better Fullstack vs Nx (create-nx-workspace): 2026 Comparison",
  description: `create-nx-workspace starts an Nx workspace from a framework preset. Better Fullstack scaffolds an app stack from ${OPTION_COUNT_LABEL} options and can use Nx as its monorepo tool. A sourced comparison.`,
  heading: "Better Fullstack vs Nx",
  factsCheckedOn: "2026-10-06",
  intro: [
    "Nx describes itself as \"a build system for JavaScript and TypeScript monorepos, with plugins extending it to any language\". Its create-nx-workspace command starts a new workspace from a preset for frameworks such as React, Angular, Vue, Next.js, Nuxt, Expo, Express, or Nest, or from a template repository.",
    "Better Fullstack is a project generator, not a build system. It chooses and wires the libraries in each app, and it can write an Nx configuration for the result. The two tools overlap at project creation and complement each other after that.",
  ],
  rows: [
    {
      dimension: "What it is",
      betterFullstack: "Project generator with a compatibility engine",
      competitor: "Build system with caching, task orchestration, and plugins",
    },
    {
      dimension: "Starting points",
      betterFullstack: "Option catalog, presets, or a visual builder",
      competitor: "Framework presets or nrwl template repositories",
    },
    {
      dimension: "Frameworks",
      betterFullstack: "Next.js, Nuxt, SvelteKit, Astro, Angular, Expo, Hono, NestJS, and more",
      competitor: "React, Angular, Vue, Next.js, Nuxt, React Native, Expo, Express, Nest, Node",
    },
    {
      dimension: "Integrations",
      betterFullstack: `${COMPARISON_COUNTS.databases} databases, ${COMPARISON_COUNTS.authProviders} auth providers, ${COMPARISON_COUNTS.paymentProviders} payment providers, and more`,
      competitor: "Framework setup per preset",
    },
    {
      dimension: "Monorepo tool",
      betterFullstack: "Turborepo by default, Nx as an add-on",
      competitor: "Nx",
    },
    {
      dimension: "Workspace layouts",
      betterFullstack: "Monorepo, or single-app for simple apps",
      competitor: "Integrated, package-based, or standalone",
    },
    {
      dimension: "Interfaces",
      betterFullstack: "CLI, visual web builder, MCP server for AI agents",
      competitor: "CLI, Nx Console editor extension, Nx MCP server, optional Nx Cloud setup for CI",
    },
  ],
  sections: [
    {
      heading: "What create-nx-workspace gives you",
      paragraphs: [
        "Presets include react-monorepo, angular-monorepo, vue-monorepo, next, nuxt, react-native, expo, nest, express, node-monorepo, and standalone variants, and --template starts from an nrwl template repository instead. --workspaceType picks an integrated, package-based, or standalone layout, and --nxCloud configures a CI provider.",
        "After creation, Nx provides caching, task orchestration, a project graph, module boundary rules, and, through Nx Cloud, remote caching and distributed task execution.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        "Better Fullstack decides what goes inside the apps: the frontend, backend, API layer, database and ORM, auth, payments, email, job queues, and AI SDKs, with compatibility checks across all of them. It covers backends in other ecosystems too, such as Rust, Python, Go, Java, Elixir, and .NET.",
        "Selecting the Nx add-on adds the nx package and writes an nx.json with target defaults for the generated tasks, so a Better Fullstack project can run its tasks through Nx from the first commit. The generated targets do not turn on caching; enable it per target in nx.json.",
      ],
    },
    {
      heading: "When Nx is the right choice",
      paragraphs: [
        "Pick create-nx-workspace when your priority is the build system: a large monorepo, Nx plugins for your frameworks, enforced module boundaries, or Nx Cloud for CI. Nx can also be added to an existing repository.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can a Better Fullstack project use Nx?",
      answer:
        "Yes. Selecting the Nx add-on generates an nx.json for the project's build, lint, type-check, and dev tasks. Turborepo is the default if you do not choose Nx.",
    },
    {
      question: "Is Nx a replacement for Better Fullstack?",
      answer:
        "They solve different problems. Nx runs and caches tasks in a monorepo and offers framework presets to start one. Better Fullstack chooses and wires the libraries inside each app.",
    },
    {
      question: "Do both tools support React Native and Expo?",
      answer:
        "Yes. create-nx-workspace has react-native and expo presets. Better Fullstack offers Expo with a choice of styling, navigation, and mobile libraries.",
    },
  ],
};

const wasp: CompetitorComparison = {
  slug: "wasp",
  competitorName: "Wasp",
  competitorUrl: "https://wasp.sh/docs",
  competitorRepo: "https://github.com/wasp-lang/wasp",
  title: "Better Fullstack vs Wasp: 2026 Comparison",
  description: `Wasp is a full-stack framework for React, Node.js, and Prisma driven by a spec file. Better Fullstack generates plain projects from ${OPTION_COUNT_LABEL} options. A sourced comparison.`,
  heading: "Better Fullstack vs Wasp",
  factsCheckedOn: "2026-10-06",
  intro: [
    "Wasp describes itself as \"a Rails-like framework for React, Node.js, and Prisma\". You describe routes, pages, queries, and auth in a main.wasp.ts spec file, write the rest in React and Node.js, and the Wasp compiler generates the full app source. Projects start with `wasp new`.",
    `Better Fullstack is a generator rather than a framework. It writes a project that uses the libraries you selected directly, from ${OPTION_COUNT_LABEL} options across ${ECOSYSTEM_COUNT_LABEL} ecosystems, with no spec file or compiler in between.`,
  ],
  rows: [
    {
      dimension: "Model",
      betterFullstack: "One-time generator, plain library code",
      competitor: "Framework: spec file plus compiler",
    },
    {
      dimension: "Stack",
      betterFullstack: "Selectable frontend, backend, API layer, and ORM",
      competitor: "React, Node.js, Prisma",
    },
    {
      dimension: "Database",
      betterFullstack: `${COMPARISON_COUNTS.databases} databases, ${COMPARISON_COUNTS.orms} ORMs`,
      competitor: "SQLite (default, development) or PostgreSQL",
    },
    {
      dimension: "Auth",
      betterFullstack: `${COMPARISON_COUNTS.authProviders} providers (Better-Auth, Clerk, Auth.js, …)`,
      competitor: "Built in: email, username and password, Google, GitHub, Keycloak, Slack, Discord",
    },
    {
      dimension: "Starter templates",
      betterFullstack: "Presets, option catalog, or a visual builder",
      competitor: "basic, minimal, saas",
    },
    {
      dimension: "Language ecosystems",
      betterFullstack: ECOSYSTEM_LIST,
      competitor: "JavaScript or TypeScript (React and Node.js)",
    },
    {
      dimension: "Interfaces",
      betterFullstack: "CLI, visual web builder, MCP server for AI agents",
      competitor: "Wasp CLI",
    },
  ],
  sections: [
    {
      heading: "Two models: framework versus generator",
      paragraphs: [
        "Wasp keeps a high-level description of the whole app in its spec file and generates the code from it, which removes boilerplate and lets features such as full-stack auth, RPC operations, jobs, and email work together out of the box. The generated code is visible in the .wasp directory, and the app can be deployed anywhere.",
        "Better Fullstack writes the project once and then steps aside. The result is ordinary code for the libraries you picked, and later changes go through its add and update commands or through direct edits.",
      ],
    },
    {
      heading: "What Wasp gives you",
      paragraphs: [
        "A React frontend, a Node.js backend, and Prisma, with built-in auth methods, typed client-server operations, jobs, and email sending. `wasp new` offers three starters: basic (the default), minimal, and saas, which comes with auth, the ChatGPT API, Tailwind, and Stripe payments. Wasp runs on Linux, macOS, and Windows through WSL.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        `Choice at every layer. The frontend can be Next.js, SvelteKit, Nuxt, Astro, or another option, the backend can be Hono, Fastify, NestJS, or a service in another language, and the catalog includes ${COMPARISON_COUNTS.apis} API layers, ${COMPARISON_COUNTS.authProviders} auth providers, and ${COMPARISON_COUNTS.paymentProviders} payment providers. Mobile apps with Expo can sit in the same project.`,
      ],
    },
    {
      heading: "When Wasp is the right choice",
      paragraphs: [
        "Pick Wasp when React, Node.js, and Prisma are the stack you want and you prefer a framework that handles auth, operations, and jobs for you through one spec. Its saas starter is a useful base for subscription products on that stack.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does Better Fullstack have a spec file like main.wasp.ts?",
      answer:
        "It records your selections in a bts.jsonc file that the add, status, and update commands read, but your app code does not depend on it. There is no compiler step between your code and the running app.",
    },
    {
      question: "Which databases does each tool support?",
      answer: `Wasp supports SQLite for development and PostgreSQL. Better Fullstack offers ${COMPARISON_COUNTS.databases} databases, including PostgreSQL, MySQL, SQLite, and MongoDB, with ${COMPARISON_COUNTS.orms} ORMs.`,
    },
    {
      question: "Can I use a non-JavaScript backend?",
      answer:
        "Not with Wasp, which targets Node.js. Better Fullstack can generate backends in Rust, Python, Go, Java, Elixir, or .NET, alone or next to a TypeScript frontend.",
    },
  ],
};

const redwoodJs: CompetitorComparison = {
  slug: "redwoodjs",
  competitorName: "RedwoodJS",
  competitorUrl: "https://docs.redwoodjs.com/docs/quick-start",
  competitorRepo: "https://github.com/redwoodjs/graphql",
  title: "Better Fullstack vs RedwoodJS: 2026 Comparison",
  description: `RedwoodJS (now Redwood GraphQL) is a React, GraphQL, and Prisma framework. Better Fullstack can scaffold a Redwood app or another stack from ${OPTION_COUNT_LABEL} options. A sourced comparison.`,
  heading: "Better Fullstack vs RedwoodJS",
  factsCheckedOn: "2026-10-06",
  intro: [
    "RedwoodJS is an opinionated full-stack framework: a React frontend that talks to a GraphQL API, which uses Prisma to reach the database, with Jest, Pino, and Storybook included. New apps start with `yarn create redwood-app`. In April 2025 the Redwood team renamed the framework Redwood GraphQL and moved new feature work to RedwoodSDK, a separate framework for Cloudflare.",
    "Better Fullstack includes RedwoodJS as one of its frontend options, so the comparison is less either-or than for other tools. It can scaffold a Redwood app, or a different fullstack stack if you want other pieces.",
  ],
  rows: [
    {
      dimension: "Model",
      betterFullstack: "One-time generator across many stacks",
      competitor: "Full-stack framework",
    },
    {
      dimension: "Stack",
      betterFullstack: "Selectable, including RedwoodJS itself",
      competitor: "React, GraphQL, Prisma",
    },
    {
      dimension: "API layer",
      betterFullstack: `${COMPARISON_COUNTS.apis} options (tRPC, oRPC, ts-rest, OpenAPI, GraphQL, …)`,
      competitor: "Built-in GraphQL API",
    },
    {
      dimension: "Auth",
      betterFullstack: `${COMPARISON_COUNTS.authProviders} providers selected at scaffold time`,
      competitor: "Set up later with a CLI command (Auth0 and others)",
    },
    {
      dimension: "Testing and tooling",
      betterFullstack: "Vitest, Playwright, Jest, Cypress, Storybook, and more as options",
      competitor: "Jest, Storybook, and Pino logging built in",
    },
    {
      dimension: "Language ecosystems",
      betterFullstack: ECOSYSTEM_LIST,
      competitor: "JavaScript or TypeScript",
    },
    {
      dimension: "Status",
      betterFullstack: "Active releases",
      competitor: "Development winding down as of the 8.9.0 release",
    },
  ],
  sections: [
    {
      heading: "What RedwoodJS gives you",
      paragraphs: [
        "A Redwood app has a web side and an api side. The web side is React, the api side exposes a GraphQL API backed by Prisma, and the framework adds testing with Jest, logging with Pino, and a component catalog with Storybook. Setting up auth providers or Tailwind CSS is a single CLI command, and apps deploy to serverless platforms such as Netlify and Vercel or to servers and containers.",
      ],
    },
    {
      heading: "Project status, in dates",
      paragraphs: [
        "On 2025-04-04 the Redwood team announced two paths: Redwood GraphQL, the existing framework under a new name, and RedwoodSDK, a new React framework for Cloudflare. The team said Redwood GraphQL would keep receiving releases but that no new features were planned. The 8.9.0 release notes, published 2025-10-21, say development of Redwood GraphQL is winding down and point users who want further security updates and fixes to the CedarJS fork. As of 2026-10-06, 8.9.0 is the latest create-redwood-app release on npm, and the redwoodjs.com site redirects to RedwoodSDK.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        "Selecting RedwoodJS as the frontend generates a Redwood app with its web and api sides, a Prisma schema, and a sample GraphQL service. Because Redwood ships its own GraphQL API, Better Fullstack's compatibility rules require no separate backend or API layer with it.",
        `If you prefer a different combination, you can choose another frontend such as TanStack Start or Next.js with a GraphQL server such as GraphQL Yoga or Apollo Server, or another of the ${COMPARISON_COUNTS.apis} API options.`,
      ],
    },
    {
      heading: "When RedwoodJS is the right choice",
      paragraphs: [
        "RedwoodJS suits teams that already know it or maintain Redwood apps, and anyone who wants its conventions: one framework for the React web side, the GraphQL api side, and Prisma. Check the maintenance status above against how long you plan to run the project.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is RedwoodJS still maintained?",
      answer:
        "Development is winding down. The framework was renamed Redwood GraphQL in April 2025, when the team said no new features were planned and that new development moved to RedwoodSDK. The 8.9.0 release notes (2025-10-21) say development is winding down and point to the CedarJS fork for further security updates and fixes. 8.9.0 is the latest create-redwood-app release (checked 2026-10-06).",
    },
    {
      question: "Can Better Fullstack scaffold a RedwoodJS app?",
      answer:
        "Yes. RedwoodJS is one of its frontend options. Redwood's built-in GraphQL API replaces a separate backend and API layer, so those are set to none.",
    },
    {
      question: "Is RedwoodSDK the same as RedwoodJS?",
      answer:
        "No. RedwoodSDK is a separate React framework for Cloudflare from the same team. It is not a new version of RedwoodJS, and Better Fullstack's RedwoodJS option generates a Redwood GraphQL app.",
    },
  ],
};

const epicStack: CompetitorComparison = {
  slug: "epic-stack",
  competitorName: "Epic Stack",
  competitorUrl: "https://github.com/epicweb-dev/epic-stack/tree/main/docs",
  competitorRepo: "https://github.com/epicweb-dev/epic-stack",
  title: "Better Fullstack vs Epic Stack: 2026 Comparison",
  description: `The Epic Stack is one opinionated React Router app starter. Better Fullstack scaffolds a configurable stack from ${OPTION_COUNT_LABEL} options. A sourced comparison.`,
  heading: "Better Fullstack vs Epic Stack",
  factsCheckedOn: "2026-10-06",
  intro: [
    "The Epic Stack is \"an opinionated project starter and reference\" by Kent C. Dodds and contributors. `npx epicli new` creates a complete app with React Router, SQLite on Fly.io with LiteFS, Prisma, email and password auth with two-factor support, Resend email, Sentry, and a full testing setup, plus decision documents that explain many of its choices.",
    `Better Fullstack is a configurable generator. Instead of one finished app with every decision made, it lets you choose each layer from ${OPTION_COUNT_LABEL} options across ${ECOSYSTEM_COUNT_LABEL} ecosystems and checks the combination before writing files.`,
  ],
  rows: [
    {
      dimension: "Philosophy",
      betterFullstack: "Configurable catalog, compatibility-checked",
      competitor: "One opinionated stack with documented decisions",
    },
    {
      dimension: "Framework",
      betterFullstack: "Next.js, React Router, TanStack Start, SvelteKit, Nuxt, and more",
      competitor: "React Router",
    },
    {
      dimension: "Database / ORM",
      betterFullstack: `${COMPARISON_COUNTS.databases} databases, ${COMPARISON_COUNTS.orms} ORMs`,
      competitor: "SQLite with LiteFS, Prisma",
    },
    {
      dimension: "Auth",
      betterFullstack: `${COMPARISON_COUNTS.authProviders} providers (Better-Auth, Clerk, Auth.js, …)`,
      competitor: "Built-in email and password with cookie sessions, 2FA, roles",
    },
    {
      dimension: "Deployment",
      betterFullstack: `${COMPARISON_COUNTS.deployTargets} targets (Vercel, Cloudflare, Fly, Docker, …)`,
      competitor: "Fly.io with Docker and GitHub Actions",
    },
    {
      dimension: "Testing",
      betterFullstack: "Vitest, Playwright, Jest, Cypress, and more as options",
      competitor: "Playwright, Vitest, Testing Library, MSW",
    },
    {
      dimension: "After scaffolding",
      betterFullstack: "add, status, and update commands",
      competitor: "epicli update prepares patches and a prompt for an AI assistant to apply",
    },
  ],
  sections: [
    {
      heading: "What the Epic Stack gives you",
      paragraphs: [
        "A production-oriented app with most decisions already made: Fly.io deployment with multi-region SQLite through LiteFS, Prisma, email and password auth with two-factor authentication, role-based permissions, transactional email with Resend, Conform forms with Zod validation, Tigris image storage, caching, Tailwind with Radix UI, Sentry error monitoring, and CI through GitHub Actions. Decision documents in the repository explain many of these choices.",
        "Its docs are direct about updates: the generated code \"is completely yours and there is no way to update it other than making manual changes\", so you follow Epic Stack improvements and apply them yourself. The epicli tool from the same organisation helps with that: `npx epicli update` reads the Epic Stack commit recorded in your package.json, shows the upstream changes since then, and creates patches plus a prompt that you give to an AI assistant such as Cursor or Claude Code to apply them. Its README notes that the further an app diverges from the Epic Stack, the more likely those prompts run into issues.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        "Choice at every layer: the framework, backend, database, ORM, auth provider, payments, email, job queues, AI SDKs, and deployment target. Several Epic Stack pieces are available as options, including SQLite, Prisma, Resend, Conform, Tailwind, Sentry, Playwright, Vitest, MSW, and Fly deployment, but Better Fullstack does not reproduce Epic Stack features such as LiteFS replication or its built-in two-factor auth.",
        "After scaffolding, Better Fullstack records your selections and a baseline of the generated files. The add command extends the project. The update command compares that baseline with current templates and, after you confirm the reviewed plan, writes the changes itself instead of handing them to an assistant. Where its support policy allows a structured merge, such as a package.json you added a script to while the template adds a dependency, it writes the merged file; other files you edited and any conflicts are left for manual review, and a recovery point can roll the write back. Moving a project between Better Fullstack releases is still a manual-review operation while its update support policy is in qualification.",
      ],
    },
    {
      heading: "When the Epic Stack is the right choice",
      paragraphs: [
        "Pick the Epic Stack when its choices match yours and you want a finished, production-minded app with auth, email, and deployment already working, along with the reasoning behind each decision. It is also a useful reference even if you build with something else.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can I customize the Epic Stack?",
      answer:
        "Yes, by editing the generated code. Its docs suggest forking it to change the stack, and once generated the code is yours to maintain.",
    },
    {
      question: "Does Better Fullstack include two-factor auth like the Epic Stack?",
      answer:
        "Not as a built-in Better Fullstack feature. You choose an auth provider such as Better-Auth, Clerk, or Auth0 and configure its features yourself.",
    },
    {
      question: "Which is better for a team that has not picked a stack yet?",
      answer:
        "The Epic Stack removes decisions by making them for you and documenting why. Better Fullstack helps you compare options in the visual builder and generates whichever combination you settle on.",
    },
  ],
};

const BETTER_FULLSTACK_UPDATE_SUMMARY =
  "add and update commands; upgrades across releases need manual review";

const springInitializr: CompetitorComparison = {
  slug: "spring-initializr",
  competitorName: "Spring Initializr",
  competitorUrl: "https://start.spring.io",
  competitorRepo: "https://github.com/spring-io/initializr",
  title: "Better Fullstack vs Spring Initializr: 2026 Comparison",
  description:
    "Spring Initializr generates a Spring Boot project skeleton with the starters you pick. Better Fullstack scaffolds Spring Boot, Quarkus, Micronaut, or Ktor with sample code and integrations. A sourced comparison.",
  heading: "Better Fullstack vs Spring Initializr",
  factsCheckedOn: "2026-10-06",
  intro: [
    "Spring Initializr is the Spring team's project generator. Its reference documentation describes \"an extensible API to generate JVM-based projects\", and start.spring.io is the public instance. You choose a build tool, a language, a Spring Boot version, a Java version, packaging, and a list of dependencies, and it returns a project with those starters declared.",
    `Better Fullstack covers the JVM as one of ${ECOSYSTEM_COUNT_LABEL} ecosystems. Its Java ecosystem offers Spring Boot, Quarkus, Micronaut, and Ktor in Java, and Kotlin for Spring Boot and Ktor. For Spring Boot, many options also come with sample code, such as a JPA entity with its repository, service, and controller, or a Spring Security configuration.`,
  ],
  rows: [
    {
      dimension: "Scope",
      betterFullstack: "Backend with sample code, optionally next to web and mobile apps",
      competitor: "A Spring Boot project skeleton with the selected starters",
    },
    {
      dimension: "Frameworks",
      betterFullstack: "Spring Boot, Quarkus, Micronaut, Ktor",
      competitor: "Spring Boot",
    },
    {
      dimension: "Languages",
      betterFullstack: "Java, or Kotlin with Spring Boot or Ktor",
      competitor: "Java, Kotlin, or Groovy",
    },
    {
      dimension: "Build tool",
      betterFullstack: "Maven or Gradle (Kotlin DSL)",
      competitor: "Maven, or Gradle with the Groovy or Kotlin DSL",
    },
    {
      dimension: "Versions",
      betterFullstack: "Pinned per release: Spring Boot 4.0.6 and Java 21 in current templates",
      competitor: "Choice of Spring Boot version (4.1.1 by default) and Java 17, 21, 25, or 27",
    },
    {
      dimension: "Dependencies",
      betterFullstack:
        "Spring Data JPA, jOOQ, or MyBatis; Spring Security or Keycloak; Spring libraries such as Actuator, Flyway, and Kafka",
      competitor:
        "Spring starters for web, data, security, messaging, observability, Spring Cloud, cloud providers, and AI",
    },
    {
      dimension: "Database setup",
      betterFullstack: "Embedded H2 file database in PostgreSQL mode for SQL data layers",
      competitor: "The drivers you select; no generated schema or entities",
    },
    {
      dimension: "Interfaces",
      betterFullstack: "CLI, visual web builder, MCP server for AI agents",
      competitor: "Web UI, HTTP API, Spring Boot CLI, IntelliJ IDEA, VS Code, Spring Tools",
    },
  ],
  sections: [
    {
      heading: "What Spring Initializr gives you",
      paragraphs: [
        "A ready-to-build project: the Maven or Gradle build file with your starters, the build tool wrapper, an application class, a test that loads the application context, and an application properties file. It does not write controllers, entities, or a frontend; those come next, in your own code. On start.spring.io, the Share option creates a link to the current selection.",
        "The same service is reachable in several ways: `curl https://start.spring.io/starter.zip` with dependency parameters, the Spring Boot CLI's init command, the Spring Boot wizard in IntelliJ IDEA, Microsoft's Spring Initializr extension for VS Code, and Spring Tools for Eclipse and VS Code. Organizations can run their own customized instance with the spring-io/initializr library.",
      ],
    },
    {
      heading: "Keeping a Spring project current",
      paragraphs: [
        "Spring Initializr creates new projects. For upgrades, the OpenRewrite community maintains rewrite-spring recipes, and Broadcom's commercial Spring Application Advisor, part of its Spring Enterprise offering, applies OpenRewrite-based upgrades incrementally.",
        "Better Fullstack records your selections in bts.jsonc, and its update command plans template changes for review. Upgrades across Better Fullstack releases are not yet a supported path and require manual review.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        "A choice of JVM framework beyond Spring Boot, plus code for the options you pick: with Spring Data JPA you get an AppUser entity, repository, service, and REST controller, and options such as Spring Security, Spring GraphQL, gRPC, and Flyway or Liquibase come with their configuration. Testing options include JUnit 5, Mockito, Testcontainers, AssertJ, REST Assured, WireMock, Awaitility, ArchUnit, and jqwik.",
        "In a multi-ecosystem project, the Spring Boot backend can sit next to a TypeScript web frontend or a mobile app, with one set of compatibility rules across them.",
      ],
    },
    {
      heading: "Where Spring Initializr is ahead",
      paragraphs: [
        "Its Spring catalog is larger and follows Spring releases closely: Spring Cloud, Azure and Google Cloud integrations, Spring AI starters, Groovy, War packaging, and a choice of Spring Boot and Java versions. Better Fullstack pins the versions in its templates, and its SQL data layers run on an embedded H2 database, so moving to PostgreSQL means adding the driver and changing the datasource yourself.",
        "Pick Spring Initializr when you want the official starting point for a Spring Boot app, with exactly the starters you name and no sample code to remove.",
      ],
    },
    {
      heading: "Try the closest Better Fullstack equivalent",
      paragraphs: [
        "The java-spring preset scaffolds Spring Boot with Maven and JUnit 5: `bun create better-fullstack@latest my-app --template java-spring`. The java-jpa preset adds Spring Data JPA, Flyway, and validation.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does Better Fullstack use start.spring.io?",
      answer:
        "No. Better Fullstack generates Java projects from its own templates, so the build file, configuration, and sample code match the other options you selected.",
    },
    {
      question: "Which Spring Boot version does each tool generate?",
      answer:
        "Spring Initializr lets you choose; its default was 4.1.1 on 2026-10-06. Better Fullstack's current templates pin Spring Boot 4.0.6 with Java 21, which you can change in pom.xml or build.gradle.kts after generation.",
    },
    {
      question: "Can I use Kotlin with both tools?",
      answer:
        "Yes. Spring Initializr offers Kotlin for any Spring Boot project. Better Fullstack supports Kotlin with Spring Boot and Ktor, and its Kotlin scaffold supports Spring Data JPA and Spring GraphQL but not jOOQ, MyBatis, gRPC, or OpenAPI Generator.",
    },
  ],
};

const jhipster: CompetitorComparison = {
  slug: "jhipster",
  competitorName: "JHipster",
  competitorUrl: "https://www.jhipster.tech",
  competitorRepo: "https://github.com/jhipster/generator-jhipster",
  title: "Better Fullstack vs JHipster: 2026 Comparison",
  description: `JHipster generates Spring Boot apps with an Angular, React, or Vue frontend and entities from JDL. Better Fullstack scaffolds a configurable stack across ${ECOSYSTEM_COUNT_LABEL} ecosystems. A sourced comparison.`,
  heading: "Better Fullstack vs JHipster",
  factsCheckedOn: "2026-10-06",
  intro: [
    "JHipster describes itself as \"a development platform to quickly generate, develop, & deploy modern web applications & microservice architectures\". Its core generator produces a Spring Boot backend with an Angular, React, or Vue frontend, and its JHipster Domain Language (JDL) describes entities and relationships so JHipster can generate the database layer, REST API, and UI screens for them.",
    "Better Fullstack is a configurable project generator. Its Java ecosystem scaffolds Spring Boot, Quarkus, Micronaut, or Ktor backends with a choice of libraries, and a multi-ecosystem project can pair that backend with a TypeScript web frontend. It does not generate entities from a domain model.",
  ],
  rows: [
    {
      dimension: "Model",
      betterFullstack: "Configurable stack generator",
      competitor: "Application generator with entity generation",
    },
    {
      dimension: "Backend",
      betterFullstack: "Spring Boot, Quarkus, Micronaut, or Ktor in Java; Kotlin with Spring Boot or Ktor",
      competitor: "Spring Boot; blueprints for Kotlin, Node.js (NestJS), Quarkus, Micronaut, .NET",
    },
    {
      dimension: "Frontend",
      betterFullstack: "A TypeScript web frontend from the catalog, in a multi-ecosystem project",
      competitor: "Angular, React, or Vue in the same application",
    },
    {
      dimension: "Databases",
      betterFullstack:
        "Spring Data JPA, jOOQ, or MyBatis on embedded H2 (PostgreSQL mode); Spring Data libraries for MongoDB, Redis, and others",
      competitor:
        "PostgreSQL, MySQL, MariaDB, Oracle, MSSQL, H2, MongoDB, Cassandra, Couchbase, Neo4j",
    },
    {
      dimension: "Entities",
      betterFullstack: "One sample entity; no domain-model generator",
      competitor: "JDL files, JDL Studio, and the jhipster jdl command",
    },
    {
      dimension: "Architecture",
      betterFullstack: "One backend, or several services in a multi-ecosystem project",
      competitor: "Monolith, microservices, and gateway, with Consul or Eureka",
    },
    {
      dimension: "Upgrades",
      betterFullstack: BETTER_FULLSTACK_UPDATE_SUMMARY,
      competitor: "jhipster upgrade regenerates the app and merges it through Git",
    },
    {
      dimension: "Interfaces",
      betterFullstack: "CLI, visual web builder, MCP server for AI agents",
      competitor: "CLI, JHipster Online, JDL Studio, jhipster-mcp server",
    },
  ],
  sections: [
    {
      heading: "What JHipster gives you",
      paragraphs: [
        "A complete application: authentication with JWT, OAuth 2.0 and OpenID Connect (Keycloak by default, with Okta and Auth0 documented), or sessions; an optional reactive stack with Spring WebFlux; and test setups including Cypress or Playwright, Cucumber, and Gatling. Sub-generators add Docker Compose and Kubernetes (including Helm and Knative) configuration, Heroku deployment, and CI pipelines for GitHub Actions, GitLab, Jenkins, and others.",
        "Entities are where JHipster differs most from a scaffolder. You describe entities and relationships in JDL, by hand or in JDL Studio, and `jhipster jdl` generates the JPA entities, Spring server-side components, and frontend screens for them. Blueprints replace parts of the generated code; the official list includes Kotlin, Node.js with NestJS, Quarkus, Micronaut, and .NET, and their release status varies, so check each blueprint's repository.",
      ],
    },
    {
      heading: "Project status, in dates",
      paragraphs: [
        "JHipster 9.0.0 was released on 2026-03-11 with Spring Boot 4 support and Java 21 as the minimum. Releases have continued since, with 9.4.0 published on 2026-09-18, which added Playwright support.",
        "Upgrades are a built-in workflow: `npx generator-jhipster@latest upgrade` generates the app with the old and new versions on a separate branch and merges the result, so you resolve any conflicts in Git.",
      ],
    },
    {
      heading: "Tools around JHipster",
      paragraphs: [
        "JHipster Online (start.jhipster.tech) generates applications in the browser, and JDL Studio draws and edits JDL models. The JHipster IDE extension for Eclipse and VS Code adds JDL editing support; its latest release is from 2023-01-07. The jhipster-mcp repository in the JHipster GitHub organization provides an MCP server that lets AI agents drive the JHipster CLI with JDL; version 1.0.0 was published in May 2026.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        "A choice of JVM framework and library set instead of one Spring Boot architecture: Quarkus, Micronaut, or Ktor, data layers such as jOOQ or MyBatis, Spring GraphQL, gRPC, OpenAPI Generator, and Spring libraries such as Actuator, Kafka, and Spring Session, all checked by the same compatibility rules.",
        `Beyond Java, a project can combine a backend with a web frontend such as Next.js, SvelteKit, or Nuxt and a mobile app, chosen from ${OPTION_COUNT_LABEL} options across ${ECOSYSTEM_COUNT_LABEL} ecosystems.`,
      ],
    },
    {
      heading: "When JHipster is the right choice",
      paragraphs: [
        "Pick JHipster when you want a working Spring Boot application with CRUD screens generated from a domain model, a microservice architecture with a gateway, a wide choice of production databases, or a dedicated upgrade command. Better Fullstack does not generate entity screens, a Java-hosted frontend, or microservice gateways.",
      ],
    },
  ],
  faqs: [
    {
      question: "Can Better Fullstack generate entities from JDL?",
      answer:
        "No. Better Fullstack has no domain-model or entity generator. With Spring Data JPA it writes one sample entity with its repository, service, and controller, and you add further entities yourself.",
    },
    {
      question: "Is JHipster still maintained?",
      answer:
        "Yes. JHipster 9.0.0 was released on 2026-03-11 and 9.4.0 on 2026-09-18, with regular releases in between (checked 2026-10-06).",
    },
    {
      question: "Can both tools upgrade a generated project?",
      answer:
        "JHipster's upgrade command regenerates the project with the new version and merges it through Git. Better Fullstack's update command plans changes from current templates for review, but upgrades across its own releases are not yet a supported path and require manual review.",
    },
  ],
};

const cookiecutter: CompetitorComparison = {
  slug: "cookiecutter",
  competitorName: "Cookiecutter",
  competitorUrl: "https://cookiecutter.readthedocs.io",
  competitorRepo: "https://github.com/cookiecutter/cookiecutter",
  title: "Better Fullstack vs Cookiecutter: 2026 Comparison",
  description:
    "Cookiecutter renders project templates such as cookiecutter-django. Better Fullstack scaffolds Python backends from a catalog of frameworks and libraries. A sourced comparison for Python web projects.",
  heading: "Better Fullstack vs Cookiecutter",
  factsCheckedOn: "2026-10-06",
  intro: [
    "Cookiecutter \"creates projects from cookiecutters (project templates)\". It is a command-line template engine: a template is a directory of Jinja2-templated files plus a cookiecutter.json file that defines the questions, and it can come from a local folder, a Git repository, or a zip file. Cookiecutter has no opinion about frameworks; that comes from the template you choose.",
    "For Python web projects, a common choice is cookiecutter-django, a separate project with its own maintainers and releases, hosted in the same GitHub organization. This page compares Better Fullstack's Python ecosystem with Cookiecutter itself and with cookiecutter-django as a concrete example.",
  ],
  rows: [
    {
      dimension: "What it is",
      betterFullstack: "Project generator with its own option catalog",
      competitor: "Template engine; templates are separate projects",
    },
    {
      dimension: "Python frameworks",
      betterFullstack: "FastAPI, Django, Flask, Litestar, Starlette, aiohttp, Streamlit",
      competitor: "Whatever the template provides (cookiecutter-django: Django)",
    },
    {
      dimension: "Data",
      betterFullstack:
        "SQLAlchemy, SQLModel, Tortoise ORM, or Peewee with SQLite or PostgreSQL; PyMongo with MongoDB",
      competitor: "cookiecutter-django: Django ORM with PostgreSQL 14 to 18",
    },
    {
      dimension: "Auth",
      betterFullstack: "Authlib, PyJWT, or FastAPI Users",
      competitor: "cookiecutter-django: django-allauth with a custom user model",
    },
    {
      dimension: "Background jobs",
      betterFullstack: "Celery, RQ, Dramatiq, Huey, or Taskiq",
      competitor: "cookiecutter-django: optional Celery",
    },
    {
      dimension: "Containers",
      betterFullstack: "Docker Compose add-on",
      competitor: "cookiecutter-django: Docker Compose for development and production, with Traefik",
    },
    {
      dimension: "Customization",
      betterFullstack: "Choose options; templates are maintained in Better Fullstack",
      competitor: "Write or fork any template, with Jinja2 and hook scripts",
    },
    {
      dimension: "Updating a project",
      betterFullstack: BETTER_FULLSTACK_UPDATE_SUMMARY,
      competitor: "Replay for regenerating; updates through separate tools such as cruft",
    },
  ],
  sections: [
    {
      heading: "What Cookiecutter gives you",
      paragraphs: [
        "Templates use Jinja2 for file contents and file names, and cookiecutter.json defines the variables, including choice and boolean questions. Hooks run before the prompts, before generation, or after generation; Python scripts are recommended, and if a hook fails, generation stops and the output directory is cleaned up. Replay stores your answers so you can run the same template again, for example after it has been updated.",
        "There is no central template registry. The Cookiecutter docs point to a GitHub search for templates and list a few, including cookiecutter-pypackage and cookiecutter-django. Cookiecutter 2.7.1 was released on 2026-03-04, two days after 2.7.0; the release before those was 2.6.0, on 2024-02-21.",
      ],
    },
    {
      heading: "cookiecutter-django in brief",
      paragraphs: [
        "cookiecutter-django targets Django 6.0 and Python 3.14. It sets up django-allauth registration with a custom user model, settings through django-environ, PostgreSQL, optional Celery, optional Docker Compose for development and production with Traefik, Django REST Framework or Django Ninja, email through Anymail with a choice of providers, media storage on AWS, Google Cloud, or Azure, optional Sentry, and CI configuration for GitHub, GitLab, and others. It publishes date-based releases often; 2026.10.5 was released on 2026-10-06.",
        "One note on FastAPI templates: FastAPI's full-stack-fastapi-template no longer uses Cookiecutter. It moved to Copier and then, in its 0.11.0 release (2026-08-11), removed Copier as well; its README now asks you to create a repository from it as a GitHub template.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        "A choice of Python framework and libraries in one command: an ORM with Alembic migrations for SQLAlchemy or SQLModel, auth, a task queue, Strawberry or Ariadne for GraphQL, AI SDKs such as LangChain, LlamaIndex, the OpenAI and Anthropic SDKs, and Pydantic AI, Ruff, mypy, or Pyright for code quality, pytest, and uv or Poetry for packaging. The compatibility rules adjust combinations that do not fit, such as DRF without Django.",
        "A Python backend can also sit next to a TypeScript web frontend or a mobile app in a multi-ecosystem project.",
      ],
    },
    {
      heading: "Where Cookiecutter is ahead",
      paragraphs: [
        "Any template can be used or written, so Cookiecutter covers projects far outside Better Fullstack's catalog, and cookiecutter-django is a much more complete Django starting point. Better Fullstack's Django option generates a small Django app configured in a single module, with optional Django REST Framework or Django Ninja; it does not set up Django ORM models, the admin, django-allauth, or a production Docker setup.",
        "Pick Cookiecutter with cookiecutter-django when you want a full Django project with its conventions. Pick Better Fullstack when a Python API is one part of a larger stack, or when you want FastAPI, Litestar, or Flask with libraries chosen up front.",
      ],
    },
    {
      heading: "Try the closest Better Fullstack equivalent",
      paragraphs: [
        "The python-fastapi preset scaffolds FastAPI with SQLAlchemy, Pydantic, PostgreSQL, and Ruff: `bun create better-fullstack@latest my-app --template python-fastapi`. The python-django preset scaffolds the single-module Django app with Django REST Framework.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is cookiecutter-django part of Cookiecutter?",
      answer:
        "No. It is a separate project in the same GitHub organization, with its own maintainers and release schedule. Cookiecutter is the engine that renders it.",
    },
    {
      question: "Can Cookiecutter update an existing project?",
      answer:
        "Cookiecutter's replay feature stores your answers so you can regenerate from an updated template. Applying template changes to an existing project is handled by separate tools: cruft works with Cookiecutter templates, and Copier is a different template tool with updates built in.",
    },
    {
      question: "Which should I use for a Django project?",
      answer:
        "cookiecutter-django, if you want a full Django project with auth, Docker, and production settings in place. Better Fullstack's Django option is a minimal starting point and fits better when Django serves an API inside a larger multi-part stack.",
    },
  ],
};

const dotnetNew: CompetitorComparison = {
  slug: "dotnet-new",
  competitorName: "dotnet new",
  competitorUrl: "https://learn.microsoft.com/en-us/dotnet/core/tools/dotnet-new",
  competitorRepo: "https://github.com/dotnet/sdk",
  title: "Better Fullstack vs dotnet new: 2026 Comparison",
  description:
    "dotnet new creates .NET projects from the SDK's built-in templates and NuGet template packages. Better Fullstack scaffolds ASP.NET Core with data access, auth, and libraries chosen up front. A sourced comparison.",
  heading: "Better Fullstack vs dotnet new",
  factsCheckedOn: "2026-10-06",
  intro: [
    "`dotnet new` is the .NET CLI command that \"creates a new project, configuration file, or solution based on the specified template\". The .NET SDK ships templates for ASP.NET Core (web, webapi, mvc, webapp, blazor, grpc), worker services, console apps, class libraries, and xUnit, NUnit, and MSTest projects, and more templates install from NuGet with `dotnet new install`.",
    "Better Fullstack's .NET ecosystem generates an ASP.NET Core project from its own templates, with the data access library, auth library, API style, background jobs, logging, caching, tests, and deployment files chosen at the same time and checked for compatibility.",
  ],
  rows: [
    {
      dimension: "Scope",
      betterFullstack: "An ASP.NET Core project with selected libraries, optionally next to web and mobile apps",
      competitor: "One project, item, or solution per template",
    },
    {
      dimension: "App types",
      betterFullstack: "Minimal APIs, MVC, or Blazor; Blazor WebAssembly or Blazor Web App frontends",
      competitor:
        "Empty web, Web API, Native AOT API, MVC, Razor Pages, Blazor, gRPC, worker, console, class library, tests",
    },
    {
      dimension: "Data access",
      betterFullstack: "EF Core, Dapper, or linq2db with PostgreSQL or SQLite",
      competitor: "An Identity database (SQLite or LocalDB) when Individual auth is selected",
    },
    {
      dimension: "Auth",
      betterFullstack: "ASP.NET Core Identity services, Duende IdentityServer, or Auth0",
      competitor: "Individual accounts, Microsoft Entra ID, or Windows auth, depending on the template",
    },
    {
      dimension: "Libraries",
      betterFullstack:
        "MediatR, FluentValidation, Hangfire, Quartz.NET, SignalR, Serilog, OpenTelemetry, Polly, MassTransit, and more",
      competitor: "Added after creation with dotnet add package",
    },
    {
      dimension: "Multi-service apps",
      betterFullstack: "Backends, frontends, and mobile apps in one multi-ecosystem project",
      competitor: "Aspire templates, installed with Aspire.ProjectTemplates",
    },
    {
      dimension: "Interfaces",
      betterFullstack: "CLI, visual web builder, MCP server for AI agents",
      competitor: "CLI, plus new-project dialogs in Visual Studio, VS Code, and Rider",
    },
  ],
  sections: [
    {
      heading: "What dotnet new gives you",
      paragraphs: [
        "`dotnet new webapi` creates a minimal API project with an OpenAPI document enabled (`--no-openapi` turns it off, `--use-controllers` switches to controllers). The mvc, webapp, and blazor templates accept `--auth Individual`, which sets up ASP.NET Core Identity with a SQLite database by default or LocalDB with `--use-local-db`. The Angular and React SPA templates have been discontinued since the .NET 8 SDK; Visual Studio now provides JavaScript SPA templates with an ASP.NET Core backend.",
        "`dotnet new search` finds template packages on NuGet, `dotnet new install` adds them, and `dotnet new update` updates installed packages. Built-in templates update with the SDK: .NET 10, a long-term support release, came out on 2025-11-11, and its latest patch as of this check was released on 2026-09-08.",
      ],
    },
    {
      heading: "Templates for AI and distributed apps",
      paragraphs: [
        "Microsoft publishes template packages beyond the SDK: Aspire templates for multi-service apps, an MCP server template (`dotnet new mcpserver`, in preview), and an AI chat web app template (`dotnet new aichatweb`). Templates installed this way also appear in the Visual Studio and VS Code new-project flows.",
      ],
    },
    {
      heading: "Upgrading existing projects",
      paragraphs: [
        "dotnet new creates projects; it does not update projects created from older templates. Microsoft's docs state that the .NET Upgrade Assistant is officially deprecated and point to the GitHub Copilot modernization agent in Visual Studio instead.",
        "Better Fullstack records your selections in bts.jsonc, and its update command plans template changes for review. Upgrades across Better Fullstack releases are not yet a supported path and require manual review.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        "One selection covers the libraries you would otherwise add one by one: EF Core, Dapper, or linq2db; Hot Chocolate GraphQL or gRPC; Hangfire, Quartz.NET, or hosted services; SignalR; Serilog, NLog, OpenTelemetry, and health checks; Redis or in-memory caching; xUnit, NUnit, Moq, and Testcontainers; and Docker, Azure, or AWS deployment files. The generated project targets net10.0.",
        "A .NET backend can also sit next to a TypeScript web frontend such as React or a mobile app in a multi-ecosystem project.",
      ],
    },
    {
      heading: "Where dotnet new is ahead",
      paragraphs: [
        "It is the official tool, ships with the SDK, works in Visual Studio, VS Code, and Rider, and can use any template package on NuGet. Its Individual auth option gives you working register and login pages; Better Fullstack's ASP.NET Core Identity option registers Identity services with an EF Core store but does not generate login pages or endpoints. Better Fullstack also has no Aspire option.",
      ],
    },
    {
      heading: "Try the closest Better Fullstack equivalent",
      paragraphs: [
        "The dotnet-minimal-api preset scaffolds Minimal APIs with EF Core, ASP.NET Core Identity, SignalR, xUnit, Serilog, and a Dockerfile: `bun create better-fullstack@latest my-app --template dotnet-minimal-api`.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does Better Fullstack call dotnet new?",
      answer:
        "No. It generates the project from its own templates, so Program.cs and the project file already reference the libraries you selected.",
    },
    {
      question: "Can dotnet new update a project I already created?",
      answer:
        "No. `dotnet new update` updates installed template packages, not projects created from them. For framework upgrades, Microsoft points to the GitHub Copilot modernization agent, since the .NET Upgrade Assistant is deprecated.",
    },
    {
      question: "Does dotnet new still include React and Angular templates?",
      answer:
        "Not as built-in templates; they have been discontinued since the .NET 8 SDK, and Visual Studio provides SPA templates instead. Better Fullstack can pair a .NET backend with a TypeScript frontend such as React in a multi-ecosystem project.",
    },
  ],
};

const cargoGenerate: CompetitorComparison = {
  slug: "cargo-generate",
  competitorName: "cargo-generate",
  competitorUrl: "https://cargo-generate.github.io/cargo-generate/",
  competitorRepo: "https://github.com/cargo-generate/cargo-generate",
  title: "Better Fullstack vs cargo-generate: 2026 Comparison",
  description:
    "cargo-generate creates Rust projects from Git repository templates. Better Fullstack scaffolds Rust web services and apps from a catalog of frameworks and crates. A sourced comparison.",
  heading: "Better Fullstack vs cargo-generate",
  factsCheckedOn: "2026-10-06",
  intro: [
    "cargo-generate is \"a developer tool to help you get up and running quickly with a new Rust project by leveraging a pre-existing git repository as a template\". It is framework-agnostic: templates are separate repositories, written with Liquid placeholders and optional Rhai scripts, and published by their own projects.",
    "Better Fullstack's Rust ecosystem works from a fixed catalog instead. You choose a web framework, a frontend crate, a database layer, an API layer, and libraries, and it generates a Cargo workspace with a crate for each piece, after checking the selection for compatibility. The frontend crate is a starter page that does not call the backend yet; the generator writes the connection details into the docs and example environment file.",
  ],
  rows: [
    {
      dimension: "What it is",
      betterFullstack: "Project generator with its own option catalog",
      competitor: "Template engine for Rust projects",
    },
    {
      dimension: "Templates",
      betterFullstack: "Maintained in Better Fullstack",
      competitor: "Any Git repository or local folder; found through the cargo-generate GitHub topic",
    },
    {
      dimension: "Web frameworks",
      betterFullstack: "Axum, Actix Web, Rocket, Poem, Loco, Warp, Salvo",
      competitor: "Whatever the template provides",
    },
    {
      dimension: "Frontend",
      betterFullstack: "Leptos, Dioxus, or Yew crate in the same workspace",
      competitor: "Templates such as leptos-rs/start-axum",
    },
    {
      dimension: "Data and APIs",
      betterFullstack:
        "SeaORM, SQLx, Diesel, MongoDB, rusqlite, or tokio-postgres; Tonic, async-graphql, or jsonrpsee",
      competitor: "Whatever the template provides",
    },
    {
      dimension: "Template logic",
      betterFullstack: "Compatibility rules across options",
      competitor: "Liquid, placeholders, conditionals, Rhai hooks",
    },
    {
      dimension: "After generation",
      betterFullstack: BETTER_FULLSTACK_UPDATE_SUMMARY,
      competitor: "Generates once; the generated project is yours",
    },
    {
      dimension: "Interfaces",
      betterFullstack: "CLI, visual web builder, MCP server for AI agents",
      competitor: "CLI and Rust library",
    },
  ],
  sections: [
    {
      heading: "What cargo-generate gives you",
      paragraphs: [
        "A template author defines placeholders in cargo-generate.toml with prompts, choices, defaults, and regex validation, uses Liquid in file contents and names, includes or excludes files conditionally, and runs Rhai hook scripts at init, before, or after expansion. Hooks that run system commands need your approval or `--allow-commands`. Templates can come from a Git URL, a gh: shorthand, a local path, a subfolder, or a saved favorite, and `--define` with `--silent` supports non-interactive use.",
        "Install it with `cargo install cargo-generate`, cargo-binstall, or prebuilt binaries. cargo-generate is also a Rust library, and the cargo-generate organization publishes a GitHub Action that template authors use to test their templates.",
      ],
    },
    {
      heading: "Templates people use",
      paragraphs: [
        "Many Rust projects publish cargo-generate templates: ratatui/templates for terminal apps, aya-rs/aya-template for eBPF programs, knurling-rs/app-template and esp-rs/esp-idf-template for embedded targets, and leptos-rs/start-axum, which cargo-leptos uses through its `cargo leptos new` command. These are separate projects with their own maintainers.",
      ],
    },
    {
      heading: "Project status, in dates",
      paragraphs: [
        "cargo-generate 0.25.0 was released on 2026-09-18, after 0.24.0 on 2026-08-31, which moved to a pure-Rust Git stack. Releases have come every few weeks since May 2026.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        "Choices that are known to work together: a web framework, a database layer, an API layer such as Tonic with a generated proto crate or async-graphql, auth crates such as oauth2, openidconnect, or tower-sessions, caching, messaging, OpenTelemetry, and a Leptos, Dioxus, or Yew frontend crate. Optional clap and Ratatui crates add a CLI or terminal UI, and libraries such as cargo-nextest and cargo-audit come with their configuration.",
        "A Rust backend can also serve a TypeScript web frontend, or a Rust frontend crate can pair with a backend from another ecosystem, in a multi-ecosystem project.",
      ],
    },
    {
      heading: "When cargo-generate is the right choice",
      paragraphs: [
        "Pick cargo-generate when a framework or community already publishes a template for what you are building, such as embedded firmware or eBPF, or when you want to write templates for your own team. Better Fullstack only generates the web services, frontends, and CLI apps in its catalog, and you cannot point it at an arbitrary template repository.",
      ],
    },
    {
      heading: "Try the closest Better Fullstack equivalent",
      paragraphs: [
        "The rust-api preset scaffolds Axum with SeaORM and PostgreSQL: `bun create better-fullstack@latest my-app --template rust-api`. The rust-fullstack preset adds a Leptos frontend crate.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does Better Fullstack use cargo-generate?",
      answer:
        "No. It renders Rust projects from its own templates, so the generated Cargo workspace already includes the crates you selected.",
    },
    {
      question: "Can cargo-generate run without prompts?",
      answer:
        "Yes. Values can come from `--define` flags, a template values file, or environment variables, and `--silent` fails instead of prompting when a value is missing.",
    },
    {
      question: "Which should I use for a Leptos app?",
      answer:
        "For the Leptos team's starter, use `cargo leptos new` with leptos-rs/start-axum. Better Fullstack fits when you want a Leptos client crate next to a server crate with a database layer, auth, and other options chosen up front.",
    },
  ],
};

const mixPhxNew: CompetitorComparison = {
  slug: "mix-phx-new",
  competitorName: "mix phx.new",
  competitorUrl: "https://hexdocs.pm/phoenix/Mix.Tasks.Phx.New.html",
  competitorRepo: "https://github.com/phoenixframework/phoenix/tree/main/installer",
  title: "Better Fullstack vs mix phx.new: 2026 Comparison",
  description:
    "mix phx.new is Phoenix's official project generator. Better Fullstack scaffolds Phoenix or plain Elixir apps with libraries chosen up front, alongside other ecosystems. A sourced comparison.",
  heading: "Better Fullstack vs mix phx.new",
  factsCheckedOn: "2026-10-06",
  intro: [
    "`mix phx.new` \"creates a new Phoenix project\". It is installed with `mix archive.install hex phx_new` and is versioned with Phoenix itself; the current release is 1.8.15, published on 2026-09-25. A default project includes LiveView, Ecto, Tailwind CSS with daisyUI, esbuild, LiveDashboard, a Swoosh mailer, Gettext, and an AGENTS.md file for coding agents.",
    "Better Fullstack treats Elixir as one of its ecosystems. It generates a Phoenix app, with or without LiveView, or a plain Mix app from its own templates, with libraries such as Oban, Absinthe, Cachex, and PromEx chosen at the same time and checked for compatibility.",
  ],
  rows: [
    {
      dimension: "What it is",
      betterFullstack: "Multi-ecosystem generator with an Elixir option set",
      competitor: "Official Phoenix project generator",
    },
    {
      dimension: "Phoenix version",
      betterFullstack: "Phoenix 1.7 (templates pin ~> 1.7.21)",
      competitor: "Phoenix 1.8",
    },
    {
      dimension: "Defaults",
      betterFullstack: "Phoenix, Phoenix LiveView, or a plain Mix app; no asset pipeline",
      competitor: "LiveView, Ecto, Tailwind with daisyUI, esbuild, LiveDashboard, Swoosh, Gettext",
    },
    {
      dimension: "Databases",
      betterFullstack: "PostgreSQL, MySQL, or SQLite through Ecto",
      competitor: "PostgreSQL (default), MySQL, MSSQL, or SQLite3",
    },
    {
      dimension: "Auth",
      betterFullstack: "Email and password session endpoints, Ueberauth, Guardian, or Pow",
      competitor: "mix phx.gen.auth with magic-link login and sudo mode",
    },
    {
      dimension: "Libraries",
      betterFullstack:
        "Oban, Quantum, Absinthe, gRPC, OpenApiSpex, Cachex, PromEx, Sentry, Ash, and more",
      competitor: "Added to mix.exs after generation",
    },
    {
      dimension: "Code generators",
      betterFullstack: "add command for catalog options",
      competitor: "phx.gen.live, phx.gen.html, phx.gen.json, phx.gen.context, and more",
    },
    {
      dimension: "Deployment",
      betterFullstack: "Docker, Fly.io, Gigalixir, or a Mix release",
      competitor: "mix phx.gen.release --docker, plus official deployment guides",
    },
  ],
  sections: [
    {
      heading: "What mix phx.new gives you",
      paragraphs: [
        "Flags shape the project: `--database` picks postgres, mysql, mssql, or sqlite3, `--no-html` and `--no-assets` produce an API-only app, `--no-ecto`, `--no-mailer`, `--no-dashboard`, and `--no-gettext` drop those pieces, `--umbrella` splits the domain and web layers into separate apps, and `--adapter` chooses Bandit (the default) or Cowboy. The generated AGENTS.md can be skipped with `--no-agents-md`, and a precommit alias runs compilation with warnings as errors, formatting, and tests.",
        "For a machine without Elixir, Phoenix also documents a one-line installer that installs Erlang, Elixir, and Phoenix and generates an app.",
      ],
    },
    {
      heading: "Generators after phx.new",
      paragraphs: [
        "Phoenix's generators are a large part of its workflow. `mix phx.gen.live`, `phx.gen.html`, and `phx.gen.json` generate a context, schema, migration, and LiveView, HTML, or JSON interface for a resource, and since Phoenix 1.8 they use scopes for data access. `mix phx.gen.auth` generates authentication, with magic links as the default login method and a sudo mode for sensitive actions. Others cover channels, presence, notifiers, and release files with a Dockerfile.",
      ],
    },
    {
      heading: "Keeping up with Phoenix releases",
      paragraphs: [
        "The Phoenix changelog lists deprecations and potential breaking changes for each release, and `mix local.phx` updates the generator. Community tools help with the rest: PhoenixDiff shows the difference between projects generated by two Phoenix versions, and Igniter, a code generation and project patching framework from the Ash project, can run upgrade patchers that packages provide.",
        "Better Fullstack records your selections in bts.jsonc, and its update command plans template changes for review. Upgrades across Better Fullstack releases are not yet a supported path and require manual review.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        "Libraries chosen at creation time: Oban or Quantum for jobs, Absinthe, gRPC, or OpenApiSpex for APIs, Channels and Presence, Swoosh or Bamboo, Cachex, Nebulex, or Redix, OpenTelemetry, PromEx, or Sentry, Mox, Bypass, Wallaby, StreamData, and ExMachina for tests, Credo, Dialyxir, Sobelow, and mix_audit for code quality, Ash, libcluster, and Docker, Fly.io, or Gigalixir deployment files.",
        "An Elixir backend can also sit next to a TypeScript web frontend or a mobile app in a multi-ecosystem project.",
      ],
    },
    {
      heading: "Where mix phx.new is ahead",
      paragraphs: [
        "It generates the current Phoenix release, while Better Fullstack's templates pin Phoenix 1.7 and include no Tailwind or esbuild asset pipeline. Its phx.gen.auth output is a complete authentication system; Better Fullstack's phx-gen-auth option generates a small email-and-password flow with JSON session endpoints, not the output of mix phx.gen.auth. Phoenix's resource generators have no equivalent in Better Fullstack.",
        "Pick mix phx.new for a Phoenix application that follows the official guides. Pick Better Fullstack when Phoenix is one service in a larger stack, or when you want a set of Elixir libraries wired in from the start.",
      ],
    },
    {
      heading: "Try the closest Better Fullstack equivalent",
      paragraphs: [
        "The elixir-phoenix-api preset scaffolds Phoenix with Ecto SQL, a REST API, Channels, and a Dockerfile: `bun create better-fullstack@latest my-app --template elixir-phoenix-api`. The elixir-liveview-full preset adds LiveView, auth, Absinthe, and Oban.",
      ],
    },
  ],
  faqs: [
    {
      question: "Does Better Fullstack run mix phx.new?",
      answer:
        "No. It generates Elixir projects from its own templates, which currently pin Phoenix 1.7. mix phx.new generates Phoenix 1.8 projects.",
    },
    {
      question: "Do both tools write files for coding agents?",
      answer:
        "Yes. mix phx.new writes an AGENTS.md with Phoenix guidelines unless you pass --no-agents-md. Better Fullstack can write CLAUDE.md, AGENTS.md, or .cursorrules describing the selected stack.",
    },
    {
      question: "Which databases does each tool support?",
      answer:
        "mix phx.new supports PostgreSQL, MySQL, MSSQL, and SQLite3 through Ecto. Better Fullstack supports PostgreSQL, MySQL, and SQLite through Ecto.",
    },
  ],
};

export const COMPETITOR_COMPARISONS: CompetitorComparison[] = [
  createT3App,
  betterTStack,
  createNextApp,
  createVite,
  createExpoApp,
  createTurbo,
  nx,
  wasp,
  redwoodJs,
  epicStack,
  springInitializr,
  jhipster,
  cookiecutter,
  dotnetNew,
  cargoGenerate,
  mixPhxNew,
];

export function getCompetitorComparison(slug: string) {
  return COMPETITOR_COMPARISONS.find((comparison) => comparison.slug === slug);
}

function comparisonJsonLd(comparison: CompetitorComparison) {
  const url = canonicalUrl(`/compare/${comparison.slug}`);

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: comparison.heading,
        description: comparison.description,
        url,
        mainEntityOfPage: url,
        dateModified: comparison.factsCheckedOn,
        isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
        publisher: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
        about: [SITE_NAME, comparison.competitorName],
        audience: { "@type": "Audience", audienceType: "Software developers" },
        image: DEFAULT_OG_IMAGE_URL,
      },
      {
        "@type": "FAQPage",
        mainEntity: comparison.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: SITE_NAME, item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Compare", item: canonicalUrl("/compare") },
          { "@type": "ListItem", position: 3, name: comparison.heading, item: url },
        ],
      },
    ],
  };
}

export function competitorComparisonHead(comparison: CompetitorComparison) {
  const title = `${comparison.title} | ${SITE_NAME}`;
  const url = canonicalUrl(`/compare/${comparison.slug}`);

  return {
    meta: [
      { title },
      { name: "description", content: comparison.description },
      { name: "robots", content: DEFAULT_ROBOTS },
      { property: "og:title", content: title },
      { property: "og:description", content: comparison.description },
      { property: "og:type", content: "article" },
      { property: "og:url", content: url },
      { property: "og:image", content: DEFAULT_OG_IMAGE_URL },
      { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: comparison.description },
      { name: "twitter:image", content: DEFAULT_X_IMAGE_URL },
      { name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      { "script:ld+json": comparisonJsonLd(comparison) },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
