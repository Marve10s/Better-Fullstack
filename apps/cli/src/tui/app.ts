import type {
  BoxRenderable,
  CliRenderer,
  ImageRenderable,
  KeyEvent,
  NativeImage,
  TextChunk,
  TextRenderable,
} from "@opentui/core";

import type { TuiController, TuiOption, TuiPrompt } from "@/tui/controller";
import type { OpenTuiModule } from "@/tui/runtime";

import { TUI_BACKGROUND } from "@/tui/contrast";
import {
  ICON_COLUMNS,
  ICON_IMAGE_SIZE,
  ICON_ROWS,
  iconCells,
  iconFor,
  iconPixels,
  type TuiIcon,
} from "@/tui/icons";
import { summarize, type Tone, type TuiSummary } from "@/tui/summary";

const THEME = {
  background: `#${TUI_BACKGROUND}`,
  header: "#161b22",
  border: "#30363d",
  focus: "#a78bfa",
  text: "#e6edf3",
  muted: "#8b949e",
  selection: "#21262d",
  ok: "#3fb950",
  warn: "#d29922",
  error: "#f85149",
  info: "#58a6ff",
};

const TONE_COLOR: Record<Tone, string> = {
  ok: THEME.ok,
  warn: THEME.warn,
  error: THEME.error,
  info: THEME.info,
};

const TONE_MARK: Record<Tone, string> = { ok: "✓", warn: "!", error: "✗", info: "i" };

const RAIL_WIDTH = 26;
const COMPAT_HEIGHT = 7;
const COMMAND_HEIGHT = 5;

export type TuiApp = {
  renderer: CliRenderer;
  close(): Promise<void>;
};

type Styler = {
  fg: (color: string) => (input: string | TextChunk) => TextChunk;
  bg: (color: string) => (input: string | TextChunk) => TextChunk;
  bold: (input: string | TextChunk) => TextChunk;
};

function truncate(text: string, width: number): string {
  if (width <= 0) return "";
  return text.length > width ? `${text.slice(0, Math.max(0, width - 1))}…` : text;
}

function pad(text: string, width: number): string {
  const clipped = truncate(text, width);
  return clipped + " ".repeat(Math.max(0, width - clipped.length));
}

function wrap(text: string, width: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    if (line && line.length + word.length + 1 > width) {
      lines.push(line);
      line = word;
    } else line = line ? `${line} ${word}` : word;
  }
  if (line) lines.push(line);
  return lines.flatMap((entry) =>
    entry.length <= width ? [entry] : (entry.match(new RegExp(`.{1,${width}}`, "g")) ?? []),
  );
}

function optionMarker(prompt: TuiPrompt, option: TuiOption, active: boolean): string {
  if (prompt.kind === "multiselect") {
    return prompt.selected.includes(option.value) ? "◼" : "◻";
  }
  if (option.disabled) return "○";
  return active ? "●" : "○";
}

function renderFooter(prompt: TuiPrompt | undefined, reviewing: boolean): string {
  if (reviewing) return " ↑/↓ scroll · enter create project · esc cancel";
  if (!prompt) return " working…";
  const back = prompt.navigation.canGoBack
    ? prompt.kind === "text"
      ? " · esc back"
      : " · b/esc back"
    : "";
  if (prompt.kind === "text") return ` type a name · enter confirm${back} · ctrl+c cancel`;
  if (prompt.kind === "multiselect") {
    return ` ↑/↓ move · space toggle · a all · enter confirm${back} · ctrl+c cancel`;
  }
  return ` ↑/↓ move · enter choose${back} · ctrl+c cancel`;
}

export async function mountTui(otui: OpenTuiModule, controller: TuiController): Promise<TuiApp> {
  let closeRequested = false;
  let closing: Promise<void> | undefined;
  const renderer = await otui.createCliRenderer({
    exitOnCtrlC: false,
    useMouse: false,
    onDestroy: () => {
      if (!closeRequested) controller.cancel();
    },
    consoleMode: "disabled",
    backgroundColor: THEME.background,
    targetFps: 30,
  });
  const style: Styler = { fg: otui.fg, bg: otui.bg, bold: otui.bold };
  const styled = (chunks: TextChunk[]) => new otui.StyledText(chunks);
  const text = (content: string | TextChunk[]) =>
    typeof content === "string" ? content : styled(content);

  const container = new otui.BoxRenderable(renderer, {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    backgroundColor: THEME.background,
  });
  const header = new otui.TextRenderable(renderer, { height: 1, bg: THEME.header, fg: THEME.text });
  const body = new otui.BoxRenderable(renderer, { flexDirection: "row", flexGrow: 1 });
  const railBox = new otui.BoxRenderable(renderer, {
    width: RAIL_WIDTH,
    border: true,
    borderColor: THEME.border,
    title: " Steps ",
    titleColor: THEME.muted,
    paddingLeft: 1,
  });
  const rail = new otui.TextRenderable(renderer, { fg: THEME.text });
  const main = new otui.BoxRenderable(renderer, { flexDirection: "column", flexGrow: 1 });
  const optionsBox = new otui.BoxRenderable(renderer, {
    flexGrow: 1,
    border: true,
    borderColor: THEME.focus,
    titleColor: THEME.text,
    paddingLeft: 1,
    paddingRight: 1,
  });
  const options = new otui.TextRenderable(renderer, { fg: THEME.text, wrapMode: "none" });
  const compatBox = new otui.BoxRenderable(renderer, {
    height: COMPAT_HEIGHT,
    border: true,
    borderColor: THEME.border,
    title: " Compatibility ",
    titleColor: THEME.muted,
    paddingLeft: 1,
    paddingRight: 1,
  });
  const compat = new otui.TextRenderable(renderer, { fg: THEME.text, wrapMode: "none" });
  const commandBox = new otui.BoxRenderable(renderer, {
    height: COMMAND_HEIGHT,
    border: true,
    borderColor: THEME.border,
    title: " Command ",
    titleColor: THEME.muted,
    paddingLeft: 1,
    paddingRight: 1,
  });
  const command = new otui.TextRenderable(renderer, { fg: THEME.muted, wrapMode: "none" });
  const footer = new otui.TextRenderable(renderer, {
    height: 1,
    fg: THEME.muted,
    bg: THEME.header,
  });

  railBox.add(rail);
  optionsBox.add(options);
  compatBox.add(compat);
  commandBox.add(command);
  main.add(optionsBox);
  main.add(compatBox);
  main.add(commandBox);
  body.add(railBox);
  body.add(main);
  container.add(header);
  container.add(body);
  container.add(footer);
  renderer.root.add(container);

  const images: ImageRenderable[] = [];
  const nativeImages = new Map<TuiIcon, NativeImage>();

  function imagesSupported(): boolean {
    return (
      otui.resolveImageRenderProtocol(
        "auto",
        renderer.capabilities,
        renderer.resolution !== null,
      ) !== "blocks"
    );
  }

  function nativeImageFor(icon: TuiIcon): NativeImage {
    let image = nativeImages.get(icon);
    if (!image) {
      image = otui.NativeImage.fromRgba(
        iconPixels(icon),
        ICON_IMAGE_SIZE,
        ICON_IMAGE_SIZE,
        undefined,
        {
          owner: renderer.nativeScene.resourceContext,
        },
      );
      nativeImages.set(icon, image);
    }
    return image;
  }

  function placeImages(icons: (TuiIcon | undefined)[]): void {
    const enabled = imagesSupported();
    const wanted = enabled ? icons.length : 0;
    for (let slot = images.length; slot < wanted; slot++) {
      const image = new otui.ImageRenderable(renderer, {
        position: "absolute",
        left: 1,
        top: slot * ICON_ROWS,
        width: ICON_COLUMNS,
        height: ICON_ROWS,
        fit: "fit",
      });
      optionsBox.add(image);
      images.push(image);
    }
    images.forEach((image, index) => {
      const icon = enabled ? icons[index] : undefined;
      image.visible = icon !== undefined;
      if (icon) image.source = nativeImageFor(icon);
    });
  }

  function iconRow(icon: TuiIcon | undefined, row: number, imagesEnabled: boolean): TextChunk[] {
    if (!icon || imagesEnabled) return [style.fg(THEME.muted)(" ".repeat(ICON_COLUMNS))];
    return (iconCells(icon)[row] ?? []).map((cell) =>
      style.bg(cell.bottom)(style.fg(cell.top)("▀")),
    );
  }

  function renderOptions(prompt: TuiPrompt, width: number, height: number): TextChunk[] {
    if (prompt.kind === "text") {
      const value = prompt.input
        ? style.fg(THEME.text)(`${prompt.input}█`)
        : style.fg(THEME.muted)(`${prompt.placeholder ?? ""}█`);
      const chunks: TextChunk[] = [
        style.fg(THEME.focus)("› "),
        value,
        style.fg(THEME.muted)("\n\n"),
      ];
      if (prompt.error) chunks.push(style.fg(THEME.error)(`✗ ${prompt.error}\n`));
      if (prompt.defaultValue) {
        chunks.push(style.fg(THEME.muted)(`Enter keeps the default: ${prompt.defaultValue}`));
      }
      placeImages([]);
      return chunks;
    }

    const imagesEnabled = imagesSupported();
    const visible = Math.max(1, Math.floor(height / ICON_ROWS));
    const start = Math.min(
      Math.max(0, prompt.cursor - Math.floor(visible / 2)),
      Math.max(0, prompt.options.length - visible),
    );
    const window = prompt.options.slice(start, start + visible);
    const icons = window.map((option) =>
      prompt.kind === "confirm" ? undefined : iconFor(option.value),
    );
    placeImages(icons);
    optionsBox.bottomTitle =
      prompt.options.length > visible ? ` ${prompt.cursor + 1}/${prompt.options.length} ` : "";

    const labelWidth = Math.max(10, width - ICON_COLUMNS - 1);
    return window.flatMap((option, offset) => {
      const index = start + offset;
      const active = index === prompt.cursor;
      const marker = optionMarker(prompt, option, active);
      const background = active ? THEME.selection : THEME.background;
      const labelColor = option.disabled ? THEME.muted : THEME.text;
      const heading = option.disabled && !option.hint;
      const label = pad(heading ? option.label : `${marker} ${option.label}`, labelWidth);
      const hintText =
        option.disabled && option.hint ? `unavailable: ${option.hint}` : (option.hint ?? "");
      const hint = pad(`   ${hintText}`, labelWidth);
      const name = active ? style.bold(style.fg(labelColor)(label)) : style.fg(labelColor)(label);
      return [
        ...iconRow(icons[offset], 0, imagesEnabled),
        style.bg(background)(" "),
        style.bg(background)(name),
        style.fg(THEME.muted)("\n"),
        ...iconRow(icons[offset], 1, imagesEnabled),
        style.bg(background)(" "),
        style.bg(background)(style.fg(THEME.muted)(hint)),
        style.fg(THEME.muted)(offset === window.length - 1 ? "" : "\n"),
      ];
    });
  }

  function renderRail(summary: TuiSummary): TextChunk[] {
    const marks = { decided: "✓", current: "▸", remaining: "○", defaults: "–" };
    const colors = {
      decided: THEME.ok,
      current: THEME.focus,
      remaining: THEME.muted,
      defaults: THEME.muted,
    };
    return summary.rail.flatMap((step, index) => [
      style.fg(colors[step.status])(`${marks[step.status]} `),
      step.status === "current"
        ? style.bold(style.fg(THEME.text)(truncate(step.label, RAIL_WIDTH - 6)))
        : style.fg(step.status === "decided" ? THEME.text : THEME.muted)(
            truncate(step.label, RAIL_WIDTH - 6),
          ),
      style.fg(THEME.muted)(index === summary.rail.length - 1 ? "" : "\n"),
    ]);
  }

  function renderHeader(summary: TuiSummary, width: number): TextChunk[] {
    const total = summary.rail.length;
    const current = Math.max(0, summary.stepIndex) + 1;
    const barWidth = 16;
    const filled = Math.round((current / total) * barWidth);
    const left = ` Better Fullstack  ${summary.projectName}${summary.ecosystem ? ` · ${summary.ecosystem}` : ""}`;
    const right = ` step ${current}/${total} `;
    const gap = Math.max(1, width - left.length - right.length - barWidth - 1);
    return [
      style.bold(style.fg(THEME.focus)(" Better Fullstack ")),
      style.fg(THEME.text)(` ${summary.projectName}`),
      style.fg(THEME.muted)(summary.ecosystem ? ` · ${summary.ecosystem}` : ""),
      style.fg(THEME.muted)(" ".repeat(gap)),
      style.fg(THEME.focus)("█".repeat(filled)),
      style.fg(THEME.border)("░".repeat(barWidth - filled)),
      style.fg(THEME.muted)(right),
    ];
  }

  function draw(): void {
    if (renderer.isDestroyed) return;
    const width = renderer.width;
    const height = renderer.height;
    const summary = summarize(controller);
    const mainWidth = width - RAIL_WIDTH - 4;
    const optionsHeight = height - 2 - COMPAT_HEIGHT - COMMAND_HEIGHT - 2;

    header.content = text(renderHeader(summary, width));
    rail.content = text(renderRail(summary));

    const phase = controller.phase;
    if (phase.kind === "review") {
      optionsBox.title = " Review your stack ";
      const visible = Math.max(1, optionsHeight);
      controller.reviewRows = visible;
      const lines = phase.review.lines.slice(phase.offset, phase.offset + visible);
      optionsBox.bottomTitle =
        phase.review.lines.length > visible
          ? ` ${phase.offset + 1}-${phase.offset + lines.length}/${phase.review.lines.length} `
          : "";
      options.content = text([
        style.fg(THEME.text)(lines.map((line) => truncate(line, mainWidth)).join("\n")),
      ]);
      placeImages([]);
    } else if (phase.kind === "prompt") {
      optionsBox.title = ` ${truncate(phase.prompt.message, mainWidth - 4)} `;
      options.content = text(renderOptions(phase.prompt, mainWidth, optionsHeight));
    } else {
      optionsBox.title = " Working ";
      optionsBox.bottomTitle = "";
      options.content = text([style.fg(THEME.muted)("Preparing the next step…")]);
      placeImages([]);
    }

    const compatLines = summary.compatibility.slice(0, COMPAT_HEIGHT - 2);
    compat.content = text(
      compatLines.flatMap((line, index) => [
        style.fg(TONE_COLOR[line.tone])(`${TONE_MARK[line.tone]} `),
        style.fg(line.tone === "info" ? THEME.muted : THEME.text)(
          truncate(line.text, mainWidth - 2),
        ),
        style.fg(THEME.muted)(index === compatLines.length - 1 ? "" : "\n"),
      ]),
    );
    command.content = text([
      style.fg(THEME.muted)(
        wrap(summary.command, mainWidth)
          .slice(0, COMMAND_HEIGHT - 2)
          .join("\n"),
      ),
    ]);
    footer.content = text([
      style.fg(THEME.muted)(pad(renderFooter(controller.prompt, phase.kind === "review"), width)),
    ]);
  }

  const onKey = (key: KeyEvent) => {
    if (key.eventType === "release") return;
    controller.handleKey(key);
  };
  renderer.keyInput.on("keypress", onKey);
  renderer.on("resize", draw);
  renderer.on("capabilities", draw);
  const unsubscribe = controller.subscribe(draw);
  draw();

  return {
    renderer,
    close() {
      closeRequested = true;
      closing ??= (async () => {
        unsubscribe();
        for (const image of nativeImages.values()) image.dispose();
        renderer.keyInput.off("keypress", onKey);
        renderer.off("resize", draw);
        renderer.off("capabilities", draw);
        renderer.destroy();
        await renderer.closed.catch(() => undefined);
      })();
      return closing;
    },
  };
}
