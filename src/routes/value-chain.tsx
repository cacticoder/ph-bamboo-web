import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Trees, Hammer, Store, Wrench } from "lucide-react";
import { PageHero, PageShell } from "@/components/PageHero";

const STAGES = [
  { icon: Trees, title: "Raw Material Procurement", details: ["Bamboo species selection", "Traditional IP harvesting practices", "Sustainable sourcing"] },
  { icon: Hammer, title: "Production / BMI Making", details: ["Traditional tools", "Artisanal craftsmanship", "Tuning by ear"] },
  { icon: Store, title: "Marketing & Distribution", details: ["Traditional peddling", "Modern online retail", "Music stores"] },
  { icon: Wrench, title: "Support Services", details: ["Instrument repair", "Tuning services", "Teaching customers"] },
];

export const Route = createFileRoute("/value-chain")({
  head: () => ({ meta: [{ title: "BMI Value Chain — phBMI" }, { name: "description", content: "The full value chain of bamboo musical instrument production." }] }),
  component: ValueChain,
});

function ValueChain() {
  const [open, setOpen] = useState(0);
  return (
    <PageShell>
      <PageHero kicker="From Forest to Stage" title="Interactive Value Chain" lead="Trace each step of how bamboo becomes a finished instrument in a player's hands." />
      <div className="mt-12 relative">
        <div className="hidden md:block absolute left-0 right-0 top-10 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="grid md:grid-cols-4 gap-5">
          {STAGES.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.button key={i} onClick={() => setOpen(i)} whileHover={{ y: -4 }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className={`relative text-left rounded-2xl border p-5 ${open === i ? "border-gold bg-gold/10" : "border-border/50 gradient-card"}`}>
                <div className={`grid h-12 w-12 place-items-center rounded-full ${open === i ? "bg-gold text-primary-foreground" : "bg-gold/15 text-gold"} mb-3`}><Icon size={20}/></div>
                <div className="text-xs uppercase tracking-widest text-gold/80">Stage {i + 1}</div>
                <h3 className="mt-1 font-display text-lg">{s.title}</h3>
                {open === i && (
                  <motion.ul initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-3 space-y-1 text-sm text-foreground/85">
                    {s.details.map((d) => <li key={d}>• {d}</li>)}
                  </motion.ul>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </PageShell>
  );
}
