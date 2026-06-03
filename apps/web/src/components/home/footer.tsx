import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { ChangelogModal } from "@/components/changelog-modal";

const GUIDE_LINKS = [
  { label: "TanStack Start", slug: "typescript/create-tanstack-start-project" },
  { label: "Next.js + Drizzle", slug: "typescript/nextjs-drizzle-better-auth" },
  { label: "FastAPI + Postgres", slug: "python/fastapi-postgres-sqlalchemy" },
  { label: "Axum + SeaORM", slug: "rust/axum-postgres-seaorm" },
  { label: "Gin + GORM", slug: "go/gin-postgres-gorm" },
  { label: "Spring Boot", slug: "java/spring-boot-postgres-jpa" },
] as const;

export default function Footer() {
  const [isChangelogOpen, setIsChangelogOpen] = useState(false);

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-3xl px-4 py-12">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
          <a
            href="https://github.com/Marve10s/Better-Fullstack"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="https://www.npmjs.com/package/create-better-fullstack?activeTab=readme"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            npm
          </a>
          <Link
            to="/compare"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Compare
          </Link>
          <Link
            to="/guides"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Guides
          </Link>
          <button
            type="button"
            onClick={() => setIsChangelogOpen(true)}
            className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
          >
            Changelog
          </button>
          <a
            href="https://github.com/Marve10s/Better-Fullstack/blob/main/LICENSE"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            MIT License
          </a>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <p className="text-center font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted-foreground">
            Popular guides
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs">
            {GUIDE_LINKS.map((link) => (
              <Link
                key={link.slug}
                to="/guides/$"
                params={{ _splat: link.slug }}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Originally inspired by{" "}
          <a
            href="https://github.com/AmanVarshney01/create-better-t-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            Aman Varshney's original upstream project
          </a>
        </p>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          {new Date().getFullYear()} Better Fullstack · Built by{" "}
          <a
            href="https://elkamali.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            Ibrahim Elkamali
          </a>
        </p>
      </div>

      <ChangelogModal open={isChangelogOpen} onOpenChange={setIsChangelogOpen} />
    </footer>
  );
}
