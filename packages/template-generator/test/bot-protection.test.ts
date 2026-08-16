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
    for (const path of [
      "apps/web/src/components/sign-in-form.tsx",
      "apps/web/src/components/sign-up-form.tsx",
    ]) {
      expect(output.get(path)).toContain('headers: { "x-turnstile-token": turnstileToken }');
      expect(output.get(path)).not.toContain("fetchOptions: {");
    }
    expect(output.get("apps/web/src/components/sign-in-form.tsx")).toContain(
      "setTurnstileAttempt((attempt) => attempt + 1)",
    );
    expect(output.get("apps/web/src/components/sign-in-form.tsx")).toContain(
      "key={turnstileAttempt}",
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

  it("allows the Turnstile header through generated server CORS", async () => {
    const output = await generate("turnstile", {
      frontend: ["react-vite"],
      backend: "hono",
      runtime: "bun",
    });

    expect(output.get("apps/server/src/index.ts")).toContain('"X-Turnstile-Token"');
  });

  const turnstileRejections: Array<
    [string, Parameters<typeof makeConfig>[0], string]
  > = [
    ["backendless projects", { auth: "none", backend: "none" }, "requires Better Auth"],
    ["Convex", { backend: "convex" }, "not wired for Convex"],
    ["Svelte", { frontend: ["svelte"] }, "React web frontends only"],
  ];

  for (const [name, overrides, message] of turnstileRejections) {
    it(`rejects Turnstile for ${name}`, async () => {
      const result = await generateVirtualProject({
        config: makeConfig({
          frontend: ["next"],
          backend: "self",
          runtime: "none",
          auth: "better-auth",
          botProtection: "turnstile",
          ...overrides,
        }),
        templates: EMBEDDED_TEMPLATES,
      });

      expect(result.success).toBe(false);
      expect(result.error).toContain(message);
    });
  }

  it("rejects BotID with an explicit non-Vercel deployment", async () => {
    const result = await generateVirtualProject({
      config: makeConfig({
        frontend: ["next"],
        backend: "self",
        runtime: "none",
        auth: "better-auth",
        botProtection: "botid",
        webDeploy: "netlify",
      }),
      templates: EMBEDDED_TEMPLATES,
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("requires Vercel deployment");
  });

  it("rejects BotID for backends that do not host the Next.js auth handler", async () => {
    const result = await generateVirtualProject({
      config: makeConfig({
        frontend: ["next"],
        backend: "convex",
        runtime: "none",
        auth: "better-auth",
        botProtection: "botid",
      }),
      templates: EMBEDDED_TEMPLATES,
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain("Vercel BotID requires the self-hosted Next.js backend");
    expect(result.error).not.toContain("Unable to wire");
  });

  it("rejects Turnstile when a native frontend is selected", async () => {
    const result = await generateVirtualProject({
      config: makeConfig({
        frontend: ["next", "native-bare"],
        backend: "self",
        runtime: "none",
        auth: "better-auth",
        botProtection: "turnstile",
      }),
      templates: EMBEDDED_TEMPLATES,
    });

    expect(result.success).toBe(false);
    expect(result.error).toContain(
      "Bot protection is not supported when a native frontend is selected",
    );
  });
});
