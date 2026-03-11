import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { Link } from "react-router-dom";

interface MatchEvent {
  type: "goal" | "yellow" | "red" | "substitution";
  player: string;
  minute: number;
  team: "home" | "away";
  detail?: string;
}

export default function MatchReportPage() {
  const [events, setEvents] = useState<MatchEvent[]>([
    { type: "goal", player: "Carlos Silva", minute: 12, team: "home" },
    { type: "yellow", player: "David Chen", minute: 23, team: "away" },
    { type: "goal", player: "James Wilson", minute: 35, team: "away" },
    { type: "goal", player: "Carlos Silva", minute: 58, team: "home" },
  ]);

  const icons: Record<string, string> = { goal: "⚽", yellow: "🟨", red: "🟥", substitution: "🔄" };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link to="/matches" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="text-2xl font-bold">Match Report</h1>
          <p className="text-muted-foreground">FC Thunder vs Red Lions · Mar 11, 2026</p>
        </div>
      </div>

      {/* Score Input */}
      <div className="bg-card rounded-xl border p-6">
        <h3 className="font-semibold mb-4">Match Result</h3>
        <div className="flex items-center gap-6 justify-center">
          <div className="text-center">
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-lg font-bold mx-auto mb-2">FC</div>
            <p className="text-sm font-medium mb-2">FC Thunder</p>
            <input type="number" defaultValue={2} className="h-14 w-20 rounded-lg border bg-background text-center text-2xl font-bold outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <span className="text-2xl font-bold text-muted-foreground mt-8">—</span>
          <div className="text-center">
            <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center text-lg font-bold mx-auto mb-2">RL</div>
            <p className="text-sm font-medium mb-2">Red Lions</p>
            <input type="number" defaultValue={1} className="h-14 w-20 rounded-lg border bg-background text-center text-2xl font-bold outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div>
            <label className="text-xs font-medium text-muted-foreground">Half-Time Score</label>
            <input type="text" defaultValue="1 - 1" className="h-10 w-full rounded-lg border bg-background px-3 text-sm mt-1 outline-none focus:border-secondary" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Attendance</label>
            <input type="number" defaultValue={3200} className="h-10 w-full rounded-lg border bg-background px-3 text-sm mt-1 outline-none focus:border-secondary" />
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Weather</label>
            <select className="h-10 w-full rounded-lg border bg-background px-3 text-sm mt-1 outline-none focus:border-secondary">
              <option>Clear</option><option>Cloudy</option><option>Rainy</option><option>Windy</option>
            </select>
          </div>
          <div>
            <label className="text-xs font-medium text-muted-foreground">Referee</label>
            <select className="h-10 w-full rounded-lg border bg-background px-3 text-sm mt-1 outline-none focus:border-secondary">
              <option>John Smith</option><option>Maria Garcia</option><option>Hans Mueller</option>
            </select>
          </div>
        </div>
      </div>

      {/* Quick Event Buttons */}
      <div className="bg-card rounded-xl border p-6">
        <h3 className="font-semibold mb-4">Match Events</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <Button variant="success" size="sm"><Plus className="h-3.5 w-3.5 mr-1" />⚽ Goal</Button>
          <Button variant="accent" size="sm"><Plus className="h-3.5 w-3.5 mr-1" />🟨 Yellow Card</Button>
          <Button variant="destructive" size="sm"><Plus className="h-3.5 w-3.5 mr-1" />🟥 Red Card</Button>
          <Button variant="outline" size="sm"><Plus className="h-3.5 w-3.5 mr-1" />🔄 Substitution</Button>
        </div>

        <div className="space-y-2">
          {events.map((e, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
              <span className="text-lg">{icons[e.type]}</span>
              <span className="text-sm font-bold text-muted-foreground w-10">{e.minute}'</span>
              <span className="text-sm font-medium flex-1">{e.player}</span>
              <span className="text-xs text-muted-foreground">{e.team === "home" ? "FC Thunder" : "Red Lions"}</span>
              <button className="text-xs text-destructive hover:underline">Remove</button>
            </div>
          ))}
        </div>
      </div>

      {/* Match Notes */}
      <div className="bg-card rounded-xl border p-6">
        <h3 className="font-semibold mb-4">Match Notes</h3>
        <textarea placeholder="Additional notes about the match..." className="h-32 w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary resize-none" defaultValue="Fair play match. Both teams showed great sportsmanship. Field conditions were excellent." />
      </div>

      <div className="flex items-center justify-between">
        <Button variant="outline">Save Draft</Button>
        <div className="flex gap-3">
          <Button variant="ghost">Cancel</Button>
          <Button variant="success">Submit Report</Button>
        </div>
      </div>
    </div>
  );
}
