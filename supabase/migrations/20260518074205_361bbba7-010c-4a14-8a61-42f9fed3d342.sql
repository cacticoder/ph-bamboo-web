
-- Module engagement metrics (public, ad-supported tracking)
CREATE TABLE public.module_metrics (
  module_id TEXT PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0,
  likes INTEGER NOT NULL DEFAULT 0,
  downloads INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.module_metrics ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read module metrics" ON public.module_metrics FOR SELECT USING (true);

-- Visitor logs for analytics (country-level only, no PII)
CREATE TABLE public.visitor_logs (
  id BIGSERIAL PRIMARY KEY,
  country TEXT,
  country_code TEXT,
  city TEXT,
  region TEXT,
  path TEXT,
  referrer TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.visitor_logs ENABLE ROW LEVEL SECURITY;
-- Aggregated country counts (public read)
CREATE OR REPLACE VIEW public.visitor_country_counts AS
  SELECT country, country_code, COUNT(*)::INTEGER as visits
  FROM public.visitor_logs
  WHERE country IS NOT NULL
  GROUP BY country, country_code
  ORDER BY visits DESC;

-- Function: increment module metric atomically
CREATE OR REPLACE FUNCTION public.increment_module_metric(p_module_id TEXT, p_field TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_field NOT IN ('views', 'likes', 'downloads') THEN
    RAISE EXCEPTION 'Invalid field';
  END IF;
  INSERT INTO public.module_metrics(module_id, views, likes, downloads)
  VALUES (p_module_id, 0, 0, 0)
  ON CONFLICT (module_id) DO NOTHING;
  EXECUTE format('UPDATE public.module_metrics SET %I = %I + 1, updated_at = now() WHERE module_id = $1', p_field, p_field)
  USING p_module_id;
END;
$$;

GRANT EXECUTE ON FUNCTION public.increment_module_metric(TEXT, TEXT) TO anon, authenticated;
GRANT SELECT ON public.visitor_country_counts TO anon, authenticated;
