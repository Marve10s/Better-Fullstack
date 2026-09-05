import { track } from "@vercel/analytics";

import {
  isBrowserTelemetryEnabled,
  sanitizeProductProperties,
  trackProductEvent,
} from "@/lib/analytics/product-analytics";
import { normalizeCampaignSlug } from "@/lib/campaign/campaign";

export type CampaignEvent =
  | "campaign_viewed"
  | "campaign_preset_opened"
  | "builder_viewed"
  | "builder_view_changed"
  | "builder_command_copied"
  | "builder_run_started"
  | "builder_run_ready"
  | "builder_run_failed"
  | "builder_run_stopped"
  | "builder_file_edited"
  | "builder_zip_started"
  | "builder_zip_downloaded"
  | "builder_zip_failed"
  | "builder_share_prompted"
  | "builder_stack_shared"
  | "builder_github_clicked"
  | "builder_starter_track_applied"
  | "builder_incompatibility_recovered"
  | "builder_plan_abandoned";

export type CampaignProperties = Record<string, string | number | boolean | null | undefined>;

export function trackCampaignEvent(event: CampaignEvent, properties?: CampaignProperties) {
  if (!isBrowserTelemetryEnabled()) return;
  const safeProperties = sanitizeCampaignProperties(properties);
  track(event, safeProperties);
  const status = event.endsWith("_failed")
    ? "failed"
    : event.endsWith("_abandoned")
      ? "cancelled"
      : event.endsWith("_started") || event.endsWith("_viewed") || event.endsWith("_opened")
        ? "started"
        : "succeeded";
  const productProperties = { ...safeProperties };
  if (status === "failed") {
    productProperties.failure_stage = productProperties.stage;
    productProperties.failure_reason = productProperties.reason;
    delete productProperties.stage;
    delete productProperties.reason;
  }
  trackProductEvent(event.replaceAll("_", "-"), status, productProperties);
}

export function sanitizeCampaignProperties(
  properties: CampaignProperties = {},
): CampaignProperties {
  const safe = sanitizeProductProperties(properties);
  if (safe.campaign !== undefined) {
    const campaign = normalizeCampaignSlug(safe.campaign);
    if (campaign) safe.campaign = campaign;
    else delete safe.campaign;
  }
  return safe;
}
