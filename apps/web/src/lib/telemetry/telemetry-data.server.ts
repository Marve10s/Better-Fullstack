import { redirect } from "@tanstack/react-router";
import { getRequest, setResponseHeader } from "@tanstack/react-start/server";

import type { TelemetryDashboardData } from "@/lib/telemetry/telemetry-dashboard";

import { getTelemetryPageAccess } from "@/lib/telemetry/telemetry-auth.server";

export type TelemetryLoaderResult =
  | { status: "ready"; data: TelemetryDashboardData }
  | { status: "unconfigured" | "empty" | "unavailable" | "unauthorized" };

export async function loadTelemetryForOwner(): Promise<TelemetryLoaderResult> {
  setResponseHeader("Cache-Control", "private, no-store");
  setResponseHeader("Vary", "Authorization");
  setResponseHeader("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  const access = getTelemetryPageAccess(getRequest(), process.env.TELEMETRY_DASHBOARD_SECRET);
  if (access !== "authorized") return { status: access };
  const destination = process.env.POSTHOG_DASHBOARD_URL;
  if (
    !destination ||
    !/^https:\/\/(eu|us)\.posthog\.com\/project\/\d+\/dashboard\/\d+\/?$/.test(destination)
  ) {
    return { status: "unconfigured" };
  }
  throw redirect({ href: destination });
}
