import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PARTNERS } from "@/data/site";
import { ARTICLES } from "@/data/articles";
import { AdSlot } from "@/components/AdSlot";
import { CinematicHero } from "@/components/CinematicHero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "phBMI — Philippine Bamboo Musical Instruments Program" },
      {
        name: "description",
        content:
          "A government initiative preserving and advancing Philippine bamboo musical instruments through research, training, and innovation.",
      },
      { property: "og:title", content: "phBMI — Philippine Bamboo Musical Instruments Program" },
      {
        property: "og:description",
        content: "Where Philippine bamboo heritage meets research, craftsmanship, and innovation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div>
      <CinematicHero />

      {/* PARTNERS */}
      <section className="border-y border-border/40 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-10">
          <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground mb-6">
            In partnership with
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {PARTNERS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="flex flex-col items-center gap-3 rounded-lg border border-border/40 bg-background/40 px-4 py-5 text-center"
              >
                <div className="flex h-16 w-full items-center justify-center">
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    className="max-h-16 max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground leading-snug">
                  {p.name}
                </div>
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
          <div className="text-xs uppercase tracking-[0.25em] text-gold/80">
            Philippine Bamboo Celebration
          </div>
          <h2 className="mt-3 font-display text-3xl md:text-4xl text-gold">
            A heritage that resonates since the 1980s
          </h2>
          <p className="mt-5 text-foreground/80 leading-relaxed">
            Beginning in the 1980s, communities across the Philippines began organizing bamboo
            festivals to celebrate craftsmanship, music, and identity. From the Cordilleras to
            Mindanao, these gatherings keep indigenous knowledge alive while inviting new
            generations to play, listen, and build.
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
                  <div className="text-[10px] uppercase tracking-widest text-gold/80">
                    {a.region}
                  </div>
                  <h3 className="mt-2 font-display text-xl text-foreground group-hover:text-gold transition-colors">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {a.excerpt}
                  </p>
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
