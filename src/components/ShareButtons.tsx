import { useState } from "react";
import { Facebook, Twitter, Linkedin, Link2, Check, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
  text?: string;
}

export function ShareButtons({ title, text }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.href : "";
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text || title);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
      } catch {
        /* user cancelled */
      }
    } else {
      handleCopy();
    }
  };

  const btn =
    "inline-flex items-center justify-center h-9 w-9 rounded-full border border-border/60 bg-background/40 text-foreground/80 hover:text-gold hover:border-gold/60 transition-colors";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-[10px] uppercase tracking-widest text-muted-foreground mr-1">Share</span>
      <a
        className={btn}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
      >
        <Facebook size={15} />
      </a>
      <a
        className={btn}
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter"
      >
        <Twitter size={15} />
      </a>
      <a
        className={btn}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
      >
        <Linkedin size={15} />
      </a>
      <button onClick={handleCopy} className={btn} aria-label="Copy link" type="button">
        {copied ? <Check size={15} /> : <Link2 size={15} />}
      </button>
      <button onClick={handleNativeShare} className={btn} aria-label="Share" type="button">
        <Share2 size={15} />
      </button>
      <span className="sr-only">{encodedTitle}</span>
    </div>
  );
}
