import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageShell } from "@/components/PageHero";
import {
  VC_SECTIONS,
  VC_EXECUTIVE_SUMMARY,
  VC_TITLE,
  VC_SUBTITLE,
  VC_MAP_IMAGE,
  type VcBlock,
  type VcSubsection,
} from "@/data/value-chain";

export const Route = createFileRoute("/value-chain")({
  head: () => ({
    meta: [
      { title: "Value Chain Analysis — phBMI" },
      {
        name: "description",
        content:
          "A deep-dive socioeconomic and operational value chain analysis of the Philippine Bamboo Musical Instruments (BMI) industry, from DOST-FPRDI.",
      },
    ],
  }),
  component: ValueChain,
});

function Block({ block }: { block: VcBlock }) {
  if (block.type === "paragraph") {
    return <p className="text-foreground/85 leading-relaxed">{block.text}</p>;
  }
  if (block.type === "bullets") {
    return (
      <ul className="space-y-3">
        {block.items.map((item, i) => (
          <li key={i} className="flex gap-2.5 text-foreground/85 leading-relaxed">
            <span className="text-gold flex-shrink-0 mt-1">•</span>
            <span>
              {item.label && <span className="font-semibold text-foreground">{item.label}: </span>}
              {item.text}
            </span>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === "flow") {
    return (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {block.items.map((item, i) => (
          <div key={i} className="rounded-xl border border-gold/30 bg-gold/5 p-4">
            <div className="font-display text-gold text-sm">{item.label}</div>
            <p className="mt-1.5 text-sm text-foreground/80 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

function Subsection({ sub }: { sub: VcSubsection }) {
  return (
    <div className="mt-8">
      {sub.heading && (
        <h3 className="font-display text-lg md:text-xl text-foreground mb-3">{sub.heading}</h3>
      )}
      <div className="space-y-4">
        {sub.blocks.map((b, i) => (
          <Block key={i} block={b} />
        ))}
      </div>
    </div>
  );
}

function ValueChain() {
  return (
    <PageShell>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl"
      >
        <div className="text-xs uppercase tracking-[0.25em] text-gold/80">
          DOST-FPRDI · Bamboo Musical Instruments Innovation R&amp;D Program
        </div>
        <h1 className="mt-3 font-display text-3xl md:text-5xl text-gold leading-tight">
          {VC_TITLE}
        </h1>
        <p className="mt-4 text-base italic text-foreground/80">{VC_SUBTITLE}</p>
      </motion.div>

      <section className="mt-10 rounded-2xl border border-gold/30 gradient-card p-6 md:p-8 shadow-card">
        <h2 className="font-display text-xl text-gold">Executive Summary</h2>
        <div className="mt-4 space-y-4">
          {VC_EXECUTIVE_SUMMARY.map((p, i) => (
            <p key={i} className="text-foreground/85 leading-relaxed">
              {p}
            </p>
          ))}
        </div>
      </section>

      <div className="mt-14 space-y-16">
        {VC_SECTIONS.map((section) => (
          <section key={section.id} id={section.id}>
            <h2 className="font-display text-2xl md:text-3xl text-gold flex items-baseline gap-3">
              <span className="text-gold/50 text-lg md:text-xl">{section.number}.</span>
              {section.title}
            </h2>
            <div className="mt-5 space-y-4">
              {section.blocks.map((b, i) => (
                <Block key={i} block={b} />
              ))}
            </div>

            {section.id === "value-chain-map" && (
              <div className="mt-8 rounded-2xl border border-border/50 bg-white p-4 md:p-6 shadow-card flex justify-center">
                <img
                  src={VC_MAP_IMAGE}
                  alt="BMI Value Chain Map — a diagram of the Philippine Bamboo Musical Instruments value chain, showing core functions, industry players, support services, and the enabling environment"
                  className="max-w-full h-auto rounded-lg"
                  loading="lazy"
                />
              </div>
            )}

            {section.subsections?.map((sub, i) => (
              <Subsection key={i} sub={sub} />
            ))}
          </section>
        ))}
      </div>
    </PageShell>
  );
}
