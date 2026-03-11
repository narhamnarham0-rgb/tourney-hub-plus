import { useState } from "react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const matchTabs = ["Overview", "Lineups", "Timeline", "Statistics"];

const timeline = [
  { minute: 12, event: "goal", player: "Carlos Silva", team: "home" },
  { minute: 23, event: "yellow", player: "David Chen", team: "away" },
  { minute: 35, event: "goal", player: "James Wilson", team: "away" },
  { minute: 45, event: "substitution", player: "Marco Rossi → Alex Park", team: "home" },
  { minute: 58, event: "goal", player: "Carlos Silva", team: "home" },
  { minute: 67, event: "yellow", player: "Tom Baker", team: "home" },
  { minute: 78, event: "red", player: "Liam Foster", team: "away" },
  { minute: 85, event: "substitution", player: "Ahmed Hassan → Ryu Tanaka", team: "away" },
];

const stats = [
  { label: "Possession", home: 58, away: 42 },
  { label: "Shots", home: 14, away: 8 },
  { label: "Shots on Target", home: 6, away: 3 },
  { label: "Corners", home: 7, away: 4 },
  { label: "Fouls", home: 12, away: 15 },
  { label: "Yellow Cards", home: 1, away: 1 },
  { label: "Red Cards", home: 0, away: 1 },
];

const homeLineup = [
  { name: "Mike Johnson", pos: "GK", num: 1 },
  { name: "Tom Baker", pos: "RB", num: 2 },
  { name: "Jake Williams", pos: "CB", num: 4 },
  { name: "Ryan Davis", pos: "CB", num: 5 },
  { name: "Sam Lee", pos: "LB", num: 3 },
  { name: "Chris Park", pos: "CM", num: 8 },
  { name: "Alex Park", pos: "CM", num: 6 },
  { name: "Dan Kim", pos: "RW", num: 7 },
  { name: "Carlos Silva", pos: "ST", num: 9 },
  { name: "Lucas Moore", pos: "LW", num: 11 },
  { name: "Ben Taylor", pos: "CAM", num: 10 },
];

const eventIcons: Record<string, { icon: string; color: string }> = {
  goal: { icon: "⚽", color: "border-l-success" },
  yellow: { icon: "🟨", color: "border-l-warning" },
  red: { icon: "🟥", color: "border-l-destructive" },
  substitution: { icon: "🔄", color: "border-l-info" },
};

export default function MatchCenterPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div className="space-y-6">
      {/* Match Header */}
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
        <p className="text-sm text-center opacity-70 mb-4">Premier Cup 2026 · Round 10</p>
        <div className="flex items-center justify-center gap-6 md:gap-12">
          {/* Home */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary-foreground/10 flex items-center justify-center text-xl font-bold">FC</div>
            <span className="font-semibold text-sm md:text-base">FC Thunder</span>
          </div>

          {/* Score */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3">
              <span className="text-4xl md:text-5xl font-black">2</span>
              <span className="text-2xl text-primary-foreground/50">-</span>
              <span className="text-4xl md:text-5xl font-black">1</span>
            </div>
            <div className="mt-2">
              <StatusBadge status="live" label="65'" />
            </div>
          </div>

          {/* Away */}
          <div className="flex flex-col items-center gap-2">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-primary-foreground/10 flex items-center justify-center text-xl font-bold">RL</div>
            <span className="font-semibold text-sm md:text-base">Red Lions</span>
          </div>
        </div>
        <p className="text-sm text-center opacity-70 mt-4">National Stadium · Mar 11, 2026</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b">
        {matchTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab ? "border-secondary text-secondary" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Key Events */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Key Events</h2>
            <div className="bg-card rounded-lg border p-4 space-y-0">
              {timeline.filter(e => e.event !== "substitution").map((e, i) => (
                <div key={i} className={cn("timeline-event", eventIcons[e.event].color)}>
                  <span className="text-lg">{eventIcons[e.event].icon}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{e.player}</p>
                    <p className="text-xs text-muted-foreground">{e.team === "home" ? "FC Thunder" : "Red Lions"}</p>
                  </div>
                  <span className="text-sm font-bold text-muted-foreground">{e.minute}'</span>
                </div>
              ))}
            </div>
          </div>

          {/* Match Stats */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Match Statistics</h2>
            <div className="bg-card rounded-lg border p-4 space-y-4">
              {stats.map((s, i) => {
                const total = s.home + s.away || 1;
                return (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{s.home}</span>
                      <span className="text-muted-foreground text-xs">{s.label}</span>
                      <span className="font-medium">{s.away}</span>
                    </div>
                    <div className="flex gap-1 h-2 rounded-full overflow-hidden">
                      <div className="bg-secondary rounded-l-full transition-all" style={{ width: `${(s.home / total) * 100}%` }} />
                      <div className="bg-muted rounded-r-full flex-1" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Timeline" && (
        <div className="bg-card rounded-lg border p-4">
          <div className="space-y-0">
            {timeline.map((e, i) => (
              <div key={i} className={cn("timeline-event", eventIcons[e.event].color)}>
                <span className="text-lg">{eventIcons[e.event].icon}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{e.player}</p>
                  <p className="text-xs text-muted-foreground">{e.team === "home" ? "FC Thunder" : "Red Lions"}</p>
                </div>
                <span className="text-sm font-bold text-muted-foreground">{e.minute}'</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "Lineups" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-lg font-semibold mb-3">FC Thunder</h2>
            <div className="bg-card rounded-lg border overflow-hidden">
              {homeLineup.map((p, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b last:border-0 hover:bg-muted/30">
                  <span className="text-sm font-bold text-muted-foreground w-6 text-center">{p.num}</span>
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                    {p.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className="text-sm font-medium flex-1">{p.name}</span>
                  <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded">{p.pos}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">Red Lions</h2>
            <div className="bg-card rounded-lg border overflow-hidden">
              {homeLineup.map((p, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-2.5 border-b last:border-0 hover:bg-muted/30">
                  <span className="text-sm font-bold text-muted-foreground w-6 text-center">{p.num}</span>
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                    {p.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <span className="text-sm font-medium flex-1">{p.name}</span>
                  <span className="text-xs text-muted-foreground font-medium bg-muted px-2 py-0.5 rounded">{p.pos}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "Statistics" && (
        <div className="bg-card rounded-lg border p-6 space-y-5">
          {stats.map((s, i) => {
            const total = s.home + s.away || 1;
            return (
              <div key={i}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold">{s.home}</span>
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-semibold">{s.away}</span>
                </div>
                <div className="flex gap-1 h-2.5 rounded-full overflow-hidden">
                  <div className="bg-secondary rounded-l-full transition-all" style={{ width: `${(s.home / total) * 100}%` }} />
                  <div className="bg-destructive/30 rounded-r-full flex-1" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
