import { createFileRoute, ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { BarChart3, Globe2, Eye, Heart, Download, Mail, TrendingUp } from "lucide-react";
import { fetchAllModuleMetrics, fetchModuleEventYears, fetchModuleMonthlyTotals, type ModuleMetricRow, type MonthlyModuleTotals } from "@/lib/metrics";
import { fetchVisitorCountryCounts, fetchVisitorEventYears, fetchVisitorMonthlyTotals, type CountryRow, type MonthlyVisitorTotals } from "@/lib/visitorStats";
import { MODULES } from "@/data/modules";
import { PageHero, PageShell } from "@/components/PageHero";

const ModuleBarChart = lazy(() => import("@/components/AnalyticsCharts").then((m) => ({ default: m.ModuleBarChart })));
const CountryPieChart = lazy(() => import("@/components/AnalyticsCharts").then((m) => ({ default: m.CountryPieChart })));
const ModuleMonthlyTrendChart = lazy(() => import("@/components/AnalyticsCharts").then((m) => ({ default: m.ModuleMonthlyTrendChart })));
const VisitorMonthlyTrendChart = lazy(() => import("@/components/AnalyticsCharts").then((m) => ({ default: m.VisitorMonthlyTrendChart })));

const MONTH_NAMES = Array.from({ length: 12 }, (_, i) => format(new Date(2000, i, 1), "MMMM"));
const ALL_TIME = "all";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics — phBMI" }, { name: "description", content: "Live engagement metrics: visitor countries and module views, likes, and downloads." }] }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const [years, setYears] = useState<number[]>([]);
  const [year, setYear] = useState<string>(ALL_TIME);
  const [month, setMonth] = useState<string>(ALL_TIME);

  const [countries, setCountries] = useState<CountryRow[]>([]);
  const [modules, setModules] = useState<ModuleMetricRow[]>([]);
  const [moduleTrend, setModuleTrend] = useState<MonthlyModuleTotals[]>([]);
  const [visitorTrend, setVisitorTrend] = useState<MonthlyVisitorTotals[]>([]);
  const [loading, setLoading] = useState(true);

  // Years available for the picker (union of both data sources), fetched once.
  useEffect(() => {
    (async () => {
      const [modYears, visYears] = await Promise.all([fetchModuleEventYears(), fetchVisitorEventYears()]);
      const merged = Array.from(new Set([...modYears, ...visYears])).sort((a, b) => b - a);
      setYears(merged);
    })();
  }, []);

  const period = useMemo(() => {
    if (year === ALL_TIME) return {};
    const y = Number(year);
    return month === ALL_TIME ? { year: y } : { year: y, month: Number(month) };
  }, [year, month]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    (async () => {
      const tasks: Promise<unknown>[] = [
        fetchVisitorCountryCounts(period).then((r) => !cancelled && setCountries(r)),
        fetchAllModuleMetrics(period).then((r) => !cancelled && setModules(r)),
      ];
      if (year !== ALL_TIME) {
        const y = Number(year);
        tasks.push(fetchModuleMonthlyTotals(y).then((r) => !cancelled && setModuleTrend(r)));
        tasks.push(fetchVisitorMonthlyTotals(y).then((r) => !cancelled && setVisitorTrend(r)));
      } else {
        setModuleTrend([]);
        setVisitorTrend([]);
      }
      await Promise.all(tasks);
      if (!cancelled) setLoading(false);
    })();
    return () => { cancelled = true; };
  }, [period, year]);

  const totals = modules.reduce(
    (a, r) => ({ views: a.views + r.views, likes: a.likes + r.likes, downloads: a.downloads + r.downloads }),
    { views: 0, likes: 0, downloads: 0 },
  );
  const totalVisits = countries.reduce((a, c) => a + c.visits, 0);

  const moduleChart = modules.map((r) => {
    const mod = MODULES.find((m) => m.id === r.module_id);
    return { name: mod?.grade ?? r.module_id, views: r.views, likes: r.likes, downloads: r.downloads };
  });

  const moduleTrendChart = moduleTrend.map((r) => ({ month: MONTH_NAMES[r.month - 1]?.slice(0, 3) ?? r.month, views: r.views, likes: r.likes, downloads: r.downloads }));
  const visitorTrendChart = visitorTrend.map((r) => ({ month: MONTH_NAMES[r.month - 1]?.slice(0, 3) ?? r.month, visits: r.visits }));

  const topCountries = countries.slice(0, 8);
  const periodLabel = year === ALL_TIME ? "All Time" : month === ALL_TIME ? String(year) : `${MONTH_NAMES[Number(month) - 1]} ${year}`;

  return (
    <PageShell>
      <PageHero kicker="Live Data" title="Analytics Dashboard" lead="Real-time engagement across teaching modules and a global view of where our visitors come from." />

      <section className="mt-8 flex flex-wrap items-center gap-3">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">Reporting period</span>
        <select
          value={year}
          onChange={(e) => { setYear(e.target.value); setMonth(ALL_TIME); }}
          className="rounded-md border border-border/60 bg-card/60 px-3 py-1.5 text-sm text-foreground"
        >
          <option value={ALL_TIME}>All Time</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
        {year !== ALL_TIME && (
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="rounded-md border border-border/60 bg-card/60 px-3 py-1.5 text-sm text-foreground"
          >
            <option value={ALL_TIME}>Full Year</option>
            {MONTH_NAMES.map((name, i) => <option key={name} value={i + 1}>{name}</option>)}
          </select>
        )}
        <span className="text-xs text-muted-foreground">Showing: {periodLabel}</span>
      </section>

      <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Globe2} label="Visitors Logged" value={totalVisits} />
        <StatCard icon={Eye} label="Total Module Views" value={totals.views} />
        <StatCard icon={Heart} label="Total Likes" value={totals.likes} />
        <StatCard icon={Download} label="Total Downloads" value={totals.downloads} />
      </section>

      <section className="mt-10 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
          <h2 className="font-display text-xl text-gold flex items-center gap-2"><BarChart3 size={18} /> Module Engagement</h2>
          <p className="text-xs text-muted-foreground mt-1">Views, likes, and downloads per teaching module — {periodLabel}.</p>
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
          <p className="text-xs text-muted-foreground mt-1">Top regions visiting the program — {periodLabel}.</p>
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

      {year !== ALL_TIME && (
        <section className="mt-10 grid lg:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
            <h2 className="font-display text-xl text-gold flex items-center gap-2"><TrendingUp size={18} /> Module Engagement by Month</h2>
            <p className="text-xs text-muted-foreground mt-1">Views, likes, and downloads across {year}.</p>
            <div className="h-72 mt-4">
              {loading ? <Skeleton /> : (
                <ClientOnly fallback={<Skeleton />}>
                  <Suspense fallback={<Skeleton />}>
                    <ModuleMonthlyTrendChart data={moduleTrendChart} />
                  </Suspense>
                </ClientOnly>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
            <h2 className="font-display text-xl text-gold flex items-center gap-2"><TrendingUp size={18} /> Visitors by Month</h2>
            <p className="text-xs text-muted-foreground mt-1">Logged visits across {year}.</p>
            <div className="h-72 mt-4">
              {loading ? <Skeleton /> : (
                <ClientOnly fallback={<Skeleton />}>
                  <Suspense fallback={<Skeleton />}>
                    <VisitorMonthlyTrendChart data={visitorTrendChart} />
                  </Suspense>
                </ClientOnly>
              )}
            </div>
          </div>
        </section>
      )}

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

      <section className="mt-6 flex items-start gap-2 text-xs text-muted-foreground">
        <Mail size={14} className="mt-0.5 shrink-0" />
        <p>
          Need this data offline for a report? Email{" "}
          <a href="mailto:samuelbalmedina@yahoo.com?subject=Analytics%20CSV%20export%20request" className="text-gold hover:underline">
            Samuel Balmedina (samuelbalmedina@yahoo.com)
          </a>{" "}
          to request a CSV export of the current view.
        </p>
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
