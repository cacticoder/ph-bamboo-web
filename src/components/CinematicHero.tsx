/**
 * CinematicHero — full-bleed documentary-style hero.
 *
 * Customization points:
 *  - `videoId`: YouTube video id used once the visitor presses play
 *  - `poster`: custom thumbnail shown before playback (no YouTube UI)
 *  - CTA cards + bottom strip data below
 */
import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X, ArrowRight } from "lucide-react";
import posterUrl from "@/assets/hero-poster.webp";

const posterAsset = { url: posterUrl };
const poster = posterAsset.url;

const YOUTUBE_ID = "xgrEMeFV_II";

const CTAS = [
  { label: "Discover the Instruments", to: "/gallery" as const },
  { label: "Explore Philippine Bamboo", to: "/species" as const },
];

export function CinematicHero() {
  const [playing, setPlaying] = useState(false);

  const close = useCallback(() => setPlaying(false), []);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing, close]);

  return (
    <section className="relative isolate -mt-[72px] min-h-[100svh] w-full overflow-hidden bg-[#1a1712] md:min-h-[90vh]">
      {/* ── BACKGROUND MEDIA ── */}
      <div className="absolute inset-0">
        <motion.img
          src={poster}
          alt="Filipino artisan playing a bamboo jaw harp in a bamboo grove"
          width={1920}
          height={1088}
          className="h-full w-full object-cover object-[70%_center] md:object-center"
          initial={{ scale: 1.08 }}
          animate={{ scale: playing ? 1.02 : 1 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* readability gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#140e08]/95 via-[#140e08]/70 to-[#140e08]/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120c07]/95 via-[#120c07]/25 to-[#120c07]/70" />
        <div className="absolute inset-0 bg-[#140e08]/25" />
      </div>

      {/* ── HERO CONTENT ── */}
      <AnimatePresence>
        {!playing && (
          <motion.div
            key="hero-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-28 pt-28 md:min-h-[90vh] md:px-8 md:pb-24 md:pt-32"
          >
            <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl"
              >
                <div className="text-[10px] uppercase tracking-[0.4em] text-[#e9dcc3]/80">
                  Heritage · Innovation
                </div>
                <h1 className="hero-title mt-5 font-display text-[clamp(2.1rem,6vw,4.25rem)] leading-[1.02] tracking-tight">
                  Philippine
                  <br />
                  Bamboo
                  <br />
                  Musical
                  <br />
                  Instruments
                </h1>
                <p className="mt-6 max-w-md text-sm leading-relaxed text-[#f2ead9]/85 md:text-base">
                  Where Philippine bamboo heritage meets research, craftsmanship, and innovation.
                </p>
              </motion.div>

              {/* CTA overlay cards */}
              <div className="flex w-full flex-col gap-3 lg:w-[26rem]">
                {CTAS.map((c, i) => (
                  <motion.div
                    key={c.to}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      to={c.to}
                      className="group flex items-center justify-between gap-6 rounded-xl border border-[#f5ecd8]/15 bg-[#1c1409]/55 px-5 py-4 backdrop-blur-md transition-all duration-300 hover:border-[#e9dcc3]/40 hover:bg-[#1c1409]/75 md:px-6 md:py-5"
                    >
                      <span className="min-w-0">
                        <span className="block text-[10px] uppercase tracking-[0.3em] text-[#e9dcc3]/60">
                          Explore
                        </span>
                        <span className="mt-1 block truncate text-base text-[#fdfaf3] md:text-lg">
                          {c.label}
                        </span>
                      </span>
                      <ArrowRight
                        size={20}
                        className="shrink-0 text-[#fdfaf3] transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── PLAY BUTTON ── */}
      {!playing && (
        <motion.button
          type="button"
          onClick={() => setPlaying(true)}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          aria-label="Play the documentary"
          className="group absolute left-1/2 top-1/2 z-20 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-[#f5ecd8]/30 bg-[#1c1409]/40 text-[#fdfaf3] backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#1c1409]/70 md:h-20 md:w-20"
        >
          <span
            className="absolute inset-0 rounded-full border border-[#e9dcc3]/25 motion-safe:animate-ping"
            aria-hidden
          />
          <Play className="ml-1 h-6 w-6 fill-current md:h-7 md:w-7" />
        </motion.button>
      )}

      {/* ── PLAYER ── */}
      <AnimatePresence>
        {playing && (
          <motion.div
            key="player"
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-30 bg-black"
          >
            <iframe
              className="h-full w-full border-0"
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="Philippine Bamboo Musical Instruments documentary"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <button
              type="button"
              onClick={close}
              aria-label="Close video"
              className="absolute right-4 top-4 z-40 grid h-11 w-11 place-items-center rounded-full border border-[#f5ecd8]/25 bg-[#150f0a]/70 text-[#fdfaf3] backdrop-blur-md transition-colors hover:bg-[#150f0a] md:right-6 md:top-6"
            >
              <X size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
