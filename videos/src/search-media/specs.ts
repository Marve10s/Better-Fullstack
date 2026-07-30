export type SearchMediaItem = {
  name: string;
  detail: string;
  icon: string;
};

export type SearchMediaSpec = {
  id: string;
  stillId: string;
  fileName: string;
  eyebrow: string;
  title: string;
  summary: string;
  layout: "flow" | "decision" | "matrix";
  items: SearchMediaItem[];
};

const simpleIcon = (slug: string, color: string) =>
  `https://cdn.simpleicons.org/${slug}/${color}`;

export const SEARCH_MEDIA_SPECS: SearchMediaSpec[] = [
  {
    id: "SearchTanStackStartFullstack",
    stillId: "SearchTanStackStartFullstackStill",
    fileName: "tanstack-start-fullstack-1200x630",
    eyebrow: "TanStack Start full stack",
    title: "One stack. Front to database.",
    summary: "A TanStack Start foundation with typed data and authentication already connected.",
    layout: "flow",
    items: [
      { name: "TanStack Start", detail: "full-stack React", icon: "/icon/tanstack.png" },
      { name: "Drizzle", detail: "typed SQL", icon: simpleIcon("drizzle", "C5F74F") },
      { name: "Better Auth", detail: "authentication", icon: "/icon/better-auth.svg" },
    ],
  },
  {
    id: "SearchHonoApi",
    stillId: "SearchHonoApiStill",
    fileName: "hono-api-1200x630",
    eyebrow: "Hono API stack",
    title: "The API stack, already wired.",
    summary: "Compose Hono, typed contracts, authentication and PostgreSQL without hand-building the seams.",
    layout: "flow",
    items: [
      { name: "Hono", detail: "web framework", icon: "/icon/hono.svg" },
      { name: "Better Auth", detail: "authentication", icon: "/icon/better-auth.svg" },
      { name: "PostgreSQL", detail: "database", icon: simpleIcon("postgresql", "4169E1") },
    ],
  },
  {
    id: "SearchNextjsFullstack",
    stillId: "SearchNextjsFullstackStill",
    fileName: "nextjs-fullstack-1200x630",
    eyebrow: "full-stack decision guide",
    title: "Next.js or TanStack Start?",
    summary: "Compare the application boundary first, then scaffold the stack that fits.",
    layout: "decision",
    items: [
      { name: "Next.js", detail: "integrated conventions", icon: simpleIcon("nextdotjs", "F2EEEE") },
      { name: "TanStack Start", detail: "explicit primitives", icon: "/icon/tanstack.png" },
    ],
  },
  {
    id: "SearchStackDecisions",
    stillId: "SearchStackDecisionsStill",
    fileName: "stack-decisions-1200x630",
    eyebrow: "full-stack generator",
    title: "Make the stack decision once.",
    summary: "Choose an ecosystem, generate the project, inspect the result and keep the code.",
    layout: "matrix",
    items: [
      { name: "TypeScript", detail: "web", icon: simpleIcon("typescript", "3178C6") },
      { name: "Python", detail: "services", icon: simpleIcon("python", "3776AB") },
      { name: "Rust", detail: "systems", icon: simpleIcon("rust", "F2EEEE") },
      { name: "Go", detail: "services", icon: simpleIcon("go", "00ADD8") },
    ],
  },
];

export const SEARCH_MEDIA_DURATION = 135;
export const SEARCH_MEDIA_FPS = 30;
export const SEARCH_MEDIA_WIDTH = 1200;
export const SEARCH_MEDIA_HEIGHT = 630;
