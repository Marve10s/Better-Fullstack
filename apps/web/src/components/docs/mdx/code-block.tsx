import { TbCheck as Check, TbCopy as Copy } from "react-icons/tb";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Wraps the `<pre>` element rehype-shiki produces so we can layer a language
 * label and a copy button on top without touching the highlighted markup.
 *
 * We don't replace the inner HTML. Shiki's spans carry the per-token
 * `--shiki-light` / `--shiki-dark` custom properties that global.css reads to
 * pick a theme, so the children pass through untouched.
 */
export function CodeBlock({ className, children, ...rest }: React.HTMLAttributes<HTMLPreElement>) {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement | null>(null);
  const language = extractLanguage(className);

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
    <div className="my-6 overflow-hidden rounded-lg border bg-[var(--code-bg)] border-[var(--code-border)]">
      <div className="flex h-9 items-center gap-2 border-[var(--code-border)] border-b bg-[var(--code-chrome-bg)] pr-1.5 pl-4">
        <span className="text-[0.75rem] text-[var(--code-muted)]">{language}</span>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
          className="ml-auto flex size-7 items-center justify-center rounded-md text-[var(--code-muted)] transition-colors hover:bg-[var(--code-bg)] hover:text-[var(--code-fg)]"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </button>
      </div>
      <pre
        {...rest}
        ref={preRef}
        className={cn(
          "overflow-x-auto px-4 py-4 text-[0.875rem] leading-relaxed",
          "[&_code]:font-mono [&_code]:bg-transparent",
          className,
        )}
      >
        {children}
      </pre>
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
