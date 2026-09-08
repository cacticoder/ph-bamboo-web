-- First-party website analytics: event table, admin gate, and aggregation RPCs.
-- Mirrors the existing visitor_logs / get_visitor_country_counts pattern in this project:
-- raw rows are never readable by anon/authenticated; all reads go through SECURITY DEFINER
-- functions that check is_admin() first.

create extension if not exists pgcrypto;

-- ─────────────────────────────────────────────────────────────────────────
-- Table: analytics_events
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.analytics_events (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null,
  event_type text not null,
  page_path text,
  page_title text,
  referrer text,
  device_type text,
  browser text,
  operating_system text,
  country text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists analytics_events_created_at_idx on public.analytics_events (created_at desc);
create index if not exists analytics_events_event_type_idx on public.analytics_events (event_type);
create index if not exists analytics_events_session_id_idx on public.analytics_events (session_id);
create index if not exists analytics_events_page_path_idx on public.analytics_events (page_path);

alter table public.analytics_events enable row level security;
-- Intentionally NO policies here: anon and authenticated get zero direct access
-- (no SELECT/INSERT/UPDATE/DELETE). Writes happen only from the trusted server
-- function `recordAnalyticsEvent`, which uses the service-role client and bypasses
-- RLS entirely. Reads happen only via the admin_get_* functions below.

-- ─────────────────────────────────────────────────────────────────────────
-- Admin allowlist + gate function
-- ─────────────────────────────────────────────────────────────────────────
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
-- No public policies. Manage membership via the Supabase SQL editor / service role only.

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users where user_id = auth.uid()
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

-- ─────────────────────────────────────────────────────────────────────────
-- Aggregation RPCs (admin-only; each raises if the caller isn't an admin)
-- ─────────────────────────────────────────────────────────────────────────

-- Overview counters for a date range.
create or replace function public.admin_get_summary(p_start timestamptz, p_end timestamptz)
returns table(visitors bigint, sessions bigint, page_views bigint, events bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  return query
  select
    count(distinct session_id) filter (where event_type = 'page_view')::bigint as visitors,
    count(distinct session_id)::bigint as sessions,
    count(*) filter (where event_type = 'page_view')::bigint as page_views,
    count(*)::bigint as events
  from public.analytics_events
  where created_at >= p_start and created_at < p_end;
end;
$$;
revoke all on function public.admin_get_summary(timestamptz, timestamptz) from public;
grant execute on function public.admin_get_summary(timestamptz, timestamptz) to authenticated;

-- Daily visitor / page-view trend, bucketed in the caller's local timezone.
create or replace function public.admin_get_visitor_trend(p_start timestamptz, p_end timestamptz, p_tz text default 'UTC')
returns table(day date, visitors bigint, page_views bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  return query
  select
    (created_at at time zone p_tz)::date as day,
    count(distinct session_id)::bigint as visitors,
    count(*) filter (where event_type = 'page_view')::bigint as page_views
  from public.analytics_events
  where created_at >= p_start and created_at < p_end
  group by 1
  order by 1;
end;
$$;
revoke all on function public.admin_get_visitor_trend(timestamptz, timestamptz, text) from public;
grant execute on function public.admin_get_visitor_trend(timestamptz, timestamptz, text) to authenticated;

-- Most visited pages.
create or replace function public.admin_get_top_pages(p_start timestamptz, p_end timestamptz, p_limit int default 20)
returns table(page_path text, views bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  return query
  select page_path, count(*)::bigint as views
  from public.analytics_events
  where created_at >= p_start and created_at < p_end
    and event_type = 'page_view' and page_path is not null
  group by page_path
  order by views desc
  limit p_limit;
end;
$$;
revoke all on function public.admin_get_top_pages(timestamptz, timestamptz, int) from public;
grant execute on function public.admin_get_top_pages(timestamptz, timestamptz, int) to authenticated;

-- Generic dimension breakdown (device_type / browser / operating_system only).
create or replace function public.admin_get_dimension_breakdown(p_start timestamptz, p_end timestamptz, p_dimension text)
returns table(value text, count bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  if p_dimension not in ('device_type', 'browser', 'operating_system') then
    raise exception 'Invalid dimension';
  end if;
  return query execute format(
    'select coalesce(%I, ''Unknown'') as value, count(*)::bigint as count
     from public.analytics_events
     where created_at >= $1 and created_at < $2
     group by 1
     order by count desc',
    p_dimension
  ) using p_start, p_end;
end;
$$;
revoke all on function public.admin_get_dimension_breakdown(timestamptz, timestamptz, text) from public;
grant execute on function public.admin_get_dimension_breakdown(timestamptz, timestamptz, text) to authenticated;

-- Traffic sources, bucketed from the raw referrer.
create or replace function public.admin_get_traffic_sources(p_start timestamptz, p_end timestamptz)
returns table(source text, visits bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  return query
  select
    case
      when referrer is null or referrer = '' then 'Direct / Unknown'
      when referrer ilike '%facebook.com%' then 'Facebook'
      when referrer ilike '%google.%' then 'Google'
      when referrer ilike '%youtube.com%' or referrer ilike '%youtu.be%' then 'YouTube'
      when referrer ilike '%instagram.com%' then 'Instagram'
      when referrer ilike '%t.co%' or referrer ilike '%twitter.com%' or referrer ilike '%x.com%' then 'Twitter / X'
      else 'Other'
    end as source,
    count(distinct session_id)::bigint as visits
  from public.analytics_events
  where created_at >= p_start and created_at < p_end and event_type = 'page_view'
  group by 1
  order by visits desc;
end;
$$;
revoke all on function public.admin_get_traffic_sources(timestamptz, timestamptz) from public;
grant execute on function public.admin_get_traffic_sources(timestamptz, timestamptz) to authenticated;

-- Most-played BMI instruments (from audio_play events).
create or replace function public.admin_get_top_instruments(p_start timestamptz, p_end timestamptz, p_limit int default 20)
returns table(instrument text, plays bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  return query
  select coalesce(metadata->>'instrument', 'Unknown') as instrument, count(*)::bigint as plays
  from public.analytics_events
  where created_at >= p_start and created_at < p_end and event_type = 'audio_play'
  group by 1
  order by plays desc
  limit p_limit;
end;
$$;
revoke all on function public.admin_get_top_instruments(timestamptz, timestamptz, int) from public;
grant execute on function public.admin_get_top_instruments(timestamptz, timestamptz, int) to authenticated;

-- Teaching module document views + downloads.
create or replace function public.admin_get_document_stats(p_start timestamptz, p_end timestamptz, p_limit int default 20)
returns table(document text, views bigint, downloads bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  return query
  select
    coalesce(metadata->>'document', 'Unknown') as document,
    count(*) filter (where event_type = 'pdf_view')::bigint as views,
    count(*) filter (where event_type = 'pdf_download')::bigint as downloads
  from public.analytics_events
  where created_at >= p_start and created_at < p_end and event_type in ('pdf_view', 'pdf_download')
  group by 1
  order by views desc, downloads desc
  limit p_limit;
end;
$$;
revoke all on function public.admin_get_document_stats(timestamptz, timestamptz, int) from public;
grant execute on function public.admin_get_document_stats(timestamptz, timestamptz, int) to authenticated;

-- YouTube / featured video click-throughs.
create or replace function public.admin_get_youtube_clicks(p_start timestamptz, p_end timestamptz, p_limit int default 20)
returns table(video text, clicks bigint)
language plpgsql
stable
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    raise exception 'Not authorized';
  end if;
  return query
  select coalesce(metadata->>'video', 'Unknown') as video, count(*)::bigint as clicks
  from public.analytics_events
  where created_at >= p_start and created_at < p_end and event_type = 'youtube_click'
  group by 1
  order by clicks desc
  limit p_limit;
end;
$$;
revoke all on function public.admin_get_youtube_clicks(timestamptz, timestamptz, int) from public;
grant execute on function public.admin_get_youtube_clicks(timestamptz, timestamptz, int) to authenticated;
