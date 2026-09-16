import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

import Footer from "@/components/home/footer";
import { NOINDEX_ROBOTS } from "@/lib/seo/robots";
import { canonicalUrl } from "@/lib/seo/seo";

const loadTelemetry = createServerFn({ method: "GET" }).handler(async () => {
  const { loadTelemetryForOwner } = await import("@/lib/telemetry/telemetry-data.server");
  return loadTelemetryForOwner();
});

export const Route = createFileRoute("/telemetry")({
  head: () => {
    const title = "Product telemetry - Better Fullstack";
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
  loader: () => loadTelemetry(),
  component: TelemetryRoute,
});

function TelemetryRoute() {
  const result = Route.useLoaderData();

  return (
    <main className="min-h-svh">
      <div className="mx-auto max-w-[1480px] border-x border-border px-3 py-12 sm:px-6 sm:py-16 lg:px-10">
        <TelemetryUnavailable status={result.status} />
      </div>
      <Footer />
    </main>
  );
}

function TelemetryUnavailable({ status }: { status: "unconfigured" | "unauthorized" }) {
  const copy = {
    unconfigured: "The PostHog dashboard is not connected yet.",
    unauthorized: "Telemetry access was denied. Verify the owner credentials.",
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
