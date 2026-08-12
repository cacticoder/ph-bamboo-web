import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, MapPin, Leaf } from "lucide-react";
import { INSTRUMENTS, CATEGORIES, CATALOG_MAKERS, type Instrument } from "@/data/instruments";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "BMI Gallery — phBMI" },
      { name: "description", content: "Explore 20+ Philippine bamboo musical instruments across chordophones, aerophones, idiophones, and membranophones." },
    ],
  }),
  component: Gallery,
});

function Gallery() {
  const [cat, setCat] = useState<(typeof CATEGORIES)[number]>("All");
  const [maker, setMaker] = useState<string>("All");
  const [makerType, setMakerType] = useState<"All" | "Indigenous Peoples (IP)" | "Commercial">("All");
  const [q, setQ] = useState("");
  const [active, setActive] = useState<Instrument | null>(null);

  const makerOptions = useMemo(
    () => CATALOG_MAKERS.filter((m) => makerType === "All" || m.type === makerType),
    [makerType],
  );

  const filtered = useMemo(
    () =>
      INSTRUMENTS.filter(
        (i) =>
          (cat === "All" || i.category === cat) &&
          (makerType === "All" || i.makerType === makerType) &&
          (maker === "All" || i.makerId === maker) &&
          (q === "" ||
            i.name.toLowerCase().includes(q.toLowerCase()) ||
            i.localName.toLowerCase().includes(q.toLowerCase()) ||
            i.makerName.toLowerCase().includes(q.toLowerCase()) ||
            i.shortDescription.toLowerCase().includes(q.toLowerCase())),
      ),
    [cat, maker, makerType, q],
  );

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.25em] text-gold/80">BMI Gallery</div>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-gold">The Instruments</h1>
        <p className="mt-4 text-foreground/80">A living archive of bamboo instruments from across the Philippine archipelago.</p>
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search instruments…"
            className="w-full rounded-full bg-card border border-border/60 pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-gold"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition border ${
                cat === c ? "bg-gold text-primary-foreground border-gold" : "border-border/60 text-foreground/80 hover:border-gold/60"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <div className="flex flex-wrap gap-2">
          {(["All", "Indigenous Peoples (IP)", "Commercial"] as const).map((t) => (
            <button
              key={t}
              onClick={() => { setMakerType(t); setMaker("All"); }}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition border ${
                makerType === t ? "bg-primary text-primary-foreground border-primary" : "border-border/60 text-foreground/80 hover:border-primary/60"
              }`}
            >
              {t === "All" ? "All Makers" : t}
            </button>
          ))}
        </div>
        <select
          value={maker}
          onChange={(e) => setMaker(e.target.value)}
          className="rounded-full bg-card border border-border/60 px-4 py-2 text-sm focus:outline-none focus:border-gold"
        >
          <option value="All">All makers / tribes</option>
          {makerOptions.map((m) => (
            <option key={m.id} value={m.id}>{m.name}</option>
          ))}
        </select>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">{filtered.length} instrument{filtered.length === 1 ? "" : "s"}</p>

      <AdSlot slot="gallery-top" className="my-6" />

      <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((ins) => (
            <motion.button
              layout
              key={ins.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              whileHover={{ y: -6 }}
              onClick={() => setActive(ins)}
              className="group text-left rounded-2xl overflow-hidden border border-border/50 gradient-card shadow-card"
            >
              <div className="aspect-[4/3] relative bg-gradient-to-br from-bamboo/40 to-plum/40 flex items-center justify-center texture-bamboo">
                <Leaf className="text-gold/60" size={48} />
                <span className="absolute top-3 left-3 text-[10px] uppercase tracking-widest bg-background/70 text-gold px-2 py-0.5 rounded-full">{ins.category}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg text-gold">{ins.name}</h3>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {ins.makerName} · <span className="text-gold/80">{ins.makerType}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{ins.shortDescription}</p>
                <span className="mt-3 inline-block text-xs font-semibold text-gold group-hover:underline">Read more →</span>
              </div>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && <p className="text-center text-muted-foreground py-12">No instruments match your search.</p>}

      {/* Detail modal */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/85 backdrop-blur-sm flex items-end md:items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass max-w-3xl w-full rounded-2xl border border-gold/30 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <div className="aspect-video bg-gradient-to-br from-bamboo to-plum flex items-center justify-center texture-bamboo">
                <Leaf size={96} className="text-gold/60" />
              </div>
              <div className="p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-gold/80">{active.category}</span>
                    <h2 className="mt-1 font-display text-3xl text-gold">{active.name}</h2>
                  </div>
                  <button onClick={() => setActive(null)} className="p-2 hover:bg-card rounded-full"><X size={18} /></button>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold/15 text-gold px-3 py-1"><Users size={11} />{active.makerName}</span>
                  <span className="rounded-full border border-border/60 px-3 py-1 text-muted-foreground">{active.makerType}</span>
                </div>
                <div className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                  <div className="rounded-lg bg-card/60 p-3"><span className="text-muted-foreground text-xs uppercase tracking-wider">Bamboo</span><div className="font-medium text-foreground mt-0.5">{active.bambooSpecies}</div></div>
                  <div className="rounded-lg bg-card/60 p-3"><span className="text-muted-foreground text-xs uppercase tracking-wider flex items-center gap-1"><MapPin size={11}/>Region</span><div className="font-medium text-foreground mt-0.5">{active.region}</div></div>
                  <div className="rounded-lg bg-card/60 p-3"><span className="text-muted-foreground text-xs uppercase tracking-wider">Local name</span><div className="font-medium text-foreground mt-0.5">{active.localName || "—"}</div></div>
                  <div className="rounded-lg bg-card/60 p-3"><span className="text-muted-foreground text-xs uppercase tracking-wider">Location</span><div className="font-medium text-foreground mt-0.5">{active.location}</div></div>
                </div>
                <p className="mt-5 text-foreground/85 leading-relaxed">{active.fullDescription}</p>
                {active.figure && <p className="mt-3 text-xs text-muted-foreground">{active.figure}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
