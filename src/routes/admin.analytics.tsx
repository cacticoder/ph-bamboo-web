import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAdminSession } from "@/hooks/use-admin-session";
import { AnalyticsDashboard } from "@/components/admin/AnalyticsDashboard";
import { PageShell } from "@/components/PageHero";

export const Route = createFileRoute("/admin/analytics")({
  head: () => ({ meta: [{ title: "Admin Analytics — phBMI" }] }),
  component: AdminAnalyticsRoute,
});

function AdminAnalyticsRoute() {
  const state = useAdminSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (state.status === "signed-out") {
      void navigate({ to: "/admin/login" });
    }
  }, [state.status, navigate]);

  if (state.status === "loading" || state.status === "signed-out") {
    return (
      <PageShell>
        <div className="py-24 text-center text-muted-foreground text-sm">Checking authorization…</div>
      </PageShell>
    );
  }

  if (state.status === "forbidden") {
    return (
      <PageShell>
        <div className="max-w-md mx-auto py-24 text-center">
          <ShieldAlert className="mx-auto text-gold" size={40} />
          <h1 className="mt-4 font-display text-2xl text-gold">Access denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Your account is signed in but is not authorized to view analytics.
          </p>
          <button
            onClick={() => void supabase.auth.signOut().then(() => navigate({ to: "/admin/login" }))}
            className="mt-6 rounded-md bg-gold text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90"
          >
            Sign out
          </button>
          <div className="mt-4">
            <Link to="/" className="text-xs text-muted-foreground hover:text-gold">Return to the website</Link>
          </div>
        </div>
      </PageShell>
    );
  }

  return (
    <AnalyticsDashboard
      onSignOut={() => void supabase.auth.signOut().then(() => navigate({ to: "/admin/login" }))}
    />
  );
}
