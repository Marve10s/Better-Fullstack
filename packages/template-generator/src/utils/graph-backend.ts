import { getRoleTargetPath, type ProjectConfig, type StackPart } from "@better-fullstack/types";

export type GraphBackendConnection = {
  ecosystem: Exclude<StackPart["ecosystem"], "typescript" | "react-native" | "universal">;
  toolId: string;
  label: string;
  targetPath: string;
  serverUrl: string;
  healthPath: string;
  healthUrl: string;
  setupCommand: string | null;
  devCommand: string;
  checkCommand: string | null;
  testCommand: string | null;
};

const BACKEND_LABELS: Record<string, string> = {
  axum: "Rust Axum",
  "actix-web": "Rust Actix Web",
  rocket: "Rust Rocket",
  warp: "Rust Warp",
  poem: "Rust Poem",
  salvo: "Rust Salvo",
  "fastapi": "Python FastAPI",
  django: "Python Django",
  flask: "Python Flask",
  litestar: "Python Litestar",
  gin: "Go Gin",
  echo: "Go Echo",
  fiber: "Go Fiber",
  chi: "Go Chi",
  "net-http": "Go net/http",
  "spring-boot": "Java Spring Boot",
  quarkus: "Java Quarkus",
  phoenix: "Elixir Phoenix",
  "phoenix-live-view": "Elixir Phoenix LiveView",
};

export function getGraphBackendConnection(config: ProjectConfig): GraphBackendConnection | null {
  const backend = (config.stackParts ?? []).find(
    (part) =>
      part.role === "backend" &&
      !part.ownerPartId &&
      part.source !== "provided" &&
      part.ecosystem !== "typescript" &&
      part.ecosystem !== "react-native" &&
      part.ecosystem !== "universal",
  );

  if (!backend) return null;

  const targetPath = backend.targetPath ?? getRoleTargetPath("backend") ?? "apps/server";
  const label = BACKEND_LABELS[backend.toolId] ?? `${backend.ecosystem} ${backend.toolId}`;

  switch (backend.ecosystem) {
    case "elixir": {
      const hasPhoenix = backend.toolId === "phoenix" || backend.toolId === "phoenix-live-view";
      const hasEcto = (config.stackParts ?? []).some(
        (part) => part.ownerPartId === backend.id && part.role === "orm" && part.toolId === "ecto-sql",
      );
      return {
        ecosystem: backend.ecosystem,
        toolId: backend.toolId,
        label,
        targetPath,
        serverUrl: "http://localhost:4000",
        healthPath: hasPhoenix ? "/api/health" : "/health",
        healthUrl: `http://localhost:4000${hasPhoenix ? "/api/health" : "/health"}`,
        setupCommand: hasEcto
          ? `cd ${targetPath} && mix deps.get && mix ecto.setup`
          : `cd ${targetPath} && mix deps.get`,
        devCommand: `cd ${targetPath} && ${hasPhoenix ? "mix phx.server" : "iex -S mix"}`,
        checkCommand: `cd ${targetPath} && mix compile --warnings-as-errors`,
        testCommand: `cd ${targetPath} && mix test`,
      };
    }
    case "rust":
      return {
        ecosystem: backend.ecosystem,
        toolId: backend.toolId,
        label,
        targetPath,
        serverUrl: "http://localhost:3000",
        healthPath: "/health",
        healthUrl: "http://localhost:3000/health",
        setupCommand: null,
        devCommand: `cd ${targetPath} && cargo run --bin server`,
        checkCommand: `cd ${targetPath} && cargo check`,
        testCommand: `cd ${targetPath} && cargo test`,
      };
    case "python": {
      const devCommand =
        backend.toolId === "fastapi"
          ? `cd ${targetPath} && uv run uvicorn app.main:app --reload`
          : `cd ${targetPath} && uv run python src/app/main.py`;
      return {
        ecosystem: backend.ecosystem,
        toolId: backend.toolId,
        label,
        targetPath,
        serverUrl: "http://localhost:8000",
        healthPath: "/health",
        healthUrl: "http://localhost:8000/health",
        setupCommand: `cd ${targetPath} && uv sync`,
        devCommand,
        checkCommand: `cd ${targetPath} && uv run ruff check .`,
        testCommand: `cd ${targetPath} && uv run pytest`,
      };
    }
    case "go":
      return {
        ecosystem: backend.ecosystem,
        toolId: backend.toolId,
        label,
        targetPath,
        serverUrl: "http://localhost:8080",
        healthPath: "/health",
        healthUrl: "http://localhost:8080/health",
        setupCommand: `cd ${targetPath} && go mod tidy`,
        devCommand: `cd ${targetPath} && go run cmd/server/main.go`,
        checkCommand: `cd ${targetPath} && go test ./...`,
        testCommand: `cd ${targetPath} && go test ./...`,
      };
    case "java": {
      const buildTool = config.javaBuildTool === "gradle" ? "./gradlew" : "./mvnw";
      const isQuarkus = backend.toolId === "quarkus";
      const devTask =
        config.javaBuildTool === "gradle"
          ? isQuarkus
            ? "quarkusDev"
            : "bootRun"
          : isQuarkus
            ? "quarkus:dev"
            : "spring-boot:run";
      const buildTask = config.javaBuildTool === "gradle" ? "build" : "package";
      return {
        ecosystem: backend.ecosystem,
        toolId: backend.toolId,
        label,
        targetPath,
        serverUrl: "http://localhost:8080",
        healthPath: isQuarkus ? "/hello" : "/health",
        healthUrl: `http://localhost:8080${isQuarkus ? "/hello" : "/health"}`,
        setupCommand: null,
        devCommand: `cd ${targetPath} && ${buildTool} ${devTask}`,
        checkCommand: `cd ${targetPath} && ${buildTool} ${buildTask}`,
        testCommand: `cd ${targetPath} && ${buildTool} test`,
      };
    }
    default:
      return null;
  }
}

export function hasWebFrontend(config: Pick<ProjectConfig, "frontend">): boolean {
  return config.frontend.some((entry) => entry !== "none" && !entry.startsWith("native-"));
}
