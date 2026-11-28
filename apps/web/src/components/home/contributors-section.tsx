import { motion } from "motion/react";
import {
  TbCode as Code2,
  TbGitPullRequest as GitPullRequest,
  TbHeart as Heart,
} from "react-icons/tb";

import { m } from "@/paraglide/messages.js";

type Contributor = {
  username: string;
  name: string;
  role: string;
  github: string;
};

const contributors: Contributor[] = [
  {
    username: "EthanShoeDev",
    name: "Ethan Shoe",
    role: "QA & testing",
    github: "https://github.com/EthanShoeDev",
  },
  {
    username: "Alisha-21-cloud",
    name: "Alisha",
    role: "Vinext framework, Docker Compose, Polar + Convex",
    github: "https://github.com/Alisha-21-cloud",
  },
  {
    username: "Divith123",
    name: "Divith S",
    role: "Version channels, builder parity",
    github: "https://github.com/Divith123",
  },
  {
    username: "Kavin-Bakyaraj",
    name: "Kavin B",
    role: "Elasticsearch search engine support",
    github: "https://github.com/Kavin-Bakyaraj",
  },
  {
    username: "taltas",
    name: "T",
    role: "Zoo Code docs, Resend React types",
    github: "https://github.com/taltas",
  },
];

function ContributorCard({ contributor, index }: { contributor: Contributor; index: number }) {
  return (
    <motion.a
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -2 }}
      href={contributor.github}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 rounded-3xl bg-surface-raised p-4 transition-colors hover:bg-ink/10 dark:hover:bg-white/10"
    >
      <img
        src={`https://avatars.githubusercontent.com/${contributor.username}?s=112`}
        alt={contributor.name}
        loading="lazy"
        className="h-14 w-14 rounded-full"
      />
      <div className="min-w-0 flex-1">
        <span className="block truncate font-medium text-foreground">{contributor.name}</span>
        <span className="block truncate text-sm text-muted-foreground">
          @{contributor.username}
        </span>
        <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Code2 className="h-3 w-3" aria-hidden />
          {contributor.role}
        </span>
      </div>
    </motion.a>
  );
}

export default function ContributorsSection() {
  return (
    <section className="mx-auto max-w-[1240px] px-4 pt-24 pb-24 sm:px-6 sm:pt-32 sm:pb-32">
      <div>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-4xl font-semibold leading-[1.04] tracking-[-0.04em] text-ink sm:text-5xl lg:text-6xl">
            {m.homeContributorsTitleA()} {m.homeContributorsTitleB()}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-relaxed text-soft sm:text-lg">
            {m.homeContributorsDescription()}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
          {contributors.map((contributor, i) => (
            <ContributorCard key={contributor.username} contributor={contributor} index={i} />
          ))}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="https://github.com/Marve10s/Better-Fullstack/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink/[0.07] px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink/[0.12] dark:bg-white/10 dark:hover:bg-white/15"
          >
            <GitPullRequest className="h-4 w-4" />
            {m.homeContributeGithub()}
          </a>
          <a
            href="https://github.com/sponsors/Marve10s"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-surface transition hover:opacity-90"
          >
            <Heart className="h-4 w-4" />
            {m.homeSponsorOnGithub()}
          </a>
        </div>
      </div>
    </section>
  );
}
