import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";

const players = [
  { name: "Carlos Silva", club: "FC Thunder", pos: "ST", age: 24, mp: 10, goals: 8, assists: 3, nationality: "Brazil" },
  { name: "James Wilson", club: "Red Lions", pos: "ST", age: 22, mp: 10, goals: 6, assists: 5, nationality: "England" },
  { name: "Ahmed Hassan", club: "Phoenix SC", pos: "AM", age: 26, mp: 9, goals: 5, assists: 4, nationality: "Egypt" },
  { name: "Luca Romano", club: "United FC", pos: "CM", age: 28, mp: 10, goals: 5, assists: 2, nationality: "Italy" },
  { name: "Kenji Tanaka", club: "Blue Eagles", pos: "RW", age: 21, mp: 10, goals: 4, assists: 6, nationality: "Japan" },
  { name: "David Chen", club: "Golden Stars", pos: "CB", age: 27, mp: 10, goals: 1, assists: 0, nationality: "China" },
  { name: "Omar Faruk", club: "Dynamo City", pos: "GK", age: 30, mp: 10, goals: 0, assists: 0, nationality: "Turkey" },
  { name: "Chris Park", club: "Metro FC", pos: "LB", age: 25, mp: 8, goals: 1, assists: 3, nationality: "Korea" },
];

export default function PlayersPage() {
  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Players</h1>
          <p className="text-muted-foreground">Player database · {players.length} players</p>
        </div>
        <Button variant="success" size="sm">+ Add Player</Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search players..."
            className="h-10 w-full rounded-lg border bg-card pl-10 pr-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary"
          />
        </div>
        {["All Clubs", "All Positions", "All Ages"].map((f) => (
          <button key={f} className="h-10 px-4 rounded-lg border bg-card text-sm text-muted-foreground hover:bg-muted transition-colors flex items-center gap-2">
            <Filter className="h-3.5 w-3.5" />{f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="data-table-header px-4 py-3 text-left">Player</th>
                <th className="data-table-header px-4 py-3 text-left">Club</th>
                <th className="data-table-header px-4 py-3 text-center">Pos</th>
                <th className="data-table-header px-4 py-3 text-center hidden sm:table-cell">Age</th>
                <th className="data-table-header px-4 py-3 text-center hidden md:table-cell">MP</th>
                <th className="data-table-header px-4 py-3 text-center">Goals</th>
                <th className="data-table-header px-4 py-3 text-center hidden sm:table-cell">Assists</th>
              </tr>
            </thead>
            <tbody>
              {players.map((p, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                        {p.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{p.name}</p>
                        <p className="text-xs text-muted-foreground">{p.nationality}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{p.club}</td>
                  <td className="px-4 py-3 text-center"><span className="text-xs font-medium bg-muted px-2 py-0.5 rounded">{p.pos}</span></td>
                  <td className="px-4 py-3 text-sm text-center hidden sm:table-cell">{p.age}</td>
                  <td className="px-4 py-3 text-sm text-center hidden md:table-cell">{p.mp}</td>
                  <td className="px-4 py-3 text-center text-sm font-bold text-secondary">{p.goals}</td>
                  <td className="px-4 py-3 text-sm text-center hidden sm:table-cell">{p.assists}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30">
          <span className="text-xs text-muted-foreground">Showing 1-8 of 52 players</span>
          <div className="flex gap-1">
            {[1, 2, 3, "...", 7].map((p, i) => (
              <button key={i} className={`h-8 w-8 rounded text-xs font-medium transition-colors ${p === 1 ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"}`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Player ID Card Preview */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Digital Player Card</h2>
        <div className="w-full max-w-xs">
          <div className="bg-gradient-primary rounded-xl overflow-hidden">
            <div className="p-5 text-primary-foreground">
              <div className="flex items-start gap-4">
                <div className="h-16 w-16 rounded-lg bg-primary-foreground/10 flex items-center justify-center text-2xl font-bold">CS</div>
                <div className="flex-1">
                  <p className="font-bold">Carlos Silva</p>
                  <p className="text-sm opacity-70">FC Thunder</p>
                  <p className="text-xs opacity-50 mt-1">Striker · #9</p>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-primary-foreground/10 flex items-center justify-between">
                <div>
                  <p className="text-xs opacity-50">Player ID</p>
                  <p className="text-sm font-mono font-bold">KO-2026-0042</p>
                </div>
                <div className="h-14 w-14 bg-primary-foreground/10 rounded-lg flex items-center justify-center text-xs text-primary-foreground/50">QR</div>
              </div>
              <p className="text-[10px] opacity-40 mt-2 text-center">Premier Cup 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
