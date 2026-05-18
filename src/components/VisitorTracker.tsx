import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { logVisitor } from "@/lib/visitor.functions";

export function VisitorTracker() {
  const location = useLocation();
  const log = useServerFn(logVisitor);
  useEffect(() => {
    log({ data: { path: location.pathname, referrer: document.referrer || undefined } }).catch(() => {});
  }, [location.pathname, log]);
  return null;
}
