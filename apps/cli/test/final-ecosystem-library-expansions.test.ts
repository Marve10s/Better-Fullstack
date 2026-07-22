import { describe, expect, it } from "bun:test";

import { createVirtual } from "../src/index";
import { resolveDotnetLibrariesPrompt } from "../src/prompts/dotnet-ecosystem";
import { resolveMobileLibrariesPrompt } from "../src/prompts/mobile";
import { DOTNET_LIBRARIES_VALUES, MOBILE_LIBRARIES_VALUES } from "../src/types";
import { readVirtualFileContent as getFile } from "./virtual-tree-utils";

const DOTNET_PACKAGES: Record<(typeof DOTNET_LIBRARIES_VALUES)[number], string | undefined> = {
  automapper: "AutoMapper",
  mediatr: "MediatR",
  fastendpoints: "FastEndpoints",
  "api-versioning": "Asp.Versioning.Http",
  scalar: "Scalar.AspNetCore",
  polly: "Polly.Extensions",
  masstransit: "MassTransit",
  rebus: "Rebus.ServiceProvider",
  coravel: "Coravel",
  "magic-onion": "MagicOnion.Server",
  "prometheus-net": "prometheus-net.AspNetCore",
  seq: "Serilog.Sinks.Seq",
  "application-insights": "Microsoft.ApplicationInsights.AspNetCore",
  sentry: "Sentry.AspNetCore",
  "mongodb-driver": "MongoDB.Driver",
  nhibernate: "NHibernate",
  mapster: "Mapster.DependencyInjection",
  scrutor: "Scrutor",
  refit: "Refit.HttpClientFactory",
  "fluent-email": "FluentEmail.Core",
  none: undefined,
};

const MOBILE_PACKAGES: Record<(typeof MOBILE_LIBRARIES_VALUES)[number], string | undefined> = {
  "expo-sqlite": "ExpoSQLite",
  "expo-camera": "ExpoCamera",
  "expo-image-picker": "ExpoImagePicker",
  "expo-location": "ExpoLocation",
  "expo-sensors": "ExpoSensors",
  "expo-file-system": "ExpoFileSystem",
  "expo-image": "ExpoImage",
  "expo-audio": "ExpoAudio",
  "expo-video": "ExpoVideo",
  "expo-contacts": "ExpoContacts",
  "expo-calendar": "ExpoCalendar",
  "expo-local-authentication": "ExpoLocalAuthentication",
  "expo-sharing": "ExpoSharing",
  "expo-clipboard": "ExpoClipboard",
  "expo-task-manager": "ExpoTaskManager",
  "expo-background-task": "ExpoBackgroundTask",
  "expo-maps": "ExpoMaps",
  "expo-brightness": "ExpoBrightness",
  "expo-battery": "ExpoBattery",
  "expo-screen-capture": "ExpoScreenCapture",
  none: undefined,
};

describe("final ecosystem library expansions", () => {
  it("keeps every .NET and mobile schema option reachable from its CLI prompt", () => {
    expect(resolveDotnetLibrariesPrompt().options.map((option) => option.value)).toEqual(
      DOTNET_LIBRARIES_VALUES,
    );
    expect(resolveMobileLibrariesPrompt().options.map((option) => option.value)).toEqual(
      MOBILE_LIBRARIES_VALUES,
    );
  });

  it("generates all 20 .NET package references together", async () => {
    const libraries = DOTNET_LIBRARIES_VALUES.filter((value) => value !== "none");
    const result = await createVirtual({
      projectName: "DotnetLibraries",
      ecosystem: "dotnet",
      database: "none",
      dotnetWebFramework: "aspnet-minimal",
      dotnetOrm: "none",
      dotnetAuth: "none",
      dotnetApi: "minimal-api",
      dotnetTesting: [],
      dotnetJobQueue: "none",
      dotnetRealtime: "none",
      dotnetObservability: [],
      dotnetValidation: "none",
      dotnetCaching: "none",
      dotnetDeploy: "none",
      dotnetLibraries: libraries,
    });

    expect(result.success).toBe(true);
    const projectFile = getFile(result.tree!.root, "DotnetLibraries.csproj");

    for (const library of libraries) {
      expect(projectFile).toContain(`PackageReference Include="${DOTNET_PACKAGES[library]}"`);
    }
    expect(projectFile.match(/PackageReference Include=/g)).toHaveLength(20);
  });

  it("generates all 20 Expo SDK modules and a typed import surface together", async () => {
    const libraries = MOBILE_LIBRARIES_VALUES.filter((value) => value !== "none");
    const result = await createVirtual({
      projectName: "mobile-libraries",
      ecosystem: "react-native",
      frontend: ["native-bare"],
      backend: "none",
      runtime: "none",
      api: "none",
      database: "none",
      orm: "none",
      auth: "none",
      mobileLibraries: libraries,
    });

    expect(result.success).toBe(true);
    const packageJson = JSON.parse(getFile(result.tree!.root, "apps/native/package.json"));
    const importSurface = getFile(result.tree!.root, "apps/native/lib/mobile-libraries.ts");

    for (const library of libraries) {
      expect(packageJson.dependencies[library]).toMatch(/^~56\./);
      expect(importSurface).toContain(`import * as ${MOBILE_PACKAGES[library]} from "${library}";`);
    }
    expect(
      Object.keys(packageJson.dependencies).filter((name) => libraries.includes(name)),
    ).toHaveLength(20);
  });

  it("adds Expo Task Manager whenever Expo Background Task is selected", async () => {
    await Promise.all(
      (["native-bare", "native-uniwind", "native-unistyles"] as const).map(async (frontend) => {
        const result = await createVirtual({
          projectName: `background-task-${frontend}`,
          ecosystem: "react-native",
          frontend: [frontend],
          backend: "none",
          runtime: "none",
          api: "none",
          database: "none",
          orm: "none",
          auth: "none",
          mobileLibraries: ["expo-background-task"],
        });

        expect(result.success).toBe(true);
        const packageJson = JSON.parse(getFile(result.tree!.root, "apps/native/package.json"));
        expect(packageJson.dependencies["expo-background-task"]).toBe("~56.0.22");
        expect(packageJson.dependencies["expo-task-manager"]).toBe("~56.0.22");
      }),
    );
  });
});
