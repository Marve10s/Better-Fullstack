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
      "nuxt 4.5.0 requires @unhead/vue ^3 while @nuxt/ui 4.10.0 still pins ^2 — nitro dev/build crash. Exact pin; unpin when @nuxt/ui supports nuxt 4.5.",
  },
  typescript: {
    pinnedVersion: "^6.0.3",
    reason: "TypeScript 7 currently breaks generated database package type portability (TS2883).",
  },
  turbo: {
    pinnedVersion: "^2.10.0",
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
    pinnedVersion: "1.170.18",
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
    pinnedVersion: "1.168.34",
    holdLatestChannel: true,
    reason:
      "Keep TanStack Start on the reviewed release while the router latest train is incomplete.",
  },
  "@tanstack/router-cli": {
    pinnedVersion: "1.167.21",
    holdLatestChannel: true,
    reason: "The upstream latest tag depends on an unpublished @tanstack/router-generator release.",
  },
  "@tanstack/router-plugin": {
    pinnedVersion: "1.168.23",
    holdLatestChannel: true,
    reason: "Keep the router plugin on the latest reviewed installable release.",
  },
  "@tanstack/solid-router": {
    pinnedVersion: "1.170.18",
    holdLatestChannel: true,
    reason: "The upstream latest tag depends on an unpublished @tanstack/router-core release.",
  },
  "@tanstack/solid-router-devtools": {
    pinnedVersion: "1.167.0",
    holdLatestChannel: true,
    reason:
      "The next devtools patch requires a newer Solid Router peer than the reviewed router release.",
  },
  "@auth0/nextjs-auth0": {
    pinnedVersion: "^4.23.0",
    reason: "Keep generated Next.js Auth0 integration on the explicitly tested SDK line.",
  },
  "better-auth": {
    pinnedVersion: "^1.6.22",
    reason: "Keep the Better Auth family aligned with the reviewed Kysely and Yarn combination.",
  },
  "@better-auth/expo": {
    pinnedVersion: "^1.6.22",
    reason: "Keep the Better Auth family aligned with the reviewed Kysely and Yarn combination.",
  },
  "@better-auth/drizzle-adapter": {
    pinnedVersion: "^1.6.22",
    reason: "Keep the Better Auth family aligned with the reviewed Kysely and Yarn combination.",
  },
  "@better-auth/prisma-adapter": {
    pinnedVersion: "^1.6.22",
    reason: "Keep the Better Auth family aligned with the reviewed Kysely and Yarn combination.",
  },
  "@better-auth/mongo-adapter": {
    pinnedVersion: "^1.6.22",
    reason: "Keep the Better Auth family aligned with the reviewed Kysely and Yarn combination.",
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
