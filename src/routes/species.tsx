import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Leaf } from "lucide-react";
import { SPECIES } from "@/data/site";
import { PageHero, PageShell } from "@/components/PageHero";

export const Route = createFileRoute("/species")({
  head: () => ({ meta: [{ title: "Bamboo Species — phBMI" }, { name: "description", content: "Philippine bamboo species used in musical instrument making." }] }),
  component: SpeciesPage,
});

function SpeciesPage() {
  const [active, setActive] = useState<(typeof SPECIES)[number] | null>(null);
  return (
    <PageShell>
      <PageHero kicker="Botanical Heritage" title="Bamboo Species" lead="The native and naturalized bamboos that give voice to Philippine instruments." />
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {SPECIES.map((s) => (
          <motion.button key={s.id} whileHover={{ y: -4 }} onClick={() => setActive(s)} className="text-left rounded-2xl overflow-hidden border border-border/50 gradient-card shadow-card">
            <div className="aspect-square bg-gradient-to-br from-bamboo/50 to-earth/40 texture-bamboo grid place-items-center">
              <Leaf size={56} className="text-gold/60"/>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg text-gold">{s.common}</h3>
              <div className="text-xs italic text-muted-foreground">{s.scientific}</div>
            </div>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {active && (
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-background/85 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>setActive(null)}>
            <motion.div initial={{scale:.95,y:20}} animate={{scale:1,y:0}} onClick={(e)=>e.stopPropagation()} className="glass max-w-2xl w-full rounded-2xl border border-gold/30 p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start"><div><div className="text-xs uppercase tracking-widest text-gold/80">{active.synonyms.join(" · ")}</div><h2 className="font-display text-3xl text-gold mt-1">{active.common}</h2><div className="italic text-muted-foreground">{active.scientific}</div></div><button onClick={()=>setActive(null)} className="p-2 hover:bg-card rounded-full"><X size={18}/></button></div>
              <p className="mt-4 text-foreground/85">{active.description}</p>
              <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                <div className="rounded-lg bg-card/60 p-3"><div className="text-xs uppercase tracking-wider text-muted-foreground">Habitat</div><div className="mt-1">{active.habitat}</div></div>
                <div className="rounded-lg bg-card/60 p-3"><div className="text-xs uppercase tracking-wider text-muted-foreground">Distribution</div><div className="mt-1">{active.distribution}</div></div>
                <div className="rounded-lg bg-card/60 p-3 sm:col-span-2"><div className="text-xs uppercase tracking-wider text-muted-foreground">Economic Importance</div><div className="mt-1">{active.economic}</div></div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
