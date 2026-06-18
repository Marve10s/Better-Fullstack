import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";

import type { AggregatedAnalyticsData } from "@/components/analytics/types";

import { AnalyticsHeader } from "@/components/analytics/analytics-header";
import { DevToolsSection } from "@/components/analytics/dev-environment-charts";
import { MetricsCards } from "@/components/analytics/metrics-cards";
import { StackSection } from "@/components/analytics/stack-configuration-charts";
import { TimelineSection } from "@/components/analytics/timeline-charts";
import Footer from "@/components/home/footer";
import {
  EMPTY_ANALYTICS_DATA,
  buildAggregatedAnalyticsData,
  type RawAnalyticsStats,
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

// Fetch and aggregate analytics server-side via Convex's lightweight HTTP client
// (no reactive Convex React SDK in the client bundle). The live event feed is
// intentionally omitted here — it needs a client-side subscription and is a
// separate follow-up. Degrades to an empty dashboard when Convex is unconfigured.
async function loadAnalytics(): Promise<AggregatedAnalyticsData> {
  const convexUrl = import.meta.env.VITE_CONVEX_URL;
  if (!convexUrl) return EMPTY_ANALYTICS_DATA;

  try {
    const [{ ConvexHttpClient }, { api }] = await Promise.all([
      import("convex/browser"),
      import("@better-fullstack/backend/convex/_generated/api"),
    ]);
    const client = new ConvexHttpClient(convexUrl);
    const [stats, daily] = await Promise.all([
      client.query(api.analytics.getStats, {}),
      client.query(api.analytics.getDailyStats, { days: 30 }),
    ]);
    if (!stats) return EMPTY_ANALYTICS_DATA;
    return buildAggregatedAnalyticsData(stats as RawAnalyticsStats, daily ?? []);
  } catch {
    return EMPTY_ANALYTICS_DATA;
  }
}

export const Route = createFileRoute("/analytics")({
  head: () => {
    const title = "Analytics — Better Fullstack";
    const description =
      "See which stacks developers actually pick: the most popular frontends, backends, databases, ORMs, and full stack combinations scaffolded with Better Fullstack.";

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
  const legacy = useMemo(
    () => ({
      total: data.totalProjects,
      avgPerDay: data.avgProjectsPerDay,
      lastUpdatedIso: data.lastUpdated ?? "",
      source: "convex",
    }),
    [data],
  );

  return (
    <div className="mx-auto min-h-svh">
      <div className="container mx-auto space-y-10 px-4 py-8 pt-16">
        <AnalyticsHeader
          lastUpdated={data.lastUpdated}
          legacy={legacy}
          connectionStatus="disabled"
        />
        <MetricsCards data={data} />
        <TimelineSection data={data} />
        <StackSection data={data} />
        <DevToolsSection data={data} />
      </div>
      <Footer />
    </div>
  );
}
