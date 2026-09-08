# First-Party Analytics

A lightweight, first-party analytics system built on the project's existing Supabase project. It
tracks page views, sessions, and specific site interactions (audio plays, PDF views/downloads,
YouTube clicks), and exposes them through a protected dashboard at `/admin/analytics`.

It is separate from the pre-existing `/analytics` page (visitor country counts + teaching-module
view/like/download counters, backed by `visitor_logs` / `module_metrics`) — that page and its
tables are untouched.

## How it works

```
Browser                         Server                          Postgres
────────                        ──────                          ────────
trackEvent(type, meta)  ──POST──▶ recordAnalyticsEvent      ──insert──▶ analytics_events
(src/lib/analytics.ts)    _serverFn  (service-role client,               (RLS: no anon/auth
                                      src/lib/                            policies at all —
                                      analytics.functions.ts)             only the service
                                                                          role can write)

/admin/analytics  ──rpc('admin_get_summary', …)──▶ SECURITY DEFINER function
(signed-in admin session)                            checks is_admin(auth.uid())
                                                      before returning aggregated rows
```

- **Writing** never happens directly from the browser against the table. The public site calls a
  TanStack Start server function (`recordAnalyticsEvent`), which uses the service-role Supabase
  client (`supabaseAdmin`, server-only) to insert. This mirrors the existing `logVisitor` /
  `visitor_logs` pattern already in the codebase.
- **Reading** never happens directly against the table either. The dashboard calls a set of
  Postgres RPC functions (`admin_get_*`), each `SECURITY DEFINER` and each starting with
  `if not public.is_admin() then raise exception ...`. Anonymous users can't even call these RPCs
  (`REVOKE ALL ... FROM PUBLIC` + `GRANT ... TO authenticated` only) — so even a fully bypassed
  frontend can't read analytics data.
- `is_admin()` checks membership in a small `admin_users(user_id)` table, keyed to Supabase Auth
  users. There's no separate password/allowlist system — admin auth *is* Supabase Auth.

## Supabase objects (migration)

`supabase/migrations/20260908120000_create_analytics_events.sql`:

- **`public.analytics_events`** — `id uuid pk`, `session_id uuid`, `event_type text`,
  `page_path`, `page_title`, `referrer`, `device_type`, `browser`, `operating_system`,
  `country` (2-letter-code-derived name, nullable), `metadata jsonb`, `created_at timestamptz`.
  Indexes on `created_at`, `event_type`, `session_id`, `page_path`. RLS enabled, **no policies**.
- **`public.admin_users`** — `user_id uuid pk references auth.users`. RLS enabled, no policies;
  manage membership via the SQL editor.
- **`public.is_admin()`** — `SECURITY DEFINER`, returns whether `auth.uid()` is in `admin_users`.
- **Aggregation RPCs** (all `SECURITY DEFINER`, all admin-gated):
  `admin_get_summary`, `admin_get_visitor_trend`, `admin_get_top_pages`,
  `admin_get_dimension_breakdown` (device/browser/OS), `admin_get_traffic_sources`,
  `admin_get_top_instruments`, `admin_get_document_stats`, `admin_get_youtube_clicks`.

### Applying the migration

This was **not** applied to the live project from this session (no DB credentials/CLI link
available here, and it's a production schema change). Apply it yourself:

```bash
npx supabase link --project-ref <your-project-ref>
npx supabase db push
```

or paste the file's contents into the Supabase SQL editor.

### Creating an admin user

There's no sign-up flow by design. To grant someone dashboard access:

1. Supabase Dashboard → Authentication → Users → **Add user** (set an email + password).
2. Copy their user UUID, then in the SQL editor:
   ```sql
   insert into public.admin_users (user_id) values ('<uuid-from-step-1>');
   ```

They can then sign in at `/admin/login`.

## Accessing the dashboard

Visit `/admin/analytics`. If signed out, you're redirected to `/admin/login`. If signed in but not
in `admin_users`, you see an "Access denied" screen (the page itself never reveals data — the RPCs
reject the request server-side regardless of what the frontend does).

The dashboard shows: an always-on Today/7d/30d/All-time snapshot table, then a date-filtered
(Today/7 Days/30 Days/90 Days/All Time/Custom Range) view with visitor/session/page-view/event
totals, a visitor trend chart, most-visited pages, device breakdown, traffic sources, most-played
instruments, document view/download stats, and YouTube click counts. Everything is fetched live
from the RPCs above — nothing is hard-coded or seeded.

**Timezones:** date-range boundaries are computed from the viewer's local calendar day
(`getDateRange` in `src/lib/date-range.ts`), and the trend chart buckets days using the viewer's
IANA timezone (`Intl.DateTimeFormat().resolvedOptions().timeZone`, passed as `p_tz`), so "Today"
means the viewer's local today, not a UTC day.

**Note on "Visitors" vs "Sessions":** since this system deliberately avoids persistent
cross-session identifiers (no cookies, no fingerprinting — see Privacy below), a `session_id` is
the only visitor proxy available, and it lives for one browser tab session. In practice "Visitors"
and "Sessions" will read identically. This is intentional, not a bug.

## Client library (`src/lib/analytics.ts`)

```ts
import { trackEvent } from "@/lib/analytics";

void trackEvent("audio_play", { instrument: "Kubing", audioFile: "Kubing.mp3" });
```

- `getSessionId()` — one `crypto.randomUUID()` per browser tab, stored in `sessionStorage` (not
  regenerated per page render, not shared across tabs).
- Device/browser/OS are detected from `navigator.userAgent` with small regexes — no dependency
  added.
- `trackEvent(eventType, metadata?, overrides?)` never throws: every failure (network, missing
  service-role key locally, etc.) is caught and `console.error`'d, so a broken analytics backend
  never breaks the site. It's fire-and-forget — call sites use `void trackEvent(...)`.
- `trackPageView(pathname)` is a thin wrapper used by `VisitorTracker` (see below); it defers by
  one tick so `document.title` reflects the destination route before being read.

Tracked event types: `page_view`, `audio_play`, `pdf_view`, `pdf_download`, `youtube_click`,
`external_link_click`, `search` (the last is defined for future use — nothing currently calls it).

## Where each event is fired

| Event | File | Trigger |
|---|---|---|
| `page_view` | `src/components/VisitorTracker.tsx` | Every route change (already fires `logVisitor` for the old system too — extended, not duplicated) |
| `audio_play` | `src/routes/gallery.tsx` | The native `<audio>` element's `onPlay` — fires only when playback actually starts, not on card click |
| `pdf_view` | `src/routes/modules.tsx` | Clicking "Read" on a teaching module |
| `pdf_download` | `src/routes/modules.tsx` | Clicking "Download" in the PDF reader modal |
| `pdf_view` / `pdf_download` | `src/routes/processing-center.tsx` | The BMIPC brochure's "View PDF" / "Download Brochure" links |
| `youtube_click` | `src/components/FeaturedVideos.tsx`, `src/routes/processing-center.tsx`, `src/components/CinematicHero.tsx` | Clicking any of the three featured/facility/hero video buttons, before the embed opens |

## Adding a new tracked event

1. If it's a genuinely new event *type* (not just new metadata on an existing type), add it to
   `ANALYTICS_EVENT_TYPES` in `src/lib/analytics.functions.ts`.
2. Call `void trackEvent("your_event_type", { ...whatever metadata is useful })` at the
   interaction site — only when the action actually happens (e.g. a real play, a real click), not
   on hover/render.
3. If you want it aggregated on the dashboard, add a small `admin_get_*` SQL function following
   the existing ones (copy `admin_get_top_instruments` and swap the `event_type` / `metadata->>`
   key), then wire it into `AnalyticsDashboard.tsx` and add its type to
   `src/integrations/supabase/types.ts`.

## Performance & failure handling

- All writes are async, non-blocking, and wrapped in try/catch at every layer (client util →
  server function). A Supabase outage degrades to "analytics silently stops," never to a broken
  page, blocked navigation, blocked audio/PDF/download, or a thrown error.
- No new client dependency was added — device detection is a few regexes, charts reuse the
  project's existing `recharts` install and lazy-loading pattern (`ClientOnly` + `Suspense`).
- Dashboard aggregation happens entirely in Postgres (the `admin_get_*` RPCs) — the browser never
  downloads raw `analytics_events` rows to compute stats client-side.

## Privacy

- No name, email, password, address, or payment data is ever collected.
- No raw IP address is stored. `country` is derived from the Cloudflare `cf-ipcountry` request
  header (a 2-letter code resolved to a country name) — the same approach the existing
  `visitor_logs` table already uses. No city/region-level precision is captured for this table.
- Session IDs are random, per-tab, and expire with the browser session — there's no persistent
  visitor identifier and no fingerprinting.
- If a cookie/privacy notice becomes necessary later, `trackEvent`/`trackPageView` are the only
  call sites that would need a consent gate (e.g. a single `isAnalyticsAllowed()` check at the top
  of `trackEvent`) — nothing else in the codebase depends on this system.
