import { Trophy, Users, Swords, Calendar, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/dashboard/StatCard";
import { MatchCard } from "@/components/dashboard/MatchCard";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { StatusBadge } from "@/components/ui/StatusBadge";

const tournaments = [
  { name: "Premier Cup 2026", teams: 16, status: "active" as const, dates: "Mar 1 – Apr 15", category: "U-21" },
  { name: "City League Season 8", teams: 12, status: "active" as const, dates: "Feb 10 – Jun 30", category: "Senior" },
  { name: "Youth Championship", teams: 24, status: "upcoming" as const, dates: "Apr 1 – May 20", category: "U-17" },
];

const matches = [
  { homeTeam: "FC Thunder", awayTeam: "Red Lions", homeScore: 2, awayScore: 1, time: "65'", venue: "National Stadium", status: "live" as const, tournament: "Premier Cup 2026" },
  { homeTeam: "Blue Eagles", awayTeam: "Golden Stars", time: "18:00", venue: "City Arena", status: "upcoming" as const, tournament: "Premier Cup 2026" },
  { homeTeam: "United FC", awayTeam: "Dynamo City", time: "20:30", venue: "Olympic Park", status: "upcoming" as const, tournament: "City League" },
  { homeTeam: "Phoenix SC", awayTeam: "Metro FC", homeScore: 3, awayScore: 0, time: "FT", venue: "Phoenix Ground", status: "completed" as const, tournament: "City League" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="page-header">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your tournament overview.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Tournaments" value={3} change="+1 this month" changeType="positive" icon={Trophy} />
        <StatCard title="Teams Registered" value={52} change="+8 this week" changeType="positive" icon={Users} />
        <StatCard title="Matches Today" value={6} change="2 live now" changeType="neutral" icon={Swords} iconColor="bg-destructive/10" />
        <StatCard title="Upcoming Matches" value={14} change="Next 7 days" changeType="neutral" icon={Calendar} />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <QuickActions />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Matches */}
        <div className="lg:col-span-2 space-y-3">
          <div className="section-header">
            <h2 className="text-lg font-semibold">Today's Matches</h2>
            <a href="/matches" className="text-sm text-secondary hover:underline font-medium">View all</a>
          </div>
          <div className="space-y-3">
            {matches.map((m, i) => (
              <MatchCard key={i} {...m} />
            ))}
          </div>
        </div>

        {/* Tournaments sidebar */}
        <div className="space-y-3">
          <div className="section-header">
            <h2 className="text-lg font-semibold">Tournaments</h2>
            <a href="/tournaments" className="text-sm text-secondary hover:underline font-medium">View all</a>
          </div>
          {tournaments.map((t, i) => (
            <div key={i} className="stat-card cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-sm">{t.name}</h3>
                <StatusBadge status={t.status} />
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span>{t.teams} teams</span>
                <span>{t.category}</span>
                <span>{t.dates}</span>
              </div>
            </div>
          ))}

          {/* Top scorers mini */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-3">Top Scorers</h2>
            <div className="stat-card">
              {[
                { name: "Carlos Silva", team: "FC Thunder", goals: 8 },
                { name: "James Wilson", team: "Red Lions", goals: 6 },
                { name: "Ahmed Hassan", team: "Phoenix SC", goals: 5 },
                { name: "Luca Romano", team: "United FC", goals: 5 },
              ].map((p, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-5">{i + 1}</span>
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                      {p.name.split(" ").map(n => n[0]).join("")}
                    </div>
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
  );
}
