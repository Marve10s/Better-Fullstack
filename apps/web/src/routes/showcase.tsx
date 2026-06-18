import { createFileRoute } from "@tanstack/react-router";

import ShowcasePage from "@/components/showcase/showcase-page";
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  DEFAULT_X_IMAGE_URL,
  canonicalUrl,
} from "@/lib/seo";

type ShowcaseProject = {
  _id: string;
  _creationTime: number;
  title: string;
  description: string;
  imageUrl: string;
  liveUrl: string;
  tags: string[];
};

// Fetch showcase projects server-side via Convex's lightweight HTTP client so the
// reactive Convex React SDK never enters the client entry chunk. Degrades to an
// empty gallery when Convex is not configured or unreachable.
async function loadShowcaseProjects(): Promise<ShowcaseProject[]> {
  const convexUrl = import.meta.env.VITE_CONVEX_URL;
  if (!convexUrl) return [];

  try {
    const [{ ConvexHttpClient }, { api }] = await Promise.all([
      import("convex/browser"),
      import("@better-fullstack/backend/convex/_generated/api"),
    ]);
    const client = new ConvexHttpClient(convexUrl);
    return await client.query(api.showcase.getShowcaseProjects, {});
  } catch {
    return [];
  }
}

export const Route = createFileRoute("/showcase")({
  head: () => {
    const title = "Showcase — Better Fullstack";
    const description =
      "Real projects built with Better Fullstack. See what the community is shipping and get inspired for your next stack.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: DEFAULT_ROBOTS },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl("/showcase") },
        { property: "og:image", content: DEFAULT_OG_IMAGE_URL },
        { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
        { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
        { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: DEFAULT_X_IMAGE_URL },
        { name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      ],
      links: [{ rel: "canonical", href: canonicalUrl("/showcase") }],
    };
  },
  loader: async () => ({ showcaseProjects: await loadShowcaseProjects() }),
  component: ShowcaseRoute,
});

function ShowcaseRoute() {
  const { showcaseProjects } = Route.useLoaderData();
  return <ShowcasePage showcaseProjects={showcaseProjects} />;
}
