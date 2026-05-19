import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Beaker, Flame, Waves, Cpu, AudioLines, Activity, Gauge, Atom } from "lucide-react";
import { PageHero, PageShell } from "@/components/PageHero";
import { ImageGallery } from "@/components/ImageGallery";

const LAB_GALLERY = [
  { title: "Spectral Analysis", caption: "Frequency-domain fingerprinting of every prototype.", icon: AudioLines, tone: "bamboo" as const },
  { title: "Modal Testing", caption: "Impact hammer + accelerometer rigs for vibration modes.", icon: Activity, tone: "earth" as const },
  { title: "FEA Simulation", caption: "COMSOL-driven prototyping before a single culm is cut.", icon: Atom, tone: "plum" as const },
  { title: "Treatment Trials", caption: "Side-by-side aging studies on chemical and non-chemical methods.", icon: Beaker, tone: "gold" as const },
  { title: "Tuning Bench", caption: "Laser-measured pitch calibration for ensemble-grade builds.", icon: Gauge, tone: "earth" as const },
  { title: "Material Characterization", caption: "Density, moisture, and Young's modulus mapping per culm.", icon: Cpu, tone: "bamboo" as const },
];

const CHEMICAL = ["Spraying", "Brushing", "Dipping", "Pressure Method"];
const PRESERVATIVES = [
  { name: "Propiconazole", purpose: "Fungicide" },
  { name: "Deltamethrin", purpose: "Insect Control" },
];
const NON_CHEMICAL = [
  { icon: Flame, name: "Smoking", desc: "Traditional smoke curing against pests" },
  { icon: Flame, name: "Heat Treatment", desc: "Controlled drying for stability" },
  { icon: Waves, name: "Irradiation", desc: "Modern non-thermal preservation" },
  { icon: Waves, name: "Oil Treatment", desc: "Boiled oil immersion for water resistance" },
  { icon: Waves, name: "Steam Treatment", desc: "Steam-bending and stabilization" },
];

export const Route = createFileRoute("/rnd")({
  head: () => ({ meta: [{ title: "R&D Technologies — phBMI" }, { name: "description", content: "Chemical and non-chemical treatments, acoustic analysis, modal testing, and FEA simulation for bamboo instruments." }] }),
  component: () => (
    <PageShell>
      <PageHero kicker="Technical Knowledge Base" title="R&D Technologies" lead="The science behind the sound — treatments, acoustics, and computational modeling." />

      <section className="mt-12">
        <h2 className="font-display text-2xl text-gold flex items-center gap-2"><Beaker size={20}/> Chemical Treatments</h2>
        <div className="mt-4 grid sm:grid-cols-2 md:grid-cols-4 gap-3">
          {CHEMICAL.map((c) => <div key={c} className="rounded-xl border border-border/50 gradient-card p-4 text-center font-display">{c}</div>)}
        </div>
        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-sm border border-border/50 rounded-lg overflow-hidden">
            <thead className="bg-card/60"><tr><th className="text-left p-3 font-display text-gold">Preservative</th><th className="text-left p-3 font-display text-gold">Purpose</th></tr></thead>
            <tbody>{PRESERVATIVES.map((p) => <tr key={p.name} className="border-t border-border/50"><td className="p-3">{p.name}</td><td className="p-3 text-muted-foreground">{p.purpose}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-gold flex items-center gap-2"><Flame size={20}/> Non-Chemical Treatments</h2>
        <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {NON_CHEMICAL.map((n, i) => {
            const Icon = n.icon;
            return (
              <motion.div key={n.name} whileHover={{ y: -4 }} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="rounded-2xl border border-border/50 gradient-card p-5">
                <Icon className="text-gold" size={24}/>
                <h3 className="mt-3 font-display text-lg">{n.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{n.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl text-gold flex items-center gap-2"><Cpu size={20}/> Advanced Analysis</h2>
        <div className="mt-4 grid lg:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-border/50 gradient-card p-5">
            <h3 className="font-display text-lg text-gold">Acoustic Analysis</h3>
            <ul className="mt-2 text-sm text-foreground/85 space-y-1"><li>• Sound Quality Descriptors (SQD)</li><li>• Timbre mathematical modeling</li></ul>
          </div>
          <div className="rounded-2xl border border-border/50 gradient-card p-5">
            <h3 className="font-display text-lg text-gold">Experimental Modal Analysis</h3>
            <ul className="mt-2 text-sm text-foreground/85 space-y-1"><li>• Vibration characteristics</li><li>• Impact hammer testing</li><li>• Accelerometer measurements</li></ul>
          </div>
          <div className="rounded-2xl border border-border/50 gradient-card p-5">
            <h3 className="font-display text-lg text-gold">Finite Element Analysis</h3>
            <ul className="mt-2 text-sm text-foreground/85 space-y-1"><li>• Simulation-based prototyping</li><li>• COMSOL integration</li><li>• MATLAB integration</li></ul>
          </div>
        </div>
      </section>
    </PageShell>
  ),
});
