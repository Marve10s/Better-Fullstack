import { track } from "@vercel/analytics";

import type { StackState } from "@/lib/stack-defaults";

export type CampaignEvent =
  | "campaign_viewed"
  | "campaign_preset_opened"
  | "builder_run_started"
  | "builder_run_ready"
  | "builder_zip_downloaded"
  | "builder_share_prompted"
  | "builder_stack_shared"
  | "builder_github_clicked";

type CampaignProperties = Record<string, string | number | boolean | null | undefined>;

export function trackCampaignEvent(event: CampaignEvent, properties?: CampaignProperties) {
  track(event, properties);
}

export function stackAnalyticsProperties(
  stack: StackState,
  extra?: CampaignProperties,
): CampaignProperties {
  return {
    ecosystem: stack.ecosystem,
    mode: stack.stackMode,
    frontend: stack.webFrontend.filter((frontend) => frontend !== "none").join(",") || "none",
    backend: stack.backend,
    database: stack.database,
    ...extra,
  };
}
