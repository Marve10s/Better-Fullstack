import { getRequest, setResponseHeader } from "@tanstack/react-start/server";

import { getTelemetryPageAccess } from "@/lib/telemetry-auth.server";
import {
  buildTelemetryDashboard,
  type RawDailyTelemetry,
  type RawEngagement,
  type RawProductInsights,
  type RawTelemetryStats,
  type TelemetryDashboardData,
} from "@/lib/telemetry-dashboard";

export type TelemetryLoaderResult =
  | { status: "ready"; data: TelemetryDashboardData }
  | { status: "unconfigured" | "empty" | "unavailable" | "unauthorized" };

type TelemetryAggregateResponse = {
  stats: RawTelemetryStats | null;
  daily: RawDailyTelemetry[];
  engagement: RawEngagement;
  insights: RawProductInsights;
};

function dashboardEndpoint(): string | undefined {
  const source = process.env.VITE_CONVEX_INGEST_URL ?? process.env.VITE_CONVEX_URL;
  if (!source) return undefined;

  try {
    const url = new URL(source);
    url.hostname = url.hostname.replace(/\.convex\.cloud$/, ".convex.site");
    url.pathname = "/api/analytics/dashboard";
    url.search = "";
    url.hash = "";
    return url.toString();
  } catch {
    return undefined;
  }
}

export async function loadTelemetryForOwner(): Promise<TelemetryLoaderResult> {
  setResponseHeader("Cache-Control", "private, no-store");
  setResponseHeader("Vary", "Authorization");
  setResponseHeader("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");

  const secret = process.env.TELEMETRY_DASHBOARD_SECRET?.trim();
  const pageAccess = getTelemetryPageAccess(getRequest(), secret);
  if (pageAccess !== "authorized") return { status: pageAccess };

  const endpoint = dashboardEndpoint();
  if (!endpoint || !secret) return { status: "unconfigured" };

  try {
    const response = await fetch(endpoint, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${secret}`,
      },
      cache: "no-store",
    });
    if (response.status === 503) return { status: "unconfigured" };
    if (response.status === 401 || response.status === 403) return { status: "unauthorized" };
    if (!response.ok) return { status: "unavailable" };

    const aggregate = (await response.json()) as TelemetryAggregateResponse;
    const { stats } = aggregate;
    if (!stats) return { status: "empty" };

    return {
      status: "ready",
      data: buildTelemetryDashboard({ ...aggregate, stats }),
    };
  } catch {
    return { status: "unavailable" };
  }
}
