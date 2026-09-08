import { useEffect, useRef } from "react";
import { useLocation } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { logVisitor } from "@/lib/visitor.functions";

export function VisitorTracker() {
  const location = useLocation();
  const log = useServerFn(logVisitor);
  // Guards against React Strict Mode's double-invoked effect (and any
  // re-render that doesn't change the route) recording the same page
  // load as two visits. Only a genuine pathname change logs again.
  const loggedPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (loggedPathRef.current === location.pathname) return;
    loggedPathRef.current = location.pathname;
    log({ data: { path: location.pathname, referrer: document.referrer || undefined } }).catch(() => {});
  }, [location.pathname, log]);

  return null;
}
