/**
 * Database setup - CLI-only operations
 * Calls external database provider CLIs (turso, neon, prisma-postgres, etc.)
 * Dependencies are handled by the generator's db-deps processor
 */

import consola from "consola";
import fs from "fs-extra";
import path from "node:path";
import pc from "picocolors";

import type { ProjectConfig } from "../../types";
import type { SetupStepResult } from "./install-dependencies";

import { setupCloudflareD1 } from "../database-providers/d1-setup";
import { setupDockerCompose } from "../database-providers/docker-compose-setup";
import { setupMongoDBAtlas } from "../database-providers/mongodb-atlas-setup";
import { setupNeonPostgres } from "../database-providers/neon-setup";
import { setupPlanetScale } from "../database-providers/planetscale-setup";
import { setupPrismaPostgres } from "../database-providers/prisma-postgres-setup";
import { setupSupabase } from "../database-providers/supabase-setup";
import { setupTurso } from "../database-providers/turso-setup";
import { setupUpstash } from "../database-providers/upstash-setup";

export async function setupDatabase(
  config: ProjectConfig,
  cliInput?: { manualDb?: boolean },
): Promise<SetupStepResult | null> {
  const { database, dbSetup, backend, projectDir } = config;

  if (backend === "convex" || database === "none") {
    // Clean up server db dir if not using convex
    if (backend !== "convex") {
      const serverDbDir = path.join(projectDir, "apps/server/src/db");
      if (await fs.pathExists(serverDbDir)) {
        await fs.remove(serverDbDir);
      }
    }
    return null;
  }

  const dbPackageDir = path.join(projectDir, "packages/db");
  if (!(await fs.pathExists(dbPackageDir))) {
    return null;
  }

  try {
    // Call external database provider CLIs
    if (dbSetup === "docker") {
      await setupDockerCompose(config);
    } else if (database === "sqlite" && dbSetup === "turso") {
      await setupTurso(config, cliInput);
    } else if (database === "sqlite" && dbSetup === "d1") {
      await setupCloudflareD1(config);
    } else if (database === "postgres") {
      if (dbSetup === "prisma-postgres") {
        await setupPrismaPostgres(config, cliInput);
      } else if (dbSetup === "neon") {
        await setupNeonPostgres(config, cliInput);
      } else if (dbSetup === "planetscale") {
        await setupPlanetScale(config);
      } else if (dbSetup === "supabase") {
        await setupSupabase(config, cliInput);
      }
    } else if (database === "mysql" && dbSetup === "planetscale") {
      await setupPlanetScale(config);
    } else if (database === "mongodb" && dbSetup === "mongodb-atlas") {
      await setupMongoDBAtlas(config, cliInput);
    } else if (database === "redis" && dbSetup === "upstash") {
      await setupUpstash(config, cliInput);
    }

    return { step: "Database setup", success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    consola.error(pc.red(errorMessage));
    return { step: "Database setup", success: false, errorMessage };
  }
}
