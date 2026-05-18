import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MAKERS } from "@/data/site";
import { PageHero, PageShell } from "@/components/PageHero";

export const Route = createFileRoute("/makers")({
  head: () => ({ meta: [{ title: "BMI Makers — phBMI" }, { name: "description", content: "Master craftsmen and tradition-bearers of Philippine bamboo instruments." }] }),
  component: () => (
    <PageShell>
      <PageHero kicker="Tradition Bearers" title="BMI Makers" lead="The artisans whose hands keep the bamboo singing." />
      <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {MAKERS.map((m, i) => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4 }} className="rounded-2xl overflow-hidden border border-border/50 gradient-card shadow-card">
            <div className="aspect-[3/4] bg-gradient-to-br from-earth/50 to-plum/40 texture-bamboo grid place-items-center">
              <span className="font-display text-6xl text-gold/40">{m.name[0]}</span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-lg text-gold">{m.name}</h3>
              <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{m.region}</div>
              <p className="mt-3 text-sm text-foreground/80">{m.bio}</p>
              <div className="mt-3 inline-block text-[10px] uppercase tracking-widest bg-gold/15 text-gold px-2 py-1 rounded-full">{m.expertise}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </PageShell>
  ),
});
