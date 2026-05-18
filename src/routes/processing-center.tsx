import { createFileRoute, Link } from "@tanstack/react-router";
import { Youtube, Mail } from "lucide-react";
import { PageHero, PageShell } from "@/components/PageHero";

export const Route = createFileRoute("/processing-center")({
  head: () => ({ meta: [{ title: "BMI Processing Center — phBMI" }, { name: "description", content: "The Bamboo Musical Instruments Processing Center: manufacturing, mini-museum, and training venue." }] }),
  component: () => (
    <PageShell>
      <PageHero kicker="BMIPC" title="BMI Processing Center" lead="A purpose-built facility where bamboo becomes instrument — manufacturing hub, mini museum, and training venue." />
      <div className="mt-10 grid lg:grid-cols-2 gap-8 items-center">
        <div className="aspect-video rounded-2xl gradient-card shadow-card texture-bamboo border border-border/50" />
        <div className="space-y-4 text-foreground/85">
          <p>The BMI Processing Center consolidates the program's core functions: harvesting, treating, and shaping bamboo into precision-tuned instruments ready for performance, classroom, and export.</p>
          <ul className="space-y-2 text-sm">
            <li className="flex gap-2"><span className="text-gold">●</span> Manufacturing & quality control</li>
            <li className="flex gap-2"><span className="text-gold">●</span> Mini museum of Philippine bamboo heritage</li>
            <li className="flex gap-2"><span className="text-gold">●</span> Training venue for makers and educators</li>
          </ul>
          <div className="flex gap-3 pt-2">
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-primary-foreground"><Mail size={14}/> Contact Us</Link>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-gold/40 px-5 py-2.5 text-sm font-semibold text-gold hover:bg-gold/10"><Youtube size={14}/> Facility Tour</a>
          </div>
        </div>
      </div>
    </PageShell>
  ),
});
