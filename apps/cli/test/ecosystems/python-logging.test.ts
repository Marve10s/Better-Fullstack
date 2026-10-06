import { describe, expect, it } from "bun:test";

import { createVirtual } from "@/index";
import {
  validateConfigForProgrammaticUse,
  validateFullConfig,
} from "@/config/config-validation";
import { buildProjectConfig } from "@/operations/stack-helpers";
import { runWithContext } from "@/presentation/context";
import { resolvePythonLoggingPrompt } from "@/prompts/ecosystems/python-ecosystem";
import { getPythonLoggingIncompatibility, parseStackPartSpecs } from "@/types";
import {
  getVirtualFileContent as getFileContent,
  hasVirtualFile as hasFile,
} from "@test/support/virtual-tree-utils";

const STREAMLIT_REASON = getPythonLoggingIncompatibility("loguru", "streamlit") ?? "";

const FRAMEWORK_WIRING = [
  ["fastapi", ["app.add_middleware(RequestLoggingMiddleware)", "log_config=None"]],
  ["starlette", ["Middleware(RequestLoggingMiddleware)", "log_config=None"]],
  ["litestar", ["middleware=[RequestLoggingMiddleware]"]],
  [
    "flask",
    [
      "app.wsgi_app = RequestLoggingMiddleware(app.wsgi_app)",
      "request_handler=DevServerRequestHandler",
    ],
  ],
  ["django", ['"app.logging_config.request_logging_middleware"', "LOGGING_CONFIG=None"]],
  ["aiohttp", ["web.Application(middlewares=[request_logging_middleware])"]],
  ["none", []],
] as const;

function generatePython(overrides: Parameters<typeof createVirtual>[0]) {
  return createVirtual({
    projectName: "python-logging",
    ecosystem: "python",
    pythonOrm: "none",
    pythonValidation: "pydantic",
    ...overrides,
  });
}

function rejects(run: () => unknown) {
  expect(() => runWithContext({ silent: true }, run)).toThrow(STREAMLIT_REASON);
}

describe("Python logging", () => {
  for (const pythonLogging of ["loguru", "structlog"] as const) {
    for (const [pythonWebFramework, wiring] of FRAMEWORK_WIRING) {
      it(`configures ${pythonLogging} at startup for ${pythonWebFramework}`, async () => {
        const result = await generatePython({ pythonWebFramework, pythonLogging });

        expect(result.success).toBe(true);
        const root = result.tree!.root;
        const loggingModule = getFileContent(root, "src/app/logging_config.py");
        const main = getFileContent(root, "src/app/main.py");

        expect(loggingModule).toContain("def configure_logging() -> None:");
        expect(loggingModule).toContain(
          pythonLogging === "loguru" ? "class InterceptHandler" : "ProcessorFormatter(",
        );
        expect(main).toContain("from app.logging_config import");
        expect(main).toContain("\nconfigure_logging()\n");
        for (const line of wiring) expect(main).toContain(line);
        expect(getFileContent(root, "pyproject.toml")).toContain(`"${pythonLogging}>=`);
        expect(getFileContent(root, "src/app/settings.py")).toContain(
          'log_format: Literal["auto", "json", "console"] = "auto"',
        );
        expect(getFileContent(root, ".env.example")).toContain("LOG_FORMAT=auto");
      });
    }
  }

  it("reads logging settings from the environment without pydantic settings", async () => {
    const result = await generatePython({
      pythonWebFramework: "fastapi",
      pythonValidation: "none",
      pythonLogging: "structlog",
    });

    expect(result.success).toBe(true);
    const loggingModule = getFileContent(result.tree!.root, "src/app/logging_config.py");
    expect(loggingModule).toContain('os.getenv("LOG_FORMAT", "auto")');
    expect(loggingModule).not.toContain("get_settings");
  });

  it("adds trace ids when OpenTelemetry is also selected", async () => {
    for (const pythonLogging of ["loguru", "structlog"] as const) {
      const result = await generatePython({
        pythonWebFramework: "fastapi",
        pythonObservability: "signoz",
        pythonLogging,
      });
      expect(result.success).toBe(true);
      const loggingModule = getFileContent(result.tree!.root, "src/app/logging_config.py");
      expect(loggingModule).toContain("trace.get_current_span().get_span_context()");
    }
  });

  it("routes Gunicorn and the Litestar container command through the logging setup", async () => {
    const gunicorn = await generatePython({
      pythonWebFramework: "flask",
      pythonServer: "gunicorn",
      pythonLogging: "loguru",
    });
    expect(gunicorn.success).toBe(true);
    expect(getFileContent(gunicorn.tree!.root, "gunicorn.conf.py")).toContain(
      "logger_class = AppLogger",
    );

    const litestar = await generatePython({
      pythonWebFramework: "litestar",
      pythonLogging: "structlog",
      addons: ["docker-compose"],
    });
    expect(litestar.success).toBe(true);
    expect(getFileContent(litestar.tree!.root, "Dockerfile")).toContain(
      'CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]',
    );
  });

  it("leaves projects without a logging selection unchanged", async () => {
    const result = await generatePython({ pythonWebFramework: "fastapi", pythonServer: "gunicorn" });

    expect(result.success).toBe(true);
    const root = result.tree!.root;
    expect(hasFile(root, "src/app/logging_config.py")).toBe(false);
    expect(hasFile(root, "gunicorn.conf.py")).toBe(false);
    expect(getFileContent(root, "src/app/main.py")).not.toContain("configure_logging");
    expect(getFileContent(root, "src/app/settings.py")).not.toContain("log_level");
    expect(getFileContent(root, "pyproject.toml")).not.toMatch(/loguru|structlog/);
  });

  it("generates the graph selection and lets it win over a stale flat value", async () => {
    const graphOnly = await createVirtual({
      projectName: "python-logging-graph",
      ecosystem: "python",
      stackParts: parseStackPartSpecs([
        "backend:python:fastapi",
        "backend.logging:python:structlog",
      ]),
    });
    expect(graphOnly.success).toBe(true);
    expect(getFileContent(graphOnly.tree!.root, "apps/server/src/app/logging_config.py")).toContain(
      "import structlog",
    );

    const staleFlat = await createVirtual({
      projectName: "python-logging-stale",
      ecosystem: "python",
      pythonLogging: "loguru",
      stackParts: parseStackPartSpecs([
        "backend:python:fastapi",
        "backend.logging:python:structlog",
      ]),
    });
    expect(staleFlat.success).toBe(true);
    const loggingModule = getFileContent(
      staleFlat.tree!.root,
      "apps/server/src/app/logging_config.py",
    );
    expect(loggingModule).toContain("import structlog");
    expect(loggingModule).not.toContain("loguru");
  });

  it("selects the option from flags, graph parts, and MCP input", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateFullConfig(
          { ecosystem: "python", pythonWebFramework: "django", pythonLogging: "loguru" },
          new Set(["ecosystem", "pythonWebFramework", "pythonLogging"]),
          {} as never,
        ),
      ),
    ).not.toThrow();

    expect(
      buildProjectConfig({
        ecosystem: "python",
        pythonWebFramework: "flask",
        pythonLogging: "loguru",
      }).pythonLogging,
    ).toBe("loguru");
    expect(
      buildProjectConfig({
        ecosystem: "python",
        part: ["backend:python:fastapi", "backend.logging:python:structlog"],
      }).pythonLogging,
    ).toBe("structlog");
  });

  it("rejects Streamlit with an explicit logging selection on every input path", () => {
    expect(STREAMLIT_REASON).toContain("Streamlit");

    rejects(() =>
      validateFullConfig(
        { ecosystem: "python", pythonWebFramework: "streamlit", pythonLogging: "loguru" },
        new Set(["ecosystem", "pythonWebFramework", "pythonLogging"]),
        {} as never,
      ),
    );
    rejects(() =>
      validateConfigForProgrammaticUse({
        ecosystem: "python",
        pythonWebFramework: "streamlit",
        pythonLogging: "structlog",
      }),
    );
    rejects(() =>
      validateConfigForProgrammaticUse({
        ecosystem: "typescript",
        stackParts: parseStackPartSpecs([
          "frontend:typescript:react-vite",
          "backend:python:streamlit",
          "backend.logging:python:loguru",
        ]),
      }),
    );
    rejects(() =>
      buildProjectConfig({
        ecosystem: "python",
        pythonWebFramework: "streamlit",
        pythonLogging: "loguru",
      }),
    );
    rejects(() =>
      buildProjectConfig({
        ecosystem: "python",
        part: ["backend:python:streamlit", "backend.logging:python:structlog"],
      }),
    );
  });

  it("validates the graph instead of a stale flat logging value", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateConfigForProgrammaticUse({
          ecosystem: "python",
          pythonWebFramework: "fastapi",
          pythonLogging: "loguru",
          stackParts: parseStackPartSpecs(["backend:python:streamlit"]),
        }),
      ),
    ).not.toThrow();
  });

  it("does not fail interactive partial flags before the framework is chosen", () => {
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateFullConfig(
          { ecosystem: "python", pythonLogging: "loguru" },
          new Set(["ecosystem", "pythonLogging"]),
          {} as never,
          true,
        ),
      ),
    ).not.toThrow();

    const streamlitPrompt = resolvePythonLoggingPrompt(undefined, "streamlit");
    expect(streamlitPrompt.shouldPrompt).toBe(false);
    expect(streamlitPrompt.autoValue).toBe("none");
    expect(resolvePythonLoggingPrompt("loguru", "streamlit").autoValue).toBe("loguru");
    expect(resolvePythonLoggingPrompt(undefined, "fastapi").shouldPrompt).toBe(true);
  });
});
