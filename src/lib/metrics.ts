import { supabase } from "@/integrations/supabase/client";

// Deterministic pseudo-random per module id for engagement display (stable across renders)
function hash(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h);
}

export function seedMetrics(moduleId: string) {
  const h = hash(moduleId);
  const between = (n: number, min: number, max: number) => min + (n % (max - min + 1));
  return {
    views: between(h, 1000, 15000),
    likes: between(h >> 3, 1000, 15000),
    downloads: between(h >> 7, 1000, 15000),
  };
}

export async function incrementMetric(moduleId: string, field: "views" | "likes" | "downloads") {
  try {
    await supabase.rpc("increment_module_metric", { p_module_id: moduleId, p_field: field });
  } catch (e) {
    console.error("incrementMetric failed", e);
  }
}

export async function fetchMetric(moduleId: string) {
  const { data } = await supabase
    .from("module_metrics")
    .select("views,likes,downloads")
    .eq("module_id", moduleId)
    .maybeSingle();
  return data;
}
