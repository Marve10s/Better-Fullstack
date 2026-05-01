import NumberFlow from "@number-flow/react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, useInView } from "motion/react";
import { lazy, Suspense, useRef } from "react";

import type { TechCategory } from "@/lib/types";

import { ContainerScroll } from "@/components/effects/container-scroll";
import { TechIcon } from "@/components/ui/tech-icon";
import { TECH_OPTIONS } from "@/lib/constant";

const WebGLShader = lazy(async () => {
  const m = await import("@/components/effects/web-gl-shader");
  return { default: m.WebGLShader };
});

type Layer = {
  cat: TechCategory;
  word: string;
};

const LAYERS: ReadonlyArray<Layer> = [
  { cat: "webFrontend", word: "FRONTEND FRAMEWORKS" },
  { cat: "backend", word: "BACKEND FRAMEWORKS" },
  { cat: "orm", word: "DATABASE ORMs" },
  { cat: "auth", word: "AUTH PROVIDERS" },
  { cat: "ai", word: "AI INTEGRATIONS" },
  { cat: "webDeploy", word: "DEPLOY TARGETS" },
];

function getOptions(cat: TechCategory) {
  return (TECH_OPTIONS[cat] ?? [])
    .filter((o) => !o.legacy && o.id !== "none")
    .map((o) => ({ id: o.id, name: o.name }));
}

export default function FeaturesSection() {
  return (
    <section className="relative border-t border-border bg-background">
      <div className="relative overflow-hidden border-b border-border">
        <div className="grid grid-cols-12 gap-x-6 gap-y-10 px-4 py-20 sm:px-8 sm:py-24">
          <div className="col-span-12 lg:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-700">
              ✦ pick anything
            </p>
            <h2
              className="mt-4 max-w-[24ch] text-balance font-mono font-bold tracking-[-0.045em]"
              style={{
                fontSize: "clamp(2.5rem, 9vw, 6rem)",
                lineHeight: 0.94,
              }}
            >
              All of it.{" "}
              <span className="italic text-muted-foreground">Wired together.</span>
            </h2>
            <p className="mt-8 max-w-md text-pretty text-base text-muted-foreground sm:text-lg">
              Six layers of opinionated infrastructure, picked à la carte. The CLI handles
              the wiring so you don&rsquo;t have to.
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
                    ✦ ready when you are
                  </div>
                  <div className="mt-auto">
                    <div
                      className="font-mono font-bold tracking-[-0.04em] text-white"
                      style={{
                        fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                        lineHeight: 0.95,
                      }}
                    >
                      Pick your <span className="italic">stack.</span>
                    </div>
                    <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all group-hover:gap-3">
                      Open the builder
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </Link>
            </ContainerScroll>
          </div>
        </div>
      </div>

      <ul>
        {LAYERS.map((layer, i) => (
          <LayerRow key={layer.cat} layer={layer} index={i} />
        ))}
      </ul>

      <TotalBlock />
    </section>
  );
}

function LayerRow({ layer, index }: { layer: Layer; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });
  const options = getOptions(layer.cat);
  const flip = index % 2 === 1;

  return (
    <li
      ref={ref}
      className="group relative overflow-hidden border-b border-border transition-colors hover:bg-muted/40"
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
            className="font-mono font-black leading-[0.82] tracking-[-0.05em]"
            style={{ fontSize: "clamp(5rem, 14vw, 11rem)" }}
          >
            <NumberFlow
              value={inView ? options.length : 0}
              format={{ minimumIntegerDigits: 2 }}
              transformTiming={{ duration: 700, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }}
            />
          </motion.div>
          <div
            className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-lime-700"
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
            className="font-mono font-bold uppercase leading-none tracking-[-0.03em]"
            style={{ fontSize: "clamp(2.5rem, 6.5vw, 4.5rem)" }}
          >
            {layer.word}
          </motion.h3>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 flex flex-wrap gap-1.5"
          >
            {options.map((opt, j) => (
              <motion.span
                key={opt.id}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{
                  duration: 0.3,
                  delay: 0.2 + Math.min(j * 0.02, 0.4),
                }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs transition-colors hover:border-foreground/30"
              >
                <TechIcon techId={opt.id} name={opt.name} className="size-3" />
                <span>{opt.name}</span>
              </motion.span>
            ))}
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
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-300">
              ✦ total
            </p>
            <p className="mt-2 max-w-[26ch] text-pretty text-sm text-background/70">
              Multiply this by every database, every CSS framework, every AI SDK, and you get
              more combinations than there are grains of sand.
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
                  value={inView ? 436 : 0}
                  transformTiming={{ duration: 1100, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)" }}
                />
              </span>
              <span className="text-lime-300" style={{ fontSize: "clamp(2rem, 6vw, 5rem)" }}>
                ✦
              </span>
            </motion.div>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.22em] text-background/70">
              options across 5 ecosystems · ts · rust · go · python · java
            </p>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}
