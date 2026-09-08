-- get_visitor_country_counts() only counts rows with a resolved country
-- (WHERE country IS NOT NULL), so it undercounts total visits whenever the
-- geo lookup fails (local/dev traffic, non-Cloudflare hosts, bots). The
-- site-wide "Total Website Visits" metric must count every recorded visit
-- regardless of whether a country could be resolved.
CREATE OR REPLACE FUNCTION public.get_visitor_total_count(p_year INT DEFAULT NULL, p_month INT DEFAULT NULL)
RETURNS INT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COUNT(*)::INT
  FROM public.visitor_logs
  WHERE (p_year IS NULL OR EXTRACT(YEAR FROM created_at) = p_year)
    AND (p_month IS NULL OR EXTRACT(MONTH FROM created_at) = p_month);
$$;
GRANT EXECUTE ON FUNCTION public.get_visitor_total_count(INT, INT) TO anon, authenticated;
