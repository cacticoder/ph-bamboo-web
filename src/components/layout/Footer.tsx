import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, Mail } from "lucide-react";
import { NAV_LINKS } from "@/data/site";
import logoUrl from "@/assets/BMI-website-logo.gif";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logoUrl} alt="BMI Program logo" className="h-12 w-auto flex-shrink-0" />
            <div>
              <div className="font-display text-xl text-gold">BMI Program</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Philippine Bamboo Musical Instruments</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            A government initiative dedicated to promoting, preserving, and advancing the tradition of bamboo
            instrument making through research, training, innovation, and cultural preservation.
          </p>
          <div className="mt-5 flex gap-3 text-muted-foreground">
            <a href="https://www.facebook.com/dostfprdi" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-gold transition"><Facebook size={18} /></a>
            <a href="https://www.youtube.com/@dostfprdi" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-gold transition"><Youtube size={18} /></a>
            <a href="mailto:info@fprdi.dost.gov.ph" aria-label="Email" className="hover:text-gold transition"><Mail size={18} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-gold mb-3">Explore</h4>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.slice(0, 5).map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-muted-foreground hover:text-gold transition">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm uppercase tracking-widest text-gold mb-3">Information</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/terms" className="text-muted-foreground hover:text-gold transition">Terms and Conditions</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-gold transition">Contact Us</Link></li>
            <li><Link to="/modules" className="text-muted-foreground hover:text-gold transition">Teaching Modules</Link></li>
            <li><Link to="/rnd" className="text-muted-foreground hover:text-gold transition">R&amp;D Technologies</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-5 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Philippine Bamboo Musical Instruments Program. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
