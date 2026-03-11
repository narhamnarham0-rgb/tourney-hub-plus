import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Building2, Trophy, Users, Swords, CreditCard, TrendingUp, Server, Activity, Globe, AlertCircle, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Link } from "react-router-dom";

const revenueData = [
  { month: "Jan", revenue: 8400, expenses: 3200 },
  { month: "Feb", revenue: 9200, expenses: 3400 },
  { month: "Mar", revenue: 10800, expenses: 3600 },
  { month: "Apr", revenue: 11400, expenses: 3800 },
  { month: "May", revenue: 12100, expenses: 3900 },
  { month: "Jun", revenue: 12400, expenses: 4000 },
];

const signupData = [
  { month: "Jan", orgs: 12, churn: 2 },
  { month: "Feb", orgs: 18, churn: 3 },
  { month: "Mar", orgs: 15, churn: 1 },
  { month: "Apr", orgs: 22, churn: 4 },
  { month: "May", orgs: 28, churn: 2 },
  { month: "Jun", orgs: 24, churn: 3 },
];

const planDistribution = [
  { name: "Enterprise", value: 15, color: "hsl(var(--secondary))" },
  { name: "Pro", value: 42, color: "hsl(var(--info))" },
  { name: "Starter", value: 28, color: "hsl(var(--accent))" },
  { name: "Free", value: 15, color: "hsl(var(--muted-foreground))" },
];

const recentOrgs = [
  { name: "Copa Regional", country: "Brazil", plan: "Pro", status: "active" as const, tournaments: 2, users: 5 },
  { name: "Asian Cup Org", country: "Japan", plan: "Enterprise", status: "active" as const, tournaments: 4, users: 10 },
  { name: "Euro Futsal", country: "Germany", plan: "Starter", status: "inactive" as const, tournaments: 1, users: 3 },
  { name: "City Football Assoc.", country: "USA", plan: "Enterprise", status: "active" as const, tournaments: 5, users: 12 },
  { name: "National Youth League", country: "UK", plan: "Pro", status: "active" as const, tournaments: 3, users: 8 },
];

const recentActivity = [
  { action: "New organization registered", org: "Copa Regional", time: "2 min ago", type: "create" },
  { action: "Subscription upgraded to Enterprise", org: "Asian Cup Org", time: "15 min ago", type: "billing" },
  { action: "Tournament created: Summer Cup", org: "City Football Assoc.", time: "1 hour ago", type: "create" },
  { action: "Payment received: $199.00", org: "National Youth League", time: "2 hours ago", type: "billing" },
  { action: "Support ticket #1248 opened", org: "Euro Futsal", time: "3 hours ago", type: "support" },
  { action: "API rate limit warning", org: "Asian Cup Org", time: "4 hours ago", type: "warning" },
];

const activityColors: Record<string, string> = {
  create: "bg-secondary/10 text-secondary",
  billing: "bg-accent/10 text-accent",
  support: "bg-info/10 text-info",
  warning: "bg-destructive/10 text-destructive",
};

const systemHealth = [
  { name: "API Server", status: "Operational", uptime: "99.99%", latency: "42ms" },
  { name: "Database", status: "Operational", uptime: "99.98%", latency: "8ms" },
  { name: "CDN", status: "Operational", uptime: "100%", latency: "12ms" },
  { name: "Email Service", status: "Degraded", uptime: "99.2%", latency: "340ms" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Platform Overview</h1>
          <p className="text-muted-foreground">Super Admin · Real-time platform metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Last updated: 2 min ago</span>
          <div className="h-2 w-2 rounded-full bg-secondary animate-pulse-live" />
        </div>
      </div>

      {/* Primary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Organizations" value={100} change="+12 this month" changeType="positive" icon={Building2} />
        <StatCard title="Active Tournaments" value={45} change="+5 this week" changeType="positive" icon={Trophy} />
        <StatCard title="Total Players" value="12.4K" change="+340 this week" changeType="positive" icon={Users} />
        <StatCard title="Matches Played" value="3,842" change="+86 today" changeType="positive" icon={Swords} />
      </div>

      {/* Secondary KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Monthly Revenue" value="$24.8K" change="+18% MoM" changeType="positive" icon={CreditCard} iconColor="bg-accent/10" />
        <StatCard title="API Requests (24h)" value="1.2M" change="Normal load" changeType="neutral" icon={Activity} />
        <StatCard title="Platform Uptime" value="99.98%" icon={Server} />
        <StatCard title="Conversion Rate" value="12.4%" change="+2.1%" changeType="positive" icon={TrendingUp} />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Revenue & Expenses</h3>
            <select className="text-xs border rounded-md px-2 py-1 bg-background outline-none">
              <option>Last 6 months</option>
              <option>Last 12 months</option>
              <option>This year</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, ""]} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.12} strokeWidth={2} name="Revenue" />
              <Area type="monotone" dataKey="expenses" stroke="hsl(var(--destructive))" fill="hsl(var(--destructive))" fillOpacity={0.08} strokeWidth={2} name="Expenses" />
            </AreaChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-secondary" />Revenue</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" />Expenses</span>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">New Organizations vs Churn</h3>
            <select className="text-xs border rounded-md px-2 py-1 bg-background outline-none">
              <option>Last 6 months</option>
              <option>Last 12 months</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={signupData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="orgs" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} name="New Orgs" />
              <Bar dataKey="churn" fill="hsl(var(--destructive))" radius={[4, 4, 0, 0]} name="Churned" />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 justify-center text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-secondary" />New Signups</span>
            <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-destructive" />Churn</span>
          </div>
        </div>
      </div>

      {/* Organizations Table + Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Organizations Table */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Organizations</h3>
            <Link to="/admin/organizations" className="text-sm text-secondary font-medium hover:underline flex items-center gap-1">
              View all <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="data-table-header px-4 py-3 text-left">Organization</th>
                    <th className="data-table-header px-4 py-3 text-left hidden md:table-cell">Country</th>
                    <th className="data-table-header px-4 py-3 text-center">Tournaments</th>
                    <th className="data-table-header px-4 py-3 text-center hidden sm:table-cell">Users</th>
                    <th className="data-table-header px-4 py-3 text-center hidden lg:table-cell">Plan</th>
                    <th className="data-table-header px-4 py-3 text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrgs.map((o, i) => (
                    <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                            {o.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                          </div>
                          <span className="font-medium text-sm">{o.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{o.country}</td>
                      <td className="px-4 py-3 text-sm text-center font-medium">{o.tournaments}</td>
                      <td className="px-4 py-3 text-sm text-center hidden sm:table-cell">{o.users}</td>
                      <td className="px-4 py-3 text-center hidden lg:table-cell">
                        <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-0.5 rounded">{o.plan}</span>
                      </td>
                      <td className="px-4 py-3 text-center"><StatusBadge status={o.status} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Plan Distribution */}
          <div className="bg-card rounded-lg border p-5">
            <h3 className="font-semibold mb-3">Plan Distribution</h3>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie data={planDistribution} cx="50%" cy="50%" innerRadius={40} outerRadius={65} paddingAngle={4} dataKey="value">
                  {planDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap gap-3 mt-1 justify-center">
              {planDistribution.map((p) => (
                <span key={p.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />{p.name} ({p.value})
                </span>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="bg-card rounded-lg border p-5">
            <h3 className="font-semibold mb-3">System Health</h3>
            <div className="space-y-2.5">
              {systemHealth.map((s) => (
                <div key={s.name} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${s.status === "Operational" ? "bg-secondary" : "bg-accent animate-pulse-live"}`} />
                    <span className="text-sm font-medium">{s.name}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium ${s.status === "Operational" ? "text-secondary" : "text-accent"}`}>{s.status}</span>
                    <p className="text-[10px] text-muted-foreground">{s.latency} · {s.uptime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Activity Feed */}
      <div className="bg-card rounded-lg border p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Recent Activity</h3>
          <Link to="/admin/system-logs" className="text-sm text-secondary font-medium hover:underline flex items-center gap-1">
            View all logs <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="space-y-0">
          {recentActivity.map((a, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
              <div className="flex items-center gap-3">
                <div className={`h-2 w-2 rounded-full shrink-0 ${a.type === "warning" ? "bg-destructive" : a.type === "billing" ? "bg-accent" : a.type === "support" ? "bg-info" : "bg-secondary"}`} />
                <div>
                  <p className="text-sm font-medium">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.org}</p>
                </div>
              </div>
              <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
