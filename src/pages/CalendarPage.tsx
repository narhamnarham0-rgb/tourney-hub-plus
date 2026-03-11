import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const calendarEvents: Record<number, { title: string; type: string }[]> = {
  1: [{ title: "Premier Cup R1", type: "match" }],
  3: [{ title: "Team Registration Deadline", type: "deadline" }],
  5: [{ title: "Youth Championship Kickoff", type: "event" }],
  8: [{ title: "Premier Cup R2", type: "match" }],
  11: [{ title: "FC Thunder vs Red Lions", type: "match" }, { title: "Blue Eagles vs Golden Stars", type: "match" }],
  12: [{ title: "United FC vs Dynamo City", type: "match" }],
  15: [{ title: "Premier Cup R3", type: "match" }],
  18: [{ title: "Referee Training", type: "event" }],
  22: [{ title: "Premier Cup R4", type: "match" }],
  25: [{ title: "Transfer Window Closes", type: "deadline" }],
  29: [{ title: "Premier Cup R5", type: "match" }],
};

const typeColors: Record<string, string> = {
  match: "bg-secondary/10 text-secondary border-l-2 border-l-secondary",
  deadline: "bg-destructive/10 text-destructive border-l-2 border-l-destructive",
  event: "bg-accent/10 text-accent border-l-2 border-l-accent",
};

export default function CalendarPage() {
  const datesInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDay = 5; // March 2026 starts on Sunday; adjust for Mon start → offset 6

  return (
    <div className="space-y-6">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Calendar</h1>
          <p className="text-muted-foreground">Tournament schedule overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon"><ChevronLeft className="h-5 w-5" /></Button>
          <span className="text-sm font-semibold min-w-[120px] text-center">March 2026</span>
          <Button variant="ghost" size="icon"><ChevronRight className="h-5 w-5" /></Button>
        </div>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-xs">
        {[
          { label: "Match", color: "bg-secondary" },
          { label: "Deadline", color: "bg-destructive" },
          { label: "Event", color: "bg-accent" },
        ].map((l) => (
          <span key={l.label} className="flex items-center gap-1.5 text-muted-foreground">
            <span className={`h-2.5 w-2.5 rounded-full ${l.color}`} />{l.label}
          </span>
        ))}
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        {/* Day headers */}
        <div className="grid grid-cols-7 border-b bg-muted/50">
          {days.map((d) => (
            <div key={d} className="text-center py-2 text-xs font-semibold text-muted-foreground">{d}</div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7">
          {/* Empty cells for offset */}
          {Array.from({ length: startDay }).map((_, i) => (
            <div key={`empty-${i}`} className="border-b border-r p-2 min-h-[100px] bg-muted/10" />
          ))}

          {datesInMonth.map((date) => {
            const events = calendarEvents[date] || [];
            const isToday = date === 11;
            return (
              <div key={date} className={`border-b border-r p-2 min-h-[100px] hover:bg-muted/20 transition-colors ${isToday ? "bg-secondary/5" : ""}`}>
                <span className={`text-sm font-medium ${isToday ? "inline-flex h-6 w-6 items-center justify-center rounded-full bg-secondary text-secondary-foreground" : "text-muted-foreground"}`}>
                  {date}
                </span>
                <div className="mt-1 space-y-1">
                  {events.map((e, i) => (
                    <div key={i} className={`text-[10px] font-medium px-1.5 py-0.5 rounded truncate cursor-pointer ${typeColors[e.type]}`}>
                      {e.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
