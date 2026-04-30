import { Code2, GitPullRequest, Heart } from "lucide-react";
import { motion } from "motion/react";

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
    username: "Alisha-21-cloud",
    name: "Alisha",
    role: "Polar payments + Convex integration",
    github: "https://github.com/Alisha-21-cloud",
  },
];

function ContributorCard({
  contributor,
  index,
}: {
  contributor: Contributor;
  index: number;
}) {
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
      className="group flex items-center gap-4 rounded-xl border border-border bg-background p-4 transition-colors hover:border-foreground/30"
    >
      <img
        src={`https://github.com/${contributor.username}.png`}
        alt={contributor.name}
        loading="lazy"
        className="h-14 w-14 rounded-full border-2 border-border transition-colors group-hover:border-lime-500/50"
      />
      <div className="min-w-0 flex-1">
        <span className="block truncate font-medium text-foreground">{contributor.name}</span>
        <span className="block truncate font-mono text-xs text-muted-foreground">
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
    <section className="relative border-t border-border bg-muted/30">
      <div className="px-4 py-20 sm:px-8 sm:py-28">
        <div className="grid grid-cols-12 gap-x-4 gap-y-6">
          <div className="col-span-12 sm:col-span-7">
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-lime-500">
              ✦ contributors
            </p>
            <h2
              className="mt-4 max-w-[18ch] text-balance font-mono font-bold tracking-[-0.04em]"
              style={{
                fontSize: "clamp(1.85rem, 5vw, 3.4rem)",
                lineHeight: 0.98,
              }}
            >
              Built in public.{" "}
              <span className="italic text-muted-foreground">By the community.</span>
            </h2>
          </div>
          <div className="col-span-12 sm:col-span-5 sm:flex sm:items-end sm:justify-end">
            <p className="max-w-xs text-pretty text-sm text-muted-foreground sm:text-right">
              Special thanks to the contributors who help improve Better Fullstack through
              testing, feedback, and code.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {contributors.map((contributor, i) => (
            <ContributorCard key={contributor.username} contributor={contributor} index={i} />
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href="https://github.com/Marve10s/Better-Fullstack/issues"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
          >
            <GitPullRequest className="h-4 w-4" />
            Contribute on GitHub
          </a>
          <a
            href="https://www.patreon.com/c/marve10s"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 rounded-md bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-colors hover:bg-foreground/90"
          >
            <Heart className="h-4 w-4" />
            Become a patron
          </a>
        </div>
      </div>
    </section>
  );
}
