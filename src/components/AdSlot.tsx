import { cn } from "@/lib/utils";

interface AdSlotProps {
  /** AdSense slot id; if not set, renders a placeholder. */
  slot?: string;
  /** AdSense client (set via env VITE_ADSENSE_CLIENT in production). */
  client?: string;
  format?: "auto" | "rectangle" | "horizontal" | "vertical";
  className?: string;
  label?: string;
}

/**
 * Reusable Google AdSense slot. In production, set:
 *   VITE_ADSENSE_CLIENT="ca-pub-XXXXXXXXXXXX"
 * and pass the slot id per placement. Falls back to a styled placeholder
 * so the layout stays stable during development.
 */
export function AdSlot({ slot, client, format = "auto", className, label = "Advertisement" }: AdSlotProps) {
  const adsenseClient = client || import.meta.env.VITE_ADSENSE_CLIENT;
  const isLive = !!(adsenseClient && slot);

  return (
    <aside
      className={cn(
        "my-8 mx-auto w-full max-w-5xl rounded-lg border border-border/60 bg-card/40 backdrop-blur-sm",
        "min-h-[100px] flex items-center justify-center text-xs uppercase tracking-widest text-muted-foreground",
        className,
      )}
      aria-label={label}
    >
      {isLive ? (
        <ins
          className="adsbygoogle block w-full"
          style={{ display: "block" }}
          data-ad-client={adsenseClient}
          data-ad-slot={slot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      ) : (
        <span>Ad space · {format}</span>
      )}
    </aside>
  );
}
