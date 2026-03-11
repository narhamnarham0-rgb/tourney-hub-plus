import { Button } from "@/components/ui/button";

export default function RefereesPage() {
  const referees = [
    { name: "John Smith", badge: "FIFA", matches: 45, rating: 4.8 },
    { name: "Maria Garcia", badge: "National", matches: 32, rating: 4.6 },
    { name: "Hans Mueller", badge: "FIFA", matches: 58, rating: 4.9 },
    { name: "Yuki Sato", badge: "Regional", matches: 21, rating: 4.3 },
  ];

  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Referees</h1>
          <p className="text-muted-foreground">{referees.length} registered referees</p>
        </div>
        <Button variant="success" size="sm">+ Add Referee</Button>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="data-table-header px-4 py-3 text-left">Referee</th>
                <th className="data-table-header px-4 py-3 text-center">Badge Level</th>
                <th className="data-table-header px-4 py-3 text-center">Matches</th>
                <th className="data-table-header px-4 py-3 text-center">Rating</th>
              </tr>
            </thead>
            <tbody>
              {referees.map((r, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-bold">
                        {r.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <span className="font-medium text-sm">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-0.5 rounded">{r.badge}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center">{r.matches}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm font-bold text-secondary">⭐ {r.rating}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Match Report Form Preview */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Match Report Interface</h2>
        <div className="bg-card rounded-lg border p-6 max-w-2xl space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Home Team Score</label>
              <input type="number" value={2} readOnly className="mt-1 h-10 w-full rounded-lg border bg-muted/50 px-3 text-sm" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase">Away Team Score</label>
              <input type="number" value={1} readOnly className="mt-1 h-10 w-full rounded-lg border bg-muted/50 px-3 text-sm" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase">Match Notes</label>
            <textarea readOnly className="mt-1 h-20 w-full rounded-lg border bg-muted/50 px-3 py-2 text-sm resize-none" defaultValue="Fair play match. No major incidents." />
          </div>
          <div className="flex gap-2">
            <Button variant="success" size="sm">⚽ Add Goal</Button>
            <Button variant="accent" size="sm">🟨 Yellow Card</Button>
            <Button variant="destructive" size="sm">🟥 Red Card</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
