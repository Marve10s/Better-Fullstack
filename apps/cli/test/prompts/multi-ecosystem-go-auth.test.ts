import { describe, expect, mock, test } from "bun:test";

import * as navigable from "@/prompts/core/navigable";

const realNavigable = { ...navigable };
const answers = new Map<string, string>();

mock.module("@/prompts/core/navigable", () => ({
  ...realNavigable,
  navigableSelect: <T>(opts: navigable.NavigableSelectOptions<T>) => {
    const answer = opts.options.find((option) => option.value === answers.get(opts.message));
    return answer ? Promise.resolve(answer.value) : realNavigable.navigableSelect(opts);
  },
}));

describe("multi-ecosystem composer with --auth go-better-auth", () => {
  test("keeps GoBetterAuth for a Rust frontend on a Go backend", async () => {
    const { runWithContextAsync } = await import("@/presentation/context");
    const { gatherMultiEcosystemConfig } =
      await import("@/prompts/ecosystems/multi-ecosystem-composer");
    const { processAndValidateFlags, validateConfigCompatibility } = await import("@/validation");

    answers.set("Select frontend ecosystem", "rust");
    answers.set("Select backend ecosystem", "go");
    try {
      await runWithContextAsync({ silent: true }, async () => {
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
      });
    } finally {
      answers.clear();
    }
  });
});
