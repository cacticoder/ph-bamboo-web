import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Heart, Download, Eye, X, Copy, Quote } from "lucide-react";
import { MODULES, type TeachingModule } from "@/data/modules";
import { seedMetrics, incrementMetric } from "@/lib/metrics";
import { AdSlot } from "@/components/AdSlot";

export const Route = createFileRoute("/modules")({
  head: () => ({
    meta: [
      { title: "Teaching Modules — phBMI" },
      { name: "description", content: "Educational modules on Philippine bamboo musical instruments for elementary and high school learners." },
    ],
  }),
  component: ModulesPage,
});

type Tab = "All" | "Elementary V1" | "Elementary V2" | "High School V1" | "High School V2";
const TABS: Tab[] = ["All", "Elementary V1", "Elementary V2", "High School V1", "High School V2"];

function matches(tab: Tab, m: TeachingModule) {
  if (tab === "All") return true;
  return tab === `${m.level} V${m.volume}`;
}

function ModulesPage() {
  const [tab, setTab] = useState<Tab>("All");
  const [active, setActive] = useState<TeachingModule | null>(null);
  const [cite, setCite] = useState<TeachingModule | null>(null);

  const filtered = useMemo(() => MODULES.filter((m) => matches(tab, m)), [tab]);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <div className="max-w-2xl">
        <div className="text-xs uppercase tracking-[0.25em] text-gold/80">Educational Portal</div>
        <h1 className="mt-3 font-display text-4xl md:text-5xl text-gold">Teaching Modules</h1>
        <p className="mt-4 text-foreground/80">Curated modules with built-in PDF reader and citation tools.</p>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition border ${
              tab === t ? "bg-gold text-primary-foreground border-gold" : "border-border/60 text-foreground/80 hover:border-gold/60"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filtered.map((m) => {
            const metrics = seedMetrics(m.id);
            return (
              <motion.div
                layout
                key={m.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl overflow-hidden border border-border/50 gradient-card shadow-card flex flex-col"
              >
                <div className="aspect-[4/3] relative bg-gradient-to-br from-bamboo/40 to-earth/40 flex items-center justify-center texture-bamboo overflow-hidden">
                  {m.coverUrl ? (
                    <img
                      src={m.coverUrl}
                      alt={`Cover of ${m.title}`}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: m.coverPosition ?? "center" }}
                    />
                  ) : (
                    <FileText size={48} className="text-gold/60" />
                  )}
                  <span className="absolute top-3 right-3 text-[10px] uppercase tracking-widest bg-gold text-primary-foreground px-2 py-0.5 rounded-full font-bold">{m.grade}</span>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-gold/80">{m.level} · Vol {m.volume}</span>
                  <h3 className="mt-1 font-display text-lg text-foreground line-clamp-2">{m.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2 flex-1">{m.description}</p>
                  <div className="mt-3 flex items-center gap-3 text-[11px] text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><Eye size={11}/>{metrics.views.toLocaleString()}</span>
                    <span className="inline-flex items-center gap-1"><Heart size={11}/>{metrics.likes.toLocaleString()}</span>
                    <span className="inline-flex items-center gap-1"><Download size={11}/>{metrics.downloads.toLocaleString()}</span>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a
                      href={m.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => { e.preventDefault(); setActive(m); void incrementMetric(m.id, "views"); }}
                      className="flex-1 rounded-md bg-gold text-primary-foreground px-3 py-2 text-xs font-semibold hover:opacity-90 text-center"
                    >
                      Read
                    </a>
                    <button
                      onClick={() => setCite(m)}
                      className="rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold hover:bg-gold/10 inline-flex items-center gap-1"
                    >
                      <Quote size={12}/> Cite
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      <AdSlot slot="modules-bottom" />

      {/* PDF reader */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-sm flex flex-col"
            onClick={() => setActive(null)}
          >
            <div className="flex items-center justify-between p-4 border-b border-border/60" onClick={(e) => e.stopPropagation()}>
              <div>
                <div className="text-xs text-gold/80 uppercase tracking-widest">{active.grade}</div>
                <h3 className="font-display text-lg text-foreground line-clamp-1">{active.title}</h3>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={active.pdfUrl}
                  download
                  onClick={() => void incrementMetric(active.id, "downloads")}
                  className="rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold hover:bg-gold/10 inline-flex items-center gap-1"
                >
                  <Download size={12}/> Download
                </a>
                <button
                  onClick={() => void incrementMetric(active.id, "likes")}
                  className="rounded-md border border-gold/40 px-3 py-2 text-xs font-semibold text-gold hover:bg-gold/10 inline-flex items-center gap-1"
                >
                  <Heart size={12}/> Like
                </button>
                <button onClick={() => setActive(null)} className="p-2 hover:bg-card rounded-full"><X size={18} /></button>
              </div>
            </div>
            <div className="flex-1 p-2 md:p-4" onClick={(e) => e.stopPropagation()}>
              <iframe src={active.pdfUrl} className="w-full h-full rounded-lg border border-border/60" title={active.title} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Citation modal */}
      <AnimatePresence>{cite && <CitationModal module={cite} onClose={() => setCite(null)} />}</AnimatePresence>
    </div>
  );
}

type Format = "APA" | "MLA" | "Chicago" | "BibTeX";

function buildCitation(m: TeachingModule, fmt: Format, url: string): string {
  const authors = m.authors.join(", ");
  switch (fmt) {
    case "APA":
      return `${authors} (${m.year}). ${m.title} (Vol. ${m.volume}). Philippine Bamboo Musical Instruments Program. ${url}`;
    case "MLA":
      return `${authors}. "${m.title}." Vol. ${m.volume}, Philippine Bamboo Musical Instruments Program, ${m.year}, ${url}.`;
    case "Chicago":
      return `${authors}. "${m.title}." Vol. ${m.volume}. Philippine Bamboo Musical Instruments Program, ${m.year}. ${url}.`;
    case "BibTeX":
      return `@techreport{${m.id},\n  title  = {${m.title}},\n  author = {${authors}},\n  year   = {${m.year}},\n  institution = {Philippine Bamboo Musical Instruments Program},\n  volume = {${m.volume}},\n  url    = {${url}}\n}`;
  }
}

function CitationModal({ module, onClose }: { module: TeachingModule; onClose: () => void }) {
  const [fmt, setFmt] = useState<Format>("APA");
  const url = typeof window !== "undefined" ? `${window.location.origin}/modules#${module.id}` : `/modules#${module.id}`;
  const text = buildCitation(module, fmt, url);
  const copy = async () => { await navigator.clipboard.writeText(text); };
  const download = () => {
    const blob = new Blob([text], { type: fmt === "BibTeX" ? "text/x-bibtex" : "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${module.id}-${fmt}.${fmt === "BibTeX" ? "bib" : "txt"}`;
    a.click();
  };
  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/85 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass max-w-2xl w-full rounded-2xl border border-gold/30 p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-widest text-gold/80">Cite this content</div>
            <h3 className="font-display text-xl text-gold mt-1">{module.title}</h3>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-card rounded-full"><X size={18}/></button>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {(["APA", "MLA", "Chicago", "BibTeX"] as Format[]).map((f) => (
            <button key={f} onClick={() => setFmt(f)} className={`px-3 py-1 rounded-full text-xs border ${fmt === f ? "bg-gold text-primary-foreground border-gold" : "border-border/60 text-foreground/80 hover:border-gold/60"}`}>{f}</button>
          ))}
        </div>
        <pre className="mt-4 whitespace-pre-wrap break-words rounded-lg bg-background/60 border border-border/60 p-4 text-xs text-foreground/85 font-mono max-h-64 overflow-auto">{text}</pre>
        <div className="mt-4 flex gap-2">
          <button onClick={copy} className="inline-flex items-center gap-2 rounded-md bg-gold text-primary-foreground px-4 py-2 text-xs font-semibold hover:opacity-90"><Copy size={12}/> Copy</button>
          <button onClick={download} className="inline-flex items-center gap-2 rounded-md border border-gold/40 px-4 py-2 text-xs font-semibold text-gold hover:bg-gold/10"><Download size={12}/> Download</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
