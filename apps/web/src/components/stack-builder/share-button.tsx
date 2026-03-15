
import { Check, Link } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  stackUrl: string;
}

export function ShareButton({ stackUrl }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(stackUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      type="button"
      onClick={copyToClipboard}
      title={copied ? "Copied!" : "Copy share link"}
      className={
        copied
          ? "rounded-md p-1.5 text-green-500 transition-colors"
          : "rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      }
    >
      {copied ? (
        <Check className="h-3.5 w-3.5" />
      ) : (
        <Link className="h-3.5 w-3.5" />
      )}
    </button>
  );
}
