import { ArrowLeft, Star, MapPin, Calendar, Award } from "lucide-react";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const matchHistory = [
  { match: "FC Thunder vs Red Lions", date: "Mar 11", result: "2-1", role: "Main Referee", rating: 8.5 },
  { match: "Blue Eagles vs Golden Stars", date: "Mar 8", result: "0-0", role: "Main Referee", rating: 7.8 },
  { match: "United FC vs Phoenix SC", date: "Mar 4", result: "3-2", role: "Fourth Official", rating: 8.0 },
  { match: "Metro FC vs Dynamo City", date: "Mar 1", result: "1-4", role: "Main Referee", rating: 7.2 },
  { match: "FC Thunder vs Golden Stars", date: "Feb 25", result: "2-0", role: "Main Referee", rating: 8.8 },
];

const monthlyMatches = [
  { month: "Oct", matches: 4 }, { month: "Nov", matches: 6 }, { month: "Dec", matches: 3 },
  { month: "Jan", matches: 5 }, { month: "Feb", matches: 7 }, { month: "Mar", matches: 4 },
];

export default function RefereeProfilePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Link to="/referees" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-5 w-5" /></Link>
        <span className="text-sm text-muted-foreground">Referees</span>
      </div>

      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="h-20 w-20 rounded-xl bg-primary-foreground/10 flex items-center justify-center text-3xl font-black">JS</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">John Smith</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
              <span className="flex items-center gap-1"><Award className="h-4 w-4" />FIFA Badge</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />New York, USA</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Active since 2015</span>
              <span className="flex items-center gap-1"><Star className="h-4 w-4" />4.8 Rating</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Total Matches", value: 45 },
          { label: "This Season", value: 10 },
          { label: "Yellow Cards Given", value: 32 },
          { label: "Red Cards Given", value: 4 },
          { label: "Avg. Rating", value: "4.8" },
        ].map((s) => (
          <div key={s.label} className="stat-card text-center">
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Matches per Month</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={monthlyMatches}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="matches" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Recent Matches</h3>
          <div className="space-y-0">
            {matchHistory.map((m, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{m.match}</p>
                  <p className="text-xs text-muted-foreground">{m.date} · {m.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold">{m.result}</p>
                  <span className="text-xs font-medium text-secondary">⭐ {m.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
