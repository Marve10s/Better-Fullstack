import { motion } from "motion/react";
import { TbQuote as Quote } from "react-icons/tb";

import type { Testimonial } from "@/components/home/testimonials-data";

import { ROW_1, ROW_2, ROW_3 } from "@/components/home/testimonials-data";
import { m } from "@/paraglide/messages.js";

const SHORT_REACTION_MAX_LENGTH = 28;
const TESTIMONIALS = [...ROW_1, ...ROW_2, ...ROW_3].filter(
  (t) => t.gif || t.comment.length > SHORT_REACTION_MAX_LENGTH,
);

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
        className="absolute right-4 top-4 h-5 w-5 text-muted-foreground/15 transition-colors group-hover:text-ink/30 dark:group-hover:text-brand/40"
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
        </div>
      </div>
    </motion.figure>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="relative border-t border-border">
      <div className="px-4 py-20 sm:px-8 sm:py-28">
        <h2
          className="text-balance font-mono font-bold tracking-[-0.04em]"
          style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.25rem)", lineHeight: 1 }}
        >
          {m.homeTestimonialsTitleA()}{" "}
          <span className="italic text-muted-foreground">{m.homeTestimonialsTitleB()}</span>{" "}
          {m.homeTestimonialsTitleC()}
        </h2>
        <a
          href="https://app.daily.dev/posts/a42eCYoJk"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-xs text-muted-foreground underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-foreground"
        >
          {m.homeTestimonialsSource()}
        </a>

        <div className="mt-12 columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={`${t.name}-${i}`} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
