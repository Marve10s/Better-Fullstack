import { Link } from "@tanstack/react-router";
import { useState } from "react";

import { ChangelogModal } from "@/components/changelog-modal";

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

        <p className="mt-8 text-center text-xs text-muted-foreground">
          Originally inspired by{" "}
          <a
            href="https://github.com/better-t-stack/create-better-t-stack"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-4"
          >
            create-better-t-stack
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
