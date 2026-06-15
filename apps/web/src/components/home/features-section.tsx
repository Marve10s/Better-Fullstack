import NumberFlow from "@number-flow/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { lazy, Suspense, useMemo, useRef } from "react";

import type { TechCategory } from "@/lib/types";

import { ContainerScroll } from "@/components/effects/container-scroll";
import { TechIcon } from "@/components/ui/tech-icon";
import { ECOSYSTEMS, TECH_OPTIONS } from "@/lib/constant";
import { m } from "@/paraglide/messages.js";

const WebGLShader = lazy(async () => {
  const m = await import("@/components/effects/web-gl-shader");
  return { default: m.WebGLShader };
});

type Layer =
  | { type: "ecosystems"; key: string; word: () => string }
  | { type: "categories"; categories: TechCategory[]; key: string; word: () => string };

const LAYERS: ReadonlyArray<Layer> = [
  { type: "ecosystems", key: "ecosystems", word: m.homeLayerLanguageEcosystems },
  {
    type: "categories",
    categories: ["webFrontend", "rustFrontend"],
    key: "frontend",
    word: m.homeLayerFrontendFrameworks,
  },
  {
    type: "categories",
    categories: [
      "backend",
      "rustWebFramework",
      "pythonWebFramework",
      "goWebFramework",
      "javaWebFramework",
      "elixirWebFramework",
      "dotnetWebFramework",
    ],
    key: "backend",
    word: m.homeLayerBackendFrameworks,
  },
  {
    type: "categories",
    categories: ["orm", "rustOrm", "pythonOrm", "goOrm", "javaOrm", "elixirOrm", "dotnetOrm"],
    key: "orm",
    word: m.homeLayerDatabaseOrms,
  },
  {
    type: "categories",
    categories: [
      "auth",
      "rustAuth",
      "pythonAuth",
      "goAuth",
      "javaAuth",
      "elixirAuth",
      "dotnetAuth",
    ],
    key: "auth",
    word: m.homeLayerAuthProviders,
  },
  {
    type: "categories",
    categories: ["ai", "pythonAi"],
    key: "ai",
    word: m.homeLayerAiIntegrations,
  },
];

function getOptions(categories: TechCategory[]) {
  const seen = new Set<string>();
  const results: { id: string; name: string }[] = [];

  for (const cat of categories) {
    for (const opt of TECH_OPTIONS[cat] ?? []) {
      if (!opt.legacy && opt.id !== "none" && !seen.has(opt.id)) {
        seen.add(opt.id);
        results.push({ id: opt.id, name: opt.name });
      }
    }
  }

  return results;
}

export default function FeaturesSection() {
  return (
    <section className="relative border-t border-border bg-background">
      <div className="relative overflow-hidden border-b border-border">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 px-4 py-20 sm:px-8 sm:py-24">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink dark:text-brand">
              ✦ {m.homeSevenEcosystems()}
            </p>
            <h2
              className="mt-4 max-w-[24ch] text-balance font-mono font-bold tracking-[-0.045em]"
              style={{
                fontSize: "clamp(2.5rem, 9vw, 6rem)",
                lineHeight: 0.94,
              }}
            >
              {m.homeNotJustTypeScript()}{" "}
              <span className="italic text-muted-foreground">{m.homeEverything()}</span>
            </h2>
            <p className="mt-8 max-w-md text-pretty text-base text-muted-foreground sm:text-lg">
              {m.homeFeaturesDescription()}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-5">
            <ContainerScroll>
              <Link
                to="/new"
                search={{ view: "command", file: "" }}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border bg-black"
              >
                <Suspense fallback={null}>
                  <WebGLShader className="absolute inset-0" />
                </Suspense>

                <div
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0) 35%, rgba(0,0,0,0.55) 80%, rgba(0,0,0,0.85) 100%)",
                  }}
                />

                <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
                  <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/70">
                    ✦ {m.homeReadyWhenYouAre()}
                  </div>
                  <div className="mt-auto">
                    <div
                      className="font-mono font-bold tracking-[-0.04em] text-white"
                      style={{
                        fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                        lineHeight: 0.95,
                      }}
                    >
                      {m.homePickYourStack()} <span className="italic">{m.homeStack()}</span>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition-all group-hover:gap-3">
                      {m.homeOpenBuilder()}
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </ContainerScroll>
          </div>
        </div>
      </div>

      <ul className="relative">
        {LAYERS.map((layer, i) => (
          <LayerRow key={layer.key} layer={layer} index={i} />
        ))}
      </ul>

      <TotalBlock />
    </section>
  );
}

function LayerRow({ layer, index }: { layer: Layer; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const flip = index % 2 === 1;

  const options = useMemo(() => {
    if (layer.type === "ecosystems") {
      return ECOSYSTEMS.map((e) => ({ id: e.id, name: e.name }));
    }
    return getOptions(layer.categories);
  }, [layer]);

  return (
    <li
      ref={ref}
      className="group relative z-10 overflow-hidden border-b border-border transition-colors hover:bg-muted/40"
    >
      <div
        className={`grid grid-cols-12 items-center gap-x-4 gap-y-6 px-4 py-12 sm:gap-x-6 sm:px-8 sm:py-16 ${
          flip ? "sm:[direction:rtl]" : ""
        }`}
      >
        <div className="col-span-12 sm:col-span-4 lg:col-span-3 sm:[direction:ltr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-mono font-black leading-[0.82] tracking-[-0.05em] text-ink"
            style={{ fontSize: "clamp(5rem, 14vw, 11rem)" }}
          >
            <NumberFlow
              value={inView ? options.length : 0}
              format={{ minimumIntegerDigits: 2 }}
              transformTiming={{ duration: 700, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }}
            />
          </motion.div>
          <div
            className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink dark:text-brand"
            style={{ direction: "ltr" }}
          >
            ✦ {String(index + 1).padStart(2, "0")}
          </div>
        </div>

        <div className="col-span-12 sm:col-span-8 lg:col-span-9 sm:[direction:ltr]">
          <motion.h3
            initial={{ opacity: 0, x: flip ? 16 : -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="font-mono font-bold uppercase leading-none tracking-[-0.03em] text-ink"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)" }}
          >
            {layer.word()}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={
              layer.type === "ecosystems"
                ? "mt-6 flex flex-wrap items-center gap-6"
                : "mt-5 flex flex-wrap gap-1.5"
            }
          >
            {options.map((opt, j) =>
              layer.type === "ecosystems" ? (
                <motion.div
                  key={opt.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: 0.2 + Math.min(j * 0.04, 0.4),
                  }}
                  className="flex flex-col items-center gap-2"
                >
                  <TechIcon techId={opt.id} name={opt.name} className="size-12 sm:size-14" />
                  <span className="font-mono text-xs font-medium text-foreground">{opt.name}</span>
                </motion.div>
              ) : (
                <motion.span
                  key={opt.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.3,
                    delay: 0.2 + Math.min(j * 0.02, 0.4),
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground transition-colors hover:border-foreground/30"
                >
                  <TechIcon techId={opt.id} name={opt.name} className="size-3" />
                  <span>{opt.name}</span>
                </motion.span>
              ),
            )}
          </motion.div>
        </div>
      </div>
    </li>
  );
}

function TotalBlock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30%" });

  return (
    <div ref={ref} className="relative overflow-hidden bg-foreground text-background">
      <ContainerScroll className="px-4 py-12 sm:px-8 sm:py-16">
        <div className="grid grid-cols-12 items-baseline gap-x-4 gap-y-4">
          <div className="col-span-12 sm:col-span-4 lg:col-span-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand">
              ✦ {m.homeTotal()}
            </p>
            <p className="mt-2 max-w-[26ch] text-pretty text-sm text-background/70">
              {m.homeTotalDescription()}
            </p>
          </div>
          <div className="col-span-12 sm:col-span-8 lg:col-span-9">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="flex items-baseline gap-3 font-mono font-black leading-[0.85] tracking-[-0.05em]"
            >
              <span style={{ fontSize: "clamp(5rem, 18vw, 14rem)" }}>
                <NumberFlow
                  value={inView ? 437 : 0}
                  transformTiming={{ duration: 1100, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }}
                />
              </span>
              <span className="text-brand" style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}>
                ✦
              </span>
            </motion.div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-background/70">
              {m.homeTotalOptions()}
            </p>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
