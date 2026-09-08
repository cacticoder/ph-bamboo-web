export type DatePreset = "today" | "7d" | "30d" | "90d" | "all" | "custom";

export const DATE_PRESETS: { value: DatePreset; label: string }[] = [
  { value: "today", label: "Today" },
  { value: "7d", label: "7 Days" },
  { value: "30d", label: "30 Days" },
  { value: "90d", label: "90 Days" },
  { value: "all", label: "All Time" },
  { value: "custom", label: "Custom Range" },
];

const DAY_MS = 86_400_000;

// All boundaries are computed from the viewer's local calendar day, then handed
// to Postgres as absolute UTC instants — so "Today" always means the visitor's
// local today, not a UTC day that may be off by several hours.
export function getDateRange(preset: DatePreset, custom?: { start: string; end: string }): { start: Date; end: Date } {
  const now = new Date();
  const end = new Date(now.getTime() + 60_000); // small forward buffer so "now" is always included
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  if (preset === "custom" && custom?.start && custom?.end) {
    const start = new Date(`${custom.start}T00:00:00`);
    const customEnd = new Date(`${custom.end}T23:59:59.999`);
    return { start, end: customEnd };
  }

  switch (preset) {
    case "today":
      return { start: startOfToday, end };
    case "7d":
      return { start: new Date(startOfToday.getTime() - 6 * DAY_MS), end };
    case "30d":
      return { start: new Date(startOfToday.getTime() - 29 * DAY_MS), end };
    case "90d":
      return { start: new Date(startOfToday.getTime() - 89 * DAY_MS), end };
    case "all":
    default:
      return { start: new Date("2020-01-01T00:00:00"), end };
  }
}

export function getLocalTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}
