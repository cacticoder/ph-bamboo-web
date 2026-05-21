/**
 * VideoPlayer — Custom responsive video player with hover-to-play interaction
 * Supports: YouTube embed (via iframe API) and local video files
 *
 * Customization points:
 *  - `variant`: "youtube" | "local"
 *  - `src`: YouTube video ID / full URL, or local video file URL
 *  - `poster`: cover image for local video
 *  - `aspectRatio`: CSS aspect-ratio string (default "16/9")
 *  - `autoPlay`, `loop`, `muted`: standard video flags
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: (() => void) | undefined;
  }
}

import { useEffect, useRef, useState, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/* ──────────────────────────────────────────────────────────────── */
/*  Types                                                          */
/* ──────────────────────────────────────────────────────────────── */

interface VideoPlayerProps {
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
/*  Helper: extract YouTube ID                                     */
/* ──────────────────────────────────────────────────────────────── */

function extractYouTubeId(urlOrId: string): string {
  if (!urlOrId.includes("/") && !urlOrId.includes(".")) return urlOrId;
  const m = urlOrId.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return m?.[1] ?? urlOrId;
}

function youtubeEmbedUrl(id: string, extra: Record<string, string | number | undefined>) {
  const params = new URLSearchParams({
    enablejsapi: "1",
    origin: typeof window !== "undefined" ? window.location.origin : "",
    ...Object.fromEntries(
      Object.entries(extra).filter(([, v]) => v !== undefined) as [string, string][]
    ),
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
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

  const ytId = extractYouTubeId(src);

  /* ── YouTube IFrame API ── */
  useEffect(() => {
    if (variant !== "youtube") return;

    // Inject API script once
    const scriptId = "yt-iframe-api";
    if (!document.getElementById(scriptId)) {
      const tag = document.createElement("script");
      tag.id = scriptId;
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    const init = () => {
      if (!ytRef.current || !window.YT) return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      new (window.YT as any).Player(ytRef.current, {
        events: {
          onStateChange: (e: { data: number }) => {
            // 1 = PLAYING, 2 = PAUSED, 0 = ENDED
            setIsPlaying(e.data === 1);
          },
        },
      });
    };

    if ((window.YT as unknown as { Player?: unknown })?.Player) {
      init();
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).onYouTubeIframeAPIReady = init;
    }

    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).onYouTubeIframeAPIReady = undefined;
    };
  }, [variant, ytId]);

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

  /* ── Toggle play / pause ── */
  const togglePlay = useCallback(() => {
    if (variant === "local") {
      const v = videoRef.current;
      if (!v) return;
      v.paused ? v.play() : v.pause();
      return;
    }
    const iframe = ytRef.current;
    if (!iframe?.contentWindow) return;
    const cmd = isPlaying
      ? '{"event":"command","func":"pauseVideo","args":""}'
      : '{"event":"command","func":"playVideo","args":""}';
    iframe.contentWindow.postMessage(cmd, "*");
  }, [variant, isPlaying]);

  /* ── Toggle mute (local only) ── */
  const toggleMute = useCallback(() => {
    if (variant !== "local") return;
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  }, [variant]);

  const showOverlay = isHovered || !isPlaying;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden rounded-xl bg-black isolate",
        className
      )}
      style={{ aspectRatio }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* ═══════ VIDEO LAYER ═══════ */}
      {variant === "youtube" ? (
        <iframe
          ref={ytRef}
          className="absolute inset-0 h-full w-full border-0"
          src={youtubeEmbedUrl(ytId, {
            autoplay: autoPlay ? 1 : 0,
            mute: muted ? 1 : 0,
            loop: loop ? 1 : 0,
            playlist: loop ? ytId : undefined,
            controls: 0,
            modestbranding: 1,
            rel: 0,
            fs: 0,
            cc_load_policy: 0,
            iv_load_policy: 3,
            disablekb: 1,
            playsinline: 1,
          })}
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

      {/* ═══════ INTERACTION OVERLAY ═══════ */}
      <div
        className={cn(
          "absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300",
          showOverlay ? "opacity-100 cursor-pointer" : "opacity-0 pointer-events-none"
        )}
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        role="button"
      >
        {/* Vignette backdrop */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 transition-opacity duration-300",
            showOverlay ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Center button */}
        <button
          type="button"
          className={cn(
            "relative z-20 grid h-16 w-16 place-items-center rounded-full",
            "bg-forest/90 text-primary-foreground shadow-glow backdrop-blur-sm",
            "transition-all duration-300 ease-out",
            "hover:scale-110 hover:bg-forest active:scale-95",
            showOverlay ? "scale-100 opacity-100" : "scale-90 opacity-0"
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

      {/* ═══════ BOTTOM BAR (hover + playing) ═══════ */}
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
            {isPlaying ? (
              <Pause className="h-5 w-5 fill-current" />
            ) : (
              <Play className="h-5 w-5 fill-current ml-0.5" />
            )}
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
