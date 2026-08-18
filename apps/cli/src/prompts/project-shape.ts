import type { Ecosystem, ProjectConfig, ProjectShape } from "../types";

import { getDefaultConfig } from "../constants";
import {
  ECOSYSTEM_VALUES,
  parseStackPartSpecs,
  stackPartsToLegacyProjectConfigPartial,
} from "../types";
import { exitCancelled } from "../utils/errors";
import { getGitChoice } from "./git";
import {
  type MobileEcosystem,
  selectBackendEcosystem,
  selectFrontendEcosystem,
  selectKotlinMobileLibraries,
} from "./multi-ecosystem-composer";
import { isCancel, isGoBack, navigableSelect } from "./navigable";

export type MobilePlatform = Exclude<MobileEcosystem, "none">;
type NativeMobilePlatform = Exclude<MobilePlatform, "react-native">;

export type ShapeResolution =
  | { kind: "flags"; flags: Partial<ProjectConfig> }
  | { kind: "config"; config: ProjectConfig };

/**
 * A shape answers "what am I building" before "which language". Each entry
 * pins only the opposite half of the stack, so every remaining question still
 * comes from the ecosystem's own prompt flow.
 */
const FRONTEND_ONLY_FLAGS: Partial<Record<Ecosystem, Partial<ProjectConfig>>> = {
  typescript: {
    backend: "none",
    runtime: "none",
    api: "none",
    database: "none",
    orm: "none",
    auth: "none",
  },
  rust: { rustWebFramework: "none" },
  dotnet: { dotnetWebFramework: "none" },
};

const BACKEND_ONLY_FLAGS: Partial<Record<Ecosystem, Partial<ProjectConfig>>> = {
  typescript: { frontend: ["none"], uiLibrary: "none", cssFramework: "none" },
  rust: { rustFrontend: "none" },
  dotnet: { dotnetFrontend: "none" },
};

/**
 * Without prompts there is nothing to choose the "on" half of the shape, and
 * only these ecosystems default to no frontend of their own.
 */
const FRONTEND_SHAPE_YES_DEFAULTS: Partial<Record<Ecosystem, Partial<ProjectConfig>>> = {
  rust: { rustFrontend: "leptos" },
  dotnet: { dotnetFrontend: "blazor-web-app" },
};

export const SHAPE_ECOSYSTEMS = {
  fullstack: ECOSYSTEM_VALUES,
  frontend: ["typescript", "rust", "dotnet"],
  backend: ["typescript", "go", "rust", "python", "java", "dotnet", "elixir"],
  mobile: ["react-native"],
} as const satisfies Record<ProjectShape, readonly Ecosystem[]>;

const NATIVE_FRONTENDS = new Set(["native-bare", "native-uniwind", "native-unistyles"]);

export const SHAPE_DEFAULT_ECOSYSTEM = {
  fullstack: "typescript",
  frontend: "typescript",
  backend: "typescript",
  mobile: "react-native",
} as const satisfies Record<ProjectShape, Ecosystem>;

export function shapeFlagsForEcosystem(
  shape: ProjectShape,
  ecosystem: Ecosystem,
  { withoutPrompts = false } = {},
): Partial<ProjectConfig> {
  if (shape === "frontend") {
    return {
      ecosystem,
      ...FRONTEND_ONLY_FLAGS[ecosystem],
      ...(withoutPrompts ? FRONTEND_SHAPE_YES_DEFAULTS[ecosystem] : {}),
    };
  }
  if (shape === "backend") return { ecosystem, ...BACKEND_ONLY_FLAGS[ecosystem] };
  if (shape === "mobile") return { ecosystem };
  return {};
}

export function shapeSupportsEcosystem(shape: ProjectShape, ecosystem: Ecosystem): boolean {
  const supported: readonly Ecosystem[] = SHAPE_ECOSYSTEMS[shape];
  return supported.includes(ecosystem);
}

/**
 * Platform flags answer the platform question on their own, which keeps
 * `--shape mobile --kotlin-mobile ...` usable without any prompt.
 */
export function mobilePlatformFromFlags(flags: Partial<ProjectConfig>): MobilePlatform | undefined {
  if (flags.kotlinMobile && flags.kotlinMobile !== "none") return "kotlin";
  if (flags.swiftMobile && flags.swiftMobile !== "none") return "swift";
  if (flags.dartMobile && flags.dartMobile !== "none") return "dart";
  if (flags.ecosystem === "react-native") return "react-native";
  if (flags.frontend?.some((entry) => NATIVE_FRONTENDS.has(entry))) return "react-native";
  return undefined;
}

export function nativeMobilePartSpecs(
  platform: NativeMobilePlatform,
  kotlinApp: string,
  kotlinLibraries: readonly string[] = [],
): string[] {
  if (platform === "swift") return ["mobile:swift:swiftui"];
  if (platform === "dart") return ["mobile:dart:flutter"];
  return [
    `mobile:kotlin:${kotlinApp}`,
    ...kotlinLibraries
      .filter((library) => library !== "none")
      .map((library) => `mobile.libraries:kotlin:${library}`),
  ];
}

async function selectMobilePlatform(): Promise<MobilePlatform> {
  const response = await navigableSelect<MobilePlatform>({
    message: "Select mobile platform",
    options: [
      { value: "react-native", label: "React Native", hint: "Expo and React Native" },
      { value: "kotlin", label: "Kotlin", hint: "Jetpack Compose or Compose Multiplatform" },
      { value: "swift", label: "Swift", hint: "Native iOS with SwiftUI" },
      { value: "dart", label: "Flutter", hint: "Cross-platform iOS and Android with Dart" },
    ],
    initialValue: "react-native",
  });

  if (isCancel(response) || isGoBack(response)) return exitCancelled("Operation cancelled");
  return response;
}

async function selectKotlinApp(
  selected?: ProjectConfig["kotlinMobile"],
): Promise<"jetpack-compose" | "compose-multiplatform"> {
  if (selected && selected !== "none") return selected;

  const response = await navigableSelect<"jetpack-compose" | "compose-multiplatform">({
    message: "Select Kotlin app",
    options: [
      {
        value: "compose-multiplatform",
        label: "Compose Multiplatform",
        hint: "Shared UI for Android, iOS, and desktop",
      },
      { value: "jetpack-compose", label: "Jetpack Compose", hint: "Native Android application" },
    ],
    initialValue: "jetpack-compose",
  });

  if (isCancel(response) || isGoBack(response)) return exitCancelled("Operation cancelled");
  return response;
}

/**
 * Kotlin, Swift, and Flutter apps only exist as stack graph parts, so a
 * mobile-only project on those platforms is assembled here rather than through
 * the single-ecosystem prompt flow, which only knows Expo.
 */
async function gatherNativeMobileConfig(
  platform: NativeMobilePlatform,
  flags: Partial<ProjectConfig>,
  projectName: string,
  projectDir: string,
  relativePath: string,
): Promise<ProjectConfig> {
  const kotlinMobile = platform === "kotlin" ? await selectKotlinApp(flags.kotlinMobile) : "none";
  const kotlinMobileLibraries =
    platform === "kotlin" ? await selectKotlinMobileLibraries(flags.kotlinMobileLibraries) : [];
  const stackParts = parseStackPartSpecs(
    nativeMobilePartSpecs(platform, kotlinMobile, kotlinMobileLibraries),
    "selected",
  );
  const git = await getGitChoice(flags.git);

  return {
    ...getDefaultConfig(),
    ...flags,
    ...stackPartsToLegacyProjectConfigPartial(stackParts),
    projectName,
    projectDir,
    relativePath,
    ecosystem: "typescript",
    frontend: ["none"],
    uiLibrary: "none",
    cssFramework: "none",
    backend: "none",
    runtime: "none",
    database: "none",
    orm: "none",
    api: "none",
    auth: "none",
    addons: [],
    examples: [],
    kotlinMobile,
    kotlinMobileLibraries,
    swiftMobile: platform === "swift" ? "swiftui" : "none",
    dartMobile: platform === "dart" ? "flutter" : "none",
    git,
    install: flags.install ?? false,
    stackParts,
  };
}

export async function resolveProjectShape(
  shape: ProjectShape,
  flags: Partial<ProjectConfig>,
  projectName: string,
  projectDir: string,
  relativePath: string,
): Promise<ShapeResolution> {
  if (shape === "fullstack") return { kind: "flags", flags: {} };

  if (shape === "mobile") {
    const platform = mobilePlatformFromFlags(flags) ?? (await selectMobilePlatform());
    if (platform === "react-native") {
      return { kind: "flags", flags: { ecosystem: "react-native" } };
    }
    return {
      kind: "config",
      config: await gatherNativeMobileConfig(
        platform,
        flags,
        projectName,
        projectDir,
        relativePath,
      ),
    };
  }

  // Both selectors fall back to their initial value without a TTY, so the shape
  // default is passed in rather than inherited from the composer's own default.
  const ecosystem =
    flags.ecosystem ??
    (shape === "frontend"
      ? await selectFrontendEcosystem()
      : await selectBackendEcosystem(SHAPE_DEFAULT_ECOSYSTEM.backend));

  return { kind: "flags", flags: shapeFlagsForEcosystem(shape, ecosystem) };
}
