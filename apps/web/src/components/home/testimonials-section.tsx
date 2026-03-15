
import { Heart, Quote } from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

import { LIKED_BY, ROW_1, ROW_2, ROW_3 } from "./testimonials-data";
import type { Testimonial } from "./testimonials-data";

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="group relative flex w-[320px] shrink-0 flex-col gap-3 rounded-xl border border-border bg-background p-5 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_-5px_hsl(var(--primary)/0.15)]">
      <Quote className="absolute top-4 right-4 h-5 w-5 text-muted-foreground/10 transition-colors duration-300 group-hover:text-primary/20" />
      <p className="text-sm leading-relaxed text-muted-foreground">
        &ldquo;{testimonial.comment}&rdquo;
      </p>
      {testimonial.gif && (
        <img
          src={testimonial.gif}
          alt="Rick Sanchez reaction GIF"
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full rounded-md border border-border"
        />
      )}
      <div className="mt-auto flex items-center gap-3 border-t border-border/50 pt-3">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          loading="lazy"
          referrerPolicy="no-referrer"
          className="h-8 w-8 rounded-full border border-border transition-all duration-300 group-hover:border-primary/30"
        />
        <div className="flex flex-col">
          <span className="font-mono text-xs font-medium text-foreground">
            {testimonial.name}
          </span>
          <span className="font-mono text-[10px] text-muted-foreground/60">
            via daily.dev
          </span>
        </div>
      </div>
    </div>
  );
}

function MarqueeRow({
  testimonials,
  direction = "left",
  durationSeconds = 60,
}: {
  testimonials: Testimonial[];
  direction?: "left" | "right";
  durationSeconds?: number;
}) {
  const doubled = [...testimonials, ...testimonials];

  return (
    <div className="group/marquee relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
      <div
        className={cn(
          "flex w-max gap-4 py-2 group-hover/marquee:[animation-play-state:paused]",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        )}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} />
        ))}
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const ref = useRef(null);

  return (
    <section
      ref={ref}
      className="overflow-hidden border-t border-border py-16"
    >
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="mx-auto mb-10 max-w-3xl px-4"
      >
        <h2 className="font-pixel text-xl font-bold">
          People almost love it!
        </h2>
        <p className="mt-2 text-muted-foreground">
          What the community is saying on{" "}
          <a
            href="https://app.daily.dev/posts/a42eCYoJk"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4 transition-colors hover:text-foreground"
          >
            daily.dev
          </a>
        </p>
      </motion.div>

      <div className="space-y-4">
        <MarqueeRow testimonials={ROW_1} direction="left" durationSeconds={50} />
        <MarqueeRow testimonials={ROW_2} direction="right" durationSeconds={60} />
        <MarqueeRow testimonials={ROW_3} direction="left" durationSeconds={45} />
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 }}
        className="liked-by mx-auto mt-14 max-w-3xl px-4"
      >
        <div className="flex items-center gap-2.5 text-sm text-muted-foreground">
          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
          <span className="font-mono uppercase tracking-wide">
            Liked on X by
          </span>
        </div>
        <div className="mt-5 flex flex-wrap gap-4">
          {LIKED_BY.map((person) => (
            <a
              key={person.handle}
              href={`https://x.com/${person.handle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_20px_-5px_hsl(var(--primary)/0.1)]"
            >
              <img
                src={person.avatar}
                alt={person.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className={cn(
                  "h-9 w-9 rounded-full border border-border transition-all duration-300 group-hover:border-primary/30",
                  person.invertDark && "dark:bg-white dark:p-0.5",
                )}
              />
              <div className="flex flex-col">
                <span className="font-mono text-sm font-medium text-foreground">
                  {person.name}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground/60">
                  {person.role}
                </span>
              </div>
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
