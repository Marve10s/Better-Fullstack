import type { VirtualFile, VirtualNode } from "@better-fullstack/template-generator";

import { describe, expect, it } from "bun:test";

import { cliInputToProjectConfigPartial } from "@better-fullstack/types";

import { createVirtual } from "../src/index";

function findFile(node: VirtualNode, path: string): VirtualFile | undefined {
  if (node.type === "file") {
    return node.path.replace(/^\/+/, "") === path.replace(/^\/+/, "") ? node : undefined;
  }

  for (const child of node.children) {
    const found = findFile(child, path);
    if (found) return found;
  }
  return undefined;
}

function fileContent(node: VirtualNode, path: string): string {
  const file = findFile(node, path);
  expect(file).toBeDefined();
  return file?.content ?? "";
}

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
  ["elixir", "phoenix"],
  ["elixir", "phoenix-live-view"],
] as const;

function serverUrlFor(ecosystem: string, toolId: string) {
  if (ecosystem === "elixir") return "http://localhost:4000";
  if (ecosystem === "python") return "http://localhost:8000";
  if (ecosystem === "go" || ecosystem === "java") return "http://localhost:8080";
  if (ecosystem === "rust") return "http://localhost:3000";
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

function graphDocPathFor(frontend: string) {
  return frontend === "redwood" ? "GRAPH_BACKEND.md" : "apps/web/GRAPH_BACKEND.md";
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
      "http://localhost:4000/api/health",
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
      "http://localhost:3000/health",
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
            stackParts: graphParts([
              `frontend:typescript:${frontend}`,
              `backend:${ecosystem}:${backend}`,
            ]),
          });

          expect(result.success, `${frontend} + ${ecosystem}:${backend}`).toBe(true);
          const root = result.tree!.root;
          const env = fileContent(root, envPathFor(frontend));
          expect(env).toContain(
            `${envVarNameFor(frontend)}=${serverUrlFor(ecosystem, backend)}`,
          );
          expect(fileContent(root, graphDocPathFor(frontend))).toContain("Health URL:");
          expect(fileContent(root, "README.md")).toContain("multi-ecosystem project graph");

          if (ecosystem === "python") {
            expect(fileContent(root, "apps/server/README.md")).toContain("Python backend");
          }
        }
      }
    },
    30_000,
  );

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
      expect(fileContent(root, componentPath)).toContain("http://localhost:3000/health");
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
    expect(
      fileContent(
        phoenix.tree!.root,
        "apps/server/lib/cors_phoenix_web/controllers/health_controller.ex",
      ),
    ).toContain('put_resp_header("access-control-allow-origin", "*")');

    const goGin = await createVirtual({
      projectName: "cors-go",
      frontend: ["next"],
      backend: "none",
      api: "none",
      runtime: "none",
      stackParts: graphParts(["frontend:typescript:next", "backend:go:gin"]),
    });
    expect(goGin.success).toBe(true);
    expect(fileContent(goGin.tree!.root, "apps/server/cmd/server/main.go")).toContain(
      'Access-Control-Allow-Origin", "*"',
    );
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
      stackParts: graphParts(["frontend:typescript:next", "backend:java:spring-boot"]),
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
      stackParts: graphParts(["frontend:typescript:next", "backend:java:quarkus"]),
    });
    expect(quarkus.success).toBe(true);
    expect(
      fileContent(
        quarkus.tree!.root,
        "apps/server/src/main/java/com/example/corsquarkus/resource/GreetingResource.java",
      ),
    ).toContain("Access-Control-Allow-Origin");
  });
});
