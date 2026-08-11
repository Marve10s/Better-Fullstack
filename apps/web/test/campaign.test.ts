import { describe, expect, it } from "bun:test";

import {
  CAMPAIGN_BUILDER_SEARCH,
  CAMPAIGN_PRESETS,
  getCampaignPresetUrl,
} from "../src/lib/campaign";
import {
  sanitizeCampaignProperties,
  stackAnalyticsProperties,
} from "../src/lib/campaign-analytics";
import {
  getCampaignShareMessage,
  getCampaignShareTitle,
  getCampaignShareUrl,
} from "../src/lib/campaign-share";
import { PRESET_TEMPLATES } from "../src/lib/constant";
import { getStackRunSupport } from "../src/lib/run-support";
import { DEFAULT_STACK, type StackState } from "../src/lib/stack-defaults";

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

  it("keeps campaign attribution when browsing every stack", () => {
    expect(CAMPAIGN_BUILDER_SEARCH).toEqual({
      view: "presets",
      file: "",
      campaign: "run-before-you-clone",
    });
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
    expect(parsed.searchParams.get("campaign")).toBe("run-before-you-clone");
    expect(parsed.searchParams.get("utm_campaign")).toBe("run-before-you-clone");
    expect(parsed.searchParams.get("fe-w")).toBe("tanstack-start");
    expect(getCampaignShareMessage(stack, "run", url)).toContain("I just ran");
  });

  // A non-TypeScript StackState still carries the default webFrontend/backend/
  // runtime values, so a share summary built from the global category order
  // described someone's Python API as "TanStack Router + Tailwind CSS + ...".
  it("names a shared stack after its own ecosystem, not the TypeScript defaults", () => {
    const stack = {
      ...DEFAULT_STACK,
      ecosystem: "python",
      pythonBackend: "fastapi",
    } as StackState;

    const title = getCampaignShareTitle(stack);
    expect(title).toContain("FastAPI");
    expect(title).not.toContain("TanStack Router");
    expect(getCampaignShareMessage(stack, "download", "https://x.test")).not.toContain(
      "TanStack Router",
    );
  });

  it("names multi-ecosystem shares from their selected graph parts", () => {
    const stack = {
      ...DEFAULT_STACK,
      stackMode: "multi",
      stackPartSpecs: [
        "frontend:typescript:next",
        "backend:go:gin",
        "backend.orm:go:gorm",
        "database:universal:postgres",
      ],
    } as StackState;

    const title = getCampaignShareTitle(stack);
    expect(title).toContain("Next.js");
    expect(title).toContain("Gin");
    expect(title).toContain("GORM");
    expect(title).not.toContain("Hono");
  });

  it("records the active ecosystem backend instead of TypeScript defaults", () => {
    const properties = stackAnalyticsProperties({
      ...DEFAULT_STACK,
      ecosystem: "python",
      pythonWebFramework: "fastapi",
    } as StackState);

    expect(properties.frontend).toBe("none");
    expect(properties.backend).toBe("fastapi");
  });

  it("records multi-ecosystem analytics from primary graph parts", () => {
    const properties = stackAnalyticsProperties({
      ...DEFAULT_STACK,
      stackMode: "multi",
      stackPartSpecs: ["frontend:typescript:next", "backend:go:gin", "database:universal:postgres"],
    } as StackState);

    expect(properties.ecosystem).toBe("typescript,go");
    expect(properties.frontend).toBe("next");
    expect(properties.backend).toBe("gin");
    expect(properties.database).toBe("postgres");
  });

  it("keeps only published campaign identifiers in analytics", () => {
    expect(
      sanitizeCampaignProperties({
        campaign: "run-before-you-clone",
        ecosystem: "typescript",
      }),
    ).toEqual({ campaign: "run-before-you-clone", ecosystem: "typescript" });
    expect(
      sanitizeCampaignProperties({
        campaign: "person@example.com",
        ecosystem: "typescript",
      }),
    ).toEqual({ ecosystem: "typescript" });
    expect(
      sanitizeCampaignProperties({
        campaign: "unpublished-campaign",
        ecosystem: "typescript",
      }),
    ).toEqual({ ecosystem: "typescript" });
  });
});
