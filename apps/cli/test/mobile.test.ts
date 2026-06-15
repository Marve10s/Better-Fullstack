import { describe, expect, test } from "bun:test";

import { create, createVirtual } from "../src/index";
import {
  findVirtualFile as findFile,
  readVirtualFileContent as getFile,
} from "./virtual-tree-utils";

describe("mobile native scaffolding", () => {
  test("uses React Native defaults when --yes selects the React Native ecosystem", async () => {
    const result = await create("mobile-yes", {
      ecosystem: "react-native",
      yes: true,
      dryRun: true,
      install: false,
      git: false,
      packageManager: "bun",
    });

    expect(result.success).toBe(true);
    expect(result.projectConfig.ecosystem).toBe("react-native");
    expect(result.projectConfig.frontend).toEqual(["native-bare"]);
    expect(result.projectConfig.backend).toBe("none");
    expect(result.projectConfig.runtime).toBe("none");
    expect(result.projectConfig.api).toBe("none");
    expect(result.projectConfig.cssFramework).toBe("none");
    expect(result.projectConfig.uiLibrary).toBe("none");
  });

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
      "@react-navigation/native-stack": "^7.17.5",
      "@gluestack-ui/themed": "^1.1.73",
      "react-native-mmkv": "^4.3.1",
      "expo-notifications": "^56.0.17",
      "expo-updates": "^56.0.19",
    });
    expect(pkg.dependencies["expo-router"]).toBeUndefined();
    expect(pkg.devDependencies["babel-preset-expo"]).toBe("^56.0.15");
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
    expect(pkg.dependencies["expo-router"]).toBe("^56.2.10");
    expect(appConfig.expo.plugins).toContain("expo-router");
  });

  test("generates a runnable native shell when navigation is disabled", async () => {
    const result = await createVirtual({
      projectName: "mobile-minimal",
      ecosystem: "react-native",
      frontend: ["native-bare"],
      backend: "none",
      runtime: "none",
      api: "none",
      database: "none",
      orm: "none",
      auth: "none",
      mobileNavigation: "none",
      mobileUI: "none",
      mobileStorage: "none",
      mobileTesting: "none",
      mobilePush: "none",
      mobileOTA: "none",
      mobileDeepLinking: "none",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    const pkg = JSON.parse(getFile(root, "apps/native/package.json"));
    const app = getFile(root, "apps/native/App.tsx");

    expect(pkg.main).toBe("index.js");
    expect(getFile(root, "apps/native/index.js")).toContain("registerRootComponent(App)");
    expect(app).toContain("Better Fullstack Mobile");
    expect(app).not.toContain("NavigationContainer");
    expect(findFile(root, "apps/native/navigation/native-navigation.tsx")).toBeUndefined();
  });

  test("initializes Unistyles before Expo Router starts", async () => {
    const result = await createVirtual({
      projectName: "mobile-unistyles",
      ecosystem: "react-native",
      frontend: ["native-unistyles"],
      backend: "none",
      runtime: "none",
      api: "none",
      database: "none",
      orm: "none",
      auth: "none",
      mobileNavigation: "expo-router",
      mobileUI: "unistyles",
      mobileStorage: "mmkv",
      mobileTesting: "react-native-testing-library",
      mobileOTA: "expo-updates",
      mobileDeepLinking: "expo-linking",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    const pkg = JSON.parse(getFile(root, "apps/native/package.json"));
    const appConfig = JSON.parse(getFile(root, "apps/native/app.json"));
    const index = getFile(root, "apps/native/index.js");

    expect(pkg.main).toBe("index.js");
    expect(index.indexOf("import './unistyles'")).toBeLessThan(index.indexOf("expo-router/entry"));
    expect(appConfig.expo.ios.bundleIdentifier).toBe("com.betterfullstack.mobile.unistyles");
    expect(appConfig.expo.android.package).toBe("com.betterfullstack.mobile.unistyles");
  });

  test("omits deep-linking wiring when React Navigation selects no deep linking", async () => {
    const result = await createVirtual({
      projectName: "mobile-no-linking",
      frontend: ["native-bare"],
      backend: "hono",
      api: "none",
      database: "none",
      orm: "none",
      auth: "none",
      mobileNavigation: "react-navigation",
      mobileDeepLinking: "none",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    const pkg = JSON.parse(getFile(root, "apps/native/package.json"));
    const app = getFile(root, "apps/native/App.tsx");
    const navigation = getFile(root, "apps/native/navigation/native-navigation.tsx");

    expect(pkg.dependencies["expo-linking"]).toBeUndefined();
    expect(app).toContain("<NavigationContainer>");
    expect(app).not.toContain("linking={linking}");
    expect(app).not.toContain("@/lib/deep-linking");
    expect(navigation).not.toContain("@/lib/deep-linking");
    expect(findFile(root, "apps/native/lib/deep-linking.ts")).toBeUndefined();
  });

  test("uses generated app ids in Maestro flows", async () => {
    const result = await createVirtual({
      projectName: "mobile-maestro",
      ecosystem: "react-native",
      frontend: ["native-uniwind"],
      backend: "none",
      runtime: "none",
      api: "none",
      database: "none",
      orm: "none",
      auth: "none",
      mobileNavigation: "expo-router",
      mobileUI: "uniwind",
      mobileTesting: "maestro",
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    const appConfig = JSON.parse(getFile(root, "apps/native/app.json"));
    const maestro = getFile(root, "apps/native/.maestro/home.yaml");
    const tabLayout = getFile(root, "apps/native/app/(drawer)/(tabs)/_layout.tsx");

    expect(appConfig.expo.ios.bundleIdentifier).toBe("com.betterfullstack.mobile.maestro");
    expect(appConfig.expo.android.package).toBe("com.betterfullstack.mobile.maestro");
    expect(maestro).toContain("appId: com.betterfullstack.mobile.maestro");
    expect(maestro).toContain('assertVisible: "Better Fullstack"');
    expect(getFile(root, "apps/native/tsconfig.json")).toContain("uniwind-types.d.ts");
    expect(tabLayout).toContain("tabBarIcon: ({ color, size }) =>");
    expect(tabLayout).not.toContain("color: string");
  });
});
