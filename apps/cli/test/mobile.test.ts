import { describe, expect, test } from "bun:test";

import { createVirtual } from "../src/index";
import type { VirtualDirectory, VirtualFile, VirtualNode } from "../src/index";

function findFile(node: VirtualNode, path: string): VirtualFile | undefined {
  if (node.type === "file") {
    return node.path.replace(/^\/+/, "") === path ? node : undefined;
  }

  for (const child of (node as VirtualDirectory).children) {
    const found = findFile(child, path);
    if (found) return found;
  }
}

function getFile(root: VirtualNode, path: string) {
  const file = findFile(root, path);
  expect(file, `${path} should be generated`).toBeDefined();
  return file!.content;
}

describe("mobile native scaffolding", () => {
  test("generates React Navigation with production mobile integrations", async () => {
    const result = await createVirtual({
      projectName: "mobile-rn",
      frontend: ["native-bare"],
      backend: "hono",
      runtime: "bun",
      database: "none",
      orm: "none",
      api: "orpc",
      auth: "none",
      cssFramework: "none",
      uiLibrary: "none",
      mobileNavigation: "react-navigation",
      mobileUI: "gluestack-ui",
      mobileStorage: "mmkv",
      mobileTesting: "maestro-react-native-testing-library",
      mobilePush: "expo-notifications",
      mobileOTA: "expo-updates",
      mobileDeepLinking: "expo-linking",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    const pkg = JSON.parse(getFile(root, "apps/native/package.json"));
    const appConfig = JSON.parse(getFile(root, "apps/native/app.json"));

    expect(pkg.main).toBe("index.js");
    expect(pkg.dependencies).toMatchObject({
      "@react-navigation/native-stack": "^7.8.1",
      "@gluestack-ui/themed": "^1.1.73",
      "react-native-mmkv": "^4.1.0",
      "expo-notifications": "^56.0.12",
      "expo-updates": "^56.0.15",
    });
    expect(pkg.dependencies["expo-router"]).toBeUndefined();
    expect(pkg.scripts.test).toBe("jest");

    expect(appConfig.expo.plugins).not.toContain("expo-router");
    expect(appConfig.expo.updates.url).toBe("https://u.expo.dev/your-eas-project-id");
    expect(appConfig.expo.extra.eas.projectId).toBe("your-eas-project-id");
    expect(getFile(root, "apps/native/App.tsx")).toContain("NavigationContainer");
    expect(getFile(root, "apps/native/navigation/native-navigation.tsx")).toContain("mobileStorage");
    expect(getFile(root, "apps/native/lib/notifications.ts")).toContain("getExpoPushTokenAsync");
    expect(getFile(root, "apps/native/lib/updates.ts")).toContain("checkForUpdateAsync");
    expect(getFile(root, "apps/native/.maestro/home.yaml")).toContain("launchApp");
    expect(getFile(root, "apps/native/__tests__/mobile-ui-provider.test.tsx")).toContain(
      "@testing-library/react-native",
    );
  });

  test("keeps Expo Router as the default native navigation", async () => {
    const result = await createVirtual({
      projectName: "mobile-router",
      frontend: ["native-bare"],
      backend: "hono",
      api: "trpc",
      database: "sqlite",
      orm: "drizzle",
      auth: "none",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    const pkg = JSON.parse(getFile(root, "apps/native/package.json"));
    const appConfig = JSON.parse(getFile(root, "apps/native/app.json"));

    expect(pkg.main).toBe("expo-router/entry");
    expect(pkg.dependencies["expo-router"]).toBe("^55.0.14");
    expect(appConfig.expo.plugins).toContain("expo-router");
  });
});
