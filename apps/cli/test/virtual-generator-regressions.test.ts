import { describe, expect, it } from "bun:test";

import { createVirtual } from "../src/index";
import { runWithContext } from "../src/utils/context";
import { validateConfigForProgrammaticUse } from "../src/utils/config-validation";

function readJsonFromTree(
  tree: NonNullable<Awaited<ReturnType<typeof createVirtual>>["tree"]>,
  targetPath: string,
) {
  const stack = [...tree.root.children];
  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node.type === "file" && node.path === targetPath) {
      return JSON.parse(node.content) as {
        packageManager?: string;
        scripts?: Record<string, string>;
        dependencies?: Record<string, string>;
        devDependencies?: Record<string, string>;
      };
    }
    if (node.type === "directory") {
      stack.push(...node.children);
    }
  }
  return undefined;
}

function readTextFromTree(
  tree: NonNullable<Awaited<ReturnType<typeof createVirtual>>["tree"]>,
  targetPath: string,
) {
  const stack = [...tree.root.children];
  while (stack.length > 0) {
    const node = stack.pop()!;
    if (node.type === "file" && node.path === targetPath) {
      return node.content;
    }
    if (node.type === "directory") {
      stack.push(...node.children);
    }
  }
  return undefined;
}

describe("Virtual Generator Regressions", () => {
  const packageManagers = ["npm", "pnpm", "bun", "yarn"] as const;

  for (const packageManager of packageManagers) {
    it(`writes a concrete ${packageManager} packageManager version`, async () => {
      const result = await createVirtual({
        projectName: `pm-${packageManager}`,
        packageManager,
        frontend: ["tanstack-router"],
        backend: "hono",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: "none",
      });

      expect(result.success).toBe(true);

      const rootPackageJson = result.tree ? readJsonFromTree(result.tree, "package.json") : undefined;
      expect(rootPackageJson?.packageManager).toMatch(
        new RegExp(`^${packageManager}@\\d+\\.\\d+\\.\\d+(?:-.+)?$`),
      );
    });
  }

  const aiExamples = [
    { ai: "mastra", sdkPackage: "mastra" },
    { ai: "voltagent", sdkPackage: "@voltagent/core" },
    { ai: "openai-agents", sdkPackage: "@openai/agents" },
    { ai: "google-adk", sdkPackage: "@google/adk" },
  ] as const;

  for (const { ai, sdkPackage } of aiExamples) {
    it(`adds transport deps for ${ai} self-hosted AI examples`, async () => {
      const result = await createVirtual({
        projectName: `ai-${ai}`,
        frontend: ["tanstack-start"],
        backend: "self",
        runtime: "none",
        api: "trpc",
        database: "sqlite",
        orm: "drizzle",
        auth: "better-auth",
        examples: ["ai"],
        ai,
      });

      expect(result.success).toBe(true);

      const webPackageJson = result.tree ? readJsonFromTree(result.tree, "apps/web/package.json") : undefined;

      expect(
        webPackageJson?.dependencies?.[sdkPackage] ??
          webPackageJson?.devDependencies?.[sdkPackage],
      ).toBeDefined();
      expect(webPackageJson?.dependencies?.ai).toBeDefined();
      expect(webPackageJson?.dependencies?.["@ai-sdk/google"]).toBeDefined();
      expect(webPackageJson?.dependencies?.["@ai-sdk/devtools"]).toBeDefined();
      expect(webPackageJson?.dependencies?.["@ai-sdk/react"]).toBeDefined();
      expect(webPackageJson?.dependencies?.streamdown).toBeDefined();
    });
  }

  it("adds AI CLI command presets at the generated workspace root", async () => {
    const result = await createVirtual({
      projectName: "ai-cli-root",
      frontend: ["react-vite"],
      backend: "none",
      runtime: "none",
      api: "none",
      database: "none",
      orm: "none",
      auth: "none",
      ai: "ai-cli",
    });

    expect(result.success).toBe(true);

    const rootPackageJson = result.tree ? readJsonFromTree(result.tree, "package.json") : undefined;

    expect(rootPackageJson?.devDependencies?.["ai-cli"]).toBeDefined();
    expect(rootPackageJson?.scripts?.["ai:text"]).toBe("ai text");
    expect(rootPackageJson?.scripts?.["ai:image"]).toBe("ai image");
    expect(rootPackageJson?.scripts?.["ai:video"]).toBe("ai video");
    expect(rootPackageJson?.scripts?.["ai:models"]).toBe("ai models");
    expect(rootPackageJson?.scripts?.["ai:completions"]).toBe("ai completions");
  });

  it("omits the Quantum scheduler unless Quantum jobs are selected", async () => {
    const result = await createVirtual({
      projectName: "elixir-no-quantum",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirJobs: "none",
    });

    expect(result.success).toBe(true);
    expect(readTextFromTree(result.tree!, "lib/elixir_no_quantum/scheduler.ex")).toBeUndefined();
  });

  it("scaffolds plain Elixir projects without Phoenix web files", async () => {
    const result = await createVirtual({
      projectName: "plain-elixir",
      ecosystem: "elixir",
      elixirWebFramework: "none",
      elixirOrm: "none",
      elixirAuth: "none",
      elixirApi: "none",
      elixirRealtime: "none",
      elixirJobs: "quantum",
      elixirHttp: "req",
      elixirJson: "jason",
      elixirTesting: "none",
    });

    expect(result.success).toBe(true);

    const mixProject = readTextFromTree(result.tree!, "mix.exs");
    const application = readTextFromTree(result.tree!, "lib/plain_elixir/application.ex");
    const readme = readTextFromTree(result.tree!, "README.md");

    expect(mixProject).toContain("{:quantum");
    expect(mixProject).toContain("{:req");
    expect(mixProject).not.toContain("{:phoenix");
    expect(mixProject).not.toContain("{:plug_cowboy");
    expect(application).toContain("PlainElixir.Scheduler");
    expect(application).not.toContain("PlainElixirWeb.Endpoint");
    expect(readme).toContain("for the Elixir ecosystem");
    expect(readme).toContain("iex -S mix");
    expect(readme).not.toContain("mix phx.server");
    expect(readTextFromTree(result.tree!, "lib/plain_elixir_web/router.ex")).toBeUndefined();
    expect(readTextFromTree(result.tree!, "test/support/conn_case.ex")).toBeUndefined();
  });

  it("allows CLI validation for generated plain Elixir worker projects", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateConfigForProgrammaticUse({
          projectName: "plain-elixir",
          ecosystem: "elixir",
          elixirWebFramework: "none",
          elixirOrm: "none",
          elixirAuth: "none",
          elixirApi: "none",
          elixirRealtime: "none",
          elixirJobs: "quantum",
          elixirValidation: "none",
          elixirHttp: "req",
          elixirJson: "jason",
          elixirEmail: "none",
          elixirCaching: "cachex",
          elixirObservability: "none",
          elixirTesting: "ex_unit",
          elixirQuality: "credo",
          elixirDeploy: "mix-release",
        }),
      ),
    ).not.toThrow();
  });

  it("continues to reject Phoenix-only Elixir features without Phoenix", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateConfigForProgrammaticUse({
          projectName: "plain-elixir-auth",
          ecosystem: "elixir",
          elixirWebFramework: "none",
          elixirAuth: "phx-gen-auth",
        }),
      ),
    ).toThrow("Elixir auth scaffolds require Phoenix.");
  });

  it("keeps Phoenix LiveView demos self-contained without Ecto", async () => {
    const result = await createVirtual({
      projectName: "elixir-live-no-ecto",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix-live-view",
      elixirOrm: "none",
      elixirApi: "none",
      elixirRealtime: "live-view-streams",
    });

    expect(result.success).toBe(true);

    const liveView = readTextFromTree(
      result.tree!,
      "lib/elixir_live_no_ecto_web/live/item_live/index.ex",
    );
    expect(liveView).toContain("System.unique_integer");
    expect(liveView).not.toContain("Catalog.");
    expect(readTextFromTree(result.tree!, "lib/elixir_live_no_ecto/catalog.ex")).toBeUndefined();
  });

  it("scaffolds phx.gen.auth-style password hashing and session endpoints", async () => {
    const result = await createVirtual({
      projectName: "elixir-auth",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirAuth: "phx-gen-auth",
    });

    expect(result.success).toBe(true);

    const mixProject = readTextFromTree(result.tree!, "mix.exs");
    const userSchema = readTextFromTree(result.tree!, "lib/elixir_auth/accounts/user.ex");
    const accounts = readTextFromTree(result.tree!, "lib/elixir_auth/accounts.ex");
    const router = readTextFromTree(result.tree!, "lib/elixir_auth_web/router.ex");
    const sessionController = readTextFromTree(
      result.tree!,
      "lib/elixir_auth_web/controllers/user_session_controller.ex",
    );

    expect(mixProject).toContain("{:bcrypt_elixir");
    expect(userSchema).toContain("field :password, :string, virtual: true");
    expect(userSchema).toContain("Bcrypt.hash_pwd_salt(password)");
    expect(userSchema).toContain("Bcrypt.verify_pass(password, hashed_password)");
    expect(userSchema).not.toContain("cast(attrs, [:email, :hashed_password])");
    expect(readTextFromTree(result.tree!, "priv/repo/migrations/20260101000001_create_users.exs")).toBeDefined();
    expect(accounts).toContain("get_user_by_email_and_password");
    expect(router).toContain('post "/users/register", UserSessionController, :register');
    expect(router).toContain('post "/users/login", UserSessionController, :login');
    expect(sessionController).toContain("def login");
  });

  it("skips auth-only user migration when Elixir auth is disabled", async () => {
    const result = await createVirtual({
      projectName: "elixir-no-auth",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
      elixirAuth: "none",
      elixirApi: "rest",
      elixirRealtime: "none",
      elixirJobs: "none",
    });

    expect(result.success).toBe(true);
    expect(readTextFromTree(result.tree!, "priv/repo/migrations/20260101000001_create_users.exs")).toBeUndefined();
  });

  it("normalizes Elixir app and module names that start with digits", async () => {
    const result = await createVirtual({
      projectName: "123-app",
      ecosystem: "elixir",
      elixirWebFramework: "phoenix",
      elixirOrm: "ecto-sql",
    });

    expect(result.success).toBe(true);

    const mixProject = readTextFromTree(result.tree!, "mix.exs");
    expect(mixProject).toContain("defmodule App123App.MixProject do");
    expect(mixProject).toContain("app: :app_123_app");
    expect(readTextFromTree(result.tree!, "lib/app_123_app/application.ex")).toContain(
      "defmodule App123App.Application do",
    );
  });
});
