import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Wraps the `<pre>` element rehype-shiki produces so we can layer a copy
 * button + filename label on top without touching the highlighted markup.
 *
 * We don't replace the inner HTML — Shiki's spans and inline styles need to
 * survive intact for the syntax-highlighting themes to render. Instead, we
 * intercept the `<pre>` rendered by MDX and render the same children inside
 * our chrome.
 */
export function CodeBlock({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement | null>(null);
  const language = extractLanguage(className);

  // Detect whether this code block was substituted by PMTabs (which sets
  // `data-pm-block` on the wrapper). In that case the parent owns its own
  // copy UI; we render the bare pre.
  const handleCopy = async () => {
    const text = preRef.current?.innerText ?? "";
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      // best-effort
    }
  };

  useEffect(() => {
    if (!copied) return;
    const id = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(id);
  }, [copied]);

  return (
    <div className="group relative my-5 overflow-hidden rounded-md border border-border bg-[oklch(0.04_0_0)] dark:bg-[oklch(0.06_0_0)]">
      {language ? (
        <div className="flex items-center justify-between border-b border-border/40 px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.08em] text-muted-foreground">
          <span>{language}</span>
        </div>
      ) : null}
      <pre
        {...rest}
        ref={preRef}
        className={cn(
          "overflow-x-auto px-4 py-4 text-[0.82rem] leading-relaxed [&_code]:font-mono",
          // Shiki injects per-token colors via inline style. Keep the
          // background neutral so the dark theme reads consistently in
          // both light and dark modes.
          "[&_code]:bg-transparent [&_code]:text-foreground/90",
          className,
        )}
      >
        {children}
      </pre>
      <button
        type="button"
        onClick={handleCopy}
        aria-label={copied ? "Copied" : "Copy code"}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-md border border-border/40 bg-background/40 text-muted-foreground opacity-0 backdrop-blur transition-all hover:text-foreground group-hover:opacity-100 focus:opacity-100"
      >
        {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
      </button>
    </div>
  );
}

function extractLanguage(className: string | undefined): string | null {
  if (!className) return null;
  const match = className.match(/language-(\w+)/);
  if (!match) return null;
  const lang = match[1];
  if (lang === "npm") return null; // PMTabs hides this one
  return lang;
}
