import { Trophy, Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Link } from "react-router-dom";

const tournaments = [
  { name: "Premier Cup 2026", teams: 8, category: "U-21", dates: "Mar 1 – Apr 15", status: "active" as const, matches: 28, location: "New York" },
  { name: "City League Season 8", teams: 12, category: "Senior", dates: "Feb 10 – Jun 30", status: "active" as const, matches: 66, location: "Los Angeles" },
  { name: "Youth Championship", teams: 24, category: "U-17", dates: "Apr 1 – May 20", status: "upcoming" as const, matches: 0, location: "Chicago" },
  { name: "Summer Invitational", teams: 8, category: "U-19", dates: "Jun 15 – Jul 10", status: "draft" as const, matches: 0, location: "Miami" },
  { name: "Winter Cup 2025", teams: 16, category: "Senior", dates: "Nov 1 – Dec 20", status: "completed" as const, matches: 60, location: "Houston" },
];

export default function TournamentsPage() {
  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Tournaments</h1>
          <p className="text-muted-foreground">{tournaments.length} tournaments</p>
        </div>
        <Button variant="success" size="sm"><Plus className="h-4 w-4 mr-1" />Create Tournament</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search tournaments..." className="h-10 w-full rounded-lg border bg-card pl-10 pr-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
        </div>
        <button className="h-10 px-4 rounded-lg border bg-card text-sm text-muted-foreground hover:bg-muted transition-colors flex items-center gap-2">
          <Filter className="h-3.5 w-3.5" />All Status
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tournaments.map((t, i) => (
          <Link to="/tournaments/detail" key={i} className="bg-card rounded-lg border overflow-hidden hover:shadow-md transition-all cursor-pointer group">
            <div className="h-24 bg-gradient-primary flex items-center justify-center relative">
              <Trophy className="h-8 w-8 text-primary-foreground/20" />
              <div className="absolute top-3 right-3"><StatusBadge status={t.status} /></div>
            </div>
            <div className="p-4">
              <h3 className="font-semibold group-hover:text-secondary transition-colors">{t.name}</h3>
              <p className="text-xs text-muted-foreground mt-1">{t.location} · {t.category}</p>
              <div className="flex items-center gap-3 mt-3 text-xs text-muted-foreground">
                <span>{t.teams} teams</span>
                <span>{t.matches} matches</span>
                <span>{t.dates}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
