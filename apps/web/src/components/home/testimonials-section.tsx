import { motion } from "motion/react";

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
      className="flex flex-col gap-4 rounded-3xl bg-surface-raised p-5 sm:p-6"
    >
      <blockquote className="text-pretty text-[15px] leading-relaxed text-ink">
        {testimonial.comment}
      </blockquote>
      {testimonial.gif ? (
        <img
          src={testimonial.gif}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="w-full rounded-2xl"
        />
      ) : null}
      <figcaption className="flex items-center gap-3">
        <img
          src={testimonial.avatar}
          alt=""
          loading="lazy"
          referrerPolicy="no-referrer"
          className="size-9 rounded-full"
        />
        <span className="truncate text-sm font-semibold text-ink">{testimonial.name}</span>
      </figcaption>
    </motion.figure>
  );
}

export default function TestimonialsSection() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 pt-24 sm:px-6 sm:pt-32">
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
          {m.homeTestimonialsTitleA()} {m.homeTestimonialsTitleB()} {m.homeTestimonialsTitleC()}
        </h2>
        <a
          href="https://app.daily.dev/posts/a42eCYoJk"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-block text-sm font-medium text-soft underline decoration-brand decoration-2 underline-offset-4 transition-colors hover:text-ink"
        >
          {m.homeTestimonialsSource()}
        </a>
      </div>

      <div className="mt-10 columns-1 gap-3 sm:mt-14 sm:columns-2 lg:columns-3 [&>*]:mb-3 [&>*]:break-inside-avoid">
        {TESTIMONIALS.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} testimonial={t} index={i} />
        ))}
      </div>
    </section>
  );
}
