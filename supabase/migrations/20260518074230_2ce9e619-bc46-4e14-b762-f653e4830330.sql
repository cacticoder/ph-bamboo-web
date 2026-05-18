
-- visitor_logs: only server (service role) writes; nobody else reads raw rows.
CREATE POLICY "No public read visitor_logs" ON public.visitor_logs FOR SELECT USING (false);

-- Recreate view with security_invoker so it respects caller's RLS via the underlying grants
DROP VIEW IF EXISTS public.visitor_country_counts;
CREATE VIEW public.visitor_country_counts
WITH (security_invoker = true) AS
  SELECT country, country_code, COUNT(*)::INTEGER as visits
  FROM public.visitor_logs
  WHERE country IS NOT NULL
  GROUP BY country, country_code
  ORDER BY visits DESC;
GRANT SELECT ON public.visitor_country_counts TO anon, authenticated;

-- Allow anon/auth to read counts via the view even though base table is locked:
CREATE POLICY "Aggregated read via view" ON public.visitor_logs FOR SELECT
  USING (false); -- still no direct row reads
-- Note: view with security_invoker still blocks. Use a SECURITY DEFINER function for aggregated reads:
CREATE OR REPLACE FUNCTION public.get_visitor_country_counts()
RETURNS TABLE(country TEXT, country_code TEXT, visits INTEGER)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT country, country_code, COUNT(*)::INTEGER as visits
  FROM public.visitor_logs
  WHERE country IS NOT NULL
  GROUP BY country, country_code
  ORDER BY visits DESC;
$$;
REVOKE EXECUTE ON FUNCTION public.get_visitor_country_counts() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_visitor_country_counts() TO anon, authenticated;
