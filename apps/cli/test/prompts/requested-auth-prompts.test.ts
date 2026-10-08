import { describe, expect, mock, test } from "bun:test";

import * as navigable from "@/prompts/core/navigable";

const realNavigable = { ...navigable };
const answers = new Map<string, string>();
const offered = new Map<string, unknown[]>();

mock.module("@/prompts/core/navigable", () => ({
  ...realNavigable,
  navigableSelect: <T>(opts: navigable.NavigableSelectOptions<T>) => {
    offered.set(
      opts.message,
      opts.options.map((option) => option.value),
    );
    const answer = opts.options.find((option) => option.value === answers.get(opts.message));
    return answer ? Promise.resolve(answer.value) : realNavigable.navigableSelect(opts);
  },
}));

async function withAnswers(entries: Record<string, string>, run: () => Promise<void>) {
  const { runWithContextAsync } = await import("@/presentation/context");
  for (const [message, value] of Object.entries(entries)) answers.set(message, value);
  try {
    await runWithContextAsync({ silent: true }, run);
  } finally {
    answers.clear();
    offered.clear();
  }
}

describe("prompts keep the auth requested by flag", () => {
  test("the ecosystem prompt offers only ecosystems that generate the requested auth", async () => {
    const { gatherConfig } = await import("@/prompts/core/config-prompts");
    const { processAndValidateFlags } = await import("@/validation");

    await withAnswers({ "Select ecosystem": "python" }, async () => {
      const flags = processAndValidateFlags({ auth: "clerk" }, new Set(["auth"]), "auth-app");
      const config = await gatherConfig(flags, "auth-app", "/virtual/auth-app", "auth-app");

      expect(offered.get("Select ecosystem")).toEqual(["typescript"]);
      expect({ ecosystem: config.ecosystem, auth: config.auth }).toEqual({
        ecosystem: "typescript",
        auth: "clerk",
      });
    });
  });

  test("the composer keeps GoBetterAuth for a Rust frontend on a Go backend", async () => {
    const { gatherMultiEcosystemConfig } =
      await import("@/prompts/ecosystems/multi-ecosystem-composer");
    const { processAndValidateFlags, validateConfigCompatibility } = await import("@/validation");

    await withAnswers(
      { "Select frontend ecosystem": "rust", "Select backend ecosystem": "go" },
      async () => {
        const flags = processAndValidateFlags(
          { auth: "go-better-auth" },
          new Set(["auth"]),
          "auth-app",
        );
        const config = await gatherMultiEcosystemConfig(
          flags,
          "auth-app",
          "/virtual/auth-app",
          "auth-app",
        );

        expect({
          ecosystem: config.ecosystem,
          goWebFramework: config.goWebFramework,
          auth: config.auth,
        }).toEqual({ ecosystem: "go", goWebFramework: "gin", auth: "go-better-auth" });
        expect(() =>
          validateConfigCompatibility(config, new Set(["auth"]), { auth: "go-better-auth" }),
        ).not.toThrow();
      },
    );
  });
});
