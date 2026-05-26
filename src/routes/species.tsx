import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Leaf, TreePine, Sprout, TreeDeciduous, ArrowRight } from "lucide-react";
import { SPECIES } from "@/data/site";
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
  return (
    <PageShell>
      <PageHero kicker="Botanical Heritage" title="Bamboo Species" lead="The native and naturalized bamboos that give voice to Philippine instruments." />
      <h2 className="mt-12 font-display text-2xl text-gold">Species Catalogue</h2>
      <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SPECIES.map((s, i) => (
          <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="rounded-2xl overflow-hidden border border-border/50 gradient-card shadow-card flex flex-col">
            <Link to="/species/$id" params={{ id: s.id }} className="block aspect-[4/3] overflow-hidden">
              <img src={s.image} alt={s.common} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
            </Link>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-display text-lg text-gold">{s.common}</h3>
              <div className="text-xs italic text-muted-foreground">{s.scientific}</div>
              <p className="mt-3 text-sm text-foreground/80 line-clamp-3">{s.description}</p>
              <Link to="/species/$id" params={{ id: s.id }} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold/80 transition-colors">
                Read more <ArrowRight size={14} />
              </Link>
            </div>
          </motion.div>
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
    </PageShell>
  );
}
