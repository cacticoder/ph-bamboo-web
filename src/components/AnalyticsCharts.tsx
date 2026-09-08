import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const TOOLTIP_STYLE = { background: "#414833", border: "1px solid #cead4a55", borderRadius: 12, color: "#f0f2f5" } as const;
const COLORS = ["#cead4a", "#3e5b2c", "#414833", "#321524", "#8a7a2a", "#5e7a3a"];

export function ModuleBarChart({ data }: { data: Array<{ name: string; views: number; likes: number; downloads: number }> }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
        <XAxis dataKey="name" stroke="#f0f2f5aa" fontSize={11} />
        <YAxis stroke="#f0f2f5aa" fontSize={11} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Bar dataKey="views" fill="#cead4a" radius={[6, 6, 0, 0]} />
        <Bar dataKey="likes" fill="#3e5b2c" radius={[6, 6, 0, 0]} />
        <Bar dataKey="downloads" fill="#321524" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function ModuleMonthlyTrendChart({ data }: { data: Array<{ month: string; views: number; likes: number; downloads: number }> }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
        <XAxis dataKey="month" stroke="#f0f2f5aa" fontSize={11} />
        <YAxis stroke="#f0f2f5aa" fontSize={11} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Area type="monotone" dataKey="views" stroke="#cead4a" fill="#cead4a33" strokeWidth={2} />
        <Area type="monotone" dataKey="likes" stroke="#3e5b2c" fill="#3e5b2c33" strokeWidth={2} />
        <Area type="monotone" dataKey="downloads" stroke="#321524" fill="#32152433" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function VisitorMonthlyTrendChart({ data }: { data: Array<{ month: string; visits: number }> }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
        <XAxis dataKey="month" stroke="#f0f2f5aa" fontSize={11} />
        <YAxis stroke="#f0f2f5aa" fontSize={11} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Area type="monotone" dataKey="visits" stroke="#cead4a" fill="#cead4a33" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function CountryPieChart({ data }: { data: Array<{ country: string; visits: number }> }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="visits" nameKey="country" innerRadius={50} outerRadius={90} paddingAngle={2}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function VisitorTrendChart({ data }: { data: Array<{ day: string; visitors: number; page_views: number }> }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data}>
        <defs>
          <linearGradient id="visitorsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#cead4a" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#cead4a" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="pageViewsFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3e5b2c" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#3e5b2c" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff15" />
        <XAxis dataKey="day" stroke="#f0f2f5aa" fontSize={11} />
        <YAxis stroke="#f0f2f5aa" fontSize={11} allowDecimals={false} />
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Area type="monotone" dataKey="visitors" stroke="#cead4a" fill="url(#visitorsFill)" strokeWidth={2} />
        <Area type="monotone" dataKey="page_views" name="page views" stroke="#3e5b2c" fill="url(#pageViewsFill)" strokeWidth={2} />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export function DonutChart({ data }: { data: Array<{ name: string; value: number }> }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={TOOLTIP_STYLE} />
        <Legend wrapperStyle={{ fontSize: 11 }} />
      </PieChart>
    </ResponsiveContainer>
  );
}
