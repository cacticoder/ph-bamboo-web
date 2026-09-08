import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type AdminSessionState =
  | { status: "loading" }
  | { status: "signed-out" }
  | { status: "forbidden" }
  | { status: "authorized"; session: Session };

// Client-side gate for the /admin/* pages. This is a UX convenience only — the
// real authorization boundary is the `is_admin()` Postgres function checked
// inside every admin_get_* RPC, so a bypassed frontend still can't read data.
export function useAdminSession(): AdminSessionState {
  const [state, setState] = useState<AdminSessionState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;

    async function evaluate(session: Session | null) {
      if (!session) {
        if (!cancelled) setState({ status: "signed-out" });
        return;
      }
      const { data, error } = await supabase.rpc("is_admin");
      if (cancelled) return;
      setState(error || data !== true ? { status: "forbidden" } : { status: "authorized", session });
    }

    supabase.auth.getSession().then(({ data }) => evaluate(data.session));

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setState({ status: "loading" });
      void evaluate(session);
    });

    return () => {
      cancelled = true;
      subscription.subscription.unsubscribe();
    };
  }, []);

  return state;
}
