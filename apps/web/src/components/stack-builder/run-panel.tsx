import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import {
  TbAlertTriangle as AlertTriangle,
  TbCheck as Check,
  TbClipboardCopy as ClipboardCopy,
  TbPlayerStop as CircleStop,
  TbExternalLink as ExternalLink,
  TbFileCode as FileCode2,
  TbLoader2 as Loader2,
  TbPlayerPlay as Play,
  TbRefresh as RefreshCw,
  TbRotate as RotateCcw,
  TbDeviceFloppy as Save,
  TbTerminal2 as TerminalSquare,
  TbArrowBackUp as Undo2,
  TbX as X,
} from "react-icons/tb";

import type { StackState } from "@/lib/stack-defaults";

import { highlight } from "@/components/ui/kibo-ui/code-block";
import {
  createRunnableProject,
  getDefaultRunnableFile,
  hasDependencyManifestChanges,
  type RunnableProject,
  type RunnableSourceFile,
} from "@/lib/project-runner";
import {
  classifyBuilderRunFailure,
  failureDurationMs,
  shouldReportBuilderRunFailure,
  type BuilderRunFailure,
  type BuilderRunFailureStage,
} from "@/lib/builder-failure-analytics";
import { getStackRunSupport } from "@/lib/run-support";
import { cn } from "@/lib/utils";
import * as m from "@/paraglide/messages";

import { getLanguage } from "./code-viewer";
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
  /** The scaffold command + copy affordance relocated from the floating bar:
   *  on this tab the bar hides and its copy button lands in the files sidebar
   *  (shared Motion layoutId flight). */
  command: string;
  copied: boolean;
  onCopy: () => void;
  onRunStarted?: (rerun: boolean) => void;
  onRunReady?: (rerun: boolean) => void;
  onRunFailed?: (failure: BuilderRunFailure) => void;
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

// The Run editor pane is always dark, so both theme slots get the dark theme
// the Preview tab's code viewer uses.
const RUN_EDITOR_THEMES = { light: "catppuccin-mocha", dark: "catppuccin-mocha" };

/** Editable code pane with the same Shiki highlighting as the Preview tab:
 *  a highlighted layer + line-number gutter sit behind a transparent-text
 *  textarea that owns input, caret, and scrolling. Layer metrics (font, size,
 *  leading, padding, no-wrap) must match the textarea exactly or the visible
 *  code drifts from the caret. */
function RunCodeEditor({
  path,
  value,
  ariaLabel,
  onChange,
  onKeyDown,
}: {
  path: string;
  value: string;
  ariaLabel: string;
  onChange: (next: string) => void;
  onKeyDown: (event: KeyboardEvent<HTMLTextAreaElement>) => void;
}) {
  const [html, setHtml] = useState<string | null>(null);
  const highlightRef = useRef<HTMLDivElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const language = useMemo(() => getLanguage(path.split(".").pop() ?? "", path), [path]);

  useEffect(() => {
    let cancelled = false;
    highlight(value, language, RUN_EDITOR_THEMES)
      .then((result) => {
        if (!cancelled) setHtml(result);
        return undefined;
      })
      .catch(() => {
        if (!cancelled) setHtml(null);
      });
    return () => {
      cancelled = true;
    };
  }, [value, language]);

  const lineNumbers = useMemo(() => {
    const count = value.split("\n").length;
    return Array.from({ length: count }, (_, index) => index + 1).join("\n");
  }, [value]);

  const syncScroll = (event: React.UIEvent<HTMLTextAreaElement>) => {
    const target = event.currentTarget;
    if (highlightRef.current) {
      highlightRef.current.scrollTop = target.scrollTop;
      highlightRef.current.scrollLeft = target.scrollLeft;
    }
    if (gutterRef.current) gutterRef.current.scrollTop = target.scrollTop;
  };

  return (
    <div className="flex h-full min-w-0">
      <div
        ref={gutterRef}
        aria-hidden
        className="w-12 shrink-0 overflow-hidden whitespace-pre border-r border-white/5 py-4 pr-3 text-right font-mono text-[12px] leading-6 text-zinc-600 select-none"
      >
        {lineNumbers}
      </div>
      <div className="relative min-w-0 flex-1">
        <div
          ref={highlightRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 overflow-hidden [&_pre]:m-0 [&_pre]:min-w-max [&_pre]:bg-transparent! [&_pre]:p-4 [&_pre]:font-mono [&_pre]:text-[12px] [&_pre]:leading-6 [&_pre]:whitespace-pre"
        >
          {html ? (
            // oxlint-disable-next-line react/no-danger -- Shiki output, same as the Preview tab's CodeBlockContent.
            <div dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            <pre className="text-zinc-200">{value}</pre>
          )}
        </div>
        <textarea
          data-testid="run-code-editor"
          aria-label={ariaLabel}
          value={value}
          wrap="off"
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          onScroll={syncScroll}
          spellCheck={false}
          className="relative h-full w-full resize-none whitespace-pre border-0 bg-transparent p-4 font-mono text-[12px] leading-6 text-transparent caret-emerald-400 outline-none selection:bg-emerald-400/25"
        />
      </div>
    </div>
  );
}

export function RunPanel({
  stack,
  selectedFilePath,
  onSelectFile,
  command,
  copied,
  onCopy,
  onRunStarted,
  onRunReady,
  onRunFailed,
}: RunPanelProps) {
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
  // The editor pane starts hidden: it only opens once the user picks a file
  // in the explorer, and can be dismissed again from the editor header.
  const [fileOpen, setFileOpen] = useState(false);
  const [previewUrlCopied, setPreviewUrlCopied] = useState(false);
  const runIdRef = useRef(0);
  const runtimeMountedRef = useRef(false);
  const dependenciesInstalledRef = useRef(false);
  const hasCompletedRunRef = useRef(false);
  const lastReportedFailureRunIdRef = useRef(-1);
  const generationSignatureRef = useRef<string | null>(null);
  const generationAttemptRef = useRef(0);
  const consoleRef = useRef<HTMLPreElement>(null);
  const selectedFilePathRef = useRef(selectedFilePath);
  const onSelectFileRef = useRef(onSelectFile);
  const onRunFailedRef = useRef(onRunFailed);
  selectedFilePathRef.current = selectedFilePath;
  onSelectFileRef.current = onSelectFile;
  onRunFailedRef.current = onRunFailed;

  const reportRunFailure = useCallback(
    (runId: number, failure: BuilderRunFailure) => {
      if (
        !shouldReportBuilderRunFailure(
          runIdRef.current,
          runId,
          lastReportedFailureRunIdRef.current,
        )
      ) {
        return;
      }
      lastReportedFailureRunIdRef.current = runId;
      onRunFailedRef.current?.(failure);
    },
    [],
  );

  const prepareWorkspace = useCallback(async () => {
    const startedAt = Date.now();
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    runtimeMountedRef.current = false;
    dependenciesInstalledRef.current = false;
    hasCompletedRunRef.current = false;
    setProject(null);
    setDrafts({});
    setSyncedContents({});
    setLogs("");
    setPreviewUrl(null);
    setError(null);
    setBrowserUnsupported(false);

    if (generationSignatureRef.current !== stackSignature) {
      generationSignatureRef.current = stackSignature;
      generationAttemptRef.current = 0;
    }
    const isRegeneration = generationAttemptRef.current > 0;
    generationAttemptRef.current += 1;

    if (!support.supported) {
      onSelectFileRef.current(null);
      setStatus("idle");
      return;
    }

    setStatus("generating");
    const stackToRun = JSON.parse(stackSignature) as StackState;

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
      const failure = classifyBuilderRunFailure("generation", generationError);
      reportRunFailure(runId, {
        ...failure,
        durationMs: failureDurationMs(startedAt),
        rerun: isRegeneration,
      });
      setError(errorMessage(generationError));
      setStatus("error");
    }
  }, [reportRunFailure, stackSignature, support.supported]);

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

  // Native leave-page confirmation while the in-browser runtime is doing real
  // work (boot/install/start) or serving the app — closing or reloading the
  // page kills the WebContainer and loses the running session.
  const runtimeActive =
    status === "booting" || status === "installing" || status === "starting" || status === "ready";
  useEffect(() => {
    if (!runtimeActive) return;
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      // Required by Chrome for the confirmation dialog to appear.
      event.returnValue = "";
    };
    window.addEventListener("beforeunload", warnBeforeUnload);
    return () => window.removeEventListener("beforeunload", warnBeforeUnload);
  }, [runtimeActive]);

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

    const startedAt = Date.now();
    const isRerun = hasCompletedRunRef.current;
    onRunStarted?.(isRerun);
    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    setLogs("");
    setPreviewUrl(null);
    setError(null);
    setBrowserUnsupported(false);

    const ensureCurrentRun = () => {
      if (runIdRef.current !== runId) throw new Error("Run cancelled");
    };

    let failureStage: BuilderRunFailureStage = "runtime_boot";

    try {
      const runtimeModule = await import("@/lib/webcontainer-runtime");
      failureStage = "browser_support";
      if (!runtimeModule.canBootBrowserRuntime()) {
        const failure = classifyBuilderRunFailure(failureStage);
        reportRunFailure(runId, {
          ...failure,
          durationMs: failureDurationMs(startedAt),
          rerun: isRerun,
        });
        setBrowserUnsupported(true);
        setStatus("error");
        return;
      }

      setStatus("booting");
      failureStage = "runtime_boot";
      const runtime = await runtimeModule.getBrowserRuntime();
      ensureCurrentRun();

      if (!runtimeMountedRef.current) {
        failureStage = "project_mount";
        await runtimeModule.mountRunnableProject(runtime, project.files);
        runtimeMountedRef.current = true;
      } else {
        runtimeModule.stopDevelopmentServer();
        failureStage = "source_sync";
        await runtimeModule.syncRunnableSourceFiles(runtime, currentFiles);
      }
      ensureCurrentRun();

      const dependenciesChanged = hasDependencyManifestChanges(currentFiles, syncedContents);
      if (!dependenciesInstalledRef.current || dependenciesChanged) {
        dependenciesInstalledRef.current = false;
        setStatus("installing");
        failureStage = "dependency_install";
        await runtimeModule.installRunnableProject(runtime, appendOutput);
        dependenciesInstalledRef.current = true;
        ensureCurrentRun();
      }

      setStatus("starting");
      failureStage = "server_start";
      const url = await runtimeModule.startDevelopmentServer(
        runtime,
        project.script,
        project.workspace,
        appendOutput,
        (exitCode) => {
          if (runIdRef.current !== runId) return;
          const failure = classifyBuilderRunFailure("server_exit");
          reportRunFailure(runId, {
            ...failure,
            durationMs: failureDurationMs(startedAt),
            rerun: isRerun,
          });
          setPreviewUrl(null);
          setError(`Development server exited with code ${exitCode}.`);
          setStatus("error");
        },
      );
      ensureCurrentRun();
      setSyncedContents(contentsByPath(currentFiles));
      setPreviewUrl(url);
      setStatus("ready");
      hasCompletedRunRef.current = true;
      onRunReady?.(isRerun);
    } catch (runError) {
      if (runIdRef.current !== runId) return;
      const failure = classifyBuilderRunFailure(failureStage, runError);
      reportRunFailure(runId, {
        ...failure,
        durationMs: failureDurationMs(startedAt),
        rerun: isRerun,
      });
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
    setFileOpen(true);
  };

  const copyPreviewUrl = () => {
    if (!previewUrl) return;
    void navigator.clipboard.writeText(previewUrl);
    setPreviewUrlCopied(true);
    setTimeout(() => setPreviewUrlCopied(false), 2000);
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
      {/* The workspace grid (and the docked copy button in its sidebar footer)
          stays mounted while the project generates: the footer button is the
          landing target of the command-bar flight, so it must exist from the
          moment the tab opens — if it mounts late (or unmounts on rebuild),
          the shared-layout handoff has no destination and the button blinks. */}
      <div
        className={cn(
          "grid min-h-0 flex-1 grid-cols-1 overflow-auto lg:overflow-hidden",
          // 16rem first column = lg:w-64, matching the Preview sidebar and the
          // toolbar's name-field block so the vertical separators align.
          fileOpen && selectedFile
            ? "lg:grid-cols-[16rem_minmax(20rem,1fr)_minmax(20rem,1fr)]"
            : "lg:grid-cols-[16rem_minmax(20rem,1fr)]",
        )}
      >
        <section
          className={cn(
            "flex min-w-0 flex-col border-b border-border/70 bg-muted/10 lg:min-h-0 lg:border-r lg:border-b-0",
            project && "min-h-56",
          )}
        >
          <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border/60 px-3">
            <FileCode2 className="size-3.5 text-muted-foreground" aria-hidden />
            <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {m.builderRunWorkspace()}
            </span>
            {project && (
              <span className="ml-auto font-mono text-[9px] text-muted-foreground/60">
                {project.sourceFiles.length}
              </span>
            )}
          </div>
          <div className="min-h-0 flex-1 overflow-hidden">
            {project && (
              <FileExplorer
                root={project.tree}
                selectedPath={selectedFilePath}
                onSelectFile={handleSelectFile}
              />
            )}
          </div>
          <div className="shrink-0 border-t border-border/60 p-2">
            <motion.button
              layoutId="bf-copy-command"
              layout
              style={{ position: "relative", zIndex: 70 }}
              transition={{ layout: { type: "spring", stiffness: 150, damping: 25, delay: 0.8 } }}
              type="button"
              onClick={onCopy}
              title={command}
              data-analytics-event="builder_command_copied"
              data-analytics-source="builder_run_sidebar"
              aria-label={copied ? m.builderCommandCopied() : m.builderCopyCommand()}
              className="flex h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-[9px] bg-[#C6E853] font-mono text-[11px] font-semibold text-[#2A3303] transition-colors hover:bg-[#d2ee72]"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <ClipboardCopy className="h-3.5 w-3.5" />
              )}
              <span>{copied ? m.navCopied() : m.navCopy()}</span>
            </motion.button>
          </div>
        </section>

        {!project ? (
          <div className="flex min-h-72 min-w-0 items-center justify-center bg-[radial-gradient(circle_at_50%_25%,color-mix(in_oklab,var(--color-muted)_55%,transparent),transparent_55%)] p-6">
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
          <>
            {fileOpen && selectedFile && (
              <section className="flex min-h-[28rem] min-w-0 flex-col border-b border-border/70 lg:min-h-0 lg:border-r lg:border-b-0">
                <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border/60 bg-muted/15 px-3">
                  <span className="min-w-0 truncate font-mono text-[10px] text-muted-foreground">
                    {selectedFile.path}
                  </span>
                  <span className="ml-auto flex shrink-0 items-center gap-2">
                    {selectedFile.editable &&
                      selectedFile.content !== syncedContents[selectedFile.path] && (
                        <span className="size-2 rounded-full bg-amber-400" aria-hidden />
                      )}
                    <button
                      type="button"
                      onClick={() => setFileOpen(false)}
                      title={m.uiClose()}
                      aria-label={m.uiClose()}
                      className="inline-flex size-5 cursor-pointer items-center justify-center rounded text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <X className="size-3" aria-hidden />
                    </button>
                  </span>
                </div>
                <div className="relative min-h-0 flex-1 bg-[#0d0d0f]">
                  {selectedFile.editable ? (
                    <RunCodeEditor
                      key={selectedFile.path}
                      path={selectedFile.path}
                      value={selectedFile.content}
                      ariaLabel={`${m.builderRunEditor()}: ${selectedFile.path}`}
                      onChange={(next) =>
                        setDrafts((current) => ({
                          ...current,
                          [selectedFile.path]: next,
                        }))
                      }
                      onKeyDown={handleEditorKeyDown}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center p-6 text-center text-sm text-zinc-500">
                      {m.builderRunBinaryFile()}
                    </div>
                  )}
                </div>
                <div className="shrink-0 border-t border-border/50 bg-muted/10 px-3 py-1.5 font-mono text-[9px] text-muted-foreground/60">
                  {m.builderRunEditingNotice()}
                </div>
              </section>
            )}

            <section className="grid min-h-[38rem] min-w-0 grid-rows-[minmax(22rem,1fr)_minmax(14rem,0.58fr)] lg:min-h-0">
              <div className="flex min-h-0 min-w-0 flex-col border-b border-border/70">
                <div className="flex h-9 shrink-0 items-center gap-2 border-b border-border/60 bg-muted/15 px-3">
                  <button
                    type="button"
                    onClick={copyPreviewUrl}
                    disabled={!previewUrl}
                    title={previewUrl ?? undefined}
                    aria-label={previewUrl ? m.navCopy() : undefined}
                    className={cn(
                      "min-w-0 flex-1 truncate rounded-md bg-muted/55 px-3 py-1 text-center font-mono text-[9px] text-muted-foreground",
                      previewUrl && "cursor-pointer transition-colors hover:bg-muted",
                    )}
                  >
                    {previewUrlCopied ? m.navCopied() : previewUrl || m.builderRunPreview()}
                  </button>
                  <RotateCcw className="size-3 shrink-0 text-muted-foreground/50" aria-hidden />
                  {dirtyFiles.length > 0 && (
                    <button
                      type="button"
                      onClick={discardChanges}
                      disabled={busy}
                      title={m.builderRunDiscardChanges()}
                      aria-label={m.builderRunDiscardChanges()}
                      className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-50"
                    >
                      <Undo2 className="size-3" aria-hidden />
                    </button>
                  )}
                  {previewUrl && (
                    <button
                      type="button"
                      onClick={() => window.open(previewUrl, "_blank", "noopener,noreferrer")}
                      title={m.builderRunOpenPreview()}
                      aria-label={m.builderRunOpenPreview()}
                      className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      <ExternalLink className="size-3" aria-hidden />
                    </button>
                  )}
                  {(status === "ready" || busy) && (
                    <button
                      type="button"
                      onClick={stopProject}
                      title={m.builderRunStop()}
                      aria-label={m.builderRunStop()}
                      className="inline-flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/10 hover:text-destructive"
                    >
                      <CircleStop className="size-3" aria-hidden />
                    </button>
                  )}
                  {!busy && !browserUnsupported && (
                    <button
                      type="button"
                      data-testid="run-project-button"
                      onClick={runProject}
                      className="inline-flex h-7 shrink-0 cursor-pointer items-center gap-1.5 rounded-md bg-foreground px-2.5 text-[10.5px] font-semibold text-background shadow-sm transition-transform hover:-translate-y-0.5"
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
                  <span className="shrink-0 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-zinc-400">
                    {m.builderRunConsole()}
                  </span>
                  <span
                    title={m.builderRunFrontendOnlyNotice()}
                    className="hidden min-w-0 truncate font-mono text-[9px] text-zinc-500 sm:inline"
                  >
                    {m.builderRunFrontendOnlyNotice()}
                  </span>
                  <span className="ml-auto flex shrink-0 items-center gap-1.5">
                    <span
                      className={cn(
                        "size-1.5 rounded-full bg-zinc-600",
                        busy && "animate-pulse bg-amber-400",
                        status === "ready" &&
                          "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.55)]",
                        status === "error" && "bg-red-400",
                      )}
                      aria-hidden
                    />
                    <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.1em] text-zinc-400">
                      {statusLabel(status)}
                    </span>
                  </span>
                  {logs && (
                    <button
                      type="button"
                      onClick={() => setLogs("")}
                      className="cursor-pointer font-mono text-[9px] uppercase tracking-[0.1em] text-zinc-500 transition-colors hover:text-zinc-200"
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
                  {logs || (
                    <span className="text-zinc-600">
                      $ {m.builderRunNoOutput()}
                      {"\n"}
                      {m.builderRunLocalNotice()}
                    </span>
                  )}
                </pre>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
