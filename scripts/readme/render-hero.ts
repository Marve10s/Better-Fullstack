import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { parseArgs } from "node:util";

const PACKAGE_NAME = "create-better-fullstack";
const ASSETS = path.join(import.meta.dir, "assets");

const THEMES = {
  dark: {
    bg: "#141413",
    line: "#2d2c29",
    grid: "#232220",
    text: "#f2eeee",
    muted: "#8d8a84",
    lime: "#c6e853",
    limeText: "#c6e853",
    ink: "#1b1a17",
    tile: "#1f1e1b",
    cursor: "#c6e853",
  },
  light: {
    bg: "#f7f0df",
    line: "#d8cfb6",
    grid: "#e6dcc3",
    text: "#1b1a17",
    muted: "#6b6760",
    lime: "#c6e853",
    limeText: "#56730a",
    ink: "#1b1a17",
    tile: "#efe7d2",
    cursor: "#1b1a17",
  },
};

type ThemeName = keyof typeof THEMES;
type Theme = (typeof THEMES)[ThemeName];

const LANGUAGES = [
  { label: "TypeScript", slug: "typescript", light: "#3178C6", dark: "#4f8fdc" },
  { label: "React Native", slug: "react", light: "#149ECA", dark: "#61DAFB" },
  { label: "Rust", slug: "rust", light: "#1b1a17", dark: "#f2eeee" },
  { label: "Go", slug: "go", light: "#00ADD8", dark: "#00ADD8" },
  { label: "Python", slug: "python", light: "#3776AB", dark: "#5a9fd6" },
  { label: "Java", slug: "java", light: null, dark: null },
  { label: "Kotlin", slug: "kotlin", light: "#7F52FF", dark: "#9c7bff" },
  { label: ".NET", slug: "dotnet", light: "#512BD4", dark: "#8b6cf0" },
  { label: "Elixir", slug: "elixir", light: "#4B275F", dark: "#a77bc9" },
  { label: "PHP", slug: "php", light: "#777BB4", dark: "#9a9ed6" },
  { label: "Ruby", slug: "ruby", light: "#CC342D", dark: "#e5534b" },
  { label: "Crystal", slug: "crystal", light: "#1b1a17", dark: "#f2eeee" },
];

const PIXEL_ADVANCE: Record<string, number> = {
  "0": 570,
  "1": 494,
  "2": 646,
  "3": 608,
  "4": 684,
  "5": 570,
  "6": 646,
  "7": 570,
  "8": 646,
  "9": 646,
  ".": 190,
  ",": 190,
  v: 494,
};

const WIDTH = 960;
const HEIGHT = 480;
const MARGIN = 56;
const TILE = 52;
const TILE_Y = 364;
const STEP_SECONDS = 1.7;

function escapeXml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

async function fontFace(family: string, file: string) {
  const data = (await readFile(path.join(ASSETS, "fonts", file))).toString("base64");
  return `@font-face{font-family:${family};src:url(data:font/woff2;base64,${data}) format('woff2')}`;
}

async function languageIcon(slug: string, color: string | null, x: number, y: number) {
  const raw = await readFile(path.join(ASSETS, "icons", `${slug}.svg`), "utf8");
  const viewBox = raw.match(/viewBox="([^"]+)"/)?.[1] ?? "0 0 24 24";
  const inner = (raw.match(/<svg[^>]*>([\s\S]*)<\/svg>/)?.[1] ?? "").replace(
    /<title>.*?<\/title>/,
    "",
  );
  const body = color
    ? `<g fill="${color}">${inner.replace(/fill="#[0-9A-Fa-f]{3,6}"/g, "")}</g>`
    : inner;
  return `<svg x="${x}" y="${y}" width="28" height="28" viewBox="${viewBox}">${body}</svg>`;
}

function pixelWidth(value: string, size: number) {
  return ([...value].reduce((sum, char) => sum + (PIXEL_ADVANCE[char] ?? 608), 0) / 1000) * size;
}

function scoreboard(theme: Theme, version: string, downloads: string) {
  const cells = [
    { value: `v${version}`, label: "npm version" },
    { value: downloads, label: "downloads last month" },
  ];
  const gap = 12;
  const widths = cells.map(
    ({ value, label }) => Math.max(pixelWidth(value, 26), label.length * 6.7) + 36,
  );
  let x = WIDTH - MARGIN - widths.reduce((sum, width) => sum + width, 0) - gap;
  return cells
    .map(({ value, label }, index) => {
      const width = widths[index] ?? 0;
      const marker =
        index === 1
          ? `<rect x="${(x + width - 26).toFixed(1)}" y="52" width="8" height="8" fill="${theme.ink}"/>`
          : "";
      const cell =
        `<rect x="${x.toFixed(1)}" y="40" width="${width.toFixed(1)}" height="70" fill="${theme.lime}"/>` +
        `<text x="${(x + 18).toFixed(1)}" y="76" style="font:26px GP" fill="${theme.ink}">${escapeXml(value)}</text>` +
        marker +
        `<text x="${(x + 18).toFixed(1)}" y="96" style="font:500 11px GM" fill="${theme.ink}" opacity=".78">${escapeXml(label)}</text>`;
      x += width + gap;
      return cell;
    })
    .join("");
}

function cursorCorners(size: number, color: string) {
  const arm = 14;
  const half = 2;
  const d =
    `M${half} ${arm}V${half}H${arm} M${size - arm} ${half}H${size - half}V${arm} ` +
    `M${size - half} ${size - arm}V${size - half}H${size - arm} M${arm} ${size - half}H${half}V${size - arm}`;
  return `<path d="${d}" fill="none" stroke="${color}" stroke-width="4"/>`;
}

export async function renderHero(themeName: ThemeName, version: string, downloads: string) {
  const theme = THEMES[themeName];
  const count = LANGUAGES.length;
  const cycle = STEP_SECONDS * count;
  const slot = 100 / count;
  const pitch = TILE + (WIDTH - 2 * MARGIN - count * TILE) / (count - 1);
  const words = LANGUAGES.map(({ label, ...colors }, index) => {
    const color = colors[themeName] ?? (themeName === "light" ? "#ea2d2e" : "#f0605f");
    const className = index === 0 ? "w w0" : "w";
    return `<text class="${className}" style="animation-delay:${(index * STEP_SECONDS).toFixed(2)}s" x="${MARGIN}" y="258" fill="${color}">${escapeXml(label)}.</text>`;
  }).join("");
  const tiles = (
    await Promise.all(
      LANGUAGES.map(async ({ slug, ...colors }, index) => {
        const x = MARGIN + index * pitch;
        const icon = await languageIcon(slug, colors[themeName], x + 12, TILE_Y + 12);
        return (
          `<g class="t" style="animation-delay:${(index * STEP_SECONDS).toFixed(2)}s">` +
          `<rect x="${x.toFixed(1)}" y="${TILE_Y}" width="${TILE}" height="${TILE}" fill="${theme.tile}" stroke="${theme.line}" stroke-width="2"/>${icon}</g>`
        );
      }),
    )
  ).join("");
  const cursorFrames = [
    ...LANGUAGES.map(
      (_, index) =>
        `${(index * slot).toFixed(3)}%{transform:translateX(${(index * pitch).toFixed(1)}px)}`,
    ),
    `100%{transform:translateX(${((count - 1) * pitch).toFixed(1)}px)}`,
  ].join("");
  const fonts = await Promise.all([
    fontFace("GP", "GeistPixel-Square.sub.woff2"),
    fontFace("GM", "GeistMono-Variable.sub.woff2"),
  ]);
  const css = `${fonts.join("\n")}
.w{font:46px GP;opacity:0;animation:w ${cycle}s infinite}
.w0{opacity:1}
.t{opacity:.3;animation:t ${cycle}s infinite}
@keyframes w{0%{opacity:0;transform:translateY(10px)}${(slot * 0.1).toFixed(2)}%{opacity:1;transform:none}${(slot * 0.86).toFixed(2)}%{opacity:1;transform:none}${slot.toFixed(2)}%{opacity:0;transform:translateY(-10px)}100%{opacity:0}}
@keyframes t{0%{opacity:.3}${(slot * 0.1).toFixed(2)}%{opacity:1}${(slot * 0.86).toFixed(2)}%{opacity:1}${slot.toFixed(2)}%{opacity:.3}100%{opacity:.3}}
@keyframes cur{${cursorFrames}}
@media (prefers-reduced-motion:reduce){*{animation:none!important}.w0,.t{opacity:1}}`;
  const grid =
    `<pattern id="g" width="24" height="24" patternUnits="userSpaceOnUse"><rect width="2" height="2" fill="${theme.grid}"/></pattern>` +
    `<rect x="2" y="2" width="${WIDTH - 4}" height="${HEIGHT - 4}" fill="url(#g)"/>`;
  const cursor =
    `<g style="animation:cur ${cycle}s steps(1,end) infinite">` +
    `<g transform="translate(${MARGIN - 6},${TILE_Y - 6})">${cursorCorners(TILE + 12, theme.cursor)}</g></g>`;
  const languageList = LANGUAGES.map(({ label }) => label).join(", ");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}" role="img" aria-label="Better Fullstack, npm version ${escapeXml(version)}, ${escapeXml(downloads)} downloads last month. Start your next app in ${escapeXml(languageList)}">
<style>${css}</style>
<rect x="1" y="1" width="${WIDTH - 2}" height="${HEIGHT - 2}" fill="${theme.bg}" stroke="${theme.line}" stroke-width="2"/>
${grid}
<text x="${MARGIN}" y="86" style="font:22px GP" fill="${theme.text}">better <tspan fill="${theme.limeText}">fullstack</tspan></text>
${scoreboard(theme, version, downloads)}
<text x="${MARGIN}" y="196" style="font:46px GP" fill="${theme.text}">Start your next app in</text>
${words}
<text x="${MARGIN}" y="310" style="font:400 16px GM" fill="${theme.muted}">Pick a stack in your terminal, your browser, or your AI agent. Get a real project back.</text>
${tiles}
${cursor}
</svg>
`;
}

async function fetchJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  const body: unknown = await response.json();
  if (typeof body !== "object" || body === null) throw new Error(`${url} returned no object`);
  return body;
}

async function fetchPackageStats() {
  const [latest, downloads] = await Promise.all([
    fetchJson(`https://registry.npmjs.org/${PACKAGE_NAME}/latest`),
    fetchJson(`https://api.npmjs.org/downloads/point/last-month/${PACKAGE_NAME}`),
  ]);
  const version = "version" in latest ? latest.version : undefined;
  const count = "downloads" in downloads ? downloads.downloads : undefined;
  if (typeof version !== "string" || typeof count !== "number") {
    throw new Error("npm returned an unexpected version or download count");
  }
  return { version, downloads: new Intl.NumberFormat("en-US").format(count) };
}

if (import.meta.main) {
  const { values } = parseArgs({
    options: {
      out: { type: "string" },
      version: { type: "string" },
      downloads: { type: "string" },
    },
  });
  if (!values.out) throw new Error("--out is required");
  const stats =
    values.version && values.downloads
      ? { version: values.version, downloads: values.downloads }
      : await fetchPackageStats();
  await mkdir(values.out, { recursive: true });
  const outDir = values.out;
  await Promise.all(
    (["dark", "light"] as const).map(async (themeName) =>
      writeFile(
        path.join(outDir, `hero-${themeName}.svg`),
        await renderHero(themeName, stats.version, stats.downloads),
      ),
    ),
  );
  console.log(`Rendered hero for v${stats.version} with ${stats.downloads} downloads`);
}
