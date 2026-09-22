import { Link } from "@tanstack/react-router";
import { motion, useInView } from "motion/react";
import { useRef, useState } from "react";
import {
  TbArrowRight as ArrowRight,
  TbPlayerPauseFilled as Pause,
  TbPlayerPlayFilled as Play,
} from "react-icons/tb";

import logoDark from "@/assets/brand/bf-logo-ascii-dark.png?no-inline";
import logoLight from "@/assets/brand/bf-logo-ascii-light.png?no-inline";
import marshesDay from "@/assets/home/chat-marshes-day.avif";
import marshesNight from "@/assets/home/chat-marshes-night.avif";
import theoCaptions from "@/assets/home/theo-answer.en.vtt?url";
import theoPoster from "@/assets/home/theo-answer.jpg";
import theoClip from "@/assets/home/theo-answer.mp4";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

/**
 * ScaffBench 2.1, the last suite that ran both lanes: GPT-5.6 Luna, GPT-5.6 Sol
 * and DeepSeek V4 Flash each built the same 11 projects twice, once from a
 * prompt alone and once through our MCP. Ratios are pooled over those 33 pairs
 * (23 passing builds against 5); time covers the 22 pairs that recorded it.
 */
const GAINS = [
  { value: "4.6×", label: m.homeAiMoreWorking },
  { value: "2.8×", label: m.homeAiFasterDone },
  { value: "3.6×", label: m.homeAiFewerTokens },
];

const BUILDER_SEARCH = { view: "command", file: "" } as const;
const BUBBLE_EASE = [0.16, 1, 0.3, 1] as const;

const LINK =
  "group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink underline decoration-brand decoration-2 underline-offset-4 dark:text-brand";

/** His words from the clip, kept in English in every locale because it is a quote. */
const THEO_QUOTE = "The value of templates is going down.";

const GLASS = "border border-ink/10 backdrop-blur-xl dark:border-white/15";

/**
 * Martin Johnson Heade, "Sunlight and Shadow: The Newbury Marshes" (public
 * domain), graded day and night and faded into the page at both edges, so the
 * glass has something to blur. Deliberately not one of the hero scenes.
 */
function Backdrop() {
  const image =
    "absolute inset-0 size-full object-cover object-[50%_35%] transition-opacity duration-1000 ease-in-out motion-reduce:transition-none";

  // Both images are always in the page. This section is server-rendered, where the theme is
  // unknown, so picking one by theme disagrees with the browser on hydration and can leave a
  // dark-mode visitor with no backdrop. They load lazily and sit far below the first screen.
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <img
        src={marshesDay}
        alt=""
        loading="lazy"
        className={cn(image, "opacity-100 dark:opacity-0")}
      />
      <img
        src={marshesNight}
        alt=""
        loading="lazy"
        className={cn(image, "opacity-0 dark:opacity-100")}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,var(--background)_0%,transparent_28%,transparent_72%,var(--background)_100%)]" />
    </div>
  );
}

/** His answer on stream, cropped to the facecam. Sound only plays on click. */
function TheoClip() {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) void video.play();
    else video.pause();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={playing ? m.homeAiPauseClip() : m.homeAiPlayClip()}
      className="group relative size-20 shrink-0 cursor-pointer overflow-hidden rounded-full border border-white/40 shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-brand sm:size-28"
    >
      <video
        ref={ref}
        src={theoClip}
        poster={theoPoster}
        preload="none"
        playsInline
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => setPlaying(false)}
        className="size-full object-cover"
      >
        <track kind="captions" src={theoCaptions} srcLang="en" label="English" />
      </video>
      <span
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-black/25 text-white transition-opacity",
          playing && "opacity-0 group-hover:opacity-100",
        )}
      >
        {playing ? <Pause className="size-6" /> : <Play className="size-6" />}
      </span>
    </button>
  );
}

export default function AiAnswerSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-25%" });

  return (
    <section className="relative isolate overflow-hidden border-t border-border px-4 py-14 sm:px-8 sm:py-20">
      <Backdrop />
      <div ref={ref} className="mx-auto flex max-w-6xl flex-col gap-5">
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, ease: BUBBLE_EASE }}
          className="flex max-w-3xl origin-bottom-left items-end gap-3"
        >
          <TheoClip />
          <div
            className={cn(
              GLASS,
              "rounded-[2rem] rounded-bl-md bg-surface/55 px-6 py-5 shadow-xl shadow-black/5",
            )}
          >
            <p className="font-mono font-bold leading-[1.05] tracking-[-0.035em] text-ink [font-size:clamp(1.5rem,3.6vw,3rem)]">
              &ldquo;{THEO_QUOTE}&rdquo;{" "}
              {/* He never says "AI" in the clip. The reason is ours, so it stays outside the quote
                  marks and looks different from his words. */}
              <span className="whitespace-nowrap font-normal italic text-ink/55 [font-size:0.55em]">
                {m.homeAiSkepticGloss()}
              </span>
            </p>
            <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">
              Theo Browne · {m.homeAiSkepticWhere()}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.96 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15, ease: BUBBLE_EASE }}
          className="flex origin-bottom-right items-end justify-end gap-3"
        >
          <div
            className={cn(
              GLASS,
              "rounded-[2rem] rounded-br-md bg-brand/80 px-6 py-6 text-[#0a0a0a] shadow-xl shadow-black/10 sm:px-8 sm:py-7",
            )}
          >
            <p className="font-mono text-sm font-semibold sm:text-base">{m.homeAiReply()}</p>
            <dl className="mt-4 grid gap-x-10 gap-y-4 sm:grid-cols-3">
              {GAINS.map((gain) => (
                <div key={gain.value}>
                  <dd className="font-mono font-black leading-none tracking-[-0.05em] [font-size:clamp(2.75rem,6.5vw,5.5rem)]">
                    {gain.value}
                  </dd>
                  <dt className="mt-2 max-w-[15ch] text-sm leading-snug text-[#0a0a0a]/75 sm:text-base">
                    {gain.label()}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
          <img
            src={logoLight}
            alt=""
            className="h-10 w-auto shrink-0 drop-shadow sm:h-12 dark:hidden"
          />
          <img
            src={logoDark}
            alt=""
            className="hidden h-10 w-auto shrink-0 drop-shadow sm:h-12 dark:block"
          />
        </motion.div>

        <div
          className={cn(
            GLASS,
            "flex flex-wrap items-center gap-x-6 gap-y-3 self-end rounded-full bg-surface/55 px-5 py-3 max-sm:rounded-3xl",
          )}
        >
          <p className="text-sm text-ink/80">{m.homeAiBuilder()}</p>
          <Link to="/new" search={BUILDER_SEARCH} className={LINK}>
            {m.homeOpenBuilder()}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link to="/mcp" className={LINK}>
            {m.llmTryMcp()}
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
