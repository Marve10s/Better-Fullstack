import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

import { AsciiHeroBackground } from "@/components/ui/ascii-hero-background";
import { latestChangelogRelease } from "@/lib/changelog";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

import PackageIcon from "./icons";

const PMS = ["bun", "pnpm", "npm", "yarn"] as const;
type PM = (typeof PMS)[number];
const COMMANDS: Record<PM, string> = {
  bun: "bun create better-fullstack@latest",
  pnpm: "pnpm create better-fullstack@latest",
  npm: "npx create-better-fullstack@latest",
  yarn: "yarn create better-fullstack@latest",
};

const ACCENT_TEXT = "text-ink dark:text-brand";
const RELEASE_BADGE = latestChangelogRelease
  ? `${latestChangelogRelease.version} · ${latestChangelogRelease.displayDate}`
  : "";

export default function HeroSection() {
  const [pm, setPm] = useState<PM>("bun");
  const [copied, setCopied] = useState(false);

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
            {RELEASE_BADGE}
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
          {m.homeHeroDescription()}
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
            className="rounded-md border border-edge px-5 py-2.5 text-sm font-medium text-ink transition-colors"
          >
            {m.homeReadDocs()}
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
