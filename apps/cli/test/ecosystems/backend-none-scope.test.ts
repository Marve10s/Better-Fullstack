import { describe, expect, it } from "bun:test";

import { validateFullConfig } from "@/config/config-validation";
import { runWithContext } from "@/presentation/context";

function validate(config: Parameters<typeof validateFullConfig>[0], flags: string[]) {
  return () =>
    runWithContext({ silent: true }, () => validateFullConfig(config, new Set(flags), {} as never));
}

describe("backend none checks", () => {
  it.each(["rust", "go", "python"] as const)(
    "let a %s project without a web framework keep its database",
    (ecosystem) => {
      expect(
        validate({ ecosystem, backend: "none", database: "sqlite" }, ["ecosystem", "database"]),
      ).not.toThrow();
    },
  );

  it("still reject a database without a backend in TypeScript projects", () => {
    expect(
      validate({ ecosystem: "typescript", backend: "none", database: "sqlite" }, [
        "ecosystem",
        "backend",
        "database",
      ]),
    ).toThrow("Backend 'none' requires '--database none'");
  });
});
