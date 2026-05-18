import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero, PageShell } from "@/components/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — phBMI" }, { name: "description", content: "Get in touch with the Philippine Bamboo Musical Instruments Program." }] }),
  component: () => (
    <PageShell>
      <PageHero kicker="Get in touch" title="Contact Us" lead="Reach out about partnerships, training, instrument inquiries, or research collaboration." />
      <div className="mt-10 grid md:grid-cols-3 gap-5">
        {[
          { icon: Mail, label: "Email", value: "info@phbmi.ph" },
          { icon: Phone, label: "Phone", value: "+63 (2) 8000-0000" },
          { icon: MapPin, label: "Address", value: "DOST-FPRDI, College, Laguna, Philippines" },
        ].map((c) => {
          const Icon = c.icon;
          return (
            <div key={c.label} className="rounded-2xl border border-border/50 gradient-card p-6">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-gold mb-3"><Icon size={18}/></div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
              <div className="mt-1 font-display text-lg text-foreground">{c.value}</div>
            </div>
          );
        })}
      </div>
    </PageShell>
  ),
});
