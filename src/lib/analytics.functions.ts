import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const ANALYTICS_EVENT_TYPES = [
  "page_view",
  "audio_play",
  "pdf_view",
  "pdf_download",
  "youtube_click",
  "external_link_click",
  "search",
] as const;

export type AnalyticsEventType = (typeof ANALYTICS_EVENT_TYPES)[number];

const inputSchema = z.object({
  sessionId: z.string().uuid(),
  eventType: z.enum(ANALYTICS_EVENT_TYPES),
  pagePath: z.string().max(500).optional(),
  pageTitle: z.string().max(300).optional(),
  referrer: z.string().max(500).optional(),
  deviceType: z.string().max(20).optional(),
  browser: z.string().max(40).optional(),
  operatingSystem: z.string().max(40).optional(),
  metadata: z.record(z.any()).optional(),
});

const countryNames: Record<string, string> = {
  PH: "Philippines", US: "United States", JP: "Japan", SG: "Singapore", MY: "Malaysia",
  ID: "Indonesia", TH: "Thailand", VN: "Vietnam", AU: "Australia", GB: "United Kingdom",
  DE: "Germany", FR: "France", CA: "Canada", KR: "South Korea", CN: "China", IN: "India",
};

// Records one analytics event using the service-role client so the public site
// never needs direct (RLS-bypassing) access to the analytics_events table.
export const recordAnalyticsEvent = createServerFn({ method: "POST" })
  .inputValidator((input) => inputSchema.parse(input))
  .handler(async ({ data }) => {
    try {
      const req = getRequest();
      const h = req?.headers;
      const countryCode = h?.get("cf-ipcountry") || h?.get("x-vercel-ip-country") || null;

      await supabaseAdmin.from("analytics_events").insert({
        session_id: data.sessionId,
        event_type: data.eventType,
        page_path: data.pagePath?.slice(0, 500) || null,
        page_title: data.pageTitle?.slice(0, 300) || null,
        referrer: data.referrer?.slice(0, 500) || null,
        device_type: data.deviceType || null,
        browser: data.browser || null,
        operating_system: data.operatingSystem || null,
        country: countryCode ? (countryNames[countryCode] || countryCode) : null,
        metadata: data.metadata ?? {},
      });
      return { ok: true };
    } catch (e) {
      console.error("recordAnalyticsEvent failed", e);
      return { ok: false };
    }
  });
