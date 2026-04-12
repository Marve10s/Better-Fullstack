import { consola } from "consola";
import pc from "picocolors";
import { getLocalWebDevPort } from "@better-fullstack/types";

import type {
  Backend,
  Database,
  DatabaseSetup,
  Frontend,
  ORM,
  ProjectConfig,
  Runtime,
  ServerDeploy,
  WebDeploy,
} from "../../types";

import { WEB_FRAMEWORKS } from "../../utils/compatibility";
import { getDockerStatus } from "../../utils/docker-utils";
export async function displayPostInstallInstructions(
  config: ProjectConfig & { depsInstalled: boolean },
) {
  const {
    api,
    database,
    relativePath,
    packageManager,
    depsInstalled,
    orm,
    addons,
    runtime,
    frontend,
    backend,
    dbSetup,
    webDeploy,
    serverDeploy,
    ecosystem,
  } = config;

  // Handle Rust projects with different instructions
  if (ecosystem === "rust") {
    displayRustInstructions(config);
    return;
  }

  // Handle Go projects with different instructions
  if (ecosystem === "go") {
    displayGoInstructions(config);
    return;
  }

  // Handle Python projects with different instructions
  if (ecosystem === "python") {
    displayPythonInstructions(config);
    return;
  }

  const isConvex = backend === "convex";
  const isBackendSelf = backend === "self";
  const runCmd =
    packageManager === "npm"
      ? "npm run"
      : packageManager === "pnpm"
        ? "pnpm run"
        : packageManager === "yarn"
          ? "yarn"
          : "bun run";
  const cdCmd = `cd ${relativePath}`;
  const hasHusky = addons?.includes("husky");
  const hasLefthook = addons?.includes("lefthook");
  const hasGitHooksOrLinting =
    addons?.includes("husky") ||
    addons?.includes("biome") ||
    addons?.includes("lefthook") ||
    addons?.includes("oxlint");

  const databaseInstructions =
    !isConvex && database !== "none"
      ? await getDatabaseInstructions(
          database,
          orm,
          runCmd,
          runtime,
          dbSetup,
          serverDeploy,
          backend,
        )
      : "";

  const tauriInstructions = addons?.includes("tauri") ? getTauriInstructions(runCmd) : "";
  const huskyInstructions = hasHusky ? getHuskyInstructions(runCmd) : "";
  const lefthookInstructions = hasLefthook ? getLefthookInstructions(packageManager) : "";
  const lintingInstructions = hasGitHooksOrLinting ? getLintingInstructions(runCmd) : "";
  const nativeInstructions =
    (frontend?.includes("native-bare") ||
      frontend?.includes("native-uniwind") ||
      frontend?.includes("native-unistyles")) &&
    backend !== "none"
      ? getNativeInstructions(isConvex, isBackendSelf, frontend || [], runCmd)
      : "";
  const pwaInstructions =
    addons?.includes("pwa") &&
    (frontend?.includes("react-router") || frontend?.includes("react-vite"))
      ? getPwaInstructions()
      : "";
  const starlightInstructions = addons?.includes("starlight")
    ? getStarlightInstructions(runCmd)
    : "";
  const clerkInstructions =
    config.auth === "clerk" ? getClerkInstructions(config.backend, config.frontend ?? []) : "";
  const authSetupInstructions = getAuthSetupInstructions(config.auth, backend, config.frontend ?? []);
  const polarInstructions =
    config.payments === "polar"
      ? getPolarInstructions(backend, packageManager)
      : "";
  const paymentSetupInstructions = getPaymentSetupInstructions(config.payments, backend);
  const alchemyDeployInstructions = getAlchemyDeployInstructions(
    runCmd,
    webDeploy,
    serverDeploy,
    backend,
  );
  const vercelDeployInstructions = getVercelDeployInstructions(
    webDeploy,
    serverDeploy,
    backend,
  );

  const hasWeb = frontend?.some((f) => WEB_FRAMEWORKS.includes(f));
  const hasNative =
    frontend?.includes("native-bare") ||
    frontend?.includes("native-uniwind") ||
    frontend?.includes("native-unistyles");

  const bunWebNativeWarning =
    packageManager === "bun" && hasNative && hasWeb ? getBunWebNativeWarning() : "";
  const noOrmWarning = !isConvex && database !== "none" && orm === "none" ? getNoOrmWarning() : "";

  const hasFresh = frontend?.includes("fresh");
  const webPort = String(getLocalWebDevPort(frontend ?? []));
  const betterAuthConvexInstructions =
    isConvex && config.auth === "better-auth"
      ? getBetterAuthConvexInstructions(hasWeb ?? false, webPort, packageManager)
      : "";

  let output = `${pc.bold("Next steps")}\n${pc.cyan("1.")} ${cdCmd}\n`;
  let stepCounter = 2;

  if (!depsInstalled) {
    output += `${pc.cyan(`${stepCounter++}.`)} ${packageManager} install\n`;
  }

  if (hasFresh) {
    output += `${pc.yellow("NOTE:")} Fresh projects require ${pc.white("deno")} on your PATH.\n   Install: ${pc.underline("https://docs.deno.com/runtime/getting_started/installation/")}\n`;
  }

  if (database === "sqlite" && dbSetup !== "d1") {
    output += `${pc.cyan(`${stepCounter++}.`)} ${runCmd} db:local\n${pc.dim(
      "   (optional - starts local SQLite database)",
    )}\n`;
  }

  if (isConvex) {
    output += `${pc.cyan(`${stepCounter++}.`)} ${runCmd} dev:setup\n${pc.dim(
      "   (this will guide you through Convex project setup)",
    )}\n`;

    output += `${pc.cyan(`${stepCounter++}.`)} Copy environment variables from\n${pc.white(
      "   packages/backend/.env.local",
    )} to ${pc.white("apps/*/.env")}\n`;
    output += `${pc.cyan(`${stepCounter++}.`)} ${runCmd} dev\n\n`;
  } else if (isBackendSelf) {
    output += `${pc.cyan(`${stepCounter++}.`)} ${runCmd} dev\n`;
  } else {
    if (runtime !== "workers") {
      output += `${pc.cyan(`${stepCounter++}.`)} ${runCmd} dev\n`;
    }

    if (runtime === "workers") {
      if (dbSetup === "d1") {
        output += `${pc.yellow(
          "IMPORTANT:",
        )} Complete D1 database setup first\n   (see Database commands below)\n`;
      }
      output += `${pc.cyan(`${stepCounter++}.`)} ${runCmd} dev\n`;
    }
  }

  const hasStandaloneBackend = backend !== "none";
  const hasAnyService =
    hasWeb || hasStandaloneBackend || addons?.includes("starlight") || addons?.includes("fumadocs");

  if (hasAnyService) {
    output += `${pc.bold("Your project will be available at:")}\n`;

    if (hasWeb) {
      output += `${pc.cyan("•")} Frontend: http://localhost:${webPort}\n`;
    } else if (!hasNative && !addons?.includes("starlight")) {
      output += `${pc.yellow(
        "NOTE:",
      )} You are creating a backend-only app\n   (no frontend selected)\n`;
    }

    if (!isConvex && !isBackendSelf && hasStandaloneBackend) {
      output += `${pc.cyan("•")} Backend API: http://localhost:3000\n`;

      if (api === "orpc") {
        output += `${pc.cyan("•")} OpenAPI (Scalar UI): http://localhost:3000/api-reference\n`;
      }
    }

    if (isBackendSelf && api === "orpc") {
      output += `${pc.cyan("•")} OpenAPI (Scalar UI): http://localhost:${webPort}/api/rpc/api-reference\n`;
    }

    if (addons?.includes("starlight")) {
      output += `${pc.cyan("•")} Docs: http://localhost:4321\n`;
    }

    if (addons?.includes("fumadocs")) {
      output += `${pc.cyan("•")} Fumadocs: http://localhost:4000\n`;
    }
  }

  if (nativeInstructions) output += `\n${nativeInstructions.trim()}\n`;
  if (databaseInstructions) output += `\n${databaseInstructions.trim()}\n`;
  if (tauriInstructions) output += `\n${tauriInstructions.trim()}\n`;
  if (huskyInstructions) output += `\n${huskyInstructions.trim()}\n`;
  if (lefthookInstructions) output += `\n${lefthookInstructions.trim()}\n`;
  if (lintingInstructions) output += `\n${lintingInstructions.trim()}\n`;
  if (pwaInstructions) output += `\n${pwaInstructions.trim()}\n`;
  if (alchemyDeployInstructions) output += `\n${alchemyDeployInstructions.trim()}\n`;
  if (vercelDeployInstructions) output += `\n${vercelDeployInstructions.trim()}\n`;
  if (starlightInstructions) output += `\n${starlightInstructions.trim()}\n`;
  if (clerkInstructions) output += `\n${clerkInstructions.trim()}\n`;
  if (authSetupInstructions) output += `\n${authSetupInstructions.trim()}\n`;
  if (betterAuthConvexInstructions) output += `\n${betterAuthConvexInstructions.trim()}\n`;
  if (polarInstructions) output += `\n${polarInstructions.trim()}\n`;
  if (paymentSetupInstructions) output += `\n${paymentSetupInstructions.trim()}\n`;

  if (noOrmWarning) output += `\n${noOrmWarning.trim()}\n`;
  if (bunWebNativeWarning) output += `\n${bunWebNativeWarning.trim()}\n`;

  output += `\n${pc.bold(
    "Enjoying Better Fullstack?",
  )} Help us grow — star the repo!\n`;
  output += `${pc.cyan("https://github.com/Marve10s/Better-Fullstack")}\n`;
  output += pc.dim("Your star helps other developers discover the project.");

  consola.box(output);
}

function getNativeInstructions(
  isConvex: boolean,
  isBackendSelf: boolean,
  frontend: Frontend[],
  runCmd: string,
) {
  const envVar = isConvex ? "EXPO_PUBLIC_CONVEX_URL" : "EXPO_PUBLIC_SERVER_URL";
  const exampleUrl = isConvex
    ? "https://<YOUR_CONVEX_URL>"
    : isBackendSelf
      ? "http://<YOUR_LOCAL_IP>:3001"
      : "http://<YOUR_LOCAL_IP>:3000";
  const envFileName = ".env";
  const ipNote = isConvex
    ? "your Convex deployment URL (find after running 'dev:setup')"
    : "your local IP address";

  let instructions = `${pc.yellow(
    "NOTE:",
  )} For Expo connectivity issues, update\n   apps/native/${envFileName} with ${ipNote}:\n   ${`${envVar}=${exampleUrl}`}\n`;

  if (isConvex) {
    instructions += `\n${pc.yellow(
      "IMPORTANT:",
    )} When using local development with Convex and native apps,\n   ensure you use your local IP address instead of localhost or 127.0.0.1\n   for proper connectivity.\n`;
  }

  if (frontend.includes("native-unistyles")) {
    instructions += `\n${pc.yellow(
      "NOTE:",
    )} Unistyles requires a development build.\n   cd apps/native and run ${runCmd} android or ${runCmd} ios\n`;
  }

  return instructions;
}

function getHuskyInstructions(runCmd: string) {
  return `${pc.bold("Git hooks with Husky:")}\n${pc.cyan(
    "•",
  )} Initialize hooks: ${`${runCmd} prepare`}\n`;
}

function getLintingInstructions(runCmd: string) {
  return `${pc.bold("Linting and formatting:")}\n${pc.cyan(
    "•",
  )} Format and lint fix: ${`${runCmd} check`}\n`;
}

function getLefthookInstructions(packageManager: string) {
  const cmd =
    packageManager === "npm" ? "npx" : packageManager === "yarn" ? "yarn dlx" : packageManager;
  return `${pc.bold("Git hooks with Lefthook:")}\n${pc.cyan(
    "•",
  )} Install hooks: ${cmd} lefthook install\n`;
}

async function getDatabaseInstructions(
  database: Database,
  orm: ORM,
  runCmd: string,
  _runtime: Runtime,
  dbSetup: DatabaseSetup,
  serverDeploy: ServerDeploy,
  _backend: Backend,
) {
  const instructions: string[] = [];

  if (dbSetup === "docker") {
    const dockerStatus = await getDockerStatus(database);

    if (dockerStatus.message) {
      instructions.push(dockerStatus.message);
      instructions.push("");
    }
  }

  if (dbSetup === "d1" && serverDeploy === "cloudflare") {
    if (orm === "drizzle") {
      instructions.push(`${pc.cyan("•")} Generate migrations: ${`${runCmd} db:generate`}`);
    } else if (orm === "prisma") {
      instructions.push(`${pc.cyan("•")} Generate Prisma client: ${`${runCmd} db:generate`}`);
      instructions.push(`${pc.cyan("•")} Apply migrations: ${`${runCmd} db:migrate`}`);
    }
  }

  if (dbSetup === "planetscale") {
    if (database === "mysql" && orm === "drizzle") {
      instructions.push(
        `${pc.yellow("NOTE:")} Enable foreign key constraints in PlanetScale database settings`,
      );
    }
    if (database === "mysql" && orm === "prisma") {
      instructions.push(
        `${pc.yellow(
          "NOTE:",
        )} How to handle Prisma migrations with PlanetScale:\n   https://github.com/prisma/prisma/issues/7292`,
      );
    }
  }

  if (dbSetup === "turso" && orm === "prisma") {
    instructions.push(
      `${pc.yellow(
        "NOTE:",
      )} Turso + Prisma migrations require the Turso CLI.\n   1. Install and authenticate the Turso CLI:\n      ${pc.underline("https://docs.turso.tech/cli/installation")}\n   2. Confirm ${pc.white("DATABASE_URL")} and ${pc.white("TURSO_AUTH_TOKEN")} are set in your env file\n   3. Generate Prisma Client: ${`${runCmd} db:generate`}\n   4. Follow the official migration workflow:\n      ${pc.underline("https://docs.turso.tech/sdk/ts/orm/prisma")}`,
    );
  }

  if (dbSetup === "turso" && orm === "drizzle") {
    instructions.push(
      `${pc.yellow(
        "NOTE:",
      )} Turso + Drizzle requires the Turso CLI for database management.\n   1. Install and authenticate the Turso CLI:\n      ${pc.underline("https://docs.turso.tech/cli/installation")}\n   2. Confirm ${pc.white("DATABASE_URL")} and ${pc.white("TURSO_AUTH_TOKEN")} are set in your env file\n   3. Push schema: ${`${runCmd} db:push`}\n   4. Docs: ${pc.underline("https://orm.drizzle.team/docs/get-started/turso-new")}`,
    );
  }

  if (dbSetup === "neon") {
    instructions.push(
      `${pc.yellow("NOTE:")} Set your Neon ${pc.white("DATABASE_URL")} in your env file.\n   Dashboard: ${pc.underline("https://console.neon.tech")}`,
    );
  }

  if (dbSetup === "supabase") {
    instructions.push(
      `${pc.yellow("NOTE:")} Set your Supabase ${pc.white("DATABASE_URL")} in your env file.\n   Dashboard: ${pc.underline("https://supabase.com/dashboard")}`,
    );
  }

  if (dbSetup === "prisma-postgres") {
    instructions.push(
      `${pc.yellow("NOTE:")} Get your Prisma Postgres connection string from the console.\n   Console: ${pc.underline("https://console.prisma.io")}`,
    );
  }

  if (dbSetup === "mongodb-atlas") {
    instructions.push(
      `${pc.yellow("NOTE:")} Set your Atlas ${pc.white("DATABASE_URL")} in your env file.\n   Dashboard: ${pc.underline("https://cloud.mongodb.com")}`,
    );
  }

  if (dbSetup === "upstash") {
    instructions.push(
      `${pc.yellow("NOTE:")} Set your Upstash Redis credentials in your env file.\n   Console: ${pc.underline("https://console.upstash.com")}`,
    );
  }

  if (orm === "prisma") {
    if (database === "mongodb" && dbSetup === "docker") {
      instructions.push(
        `${pc.yellow("WARNING:")} Prisma + MongoDB + Docker can be unreliable in local development.\n   • Start MongoDB first and wait until the container is ready before Prisma commands\n   • If ${`${runCmd} db:push`} keeps failing locally, switch to MongoDB Atlas for a supported Prisma workflow:\n     ${pc.underline("https://www.mongodb.com/atlas")}`,
      );
    }
    if (dbSetup === "docker") {
      instructions.push(`${pc.cyan("•")} Start docker container: ${`${runCmd} db:start`}`);
    }
    if (!(dbSetup === "d1" && serverDeploy === "cloudflare")) {
      instructions.push(`${pc.cyan("•")} Generate Prisma Client: ${`${runCmd} db:generate`}`);
      instructions.push(`${pc.cyan("•")} Apply schema: ${`${runCmd} db:push`}`);
    }
    if (!(dbSetup === "d1" && serverDeploy === "cloudflare")) {
      instructions.push(`${pc.cyan("•")} Database UI: ${`${runCmd} db:studio`}`);
    }
  } else if (orm === "drizzle") {
    if (dbSetup === "docker") {
      instructions.push(`${pc.cyan("•")} Start docker container: ${`${runCmd} db:start`}`);
    }
    if (dbSetup !== "d1") {
      instructions.push(`${pc.cyan("•")} Apply schema: ${`${runCmd} db:push`}`);
    }
    if (!(dbSetup === "d1" && serverDeploy === "cloudflare")) {
      instructions.push(`${pc.cyan("•")} Database UI: ${`${runCmd} db:studio`}`);
    }
  } else if (orm === "mongoose") {
    if (dbSetup === "docker") {
      instructions.push(`${pc.cyan("•")} Start docker container: ${`${runCmd} db:start`}`);
    }
  } else if (orm === "typeorm" || orm === "mikroorm" || orm === "sequelize" || orm === "kysely") {
    if (dbSetup === "docker") {
      instructions.push(`${pc.cyan("•")} Start docker container: ${`${runCmd} db:start`}`);
    }
  } else if (orm === "none") {
    instructions.push(`${pc.yellow("NOTE:")} Manual database schema setup\n   required.`);
  }

  return instructions.length ? `${pc.bold("Database commands:")}\n${instructions.join("\n")}` : "";
}

function getTauriInstructions(runCmd: string) {
  return `\n${pc.bold("Desktop app with Tauri:")}\n${pc.cyan(
    "•",
  )} Start desktop app: ${`cd apps/web && ${runCmd} desktop:dev`}\n${pc.cyan(
    "•",
  )} Build desktop app: ${`cd apps/web && ${runCmd} desktop:build`}\n${pc.yellow(
    "NOTE:",
  )} Tauri requires Rust and platform-specific dependencies.\n   See: ${"https://v2.tauri.app/start/prerequisites/"}`;
}

function getPwaInstructions() {
  return `\n${pc.bold("PWA with React Router v7:")}\n${pc.yellow(
    "NOTE:",
  )} There is a known compatibility issue between VitePWA\n   and React Router v7. See:\n   https://github.com/vite-pwa/vite-plugin-pwa/issues/809`;
}

function getStarlightInstructions(runCmd: string) {
  return `\n${pc.bold("Documentation with Starlight:")}\n${pc.cyan(
    "•",
  )} Start docs site: ${`cd apps/docs && ${runCmd} dev`}\n${pc.cyan(
    "•",
  )} Build docs site: ${`cd apps/docs && ${runCmd} build`}`;
}

function getNoOrmWarning() {
  return `\n${pc.yellow(
    "WARNING:",
  )} Database selected without an ORM. Features requiring\n   database access (e.g., examples, auth) need manual setup.`;
}

function getBunWebNativeWarning() {
  return `\n${pc.yellow(
    "WARNING:",
  )} 'bun' might cause issues with web + native apps in a monorepo.\n   Use 'pnpm' if problems arise.`;
}

function getClerkInstructions(backend: Backend, frontend: Frontend[]) {
  if (backend === "convex") {
    return `${pc.bold("Clerk Authentication Setup:")}\n${pc.cyan("•")} Follow the guide: ${pc.underline("https://docs.convex.dev/auth/clerk")}\n${pc.cyan("•")} Set CLERK_JWT_ISSUER_DOMAIN in Convex Dashboard\n${pc.cyan("•")} Set CLERK_PUBLISHABLE_KEY in apps/*/.env`;
  }

  if (backend === "self" && (frontend.includes("next") || frontend.includes("tanstack-start"))) {
    const publishableKeyVar = frontend.includes("next")
      ? "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY"
      : "VITE_CLERK_PUBLISHABLE_KEY";
    return `${pc.bold("Clerk Authentication Setup:")}\n${pc.cyan("•")} Create an application in ${pc.underline("https://dashboard.clerk.com/")}\n${pc.cyan("•")} Set ${publishableKeyVar} in ${pc.white("apps/web/.env")}\n${pc.cyan("•")} Set CLERK_SECRET_KEY in ${pc.white("apps/web/.env")}\n${pc.cyan("•")} Clerk middleware and a protected dashboard route are already generated`;
  }

  return "";
}

function getAuthSetupInstructions(auth: ProjectConfig["auth"], backend: Backend, frontend: Frontend[]): string {
  // Clerk and better-auth already have dedicated instruction functions
  if (auth === "clerk" || auth === "better-auth" || auth === "go-better-auth" || auth === "none") {
    return "";
  }

  const isSelf = backend === "self";
  const envPath = isSelf ? "apps/web/.env" : "apps/server/.env";

  if (auth === "nextauth") {
    return (
      `${pc.bold("NextAuth.js Setup:")}\n` +
      `${pc.cyan("•")} Generate a secret: ${pc.white("npx auth secret")}\n` +
      `${pc.cyan("•")} Set ${pc.white("AUTH_SECRET")} in ${pc.white(envPath)}\n` +
      `${pc.cyan("•")} Configure your OAuth providers (e.g. ${pc.white("AUTH_GITHUB_ID")}, ${pc.white("AUTH_GITHUB_SECRET")})\n` +
      `${pc.cyan("•")} Docs: ${pc.underline("https://authjs.dev/getting-started")}`
    );
  }

  if (auth === "stack-auth") {
    return (
      `${pc.bold("Stack Auth Setup:")}\n` +
      `${pc.cyan("•")} Create a project at ${pc.underline("https://app.stack-auth.com")}\n` +
      `${pc.cyan("•")} Set ${pc.white("NEXT_PUBLIC_STACK_PROJECT_ID")}, ${pc.white("NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY")},\n` +
      `   and ${pc.white("STACK_SECRET_SERVER_KEY")} in ${pc.white(envPath)}`
    );
  }

  if (auth === "supabase-auth") {
    return (
      `${pc.bold("Supabase Auth Setup:")}\n` +
      `${pc.cyan("•")} Create a project at ${pc.underline("https://supabase.com/dashboard")}\n` +
      `${pc.cyan("•")} Set ${pc.white("NEXT_PUBLIC_SUPABASE_URL")}, ${pc.white("NEXT_PUBLIC_SUPABASE_ANON_KEY")},\n` +
      `   and ${pc.white("SUPABASE_SERVICE_ROLE_KEY")} in ${pc.white(envPath)}`
    );
  }

  if (auth === "auth0") {
    return (
      `${pc.bold("Auth0 Setup:")}\n` +
      `${pc.cyan("•")} Create an application at ${pc.underline("https://manage.auth0.com")}\n` +
      `${pc.cyan("•")} Set ${pc.white("AUTH0_SECRET")}, ${pc.white("AUTH0_CLIENT_ID")}, ${pc.white("AUTH0_CLIENT_SECRET")},\n` +
      `   and ${pc.white("AUTH0_ISSUER_BASE_URL")} in ${pc.white(envPath)}\n` +
      `${pc.cyan("•")} Docs: ${pc.underline("https://auth0.com/docs/quickstart")}`
    );
  }

  return "";
}

function getPaymentSetupInstructions(payments: ProjectConfig["payments"], backend: Backend): string {
  // Polar already has a dedicated instruction function
  if (payments === "polar" || payments === "none") {
    return "";
  }

  const envPath = backend === "self" ? "apps/web/.env" : "apps/server/.env";

  if (payments === "stripe") {
    return (
      `${pc.bold("Stripe Setup:")}\n` +
      `${pc.cyan("•")} Get API keys from ${pc.underline("https://dashboard.stripe.com/apikeys")}\n` +
      `${pc.cyan("•")} Set ${pc.white("STRIPE_SECRET_KEY")} and ${pc.white("STRIPE_WEBHOOK_SECRET")} in ${pc.white(envPath)}\n` +
      `${pc.cyan("•")} For local webhooks: ${pc.white("stripe listen --forward-to localhost:3000/api/webhooks/stripe")}`
    );
  }

  if (payments === "lemon-squeezy") {
    return (
      `${pc.bold("Lemon Squeezy Setup:")}\n` +
      `${pc.cyan("•")} Get API key from ${pc.underline("https://app.lemonsqueezy.com/settings/api")}\n` +
      `${pc.cyan("•")} Set ${pc.white("LEMONSQUEEZY_API_KEY")} and ${pc.white("LEMONSQUEEZY_STORE_ID")} in ${pc.white(envPath)}`
    );
  }

  if (payments === "paddle") {
    return (
      `${pc.bold("Paddle Setup:")}\n` +
      `${pc.cyan("•")} Get API keys from ${pc.underline("https://vendors.paddle.com")}\n` +
      `${pc.cyan("•")} Set ${pc.white("PADDLE_API_KEY")} and ${pc.white("PADDLE_WEBHOOK_SECRET")} in ${pc.white(envPath)}`
    );
  }

  if (payments === "dodo") {
    return (
      `${pc.bold("Dodo Payments Setup:")}\n` +
      `${pc.cyan("•")} Get API key from ${pc.underline("https://app.dodopayments.com")}\n` +
      `${pc.cyan("•")} Set ${pc.white("DODO_PAYMENTS_API_KEY")} and ${pc.white("DODO_PAYMENTS_WEBHOOK_SECRET")} in ${pc.white(envPath)}`
    );
  }

  return "";
}

function getBetterAuthConvexInstructions(hasWeb: boolean, webPort: string, packageManager: string) {
  const cmd =
    packageManager === "npm" ? "npx" : packageManager === "yarn" ? "yarn dlx" : packageManager;
  return (
    `${pc.bold("Better Auth + Convex Setup:")}\n` +
    `${pc.cyan("•")} Set environment variables from ${pc.white("packages/backend")}:\n` +
    `${pc.white("   cd packages/backend")}\n` +
    `${pc.white(`   ${cmd} convex env set BETTER_AUTH_SECRET=$(openssl rand -base64 32)`)}\n` +
    (hasWeb ? `${pc.white(`   ${cmd} convex env set SITE_URL http://localhost:${webPort}`)}\n` : "")
  );
}

function getPolarInstructions(backend: Backend, packageManager: string) {
  if (backend === "convex") {
    const cmd = packageManager === "npm" ? "npx" : packageManager;
    return (
      `${pc.bold("Polar Payments Setup:")}\n` +
      `${pc.cyan("•")} Create a Polar organization token, webhook secret, and product in ${pc.underline("https://sandbox.polar.sh/")}\n` +
      `${pc.cyan("•")} Set the Convex env vars from ${pc.white("packages/backend")}:\n` +
      `${pc.white("   cd packages/backend")}\n` +
      `${pc.white(`   ${cmd} convex env set POLAR_ORGANIZATION_TOKEN=your_polar_token`)}\n` +
      `${pc.white(`   ${cmd} convex env set POLAR_WEBHOOK_SECRET=your_polar_webhook_secret`)}\n` +
      `${pc.white(`   ${cmd} convex env set POLAR_PRODUCT_ID_PRO=your_polar_product_id`)}\n` +
      `${pc.white("   Optional: set POLAR_SERVER=production when you go live")}\n` +
      `${pc.cyan("•")} Configure a Polar webhook to ${pc.white("https://<your-convex-site-url>/polar/events")}`
    );
  }
  const envPath = backend === "self" ? "apps/web/.env" : "apps/server/.env";
  return `${pc.bold("Polar Payments Setup:")}\n${pc.cyan("•")} Get access token & product ID from ${pc.underline("https://sandbox.polar.sh/")}\n${pc.cyan("•")} Set POLAR_ACCESS_TOKEN in ${envPath}`;
}

function getAlchemyDeployInstructions(
  runCmd: string,
  webDeploy: WebDeploy,
  serverDeploy: ServerDeploy,
  backend: Backend,
) {
  const instructions: string[] = [];
  const isBackendSelf = backend === "self";

  if (webDeploy === "cloudflare" && serverDeploy !== "cloudflare") {
    instructions.push(
      `${pc.bold("Deploy web with Alchemy:")}\n${pc.cyan("•")} Dev: ${`cd apps/web && ${runCmd} alchemy dev`}\n${pc.cyan("•")} Deploy: ${`cd apps/web && ${runCmd} deploy`}\n${pc.cyan("•")} Destroy: ${`cd apps/web && ${runCmd} destroy`}`,
    );
  } else if (serverDeploy === "cloudflare" && webDeploy !== "cloudflare" && !isBackendSelf) {
    instructions.push(
      `${pc.bold("Deploy server with Alchemy:")}\n${pc.cyan("•")} Dev: ${`cd apps/server && ${runCmd} dev`}\n${pc.cyan("•")} Deploy: ${`cd apps/server && ${runCmd} deploy`}\n${pc.cyan("•")} Destroy: ${`cd apps/server && ${runCmd} destroy`}`,
    );
  } else if (webDeploy === "cloudflare" && (serverDeploy === "cloudflare" || isBackendSelf)) {
    instructions.push(
      `${pc.bold("Deploy with Alchemy:")}\n${pc.cyan("•")} Dev: ${`${runCmd} dev`}\n${pc.cyan("•")} Deploy: ${`${runCmd} deploy`}\n${pc.cyan("•")} Destroy: ${`${runCmd} destroy`}`,
    );
  }

  return instructions.length ? `\n${instructions.join("\n")}` : "";
}

function getVercelDeployInstructions(
  webDeploy: WebDeploy,
  serverDeploy: ServerDeploy,
  backend: Backend,
) {
  const instructions: string[] = [];
  const isBackendSelf = backend === "self";

  if (webDeploy === "vercel" || serverDeploy === "vercel") {
    instructions.push(pc.bold("Deploy with Vercel:"));
    instructions.push(`${pc.cyan("•")} Install Vercel CLI: ${pc.white("npm i -g vercel")}`);
    if (webDeploy === "vercel") {
      instructions.push(
        `${pc.cyan("•")} Deploy web: ${pc.white(`cd apps/web && vercel`)}`,
      );
    }
    if (serverDeploy === "vercel" && !isBackendSelf) {
      instructions.push(
        `${pc.cyan("•")} Deploy server: ${pc.white(`cd apps/server && vercel`)}`,
      );
    }
    instructions.push(
      `${pc.cyan("•")} Docs: ${pc.underline("https://vercel.com/docs")}`,
    );
  }

  return instructions.length ? `\n${instructions.join("\n")}` : "";
}

function displayRustInstructions(config: ProjectConfig & { depsInstalled: boolean }) {
  const { relativePath, rustWebFramework, rustFrontend, rustOrm, rustApi, rustCli } = config;

  const cdCmd = `cd ${relativePath}`;

  let output = `${pc.bold("Next steps")}\n${pc.cyan("1.")} ${cdCmd}\n`;
  let stepCounter = 2;

  // Rust projects use cargo, not npm/pnpm/bun
  output += `${pc.cyan(`${stepCounter++}.`)} cargo build\n`;
  output += `${pc.cyan(`${stepCounter++}.`)} cargo run\n`;

  output += `\n${pc.bold("Your Rust project includes:")}\n`;

  if (rustWebFramework && rustWebFramework !== "none") {
    const frameworkNames: Record<string, string> = {
      actix: "Actix Web",
      axum: "Axum",
      rocket: "Rocket",
    };
    output += `${pc.cyan("•")} Web Framework: ${frameworkNames[rustWebFramework] || rustWebFramework}\n`;
  }

  if (rustFrontend && rustFrontend !== "none") {
    const frontendNames: Record<string, string> = {
      leptos: "Leptos",
      dioxus: "Dioxus",
      yew: "Yew",
    };
    output += `${pc.cyan("•")} Frontend: ${frontendNames[rustFrontend] || rustFrontend}\n`;
  }

  if (rustOrm && rustOrm !== "none") {
    const ormNames: Record<string, string> = {
      diesel: "Diesel",
      sqlx: "SQLx",
      "sea-orm": "SeaORM",
    };
    output += `${pc.cyan("•")} Database: ${ormNames[rustOrm] || rustOrm}\n`;
  }

  if (rustApi && rustApi !== "none") {
    const apiNames: Record<string, string> = {
      "async-graphql": "async-graphql",
      juniper: "Juniper",
    };
    output += `${pc.cyan("•")} API: ${apiNames[rustApi] || rustApi}\n`;
  }

  if (rustCli && rustCli !== "none") {
    const cliNames: Record<string, string> = {
      clap: "Clap",
      ratatui: "Ratatui",
    };
    output += `${pc.cyan("•")} CLI: ${cliNames[rustCli] || rustCli}\n`;
  }

  const { rustLogging } = config;
  if (rustLogging && rustLogging !== "none") {
    const loggingNames: Record<string, string> = {
      tracing: "Tracing",
      "env-logger": "env_logger",
    };
    output += `${pc.cyan("•")} Logging: ${loggingNames[rustLogging] || rustLogging}\n`;
  }

  const { rustErrorHandling } = config;
  if (rustErrorHandling && rustErrorHandling !== "none") {
    const errorHandlingNames: Record<string, string> = {
      "anyhow-thiserror": "anyhow + thiserror",
      eyre: "eyre + color-eyre",
    };
    output += `${pc.cyan("•")} Error Handling: ${errorHandlingNames[rustErrorHandling] || rustErrorHandling}\n`;
  }

  const { rustCaching } = config;
  if (rustCaching && rustCaching !== "none") {
    const cachingNames: Record<string, string> = {
      moka: "Moka",
      redis: "Redis",
    };
    output += `${pc.cyan("•")} Caching: ${cachingNames[rustCaching] || rustCaching}\n`;
  }

  const { rustAuth } = config;
  if (rustAuth && rustAuth !== "none") {
    const authNames: Record<string, string> = {
      oauth2: "OAuth2",
    };
    output += `${pc.cyan("•")} Auth: ${authNames[rustAuth] || rustAuth}\n`;
  }

  output += `\n${pc.bold("Common Cargo commands:")}\n`;
  output += `${pc.cyan("•")} Build: cargo build\n`;
  output += `${pc.cyan("•")} Run: cargo run\n`;
  output += `${pc.cyan("•")} Test: cargo test\n`;
  output += `${pc.cyan("•")} Check: cargo check\n`;
  output += `${pc.cyan("•")} Format: cargo fmt\n`;
  output += `${pc.cyan("•")} Lint: cargo clippy\n`;

  output += `\n${pc.bold(
    "Enjoying Better Fullstack?",
  )} Help us grow — star the repo!\n`;
  output += `${pc.cyan("https://github.com/Marve10s/Better-Fullstack")}\n`;
  output += pc.dim("Your star helps other developers discover the project.");

  consola.box(output);
}

function displayGoInstructions(config: ProjectConfig & { depsInstalled: boolean }) {
  const { relativePath, depsInstalled, goWebFramework, goOrm, goApi, goCli, goLogging, goAuth } = config;

  const cdCmd = `cd ${relativePath}`;

  let output = `${pc.bold("Next steps")}\n${pc.cyan("1.")} ${cdCmd}\n`;
  let stepCounter = 2;

  if (!depsInstalled) {
    output += `${pc.cyan(`${stepCounter++}.`)} go mod tidy\n`;
  }

  output += `${pc.cyan(`${stepCounter++}.`)} go run cmd/server/main.go\n`;

  output += `\n${pc.bold("Your Go project includes:")}\n`;

  if (goWebFramework && goWebFramework !== "none") {
    const frameworkNames: Record<string, string> = {
      gin: "Gin",
      echo: "Echo",
      fiber: "Fiber",
      chi: "Chi",
    };
    output += `${pc.cyan("•")} Web Framework: ${frameworkNames[goWebFramework] || goWebFramework}\n`;
  }

  if (goOrm && goOrm !== "none") {
    const ormNames: Record<string, string> = {
      gorm: "GORM",
      sqlc: "sqlc",
      ent: "Ent",
    };
    output += `${pc.cyan("•")} Database: ${ormNames[goOrm] || goOrm}\n`;
  }

  if (goApi && goApi !== "none") {
    const apiNames: Record<string, string> = {
      "grpc-go": "gRPC-Go",
    };
    output += `${pc.cyan("•")} API: ${apiNames[goApi] || goApi}\n`;
  }

  if (goCli && goCli !== "none") {
    const cliNames: Record<string, string> = {
      cobra: "Cobra",
      bubbletea: "Bubble Tea",
    };
    output += `${pc.cyan("•")} CLI: ${cliNames[goCli] || goCli}\n`;
  }

  if (goLogging && goLogging !== "none") {
    const loggingNames: Record<string, string> = {
      zap: "Zap",
      zerolog: "Zerolog",
      slog: "slog",
    };
    output += `${pc.cyan("•")} Logging: ${loggingNames[goLogging] || goLogging}\n`;
  }

  if (goAuth && goAuth !== "none") {
    const authNames: Record<string, string> = {
      casbin: "Casbin",
      jwt: "golang-jwt",
    };
    output += `${pc.cyan("•")} Auth: ${authNames[goAuth] || goAuth}\n`;
  }

  output += `\n${pc.bold("Common Go commands:")}\n`;
  output += `${pc.cyan("•")} Build: go build ./...\n`;
  output += `${pc.cyan("•")} Run: go run cmd/server/main.go\n`;
  output += `${pc.cyan("•")} Test: go test ./...\n`;
  output += `${pc.cyan("•")} Tidy: go mod tidy\n`;
  output += `${pc.cyan("•")} Format: go fmt ./...\n`;
  output += `${pc.cyan("•")} Lint: golangci-lint run\n`;

  output += `\n${pc.bold("Your project will be available at:")}\n`;
  output += `${pc.cyan("•")} API: http://localhost:8080\n`;

  if (goApi === "grpc-go") {
    output += `${pc.cyan("•")} gRPC: localhost:50051\n`;
  }

  output += `\n${pc.bold(
    "Enjoying Better Fullstack?",
  )} Help us grow — star the repo!\n`;
  output += `${pc.cyan("https://github.com/Marve10s/Better-Fullstack")}\n`;
  output += pc.dim("Your star helps other developers discover the project.");

  consola.box(output);
}

function displayPythonInstructions(config: ProjectConfig & { depsInstalled: boolean }) {
  const {
    relativePath,
    depsInstalled,
    pythonWebFramework,
    pythonOrm,
    pythonValidation,
    pythonAi,
    pythonTaskQueue,
    pythonQuality,
  } = config;

  const cdCmd = `cd ${relativePath}`;

  // Determine run command based on framework
  let runCommand = "uv run uvicorn app.main:app --reload";
  if (pythonWebFramework === "django") {
    runCommand = "uv run python manage.py runserver";
  } else if (pythonWebFramework === "flask") {
    runCommand = "uv run flask --app app.main run --reload";
  } else if (pythonWebFramework === "litestar") {
    runCommand = "litestar --app src.app.main:app run --reload --port 3001";
  }

  let output = `${pc.bold("Next steps")}\n${pc.cyan("1.")} ${cdCmd}\n`;
  let stepCounter = 2;

  if (!depsInstalled) {
    output += `${pc.cyan(`${stepCounter++}.`)} uv sync\n`;
  }

  output += `${pc.cyan(`${stepCounter++}.`)} ${runCommand}\n`;

  output += `\n${pc.bold("Your Python project includes:")}\n`;

  if (pythonWebFramework && pythonWebFramework !== "none") {
    const frameworkNames: Record<string, string> = {
      fastapi: "FastAPI",
      django: "Django",
      flask: "Flask",
      litestar: "Litestar",
    };
    output += `${pc.cyan("•")} Web Framework: ${frameworkNames[pythonWebFramework] || pythonWebFramework}\n`;
  }

  if (pythonOrm && pythonOrm !== "none") {
    const ormNames: Record<string, string> = {
      sqlalchemy: "SQLAlchemy",
      sqlmodel: "SQLModel",
      "tortoise-orm": "Tortoise ORM",
    };
    output += `${pc.cyan("•")} ORM: ${ormNames[pythonOrm] || pythonOrm}\n`;
  }

  if (pythonValidation && pythonValidation !== "none") {
    const validationNames: Record<string, string> = {
      pydantic: "Pydantic",
    };
    output += `${pc.cyan("•")} Validation: ${validationNames[pythonValidation] || pythonValidation}\n`;
  }

  if (pythonAi && pythonAi.length > 0 && !pythonAi.includes("none")) {
    const aiNames: Record<string, string> = {
      langchain: "LangChain",
      langgraph: "LangGraph",
      llamaindex: "LlamaIndex",
      "openai-sdk": "OpenAI SDK",
      "anthropic-sdk": "Anthropic SDK",
      crewai: "CrewAI",
    };
    const aiList = pythonAi
      .filter((ai) => ai !== "none")
      .map((ai) => aiNames[ai] || ai)
      .join(", ");
    output += `${pc.cyan("•")} AI: ${aiList}\n`;
  }

  if (pythonTaskQueue && pythonTaskQueue !== "none") {
    const taskQueueNames: Record<string, string> = {
      celery: "Celery",
    };
    output += `${pc.cyan("•")} Task Queue: ${taskQueueNames[pythonTaskQueue] || pythonTaskQueue}\n`;
  }

  if (pythonQuality && pythonQuality !== "none") {
    const qualityNames: Record<string, string> = {
      ruff: "Ruff",
    };
    output += `${pc.cyan("•")} Code Quality: ${qualityNames[pythonQuality] || pythonQuality}\n`;
  }

  output += `\n${pc.bold("Common Python commands:")}\n`;
  output += `${pc.cyan("•")} Install: uv sync\n`;
  output += `${pc.cyan("•")} Run: ${runCommand}\n`;
  output += `${pc.cyan("•")} Test: uv run pytest\n`;
  output += `${pc.cyan("•")} Format: uv run ruff format .\n`;
  output += `${pc.cyan("•")} Lint: uv run ruff check .\n`;

  output += `\n${pc.bold("Your project will be available at:")}\n`;
  output += `${pc.cyan("•")} API: http://localhost:8000\n`;

  output += `\n${pc.bold(
    "Enjoying Better Fullstack?",
  )} Help us grow — star the repo!\n`;
  output += `${pc.cyan("https://github.com/Marve10s/Better-Fullstack")}\n`;
  output += pc.dim("Your star helps other developers discover the project.");

  consola.box(output);
}
