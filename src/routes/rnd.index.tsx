import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, FlaskConical } from "lucide-react";
import { PageHero, PageShell } from "@/components/PageHero";
import { RND_TECHNOLOGIES, RND_INTRO, RND_CLOSING } from "@/data/rnd";

export const Route = createFileRoute("/rnd/")({
  head: () => ({
    meta: [
      { title: "R&D Technologies — phBMI" },
      {
        name: "description",
        content:
          "DOST-FPRDI's R&D technologies for bamboo musical instruments: finishing, prototyping, seasoning and preservation, thermal modification, and value chain analysis.",
      },
    ],
  }),
  component: RndPage,
});

function RndPage() {
  return (
    <PageShell>
      <PageHero
        kicker="DOST-FPRDI · Bamboo Musical Instruments Innovation R&D Program"
        title="R&D Technologies"
        lead={RND_INTRO}
      />

      <section className="mt-12">
        <div className="grid md:grid-cols-2 gap-6">
          {RND_TECHNOLOGIES.map((tech, i) => (
            <motion.div
              key={tech.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="rounded-2xl overflow-hidden border border-border/50 gradient-card shadow-card flex flex-col"
            >
              {tech.cover ? (
                <Link
                  to="/rnd/$id"
                  params={{ id: tech.id }}
                  className="block aspect-video overflow-hidden"
                >
                  <img
                    src={tech.cover}
                    alt={tech.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </Link>
              ) : (
                <Link
                  to="/rnd/$id"
                  params={{ id: tech.id }}
                  className="flex aspect-video items-center justify-center bg-gradient-to-br from-bamboo/40 via-earth/30 to-plum/30 texture-bamboo"
                >
                  <FlaskConical size={40} className="text-gold/70" />
                </Link>
              )}

              <div className="p-6 flex flex-col flex-1">
                <div className="text-[10px] uppercase tracking-widest text-gold/80">
                  Technology {tech.number.toString().padStart(2, "0")}
                </div>
                <h2 className="mt-1 font-display text-xl md:text-2xl text-gold leading-snug">
                  {tech.title}
                </h2>
                <p className="mt-1 text-sm italic text-muted-foreground">{tech.technologyTitle}</p>
                <p className="mt-4 text-sm text-foreground/80 leading-relaxed flex-1">
                  {tech.cardSummary}
                </p>
                <Link
                  to="/rnd/$id"
                  params={{ id: tech.id }}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold hover:text-gold/80 transition-colors w-fit"
                >
                  Read Full Details <ArrowRight size={14} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-border/50 gradient-card p-6 md:p-10 shadow-card">
        <h2 className="font-display text-2xl md:text-3xl text-gold">{RND_CLOSING.title}</h2>
        <p className="mt-4 text-foreground/85 leading-relaxed max-w-4xl">{RND_CLOSING.body}</p>
      </section>
    </PageShell>
  );
}
