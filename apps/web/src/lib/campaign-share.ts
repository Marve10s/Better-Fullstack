import type { StackState } from "@/lib/stack-defaults";

import { generateStackSharingUrl, generateStackSummary } from "@/lib/stack-utils";

export type ShareMoment = "run" | "download";

function conciseStackName(stack: StackState) {
  const selected = generateStackSummary(stack)
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
  url.searchParams.set("utm_source", "builder");
  url.searchParams.set("utm_medium", "share");
  url.searchParams.set("utm_campaign", "run-before-you-clone");
  return url.toString();
}

export function getCampaignShareMessage(
  stack: StackState,
  moment: ShareMoment,
  shareUrl: string,
) {
  const action = moment === "run" ? "ran" : "generated";
  return `I just ${action} ${conciseStackName(stack)} with Better Fullstack — inspect it, edit it, and download the real project: ${shareUrl}`;
}

export function getCampaignShareTitle(stack: StackState) {
  return `${conciseStackName(stack)} · Better Fullstack`;
}
