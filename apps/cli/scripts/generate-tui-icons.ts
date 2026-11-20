import { Resvg } from "@resvg/resvg-js";
import { icoToPng } from "@scripts/ico-to-png";
import { ICON_REGISTRY, type IconConfig } from "@web/lib/stack/tech-icons";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import zlib from "node:zlib";

import { TUI_BACKGROUND, inkColor, parseHex } from "@/tui/contrast";

const ROOT = path.resolve(import.meta.dir, "..");
const WEB_PUBLIC = path.resolve(ROOT, "../web/public");
const OUTPUT = path.join(ROOT, "src/tui/icons.generated.json");
const CANVAS = 64;
const IMAGE_SIZE = 64;
const NERD_FONTS_VERSION = "3.4.0";
const NERD_GLYPH_NAMES = `https://raw.githubusercontent.com/ryanoasis/nerd-fonts/v${NERD_FONTS_VERSION}/glyphnames.json`;

const TUI_ONLY_ICONS: Record<string, IconConfig> = {
  yarn: { type: "si", slug: "yarn", hex: "2C8EBB" },
  uv: { type: "si", slug: "uv", hex: "DE5FE9" },
  ktor: { type: "si", slug: "ktor", hex: "087CFA" },
  keycloak: { type: "si", slug: "keycloak", hex: "4D4D4D" },
  revenuecat: { type: "si", slug: "revenuecat", hex: "F2545B" },
  scalar: { type: "si", slug: "scalar", hex: "1A1A1A" },
};

const DEVICON_NAMES: Record<string, string> = {
  next: "nextjs",
  node: "nodejs",
  postgres: "postgresql",
  "prisma-postgres": "prisma",
  "react-native": "react",
  "expo-router": "react",
  "expo-notifications": "react",
  vue: "vuejs",
  nuxt: "nuxtjs",
  solid: "solidjs",
  "solid-start": "solidjs",
  tailwind: "tailwindcss",
  workers: "cloudflareworkers",
  d1: "cloudflare",
  r2: "cloudflare",
  antd: "antdesign",
  mui: "materialui",
  "django-rest-framework": "djangorest",
  cypress: "cypressio",
  "apollo-client": "graphql",
  "apollo-server": "graphql",
  "graphql-yoga": "graphql",
  "graphql-codegen": "graphql",
  "graphql-hotchocolate": "graphql",
  "vite-plus": "vitejs",
  "react-vite": "vitejs",
  "vanilla-vite": "vitejs",
  "ef-core": "dotnetcore",
  "minimal-api": "dotnetcore",
  junit5: "junit",
  "pytest-cov": "pytest",
  "kafka-go": "apachekafka",
  rdkafka: "apachekafka",
  brod: "apachekafka",
  "confluent-kafka": "apachekafka",
  amqp: "rabbitmq",
  "mongodb-atlas": "mongodb",
  "upstash-redis": "redis",
  "phoenix-live-view": "phoenix",
  "docker-compose": "docker",
  devcontainer: "docker",
  scss: "sass",
  "postcss-only": "postcss",
};

const DEVICON_PREFIXES: [string, string][] = [
  ["spring-", "spring"],
  ["aspnet-blazor", "blazor"],
  ["aspnet-", "dotnetcore"],
  ["ecto", "ecto"],
];

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

function frame(dataUri: string): string {
  const inset = 2;
  const size = CANVAS - inset * 2;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CANVAS}" height="${CANVAS}" viewBox="0 0 ${CANVAS} ${CANVAS}"><image href="${dataUri}" x="${inset}" y="${inset}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/></svg>`;
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
  const bare = straightAlpha(render(frame(dataUri), CANVAS).pixels);
  if (!bare.some((value, index) => index % 4 === 3 && value > 0)) {
    throw new Error("rendered no pixels");
  }
  const ink = inkColor(bare);
  const logo = straightAlpha(render(frame(dataUri), IMAGE_SIZE).pixels);
  const mono = isMonochrome(logo, ink);
  return {
    source: source.key,
    ink,
    image: mono ? logo.filter((_, index) => index % 4 === 3) : quantize(logo),
    mono,
  };
}

function deviconName(id: string, names: ReadonlySet<string>): string | undefined {
  const base = id.startsWith("self-") ? id.slice(5) : id;
  const prefixed = DEVICON_PREFIXES.find(([prefix]) => base.startsWith(prefix))?.[1];
  const candidates = [DEVICON_NAMES[base], prefixed, base.replaceAll(/[-_]/g, "")];
  return candidates.find((name): name is string => name !== undefined && names.has(name));
}

async function loadDevicons(): Promise<Map<string, string>> {
  const response = await fetch(NERD_GLYPH_NAMES);
  if (!response.ok) throw new Error(`${NERD_GLYPH_NAMES} answered ${response.status}`);
  const glyphs: unknown = await response.json();
  if (typeof glyphs !== "object" || glyphs === null)
    throw new Error("glyphnames.json is not an object");
  const devicons = new Map<string, string>();
  for (const [name, glyph] of Object.entries(glyphs)) {
    if (!name.startsWith("dev-") || typeof glyph !== "object" || glyph === null) continue;
    if ("code" in glyph && typeof glyph.code === "string") devicons.set(name.slice(4), glyph.code);
  }
  return devicons;
}

async function main() {
  const registry = { ...ICON_REGISTRY, ...TUI_ONLY_ICONS };
  const devicons = await loadDevicons();
  const deviconIds = new Set(devicons.keys());
  const nerd = Object.fromEntries(
    Object.keys(registry)
      .sort()
      .flatMap((id) => {
        const name = deviconName(id, deviconIds);
        return name ? [[id, devicons.get(name)]] : [];
      }),
  );

  const sources = new Map<string, Source>();
  const sourceById = new Map<string, string>();
  for (const [id, config] of Object.entries(registry)) {
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
    imageSize: IMAGE_SIZE,
    nerdFonts: NERD_FONTS_VERSION,
    ids,
    nerd,
    icons,
    atlas: atlas.toString("base64"),
  };
  await writeFile(OUTPUT, `${JSON.stringify(asset)}\n`);
  console.log(
    `Wrote ${icons.length} icons for ${Object.keys(ids).length} ids (${Object.keys(nerd).length} devicons, atlas ${atlas.length} bytes) to ${path.relative(ROOT, OUTPUT)}`,
  );
}

await main();
