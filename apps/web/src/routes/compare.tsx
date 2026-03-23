import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check, Minus, X } from "lucide-react";

import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  DEFAULT_X_IMAGE_URL,
  SITE_NAME,
  canonicalUrl,
} from "@/lib/seo";
import Footer from "@/components/home/footer";

const COMPARE_TITLE = `Compare Fullstack Scaffolding Tools | ${SITE_NAME}`;
const COMPARE_DESCRIPTION =
  "See how Better Fullstack compares to create-t3-app, create-next-app, and other CLI scaffolding tools. Side-by-side feature comparison across ecosystems, auth, payments, databases, and more.";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: COMPARE_TITLE },
      { name: "description", content: COMPARE_DESCRIPTION },
      { name: "robots", content: DEFAULT_ROBOTS },
      { property: "og:title", content: COMPARE_TITLE },
      { property: "og:description", content: COMPARE_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonicalUrl("/compare") },
      { property: "og:image", content: DEFAULT_OG_IMAGE_URL },
      { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
      { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: COMPARE_TITLE },
      { name: "twitter:description", content: COMPARE_DESCRIPTION },
      { name: "twitter:image", content: DEFAULT_X_IMAGE_URL },
      { name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
    ],
    links: [{ rel: "canonical", href: canonicalUrl("/compare") }],
  }),
  component: ComparePage,
});

type Support = "yes" | "no" | "partial";

interface Tool {
  name: string;
  url: string;
}

interface Feature {
  label: string;
  values: Record<string, Support | string>;
}

interface FeatureGroup {
  title: string;
  features: Feature[];
}

const tools: Tool[] = [
  { name: "Better Fullstack", url: "https://better-fullstack.dev" },
  { name: "create-t3-app", url: "https://create.t3.gg" },
  { name: "create-next-app", url: "https://nextjs.org/docs/getting-started/installation" },
  { name: "create-vite", url: "https://vite.dev/guide/" },
  { name: "create-turbo", url: "https://turbo.build/repo/docs" },
];

const featureGroups: FeatureGroup[] = [
  {
    title: "Ecosystems",
    features: [
      {
        label: "TypeScript",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "yes",
          "create-next-app": "yes",
          "create-vite": "yes",
          "create-turbo": "yes",
        },
      },
      {
        label: "Rust",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "Python",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "Go",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
    ],
  },
  {
    title: "Frontend",
    features: [
      {
        label: "Next.js",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "yes",
          "create-next-app": "yes",
          "create-vite": "no",
          "create-turbo": "partial",
        },
      },
      {
        label: "React + Vite",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "yes",
          "create-turbo": "no",
        },
      },
      {
        label: "Nuxt / Vue",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "yes",
          "create-turbo": "no",
        },
      },
      {
        label: "SvelteKit",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "yes",
          "create-turbo": "no",
        },
      },
      {
        label: "Astro",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "Angular",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "Solid / SolidStart",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "yes",
          "create-turbo": "no",
        },
      },
      {
        label: "React Native / Expo",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
    ],
  },
  {
    title: "Backend",
    features: [
      {
        label: "Hono / Elysia / Express",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "partial",
          "create-next-app": "partial",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "Convex",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "Rust backends (Axum, Actix, Rocket)",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "Python backends (FastAPI, Django)",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "Go backends (Gin, Echo)",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
    ],
  },
  {
    title: "Data & APIs",
    features: [
      {
        label: "Database integrations",
        values: {
          "Better Fullstack": "6 databases",
          "create-t3-app": "partial",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "ORM support (Drizzle, Prisma, etc.)",
        values: {
          "Better Fullstack": "13 ORMs",
          "create-t3-app": "yes",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "Type-safe APIs (tRPC, oRPC, GraphQL)",
        values: {
          "Better Fullstack": "7 options",
          "create-t3-app": "yes",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
    ],
  },
  {
    title: "Auth, Payments & AI",
    features: [
      {
        label: "Authentication",
        values: {
          "Better Fullstack": "7 providers",
          "create-t3-app": "yes",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "Payment integrations",
        values: {
          "Better Fullstack": "5 providers",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "AI / LLM integrations",
        values: {
          "Better Fullstack": "12 options",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
    ],
  },
  {
    title: "Developer Experience",
    features: [
      {
        label: "Visual web builder",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "Monorepo (Turborepo)",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "yes",
        },
      },
      {
        label: "Desktop app (Tauri)",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "no",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "PWA support",
        values: {
          "Better Fullstack": "yes",
          "create-t3-app": "no",
          "create-next-app": "partial",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "Deploy targets (Vercel, CF, Docker, etc.)",
        values: {
          "Better Fullstack": "5 targets",
          "create-t3-app": "partial",
          "create-next-app": "partial",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
      {
        label: "UI library choices",
        values: {
          "Better Fullstack": "11 libraries",
          "create-t3-app": "partial",
          "create-next-app": "partial",
          "create-vite": "no",
          "create-turbo": "no",
        },
      },
    ],
  },
];

function CellIcon({ value }: { value: Support | string }) {
  if (value === "yes") return <Check className="h-4 w-4 text-emerald-500" />;
  if (value === "no") return <X className="h-4 w-4 text-muted-foreground/40" />;
  if (value === "partial") return <Minus className="h-4 w-4 text-amber-500" />;
  return <span className="text-xs font-medium text-foreground">{value}</span>;
}

function ComparePage() {
  return (
    <main className="min-h-svh">
      <div className="mx-auto max-w-5xl border-x border-border">
        {/* Hero */}
        <div className="border-b border-border px-4 pt-12 pb-8 sm:pt-16">
          <div className="mx-auto max-w-3xl">
            <h1 className="font-mono text-2xl font-bold tracking-tight sm:text-4xl">
              How does Better Fullstack compare?
            </h1>
            <p className="mt-4 text-sm text-muted-foreground sm:text-lg">
              Most scaffolding tools handle one framework and one opinion. Better Fullstack gives you
              270+ options across 4 ecosystems — frontend, backend, database, auth, payments, AI, and
              deployment — all preconfigured and ready to run.
            </p>
          </div>
        </div>

        {/* Comparison table */}
        <div className="border-b border-border">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="sticky left-0 z-10 bg-background px-4 py-3 text-left font-medium text-muted-foreground">
                    Feature
                  </th>
                  {tools.map((tool) => (
                    <th
                      key={tool.name}
                      className={`px-3 py-3 text-center font-medium ${
                        tool.name === "Better Fullstack" ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      <a
                        href={tool.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline"
                      >
                        {tool.name}
                      </a>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureGroups.map((group) => (
                  <GroupRows key={group.title} group={group} toolNames={tools.map((t) => t.name)} />
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="border-b border-border px-4 py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-mono text-xl font-bold sm:text-2xl">Ready to try it?</h2>
            <p className="mt-2 text-sm text-muted-foreground sm:text-base">
              Configure your stack visually or jump straight into the CLI.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/new"
                search={{ view: "command", file: "" }}
                className="inline-flex items-center gap-2 rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-foreground/90"
              >
                Open Stack Builder
                <ArrowRight className="h-4 w-4" />
              </Link>
              <code className="rounded-lg border border-border bg-muted px-4 py-2 text-xs sm:text-sm">
                bun create better-fullstack@latest
              </code>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </main>
  );
}

function GroupRows({ group, toolNames }: { group: FeatureGroup; toolNames: string[] }) {
  return (
    <>
      <tr>
        <td
          colSpan={toolNames.length + 1}
          className="border-t border-border bg-muted/50 px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider text-muted-foreground"
        >
          {group.title}
        </td>
      </tr>
      {group.features.map((feature) => (
        <tr key={feature.label} className="border-t border-border/50 hover:bg-muted/30">
          <td className="sticky left-0 z-10 bg-background px-4 py-2.5 text-foreground">
            {feature.label}
          </td>
          {toolNames.map((name) => (
            <td key={name} className="px-3 py-2.5 text-center">
              <span className="inline-flex items-center justify-center">
                <CellIcon value={feature.values[name] ?? "no"} />
              </span>
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
