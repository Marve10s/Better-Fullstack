import { createFileRoute } from "@tanstack/react-router";

import { StackLeaderboard } from "@/components/analytics/stack-leaderboard";
import Footer from "@/components/home/footer";
import {
  EMPTY_STACK_ANALYTICS,
  buildStackAnalytics,
  type RawAnalyticsStats,
  type StackAnalyticsData,
} from "@/lib/analytics-aggregate";
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  DEFAULT_X_IMAGE_URL,
  canonicalUrl,
} from "@/lib/seo";

async function loadAnalytics(): Promise<StackAnalyticsData> {
  const convexUrl = import.meta.env.VITE_CONVEX_URL;
  if (!convexUrl) return EMPTY_STACK_ANALYTICS;

  try {
    const [{ ConvexHttpClient }, { api }] = await Promise.all([
      import("convex/browser"),
      import("@better-fullstack/backend/convex/_generated/api"),
    ]);
    const client = new ConvexHttpClient(convexUrl);
    const stats = await client.query(api.analytics.getStats, {});
    if (!stats) return EMPTY_STACK_ANALYTICS;
    return buildStackAnalytics(stats as RawAnalyticsStats);
  } catch {
    return EMPTY_STACK_ANALYTICS;
  }
}

export const Route = createFileRoute("/analytics")({
  head: () => {
    const title = "Analytics — Better Fullstack";
    const description =
      "A live leaderboard of the stacks developers actually pick: the most popular frontends, backends, databases, ORMs, and full-stack combinations scaffolded with Better Fullstack.";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: DEFAULT_ROBOTS },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl("/analytics") },
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
      links: [{ rel: "canonical", href: canonicalUrl("/analytics") }],
    };
  },
  loader: async () => ({ data: await loadAnalytics() }),
  component: AnalyticsRoute,
});

function AnalyticsRoute() {
  const { data } = Route.useLoaderData();

  return (
    <div className="min-h-svh">
      <div className="mx-auto max-w-[1100px] px-4 py-16 sm:px-8 sm:py-20">
        <StackLeaderboard data={data} />
      </div>
      <Footer />
    </div>
  );
}
