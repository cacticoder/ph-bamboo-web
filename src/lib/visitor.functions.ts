import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const logVisitor = createServerFn({ method: "POST" })
  .inputValidator((input) => z.object({ path: z.string().max(500), referrer: z.string().max(500).optional() }).parse(input))
  .handler(async ({ data }) => {
    try {
      const req = getRequest();
      const h = req?.headers;
      // Cloudflare-style geo headers (work on Lovable's edge runtime); fall back to "unknown"
      const country = h?.get("cf-ipcountry") || h?.get("x-vercel-ip-country") || null;
      const city = h?.get("cf-ipcity") || h?.get("x-vercel-ip-city") || null;
      const region = h?.get("cf-region") || h?.get("x-vercel-ip-country-region") || null;
      const userAgent = h?.get("user-agent")?.slice(0, 300) || null;

      const countryNames: Record<string, string> = {
        PH: "Philippines", US: "United States", JP: "Japan", SG: "Singapore", MY: "Malaysia",
        ID: "Indonesia", TH: "Thailand", VN: "Vietnam", AU: "Australia", GB: "United Kingdom",
        DE: "Germany", FR: "France", CA: "Canada", KR: "South Korea", CN: "China", IN: "India",
      };

      await supabaseAdmin.from("visitor_logs").insert({
        country: country ? (countryNames[country] || country) : null,
        country_code: country,
        city,
        region,
        path: data.path.slice(0, 500),
        referrer: data.referrer?.slice(0, 500) || null,
        user_agent: userAgent,
      });
      return { ok: true };
    } catch (e) {
      console.error("logVisitor failed", e);
      return { ok: false };
    }
  });
