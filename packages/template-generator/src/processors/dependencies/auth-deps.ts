import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "@/core/virtual-fs";

import { addPackageDependency, type AvailableDependencies } from "@/dependencies/add-deps";
import { hasAuthJsCredentials } from "@/platform/auth-js";

/**
 * @convex-dev/better-auth 0.12.5 needs Better Auth ">=1.6.11 <1.7.0", and its provider's
 * authClient type rejects 1.6.22 clients (useSession data becomes never), so Convex stays on 1.6.17.
 */
const CONVEX_BETTER_AUTH_VERSION = "1.6.17";

function isBetterAuth(auth: ProjectConfig["auth"]): boolean {
  return auth === "better-auth" || auth === "better-auth-organizations";
}

export function processAuthDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { auth, backend } = config;
  if (!auth || auth === "none") return;

  if (backend === "convex") {
    processConvexAuthDeps(vfs, config);
  } else {
    processStandardAuthDeps(vfs, config);
  }
}

function processConvexAuthDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { auth, frontend } = config;
  const webPath = "apps/web/package.json";
  const nativePath = "apps/native/package.json";
  const backendPath = "packages/backend/package.json";

  const webExists = vfs.exists(webPath);
  const nativeExists = vfs.exists(nativePath);
  const backendExists = vfs.exists(backendPath);

  const hasNative = frontend.some((f) =>
    ["native-bare", "native-uniwind", "native-unistyles"].includes(f),
  );
  const hasNextJs = frontend.includes("next");
  const hasTanStackStart = frontend.includes("tanstack-start");
  const hasViteReact = frontend.some((f) =>
    ["tanstack-router", "react-router", "react-vite"].includes(f),
  );
  const hasReactWebAuthForms = hasNextJs || hasTanStackStart || hasViteReact;

  if (auth === "clerk") {
    if (webExists) {
      if (hasNextJs) {
        addPackageDependency({
          vfs,
          packagePath: webPath,
          dependencies: ["@clerk/nextjs"],
        });
      } else if (hasTanStackStart) {
        addPackageDependency({
          vfs,
          packagePath: webPath,
          dependencies: ["@clerk/tanstack-react-start", "srvx"],
        });
      } else if (hasViteReact) {
        addPackageDependency({
          vfs,
          packagePath: webPath,
          dependencies: ["@clerk/clerk-react"],
        });
      }
    }
    if (nativeExists && hasNative) {
      addPackageDependency({
        vfs,
        packagePath: nativePath,
        dependencies: ["@clerk/clerk-expo"],
      });
    }
  } else if (isBetterAuth(auth)) {
    if (backendExists) {
      addPackageDependency({
        vfs,
        packagePath: backendPath,
        dependencies: ["@convex-dev/better-auth"],
        customDependencies: { "better-auth": CONVEX_BETTER_AUTH_VERSION },
      });
      if (hasNative) {
        addPackageDependency({
          vfs,
          packagePath: backendPath,
          customDependencies: {
            "@better-auth/expo": CONVEX_BETTER_AUTH_VERSION,
            "@better-auth/core": CONVEX_BETTER_AUTH_VERSION,
          },
        });
      }
    }

    if (webExists) {
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: hasReactWebAuthForms
          ? ["@convex-dev/better-auth", "@tanstack/react-form"]
          : ["@convex-dev/better-auth"],
        customDependencies: { "better-auth": CONVEX_BETTER_AUTH_VERSION },
      });
    }

    if (nativeExists && hasNative) {
      addPackageDependency({
        vfs,
        packagePath: nativePath,
        dependencies: [
          "@convex-dev/better-auth",
          "expo-linking", "expo-constants", "expo-web-browser", "expo-network",
        ],
        customDependencies: {
          "better-auth": CONVEX_BETTER_AUTH_VERSION,
          "@better-auth/expo": CONVEX_BETTER_AUTH_VERSION,
          "@better-auth/core": CONVEX_BETTER_AUTH_VERSION,
        },
      });
    }
  }
}

function processStandardAuthDeps(vfs: VirtualFileSystem, config: ProjectConfig): void {
  const { auth, frontend, orm } = config;
  const authPath = "packages/auth/package.json";
  const webPath = "apps/web/package.json";
  const nativePath = "apps/native/package.json";

  const authExists = vfs.exists(authPath);
  const webExists = vfs.exists(webPath);
  const nativeExists = vfs.exists(nativePath);

  const hasNative = frontend.some((f) =>
    ["native-bare", "native-uniwind", "native-unistyles"].includes(f),
  );
  const hasWebFrontend = frontend.some((f) =>
    [
      "react-router",
      "react-vite",
      "tanstack-router",
      "tanstack-start",
      "next",
      "vinext",
      "nuxt",
      "svelte",
      "solid",
      "solid-start",
      "tanstack-start-solid",
    ].includes(f),
  );

  if (isBetterAuth(auth)) {
    if (authExists) {
      // Adapters and the Expo plugin peer on @better-auth/core; declaring it beside
      // better-auth keeps package managers from installing a second, newer core.
      const authDependencies: AvailableDependencies[] = ["better-auth", "@better-auth/core"];
      if (orm === "drizzle") authDependencies.push("@better-auth/drizzle-adapter");
      if (orm === "prisma") authDependencies.push("@better-auth/prisma-adapter");
      if (orm === "mongoose") authDependencies.push("@better-auth/mongo-adapter");

      addPackageDependency({
        vfs,
        packagePath: authPath,
        dependencies: authDependencies,
      });
      if (hasNative) {
        addPackageDependency({
          vfs,
          packagePath: authPath,
          dependencies: ["@better-auth/expo", "@better-auth/core"],
        });
      }
    }

    if (hasWebFrontend && webExists) {
      const hasReactWebAuthForms = frontend.some((f) =>
        ["react-router", "react-vite", "tanstack-router", "tanstack-start", "next"].includes(f),
      );
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: hasReactWebAuthForms
          ? ["better-auth", "@tanstack/react-form"]
          : ["better-auth"],
      });
    }

    if (hasNative && nativeExists) {
      addPackageDependency({
        vfs,
        packagePath: nativePath,
        dependencies: [
          "better-auth",
          "@better-auth/core",
          "@better-auth/expo",
          "expo-linking",
          "expo-constants",
          "expo-web-browser",
          "expo-network",
        ],
      });
    }
  } else if (auth === "clerk") {
    const hasNextJs = frontend.includes("next");
    const hasTanStackStart = frontend.includes("tanstack-start");
    const apiPath = "packages/api/package.json";

    if (webExists && hasNextJs) {
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: ["@clerk/nextjs"],
      });
    } else if (webExists && hasTanStackStart) {
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: ["@clerk/tanstack-react-start", "srvx"],
      });
    }

    // The API context reads the signed-in user through Clerk's server auth() helper
    if (vfs.exists(apiPath) && (hasNextJs || hasTanStackStart)) {
      addPackageDependency({
        vfs,
        packagePath: apiPath,
        dependencies: [hasNextJs ? "@clerk/nextjs" : "@clerk/tanstack-react-start"],
      });
    }
  } else if (auth === "nextauth") {
    const hasNextJs = frontend.includes("next");

    // NextAuth only works with Next.js (self backend)
    if (hasNextJs && webExists) {
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: ["next-auth", "@tanstack/react-form", "zod"],
      });
    }

    if (authExists) {
      const authDependencies: AvailableDependencies[] = ["next-auth"];
      if (hasAuthJsCredentials(config)) {
        authDependencies.push(
          orm === "prisma" ? "@auth/prisma-adapter" : "@auth/drizzle-adapter",
          "bcryptjs",
        );
      }
      addPackageDependency({
        vfs,
        packagePath: authPath,
        dependencies: authDependencies,
      });
    }
  } else if (auth === "stack-auth") {
    const hasNextJs = frontend.includes("next");

    // Stack Auth only works with Next.js (self backend)
    if (hasNextJs && webExists) {
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: ["@stackframe/stack"],
      });
    }
  } else if (auth === "supabase-auth") {
    const hasNextJs = frontend.includes("next");
    const hasTanStackStart = frontend.includes("tanstack-start");

    // Supabase Auth works with Next.js or TanStack Start (self backend)
    if ((hasNextJs || hasTanStackStart) && webExists) {
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: ["@supabase/supabase-js", "@supabase/ssr"],
      });
    }
  } else if (auth === "auth0") {
    const hasNextJs = frontend.includes("next");

    // Auth0 only works with Next.js (self backend)
    if (hasNextJs && webExists) {
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: ["@auth0/nextjs-auth0"],
      });
    }
  } else if (auth === "workos") {
    const hasNextJs = frontend.includes("next");

    if (hasNextJs && webExists) {
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: ["@workos-inc/authkit-nextjs"],
      });
    }
  } else if (auth === "kinde") {
    const hasNextJs = frontend.includes("next");

    if (hasNextJs && webExists) {
      addPackageDependency({
        vfs,
        packagePath: webPath,
        dependencies: ["@kinde-oss/kinde-auth-nextjs"],
      });
    }
  } else if (auth === "passport") {
    if (authExists) {
      addPackageDependency({
        vfs,
        packagePath: authPath,
        dependencies: ["passport", "passport-github2"],
        devDependencies: ["@types/passport", "@types/passport-github2"],
      });
    }

    const serverPath = "apps/server/package.json";
    if (vfs.exists(serverPath)) {
      addPackageDependency({
        vfs,
        packagePath: serverPath,
        dependencies: ["express-session"],
        devDependencies: ["@types/express-session"],
      });
    }
  }
}
