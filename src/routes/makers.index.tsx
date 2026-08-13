import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Music2, Leaf, Users, ArrowRight } from "lucide-react";
import { MAKERS } from "@/data/site";
import { SPECIES } from "@/data/site";
import { INSTRUMENTS } from "@/data/instruments";
import { PageHero, PageShell } from "@/components/PageHero";

const speciesLinkFor = (name: string) =>
  SPECIES.find((s) => name.toLowerCase().includes(s.scientific.toLowerCase()) || name.toLowerCase().includes(s.common.toLowerCase()));

function makerFacts(makerId: string) {
  const items = INSTRUMENTS.filter((i) => i.makerId === makerId);
  const instruments = items.map((i) => ({ id: i.id, name: i.name }));
  const species = Array.from(new Set(items.map((i) => i.bambooSpecies)));
  return { instruments, species };
}

export const Route = createFileRoute("/makers/")({
  head: () => ({
    meta: [
      { title: "BMI Makers — phBMI" },
      { name: "description", content: "Indigenous cultural groups and commercial artisans crafting Philippine bamboo musical instruments." },
      { property: "og:title", content: "BMI Makers — phBMI" },
      { property: "og:description", content: "Indigenous cultural groups and commercial artisans crafting Philippine bamboo musical instruments." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MakersPage,
});

function MakersPage() {
  return (
    <PageShell>
      <PageHero
        kicker="Tradition Bearers"
        title="BMI Makers"
        lead={
          <>
            Philippine <strong>BMI makers</strong> represent a vibrant community of <strong>indigenous cultural groups</strong> and{" "}
            <strong>commercial artisans</strong> who transform local bamboo species into unique vessels of cultural identity across the
            archipelago. By integrating <strong>traditional craftsmanship</strong> with <strong>scientific research and development</strong>,
            these master builders ensure the continued preservation, innovation, and global appreciation of the nation’s rich musical heritage.
          </>
        }
      />

      <section className="mt-12">
        <h2 className="font-display text-2xl text-gold">Featured Artisans</h2>
        <div className="mt-5 grid md:grid-cols-2 gap-5">
          {MAKERS.map((m, i) => {
            const { instruments, species } = makerFacts(m.id);
            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden border border-border/50 gradient-card shadow-card flex flex-col"
              >
                <Link to="/makers/$id" params={{ id: m.id }} className="block aspect-[4/3] overflow-hidden">
                  <img src={m.image} alt={m.name} className="h-full w-full object-cover transition-transform duration-500 hover:scale-105" />
                </Link>
                <div className="p-5 flex flex-col flex-1">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Maker</div>
                  <h3 className="font-display text-lg text-gold">{m.name}</h3>
                  {m.makerType && (
                    <div className="mt-2 inline-block self-start text-[10px] uppercase tracking-widest bg-gold/15 text-gold px-2 py-1 rounded-full">
                      {m.makerType}
                    </div>
                  )}

                  {m.community && (
                    <div className="mt-4">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Community</div>
                      <div className="text-sm text-foreground/85 inline-flex items-center gap-1.5"><Users size={13} className="text-gold" /> {m.community}</div>
                    </div>
                  )}

                  {(m.location || m.region) && (
                    <div className="mt-3">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Location</div>
                      <div className="text-sm text-foreground/85 inline-flex items-center gap-1.5"><MapPin size={13} className="text-gold" /> {m.location ?? m.region}</div>
                    </div>
                  )}

                  {instruments.length > 0 && (
                    <div className="mt-3">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5"><Music2 size={12} className="text-gold" /> Instruments</div>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {instruments.map((ins) => (
                          <Link key={ins.id} to="/gallery" className="text-xs rounded-full border border-border/60 px-2 py-1 text-foreground/85 hover:border-gold hover:text-gold transition-colors">
                            {ins.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {species.length > 0 && (
                    <div className="mt-3">
                      <div className="text-[10px] uppercase tracking-widest text-muted-foreground inline-flex items-center gap-1.5"><Leaf size={12} className="text-gold" /> Bamboo</div>
                      <div className="mt-1 flex flex-wrap gap-1.5">
                        {species.map((s) => {
                          const match = speciesLinkFor(s);
                          return match ? (
                            <Link key={s} to="/species" className="text-xs italic rounded-full border border-border/60 px-2 py-1 text-foreground/85 hover:border-gold hover:text-gold transition-colors">
                              {s}
                            </Link>
                          ) : (
                            <span key={s} className="text-xs italic rounded-full border border-border/60 px-2 py-1 text-foreground/70">{s}</span>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  <p className="mt-4 text-sm text-foreground/80">{m.bio}</p>

                  <Link to="/makers/$id" params={{ id: m.id }} className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold/80 transition-colors">
                    View Profile <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </PageShell>
  );
}
