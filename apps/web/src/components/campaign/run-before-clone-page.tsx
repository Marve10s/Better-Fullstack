import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import {
  TbArrowRight as ArrowRight,
  TbCheck as Check,
  TbCode as Code,
  TbDownload as Download,
  TbEdit as Edit,
  TbPlayerPlay as Play,
  TbShieldLock as Shield,
  TbTerminal2 as Terminal,
} from "react-icons/tb";

import { TechIcon } from "@/components/ui/tech-icon";
import { trackCampaignEvent } from "@/lib/analytics/campaign-analytics";
import {
  CAMPAIGN_BUILDER_SEARCH,
  CAMPAIGN_PRESETS,
  CAMPAIGN_SLUG,
  getCampaignPresetUrl,
} from "@/lib/campaign/campaign";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

const ACCENTS = {
  lime: "border-[#C6E853]/35 text-[#C6E853]",
  cyan: "border-[#18D5FF]/35 text-[#18D5FF]",
  pink: "border-[#FF5C8A]/35 text-[#FF5C8A]",
} as const;

const WORKFLOW = [
  { id: "01", icon: Play, title: () => m.campaignStepRun(), copy: () => m.campaignStepRunCopy() },
  {
    id: "02",
    icon: Edit,
    title: () => m.campaignStepEdit(),
    copy: () => m.campaignStepEditCopy(),
  },
  {
    id: "03",
    icon: Download,
    title: () => m.campaignStepDownload(),
    copy: () => m.campaignStepDownloadCopy(),
  },
] as const;

function ProductWindow() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 28, rotateX: 4 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ duration: 0.75, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-xl border border-white/12 bg-[#111113] shadow-[0_30px_100px_rgba(0,0,0,0.45)]"
    >
      <div className="flex h-10 items-center gap-2 border-white/8 border-b bg-[#171719] px-4">
        <span className="size-2.5 rounded-full bg-[#FF5C8A]" />
        <span className="size-2.5 rounded-full bg-[#C6E853]" />
        <span className="size-2.5 rounded-full bg-[#18D5FF]" />
        <span className="mx-auto rounded-md border border-white/8 bg-black/20 px-16 py-1 font-mono text-[9px] text-white/35">
          better-fullstack.dev/new
        </span>
      </div>

      <div className="grid min-h-[360px] grid-cols-[7.5rem_1fr] sm:min-h-[430px] sm:grid-cols-[10rem_1fr]">
        <div className="border-white/8 border-r bg-black/10 p-3">
          <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
            project files
          </div>
          <div className="mt-4 space-y-2 font-mono text-[9px] text-white/45">
            {["app", "components", "package.json", "vite.config.ts"].map((file, index) => (
              <motion.div
                key={file}
                initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.42 + index * 0.06 }}
                className={cn("rounded px-2 py-1.5", index === 1 && "bg-white/7 text-white/85")}
              >
                {index < 2 ? "⌄ " : "  "}
                {file}
              </motion.div>
            ))}
          </div>
        </div>

        <div className="grid min-w-0 grid-rows-[1fr_7.5rem]">
          <div className="grid min-w-0 grid-cols-1 sm:grid-cols-2">
            <div className="min-w-0 border-white/8 border-b p-4 sm:border-r sm:border-b-0">
              <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-white/35">
                <span>app/page.tsx</span>
                <Code className="size-3" />
              </div>
              <pre className="mt-5 overflow-hidden font-mono text-[9px] leading-6 text-white/55 sm:text-[10px]">
                <code>
                  <span className="text-[#FF5C8A]">export default</span>
                  {" function Page() {\n  "}
                  <span className="text-[#FF5C8A]">return</span>
                  {" (\n    <main>\n      <h1>\n        "}
                  <motion.span
                    initial={reduceMotion ? false : { backgroundColor: "rgba(198,232,83,0)" }}
                    animate={{ backgroundColor: "rgba(198,232,83,0.16)" }}
                    transition={{ delay: 1.05, duration: 0.35 }}
                    className="text-[#C6E853]"
                  >
                    Ship the product.
                  </motion.span>
                  {"\n      </h1>\n    </main>\n  )\n}"}
                </code>
              </pre>
            </div>
            <div className="hidden min-w-0 bg-[#f6f5f1] p-5 text-[#1b1a17] sm:block">
              <div className="flex h-full flex-col rounded-md border border-[#e1e0d8] bg-white p-5">
                <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#6c6a61]">
                  live preview
                </span>
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.95, duration: 0.4 }}
                  className="mt-auto"
                >
                  <p className="font-mono text-2xl font-bold tracking-[-0.05em]">
                    Ship the product.
                  </p>
                  <div className="mt-4 inline-flex rounded bg-[#C6E853] px-3 py-2 font-mono text-[9px] font-semibold">
                    It is running
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          <div className="border-white/8 border-t bg-[#0c0c0e] p-3 font-mono text-[9px] leading-5 text-white/40">
            <div className="flex items-center gap-2 text-white/55">
              <Terminal className="size-3 text-emerald-400" />
              runtime output
              <span className="ml-auto flex items-center gap-1.5 text-emerald-400">
                <span className="size-1.5 rounded-full bg-emerald-400" />
                ready
              </span>
            </div>
            <div className="mt-2 text-white/35">$ dev server ready at localhost:5173</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function RunBeforeClonePage() {
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    trackCampaignEvent("campaign_viewed", { campaign: CAMPAIGN_SLUG });
  }, []);

  return (
    <main className="min-h-svh bg-[#0c0c0e] text-[#f2eeee] [color-scheme:dark]">
      <section className="relative isolate overflow-hidden border-white/10 border-b">
        <div
          className="pointer-events-none absolute inset-0 -z-10 opacity-70"
          style={{
            backgroundImage:
              "linear-gradient(rgba(242,238,238,0.045) 1px,transparent 1px),linear-gradient(90deg,rgba(242,238,238,0.045) 1px,transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />
        <div className="mx-auto grid max-w-[1480px] gap-14 border-white/10 border-x px-5 py-16 sm:px-9 sm:py-24 lg:grid-cols-[0.88fr_1.12fr] lg:items-center lg:gap-16 lg:px-14 lg:py-28">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[#C6E853]">
              ✦ {m.campaignEyebrow()}
            </p>
            <h1 className="mt-6 max-w-[10ch] text-balance font-mono text-5xl font-bold leading-[0.92] tracking-[-0.065em] sm:text-7xl lg:text-[5.75rem]">
              {m.campaignTitle()}
            </h1>
            <p className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-[#b3b0b0] sm:text-lg">
              {m.campaignDescription()}
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={getCampaignPresetUrl(CAMPAIGN_PRESETS[0].id)}
                onClick={() =>
                  trackCampaignEvent("campaign_preset_opened", {
                    campaign: CAMPAIGN_SLUG,
                    preset: CAMPAIGN_PRESETS[0].id,
                    placement: "hero",
                  })
                }
                className="group inline-flex items-center gap-2 rounded-md bg-[#C6E853] px-5 py-3 font-mono text-sm font-semibold text-[#202602] transition-transform hover:-translate-y-0.5"
              >
                <Play className="size-4 fill-current" />
                {m.campaignRunStack()}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <Link
                to="/new"
                search={CAMPAIGN_BUILDER_SEARCH}
                className="rounded-md border border-white/15 px-5 py-3 font-mono text-sm text-white/75 transition-colors hover:border-white/30 hover:text-white"
              >
                {m.campaignBrowseBuilder()}
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[10px] uppercase tracking-[0.12em] text-white/40">
              <span className="inline-flex items-center gap-1.5">
                <Check className="size-3 text-[#18D5FF]" /> {m.campaignNoSignup()}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Shield className="size-3 text-[#18D5FF]" /> {m.campaignLocalOnly()}
              </span>
            </div>
          </motion.div>

          <ProductWindow />
        </div>
      </section>

      <section className="mx-auto max-w-[1480px] border-white/10 border-x">
        <div className="grid border-white/10 border-b lg:grid-cols-3">
          {WORKFLOW.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.article
                key={step.id}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ delay: index * 0.08 }}
                className="border-white/10 border-b p-7 last:border-b-0 lg:border-r lg:border-b-0 lg:last:border-r-0"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-white/35">
                    {step.id}
                  </span>
                  <Icon className="size-5 text-[#C6E853]" />
                </div>
                <h2 className="mt-10 font-mono text-2xl font-bold tracking-[-0.04em]">
                  {step.title()}
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#b3b0b0]">
                  {step.copy()}
                </p>
              </motion.article>
            );
          })}
        </div>

        <div className="px-5 py-14 sm:px-9 sm:py-20 lg:px-14">
          <div className="flex flex-col justify-between gap-4 border-white/10 border-b pb-8 sm:flex-row sm:items-end">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#18D5FF]">
                {m.campaignCuratedEyebrow()}
              </p>
              <h2 className="mt-3 font-mono text-3xl font-bold tracking-[-0.05em] sm:text-5xl">
                {m.campaignCuratedTitle()}
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-[#b3b0b0]">
              {m.campaignCuratedDescription()}
            </p>
          </div>

          <div className="mt-8 grid gap-3 lg:grid-cols-5">
            {CAMPAIGN_PRESETS.map((preset, index) => (
              <a
                key={preset.id}
                href={getCampaignPresetUrl(preset.id)}
                onClick={() =>
                  trackCampaignEvent("campaign_preset_opened", {
                    campaign: CAMPAIGN_SLUG,
                    preset: preset.id,
                    placement: "preset_grid",
                  })
                }
                className="group flex min-h-64 flex-col rounded-lg border border-white/10 bg-[#111113] p-4 transition-all hover:-translate-y-1 hover:border-white/25 hover:bg-[#151517]"
              >
                <div className="flex -space-x-1.5">
                  {preset.iconIds.map((iconId) => (
                    <span
                      key={iconId}
                      className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-[#1a1a1a]"
                    >
                      <TechIcon techId={iconId} name={iconId} className="size-4" />
                    </span>
                  ))}
                </div>
                <span
                  className={cn(
                    "mt-8 w-fit rounded-full border px-2 py-1 font-mono text-[8px] uppercase tracking-[0.16em]",
                    ACCENTS[preset.accent],
                  )}
                >
                  browser runnable
                </span>
                <h3 className="mt-4 font-mono text-lg font-bold tracking-[-0.035em]">
                  {preset.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-white/48">{preset.description}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-6 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55 transition-colors group-hover:text-white">
                  {m.campaignRunThisStack()}
                  <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                </span>
                <span className="sr-only">{index + 1}</span>
              </a>
            ))}
          </div>
        </div>

        <div className="border-white/10 border-t px-5 py-16 text-center sm:px-9 sm:py-24">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[#FF5C8A]">
            {m.campaignCtaEyebrow()}
          </p>
          <h2 className="mx-auto mt-4 max-w-[14ch] text-balance font-mono text-4xl font-bold tracking-[-0.055em] sm:text-6xl">
            {m.campaignCtaTitle()}
          </h2>
          <a
            href={getCampaignPresetUrl(CAMPAIGN_PRESETS[0].id)}
            onClick={() =>
              trackCampaignEvent("campaign_preset_opened", {
                campaign: CAMPAIGN_SLUG,
                preset: CAMPAIGN_PRESETS[0].id,
                placement: "footer",
              })
            }
            className="group mt-8 inline-flex items-center gap-2 rounded-md bg-[#f2eeee] px-5 py-3 font-mono text-sm font-semibold text-[#0c0c0e] transition-transform hover:-translate-y-0.5"
          >
            {m.campaignRunStack()}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>
      </section>
    </main>
  );
}
