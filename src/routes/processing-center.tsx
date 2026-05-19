import { createFileRoute, Link } from "@tanstack/react-router";
import { Youtube, Mail, Factory, Landmark, GraduationCap, Wrench, Microscope, Music2 } from "lucide-react";
import { PageHero, PageShell } from "@/components/PageHero";
import { ImageGallery } from "@/components/ImageGallery";

const FACILITY_GALLERY = [
  { title: "Manufacturing Floor", caption: "CNC-assisted cutting paired with traditional hand-finishing.", icon: Factory, tone: "earth" as const },
  { title: "Mini Museum", caption: "Permanent exhibit of regional bamboo instrument traditions.", icon: Landmark, tone: "plum" as const },
  { title: "Training Studios", caption: "Workshops for educators, makers, and student ensembles.", icon: GraduationCap, tone: "bamboo" as const },
  { title: "Tool Bench", caption: "Custom jigs and tuning rigs developed in-house.", icon: Wrench, tone: "gold" as const },
  { title: "Acoustic Lab", caption: "Anechoic measurements for every instrument leaving the facility.", icon: Microscope, tone: "earth" as const },
  { title: "Performance Hall", caption: "On-site venue for premieres and recordings.", icon: Music2, tone: "plum" as const },
];

const STATS = [
  { value: "1,200+", label: "Instruments produced annually" },
  { value: "18", label: "Resident artisans & researchers" },
  { value: "42", label: "Educator workshops hosted" },
  { value: "9", label: "Regions reached through outreach" },
];

export const Route = createFileRoute("/processing-center")({
  head: () => ({ meta: [{ title: "BMI Processing Center — phBMI" }, { name: "description", content: "The Bamboo Musical Instruments Processing Center: manufacturing, mini-museum, and training venue." }] }),
  component: () => (
    <PageShell>
      <PageHero kicker="BMIPC" title="BMI Processing Center" lead="A purpose-built facility where bamboo becomes instrument — manufacturing hub, mini museum, and training venue." />

      <div className="mt-10 grid lg:grid-cols-2 gap-8 items-center">
        <div className="aspect-video rounded-2xl gradient-card shadow-card texture-bamboo border border-border/50 grid place-items-center">
          <Factory size={72} className="text-gold/60" />
        </div>
        <div className="space-y-4 text-foreground/85">
          <p>The BMI Processing Center consolidates the program's core functions: harvesting, treating, and shaping bamboo into precision-tuned instruments ready for performance, classroom, and export.</p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><span className="text-gold">●</span> Manufacturing & quality control</li>
            <li className="flex gap-2"><span className="text-gold">●</span> Mini museum of Philippine bamboo heritage</li>
            <li className="flex gap-2"><span className="text-gold">●</span> Training venue for makers and educators</li>
            <li className="flex gap-2"><span className="text-gold">●</span> Acoustic measurement and modal analysis lab</li>
          </ul>
          <div className="flex gap-3 pt-2">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground"><Mail size={14}/> Contact Us</Link>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10"><Youtube size={14}/> Facility Tour</a>
          </div>
        </div>
      </div>

      <section className="mt-16">
        <h2 className="font-display text-2xl text-gold">Inside the Center</h2>
        <p className="text-sm text-muted-foreground mt-1">Six interlocking spaces under one roof.</p>
        <div className="mt-5">
          <ImageGallery tiles={FACILITY_GALLERY} columns={3} />
        </div>
      </section>

      <section className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card text-center">
            <div className="font-display text-3xl text-gold">{s.value}</div>
            <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{s.label}</div>
          </div>
        ))}
      </section>
    </PageShell>
  ),
});
