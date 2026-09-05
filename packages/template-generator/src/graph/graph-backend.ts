import {
  getLocalWebDevPort,
  getRoleTargetPath,
  type ProjectConfig,
  type StackPart,
} from "@better-fullstack/types";

export type GraphBackendConnection = {
  partId: string;
  ecosystem: Exclude<StackPart["ecosystem"], "typescript" | "react-native" | "universal">;
  toolId: string;
  label: string;
  targetPath: string;
  /** Dev-server origin of the web frontend (null when the graph has no web frontend). */
  webOrigin: string | null;
  serverUrl: string;
  healthPath: string;
  healthUrl: string;
  setupCommand: string | null;
  devCommand: string;
  checkCommand: string | null;
  testCommand: string | null;
};

function getGraphWebFrontend(config: ProjectConfig): StackPart | undefined {
  return (config.stackParts ?? []).find(
    (part) =>
      part.role === "frontend" &&
      !part.ownerPartId &&
      part.source !== "provided" &&
      part.toolId !== "none",
  );
}

const BACKEND_LABELS: Record<string, string> = {
  axum: "Rust Axum",
  "actix-web": "Rust Actix Web",
  rocket: "Rust Rocket",
  warp: "Rust Warp",
  poem: "Rust Poem",
  salvo: "Rust Salvo",
  fastapi: "Python FastAPI",
  django: "Python Django",
  flask: "Python Flask",
  litestar: "Python Litestar",
  gin: "Go Gin",
  echo: "Go Echo",
  fiber: "Go Fiber",
  chi: "Go Chi",
  "net-http": "Go net/http",
  "spring-boot": "Java Spring Boot",
  ktor: "Kotlin Ktor",
  quarkus: "Java Quarkus",
  "aspnet-minimal": ".NET ASP.NET Core Minimal APIs",
  "aspnet-mvc": ".NET ASP.NET Core MVC",
  "aspnet-blazor": ".NET ASP.NET Core Blazor",
  phoenix: "Elixir Phoenix",
  "phoenix-live-view": "Elixir Phoenix LiveView",
};

function getRawGraphBackendConnection(config: ProjectConfig): GraphBackendConnection | null {
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
  const graphFrontend = getGraphWebFrontend(config);
  const webPort = graphFrontend
    ? graphFrontend.ecosystem === "dotnet"
      ? 5173
      : graphFrontend.ecosystem === "rust"
        ? 8080
        : graphFrontend.ecosystem === "typescript"
          ? getLocalWebDevPort([graphFrontend.toolId] as ProjectConfig["frontend"])
          : null
    : hasWebFrontend(config)
      ? getLocalWebDevPort(config.frontend)
      : null;
  const webOrigin = webPort ? `http://localhost:${webPort}` : null;

  switch (backend.ecosystem) {
    case "elixir": {
      const hasPhoenix = backend.toolId === "phoenix" || backend.toolId === "phoenix-live-view";
      const hasEcto = (config.stackParts ?? []).some(
        (part) =>
          part.ownerPartId === backend.id && part.role === "orm" && part.toolId === "ecto-sql",
      );
      return {
        partId: backend.id,
        ecosystem: backend.ecosystem,
        toolId: backend.toolId,
        label,
        targetPath,
        webOrigin,
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
        partId: backend.id,
        ecosystem: backend.ecosystem,
        toolId: backend.toolId,
        label,
        targetPath,
        webOrigin,
        serverUrl: "http://localhost:3000",
        healthPath: "/health",
        healthUrl: "http://localhost:3000/health",
        setupCommand: null,
        devCommand: `cd ${targetPath} && cargo run --bin server`,
        checkCommand: `cd ${targetPath} && cargo check`,
        testCommand: `cd ${targetPath} && cargo test`,
      };
    case "python": {
      const packageManager =
        (config.stackParts ?? []).find(
          (part) => part.ownerPartId === backend.id && part.role === "packageManager",
        )?.toolId ??
        config.pythonPackageManager ??
        "uv";
      const runPython = (command: string, { module = true, dev = false } = {}) => {
        if (packageManager === "pip") {
          const args = `${module ? "-m " : ""}${command}`;
          return `if [ -f .venv/Scripts/python.exe ]; then .venv/Scripts/python.exe ${args}; else .venv/bin/python ${args}; fi`;
        }
        const runner =
          packageManager === "poetry" ? "poetry run" : dev ? "uv run --extra dev" : "uv run";
        return `${runner} ${module ? "" : "python "}${command}`;
      };
      const setupCommand =
        packageManager === "poetry"
          ? "poetry install --extras dev"
          : packageManager === "pip"
            ? `if [ "$OS" = "Windows_NT" ]; then python -m venv .venv; else python3 -m venv .venv; fi && ${runPython("pip install -e '.[dev]'")}`
            : "uv sync --extra dev";
      const devCommand = `cd ${targetPath} && ${
        backend.toolId === "fastapi"
          ? runPython("uvicorn app.main:app --reload --host 0.0.0.0 --port ${PORT:-8000}")
          : backend.toolId === "litestar"
            ? runPython(
                "litestar --app src.app.main:app run --reload --host 0.0.0.0 --port ${PORT:-8000}",
              )
            : runPython("src/app/main.py", { module: false })
      }`;
      return {
        partId: backend.id,
        ecosystem: backend.ecosystem,
        toolId: backend.toolId,
        label,
        targetPath,
        webOrigin,
        serverUrl: "http://localhost:8000",
        healthPath: "/health",
        healthUrl: "http://localhost:8000/health",
        setupCommand: `cd ${targetPath} && ${setupCommand}`,
        devCommand,
        checkCommand: `cd ${targetPath} && ${runPython("ruff check .", { dev: true })}`,
        testCommand: `cd ${targetPath} && ${runPython("pytest", { dev: true })}`,
      };
    }
    case "go":
      return {
        partId: backend.id,
        ecosystem: backend.ecosystem,
        toolId: backend.toolId,
        label,
        targetPath,
        webOrigin,
        serverUrl: "http://localhost:8080",
        healthPath: "/health",
        healthUrl: "http://localhost:8080/health",
        setupCommand: `cd ${targetPath} && go mod tidy`,
        devCommand: `cd ${targetPath} && go run cmd/server/main.go`,
        checkCommand: `cd ${targetPath} && go mod tidy && go test ./...`,
        testCommand: `cd ${targetPath} && go mod tidy && go test ./...`,
      };
    case "java": {
      const selectedBuildTool =
        (config.stackParts ?? []).find(
          (part) => part.ownerPartId === backend.id && part.role === "buildTool",
        )?.toolId ?? config.javaBuildTool;
      const buildTool = selectedBuildTool === "gradle" ? "./gradlew" : "./mvnw";
      const isQuarkus = backend.toolId === "quarkus";
      const isKtor = backend.toolId === "ktor";
      const devTask =
        selectedBuildTool === "gradle"
          ? isKtor
            ? "run"
            : isQuarkus
              ? "quarkusDev"
              : "bootRun"
          : isKtor
            ? "compile exec:java"
            : isQuarkus
              ? "quarkus:dev"
              : "spring-boot:run";
      const buildTask = selectedBuildTool === "gradle" ? "build" : "package";
      return {
        partId: backend.id,
        ecosystem: backend.ecosystem,
        toolId: backend.toolId,
        label,
        targetPath,
        webOrigin,
        serverUrl: "http://localhost:8080",
        healthPath: isQuarkus ? "/hello" : "/health",
        healthUrl: `http://localhost:8080${isQuarkus ? "/hello" : "/health"}`,
        setupCommand: null,
        devCommand: `cd ${targetPath} && ${buildTool} ${devTask}`,
        checkCommand: `cd ${targetPath} && ${buildTool} ${buildTask}`,
        testCommand: `cd ${targetPath} && ${buildTool} test`,
      };
    }
    case "dotnet": {
      const hasHealthChecks = (config.stackParts ?? []).some(
        (part) =>
          part.ownerPartId === backend.id &&
          part.role === "observability" &&
          part.toolId === "health-checks",
      );
      const hasTesting =
        config.dotnetTesting.length > 0 ||
        (config.stackParts ?? []).some(
          (part) =>
            part.ownerPartId === backend.id &&
            part.role === "testing" &&
            part.ecosystem === "dotnet" &&
            part.toolId !== "none",
        );
      const healthPath = hasHealthChecks ? "/health" : "/";
      return {
        partId: backend.id,
        ecosystem: backend.ecosystem,
        toolId: backend.toolId,
        label,
        targetPath,
        webOrigin,
        serverUrl: "http://localhost:5000",
        healthPath,
        healthUrl: `http://localhost:5000${healthPath}`,
        setupCommand: `cd ${targetPath} && dotnet restore`,
        devCommand: `cd ${targetPath} && dotnet run`,
        checkCommand: `cd ${targetPath} && dotnet build --no-restore`,
        testCommand: hasTesting ? `cd ${targetPath} && dotnet test` : null,
      };
    }
    default:
      return null;
  }
}

/** Resolve every generated non-TypeScript service while preserving graph order. */
export function getGraphBackendConnections(config: ProjectConfig): GraphBackendConnection[] {
  const backendParts = (config.stackParts ?? []).filter(
    (part) =>
      part.role === "backend" &&
      !part.ownerPartId &&
      part.source !== "provided" &&
      part.ecosystem !== "typescript" &&
      part.ecosystem !== "react-native" &&
      part.ecosystem !== "universal",
  );

  const connections = backendParts.flatMap((backend) => {
    const connection = getRawGraphBackendConnection({
      ...config,
      stackParts: [backend, ...(config.stackParts ?? []).filter((part) => part.id !== backend.id)],
    });
    return connection ? [connection] : [];
  });

  const usedPorts = new Set(
    connections.flatMap((connection) =>
      connection.webOrigin ? [Number(new URL(connection.webOrigin).port)] : [],
    ),
  );
  return connections.map((connection) => {
    const url = new URL(connection.serverUrl);
    const defaultPort = Number(url.port);
    let port = defaultPort;
    while (usedPorts.has(port)) port += 1;
    usedPorts.add(port);
    if (port === defaultPort) return connection;

    const serverUrl = `${url.protocol}//${url.hostname}:${port}`;
    return {
      ...connection,
      serverUrl,
      healthUrl: `${serverUrl}${connection.healthPath}`,
      devCommand: connection.devCommand
        .replace(
          `cd ${connection.targetPath} && `,
          `cd ${connection.targetPath} && export PORT=${port} && `,
        )
        .replace(`\${PORT:-${defaultPort}}`, `\${PORT:-${port}}`),
    };
  });
}

export function getGraphBackendConnection(config: ProjectConfig): GraphBackendConnection | null {
  return getGraphBackendConnections(config)[0] ?? null;
}

export function hasWebFrontend(
  config: Pick<ProjectConfig, "frontend"> & Partial<Pick<ProjectConfig, "stackParts">>,
): boolean {
  const graphFrontends = (config.stackParts ?? []).filter(
    (part) => part.role === "frontend" && !part.ownerPartId && part.source !== "provided",
  );
  if (graphFrontends.length > 0) {
    return graphFrontends.some((part) => part.toolId !== "none");
  }
  return config.frontend.some((entry) => entry !== "none" && !entry.startsWith("native-"));
}
