import {
  getCrystalCommands,
  getLocalWebDevPort,
  getRoleTargetPath,
  getStandaloneBackendEcosystem,
  type ProjectConfig,
  type StackPart,
} from "@better-fullstack/types";

import { getGraphFrontendPorts, getGraphJavaScriptServicePorts } from "@/graph/graph-frontend";

export type GraphBackendConnection = {
  partId: string;
  ecosystem: Exclude<StackPart["ecosystem"], "typescript" | "react-native" | "universal">;
  toolId: string;
  label: string;
  targetPath: string;
  /** Single web dev origin, or null when CORS cannot be pinned to one frontend. */
  webOrigin: string | null;
  serverUrl: string;
  healthPath: string;
  healthUrl: string;
  setupCommand: string | null;
  devCommand: string;
  checkCommand: string | null;
  testCommand: string | null;
};

function getGraphWebFrontends(config: ProjectConfig): StackPart[] {
  return (config.stackParts ?? []).filter(
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
  kemal: "Crystal Kemal",
  lucky: "Crystal Lucky",
  athena: "Crystal Athena",
  marten: "Crystal Marten",
  sinatra: "Ruby Sinatra",
  rails: "Ruby on Rails",
  roda: "Ruby Roda",
  grape: "Ruby Grape",
  slim: "PHP Slim",
  phoenix: "Elixir Phoenix",
  "phoenix-live-view": "Elixir Phoenix LiveView",
};

function shellDirectory(value: string, alwaysQuote = false) {
  if (!alwaysQuote && /^[a-zA-Z0-9_./-]+$/.test(value)) return value;
  return `'${value.replaceAll("'", "'\\''")}'`;
}

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

  const targetPath = getStandaloneBackendEcosystem(config.stackParts)
    ? "."
    : (backend.targetPath ?? getRoleTargetPath("backend") ?? "apps/server");
  const directory = shellDirectory(targetPath, backend.ecosystem === "crystal");
  const label = BACKEND_LABELS[backend.toolId] ?? `${backend.ecosystem} ${backend.toolId}`;
  const graphFrontends = getGraphWebFrontends(config);
  const graphFrontend = graphFrontends[0];
  const webPort = graphFrontend
    ? getGraphFrontendPorts(config).get(graphFrontend.id)
    : hasWebFrontend(config)
      ? getLocalWebDevPort(config.frontend)
      : null;
  // Native templates accept one pinned origin or their permissive development default.
  const webOrigin = graphFrontends.length <= 1 && webPort ? `http://localhost:${webPort}` : null;

  switch (backend.ecosystem) {
    case "crystal": {
      const ownedTool = (role: string) =>
        (config.stackParts ?? []).find((part) => part.ownerPartId === backend.id && part.role === role)
          ?.toolId;
      const commands = getCrystalCommands({
        crystalWebFramework: backend.toolId,
        crystalOrm: ownedTool("orm"),
        crystalAuth: ownedTool("auth"),
        crystalTesting: ownedTool("testing") ?? "none",
      });
      const origins =
        [...new Set(getGraphFrontendPorts(config).values())]
          .map((port) => `http://localhost:${port}`)
          .join(",") || webOrigin;
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
        setupCommand: [`cd ${directory}`, "shards install", commands.migrate, commands.seed]
          .filter(Boolean)
          .join(" && "),
        devCommand: `cd ${directory} && ${origins ? `export CORS_ORIGIN=${origins} && ` : ""}${commands.run}`,
        checkCommand: `cd ${directory} && ${commands.build}`,
        testCommand: commands.test ? `cd ${directory} && ${commands.test}` : null,
      };
    }
    case "ruby": {
      const ownedTool = (role: string) =>
        config.stackParts?.find(
          (part) => part.role === role && part.ecosystem === "ruby" && part.ownerPartId === backend.id,
        )?.toolId;
      const rubyTesting = ownedTool("testing") ?? config.rubyTesting ?? "minitest";
      const rubyOrm = ownedTool("orm") ?? "none";
      const needsMigration = rubyOrm !== "none" || ownedTool("auth") === "rodauth";
      return {
        partId: backend.id,
        ecosystem: backend.ecosystem,
        toolId: backend.toolId,
        label,
        targetPath,
        webOrigin,
        serverUrl: "http://localhost:4567",
        healthPath: "/health",
        healthUrl: "http://localhost:4567/health",
        setupCommand: needsMigration
          ? `cd ${directory} && bundle install && bundle exec rake db:migrate`
          : `cd ${directory} && bundle install`,
        devCommand: `cd ${directory} && bundle exec ruby bin/server`,
        checkCommand: `cd ${directory} && bundle exec rake build`,
        testCommand:
          rubyTesting === "none" ? null : `cd ${directory} && bundle exec rake test`,
      };
    }
    case "php": {
      const ownedParts = (config.stackParts ?? []).filter((part) => part.ownerPartId === backend.id);
      const needsDatabaseSetup = ownedParts.some(
        (part) =>
          (part.role === "orm" && part.toolId !== "none") ||
          (part.role === "jobQueue" && part.toolId === "laravel-queue"),
      );
      const hasTesting = ownedParts.some(
        (part) => part.role === "testing" && part.toolId !== "none",
      );
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
        setupCommand: needsDatabaseSetup
          ? `cd ${directory} && composer install --no-interaction && composer run db:setup`
          : `cd ${directory} && composer install --no-interaction`,
        devCommand: `cd ${directory} && composer run dev`,
        checkCommand: `cd ${directory} && composer run build`,
        testCommand: hasTesting ? `cd ${directory} && composer test` : null,
      };
    }
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
          ? `cd ${directory} && mix deps.get && mix ecto.setup`
          : `cd ${directory} && mix deps.get`,
        devCommand: `cd ${directory} && ${hasPhoenix ? "mix phx.server" : "iex -S mix"}`,
        checkCommand: `cd ${directory} && mix compile --warnings-as-errors`,
        testCommand: `cd ${directory} && mix test`,
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
        devCommand: `cd ${directory} && cargo run --bin server`,
        checkCommand: `cd ${directory} && cargo check`,
        testCommand: `cd ${directory} && cargo test`,
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
      const devCommand = `cd ${directory} && ${
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
        setupCommand: `cd ${directory} && ${setupCommand}`,
        devCommand,
        checkCommand: `cd ${directory} && ${runPython("ruff check .", { dev: true })}`,
        testCommand: `cd ${directory} && ${runPython("pytest", { dev: true })}`,
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
        setupCommand: `cd ${directory} && go mod tidy`,
        devCommand: `cd ${directory} && go run cmd/server/main.go`,
        checkCommand: `cd ${directory} && go mod tidy && go test ./...`,
        testCommand: `cd ${directory} && go mod tidy && go test ./...`,
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
        devCommand: `cd ${directory} && ${buildTool} ${devTask}`,
        checkCommand: `cd ${directory} && ${buildTool} ${buildTask}`,
        testCommand: `cd ${directory} && ${buildTool} test`,
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
        setupCommand: `cd ${directory} && dotnet restore`,
        devCommand: `cd ${directory} && dotnet run`,
        checkCommand: `cd ${directory} && dotnet build --no-restore`,
        testCommand: hasTesting ? `cd ${directory} && dotnet test` : null,
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

  const usedPorts = new Set([
    ...getGraphJavaScriptServicePorts(config),
    ...getGraphFrontendPorts(config).values(),
  ]);
  const httpConnections = connections.map((connection) => {
    const url = new URL(connection.serverUrl);
    const defaultPort = Number(url.port);
    let port = defaultPort;
    while (usedPorts.has(port)) port += 1;
    usedPorts.add(port);
    if (port === defaultPort) return connection;

    const serverUrl = `${url.protocol}//${url.hostname}:${port}`;
    const directory = shellDirectory(connection.targetPath, connection.ecosystem === "crystal");
    return {
      ...connection,
      serverUrl,
      healthUrl: `${serverUrl}${connection.healthPath}`,
      devCommand: connection.devCommand
        .replace(`cd ${directory} && `, `cd ${directory} && export PORT=${port} && `)
        .replace(`\${PORT:-${defaultPort}}`, `\${PORT:-${port}}`),
    };
  });

  return httpConnections.map((connection) => {
    const usesGrpc = (config.stackParts ?? []).some(
      (part) =>
        part.ownerPartId === connection.partId &&
        part.role === "api" &&
        part.source !== "provided" &&
        ((part.ecosystem === "go" && part.toolId === "grpc-go") ||
          (part.ecosystem === "rust" && part.toolId === "tonic") ||
          (part.ecosystem === "elixir" && part.toolId === "grpc") ||
          (part.ecosystem === "java" && part.toolId === "grpc")),
    );
    if (!usesGrpc) return connection;
    const grpcPortVariable = connection.ecosystem === "java" ? "GRPC_SERVER_PORT" : "GRPC_PORT";
    let grpcPort = connection.ecosystem === "java" ? 9090 : 50051;
    while (usedPorts.has(grpcPort)) grpcPort += 1;
    usedPorts.add(grpcPort);
    return {
      ...connection,
      devCommand: connection.devCommand.replace(
        `cd ${shellDirectory(connection.targetPath)} && `,
        `cd ${shellDirectory(connection.targetPath)} && export ${grpcPortVariable}=${grpcPort} && `,
      ),
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
