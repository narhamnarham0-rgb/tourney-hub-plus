import { StatCard } from "@/components/dashboard/StatCard";
import { MatchCard } from "@/components/dashboard/MatchCard";
import { Trophy, Users, Swords, UserCircle, Calendar, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClubManagerDashboard() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Club Dashboard</h1>
        <p className="text-muted-foreground">FC Thunder · Club Manager View</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Players" value={22} icon={Users} />
        <StatCard title="Matches Played" value={10} icon={Swords} />
        <StatCard title="League Position" value="1st" icon={Trophy} />
        <StatCard title="Points" value={25} icon={Trophy} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Upcoming Matches</h2>
          <MatchCard homeTeam="FC Thunder" awayTeam="United FC" time="Mar 15, 18:00" venue="National Stadium" status="upcoming" />
          <MatchCard homeTeam="Golden Stars" awayTeam="FC Thunder" time="Mar 22, 20:00" venue="Star Arena" status="upcoming" />

          <h2 className="text-lg font-semibold mt-4">Recent Results</h2>
          <MatchCard homeTeam="FC Thunder" awayTeam="Red Lions" homeScore={2} awayScore={1} time="FT" venue="National Stadium" status="completed" />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <div className="space-y-2">
            {[
              { label: "Manage Roster", icon: Users },
              { label: "Submit Lineup", icon: FileText },
              { label: "View Schedule", icon: Calendar },
              { label: "Player Registration", icon: UserCircle },
            ].map((a) => (
              <button key={a.label} className="w-full flex items-center gap-3 p-3 rounded-lg border bg-card hover:bg-muted/30 transition-colors text-sm font-medium">
                <a.icon className="h-4 w-4 text-secondary" />
                {a.label}
              </button>
            ))}
          </div>

          <h2 className="text-lg font-semibold mt-4">Squad Status</h2>
          <div className="bg-card rounded-lg border p-4 space-y-3">
            {[
              { label: "Available", count: 18, color: "bg-success" },
              { label: "Injured", count: 2, color: "bg-destructive" },
              { label: "Suspended", count: 1, color: "bg-accent" },
              { label: "International Duty", count: 1, color: "bg-info" },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
                  <span className="text-sm">{s.label}</span>
                </div>
                <span className="text-sm font-bold">{s.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
