import { supabase } from "@/integrations/supabase/client";
import type { Period } from "@/lib/metrics";

export interface CountryRow {
  country: string;
  country_code: string;
  visits: number;
}

export interface MonthlyVisitorTotals {
  month: number;
  visits: number;
}

export async function fetchVisitorCountryCounts(period: Period = {}): Promise<CountryRow[]> {
  const { data, error } = await supabase.rpc("get_visitor_country_counts", {
    p_year: period.year ?? undefined,
    p_month: period.month ?? undefined,
  });
  if (error) {
    console.error("fetchVisitorCountryCounts failed", error);
    return [];
  }
  return (data as CountryRow[] | null) ?? [];
}

export async function fetchVisitorMonthlyTotals(year: number): Promise<MonthlyVisitorTotals[]> {
  const { data, error } = await supabase.rpc("get_visitor_monthly_totals", { p_year: year });
  if (error) {
    console.error("fetchVisitorMonthlyTotals failed", error);
    return [];
  }
  return (data as MonthlyVisitorTotals[] | null) ?? [];
}

export async function fetchVisitorEventYears(): Promise<number[]> {
  const { data, error } = await supabase.rpc("get_visitor_event_years");
  if (error) {
    console.error("fetchVisitorEventYears failed", error);
    return [];
  }
  return ((data as { year: number }[] | null) ?? []).map((r) => r.year);
}
