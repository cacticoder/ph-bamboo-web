/**
 * VideoPlayer — Custom responsive video player with hover-to-play interaction
 * Supports: YouTube embed (via iframe) and local video files
 *
 * Customization points:
 *  - `variant`: "youtube" | "local"  — player mode
 *  - `src`: YouTube video ID (e.g. "dQw4w9WgXcQ") or local video URL
 *  - `poster`: cover image for local video / pre-load state
 *  - `aspectRatio`: CSS aspect-ratio string (default "16/9")
 *  - `autoPlay`, `loop`, `muted`: standard video flags
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────── */
/*  Types                                                          */
/* ──────────────────────────────────────────────────────────────── */

interface VideoPlayerProps {
  /** YouTube video ID (variant="youtube") or local file URL (variant="local") */
  src: string;
  variant?: "youtube" | "local";
  poster?: string;
  aspectRatio?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  className?: string;
}

/* ──────────────────────────────────────────────────────────────── */
/*  Helper: extract YouTube ID from various URL shapes             */
/* ──────────────────────────────────────────────────────────────── */

function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId.includes("/") && !urlOrId.includes(".")) return urlOrId; // already an ID
  const m = urlOrId.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return m?.[1] ?? urlOrId;
}

/* ──────────────────────────────────────────────────────────────── */
/*  Component                                                      */
/* ──────────────────────────────────────────────────────────────── */

export function VideoPlayer({
  src,
  variant = "youtube",
  poster,
  aspectRatio = "16 / 9",
  autoPlay = false,
  loop = false,
  muted = false,
  className,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ytRef = useRef<HTMLIFrameElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMuted, setIsMuted] = useState(muted);
  const [ytReady, setYtReady] = useState(false);

  /* ── YouTube IFrame API setup ── */
  useEffect(() => {
    if (variant !== "youtube") return;

    // Load the YouTube IFrame API script once
    const existing = document.getElementById("yt-iframe-api") as HTMLScriptElement | null;
    if (!existing) {
      const tag = document.createElement("script");
      tag.id = "yt-iframe-api";
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    // Initialise player when API is ready
    const initPlayer = () => {
      if (!ytRef.current) return;
      const id = extractYouTubeId(src);
      // @ts-expect-error — YT global injected by iframe_api script
      new window.YT.Player(ytRef.current, {
        videoId: id,
        playerVars: {
          autoplay: autoPlay ? 1 : 0,
          mute: muted ? 1 : 0,
          loop: loop ? 1 : 0,
          playlist: loop ? id : undefined,
          controls: 0,
          modestbranding: 1,
          rel: 0,
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
          disablekb: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => setYtReady(true),
          onStateChange: (event: { data: number }) => {
            // 1 = PLAYING, 2 = PAUSED
            setIsPlaying(event.data === 1);
          },
        },
      });
    };

    // @ts-expect-error
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // @ts-expect-error
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      // @ts-expect-error
      window.onYouTubeIframeAPIReady = undefined;
    };
  }, [variant, src, autoPlay, muted, loop]);

  /* ── Local video listeners ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v || variant !== "local") return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);

    v.addEventListener("play", onPlay);
    v.addEventListener("pause", onPause);
    v.addEventListener("ended", onEnded);

    return () => {
      v.removeEventListener("play", onPlay);
      v.removeEventListener("pause", onPause);
      v.removeEventListener("ended", onEnded);
    };
  }, [variant]);

  /* ── Play / Pause toggle ── */
  const togglePlay = useCallback(() => {
    if (variant === "local") {
      const v = videoRef.current;
      if (!v) return;
      if (v.paused) v.play();
      else v.pause();
      return;
    }

    // YouTube mode: interact through iframe contentWindow postMessage
    const iframe = ytRef.current;
    if (!iframe || !iframe.contentWindow) return;

    const message = isPlaying
      ? '{"event":"command","func":"pauseVideo","args":""}'
      : '{"event":"command","func":"playVideo","args":""}';
    iframe.contentWindow.postMessage(message, "*");
  }, [variant, isPlaying]);

  /* ── Mute toggle (local only; YouTube initial mute handled by playerVars) ── */
  const toggleMute = useCallback(() => {
    if (variant === "local") {
      const v = videoRef.current;
      if (!v) return;
      v.muted = !v.muted;
      setIsMuted(v.muted);
    }
  }, [variant]);

  /* ── Determine whether overlay button should be visible ── */
  const showOverlayButton = isHovered || !isPlaying;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-black isolate group",
        className
      )}
      style={{ aspectRatio }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ═══════════════════════════════════════════════════════════════
          VIDEO LAYER — fills container 100%, object-fit: cover
         ═══════════════════════════════════════════════════════════════ */}
      {variant === "youtube" ? (
        <iframe
          ref={ytRef}
          id={`yt-player-${extractYouTubeId(src)}`}
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: "cover" }}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Video player"
        />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={poster}
          autoPlay={autoPlay}
          loop={loop}
          muted={muted}
          playsInline
          preload="metadata"
        >
          <source src={src} />
          Your browser does not support the video tag.
        </video>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          CLICK-CAPTURE OVERLAY
          • Transparent when playing + not hovered (lets mouse pass through)
          • Visible when paused or hovered (captures clicks for toggle)
         ═══════════════════════════════════════════════════════════════ */}
      <div
        className={cn(
          "absolute inset-1 z-10 flex items-center justify-center transition-opacity duration-300",
          showOverlayButton ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
        )}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        role="button"
      >
        {/* Subtle vignette for readability */}
        <div
          className={cn(
            "absolute inset-1 bg-gradient-to-t from-black/50 via-transparent to-black/20 transition-opacity duration-300",
            showOverlayButton ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Centered Play / Pause button */}
        <button
          type="button"
          className={cn(
            "relative z-20 grid h-16 w-16 place-items-center rounded-full",
            "bg-forest/90 text-primary-foreground shadow-glow backdrop-blur-sm",
            "transition-all duration-300 ease-out",
            "hover:scale-110 hover:bg-forest active:scale-95",
            showOverlayButton ? "scale-100 opacity-100" : "scale-90 opacity-0"
          )}
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-7 w-7 fill-current" />
          ) : (
            <Play className="h-7 w-7 fill-current ml-0.5" />
          )}
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          BOTTOM BAR (appears on hover when playing)
         ═══════════════════════════════════════════════════════════════ */}
      <div
        className={cn(
          "absolute bottom-0 left-0 right-0 z-20 px-4 pb-3 pt-8",
          "bg-gradient-to-t from-black/70 via-black/30 to-transparent",
          "transition-opacity duration-300",
          isHovered && isPlaying ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={togglePlay}
            className="text-white/90 hover:text-white transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current ml-0.5" />}
          </button>

          {variant === "local" && (
            <button
              type="button"
              onClick={toggleMute}
              className="text-white/90 hover:text-white transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
          )}

          <span className="text-xs font-medium text-white/80 tracking-wide">
            {isPlaying ? "Now Playing" : "Paused"}
          </span>
        </div>
      </div>
    </div>
  );
}
