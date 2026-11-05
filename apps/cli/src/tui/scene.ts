import type { TuiController, TuiLanding, TuiOption, TuiPrompt } from "@/tui/controller";
import type { ProgressLine } from "@/tui/progress";

import { Canvas, clip, hexColor, mix, NO_COLOR, pack, type Rgb, unpack } from "@/tui/canvas";
import { TUI_BACKGROUND } from "@/tui/contrast";
import { BIG_CHAR_WIDTH, bigText, bigTextFits, hash } from "@/tui/font";
import { firstVisibleOption, planOptionGrid, type OptionGrid } from "@/tui/grid";
import { iconFor, iconGlyph, type IconMode, type TuiIcon } from "@/tui/icons";
import { chapterTitle, type ConstellationNode, type TuiSummary } from "@/tui/summary";
import { MIN_COLUMNS, MIN_ROWS } from "@/tui/support";

export type ImagePlacement = { icon: TuiIcon; x: number; y: number; width: number; height: number };

export type SceneFrame = {
  controller: TuiController;
  summary: TuiSummary;
  now: number;
  width: number;
  height: number;
  iconMode: IconMode;
};

type Point = { x: number; y: number };

type Star = { x: number; y: number; z: number; phase: number };

type NodeState = { pos: Point; settledAt: number };

type Particle = { key: string; from: Point; startedAt: number };

type Palette = { color: Rgb; mark: string };

type CardLine = { text: string; color: number };

type Colors = {
  acc: number;
  acc2: number;
  accDim: number;
  accFaint: number;
  accBg: number;
  ink: number;
  mute: number;
  dim: number;
  amber: number;
  red: number;
  green: number;
  white: number;
};

type Layout = {
  compact: boolean;
  showHub: boolean;
  top: number;
  leftWidth: number;
  hub: Point;
  rx: number;
  ry: number;
  footer: number;
};

const BG: Rgb = unpack(hexColor(TUI_BACKGROUND));
const WHITE: Rgb = [245, 247, 250];
const INK: Rgb = [214, 220, 230];
const MUTE: Rgb = [120, 130, 150];
const DIM: Rgb = [58, 66, 82];
const NEUTRAL: Rgb = [120, 132, 156];

export const ECOSYSTEM_PALETTES: Record<string, Palette> = {
  typescript: { color: [59, 130, 246], mark: "✦" },
  "react-native": { color: [34, 211, 238], mark: "⚛" },
  rust: { color: [234, 88, 12], mark: "⚙" },
  python: { color: [34, 197, 94], mark: "∿" },
  go: { color: [6, 182, 212], mark: "◦" },
  java: { color: [239, 68, 68], mark: "♨" },
  dotnet: { color: [139, 92, 246], mark: "⬡" },
  ruby: { color: [225, 29, 72], mark: "◆" },
  php: { color: [99, 102, 241], mark: "⬢" },
  elixir: { color: [168, 85, 247], mark: "✧" },
  crystal: { color: [228, 228, 231], mark: "◊" },
};

const SPINNER = "◐◓◑◒";
const INTRO_MS = 1500;
const FLIGHT_MS = 1100;
const LINK_GROW_MS = 450;
const IMAGE_ROWS = 2;
const IMAGE_COLUMNS = 4;
const COMPACT_HEIGHT = 22;
const HUB_MIN_WIDTH = 76;
const LIST_TOP = 8;
const COMPACT_LIST_TOP = 3;
const MIN_LIST_ROWS = 3;
const ORBIT_RX = 4;
const ORBIT_DOTS: [number, number][] = [
  [0, -2],
  [3, -1],
  [4, 0],
  [3, 1],
  [0, 2],
  [-3, 1],
  [-4, 0],
  [-3, -1],
];

const ease = (u: number) => (u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2);
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));
const rad = (degrees: number) => (degrees * Math.PI) / 180;

function braille(fx: number, fy: number): string {
  const row = clamp(Math.floor(fy * 4), 0, 3);
  const bits = fx < 0.5 ? [1, 2, 4, 64] : [8, 16, 32, 128];
  return String.fromCharCode(0x2800 + (bits[row] ?? 1));
}

function linePoints(a: Point, b: Point): [number, number][] {
  const points: [number, number][] = [];
  let x0 = Math.round(a.x);
  let y0 = Math.round(a.y);
  const x1 = Math.round(b.x);
  const y1 = Math.round(b.y);
  const dx = Math.abs(x1 - x0);
  const dy = -Math.abs(y1 - y0);
  const sx = x0 < x1 ? 1 : -1;
  const sy = y0 < y1 ? 1 : -1;
  let error = dx + dy;
  for (let step = 0; step < 400; step++) {
    points.push([x0, y0]);
    if (x0 === x1 && y0 === y1) break;
    const doubled = 2 * error;
    if (doubled >= dy) {
      error += dy;
      x0 += sx;
    }
    if (doubled <= dx) {
      error += dx;
      y0 += sy;
    }
  }
  return points;
}

function wrap(text: string, width: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    if (line && line.length + word.length + 1 > width) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines.flatMap((entry) =>
    entry.length <= width
      ? [entry]
      : (entry.match(new RegExp(`.{1,${Math.max(1, width)}}`, "g")) ?? []),
  );
}

export class Scene {
  readonly canvas = new Canvas();
  images: ImagePlacement[] = [];
  private stars: Star[] = [];
  private palette: Rgb = NEUTRAL;
  private mark = "·";
  private colors = this.paletteColors();
  private nodeStates = new Map<string, NodeState>();
  private particles: Particle[] = [];
  private trails = new Map<string, [number, number][]>();
  private pickOrigin: Point | undefined;
  private lastTick = 0;
  private frame = 0;
  private chapterKey = "";
  private chapterStartedAt = 0;
  private introUntil: number;
  private speed = 1;

  constructor(
    private readonly motion: boolean,
    startedAt: number,
  ) {
    this.introUntil = motion ? startedAt + INTRO_MS : startedAt;
    this.lastTick = startedAt;
  }

  get introActive(): boolean {
    return this.introUntil > this.lastTick;
  }

  skipIntro(): void {
    this.introUntil = 0;
  }

  get animating(): boolean {
    return this.motion || this.particles.length > 0;
  }

  get busy(): boolean {
    return (
      this.introActive ||
      this.particles.length > 0 ||
      this.speed > 1.05 ||
      this.lastTick - this.chapterStartedAt < 900
    );
  }

  render(input: SceneFrame): void {
    const { width, height, now, controller, summary } = input;
    const delta = Math.min(200, Math.max(0, now - this.lastTick));
    this.lastTick = now;
    this.frame++;
    this.canvas.resize(width, height);
    this.canvas.clear();
    this.images = [];
    this.ensureStars(width, height);
    this.updatePalette(controller, summary);
    const phase = controller.phase;
    const layout = this.layout(width, height);

    this.speed = this.warpSpeed(controller, now);
    this.drawStars(delta, now);

    if (this.tooSmall(width, height)) return this.drawTooSmall(width, height);

    if (this.introActive && phase.kind !== "launch" && phase.kind !== "landed") {
      this.drawIntro(now, width, height);
      return;
    }

    if (phase.kind === "launch") {
      this.drawLaunch(input, layout, now - phase.startedAt);
      return;
    }
    if (phase.kind === "landed") {
      this.drawLanded(input, phase.landing, now - phase.landedAt, phase.copied);
      return;
    }

    const prompt = controller.prompt;
    const chapterKey =
      phase.kind === "review"
        ? "review"
        : `${prompt?.navigation.stepKey ?? ""}:${prompt?.message ?? ""}`;
    if (chapterKey !== this.chapterKey) {
      this.chapterKey = chapterKey;
      this.chapterStartedAt = now;
    }
    const chapterAge = this.motion ? now - this.chapterStartedAt : 10_000;

    this.syncNodes(summary.nodes, layout, now);
    if (phase.kind === "review") {
      this.drawChrome(input, layout, "REVIEW", "everything in place", chapterAge);
      this.drawReview(input, layout, chapterAge);
      this.drawConstellation(input, layout, now, { pulse: true, hidden: !layout.showHub });
      this.drawFooter(layout, "⏎ launch   ↑↓ scroll   esc cancel");
      return;
    }
    if (!prompt) {
      this.drawChrome(input, layout, "", "", chapterAge);
      this.drawConstellation(input, layout, now, { hidden: !layout.showHub });
      return;
    }
    const titleChars = Math.max(4, Math.floor((width - 20) / BIG_CHAR_WIDTH));
    const title = chapterTitle(prompt.navigation.stepKey, prompt.message, titleChars);
    this.drawChrome(input, layout, title, prompt.message, chapterAge);
    const panelWidth = Math.min(layout.leftWidth - 3, 56);
    const panel = this.panelLines(input, panelWidth - 4);
    const panelRoom = Math.max(1, layout.footer - layout.top - MIN_LIST_ROWS - 4);
    const panelText = panel?.lines.slice(0, panelRoom) ?? [];
    const panelHeight = panel ? panelText.length + 2 : 0;
    const listBottom = layout.footer - 2 - (panelHeight ? panelHeight + 1 : 0);
    let grid: OptionGrid | undefined;
    if (prompt.kind === "text") this.drawText(prompt, layout, chapterAge, now);
    else grid = this.drawOptions(input, prompt, layout, listBottom, chapterAge, title);
    if (panel) {
      this.canvas.box(3, listBottom + 2, panelWidth, panelHeight, panel.color, panel.title);
      panelText.forEach((line, index) =>
        this.canvas.text(5, listBottom + 3 + index, clip(line.text, panelWidth - 4), line.color),
      );
    }
    this.drawConstellation(input, layout, now, {
      ghost: summary.conflictKeys.length > 0 ? this.ghostNode(controller) : undefined,
      hidden: !layout.showHub || grid?.hub === false,
    });
    this.drawFooter(layout, this.footerText(prompt, controller.window.columnStep > 0));
  }

  tooSmall(width: number, height: number): boolean {
    return width < MIN_COLUMNS || height < MIN_ROWS;
  }

  private drawTooSmall(width: number, height: number): void {
    const lines = ["terminal too small", `make it at least ${MIN_COLUMNS}x${MIN_ROWS}`];
    lines.forEach((line, index) =>
      this.canvas.text(
        Math.max(0, Math.floor((width - line.length) / 2)),
        Math.floor(height / 2) - 1 + index,
        clip(line, width),
        index === 0 ? this.colors.amber : this.colors.mute,
      ),
    );
  }

  private layout(width: number, height: number): Layout {
    const compact = height < COMPACT_HEIGHT;
    const showHub = !compact && width >= HUB_MIN_WIDTH;
    const leftWidth = showHub ? clamp(Math.floor(width * 0.52), 46, 64) : width - 2;
    const footer = height - 2;
    const rx = clamp(Math.floor((width - leftWidth) / 2) - 12, 8, 18);
    const ry = clamp(Math.floor((height - 12) / 2), 4, 7);
    return {
      compact,
      showHub,
      top: compact ? COMPACT_LIST_TOP : LIST_TOP,
      leftWidth,
      footer,
      rx,
      ry,
      hub: {
        x: leftWidth + Math.floor((width - leftWidth) / 2),
        y: Math.floor((8 + footer - 1) / 2) + 1,
      },
    };
  }

  private paletteColors(): Colors {
    const c = this.palette;
    const value = pack;
    return {
      acc: value(c),
      acc2: value(mix(c, WHITE, 0.45)),
      accDim: value(mix(BG, c, 0.5)),
      accFaint: value(mix(BG, c, 0.28)),
      accBg: value(mix(BG, c, 0.16)),
      ink: value(INK),
      mute: value(MUTE),
      dim: value(DIM),
      amber: value([251, 191, 36]),
      red: value([248, 113, 113]),
      green: value([74, 222, 128]),
      white: value(WHITE),
    };
  }

  private updatePalette(controller: TuiController, summary: TuiSummary): void {
    const prompt = controller.prompt;
    const highlighted =
      prompt && prompt.kind !== "text" && prompt.navigation.stepKey === "ecosystem"
        ? prompt.options[prompt.cursor]?.value
        : undefined;
    const id = typeof highlighted === "string" ? highlighted : summary.ecosystemId;
    const target = (id && ECOSYSTEM_PALETTES[id]) || { color: NEUTRAL, mark: "·" };
    this.mark = target.mark;
    this.palette = this.motion ? mix(this.palette, target.color, 0.16) : target.color;
    this.colors = this.paletteColors();
  }

  private ensureStars(width: number, height: number): void {
    const wanted = Math.round(width * height * 0.053);
    if (this.stars.length === wanted) return;
    this.stars = Array.from({ length: wanted }, (_, index) => ({
      x: hash(index, 1, 3) * width,
      y: hash(index, 2, 5) * height,
      z: hash(index, 3, 11),
      phase: hash(index, 4, 13) * Math.PI * 2,
    }));
  }

  private drawStars(delta: number, now: number): void {
    const { width, height } = this.canvas;
    for (const star of this.stars) {
      if (this.motion) {
        star.x -= ((0.3 + star.z * 1.4) * this.speed * delta) / 1000;
        if (star.x < 0) {
          star.x += width;
          star.y = hash(Math.floor(now), Math.floor(star.z * 1000), 17) * height;
        }
      }
      const twinkle = this.motion
        ? 0.7 + (0.3 * Math.round(2 * Math.sin(now / 900 + star.phase))) / 2
        : 1;
      const brightness = (0.2 + 0.8 * star.z) * twinkle;
      let color = mix(DIM, mix(this.palette, WHITE, star.z * 0.4), star.z * 0.9);
      color = mix(BG, color, Math.min(1, brightness + 0.15));
      const cx = Math.floor(star.x);
      const cy = Math.floor(star.y);
      if (this.speed > 5 && this.motion) {
        const char = star.z > 0.85 ? "═" : star.z > 0.5 ? "━" : "─";
        const length = Math.min(6, 1 + Math.floor((this.speed / 10) * star.z * 2.5));
        const streak = pack(mix(color, WHITE, star.z * 0.3));
        for (let step = 0; step < length; step++) this.canvas.put(cx + step, cy, char, streak);
        continue;
      }
      const char =
        star.z < 0.5 ? braille(star.x - cx, star.y - cy) : star.z < 0.9 ? "·" : this.mark;
      this.canvas.put(cx, cy, char, pack(color));
    }
  }

  private warpSpeed(controller: TuiController, now: number): number {
    if (!this.motion) return 1;
    const phase = controller.phase;
    if (phase.kind === "launch")
      return 1 + 39 * ease(clamp((now - phase.startedAt - 700) / 1500, 0, 1));
    if (phase.kind === "landed")
      return 1 + (this.speed - 1) * (1 - ease(clamp((now - phase.landedAt) / 1200, 0, 1)));
    return 1;
  }

  private drawIntro(now: number, width: number, height: number): void {
    const elapsed = now - (this.introUntil - INTRO_MS);
    const resolve = clamp((elapsed - 100) / 700, 0, 1);
    const k = this.colors;
    const words = bigTextFits("BETTER FULLSTACK", width - 4)
      ? ["BETTER FULLSTACK"]
      : ["BETTER", "FULLSTACK"];
    const top = Math.floor(height / 2) - 2 - (words.length - 1) * 2;
    words.forEach((word, index) => {
      const x = Math.max(2, Math.floor((width - (word.length * BIG_CHAR_WIDTH - 1)) / 2));
      bigText(this.canvas, x, top + index * 4, word, [k.acc2, k.acc, k.accDim], resolve, {
        frame: this.frame,
        color: k.dim,
      });
    });
    const command = "bun create better-fullstack";
    const typed = clamp(Math.floor((elapsed - 700) / 22), 0, command.length);
    const commandX = Math.max(2, Math.floor((width - command.length - 2) / 2));
    const commandY = top + words.length * 4 + 1;
    if (typed > 0) this.canvas.text(commandX, commandY, `$ ${command.slice(0, typed)}`, k.acc2);
    if (Math.floor(now / 400) % 2) this.canvas.put(commandX + 2 + typed, commandY, "▌", k.acc2);
    this.canvas.text(Math.floor((width - 21) / 2), height - 4, "press any key to skip", k.dim);
  }

  private drawChrome(
    input: SceneFrame,
    layout: Layout,
    title: string,
    subtitle: string,
    age: number,
  ): void {
    const { summary, width } = input;
    const k = this.colors;
    this.canvas.fill(0, 0, width, 1, NO_COLOR);
    this.canvas.text(2, 0, "✦ better-fullstack", k.mute);
    const crumbs = [
      summary.projectName,
      summary.ecosystemId,
      ...summary.nodes.map((node) => node.label),
    ]
      .filter(Boolean)
      .join(" · ");
    this.canvas.text(22, 0, clip(crumbs, width - 24), k.dim);
    const { position, total } = summary.progress;
    if (layout.compact) {
      const counter = `${position}/${total}`;
      if (subtitle) {
        this.canvas.fill(2, 1, width - 4, 1, NO_COLOR);
        this.canvas.text(3, 1, clip(subtitle, width - counter.length - 8), k.ink);
        this.canvas.text(width - counter.length - 3, 1, counter, k.mute);
      }
      return;
    }
    if (title) {
      bigText(this.canvas, 3, 2, title, [k.acc2, k.acc, k.accDim], clamp(age / 450, 0, 1), {
        frame: this.frame,
        color: k.dim,
      });
    }
    if (subtitle && age > 250) {
      this.canvas.fill(2, 6, width - 4, 1, NO_COLOR);
      const chapter = String(position).padStart(2, "0");
      this.canvas.text(3, 6, clip(`chapter ${chapter} · ${subtitle}`, width - 6), k.mute);
    }
    this.drawOrbit(input);
  }

  private drawOrbit(input: SceneFrame): void {
    const { summary, width, now } = input;
    const k = this.colors;
    const { position, total } = summary.progress;
    const center = { x: width - 4 - ORBIT_RX, y: 3 };
    const reached = Math.min(
      ORBIT_DOTS.length - 1,
      Math.floor(((position - 1) / total) * ORBIT_DOTS.length),
    );
    ORBIT_DOTS.forEach(([dx, dy], index) => {
      const x = center.x + dx;
      const y = center.y + dy;
      if (index === reached) {
        this.canvas.put(x, y, this.motion && Math.floor(now / 320) % 2 ? "◉" : "●", k.acc2);
      } else if (index < reached) this.canvas.put(x, y, "●", k.acc);
      else this.canvas.put(x, y, "·", k.dim);
    });
    const counter = `${position}/${total}`;
    this.canvas.text(center.x - Math.floor(counter.length / 2), center.y, counter, k.mute);
  }

  private drawFooter(layout: Layout, text: string): void {
    this.canvas.fill(0, layout.footer, this.canvas.width, 1, NO_COLOR);
    this.canvas.text(2, layout.footer, clip(text, this.canvas.width - 4), this.colors.dim);
  }

  private footerText(prompt: TuiPrompt, grid: boolean): string {
    const move = grid ? "↑↓←→ move" : "↑↓ move";
    const back = prompt.navigation.canGoBack
      ? prompt.kind === "text"
        ? "   esc back"
        : "   ⌫ back"
      : "";
    if (prompt.kind === "text") return `type a name   ⏎ confirm${back}   ctrl+c cancel`;
    if (prompt.kind === "multiselect") {
      return `${move}   1-9 toggle   space toggle   a all   ⏎ confirm${back}   ? why`;
    }
    if (prompt.kind === "confirm") return `←→ choose   y/n   ⏎ select${back}   ? why`;
    return `${move}   1-9 quick pick   ⏎ select${back}   ? why`;
  }

  private panelLines(
    input: SceneFrame,
    width: number,
  ): { title: string; color: number; lines: { text: string; color: number }[] } | undefined {
    const { controller, summary } = input;
    const k = this.colors;
    const highlighted = controller.highlighted;
    if (highlighted?.disabled && highlighted.hint) {
      return {
        title: "⚠ unavailable",
        color: k.amber,
        lines: [
          ...wrap(`${highlighted.label}: ${highlighted.hint}`, width)
            .slice(0, 3)
            .map((text) => ({ text, color: k.ink })),
          { text: "↑↓ pick another option", color: k.mute },
          ...(controller.prompt?.navigation.canGoBack
            ? [{ text: "⌫ go back and change an earlier pick", color: k.mute }]
            : []),
        ],
      };
    }
    const warnings = summary.compatibility.filter(
      (line) => line.tone === "warn" || line.tone === "error",
    );
    if (warnings.length > 0 && summary.conflictKeys.length > 0) {
      return {
        title: "⚠ incompatible",
        color: k.amber,
        lines: [
          ...warnings
            .flatMap((line) => wrap(line.text, width))
            .slice(0, 3)
            .map((text) => ({ text, color: k.ink })),
          { text: "⏎ keep it and let the CLI adjust the rest", color: k.mute },
          ...(controller.prompt?.navigation.canGoBack
            ? [{ text: "⌫ go back and change an earlier pick", color: k.mute }]
            : [{ text: "↑↓ pick another option", color: k.mute }]),
        ],
      };
    }
    if (controller.prompt?.error) {
      return {
        title: "✗ check this",
        color: k.red,
        lines: wrap(controller.prompt.error, width)
          .slice(0, 3)
          .map((text) => ({ text, color: k.ink })),
      };
    }
    if (!controller.showWhy) return undefined;
    const lines = [
      ...(highlighted?.hint ? wrap(highlighted.hint, width).slice(0, 2) : []),
      ...summary.compatibility.slice(0, 2).flatMap((line) => wrap(line.text, width).slice(0, 1)),
      ...wrap(summary.command, width).slice(0, 3),
    ];
    return { title: "why", color: k.accDim, lines: lines.map((text) => ({ text, color: k.mute })) };
  }

  private drawText(
    prompt: Extract<TuiPrompt, { kind: "text" }>,
    layout: Layout,
    age: number,
    now: number,
  ): void {
    if (age < 300) return;
    const k = this.colors;
    const { top } = layout;
    this.canvas.fill(2, top, Math.floor(this.canvas.width / 2), 1, NO_COLOR);
    const value = prompt.input || prompt.placeholder || "";
    const end = this.canvas.text(3, top, `› ${value}`, prompt.input ? k.acc2 : k.dim);
    if (!this.motion || Math.floor(now / 500) % 2 === 0)
      this.canvas.put(prompt.input ? end : 5, top, "▌", k.acc2);
    if (prompt.defaultValue) this.canvas.text(5, top + 2, `⏎ keeps ${prompt.defaultValue}`, k.mute);
  }

  private optionGlyph(input: SceneFrame, prompt: TuiPrompt, option: TuiOption) {
    return iconGlyph(option.value, input.iconMode, unpackHex(this.colors.acc), {
      stepKey: prompt.navigation.stepKey,
      results: input.controller.results,
    });
  }

  private drawOptions(
    input: SceneFrame,
    prompt: Exclude<TuiPrompt, { kind: "text" }>,
    layout: Layout,
    listBottom: number,
    age: number,
    title: string,
  ): OptionGrid {
    const { controller, width } = input;
    const k = this.colors;
    const images = input.iconMode === "image" && prompt.kind !== "confirm";
    const multi = prompt.kind === "multiselect";
    const grid = planOptionGrid({
      count: prompt.options.length,
      labelWidth: Math.max(...prompt.options.map((option) => option.label.length)),
      iconStyle: prompt.kind === "confirm" ? "none" : images ? "image" : "glyph",
      multi,
      panelWidth: layout.leftWidth - 3,
      fullWidth: width - 5,
      height: listBottom - layout.top + 1,
      hub: layout.showHub,
    });
    const visible = grid.rows * grid.columns;
    const start = firstVisibleOption(grid, prompt.cursor, prompt.options.length);
    const listTop = grid.descriptions ? layout.top : layout.top + 1;
    controller.window = {
      start,
      count: Math.min(9, visible),
      columnStep: grid.columns > 1 ? grid.rows : 0,
    };
    const glyphOffset = multi ? 4 : 2;
    const descriptionOffset = Math.max(grid.labelOffset + 18, 21);

    prompt.options.slice(start, start + visible).forEach((option, offset) => {
      if (this.motion && age < 420 + offset * 45) return;
      const index = start + offset;
      const x = 3 + Math.floor(offset / grid.rows) * grid.cellWidth;
      const y = listTop + (offset % grid.rows) * (grid.itemHeight + grid.gap);
      const active = index === prompt.cursor;
      const chosen = multi && prompt.selected.includes(option.value);
      const highlightX = x + grid.labelOffset - 1;
      const highlightRows = grid.descriptions ? grid.itemHeight : 1;
      for (let row = 0; row < highlightRows; row++) {
        this.canvas.fill(
          highlightX,
          y + row,
          x + grid.cellWidth - 1 - highlightX,
          1,
          active ? k.accBg : NO_COLOR,
        );
      }
      if (active) this.pickOrigin = { x: x + glyphOffset, y };
      this.canvas.put(x - 1, y, active ? "▸" : " ", k.acc2);
      const number = option.disabled ? "·" : offset < 9 ? String(offset + 1) : " ";
      this.canvas.put(x, y, number, option.disabled ? k.dim : active ? k.acc2 : k.dim);
      if (multi) this.canvas.put(x + 2, y, chosen ? "◼" : "◻", chosen ? k.green : k.mute);
      const labelColor = option.disabled ? k.dim : active ? k.acc2 : k.ink;
      if (prompt.kind !== "confirm") {
        const icon = iconFor(option.value, {
          stepKey: prompt.navigation.stepKey,
          results: controller.results,
        });
        if (images && icon) {
          this.images.push({
            icon,
            x: x + glyphOffset,
            y,
            width: grid.iconColumns,
            height: grid.itemHeight,
          });
        } else {
          const glyph = this.optionGlyph(input, prompt, option);
          const glyphColumn = x + glyphOffset + (images ? 1 : 0);
          this.canvas.put(glyphColumn, y, glyph.char, option.disabled ? k.dim : hexColor(glyph.fg));
        }
      }
      const labelEnd = grid.descriptions && !images ? descriptionOffset : grid.cellWidth;
      this.canvas.text(
        x + grid.labelOffset,
        y,
        clip(option.label, labelEnd - grid.labelOffset - 1),
        labelColor,
      );
      if (!grid.descriptions) return;
      const hint = option.disabled && option.hint ? `unavailable: ${option.hint}` : option.hint;
      if (!hint) return;
      const hintColor = option.disabled ? k.dim : k.mute;
      if (images) {
        this.canvas.text(
          x + grid.labelOffset,
          y + 1,
          clip(hint, grid.cellWidth - grid.labelOffset - 1),
          hintColor,
        );
      } else {
        this.canvas.text(
          x + descriptionOffset,
          y,
          clip(hint, grid.cellWidth - descriptionOffset - 1),
          hintColor,
        );
      }
    });
    if (!grid.descriptions) {
      const hint = prompt.options[prompt.cursor]?.hint;
      this.canvas.fill(2, layout.top - 1, width - 4, 1, NO_COLOR);
      if (hint) this.canvas.text(3, layout.top - 1, clip(hint, width - 6), k.acc2);
    }
    if (prompt.options.length > visible) {
      const counter = `${prompt.cursor + 1}/${prompt.options.length}`;
      const [before, after] = grid.columns > 1 ? ["←", "→"] : ["↑", "↓"];
      const more = `${start > 0 ? `${before} ` : "  "}${counter}${start + visible < prompt.options.length ? ` ${after}` : ""}`;
      this.canvas.text(3, Math.min(listBottom + 1, layout.footer - 1), more, k.dim);
    }
    if (images && !layout.compact) this.placeHero(input, prompt, title);
    return grid;
  }

  private placeHero(
    input: SceneFrame,
    prompt: Exclude<TuiPrompt, { kind: "text" }>,
    title: string,
  ): void {
    const option = prompt.options[prompt.cursor];
    const icon =
      option &&
      iconFor(option.value, {
        stepKey: prompt.navigation.stepKey,
        results: input.controller.results,
      });
    if (!icon) return;
    const x = 3 + title.length * BIG_CHAR_WIDTH + 2;
    const orbitLeft = input.width - 4 - 2 * ORBIT_RX - 2;
    if (x + 8 > orbitLeft) return;
    this.images.push({ icon, x, y: 1, width: 8, height: 4 });
  }

  private drawReview(input: SceneFrame, layout: Layout, age: number): void {
    const { controller } = input;
    const phase = controller.phase;
    if (phase.kind !== "review") return;
    const k = this.colors;
    const rows = Math.max(1, layout.footer - 2 - layout.top);
    controller.reviewRows = rows;
    const lines = phase.review.lines
      .filter((line) => line.trim())
      .slice(phase.offset, phase.offset + rows);
    const keyWidth = Math.min(
      22,
      Math.max(...lines.map((line) => (line.includes(":") ? line.indexOf(":") : 0)), 8) + 2,
    );
    lines.forEach((line, index) => {
      if (this.motion && age < 400 + index * 60) return;
      const y = layout.top + index;
      const split = line.indexOf(":");
      const key = split > 0 ? line.slice(0, split).trim().toLowerCase() : "";
      const value = split > 0 ? line.slice(split + 1).trim() : line.trim();
      this.canvas.fill(2, y, layout.leftWidth - 2, 1, NO_COLOR);
      this.canvas.put(3, y, "✓", k.green);
      this.canvas.text(5, y, clip(key, keyWidth - 1), k.mute);
      this.canvas.text(5 + keyWidth, y, clip(value, layout.leftWidth - keyWidth - 6), k.ink);
    });
  }

  private ghostNode(controller: TuiController): ConstellationNode | undefined {
    const option = controller.highlighted;
    const stepKey = controller.prompt?.navigation.stepKey;
    if (!option || !stepKey) return undefined;
    return {
      key: `ghost:${stepKey}`,
      value: option.value,
      label: typeof option.value === "string" ? option.value : option.label,
    };
  }

  private slotTargets(
    nodes: ConstellationNode[],
    layout: Layout,
  ): Map<string, { point: Point; inner: boolean }> {
    const count = nodes.length;
    const capacity = Math.max(6, count);
    const rings = count > 10;
    const targets = new Map<string, { point: Point; inner: boolean }>();
    nodes.forEach((node, index) => {
      const inner = rings && index % 2 === 1;
      const scale = inner ? 0.6 : 1;
      const angle = rad(-90 + (index * 360) / capacity);
      targets.set(node.key, {
        point: {
          x: layout.hub.x + layout.rx * scale * Math.cos(angle),
          y: layout.hub.y + layout.ry * scale * Math.sin(angle),
        },
        inner,
      });
    });
    return targets;
  }

  private syncNodes(nodes: ConstellationNode[], layout: Layout, now: number): void {
    const keys = new Set(nodes.map((node) => node.key));
    for (const key of this.nodeStates.keys()) {
      if (key !== "hub" && !keys.has(key)) this.nodeStates.delete(key);
    }
    this.particles = this.particles.filter(
      (particle) => keys.has(particle.key) || particle.key === "hub",
    );
    const from = this.pickOrigin ?? { x: 3, y: 8 };
    for (const node of nodes) {
      if (
        this.nodeStates.has(node.key) ||
        this.particles.some((particle) => particle.key === node.key)
      )
        continue;
      if (this.motion) this.particles.push({ key: node.key, from, startedAt: now });
      else this.nodeStates.set(node.key, { pos: layout.hub, settledAt: now - LINK_GROW_MS });
    }
  }

  private syncHub(hubId: string | undefined, now: number): boolean {
    if (!hubId) {
      this.nodeStates.delete("hub");
      this.particles = this.particles.filter((particle) => particle.key !== "hub");
      return false;
    }
    if (this.nodeStates.has("hub")) return true;
    if (!this.particles.some((particle) => particle.key === "hub")) {
      if (this.motion)
        this.particles.push({
          key: "hub",
          from: this.pickOrigin ?? { x: 3, y: 8 },
          startedAt: now,
        });
      else this.nodeStates.set("hub", { pos: { x: 0, y: 0 }, settledAt: now - 1000 });
    }
    return this.nodeStates.has("hub");
  }

  private flightPosition(particle: Particle, target: Point, layout: Layout, now: number): Point {
    const u = clamp((now - particle.startedAt) / FLIGHT_MS, 0, 1);
    const { hub, rx, ry } = layout;
    const ellipse = (degrees: number, radiusX: number, radiusY: number) => ({
      x: hub.x + radiusX * Math.cos(rad(degrees)),
      y: hub.y + radiusY * Math.sin(rad(degrees)),
    });
    const startAngle =
      (Math.atan2((particle.from.y - hub.y) / ry, (particle.from.x - hub.x) / rx) * 180) / Math.PI;
    const endAngle =
      particle.key === "hub"
        ? startAngle + 300
        : (Math.atan2((target.y - hub.y) / ry, (target.x - hub.x) / rx) * 180) / Math.PI;
    const sweep = ((((endAngle - startAngle) % 360) + 360) % 360) + 180;
    const outerX = rx + 4;
    const outerY = ry + 2;
    if (u < 0.3) {
      const e = ease(u / 0.3);
      const entry = ellipse(startAngle, outerX, outerY);
      return {
        x: particle.from.x + (entry.x - particle.from.x) * e,
        y: particle.from.y + (entry.y - particle.from.y) * e,
      };
    }
    if (u < 0.78) return ellipse(startAngle + sweep * ((u - 0.3) / 0.48), outerX, outerY);
    const e = ease((u - 0.78) / 0.22);
    const exit = ellipse(startAngle + sweep, outerX, outerY);
    return { x: exit.x + (target.x - exit.x) * e, y: exit.y + (target.y - exit.y) * e };
  }

  private drawConstellation(
    input: SceneFrame,
    layout: Layout,
    now: number,
    options: { pulse?: boolean; ghost?: ConstellationNode; collapse?: number; hidden?: boolean },
  ): void {
    const { summary, controller } = input;
    const k = this.colors;
    const collapse = options.collapse ?? 0;
    const hubReady = this.syncHub(summary.ecosystemId, now);
    const nodes = options.ghost ? [...summary.nodes, options.ghost] : summary.nodes;
    const targets = this.slotTargets(nodes, layout);
    const labelled = nodes.length <= 10;
    const conflicts = new Set(summary.conflictKeys);
    const blink = this.motion ? Math.floor(now / 260) % 2 === 1 : true;
    const { hub } = layout;

    if (options.hidden) return this.settleParticles(targets, hub, now);

    if (hubReady && collapse < 1) {
      for (let angle = 0; angle < 360; angle += 6) {
        this.canvas.put(
          hub.x + layout.rx * (1 - collapse) * Math.cos(rad(angle)),
          hub.y + layout.ry * (1 - collapse) * Math.sin(rad(angle)),
          "·",
          k.accFaint,
        );
      }
    }

    for (const node of nodes) {
      const target = targets.get(node.key);
      if (!target) continue;
      const ghost = node.key.startsWith("ghost:");
      const state = this.nodeStates.get(node.key);
      if (!state && !ghost) continue;
      if (state) {
        state.pos = this.motion
          ? {
              x: state.pos.x + (target.point.x - state.pos.x) * 0.3,
              y: state.pos.y + (target.point.y - state.pos.y) * 0.3,
            }
          : target.point;
      }
      const base = state?.pos ?? target.point;
      const pos = {
        x: Math.round(base.x + (hub.x - base.x) * collapse),
        y: Math.round(base.y + (hub.y - base.y) * collapse),
      };
      if (collapse >= 1) continue;
      const conflict = conflicts.has(node.key);
      if (collapse === 0 && hubReady && !ghost) {
        const points = linePoints(hub, pos);
        const grow = this.motion
          ? clamp((now - (state?.settledAt ?? now)) / LINK_GROW_MS, 0, 1)
          : 1;
        const limit = Math.floor(points.length * grow);
        for (let index = 1; index < limit - 1; index++) {
          if (index % 2) continue;
          const point = points[index];
          if (!point) continue;
          let color = k.accDim;
          if (options.pulse && this.motion) {
            const phase = (((index - now / 70) % 7) + 7) % 7;
            if (phase < 1.5) color = k.acc2;
          }
          this.canvas.put(point[0], point[1], "·", color);
        }
      }
      const context = { stepKey: node.key.replace(/^ghost:/, ""), results: controller.results };
      const glyph = iconGlyph(node.value, input.iconMode, unpackHex(k.acc), context);
      const icon = input.iconMode === "image" ? iconFor(node.value, context) : undefined;
      if (conflict && blink) this.canvas.put(pos.x, pos.y, "⚠", k.amber);
      else if (ghost)
        this.canvas.put(pos.x, pos.y, blink ? "✦" : glyph.char, blink ? k.red : k.amber);
      else if (icon && collapse === 0)
        this.images.push({ icon, x: pos.x - 1, y: pos.y, width: 2, height: 1 });
      else this.canvas.put(pos.x, pos.y, glyph.char, conflict ? k.red : hexColor(glyph.fg));
      if (collapse === 0 && (labelled || !target.inner)) {
        const color = conflict || ghost ? k.amber : options.pulse ? k.ink : k.mute;
        if (pos.x < hub.x) {
          const room = pos.x - 2 - (layout.leftWidth + 1);
          const label = clip(node.label, Math.max(3, room));
          this.canvas.text(pos.x - 2 - label.length + (icon ? -1 : 0), pos.y, label, color);
        } else {
          const label = clip(node.label, Math.max(3, input.width - pos.x - 3 - (icon ? 1 : 0)));
          this.canvas.text(pos.x + 2 + (icon ? 1 : 0), pos.y, label, color);
        }
      }
    }

    if (options.ghost && collapse === 0) {
      const ghostTarget = targets.get(options.ghost.key)?.point;
      const partner =
        summary.conflictKeys.map((key) => this.nodeStates.get(key)?.pos).find(Boolean) ??
        (hubReady ? hub : undefined);
      if (ghostTarget && partner) {
        const points = linePoints(ghostTarget, partner);
        const color = this.motion && Math.floor(now / 200) % 2 ? k.red : k.amber;
        points
          .slice(1, -1)
          .forEach(([x, y], index, all) =>
            this.canvas.put(x, y, index === Math.floor(all.length / 2) ? "✕" : "·", color),
          );
      }
    }

    if (hubReady && collapse < 1) {
      const hubState = this.nodeStates.get("hub");
      const fresh = this.motion && hubState !== undefined && now - hubState.settledAt < 600;
      const id = summary.ecosystemId;
      const icon = input.iconMode === "image" && !fresh ? iconFor(id) : undefined;
      if (icon && collapse === 0) {
        this.canvas.fill(hub.x - 2, hub.y - 1, IMAGE_COLUMNS, IMAGE_ROWS, NO_COLOR);
        this.images.push({
          icon,
          x: hub.x - 2,
          y: hub.y - 1,
          width: IMAGE_COLUMNS,
          height: IMAGE_ROWS,
        });
      } else {
        const glyph = iconGlyph(
          id,
          input.iconMode === "image" ? "nerd" : input.iconMode,
          unpackHex(k.acc2),
        );
        this.canvas.put(
          hub.x,
          hub.y,
          fresh && Math.floor(now / 100) % 2 ? "✺" : glyph.char,
          fresh ? k.white : k.acc2,
          k.accBg,
        );
      }
      if (collapse === 0 && id)
        this.canvas.text(hub.x - Math.floor(id.length / 2), hub.y + 1, id, k.mute);
    }

    for (const particle of this.particles) {
      const target = particle.key === "hub" ? hub : targets.get(particle.key)?.point;
      if (!target) continue;
      const position = this.flightPosition(particle, target, layout, now);
      const cell: [number, number] = [Math.round(position.x), Math.round(position.y)];
      const trail = this.trails.get(particle.key) ?? [];
      const last = trail.at(-1);
      if (!last || last[0] !== cell[0] || last[1] !== cell[1]) trail.push(cell);
      if (trail.length > 7) trail.shift();
      this.trails.set(particle.key, trail);
      trail.forEach(([x, y], index) =>
        this.canvas.put(
          x,
          y,
          index < 2 ? "·" : "•",
          pack(mix(BG, this.palette, 0.25 + (0.6 * index) / 7)),
        ),
      );
      this.canvas.put(cell[0], cell[1], "✦", k.white);
    }
    this.settleParticles(targets, hub, now);
  }

  private settleParticles(
    targets: Map<string, { point: Point; inner: boolean }>,
    hub: Point,
    now: number,
  ): void {
    const landed = this.particles.filter((particle) => now - particle.startedAt >= FLIGHT_MS);
    for (const particle of landed) {
      const target = particle.key === "hub" ? hub : targets.get(particle.key)?.point;
      this.nodeStates.set(particle.key, { pos: target ?? hub, settledAt: now });
      this.trails.delete(particle.key);
    }
    this.particles = this.particles.filter((particle) => now - particle.startedAt < FLIGHT_MS);
  }

  private progressRows(lines: ProgressLine[], count: number): ProgressLine[] {
    return lines.slice(-count);
  }

  private drawLaunch(input: SceneFrame, layout: Layout, elapsed: number): void {
    const { width, now, controller, summary } = input;
    const k = this.colors;
    const t = this.motion ? elapsed : 10_000;
    this.canvas.text(2, 0, "✦ better-fullstack", k.mute);
    const resolve = !this.motion
      ? 1
      : t < 500
        ? clamp(t / 400, 0, 1)
        : clamp(1 - (t - 900) / 400, 0, 1);
    if (!layout.compact && (resolve > 0 || !this.motion)) {
      bigText(this.canvas, 3, 2, "LAUNCH", [k.acc2, k.acc, k.accDim], this.motion ? resolve : 1, {
        frame: this.frame,
        color: k.dim,
      });
    }
    if (this.motion && t < 1300 && layout.showHub) {
      this.syncNodes(summary.nodes, layout, now);
      this.drawConstellation(input, layout, now, { collapse: ease(clamp(t / 1000, 0, 1)) });
      if (t >= 1000)
        this.canvas.put(layout.hub.x, layout.hub.y, this.frame % 2 ? "✺" : "✹", k.white);
    }
    if (this.motion && t < 900) return;
    const boxWidth = Math.min(64, width - 6);
    const boxTop = layout.compact ? 2 : LIST_TOP;
    const boxHeight = Math.max(6, Math.min(16, layout.footer - boxTop - 1));
    this.canvas.box(
      3,
      boxTop,
      boxWidth,
      boxHeight,
      k.accDim,
      `launch · ${summary.projectName}`,
      pack(BG),
    );
    const rows = this.progressRows(controller.progress, boxHeight - 3);
    const spin = SPINNER[Math.floor(now / 110) % 4] ?? "◐";
    rows.forEach((line, index) => {
      const y = boxTop + 2 + index;
      const mark =
        line.state === "active"
          ? this.motion
            ? spin
            : "›"
          : line.state === "done"
            ? "✓"
            : line.state === "warn"
              ? "▲"
              : "✗";
      const color =
        line.state === "active"
          ? k.acc2
          : line.state === "done"
            ? k.green
            : line.state === "warn"
              ? k.amber
              : k.red;
      this.canvas.put(5, y, mark, color);
      this.canvas.text(
        7,
        y,
        clip(line.text, boxWidth - 8),
        line.state === "active" ? k.ink : k.mute,
      );
    });
    const active = controller.progress.at(-1);
    if (
      active?.state === "active" &&
      /install|sync|build|restore|tidy|deps|compile/i.test(active.text)
    ) {
      const barWidth = Math.min(24, boxWidth - 12);
      const y = boxTop + boxHeight - 2;
      const head = this.motion ? Math.floor(now / 60) % (barWidth + 6) : barWidth;
      let bar = "";
      for (let index = 0; index < barWidth; index++) {
        const distance = head - index;
        bar +=
          distance >= 0 && distance < 6 ? "█▓▒░"[Math.min(3, Math.floor(distance / 1.5))] : "░";
      }
      this.canvas.text(7, y, bar, k.acc);
    }
    this.drawFooter(layout, "scaffolding… the full log prints when the TUI closes");
  }

  private drawLanded(
    input: SceneFrame,
    landing: TuiLanding,
    elapsed: number,
    copied: boolean,
  ): void {
    const { width, height } = input;
    const k = this.colors;
    const t = this.motion ? elapsed : 10_000;
    this.canvas.text(2, 0, "✦ better-fullstack", k.mute);
    const cardWidth = Math.min(92, width - 4);
    const inner = cardWidth - 6;
    const compact = height < COMPACT_HEIGHT;
    const rows = height - (compact ? 5 : 8);
    const head: CardLine[] = [
      ...wrap(landing.stack.join(" · "), inner).map((text) => ({ text, color: k.acc2 })),
      ...(landing.failures.length > 0
        ? wrap(
            `${landing.failures.length} setup step(s) did not finish: ${landing.failures.join(", ")}`,
            inner,
          ).map((text) => ({ text, color: k.amber }))
        : []),
    ];
    const tail: CardLine[] = [
      ...(landing.tree.length > 0 && !compact
        ? [
            { text: "", color: k.dim },
            { text: `  ${landing.projectName}/   ${landing.tree.join("  ")}`, color: k.dim },
          ]
        : []),
      { text: "", color: k.dim },
      {
        text: `⏎ exit and print the full log   c ${copied ? "copied ✓" : "copy command"}   docs better-fullstack.dev/docs`,
        color: copied ? k.green : k.dim,
      },
    ];
    const stepRoom = Math.max(2, rows - head.length - tail.length - 5);
    const steps: CardLine[] =
      landing.nextSteps.length > 0
        ? [
            { text: "", color: k.dim },
            { text: "next steps", color: k.mute },
            ...landing.nextSteps
              .slice(0, stepRoom)
              .map((step) => ({ text: `  ${step}`, color: k.ink })),
          ]
        : [];
    const commandRoom = Math.max(1, rows - head.length - tail.length - steps.length - 2);
    const command = wrap(landing.command, inner - 2);
    const shownCommand =
      command.length > commandRoom
        ? [...command.slice(0, commandRoom - 1), "… press c to copy the full command"]
        : command;
    const visible: CardLine[] = [
      ...head,
      ...steps,
      { text: "", color: k.dim },
      { text: "reproduce", color: k.mute },
      ...shownCommand.map((text) => ({ text: `  ${text}`, color: k.ink })),
      ...tail,
    ];
    const cardHeight = visible.length + 3;
    const x = Math.max(2, Math.floor((width - cardWidth) / 2));
    const y = Math.max(1, Math.floor((height - cardHeight) / 2) - 1);
    if (t < 150) return;
    this.canvas.box(x, y, cardWidth, cardHeight, k.accDim, undefined, pack(BG));
    const title = ` ${landing.failures.length > 0 ? "▲" : "✓"} ${landing.projectName} is ready `;
    this.canvas.text(x + 2, y, title, landing.failures.length > 0 ? k.amber : k.green);
    const seconds = ` ${(landing.elapsedMs / 1000).toFixed(1)}s `;
    this.canvas.text(x + cardWidth - seconds.length - 2, y, seconds, k.dim);
    visible.forEach((line, index) => {
      if (this.motion && t < 300 + index * 70) return;
      if (line.text) this.canvas.text(x + 3, y + 2 + index, clip(line.text, inner), line.color);
    });
  }
}

function unpackHex(color: number): string {
  return color.toString(16).padStart(6, "0");
}
