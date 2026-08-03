import type { ProjectConfig } from "@better-fullstack/types";

import type { VirtualFileSystem } from "../core/virtual-fs";

import { type TemplateData, processTemplatesFromPrefix } from "./utils";

export async function processObservabilityTemplates(
  vfs: VirtualFileSystem,
  templates: TemplateData,
  config: ProjectConfig,
): Promise<void> {
  if (!config.observability || config.observability === "none") return;
  if (config.backend === "convex") return;
  if (config.backend === "none") return;

  const targetDir = config.backend === "self" ? "apps/web" : "apps/server";

  // Process server-side observability templates (OpenTelemetry tracing setup)
  processTemplatesFromPrefix(
    vfs,
    templates,
    `observability/${config.observability}/server/base`,
    targetDir,
    config,
  );

  if (config.observability === "signoz") {
    activateSignozTracing(vfs, targetDir, config);
  }
}

function prependImport(vfs: VirtualFileSystem, filePath: string, importPath: string): boolean {
  const content = vfs.readFile(filePath);
  if (content === undefined) return false;

  const statement = `import "${importPath}";`;
  if (!content.includes(statement)) {
    vfs.writeFile(filePath, `${statement}\n${content}`);
  }
  return true;
}

function createNitroSignozPlugin(tracingImportPath: string): string {
  return `import type { Span } from "@opentelemetry/api";
import { propagation, SpanKind } from "@opentelemetry/api";
import { context, SpanStatusCode, trace } from "${tracingImportPath}";

const requestSpans = new WeakMap<object, Span>();
const tracer = trace.getTracer("nitro/http");
const headerGetter = {
  get(carrier: Record<string, string | string[] | undefined>, key: string) {
    const value = carrier[key.toLowerCase()];
    return Array.isArray(value) ? value[0] : value;
  },
  keys(carrier: Record<string, string | string[] | undefined>) {
    return Object.keys(carrier);
  },
};

function finishSpan(event: object, statusCode: number, error?: Error): void {
  const span = requestSpans.get(event);
  if (!span) return;
  requestSpans.delete(event);

  span.setAttribute("http.response.status_code", statusCode);
  if (error) {
    span.recordException(error);
    span.setStatus({ code: SpanStatusCode.ERROR });
  } else if (statusCode >= 500) {
    span.setStatus({ code: SpanStatusCode.ERROR });
  }
  span.end();
}

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("request", (event) => {
    const request = event.node.req;
    const url = new URL(request.url ?? "/", "http://localhost");
    const parentContext = propagation.extract(context.active(), request.headers, headerGetter);
    const span = tracer.startSpan(
      \`\${request.method ?? "GET"} \${url.pathname}\`,
      {
        kind: SpanKind.SERVER,
        attributes: {
          "http.request.method": request.method ?? "GET",
          "url.path": url.pathname,
        },
      },
      parentContext,
    );
    requestSpans.set(event, span);
  });

  nitroApp.hooks.hook("afterResponse", (event) => {
    finishSpan(event, event.node.res.statusCode);
  });

  nitroApp.hooks.hook("error", (error, errorContext) => {
    const event = errorContext.event;
    if (event) finishSpan(event, event.node.res.statusCode || 500, error);
  });
});
`;
}

function activateSignozTracing(
  vfs: VirtualFileSystem,
  targetDir: string,
  config: ProjectConfig,
): void {
  if (config.backend !== "self") {
    if (prependImport(vfs, `${targetDir}/src/index.ts`, "./lib/tracing")) return;
    if (prependImport(vfs, `${targetDir}/bin/server.ts`, "../src/lib/tracing")) return;

    if (config.backend === "nitro") {
      vfs.writeFile(
        `${targetDir}/plugins/signoz.ts`,
        createNitroSignozPlugin("../src/lib/tracing"),
      );
    }
    return;
  }

  if (config.frontend.includes("next") || config.frontend.includes("vinext")) {
    vfs.writeFile(
      `${targetDir}/src/instrumentation.ts`,
      'export async function register() {\n  if (process.env.NEXT_RUNTIME === "nodejs") {\n    await import("./lib/tracing");\n  }\n}\n',
    );
    return;
  }

  if (prependImport(vfs, `${targetDir}/src/entry-server.tsx`, "./lib/tracing")) return;

  if (config.frontend.includes("svelte")) {
    const hookPath = `${targetDir}/src/hooks.server.ts`;
    const content = vfs.readFile(hookPath) ?? "";
    const statement = 'import "./lib/tracing";';
    if (!content.includes(statement)) {
      vfs.writeFile(hookPath, `${statement}\n${content}`);
    }
    return;
  }

  if (config.frontend.includes("nuxt")) {
    vfs.writeFile(
      `${targetDir}/server/plugins/signoz.ts`,
      createNitroSignozPlugin("../../src/lib/tracing"),
    );
  }
}
