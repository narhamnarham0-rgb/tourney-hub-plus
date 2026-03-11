import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin } from "lucide-react";

const rounds = [
  {
    name: "Round 1",
    date: "Mar 1, 2026",
    matches: [
      { home: "FC Thunder", away: "Metro FC", time: "14:00", venue: "National Stadium" },
      { home: "Golden Stars", away: "Blue Eagles", time: "16:00", venue: "Star Arena" },
      { home: "Red Lions", away: "Phoenix SC", time: "18:00", venue: "City Arena" },
      { home: "United FC", away: "Dynamo City", time: "20:00", venue: "Olympic Park" },
    ],
  },
  {
    name: "Round 2",
    date: "Mar 8, 2026",
    matches: [
      { home: "Blue Eagles", away: "FC Thunder", time: "14:00", venue: "City Arena" },
      { home: "Metro FC", away: "Red Lions", time: "16:00", venue: "National Stadium" },
      { home: "Phoenix SC", away: "Golden Stars", time: "18:00", venue: "Phoenix Ground" },
      { home: "Dynamo City", away: "United FC", time: "20:00", venue: "Olympic Park" },
    ],
  },
  {
    name: "Round 3",
    date: "Mar 15, 2026",
    matches: [
      { home: "FC Thunder", away: "Red Lions", time: "14:00", venue: "National Stadium" },
      { home: "Golden Stars", away: "United FC", time: "16:00", venue: "Star Arena" },
      { home: "Blue Eagles", away: "Dynamo City", time: "18:00", venue: "City Arena" },
      { home: "Metro FC", away: "Phoenix SC", time: "20:00", venue: "National Stadium" },
    ],
  },
];

export default function TournamentSchedulePage() {
  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Schedule Builder</h1>
          <p className="text-muted-foreground">Premier Cup 2026 · Match Schedule</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">Auto Generate</Button>
          <Button variant="success" size="sm">Publish Schedule</Button>
        </div>
      </div>

      <div className="space-y-6">
        {rounds.map((round) => (
          <div key={round.name} className="bg-card rounded-lg border overflow-hidden">
            <div className="px-5 py-3 bg-muted/50 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">{round.name}</h3>
                <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{round.date}</span>
              </div>
              <Button variant="ghost" size="sm">Edit</Button>
            </div>
            <div className="divide-y">
              {round.matches.map((m, i) => (
                <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2 flex-1 justify-end">
                      <span className="text-sm font-medium text-right">{m.home}</span>
                      <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{m.home.slice(0, 2).toUpperCase()}</div>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium px-2">vs</span>
                    <div className="flex items-center gap-2 flex-1">
                      <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{m.away.slice(0, 2).toUpperCase()}</div>
                      <span className="text-sm font-medium">{m.away}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 ml-6 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1 hidden sm:flex"><Clock className="h-3.5 w-3.5" />{m.time}</span>
                    <span className="flex items-center gap-1 hidden md:flex"><MapPin className="h-3.5 w-3.5" />{m.venue}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
