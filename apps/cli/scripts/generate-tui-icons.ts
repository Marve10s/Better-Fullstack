import { Resvg } from "@resvg/resvg-js";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import zlib from "node:zlib";

import { ICON_REGISTRY, type IconConfig } from "../../web/src/lib/stack/tech-icons";
import {
  ICON_BADGE,
  TUI_BACKGROUND,
  inkColor,
  needsBadge,
  parseHex,
  toHex,
} from "../src/tui/contrast";
import { icoToPng } from "./ico-to-png";

const ROOT = path.resolve(import.meta.dir, "..");
const WEB_PUBLIC = path.resolve(ROOT, "../web/public");
const OUTPUT = path.join(ROOT, "src/tui/icons.generated.json");
const CANVAS = 64;
const IMAGE_SIZE = 32;
const BADGE_RADIUS = 0.22;
const CELL_COLUMNS = 4;
const CELL_ROWS = 2;

type Source = { key: string; load: () => Promise<{ bytes: Uint8Array; mime: string }> };

function isIco(bytes: Uint8Array): boolean {
  return bytes[0] === 0 && bytes[1] === 0 && bytes[2] === 1 && bytes[3] === 0;
}

function mimeOf(bytes: Uint8Array, fallback: string): string {
  if (bytes[0] === 0x89 && bytes[1] === 0x50) return "image/png";
  if (bytes[0] === 0xff && bytes[1] === 0xd8) return "image/jpeg";
  if (bytes[0] === 0x47 && bytes[1] === 0x49) return "image/gif";
  if (bytes[8] === 0x57 && bytes[9] === 0x45) return "image/webp";
  return fallback;
}

async function fetchBytes(url: string) {
  for (let attempt = 1; ; attempt++) {
    const response = await fetch(url);
    if (response.ok) {
      const bytes = new Uint8Array(await response.arrayBuffer());
      return { bytes, mime: mimeOf(bytes, "image/svg+xml") };
    }
    if (attempt === 3) throw new Error(`${url} answered ${response.status}`);
    await Bun.sleep(500 * attempt);
  }
}

function sourceFor(config: IconConfig): Source {
  if (config.type === "si") {
    const url = `https://cdn.simpleicons.org/${config.slug}/${config.hex}`;
    return { key: `si:${config.slug}:${config.hex.toLowerCase()}`, load: () => fetchBytes(url) };
  }
  if (/^https?:/.test(config.src)) {
    return { key: `url:${config.src}`, load: () => fetchBytes(config.src) };
  }
  const file = path.join(WEB_PUBLIC, config.src);
  return {
    key: `file:${config.src}`,
    load: async () => {
      const bytes = new Uint8Array(await readFile(file));
      return { bytes, mime: mimeOf(bytes, "image/svg+xml") };
    },
  };
}

function render(svg: string, size: number) {
  return new Resvg(svg, {
    fitTo: { mode: "width", value: size },
    font: { loadSystemFonts: false },
    logLevel: "off",
  }).render();
}

function frame(dataUri: string, badge: boolean, withBackdrop = badge): string {
  const inset = badge ? 10 : 2;
  const size = CANVAS - inset * 2;
  const backdrop = withBackdrop
    ? `<rect width="${CANVAS}" height="${CANVAS}" rx="${BADGE_RADIUS * CANVAS}" fill="#${ICON_BADGE}"/>`
    : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS}" height="${CANVAS}" viewBox="0 0 ${CANVAS} ${CANVAS}">${backdrop}<image href="${dataUri}" x="${inset}" y="${inset}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/></svg>`;
}

function straightAlpha(premultiplied: Uint8Array): Uint8Array {
  const pixels = new Uint8Array(premultiplied.length);
  for (let offset = 0; offset < pixels.length; offset += 4) {
    const alpha = premultiplied[offset + 3] ?? 0;
    for (let channel = 0; channel < 3; channel++) {
      pixels[offset + channel] =
        alpha === 0
          ? 0
          : Math.min(255, Math.round(((premultiplied[offset + channel] ?? 0) * 255) / alpha));
    }
    pixels[offset + 3] = alpha;
  }
  return pixels;
}

function halfBlockCells(rgba: Uint8Array, width: number): string {
  const background = parseHex(TUI_BACKGROUND);
  const block = width / CELL_COLUMNS;
  const pixel = (column: number, row: number) => {
    const sum = [0, 0, 0, 0];
    for (let y = row * block; y < (row + 1) * block; y++) {
      for (let x = column * block; x < (column + 1) * block; x++) {
        const offset = (y * width + x) * 4;
        const alpha = (rgba[offset + 3] ?? 0) / 255;
        for (let channel = 0; channel < 3; channel++) {
          sum[channel] = (sum[channel] ?? 0) + (rgba[offset + channel] ?? 0) * alpha;
        }
        sum[3] = (sum[3] ?? 0) + alpha;
      }
    }
    const weight = sum[3] ?? 0;
    const coverage = weight / (block * block);
    return toHex(
      background.map((base, channel) => {
        const color = weight > 0 ? (sum[channel] ?? 0) / weight : base;
        return color * coverage + base * (1 - coverage);
      }),
    );
  };
  let cells = "";
  for (let row = 0; row < CELL_ROWS; row++) {
    for (let column = 0; column < CELL_COLUMNS; column++) {
      cells += pixel(column, row * 2) + pixel(column, row * 2 + 1);
    }
  }
  return cells;
}

function quantize(pixels: Uint8Array): Uint8Array {
  return pixels.map((value, index) =>
    (pixels[index - (index % 4) + 3] ?? 0) === 0 ? 0 : value & 0xf8,
  );
}

function isMonochrome(pixels: Uint8Array, ink: string): boolean {
  const target = parseHex(ink);
  for (let offset = 0; offset < pixels.length; offset += 4) {
    if ((pixels[offset + 3] ?? 0) < 64) continue;
    for (let channel = 0; channel < 3; channel++) {
      if (Math.abs((pixels[offset + channel] ?? 0) - (target[channel] ?? 0)) > 12) return false;
    }
  }
  return true;
}

async function buildIcon(source: Source) {
  const loaded = await source.load();
  const bytes = isIco(loaded.bytes) ? icoToPng(loaded.bytes) : loaded.bytes;
  const mime = isIco(loaded.bytes) ? "image/png" : loaded.mime;
  const dataUri = `data:${mime};base64,${Buffer.from(bytes).toString("base64")}`;
  const bare = straightAlpha(render(frame(dataUri, false), CANVAS).pixels);
  if (!bare.some((value, index) => index % 4 === 3 && value > 0)) {
    throw new Error("rendered no pixels");
  }
  const ink = inkColor(bare);
  const badge = needsBadge(ink);
  const logo = straightAlpha(render(frame(dataUri, badge, false), IMAGE_SIZE).pixels);
  const mono = isMonochrome(logo, ink);
  return {
    source: source.key,
    badge,
    ink,
    cells: halfBlockCells(straightAlpha(render(frame(dataUri, badge), CANVAS).pixels), CANVAS),
    image: mono ? logo.filter((_, index) => index % 4 === 3) : quantize(logo),
    mono,
  };
}

async function main() {
  const sources = new Map<string, Source>();
  const sourceById = new Map<string, string>();
  for (const [id, config] of Object.entries(ICON_REGISTRY)) {
    const source = sourceFor(config);
    sources.set(source.key, source);
    sourceById.set(id, source.key);
  }

  const built: Awaited<ReturnType<typeof buildIcon>>[] = [];
  const failures: string[] = [];
  const queue = [...sources.values()];
  await Promise.all(
    Array.from({ length: 8 }, async () => {
      for (let source = queue.shift(); source; source = queue.shift()) {
        try {
          built.push(await buildIcon(source));
        } catch (error) {
          failures.push(`${source.key}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    }),
  );
  if (failures.length > 0) {
    throw new Error(`Could not render ${failures.length} icon(s):\n${failures.sort().join("\n")}`);
  }

  built.sort((a, b) => a.source.localeCompare(b.source));
  const segments: Uint8Array[] = [];
  let offset = 0;
  const icons = built.map(({ image, ...icon }) => {
    segments.push(image);
    const entry = { ...icon, offset };
    offset += image.length;
    return entry;
  });
  const indexBySource = new Map(icons.map((icon, index) => [icon.source, index]));
  const ids = Object.fromEntries(
    [...sourceById.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([id, source]) => [id, indexBySource.get(source)]),
  );
  const atlas = zlib.deflateSync(Buffer.concat(segments), { level: 9 });

  const asset = {
    background: TUI_BACKGROUND,
    badge: ICON_BADGE,
    columns: CELL_COLUMNS,
    rows: CELL_ROWS,
    imageSize: IMAGE_SIZE,
    badgeRadius: BADGE_RADIUS,
    ids,
    icons,
    atlas: atlas.toString("base64"),
  };
  await writeFile(OUTPUT, `${JSON.stringify(asset)}\n`);
  const badged = icons.filter((icon) => icon.badge).length;
  console.log(
    `Wrote ${icons.length} icons for ${Object.keys(ids).length} ids (${badged} on a badge, atlas ${atlas.length} bytes) to ${path.relative(ROOT, OUTPUT)}`,
  );
}

await main();
