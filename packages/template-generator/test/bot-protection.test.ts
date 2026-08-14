import { describe, expect, it } from "bun:test";

import type { VirtualFile, VirtualNode } from "../src/types";

import { generateVirtualProject } from "../src/generator";
import { EMBEDDED_TEMPLATES } from "../src/templates.generated";
import { makeConfig } from "./_fixtures/config-factory";

function files(node: VirtualNode): VirtualFile[] {
  return node.type === "file" ? [node] : node.children.flatMap(files);
}

async function generate(
  botProtection: "botid" | "turnstile",
  overrides: Parameters<typeof makeConfig>[0] = {},
) {
  const result = await generateVirtualProject({
    config: makeConfig({
      frontend: ["next"],
      backend: "self",
      runtime: "none",
      auth: "better-auth",
      botProtection,
      ...overrides,
    }),
    templates: EMBEDDED_TEMPLATES,
  });
  expect(result.success).toBe(true);
  return new Map(files(result.tree!.root).map((file) => [file.path, file.content]));
}

describe("bot protection generation", () => {
  it("wires Turnstile into the auth form and enforces Siteverify on the server", async () => {
    const output = await generate("turnstile");
    expect(output.get("apps/web/package.json")).toContain('"@marsidev/react-turnstile": "^1.5.4"');
    expect(output.get("apps/web/src/components/bot-protection.tsx")).toContain("<Turnstile");
    expect(output.get("apps/web/src/components/sign-in-form.tsx")).toContain(
      '"x-turnstile-token": turnstileToken',
    );
    expect(output.get("packages/auth/src/index.ts")).toContain("verifyTurnstile(ctx.headers)");
    expect(output.get("packages/auth/src/lib/bot-protection.ts")).toContain(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    );
    expect(output.get("apps/web/.env")).toContain("NEXT_PUBLIC_TURNSTILE_SITE_KEY=");
    expect(output.get("apps/web/.env")).toContain("TURNSTILE_SECRET_KEY=");
  });

  it("wires BotID client initialization, Next config, and auth-route enforcement", async () => {
    const output = await generate("botid");
    expect(output.get("apps/web/package.json")).toContain('"botid": "catalog:"');
    expect(output.get("packages/auth/package.json")).toContain('"botid": "catalog:"');
    expect(output.get("package.json")).toContain('"botid": "^1.5.11"');
    expect(output.get("apps/web/instrumentation-client.ts")).toContain("initBotId");
    expect(output.get("apps/web/next.config.ts")).toContain("withBotId(nextConfig)");
    expect(output.get("packages/auth/src/index.ts")).toContain("await checkBotId()");
    expect(output.get("apps/web/.env") ?? "").not.toContain("BOTID");
  });

  it("retains Turnstile wiring when a thin Next.js project is flattened to a single app", async () => {
    const output = await generate("turnstile", {
      workspaceShape: "single-app",
      database: "none",
      orm: "none",
      api: "none",
      auth: "none",
    });

    expect(output.get("package.json")).toContain('"@marsidev/react-turnstile": "^1.5.4"');
    expect(output.get("src/components/bot-protection.tsx")).toContain("<Turnstile");
    expect(output.get("src/lib/bot-protection.ts")).toContain("turnstileSiteKey");
  });
});
