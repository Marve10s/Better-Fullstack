import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Check, Copy, Terminal } from "lucide-react";
import { useState } from "react";

import { TechIcon } from "@/components/ui/tech-icon";
import { PRESET_TEMPLATES } from "@/lib/constant";
import {
  getStarterTrackBuilderSearch,
  getStarterTrackById,
  type StarterTrack,
} from "@/lib/starter-tracks";
import { DEFAULT_STACK, type StackState } from "@/lib/stack-defaults";
import { generateStackCommand } from "@/lib/stack-utils";
import { cn } from "@/lib/utils";

type StarterPackCtaProps = {
  id: StarterTrack["id"];
};

function getTrackCommand(track: StarterTrack) {
  const preset = PRESET_TEMPLATES.find((item) => item.id === track.presetId);
  if (!preset) return null;

  return generateStackCommand({
    ...DEFAULT_STACK,
    ...preset.stack,
    projectName: `my-${track.id}`,
  } as StackState);
}

export function StarterPackCta({ id }: StarterPackCtaProps) {
  const track = getStarterTrackById(id);
  const [copied, setCopied] = useState(false);
  if (!track) return null;

  const command = getTrackCommand(track);
  const copyCommand = () => {
    if (!command) return;

    navigator.clipboard.writeText(command).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
        return;
      },
      () => {},
    );
  };

  return (
    <aside className="not-prose my-8 overflow-hidden rounded-md border border-border bg-fd-background">
      <div className="flex flex-col gap-4 border-b border-border p-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-border bg-background">
            <TechIcon techId={track.icon} name={track.name} className="h-5 w-5" />
          </div>
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
              Starter pack
            </p>
            <h3 className="mt-1 font-semibold text-base text-foreground">{track.name}</h3>
            <p className="mt-1 text-muted-foreground text-sm">{track.outcome}</p>
          </div>
        </div>
        <Link
          to="/new"
          search={getStarterTrackBuilderSearch(track)}
          className="inline-flex h-9 shrink-0 items-center justify-center gap-1.5 rounded-md bg-[#bef264] px-3 font-semibold text-[#0a0a0a] text-xs no-underline transition-all hover:gap-2"
        >
          <Terminal className="h-3.5 w-3.5 text-[#0a0a0a]" />
          <span className="text-[#0a0a0a]">Open in builder</span>
        </Link>
      </div>

      {command ? (
        <div className="border-b border-border bg-muted/20 px-4 py-3">
          <div className="mb-2 flex items-center justify-between gap-3">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground">
              Scaffold command
            </p>
            <button
              type="button"
              onClick={copyCommand}
              className="inline-flex h-8 shrink-0 items-center gap-1.5 rounded-md border border-border px-2.5 font-medium text-xs transition-colors hover:border-muted-foreground/40 hover:bg-muted"
            >
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="overflow-hidden rounded-sm border border-border bg-background">
            <pre className="overflow-x-auto p-3 text-xs leading-relaxed">
              <code>{command}</code>
            </pre>
          </div>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center gap-2 p-4">
        {track.highlights.map((highlight) => (
          <span
            key={highlight}
            className="rounded-sm border border-border bg-muted/30 px-2 py-1 font-mono text-[0.68rem] text-muted-foreground"
          >
            {highlight}
          </span>
        ))}
        <a
          href={track.docsHref}
          className={cn(
            "ml-auto inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-2 font-medium text-xs transition-colors",
            "hover:border-muted-foreground/40 hover:bg-muted",
          )}
        >
          <BookOpen className="h-3.5 w-3.5" />
          Related docs
        </a>
      </div>
    </aside>
  );
}

export function StarterPackHub() {
  return (
    <div className="not-prose my-8 grid gap-3 sm:grid-cols-2">
      {STARTER_PACKS.map((track) => (
        <Link
          key={track.id}
          to="/guides/$"
          params={{ _splat: track.guideHref.replace(/^\/guides\/?|\/$/g, "") }}
          className="group flex min-h-52 flex-col rounded-md border border-border bg-fd-background p-4 transition-colors hover:border-muted-foreground/40 hover:bg-muted/30"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background">
              <TechIcon techId={track.icon} name={track.name} className="h-5 w-5" />
            </div>
            <span className="rounded-sm border border-border px-2 py-1 font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted-foreground">
              {track.intent}
            </span>
          </div>

          <h3 className="mt-4 font-semibold text-base text-foreground">{track.name}</h3>
          <p className="mt-2 line-clamp-3 text-muted-foreground text-sm">{track.description}</p>
          <p className="mt-3 border-l border-border pl-3 text-muted-foreground text-xs">
            <span className="font-mono uppercase tracking-[0.12em] text-foreground">For</span>{" "}
            {track.audience}
          </p>

          <div className="mt-auto flex items-center gap-1.5 pt-4 font-medium text-xs">
            Read pack guide
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </div>
        </Link>
      ))}
    </div>
  );
}

const STARTER_PACKS = [
  getStarterTrackById("saas-app"),
  getStarterTrackById("ai-agent-app"),
  getStarterTrackById("rest-api"),
  getStarterTrackById("java-api"),
  getStarterTrackById("rust-backend"),
  getStarterTrackById("mobile-app"),
  getStarterTrackById("internal-tool"),
].filter(Boolean) as StarterTrack[];
