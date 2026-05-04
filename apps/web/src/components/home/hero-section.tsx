import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { lazy, Suspense, useState } from "react";

import { cn } from "@/lib/utils";

import PackageIcon from "./icons";

const ShaderLines = lazy(async () => {
  const m = await import("@/components/effects/shader-lines");
  return { default: m.ShaderLines };
});

const PMS = ["bun", "pnpm", "npm", "yarn"] as const;
type PM = (typeof PMS)[number];
const COMMANDS: Record<PM, string> = {
  bun: "bun create better-fullstack@latest",
  pnpm: "pnpm create better-fullstack@latest",
  npm: "npx create-better-fullstack@latest",
  yarn: "yarn create better-fullstack@latest",
};

/** Homepage hero lime — same in both themes (matches shader / features section). */
const ACCENT = "#bef264";

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
        "relative bg-white text-[#14532d] [color-scheme:light]",
        "dark:bg-[#0a0a0a] dark:text-[#fafafa] dark:[color-scheme:dark]",
      )}
    >
      <div
        className={cn(
          "border-b border-[#e5e5e5] px-4 pb-5 pt-6 sm:px-8 sm:pt-8",
          "dark:border-[#1f1f1f]",
        )}
      >
        <div className="flex items-baseline justify-between">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: ACCENT }}
          >
            ✦ install
          </span>
          <span
            className={cn(
              "font-mono text-[11px] uppercase tracking-[0.22em] text-[#4d7c0f]",
              "dark:text-[#7a7a7a]",
            )}
          >
            v1.6.2 · apr 29, 2026
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className={cn(
            "mt-3 overflow-hidden rounded-md border border-[#e5e5e5] bg-[#fafafa]",
            "dark:border-[#1f1f1f] dark:bg-[#111111]",
          )}
        >
          <div
            className={cn(
              "flex border-b border-[#e5e5e5] dark:border-[#1f1f1f]",
            )}
          >
            {PMS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPm(p)}
                className={cn(
                  "flex cursor-pointer items-center gap-1.5 border-r border-[#e5e5e5] px-3 py-2 text-xs font-medium transition-colors sm:gap-2 sm:px-4",
                  "dark:border-[#1f1f1f]",
                  pm === p
                    ? "bg-[#bef264] text-[#0a0a0a]"
                    : "bg-transparent text-[#3f6212] dark:text-[#a3a3a3]",
                )}
              >
                <PackageIcon pm={p} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
            <code className="truncate font-mono text-sm sm:text-base">
              <span style={{ color: ACCENT }}>$</span> {COMMANDS[pm]}
            </code>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy command"
              className={cn(
                "flex size-8 cursor-pointer items-center justify-center rounded-md bg-transparent transition-colors active:translate-y-[1px]",
                copied ? "text-[#bef264]" : "text-[#3f6212] dark:text-[#a3a3a3]",
              )}
            >
              {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
            </button>
          </div>
        </motion.div>
      </div>

      <div className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <div
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[55%] sm:block"
          aria-hidden
        >
          <Suspense fallback={null}>
            <ShaderLines className="h-full w-full" />
          </Suspense>
          <div
            className={cn(
              "absolute inset-0 bg-[linear-gradient(90deg,#ffffff_0%,#ffffff_18%,transparent_60%,transparent_100%)]",
              "dark:bg-[linear-gradient(90deg,#0a0a0a_0%,#0a0a0a_18%,transparent_60%,transparent_100%)]",
            )}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: ACCENT }}
        >
          ✦ the cli
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className={cn(
            "relative z-10 mt-5 max-w-[15ch] text-balance font-mono font-bold tracking-[-0.045em] text-[#14532d] dark:text-[#fafafa]",
          )}
          style={{
            fontSize: "clamp(2.75rem, 9vw, 6.5rem)",
            lineHeight: 0.94,
          }}
        >
          Stop wiring.
          <br />
          <span className="italic" style={{ color: ACCENT }}>
            Start shipping.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            "relative z-10 mt-7 max-w-lg text-pretty text-base text-[#3f6212] sm:text-lg",
            "dark:text-[#a3a3a3]",
          )}
        >
          A CLI that scaffolds production-ready fullstack apps across five language
          ecosystems. Pick your stack — frontend, database, auth, payments, AI — and run
          one command.
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
            className="group inline-flex items-center gap-1.5 rounded-md bg-[#bef264] px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-all hover:gap-2.5"
          >
            Open the builder
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/docs"
            className={cn(
              "rounded-md border border-[#e5e5e5] px-5 py-2.5 text-sm font-medium text-[#14532d] transition-colors",
              "dark:border-[#1f1f1f] dark:text-[#fafafa]",
            )}
          >
            Read the docs
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
