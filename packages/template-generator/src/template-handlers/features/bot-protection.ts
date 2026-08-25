import {
  type ProjectConfig,
  isBotIdWebFrontend,
  isTurnstileWebFrontend,
} from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";
import type { TemplateData } from "@/template-handlers/core/utils";

function turnstileSiteKeyExpression(frontend: string[]) {
  if (frontend.includes("next")) return 'process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""';
  if (frontend.includes("svelte")) return 'import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? ""';
  return 'import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ""';
}

export function insertBeforeFormSubscribe(source: string, content: string) {
  const markerIndex = source.indexOf("<form.Subscribe>");
  if (markerIndex === -1) return source;

  let whitespaceStart = markerIndex;
  while (whitespaceStart > 0 && source.charAt(whitespaceStart - 1).trim() === "") {
    whitespaceStart -= 1;
  }
  const insertionIndex = source.indexOf("\n", whitespaceStart);
  if (insertionIndex === -1 || insertionIndex >= markerIndex) return source;

  return `${source.slice(0, insertionIndex)}${content}${source.slice(insertionIndex)}`;
}

function patchTurnstileForms(vfs: VirtualFileSystem): void {
  let patchedForms = 0;
  for (const path of vfs.getAllFiles()) {
    if (!/apps\/web\/src\/components\/sign-(in|up)-form\.tsx$/.test(path)) continue;
    const source = vfs.readFile(path);
    if (!source?.includes("authClient.sign")) continue;

    let next = source.replace(
      /import \{ authClient \} from "@\/lib\/auth-client";\n/,
      'import { authClient } from "@/lib/auth-client";\nimport { useState } from "react";\nimport { BotProtection } from "./bot-protection";\n',
    );
    next = next.replace(
      /(const \{ isPending \} = authClient\.useSession\(\);)/,
      '$1\n  const [turnstileToken, setTurnstileToken] = useState("");\n  const [turnstileAttempt, setTurnstileAttempt] = useState(0);',
    );
    next = next.replace(
      /(\{\n\s+onSuccess: \(\) => \{)/,
      '{\n          headers: { "x-turnstile-token": turnstileToken },\n          onResponse: () => {\n            setTurnstileToken("");\n            setTurnstileAttempt((attempt) => attempt + 1);\n          },\n          onSuccess: () => {',
    );
    next = insertBeforeFormSubscribe(
      next,
      "\n        <BotProtection key={turnstileAttempt} onToken={setTurnstileToken} />",
    );
    if (
      next === source ||
      !next.includes("turnstileAttempt") ||
      !next.includes('"x-turnstile-token": turnstileToken') ||
      !next.includes("<BotProtection")
    ) {
      throw new Error(`Unable to wire Turnstile into ${path}`);
    }
    vfs.writeFile(path, next);
    patchedForms += 1;
  }
  if (patchedForms === 0) throw new Error("Unable to find Better Auth forms for Turnstile");
}

function patchBetterAuth(vfs: VirtualFileSystem, provider: "botid" | "turnstile"): void {
  const path = "packages/auth/src/index.ts";
  const source = vfs.readFile(path);
  if (!source?.includes("export const auth = betterAuth({")) {
    throw new Error(`Unable to wire ${provider} verification into Better Auth`);
  }

  const helperImport =
    provider === "turnstile"
      ? 'import { APIError, createAuthMiddleware } from "better-auth/api";\nimport { verifyTurnstile } from "./lib/bot-protection";\n'
      : 'import { APIError, createAuthMiddleware } from "better-auth/api";\nimport { checkBotId } from "botid/server";\n';
  const verification =
    provider === "turnstile"
      ? "const verified = await verifyTurnstile(ctx.headers);"
      : "const verified = !(await checkBotId()).isBot;";
  const hook = `\thooks: {
\t\tbefore: createAuthMiddleware(async (ctx) => {
\t\t\tif (ctx.path !== "/sign-in/email" && ctx.path !== "/sign-up/email") return;
\t\t\t${verification}
\t\t\tif (!verified) {
\t\t\t\tthrow new APIError("FORBIDDEN", { message: "Bot verification failed" });
\t\t\t}
\t\t}),
\t},
`;
  vfs.writeFile(
    path,
    `${helperImport}${source.replace("export const auth = betterAuth({\n", `export const auth = betterAuth({\n${hook}`)}`,
  );
}

function patchNextConfig(vfs: VirtualFileSystem): void {
  const path = "apps/web/next.config.ts";
  const source = vfs.readFile(path);
  if (!source) return;
  const next = `import { withBotId } from "botid/next/config";\n${source}`.replace(
    "export default nextConfig;",
    "export default withBotId(nextConfig);",
  );
  vfs.writeFile(path, next);
}

export async function processBotProtectionTemplates(
  vfs: VirtualFileSystem,
  _templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.botProtection || config.botProtection === "none") return;

  const webFrontends = config.frontend.filter(
    (frontend) => frontend !== "none" && !frontend.startsWith("native-"),
  );
  const hasBetterAuth =
    config.auth === "better-auth" || config.auth === "better-auth-organizations";
  if (!hasBetterAuth) throw new Error("Bot protection requires Better Auth");
  if (config.frontend.some((frontend) => frontend.startsWith("native-"))) {
    throw new Error("Bot protection is not supported when a native frontend is selected");
  }

  if (config.botProtection === "botid") {
    if (webFrontends.length === 0 || webFrontends.some((frontend) => !isBotIdWebFrontend(frontend))) {
      throw new Error("Vercel BotID is only available for Next.js frontends");
    }
    if (config.backend !== "self") {
      throw new Error("Vercel BotID requires the self-hosted Next.js backend");
    }
    if (config.webDeploy !== "none" && config.webDeploy !== "vercel") {
      throw new Error("Vercel BotID requires Vercel deployment when web deployment is selected");
    }
    vfs.writeFile(
      "apps/web/instrumentation-client.ts",
      `import { initBotId } from "botid/client/core";

initBotId({
  protect: [
    { path: "/api/auth/sign-in/email", method: "POST" },
    { path: "/api/auth/sign-up/email", method: "POST" },
  ],
});
`,
    );
    if (config.frontend.includes("next")) patchNextConfig(vfs);
    patchBetterAuth(vfs, "botid");
    return;
  }

  if (
    webFrontends.length === 0 ||
    webFrontends.some((frontend) => !isTurnstileWebFrontend(frontend))
  ) {
    throw new Error("Cloudflare Turnstile is currently wired for React web frontends only");
  }
  if (config.backend === "convex") {
    throw new Error("Cloudflare Turnstile is not wired for Convex auth forms");
  }
  if (config.backend === "none") {
    throw new Error("Cloudflare Turnstile requires a backend for server-side verification");
  }

  vfs.writeFile(
    "apps/web/src/lib/bot-protection.ts",
    `export const turnstileSiteKey = ${turnstileSiteKeyExpression(config.frontend)};

export function turnstileHeaders(token: string): Record<string, string> {
  return { "x-turnstile-token": token };
}
`,
  );

  vfs.writeFile(
    "apps/web/src/components/bot-protection.tsx",
    `"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { turnstileSiteKey } from "@/lib/bot-protection";

export function BotProtection({ onToken }: { onToken: (token: string) => void }) {
  return <Turnstile siteKey={turnstileSiteKey} onSuccess={onToken} onExpire={() => onToken("")} />;
}
`,
  );
  patchTurnstileForms(vfs);

  vfs.writeFile(
    "packages/auth/src/lib/bot-protection.ts",
    `import { env } from "@${config.projectName}/env/server";

export async function verifyTurnstile(headers: Headers): Promise<boolean> {
  const token = headers.get("x-turnstile-token");
  if (!token) return false;

  const body = new URLSearchParams({
    secret: env.TURNSTILE_SECRET_KEY,
    response: token,
  });
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
  });
  if (!response.ok) return false;
  const result: unknown = await response.json();
  return (
    typeof result === "object" &&
    result !== null &&
    "success" in result &&
    result.success === true
  );
}
`,
  );
  patchBetterAuth(vfs, "turnstile");
}
