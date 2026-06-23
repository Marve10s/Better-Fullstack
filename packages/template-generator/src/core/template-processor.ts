import type { ProjectConfig } from "@better-fullstack/types";
import Handlebars from "handlebars";
import { extname } from "pathe";

import { composeTheme, type BaseColorName, type AccentColorName } from "../shadcn-themes";
import { BINARY_EXTENSIONS } from "./binary-extensions";

Handlebars.registerHelper("eq", (a, b) => a === b);
Handlebars.registerHelper("ne", (a, b) => a !== b);
Handlebars.registerHelper("not", (a) => !a);
Handlebars.registerHelper("and", (...args) => args.slice(0, -1).every(Boolean));
Handlebars.registerHelper("or", (...args) => args.slice(0, -1).some(Boolean));
Handlebars.registerHelper("includes", (arr, val) => Array.isArray(arr) && arr.includes(val));
Handlebars.registerHelper("replace", (value, find, replacement) =>
  String(value).split(String(find)).join(String(replacement)),
);
Handlebars.registerHelper(
  "isBetterAuth",
  (auth) => auth === "better-auth" || auth === "better-auth-organizations",
);
Handlebars.registerHelper(
  "hasBetterAuthOrganizations",
  (auth) => auth === "better-auth-organizations",
);

// ---------------------------------------------------------------------------
// shadcn/ui theme helpers
// ---------------------------------------------------------------------------

const SHADCN_BASE_COLORS = new Set(["neutral", "stone", "zinc", "gray"]);

const SHADCN_FONT_FAMILY: Record<string, string> = {
  inter: "'Inter Variable', sans-serif",
  geist: "'Geist', sans-serif",
  figtree: "'Figtree Variable', sans-serif",
  "noto-sans": "'Noto Sans Variable', sans-serif",
  "nunito-sans": "'Nunito Sans Variable', sans-serif",
  roboto: "'Roboto', sans-serif",
  raleway: "'Raleway Variable', sans-serif",
  "dm-sans": "'DM Sans Variable', sans-serif",
  "public-sans": "'Public Sans', sans-serif",
  outfit: "'Outfit Variable', sans-serif",
  "jetbrains-mono": "'JetBrains Mono Variable', monospace",
  "geist-mono": "'Geist Mono', monospace",
};

const SHADCN_RADIUS: Record<string, string> = {
  none: "0",
  small: "0.45rem",
  medium: "0.625rem",
  large: "0.875rem",
};

/** Generates `:root` or `.dark` CSS variable declarations for a shadcn theme. */
Handlebars.registerHelper("shadcnThemeVars", function (this: ProjectConfig, mode: string) {
  const baseColor = (this.shadcnBaseColor ?? "neutral") as BaseColorName;
  const colorTheme = this.shadcnColorTheme ?? "neutral";
  const accent = SHADCN_BASE_COLORS.has(colorTheme) ? undefined : (colorTheme as AccentColorName);
  const theme = composeTheme(baseColor, accent);
  const vars = mode === "dark" ? theme.dark : theme.light;
  return new Handlebars.SafeString(
    Object.entries(vars)
      .map(([k, v]) => `  --${k}: ${v};`)
      .join("\n"),
  );
});

/** Returns the resolved radius value for the chosen shadcn radius preset. */
Handlebars.registerHelper("shadcnRadiusValue", function (this: ProjectConfig) {
  const pref = this.shadcnRadius ?? "default";
  if (pref === "default") {
    const baseColor = (this.shadcnBaseColor ?? "neutral") as BaseColorName;
    return composeTheme(baseColor).radius;
  }
  return SHADCN_RADIUS[pref] ?? "0.625rem";
});

/** Returns the project name with a trailing brace for compose default syntax. */
Handlebars.registerHelper("projectNameWithClosingBrace", function (this: ProjectConfig) {
  return `${this.projectName ?? ""}}`;
});

function jsonHelper(value: unknown) {
  return new Handlebars.SafeString(JSON.stringify(value, null, 2));
}

function addDatabasePorts(config: ProjectConfig, ports: Set<number>) {
  if (config.database === "postgres") ports.add(5432);
  if (config.database === "mysql") ports.add(3306);
  if (config.database === "mongodb") ports.add(27017);
}

function getDevcontainerExtensions(config: ProjectConfig) {
  const extensions = new Set(["ms-azuretools.vscode-docker"]);

  if (config.ecosystem === "typescript") {
    extensions.add("dbaeumer.vscode-eslint");
    extensions.add("esbenp.prettier-vscode");

    if (config.cssFramework === "tailwind") {
      extensions.add("bradlc.vscode-tailwindcss");
    }
    if (config.orm === "prisma") {
      extensions.add("Prisma.prisma");
    }
  }

  if (config.ecosystem === "rust") {
    extensions.add("rust-lang.rust-analyzer");
  }

  if (config.ecosystem === "python") {
    extensions.add("ms-python.python");
    extensions.add("ms-python.vscode-pylance");
  }

  if (config.ecosystem === "go") {
    extensions.add("golang.go");
  }

  if (config.ecosystem === "java") {
    extensions.add("vscjava.vscode-java-pack");
  }

  return [...extensions];
}

function getDevcontainerForwardPorts(config: ProjectConfig) {
  const ports = new Set<number>();

  if (config.ecosystem === "typescript") {
    ports.add(3001);
    if (config.backend !== "self" && config.backend !== "none") {
      ports.add(3000);
    }
    addDatabasePorts(config, ports);
  } else if (config.ecosystem === "python") {
    ports.add(8000);
    if (config.database === "postgres" && config.pythonOrm !== "none") {
      ports.add(5432);
    }
  } else if (config.ecosystem === "go") {
    ports.add(8080);
    if (config.goOrm !== "none") {
      ports.add(5432);
    }
  } else if (config.ecosystem === "rust") {
    ports.add(3000);
    if (config.rustApi === "tonic") {
      ports.add(50051);
    }
    if (config.rustOrm !== "none") {
      ports.add(5432);
    }
  } else if (config.ecosystem === "java") {
    ports.add(8080);
  }

  return [...ports];
}

function getDevcontainerRunServices(config: ProjectConfig) {
  const services = new Set<string>(["devcontainer"]);

  if (config.ecosystem === "typescript") {
    services.add("web");
    if (config.backend !== "self" && config.backend !== "none") {
      services.add("server");
    }
    if (["postgres", "mysql", "mongodb"].includes(config.database)) {
      services.add("db");
    }
  } else {
    services.add("app");
    if (
      (config.ecosystem === "python" &&
        config.database === "postgres" &&
        config.pythonOrm !== "none") ||
      (config.ecosystem === "go" && config.goOrm !== "none") ||
      (config.ecosystem === "rust" && config.rustOrm !== "none")
    ) {
      services.add("db");
    }
  }

  return [...services];
}

function getDevcontainerImage(config: ProjectConfig) {
  if (config.ecosystem === "python") {
    return "mcr.microsoft.com/devcontainers/python:1-3.12-bookworm";
  }
  if (config.ecosystem === "go") {
    return "mcr.microsoft.com/devcontainers/go:1-1.22-bookworm";
  }
  if (config.ecosystem === "rust") {
    return "mcr.microsoft.com/devcontainers/rust:1-1-bookworm";
  }
  if (config.ecosystem === "java") {
    return "mcr.microsoft.com/devcontainers/java:1-21-bookworm";
  }
  if (config.ecosystem === "typescript" && config.packageManager === "bun") {
    return "oven/bun:1";
  }
  return "mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm";
}

function getTypeScriptPostCreateCommand(packageManager: ProjectConfig["packageManager"]) {
  if (packageManager === "bun") {
    return "bun install";
  }
  if (packageManager === "pnpm") {
    return "corepack enable && pnpm install";
  }
  if (packageManager === "yarn") {
    return "corepack enable && yarn install";
  }
  return "npm install";
}

function getDevcontainerPostCreateCommand(config: ProjectConfig) {
  if (config.ecosystem === "typescript") {
    return getTypeScriptPostCreateCommand(config.packageManager);
  }
  if (config.ecosystem === "python") {
    return "python -m pip install -e '.[dev]'";
  }
  if (config.ecosystem === "go") {
    return "go mod download";
  }
  if (config.ecosystem === "rust") {
    return "cargo fetch";
  }
  if (config.ecosystem === "java") {
    return config.javaBuildTool === "gradle"
      ? "./gradlew dependencies"
      : "./mvnw -DskipTests dependency:go-offline";
  }
  return "";
}

Handlebars.registerHelper("devcontainerExtensions", function (this: ProjectConfig) {
  return jsonHelper(getDevcontainerExtensions(this));
});

Handlebars.registerHelper("devcontainerForwardPorts", function (this: ProjectConfig) {
  return jsonHelper(getDevcontainerForwardPorts(this));
});

Handlebars.registerHelper("devcontainerRunServices", function (this: ProjectConfig) {
  return jsonHelper(getDevcontainerRunServices(this));
});

Handlebars.registerHelper("devcontainerImage", function (this: ProjectConfig) {
  return getDevcontainerImage(this);
});

Handlebars.registerHelper("devcontainerPostCreateCommand", function (this: ProjectConfig) {
  return jsonHelper(getDevcontainerPostCreateCommand(this));
});

export function normalizeElixirAppName(projectName?: string): string {
  const rawName = String(projectName ?? "my_app").toLowerCase();
  const parts: string[] = [];
  let pendingSeparator = false;

  for (const char of rawName) {
    const code = char.charCodeAt(0);
    const isLowercaseLetter = code >= 97 && code <= 122;
    const isDigit = code >= 48 && code <= 57;

    if (isLowercaseLetter || isDigit) {
      if (pendingSeparator && parts.length > 0) {
        parts.push("_");
      }
      parts.push(char);
      pendingSeparator = false;
    } else {
      pendingSeparator = parts.length > 0;
    }
  }

  const appName = parts.join("") || "my_app";
  const firstCode = appName.charCodeAt(0);
  const startsWithLetter = firstCode >= 97 && firstCode <= 122;

  return startsWithLetter ? appName : `app_${appName}`;
}

export function elixirModuleName(projectName?: string): string {
  const appName = normalizeElixirAppName(projectName);

  return appName
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function nativeIdentifierSegment(value: string): string {
  const normalized = value
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .replace(/_+/g, "_");

  if (!normalized) return "app";
  return /^[a-z]/.test(normalized) ? normalized : `app_${normalized}`;
}

export function nativeApplicationId(projectName?: string): string {
  const rawName = String(projectName ?? "app");
  const segments = rawName
    .split(/[^A-Za-z0-9_]+/)
    .filter(Boolean)
    .map(nativeIdentifierSegment)
    .filter(Boolean);

  return `com.betterfullstack.${segments.length > 0 ? segments.join(".") : "app"}`;
}

Handlebars.registerHelper("elixirAppName", function (this: ProjectConfig) {
  return normalizeElixirAppName(this.projectName);
});

Handlebars.registerHelper("elixirModuleName", function (this: ProjectConfig) {
  return elixirModuleName(this.projectName);
});

Handlebars.registerHelper("nativeApplicationId", function (this: ProjectConfig) {
  return nativeApplicationId(this.projectName);
});

/** Returns the CSS font-family string for the chosen shadcn font. */
Handlebars.registerHelper("shadcnFontFamily", function (this: ProjectConfig) {
  const font = this.shadcnFont ?? "inter";
  return SHADCN_FONT_FAMILY[font] ?? "'Inter Variable', sans-serif";
});

/** Returns true if the chosen shadcn font is a monospace font. */
Handlebars.registerHelper("shadcnFontIsMono", function (this: ProjectConfig) {
  const font = this.shadcnFont ?? "inter";
  return font === "jetbrains-mono" || font === "geist-mono";
});

export function processTemplateString(content: string, context: ProjectConfig): string {
  return Handlebars.compile(content)(context);
}

export function isBinaryFile(filePath: string): boolean {
  return BINARY_EXTENSIONS.has(extname(filePath).slice(1).toLowerCase());
}

export function transformFilename(filename: string): string {
  let result = filename.endsWith(".hbs") ? filename.slice(0, -4) : filename;

  const basename = result.split("/").pop() || result;
  if (basename === "_gitignore") result = result.replace(/_gitignore$/, ".gitignore");
  else if (basename === "_npmrc") result = result.replace(/_npmrc$/, ".npmrc");

  return result;
}

export function processFileContent(
  filePath: string,
  content: string,
  context: ProjectConfig,
): string {
  if (isBinaryFile(filePath)) return "[Binary file]";

  const originalPath = filePath.endsWith(".hbs") ? filePath : filePath + ".hbs";
  if (filePath.endsWith(".hbs")) {
    try {
      return processTemplateString(content, context);
    } catch (error) {
      console.warn(`Template processing failed for ${filePath}:`, error);
      return content;
    }
  }

  return content;
}

export { Handlebars };
