import { StatCard } from "@/components/dashboard/StatCard";
import { TrendingUp, Users, Globe, Swords, Trophy, CreditCard, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line } from "recharts";

const userGrowth = [
  { month: "Jul", users: 6200 }, { month: "Aug", users: 7100 }, { month: "Sep", users: 8400 },
  { month: "Oct", users: 9200 }, { month: "Nov", users: 10100 }, { month: "Dec", users: 10800 },
  { month: "Jan", users: 11200 }, { month: "Feb", users: 11800 }, { month: "Mar", users: 12400 },
];

const matchesPerMonth = [
  { month: "Jul", matches: 280 }, { month: "Aug", matches: 340 }, { month: "Sep", matches: 420 },
  { month: "Oct", matches: 510 }, { month: "Nov", matches: 380 }, { month: "Dec", matches: 290 },
  { month: "Jan", matches: 350 }, { month: "Feb", matches: 460 }, { month: "Mar", matches: 540 },
];

const revenueByPlan = [
  { plan: "Enterprise", revenue: 5970, count: 15 },
  { plan: "Pro", revenue: 6636, count: 42 },
  { plan: "Starter", revenue: 1624, count: 28 },
  { plan: "Free", revenue: 0, count: 15 },
];

const topCountries = [
  { country: "USA", orgs: 22, players: 3200, color: "hsl(var(--secondary))" },
  { country: "UK", orgs: 15, players: 2100, color: "hsl(var(--info))" },
  { country: "Brazil", orgs: 12, players: 1800, color: "hsl(var(--accent))" },
  { country: "Germany", orgs: 10, players: 1500, color: "hsl(var(--destructive))" },
  { country: "Japan", orgs: 8, players: 1200, color: "hsl(var(--muted-foreground))" },
];

const engagementData = [
  { day: "Mon", dau: 3200 }, { day: "Tue", dau: 3800 }, { day: "Wed", dau: 4100 },
  { day: "Thu", dau: 3900 }, { day: "Fri", dau: 4500 }, { day: "Sat", dau: 5200 },
  { day: "Sun", dau: 4800 },
];

const conversionFunnel = [
  { stage: "Visitors", value: 10000 },
  { stage: "Signups", value: 2400 },
  { stage: "Activated", value: 1800 },
  { stage: "Subscribed", value: 850 },
  { stage: "Retained (3mo)", value: 680 },
];

export default function AdminAnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Platform Analytics</h1>
          <p className="text-muted-foreground">Growth metrics, engagement, and business intelligence</p>
        </div>
        <select className="h-9 px-3 rounded-lg border bg-card text-sm outline-none">
          <option>Last 9 months</option>
          <option>Last 6 months</option>
          <option>Last 12 months</option>
          <option>This year</option>
        </select>
      </div>

      {/* KPIs with comparison */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-muted-foreground">Total Users</p>
            <Users className="h-4 w-4 text-secondary" />
          </div>
          <p className="text-2xl font-bold">12,400</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-success font-medium">
            <ArrowUpRight className="h-3 w-3" />+14.8% vs last period
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-muted-foreground">Monthly Active Users</p>
            <TrendingUp className="h-4 w-4 text-info" />
          </div>
          <p className="text-2xl font-bold">4,800</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-success font-medium">
            <ArrowUpRight className="h-3 w-3" />+8.2% vs last period
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-muted-foreground">Avg. Revenue Per Org</p>
            <CreditCard className="h-4 w-4 text-accent" />
          </div>
          <p className="text-2xl font-bold">$142</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-success font-medium">
            <ArrowUpRight className="h-3 w-3" />+5.1% vs last period
          </div>
        </div>
        <div className="stat-card">
          <div className="flex items-center justify-between mb-1">
            <p className="text-sm text-muted-foreground">Churn Rate</p>
            <ArrowDownRight className="h-4 w-4 text-destructive" />
          </div>
          <p className="text-2xl font-bold">3.2%</p>
          <div className="flex items-center gap-1 mt-1 text-xs text-success font-medium">
            <ArrowDownRight className="h-3 w-3" />-0.8% vs last period
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">User Growth</h3>
          <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={userGrowth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `${v / 1000}k`} />
              <Tooltip formatter={(v: number) => [v.toLocaleString(), "Users"]} />
              <Area type="monotone" dataKey="users" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.12} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Matches Played per Month</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={matchesPerMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip />
              <Bar dataKey="matches" fill="hsl(var(--info))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Daily Active Users (This Week)</h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={engagementData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={v => `${v / 1000}k`} />
              <Tooltip formatter={(v: number) => [v.toLocaleString(), "DAU"]} />
              <Line type="monotone" dataKey="dau" stroke="hsl(var(--accent))" strokeWidth={2.5} dot={{ fill: "hsl(var(--accent))", r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Revenue by Plan</h3>
          <div className="space-y-3">
            {revenueByPlan.map((p) => {
              const maxRevenue = Math.max(...revenueByPlan.map(r => r.revenue));
              return (
                <div key={p.plan}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{p.plan}</span>
                      <span className="text-xs text-muted-foreground">({p.count} orgs)</span>
                    </div>
                    <span className="font-bold">${p.revenue.toLocaleString()}</span>
                  </div>
                  <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full bg-secondary transition-all" style={{ width: maxRevenue ? `${(p.revenue / maxRevenue) * 100}%` : "0%" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Countries */}
        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Top Countries</h3>
          <div className="space-y-3">
            {topCountries.map((c, i) => (
              <div key={c.country} className="flex items-center justify-between py-2 border-b last:border-0">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-muted-foreground w-5">{i + 1}</span>
                  <div className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: `${c.color}15`, color: c.color }}>
                    {c.country.slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{c.country}</p>
                    <p className="text-xs text-muted-foreground">{c.orgs} organizations</p>
                  </div>
                </div>
                <span className="text-sm font-bold">{c.players.toLocaleString()} players</span>
              </div>
            ))}
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-card rounded-lg border p-5">
          <h3 className="font-semibold mb-4">Conversion Funnel</h3>
          <div className="space-y-3">
            {conversionFunnel.map((stage, i) => {
              const maxVal = conversionFunnel[0].value;
              const prevVal = i > 0 ? conversionFunnel[i - 1].value : stage.value;
              const convRate = i > 0 ? ((stage.value / prevVal) * 100).toFixed(0) : "100";
              return (
                <div key={stage.stage}>
                  <div className="flex items-center justify-between text-sm mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{stage.stage}</span>
                      {i > 0 && <span className="text-xs text-muted-foreground">({convRate}% from prev.)</span>}
                    </div>
                    <span className="font-bold">{stage.value.toLocaleString()}</span>
                  </div>
                  <div className="h-3 rounded-full bg-muted overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{
                      width: `${(stage.value / maxVal) * 100}%`,
                      background: `hsl(${142 - i * 25}, ${70 - i * 5}%, ${30 + i * 5}%)`
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
