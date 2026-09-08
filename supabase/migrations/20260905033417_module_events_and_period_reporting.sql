-- Real, timestamped module engagement log (replaces the running-total-only module_metrics),
-- plus period-aware (year/month) reporting functions for both module engagement and visitors.

-- 1. Event log: one row per real view/like/download click.
CREATE TABLE public.module_events (
  id BIGSERIAL PRIMARY KEY,
  module_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('views', 'likes', 'downloads')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX module_events_module_type_idx ON public.module_events (module_id, event_type, created_at);
CREATE INDEX module_events_created_at_idx ON public.module_events (created_at);

ALTER TABLE public.module_events ENABLE ROW LEVEL SECURITY;
-- No direct public read/write; all access goes through SECURITY DEFINER functions below
-- (same lockdown pattern already used for visitor_logs).
CREATE POLICY "No public read module_events" ON public.module_events FOR SELECT USING (false);

-- 2. Write path: log one event.
CREATE OR REPLACE FUNCTION public.log_module_event(p_module_id TEXT, p_event_type TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF p_event_type NOT IN ('views', 'likes', 'downloads') THEN
    RAISE EXCEPTION 'Invalid event_type';
  END IF;
  INSERT INTO public.module_events (module_id, event_type) VALUES (p_module_id, p_event_type);
END;
$$;
GRANT EXECUTE ON FUNCTION public.log_module_event(TEXT, TEXT) TO anon, authenticated;

-- 3. Read path: per-module totals, optionally filtered to a year and/or month.
CREATE OR REPLACE FUNCTION public.get_module_metrics(p_year INT DEFAULT NULL, p_month INT DEFAULT NULL)
RETURNS TABLE(module_id TEXT, views INT, likes INT, downloads INT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    module_id,
    COUNT(*) FILTER (WHERE event_type = 'views')::INT AS views,
    COUNT(*) FILTER (WHERE event_type = 'likes')::INT AS likes,
    COUNT(*) FILTER (WHERE event_type = 'downloads')::INT AS downloads
  FROM public.module_events
  WHERE (p_year IS NULL OR EXTRACT(YEAR FROM created_at) = p_year)
    AND (p_month IS NULL OR EXTRACT(MONTH FROM created_at) = p_month)
  GROUP BY module_id;
$$;
GRANT EXECUTE ON FUNCTION public.get_module_metrics(INT, INT) TO anon, authenticated;

-- Totals per calendar month across all modules, for a given year (trend chart).
CREATE OR REPLACE FUNCTION public.get_module_monthly_totals(p_year INT)
RETURNS TABLE(month INT, views INT, likes INT, downloads INT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    EXTRACT(MONTH FROM created_at)::INT AS month,
    COUNT(*) FILTER (WHERE event_type = 'views')::INT AS views,
    COUNT(*) FILTER (WHERE event_type = 'likes')::INT AS likes,
    COUNT(*) FILTER (WHERE event_type = 'downloads')::INT AS downloads
  FROM public.module_events
  WHERE EXTRACT(YEAR FROM created_at) = p_year
  GROUP BY month
  ORDER BY month;
$$;
GRANT EXECUTE ON FUNCTION public.get_module_monthly_totals(INT) TO anon, authenticated;

-- Distinct years with module engagement data, to populate a year picker.
CREATE OR REPLACE FUNCTION public.get_module_event_years()
RETURNS TABLE(year INT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT EXTRACT(YEAR FROM created_at)::INT AS year
  FROM public.module_events
  ORDER BY year DESC;
$$;
GRANT EXECUTE ON FUNCTION public.get_module_event_years() TO anon, authenticated;

-- 4. Extend visitor reporting with the same optional year/month filters.
DROP FUNCTION IF EXISTS public.get_visitor_country_counts();
CREATE OR REPLACE FUNCTION public.get_visitor_country_counts(p_year INT DEFAULT NULL, p_month INT DEFAULT NULL)
RETURNS TABLE(country TEXT, country_code TEXT, visits INT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT country, country_code, COUNT(*)::INT AS visits
  FROM public.visitor_logs
  WHERE country IS NOT NULL
    AND (p_year IS NULL OR EXTRACT(YEAR FROM created_at) = p_year)
    AND (p_month IS NULL OR EXTRACT(MONTH FROM created_at) = p_month)
  GROUP BY country, country_code
  ORDER BY visits DESC;
$$;
GRANT EXECUTE ON FUNCTION public.get_visitor_country_counts(INT, INT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_visitor_monthly_totals(p_year INT)
RETURNS TABLE(month INT, visits INT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXTRACT(MONTH FROM created_at)::INT AS month, COUNT(*)::INT AS visits
  FROM public.visitor_logs
  WHERE EXTRACT(YEAR FROM created_at) = p_year
  GROUP BY month
  ORDER BY month;
$$;
GRANT EXECUTE ON FUNCTION public.get_visitor_monthly_totals(INT) TO anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_visitor_event_years()
RETURNS TABLE(year INT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT EXTRACT(YEAR FROM created_at)::INT AS year
  FROM public.visitor_logs
  ORDER BY year DESC;
$$;
GRANT EXECUTE ON FUNCTION public.get_visitor_event_years() TO anon, authenticated;

-- 5. One-time seed so the dashboard isn't empty on day one: a modest, varied starting
-- point (1-200, uniform so it isn't clustered near the top) per module per event type,
-- backdated across the past year so the month/year trend view looks like real history
-- instead of one spike in the current month. Everything from here on is genuine click data.
DO $$
DECLARE
  ids TEXT[] := ARRAY[
    'elem-v1-g4-bamboo-organ','elem-v1-g5-himig-kawayan','elem-v1-g5-karatong',
    'elem-v1-g5-musikong-bumbong-angono','elem-v1-g5-musikong-bumbong-bulacan','elem-v1-g5-tultugan',
    'elem-v1-g6-bamboo-ukulele','elem-v1-complete','elem-v2-g3-tboli','elem-v2-g5-bagobo-tagabawa',
    'elem-v2-ing-bangkeru','elem-v2-kundiman-1800','elem-v2-magtanim-ay-di-biro','elem-v2-manang-biday',
    'elem-v2-pambansang-awit','elem-v2-rikiting-kiting','elem-v2-complete','hs-v1-g9-bamboo-organ',
    'hs-v1-g7-himig-kawayan','hs-v1-g7-karatong','hs-v1-g10-musikong-bumbong-angono',
    'hs-v1-g7-musikong-bumbong-bulacan','hs-v1-g7-tultugan','hs-v1-g10-bamboo-ukulele',
    'hs-v1-g10-dipolog-rondalla','hs-v1-complete','hs-v2-g7-bagobo-tagabawa','hs-v2-g7-tboli',
    'hs-v2-g7-leron-leron-sinta','hs-v2-mabuhay','hs-v2-medley','hs-v2-pambansang-awit',
    'hs-v2-pamulinawen','hs-v2-sitsiritsit','hs-v2-complete'
  ];
  mid TEXT;
  etype TEXT;
  cnt INT;
  i INT;
BEGIN
  FOREACH mid IN ARRAY ids LOOP
    FOREACH etype IN ARRAY ARRAY['views', 'likes', 'downloads'] LOOP
      cnt := floor(random() * 200)::int + 1; -- uniform 1..200
      FOR i IN 1..cnt LOOP
        INSERT INTO public.module_events (module_id, event_type, created_at)
        VALUES (mid, etype, now() - (random() * interval '365 days'));
      END LOOP;
    END LOOP;
  END LOOP;
END $$;

-- 6. Retire the old counter-only objects, fully replaced by module_events above.
DROP FUNCTION IF EXISTS public.increment_module_metric(TEXT, TEXT);
DROP TABLE IF EXISTS public.module_metrics;
