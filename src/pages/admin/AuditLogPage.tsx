import { Clock, User, Shield, Database, Settings } from "lucide-react";

const logs = [
  { action: "User Login", user: "John Doe", role: "Super Admin", ip: "192.168.1.1", time: "2 min ago", type: "auth" },
  { action: "Tournament Created", user: "Sarah Connor", role: "Event Organizer", ip: "10.0.0.42", time: "15 min ago", type: "create" },
  { action: "Player Registered", user: "Marco Rossi", role: "Event Organizer", ip: "10.0.0.88", time: "30 min ago", type: "create" },
  { action: "Subscription Upgraded", user: "System", role: "Billing", ip: "—", time: "1 hour ago", type: "billing" },
  { action: "Match Result Updated", user: "Hans Mueller", role: "Referee", ip: "172.16.0.5", time: "1 hour ago", type: "update" },
  { action: "Team Registration Approved", user: "Sarah Connor", role: "Event Organizer", ip: "10.0.0.42", time: "2 hours ago", type: "update" },
  { action: "API Key Generated", user: "John Doe", role: "Super Admin", ip: "192.168.1.1", time: "3 hours ago", type: "security" },
  { action: "Database Backup Completed", user: "System", role: "System", ip: "—", time: "6 hours ago", type: "system" },
  { action: "User Role Changed", user: "John Doe", role: "Super Admin", ip: "192.168.1.1", time: "Yesterday", type: "security" },
  { action: "Organization Deleted", user: "John Doe", role: "Super Admin", ip: "192.168.1.1", time: "2 days ago", type: "delete" },
];

const typeColors: Record<string, { bg: string; icon: typeof Clock }> = {
  auth: { bg: "bg-info/10 text-info", icon: User },
  create: { bg: "bg-secondary/10 text-secondary", icon: Database },
  update: { bg: "bg-accent/10 text-accent", icon: Clock },
  billing: { bg: "bg-accent/10 text-accent", icon: Settings },
  security: { bg: "bg-destructive/10 text-destructive", icon: Shield },
  system: { bg: "bg-muted text-muted-foreground", icon: Settings },
  delete: { bg: "bg-destructive/10 text-destructive", icon: Database },
};

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Audit Log</h1>
        <p className="text-muted-foreground">Platform activity and security events</p>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="data-table-header px-4 py-3 text-left">Action</th>
                <th className="data-table-header px-4 py-3 text-left hidden md:table-cell">User</th>
                <th className="data-table-header px-4 py-3 text-left hidden lg:table-cell">IP Address</th>
                <th className="data-table-header px-4 py-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l, i) => {
                const tc = typeColors[l.type];
                const Icon = tc.icon;
                return (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg flex items-center justify-center shrink-0 ${tc.bg}`}>
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="font-medium text-sm">{l.action}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <p className="text-sm">{l.user}</p>
                      <p className="text-xs text-muted-foreground">{l.role}</p>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono hidden lg:table-cell">{l.ip}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground text-right">{l.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
