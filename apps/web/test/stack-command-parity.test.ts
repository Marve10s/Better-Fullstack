import { describe, expect, it } from "bun:test";

import { generateStackCommand } from "../src/lib/stack-utils";
import { DEFAULT_STACK } from "../src/lib/stack-defaults";

describe("generateStackCommand parity", () => {
  it("emits --yes only for stacks semantically equal to CLI defaults", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      projectName: "demo-app",
    });

    expect(command).toBe("bun create better-fullstack@latest demo-app --yes");
  });

  it("falls back to explicit flags when a stack differs from CLI defaults", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      projectName: "demo-app",
      aiSdk: "vercel-ai",
    });

    expect(command).not.toContain("--yes");
    expect(command).toContain("--ai vercel-ai");
  });

  it("maps builder-only aliases to CLI flags", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      backend: "self-next",
      backendLibraries: "effect-full",
      aiSdk: "langgraph",
    });

    expect(command).toContain("--backend self");
    expect(command).toContain("--effect effect-full");
    expect(command).toContain("--ai langgraph");
  });

  it("serializes merged frontend selections into a single --frontend flag", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      webFrontend: ["next"],
      nativeFrontend: ["native-bare"],
    });

    expect(command).toContain("--frontend next native-bare");
  });

  it("serializes addons from codeQuality, documentation, and appPlatforms", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      codeQuality: ["biome"],
      documentation: ["fumadocs"],
      appPlatforms: ["pwa"],
    });

    expect(command).toContain("--addons biome fumadocs pwa");
  });

  it("serializes examples and aiDocs arrays explicitly", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      examples: ["ai", "chat-sdk"],
      aiDocs: ["agents-md", "cursorrules"],
    });

    expect(command).toContain("--examples ai chat-sdk");
    expect(command).toContain("--ai-docs agents-md cursorrules");
  });

  it("serializes boolean flags as CLI booleans", () => {
    const command = generateStackCommand({
      ...DEFAULT_STACK,
      git: "false",
      install: "false",
    });

    expect(command).toContain("--no-git");
    expect(command).toContain("--no-install");
    expect(command).not.toContain("--git");
    expect(command).not.toContain("--install");
  });

  it("emits --astro-integration only when Astro is selected", () => {
    const withoutAstro = generateStackCommand({
      ...DEFAULT_STACK,
      webFrontend: ["next"],
      astroIntegration: "react",
    });
    const withAstro = generateStackCommand({
      ...DEFAULT_STACK,
      webFrontend: ["astro"],
      astroIntegration: "react",
    });

    expect(withoutAstro).not.toContain("--astro-integration");
    expect(withAstro).toContain("--astro-integration react");
  });

  it("emits shadcn subflags only when shadcn-ui is selected", () => {
    const withShadcn = generateStackCommand({
      ...DEFAULT_STACK,
      shadcnStyle: "vega",
    });
    const withoutShadcn = generateStackCommand({
      ...DEFAULT_STACK,
      uiLibrary: "daisyui",
      shadcnStyle: "vega",
    });

    expect(withShadcn).toContain("--shadcn-style vega");
    expect(withoutShadcn).not.toContain("--shadcn-style");
    expect(withoutShadcn).not.toContain("--shadcn-base");
  });

  it("emits --version-channel only when non-default", () => {
    const stableCommand = generateStackCommand(DEFAULT_STACK);
    const betaCommand = generateStackCommand({
      ...DEFAULT_STACK,
      versionChannel: "beta",
    });

    expect(stableCommand).not.toContain("--version-channel");
    expect(betaCommand).toContain("--version-channel beta");
  });

  it("serializes python and rust multi-select arrays for their ecosystem commands", () => {
    const pythonCommand = generateStackCommand({
      ...DEFAULT_STACK,
      ecosystem: "python",
      pythonAi: ["langchain", "openai-sdk"],
    });
    const rustCommand = generateStackCommand({
      ...DEFAULT_STACK,
      ecosystem: "rust",
      rustLibraries: ["validator", "mockall"],
    });

    expect(pythonCommand).toContain("--python-ai langchain openai-sdk");
    expect(rustCommand).toContain("--rust-libraries validator mockall");
  });

  it("serializes empty python and rust multi-select arrays as none", () => {
    const pythonCommand = generateStackCommand({
      ...DEFAULT_STACK,
      ecosystem: "python",
      pythonAi: [],
    });
    const rustCommand = generateStackCommand({
      ...DEFAULT_STACK,
      ecosystem: "rust",
      rustLibraries: [],
    });

    expect(pythonCommand).toContain("--python-ai none");
    expect(rustCommand).toContain("--rust-libraries none");
  });

  it("serializes empty Go aiDocs arrays as none", () => {
    const goCommand = generateStackCommand({
      ...DEFAULT_STACK,
      ecosystem: "go",
      aiDocs: [],
    });

    expect(goCommand).toContain("--ai-docs none");
  });
});
