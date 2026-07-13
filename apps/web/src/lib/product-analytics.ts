import type { PostHog } from "posthog-js";

export const PRODUCT_ANALYTICS_EVENTS = [
  "builder_opened",
  "install_command_copied",
  "builder_command_copied",
  "stack_shared",
  "docs_opened",
  "github_opened",
  "press_copy_copied",
  "press_asset_downloaded",
] as const;

export type ProductAnalyticsEvent = (typeof PRODUCT_ANALYTICS_EVENTS)[number];
export type ProductAnalyticsProperties = Record<string, boolean | number | string>;

const eventNames = new Set<string>(PRODUCT_ANALYTICS_EVENTS);
let clientPromise: Promise<PostHog | null> | undefined;

export function isProductAnalyticsEvent(value: string): value is ProductAnalyticsEvent {
  return eventNames.has(value);
}

export function getAnalyticsProperties(element: HTMLElement): ProductAnalyticsProperties {
  const properties: ProductAnalyticsProperties = {};

  if (element.dataset.analyticsSource) {
    properties.source = element.dataset.analyticsSource;
  }
  if (element.dataset.analyticsTarget) {
    properties.target = element.dataset.analyticsTarget;
  }
  if (element.dataset.analyticsFormat) {
    properties.format = element.dataset.analyticsFormat;
  }

  return properties;
}

export async function initializeProductAnalytics(): Promise<PostHog | null> {
  if (typeof window === "undefined" || !import.meta.env.PROD) return null;

  const token = import.meta.env.VITE_PUBLIC_POSTHOG_KEY?.trim();
  if (!token) return null;

  clientPromise ??= import("posthog-js").then(({ default: posthog }) => {
    if (!posthog.__loaded) {
      posthog.init(token, {
        api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST?.trim() || "https://eu.i.posthog.com",
        person_profiles: "never",
        cookieless_mode: "always",
        autocapture: false,
        capture_pageview: false,
        capture_pageleave: true,
        disable_session_recording: true,
        respect_dnt: true,
        loaded: (client) => client.debug(false),
      });
    }
    return posthog;
  });

  return clientPromise;
}

export async function captureProductEvent(
  event: ProductAnalyticsEvent,
  properties: ProductAnalyticsProperties = {},
) {
  const client = await initializeProductAnalytics();
  client?.capture(event, properties);
}

export async function captureProductPageView() {
  const client = await initializeProductAnalytics();
  client?.capture("$pageview", { $current_url: window.location.href });
}
