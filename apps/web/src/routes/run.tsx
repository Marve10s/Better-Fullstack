import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { useCallback, useState, type CSSProperties } from "react";

import Footer from "@/components/home/footer";
import {
  DEFAULT_OG_IMAGE_ALT,
  DEFAULT_OG_IMAGE_HEIGHT,
  DEFAULT_OG_IMAGE_URL,
  DEFAULT_OG_IMAGE_WIDTH,
  DEFAULT_ROBOTS,
  DEFAULT_X_IMAGE_URL,
  canonicalUrl,
} from "@/lib/seo";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

export const Route = createFileRoute("/run")({
  head: () => {
    const title = m.runSeoTitle();
    const description = m.runSeoDescription();
    return {
      meta: [
        { title: `${title} — Better-Fullstack` },
        { name: "description", content: description },
        { name: "robots", content: DEFAULT_ROBOTS },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: canonicalUrl("/run") },
        { property: "og:image", content: DEFAULT_OG_IMAGE_URL },
        { property: "og:image:alt", content: DEFAULT_OG_IMAGE_ALT },
        { property: "og:image:width", content: String(DEFAULT_OG_IMAGE_WIDTH) },
        { property: "og:image:height", content: String(DEFAULT_OG_IMAGE_HEIGHT) },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: DEFAULT_X_IMAGE_URL },
        { name: "twitter:image:alt", content: DEFAULT_OG_IMAGE_ALT },
      ],
      links: [{ rel: "canonical", href: canonicalUrl("/run") }],
    };
  },
  component: RunPage,
});

const ACCENT_TEXT = "text-black dark:text-[#C6E853]";
const h1Style: CSSProperties = { fontSize: "clamp(2.3rem, 7vw, 4.5rem)", lineHeight: 0.96 };
const h2Style: CSSProperties = { fontSize: "clamp(1.7rem, 4.5vw, 2.8rem)", lineHeight: 1 };

const REPO_URL = "https://github.com/Marve10s/Better-Fullstack";
const REPORTS_URL = `${REPO_URL}/tree/main/benchmarks`;

// Copyable command / code block. `code` is verbatim shell (never localized);
// `label` is a short localized caption.
function CodeBlock({ label, code, shell = true }: { label: string; code: string; shell?: boolean }) {
  const [copied, setCopied] = useState(false);
  const copy = useCallback(() => {
    navigator.clipboard.writeText(code).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
        return;
      },
      () => {},
    );
  }, [code]);

  return (
    <div className="overflow-hidden rounded-md border border-border bg-card">
      <div className="flex items-center justify-between gap-3 border-b border-border bg-muted/30 px-4 py-2">
        <span className="truncate font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </span>
        <button
          type="button"
          onClick={copy}
          aria-label={m.mcpCopyAgentConfiguration({ agent: label })}
          className={cn(
            "flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors active:translate-y-[1px]",
            copied ? "text-lime-700 dark:text-[#C6E853]" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4">
        <code className="whitespace-pre font-mono text-xs leading-relaxed sm:text-[13px]">
          {code.split("\n").map((line, i) => (
            <span key={`${i}:${line}`} className="block">
              {shell && line && !line.startsWith("#") ? (
                <span className="text-lime-700 dark:text-[#C6E853]">$ </span>
              ) : null}
              <span className={line.startsWith("#") ? "text-muted-foreground" : undefined}>
                {line || " "}
              </span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}

type AuthMode = "cli" | "api";

function AuthPanel() {
  const [mode, setMode] = useState<AuthMode>("cli");
  return (
    <div>
      <div
        className="inline-flex overflow-hidden rounded-md border border-border"
        role="tablist"
        aria-label="Authentication mode"
      >
        <ModeTab mode="cli" active={mode === "cli"} label={m.runAuthCliTab()} onSelect={setMode} />
        <ModeTab mode="api" active={mode === "api"} label={m.runAuthApiTab()} onSelect={setMode} />
      </div>

      <div className="mt-4">
        {mode === "cli" ? (
          <>
            <p className="mb-3 max-w-2xl text-sm text-muted-foreground">{m.runAuthCliDesc()}</p>
            <CodeBlock
              label={m.runLabelSignin()}
              code={
                "# Claude Code (Anthropic) — sign in via the app, or:\nclaude /login\n\n# Codex (OpenAI)\ncodex login\n\n# Antigravity (Gemini)\nagy   # sign in on first launch"
              }
            />
          </>
        ) : (
          <>
            <p className="mb-3 max-w-2xl text-sm text-muted-foreground">{m.runAuthApiDesc()}</p>
            <CodeBlock
              label={m.runLabelExportKey()}
              code={
                "# Anthropic (drives Claude Code)\nexport ANTHROPIC_API_KEY=sk-ant-...\n\n# OpenAI (drives Codex)\nexport OPENAI_API_KEY=sk-..."
              }
            />
          </>
        )}
      </div>
    </div>
  );
}

function ModeTab({
  mode,
  active,
  label,
  onSelect,
}: {
  mode: AuthMode;
  active: boolean;
  label: string;
  onSelect: (mode: AuthMode) => void;
}) {
  const handleClick = useCallback(() => onSelect(mode), [onSelect, mode]);
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={handleClick}
      className={cn(
        "cursor-pointer px-4 py-2 text-xs font-semibold transition-colors",
        active ? "bg-[#C6E853] text-[#0a0a0a]" : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}

// Technical reference — model ids / auth commands are code, kept verbatim.
const AGENTS: ReadonlyArray<{ agent: string; models: string; auth: string }> = [
  { agent: "Claude Code", models: "claude-opus-4-8, claude-sonnet-5, claude-sonnet-4-6", auth: "subscription · ANTHROPIC_API_KEY" },
  { agent: "Codex", models: "gpt-5.5, gpt-5.3-codex-spark", auth: "OPENAI_API_KEY" },
  { agent: "Antigravity (agy)", models: "gemini-3.5-flash, gemini-3.1-pro", auth: "Google sign-in" },
  { agent: "opencode", models: "opencode/<model> (incl. free tier)", auth: "opencode login" },
  { agent: "Kilo Code", models: "kilo/<provider>/<model> (incl. free tier)", auth: "kilo login" },
];

type FlagId = "model" | "efforts" | "paths" | "specs" | "phase" | "outDir";
const FLAGS: ReadonlyArray<{ flag: string; id: FlagId }> = [
  { flag: "--model <id>", id: "model" },
  { flag: "--efforts <tier>", id: "efforts" },
  { flag: "--paths prompt|mcp|cli", id: "paths" },
  { flag: "--specs core", id: "specs" },
  { flag: "--generate-only / --validate-existing", id: "phase" },
  { flag: "--out-dir <path>", id: "outDir" },
];

function flagDesc(id: FlagId): string {
  switch (id) {
    case "model":
      return m.runFlagModel();
    case "efforts":
      return m.runFlagEfforts();
    case "paths":
      return m.runFlagPaths();
    case "specs":
      return m.runFlagSpecs();
    case "phase":
      return m.runFlagPhase();
    case "outDir":
      return m.runFlagOutDir();
  }
}

function RunPage() {
  return (
    <main className="min-h-svh">
      <div className="mx-auto max-w-[1480px] border-x border-border">
        {/* Hero */}
        <section className="border-b border-border">
          <div className="px-4 py-20 sm:px-8 sm:py-24">
            <p className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", ACCENT_TEXT)}>
              ✦ {m.runHeroEyebrow()}
            </p>
            <h1
              className="mt-4 max-w-[16ch] text-balance font-mono font-bold tracking-[-0.04em]"
              style={h1Style}
            >
              {m.runHeroTitleA()} <span className="italic text-muted-foreground">{m.runHeroTitleB()}</span>
            </h1>
            <p className="mt-6 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
              {m.runHeroDescription()}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#quickstart"
                className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:gap-3"
              >
                {m.runHeroQuickstart()}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={REPORTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
              >
                {m.runHeroBrowseReports()}
                <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </section>

        {/* Quickstart */}
        <section id="quickstart" className="scroll-mt-16 border-b border-border">
          <div className="px-4 py-20 sm:px-8 sm:py-24">
            <p className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", ACCENT_TEXT)}>
              ✦ {m.runQuickstartEyebrow()}
            </p>
            <h2 className="mt-4 font-mono font-bold tracking-[-0.04em]" style={h2Style}>
              {m.runQuickstartTitle()}
            </h2>

            <ol className="mt-10 space-y-10">
              <li>
                <StepLabel n={1} title={m.runStepCloneInstall()} />
                <div className="mt-4 max-w-3xl">
                  <CodeBlock
                    label={m.runLabelClone()}
                    code={"git clone https://github.com/Marve10s/Better-Fullstack.git\ncd Better-Fullstack\nbun install"}
                  />
                </div>
              </li>
              <li>
                <StepLabel n={2} title={m.runStepAuth()} />
                <div className="mt-4 max-w-3xl">
                  <AuthPanel />
                </div>
              </li>
              <li>
                <StepLabel n={3} title={m.runStepRun()} />
                <div className="mt-4 max-w-3xl space-y-4">
                  <CodeBlock
                    label={m.runLabelRunAll()}
                    code={"bun run scaffbench:2 --model claude-opus-4-8 --efforts max --paths prompt"}
                  />
                  <p className="text-sm text-muted-foreground">{m.runTwoPhaseNote()}</p>
                  <CodeBlock
                    label={m.runLabelTwoPhase()}
                    code={"bun run scaffbench:2:generate --model gpt-5.5 --paths prompt --out-dir runs/gpt55\nbun run scaffbench:2:validate --out-dir runs/gpt55"}
                  />
                  <p className="text-sm text-muted-foreground">
                    {m.runResultsNotePre()}
                    <a
                      href={REPORTS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn("font-semibold underline underline-offset-2", ACCENT_TEXT)}
                    >
                      {m.runResultsNoteLink()}
                    </a>
                    .
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Agents & models */}
        <section className="border-b border-border bg-muted/20">
          <div className="px-4 py-20 sm:px-8 sm:py-24">
            <p className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", ACCENT_TEXT)}>
              ✦ {m.runAgentsEyebrow()}
            </p>
            <h2 className="mt-4 font-mono font-bold tracking-[-0.04em]" style={h2Style}>
              {m.runAgentsTitle()}
            </h2>
            <p className="mt-5 max-w-2xl text-pretty text-sm text-muted-foreground sm:text-base">
              {m.runAgentsDesc()}
            </p>

            <div className="mt-10 overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    <th className="py-3 pr-4 font-medium">{m.runColAgent()}</th>
                    <th className="py-3 pr-4 font-medium">{m.runColModels()}</th>
                    <th className="py-3 font-medium">{m.runColAuth()}</th>
                  </tr>
                </thead>
                <tbody>
                  {AGENTS.map((a) => (
                    <tr key={a.agent} className="border-b border-border/60">
                      <td className="py-3 pr-4 font-mono font-semibold">{a.agent}</td>
                      <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">{a.models}</td>
                      <td className="py-3 font-mono text-xs text-muted-foreground">{a.auth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Flags */}
        <section className="border-b border-border">
          <div className="px-4 py-20 sm:px-8 sm:py-24">
            <p className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", ACCENT_TEXT)}>
              ✦ {m.runFlagsEyebrow()}
            </p>
            <h2 className="mt-4 font-mono font-bold tracking-[-0.04em]" style={h2Style}>
              {m.runFlagsTitle()}
            </h2>
            <ul className="mt-10 max-w-3xl divide-y divide-border/60">
              {FLAGS.map((f) => (
                <li key={f.flag} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[minmax(0,18rem)_1fr] sm:gap-4">
                  <code className={cn("font-mono text-xs font-semibold sm:text-sm", ACCENT_TEXT)}>
                    {f.flag}
                  </code>
                  <span className="text-xs text-muted-foreground sm:text-sm">{flagDesc(f.id)}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-20 text-center sm:px-8 sm:py-24">
          <p className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", ACCENT_TEXT)}>
            ✦ {m.runCtaEyebrow()}
          </p>
          <h2
            className="mx-auto mt-4 max-w-[20ch] text-balance font-mono font-bold tracking-[-0.04em]"
            style={h2Style}
          >
            {m.runCtaTitle()}
          </h2>
          <p className="mx-auto mt-5 max-w-md text-pretty text-sm text-muted-foreground sm:text-base">
            {m.runCtaDesc()}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="/benchmark"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all hover:gap-3"
            >
              {m.runCtaLeaderboard()}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="/blog/scaffbench-2-1"
              className="group inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              {m.runCtaWriteup()}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}

function StepLabel({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs font-bold">
        {n}
      </span>
      <span className="font-mono text-base font-semibold sm:text-lg">{title}</span>
    </div>
  );
}
