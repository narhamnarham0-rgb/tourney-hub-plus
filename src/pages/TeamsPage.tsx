import { Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";

const teams = [
  { name: "FC Thunder", city: "New York", coach: "Marco Rossi", players: 22, status: "active" as const, tournament: "Premier Cup" },
  { name: "Red Lions", city: "Chicago", coach: "David Chen", players: 20, status: "active" as const, tournament: "Premier Cup" },
  { name: "Blue Eagles", city: "Los Angeles", coach: "Sarah Johnson", players: 21, status: "active" as const, tournament: "Premier Cup" },
  { name: "Golden Stars", city: "Miami", coach: "Alex Petrov", players: 19, status: "active" as const, tournament: "Premier Cup" },
  { name: "United FC", city: "Houston", coach: "James Lee", players: 23, status: "active" as const, tournament: "City League" },
  { name: "Dynamo City", city: "Seattle", coach: "Omar Faruk", players: 20, status: "active" as const, tournament: "City League" },
  { name: "Phoenix SC", city: "Phoenix", coach: "Luca Bianchi", players: 21, status: "active" as const, tournament: "City League" },
  { name: "Metro FC", city: "Denver", coach: "Chris Park", players: 22, status: "inactive" as const, tournament: "City League" },
];

const roster = [
  { name: "Carlos Silva", pos: "ST", age: 24, num: 9 },
  { name: "Ben Taylor", pos: "CAM", age: 23, num: 10 },
  { name: "Lucas Moore", pos: "LW", age: 22, num: 11 },
  { name: "Dan Kim", pos: "RW", age: 25, num: 7 },
  { name: "Chris Park", pos: "CM", age: 26, num: 8 },
  { name: "Alex Park", pos: "CM", age: 24, num: 6 },
];

export default function TeamsPage() {
  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Teams</h1>
          <p className="text-muted-foreground">{teams.length} registered teams</p>
        </div>
        <Button variant="success" size="sm"><Plus className="h-4 w-4 mr-1" />Register Team</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search teams..." className="h-10 w-full rounded-lg border bg-card pl-10 pr-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
        </div>
        <button className="h-10 px-4 rounded-lg border bg-card text-sm text-muted-foreground hover:bg-muted transition-colors flex items-center gap-2">
          <Filter className="h-3.5 w-3.5" />All Tournaments
        </button>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="data-table-header px-4 py-3 text-left">Team</th>
                <th className="data-table-header px-4 py-3 text-left hidden md:table-cell">City</th>
                <th className="data-table-header px-4 py-3 text-left hidden lg:table-cell">Coach</th>
                <th className="data-table-header px-4 py-3 text-left hidden sm:table-cell">Tournament</th>
                <th className="data-table-header px-4 py-3 text-center">Players</th>
                <th className="data-table-header px-4 py-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((t, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">{t.name.slice(0, 2).toUpperCase()}</div>
                      <span className="font-medium text-sm">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{t.city}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell">{t.coach}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{t.tournament}</td>
                  <td className="px-4 py-3 text-sm text-center">{t.players}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Team Detail Preview - Roster */}
      <div>
        <h2 className="text-lg font-semibold mb-3">FC Thunder · Roster</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {roster.map((p, i) => (
            <div key={i} className="player-card p-4 flex items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center text-sm font-bold shrink-0">
                {p.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.pos} · Age {p.age}</p>
              </div>
              <span className="text-lg font-bold text-muted-foreground/50">#{p.num}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
