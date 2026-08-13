import { ReactNode } from "react";
import { motion } from "framer-motion";

export function PageHero({ kicker, title, lead }: { kicker: string; title: string; lead: ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
      <div className="text-xs uppercase tracking-[0.25em] text-gold/80">{kicker}</div>
      <h1 className="mt-3 font-display text-4xl md:text-5xl text-gold">{title}</h1>
      <p className="mt-4 text-foreground/80 leading-relaxed">{lead}</p>
    </motion.div>
  );
}

export function PageShell({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">{children}</div>;
}
