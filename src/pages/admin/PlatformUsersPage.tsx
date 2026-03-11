import { Search, Filter, MoreHorizontal } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";

const users = [
  { name: "John Doe", email: "john@cityfootball.com", role: "Super Admin", org: "KickOff Platform", lastLogin: "5 min ago", status: "active" as const },
  { name: "Sarah Connor", email: "sarah@cityfootball.com", role: "Event Organizer", org: "City Football Association", lastLogin: "1 hour ago", status: "active" as const },
  { name: "Marco Rossi", email: "marco@youthleague.com", role: "Event Organizer", org: "National Youth League", lastLogin: "3 hours ago", status: "active" as const },
  { name: "Lisa Chen", email: "lisa@copa.br", role: "Club Manager", org: "Copa Regional", lastLogin: "Yesterday", status: "active" as const },
  { name: "Hans Mueller", email: "hans@eurofutsal.de", role: "Referee", org: "Euro Futsal Network", lastLogin: "3 days ago", status: "inactive" as const },
  { name: "Yuki Sato", email: "yuki@asiancup.jp", role: "Event Organizer", org: "Asian Cup Org", lastLogin: "2 hours ago", status: "active" as const },
  { name: "Carlos Silva", email: "carlos@thunder.com", role: "Player", org: "FC Thunder", lastLogin: "Today", status: "active" as const },
  { name: "David Park", email: "david@redlions.com", role: "Club Manager", org: "Red Lions FC", lastLogin: "Yesterday", status: "active" as const },
];

const roleBadgeColor: Record<string, string> = {
  "Super Admin": "bg-destructive/10 text-destructive",
  "Event Organizer": "bg-secondary/10 text-secondary",
  "Club Manager": "bg-info/10 text-info",
  "Referee": "bg-accent/10 text-accent",
  "Player": "bg-muted text-muted-foreground",
};

export default function PlatformUsersPage() {
  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Platform Users</h1>
          <p className="text-muted-foreground">{users.length} registered users</p>
        </div>
        <Button variant="success" size="sm">+ Invite User</Button>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search users..." className="h-10 w-full rounded-lg border bg-card pl-10 pr-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
        </div>
        {["All Roles", "All Organizations"].map((f) => (
          <button key={f} className="h-10 px-4 rounded-lg border bg-card text-sm text-muted-foreground hover:bg-muted transition-colors flex items-center gap-2">
            <Filter className="h-3.5 w-3.5" />{f}
          </button>
        ))}
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="data-table-header px-4 py-3 text-left">User</th>
                <th className="data-table-header px-4 py-3 text-left hidden md:table-cell">Organization</th>
                <th className="data-table-header px-4 py-3 text-center">Role</th>
                <th className="data-table-header px-4 py-3 text-center hidden sm:table-cell">Last Login</th>
                <th className="data-table-header px-4 py-3 text-center">Status</th>
                <th className="data-table-header px-4 py-3 text-center w-12"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                        {u.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{u.name}</p>
                        <p className="text-xs text-muted-foreground">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{u.org}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={`status-badge ${roleBadgeColor[u.role]}`}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-muted-foreground hidden sm:table-cell">{u.lastLogin}</td>
                  <td className="px-4 py-3 text-center"><StatusBadge status={u.status} /></td>
                  <td className="px-4 py-3 text-center">
                    <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
