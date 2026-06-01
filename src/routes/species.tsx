import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Leaf, TreePine, Sprout, TreeDeciduous, X } from "lucide-react";
import { SPECIES, type Species } from "@/data/site";
import { PageHero, PageShell } from "@/components/PageHero";
import { ImageGallery } from "@/components/ImageGallery";

const FIELD_GALLERY = [
  { title: "Lowland Stands", caption: "Bayog clumps lining river edges in Luzon — the workhorse of instrument making.", icon: TreePine, tone: "bamboo" as const },
  { title: "Hillside Buho", caption: "Straight-grained Schizostachyum harvested for flutes and panpipes.", icon: Sprout, tone: "earth" as const },
  { title: "Giant Bamboo Grove", caption: "Dendrocalamus asper cultivated for drum bodies and resonators.", icon: TreeDeciduous, tone: "plum" as const },
  { title: "Cordillera Highlands", caption: "Mountain stands feeding the Kalinga and Bontoc traditions.", icon: TreePine, tone: "gold" as const },
  { title: "Harvest Season", caption: "Selective culm cutting after 3–4 years for optimal density.", icon: Leaf, tone: "bamboo" as const },
  { title: "Nursery Propagation", caption: "Tissue-culture seedlings ensuring sustainable supply.", icon: Sprout, tone: "earth" as const },
];

export const Route = createFileRoute("/species")({
  head: () => ({ meta: [{ title: "Bamboo Species — phBMI" }, { name: "description", content: "Philippine bamboo species used in musical instrument making." }] }),
  component: SpeciesPage,
});

function SpeciesPage() {
  const [active, setActive] = useState<Species | null>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <PageShell>
      <PageHero kicker="Botanical Heritage" title="Bamboo Species" lead="The native and naturalized bamboos that give voice to Philippine instruments." />

      <h2 className="mt-12 font-display text-2xl text-gold">Species Catalogue</h2>
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SPECIES.map((s, i) => (
          <motion.button
            key={s.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ y: -4 }}
            onClick={() => setActive(s)}
            className="text-left rounded-2xl border border-border/50 gradient-card p-5 shadow-card hover:border-gold/40 transition-colors"
          >
            <div className="flex items-center gap-2 text-gold">
              <Leaf size={16} />
              <h3 className="font-display text-lg">{s.common}</h3>
            </div>
            <div className="mt-1 text-xs italic text-muted-foreground">{s.scientific}</div>
            <p className="mt-3 text-sm text-foreground/80 line-clamp-3">{s.description}</p>
            <div className="mt-3 inline-block text-[10px] uppercase tracking-widest bg-gold/15 text-gold px-2 py-1 rounded-full">View details</div>
          </motion.button>
        ))}
      </div>

      <section className="mt-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl text-gold">From the Field</h2>
          <p className="text-sm text-muted-foreground hidden md:block">Where Philippine instrument bamboos grow and are harvested.</p>
        </div>
        <div className="mt-5">
          <ImageGallery tiles={FIELD_GALLERY} columns={3} />
        </div>
      </section>

      <section className="mt-16 grid md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
          <h3 className="font-display text-lg text-gold">Sustainable Harvest</h3>
          <p className="mt-2 text-sm text-foreground/85">Culms are cut at 3–4 years of age, leaving younger shoots to mature — a regenerative cycle perfected over generations.</p>
        </div>
        <div className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
          <h3 className="font-display text-lg text-gold">Carbon Positive</h3>
          <p className="mt-2 text-sm text-foreground/85">Bamboo sequesters up to 35% more CO₂ than equivalent hardwood stands, making each instrument a climate-positive object.</p>
        </div>
        <div className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
          <h3 className="font-display text-lg text-gold">Community Forestry</h3>
          <p className="mt-2 text-sm text-foreground/85">Local cooperatives manage stands as both cultural and economic assets, ensuring fair pricing for artisan-grade bamboo.</p>
        </div>
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl rounded-2xl border border-border/60 gradient-card p-6 md:p-8 shadow-card max-h-[85vh] overflow-y-auto"
            >
              <button onClick={() => setActive(null)} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
                <X size={18} />
              </button>
              <div className="text-xs uppercase tracking-widest text-gold/80">Species Profile</div>
              <h3 className="mt-2 font-display text-3xl text-gold">{active.common}</h3>
              <div className="text-sm italic text-muted-foreground">{active.scientific}</div>
              {active.synonyms.length > 0 && (
                <div className="mt-2 text-xs text-muted-foreground">Also known as: {active.synonyms.join(", ")}</div>
              )}
              <button
                onClick={() => setLightbox(active.image)}
                className="group mt-4 block w-full sm:w-56 overflow-hidden rounded-xl border border-border/60 hover:border-gold/60 transition-colors"
                aria-label="Enlarge photo"
              >
                <img
                  src={active.image}
                  alt={active.common}
                  className="h-32 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground group-hover:text-gold">Click to enlarge</div>
              </button>
              <p className="mt-4 text-foreground/85 leading-relaxed">{active.description}</p>
              <dl className="mt-5 grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-gold/80">Habitat</dt>
                  <dd className="mt-1 text-foreground/85">{active.habitat}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-gold/80">Distribution</dt>
                  <dd className="mt-1 text-foreground/85">{active.distribution}</dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="text-xs uppercase tracking-widest text-gold/80">Economic Importance</dt>
                  <dd className="mt-1 text-foreground/85">{active.economic}</dd>
                </div>
              </dl>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
