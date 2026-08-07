import { createFileRoute } from "@tanstack/react-router";

import { TelemetryDecisionDashboard } from "@/components/analytics/telemetry-decision-dashboard";
import Footer from "@/components/home/footer";
import { NOINDEX_ROBOTS } from "@/lib/robots";
import { canonicalUrl } from "@/lib/seo";
import {
  buildTelemetryDashboard,
  type RawDailyTelemetry,
  type RawEngagement,
  type RawProductInsights,
  type RawTelemetryStats,
} from "@/lib/telemetry-dashboard";

type LoaderResult =
  | { status: "ready"; data: ReturnType<typeof buildTelemetryDashboard> }
  | { status: "unconfigured" | "empty" | "unavailable" };

async function loadTelemetry(): Promise<LoaderResult> {
  const convexUrl = import.meta.env.VITE_CONVEX_URL;
  if (!convexUrl) return { status: "unconfigured" };

  try {
    const [{ ConvexHttpClient }, { api }] = await Promise.all([
      import("convex/browser"),
      import("@better-fullstack/backend/convex/_generated/api"),
    ]);
    const client = new ConvexHttpClient(convexUrl);
    const [stats, daily, engagement, insights] = await Promise.all([
      client.query(api.analytics.getStats, {}),
      client.query(api.analytics.getDailyStats, { days: 30 }),
      client.query(api.analytics.getEngagement, {}),
      client.query(api.analytics.getProductInsights, {}),
    ]);
    if (!stats) return { status: "empty" };

    return {
      status: "ready",
      data: buildTelemetryDashboard({
        stats: stats as RawTelemetryStats,
        daily: daily as RawDailyTelemetry[],
        engagement: engagement as RawEngagement,
        insights: insights as RawProductInsights,
      }),
    };
  } catch {
    return { status: "unavailable" };
  }
}

export const Route = createFileRoute("/telemetry")({
  head: () => {
    const title = "Product telemetry — Better Fullstack";
    const description =
      "Aggregate lifecycle, reliability, adoption, and repeat-use signals for Better Fullstack product decisions.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: NOINDEX_ROBOTS },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: canonicalUrl("/telemetry") },
      ],
      links: [{ rel: "canonical", href: canonicalUrl("/telemetry") }],
    };
  },
  staleTime: 60_000,
  loader: loadTelemetry,
  component: TelemetryRoute,
});

function TelemetryRoute() {
  const result = Route.useLoaderData();

  return (
    <main className="min-h-svh">
      <div className="mx-auto max-w-[1480px] border-x border-border px-3 py-12 sm:px-6 sm:py-16 lg:px-10">
        {result.status === "ready" ? (
          <TelemetryDecisionDashboard data={result.data} />
        ) : (
          <TelemetryUnavailable status={result.status} />
        )}
      </div>
      <Footer />
    </main>
  );
}

function TelemetryUnavailable({ status }: { status: Exclude<LoaderResult["status"], "ready"> }) {
  const copy = {
    unconfigured: "Set VITE_CONVEX_URL to connect this deployment to aggregate telemetry.",
    empty: "The telemetry store is connected, but no aggregate events are available yet.",
    unavailable:
      "The aggregate telemetry query is temporarily unavailable. No raw event data was requested.",
  }[status];

  return (
    <section className="mx-auto max-w-3xl border border-border bg-card px-6 py-16 text-center sm:px-10">
      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#789018] dark:text-[#c6e853]">
        Product signal / offline
      </p>
      <h1 className="mt-5 font-mono text-4xl font-semibold tracking-[-0.055em] sm:text-6xl">
        Decision room
      </h1>
      <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-muted-foreground">{copy}</p>
    </section>
  );
}
