import zlib from "node:zlib";

import { parseHex } from "@/tui/contrast";
import asset from "@/tui/icons.generated.json";

export type TuiIcon = (typeof asset.icons)[number];

export type IconCell = { top: string; bottom: string };

const ids: Record<string, number | undefined> = asset.ids;

export const ICON_COLUMNS = asset.columns;
export const ICON_ROWS = asset.rows;
export const ICON_IMAGE_SIZE = asset.imageSize;

export function listIcons(): readonly TuiIcon[] {
  return asset.icons;
}

export function listIconIds(): string[] {
  return Object.keys(ids);
}

export function iconFor(value: unknown): TuiIcon | undefined {
  if (typeof value !== "string" || value === "none") return undefined;
  const index = ids[value];
  return index === undefined ? undefined : asset.icons[index];
}

export function iconCells(icon: TuiIcon): IconCell[][] {
  return Array.from({ length: ICON_ROWS }, (_, row) =>
    Array.from({ length: ICON_COLUMNS }, (_, column) => {
      const start = (row * ICON_COLUMNS + column) * 12;
      return {
        top: `#${icon.cells.slice(start, start + 6)}`,
        bottom: `#${icon.cells.slice(start + 6, start + 12)}`,
      };
    }),
  );
}

let atlas: Uint8Array | undefined;

function badgeCoverage(x: number, y: number, size: number): number {
  const radius = asset.badgeRadius * size;
  const dx = Math.max(radius - (x + 0.5), x + 0.5 - (size - radius), 0);
  const dy = Math.max(radius - (y + 0.5), y + 0.5 - (size - radius), 0);
  return Math.min(1, Math.max(0, radius + 0.5 - Math.hypot(dx, dy)));
}

export function iconPixels(icon: TuiIcon): Uint8Array {
  atlas ??= zlib.inflateSync(Buffer.from(asset.atlas, "base64"));
  const size = ICON_IMAGE_SIZE;
  const count = size * size;
  const ink = parseHex(icon.ink);
  const badge = parseHex(asset.badge);
  const pixels = new Uint8Array(count * 4);
  for (let index = 0; index < count; index++) {
    const source = icon.mono ? index : index * 4;
    const color = icon.mono
      ? ink
      : [0, 1, 2].map((channel) => atlas?.[icon.offset + source + channel] ?? 0);
    const alpha = (atlas[icon.offset + (icon.mono ? source : source + 3)] ?? 0) / 255;
    const backdrop = icon.badge ? badgeCoverage(index % size, Math.floor(index / size), size) : 0;
    const coverage = alpha + backdrop * (1 - alpha);
    for (let channel = 0; channel < 3; channel++) {
      const mixed = (color[channel] ?? 0) * alpha + (badge[channel] ?? 0) * backdrop * (1 - alpha);
      pixels[index * 4 + channel] = coverage === 0 ? 0 : Math.round(mixed / coverage);
    }
    pixels[index * 4 + 3] = Math.round(coverage * 255);
  }
  return pixels;
}
