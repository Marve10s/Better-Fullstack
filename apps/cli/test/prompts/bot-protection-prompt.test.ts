import { describe, expect, it } from "bun:test";

import { resolveBotProtectionPrompt } from "@/prompts/services/bot-protection";
import { MULTI_ECOSYSTEM_TYPESCRIPT_SECTION_IDS } from "@/prompts/ecosystems/multi-ecosystem-composer";
import { validateConfigForProgrammaticUse } from "@/config/config-validation";
import { runWithContext } from "@/presentation/context";

describe("bot protection prompt", () => {
  it("does not offer bot protection when React Native is also selected", () => {
    const values = resolveBotProtectionPrompt({ frontends: ["next", "native-bare"] }).options.map(
      (option) => option.value,
    );

    expect(values).toEqual(["none"]);
  });

  it("skips bot protection for native-only projects", () => {
    const resolution = resolveBotProtectionPrompt({ frontends: ["native-bare"] });

    expect(resolution.shouldPrompt).toBe(false);
    expect(resolution.autoValue).toBe("none");
    expect(resolution.options).toEqual([]);
  });

  it("does not offer Turnstile for an unsupported web frontend", () => {
    const values = resolveBotProtectionPrompt({ frontends: ["svelte"] }).options.map(
      (option) => option.value,
    );

    expect(values).toEqual(["none"]);
  });

  it("only offers providers accepted by compatibility for the resolved stack", () => {
    const values = (context: Parameters<typeof resolveBotProtectionPrompt>[0]) =>
      resolveBotProtectionPrompt(context).options.map((option) => option.value);

    expect(
      values({
        frontends: ["next"],
        auth: "better-auth",
        backend: "self",
        webDeploy: "vercel",
      }),
    ).toEqual(["botid", "turnstile", "none"]);
    expect(
      values({ frontends: ["next"], auth: "none", backend: "self", webDeploy: "vercel" }),
    ).toEqual(["none"]);
    expect(
      values({
        frontends: ["next"],
        auth: "better-auth",
        backend: "hono",
        webDeploy: "vercel",
      }),
    ).toEqual(["turnstile", "none"]);
    expect(
      values({
        frontends: ["next"],
        auth: "better-auth",
        backend: "self",
        webDeploy: "netlify",
      }),
    ).toEqual(["turnstile", "none"]);
    expect(
      values({
        frontends: ["react-vite"],
        auth: "better-auth",
        backend: "none",
        webDeploy: "none",
      }),
    ).toEqual(["none"]);
  });

  it("rejects Vinext for BotID during programmatic validation", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateConfigForProgrammaticUse({
          ecosystem: "typescript",
          frontend: ["vinext"],
          auth: "better-auth",
          backend: "self",
          webDeploy: "vercel",
          botProtection: "botid",
        }),
      ),
    ).toThrow("Vercel BotID is only available for Next.js frontends");
  });

  it("rejects a non-self backend for BotID during programmatic validation", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateConfigForProgrammaticUse({
          ecosystem: "typescript",
          frontend: ["next"],
          auth: "better-auth",
          backend: "hono",
          webDeploy: "vercel",
          botProtection: "botid",
        }),
      ),
    ).toThrow("Vercel BotID requires the self-hosted Next.js backend");
  });

  it("rejects a native frontend for bot protection during programmatic validation", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateConfigForProgrammaticUse({
          ecosystem: "typescript",
          frontend: ["next", "native-uniwind"],
          auth: "better-auth",
          backend: "self",
          webDeploy: "vercel",
          botProtection: "botid",
        }),
      ),
    ).toThrow("Bot protection is not supported when a native frontend is selected");
  });

  it("exposes frontend security in custom multi-ecosystem configuration", () => {
    expect(MULTI_ECOSYSTEM_TYPESCRIPT_SECTION_IDS).toContain("frontend-security");
  });
});
