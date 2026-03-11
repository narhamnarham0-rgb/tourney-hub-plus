import { Trophy, Swords, ListOrdered, Users, BarChart3, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { MatchCard } from "@/components/dashboard/MatchCard";

const topScorers = [
  { name: "Carlos Silva", team: "FC Thunder", goals: 8 },
  { name: "James Wilson", team: "Red Lions", goals: 6 },
  { name: "Ahmed Hassan", team: "Phoenix SC", goals: 5 },
];

export default function PublicTournamentHome() {
  return (
    <div className="min-h-screen bg-background">
      {/* Public Nav */}
      <nav className="border-b bg-card">
        <div className="container flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
              <Trophy className="h-4 w-4 text-secondary-foreground" />
            </div>
            <span className="font-bold">KickOff</span>
          </div>
          <div className="flex items-center gap-6 text-sm">
            {["Home", "Matches", "Standings", "Teams", "Players", "Statistics"].map((item) => (
              <a key={item} href="#" className="text-muted-foreground hover:text-foreground transition-colors hidden sm:inline">{item}</a>
            ))}
            <Link to="/login" className="text-sm font-medium text-secondary hover:underline">Sign In</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-gradient-primary text-primary-foreground py-16">
        <div className="container text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-16 w-16 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <Trophy className="h-8 w-8" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black mb-3">Premier Cup 2026</h1>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm opacity-70">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />New York, USA</span>
            <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Mar 1 – Apr 15, 2026</span>
            <span className="flex items-center gap-1"><Users className="h-4 w-4" />8 Teams · U-21</span>
          </div>
          <div className="flex justify-center gap-8 mt-8">
            {[
              { label: "Matches", value: "20/28", icon: Swords },
              { label: "Goals", value: "58", icon: BarChart3 },
              { label: "Teams", value: "8", icon: Users },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold">{s.value}</p>
                <p className="text-xs opacity-60">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Live & Upcoming */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-destructive animate-pulse-live" />Live & Upcoming
            </h2>
            <MatchCard homeTeam="FC Thunder" awayTeam="Red Lions" homeScore={2} awayScore={1} time="65'" venue="National Stadium" status="live" />
            <MatchCard homeTeam="Blue Eagles" awayTeam="Golden Stars" time="18:00" venue="City Arena" status="upcoming" />
            <MatchCard homeTeam="United FC" awayTeam="Dynamo City" time="20:30" venue="Olympic Park" status="upcoming" />

            <h2 className="text-xl font-bold mt-6">Latest Results</h2>
            <MatchCard homeTeam="Phoenix SC" awayTeam="Metro FC" homeScore={3} awayScore={0} time="FT" venue="Phoenix Ground" status="completed" />
            <MatchCard homeTeam="Golden Stars" awayTeam="Red Lions" homeScore={0} awayScore={2} time="FT" venue="Star Arena" status="completed" />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2"><ListOrdered className="h-5 w-5" />Standings</h2>
              <div className="bg-card rounded-lg border overflow-hidden">
                {[
                  { pos: 1, team: "FC Thunder", pts: 25 },
                  { pos: 2, team: "Red Lions", pts: 23 },
                  { pos: 3, team: "Blue Eagles", pts: 20 },
                  { pos: 4, team: "Golden Stars", pts: 18 },
                  { pos: 5, team: "United FC", pts: 15 },
                ].map((r) => (
                  <div key={r.pos} className="flex items-center justify-between px-4 py-2.5 border-b last:border-0 hover:bg-muted/30">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground w-5">{r.pos}</span>
                      <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{r.team.slice(0, 2).toUpperCase()}</div>
                      <span className="text-sm font-medium">{r.team}</span>
                    </div>
                    <span className="text-sm font-bold">{r.pts}</span>
                  </div>
                ))}
                <a href="#" className="block text-center py-2 text-sm text-secondary font-medium hover:underline">View full table →</a>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-3">⚽ Top Scorers</h2>
              <div className="bg-card rounded-lg border overflow-hidden">
                {topScorers.map((p, i) => (
                  <div key={i} className="flex items-center justify-between px-4 py-2.5 border-b last:border-0">
                    <div className="flex items-center gap-3">
                      <span className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"}`}>{i + 1}</span>
                      <div>
                        <p className="text-sm font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.team}</p>
                      </div>
                    </div>
                    <span className="text-sm font-bold text-secondary">{p.goals}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>Powered by <span className="font-semibold text-foreground">KickOff</span> · Football Tournament Management Platform</p>
        </div>
      </footer>
    </div>
  );
}
