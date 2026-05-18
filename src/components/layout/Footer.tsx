import { Link } from "@tanstack/react-router";
import { Facebook, Youtube, Instagram, Mail } from "lucide-react";
import { NAV_LINKS } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-card/40">
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-full gradient-gold text-primary-foreground font-display text-xl font-bold">ph</div>
            <div>
              <div className="font-display text-xl text-gold">phBMI Program</div>
              <div className="text-xs uppercase tracking-widest text-muted-foreground">Philippine Bamboo Musical Instruments</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-muted-foreground leading-relaxed">
            A government initiative dedicated to promoting, preserving, and advancing the tradition of bamboo
            instrument making through research, training, innovation, and cultural preservation.
          </p>
          <div className="mt-5 flex gap-3 text-muted-foreground">
            <a href="#" aria-label="Facebook" className="hover:text-gold transition"><Facebook size={18} /></a>
            <a href="#" aria-label="YouTube" className="hover:text-gold transition"><Youtube size={18} /></a>
            <a href="#" aria-label="Instagram" className="hover:text-gold transition"><Instagram size={18} /></a>
            <a href="mailto:info@phbmi.ph" aria-label="Email" className="hover:text-gold transition"><Mail size={18} /></a>
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
        <div className="mx-auto max-w-7xl px-4 md:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Philippine Bamboo Musical Instruments Program. All rights reserved.</div>
          <div className="font-display tracking-wider text-gold/80">phBMI Design</div>
        </div>
      </div>
    </footer>
  );
}
