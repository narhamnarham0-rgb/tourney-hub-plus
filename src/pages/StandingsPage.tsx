import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils";

const standingsData = [
  { pos: 1, team: "FC Thunder", p: 10, w: 8, d: 1, l: 1, gf: 24, ga: 8, pts: 25 },
  { pos: 2, team: "Red Lions", p: 10, w: 7, d: 2, l: 1, gf: 20, ga: 10, pts: 23 },
  { pos: 3, team: "Blue Eagles", p: 10, w: 6, d: 2, l: 2, gf: 18, ga: 12, pts: 20 },
  { pos: 4, team: "Golden Stars", p: 10, w: 5, d: 3, l: 2, gf: 16, ga: 11, pts: 18 },
  { pos: 5, team: "United FC", p: 10, w: 4, d: 3, l: 3, gf: 14, ga: 13, pts: 15 },
  { pos: 6, team: "Dynamo City", p: 10, w: 3, d: 2, l: 5, gf: 12, ga: 16, pts: 11 },
  { pos: 7, team: "Phoenix SC", p: 10, w: 2, d: 1, l: 7, gf: 9, ga: 20, pts: 7 },
  { pos: 8, team: "Metro FC", p: 10, w: 1, d: 0, l: 9, gf: 5, ga: 28, pts: 3 },
];

const form: Record<string, string[]> = {
  "FC Thunder": ["W", "W", "W", "D", "W"],
  "Red Lions": ["W", "W", "L", "W", "W"],
  "Blue Eagles": ["W", "D", "W", "L", "W"],
  "Golden Stars": ["D", "W", "W", "D", "L"],
  "United FC": ["L", "W", "D", "W", "L"],
  "Dynamo City": ["L", "L", "W", "D", "L"],
  "Phoenix SC": ["L", "L", "L", "W", "L"],
  "Metro FC": ["L", "L", "L", "L", "L"],
};

const formColors: Record<string, string> = {
  W: "bg-success text-success-foreground",
  D: "bg-warning text-warning-foreground",
  L: "bg-destructive text-destructive-foreground",
};

export default function StandingsPage() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Standings</h1>
        <p className="text-muted-foreground">Premier Cup 2026 · League Table</p>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="data-table-header px-4 py-3 text-center w-12">#</th>
                <th className="data-table-header px-4 py-3 text-left">Team</th>
                <th className="data-table-header px-4 py-3 text-center">P</th>
                <th className="data-table-header px-4 py-3 text-center">W</th>
                <th className="data-table-header px-4 py-3 text-center">D</th>
                <th className="data-table-header px-4 py-3 text-center">L</th>
                <th className="data-table-header px-4 py-3 text-center hidden sm:table-cell">GF</th>
                <th className="data-table-header px-4 py-3 text-center hidden sm:table-cell">GA</th>
                <th className="data-table-header px-4 py-3 text-center hidden md:table-cell">GD</th>
                <th className="data-table-header px-4 py-3 text-center font-bold">PTS</th>
                <th className="data-table-header px-4 py-3 text-center hidden lg:table-cell">Form</th>
              </tr>
            </thead>
            <tbody>
              {standingsData.map((row) => (
                <tr key={row.pos} className={cn(
                  "border-b last:border-0 hover:bg-muted/30 transition-colors",
                  row.pos <= 2 && "border-l-2 border-l-success",
                  row.pos >= 7 && "border-l-2 border-l-destructive"
                )}>
                  <td className="px-4 py-3.5 text-center">
                    <span className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold",
                      row.pos <= 2 && "bg-success/10 text-success",
                      row.pos >= 7 && "bg-destructive/10 text-destructive",
                      row.pos > 2 && row.pos < 7 && "text-muted-foreground"
                    )}>
                      {row.pos}
                    </span>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                        {row.team.slice(0, 2).toUpperCase()}
                      </div>
                      <span className="font-medium text-sm">{row.team}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-center text-sm">{row.p}</td>
                  <td className="px-4 py-3.5 text-center text-sm font-medium text-success">{row.w}</td>
                  <td className="px-4 py-3.5 text-center text-sm">{row.d}</td>
                  <td className="px-4 py-3.5 text-center text-sm font-medium text-destructive">{row.l}</td>
                  <td className="px-4 py-3.5 text-center text-sm hidden sm:table-cell">{row.gf}</td>
                  <td className="px-4 py-3.5 text-center text-sm hidden sm:table-cell">{row.ga}</td>
                  <td className="px-4 py-3.5 text-center text-sm font-medium hidden md:table-cell">{row.gf - row.ga > 0 ? `+${row.gf - row.ga}` : row.gf - row.ga}</td>
                  <td className="px-4 py-3.5 text-center text-sm font-bold">{row.pts}</td>
                  <td className="px-4 py-3.5 hidden lg:table-cell">
                    <div className="flex items-center gap-1 justify-center">
                      {form[row.team]?.map((f, i) => (
                        <span key={i} className={cn("h-5 w-5 rounded-sm flex items-center justify-center text-[10px] font-bold", formColors[f])}>
                          {f}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 px-4 py-3 border-t bg-muted/30 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-success" /> Qualification</span>
          <span className="flex items-center gap-1.5"><span className="h-3 w-3 rounded-sm bg-destructive" /> Relegation</span>
        </div>
      </div>
    </div>
  );
}
