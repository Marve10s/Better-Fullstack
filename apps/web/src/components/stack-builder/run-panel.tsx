import {
  AlertTriangle,
  CircleStop,
  ExternalLink,
  FileCode2,
  Loader2,
  Play,
  RefreshCw,
  RotateCcw,
  Save,
  TerminalSquare,
  Undo2,
} from "lucide-react";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

import type { StackState } from "@/lib/stack-defaults";

import {
  createRunnableProject,
  getDefaultRunnableFile,
  hasDependencyManifestChanges,
  type RunnableProject,
  type RunnableSourceFile,
} from "@/lib/project-runner";
import { getStackRunSupport } from "@/lib/run-support";
import { cn } from "@/lib/utils";
import * as m from "@/paraglide/messages";

import { FileExplorer, type VirtualFile } from "./file-explorer";

type RunStatus =
  | "idle"
  | "generating"
  | "booting"
  | "installing"
  | "starting"
  | "ready"
  | "stopped"
  | "error";

interface RunPanelProps {
  stack: StackState;
  selectedFilePath: string | null;
  onSelectFile: (filePath: string | null) => void;
}

const MAX_LOG_LENGTH = 60_000;

function statusLabel(status: RunStatus): string {
  switch (status) {
    case "generating":
      return m.builderRunGenerating();
    case "booting":
      return m.builderRunBooting();
    case "installing":
      return m.builderRunInstalling();
    case "starting":
      return m.builderRunStartingServer();
    case "ready":
      return m.builderRunReady();
    case "stopped":
      return m.builderRunStopped();
    case "error":
      return m.builderRunFailed();
    default:
      return m.builderRunIdle();
  }
}

function isBusy(status: RunStatus): boolean {
  return ["generating", "booting", "installing", "starting"].includes(status);
}

function contentsByPath(files: RunnableSourceFile[]): Record<string, string> {
  return Object.fromEntries(files.map((file) => [file.path, file.content]));
}

function errorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  if (typeof error === "string") return error;
  if (error && typeof error === "object" && "message" in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === "string") return message;
  }
  return m.builderRunFailed();
}

export function RunPanel({ stack, selectedFilePath, onSelectFile }: RunPanelProps) {
  const support = useMemo(() => getStackRunSupport(stack), [stack]);
  const stackSignature = JSON.stringify(stack);
  const [status, setStatus] = useState<RunStatus>(support.supported ? "generating" : "idle");
  const [project, setProject] = useState<RunnableProject | null>(null);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [syncedContents, setSyncedContents] = useState<Record<string, string>>({});
  const [logs, setLogs] = useState("");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [browserUnsupported, setBrowserUnsupported] = useState(false);
  const runIdRef = useRef(0);
  const runtimeMountedRef = useRef(false);
  const dependenciesInstalledRef = useRef(false);
  const consoleRef = useRef<HTMLPreElement>(null);
  const selectedFilePathRef = useRef(selectedFilePath);
  const onSelectFileRef = useRef(onSelectFile);
  selectedFilePathRef.current = selectedFilePath;
  onSelectFileRef.current = onSelectFile;

  const prepareWorkspace = useCallback(async () => {
    if (!support.supported) return;

    const stackToRun = JSON.parse(stackSignature) as StackState;

    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    runtimeMountedRef.current = false;
    dependenciesInstalledRef.current = false;
    setStatus("generating");
    setProject(null);
    setDrafts({});
    setSyncedContents({});
    setLogs("");
    setPreviewUrl(null);
    setError(null);
    setBrowserUnsupported(false);

    try {
      const nextProject = await createRunnableProject(stackToRun);
      if (runIdRef.current !== runId) return;

      const initialContents = contentsByPath(nextProject.sourceFiles);
      const requestedFile = nextProject.sourceFiles.find(
        (file) => file.path === selectedFilePathRef.current,
      );
      const initialFile = requestedFile ?? getDefaultRunnableFile(nextProject.sourceFiles);

      setProject(nextProject);
      setDrafts(initialContents);
      setSyncedContents(initialContents);
      onSelectFileRef.current(initialFile?.path ?? null);
      setStatus("idle");
    } catch (generationError) {
      if (runIdRef.current !== runId) return;
      setError(errorMessage(generationError));
      setStatus("error");
    }
  }, [stackSignature, support.supported]);

  useEffect(() => {
    void import("@/lib/webcontainer-runtime").then(({ stopDevelopmentServer }) => {
      stopDevelopmentServer();
      return undefined;
    });
    void prepareWorkspace();

    return () => {
      runIdRef.current += 1;
      runtimeMountedRef.current = false;
      dependenciesInstalledRef.current = false;
      void import("@/lib/webcontainer-runtime").then(({ stopDevelopmentServer }) => {
        stopDevelopmentServer();
        return undefined;
      });
    };
  }, [prepareWorkspace]);

  useEffect(() => {
    const consoleElement = consoleRef.current;
    if (consoleElement) consoleElement.scrollTop = consoleElement.scrollHeight;
  }, [logs]);

  const currentFiles = useMemo(
    () =>
      project?.sourceFiles.map((file) => ({
        ...file,
        content: drafts[file.path] ?? file.content,
      })) ?? [],
    [drafts, project],
  );
  const dirtyFiles = currentFiles.filter(
    (file) => file.editable && file.content !== syncedContents[file.path],
  );
  const selectedFile = currentFiles.find((file) => file.path === selectedFilePath) ?? null;
  const busy = isBusy(status);

  const appendOutput = (chunk: string) => {
    setLogs((current) => `${current}${chunk}`.slice(-MAX_LOG_LENGTH));
  };

  const runProject = async () => {
    if (!support.supported || !project || busy) return;

    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    setLogs("");
    setPreviewUrl(null);
    setError(null);
    setBrowserUnsupported(false);

    const ensureCurrentRun = () => {
      if (runIdRef.current !== runId) throw new Error("Run cancelled");
    };

    try {
      const runtimeModule = await import("@/lib/webcontainer-runtime");
      if (!runtimeModule.canBootBrowserRuntime()) {
        setBrowserUnsupported(true);
        setStatus("error");
        return;
      }

      setStatus("booting");
      const runtime = await runtimeModule.getBrowserRuntime();
      ensureCurrentRun();

      if (!runtimeMountedRef.current) {
        await runtimeModule.mountRunnableProject(runtime, project.files);
        runtimeMountedRef.current = true;
      } else {
        runtimeModule.stopDevelopmentServer();
        await runtimeModule.syncRunnableSourceFiles(runtime, currentFiles);
      }
      ensureCurrentRun();

      const dependenciesChanged = hasDependencyManifestChanges(currentFiles, syncedContents);
      if (!dependenciesInstalledRef.current || dependenciesChanged) {
        dependenciesInstalledRef.current = false;
        setStatus("installing");
        await runtimeModule.installRunnableProject(runtime, appendOutput, project.workspace);
        dependenciesInstalledRef.current = true;
        ensureCurrentRun();
      }

      setStatus("starting");
      const url = await runtimeModule.startDevelopmentServer(
        runtime,
        project.script,
        project.workspace,
        appendOutput,
        (exitCode) => {
          if (runIdRef.current !== runId) return;
          setPreviewUrl(null);
          setError(`Development server exited with code ${exitCode}.`);
          setStatus("error");
        },
      );
      ensureCurrentRun();
      setSyncedContents(contentsByPath(currentFiles));
      setPreviewUrl(url);
      setStatus("ready");
    } catch (runError) {
      if (runIdRef.current !== runId) return;
      setError(errorMessage(runError));
      setStatus("error");
    }
  };

  const stopProject = async () => {
    runIdRef.current += 1;
    const { stopDevelopmentServer } = await import("@/lib/webcontainer-runtime");
    stopDevelopmentServer();
    setPreviewUrl(null);
    setStatus("stopped");
  };

  const discardChanges = () => {
    setDrafts((current) => ({ ...current, ...syncedContents }));
  };

  const handleSelectFile = (file: VirtualFile) => {
    onSelectFile(file.path);
  };

  const handleEditorKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Tab" || !selectedFile?.editable) return;
    event.preventDefault();
    const target = event.currentTarget;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    const nextContent = `${target.value.slice(0, start)}  ${target.value.slice(end)}`;
    setDrafts((current) => ({ ...current, [selectedFile.path]: nextContent }));
    requestAnimationFrame(() => target.setSelectionRange(start + 2, start + 2));
  };

  const unsupported = !support.supported || browserUnsupported;

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-fd-background">
      <div className="flex min-h-11 shrink-0 items-center gap-3 border-b border-border/70 px-3 sm:px-4">
        <span
          className={cn(
            "size-2 rounded-full bg-muted-foreground/45",
            busy && "animate-pulse bg-amber-400",
            status === "ready" &&
              "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.55)]",
            status === "error" && "bg-destructive",
          )}
          aria-hidden
        />
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
          {statusLabel(status)}
        </span>
        {dirtyFiles.length > 0 ? (
          <span className="rounded-full bg-amber-400/12 px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-amber-600 dark:text-amber-400">
            {m.builderRunUnsavedChanges({ count: dirtyFiles.length })}
          </span>
        ) : (
          <span className="hidden text-[11px] text-muted-foreground/65 md:inline">
            {m.builderRunLocalNotice()}
          </span>
        )}

        <div className="ml-auto flex items-center gap-1.5">
          {dirtyFiles.length > 0 && (
            <button
              type="button"
              onClick={discardChanges}
              disabled={busy}
              className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
            >
              <Undo2 className="size-3" aria-hidden />
              <span className="hidden sm:inline">{m.builderRunDiscardChanges()}</span>
            </button>
          )}
          {previewUrl && (
            <button
              type="button"
              onClick={() => window.open(previewUrl, "_blank", "noopener,noreferrer")}
              className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2 text-[11px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <ExternalLink className="size-3" aria-hidden />
              <span className="hidden sm:inline">{m.builderRunOpenPreview()}</span>
            </button>
          )}
          {(status === "ready" || busy) && (
            <button
              type="button"
              onClick={stopProject}
              className="inline-flex h-7 cursor-pointer items-center gap-1.5 rounded-md px-2 text-[11px] text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
            >
              <CircleStop className="size-3" aria-hidden />
              {m.builderRunStop()}
            </button>
          )}
          {project && !busy && !browserUnsupported && (
            <button
              type="button"
              data-testid="run-project-button"
              onClick={runProject}
              className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-md bg-foreground px-3 text-[11px] font-semibold text-background shadow-sm transition-transform hover:-translate-y-0.5"
            >
              {dirtyFiles.length > 0 ? (
                <Save className="size-3" aria-hidden />
              ) : status === "idle" ? (
                <Play className="size-3 fill-current" aria-hidden />
              ) : (
                <RefreshCw className="size-3" aria-hidden />
              )}
              {dirtyFiles.length > 0
                ? m.builderRunSaveRerun()
                : status === "idle"
                  ? m.builderRunStart()
                  : m.builderRunRestart()}
            </button>
          )}
        </div>
      </div>

      {!project ? (
        <div className="flex min-h-0 flex-1 items-center justify-center bg-[radial-gradient(circle_at_50%_25%,color-mix(in_oklab,var(--color-muted)_55%,transparent),transparent_55%)] p-6">
          <div className="max-w-md text-center">
            <div
              className={cn(
                "mx-auto mb-5 flex size-16 items-center justify-center rounded-2xl border border-border/70 bg-background shadow-[0_16px_50px_rgba(0,0,0,0.08)]",
                busy && "border-amber-400/40",
              )}
            >
              {busy ? (
                <Loader2 className="size-6 animate-spin text-amber-500" />
              ) : (
                <AlertTriangle className="size-6 text-amber-500" />
              )}
            </div>
            <h2 className="text-base font-semibold text-foreground">
              {!support.supported
                ? m.builderRunUnsupportedTitle()
                : browserUnsupported
                  ? m.builderRunBrowserUnsupportedTitle()
                  : error || m.builderRunGenerating()}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {!support.supported
                ? m.builderRunUnsupportedDescription()
                : browserUnsupported
                  ? m.builderRunBrowserUnsupportedDescription()
                  : error || m.builderRunDescription()}
            </p>
            {error && support.supported && (
              <button
                type="button"
                onClick={prepareWorkspace}
                className="mt-5 inline-flex h-9 cursor-pointer items-center gap-2 rounded-lg bg-foreground px-4 text-xs font-semibold text-background"
              >
                <RefreshCw className="size-3.5" aria-hidden />
                {m.builderRunRestart()}
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-auto lg:grid-cols-[13rem_minmax(20rem,1fr)_minmax(20rem,1fr)] lg:overflow-hidden">
          <section className="flex min-h-56 min-w-0 flex-col border-b border-border/70 bg-muted/10 lg:min-h-0 lg:border-r lg:border-b-0">
            <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border/60 px-3">
              <FileCode2 className="size-3.5 text-muted-foreground" aria-hidden />
              <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {m.builderRunWorkspace()}
              </span>
              <span className="ml-auto font-mono text-[9px] text-muted-foreground/60">
                {project.sourceFiles.length}
              </span>
            </div>
            <div className="min-h-0 flex-1 overflow-hidden">
              <FileExplorer
                root={project.tree}
                selectedPath={selectedFilePath}
                onSelectFile={handleSelectFile}
              />
            </div>
          </section>

          <section className="flex min-h-[28rem] min-w-0 flex-col border-b border-border/70 lg:min-h-0 lg:border-r lg:border-b-0">
            <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border/60 bg-muted/15 px-3">
              <span className="min-w-0 truncate font-mono text-[10px] text-muted-foreground">
                {selectedFile?.path ?? m.builderRunSelectFile()}
              </span>
              {selectedFile &&
                selectedFile.editable &&
                selectedFile.content !== syncedContents[selectedFile.path] && (
                  <span className="ml-auto size-2 shrink-0 rounded-full bg-amber-400" aria-hidden />
                )}
            </div>
            <div className="relative min-h-0 flex-1 bg-[#0d0d0f]">
              {selectedFile?.editable ? (
                <textarea
                  data-testid="run-code-editor"
                  aria-label={`${m.builderRunEditor()}: ${selectedFile.path}`}
                  value={selectedFile.content}
                  onChange={(event) =>
                    setDrafts((current) => ({
                      ...current,
                      [selectedFile.path]: event.target.value,
                    }))
                  }
                  onKeyDown={handleEditorKeyDown}
                  spellCheck={false}
                  className="h-full w-full resize-none border-0 bg-transparent p-4 font-mono text-[12px] leading-6 text-zinc-200 caret-emerald-400 outline-none selection:bg-emerald-400/25"
                />
              ) : selectedFile ? (
                <div className="flex h-full items-center justify-center p-6 text-center text-sm text-zinc-500">
                  {m.builderRunBinaryFile()}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center p-6 text-center text-sm text-zinc-500">
                  {m.builderRunSelectFile()}
                </div>
              )}
            </div>
            <div className="shrink-0 border-t border-border/50 bg-muted/10 px-3 py-1.5 font-mono text-[9px] text-muted-foreground/60">
              {m.builderRunEditingNotice()}
            </div>
          </section>

          <section className="grid min-h-[38rem] min-w-0 grid-rows-[minmax(22rem,1fr)_minmax(14rem,0.58fr)] lg:min-h-0">
            <div className="flex min-h-0 min-w-0 flex-col border-b border-border/70">
              <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border/60 bg-muted/15 px-3">
                <div className="flex gap-1" aria-hidden>
                  <span className="size-2 rounded-full bg-[#ff5f57]" />
                  <span className="size-2 rounded-full bg-[#febc2e]" />
                  <span className="size-2 rounded-full bg-[#28c840]" />
                </div>
                <div className="mx-auto min-w-0 max-w-xs flex-1 truncate rounded-md bg-muted/55 px-3 py-1 text-center font-mono text-[9px] text-muted-foreground">
                  {previewUrl || m.builderRunPreview()}
                </div>
                <RotateCcw className="size-3 text-muted-foreground/50" aria-hidden />
              </div>
              <div className="relative min-h-0 flex-1 bg-[radial-gradient(circle_at_50%_25%,color-mix(in_oklab,var(--color-muted)_55%,transparent),transparent_55%)]">
                {previewUrl ? (
                  // oxlint-disable-next-line react/iframe-missing-sandbox -- The generated app runs on an isolated WebContainer origin; sandboxing it breaks HMR, storage, and framework runtimes.
                  <iframe
                    key={previewUrl}
                    src={previewUrl}
                    title={m.builderRunPreview()}
                    allow="cross-origin-isolated; clipboard-read; clipboard-write"
                    referrerPolicy="no-referrer"
                    className="h-full w-full border-0 bg-white"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-6">
                    <div className="max-w-xs text-center">
                      {busy ? (
                        <Loader2 className="mx-auto size-6 animate-spin text-amber-500" />
                      ) : unsupported || status === "error" ? (
                        <AlertTriangle className="mx-auto size-6 text-amber-500" />
                      ) : (
                        <Play className="mx-auto size-6 fill-current text-foreground" />
                      )}
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {browserUnsupported
                          ? m.builderRunBrowserUnsupportedDescription()
                          : error || m.builderRunDescription()}
                      </p>
                      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.1em] text-muted-foreground/60">
                        {m.builderRunNpmNotice()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex min-h-0 min-w-0 flex-col bg-[#111113] text-zinc-200">
              <div className="flex h-9 shrink-0 items-center gap-2 border-b border-white/8 px-3">
                <TerminalSquare className="size-3.5 text-emerald-400" aria-hidden />
                <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                  {m.builderRunConsole()}
                </span>
                {logs && (
                  <button
                    type="button"
                    onClick={() => setLogs("")}
                    className="ml-auto cursor-pointer font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-500 transition-colors hover:text-zinc-200"
                  >
                    {m.builderRunClearLogs()}
                  </button>
                )}
              </div>
              <pre
                ref={consoleRef}
                aria-live="polite"
                className="min-h-0 flex-1 overflow-auto whitespace-pre-wrap break-words p-3 font-mono text-[10px] leading-5 text-zinc-300 selection:bg-emerald-400/25"
              >
                {logs || <span className="text-zinc-600">$ {m.builderRunNoOutput()}</span>}
              </pre>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
