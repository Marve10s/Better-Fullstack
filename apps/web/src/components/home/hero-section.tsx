import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { TbArrowRight as ArrowRight, TbCheck as Check, TbCopy as Copy } from "react-icons/tb";

import { AsciiHeroBackground } from "@/components/ui/ascii-hero-background";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { latestChangelogRelease } from "@/lib/changelog";
import { PROJECT_ECOSYSTEM_COPY } from "@/lib/project-stats";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

import PackageIcon from "./icons";
import { LIKED_BY } from "./testimonials-data";

const PMS = ["bun", "pnpm", "npm", "yarn"] as const;
type PM = (typeof PMS)[number];
const COMMANDS: Record<PM, string> = {
  bun: "bun create better-fullstack@latest",
  pnpm: "pnpm create better-fullstack@latest",
  npm: "npx create-better-fullstack@latest",
  yarn: "yarn create better-fullstack@latest",
};

const ACCENT_TEXT = "text-ink dark:text-brand";

// The release badge updates itself. We seed it from the curated changelog (so SSR
// and offline still render something correct), then refresh it live from the
// latest GitHub release — which the Release workflow cuts on every npm publish —
// so it never goes stale after a release without anyone hand-editing changelog.ts.
// (Build-time injection can't help: the publish runs *after* the deploy that
// triggers it, so any baked-in value always lags a version.)
const FALLBACK_RELEASE_BADGE = latestChangelogRelease
  ? `${latestChangelogRelease.version} · ${latestChangelogRelease.displayDate}`
  : "";
const LATEST_RELEASE_API = "https://api.github.com/repos/Marve10s/Better-Fullstack/releases/latest";
const RELEASE_BADGE_CACHE_KEY = "bfs:latest-release-badge";

function formatReleaseBadge(tagName: string, publishedAt: string): string {
  const date = new Date(publishedAt);
  const displayDate = Number.isNaN(date.getTime())
    ? ""
    : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  return displayDate ? `${tagName} · ${displayDate}` : tagName;
}

export default function HeroSection() {
  const [pm, setPm] = useState<PM>("bun");
  const [copied, setCopied] = useState(false);
  const [releaseBadge, setReleaseBadge] = useState(FALLBACK_RELEASE_BADGE);

  useEffect(() => {
    const cached = sessionStorage.getItem(RELEASE_BADGE_CACHE_KEY);
    if (cached) {
      setReleaseBadge(cached);
      return;
    }
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch(LATEST_RELEASE_API, {
          headers: { Accept: "application/vnd.github+json" },
        });
        if (!res.ok) return;
        const data = (await res.json()) as { tag_name?: string; published_at?: string };
        if (cancelled || !data.tag_name) return;
        const badge = formatReleaseBadge(data.tag_name, data.published_at ?? "");
        setReleaseBadge(badge);
        try {
          sessionStorage.setItem(RELEASE_BADGE_CACHE_KEY, badge);
        } catch {
          // sessionStorage can throw in private mode; the live value still renders.
        }
      } catch {
        // Network / rate-limit failure: keep the curated fallback badge.
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const copy = () => {
    navigator.clipboard.writeText(COMMANDS[pm]).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
        return;
      },
      () => {},
    );
  };

  return (
    <section
      className={cn(
        "relative bg-surface text-ink [color-scheme:light]",
        "dark:[color-scheme:dark]",
      )}
    >
      <div className="border-b border-edge px-4 pb-5 pt-6 sm:px-8 sm:pt-8">
        <div className="flex items-baseline justify-between">
          <span className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", ACCENT_TEXT)}>
            ✦ {m.homeInstall()}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-soft">
            {releaseBadge}
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-3 overflow-hidden rounded-md border border-edge bg-surface-raised"
        >
          <div className="flex border-b border-edge">
            {PMS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPm(p)}
                className={cn(
                  "flex cursor-pointer items-center gap-1.5 border-r border-edge px-3 py-2 text-xs font-medium transition-colors sm:gap-2 sm:px-4",
                  pm === p ? "bg-brand text-[#0a0a0a]" : "bg-transparent text-soft",
                )}
              >
                <PackageIcon pm={p} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
            <code className="truncate font-mono text-sm sm:text-base">
              <span className={ACCENT_TEXT}>$</span> {COMMANDS[pm]}
            </code>
            <button
              type="button"
              onClick={copy}
              aria-label={m.homeCopyCommand()}
              className={cn(
                "flex size-8 cursor-pointer items-center justify-center rounded-md bg-transparent transition-colors active:translate-y-[1px]",
                copied ? "text-ink dark:text-brand" : "text-soft",
              )}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative overflow-hidden px-4 pb-16 pt-12 sm:px-8 sm:pb-24 sm:pt-20">
        <div
          className="pointer-events-none absolute inset-y-0 left-1/2 w-screen -translate-x-1/2"
          aria-hidden
        >
          <AsciiHeroBackground className="size-full" variant="stack" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className={cn(
            "relative z-10 max-w-[15ch] text-balance font-mono font-bold tracking-[-0.045em] text-ink",
          )}
          style={{
            fontSize: "clamp(2.75rem, 9vw, 6.5rem)",
            lineHeight: 0.94,
          }}
        >
          {m.homeStopWiring()}
          <br />
          <span className={cn("italic", ACCENT_TEXT)}>{m.homeStartShipping()}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 mt-7 max-w-lg text-pretty text-base text-soft sm:text-lg"
        >
          {m.homeHeroDescription(PROJECT_ECOSYSTEM_COPY)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative z-10 mt-10 flex flex-wrap items-center gap-3"
        >
          <Link
            to="/new"
            search={{ view: "command", file: "" }}
            className="group inline-flex items-center gap-1.5 rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-all hover:gap-2.5"
          >
            {m.homeOpenBuilder()}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/docs"
            className="px-2 py-2.5 text-sm font-medium text-soft transition-colors hover:text-ink"
          >
            {m.homeReadDocs()}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.42 }}
          className="relative z-10 mt-8 flex flex-wrap items-center gap-x-4 gap-y-3"
        >
          <ul className="isolate flex -space-x-2.5" aria-label={m.homeLikedOnX()}>
            {LIKED_BY.map((person) => (
              <li
                key={person.handle}
                className="relative transition-transform hover:z-10 hover:-translate-y-1"
              >
                <Tooltip delay={80}>
                  <TooltipTrigger
                    render={
                      <a
                        href={`https://x.com/${person.handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${person.name} — @${person.handle}`}
                        className="block rounded-full outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
                      />
                    }
                  >
                    <img
                      src={person.avatar}
                      alt=""
                      referrerPolicy="no-referrer"
                      className={cn(
                        "size-8 rounded-full border-2 border-surface bg-surface-raised object-cover shadow-sm sm:size-10",
                        person.invertDark && "dark:bg-white dark:p-0.5",
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    sideOffset={12}
                    className="min-w-44 border border-background/15 px-3.5 py-3 shadow-[4px_4px_0_rgba(198,232,83,0.35)]"
                  >
                    <span className="block font-mono text-xs font-semibold tracking-[-0.02em]">
                      {person.name}
                    </span>
                    <span className="mt-0.5 block font-mono text-[10px] text-background/65">
                      @{person.handle}
                    </span>
                    <span className="mt-2 block border-t border-background/20 pt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-background/75">
                      {person.role}
                    </span>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>

          <div className="border-l border-edge pl-4">
            <p className={cn("font-mono text-[10px] uppercase tracking-[0.2em]", ACCENT_TEXT)}>
              ✦ {m.homeLikedOnX()}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
