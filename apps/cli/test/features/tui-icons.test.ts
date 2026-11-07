import { ICON_REGISTRY } from "@web/lib/stack/tech-icons";
import { describe, expect, test } from "bun:test";

import {
  COMFORTABLE_ICON_CONTRAST,
  LIGHT_INK,
  MIN_ICON_CONTRAST,
  TUI_BACKGROUND,
  contrastRatio,
  toHex,
} from "@/tui/contrast";
import {
  detectIconMode,
  ICON_IMAGE_SIZE,
  iconFor,
  iconGlyph,
  iconModeFromEnv,
  iconPixels,
  listIcons,
} from "@/tui/icons";

function pixelAt(pixels: Uint8Array, x: number, y: number) {
  const offset = (y * ICON_IMAGE_SIZE + x) * 4;
  return { hex: toHex([...pixels.subarray(offset, offset + 3)]), alpha: pixels[offset + 3] ?? 0 };
}

describe("TUI icons", () => {
  test("every web builder icon id ships a pre-rendered TUI icon", () => {
    const missing = Object.keys(ICON_REGISTRY).filter((id) => !iconFor(id));
    expect(missing).toEqual([]);
  });

  test("every icon meets 3:1 contrast on the TUI background with no tile behind it", () => {
    const failures = listIcons().flatMap((icon) => {
      const pixels = iconPixels(icon);
      const ratios = Array.from({ length: pixels.length / 4 }, (_, index) =>
        toHex([...pixels.subarray(index * 4, index * 4 + 3)]),
      )
        .filter((hex) => hex !== TUI_BACKGROUND)
        .map((hex) => contrastRatio(hex, TUI_BACKGROUND))
        .sort((a, b) => a - b);
      const solidInk = ratios[Math.floor(ratios.length * 0.75)] ?? 0;
      return solidInk >= MIN_ICON_CONTRAST ? [] : [`${icon.source} ${solidInk.toFixed(2)}:1`];
    });
    expect(failures).toEqual([]);
  });

  test("black logos such as Next.js, Express and Medusa turn light instead of sitting on a tile", () => {
    for (const id of ["next", "express", "medusa"]) {
      const pixels = iconPixels(iconFor(id)!);
      expect(pixelAt(pixels, 0, 0).hex).toBe(TUI_BACKGROUND);
      expect(iconGlyph(id, "nerd", "3b82f6").fg).toBe(LIGHT_INK);
    }
  });

  test("transparent logo pixels take the TUI background, not the terminal's own", () => {
    const corner = pixelAt(iconPixels(iconFor("hono")!), 0, 0);
    expect(corner.alpha).toBe(255);
    expect(corner.hex).toBe(TUI_BACKGROUND);
  });

  test("dim single-colour logos are lifted to a comfortable contrast", () => {
    const ink = iconGlyph("postgres", "nerd", "3b82f6").fg;
    expect(contrastRatio(ink, TUI_BACKGROUND)).toBeGreaterThanOrEqual(COMFORTABLE_ICON_CONTRAST);
  });

  test("logo images keep enough pixels to be drawn two rows tall", () => {
    const pixels = iconPixels(iconFor("hono")!);
    expect(ICON_IMAGE_SIZE).toBeGreaterThanOrEqual(64);
    expect(pixels.length).toBe(ICON_IMAGE_SIZE * ICON_IMAGE_SIZE * 4);
    expect(pixels.some((value, index) => index % 4 === 3 && value > 200)).toBe(true);
  });

  test("yarn, uv and a fullstack self backend resolve to real logos", () => {
    expect(iconFor("yarn")).toBeDefined();
    expect(iconFor("uv")).toBeDefined();
    expect(iconFor("self", { results: { frontend: ["next"] } })).toBe(iconFor("self-next")!);
    expect(iconFor("expo-camera")).toBe(iconFor("expo-router")!);
    expect(iconFor("chrono", { stepKey: "rustLibraries" })).toBe(iconFor("rust")!);
  });

  test("nerd glyphs use the devicon codepoint", () => {
    expect(iconGlyph("next", "nerd", "3b82f6").char.codePointAt(0)).toBe(0xe83e);
    expect(iconGlyph("yarn", "nerd", "3b82f6").char.codePointAt(0)).toBe(0xe8ec);
    expect(iconGlyph("hono", "plain", "3b82f6").char).toBe("≋");
  });

  test("icon mode prefers kitty images, then Nerd Font terminals, and honours the override", () => {
    expect(detectIconMode({ imageProtocol: "kitty" })).toBe("image");
    expect(detectIconMode({ imageProtocol: "blocks", terminalName: "ghostty" })).toBe("nerd");
    expect(detectIconMode({ imageProtocol: "blocks", term: "xterm-256color" })).toBe("plain");
    expect(detectIconMode({ forced: iconModeFromEnv("plain"), imageProtocol: "kitty" })).toBe(
      "plain",
    );
    expect(iconModeFromEnv("bogus")).toBeUndefined();
  });
});
