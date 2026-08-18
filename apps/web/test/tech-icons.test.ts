import { describe, expect, test } from "bun:test";
import { existsSync } from "node:fs";

import { ICON_REGISTRY } from "../src/lib/tech-icons";

describe("tech icon registry", () => {
  test("renders Vercel Analytics through the theme-aware registry", () => {
    expect(ICON_REGISTRY["vercel-analytics"]).toEqual({
      type: "si",
      slug: "vercel",
      hex: "000000",
    });
  });

  test("renders Nango from the bundled official icon", () => {
    expect(ICON_REGISTRY.nango).toEqual({
      type: "local",
      src: "/icon/nango.svg",
      needsInvert: "dark",
    });
    expect(existsSync(new URL("../public/icon/nango.svg", import.meta.url))).toBe(true);
  });
});
