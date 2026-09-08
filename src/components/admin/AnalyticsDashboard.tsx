import { ClientOnly } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Users, Layers, Eye, Activity, BarChart3, Globe2, Smartphone,
  Music2, FileText, Play, ArrowUpDown, LogOut,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { DATE_PRESETS, getDateRange, getLocalTimeZone, type DatePreset } from "@/lib/date-range";

const VisitorTrendChart = lazy(() => import("@/components/AnalyticsCharts").then((m) => ({ default: m.VisitorTrendChart })));
const DonutChart = lazy(() => import("@/components/AnalyticsCharts").then((m) => ({ default: m.DonutChart })));

interface Summary { visitors: number; sessions: number; page_views: number; events: number }
interface TrendRow { day: string; visitors: number; page_views: number }
interface PageRow { page_path: string; views: number }
interface DimensionRow { value: string; count: number }
interface SourceRow { source: string; visits: number }
interface InstrumentRow { instrument: string; plays: number }
interface DocumentRow { document: string; views: number; downloads: number }
interface VideoRow { video: string; clicks: number }

const EMPTY_SUMMARY: Summary = { visitors: 0, sessions: 0, page_views: 0, events: 0 };

async function fetchSummary(start: Date, end: Date): Promise<Summary> {
  const { data } = await supabase.rpc("admin_get_summary", { p_start: start.toISOString(), p_end: end.toISOString() });
  return (data?.[0] as Summary | undefined) ?? EMPTY_SUMMARY;
}

export function AnalyticsDashboard({ onSignOut }: { onSignOut: () => void }) {
  const [preset, setPreset] = useState<DatePreset>("30d");
  const [customStart, setCustomStart] = useState("");
  const [customEnd, setCustomEnd] = useState("");
  const [loading, setLoading] = useState(true);

  const [snapshot, setSnapshot] = useState<Record<"today" | "7d" | "30d" | "all", Summary>>({
    today: EMPTY_SUMMARY, "7d": EMPTY_SUMMARY, "30d": EMPTY_SUMMARY, all: EMPTY_SUMMARY,
  });
  const [summary, setSummary] = useState<Summary>(EMPTY_SUMMARY);
  const [trend, setTrend] = useState<TrendRow[]>([]);
  const [topPages, setTopPages] = useState<PageRow[]>([]);
  const [pageSortAsc, setPageSortAsc] = useState(false);
  const [devices, setDevices] = useState<DimensionRow[]>([]);
  const [sources, setSources] = useState<SourceRow[]>([]);
  const [instruments, setInstruments] = useState<InstrumentRow[]>([]);
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [videos, setVideos] = useState<VideoRow[]>([]);

  const range = useMemo(
    () => getDateRange(preset, preset === "custom" ? { start: customStart, end: customEnd } : undefined),
    [preset, customStart, customEnd],
  );
  const tz = useMemo(() => getLocalTimeZone(), []);

  // Fixed "at a glance" snapshot — independent of the selected filter, fetched once.
  useEffect(() => {
    (async () => {
      const [today, sevenDay, thirtyDay, allTime] = await Promise.all([
        fetchSummary(getDateRange("today").start, getDateRange("today").end),
        fetchSummary(getDateRange("7d").start, getDateRange("7d").end),
        fetchSummary(getDateRange("30d").start, getDateRange("30d").end),
        fetchSummary(getDateRange("all").start, getDateRange("all").end),
      ]);
      setSnapshot({ today, "7d": sevenDay, "30d": thirtyDay, all: allTime });
    })();
  }, []);

  // Everything below responds to the selected date filter.
  useEffect(() => {
    if (preset === "custom" && (!customStart || !customEnd)) return;
    let cancelled = false;
    setLoading(true);
    const { start, end } = range;
    const startIso = start.toISOString();
    const endIso = end.toISOString();

    (async () => {
      const [s, t, pages, deviceRows, src, inst, docs, yt] = await Promise.all([
        fetchSummary(start, end),
        supabase.rpc("admin_get_visitor_trend", { p_start: startIso, p_end: endIso, p_tz: tz }),
        supabase.rpc("admin_get_top_pages", { p_start: startIso, p_end: endIso, p_limit: 15 }),
        supabase.rpc("admin_get_dimension_breakdown", { p_start: startIso, p_end: endIso, p_dimension: "device_type" }),
        supabase.rpc("admin_get_traffic_sources", { p_start: startIso, p_end: endIso }),
        supabase.rpc("admin_get_top_instruments", { p_start: startIso, p_end: endIso, p_limit: 10 }),
        supabase.rpc("admin_get_document_stats", { p_start: startIso, p_end: endIso, p_limit: 10 }),
        supabase.rpc("admin_get_youtube_clicks", { p_start: startIso, p_end: endIso, p_limit: 10 }),
      ]);
      if (cancelled) return;
      setSummary(s);
      setTrend((t.data as TrendRow[] | null) ?? []);
      setTopPages((pages.data as PageRow[] | null) ?? []);
      setDevices((deviceRows.data as DimensionRow[] | null) ?? []);
      setSources((src.data as SourceRow[] | null) ?? []);
      setInstruments((inst.data as InstrumentRow[] | null) ?? []);
      setDocuments((docs.data as DocumentRow[] | null) ?? []);
      setVideos((yt.data as VideoRow[] | null) ?? []);
      setLoading(false);
    })();

    return () => { cancelled = true; };
  }, [range, tz, preset, customStart, customEnd]);

  const sortedPages = useMemo(
    () => [...topPages].sort((a, b) => (pageSortAsc ? a.views - b.views : b.views - a.views)),
    [topPages, pageSortAsc],
  );
  const deviceTotal = devices.reduce((a, d) => a + d.count, 0);
  const sourceTotal = sources.reduce((a, s) => a + s.visits, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-8 py-12">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.25em] text-gold/80">Admin Only</div>
          <h1 className="mt-3 font-display text-4xl md:text-5xl text-gold">Analytics Dashboard</h1>
          <p className="mt-4 text-foreground/80">Visitor activity, engagement, and content performance across the phBMI website.</p>
        </div>
        <button
          onClick={onSignOut}
          className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-xs font-semibold text-foreground/80 hover:border-gold/60 hover:text-gold"
        >
          <LogOut size={13} /> Sign out
        </button>
      </div>

      {/* At-a-glance snapshot */}
      <section className="mt-10 rounded-2xl border border-border/50 gradient-card p-5 shadow-card overflow-x-auto">
        <h2 className="font-display text-lg text-gold">At a Glance</h2>
        <table className="mt-3 w-full text-sm min-w-[480px]">
          <thead className="text-left text-xs uppercase tracking-widest text-muted-foreground">
            <tr><th className="py-1.5"></th><th className="text-right">Today</th><th className="text-right">7 Days</th><th className="text-right">30 Days</th><th className="text-right">All Time</th></tr>
          </thead>
          <tbody>
            {([
              ["Visitors", "visitors"], ["Sessions", "sessions"], ["Page Views", "page_views"], ["Events", "events"],
            ] as const).map(([label, key]) => (
              <tr key={key} className="border-t border-border/40">
                <td className="py-1.5 text-foreground/80">{label}</td>
                <td className="text-right font-mono">{snapshot.today[key].toLocaleString()}</td>
                <td className="text-right font-mono">{snapshot["7d"][key].toLocaleString()}</td>
                <td className="text-right font-mono">{snapshot["30d"][key].toLocaleString()}</td>
                <td className="text-right font-mono">{snapshot.all[key].toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Date filter */}
      <section className="mt-8 flex flex-wrap items-center gap-2">
        {DATE_PRESETS.map((p) => (
          <button
            key={p.value}
            onClick={() => setPreset(p.value)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition border ${
              preset === p.value ? "bg-gold text-primary-foreground border-gold" : "border-border/60 text-foreground/80 hover:border-gold/60"
            }`}
          >
            {p.label}
          </button>
        ))}
        {preset === "custom" && (
          <div className="flex items-center gap-2 ml-2">
            <input type="date" value={customStart} onChange={(e) => setCustomStart(e.target.value)} className="rounded-md bg-card border border-border/60 px-2 py-1.5 text-xs" />
            <span className="text-xs text-muted-foreground">to</span>
            <input type="date" value={customEnd} onChange={(e) => setCustomEnd(e.target.value)} className="rounded-md bg-card border border-border/60 px-2 py-1.5 text-xs" />
          </div>
        )}
      </section>

      {/* Main stat cards (respond to filter) */}
      <section className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Visitors" value={summary.visitors} />
        <StatCard icon={Layers} label="Sessions" value={summary.sessions} />
        <StatCard icon={Eye} label="Page Views" value={summary.page_views} />
        <StatCard icon={Activity} label="Events" value={summary.events} />
      </section>

      {/* Trend chart */}
      <section className="mt-8 rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
        <h2 className="font-display text-xl text-gold flex items-center gap-2"><BarChart3 size={18} /> Visitor Trend</h2>
        <p className="text-xs text-muted-foreground mt-1">Daily visitors and page views for the selected range.</p>
        <div className="h-72 mt-4">
          {loading ? <Skeleton /> : trend.length === 0 ? <EmptyState label="No visitor data in this range yet." /> : (
            <ClientOnly fallback={<Skeleton />}>
              <Suspense fallback={<Skeleton />}>
                <VisitorTrendChart data={trend} />
              </Suspense>
            </ClientOnly>
          )}
        </div>
      </section>

      <section className="mt-8 grid lg:grid-cols-2 gap-6">
        {/* Most visited pages */}
        <div className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
          <h2 className="font-display text-xl text-gold flex items-center gap-2"><Eye size={18} /> Most Visited Pages</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase tracking-widest text-muted-foreground">
                <tr>
                  <th className="py-2">Page</th>
                  <th className="text-right">
                    <button onClick={() => setPageSortAsc((v) => !v)} className="inline-flex items-center gap-1 hover:text-gold">
                      Views <ArrowUpDown size={11} />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!loading && sortedPages.length === 0 ? (
                  <tr><td colSpan={2} className="py-6 text-center text-muted-foreground">No page views in this range yet.</td></tr>
                ) : sortedPages.map((p) => (
                  <tr key={p.page_path} className="border-t border-border/40">
                    <td className="py-2 text-foreground/90 font-mono text-xs">{p.page_path}</td>
                    <td className="text-right font-mono">{p.views.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Device breakdown */}
        <div className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
          <h2 className="font-display text-xl text-gold flex items-center gap-2"><Smartphone size={18} /> Device Breakdown</h2>
          <div className="mt-4 grid grid-cols-2 gap-4 items-center">
            <div className="h-56">
              {loading ? <Skeleton /> : devices.length === 0 ? <EmptyState label="No data yet." /> : (
                <ClientOnly fallback={<Skeleton />}>
                  <Suspense fallback={<Skeleton />}>
                    <DonutChart data={devices.map((d) => ({ name: d.value, value: d.count }))} />
                  </Suspense>
                </ClientOnly>
              )}
            </div>
            <ul className="space-y-2 text-sm">
              {devices.map((d) => (
                <li key={d.value} className="flex items-center justify-between">
                  <span className="capitalize text-foreground/80">{d.value}</span>
                  <span className="font-mono text-gold">{deviceTotal ? Math.round((d.count / deviceTotal) * 100) : 0}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mt-8 grid lg:grid-cols-3 gap-6">
        {/* Traffic sources */}
        <div className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
          <h2 className="font-display text-lg text-gold flex items-center gap-2"><Globe2 size={16} /> Traffic Sources</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {!loading && sources.length === 0 ? (
              <li className="text-muted-foreground text-center py-4">No data yet.</li>
            ) : sources.map((s) => (
              <li key={s.source} className="flex items-center justify-between border-t border-border/40 pt-2 first:border-t-0 first:pt-0">
                <span className="text-foreground/85">{s.source}</span>
                <span className="font-mono text-muted-foreground">{s.visits.toLocaleString()} {sourceTotal ? `(${Math.round((s.visits / sourceTotal) * 100)}%)` : ""}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Most played instruments */}
        <div className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
          <h2 className="font-display text-lg text-gold flex items-center gap-2"><Music2 size={16} /> Most Played Instruments</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {!loading && instruments.length === 0 ? (
              <li className="text-muted-foreground text-center py-4">No audio plays in this range yet.</li>
            ) : instruments.map((i) => (
              <li key={i.instrument} className="flex items-center justify-between border-t border-border/40 pt-2 first:border-t-0 first:pt-0">
                <span className="text-foreground/85">{i.instrument}</span>
                <span className="font-mono text-muted-foreground">{i.plays.toLocaleString()} plays</span>
              </li>
            ))}
          </ul>
        </div>

        {/* YouTube / video engagement */}
        <div className="rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
          <h2 className="font-display text-lg text-gold flex items-center gap-2"><Play size={16} /> Video Engagement</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {!loading && videos.length === 0 ? (
              <li className="text-muted-foreground text-center py-4">No video clicks in this range yet.</li>
            ) : videos.map((v) => (
              <li key={v.video} className="flex items-center justify-between border-t border-border/40 pt-2 first:border-t-0 first:pt-0">
                <span className="text-foreground/85 line-clamp-1">{v.video}</span>
                <span className="font-mono text-muted-foreground">{v.clicks.toLocaleString()} clicks</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Document analytics */}
      <section className="mt-8 rounded-2xl border border-border/50 gradient-card p-5 shadow-card">
        <h2 className="font-display text-xl text-gold flex items-center gap-2"><FileText size={18} /> Most Viewed Documents</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs uppercase tracking-widest text-muted-foreground">
              <tr><th className="py-2">Document</th><th className="text-right">Views</th><th className="text-right">Downloads</th></tr>
            </thead>
            <tbody>
              {!loading && documents.length === 0 ? (
                <tr><td colSpan={3} className="py-6 text-center text-muted-foreground">No document activity in this range yet.</td></tr>
              ) : documents.map((d) => (
                <tr key={d.document} className="border-t border-border/40">
                  <td className="py-2 text-foreground/90">{d.document}</td>
                  <td className="text-right font-mono">{d.views.toLocaleString()}</td>
                  <td className="text-right font-mono">{d.downloads.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: number }) {
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

function EmptyState({ label }: { label: string }) {
  return <div className="h-full grid place-items-center text-sm text-muted-foreground">{label}</div>;
}
