import {
  getCapabilityInventory,
  getStarterTrackCatalog,
  parseStackPartSpecs,
  validateStackParts,
} from "@better-fullstack/types";
import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";
import path from "node:path";

import { selectionAnalyticsProperties } from "@/lib/analytics/campaign-analytics";
import { PRESET_TEMPLATES } from "@/lib/stack/constant";
import { STARTER_TRACKS } from "@/lib/builder/starter-tracks";

const repoRoot = path.resolve(import.meta.dir, "../../../..");
const contentRoot = path.join(repoRoot, "apps/web/content");

function contentFileForHref(href: string) {
  const cleanHref = href.replace(/#.*$/, "").replace(/^\/+/, "").replace(/\/$/, "");
  const [area, ...slugParts] = cleanHref.split("/");
  if (area !== "guides" && area !== "docs") return null;

  const base = path.join(contentRoot, area, ...slugParts);
  return existsSync(base + ".mdx") ? base + ".mdx" : path.join(base, "index.mdx");
}

describe("starter tracks", () => {
  test("point at existing builder presets", () => {
    const presetIds = new Set(PRESET_TEMPLATES.map((preset) => preset.id));

    for (const track of STARTER_TRACKS) {
      expect(presetIds.has(track.presetId), track.id).toBe(true);
    }
  });

  test("use the same schema-valid graph as the shared catalog", () => {
    for (const track of getStarterTrackCatalog().tracks) {
      const preset = PRESET_TEMPLATES.find((candidate) => candidate.id === track.presetId);

      expect(preset, track.id).toBeDefined();
      expect(preset?.stack.stackMode, track.id).toBe("multi");
      expect(preset?.stack.stackPartSpecs, track.id).toEqual(track.stackPartSpecs);
      expect(
        validateStackParts(parseStackPartSpecs(track.stackPartSpecs)).issues,
        track.id,
      ).toEqual([]);
    }
  });

  test("point at existing guide and docs pages", () => {
    for (const track of STARTER_TRACKS) {
      const guideFile = contentFileForHref(track.guideHref);
      const docsFile = contentFileForHref(track.docsHref);

      expect(guideFile, track.id).not.toBeNull();
      expect(docsFile, track.id).not.toBeNull();
      expect(existsSync(guideFile as string), track.guideHref).toBe(true);
      expect(existsSync(docsFile as string), track.docsHref).toBe(true);
    }
  });

  test("reports only bounded track and evidence identifiers for selection analytics", () => {
    const track = getStarterTrackCatalog().tracks.find((candidate) => candidate.id === "rest-api");
    if (!track) throw new Error("REST API track is missing");

    expect(selectionAnalyticsProperties(track.selection, getCapabilityInventory())).toMatchObject({
      ecosystem: "python",
      starter_track: "rest-api",
      selected_evidence_level: "listed",
    });
  });
});
