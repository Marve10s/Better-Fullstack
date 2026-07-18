import type { FileSystemTree, WebContainer, WebContainerProcess } from "@webcontainer/api";

import type { RunnableSourceFile } from "@/lib/project-runner";

const PROJECT_DIRECTORY = "project";
const noop = () => {};
const ANSI_CSI_SEQUENCE = new RegExp(String.raw`(?:\x1B\[|\x9B)[0-?]*[ -/]*[@-~]`, "g");
const ANSI_OSC_SEQUENCE = new RegExp(String.raw`\x1B\][^\x07]*(?:\x07|\x1B\\)`, "g");

let runtimePromise: Promise<WebContainer> | null = null;
let activeServerProcess: WebContainerProcess | null = null;
let activeInstallProcess: WebContainerProcess | null = null;

export function normalizeRuntimeOutput(chunk: string): string {
  return chunk
    .replace(ANSI_OSC_SEQUENCE, "")
    .replace(ANSI_CSI_SEQUENCE, "")
    .replaceAll("\r\n", "\n")
    .replaceAll("\r", "\n");
}

export function canBootBrowserRuntime(): boolean {
  return window.crossOriginIsolated && typeof window.SharedArrayBuffer !== "undefined";
}

export async function getBrowserRuntime(): Promise<WebContainer> {
  if (!runtimePromise) {
    runtimePromise = import("@webcontainer/api")
      .then(({ WebContainer }) =>
        WebContainer.boot({
          coep: "credentialless",
          forwardPreviewErrors: "exceptions-only",
          workdirName: "better-fullstack",
        }),
      )
      .catch((error) => {
        runtimePromise = null;
        throw error;
      });
  }

  return runtimePromise;
}

export async function mountRunnableProject(
  runtime: WebContainer,
  files: FileSystemTree,
): Promise<void> {
  stopDevelopmentServer();
  await runtime.fs.rm(PROJECT_DIRECTORY, { force: true, recursive: true });
  await runtime.fs.mkdir(PROJECT_DIRECTORY, { recursive: true });
  await runtime.mount(files, { mountPoint: PROJECT_DIRECTORY });
}

async function pipeOutput(
  process: WebContainerProcess,
  onOutput: (chunk: string) => void,
): Promise<void> {
  await process.output.pipeTo(
    new WritableStream({
      write(chunk) {
        onOutput(normalizeRuntimeOutput(chunk));
      },
    }),
  );
}

export async function installRunnableProject(
  runtime: WebContainer,
  onOutput: (chunk: string) => void,
  workspace: string | null = null,
): Promise<void> {
  const workspaceArguments = workspace
    ? [`--workspace=${workspace}`, "--include-workspace-root=false"]
    : [];
  const process = await runtime.spawn(
    "npm",
    [
      "install",
      ...workspaceArguments,
      "--no-audit",
      "--no-fund",
      "--prefer-offline",
      "--progress=false",
    ],
    { cwd: PROJECT_DIRECTORY },
  );
  activeInstallProcess = process;
  const output = pipeOutput(process, onOutput);
  const exitCode = await process.exit.finally(() => {
    if (activeInstallProcess === process) activeInstallProcess = null;
  });
  await output;

  if (exitCode !== 0) {
    throw new Error(`Dependency installation exited with code ${exitCode}.`);
  }
}

export async function syncRunnableSourceFiles(
  runtime: WebContainer,
  files: RunnableSourceFile[],
): Promise<void> {
  await Promise.all(
    files
      .filter((file) => file.editable)
      .map((file) => runtime.fs.writeFile(`${PROJECT_DIRECTORY}/${file.path}`, file.content)),
  );
}

export async function startDevelopmentServer(
  runtime: WebContainer,
  script: "dev:web" | "dev",
  workspace: string | null,
  onOutput: (chunk: string) => void,
  onExit: (exitCode: number) => void,
): Promise<string> {
  stopDevelopmentServer();

  const workspaceArguments = workspace ? [`--workspace=${workspace}`] : [];
  activeServerProcess = await runtime.spawn("npm", ["run", script, ...workspaceArguments], {
    cwd: PROJECT_DIRECTORY,
    env: {
      BROWSER: "none",
      CI: "true",
    },
  });
  const process = activeServerProcess;
  void pipeOutput(process, onOutput).catch(() => undefined);

  return new Promise<string>((resolve, reject) => {
    let settled = false;
    let unsubscribe = noop;

    const timeoutId = setTimeout(() => {
      if (settled) return;
      settled = true;
      unsubscribe();
      process.kill();
      reject(new Error("The development server did not become ready in time."));
    }, 120_000);

    unsubscribe = runtime.on("server-ready", (_port, url) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      unsubscribe();
      resolve(url);
    });

    void process.exit.then((exitCode) => {
      if (!settled) {
        settled = true;
        clearTimeout(timeoutId);
        unsubscribe();
        reject(new Error(`The development server exited with code ${exitCode}.`));
        return undefined;
      }
      onExit(exitCode);
      return undefined;
    });
  });
}

export function stopDevelopmentServer(): void {
  activeInstallProcess?.kill();
  activeInstallProcess = null;
  activeServerProcess?.kill();
  activeServerProcess = null;
}
