import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Users, Trophy, Swords, BarChart3 } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { MatchCard } from "@/components/dashboard/MatchCard";
import { StatCard } from "@/components/dashboard/StatCard";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const performanceData = [
  { match: "R1", pts: 3 }, { match: "R2", pts: 6 }, { match: "R3", pts: 9 },
  { match: "R4", pts: 10 }, { match: "R5", pts: 13 }, { match: "R6", pts: 16 },
  { match: "R7", pts: 19 }, { match: "R8", pts: 22 }, { match: "R9", pts: 22 },
  { match: "R10", pts: 25 },
];

const roster = [
  { name: "Mike Johnson", pos: "GK", age: 28, num: 1, goals: 0, apps: 10 },
  { name: "Tom Baker", pos: "RB", age: 25, num: 2, goals: 1, apps: 10 },
  { name: "Jake Williams", pos: "CB", age: 27, num: 4, goals: 2, apps: 10 },
  { name: "Ryan Davis", pos: "CB", age: 26, num: 5, goals: 0, apps: 9 },
  { name: "Sam Lee", pos: "LB", age: 24, num: 3, goals: 0, apps: 10 },
  { name: "Chris Park", pos: "CM", age: 26, num: 8, goals: 3, apps: 10 },
  { name: "Alex Park", pos: "CM", age: 24, num: 6, goals: 1, apps: 8 },
  { name: "Dan Kim", pos: "RW", age: 25, num: 7, goals: 4, apps: 10 },
  { name: "Carlos Silva", pos: "ST", age: 24, num: 9, goals: 8, apps: 10 },
  { name: "Lucas Moore", pos: "LW", age: 22, num: 11, goals: 3, apps: 9 },
  { name: "Ben Taylor", pos: "CAM", age: 23, num: 10, goals: 2, apps: 10 },
];

const tabs = ["Overview", "Roster", "Matches", "Statistics"];

export default function TeamDetailPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Link to="/teams" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-5 w-5" /></Link>
        <span className="text-sm text-muted-foreground">Teams</span>
      </div>

      {/* Team Header */}
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="h-20 w-20 rounded-xl bg-primary-foreground/10 flex items-center justify-center text-3xl font-black">FC</div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">FC Thunder</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />New York, USA</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" />22 Players</span>
              <span className="flex items-center gap-1"><Trophy className="h-4 w-4" />Premier Cup 2026</span>
            </div>
            <p className="text-sm opacity-60 mt-1">Coach: Marco Rossi · Founded: 2018</p>
          </div>
          <StatusBadge status="active" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? "border-secondary text-secondary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Position" value="1st" icon={Trophy} />
            <StatCard title="Matches" value={10} icon={Swords} />
            <StatCard title="Goals Scored" value={24} icon={BarChart3} />
            <StatCard title="Points" value={25} icon={Trophy} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-card rounded-lg border p-5">
              <h3 className="font-semibold mb-4">Points Progression</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="match" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                  <Tooltip />
                  <Line type="monotone" dataKey="pts" stroke="hsl(var(--secondary))" strokeWidth={2} dot={{ fill: "hsl(var(--secondary))", r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Recent Results</h3>
              <div className="space-y-3">
                <MatchCard homeTeam="FC Thunder" awayTeam="Red Lions" homeScore={2} awayScore={1} time="FT" venue="National Stadium" status="completed" />
                <MatchCard homeTeam="Blue Eagles" awayTeam="FC Thunder" homeScore={1} awayScore={3} time="FT" venue="City Arena" status="completed" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Roster" && (
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="data-table-header px-4 py-3 text-center w-12">#</th>
                  <th className="data-table-header px-4 py-3 text-left">Player</th>
                  <th className="data-table-header px-4 py-3 text-center">Pos</th>
                  <th className="data-table-header px-4 py-3 text-center hidden sm:table-cell">Age</th>
                  <th className="data-table-header px-4 py-3 text-center hidden md:table-cell">Apps</th>
                  <th className="data-table-header px-4 py-3 text-center">Goals</th>
                </tr>
              </thead>
              <tbody>
                {roster.map((p) => (
                  <tr key={p.num} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="px-4 py-3 text-center text-sm font-bold text-muted-foreground">{p.num}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{p.name.split(" ").map(n => n[0]).join("")}</div>
                        <span className="font-medium text-sm">{p.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center"><span className="text-xs font-medium bg-muted px-2 py-0.5 rounded">{p.pos}</span></td>
                    <td className="px-4 py-3 text-sm text-center hidden sm:table-cell">{p.age}</td>
                    <td className="px-4 py-3 text-sm text-center hidden md:table-cell">{p.apps}</td>
                    <td className="px-4 py-3 text-center text-sm font-bold text-secondary">{p.goals}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Matches" && (
        <div className="space-y-3">
          <MatchCard homeTeam="FC Thunder" awayTeam="Red Lions" homeScore={2} awayScore={1} time="FT" venue="National Stadium" status="completed" />
          <MatchCard homeTeam="Blue Eagles" awayTeam="FC Thunder" homeScore={1} awayScore={3} time="FT" venue="City Arena" status="completed" />
          <MatchCard homeTeam="FC Thunder" awayTeam="United FC" time="Mar 15, 18:00" venue="National Stadium" status="upcoming" />
        </div>
      )}

      {activeTab === "Statistics" && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Goals Scored", value: 24 }, { label: "Goals Conceded", value: 8 },
            { label: "Clean Sheets", value: 4 }, { label: "Win Rate", value: "80%" },
            { label: "Avg. Possession", value: "58%" }, { label: "Shots per Game", value: 14.2 },
            { label: "Pass Accuracy", value: "87%" }, { label: "Fouls per Game", value: 11.5 },
          ].map((s) => (
            <div key={s.label} className="stat-card text-center">
              <p className="text-2xl font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
