import { chromium } from "../../../apps/web/node_modules/@playwright/test/index.mjs";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "artifacts/demos/multi-ecosystem-cli");
const FRAMES_DIR = path.join(OUT_DIR, "builder-flow-frames");
const FRAME_RATE = 24;

await fs.rm(FRAMES_DIR, { force: true, recursive: true });
await fs.mkdir(FRAMES_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

let cursor = { x: 1180, y: 92 };
let frameIndex = 0;
let recording = false;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function framePath(index) {
  return path.join(FRAMES_DIR, `${String(index).padStart(5, "0")}.png`);
}

async function captureLoop() {
  const startedAt = Date.now();
  const frameInterval = 1000 / FRAME_RATE;
  while (recording) {
    const targetTime = startedAt + frameIndex * frameInterval;
    const wait = targetTime - Date.now();
    if (wait > 0) {
      await delay(wait);
    }
    await page.screenshot({
      path: framePath(frameIndex),
      animations: "allow",
      caret: "hide",
      scale: "css",
    });
    frameIndex += 1;
  }
}

async function installDemoCursor() {
  await page.addStyleTag({
    content: `
      #bf-demo-cursor {
        position: fixed;
        z-index: 2147483647;
        width: 24px;
        height: 24px;
        border-radius: 9999px;
        border: 2px solid white;
        background: #111827;
        box-shadow: 0 0 0 4px rgba(17,24,39,.22), 0 10px 24px rgba(0,0,0,.28);
        pointer-events: none;
        transform: translate(-50%, -50%);
      }
      #bf-demo-cursor::after {
        content: "";
        position: absolute;
        left: 50%;
        top: 50%;
        width: 5px;
        height: 5px;
        border-radius: 9999px;
        background: #fff;
        transform: translate(-50%, -50%);
      }
      .bf-demo-ripple {
        position: fixed;
        z-index: 2147483646;
        width: 36px;
        height: 36px;
        border-radius: 9999px;
        border: 2px solid rgba(59,130,246,.92);
        transform: translate(-50%, -50%) scale(.45);
        opacity: .9;
        pointer-events: none;
        animation: bfDemoRipple .55s ease-out forwards;
      }
      @keyframes bfDemoRipple {
        to { transform: translate(-50%, -50%) scale(1.6); opacity: 0; }
      }
      [data-sonner-toaster],
      [data-sonner-toast] {
        display: none !important;
      }
    `,
  });
  await page.evaluate(({ x, y }) => {
    const cursorEl = document.createElement("div");
    cursorEl.id = "bf-demo-cursor";
    cursorEl.style.left = `${x}px`;
    cursorEl.style.top = `${y}px`;
    document.body.append(cursorEl);
    document.addEventListener("mousemove", (event) => {
      cursorEl.style.left = `${event.clientX}px`;
      cursorEl.style.top = `${event.clientY}px`;
    });
    document.addEventListener("mousedown", (event) => {
      const ripple = document.createElement("div");
      ripple.className = "bf-demo-ripple";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.append(ripple);
      window.setTimeout(() => ripple.remove(), 700);
    });
  }, cursor);
}

async function smoothMoveTo(x, y) {
  const steps = 24;
  for (let index = 1; index <= steps; index += 1) {
    const progress = index / steps;
    const eased = 1 - (1 - progress) ** 3;
    await page.mouse.move(
      cursor.x + (x - cursor.x) * eased,
      cursor.y + (y - cursor.y) * eased
    );
    await page.waitForTimeout(16);
  }
  cursor = { x, y };
}

async function smoothScrollToLocator(locator, anchor = 180) {
  const currentScroll = await page.evaluate(() => window.scrollY);
  const targetScroll = await locator.evaluate((element, anchorOffset) => {
    const rect = element.getBoundingClientRect();
    return Math.max(0, window.scrollY + rect.top - anchorOffset);
  }, anchor);
  const distance = targetScroll - currentScroll;

  if (Math.abs(distance) < 12) {
    return;
  }

  const steps = Math.min(42, Math.max(16, Math.ceil(Math.abs(distance) / 42)));
  for (let index = 1; index <= steps; index += 1) {
    const progress = index / steps;
    const eased = 1 - (1 - progress) ** 3;
    await page.evaluate(
      ({ start, delta, easedProgress }) => {
        window.scrollTo(0, start + delta * easedProgress);
      },
      { start: currentScroll, delta: distance, easedProgress: eased }
    );
    await page.waitForTimeout(18);
  }
}

async function clickTestId(testId, pause = 620, anchor = 180) {
  const locator = page.getByTestId(testId).first();
  await smoothScrollToLocator(locator, anchor);
  await page.waitForTimeout(140);
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error(`No bounding box for ${testId}`);
  }
  await smoothMoveTo(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(70);
  await page.mouse.up();
  await page.waitForTimeout(pause);
}

await page.goto("http://localhost:3333/new", { waitUntil: "networkidle" });
await installDemoCursor();

recording = true;
const capturePromise = captureLoop();

await page.waitForTimeout(900);
await clickTestId("stack-mode-multi", 700, 80);
await clickTestId("multi-frontend-tool-next", 720);
await clickTestId("multi-step-database", 560, 120);
await clickTestId("multi-database-tool-postgres", 720);
await clickTestId("multi-step-backend", 560, 120);
await clickTestId("multi-backend-language-go", 780);
await clickTestId("multi-backend-orm-gorm", 700);
await clickTestId("multi-step-finalize", 620, 120);
await clickTestId("option-serverDeploy-railway", 780);
await clickTestId("option-git-false", 560);
await clickTestId("option-install-false", 780);
await clickTestId("tab-preview", 900, 80);

const command = page.getByTestId("command-output");
await smoothScrollToLocator(command, 680);
const box = await command.boundingBox();
if (box) {
  await smoothMoveTo(Math.min(box.x + box.width - 80, 1320), box.y + box.height / 2);
}
await page.waitForTimeout(2000);

recording = false;
await capturePromise;
await browser.close();

console.log(`${FRAMES_DIR} ${frameIndex}`);
