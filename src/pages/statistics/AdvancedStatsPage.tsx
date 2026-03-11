import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from "recharts";

const goalsPerRound = [
  { round: "R1", goals: 8 }, { round: "R2", goals: 6 }, { round: "R3", goals: 10 },
  { round: "R4", goals: 5 }, { round: "R5", goals: 7 }, { round: "R6", goals: 9 },
  { round: "R7", goals: 4 }, { round: "R8", goals: 6 }, { round: "R9", goals: 3 },
  { round: "R10", goals: 0 },
];

const attendanceData = [
  { round: "R1", attendance: 24000 }, { round: "R2", attendance: 26000 }, { round: "R3", attendance: 28000 },
  { round: "R4", attendance: 25000 }, { round: "R5", attendance: 30000 }, { round: "R6", attendance: 27000 },
];

const goalTypes = [
  { name: "Open Play", value: 32, color: "hsl(var(--secondary))" },
  { name: "Set Piece", value: 14, color: "hsl(var(--info))" },
  { name: "Penalty", value: 6, color: "hsl(var(--accent))" },
  { name: "Own Goal", value: 6, color: "hsl(var(--destructive))" },
];

const cardsByTeam = [
  { team: "FC Thunder", yellow: 8, red: 1 },
  { team: "Red Lions", yellow: 12, red: 2 },
  { team: "Blue Eagles", yellow: 6, red: 0 },
  { team: "Golden Stars", yellow: 10, red: 1 },
  { team: "United FC", yellow: 9, red: 0 },
  { team: "Dynamo City", yellow: 7, red: 1 },
  { team: "Phoenix SC", yellow: 11, red: 1 },
  { team: "Metro FC", yellow: 14, red: 3 },
];

export default function AdvancedStatsPage() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Advanced Statistics</h1>
        <p className="text-muted-foreground">Premier Cup 2026 · Deep analytics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Goals", value: 58 },
          { label: "Avg per Match", value: 2.9 },
          { label: "Total Cards", value: 86 },
          { label: "Clean Sheets", value: 12 },
        ].map((s) => (
          <div key={s.label} className="stat-card text-center">
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Goals per Round</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={goalsPerRound}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="round" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="goals" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="round" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v: number) => [v.toLocaleString(), "Attendance"]} />
              <Area type="monotone" dataKey="attendance" stroke="hsl(var(--info))" fill="hsl(var(--info))" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Goal Types</h3>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width="50%" height={200}>
              <PieChart>
                <Pie data={goalTypes} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={4} dataKey="value">
                  {goalTypes.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {goalTypes.map((g) => (
                <div key={g.name} className="flex items-center gap-2 text-sm">
                  <span className="h-3 w-3 rounded-full shrink-0" style={{ background: g.color }} />
                  <span className="text-muted-foreground">{g.name}</span>
                  <span className="font-bold ml-auto">{g.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Discipline by Team</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={cardsByTeam} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis type="category" dataKey="team" tick={{ fontSize: 10 }} width={80} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="yellow" fill="hsl(var(--accent))" stackId="cards" />
              <Bar dataKey="red" fill="hsl(var(--destructive))" stackId="cards" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
