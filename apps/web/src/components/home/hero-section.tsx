import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Copy } from "lucide-react";
import { motion } from "motion/react";
import { lazy, Suspense, useState } from "react";

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

const C = {
  bg: "#0a0a0a",
  ink: "#fafafa",
  muted: "#7a7a7a",
  mutedHi: "#a3a3a3",
  accent: "#bef264",
  accentDeep: "#84cc16",
  rule: "#1f1f1f",
  ruleSoft: "#161616",
  panel: "#111111",
};

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
      className="relative"
      style={{ background: C.bg, color: C.ink, colorScheme: "dark" }}
    >
      <div
        className="px-4 pb-5 pt-6 sm:px-8 sm:pt-8"
        style={{ borderBottom: `1px solid ${C.rule}` }}
      >
        <div className="flex items-baseline justify-between">
          <span
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: C.accent }}
          >
            ✦ install
          </span>
          <span
            className="font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: C.muted }}
          >
            v1.6.2 · apr 29, 2026
          </span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mt-3 overflow-hidden rounded-md"
          style={{ border: `1px solid ${C.rule}`, background: C.panel }}
        >
          <div className="flex" style={{ borderBottom: `1px solid ${C.rule}` }}>
            {PMS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPm(p)}
                className="flex cursor-pointer items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors sm:gap-2 sm:px-4"
                style={{
                  borderRight: `1px solid ${C.rule}`,
                  background: pm === p ? C.accent : "transparent",
                  color: pm === p ? C.bg : C.mutedHi,
                }}
              >
                <PackageIcon pm={p} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5 sm:py-4">
            <code className="truncate font-mono text-sm sm:text-base">
              <span style={{ color: C.accent }}>$</span> {COMMANDS[pm]}
            </code>
            <button
              type="button"
              onClick={copy}
              aria-label="Copy command"
              className="flex size-8 cursor-pointer items-center justify-center rounded-md transition-colors active:translate-y-[1px]"
              style={{
                color: copied ? C.accent : C.mutedHi,
                background: "transparent",
              }}
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
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(90deg, " + C.bg + " 0%, " + C.bg + " 18%, transparent 60%, transparent 100%)",
            }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative z-10 font-mono text-[11px] uppercase tracking-[0.22em]"
          style={{ color: C.accent }}
        >
          ✦ the cli
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="relative z-10 mt-5 max-w-[15ch] text-balance font-mono font-bold tracking-[-0.045em]"
          style={{
            fontSize: "clamp(2.75rem, 9vw, 6.5rem)",
            lineHeight: 0.94,
            color: C.ink,
          }}
        >
          Stop wiring.
          <br />
          <span className="italic" style={{ color: C.accent }}>
            Start shipping.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative z-10 mt-7 max-w-lg text-pretty text-base sm:text-lg"
          style={{ color: C.mutedHi }}
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
            className="group inline-flex items-center gap-1.5 rounded-md px-5 py-2.5 text-sm font-semibold transition-all hover:gap-2.5"
            style={{ background: C.accent, color: C.bg }}
          >
            Open the builder
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            to="/docs"
            className="rounded-md px-5 py-2.5 text-sm font-medium transition-colors"
            style={{
              border: `1px solid ${C.rule}`,
              color: C.ink,
            }}
          >
            Read the docs
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
