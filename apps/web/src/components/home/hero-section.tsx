
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Copy } from "lucide-react";
import { useState } from "react";

import PackageIcon from "./icons";

export default function HeroSection() {
  const [selectedPM, setSelectedPM] = useState<"bun" | "pnpm" | "npm" | "yarn">("bun");
  const [copied, setCopied] = useState(false);

  const commands = {
    npm: "npx create-better-fullstack@latest",
    pnpm: "pnpm create better-fullstack@latest",
    bun: "bun create better-fullstack@latest",
    yarn: "yarn create better-fullstack@latest",
  };

  const copyCommand = () => {
    navigator.clipboard.writeText(commands[selectedPM]).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      return;
    }).catch(() => {});
  };

  return (
    <div className="flex flex-col items-center px-4 pt-12 pb-8 sm:pt-16">
      <h1 className="max-w-3xl text-center font-mono text-2xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
        The full-stack app scaffolder
      </h1>

      <p className="mt-4 max-w-xl text-center text-sm text-muted-foreground sm:mt-6 sm:text-lg">
        Production-ready templates with your choice of framework, database, auth, and more.
      </p>

      <div className="mt-8 w-full max-w-2xl sm:mt-10">
        <div className="flex border-b border-border">
          {(["bun", "pnpm", "npm", "yarn"] as const).map((pm) => (
            <button
              key={pm}
              type="button"
              onClick={() => setSelectedPM(pm)}
              className={`flex items-center gap-1.5 border-b-2 px-3 py-2 text-xs font-medium transition-colors sm:gap-2 sm:px-4 sm:text-sm ${
                selectedPM === pm
                  ? "border-foreground text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <PackageIcon pm={pm} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              {pm}
            </button>
          ))}
        </div>

        <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:items-stretch sm:gap-3">
          <div className="flex flex-1 items-center justify-between rounded-lg border border-border bg-muted/30 px-3 py-2.5 sm:px-4 sm:py-3">
            <code className="truncate font-mono text-xs sm:text-sm">{commands[selectedPM]}</code>
            <button
              type="button"
              onClick={copyCommand}
              className="ml-3 flex-shrink-0 text-muted-foreground transition-colors hover:text-foreground sm:ml-4"
              aria-label="Copy command"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-green-500 sm:h-4 sm:w-4" />
              ) : (
                <Copy className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              )}
            </button>
          </div>
          <Link
            to="/new"
            search={{ view: "command", file: "" }}
            className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-foreground px-4 py-2.5 text-xs font-medium text-background transition-colors hover:bg-foreground/90 sm:gap-2 sm:px-5 sm:text-sm"
          >
            Builder
            <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
