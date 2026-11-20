import zlib from "node:zlib";

import {
  COMFORTABLE_ICON_CONTRAST,
  contrastRatio,
  parseHex,
  readableInk,
  toHex,
  TUI_BACKGROUND,
} from "@/tui/contrast";
import asset from "@/tui/icons.generated.json";

export type TuiIcon = (typeof asset.icons)[number];

export type IconMode = "image" | "nerd" | "plain";

export type IconContext = {
  stepKey?: string;
  results?: Readonly<Record<string, unknown>>;
};

export type IconGlyph = { char: string; fg: string };

const ids: Record<string, number | undefined> = asset.ids;
const devicons: Record<string, string | undefined> = asset.nerd;

export const ICON_IMAGE_SIZE = asset.imageSize;

const ALIASES: Record<string, string> = {
  eloquent: "laravel",
  turnstile: "cloudflare",
  botid: "vercel",
  "pydantic-ai": "pydantic",
  "tanstack-ai": "tanstack-query",
  "firebase-jwt": "firebase",
  "lcobucci-jwt": "jwt",
  "opentelemetry-java": "opentelemetry",
  "spring-amqp": "spring-boot",
  "mongodb-driver": "mongodb",
  "prometheus-net": "prometheus",
  "react-native-testing-library": "react-native",
  "maestro-react-native-testing-library": "maestro",
  "kemal-session": "kemal",
  "spec-kemal": "kemal",
};

const ALIAS_PREFIXES: [string, string][] = [
  ["expo-", "expo-router"],
  ["laravel-", "laravel"],
  ["symfony-", "symfony"],
  ["marten-", "marten"],
];

const ECOSYSTEM_KEY_PREFIXES: [string, string][] = [
  ["rust", "rust"],
  ["python", "python"],
  ["go", "go"],
  ["java", "java"],
  ["dotnet", "dotnet"],
  ["ruby", "ruby"],
  ["php", "php"],
  ["elixir", "elixir"],
  ["crystal", "crystal"],
  ["mobile", "react-native"],
];

const PLAIN_GLYPHS: Record<string, string> = {
  typescript: "◈",
  "react-native": "⚛",
  rust: "⚙",
  python: "∿",
  go: "◉",
  java: "♨",
  dotnet: "⬡",
  ruby: "◆",
  php: "⬢",
  elixir: "✧",
  crystal: "◊",
  next: "▲",
  "tanstack-start": "◫",
  "react-router": "⇄",
  nuxt: "◭",
  svelte: "◬",
  "solid-start": "◎",
  hono: "≋",
  elysia: "◠",
  express: "≡",
  fastify: "»",
  convex: "◍",
  none: "∅",
  bun: "●",
  node: "⬢",
  workers: "≈",
  postgres: "▤",
  sqlite: "▢",
  mysql: "▥",
  mongodb: "◗",
  drizzle: "⋰",
  prisma: "◮",
  mongoose: "◗",
  "better-auth": "⬟",
  clerk: "◆",
};

const FALLBACK_GLYPH = "◇";

function ecosystemIconId(stepKey: string | undefined): string | undefined {
  if (!stepKey) return undefined;
  return ECOSYSTEM_KEY_PREFIXES.find(
    ([prefix]) => stepKey.startsWith(prefix) && /^[A-Z]/.test(stepKey.charAt(prefix.length)),
  )?.[1];
}

function selfIconId(context: IconContext): string | undefined {
  const frontend = context.results?.frontend;
  const first = Array.isArray(frontend) ? frontend.find((value) => value !== "none") : undefined;
  if (typeof first !== "string") return undefined;
  return ids[`self-${first}`] !== undefined ? `self-${first}` : first;
}

export function resolveIconId(value: unknown, context: IconContext = {}): string | undefined {
  if (typeof value !== "string" || value === "none") return undefined;
  if (ids[value] !== undefined) return value;
  if (value === "self") return selfIconId(context);
  const alias = ALIASES[value] ?? ALIAS_PREFIXES.find(([prefix]) => value.startsWith(prefix))?.[1];
  if (alias && ids[alias] !== undefined) return alias;
  return ecosystemIconId(context.stepKey);
}

export function listIcons(): readonly TuiIcon[] {
  return asset.icons;
}

export function iconFor(value: unknown, context: IconContext = {}): TuiIcon | undefined {
  const id = resolveIconId(value, context);
  const index = id === undefined ? undefined : ids[id];
  return index === undefined ? undefined : asset.icons[index];
}

export function iconGlyph(
  value: unknown,
  mode: IconMode,
  accent: string,
  context: IconContext = {},
): IconGlyph {
  const id = resolveIconId(value, context);
  const icon = iconFor(value, context);
  const devicon = id === undefined ? undefined : devicons[id];
  if (mode !== "plain" && devicon) {
    return {
      fg: icon ? readableInk(icon.ink) : accent,
      char: String.fromCodePoint(Number.parseInt(devicon, 16)),
    };
  }
  const plain = typeof value === "string" ? PLAIN_GLYPHS[value] : undefined;
  const glyph =
    plain ?? (id ? PLAIN_GLYPHS[id.replace(/^self-/, "")] : undefined) ?? FALLBACK_GLYPH;
  return { char: glyph, fg: icon ? readableInk(icon.ink) : accent };
}

export function iconModeFromEnv(value: string | undefined): IconMode | undefined {
  const normalized = value?.trim().toLowerCase();
  return normalized === "image" || normalized === "nerd" || normalized === "plain"
    ? normalized
    : undefined;
}

const NERD_FONT_TERMINALS = /ghostty|kitty|wezterm/i;

export function detectIconMode(input: {
  forced?: IconMode;
  imageProtocol: string;
  terminalName?: string;
  termProgram?: string;
  term?: string;
}): IconMode {
  if (input.forced) return input.forced;
  if (input.imageProtocol === "kitty") return "image";
  const names = [input.terminalName, input.termProgram, input.term].filter(Boolean).join(" ");
  return NERD_FONT_TERMINALS.test(names) ? "nerd" : "plain";
}

let atlas: Uint8Array | undefined;

export function iconPixels(icon: TuiIcon): Uint8Array {
  atlas ??= zlib.inflateSync(Buffer.from(asset.atlas, "base64"));
  const count = ICON_IMAGE_SIZE * ICON_IMAGE_SIZE;
  const ink = parseHex(readableInk(icon.ink));
  const dark = contrastRatio(icon.ink, TUI_BACKGROUND) < COMFORTABLE_ICON_CONTRAST;
  const background = parseHex(TUI_BACKGROUND);
  const pixels = new Uint8Array(count * 4);
  for (let index = 0; index < count; index++) {
    const source = icon.offset + (icon.mono ? index : index * 4);
    const stored = [0, 1, 2].map((channel) => atlas?.[source + channel] ?? 0);
    const color = icon.mono ? ink : dark ? parseHex(readableInk(toHex(stored))) : stored;
    const alpha = (atlas[icon.mono ? source : source + 3] ?? 0) / 255;
    for (let channel = 0; channel < 3; channel++) {
      pixels[index * 4 + channel] = Math.round(
        (color[channel] ?? 0) * alpha + (background[channel] ?? 0) * (1 - alpha),
      );
    }
    pixels[index * 4 + 3] = 255;
  }
  return pixels;
}
