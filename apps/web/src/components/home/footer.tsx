import { PACKAGE_MANAGER_COMMANDS } from "@better-fullstack/types";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
import { TbCheck as Check, TbCopy as Copy } from "react-icons/tb";

import { requestLaunchRadarOpen } from "@/lib/content/launch-radar";
import { cn } from "@/lib/platform/utils";
import { m } from "@/paraglide/messages.js";

const GUIDE_LINKS = [
  { label: "TanStack Start", slug: "typescript/create-tanstack-start-project" },
  { label: "Next.js + Drizzle", slug: "typescript/nextjs-drizzle-better-auth" },
  { label: "FastAPI + Postgres", slug: "python/fastapi-postgres-sqlalchemy" },
  { label: "Axum + SeaORM", slug: "rust/axum-postgres-seaorm" },
  { label: "Gin + GORM", slug: "go/gin-postgres-gorm" },
  { label: "Spring Boot", slug: "java/spring-boot-postgres-jpa" },
] as const;

const INSTALL_COMMAND = PACKAGE_MANAGER_COMMANDS.bun;
const ACCENT_TEXT = "text-ink dark:text-brand";
const COLUMN_TITLE =
  "font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-ink dark:text-brand";
const FOOTER_LINK = "text-sm text-muted-foreground transition-colors hover:text-foreground";
const EXTERNAL_LINK = "text-foreground underline underline-offset-4";

function LinkColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <nav aria-label={title} className={className}>
      <p className={COLUMN_TITLE}>✦ {title}</p>
      <ul className="mt-4 space-y-2.5">{children}</ul>
    </nav>
  );
}

export default function Footer() {
  const prefersReducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(INSTALL_COMMAND).then(
      () => {
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1600);
        return;
      },
      () => {},
    );
  };

  return (
    <footer className="border-t border-border bg-background">
      <div className="px-4 py-12 sm:px-8 sm:py-16">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-12 gap-x-6 gap-y-10"
        >
          <div className="col-span-12 lg:col-span-4">
            <Link
              to="/"
              className="font-mono text-base font-bold tracking-[-0.02em] text-foreground"
            >
              better<span className="text-muted-foreground">/fullstack</span>
            </Link>
            <p className="mt-3 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
              {m.footerTagline()}
            </p>
            <div className="mt-5 flex w-full max-w-sm items-center gap-2.5 rounded-md border border-border bg-card px-3 py-2">
              <span className={cn("shrink-0 font-mono text-xs", ACCENT_TEXT)}>$</span>
              <code className="no-scrollbar min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-xs">
                {INSTALL_COMMAND}
              </code>
              <button
                type="button"
                onClick={copy}
                aria-label={copied ? m.navCommandCopied() : m.navCopyInstallCommand()}
                className={cn(
                  "flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors active:translate-y-[1px]",
                  copied ? ACCENT_TEXT : "text-muted-foreground hover:text-foreground",
                )}
              >
                {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              </button>
            </div>
          </div>

          <LinkColumn title={m.footerProduct()} className="col-span-6 sm:col-span-3 lg:col-span-2">
            <li>
              <Link to="/run-before-you-clone" className={FOOTER_LINK}>
                {m.navLiveRun()}
              </Link>
            </li>
            <li>
              <Link to="/compare" className={FOOTER_LINK}>
                {m.navCompare()}
              </Link>
            </li>
            <li>
              <Link to="/templates" className={FOOTER_LINK}>
                {m.navTemplates()}
              </Link>
            </li>
            <li>
              <Link
                to="/"
                hash="whats-new"
                onClick={requestLaunchRadarOpen}
                className={FOOTER_LINK}
              >
                {m.navUpdates()}
              </Link>
            </li>
          </LinkColumn>

          <LinkColumn title={m.footerLearn()} className="col-span-6 sm:col-span-3 lg:col-span-2">
            <li>
              <Link to="/guides" className={FOOTER_LINK}>
                {m.navGuides()}
              </Link>
            </li>
            <li>
              <Link to="/docs" className={FOOTER_LINK}>
                {m.navDocs()}
              </Link>
            </li>
            <li>
              <Link to="/blog" className={FOOTER_LINK}>
                {m.navBlog()}
              </Link>
            </li>
          </LinkColumn>

          <LinkColumn
            title={m.footerPopularGuides()}
            className="col-span-6 sm:col-span-3 lg:col-span-2"
          >
            {GUIDE_LINKS.map((link) => (
              <li key={link.slug}>
                <Link to="/guides/$" params={{ _splat: link.slug }} className={FOOTER_LINK}>
                  {link.label}
                </Link>
              </li>
            ))}
          </LinkColumn>

          <LinkColumn title={m.footerProject()} className="col-span-6 sm:col-span-3 lg:col-span-2">
            <li>
              <a
                href="https://github.com/Marve10s/Better-Fullstack"
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_LINK}
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.npmjs.com/package/create-better-fullstack?activeTab=readme"
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_LINK}
              >
                npm
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Marve10s/Better-Fullstack/blob/main/LICENSE"
                target="_blank"
                rel="noopener noreferrer"
                className={FOOTER_LINK}
              >
                {m.footerMitLicense()}
              </a>
            </li>
          </LinkColumn>
        </motion.div>

        <div className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-6 font-mono text-[11px] text-muted-foreground">
          <span>© {new Date().getFullYear()} Better Fullstack</span>
          <span aria-hidden="true" className="h-3 w-px bg-border" />
          <span>
            {m.footerInspiredBy()}{" "}
            <a
              href="https://github.com/AmanVarshney01/create-better-t-stack"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK}
            >
              Better T Stack by Aman Varshney
            </a>
          </span>
          <span aria-hidden="true" className="h-3 w-px bg-border" />
          <span>
            {m.footerBuiltBy()}{" "}
            <a
              href="https://elkamali.dev"
              target="_blank"
              rel="noopener noreferrer"
              className={EXTERNAL_LINK}
            >
              Ibrahim Elkamali
            </a>
          </span>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none mt-10 select-none overflow-hidden px-4 sm:px-8"
      >
        <svg viewBox="0 0 1062 80" className="block h-auto w-full font-mono">
          <text
            x="0"
            y="86"
            fontSize="120"
            fontWeight="900"
            letterSpacing="-6"
            className="fill-foreground/[0.055] dark:fill-foreground/[0.05]"
          >
            better<tspan className="fill-brand/30">/</tspan>fullstack
          </text>
        </svg>
      </div>
    </footer>
  );
}
