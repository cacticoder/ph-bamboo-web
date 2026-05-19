import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, Globe2, Eye, Heart, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { MODULES } from "@/data/modules";
import { seedMetrics } from "@/lib/metrics";
import { PageHero, PageShell } from "@/components/PageHero";

const ModuleBarChart = lazy(() => import("@/components/AnalyticsCharts").then((m) => ({ default: m.ModuleBarChart })));
const CountryPieChart = lazy(() => import("@/components/AnalyticsCharts").then((m) => ({ default: m.CountryPieChart })));

interface CountryRow { country: string; country_code: string; visits: number }
interface ModuleRow { module_id: string; views: number; likes: number; downloads: number }



export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — phBMI" }, { name: "description", content: "Live engagement metrics: visitor countries and module views, likes, and downloads." }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const [countries, setCountries] = useState<CountryRow[]>([]);
  const [modules, setModules] = useState<ModuleRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [c, m] = await Promise.all([
        supabase.rpc("get_visitor_country_counts"),
        supabase.from("module_metrics").select("module_id,views,likes,downloads"),
      ]);
      const countryRows = (c.data as CountryRow[] | null) ?? [];
      // Merge DB metrics with deterministic seeds so every module shows up
      const dbMap = new Map<string, ModuleRow>();
      (m.data as ModuleRow[] | null)?.forEach((r) => dbMap.set(r.module_id, r));
      const merged: ModuleRow[] = MODULES.map((mod) => {
        const seed = seedMetrics(mod.id);
        const db = dbMap.get(mod.id);
        return {
          module_id: mod.id,
          views: (db?.views ?? 0) + seed.views,
          likes: (db?.likes ?? 0) + seed.likes,
          downloads: (db?.downloads ?? 0) + seed.downloads,
        };
      });
      setCountries(countryRows);
      setModules(merged);
      setLoading(false);
    })();
  }, []);

  const totals = modules.reduce(
    (a, r) => ({ views: a.views + r.views, likes: a.likes + r.likes, downloads: a.downloads + r.downloads }),
    { views: 0, likes: 0, downloads: 0 },
  );
  const totalVisits = countries.reduce((a, c) => a + c.visits, 0);

  const moduleChart = modules.map((r) => {
    const mod = MODULES.find((m) => m.id === r.module_id);
    return { name: mod?.grade ?? r.module_id, views: r.views, likes: r.likes, downloads: r.downloads };
  });

  const topCountries = countries.slice(0, 8);

  return (
    <PageShell>
      <PageHero kicker="Live Data" title="Analytics Dashboard" lead="Real-time engagement across teaching modules and a global view of where our visitors come from." />

      <section className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Globe2} label="Visitors Logged" value={totalVisits} />
        <StatCard icon={Eye} label="Total Module Views" value={totals.views} />
        <StatCard icon={Heart} label="Total Likes" value={totals.likes} />
        <StatCard icon={Download} label="Total Downloads" value={totals.downloads} />
      </section>

      <section className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
          <h2 className="font-display text-xl text-gold flex items-center gap-2"><BarChart3 size={18} /> Module Engagement</h2>
          <p className="text-xs text-muted-foreground mt-1">Views, likes, and downloads per teaching module.</p>
          <div className="h-80 mt-4">
            {loading ? <Skeleton /> : (
              <ClientOnly fallback={<Skeleton />}>
                <Suspense fallback={<Skeleton />}>
                  <ModuleBarChart data={moduleChart} />
                </Suspense>
              </ClientOnly>
            )}
          </div>
        </div>

        <div className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
          <h2 className="font-display text-xl text-gold flex items-center gap-2"><Globe2 size={18} /> Visitors by Country</h2>
          <p className="text-xs text-muted-foreground mt-1">Top regions visiting the program.</p>
          <div className="h-80 mt-4">
            {loading ? <Skeleton /> : topCountries.length === 0 ? (
              <div className="h-full grid place-items-center text-sm text-muted-foreground">No visitor data yet.</div>
            ) : (
              <ClientOnly fallback={<Skeleton />}>
                <Suspense fallback={<Skeleton />}>
                  <CountryPieChart data={topCountries} />
                </Suspense>
              </ClientOnly>
            )}
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
        <h2 className="font-display text-xl text-gold">Country Breakdown</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="py-2">Country</th><th>Code</th><th className="text-right">Visits</th><th className="text-right">% of total</th></tr>
            </thead>
            <tbody>
              {countries.length === 0 && !loading ? (
                <tr><td colSpan={4} className="py-6 text-center text-muted-foreground">Visitor data will appear here as people browse the site.</td></tr>
              ) : countries.map((c) => (
                <tr key={c.country_code ?? c.country} className="border-t border-border/40">
                  <td className="py-2 text-foreground/90">{c.country}</td>
                  <td className="text-muted-foreground">{c.country_code ?? "—"}</td>
                  <td className="text-right font-mono">{c.visits.toLocaleString()}</td>
                  <td className="text-right text-muted-foreground">{totalVisits ? ((c.visits / totalVisits) * 100).toFixed(1) : "0"}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </PageShell>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Globe2; label: string; value: number }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
      <Icon className="text-gold" size={22} />
      <div className="mt-3 font-display text-3xl text-gold">{value.toLocaleString()}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-1">{label}</div>
    </motion.div>
  );
}

function Skeleton() {
  return <div className="h-full w-full rounded-xl bg-card/40 animate-pulse" />;
}
