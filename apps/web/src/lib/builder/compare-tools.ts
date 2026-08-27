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

export const COMPETITOR_COMPARISONS: CompetitorComparison[] = [createT3App, betterTStack];

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
