import { Check, Copy, Github, Share2, Twitter } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dotted-dialog";
import {
  hasSeenBuilderShareModal,
  markBuilderShareModalSeen,
} from "@/lib/builder-share-modal-visibility";
import { SITE_URL } from "@/lib/seo";
import { cn } from "@/lib/utils";

const X_PROFILE_URL = "https://x.com/IbrahimElkamali";
const GITHUB_DISCUSSIONS_URL = "https://github.com/Marve10s/Better-Fullstack/discussions";
const PREVIEW_IMAGE_URL =
  "https://images.unsplash.com/photo-1782149493127-3b4a84f651f7?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

type ShareTarget = {
  label: string;
  description: string;
  href: string;
  icon: typeof Twitter;
  className: string;
};

const contactTargets: ShareTarget[] = [
  {
    label: "X",
    description: "@IbrahimElkamali",
    href: X_PROFILE_URL,
    icon: Twitter,
    className: "text-foreground",
  },
  {
    label: "GitHub Discussions",
    description: "Show the community",
    href: GITHUB_DISCUSSIONS_URL,
    icon: Github,
    className: "text-foreground",
  },
];

function canUseBrowserStorage() {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function getShareMessage(url: string) {
  return `I built a full-stack app setup with Better Fullstack. Try the visual builder and share what you make: ${url}`;
}

export function BuilderShareModal() {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (window.navigator.webdriver || !canUseBrowserStorage()) {
      return;
    }

    try {
      if (hasSeenBuilderShareModal(window.localStorage)) {
        return;
      }

      setOpen(true);
    } catch {
      setOpen(false);
    }
  }, []);

  const handleOpenChange = useCallback((nextOpen: boolean) => {
    if (!nextOpen) {
      try {
        markBuilderShareModalSeen(window.localStorage);
      } catch {}
    }

    setOpen(nextOpen);
  }, []);

  const shareMessage = useMemo(() => getShareMessage(SITE_URL), []);
  const encodedShareMessage = encodeURIComponent(shareMessage);
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodedShareMessage}`;

  const copyMessage = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      toast.success("Share message copied");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error("Could not copy share message");
    }
  }, [shareMessage]);

  const shareWithFriends = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Better Fullstack",
          text: "I built a full-stack app setup with Better Fullstack.",
          url: SITE_URL,
        });
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    await copyMessage();
  }, [copyMessage]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="gap-0 p-0 sm:max-w-lg"
        closeButtonClassName="text-white/90 hover:bg-black/40 hover:text-white"
      >
        <div className="relative aspect-[2/1] w-full shrink-0 overflow-hidden bg-muted">
          <img
            src={PREVIEW_IMAGE_URL}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-popover via-transparent to-transparent" />
        </div>

        <div className="border-border/50 border-b px-6 pt-6 pb-5">
          <DialogHeader className="gap-2.5 pr-8">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wide">
              <Share2 className="size-3" aria-hidden="true" />
              Built with Better Fullstack?
            </span>
            <DialogTitle className="text-balance font-semibold text-xl text-foreground leading-tight sm:text-2xl">
              Show us what you shipped
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              If Better Fullstack helped you start a project, send it over. A repo, demo,
              screenshot, launch post, or tiny work-in-progress is perfect.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="grid gap-5 px-6 py-5">
          <div className="grid gap-2.5 sm:grid-cols-2">
            {contactTargets.map((target) => {
              const Icon = target.icon;

              return (
                <a
                  key={target.label}
                  href={target.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-border/50 bg-muted/20 px-3.5 py-3 text-left transition-colors hover:border-border hover:bg-muted/50"
                >
                  <span
                    className={cn(
                      "flex size-9 shrink-0 items-center justify-center rounded-lg bg-background/80 shadow-sm ring-1 ring-border/50 transition-colors",
                      target.className,
                    )}
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-sm text-foreground">
                      {target.label}
                    </span>
                    <span className="block truncate text-muted-foreground text-xs">
                      {target.description}
                    </span>
                  </span>
                </a>
              );
            })}
          </div>

          <div className="rounded-xl border border-border/50 bg-muted/30 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-medium text-sm text-foreground">
                  Please share a project with friends!
                </p>
                <p className="mt-1 text-muted-foreground text-xs">
                  One post helps more builders discover the project.
                </p>
              </div>
              <Button
                type="button"
                size="sm"
                className="w-full sm:w-auto"
                onClick={shareWithFriends}
              >
                <Share2 className="size-3.5" aria-hidden="true" />
                Share
              </Button>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Button
                variant="outline"
                size="sm"
                render={
                  <a href={xShareUrl} target="_blank" rel="noreferrer" aria-label="Post on X" />
                }
              >
                <Twitter className="size-3.5" aria-hidden="true" />
                Post on X
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={copyMessage}
              >
                {copied ? (
                  <Check className="size-3.5 text-green-500" aria-hidden="true" />
                ) : (
                  <Copy className="size-3.5" aria-hidden="true" />
                )}
                {copied ? "Copied" : "Copy text"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
