import { Trophy, MapPin, Users, Calendar } from "lucide-react";
import { MatchCard } from "@/components/dashboard/MatchCard";

const matches = [
  { homeTeam: "FC Thunder", awayTeam: "Red Lions", homeScore: 2, awayScore: 1, time: "65'", venue: "National Stadium", status: "live" as const },
  { homeTeam: "Blue Eagles", awayTeam: "Golden Stars", homeScore: 1, awayScore: 1, time: "32'", venue: "City Arena", status: "live" as const },
  { homeTeam: "United FC", awayTeam: "Dynamo City", time: "18:00", venue: "Olympic Park", status: "upcoming" as const },
  { homeTeam: "Phoenix SC", awayTeam: "Metro FC", time: "20:30", venue: "Phoenix Ground", status: "upcoming" as const },
  { homeTeam: "FC Thunder", awayTeam: "Blue Eagles", homeScore: 3, awayScore: 1, time: "FT", venue: "National Stadium", status: "completed" as const },
  { homeTeam: "Golden Stars", awayTeam: "Red Lions", homeScore: 0, awayScore: 2, time: "FT", venue: "Star Arena", status: "completed" as const },
  { homeTeam: "United FC", awayTeam: "Phoenix SC", homeScore: 1, awayScore: 1, time: "FT", venue: "Olympic Park", status: "completed" as const },
];

export default function PublicMatchesPage() {
  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b bg-card">
        <div className="container flex h-14 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary">
            <Trophy className="h-4 w-4 text-secondary-foreground" />
          </div>
          <span className="font-bold">KickOff</span>
          <span className="text-muted-foreground mx-2">·</span>
          <span className="text-sm text-muted-foreground">Premier Cup 2026</span>
        </div>
      </nav>

      <div className="container py-8 space-y-6 max-w-3xl">
        <h1 className="text-2xl font-bold">All Matches</h1>

        <div>
          <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-destructive animate-pulse-live" />Live
          </h2>
          <div className="space-y-3">
            {matches.filter(m => m.status === "live").map((m, i) => <MatchCard key={i} {...m} />)}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Upcoming</h2>
          <div className="space-y-3">
            {matches.filter(m => m.status === "upcoming").map((m, i) => <MatchCard key={i} {...m} />)}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-3">Completed</h2>
          <div className="space-y-3">
            {matches.filter(m => m.status === "completed").map((m, i) => <MatchCard key={i} {...m} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
