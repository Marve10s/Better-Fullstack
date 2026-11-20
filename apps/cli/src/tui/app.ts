import type { CliRenderer, ImageRenderable, KeyEvent, NativeImage, RGBA } from "@opentui/core";

import type { TuiController } from "@/tui/controller";
import type { OpenTuiModule } from "@/tui/runtime";

import { NO_COLOR, hexColor } from "@/tui/canvas";
import { TUI_BACKGROUND } from "@/tui/contrast";
import {
  detectIconMode,
  ICON_IMAGE_SIZE,
  iconModeFromEnv,
  iconPixels,
  type IconMode,
  type TuiIcon,
} from "@/tui/icons";
import { Scene } from "@/tui/scene";
import { summarize, type TuiSummary } from "@/tui/summary";

export type TuiApp = {
  renderer: CliRenderer;
  iconMode(): IconMode;
  close(): Promise<void>;
};

const AMBIENT_FPS = 12;
const BUSY_FPS = 24;
const BACKGROUND = hexColor(TUI_BACKGROUND);

export async function mountTui(
  otui: OpenTuiModule,
  controller: TuiController,
  options: { motion: boolean },
): Promise<TuiApp> {
  let closeRequested = false;
  let closing: Promise<void> | undefined;
  const renderer = await otui.createCliRenderer({
    exitOnCtrlC: false,
    useMouse: false,
    onDestroy: () => {
      if (!closeRequested) controller.cancel();
    },
    consoleMode: "disabled",
    backgroundColor: `#${TUI_BACKGROUND}`,
    targetFps: 30,
  });

  try {
  const scene = new Scene(options.motion, Date.now());
  const surface = new otui.FrameBufferRenderable(renderer, {
    position: "absolute",
    left: 0,
    top: 0,
    width: renderer.width,
    height: renderer.height,
  });
  renderer.root.add(surface);

  const colors = new Map<number, RGBA>();
  const color = (value: number): RGBA => {
    const key = value === NO_COLOR ? BACKGROUND : value;
    let rgba = colors.get(key);
    if (!rgba) {
      if (colors.size > 4096) colors.clear();
      rgba = otui.RGBA.fromInts((key >> 16) & 255, (key >> 8) & 255, key & 255, 255);
      colors.set(key, rgba);
    }
    return rgba;
  };

  let previous = { chars: new Uint32Array(0), fg: new Int32Array(0), bg: new Int32Array(0) };
  const images: ImageRenderable[] = [];
  const nativeImages = new Map<TuiIcon, NativeImage>();
  const forcedMode = iconModeFromEnv(process.env.BFS_TUI_ICONS);
  let mode: IconMode = forcedMode ?? "plain";

  function resolveMode(): IconMode {
    const capabilities = renderer.capabilities;
    return detectIconMode({
      forced: forcedMode,
      imageProtocol: otui.resolveImageRenderProtocol(
        "auto",
        capabilities,
        renderer.resolution !== null,
      ),
      terminalName: capabilities?.terminal?.name,
      termProgram: process.env.TERM_PROGRAM,
      term: process.env.TERM,
    });
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

  function placeImages(): void {
    const wanted = mode === "image" ? scene.images : [];
    for (let slot = images.length; slot < wanted.length; slot++) {
      const image = new otui.ImageRenderable(renderer, {
        position: "absolute",
        left: 0,
        top: 0,
        width: 1,
        height: 1,
        fit: "fit",
        protocol: "kitty",
      });
      renderer.root.add(image);
      images.push(image);
    }
    images.forEach((image, index) => {
      const placement = wanted[index];
      if (!placement) {
        if (image.visible) image.visible = false;
        return;
      }
      const source = nativeImageFor(placement.icon);
      if (image.source !== source) image.source = source;
      if (image.left !== placement.x) image.left = placement.x;
      if (image.top !== placement.y) image.top = placement.y;
      if (image.width !== placement.width) image.width = placement.width;
      if (image.height !== placement.height) image.height = placement.height;
      if (!image.visible) image.visible = true;
    });
  }

  function blankUnderImages(): void {
    if (mode !== "image") return;
    const canvas = scene.canvas;
    for (const placement of scene.images) {
      for (let row = placement.y; row < placement.y + placement.height; row++) {
        for (let column = placement.x; column < placement.x + placement.width; column++) {
          if (column < 0 || row < 0 || column >= canvas.width || row >= canvas.height) continue;
          const index = row * canvas.width + column;
          canvas.chars[index] = 32;
          canvas.fg[index] = NO_COLOR;
        }
      }
    }
  }

  function flush(): void {
    const canvas = scene.canvas;
    const buffer = surface.frameBuffer;
    const resized = buffer.width !== canvas.width || buffer.height !== canvas.height;
    if (resized) buffer.resize(canvas.width, canvas.height);
    const fresh = resized || previous.chars.length !== canvas.chars.length;
    if (fresh) {
      previous = {
        chars: new Uint32Array(canvas.chars.length),
        fg: new Int32Array(canvas.fg.length),
        bg: new Int32Array(canvas.bg.length),
      };
    }
    let changed = 0;
    for (let index = 0; index < canvas.chars.length; index++) {
      const char = canvas.chars[index] ?? 32;
      const fg = canvas.fg[index] ?? NO_COLOR;
      const bg = canvas.bg[index] ?? NO_COLOR;
      if (
        !fresh &&
        previous.chars[index] === char &&
        previous.fg[index] === fg &&
        previous.bg[index] === bg
      ) {
        continue;
      }
      previous.chars[index] = char;
      previous.fg[index] = fg;
      previous.bg[index] = bg;
      buffer.drawChar(
        char,
        index % canvas.width,
        Math.floor(index / canvas.width),
        color(fg),
        color(bg),
      );
      changed++;
    }
    if (changed > 0) renderer.requestRender();
  }

  let summary: TuiSummary | undefined;
  let rate = 0;
  let stopTicks: (() => void) | undefined;

  function draw(): void {
    if (renderer.isDestroyed) return;
    summary ??= summarize(controller);
    if (surface.width !== renderer.width || surface.height !== renderer.height) {
      surface.width = renderer.width;
      surface.height = renderer.height;
      previous = { chars: new Uint32Array(0), fg: new Int32Array(0), bg: new Int32Array(0) };
    }
    scene.render({
      controller,
      summary,
      now: Date.now(),
      width: renderer.width,
      height: renderer.height,
      iconMode: mode,
    });
    blankUnderImages();
    flush();
    placeImages();
    schedule();
  }

  function schedule(): void {
    const wanted = !options.motion && !scene.animating ? 0 : scene.busy ? BUSY_FPS : AMBIENT_FPS;
    if (wanted === rate) return;
    stopTicks?.();
    stopTicks = wanted > 0 ? renderer.onAnimationTick(wanted, draw) : undefined;
    rate = wanted;
  }

  const onChange = () => {
    summary = undefined;
    draw();
  };
  const onCapabilities = () => {
    mode = resolveMode();
    previous = { chars: new Uint32Array(0), fg: new Int32Array(0), bg: new Int32Array(0) };
    draw();
  };
  const onKey = (key: KeyEvent) => {
    if (key.eventType === "release") return;
    if (scene.tooSmall(renderer.width, renderer.height) && !(key.ctrl && key.name === "c")) return;
    if (scene.introActive && !(key.ctrl && key.name === "c")) {
      scene.skipIntro();
      return draw();
    }
    controller.handleKey(key);
  };
  controller.copyCommand = (text) => renderer.copyToClipboardOSC52(text);
  mode = resolveMode();
  renderer.keyInput.on("keypress", onKey);
  renderer.on("resize", onChange);
  renderer.on("capabilities", onCapabilities);
  const unsubscribe = controller.subscribe(onChange);
  draw();

  return {
    renderer,
    iconMode: () => mode,
    close() {
      closeRequested = true;
      closing ??= (async () => {
        unsubscribe();
        stopTicks?.();
        controller.copyCommand = undefined;
        renderer.keyInput.off("keypress", onKey);
        renderer.off("resize", onChange);
        renderer.off("capabilities", onCapabilities);
        for (const image of nativeImages.values()) image.dispose();
        renderer.destroy();
        await renderer.closed.catch(() => undefined);
      })();
      return closing;
    },
  };
  } catch (error) {
    try {
      renderer.destroy();
    } catch {}
    throw error;
  }
}
