import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

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
