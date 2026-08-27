import { useState } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import bmiLogo from "@/assets/logo/BMI-logo-browser.png";
import { FEATURED_VIDEOS, type FeaturedVideo } from "@/data/videos";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function FeaturedVideos() {
  const [activeVideo, setActiveVideo] = useState<FeaturedVideo | null>(null);

  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-3xl"
      >
        <div className="text-xs uppercase tracking-[0.25em] text-gold/80">Watch &amp; Listen</div>
        <h2 className="mt-3 font-display text-3xl md:text-4xl text-gold">Featured Videos</h2>
        <p className="mt-5 text-foreground/80 leading-relaxed">
          Explore bamboo musical instruments, cultural masters, and BMI training activities through
          our featured videos.
        </p>
      </motion.div>

      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {FEATURED_VIDEOS.map((video, i) => (
          <motion.div
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -6 }}
          >
            <button
              type="button"
              onClick={() => setActiveVideo(video)}
              aria-label={`Play video: ${video.title}`}
              className="group block w-full overflow-hidden rounded-2xl border border-border/50 gradient-card shadow-card h-full text-left"
            >
              <div className="relative aspect-video overflow-hidden bg-black">
                <img
                  src={video.cover}
                  alt={video.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className={
                      "grid h-14 w-14 place-items-center rounded-full bg-forest/90 text-primary-foreground shadow-glow backdrop-blur-sm transition-all duration-300 ease-out group-hover:scale-110 group-hover:bg-forest"
                    }
                  >
                    <Play className="h-6 w-6 fill-current ml-0.5" />
                  </span>
                </div>

                {video.category === "produced" && (
                  <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-background/85 backdrop-blur-sm px-2.5 py-1 shadow-sm">
                    <img src={bmiLogo} alt="BMI-produced" className="h-4 w-auto object-contain" />
                    <span className="text-[9px] font-semibold uppercase tracking-wider text-foreground/80">
                      BMI Produced
                    </span>
                  </div>
                )}

                {video.category === "training" && (
                  <div className="absolute left-3 top-3 rounded-full bg-gold/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-primary-foreground shadow-sm">
                    Teachers&rsquo; Training
                  </div>
                )}
              </div>

              <div className="p-5">
                <h3 className="font-display text-base md:text-lg leading-snug text-foreground group-hover:text-gold transition-colors">
                  {video.title}
                </h3>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold">
                  <Play size={12} className="fill-current" /> Watch on YouTube
                </span>
              </div>
            </button>
          </motion.div>
        ))}
      </div>

      <Dialog open={activeVideo !== null} onOpenChange={(open) => !open && setActiveVideo(null)}>
        <DialogContent className="max-w-4xl w-[calc(100%-2rem)] p-0 overflow-hidden border-border/50 bg-black gap-0">
          <DialogTitle className="sr-only">{activeVideo?.title ?? "Video player"}</DialogTitle>
          {activeVideo && (
            <div className="aspect-video w-full">
              <iframe
                className="h-full w-full border-0"
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                title={activeVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
