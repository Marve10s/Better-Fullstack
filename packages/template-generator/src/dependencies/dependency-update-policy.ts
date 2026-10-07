/**
 * Expo SDK 56's bundled module versions (bundledNativeModules.json in expo@56.0.23), the
 * Babel preset expo@56.0.23 depends on, and the SDK's related Babel and test packages from
 * api.expo.dev, the set `expo install --check` validates. React Native 0.85.3's renderer throws
 * unless react is exactly the 19.2.3 release it was built with, so native apps stay on it while
 * web templates use the newer 19.2 patch.
 */
const EXPO_SDK_VERSIONS = {
  expo: "~56.0.23",
  "@babel/core": "^7.29.0",
  "babel-preset-expo": "~56.0.20",
  "@expo/metro-runtime": "~56.0.21",
  "@expo/vector-icons": "^15.0.2",
  "expo-audio": "~56.0.13",
  "expo-background-task": "~56.0.27",
  "expo-battery": "~56.0.4",
  "expo-brightness": "~56.0.5",
  "expo-calendar": "~56.0.10",
  "expo-camera": "~56.0.8",
  "expo-clipboard": "~56.0.4",
  "expo-constants": "~56.0.27",
  "expo-contacts": "~56.0.14",
  "expo-crypto": "~56.0.5",
  "expo-dev-client": "~56.0.27",
  "expo-device": "~56.0.4",
  "expo-file-system": "~56.0.11",
  "expo-font": "~56.0.7",
  "expo-haptics": "~56.0.3",
  "expo-image": "~56.0.13",
  "expo-image-picker": "~56.0.25",
  "expo-linking": "~56.0.18",
  "expo-local-authentication": "~56.0.5",
  "expo-location": "~56.0.26",
  "expo-maps": "~56.0.7",
  "expo-navigation-bar": "~56.0.3",
  "expo-network": "~56.0.5",
  "expo-notifications": "~56.0.26",
  "expo-router": "~56.2.21",
  "expo-screen-capture": "~56.0.5",
  "expo-secure-store": "~56.0.4",
  "expo-sensors": "~56.0.6",
  "expo-sharing": "~56.0.26",
  "expo-splash-screen": "~56.0.15",
  "expo-sqlite": "~56.0.6",
  "expo-status-bar": "~56.0.4",
  "expo-system-ui": "~56.0.5",
  "expo-task-manager": "~56.0.27",
  "expo-updates": "~56.0.28",
  "expo-video": "~56.1.4",
  "expo-web-browser": "~56.0.6",
  jest: "~29.7.0",
  "@types/jest": "29.5.14",
  "jest-expo": "~56.0.5",
  "lottie-react-native": "~7.3.4",
  react: "19.2.3",
  "react-dom": "19.2.3",
  "react-native": "0.85.3",
  "react-native-gesture-handler": "~2.31.1",
  "react-native-keyboard-controller": "1.21.6",
  "react-native-reanimated": "4.3.1",
  "react-native-safe-area-context": "~5.7.0",
  "react-native-screens": "~4.26.0",
  "react-native-svg": "15.15.4",
  "react-native-web": "~0.21.0",
  "react-native-worklets": "0.8.3",
} as const;

const EXPO_SDK_REASON =
  "Expo SDK 56 validates native apps against its bundled module versions; newer React Native, Reanimated, and Worklets releases need peers outside that set and fail npm installs with ERESOLVE.";

/**
 * Native app versions: the Expo SDK set plus the libraries whose peers, native code, or Babel
 * setup tie them to it. Members listed in NATIVE_PEER_DEPENDENCIES stay exact or patch-only so
 * an install cannot float to a release with different peers.
 */
export const NATIVE_DEPENDENCY_VERSIONS: Readonly<Record<string, string>> = {
  ...EXPO_SDK_VERSIONS,
  "@babel/runtime": "^7.26.0",
  "@gluestack-style/react": "^1.0.57",
  "@gluestack-ui/themed": "~1.1.73",
  "@gorhom/bottom-sheet": "^5.2.14",
  "@react-native/jest-preset": "0.85.3",
  "@react-native/metro-config": "0.85.3",
  "@react-navigation/bottom-tabs": "^7.19.2",
  "@react-navigation/drawer": "^7.14.2",
  "@react-navigation/elements": "^2.9.43",
  "@react-navigation/native": "^7.4.1",
  "@react-navigation/native-stack": "^7.19.2",
  "@tamagui/config": "^2.7.7",
  "@testing-library/react-native": "~14.0.1",
  "@types/react": "~19.2.18",
  "@types/react-native": "0.73.0",
  "heroui-native": "~1.0.10",
  "react-native-edge-to-edge": "^1.8.2",
  "react-native-mmkv": "~4.3.2",
  "react-native-nitro-modules": "~0.36.5",
  "react-native-unistyles": "~3.3.0",
  "tailwind-merge": "^3.7.0",
  "tailwind-variants": "^3.3.1",
  tailwindcss: "^4.3.3",
  tamagui: "^2.7.7",
  "test-renderer": "~1.2.0",
  // The workspace adds TypeScript to every app; Expo SDK 56 expects the 6.0 line.
  typescript: "^6.0.3",
  uniwind: "1.12.0",
};

/**
 * Peer ranges published by the pinned native releases, keyed by package and then peer.
 * Copy them from each release's package.json when NATIVE_DEPENDENCY_VERSIONS changes.
 */
export const NATIVE_PEER_DEPENDENCIES: Readonly<Record<string, Readonly<Record<string, string>>>> =
  {
    "react-dom": { react: "^19.2.3" },
    // The metro-config peer comes from react-native's community CLI plugin.
    "react-native": {
      react: "^19.2.3",
      "@react-native/jest-preset": "0.85.3",
      "@react-native/metro-config": "0.85.3",
    },
    "react-native-reanimated": {
      "react-native": "0.81 - 0.85",
      "react-native-worklets": "0.8.x",
    },
    "react-native-worklets": { "react-native": "0.81 - 0.85" },
    "react-native-screens": { "react-native": ">=0.84.0" },
    "react-native-keyboard-controller": { "react-native-reanimated": ">=3.0.0" },
    // expo-router also depends on its @expo/log-box and @expo/metro-runtime peers.
    "expo-router": {
      "expo-constants": "^56.0.26",
      "expo-linking": "^56.0.18",
      "react-native-safe-area-context": ">= 5.4.0",
      "react-native-screens": "^4.26.0",
    },
    "jest-expo": { "@react-native/jest-preset": "^0.85.0" },
    "@react-native/jest-preset": { react: "^19.2.3" },
    "@testing-library/react-native": {
      react: ">=19.0.0",
      "react-native": ">=0.78",
      "test-renderer": "^1.0.0",
    },
    // test-renderer 1.2 depends on react-reconciler 0.33, whose react peer is ^19.2.0.
    "test-renderer": { react: "^19.2.0" },
    "heroui-native": {
      react: ">=19.0.0",
      "react-native": ">=0.81.0",
      "react-native-gesture-handler": "^2.28.0",
      "react-native-reanimated": "^4.1.1",
      "react-native-safe-area-context": "^5.6.0",
      "react-native-screens": ">=4",
      "react-native-svg": "^15.12.1",
      "react-native-worklets": ">=0.5.1",
      "@gorhom/bottom-sheet": "^5.2.9",
      "tailwind-merge": "^3.4.0",
      "tailwind-variants": "^3.2.2",
    },
    // MMKV and Unistyles publish "*" Nitro peers; the minimums are the nitrogen releases that
    // generated their bindings (0.35.9 and 0.36.1). Nitro 0.36 added no breaking changes.
    "react-native-mmkv": { "react-native-nitro-modules": ">=0.35.9" },
    "react-native-unistyles": {
      "react-native": ">=0.76.0",
      "react-native-nitro-modules": ">=0.36.1",
    },
    "@gluestack-ui/themed": {
      react: ">=16",
      "react-dom": ">=16",
      "react-native": ">=0.72",
      "react-native-svg": ">=13.4.0",
      "react-native-web": ">=0.19",
      "@types/react-native": ">=0.72",
      "@gluestack-style/react": ">=1.0.57",
    },
  };

/**
 * Peers in NATIVE_PEER_DEPENDENCIES that their releases mark optional. The generated app must
 * declare every other recorded peer itself, because Yarn and pnpm with autoInstallPeers off do
 * not install missing peers.
 */
export const NATIVE_OPTIONAL_PEERS: Readonly<Record<string, readonly string[]>> = {
  "react-native": ["@react-native/jest-preset"],
  "heroui-native": ["@gorhom/bottom-sheet", "react-native-screens"],
};

/** Version-map entries that only native apps use; the Expo SDK set owns their versions. */
const EXPO_SDK_MAP_PACKAGES = [
  "expo-constants",
  "expo-linking",
  "expo-network",
  "expo-web-browser",
  "lottie-react-native",
] as const;

export type DependencyUpdatePolicy = {
  /** Keep automation on this reviewed version until the hold is removed deliberately. */
  pinnedVersion?: string;
  /** Keep the CLI's latest channel on pinnedVersion while the upstream latest tag is unsafe. */
  holdLatestChannel?: boolean;
  /** Major updates are denied by default and must be explicitly reviewed here. */
  allowMajor?: boolean;
  reason: string;
};

/**
 * Registry freshness is advisory. This policy captures compatibility and
 * package-manager constraints that cannot be inferred from npm's latest tag.
 */
export const DEPENDENCY_UPDATE_POLICIES: Readonly<Record<string, DependencyUpdatePolicy>> = {
  nuxt: {
    pinnedVersion: "4.4.8",
    reason:
      "nuxt 4.5.0 requires @unhead/vue ^3 while @nuxt/ui 4.10.0 still pins ^2 - nitro dev/build crash. Exact pin; unpin when @nuxt/ui supports nuxt 4.5.",
  },
  typescript: {
    pinnedVersion: "^6.0.3",
    reason: "TypeScript 7 currently breaks generated database package type portability (TS2883).",
  },
  turbo: {
    pinnedVersion: "2.10.11",
    reason: "Newer 2.10.x releases are quarantined by Yarn hardened mode.",
  },
  tsdown: {
    pinnedVersion: "^0.22.3",
    reason: "Newer releases are quarantined by Yarn hardened mode.",
  },
  postcss: {
    pinnedVersion: "^8.5.15",
    reason: "Newer releases are quarantined by Yarn hardened mode.",
  },
  "@inlang/paraglide-js": {
    pinnedVersion: "^2.23.2",
    holdLatestChannel: true,
    reason:
      "paraglide-js 2.24 pulls @inlang/sdk 3 and the @lix-js/sdk 0.12 native binary, which needs glibc 2.38 and breaks Vercel's AL2023 runtime.",
  },
  graphql: {
    pinnedVersion: "^16.11.0",
    reason: "Garph, GraphQL Yoga, and Apollo Server peers currently cap GraphQL at 16.x.",
  },
  "lucide-react": {
    pinnedVersion: "^1.21.0",
    reason: "Newer releases are quarantined by Yarn hardened mode.",
  },
  "lucide-solid": {
    pinnedVersion: "^1.21.0",
    reason: "Keep the Lucide framework packages on the reviewed Yarn-compatible release.",
  },
  h3: {
    pinnedVersion: "^1.15.11",
    holdLatestChannel: true,
    reason:
      "nitropack 2 runs h3 1.x events; Nitro auto-imports resolve the project's h3, so h3 2 helpers such as readBody and handleCors break every request.",
  },
  hono: {
    pinnedVersion: "^4.12.27",
    reason: "Newer releases are quarantined by Yarn hardened mode.",
  },
  "@tanstack/react-form": {
    pinnedVersion: "^1.33.0",
    reason: "Keep the TanStack Form family aligned on the reviewed Yarn-compatible release.",
  },
  "@tanstack/solid-form": {
    pinnedVersion: "^1.33.0",
    reason: "Keep the TanStack Form family aligned on the reviewed Yarn-compatible release.",
  },
  "@tanstack/svelte-form": {
    pinnedVersion: "^1.33.0",
    reason: "Keep the TanStack Form family aligned on the reviewed Yarn-compatible release.",
  },
  "@tanstack/react-router": {
    pinnedVersion: "1.170.41",
    holdLatestChannel: true,
    reason: "The upstream latest tag depends on an unpublished @tanstack/router-core release.",
  },
  "@tanstack/react-router-devtools": {
    pinnedVersion: "1.167.0",
    holdLatestChannel: true,
    reason:
      "Keep Router Devtools on the reviewed release while the router latest train is incomplete.",
  },
  "@tanstack/react-router-with-query": {
    pinnedVersion: "1.130.17",
    holdLatestChannel: true,
    reason:
      "Keep the query integration on the reviewed release while the router latest train is incomplete.",
  },
  "@tanstack/react-start": {
    pinnedVersion: "1.168.60",
    holdLatestChannel: true,
    reason:
      "Keep TanStack Start on the reviewed release; 1.168.60 is the floor that fixes CVE-2026-102989 (server-function XSS).",
  },
  "@tanstack/router-cli": {
    pinnedVersion: "1.167.40",
    holdLatestChannel: true,
    reason: "The upstream latest tag depends on an unpublished @tanstack/router-generator release.",
  },
  "@tanstack/router-plugin": {
    pinnedVersion: "1.168.42",
    holdLatestChannel: true,
    reason: "Keep the router plugin on the latest reviewed installable release.",
  },
  "@tanstack/solid-router": {
    pinnedVersion: "1.170.38",
    holdLatestChannel: true,
    reason: "The upstream latest tag depends on an unpublished @tanstack/router-core release.",
  },
  "@tanstack/solid-router-devtools": {
    pinnedVersion: "1.167.0",
    holdLatestChannel: true,
    reason:
      "The next devtools patch requires a newer Solid Router peer than the reviewed router release.",
  },
  react: {
    pinnedVersion: "19.2.8",
    reason:
      "Keep the React release train exact on 19.2.8 for web templates; native apps follow the Expo SDK set instead.",
  },
  "react-dom": {
    pinnedVersion: "19.2.8",
    reason:
      "Keep the React release train exact on 19.2.8 for web templates; native apps follow the Expo SDK set instead.",
  },
  "react-server-dom-webpack": {
    pinnedVersion: "19.2.8",
    reason:
      "Keep the React release train exact on 19.2.8 for web templates; native apps follow the Expo SDK set instead.",
  },
  "react-test-renderer": {
    pinnedVersion: "19.2.8",
    reason:
      "Keep the React release train exact on 19.2.8 for web templates; native apps follow the Expo SDK set instead.",
  },
  "@types/react": {
    pinnedVersion: "~19.2.18",
    reason:
      "Keep React types on the 19.2 line so templates do not type-check APIs missing from the pinned React 19.2.8 runtime.",
  },
  "@types/react-dom": {
    pinnedVersion: "~19.2.7",
    reason:
      "Keep React types on the 19.2 line so templates do not type-check APIs missing from the pinned React 19.2.8 runtime.",
  },
  "@auth0/nextjs-auth0": {
    pinnedVersion: "^4.23.0",
    reason: "Keep generated Next.js Auth0 integration on the explicitly tested SDK line.",
  },
  "next-auth": {
    pinnedVersion: "5.0.0-beta.32",
    holdLatestChannel: true,
    reason:
      "Generated Auth.js code uses the v5 API, which ships only as a beta while npm latest is still v4.",
  },
  "better-auth": {
    pinnedVersion: "1.6.22",
    reason:
      "Keep the Better Auth family on the reviewed 1.6 schema until the 1.7 account identity migration is implemented.",
  },
  "@better-auth/core": {
    pinnedVersion: "1.6.22",
    reason:
      "Keep the Better Auth family on the reviewed 1.6 schema until the 1.7 account identity migration is implemented.",
  },
  "@better-auth/expo": {
    pinnedVersion: "1.6.22",
    reason:
      "Keep the Better Auth family on the reviewed 1.6 schema until the 1.7 account identity migration is implemented.",
  },
  "@better-auth/drizzle-adapter": {
    pinnedVersion: "1.6.22",
    reason:
      "Keep the Better Auth family on the reviewed 1.6 schema until the 1.7 account identity migration is implemented.",
  },
  "@better-auth/prisma-adapter": {
    pinnedVersion: "1.6.22",
    reason:
      "Keep the Better Auth family on the reviewed 1.6 schema until the 1.7 account identity migration is implemented.",
  },
  "@better-auth/mongo-adapter": {
    pinnedVersion: "1.6.22",
    reason:
      "Keep the Better Auth family on the reviewed 1.6 schema until the 1.7 account identity migration is implemented.",
  },
  "@opentelemetry/sdk-node": {
    pinnedVersion: "0.220.0",
    reason: "Keep the coupled OpenTelemetry SDK and exporter release trains exact and aligned.",
  },
  "@opentelemetry/auto-instrumentations-node": {
    pinnedVersion: "0.78.0",
    reason: "Keep the coupled OpenTelemetry SDK and exporter release trains exact and aligned.",
  },
  "@opentelemetry/exporter-trace-otlp-http": {
    pinnedVersion: "0.220.0",
    reason: "Keep the coupled OpenTelemetry SDK and exporter release trains exact and aligned.",
  },
  "@opentelemetry/exporter-metrics-otlp-http": {
    pinnedVersion: "0.220.0",
    reason: "Keep the coupled OpenTelemetry SDK and exporter release trains exact and aligned.",
  },
  "@opentelemetry/resources": {
    pinnedVersion: "2.9.0",
    reason: "Keep the coupled OpenTelemetry SDK and exporter release trains exact and aligned.",
  },
  "@opentelemetry/sdk-metrics": {
    pinnedVersion: "2.9.0",
    reason: "Keep the coupled OpenTelemetry SDK and exporter release trains exact and aligned.",
  },
  "@storybook/vue3": {
    pinnedVersion: "^8.6.18",
    reason:
      "Storybook 10.x requires a whole-family upgrade; core storybook and @storybook/vue3-vite are still on 8.x, so a 10.x renderer makes the peer graph unsatisfiable.",
  },
  "@storybook/svelte": {
    pinnedVersion: "^8.6.18",
    reason:
      "Storybook 10.x requires a whole-family upgrade; core storybook and @storybook/svelte-vite are still on 8.x, so a 10.x renderer makes the peer graph unsatisfiable.",
  },
  uniwind: {
    pinnedVersion: "1.12.0",
    holdLatestChannel: true,
    reason:
      "Uniwind 1.12.1 breaks Expo 56 static rendering (\"Cannot read properties of undefined (reading 'default')\"); 1.12.0 exports successfully.",
  },
  ...Object.fromEntries(
    EXPO_SDK_MAP_PACKAGES.map((name) => [
      name,
      { pinnedVersion: EXPO_SDK_VERSIONS[name], reason: EXPO_SDK_REASON },
    ]),
  ),
  vitest: {
    pinnedVersion: "4.1.8",
    reason: "The Vitest family is exact-pinned to the latest reviewed Yarn-compatible patch.",
  },
  "@vitest/ui": {
    pinnedVersion: "4.1.8",
    reason: "The Vitest family is exact-pinned to the latest reviewed Yarn-compatible patch.",
  },
  "@vitest/coverage-v8": {
    pinnedVersion: "4.1.8",
    reason: "The Vitest family is exact-pinned to the latest reviewed Yarn-compatible patch.",
  },
};

export type SynchronizedDependencyFamily = {
  name: string;
  packages: readonly string[];
};

/**
 * Packages that must always resolve to one shared version. Version channels move a
 * family together or leave it on its current release.
 */
export const SYNCHRONIZED_DEPENDENCY_FAMILIES: readonly SynchronizedDependencyFamily[] = [
  {
    name: "oRPC",
    packages: [
      "@orpc/server",
      "@orpc/client",
      "@orpc/openapi",
      "@orpc/zod",
      "@orpc/tanstack-query",
    ],
  },
  {
    // better-auth requires one exact @better-auth/core while the adapters and Expo plugin
    // accept any newer core, so a split family installs two cores under npm.
    name: "Better Auth",
    packages: [
      "better-auth",
      "@better-auth/core",
      "@better-auth/expo",
      "@better-auth/drizzle-adapter",
      "@better-auth/prisma-adapter",
      "@better-auth/mongo-adapter",
    ],
  },
];

export function getPinnedDependencyVersion(packageName: string): string | undefined {
  return DEPENDENCY_UPDATE_POLICIES[packageName]?.pinnedVersion;
}

export function getLatestChannelPinnedVersion(packageName: string): string | undefined {
  const policy = DEPENDENCY_UPDATE_POLICIES[packageName];
  return policy?.holdLatestChannel ? policy.pinnedVersion : undefined;
}

export function isMajorUpdateAllowlisted(packageName: string): boolean {
  return DEPENDENCY_UPDATE_POLICIES[packageName]?.allowMajor === true;
}

export type TemplateDependencyPin = {
  /** Template path relative to the templates directory, using forward slashes. */
  template: string;
  /** Dependency whose presence identifies this template's generated package.json. */
  marker: string;
  versions: Readonly<Record<string, string>>;
  reason: string;
};

/**
 * Framework-specific templates whose dependency versions must not follow
 * dependencyVersionMap. Template sync skips these entries instead of rewriting them.
 */
export const TEMPLATE_DEPENDENCY_PINS: readonly TemplateDependencyPin[] = [
  {
    template: "frontend/redwood/web/package.json.hbs",
    marker: "@redwoodjs/web",
    versions: {
      react: "18.3.1",
      "react-dom": "18.3.1",
      "@types/react": "^18.2.55",
      "@types/react-dom": "^18.2.19",
    },
    reason:
      "@redwoodjs/web 8.9 declares exact react@18.3.1 and react-dom@18.3.1 peers; npm rejects the React 19 set with ERESOLVE.",
  },
  ...["bare", "unistyles", "uniwind"].map((variant) => ({
    template: `frontend/native/${variant}/package.json.hbs`,
    marker: "expo",
    versions: NATIVE_DEPENDENCY_VERSIONS,
    reason: EXPO_SDK_REASON,
  })),
];

export function getTemplatePinnedVersion(
  templateFile: string,
  packageName: string,
): string | undefined {
  return TEMPLATE_DEPENDENCY_PINS.find((pin) => pin.template === templateFile)?.versions[
    packageName
  ];
}

/**
 * Template pins that apply to a generated package.json, keyed by dependency name.
 * Version channels must leave these entries on the framework-required release.
 */
export function getGeneratedPackageJsonPins(
  dependencyNames: ReadonlySet<string>,
): ReadonlyMap<string, string> {
  const pins = new Map<string, string>();
  for (const pin of TEMPLATE_DEPENDENCY_PINS) {
    if (!dependencyNames.has(pin.marker)) continue;
    for (const [name, version] of Object.entries(pin.versions)) {
      pins.set(name, version);
    }
  }
  return pins;
}
