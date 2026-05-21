import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Terminal } from "lucide-react";
import { motion } from "motion/react";

import { TechIcon } from "@/components/ui/tech-icon";
import {
  STARTER_TRACKS,
  getStarterTrackBuilderSearch,
} from "@/lib/starter-tracks";
import { cn } from "@/lib/utils";

export default function StarterTracksSection() {
  return (
    <section className="border-t border-border bg-background">
      <div className="grid grid-cols-12 gap-x-6 gap-y-10 px-4 py-20 sm:px-8 sm:py-24">
        <div className="col-span-12 lg:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-black dark:text-[#bef264]">
            ✦ starter tracks
          </p>
          <h2
            className="mt-4 max-w-[12ch] text-balance font-mono font-bold tracking-[-0.04em]"
            style={{ fontSize: "clamp(2.25rem, 6vw, 4.5rem)", lineHeight: 0.96 }}
          >
            Choose by <span className="italic text-muted-foreground">intent.</span>
          </h2>
          <p className="mt-6 max-w-sm text-pretty text-sm text-muted-foreground sm:text-base">
            Curated paths turn the option graph into launchable starting points, then hand
            you back to the builder when you want to customize.
          </p>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {STARTER_TRACKS.map((track, index) => (
              <motion.article
                key={track.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.45, delay: Math.min(index * 0.04, 0.18) }}
                className="group flex min-h-[260px] flex-col rounded-md border border-border bg-fd-background p-4 transition-colors hover:border-muted-foreground/30 hover:bg-muted/35"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background">
                    <TechIcon techId={track.icon} name={track.name} className="h-5 w-5" />
                  </div>
                  <span className="rounded-md border border-border px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                    {track.intent}
                  </span>
                </div>

                <div className="mt-5">
                  <h3 className="font-mono text-lg font-semibold tracking-[-0.02em]">
                    {track.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {track.description}
                  </p>
                </div>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {track.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-md border border-border bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 pt-5">
                  <Link
                    to="/new"
                    search={getStarterTrackBuilderSearch(track)}
                    className="inline-flex h-8 flex-1 items-center justify-center gap-1.5 rounded-md bg-[#bef264] px-3 text-xs font-semibold text-[#0a0a0a] transition-all group-hover:gap-2"
                  >
                    <Terminal className="h-3.5 w-3.5" />
                    Builder
                  </Link>
                  <a
                    href={track.guideHref}
                    className={cn(
                      "inline-flex h-8 items-center justify-center gap-1.5 rounded-md border border-border px-3 text-xs font-medium transition-colors",
                      "hover:border-muted-foreground/40 hover:bg-muted",
                    )}
                  >
                    <BookOpen className="h-3.5 w-3.5" />
                    Guide
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <Link
            to="/new"
            search={{ view: "presets", file: "" }}
            className="mt-5 inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium transition-all hover:border-muted-foreground/40 hover:bg-muted hover:gap-2.5"
          >
            Browse every preset
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
