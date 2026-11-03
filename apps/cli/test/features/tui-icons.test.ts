import { ICON_REGISTRY } from "@web/lib/stack/tech-icons";
import { describe, expect, test } from "bun:test";

import { MIN_ICON_CONTRAST, TUI_BACKGROUND, contrastRatio, iconBackdrop } from "@/tui/contrast";
import { ICON_IMAGE_SIZE, iconCells, iconFor, iconPixels, listIcons } from "@/tui/icons";

describe("TUI icons", () => {
  test("every web builder icon id ships a pre-rendered TUI icon", () => {
    const missing = Object.keys(ICON_REGISTRY).filter((id) => !iconFor(id));
    expect(missing).toEqual([]);
  });

  test("every icon meets 3:1 contrast against the backdrop it is drawn on", () => {
    const failures = listIcons().flatMap((icon) => {
      const ratio = contrastRatio(icon.ink, iconBackdrop(icon.badge));
      return ratio >= MIN_ICON_CONTRAST ? [] : [`${icon.source} ${ratio.toFixed(2)}:1`];
    });
    expect(failures).toEqual([]);
  });

  test("icons go on a badge exactly when their colour is below 3:1 on the TUI background", () => {
    const wrong = listIcons().filter(
      (icon) => icon.badge !== contrastRatio(icon.ink, TUI_BACKGROUND) < MIN_ICON_CONTRAST,
    );
    expect(wrong.map((icon) => icon.source)).toEqual([]);
  });

  test("black logos such as Next.js, Express and Medusa render on the light badge", () => {
    for (const id of ["next", "express", "medusa"]) {
      const icon = iconFor(id);
      expect(icon?.badge).toBe(true);
      const colors = iconCells(icon!)
        .flat()
        .flatMap((cell) => [cell.top, cell.bottom]);
      const light = colors.filter((color) => contrastRatio(color.slice(1), TUI_BACKGROUND) >= 3);
      expect(light.length).toBeGreaterThanOrEqual(colors.length / 2);
    }
  });

  test("image pixels decode for terminals with an image protocol", () => {
    const pixels = iconPixels(iconFor("hono")!);
    expect(pixels.length).toBe(ICON_IMAGE_SIZE * ICON_IMAGE_SIZE * 4);
    expect(pixels.some((value, index) => index % 4 === 3 && value > 200)).toBe(true);
  });
});
