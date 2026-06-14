"use client";

import { useEffect, useRef } from "react";

import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/**
 * Theme-aware ASCII hero scene, drawn on a fine glyph grid (no external
 * embeds, no load flash — the canvas is transparent until the first frame).
 *
 * Shared renderer: vector line-work is stroked on a tiny offscreen canvas
 * (1px per grid cell) and sampled back as dotted ASCII lines (full-alpha
 * strokes read as lime, half-alpha as soft ink); shaded "bodies" are computed
 * per cell through a glyph density ramp; a sparse twinkling starfield fills
 * the rest; labels/typed text draw as real text on top.
 *
 * Variants (pick one, then prune the rest):
 * - "graph": stack wiring constellation — lime ✦ nodes (web/api/db/auth/ai/
 *   payments), dotted wires with traveling signal pulses.
 * - "stack": three isometric shaded slabs (frontend/api/database) with dotted
 *   connectors, gently bobbing.
 * - "terminal": blueprint terminal window typing the scaffold command, then a
 *   file tree, on a loop.
 * - "globe": shaded wireframe globe + golden spiral (the original scene).
 */

export type AsciiHeroVariant = "graph" | "stack" | "terminal" | "globe";

const GLYPHS = " .·:;=+*#%@";
const CELL = 8;
const FONT_SIZE = 8;
const FRAME_MS = 1000 / 20;
const MAX_DPR = 1.5;

// Light direction for shaded bodies (upper-left, toward viewer).
const LX = -0.45;
const LY = -0.55;
const LZ = 0.7;

function hash2(ix: number, iy: number): number {
  let h = Math.imul(ix, 374761393) + Math.imul(iy, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function noise2(x: number, y: number): number {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const a = hash2(ix, iy);
  const b = hash2(ix + 1, iy);
  const c = hash2(ix, iy + 1);
  const d = hash2(ix + 1, iy + 1);
  const ux = smooth(fx);
  const uy = smooth(fy);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x: number, y: number): number {
  return 0.5 * noise2(x, y) + 0.3 * noise2(x * 2.1, y * 2.1) + 0.2 * noise2(x * 4.3, y * 4.3);
}

/* ------------------------------ graph scene ------------------------------ */

const GRAPH_NODES = [
  { id: "web", x: 0.76, y: 0.16 },
  { id: "api", x: 0.66, y: 0.42 },
  { id: "db", x: 0.57, y: 0.72 },
  { id: "auth", x: 0.81, y: 0.64 },
  { id: "ai", x: 0.9, y: 0.34 },
  { id: "payments", x: 0.7, y: 0.9 },
] as const;

const GRAPH_EDGES: ReadonlyArray<[number, number]> = [
  [0, 1],
  [1, 2],
  [1, 3],
  [1, 4],
  [2, 3],
  [3, 5],
  [0, 4],
];

/* ------------------------------ stack scene ------------------------------ */

const STACK_SLABS = ["frontend", "api", "database"] as const;

/* ---------------------------- terminal scene ----------------------------- */

const TERM_CMD = "$ bun create better-fullstack@latest";
const TERM_LINES = [
  "✦ ecosystem   typescript",
  "✦ frontend    next",
  "✦ database    postgres · drizzle",
  "✦ auth        better-auth",
  "├─ apps/web",
  "├─ apps/server",
  "└─ packages/database",
  "✓ ready — start shipping",
] as const;
const TERM_TYPE_S = 0.075;
const TERM_LINE_S = 0.55;
const TERM_CYCLE_S = 14;

type AsciiHeroBackgroundProps = {
  className?: string;
  variant?: AsciiHeroVariant;
};

export function AsciiHeroBackground({ className, variant = "graph" }: AsciiHeroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isDark = resolvedTheme === "dark";
    const baseColor = isDark ? "242, 238, 238" : "27, 26, 23";
    const brand = "#c6e853";
    const bodyAlpha = isDark ? 0.78 : 0.8;
    const starAlpha = isDark ? 0.5 : 0.45;
    const textColor = `rgba(${baseColor}, 0.78)`;
    const softText = `rgba(${baseColor}, 0.5)`;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lineCanvas = document.createElement("canvas");
    const lineCtx = lineCanvas.getContext("2d", { willReadFrequently: true });
    if (!lineCtx) return;

    let raf = 0;
    let last = 0;
    let cols = 0;
    let rows = 0;
    let inView = true;

    const gridFont = `${FONT_SIZE}px "Geist Mono", ui-monospace, monospace`;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = Math.round(clientWidth * dpr);
      canvas.height = Math.round(clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.textBaseline = "middle";
      cols = Math.ceil(clientWidth / CELL);
      rows = Math.ceil(clientHeight / CELL);
      lineCanvas.width = cols;
      lineCanvas.height = rows;
    };

    /* ----- line-work per variant (offscreen, 1px = 1 cell) ----- */

    const soft = "rgba(255,255,255,0.5)";
    const full = "rgba(255,255,255,1)";

    const drawGlobeLines = (t: number, cx: number, cy: number, R: number) => {
      lineCtx.strokeStyle = soft;
      lineCtx.beginPath();
      lineCtx.arc(cx, cy, R * 1.16, 0, Math.PI * 2);
      lineCtx.stroke();
      lineCtx.beginPath();
      lineCtx.moveTo(cx - R * 1.7, cy);
      lineCtx.lineTo(cx + R * 1.7, cy);
      lineCtx.moveTo(cx, cy - R * 1.45);
      lineCtx.lineTo(cx, cy + R * 1.45);
      lineCtx.stroke();
      lineCtx.strokeStyle = full;
      for (let k = 0; k < 3; k++) {
        const lon = t * 0.12 + (k * Math.PI) / 3;
        const rx = Math.abs(Math.sin(lon)) * R;
        if (rx < 0.5) continue;
        lineCtx.beginPath();
        lineCtx.ellipse(cx, cy, rx, R, 0, 0, Math.PI * 2);
        lineCtx.stroke();
      }
      for (const lat of [-0.45, 0, 0.45]) {
        const yc = cy + lat * R;
        const half = Math.sqrt(Math.max(0, 1 - lat * lat)) * R;
        lineCtx.beginPath();
        lineCtx.ellipse(cx, yc, half, Math.max(0.5, half * 0.22), 0, 0, Math.PI * 2);
        lineCtx.stroke();
      }
      lineCtx.beginPath();
      const sx = cx + R * 0.15;
      const sy = cy + R * 0.4;
      for (let i = 0; i <= 140; i++) {
        const th = (i / 140) * Math.PI * 3;
        const r = R * 0.07 * Math.exp(0.30635 * th);
        const px = sx + r * Math.cos(th + Math.PI * 0.75);
        const py = sy + r * Math.sin(th + Math.PI * 0.75);
        if (i === 0) lineCtx.moveTo(px, py);
        else lineCtx.lineTo(px, py);
      }
      lineCtx.stroke();
    };

    const drawGraphLines = (t: number) => {
      // Dotted wires.
      lineCtx.strokeStyle = soft;
      lineCtx.setLineDash([1, 2]);
      lineCtx.beginPath();
      for (const [a, b] of GRAPH_EDGES) {
        lineCtx.moveTo(GRAPH_NODES[a].x * cols, GRAPH_NODES[a].y * rows);
        lineCtx.lineTo(GRAPH_NODES[b].x * cols, GRAPH_NODES[b].y * rows);
      }
      lineCtx.stroke();
      lineCtx.setLineDash([]);
      // Traveling signal pulses (lime).
      lineCtx.fillStyle = full;
      GRAPH_EDGES.forEach(([a, b], i) => {
        const p = (t * 0.22 + i * 0.37) % 1;
        const px = GRAPH_NODES[a].x * cols + (GRAPH_NODES[b].x - GRAPH_NODES[a].x) * cols * p;
        const py = GRAPH_NODES[a].y * rows + (GRAPH_NODES[b].y - GRAPH_NODES[a].y) * rows * p;
        lineCtx.beginPath();
        lineCtx.arc(px, py, 0.9, 0, Math.PI * 2);
        lineCtx.fill();
      });
    };

    type Slab = { yc: number; cx: number; W: number; H: number; T: number };

    const stackSlabs = (t: number): Slab[] => {
      const cx = cols * 0.73;
      const W = Math.min(cols * 0.15, rows * 0.34);
      const H = W * 0.42;
      const T = Math.max(3, W * 0.22);
      const gap = H * 2 + T + rows * 0.045;
      return STACK_SLABS.map((_, k) => ({
        cx,
        yc: rows * 0.45 + (k - 1) * gap + Math.sin(t * 0.8 + k * 1.9) * 0.6,
        W,
        H,
        T,
      }));
    };

    const drawStackLines = (t: number) => {
      const slabs = stackSlabs(t);
      // Dotted connectors between slabs.
      lineCtx.strokeStyle = soft;
      lineCtx.setLineDash([1, 2]);
      lineCtx.beginPath();
      for (let k = 0; k + 1 < slabs.length; k++) {
        const a = slabs[k];
        const b = slabs[k + 1];
        lineCtx.moveTo(a.cx - a.W * 0.45, a.yc + a.H * 0.45 + a.T);
        lineCtx.lineTo(b.cx - b.W * 0.45, b.yc - b.H * 0.45);
        lineCtx.moveTo(a.cx + a.W * 0.45, a.yc + a.H * 0.45 + a.T);
        lineCtx.lineTo(b.cx + b.W * 0.45, b.yc - b.H * 0.45);
      }
      lineCtx.stroke();
      lineCtx.setLineDash([]);
      // Lime top-face outlines.
      lineCtx.strokeStyle = full;
      for (const s of slabs) {
        lineCtx.beginPath();
        lineCtx.moveTo(s.cx, s.yc - s.H);
        lineCtx.lineTo(s.cx + s.W, s.yc);
        lineCtx.lineTo(s.cx, s.yc + s.H);
        lineCtx.lineTo(s.cx - s.W, s.yc);
        lineCtx.closePath();
        lineCtx.stroke();
      }
    };

    const termRect = () => {
      const x0 = cols * 0.53;
      const y0 = rows * 0.1;
      const x1 = cols * 0.95;
      const y1 = rows * 0.86;
      return { x0, y0, x1, y1 };
    };

    const drawTerminalLines = () => {
      const { x0, y0, x1, y1 } = termRect();
      lineCtx.strokeStyle = soft;
      lineCtx.strokeRect(x0, y0, x1 - x0, y1 - y0);
      lineCtx.beginPath();
      lineCtx.moveTo(x0, y0 + 3);
      lineCtx.lineTo(x1, y0 + 3);
      lineCtx.stroke();
      // Window dots (lime).
      lineCtx.fillStyle = full;
      for (let i = 0; i < 3; i++) {
        lineCtx.beginPath();
        lineCtx.arc(x0 + 2.2 + i * 2.4, y0 + 1.5, 0.8, 0, Math.PI * 2);
        lineCtx.fill();
      }
    };

    /* ----- shaded body luminance per variant ----- */

    const globeBody = (gx: number, gy: number, t: number, cx: number, cy: number, R: number) => {
      const dx = (gx - cx) / R;
      const dy = (gy - cy) / R;
      const d2 = dx * dx + dy * dy;
      if (d2 >= 1) return 0;
      const nz = Math.sqrt(1 - d2);
      const lambert = Math.max(0, dx * LX + dy * LY + nz * LZ);
      const mottle = 0.45 + 0.75 * fbm(dx * 2.4 + t * 0.02 + 7.3, dy * 2.4 - 2.1);
      return lambert * mottle * smooth(Math.min(1, (1 - d2) * 6));
    };

    const graphBody = (gx: number, gy: number, t: number) => {
      // Soft shimmering halo around each node.
      let lum = 0;
      for (let i = 0; i < GRAPH_NODES.length; i++) {
        const nx = GRAPH_NODES[i].x * cols;
        const ny = GRAPH_NODES[i].y * rows;
        const dx = gx - nx;
        const dy = gy - ny;
        const d2 = dx * dx + dy * dy;
        if (d2 > 64) continue;
        const pulse = 0.75 + 0.25 * Math.sin(t * 1.4 + i * 1.7);
        lum = Math.max(lum, Math.exp(-d2 / 14) * pulse);
      }
      if (lum < 0.05) return 0;
      return lum * (0.55 + 0.45 * fbm(gx * 0.35 + t * 0.1, gy * 0.35));
    };

    const stackBody = (gx: number, gy: number, t: number, slabs: Slab[]) => {
      for (const s of slabs) {
        const u = gx - s.cx;
        // Top face (rhombus).
        const vTop = gy - s.yc;
        if (Math.abs(u) / s.W + Math.abs(vTop) / s.H <= 1) {
          return 0.78 * (0.8 + 0.35 * fbm(u * 0.18 + t * 0.05, vTop * 0.3));
        }
        // Extruded sides: below the lower half-edges, within thickness T.
        const vBot = gy - s.yc - s.T;
        if (vBot <= 0 || Math.abs(u) / s.W + Math.abs(vBot) / s.H > 1 || gy <= s.yc) continue;
        const shade = u >= 0 ? 0.5 : 0.3;
        return shade * (0.85 + 0.3 * fbm(u * 0.2, gy * 0.3 + 4.2));
      }
      return 0;
    };

    /* ----- text overlays (real text, not grid glyphs) ----- */

    const drawGraphLabels = (t: number) => {
      for (let i = 0; i < GRAPH_NODES.length; i++) {
        const n = GRAPH_NODES[i];
        const px = n.x * cols * CELL;
        const py = n.y * rows * CELL;
        const pulse = 0.8 + 0.2 * Math.sin(t * 1.4 + i * 1.7);
        ctx.font = `13px "Geist Mono", ui-monospace, monospace`;
        ctx.fillStyle = brand;
        ctx.globalAlpha = pulse;
        ctx.textAlign = "center";
        ctx.fillText("✦", px, py);
        ctx.globalAlpha = 1;
        ctx.font = `9px "Geist Mono", ui-monospace, monospace`;
        ctx.fillStyle = textColor;
        ctx.textAlign = "left";
        ctx.fillText(n.id, px + 10, py + 1);
      }
    };

    const drawStackLabels = (t: number) => {
      const slabs = stackSlabs(t);
      ctx.font = `9px "Geist Mono", ui-monospace, monospace`;
      ctx.textAlign = "right";
      for (let k = 0; k < slabs.length; k++) {
        const s = slabs[k];
        ctx.fillStyle = textColor;
        ctx.fillText(STACK_SLABS[k], (s.cx - s.W - 3) * CELL, s.yc * CELL);
      }
      ctx.textAlign = "left";
    };

    const drawTerminalText = (t: number) => {
      const { x0, y0, x1 } = termRect();
      const tc = reducedMotion ? TERM_CYCLE_S : t % TERM_CYCLE_S;
      const left = (x0 + 2) * CELL;
      const top = (y0 + 5.5) * CELL;
      const lineH = 15;
      const maxW = (x1 - x0 - 4) * CELL;

      ctx.textAlign = "left";
      ctx.font = `11px "Geist Mono", ui-monospace, monospace`;

      // Typed command: "$ " in lime, rest in text color.
      const shown = Math.min(TERM_CMD.length, Math.floor(tc / TERM_TYPE_S));
      const cmd = TERM_CMD.slice(0, shown);
      ctx.fillStyle = brand;
      ctx.fillText("$", left, top);
      ctx.fillStyle = textColor;
      ctx.fillText(cmd.slice(1), left + 8, top, maxW);
      const typingDone = shown >= TERM_CMD.length;
      // Blinking block cursor.
      if (!reducedMotion && Math.floor(t * 2) % 2 === 0 && !typingDone) {
        const w = ctx.measureText(cmd.slice(1)).width;
        ctx.fillStyle = brand;
        ctx.fillText("▊", left + 10 + w, top);
      }

      if (!typingDone) return;
      const start = TERM_CMD.length * TERM_TYPE_S + 0.4;
      const visible = Math.min(TERM_LINES.length, Math.floor(Math.max(0, tc - start) / TERM_LINE_S));
      for (let i = 0; i < visible; i++) {
        const line = TERM_LINES[i];
        const y = top + (i + 1.6) * lineH;
        const limeLead = line.startsWith("✦") || line.startsWith("✓");
        if (limeLead) {
          ctx.fillStyle = brand;
          ctx.fillText(line[0], left, y);
          ctx.fillStyle = line.startsWith("✓") ? textColor : softText;
          ctx.fillText(line.slice(1), left + 12, y, maxW);
        } else {
          ctx.fillStyle = softText;
          ctx.fillText(line, left, y, maxW);
        }
      }
    };

    /* ----- main frame ----- */

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
      ctx.font = gridFont;
      ctx.textAlign = "center";

      const cx = cols * 0.72;
      const cy = rows * 0.46;
      const R = Math.min(rows * 0.38, cols * 0.19);
      const slabs = variant === "stack" ? stackSlabs(t) : [];
      const term = variant === "terminal" ? termRect() : null;

      lineCtx.clearRect(0, 0, cols, rows);
      lineCtx.lineWidth = 1;
      if (variant === "globe") drawGlobeLines(t, cx, cy, R);
      else if (variant === "graph") drawGraphLines(t);
      else if (variant === "stack") drawStackLines(t);
      else drawTerminalLines();
      const line = lineCtx.getImageData(0, 0, cols, rows).data;

      for (let gy = 0; gy < rows; gy++) {
        for (let gx = 0; gx < cols; gx++) {
          const px = gx * CELL + CELL / 2;
          const py = gy * CELL + CELL / 2;

          const lineA = line[(gy * cols + gx) * 4 + 3] / 255;
          if (lineA > 0.6) {
            ctx.fillStyle = brand;
            ctx.fillText("+", px, py);
            continue;
          }
          if (lineA > 0.22) {
            ctx.fillStyle = `rgba(${baseColor}, 0.55)`;
            ctx.fillText("·", px, py);
            continue;
          }

          let lum = 0;
          if (variant === "globe") lum = globeBody(gx, gy, t, cx, cy, R);
          else if (variant === "graph") lum = graphBody(gx, gy, t);
          else if (variant === "stack") lum = stackBody(gx, gy, t, slabs);
          if (lum > 0.06) {
            const idx = Math.min(GLYPHS.length - 1, 1 + Math.floor(lum * (GLYPHS.length - 1)));
            ctx.fillStyle = `rgba(${baseColor}, ${(bodyAlpha * Math.min(1, 0.25 + lum)).toFixed(3)})`;
            ctx.fillText(GLYPHS[idx], px, py);
            continue;
          }

          // Starfield (kept out of the terminal window).
          if (term && gx > term.x0 && gx < term.x1 && gy > term.y0 && gy < term.y1) continue;
          const h = hash2(gx, gy);
          if (h > 0.99) {
            const tw = 0.5 + 0.5 * Math.sin(t * 1.6 + h * 800);
            ctx.fillStyle = `rgba(${baseColor}, ${(starAlpha * (0.3 + 0.7 * tw)).toFixed(3)})`;
            ctx.fillText(h > 0.997 ? "*" : "·", px, py);
          }
        }
      }

      if (variant === "graph") drawGraphLabels(t);
      else if (variant === "stack") drawStackLabels(t);
      else if (variant === "terminal") drawTerminalText(t);
    };

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (!inView || now - last < FRAME_MS) return;
      last = now;
      draw(now / 1000);
    };

    resize();
    const observer = new ResizeObserver(() => {
      resize();
      draw(performance.now() / 1000);
    });
    observer.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      inView = entry?.isIntersecting ?? true;
    });
    io.observe(canvas);

    if (reducedMotion) {
      draw(0);
    } else {
      raf = requestAnimationFrame(tick);
    }

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      io.disconnect();
    };
  }, [resolvedTheme, variant]);

  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <canvas ref={canvasRef} className="size-full" aria-hidden="true" />
    </div>
  );
}
