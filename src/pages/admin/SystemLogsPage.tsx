import { useState } from "react";
import { Search, Filter, Clock, AlertTriangle, Download, RefreshCw, Trash2, Shield, User, Database, Settings as SettingsIcon, Server, CreditCard, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";

const logs = [
  { action: "User Login", user: "John Doe", role: "Super Admin", ip: "192.168.1.1", time: "2 min ago", type: "auth", severity: "info", details: "Login from Chrome/Windows" },
  { action: "Tournament Created", user: "Sarah Connor", role: "Event Organizer", ip: "10.0.0.42", time: "15 min ago", type: "create", severity: "info", details: "Created 'Summer Cup 2026'" },
  { action: "Player Registered", user: "Marco Rossi", role: "Event Organizer", ip: "10.0.0.88", time: "30 min ago", type: "create", severity: "info", details: "Player: Carlos Silva added to FC Thunder" },
  { action: "Subscription Upgraded", user: "System", role: "Billing", ip: "—", time: "1 hour ago", type: "billing", severity: "info", details: "Asian Cup Org: Pro → Enterprise" },
  { action: "API Rate Limit Exceeded", user: "System", role: "System", ip: "203.0.113.42", time: "1.5 hours ago", type: "warning", severity: "warning", details: "Org: Asian Cup, 1200 req/min (limit: 1000)" },
  { action: "Match Result Updated", user: "Hans Mueller", role: "Referee", ip: "172.16.0.5", time: "2 hours ago", type: "update", severity: "info", details: "FC Thunder 2-1 Red Lions" },
  { action: "Failed Login Attempt", user: "unknown@test.com", role: "—", ip: "198.51.100.23", time: "2.5 hours ago", type: "security", severity: "error", details: "5 failed attempts - account locked" },
  { action: "Team Registration Approved", user: "Sarah Connor", role: "Event Organizer", ip: "10.0.0.42", time: "3 hours ago", type: "update", severity: "info", details: "Dynamo City approved for City League" },
  { action: "API Key Generated", user: "John Doe", role: "Super Admin", ip: "192.168.1.1", time: "4 hours ago", type: "security", severity: "warning", details: "New API key for production environment" },
  { action: "Database Backup Completed", user: "System", role: "System", ip: "—", time: "6 hours ago", type: "system", severity: "info", details: "Full backup: 2.4 GB, duration: 45s" },
  { action: "User Role Changed", user: "John Doe", role: "Super Admin", ip: "192.168.1.1", time: "Yesterday", type: "security", severity: "warning", details: "Lisa Chen: Coordinator → Admin" },
  { action: "Email Service Degraded", user: "System", role: "Monitoring", ip: "—", time: "Yesterday", type: "system", severity: "error", details: "SMTP latency >300ms, investigating" },
  { action: "Organization Deleted", user: "John Doe", role: "Super Admin", ip: "192.168.1.1", time: "2 days ago", type: "delete", severity: "error", details: "Deleted: Test Organization (confirmed)" },
  { action: "Cron Job Completed", user: "System", role: "System", ip: "—", time: "2 days ago", type: "system", severity: "info", details: "Daily stats aggregation: 3.2s" },
  { action: "SSL Certificate Renewed", user: "System", role: "System", ip: "—", time: "3 days ago", type: "system", severity: "info", details: "*.kickoff.app - valid until Mar 2027" },
];

const typeIcons: Record<string, { icon: typeof Clock; bg: string }> = {
  auth: { icon: User, bg: "bg-info/10 text-info" },
  create: { icon: Database, bg: "bg-secondary/10 text-secondary" },
  update: { icon: RefreshCw, bg: "bg-accent/10 text-accent" },
  billing: { icon: CreditCard, bg: "bg-accent/10 text-accent" },
  security: { icon: Shield, bg: "bg-destructive/10 text-destructive" },
  system: { icon: Server, bg: "bg-muted text-muted-foreground" },
  delete: { icon: Trash2, bg: "bg-destructive/10 text-destructive" },
  warning: { icon: AlertTriangle, bg: "bg-accent/10 text-accent" },
};

const severityColors: Record<string, string> = {
  info: "bg-info/10 text-info",
  warning: "bg-accent/10 text-accent",
  error: "bg-destructive/10 text-destructive",
};

const logTabs = ["All Logs", "Security", "System", "Billing", "User Actions"];

export default function SystemLogsPage() {
  const [activeTab, setActiveTab] = useState("All Logs");

  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">System Logs</h1>
          <p className="text-muted-foreground">Platform activity, security events, and system monitoring</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Export</Button>
          <Button variant="outline" size="sm"><RefreshCw className="h-4 w-4 mr-1" />Refresh</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Events (24h)" value="1,248" icon={Zap} />
        <StatCard title="Security Events" value={18} change="3 critical" changeType="negative" icon={Shield} />
        <StatCard title="System Events" value={42} icon={Server} />
        <StatCard title="Errors" value={4} change="-2 from yesterday" changeType="positive" icon={AlertTriangle} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b">
        {logTabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? "border-secondary text-secondary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search logs by action, user, IP..." className="h-10 w-full rounded-lg border bg-card pl-10 pr-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
        </div>
        {["Severity", "Date Range", "User"].map((f) => (
          <button key={f} className="h-10 px-4 rounded-lg border bg-card text-sm text-muted-foreground hover:bg-muted transition-colors flex items-center gap-2">
            <Filter className="h-3.5 w-3.5" />{f}
          </button>
        ))}
      </div>

      {/* Logs Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="data-table-header px-4 py-3 text-center w-10">Sev.</th>
                <th className="data-table-header px-4 py-3 text-left">Action</th>
                <th className="data-table-header px-4 py-3 text-left hidden md:table-cell">User</th>
                <th className="data-table-header px-4 py-3 text-left hidden lg:table-cell">Details</th>
                <th className="data-table-header px-4 py-3 text-left hidden xl:table-cell">IP Address</th>
                <th className="data-table-header px-4 py-3 text-right">Time</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((l, i) => {
                const tc = typeIcons[l.type];
                const Icon = tc.icon;
                return (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="px-4 py-3 text-center">
                      <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${severityColors[l.severity]}`}>
                        {l.severity === "error" ? "!" : l.severity === "warning" ? "⚠" : "i"}
                      </span>
                    </td>
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
                    <td className="px-4 py-3 text-sm text-muted-foreground hidden lg:table-cell max-w-[250px] truncate">{l.details}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono hidden xl:table-cell">{l.ip}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground text-right whitespace-nowrap">{l.time}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30">
          <span className="text-xs text-muted-foreground">Showing 1-{logs.length} of 1,248 events</span>
          <div className="flex gap-1">
            {[1, 2, 3, "...", 84].map((p, i) => (
              <button key={i} className={`h-8 w-8 rounded text-xs font-medium transition-colors ${p === 1 ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
