import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "@/data/site";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  const overlay = location.pathname === "/" && !scrolled;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled ? "glass shadow-card" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="grid h-10 w-10 place-items-center rounded-full gradient-gold text-primary-foreground font-display text-lg font-bold shadow-glow">
            ph
          </div>
          <div className="leading-tight">
            <div className={cn("font-display text-lg font-semibold", overlay ? "text-[#fdfaf3]" : "text-gold")}>phBMI</div>
            <div className={cn("text-[10px] uppercase tracking-[0.2em]", overlay ? "text-[#f2ead9]/70" : "text-muted-foreground")}>Heritage · Research · Innovation</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                overlay ? "text-[#f2ead9]/85 hover:text-[#fdfaf3]" : "text-foreground/80 hover:text-gold",
              )}
              activeProps={{ className: overlay ? "text-[#fdfaf3]" : "text-gold" }}
            >

              {({ isActive }) => (
                <>
                  {l.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute inset-x-2 -bottom-px h-[2px] bg-gold rounded-full"
                    />
                  )}
                </>
              )}
            </Link>
          ))}
        </nav>

        <button
          aria-label="Menu"
          className="lg:hidden grid h-10 w-10 place-items-center rounded-md text-foreground hover:bg-card"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden overflow-hidden border-t border-border/60 glass"
          >
            <div className="px-4 py-3 flex flex-col">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="py-3 text-foreground/90 hover:text-gold border-b border-border/30 last:border-0"
                  activeProps={{ className: "text-gold" }}
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
