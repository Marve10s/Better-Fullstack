import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, test } from "bun:test";

import { PRESET_TEMPLATES } from "../src/lib/constant";
import { STARTER_TRACKS } from "../src/lib/starter-tracks";

const repoRoot = path.resolve(import.meta.dir, "../../..");
const contentRoot = path.join(repoRoot, "apps/web/content");

function contentFileForHref(href: string) {
  const cleanHref = href.replace(/^\/+/, "").replace(/\/$/, "");
  const [area, ...slugParts] = cleanHref.split("/");
  if (area !== "guides" && area !== "docs") return null;

  return path.join(contentRoot, area, ...slugParts) + ".mdx";
}

describe("starter tracks", () => {
  test("point at existing builder presets", () => {
    const presetIds = new Set(PRESET_TEMPLATES.map((preset) => preset.id));

    for (const track of STARTER_TRACKS) {
      expect(presetIds.has(track.presetId), track.id).toBe(true);
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
});
