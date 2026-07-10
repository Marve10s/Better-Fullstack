import { describe, expect, it } from "bun:test";

import { cliInputToProjectConfigPartial } from "@better-fullstack/types";

import { createVirtual } from "../src/index";
import { displayConfig } from "../src/utils/display-config";
import { readVirtualFileContent as fileContent } from "./virtual-tree-utils";

function graphParts(part: string[]) {
  return cliInputToProjectConfigPartial({ part }).stackParts;
}

const WEB_FRONTENDS = [
  "next",
  "vinext",
  "tanstack-router",
  "tanstack-start",
  "react-router",
  "react-vite",
  "astro",
  "svelte",
  "nuxt",
  "solid",
  "solid-start",
  "fresh",
  "angular",
  "qwik",
  "redwood",
] as const;

const NON_TYPESCRIPT_BACKENDS = [
  ["rust", "axum"],
  ["rust", "actix-web"],
  ["rust", "rocket"],
  ["rust", "warp"],
  ["rust", "poem"],
  ["rust", "salvo"],
  ["python", "fastapi"],
  ["python", "django"],
  ["python", "flask"],
  ["python", "litestar"],
  ["go", "gin"],
  ["go", "echo"],
  ["go", "fiber"],
  ["go", "chi"],
  ["java", "spring-boot"],
  ["java", "quarkus"],
  ["dotnet", "aspnet-minimal"],
  ["dotnet", "aspnet-mvc"],
  ["dotnet", "aspnet-blazor"],
  ["elixir", "phoenix"],
  ["elixir", "phoenix-live-view"],
] as const;

function serverUrlFor(ecosystem: string, toolId: string) {
  if (ecosystem === "elixir") return "http://localhost:4000";
  if (ecosystem === "python") return "http://localhost:8000";
  if (ecosystem === "go" || ecosystem === "java") return "http://localhost:8080";
  if (ecosystem === "rust") return "http://localhost:3000";
  if (ecosystem === "dotnet") return "http://localhost:5000";
  throw new Error(`Unknown backend ${ecosystem}:${toolId}`);
}

function envVarNameFor(frontend: string) {
  if (frontend === "next") return "NEXT_PUBLIC_SERVER_URL";
  if (frontend === "nuxt") return "NUXT_PUBLIC_SERVER_URL";
  if (frontend === "svelte" || frontend === "astro") return "PUBLIC_SERVER_URL";
  if (frontend === "redwood") return "REDWOOD_ENV_SERVER_URL";
  return "VITE_SERVER_URL";
}

function envPathFor(frontend: string) {
  return frontend === "redwood" ? ".env" : "apps/web/.env";
}

// Mirrors getLocalWebDevPort in @better-fullstack/types.
function webOriginFor(frontend: string) {
  if (frontend === "redwood") return "http://localhost:8910";
  if (["react-router", "react-vite", "svelte", "fresh"].includes(frontend)) {
    return "http://localhost:5173";
  }
  if (frontend === "astro") return "http://localhost:4321";
  return "http://localhost:3001";
}

function graphDocPathFor(frontend: string) {
  return frontend === "redwood" ? "GRAPH_BACKEND.md" : "apps/web/GRAPH_BACKEND.md";
}

function componentEnvReferenceFor(frontend: string) {
  if (frontend === "next") return "NEXT_PUBLIC_SERVER_URL";
  if (frontend === "nuxt") return "serverUrl";
  if (frontend === "svelte" || frontend === "astro") return "PUBLIC_SERVER_URL";
  if (frontend === "redwood") return "REDWOOD_ENV_SERVER_URL";
  return "VITE_SERVER_URL";
}

describe("Cross-ecosystem graph generation", () => {
  it("connects a TypeScript Next frontend to an Elixir Phoenix backend", async () => {
    const result = await createVirtual({
      projectName: "next-phoenix",
      frontend: ["next"],
      backend: "none",
      api: "none",
      runtime: "none",
      stackParts: graphParts([
        "frontend:typescript:next",
        "backend:elixir:phoenix",
        "backend.orm:elixir:ecto-sql",
      ]),
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;

    expect(fileContent(root, "apps/web/.env")).toContain(
      "NEXT_PUBLIC_SERVER_URL=http://localhost:4000",
    );
    expect(fileContent(root, "apps/web/src/components/graph-backend-status.tsx")).toContain(
      "NEXT_PUBLIC_SERVER_URL",
    );
    expect(fileContent(root, "apps/web/src/components/graph-backend-status.tsx")).toContain(
      "/api/health",
    );
    expect(fileContent(root, "apps/web/src/app/page.tsx")).toContain("<GraphBackendStatus />");
    expect(fileContent(root, "apps/web/GRAPH_BACKEND.md")).toContain(
      "Health URL: `http://localhost:4000/api/health`",
    );
    expect(fileContent(root, "README.md")).toContain("mix phx.server");

    const rootPackage = JSON.parse(fileContent(root, "package.json")) as {
      scripts?: Record<string, string>;
    };
    expect(rootPackage.scripts?.dev).toBe("bun run --filter web dev");
    expect(rootPackage.scripts?.["dev:server"]).toBe("cd apps/server && mix phx.server");
    expect(rootPackage.scripts?.["setup:server"]).toBe(
      "cd apps/server && mix deps.get && mix ecto.setup",
    );
  });

  it("connects an Astro frontend to a Rust Axum backend and keeps Astro islands intact", async () => {
    const result = await createVirtual({
      projectName: "astro-rust",
      frontend: ["astro"],
      backend: "none",
      api: "none",
      runtime: "none",
      astroIntegration: "react",
      stackParts: graphParts(["frontend:typescript:astro", "backend:rust:axum"]),
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;

    expect(fileContent(root, "apps/web/.env")).toContain("PUBLIC_SERVER_URL=http://localhost:3000");
    expect(fileContent(root, "apps/web/src/components/GraphBackendStatus.astro")).toContain(
      "PUBLIC_SERVER_URL",
    );
    expect(fileContent(root, "apps/web/src/components/GraphBackendStatus.astro")).toContain(
      "/health",
    );

    const astroPage = fileContent(root, "apps/web/src/pages/index.astro");
    expect(astroPage).toContain("import Counter from '@/components/Counter'");
    expect(astroPage).toContain("import GraphBackendStatus");
    expect(astroPage).toContain("<Counter client:load />");
    expect(astroPage).toContain("<GraphBackendStatus />");

    const rootPackage = JSON.parse(fileContent(root, "package.json")) as {
      scripts?: Record<string, string>;
    };
    expect(rootPackage.scripts?.["dev:server"]).toBe("cd apps/server && cargo run --bin server");
    expect(fileContent(root, "README.md")).toContain("Astro frontends can be generated with Rust");
  });

  it(
    "dry-runs every TypeScript web frontend with every non-TypeScript backend",
    async () => {
      for (const frontend of WEB_FRONTENDS) {
        for (const [ecosystem, backend] of NON_TYPESCRIPT_BACKENDS) {
          const result = await createVirtual({
            projectName: `graph-${frontend}-${ecosystem}-${backend}`.replaceAll(
              /[^a-z0-9-]/g,
              "-",
            ),
            frontend: [frontend],
            backend: "none",
            api: "none",
            runtime: "none",
            astroIntegration: frontend === "astro" ? "react" : "none",
            javaBuildTool: ecosystem === "java" ? "maven" : "none",
            dotnetTesting: ecosystem === "dotnet" ? [] : undefined,
            stackParts: graphParts([
              `frontend:typescript:${frontend}`,
              `backend:${ecosystem}:${backend}`,
              ...(ecosystem === "java" ? ["backend.buildTool:java:maven"] : []),
            ]),
          });

          expect(result.success, `${frontend} + ${ecosystem}:${backend}`).toBe(true);
          const root = result.tree!.root;
          const env = fileContent(root, envPathFor(frontend));
          expect(env).toContain(
            `${envVarNameFor(frontend)}=${serverUrlFor(ecosystem, backend)}`,
          );

          // The backend env pins CORS to the web frontend's dev origin.
          const corsLine = `CORS_ORIGIN=${webOriginFor(frontend)}`;
          expect(fileContent(root, "apps/server/.env"), `${frontend} + ${ecosystem}:${backend}`).toContain(corsLine);
          expect(
            fileContent(root, "apps/server/.env.example"),
            `${frontend} + ${ecosystem}:${backend}`,
          ).toContain(corsLine);

          expect(fileContent(root, graphDocPathFor(frontend))).toContain("Health URL:");
          expect(fileContent(root, "README.md")).toContain("multi-ecosystem project graph");

          if (ecosystem === "python") {
            const backendReadme = fileContent(root, "apps/server/README.md");
            expect(backendReadme).toContain("Python backend");
            const rootPackage = JSON.parse(fileContent(root, "package.json")) as {
              scripts?: Record<string, string>;
            };
            expect(rootPackage.scripts?.["setup:server"]).toBe(
              "cd apps/server && uv sync --extra dev",
            );
            if (backend === "fastapi") {
              expect(rootPackage.scripts?.["dev:server"]).toBe(
                "cd apps/server && uv run uvicorn app.main:app --reload --host 0.0.0.0 --port ${PORT:-8000}",
              );
              expect(backendReadme).toContain("uv run uvicorn app.main:app");
            } else if (backend === "litestar") {
              expect(rootPackage.scripts?.["dev:server"]).toBe(
                "cd apps/server && uv run litestar --app src.app.main:app run --reload --host 0.0.0.0 --port ${PORT:-8000}",
              );
              expect(backendReadme).toContain("uv run litestar --app src.app.main:app run");
            }
            expect(rootPackage.scripts?.["check:server"]).toBe(
              "cd apps/server && uv run --extra dev ruff check .",
            );
            expect(rootPackage.scripts?.["test:server"]).toBe(
              "cd apps/server && uv run --extra dev pytest",
            );
          }
        }
      }
    },
    30_000,
  );

  it("uses the selected package manager in graph README app commands", async () => {
    const result = await createVirtual({
      projectName: "npm-next-go",
      packageManager: "npm",
      frontend: ["next"],
      backend: "none",
      api: "none",
      runtime: "none",
      stackParts: graphParts(["frontend:typescript:next", "backend:go:gin"]),
    });

    expect(result.success).toBe(true);
    const readme = fileContent(result.tree!.root, "README.md");
    expect(readme).toContain("npm install");
    expect(readme).toContain("npm run dev:web");
    expect(readme).not.toContain("bun run dev:web");
  });

  it("keeps graph-only non-TypeScript GitHub Actions rooted in the backend app", async () => {
    const result = await createVirtual({
      projectName: "graph-python-ci",
      ecosystem: "python",
      frontend: [],
      backend: "none",
      api: "none",
      runtime: "none",
      addons: ["github-actions"],
      stackParts: graphParts(["backend:python:fastapi"]),
    });

    expect(result.success).toBe(true);

    const workflow = fileContent(result.tree!.root, ".github/workflows/ci.yml");
    expect(workflow).toContain('working-directory: "apps/server"');
    expect(workflow).toContain("if [ -f pyproject.toml ]; then pip install -e");
    expect(workflow).toContain("run: pytest");
  });

  it("shows ecosystem auth in the CLI config summary", () => {
    const output = displayConfig({
      backend: "none",
      auth: "none",
      stackParts: graphParts([
        "backend:elixir:phoenix",
        "backend.auth:elixir:phx-gen-auth",
      ]),
    });

    expect(output).toContain("Backend:");
    expect(output).toContain("elixir:phoenix");
    expect(output).toContain("Auth:");
    expect(output).toContain("elixir:phx-gen-auth");
  });

  it("omits disabled graph parts from the CLI config summary", () => {
    const output = displayConfig({
      backend: "none",
      uiLibrary: "none",
      stackParts: graphParts([
        "frontend:typescript:next",
        "frontend.ui:typescript:none",
        "backend:go:gin",
      ]),
    });

    expect(output).toContain("Stack Parts:");
    expect(output).toContain("frontend:typescript:next");
    expect(output).toContain("backend:go:gin");
    expect(output).not.toContain("frontend.ui:typescript:none");
  });

  it("adds graph backend status UI to Angular, Qwik, and Redwood", async () => {
    const cases = [
      {
        frontend: "angular",
        componentPath: "apps/web/src/app/components/graph-backend-status.component.ts",
        pagePath: "apps/web/src/app/app.component.ts",
      },
      {
        frontend: "qwik",
        componentPath: "apps/web/src/components/graph-backend-status.tsx",
        pagePath: "apps/web/src/routes/index.tsx",
      },
      {
        frontend: "redwood",
        componentPath: "web/src/components/GraphBackendStatus/GraphBackendStatus.tsx",
        pagePath: "web/src/pages/HomePage/HomePage.tsx",
      },
    ] as const;

    for (const { frontend, componentPath, pagePath } of cases) {
      const result = await createVirtual({
        projectName: `${frontend}-rust-graph`,
        frontend: [frontend],
        backend: "none",
        api: "none",
        runtime: "none",
        stackParts: graphParts([`frontend:typescript:${frontend}`, "backend:rust:axum"]),
      });

      expect(result.success).toBe(true);
      const root = result.tree!.root;
      expect(fileContent(root, componentPath)).toContain(componentEnvReferenceFor(frontend));
      expect(fileContent(root, componentPath)).toContain("/health");
      expect(fileContent(root, pagePath)).toContain("GraphBackendStatus");
    }
  });

  it("emits browser-visible CORS headers for graph health endpoints", async () => {
    const phoenix = await createVirtual({
      projectName: "cors-phoenix",
      frontend: ["next"],
      backend: "none",
      api: "none",
      runtime: "none",
      stackParts: graphParts(["frontend:typescript:next", "backend:elixir:phoenix"]),
    });
    expect(phoenix.success).toBe(true);
    const phoenixController = fileContent(
      phoenix.tree!.root,
      "apps/server/lib/cors_phoenix_web/controllers/health_controller.ex",
    );
    expect(phoenixController).toContain('System.get_env("CORS_ORIGIN")');
    expect(phoenixController).toContain(
      'put_resp_header("access-control-allow-origin", cors_origin)',
    );

    const goGin = await createVirtual({
      projectName: "cors-go",
      frontend: ["next"],
      backend: "none",
      api: "none",
      runtime: "none",
      stackParts: graphParts(["frontend:typescript:next", "backend:go:gin"]),
    });
    expect(goGin.success).toBe(true);
    const goMain = fileContent(goGin.tree!.root, "apps/server/cmd/server/main.go");
    expect(goMain).toContain('os.Getenv("CORS_ORIGIN")');
    expect(goMain).toContain('Access-Control-Allow-Origin", corsOrigin');
    expect(
      (
        JSON.parse(fileContent(goGin.tree!.root, "package.json")) as {
          scripts?: Record<string, string>;
        }
      ).scripts?.["setup:server"],
    ).toBe("cd apps/server && go mod tidy");

    const spring = await createVirtual({
      projectName: "cors-spring",
      frontend: ["next"],
      backend: "none",
      api: "none",
      runtime: "none",
      javaBuildTool: "maven",
      stackParts: graphParts([
        "frontend:typescript:next",
        "backend:java:spring-boot",
        "backend.buildTool:java:maven",
      ]),
    });
    expect(spring.success).toBe(true);
    expect(
      fileContent(
        spring.tree!.root,
        "apps/server/src/main/java/com/example/corsspring/controller/HealthController.java",
      ),
    ).toContain("@CrossOrigin");

    const quarkus = await createVirtual({
      projectName: "cors-quarkus",
      frontend: ["next"],
      backend: "none",
      api: "none",
      runtime: "none",
      javaBuildTool: "maven",
      stackParts: graphParts([
        "frontend:typescript:next",
        "backend:java:quarkus",
        "backend.buildTool:java:maven",
      ]),
    });
    expect(quarkus.success).toBe(true);
    expect(
      fileContent(
        quarkus.tree!.root,
        "apps/server/src/main/java/com/example/corsquarkus/resource/GreetingResource.java",
      ),
    ).toContain("Access-Control-Allow-Origin");

    const dotnet = await createVirtual({
      projectName: "cors-dotnet",
      frontend: ["next"],
      backend: "none",
      api: "none",
      runtime: "none",
      dotnetTesting: [],
      stackParts: graphParts(["frontend:typescript:next", "backend:dotnet:aspnet-minimal"]),
    });
    expect(dotnet.success).toBe(true);
    const dotnetProgram = fileContent(dotnet.tree!.root, "apps/server/Program.cs");
    expect(dotnetProgram).toContain('builder.Configuration["CORS_ORIGIN"]');
    expect(dotnetProgram).toContain("policy.WithOrigins(corsOrigin)");
    expect(dotnetProgram).toContain("policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()");
  });

  it("pins backend CORS_ORIGIN and keeps the server URL pair consistent", async () => {
    const result = await createVirtual({
      projectName: "pinned-cors",
      frontend: ["next"],
      backend: "none",
      api: "none",
      runtime: "none",
      stackParts: graphParts(["frontend:typescript:next", "backend:go:gin"]),
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;

    // Frontend points at the backend's dev URL; backend pins CORS to the
    // frontend's dev origin — both derived from getGraphBackendConnection.
    expect(fileContent(root, "apps/web/.env")).toContain(
      "NEXT_PUBLIC_SERVER_URL=http://localhost:8080",
    );
    expect(fileContent(root, "apps/server/.env")).toContain(
      "CORS_ORIGIN=http://localhost:3001",
    );
    const backendEnvExample = fileContent(root, "apps/server/.env.example");
    expect(backendEnvExample).toContain("CORS_ORIGIN=http://localhost:3001");
    // The port in the frontend's server URL matches the backend's env-driven PORT.
    expect(backendEnvExample).toContain("PORT=8080");

    const goMain = fileContent(root, "apps/server/cmd/server/main.go");
    expect(goMain).toContain('os.Getenv("PORT")');
    expect(goMain).toContain('os.Getenv("CORS_ORIGIN")');
  });

  it("populates the database package with drizzle deps and scripts in graph mode", async () => {
    const result = await createVirtual({
      projectName: "graph-db",
      frontend: [],
      backend: "none",
      api: "none",
      runtime: "none",
      stackParts: graphParts([
        "frontend:typescript:next",
        "backend:typescript:hono",
        "backend.database:typescript:sqlite",
        "backend.orm:typescript:drizzle",
      ]),
    });

    expect(result.success).toBe(true);
    const root = result.tree!.root;

    const dbPackage = JSON.parse(fileContent(root, "packages/db/package.json")) as {
      scripts?: Record<string, string>;
      dependencies?: Record<string, string>;
      devDependencies?: Record<string, string>;
    };

    // Regression: graph mode previously ran the database post-processing against
    // the raw graph config (database/orm live in stackParts there), leaving the
    // database package without any drizzle deps or scripts.
    expect(dbPackage.dependencies?.["drizzle-orm"]).toBeDefined();
    expect(dbPackage.dependencies?.["@libsql/client"]).toBeDefined();
    expect(dbPackage.dependencies?.libsql).toBeDefined();
    expect(dbPackage.devDependencies?.["drizzle-kit"]).toBeDefined();
    expect(dbPackage.scripts?.["db:push"]).toBe("drizzle-kit push");
    expect(dbPackage.scripts?.["db:generate"]).toBe("drizzle-kit generate");
    expect(dbPackage.scripts?.["db:studio"]).toBe("drizzle-kit studio");
    expect(dbPackage.scripts?.["db:migrate"]).toBe("drizzle-kit migrate");
    expect(dbPackage.scripts?.["db:local"]).toBe("turso dev --db-file local.db");

    // The catalog refs the database package relies on must be registered at root.
    const rootPackage = JSON.parse(fileContent(root, "package.json")) as {
      workspaces?: { catalog?: Record<string, string> };
    };
    expect(rootPackage.workspaces?.catalog?.["@libsql/client"]).toBeDefined();
    expect(rootPackage.workspaces?.catalog?.libsql).toBeDefined();
  });
});
