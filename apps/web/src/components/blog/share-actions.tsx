import { Check, FileText, Link2 } from "lucide-react";
import { useState } from "react";

import { m } from "@/paraglide/messages.js";

const ACTION_CLASS =
  "inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:border-lime-700/50 hover:text-foreground dark:hover:border-[#C6E853]/50";

function XLogo() {
  return (
    <svg viewBox="0 0 24 24" className="size-3" fill="currentColor" aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

/**
 * Post actions: share intent, copy the canonical URL, open the raw
 * markdown (served by the /blog/$post.md route — handy for LLM readers).
 */
export function ShareActions({ title, slug }: { title: string; slug: string[] }) {
  const [copied, setCopied] = useState(false);
  const path = `/blog/${slug.join("/")}`;

  const handleShare = () => {
    const url = new URL("https://twitter.com/intent/tweet");
    url.searchParams.set("text", title);
    url.searchParams.set("url", `${window.location.origin}${path}`);
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.origin + path);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — no-op
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={handleShare} className={ACTION_CLASS}>
        <XLogo />
        {m.blogShareOnX()}
      </button>
      <button type="button" onClick={handleCopy} className={ACTION_CLASS}>
        {copied ? <Check className="size-3" /> : <Link2 className="size-3" />}
        {copied ? m.blogLinkCopied() : m.blogCopyLink()}
      </button>
      <a href={`${path}.md`} target="_blank" rel="noreferrer" className={ACTION_CLASS}>
        <FileText className="size-3" />
        {m.blogRawMarkdown()}
      </a>
    </div>
  );
}
