import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Hammer, Music2, Users, Award } from "lucide-react";
import { MAKERS } from "@/data/site";
import { PageHero, PageShell } from "@/components/PageHero";
import { ImageGallery } from "@/components/ImageGallery";

const WORKSHOP_GALLERY = [
  { title: "Curing the Culms", caption: "Selected bayog poles drying under the sun before tuning.", icon: Hammer, tone: "bamboo" as const },
  { title: "Tuning by Ear", caption: "Master makers shave nodes a millimeter at a time to nail the pitch.", icon: Music2, tone: "earth" as const },
  { title: "Apprentice Day", caption: "Younger artisans learning under tradition-bearers in Maasin.", icon: Users, tone: "plum" as const },
  { title: "Award-Winning Ensembles", caption: "Hand-built instruments performing on international stages.", icon: Award, tone: "gold" as const },
  { title: "The Workshop Floor", caption: "Open-air ateliers where every instrument is made one at a time.", icon: Hammer, tone: "bamboo" as const },
  { title: "Hands of Heritage", caption: "Forty-year palms shaping the next generation of sound.", icon: Users, tone: "earth" as const },
];

export const Route = createFileRoute("/makers")({
  head: () => ({ meta: [{ title: "BMI Makers — phBMI" }, { name: "description", content: "Master craftsmen and tradition-bearers of Philippine bamboo instruments." }] }),
  component: () => (
    <PageShell>
      <PageHero kicker="Tradition Bearers" title="BMI Makers" lead="The artisans whose hands keep the bamboo singing — meet the makers preserving centuries of Philippine instrument craft." />

      <section className="mt-12">
        <h2 className="font-display text-2xl text-gold">Featured Artisans</h2>
        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
      </section>

      <section className="mt-16">
        <div className="flex items-end justify-between">
          <h2 className="font-display text-2xl text-gold">Inside the Workshops</h2>
          <p className="text-sm text-muted-foreground hidden md:block">Glimpses of daily craft, from raw culm to finished instrument.</p>
        </div>
        <div className="mt-5">
          <ImageGallery tiles={WORKSHOP_GALLERY} columns={3} />
        </div>
      </section>

      <section className="mt-16 rounded-2xl border border-border/50 gradient-card p-6 md:p-8 shadow-card">
        <h2 className="font-display text-2xl text-gold">Becoming a Maker</h2>
        <p className="mt-3 text-foreground/85 max-w-3xl">phBMI partners with master artisans across the country to run apprenticeship cohorts at the BMI Processing Center. Selected apprentices receive a yearly stipend, raw materials, and direct mentorship from tradition-bearers — building a sustainable pipeline of next-generation Filipino instrument makers.</p>
      </section>
    </PageShell>
  ),
});
