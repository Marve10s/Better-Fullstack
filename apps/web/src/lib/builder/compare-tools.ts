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
      competitor: "CLI, with optional Nx Cloud setup for CI",
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
        "Selecting the Nx add-on adds the nx package and writes an nx.json with target defaults for the generated tasks, so a Better Fullstack project can use Nx for task running and caching from the first commit.",
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
      competitor: "Maintenance releases, no new features planned",
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
        "On 2025-04-04 the Redwood team announced two paths: Redwood GraphQL, the existing framework under a new name, and RedwoodSDK, a new React framework for Cloudflare. The team said Redwood GraphQL would keep receiving releases but that no new features were planned. As of 2026-10-06, the latest create-redwood-app release on npm is 8.9.0, published 2025-10-21, and the redwoodjs.com site redirects to RedwoodSDK.",
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
        "The framework continues as Redwood GraphQL with maintenance releases. In its April 2025 announcement the team said no new features were planned and that new development moved to RedwoodSDK. The latest create-redwood-app release is 8.9.0 (2025-10-21, checked 2026-10-06).",
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
      competitor: "Manual updates; the generated code is yours",
    },
  ],
  sections: [
    {
      heading: "What the Epic Stack gives you",
      paragraphs: [
        "A production-oriented app with most decisions already made: Fly.io deployment with multi-region SQLite through LiteFS, Prisma, email and password auth with two-factor authentication, role-based permissions, transactional email with Resend, Conform forms with Zod validation, Tigris image storage, caching, Tailwind with Radix UI, Sentry error monitoring, and CI through GitHub Actions. Decision documents in the repository explain many of these choices.",
        "Its docs are direct about updates: the generated code \"is completely yours and there is no way to update it other than making manual changes\", so you follow Epic Stack improvements and apply them yourself.",
      ],
    },
    {
      heading: "What Better Fullstack adds",
      paragraphs: [
        "Choice at every layer: the framework, backend, database, ORM, auth provider, payments, email, job queues, AI SDKs, and deployment target. Several Epic Stack pieces are available as options, including SQLite, Prisma, Resend, Conform, Tailwind, Sentry, Playwright, Vitest, MSW, and Fly deployment, but Better Fullstack does not reproduce Epic Stack features such as LiteFS replication or its built-in two-factor auth.",
        "After scaffolding, Better Fullstack records your selections so the add command can extend the project and the update command can compare it with current templates and apply reviewed changes.",
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
