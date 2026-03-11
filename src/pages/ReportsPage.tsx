export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Reports</h1>
        <p className="text-muted-foreground">Generate and download tournament reports</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { title: "Tournament Summary", desc: "Overview of all tournament stats and results" },
          { title: "Player Performance", desc: "Individual player statistics and rankings" },
          { title: "Match Reports", desc: "Detailed match-by-match analysis" },
          { title: "Financial Report", desc: "Revenue and expense breakdown" },
          { title: "Attendance Report", desc: "Venue attendance statistics" },
          { title: "Discipline Report", desc: "Cards and sanctions overview" },
        ].map((r, i) => (
          <div key={i} className="bg-card rounded-lg border p-5 hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="font-semibold">{r.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{r.desc}</p>
            <button className="mt-3 text-sm text-secondary font-medium hover:underline">Generate Report →</button>
          </div>
        ))}
      </div>
    </div>
  );
}
