import { describe, expect, it } from "bun:test";

import { CAMPAIGN_PRESETS, getCampaignPresetUrl } from "../src/lib/campaign";
import {
  getCampaignShareMessage,
  getCampaignShareUrl,
} from "../src/lib/campaign-share";
import { PRESET_TEMPLATES } from "../src/lib/constant";
import { DEFAULT_STACK, type StackState } from "../src/lib/stack-defaults";
import { getStackRunSupport } from "../src/lib/run-support";

describe("Run Before You Clone campaign", () => {
  it("keeps every featured preset browser-runnable", () => {
    for (const campaignPreset of CAMPAIGN_PRESETS) {
      const preset = PRESET_TEMPLATES.find((candidate) => candidate.id === campaignPreset.id);
      expect(preset, `Missing preset: ${campaignPreset.id}`).toBeDefined();
      const stack = { ...DEFAULT_STACK, ...preset?.stack } as StackState;
      expect(getStackRunSupport(stack)).toEqual({ supported: true });
    }
  });

  it("opens featured presets directly in the run view", () => {
    expect(getCampaignPresetUrl("nextjs-minimal")).toBe(
      "/new?preset=nextjs-minimal&view=run&campaign=run-before-you-clone",
    );
  });

  it("shares the exact stack with campaign attribution", () => {
    const stack = {
      ...DEFAULT_STACK,
      projectName: "campaign-app",
      webFrontend: ["tanstack-start"],
    } as StackState;
    const url = getCampaignShareUrl(stack, "run");
    const parsed = new URL(url);

    expect(parsed.origin).toBe("https://better-fullstack.dev");
    expect(parsed.pathname).toBe("/stack");
    expect(parsed.searchParams.get("view")).toBe("run");
    expect(parsed.searchParams.get("utm_campaign")).toBe("run-before-you-clone");
    expect(parsed.searchParams.get("fe-w")).toBe("tanstack-start");
    expect(getCampaignShareMessage(stack, "run", url)).toContain("I just ran");
  });
});
