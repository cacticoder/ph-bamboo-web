import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Play, ArrowRight, Sparkles } from "lucide-react";
import { PARTNERS } from "@/data/site";
import { ARTICLES } from "@/data/articles";
import { AdSlot } from "@/components/AdSlot";
import { VideoPlayer } from "@/components/VideoPlayer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "phBMI — Philippine Bamboo Musical Instruments Program" },
      { name: "description", content: "A government initiative preserving and advancing Philippine bamboo musical instruments through research, training, and innovation." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 md:px-8 pt-12 md:pt-20 pb-16 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Video */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            <VideoPlayer
              src="dQw4w9WgXcQ"
              variant="youtube"
              className="rounded-2xl shadow-card"
            />
            <div className="mt-4 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gold/15 text-gold"><Play size={14} /></div>
              <div>
                <div className="text-foreground font-medium">Innovation Research & Development Program</div>
                <div className="text-xs">Featured documentary · 5:42</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Copy */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-xs uppercase tracking-widest text-gold">
              <Sparkles size={12} /> Heritage · Innovation
            </div>
            <h1 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-gold">
              Philippine Bamboo<br />Musical Instruments
            </h1>
            <p className="mt-6 text-base md:text-lg text-foreground/85 leading-relaxed max-w-xl">
              The Philippine Bamboo Musical Instruments Program is a government initiative dedicated to
              promoting, preserving, and advancing the tradition of bamboo instrument making through
              research and development, training, innovation, and cultural preservation.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/gallery" className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:opacity-90 transition">
                Explore Instruments <ArrowRight size={16} />
              </Link>
              <Link to="/modules" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-6 py-3 text-sm font-semibold text-gold hover:bg-gold/10 transition">
                Learn More
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* PARTNERS */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">In partnership with</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PARTNERS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="rounded-lg border border-border/40 bg-background/40 px-4 py-5 text-center"
              >
                <div className="font-display text-lg text-gold">{p.short}</div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 line-clamp-1">{p.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CULTURAL */}
      <section className="mx-auto max-w-7xl px-4 md:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <div className="text-xs uppercase tracking-[0.25em] text-gold/80">Philippine Bamboo Celebration</div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-gold">A heritage that resonates since the 1980s</h2>
          <p className="mt-5 text-foreground/80 leading-relaxed">
            Beginning in the 1980s, communities across the Philippines began organizing bamboo festivals to
            celebrate craftsmanship, music, and identity. From the Cordilleras to Mindanao, these gatherings keep
            indigenous knowledge alive while inviting new generations to play, listen, and build.
          </p>
        </motion.div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ARTICLES.map((a, i) => (
            <motion.div
              key={a.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -6 }}
            >
              <Link
                to="/articles/$slug"
                params={{ slug: a.slug }}
                className="group block overflow-hidden rounded-2xl border border-border/50 gradient-card shadow-card h-full"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={a.cover}
                    alt={a.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <div className="text-[10px] uppercase tracking-widest text-gold/80">{a.region}</div>
                  <h3 className="mt-2 font-display text-xl text-foreground group-hover:text-gold transition-colors">{a.title}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">{a.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-gold">
                    Read article <ArrowRight size={12} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <AdSlot slot="home-mid" />
    </div>
  );
}
