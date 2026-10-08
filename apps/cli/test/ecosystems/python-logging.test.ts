import {
  getVirtualFileContent as getFileContent,
  hasVirtualFile as hasFile,
  readVirtualFileContent,
} from "@test/support/virtual-tree-utils";
import { afterEach, describe, expect, it, spyOn } from "bun:test";
import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { validateConfigForProgrammaticUse, validateFullConfig } from "@/config/config-validation";
import { createVirtual } from "@/index";
import { createProjectOperation, planProjectOperation } from "@/operations/project-create";
import { buildProjectConfig } from "@/operations/stack-helpers";
import { runWithContext } from "@/presentation/context";
import * as navigable from "@/prompts/core/navigable";
import { gatherMultiEcosystemConfig } from "@/prompts/ecosystems/multi-ecosystem-composer";
import { resolvePythonLoggingPrompt } from "@/prompts/ecosystems/python-ecosystem";
import { getPythonLoggingIncompatibility, parseStackPartSpecs } from "@/types";

const STREAMLIT_REASON = getPythonLoggingIncompatibility("loguru", "streamlit") ?? "";

const FRAMEWORK_WIRING = [
  ["fastapi", ["app.add_middleware(RequestLoggingMiddleware)", "log_config=None"]],
  ["starlette", ["Middleware(RequestLoggingMiddleware)", "log_config=None"]],
  ["litestar", ["app.asgi_handler = RequestLoggingMiddleware(app.asgi_handler)"]],
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

const MULTI_SERVICE = ["backend:python:fastapi:api", "backend:python:streamlit:ui"];

function rejects(run: () => unknown) {
  expect(() => runWithContext({ silent: true }, run)).toThrow(STREAMLIT_REASON);
}

async function generatedFiles(overrides: Parameters<typeof createVirtual>[0], ...paths: string[]) {
  const result = await generatePython(overrides);
  expect(result.success).toBe(true);
  return paths.map((path) => readVirtualFileContent(result.tree!.root, path));
}

const originalTelemetry = process.env.BTS_TELEMETRY_DISABLED;
afterEach(() => {
  if (originalTelemetry === undefined) delete process.env.BTS_TELEMETRY_DISABLED;
  else process.env.BTS_TELEMETRY_DISABLED = originalTelemetry;
});

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

  it("keeps local variable values out of tracebacks in every format", async () => {
    const [loguru] = await generatedFiles(
      { pythonWebFramework: "fastapi", pythonLogging: "loguru" },
      "src/app/logging_config.py",
    );
    expect(loguru.match(/diagnose=False/g)).toHaveLength(2);

    const [structlog, pyproject] = await generatedFiles(
      { pythonWebFramework: "fastapi", pythonLogging: "structlog", pythonCli: ["rich"] },
      "src/app/logging_config.py",
      "pyproject.toml",
    );
    expect(pyproject).toContain('"rich>=');
    expect(structlog).toContain("exception_formatter=structlog.dev.plain_traceback");
    expect(structlog).toContain("ExceptionDictTransformer(show_locals=False)");
  });

  it("lets settings ignore .env keys that other libraries read", async () => {
    for (const pythonLogging of ["loguru", "none"] as const) {
      for (const pythonWebFramework of ["fastapi", "starlette"] as const) {
        const [settings, envExample] = await generatedFiles(
          { pythonWebFramework, pythonLogging },
          "src/app/settings.py",
          ".env.example",
        );
        expect(envExample).toContain("OPENAI_API_KEY=");
        expect(settings).not.toContain("openai_api_key");
        expect(settings).toContain('extra="ignore"');
      }
    }
  });

  it("configures logging again in each Gunicorn worker", async () => {
    const [gunicorn] = await generatedFiles(
      { pythonWebFramework: "fastapi", pythonServer: "gunicorn", pythonLogging: "structlog" },
      "gunicorn.conf.py",
    );
    expect(gunicorn).toContain("def post_fork(server: Any, worker: Any) -> None:");
    expect(gunicorn.slice(gunicorn.indexOf("def post_fork"))).toContain("configure_logging()");
  });

  it("makes LOG_LEVEL the threshold for every routed logger", async () => {
    for (const [pythonLogging, handler] of [
      ["loguru", "InterceptHandler(level)"],
      ["structlog", "_StdoutHandler(level)"],
    ] as const) {
      const [loggingModule] = await generatedFiles(
        { pythonWebFramework: "fastapi", pythonLogging },
        "src/app/logging_config.py",
      );
      expect(loggingModule).toContain("existing.setLevel(logging.NOTSET)");
      expect(loggingModule).toContain("max(logging.root.level, logging.WARNING)");
      expect(loggingModule).toContain(handler);
    }
  });

  it("documents dev commands that run the logging setup and states what it cannot format", async () => {
    for (const pythonWebFramework of ["fastapi", "flask"] as const) {
      const [withLogging] = await generatedFiles(
        { pythonWebFramework, pythonLogging: "loguru" },
        "README.md",
      );
      expect(withLogging).toContain("uv run python -m app.main`: Start");
      expect(withLogging).not.toContain("--app app.main run");
      expect(withLogging).toContain("## Logging");

      const [withoutLogging] = await generatedFiles({ pythonWebFramework }, "README.md");
      expect(withoutLogging).not.toContain("## Logging");
      expect(withoutLogging).not.toContain("uv run python -m app.main");
    }

    const [flask] = await generatedFiles(
      { pythonWebFramework: "flask", pythonLogging: "structlog" },
      "README.md",
    );
    expect(flask).toContain("`flask run` adds Werkzeug's own line for every request");
    const [litestar] = await generatedFiles(
      { pythonWebFramework: "litestar", pythonLogging: "structlog" },
      "README.md",
    );
    expect(litestar).toContain("the reload process prints its own startup lines");
  });

  it("logs unhandled errors inside the request context and returns the id", async () => {
    for (const pythonWebFramework of ["fastapi", "starlette", "litestar", "aiohttp"] as const) {
      for (const pythonLogging of ["loguru", "structlog"] as const) {
        const [loggingModule] = await generatedFiles(
          { pythonWebFramework, pythonLogging },
          "src/app/logging_config.py",
        );
        const handled = loggingModule.slice(
          loggingModule.indexOf("with request_context(request_id):"),
        );
        expect(handled).toContain('logger.exception("Unhandled error")');
        expect(handled).toContain(
          pythonWebFramework === "aiohttp"
            ? "headers={REQUEST_ID_HEADER: request_id}"
            : "await send_with_request_id(",
        );
      }
    }
  });

  it("lets aiohttp close a streamed response that fails instead of appending a 500", async () => {
    for (const pythonLogging of ["loguru", "structlog"] as const) {
      const [loggingModule] = await generatedFiles(
        { pythonWebFramework: "aiohttp", pythonLogging },
        "src/app/logging_config.py",
      );
      const handled = loggingModule.slice(loggingModule.indexOf("except Exception:"));
      expect(handled).toContain(
        "if request.writer.output_size:\n                raise\n            return web.Response(",
      );
    }
  });

  it("keeps the Flask request context open until the response body is closed", async () => {
    const [loggingModule] = await generatedFiles(
      { pythonWebFramework: "flask", pythonLogging: "loguru" },
      "src/app/logging_config.py",
    );
    const middleware = loggingModule.slice(loggingModule.indexOf("class RequestLoggingMiddleware"));
    expect(middleware).toContain(") -> Generator[bytes, None, None]:");
    expect(middleware).toContain("yield from body");
    expect(middleware).not.toContain("return self.app(environ");
  });

  it("logs Django error responses inside the request context", async () => {
    const [loggingModule] = await generatedFiles(
      { pythonWebFramework: "django", pythonLogging: "structlog" },
      "src/app/logging_config.py",
    );
    expect(loggingModule).toContain("from django.utils.log import log_response");
    expect(loggingModule).toContain("if response.status_code >= 400:");
  });

  it("puts request logging outside CORS and other app wrappers", async () => {
    const [starlette] = await generatedFiles(
      { pythonWebFramework: "starlette", pythonLogging: "loguru" },
      "src/app/main.py",
    );
    expect(starlette.indexOf("Middleware(RequestLoggingMiddleware)")).toBeLessThan(
      starlette.indexOf("CORSMiddleware,"),
    );

    const [fastapi] = await generatedFiles(
      { pythonWebFramework: "fastapi", pythonLogging: "loguru" },
      "src/app/main.py",
    );
    // FastAPI runs the middleware added last outermost.
    expect(fastapi.indexOf("app.add_middleware(RequestLoggingMiddleware)")).toBeGreaterThan(
      fastapi.indexOf("CORSMiddleware,"),
    );

    const [django] = await generatedFiles(
      { pythonWebFramework: "django", pythonLogging: "loguru" },
      "src/app/main.py",
    );
    expect(django.indexOf('"app.logging_config.request_logging_middleware"')).toBeLessThan(
      django.indexOf('"corsheaders.middleware.CorsMiddleware"'),
    );

    const [flask] = await generatedFiles(
      { pythonWebFramework: "flask", pythonLogging: "structlog", pythonGraphql: "ariadne" },
      "src/app/main.py",
    );
    expect(flask.indexOf("RequestLoggingMiddleware(app.wsgi_app)")).toBeGreaterThan(
      flask.indexOf("DispatcherMiddleware(app.wsgi_app"),
    );
  });

  it("leaves projects without a logging selection unchanged", async () => {
    const result = await generatePython({
      pythonWebFramework: "fastapi",
      pythonServer: "gunicorn",
    });

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

  it("rejects Streamlit with an explicit logging selection on every input path", async () => {
    expect(STREAMLIT_REASON).toContain("Streamlit");
    const flatInputs = [
      { pythonWebFramework: "streamlit", pythonLogging: "loguru" },
      { pythonWebFramework: "streamlit", pythonLogging: "structlog" },
    ] as const;
    const graphInput = {
      ecosystem: "python",
      part: ["backend:python:streamlit", "backend.logging:python:loguru"],
    } as const;

    rejects(() =>
      validateFullConfig(
        { ecosystem: "python", ...flatInputs[0] },
        new Set(["ecosystem", "pythonWebFramework", "pythonLogging"]),
        {} as never,
      ),
    );
    for (const input of flatInputs) {
      const result = await generatePython(input);
      expect(result.success).toBe(false);
      expect(result.error).toContain(STREAMLIT_REASON);
    }
    for (const [ecosystem, part] of [
      ["python", graphInput.part],
      ["typescript", ["frontend:typescript:react-vite", ...graphInput.part]],
    ] as const) {
      const graphOnly = await createVirtual({
        projectName: "python-logging-streamlit",
        ecosystem,
        stackParts: parseStackPartSpecs([...part]),
      });
      expect(graphOnly.success).toBe(false);
      expect(graphOnly.error).toContain(STREAMLIT_REASON);
    }

    for (const input of [{ ecosystem: "python", ...flatInputs[1] }, graphInput]) {
      await expect(planProjectOperation.invoke(input)).rejects.toThrow(STREAMLIT_REASON);
    }
    process.env.BTS_TELEMETRY_DISABLED = "1";
    const targetDir = await mkdtemp(join(tmpdir(), "bfs-python-logging-"));
    try {
      await expect(
        createProjectOperation.invoke({
          ...graphInput,
          projectName: "streamlit-logging",
          targetDir,
        }),
      ).rejects.toThrow(STREAMLIT_REASON);
    } finally {
      await rm(targetDir, { recursive: true, force: true });
    }
  });

  it("checks each logging part against the backend service that owns it", async () => {
    const onStreamlit = parseStackPartSpecs([...MULTI_SERVICE, "ui.logging:python:loguru"]);
    const onFastapi = parseStackPartSpecs([...MULTI_SERVICE, "api.logging:python:loguru"]);

    rejects(() =>
      validateConfigForProgrammaticUse({ ecosystem: "python", stackParts: onStreamlit }),
    );
    expect(() =>
      runWithContext({ silent: true }, () =>
        validateConfigForProgrammaticUse({ ecosystem: "python", stackParts: onFastapi }),
      ),
    ).not.toThrow();

    const rejected = await createVirtual({
      projectName: "python-logging-ui",
      ecosystem: "python",
      stackParts: onStreamlit,
    });
    expect(rejected.success).toBe(false);
    expect(rejected.error).toContain(STREAMLIT_REASON);
    const accepted = await createVirtual({
      projectName: "python-logging-api",
      ecosystem: "python",
      stackParts: onFastapi,
    });
    expect(accepted.success).toBe(true);
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

  it("rejects an explicit logging choice in a multi-ecosystem project without a Python service", async () => {
    const select = navigable.navigableSelect;
    const backendPrompt = spyOn(navigable, "navigableSelect").mockImplementation(async (opts) =>
      opts.message === "Select backend ecosystem" ? "python" : select(opts),
    );
    const compose = (flags: Parameters<typeof gatherMultiEcosystemConfig>[0]) =>
      runWithContext({ silent: true }, () =>
        gatherMultiEcosystemConfig(
          flags,
          "python-logging",
          "/tmp/python-logging",
          "python-logging",
        ),
      );

    try {
      await expect(
        compose({ pythonWebFramework: "none", pythonLogging: "loguru" }),
      ).rejects.toThrow("--python-logging loguru needs a Python web framework");
      expect(
        (await compose({ pythonWebFramework: "none", pythonLogging: "none" })).pythonLogging,
      ).toBe("none");
      expect(
        (await compose({ pythonWebFramework: "fastapi", pythonLogging: "structlog" }))
          .pythonLogging,
      ).toBe("structlog");
    } finally {
      backendPrompt.mockRestore();
    }
  });
});
