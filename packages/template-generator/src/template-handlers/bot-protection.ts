import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";
import type { TemplateData } from "./utils";

function turnstileSiteKeyExpression(frontend: string[]) {
  if (frontend.includes("next")) return 'process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? ""';
  if (frontend.includes("svelte")) return 'import.meta.env.PUBLIC_TURNSTILE_SITE_KEY ?? ""';
  return 'import.meta.env.VITE_TURNSTILE_SITE_KEY ?? ""';
}

function hasReactWebFrontend(frontend: string[]) {
  return frontend.some((value) =>
    [
      "next",
      "vinext",
      "react-router",
      "react-vite",
      "tanstack-router",
      "tanstack-start",
      "redwood",
    ].includes(value),
  );
}

function patchTurnstileForms(vfs: VirtualFileSystem): void {
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
      '$1\n  const [turnstileToken, setTurnstileToken] = useState("");',
    );
    next = next.replace(
      /(\{\n\s+onSuccess: \(\) => \{)/,
      '{\n          fetchOptions: { headers: { "x-turnstile-token": turnstileToken } },\n          onSuccess: () => {',
    );
    next = next.replace(
      /(\n\s*<form\.Subscribe>)/,
      "\n        <BotProtection onToken={setTurnstileToken} />$1",
    );
    vfs.writeFile(path, next);
  }
}

function patchBetterAuth(vfs: VirtualFileSystem, provider: "botid" | "turnstile"): void {
  const path = "packages/auth/src/index.ts";
  const source = vfs.readFile(path);
  if (!source?.includes("export const auth = betterAuth({")) return;

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

  if (config.botProtection === "botid") {
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

  vfs.writeFile(
    "apps/web/src/lib/bot-protection.ts",
    `export const turnstileSiteKey = ${turnstileSiteKeyExpression(config.frontend)};

export function turnstileHeaders(token: string): Record<string, string> {
  return { "x-turnstile-token": token };
}
`,
  );

  if (hasReactWebFrontend(config.frontend)) {
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
  }

  if (vfs.exists("packages/auth/src")) {
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
}
