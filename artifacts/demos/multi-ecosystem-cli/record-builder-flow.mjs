import { chromium } from "../../../apps/web/node_modules/@playwright/test/index.mjs";
import fs from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const OUT_DIR = path.join(ROOT, "artifacts/demos/multi-ecosystem-cli");
const RAW_DIR = path.join(OUT_DIR, "raw-builder-video");

await fs.rm(RAW_DIR, { force: true, recursive: true });
await fs.mkdir(RAW_DIR, { recursive: true });

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  viewport: { width: 1920, height: 1200 },
  deviceScaleFactor: 1,
  recordVideo: {
    dir: RAW_DIR,
    size: { width: 1920, height: 1200 },
  },
});

const page = await context.newPage();
let cursor = { x: 1580, y: 120 };

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
  const steps = 18;
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

async function clickTestId(testId, pause = 420) {
  const locator = page.getByTestId(testId).first();
  await locator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(160);
  const box = await locator.boundingBox();
  if (!box) {
    throw new Error(`No bounding box for ${testId}`);
  }
  await smoothMoveTo(box.x + box.width / 2, box.y + box.height / 2);
  await page.mouse.down();
  await page.waitForTimeout(80);
  await page.mouse.up();
  await page.waitForTimeout(pause);
}

await page.goto("http://localhost:3333/new", { waitUntil: "networkidle" });
await installDemoCursor();
await page.waitForTimeout(900);

await clickTestId("stack-mode-multi", 700);
await clickTestId("multi-frontend-tool-next", 650);
await clickTestId("multi-step-database", 500);
await clickTestId("multi-database-tool-postgres", 650);
await clickTestId("multi-step-backend", 450);
await clickTestId("multi-backend-language-go", 650);
await clickTestId("multi-backend-orm-gorm", 550);
await clickTestId("multi-step-finalize", 500);
await clickTestId("option-serverDeploy-railway", 650);
await clickTestId("option-git-false", 350);
await clickTestId("option-install-false", 650);
await clickTestId("tab-preview", 1200);

const command = page.getByTestId("command-output");
await command.scrollIntoViewIfNeeded();
const box = await command.boundingBox();
if (box) {
  await smoothMoveTo(Math.min(box.x + box.width - 100, 1840), box.y + box.height / 2);
}
await page.waitForTimeout(2500);

const video = page.video();
await page.close();
await context.close();
await browser.close();

const rawPath = await video.path();
const finalRawPath = path.join(OUT_DIR, "builder-flow.raw.webm");
await fs.rm(finalRawPath, { force: true });
await fs.rename(rawPath, finalRawPath);
console.log(finalRawPath);
