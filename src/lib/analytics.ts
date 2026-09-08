import { recordAnalyticsEvent, type AnalyticsEventType } from "@/lib/analytics.functions";

const SESSION_STORAGE_KEY = "bmi_analytics_session_id";

function generateId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  // Fallback for environments without crypto.randomUUID
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

// One session id per browser tab session (sessionStorage), not per page render.
export function getSessionId(): string {
  if (typeof window === "undefined") return generateId();
  try {
    let id = window.sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!id) {
      id = generateId();
      window.sessionStorage.setItem(SESSION_STORAGE_KEY, id);
    }
    return id;
  } catch {
    return generateId();
  }
}

interface DeviceInfo {
  deviceType: "desktop" | "mobile" | "tablet";
  browser: string;
  operatingSystem: string;
}

function detectDevice(): DeviceInfo {
  if (typeof navigator === "undefined") {
    return { deviceType: "desktop", browser: "Unknown", operatingSystem: "Unknown" };
  }
  const ua = navigator.userAgent;

  let deviceType: DeviceInfo["deviceType"] = "desktop";
  if (/iPad|Android(?!.*Mobile)|Tablet/i.test(ua)) deviceType = "tablet";
  else if (/Mobi|iPhone|Android/i.test(ua)) deviceType = "mobile";

  let browser = "Other";
  if (/Edg\//.test(ua)) browser = "Edge";
  else if (/OPR\//.test(ua) || /Opera/.test(ua)) browser = "Opera";
  else if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) browser = "Chrome";
  else if (/Firefox\//.test(ua)) browser = "Firefox";
  else if (/Safari\//.test(ua) && /Version\//.test(ua)) browser = "Safari";

  let operatingSystem = "Other";
  if (/Windows/.test(ua)) operatingSystem = "Windows";
  else if (/Android/.test(ua)) operatingSystem = "Android";
  else if (/iPhone|iPad|iPod/.test(ua)) operatingSystem = "iOS";
  else if (/Mac OS X/.test(ua)) operatingSystem = "macOS";
  else if (/Linux/.test(ua)) operatingSystem = "Linux";

  return { deviceType, browser, operatingSystem };
}

let cachedDevice: DeviceInfo | null = null;
function getDevice(): DeviceInfo {
  if (!cachedDevice) cachedDevice = detectDevice();
  return cachedDevice;
}

interface TrackOverrides {
  pagePath?: string;
  pageTitle?: string;
}

// Fire-and-forget event tracking. Never throws — analytics must never break the site.
export async function trackEvent(
  eventType: AnalyticsEventType,
  metadata?: Record<string, unknown>,
  overrides?: TrackOverrides,
): Promise<void> {
  try {
    if (typeof window === "undefined") return;
    const device = getDevice();
    await recordAnalyticsEvent({
      data: {
        sessionId: getSessionId(),
        eventType,
        pagePath: overrides?.pagePath ?? window.location.pathname,
        pageTitle: overrides?.pageTitle ?? document.title,
        referrer: document.referrer || undefined,
        deviceType: device.deviceType,
        browser: device.browser,
        operatingSystem: device.operatingSystem,
        metadata,
      },
    });
  } catch (e) {
    console.error("Analytics trackEvent failed", e);
  }
}

// Records a page_view for the given path. Deferred by a tick so `document.title`
// (set by the router's head tags) reflects the destination route before we read it.
export function trackPageView(pathname: string): void {
  if (typeof window === "undefined") return;
  window.setTimeout(() => {
    void trackEvent("page_view", undefined, { pagePath: pathname });
  }, 0);
}
