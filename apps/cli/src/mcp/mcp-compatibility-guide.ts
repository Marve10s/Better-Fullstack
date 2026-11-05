import type { CompatibilityCategory, StackSelectionInput } from "@better-fullstack/types";

export type CompatibilityGuideProbe = {
  stack: Partial<StackSelectionInput>;
  category: CompatibilityCategory;
  option: string;
  allowed: boolean;
};

export type CompatibilityGuideRule = {
  text: string;
  probes: readonly CompatibilityGuideProbe[];
};

export const COMPATIBILITY_GUIDE_SECTIONS: readonly {
  title: string;
  rules: readonly CompatibilityGuideRule[];
}[] = [
  {
    title: "Backend",
    rules: [
      {
        text: "Convex is not available with the Solid or Astro frontends.",
        probes: [
          {
            stack: { backend: "convex" },
            category: "webFrontend",
            option: "solid",
            allowed: false,
          },
          {
            stack: { backend: "convex" },
            category: "webFrontend",
            option: "astro",
            allowed: false,
          },
        ],
      },
      {
        text: "A full-stack backend (backend=self) needs the matching full-stack frontend, such as Next.js for the Next.js backend.",
        probes: [
          {
            stack: { backend: "self-next" },
            category: "webFrontend",
            option: "react-router",
            allowed: false,
          },
          {
            stack: { backend: "self-next" },
            category: "webFrontend",
            option: "next",
            allowed: true,
          },
        ],
      },
      {
        text: "The Cloudflare Workers runtime needs the Hono backend.",
        probes: [
          { stack: { backend: "express" }, category: "runtime", option: "workers", allowed: false },
        ],
      },
    ],
  },
  {
    title: "API",
    rules: [
      {
        text: "Svelte, Nuxt, and Solid use oRPC instead of tRPC.",
        probes: (["svelte", "nuxt", "solid"] as const).flatMap((frontend) => [
          {
            stack: { webFrontend: [frontend], backend: "hono" },
            category: "api" as const,
            option: "trpc",
            allowed: false,
          },
          {
            stack: { webFrontend: [frontend], backend: "hono" },
            category: "api" as const,
            option: "orpc",
            allowed: true,
          },
        ]),
      },
    ],
  },
  {
    title: "Database and ORM",
    rules: [
      {
        text: "Better Auth has no TypeORM or Sequelize adapter.",
        probes: (["typeorm", "sequelize"] as const).map((orm) => ({
          stack: { orm, database: "postgres" },
          category: "auth" as const,
          option: "better-auth",
          allowed: false,
        })),
      },
      {
        text: "MongoDB works with Prisma or Mongoose. Drizzle does not support MongoDB.",
        probes: [
          { stack: { database: "mongodb" }, category: "orm", option: "prisma", allowed: true },
          { stack: { database: "mongodb" }, category: "orm", option: "mongoose", allowed: true },
          { stack: { database: "mongodb" }, category: "orm", option: "drizzle", allowed: false },
        ],
      },
    ],
  },
  {
    title: "UI",
    rules: [
      {
        text: "shadcn-ui does not work with the Svelte, Solid, or Redwood frontends.",
        probes: (["svelte", "solid", "redwood"] as const).map((frontend) => ({
          stack: { webFrontend: [frontend] },
          category: "uiLibrary" as const,
          option: "shadcn-ui",
          allowed: false,
        })),
      },
    ],
  },
  {
    title: "Payments",
    rules: [
      {
        text: "Polar requires Better Auth and a web frontend.",
        probes: [
          { stack: { auth: "clerk" }, category: "payments", option: "polar", allowed: false },
          {
            stack: { webFrontend: ["none"], nativeFrontend: ["native-bare"] },
            category: "payments",
            option: "polar",
            allowed: false,
          },
        ],
      },
    ],
  },
  {
    title: "Other ecosystems",
    rules: [
      {
        text: "Rust, Python, Go, and Java support Resend (email=resend) or no shared email provider, and Sentry (observability=sentry) or no shared observability provider.",
        probes: (["rust", "python", "go", "java"] as const).flatMap((ecosystem) => [
          { stack: { ecosystem }, category: "email" as const, option: "resend", allowed: true },
          {
            stack: { ecosystem },
            category: "email" as const,
            option: "nodemailer",
            allowed: false,
          },
          {
            stack: { ecosystem },
            category: "observability" as const,
            option: "sentry",
            allowed: true,
          },
          {
            stack: { ecosystem },
            category: "observability" as const,
            option: "signoz",
            allowed: false,
          },
        ]),
      },
      {
        text: "Python and Go select SigNoz through their own fields (pythonObservability=signoz, goObservability=signoz).",
        probes: [
          {
            stack: { ecosystem: "python" },
            category: "pythonObservability",
            option: "signoz",
            allowed: true,
          },
          {
            stack: { ecosystem: "go" },
            category: "goObservability",
            option: "signoz",
            allowed: true,
          },
        ],
      },
      {
        text: "Java Resend and Sentry need Maven or Gradle (javaBuildTool) to manage the SDK dependency.",
        probes: [
          {
            stack: { ecosystem: "java", javaBuildTool: "none" },
            category: "email",
            option: "resend",
            allowed: false,
          },
          {
            stack: { ecosystem: "java", javaBuildTool: "none" },
            category: "observability",
            option: "sentry",
            allowed: false,
          },
        ],
      },
      {
        text: "TypeScript fields such as auth do not apply to other ecosystems. bfs_check_compatibility resets them (auth=better-auth on a Rust stack becomes none), so use the ecosystem's own fields such as rustAuth or goAuth.",
        probes: [
          { stack: { ecosystem: "rust" }, category: "auth", option: "better-auth", allowed: false },
        ],
      },
    ],
  },
];

export function renderCompatibilityGuide(): string {
  const sections = COMPATIBILITY_GUIDE_SECTIONS.map(
    (section) => `## ${section.title}\n${section.rules.map((rule) => `- ${rule.text}`).join("\n")}`,
  );
  return [
    "# Better-Fullstack Compatibility Rules",
    "These are the constraints agents hit most often. The compatibility engine has the full rule set: call bfs_check_compatibility with the stack before creating a project, and use the adjusted stack and issues it returns.",
    ...sections,
  ].join("\n\n");
}
