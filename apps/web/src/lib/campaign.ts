export const CAMPAIGN_SLUG = "run-before-you-clone";
export const CAMPAIGN_PATH = `/${CAMPAIGN_SLUG}` as const;
export const CAMPAIGN_BUILDER_SEARCH = {
  view: "presets",
  file: "",
  campaign: CAMPAIGN_SLUG,
} as const;

export type CampaignPreset = {
  id: string;
  title: string;
  description: string;
  iconIds: string[];
  accent: "lime" | "cyan" | "pink";
};

export const CAMPAIGN_PRESETS: CampaignPreset[] = [
  {
    id: "nextjs-minimal",
    title: "Next.js Minimal",
    description: "Next.js, Tailwind and shadcn/ui without the backend weight.",
    iconIds: ["next", "tailwind", "shadcn-ui"],
    accent: "lime",
  },
  {
    id: "tanstack-start",
    title: "TanStack Start",
    description: "A fullstack TanStack app with tRPC, Drizzle and SQLite.",
    iconIds: ["tanstack-start", "trpc", "drizzle"],
    accent: "cyan",
  },
  {
    id: "sveltekit-fullstack",
    title: "SvelteKit Fullstack",
    description: "SvelteKit, oRPC, Drizzle, SQLite and Better Auth.",
    iconIds: ["svelte", "orpc", "drizzle"],
    accent: "pink",
  },
  {
    id: "nuxt-fullstack",
    title: "Nuxt Fullstack",
    description: "Nuxt, oRPC, Prisma, PostgreSQL and Better Auth.",
    iconIds: ["nuxt", "orpc", "prisma"],
    accent: "lime",
  },
  {
    id: "astro-fullstack",
    title: "Fullstack Astro",
    description: "Astro with React, server routes, Drizzle and SQLite.",
    iconIds: ["astro", "react", "drizzle"],
    accent: "cyan",
  },
];

export function getCampaignPresetUrl(presetId: string) {
  const params = new URLSearchParams({
    preset: presetId,
    view: "run",
    campaign: CAMPAIGN_SLUG,
  });
  return `/new?${params.toString()}`;
}
