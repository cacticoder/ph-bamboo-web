import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";
import { SPECIES, FIELD_NOTES, FIELD_TITLE, FIELD_SUBTITLE } from "@/data/species";
import { PageHero, PageShell } from "@/components/PageHero";

export const Route = createFileRoute("/species/")({
  head: () => ({
    meta: [
      { title: "Bamboo Species — phBMI" },
      {
        name: "description",
        content: "Philippine bamboo species used in musical instrument making.",
      },
    ],
  }),
  component: SpeciesPage,
});

function SpeciesPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Botanical Heritage"
        title="Bamboo Species"
        lead="The native and naturalized bamboos that give voice to Philippine instruments."
      />

      <h2 className="mt-12 font-display text-2xl text-gold">Species Catalogue</h2>
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SPECIES.map((s, i) => (
          <motion.div
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            className="rounded-2xl border border-border/50 gradient-card shadow-card hover:border-gold/40 transition-colors overflow-hidden flex flex-col"
          >
            {s.image ? (
              <img
                src={s.image}
                alt={s.commonName}
                className="h-36 w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-36 w-full bg-gradient-to-br from-bamboo/40 via-earth/30 to-plum/30 texture-bamboo grid place-items-center">
                <Sprout size={32} className="text-gold/60" />
              </div>
            )}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-display text-lg text-gold">{s.commonName}</h3>
              <div className="mt-1 text-xs italic text-muted-foreground">{s.scientificName}</div>
              <p className="mt-3 text-sm text-foreground/80 line-clamp-3">{s.description}</p>
              <Link
                to="/species/$id"
                params={{ id: s.id }}
                className="mt-3 inline-block w-fit text-[10px] uppercase tracking-widest bg-gold/15 text-gold px-2 py-1 rounded-full hover:bg-gold/25 transition-colors"
              >
                View details
              </Link>
            </div>
          </motion.div>
        ))}
      </div>

      <section className="mt-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl text-gold">{FIELD_TITLE}</h2>
          <p className="text-sm text-muted-foreground hidden md:block">{FIELD_SUBTITLE}</p>
        </div>
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {FIELD_NOTES.map((note) => (
            <div
              key={note.title}
              className="rounded-2xl border border-border/50 gradient-card shadow-card p-5"
            >
              <h3 className="font-display text-lg text-gold">{note.title}</h3>
              <p className="mt-2 text-sm text-foreground/85 leading-relaxed whitespace-pre-line">
                {note.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
