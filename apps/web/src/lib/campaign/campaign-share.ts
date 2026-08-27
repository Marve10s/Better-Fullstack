import type { StackState } from "@/lib/stack/stack-defaults";

import { CAMPAIGN_SLUG } from "@/lib/campaign/campaign";
import { generateStackSharingUrl, summarizeStackForEcosystem } from "@/lib/stack/stack-utils";

export type ShareMoment = "run" | "download";

function conciseStackName(stack: StackState) {
  // Ecosystem-scoped: the global category order leads with the TypeScript web
  // categories, and a Python/Rust/Go stack still carries default webFrontend /
  // backend / runtime values - truncating that to four would describe someone's
  // Python API as a TanStack Router + Hono + Bun app.
  const selected = summarizeStackForEcosystem(stack)
    .split(" • ")
    .filter(Boolean)
    .slice(0, 4);
  return selected.length > 0 ? selected.join(" + ") : "a custom fullstack project";
}

export function getCampaignShareUrl(
  stack: StackState,
  moment: ShareMoment,
  baseUrl?: string,
) {
  const url = new URL(generateStackSharingUrl(stack, baseUrl));
  if (moment === "run") url.searchParams.set("view", "run");
  url.searchParams.set("campaign", CAMPAIGN_SLUG);
  url.searchParams.set("utm_source", "builder");
  url.searchParams.set("utm_medium", "share");
  url.searchParams.set("utm_campaign", CAMPAIGN_SLUG);
  return url.toString();
}

export function getCampaignShareMessage(
  stack: StackState,
  moment: ShareMoment,
  shareUrl: string,
) {
  const action = moment === "run" ? "ran" : "generated";
  return `I just ${action} ${conciseStackName(stack)} with Better Fullstack - inspect it, edit it, and download the real project: ${shareUrl}`;
}

export function getCampaignShareTitle(stack: StackState) {
  return `${conciseStackName(stack)} · Better Fullstack`;
}
