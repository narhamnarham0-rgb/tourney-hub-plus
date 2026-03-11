import { useState } from "react";
import { Trophy, MapPin, Calendar, Users, Settings, BarChart3, Swords, ListOrdered, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { MatchCard } from "@/components/dashboard/MatchCard";

const tabs = ["Overview", "Teams", "Matches", "Standings", "Players", "Statistics", "Settings"];

const teams = [
  { name: "FC Thunder", city: "New York", coach: "Marco Rossi", players: 22, status: "active" as const },
  { name: "Red Lions", city: "Chicago", coach: "David Chen", players: 20, status: "active" as const },
  { name: "Blue Eagles", city: "Los Angeles", coach: "Sarah Johnson", players: 21, status: "active" as const },
  { name: "Golden Stars", city: "Miami", coach: "Alex Petrov", players: 19, status: "active" as const },
  { name: "United FC", city: "Houston", coach: "James Lee", players: 23, status: "active" as const },
  { name: "Dynamo City", city: "Seattle", coach: "Omar Faruk", players: 20, status: "active" as const },
  { name: "Phoenix SC", city: "Phoenix", coach: "Luca Bianchi", players: 21, status: "active" as const },
  { name: "Metro FC", city: "Denver", coach: "Chris Park", players: 22, status: "active" as const },
];

const standingsData = [
  { pos: 1, team: "FC Thunder", p: 10, w: 8, d: 1, l: 1, gf: 24, ga: 8, pts: 25 },
  { pos: 2, team: "Red Lions", p: 10, w: 7, d: 2, l: 1, gf: 20, ga: 10, pts: 23 },
  { pos: 3, team: "Blue Eagles", p: 10, w: 6, d: 2, l: 2, gf: 18, ga: 12, pts: 20 },
  { pos: 4, team: "Golden Stars", p: 10, w: 5, d: 3, l: 2, gf: 16, ga: 11, pts: 18 },
  { pos: 5, team: "United FC", p: 10, w: 4, d: 3, l: 3, gf: 14, ga: 13, pts: 15 },
  { pos: 6, team: "Dynamo City", p: 10, w: 3, d: 2, l: 5, gf: 12, ga: 16, pts: 11 },
  { pos: 7, team: "Phoenix SC", p: 10, w: 2, d: 1, l: 7, gf: 9, ga: 20, pts: 7 },
  { pos: 8, team: "Metro FC", p: 10, w: 1, d: 0, l: 9, gf: 5, ga: 28, pts: 3 },
];

export default function TournamentDetailPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="space-y-6">
      {/* Tournament Header */}
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="h-16 w-16 rounded-xl bg-secondary/20 flex items-center justify-center">
            <Trophy className="h-8 w-8 text-secondary-foreground" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">Premier Cup 2026</h1>
              <StatusBadge status="active" />
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> National Stadium, New York</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" /> Mar 1 – Apr 15, 2026</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" /> 8 Teams · U-21</span>
            </div>
          </div>
          <Button variant="accent" size="sm">Manage Tournament</Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab
                ? "border-secondary text-secondary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "Overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard title="Teams" value={8} icon={Users} />
            <StatCard title="Matches Played" value={20} change="of 28 total" icon={Swords} />
            <StatCard title="Goals Scored" value={58} change="2.9 per match" changeType="positive" icon={BarChart3} />
            <StatCard title="Avg. Attendance" value="2.4K" icon={UserCircle} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">Recent Matches</h2>
              <div className="space-y-3">
                <MatchCard homeTeam="FC Thunder" awayTeam="Red Lions" homeScore={2} awayScore={1} time="FT" venue="National Stadium" status="completed" />
                <MatchCard homeTeam="Blue Eagles" awayTeam="Golden Stars" homeScore={0} awayScore={0} time="FT" venue="City Arena" status="completed" />
              </div>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3">Upcoming</h2>
              <div className="space-y-3">
                <MatchCard homeTeam="United FC" awayTeam="Dynamo City" time="Tomorrow 18:00" venue="Olympic Park" status="upcoming" />
                <MatchCard homeTeam="Phoenix SC" awayTeam="Metro FC" time="Tomorrow 20:30" venue="Phoenix Ground" status="upcoming" />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "Teams" && (
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="data-table-header px-4 py-3 text-left">Team</th>
                  <th className="data-table-header px-4 py-3 text-left">City</th>
                  <th className="data-table-header px-4 py-3 text-left hidden md:table-cell">Coach</th>
                  <th className="data-table-header px-4 py-3 text-center">Players</th>
                  <th className="data-table-header px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {teams.map((t, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                          {t.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium text-sm">{t.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{t.city}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{t.coach}</td>
                    <td className="px-4 py-3 text-sm text-center">{t.players}</td>
                    <td className="px-4 py-3 text-center"><StatusBadge status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "Standings" && (
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="data-table-header px-4 py-3 text-center w-12">#</th>
                  <th className="data-table-header px-4 py-3 text-left">Team</th>
                  <th className="data-table-header px-4 py-3 text-center">P</th>
                  <th className="data-table-header px-4 py-3 text-center">W</th>
                  <th className="data-table-header px-4 py-3 text-center">D</th>
                  <th className="data-table-header px-4 py-3 text-center">L</th>
                  <th className="data-table-header px-4 py-3 text-center hidden sm:table-cell">GF</th>
                  <th className="data-table-header px-4 py-3 text-center hidden sm:table-cell">GA</th>
                  <th className="data-table-header px-4 py-3 text-center font-bold">PTS</th>
                </tr>
              </thead>
              <tbody>
                {standingsData.map((row) => (
                  <tr key={row.pos} className={`border-b last:border-0 hover:bg-muted/30 transition-colors ${row.pos <= 2 ? "border-l-2 border-l-success" : row.pos >= 7 ? "border-l-2 border-l-destructive" : ""}`}>
                    <td className="px-4 py-3 text-center text-sm font-bold">{row.pos}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                          {row.team.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="font-medium text-sm">{row.team}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-center text-sm">{row.p}</td>
                    <td className="px-4 py-3 text-center text-sm">{row.w}</td>
                    <td className="px-4 py-3 text-center text-sm">{row.d}</td>
                    <td className="px-4 py-3 text-center text-sm">{row.l}</td>
                    <td className="px-4 py-3 text-center text-sm hidden sm:table-cell">{row.gf}</td>
                    <td className="px-4 py-3 text-center text-sm hidden sm:table-cell">{row.ga}</td>
                    <td className="px-4 py-3 text-center text-sm font-bold">{row.pts}</td>
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
          <MatchCard homeTeam="Blue Eagles" awayTeam="Golden Stars" homeScore={0} awayScore={0} time="FT" venue="City Arena" status="completed" />
          <MatchCard homeTeam="United FC" awayTeam="Dynamo City" time="Tomorrow 18:00" venue="Olympic Park" status="upcoming" />
          <MatchCard homeTeam="Phoenix SC" awayTeam="Metro FC" time="Tomorrow 20:30" venue="Phoenix Ground" status="upcoming" />
        </div>
      )}

      {(activeTab === "Players" || activeTab === "Statistics" || activeTab === "Settings") && (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          <p>Content for {activeTab} tab coming soon...</p>
        </div>
      )}
    </div>
  );
}
