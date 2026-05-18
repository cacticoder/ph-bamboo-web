import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, X } from "lucide-react";

const KEY = "phbmi-copyright-ack";

export function CopyrightBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!localStorage.getItem(KEY)) {
      const t = setTimeout(() => setShow(true), 800);
      return () => clearTimeout(t);
    }
  }, []);
  const dismiss = () => {
    localStorage.setItem(KEY, "1");
    setShow(false);
  };
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 220, damping: 24 }}
          className="fixed inset-x-3 bottom-3 z-50 md:inset-x-auto md:right-6 md:bottom-6 md:max-w-md"
        >
          <div className="glass rounded-xl border border-gold/30 p-4 shadow-card">
            <div className="flex items-start gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-gold/15 text-gold shrink-0">
                <ShieldAlert size={18} />
              </div>
              <div className="flex-1">
                <h4 className="font-display text-base text-gold leading-tight">Copyright Notice</h4>
                <p className="mt-1 text-xs leading-relaxed text-foreground/80">
                  All videos and content on this website are protected by copyright laws.
                  Unauthorized copying, downloading, reproduction, or distribution is strictly prohibited.
                </p>
                <button
                  onClick={dismiss}
                  className="mt-3 inline-flex items-center rounded-md bg-gold px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90 transition"
                >
                  I understand
                </button>
              </div>
              <button onClick={dismiss} aria-label="Close" className="text-muted-foreground hover:text-foreground">
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
