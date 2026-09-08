import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { supabase } from "@/integrations/supabase/client";
import { PageShell } from "@/components/PageHero";

export const Route = createFileRoute("/admin/login")({
  head: () => ({ meta: [{ title: "Admin Sign In — phBMI" }] }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (signInError) {
      setError("Invalid email or password.");
      return;
    }
    void navigate({ to: "/admin/analytics" });
  }

  return (
    <PageShell>
      <div className="max-w-sm mx-auto py-12">
        <div className="text-xs uppercase tracking-[0.25em] text-gold/80">Admin</div>
        <h1 className="mt-3 font-display text-3xl text-gold">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">Restricted to authorized phBMI administrators.</p>

        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="admin-email" className="text-xs uppercase tracking-wider text-muted-foreground">Email</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md bg-card border border-border/60 px-3 py-2 text-sm focus:outline-none focus:border-gold"
            />
          </div>
          <div>
            <label htmlFor="admin-password" className="text-xs uppercase tracking-wider text-muted-foreground">Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md bg-card border border-border/60 px-3 py-2 text-sm focus:outline-none focus:border-gold"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gold text-primary-foreground px-4 py-2.5 text-sm font-semibold hover:opacity-90 disabled:opacity-60"
          >
            {loading ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </PageShell>
  );
}
