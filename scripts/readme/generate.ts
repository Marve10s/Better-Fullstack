import { TITLE_TEXT } from "@root/apps/cli/src/presentation/render-title";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

const root = join(import.meta.dir, "../..");
const outDir = join(root, ".github/media/readme");
const iconDir = join(import.meta.dir, "assets/icons");
const readmePath = join(root, "README.md");
const repo = "Marve10s/Better-Fullstack";

const fontFiles = {
  mono: join(root, "apps/web/public/fonts/GeistMono-Variable.woff2"),
  pixel: join(root, "apps/web/public/fonts/GeistPixel-Square.woff2"),
};

type FontName = keyof typeof fontFiles;

const ink = {
  bg: "#0c0c0c",
  panel: "#151515",
  line: "#2a2a2a",
  fg: "#f4f4f4",
  soft: "#9b9b9b",
  dim: "#5c5c5c",
};

type Span = { text: string; fill?: string; weight?: number };

type TextOptions = {
  size: number;
  fill: string;
  weight?: number;
  font?: FontName;
  anchor?: "start" | "middle" | "end";
  spacing?: number;
};

type Stop = { at: number; css: string; ease?: string };

type Doc = ReturnType<typeof createDoc>;

const round = (value: number) => Math.round(value * 100) / 100;

const escapeXml = (value: string) =>
  value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

function createDoc() {
  const used = { mono: new Set<string>(), pixel: new Set<string>() };
  const rules: string[] = [];
  let sequence = 0;

  function text(content: string | Span[], x: number, y: number, options: TextOptions) {
    const font = options.font ?? "mono";
    const spans = typeof content === "string" ? [{ text: content }] : content;
    for (const span of spans) {
      for (const character of span.text) used[font].add(character);
    }
    const body = spans
      .map((span) => {
        const attributes = [
          span.fill ? ` fill="${span.fill}"` : "",
          span.weight ? ` font-weight="${span.weight}"` : "",
        ].join("");
        return attributes
          ? `<tspan${attributes}>${escapeXml(span.text)}</tspan>`
          : escapeXml(span.text);
      })
      .join("");
    const attributes = [
      `x="${round(x)}"`,
      `y="${round(y)}"`,
      `font-size="${options.size}"`,
      `fill="${options.fill}"`,
      font === "pixel" ? 'class="px"' : "",
      options.weight ? `font-weight="${options.weight}"` : "",
      options.anchor ? `text-anchor="${options.anchor}"` : "",
      options.spacing ? `letter-spacing="${options.spacing}"` : "",
    ]
      .filter(Boolean)
      .join(" ");
    return `<text ${attributes}>${body}</text>`;
  }

  function animate(stops: Stop[], total: number, rest: string) {
    const name = `a${sequence}`;
    sequence += 1;
    const frames = new Map<string, string>();
    const sorted = stops.toSorted((left, right) => left.at - right.at);
    const first = sorted[0];
    const last = sorted.at(-1);
    if (!first || !last) throw new Error("An animation needs at least one stop");
    const all = [
      ...(first.at > 0 ? [{ at: 0, css: first.css }] : []),
      ...sorted,
      ...(last.at < total ? [{ at: total, css: last.css }] : []),
    ];
    for (const stop of all) {
      const percent = `${Math.round((Math.min(stop.at, total) / total) * 100000) / 1000}%`;
      const ease = "ease" in stop && stop.ease ? `;animation-timing-function:${stop.ease}` : "";
      frames.set(percent, `${percent}{${stop.css}${ease}}`);
    }
    rules.push(
      `@keyframes ${name}{${[...frames.values()].join("")}}.${name}{${rest};animation:${name} ${total}s linear infinite}`,
    );
    return name;
  }

  function show(
    on: number,
    off: number,
    total: number,
    options: { fadeIn?: number; fadeOut?: number; rest?: boolean } = {},
  ) {
    const fadeIn = options.fadeIn ?? 0.3;
    const fadeOut = options.fadeOut ?? 0.35;
    return animate(
      [
        { at: on, css: "opacity:0" },
        { at: on + fadeIn, css: "opacity:1" },
        { at: off, css: "opacity:1" },
        { at: off + fadeOut, css: "opacity:0" },
      ],
      total,
      options.rest ? "opacity:1" : "opacity:0",
    );
  }

  function use(font: FontName, characters: string) {
    for (const character of characters) used[font].add(character);
  }

  return { used, rules, text, animate, show, use };
}

const iconCache = new Map<string, string>();

async function loadIcons(names: string[]) {
  await Promise.all(
    names.map(async (name) => {
      const source = await readFile(join(iconDir, `${name}.svg`), "utf8");
      const path = /<path d="([^"]+)"/.exec(source)?.[1];
      if (!path) throw new Error(`Icon ${name} has no path`);
      iconCache.set(name, path);
    }),
  );
}

function icon(name: string, x: number, y: number, size: number, fill: string, extra = "") {
  const path = iconCache.get(name);
  if (!path) throw new Error(`Icon ${name} is not loaded`);
  return `<path transform="translate(${round(x)} ${round(y)}) scale(${round(size / 24)})" fill="${fill}" d="${path}"${extra}/>`;
}

function check(x: number, y: number, color: string) {
  return `<path d="M${round(x)} ${round(y)}l3 3 6-7" fill="none" stroke="${color}" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function cross(x: number, y: number, color: string) {
  return `<path d="M${round(x)} ${round(y)}l7 7m0-7l-7 7" fill="none" stroke="${color}" stroke-width="1.7" stroke-linecap="round"/>`;
}

function cardFrame(width: number, height: number) {
  return `x="4" y="4" width="${width - 8}" height="${height - 8}" rx="14"`;
}

function card(width: number, height: number) {
  return `<rect ${cardFrame(width, height)} fill="${ink.bg}"/>`;
}

const subsetCache = new Map<string, Promise<string>>();

function subsetFont(font: FontName, characters: Set<string>) {
  const textValue = [...characters].toSorted().join("");
  const key = `${font}:${textValue}`;
  const cached = subsetCache.get(key);
  if (cached) return cached;
  const subset = createSubset(font, textValue);
  subsetCache.set(key, subset);
  return subset;
}

async function createSubset(font: FontName, textValue: string) {
  const directory = await mkdtemp(join(tmpdir(), "bfs-readme-font-"));
  const textFile = join(directory, "text.txt");
  const output = join(directory, "subset.woff2");
  await writeFile(textFile, textValue);
  const subset = Bun.spawn(
    [
      "uvx",
      "--from",
      "fonttools[woff]",
      "pyftsubset",
      fontFiles[font],
      `--text-file=${textFile}`,
      "--flavor=woff2",
      "--layout-features=",
      `--output-file=${output}`,
    ],
    { stdout: "ignore", stderr: "pipe" },
  );
  if ((await subset.exited) !== 0) {
    throw new Error(`pyftsubset failed: ${await new Response(subset.stderr).text()}`);
  }
  const encoded = (await readFile(output)).toString("base64");
  await rm(directory, { recursive: true });
  return encoded;
}

async function render(
  doc: Doc,
  options: { width: number; height: number; label: string; body: string },
) {
  const faces: string[] = [];
  if (doc.used.mono.size > 0) {
    faces.push(
      `@font-face{font-family:M;font-weight:100 900;font-display:swap;src:url(data:font/woff2;base64,${await subsetFont("mono", doc.used.mono)}) format("woff2")}`,
    );
  }
  if (doc.used.pixel.size > 0) {
    faces.push(
      `@font-face{font-family:P;font-display:swap;src:url(data:font/woff2;base64,${await subsetFont("pixel", doc.used.pixel)}) format("woff2")}`,
    );
  }
  const style = [
    ...faces,
    "text{font-family:M,ui-monospace,SFMono-Regular,Menlo,Consolas,monospace;font-weight:400;white-space:pre}",
    ".px{font-family:P,ui-monospace,SFMono-Regular,Menlo,monospace;font-weight:500}",
    ".fill{transform-box:fill-box;transform-origin:left center}",
    ...doc.rules,
    "@media (prefers-reduced-motion:reduce){*{animation:none!important}}",
  ].join("");
  const label = escapeXml(options.label);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${options.width}" height="${options.height}" viewBox="0 0 ${options.width} ${options.height}" role="img" aria-label="${label}"><title>${label}</title><style>${style}</style>${options.body}</svg>\n`;
}

const heroScenes = [
  [
    {
      role: "database",
      ecosystem: "universal",
      tool: "postgres",
      name: "Postgres",
      icon: "postgresql",
    },
    { role: "backend", ecosystem: "go", tool: "gin", name: "Gin", icon: "go" },
    {
      role: "frontend",
      ecosystem: "typescript",
      tool: "next",
      name: "Next.js",
      icon: "typescript",
    },
    { role: "mobile", ecosystem: "react-native", tool: "native-bare", name: "Expo", icon: "react" },
  ],
  [
    { role: "database", ecosystem: "universal", tool: "sqlite", name: "SQLite", icon: "sqlite" },
    { role: "backend", ecosystem: "rust", tool: "axum", name: "Axum", icon: "rust" },
    { role: "frontend", ecosystem: "typescript", tool: "astro", name: "Astro", icon: "typescript" },
    { role: "mobile", ecosystem: "swift", tool: "swiftui", name: "SwiftUI", icon: "swift" },
  ],
  [
    {
      role: "database",
      ecosystem: "universal",
      tool: "postgres",
      name: "Postgres",
      icon: "postgresql",
    },
    { role: "backend", ecosystem: "elixir", tool: "phoenix", name: "Phoenix", icon: "elixir" },
    {
      role: "frontend",
      ecosystem: "dotnet",
      tool: "blazor-webassembly",
      name: "Blazor",
      icon: "dotnet",
    },
    {
      role: "mobile",
      ecosystem: "kotlin",
      tool: "compose-multiplatform",
      name: "Compose",
      icon: "kotlin",
    },
  ],
];

type Vector = [number, number, number];

const stackGrid = {
  columns: 52,
  rows: 30,
  fontSize: 9.6,
  lineHeight: 10.56,
  frames: 24,
  frameTime: 0.1,
  unit: 100,
};
const shades = " .:-=+*#%@";
const layerHeights = [-0.72, -0.24, 0.24, 0.72];
const layerHalf: Vector = [1, 0.17, 1];
const tilt = Math.PI / 6;
const light: Vector = [-0.45, 0.8, 0.4];
const axes = [0, 1, 2] as const;

function dot(left: Vector, right: Vector) {
  return left[0] * right[0] + left[1] * right[1] + left[2] * right[2];
}

function spin(vector: Vector, angle: number): Vector {
  const cosine = Math.cos(angle);
  const sine = Math.sin(angle);
  return [vector[0] * cosine - vector[2] * sine, vector[1], vector[0] * sine + vector[2] * cosine];
}

function layerHit(origin: Vector, direction: Vector, height: number) {
  let near = -Infinity;
  let far = Infinity;
  let normal: Vector = [0, 0, 0];
  for (const axis of axes) {
    const offset = origin[axis] - (axis === 1 ? height : 0);
    const slope = direction[axis];
    if (Math.abs(slope) < 1e-9) {
      if (Math.abs(offset) > layerHalf[axis]) return undefined;
      continue;
    }
    const first = (-layerHalf[axis] - offset) / slope;
    const second = (layerHalf[axis] - offset) / slope;
    const enter = Math.min(first, second);
    if (enter > near) {
      near = enter;
      normal = [0, 0, 0];
      normal[axis] = slope > 0 ? -1 : 1;
    }
    far = Math.min(far, Math.max(first, second));
  }
  return near <= far ? { near, normal, height } : undefined;
}

function shadeAt(x: number, y: number, angle: number) {
  const forward: Vector = [0, -Math.sin(tilt), -Math.cos(tilt)];
  const origin = spin(
    [x, y * Math.cos(tilt) - forward[1] * 10, -y * Math.sin(tilt) - forward[2] * 10],
    -angle,
  );
  const direction = spin(forward, -angle);
  const hits = layerHeights.flatMap((height) => layerHit(origin, direction, height) ?? []);
  const nearest = hits.toSorted((left, right) => left.near - right.near)[0];
  if (!nearest) return 0;
  if (nearest.normal[1] === 1 && nearest.height !== layerHeights.at(-1)) return 0.1;
  return 0.18 + 0.82 * Math.max(0, dot(spin(nearest.normal, angle), light));
}

function stackFrame(angle: number) {
  const { columns, rows, fontSize, lineHeight, unit } = stackGrid;
  const cell = fontSize * 0.6;
  const samples = [0, 1].flatMap((across) => [0, 1, 2].map((down) => ({ across, down })));
  return Array.from({ length: rows }, (_row, row) =>
    Array.from({ length: columns }, (_column, column) => {
      const level =
        samples.reduce((sum, sample) => {
          const x = ((column + (sample.across + 0.5) / 2 - columns / 2) * cell) / unit;
          const y = ((rows / 2 - row - (sample.down + 0.5) / 3) * lineHeight) / unit;
          return sum + shadeAt(x, y, angle);
        }, 0) / samples.length;
      if (level < 0.04) return " ";
      const index = Math.round(level * (shades.length - 1));
      return shades[Math.max(1, Math.min(shades.length - 1, index))] ?? " ";
    })
      .join("")
      .trimEnd(),
  );
}

async function hero() {
  const doc = createDoc();
  const width = 830;
  const height = 424;
  const sceneLength = 8.4;
  const total = sceneLength * heroScenes.length;
  const characterWidth = 13 * 0.6;
  const textX = 36;
  const partX = textX + characterWidth * 2;
  const { columns, rows, fontSize, lineHeight, frames, frameTime, unit } = stackGrid;
  const cell = fontSize * 0.6;
  const stackLeft = 418;
  const stackTop = 54;
  const stackHeight = rows * lineHeight;
  const stackCenterY = stackTop + stackHeight / 2;
  const band = stackHeight / layerHeights.length;
  const labelX = stackLeft + columns * cell + 10;

  doc.use("mono", shades);
  doc.rules.push(
    `@keyframes fr{0%{opacity:1}${100 / frames}%{opacity:0}100%{opacity:0}}.f{opacity:0;animation:fr ${round(frames * frameTime)}s step-end infinite}.f0{opacity:1}`,
    "@keyframes in{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:none}}.in{animation:in .55s cubic-bezier(.2,.8,.2,1) both}",
  );

  const bannerLines = TITLE_TEXT.split("\n").slice(1, -1);
  const banner = bannerLines.map((line, index) =>
    line.trim()
      ? `<g class="in" style="animation-delay:${round(index * 0.045)}s" stroke="${ink.fg}" stroke-width=".45">${doc.text(line, textX - 4.8, 52 + index * 10.4, { size: 8, fill: ink.fg })}</g>`
      : "",
  );

  const stackFrames = Array.from({ length: frames }, (_frame, index) => {
    const spans = stackFrame(Math.PI / 4 + (index / frames) * (Math.PI / 2)).flatMap(
      (line, row) => {
        const trimmed = line.trimStart();
        if (!trimmed) return [];
        const x = round(stackLeft + (line.length - trimmed.length) * cell);
        const y = round(stackTop + (row + 0.8) * lineHeight);
        return [`<tspan x="${x}" y="${y}">${escapeXml(trimmed)}</tspan>`];
      },
    );
    return `<text class="f${index === 0 ? " f0" : ""}" style="animation-delay:${round(index * frameTime)}s" font-size="${fontSize}" fill="${ink.fg}">${spans.join("")}</text>`;
  });

  const body: string[] = [
    `<defs><clipPath id="card"><rect ${cardFrame(width, height)}/></clipPath><clipPath id="typed"><rect x="0" y="0" width="${stackLeft - 12}" height="${height}"/></clipPath></defs>`,
    card(width, height),
    ...banner,
    `<g class="in" style="animation-delay:.7s">${doc.text("One project from parts in any language.", textX, 204, { size: 12.5, fill: ink.soft })}</g>`,
    doc.text(
      [
        { text: "$ ", fill: ink.soft },
        { text: "bun create better-fullstack@latest my-app" },
        { text: " \\", fill: ink.soft },
      ],
      textX,
      240,
      { size: 13, fill: ink.fg },
    ),
    ...stackFrames,
  ];

  const curtainStops: Stop[] = [];

  heroScenes.forEach((scene, sceneIndex) => {
    const offset = sceneIndex * sceneLength;
    const exit = offset + 7.6;
    const rest = sceneIndex === 0;
    curtainStops.push({ at: offset, css: "transform:translateY(0)" });

    scene.forEach((part, index) => {
      const start = offset + 1.2 + index * 0.95;
      const y = 264 + index * 24;
      const isLast = index === scene.length - 1;
      const spans: Span[] = [
        { text: "--part ", fill: ink.soft },
        { text: `${part.role}:` },
        { text: part.ecosystem, weight: 700 },
        { text: `:${part.tool}` },
        ...(isLast ? [] : [{ text: " \\", fill: ink.soft }]),
      ];
      const length = spans.reduce((sum, span) => sum + span.text.length, 0);
      const distance = round(length * characterWidth);
      const line = doc.show(start - 0.05, exit, total, { fadeIn: 0.01, rest });
      body.push(`<g class="${line}">${doc.text(spans, partX, y, { size: 13, fill: ink.fg })}</g>`);
      const typing = doc.animate(
        [
          { at: start - 0.07, css: "opacity:0;transform:translateX(0)" },
          {
            at: start - 0.06,
            css: "opacity:1;transform:translateX(0)",
            ease: `steps(${length},end)`,
          },
          { at: start + 0.55, css: `opacity:1;transform:translateX(${distance}px)` },
          { at: start + 0.9, css: `opacity:1;transform:translateX(${distance}px)` },
          { at: start + 0.91, css: `opacity:0;transform:translateX(${distance}px)` },
        ],
        total,
        "opacity:0",
      );
      body.push(
        `<g clip-path="url(#typed)"><g class="${typing}"><rect x="${round(partX - 1)}" y="${y - 13}" width="${distance + 4}" height="18" fill="${ink.bg}"/><rect x="${round(partX)}" y="${y - 11}" width="7" height="14" fill="${ink.fg}"/></g></g>`,
      );

      const printed = start + 0.55;
      curtainStops.push(
        {
          at: printed,
          css: `transform:translateY(${round(-index * band)}px)`,
          ease: "steps(8,end)",
        },
        { at: printed + 0.5, css: `transform:translateY(${round(-(index + 1) * band)}px)` },
      );
      const layerY = stackCenterY - (layerHeights[index] ?? 0) * Math.cos(tilt) * unit;
      const label = doc.show(printed + 0.4, exit, total, { fadeIn: 0.25, rest });
      body.push(
        `<g class="${label}">${icon(part.icon, labelX, layerY - 6.5, 13, ink.fg)}${doc.text(part.name, labelX + 19, layerY + 3.5, { size: 10, fill: ink.fg })}</g>`,
      );
    });

    curtainStops.push(
      {
        at: exit,
        css: `transform:translateY(${round(-stackHeight)}px)`,
        ease: `steps(${rows},end)`,
      },
      { at: exit + 0.6, css: "transform:translateY(0)" },
    );

    const verified = offset + 5.3;
    const results = ["4 stack parts compatible", "project written to ./my-app"];
    results.forEach((result, index) => {
      const y = 372 + index * 24;
      const line = doc.show(verified + index * 0.5, exit, total, { fadeIn: 0.2, rest });
      body.push(
        `<g class="${line}">${check(textX, y - 5, ink.fg)}${doc.text(result, partX, y, { size: 13, fill: ink.fg })}</g>`,
      );
    });
  });

  const curtain = doc.animate(
    curtainStops,
    total,
    `transform:translateY(${round(-stackHeight - 8)}px)`,
  );
  body.push(
    `<g clip-path="url(#card)"><rect class="${curtain}" x="${stackLeft - 6}" y="${stackTop - 4}" width="${round(columns * cell + 12)}" height="${round(stackHeight + 8)}" fill="${ink.bg}"/></g>`,
  );

  return render(doc, {
    width,
    height,
    label:
      "Better Fullstack. A terminal shows the CLI banner and runs bun create better-fullstack with one --part flag per stack part. A rotating ASCII stack prints one layer for each part: a database, a backend, a frontend and a mobile app from different languages, written as one project.",
    body: body.join(""),
  });
}

const ecosystems = [
  { name: "TypeScript", tooling: "npm, pnpm, Yarn, Bun", icon: "typescript" },
  { name: "React Native", tooling: "Expo", icon: "react" },
  { name: "Rust", tooling: "Cargo", icon: "rust" },
  { name: "Python", tooling: "uv", icon: "python" },
  { name: "Go", tooling: "Go modules", icon: "go" },
  { name: "Java", tooling: "Maven, Gradle", icon: "openjdk" },
  { name: "Kotlin", tooling: "Maven, Gradle", icon: "kotlin" },
  { name: "Elixir", tooling: "Mix", icon: "elixir" },
  { name: ".NET", tooling: ".NET SDK", icon: "dotnet" },
  { name: "PHP", tooling: "Composer", icon: "php" },
  { name: "Ruby", tooling: "Bundler", icon: "ruby" },
  { name: "Crystal", tooling: "Shards", icon: "crystal" },
];

const verifiedIcons = [
  "typescript",
  "react",
  "rust",
  "python",
  "go",
  "openjdk",
  "elixir",
  "dotnet",
];

async function ecosystemBand() {
  const doc = createDoc();
  const width = 830;
  const perRow = 6;
  const rowHeight = 96;
  const height = 68 + rowHeight * Math.ceil(ecosystems.length / perRow);
  const columnWidth = (width - 32) / perRow;
  const segment = 1.5;
  const total = segment * ecosystems.length;
  const cell = (index: number) =>
    `transform:translate(${round((index % perRow) * columnWidth)}px,${Math.floor(index / perRow) * rowHeight}px)`;
  const stops = ecosystems.flatMap((_ecosystem, index) => [
    { at: index * segment, css: cell(index) },
    { at: index * segment + 1.1, css: cell(index), ease: "cubic-bezier(.6,0,.2,1)" },
  ]);
  const marker = doc.animate([...stops, { at: total, css: cell(0) }], total, cell(0));
  const body = [
    card(width, height),
    doc.text("Ecosystems", 28, 40, { size: 16, fill: ink.fg, font: "pixel" }),
    doc.text("PHP, Ruby and Crystal are experimental", width - 28, 39, {
      size: 10,
      fill: ink.soft,
      anchor: "end",
    }),
    `<g class="${marker}"><rect x="20" y="56" width="${round(columnWidth - 8)}" height="${rowHeight - 4}" rx="9" fill="${ink.panel}"/><rect x="${round(16 + columnWidth / 2 - 12)}" y="${56 + rowHeight - 7}" width="24" height="3" rx="1.5" fill="${ink.fg}"/></g>`,
    ...ecosystems.map((ecosystem, index) => {
      const center = 16 + columnWidth * ((index % perRow) + 0.5);
      const top = 56 + Math.floor(index / perRow) * rowHeight;
      return [
        icon(ecosystem.icon, center - 13, top + 12, 26, ink.fg),
        doc.text(ecosystem.name, center, top + 60, {
          size: 11.5,
          fill: ink.fg,
          weight: 500,
          anchor: "middle",
        }),
        doc.text(ecosystem.tooling, center, top + 76, {
          size: 9,
          fill: ink.soft,
          anchor: "middle",
        }),
      ].join("");
    }),
  ];
  return render(doc, {
    width,
    height,
    label: `Ecosystems: ${ecosystems.map((ecosystem) => ecosystem.name).join(", ")}. PHP, Ruby and Crystal are experimental.`,
    body: body.join(""),
  });
}

const tileSize = { width: 276, height: 222 };

type Tile = {
  slug: string;
  title: string;
  description: [string, string];
  stage: (doc: Doc) => string;
};

function chip(
  doc: Doc,
  label: string,
  x: number,
  y: number,
  colors: { fill: string; stroke: string; text: string },
) {
  const chipWidth = round(label.length * 6 + 18);
  return {
    width: chipWidth,
    markup: `<rect x="${x}" y="${y}" width="${chipWidth}" height="22" rx="6" fill="${colors.fill}" stroke="${colors.stroke}"/>${doc.text(label, x + 9, y + 14.5, { size: 10, fill: colors.text })}`,
  };
}

function builderStage(doc: Doc) {
  const total = 8;
  const quiet = { fill: ink.bg, stroke: ink.line, text: ink.soft };
  const picked = { fill: ink.fg, stroke: ink.fg, text: ink.bg };
  const rows = [
    { label: "frontend", y: 48, options: ["Next.js", "Astro", "SvelteKit"], pick: 0, at: 1 },
    { label: "backend", y: 92, options: ["Hono", "Gin", "Axum"], pick: 1, at: 2.6 },
  ];
  const parts = [
    doc.text("Build", 20, 30, { size: 9.5, fill: ink.fg, weight: 500 }),
    doc.text("Preview", 62, 30, { size: 9.5, fill: ink.dim }),
    doc.text("Edit & Run", 116, 30, { size: 9.5, fill: ink.dim }),
    `<rect x="20" y="35" width="29" height="1.5" fill="${ink.fg}"/>`,
  ];
  for (const row of rows) {
    parts.push(doc.text(row.label, 20, row.y + 8, { size: 8.5, fill: ink.dim }));
    let x = 20;
    row.options.forEach((option, index) => {
      const base = chip(doc, option, x, row.y + 14, quiet);
      parts.push(base.markup);
      if (index === row.pick) {
        const selection = doc.show(row.at, 7.2, total, { fadeIn: 0.15, rest: true });
        parts.push(
          `<g class="${selection}">${chip(doc, option, x, row.y + 14, picked).markup}</g>`,
        );
      }
      x += base.width + 6;
    });
  }
  const empty = doc.show(0.01, 1, total, { fadeIn: 0.1, fadeOut: 0.1 });
  const first = doc.show(1.1, 2.6, total, { fadeIn: 0.15, fadeOut: 0.1 });
  const second = doc.show(2.75, 7.2, total, { fadeIn: 0.15, rest: true });
  parts.push(
    `<rect x="20" y="136" width="236" height="1" fill="${ink.line}"/>`,
    `<g class="${empty}">${doc.text("pick a part to build the command", 20, 153, { size: 9, fill: ink.dim })}</g>`,
    `<g class="${first}">${doc.text("--part frontend:typescript:next", 20, 153, { size: 9, fill: ink.fg })}</g>`,
    `<g class="${second}">${doc.text("... next --part backend:go:gin", 20, 153, { size: 9, fill: ink.fg })}</g>`,
  );
  return parts.join("");
}

function browserStage(doc: Doc) {
  const total = 9;
  const files = ["apps/web", "  src/routes", "  package.json", "bts.jsonc"];
  const statuses = [
    { label: "generating files", on: 0.3, off: 1.9 },
    { label: "npm install", on: 2.1, off: 4.1 },
    { label: "dev server ready", on: 4.3, off: 8.3 },
  ];
  const progress = doc.animate(
    [
      { at: 0.3, css: "transform:scaleX(0)", ease: "cubic-bezier(.4,0,.2,1)" },
      { at: 4.3, css: "transform:scaleX(1)" },
      { at: 8.3, css: "transform:scaleX(1);opacity:1" },
      { at: 8.6, css: "transform:scaleX(1);opacity:0" },
    ],
    total,
    "transform:scaleX(1)",
  );
  const page = doc.show(4.4, 8.3, total, { fadeIn: 0.4, rest: true });
  return [
    `<rect x="20" y="20" width="236" height="132" rx="7" fill="${ink.panel}" stroke="${ink.line}"/>`,
    `<path d="M20 40H256M98 40V152" fill="none" stroke="${ink.line}"/>`,
    ...statuses.map((status, index) => {
      const visible = doc.show(status.on, status.off, total, {
        fadeIn: 0.15,
        fadeOut: 0.15,
        rest: index === statuses.length - 1,
      });
      return `<g class="${visible}">${doc.text(status.label, 30, 33.5, { size: 9, fill: ink.soft })}</g>`;
    }),
    `<rect class="fill ${progress}" x="20" y="39.5" width="236" height="1.5" fill="${ink.fg}"/>`,
    ...files.map((file, index) => {
      const visible = doc.show(0.5 + index * 0.3, 8.3, total, { fadeIn: 0.15, rest: true });
      return `<g class="${visible}">${doc.text(file, 28, 58 + index * 15, { size: 8.5, fill: index === 0 ? ink.fg : ink.soft })}</g>`;
    }),
    `<g class="${page}"><rect x="110" y="52" width="134" height="88" rx="5" fill="${ink.bg}" stroke="${ink.line}"/><rect x="120" y="64" width="62" height="7" rx="2" fill="${ink.fg}"/><rect x="120" y="80" width="112" height="4" rx="2" fill="${ink.dim}"/><rect x="120" y="90" width="88" height="4" rx="2" fill="${ink.dim}"/><rect x="120" y="108" width="46" height="18" rx="5" fill="${ink.fg}"/></g>`,
  ].join("");
}

function mcpStage(doc: Doc) {
  const total = 8;
  const tools = [
    "bfs_recommend_stack",
    "bfs_check_compatibility",
    "bfs_plan_project",
    "bfs_create_project",
  ];
  return [
    icon("modelcontextprotocol", 20, 20, 15, ink.fg),
    doc.text("better-fullstack", 42, 32, { size: 10.5, fill: ink.fg, weight: 500 }),
    doc.text("stdio", 256, 32, { size: 9, fill: ink.dim, anchor: "end" }),
    `<rect x="20" y="44" width="236" height="1" fill="${ink.line}"/>`,
    ...tools.map((tool, index) => {
      const y = 68 + index * 24;
      const called = 0.5 + index * 1.2;
      const row = doc.show(called, 7.3, total, { fadeIn: 0.15, rest: true });
      const done = doc.show(called + 0.7, 7.3, total, { fadeIn: 0.15, rest: true });
      return `<g class="${row}">${doc.text(tool, 20, y, { size: 10, fill: ink.fg })}</g><g class="${done}">${check(246, y - 5, ink.fg)}</g>`;
    }),
  ].join("");
}

function compatibilityStage(doc: Doc) {
  const total = 8;
  const y = 52;
  const neutral = { fill: ink.panel, stroke: ink.line, text: ink.fg };
  const frontend = chip(doc, "SvelteKit", 42, y, neutral);
  const apiX = 42 + frontend.width + 70;
  const rejectedAt = 1.2;
  const fixedAt = 3.8;
  const exit = 7.3;
  const checking = doc.show(0.01, rejectedAt, total, { fadeIn: 0.1, fadeOut: 0.1 });
  const rejected = doc.show(rejectedAt + 0.1, fixedAt, total, { fadeIn: 0.15, fadeOut: 0.1 });
  const fixed = doc.show(fixedAt + 0.15, exit, total, { fadeIn: 0.2, rest: true });
  const nodeX = 42 + frontend.width + 35;
  return [
    '<g transform="translate(138 86) scale(1.2) translate(-138 -86)">',
    `<path d="M${42 + frontend.width} ${y + 11}H${apiX}" stroke="${ink.line}" stroke-dasharray="3 3"/>`,
    frontend.markup,
    `<g class="${doc.show(0.01, fixedAt, total, { fadeIn: 0.1, fadeOut: 0.1 })}">${chip(doc, "tRPC", apiX, y, neutral).markup}</g>`,
    `<g class="${rejected}">${chip(doc, "tRPC", apiX, y, { fill: ink.panel, stroke: ink.fg, text: ink.fg }).markup}<circle cx="${nodeX}" cy="${y + 11}" r="10" fill="${ink.bg}" stroke="${ink.fg}"/>${cross(nodeX - 3.5, y + 7.5, ink.fg)}</g>`,
    `<g class="${fixed}">${chip(doc, "oRPC", apiX, y, { fill: ink.fg, stroke: ink.fg, text: ink.bg }).markup}<circle cx="${nodeX}" cy="${y + 11}" r="10" fill="${ink.bg}" stroke="${ink.fg}"/>${check(nodeX - 4.5, y + 11, ink.fg)}</g>`,
    `<g class="${checking}">${doc.text("checking the pair", 138, 112, { size: 10, fill: ink.dim, anchor: "middle" })}</g>`,
    `<g class="${rejected}">${doc.text("rejected: tRPC needs React", 138, 112, { size: 10, fill: ink.fg, anchor: "middle" })}</g>`,
    `<g class="${fixed}">${doc.text("compatible with oRPC", 138, 112, { size: 10, fill: ink.fg, anchor: "middle" })}</g>`,
    doc.text("checked before any file is written", 138, 134, {
      size: 9,
      fill: ink.dim,
      anchor: "middle",
    }),
    "</g>",
  ].join("");
}

function lifecycleStage(doc: Doc) {
  const total = 9;
  const command = "create-bfs add --email resend";
  const characterWidth = 10 * 0.6;
  const distance = round(command.length * characterWidth);
  const typed = doc.show(0.55, 8.2, total, { fadeIn: 0.01, rest: true });
  const curtain = doc.animate(
    [
      { at: 0.5, css: "opacity:0;transform:translateX(0)" },
      { at: 0.51, css: "opacity:1;transform:translateX(0)", ease: `steps(${command.length},end)` },
      { at: 1.5, css: `opacity:1;transform:translateX(${distance}px)` },
      { at: 2, css: `opacity:1;transform:translateX(${distance}px)` },
      { at: 2.01, css: `opacity:0;transform:translateX(${distance}px)` },
    ],
    total,
    "opacity:0",
  );
  const added = doc.show(2.1, 8.2, total, { fadeIn: 0.25, rest: true });
  const lines = ['"frontend": ["next"],', '"backend": "hono",', '"auth": "better-auth",'];
  return [
    doc.text("$", 20, 33, { size: 10, fill: ink.fg }),
    `<g class="${typed}">${doc.text(command, 32, 33, { size: 10, fill: ink.fg })}</g>`,
    `<defs><clipPath id="typed"><rect x="20" y="20" width="236" height="20"/></clipPath></defs><g clip-path="url(#typed)"><g class="${curtain}"><rect x="31" y="22" width="${distance + 4}" height="16" fill="${ink.bg}"/><rect x="32" y="24" width="6" height="12" fill="${ink.fg}"/></g></g>`,
    `<rect x="20" y="46" width="236" height="106" rx="7" fill="${ink.panel}" stroke="${ink.line}"/>`,
    doc.text("bts.jsonc", 32, 64, { size: 9, fill: ink.dim }),
    ...lines.map((line, index) =>
      doc.text(line, 32, 84 + index * 17, { size: 10, fill: ink.soft }),
    ),
    `<g class="${added}"><rect x="20.5" y="122" width="235" height="20" fill="${ink.fg}" opacity=".16"/><rect x="20.5" y="122" width="2.5" height="20" fill="${ink.fg}"/>${doc.text('"email": "resend"', 32, 135.5, { size: 10, fill: ink.fg })}</g>`,
  ].join("");
}

function receiptStage(doc: Doc) {
  const total = 9;
  const stages = ["generate", "build", "start"];
  const firstColumn = 92;
  const step = (256 - 8 - firstColumn) / (verifiedIcons.length - 1);
  return [
    ...verifiedIcons.map((name, index) =>
      icon(name, firstColumn + index * step - 6.5, 22, 13, ink.soft),
    ),
    ...stages.flatMap((stage, row) => {
      const y = 66 + row * 30;
      return [doc.text(stage, 20, y + 3.5, { size: 9.5, fill: ink.soft })].concat(
        verifiedIcons.map((_name, column) => {
          const x = round(firstColumn + column * step);
          const passed = doc.show(0.4 + (row * verifiedIcons.length + column) * 0.22, 8.2, total, {
            fadeIn: 0.12,
            rest: true,
          });
          return `<circle cx="${x}" cy="${y}" r="5" fill="none" stroke="${ink.line}" stroke-width="1.5"/><circle class="${passed}" cx="${x}" cy="${y}" r="5.75" fill="${ink.fg}"/>`;
        }),
      );
    }),
  ].join("");
}

const tiles: Tile[] = [
  {
    slug: "builder",
    title: "Stack Builder",
    description: ["Pick parts in the browser. Copy the", "command or download a ZIP."],
    stage: builderStage,
  },
  {
    slug: "browser",
    title: "Runs in the browser",
    description: ["Preview the file tree, then edit and", "run TypeScript web stacks in a tab."],
    stage: browserStage,
  },
  {
    slug: "mcp",
    title: "MCP server",
    description: ["Agents plan, check and create projects", "through tool calls instead of flags."],
    stage: mcpStage,
  },
  {
    slug: "compatibility",
    title: "Compatibility engine",
    description: ["Invalid combinations are rejected or", "adjusted before any file is written."],
    stage: compatibilityStage,
  },
  {
    slug: "lifecycle",
    title: "add, update, check",
    description: ["bts.jsonc records the stack, so later", "commands can extend and repair it."],
    stage: lifecycleStage,
  },
  {
    slug: "receipts",
    title: "Release receipts",
    description: ["Eight ecosystem recipes are generated,", "built and started for every release."],
    stage: receiptStage,
  },
];

async function tile(definition: Tile) {
  const doc = createDoc();
  const body = [
    card(tileSize.width, tileSize.height),
    definition.stage(doc),
    doc.text(definition.title, 20, 178, { size: 15, fill: ink.fg, font: "pixel" }),
    doc.text(definition.description[0], 20, 194, { size: 9.5, fill: ink.soft }),
    doc.text(definition.description[1], 20, 206, { size: 9.5, fill: ink.soft }),
  ];
  return render(doc, {
    ...tileSize,
    label: `${definition.title}. ${definition.description.join(" ")}`,
    body: body.join(""),
  });
}

function mergedPullAuthor(entry: unknown) {
  if (typeof entry !== "object" || entry === null) return undefined;
  if (!("merged_at" in entry) || !entry.merged_at) return undefined;
  if (!("user" in entry) || typeof entry.user !== "object" || entry.user === null) return undefined;
  const user = entry.user;
  if (!("login" in user) || !("type" in user)) return undefined;
  return user.type === "User" && typeof user.login === "string" ? user.login : undefined;
}

async function mergedPullCounts(
  page = 1,
  counts = new Map<string, number>(),
): Promise<Map<string, number>> {
  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(
    `https://api.github.com/repos/${repo}/pulls?state=closed&per_page=100&page=${page}`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    },
  );
  if (!response.ok) throw new Error(`GitHub pull request list failed: ${response.status}`);
  const pulls: unknown = await response.json();
  if (!Array.isArray(pulls)) throw new Error("Unexpected pull request response");
  if (pulls.length === 0) return counts;
  for (const entry of pulls) {
    const login = mergedPullAuthor(entry);
    if (login) counts.set(login, (counts.get(login) ?? 0) + 1);
  }
  return mergedPullCounts(page + 1, counts);
}

async function contributorWall() {
  const counts = await mergedPullCounts();
  const owner = repo.split("/")[0];
  return [...counts]
    .filter(([login]) => login !== owner)
    .toSorted((left, right) => right[1] - left[1])
    .map(
      ([login]) =>
        `<a href="https://github.com/${login}"><img src="https://github.com/${login}.png?size=128" width="64" height="64" alt="${login}" title="${login}"></a>`,
    )
    .join("");
}

async function updateContributors() {
  const start = "<!-- contributors:start -->";
  const end = "<!-- contributors:end -->";
  const readme = await readFile(readmePath, "utf8");
  const from = readme.indexOf(start);
  const to = readme.indexOf(end);
  if (from === -1 || to === -1) throw new Error("README.md has no contributors markers");
  const wall = `<p>${await contributorWall()}</p>`;
  await writeFile(
    readmePath,
    `${readme.slice(0, from + start.length)}\n${wall}\n${readme.slice(to)}`,
  );
}

async function main() {
  await mkdir(outDir, { recursive: true });
  await loadIcons([
    ...new Set([
      ...heroScenes.flat().map((part) => part.icon),
      ...ecosystems.map((ecosystem) => ecosystem.icon),
      ...verifiedIcons,
      "modelcontextprotocol",
    ]),
  ]);
  const assets = [
    { name: "hero", svg: hero() },
    { name: "ecosystems", svg: ecosystemBand() },
  ].concat(tiles.map((definition) => ({ name: `tile-${definition.slug}`, svg: tile(definition) })));
  await Promise.all(
    assets.map(async (asset) => writeFile(join(outDir, `${asset.name}.svg`), await asset.svg)),
  );
  if (process.argv.includes("--contributors")) await updateContributors();
}

await main();
