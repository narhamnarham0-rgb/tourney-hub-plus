import { StatCard } from "@/components/dashboard/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Building2, Trophy, Users, CreditCard, TrendingUp, Server, Activity, Globe } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

const revenueData = [
  { month: "Jan", revenue: 8400 }, { month: "Feb", revenue: 9200 }, { month: "Mar", revenue: 10800 },
  { month: "Apr", revenue: 11400 }, { month: "May", revenue: 12100 }, { month: "Jun", revenue: 12400 },
];

const signupData = [
  { month: "Jan", orgs: 12 }, { month: "Feb", orgs: 18 }, { month: "Mar", orgs: 15 },
  { month: "Apr", orgs: 22 }, { month: "May", orgs: 28 }, { month: "Jun", orgs: 24 },
];

const planDistribution = [
  { name: "Enterprise", value: 15, color: "hsl(var(--secondary))" },
  { name: "Pro", value: 42, color: "hsl(var(--info))" },
  { name: "Starter", value: 28, color: "hsl(var(--accent))" },
  { name: "Free", value: 15, color: "hsl(var(--muted-foreground))" },
];

const recentActivity = [
  { action: "New organization registered", org: "Copa Regional", time: "2 min ago" },
  { action: "Subscription upgraded", org: "Asian Cup Org", time: "15 min ago" },
  { action: "Tournament created", org: "City Football Association", time: "1 hour ago" },
  { action: "Payment received", org: "National Youth League", time: "2 hours ago" },
  { action: "Support ticket opened", org: "Euro Futsal Network", time: "3 hours ago" },
];

export default function SuperAdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Platform Overview</h1>
        <p className="text-muted-foreground">Super Admin · Real-time platform metrics</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Organizations" value={100} change="+12 this month" changeType="positive" icon={Building2} />
        <StatCard title="Active Tournaments" value={45} change="+5 this week" changeType="positive" icon={Trophy} />
        <StatCard title="Total Players" value="12.4K" change="+340 this week" changeType="positive" icon={Users} />
        <StatCard title="MRR" value="$24.8K" change="+18% MoM" changeType="positive" icon={CreditCard} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="API Requests (24h)" value="1.2M" icon={Activity} />
        <StatCard title="Uptime" value="99.98%" icon={Server} />
        <StatCard title="Countries" value={120} icon={Globe} />
        <StatCard title="Conversion Rate" value="12.4%" change="+2.1%" changeType="positive" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `$${v / 1000}k`} />
              <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.15} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Signups Chart */}
        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">New Organizations</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={signupData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="orgs" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Plan Distribution */}
        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Plan Distribution</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={planDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {planDistribution.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-3 mt-2 justify-center">
            {planDistribution.map((p) => (
              <span key={p.name} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />{p.name}
              </span>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-0">
            {recentActivity.map((a, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="text-sm font-medium">{a.action}</p>
                  <p className="text-xs text-muted-foreground">{a.org}</p>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap ml-4">{a.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
