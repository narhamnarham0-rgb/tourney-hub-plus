import { Button } from "@/components/ui/button";

const assignments = [
  { match: "FC Thunder vs Red Lions", date: "Mar 11", venue: "National Stadium", main: "John Smith", ar1: "Mike Lee", ar2: "Tom Chen", fourth: "Sarah Garcia" },
  { match: "Blue Eagles vs Golden Stars", date: "Mar 11", venue: "City Arena", main: "Hans Mueller", ar1: "Yuki Sato", ar2: "Dan Park", fourth: "Lisa Kim" },
  { match: "United FC vs Dynamo City", date: "Mar 12", venue: "Olympic Park", main: "Maria Garcia", ar1: "John Smith", ar2: "Chris Park", fourth: "Tom Baker" },
  { match: "Phoenix SC vs Metro FC", date: "Mar 12", venue: "Phoenix Ground", main: "Yuki Sato", ar1: "Hans Mueller", ar2: "Mike Lee", fourth: "Dan Park" },
];

export default function RefereeAssignmentPage() {
  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Referee Assignments</h1>
          <p className="text-muted-foreground">Assign referees to upcoming matches</p>
        </div>
        <Button variant="success" size="sm">Auto Assign</Button>
      </div>

      <div className="space-y-4">
        {assignments.map((a, i) => (
          <div key={i} className="bg-card rounded-lg border p-5 hover:shadow-md transition-shadow">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <div>
                <h3 className="font-semibold">{a.match}</h3>
                <p className="text-sm text-muted-foreground">{a.date} · {a.venue}</p>
              </div>
              <Button variant="outline" size="sm">Edit Assignment</Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { role: "Main Referee", name: a.main },
                { role: "Assistant Referee 1", name: a.ar1 },
                { role: "Assistant Referee 2", name: a.ar2 },
                { role: "Fourth Official", name: a.fourth },
              ].map((r) => (
                <div key={r.role} className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-muted-foreground mb-1">{r.role}</p>
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{r.name.split(" ").map(n => n[0]).join("")}</div>
                    <span className="text-sm font-medium">{r.name}</span>
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
