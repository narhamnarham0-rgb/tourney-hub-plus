import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Trophy, Plus, Calendar } from "lucide-react";

const seasons = [
  { name: "2025-2026 Season", status: "active" as const, tournaments: 3, startDate: "Sep 2025", endDate: "Jun 2026", teams: 52, matches: 154 },
  { name: "2024-2025 Season", status: "completed" as const, tournaments: 4, startDate: "Sep 2024", endDate: "Jun 2025", teams: 48, matches: 180 },
  { name: "2023-2024 Season", status: "completed" as const, tournaments: 3, startDate: "Sep 2023", endDate: "Jun 2024", teams: 40, matches: 132 },
];

export default function SeasonManagementPage() {
  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Season Management</h1>
          <p className="text-muted-foreground">Manage competition seasons</p>
        </div>
        <Button variant="success" size="sm"><Plus className="h-4 w-4 mr-1" />New Season</Button>
      </div>

      <div className="space-y-4">
        {seasons.map((s, i) => (
          <div key={i} className="bg-card rounded-lg border p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{s.name}</h3>
                    <StatusBadge status={s.status} />
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Calendar className="h-3.5 w-3.5" />{s.startDate} – {s.endDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <div className="text-center">
                  <p className="font-bold">{s.tournaments}</p>
                  <p className="text-xs text-muted-foreground">Tournaments</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">{s.teams}</p>
                  <p className="text-xs text-muted-foreground">Teams</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">{s.matches}</p>
                  <p className="text-xs text-muted-foreground">Matches</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
