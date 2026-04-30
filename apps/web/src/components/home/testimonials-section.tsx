import { Quote } from "lucide-react";
import { motion } from "motion/react";

import { cn } from "@/lib/utils";

import type { Testimonial } from "./testimonials-data";

import { LIKED_BY, ROW_1, ROW_2, ROW_3 } from "./testimonials-data";

const SHORT_REACTION_MAX_LENGTH = 28;
const ALL_TESTIMONIALS: Testimonial[] = [...ROW_1, ...ROW_2, ...ROW_3];
const SUBSTANTIVE: Testimonial[] = [];
const REACTIONS: Testimonial[] = [];
for (const t of ALL_TESTIMONIALS) {
  if (t.gif || t.comment.length > SHORT_REACTION_MAX_LENGTH) {
    SUBSTANTIVE.push(t);
  } else {
    REACTIONS.push(t);
  }
}

function ReactionChip({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.025, 0.3) }}
      whileHover={{ y: -1 }}
      className="group inline-flex items-center gap-2 rounded-full border border-border bg-background py-1 pl-1 pr-3 text-xs transition-colors hover:border-foreground/30"
    >
      <img
        src={testimonial.avatar}
        alt={testimonial.name}
        loading="lazy"
        referrerPolicy="no-referrer"
        className="h-6 w-6 rounded-full border border-border"
      />
      <span className="text-foreground">&ldquo;{testimonial.comment}&rdquo;</span>
      <span className="hidden font-mono text-[10px] text-muted-foreground sm:inline">
        — {testimonial.name}
      </span>
    </motion.span>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.36) }}
      whileHover={{ y: -2 }}
      className="group relative flex h-full flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-colors hover:border-foreground/30"
    >
      <Quote
        className="absolute right-4 top-4 h-5 w-5 text-muted-foreground/15 transition-colors group-hover:text-lime-700/40"
        aria-hidden
      />
      <p className="text-pretty text-sm leading-relaxed text-muted-foreground">
        &ldquo;{testimonial.comment}&rdquo;
      </p>
      {testimonial.gif ? (
        <img
          src={testimonial.gif}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full rounded-md border border-border"
        />
      ) : null}
      <div className="mt-auto flex items-center gap-3 border-t border-border/60 pt-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-8 w-8 rounded-full border border-border"
        />
        <div className="min-w-0 flex-1">
          <span className="block truncate font-mono text-xs font-medium text-foreground">
            {testimonial.name}
          </span>
          <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            via daily.dev
          </span>
        </div>
      </div>
    </motion.figure>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative border-t border-border">
      <div className="px-4 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-12 gap-x-4 gap-y-6">
          <div className="col-span-12 sm:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-700">
              ✦ on the record
            </p>
            <h2
              className="mt-4 max-w-[18ch] text-balance font-mono font-bold tracking-[-0.04em]"
              style={{
                fontSize: "clamp(1.85rem, 5vw, 3.4rem)",
                lineHeight: 0.98,
              }}
            >
              People <span className="italic text-muted-foreground">almost</span> love it.
            </h2>
          </div>
          <div className="col-span-12 sm:col-span-5 sm:flex sm:items-end sm:justify-end">
            <p className="max-w-xs text-pretty text-sm text-muted-foreground sm:text-right">
              Posted on{" "}
              <a
                href="https://app.daily.dev/posts/a42eCYoJk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 transition-colors hover:text-lime-700"
              >
                daily.dev
              </a>{" "}
              and{" "}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 transition-colors hover:text-lime-700"
              >
                X
              </a>{" "}
              by people who shipped with it.
            </p>
          </div>
        </div>

        <div className="mt-12 columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
          {SUBSTANTIVE.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} index={i} />
          ))}
        </div>

        {REACTIONS.length > 0 ? (
          <div className="mt-10 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              ✦ + reactions
            </span>
            {REACTIONS.map((t, i) => (
              <ReactionChip key={`${t.name}-${i}`} testimonial={t} index={i} />
            ))}
          </div>
        ) : null}

        <div className="mt-16 border-t border-border pt-10">
          <div className="grid grid-cols-12 gap-x-4 gap-y-4">
            <div className="col-span-12 sm:col-span-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-700">
                ✦ liked on x
              </p>
              <p className="mt-2 text-xs text-muted-foreground">Builders who hearted the launch.</p>
            </div>
            <div className="col-span-12 sm:col-span-9">
              <ul className="flex flex-wrap gap-2">
                {LIKED_BY.map((person) => (
                  <li key={person.handle}>
                    <a
                      href={`https://x.com/${person.handle}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2.5 rounded-full border border-border bg-background py-1.5 pl-1.5 pr-3 transition-colors hover:border-foreground/30"
                    >
                      <img
                        src={person.avatar}
                        alt={person.name}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className={cn(
                          "h-7 w-7 rounded-full border border-border",
                          person.invertDark && "dark:bg-white dark:p-0.5",
                        )}
                      />
                      <span className="flex flex-col items-start text-left">
                        <span className="font-mono text-xs font-medium text-foreground">
                          {person.name}
                        </span>
                        <span className="font-mono text-[10px] text-muted-foreground">
                          {person.role}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
