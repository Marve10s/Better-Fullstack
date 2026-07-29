import {
  TbCheck as Check,
  TbCopy as Copy,
  TbBrandGithub as Github,
  TbShare2 as Share2,
  TbBrandTwitter as Twitter,
} from "react-icons/tb";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

import type { StackState } from "@/lib/stack-defaults";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dotted-dialog";
import {
  stackAnalyticsProperties,
  trackCampaignEvent,
} from "@/lib/campaign-analytics";
import {
  getCampaignShareMessage,
  getCampaignShareTitle,
  getCampaignShareUrl,
  type ShareMoment,
} from "@/lib/campaign-share";
import { markBuilderShareModalSeen } from "@/lib/builder-share-modal-visibility";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages.js";

const GITHUB_URL = "https://github.com/Marve10s/Better-Fullstack";
const CAMPAIGN_IMAGE_URL = "/og/run-before-you-clone-1200x630.png";

type BuilderShareModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  stack: StackState;
  moment: ShareMoment;
  campaign?: string;
};

export function BuilderShareModal({
  open,
  onOpenChange,
  stack,
  moment,
  campaign,
}: BuilderShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = useMemo(() => getCampaignShareUrl(stack, moment), [moment, stack]);
  const shareTitle = useMemo(() => getCampaignShareTitle(stack), [stack]);
  const shareMessage = useMemo(
    () => getCampaignShareMessage(stack, moment, shareUrl),
    [moment, shareUrl, stack],
  );
  const xShareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareMessage)}`;

  const trackShare = useCallback(
    (target: string) => {
      trackCampaignEvent(
        "builder_stack_shared",
        stackAnalyticsProperties(stack, { campaign, moment, target }),
      );
    },
    [campaign, moment, stack],
  );

  const handleOpenChange = useCallback(
    (nextOpen: boolean) => {
      if (!nextOpen) {
        try {
          markBuilderShareModalSeen(window.localStorage);
        } catch {}
      }
      onOpenChange(nextOpen);
    },
    [onOpenChange],
  );

  const copyMessage = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      setCopied(true);
      trackShare("clipboard");
      toast.success(m.campaignShareCopied());
      setTimeout(() => setCopied(false), 1800);
    } catch {
      toast.error(m.campaignShareCopyFailed());
    }
  }, [shareMessage, trackShare]);

  const shareWithFriends = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareMessage.replace(` ${shareUrl}`, ""),
          url: shareUrl,
        });
        trackShare("native");
        return;
      } catch (error) {
        if (error instanceof DOMException && error.name === "AbortError") return;
      }
    }

    await copyMessage();
  }, [copyMessage, shareMessage, shareTitle, shareUrl, trackShare]);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="gap-0 overflow-hidden p-0 sm:max-w-lg"
        closeButtonClassName="text-white/90 hover:bg-black/40 hover:text-white"
      >
        <div className="relative aspect-[2/1] w-full shrink-0 overflow-hidden bg-[#0c0c0e]">
          <img
            src={CAMPAIGN_IMAGE_URL}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-popover to-transparent" />
        </div>

        <div className="border-border/50 border-b px-6 pt-6 pb-5">
          <DialogHeader className="gap-2.5 pr-8">
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-muted/40 px-2.5 py-1 font-mono text-[10px] text-muted-foreground uppercase tracking-wide">
              <Check className="size-3 text-emerald-500" aria-hidden="true" />
              {moment === "run"
                ? m.campaignShareRunComplete()
                : m.campaignShareDownloadComplete()}
            </span>
            <DialogTitle className="text-balance font-semibold text-xl text-foreground leading-tight sm:text-2xl">
              {m.campaignShareTitle()}
            </DialogTitle>
            <DialogDescription className="text-sm leading-relaxed">
              {m.campaignShareDescription()}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="grid gap-3 px-6 py-5 sm:grid-cols-2">
          <Button type="button" className="w-full" onClick={shareWithFriends}>
            <Share2 className="size-3.5" aria-hidden="true" />
            {m.campaignShareStack()}
          </Button>
          <a
            href={xShareUrl}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            onClick={() => trackShare("x")}
          >
            <Twitter className="size-3.5" aria-hidden="true" />
            {m.campaignSharePostOnX()}
          </a>
          <Button type="button" variant="outline" className="w-full" onClick={copyMessage}>
            {copied ? (
              <Check className="size-3.5 text-emerald-500" aria-hidden="true" />
            ) : (
              <Copy className="size-3.5" aria-hidden="true" />
            )}
            {copied ? m.navCopied() : m.campaignShareCopyLink()}
          </Button>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "w-full")}
            onClick={() =>
              trackCampaignEvent(
                "builder_github_clicked",
                stackAnalyticsProperties(stack, { campaign, moment }),
              )
            }
          >
            <Github className="size-3.5" aria-hidden="true" />
            {m.campaignShareStarGithub()}
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
}
