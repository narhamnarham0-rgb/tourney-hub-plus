import { Search, Filter } from "lucide-react";
import { MatchCard } from "@/components/dashboard/MatchCard";

const matches = [
  { homeTeam: "FC Thunder", awayTeam: "Red Lions", homeScore: 2, awayScore: 1, time: "65'", venue: "National Stadium", status: "live" as const, tournament: "Premier Cup 2026" },
  { homeTeam: "Blue Eagles", awayTeam: "Golden Stars", homeScore: 1, awayScore: 1, time: "32'", venue: "City Arena", status: "live" as const, tournament: "Premier Cup 2026" },
  { homeTeam: "United FC", awayTeam: "Dynamo City", time: "18:00", venue: "Olympic Park", status: "upcoming" as const, tournament: "City League" },
  { homeTeam: "Phoenix SC", awayTeam: "Metro FC", time: "20:30", venue: "Phoenix Ground", status: "upcoming" as const, tournament: "City League" },
  { homeTeam: "FC Thunder", awayTeam: "Blue Eagles", homeScore: 3, awayScore: 1, time: "FT", venue: "National Stadium", status: "completed" as const, tournament: "Premier Cup 2026" },
  { homeTeam: "Golden Stars", awayTeam: "Red Lions", homeScore: 0, awayScore: 2, time: "FT", venue: "Star Arena", status: "completed" as const, tournament: "Premier Cup 2026" },
];

export default function MatchesPage() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Matches</h1>
        <p className="text-muted-foreground">All scheduled and completed matches</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search matches..." className="h-10 w-full rounded-lg border bg-card pl-10 pr-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
        </div>
        {["All Tournaments", "All Dates", "All Venues", "All Status"].map((f) => (
          <button key={f} className="h-10 px-4 rounded-lg border bg-card text-sm text-muted-foreground hover:bg-muted transition-colors flex items-center gap-2">
            <Filter className="h-3.5 w-3.5" />{f}
          </button>
        ))}
      </div>

      {/* Live */}
      <div>
        <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-destructive animate-pulse-live" />Live Now
        </h2>
        <div className="space-y-3">
          {matches.filter(m => m.status === "live").map((m, i) => <MatchCard key={i} {...m} />)}
        </div>
      </div>

      {/* Upcoming */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Upcoming</h2>
        <div className="space-y-3">
          {matches.filter(m => m.status === "upcoming").map((m, i) => <MatchCard key={i} {...m} />)}
        </div>
      </div>

      {/* Completed */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Completed</h2>
        <div className="space-y-3">
          {matches.filter(m => m.status === "completed").map((m, i) => <MatchCard key={i} {...m} />)}
        </div>
      </div>
    </div>
  );
}
