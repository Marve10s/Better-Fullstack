import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { ContainerScroll } from "@/components/effects/container-scroll";

const ShaderLines = lazy(async () => {
  const m = await import("@/components/effects/shader-lines");
  return { default: m.ShaderLines };
});
const WebGLShader = lazy(async () => {
  const m = await import("@/components/effects/web-gl-shader");
  return { default: m.WebGLShader };
});
const SpookySmoke = lazy(async () => {
  const m = await import("@/components/effects/spooky-smoke");
  return { default: m.SpookySmoke };
});

export const Route = createFileRoute("/effects")({
  component: EffectsShowcase,
});

function EffectsShowcase() {
  return (
    <main
      className="min-h-svh"
      style={{ background: "#0a0a0a", color: "#fafafa", colorScheme: "dark" }}
    >
      <div className="mx-auto max-w-[1480px] px-6 py-16 sm:py-20">
        <header className="mb-14">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-400">
            ✦ effects showcase
          </p>
          <h1
            className="mt-3 max-w-[20ch] text-balance font-mono font-bold tracking-[-0.04em]"
            style={{ fontSize: "clamp(2rem, 6vw, 4rem)", lineHeight: 0.96 }}
          >
            Four effects.{" "}
            <span className="italic text-white/50">Pick what fits.</span>
          </h1>
          <p className="mt-4 max-w-md text-sm text-white/55">
            Standalone preview of each component sourced from the 21st.dev references. The
            three shader effects share a small WebGL fragment-shader runner; the container
            scroll uses motion only.
          </p>
        </header>

        <div className="space-y-10">
          <Demo
            id="01"
            title="Shader Lines"
            note="aliimam/shader-lines · WebGL · animated diagonal stripes, lime/cyan tint"
          >
            <Suspense fallback={<DemoFallback label="loading shader…" />}>
              <ShaderLines className="absolute inset-0" />
            </Suspense>
          </Demo>

          <Demo
            id="02"
            title="WebGL Shader · Rainbow Lines"
            note="aliimam/web-gl-shader · ported from three.js · chromatic-RGB sine waves with radial distortion"
          >
            <Suspense fallback={<DemoFallback label="loading shader…" />}>
              <WebGLShader className="absolute inset-0" />
            </Suspense>
          </Demo>

          <Demo
            id="03"
            title="Spooky Smoke"
            note="easemize/spooky-smoke · WebGL · 5-octave fbm noise, warm orange-purple"
          >
            <Suspense fallback={<DemoFallback label="loading shader…" />}>
              <SpookySmoke className="absolute inset-0" />
            </Suspense>
          </Demo>

          <section
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "rgba(255,255,255,0.08)" }}
          >
            <header
              className="flex items-baseline justify-between border-b px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
            >
              <span>04 · Container Scroll Animation</span>
              <span>aceternity/container-scroll · motion · scroll for 3D tilt</span>
            </header>
            <div className="px-6 pb-32 pt-12 sm:px-12">
              <ContainerScroll
                title={
                  <h2
                    className="text-center font-mono font-bold tracking-[-0.04em]"
                    style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)", lineHeight: 1 }}
                  >
                    Scroll into{" "}
                    <span className="italic text-lime-400">place.</span>
                  </h2>
                }
              >
                <div
                  className="aspect-[16/9] w-full overflow-hidden rounded-2xl border"
                  style={{
                    borderColor: "rgba(255,255,255,0.1)",
                    background:
                      "linear-gradient(135deg, rgba(190,242,100,0.18) 0%, rgba(64,160,238,0.18) 60%, rgba(244,114,182,0.14) 100%)",
                  }}
                >
                  <div className="flex h-full w-full flex-col items-start justify-end gap-4 p-8 sm:p-12">
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-300">
                      ✦ preview
                    </p>
                    <p className="text-2xl font-semibold sm:text-4xl">
                      Drop any content here — a screenshot, terminal output, big number, or
                      a code snippet.
                    </p>
                    <code className="rounded-md border border-white/10 bg-black/40 px-3 py-1.5 font-mono text-xs sm:text-sm">
                      $ bun create better-fullstack@latest
                    </code>
                  </div>
                </div>
              </ContainerScroll>
            </div>
          </section>
        </div>

        <footer
          className="mt-16 border-t pt-6 font-mono text-[10.5px] uppercase tracking-[0.22em]"
          style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
        >
          <p>
            implemented locally · no new deps · webgl shaders run via a 90-line fragment-shader
            runner · container scroll uses the existing motion library
          </p>
        </footer>
      </div>
    </main>
  );
}

function Demo({
  id,
  title,
  note,
  children,
}: {
  id: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className="overflow-hidden rounded-2xl border"
      style={{ borderColor: "rgba(255,255,255,0.08)" }}
    >
      <header
        className="flex items-baseline justify-between border-b px-6 py-3 font-mono text-[11px] uppercase tracking-[0.18em]"
        style={{ borderColor: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.5)" }}
      >
        <span>
          {id} · {title}
        </span>
        <span className="hidden sm:inline">{note}</span>
      </header>
      <div className="relative h-[420px] w-full bg-black">{children}</div>
    </section>
  );
}

function DemoFallback({ label }: { label: string }) {
  return (
    <div className="flex h-full w-full items-center justify-center font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
      {label}
    </div>
  );
}
