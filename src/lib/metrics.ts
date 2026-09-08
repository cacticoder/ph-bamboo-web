import { supabase } from "@/integrations/supabase/client";

export type MetricField = "views" | "likes" | "downloads";

export interface ModuleMetricRow {
  module_id: string;
  views: number;
  likes: number;
  downloads: number;
}

export interface MonthlyModuleTotals {
  month: number;
  views: number;
  likes: number;
  downloads: number;
}

export interface Period {
  year?: number;
  month?: number;
}

export async function incrementMetric(moduleId: string, field: MetricField) {
  try {
    await supabase.rpc("log_module_event", { p_module_id: moduleId, p_event_type: field });
  } catch (e) {
    console.error("incrementMetric failed", e);
  }
}

export async function fetchAllModuleMetrics(period: Period = {}): Promise<ModuleMetricRow[]> {
  const { data, error } = await supabase.rpc("get_module_metrics", {
    p_year: period.year ?? undefined,
    p_month: period.month ?? undefined,
  });
  if (error) {
    console.error("fetchAllModuleMetrics failed", error);
    return [];
  }
  return (data as ModuleMetricRow[] | null) ?? [];
}

export async function fetchModuleMonthlyTotals(year: number): Promise<MonthlyModuleTotals[]> {
  const { data, error } = await supabase.rpc("get_module_monthly_totals", { p_year: year });
  if (error) {
    console.error("fetchModuleMonthlyTotals failed", error);
    return [];
  }
  return (data as MonthlyModuleTotals[] | null) ?? [];
}

export async function fetchModuleEventYears(): Promise<number[]> {
  const { data, error } = await supabase.rpc("get_module_event_years");
  if (error) {
    console.error("fetchModuleEventYears failed", error);
    return [];
  }
  return ((data as { year: number }[] | null) ?? []).map((r) => r.year);
}
