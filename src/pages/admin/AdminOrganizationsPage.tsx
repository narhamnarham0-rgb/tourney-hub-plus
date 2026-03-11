import { useState } from "react";
import { Search, Filter, MoreHorizontal, Plus, Download, ArrowUpRight, Building2, Globe, Users, CreditCard } from "lucide-react";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/dashboard/StatCard";

const orgs = [
  { name: "City Football Association", country: "USA", city: "New York", tournaments: 5, users: 12, players: 960, plan: "Enterprise", mrr: "$199", status: "active" as const, joined: "Jan 2024" },
  { name: "National Youth League", country: "UK", city: "London", tournaments: 3, users: 8, players: 480, plan: "Pro", mrr: "$79", status: "active" as const, joined: "Mar 2024" },
  { name: "Copa Regional", country: "Brazil", city: "São Paulo", tournaments: 2, users: 5, players: 320, plan: "Pro", mrr: "$79", status: "active" as const, joined: "Jun 2024" },
  { name: "Euro Futsal Network", country: "Germany", city: "Berlin", tournaments: 1, users: 3, players: 120, plan: "Starter", mrr: "$0", status: "inactive" as const, joined: "Sep 2024" },
  { name: "Asian Cup Organization", country: "Japan", city: "Tokyo", tournaments: 4, users: 10, players: 640, plan: "Enterprise", mrr: "$199", status: "active" as const, joined: "Nov 2024" },
  { name: "Africa Champions League", country: "Nigeria", city: "Lagos", tournaments: 3, users: 7, players: 384, plan: "Pro", mrr: "$79", status: "active" as const, joined: "Jan 2025" },
  { name: "Oceania Football Fed.", country: "Australia", city: "Sydney", tournaments: 2, users: 6, players: 240, plan: "Pro", mrr: "$79", status: "active" as const, joined: "Feb 2025" },
  { name: "Nordic League Hub", country: "Sweden", city: "Stockholm", tournaments: 1, users: 4, players: 180, plan: "Starter", mrr: "$29", status: "active" as const, joined: "Mar 2025" },
  { name: "CONCACAF Youth", country: "Mexico", city: "Mexico City", tournaments: 2, users: 5, players: 320, plan: "Pro", mrr: "$79", status: "active" as const, joined: "Mar 2025" },
  { name: "Balkan Football Org", country: "Serbia", city: "Belgrade", tournaments: 0, users: 2, players: 0, plan: "Free", mrr: "$0", status: "draft" as const, joined: "Mar 2026" },
];

const tabs = ["All Organizations", "Active", "Inactive", "Trial", "Enterprise"];

export default function AdminOrganizationsPage() {
  const [activeTab, setActiveTab] = useState("All Organizations");

  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Organization Management</h1>
          <p className="text-muted-foreground">{orgs.length} registered organizations</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" />Export</Button>
          <Button variant="success" size="sm"><Plus className="h-4 w-4 mr-1" />Add Organization</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Organizations" value={orgs.length} icon={Building2} />
        <StatCard title="Active" value={orgs.filter(o => o.status === "active").length} change={`${Math.round(orgs.filter(o => o.status === "active").length / orgs.length * 100)}%`} changeType="positive" icon={Globe} />
        <StatCard title="Total Users" value={orgs.reduce((a, o) => a + o.users, 0)} icon={Users} />
        <StatCard title="Total MRR" value={`$${orgs.reduce((a, o) => a + parseInt(o.mrr.replace("$", "") || "0"), 0)}`} icon={CreditCard} />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? "border-secondary text-secondary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {tab}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input type="text" placeholder="Search organizations by name, country..." className="h-10 w-full rounded-lg border bg-card pl-10 pr-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
        </div>
        {["Country", "Plan", "Status"].map((f) => (
          <button key={f} className="h-10 px-4 rounded-lg border bg-card text-sm text-muted-foreground hover:bg-muted transition-colors flex items-center gap-2">
            <Filter className="h-3.5 w-3.5" />{f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="data-table-header px-4 py-3 text-left">Organization Name</th>
                <th className="data-table-header px-4 py-3 text-left hidden md:table-cell">Country</th>
                <th className="data-table-header px-4 py-3 text-center">Active Tournaments</th>
                <th className="data-table-header px-4 py-3 text-center hidden sm:table-cell">Users</th>
                <th className="data-table-header px-4 py-3 text-center hidden lg:table-cell">Subscription Plan</th>
                <th className="data-table-header px-4 py-3 text-center hidden xl:table-cell">MRR</th>
                <th className="data-table-header px-4 py-3 text-center">Status</th>
                <th className="data-table-header px-4 py-3 text-center w-10"></th>
              </tr>
            </thead>
            <tbody>
              {orgs.map((o, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-xs font-bold shrink-0">
                        {o.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                      </div>
                      <div>
                        <span className="font-medium text-sm">{o.name}</span>
                        <p className="text-xs text-muted-foreground">Joined {o.joined}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 hidden md:table-cell">
                    <div>
                      <span className="text-sm">{o.country}</span>
                      <p className="text-xs text-muted-foreground">{o.city}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-center font-medium">{o.tournaments}</td>
                  <td className="px-4 py-3.5 text-sm text-center hidden sm:table-cell">{o.users}</td>
                  <td className="px-4 py-3.5 text-center hidden lg:table-cell">
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      o.plan === "Enterprise" ? "bg-secondary/10 text-secondary" :
                      o.plan === "Pro" ? "bg-info/10 text-info" :
                      o.plan === "Starter" ? "bg-accent/10 text-accent" :
                      "bg-muted text-muted-foreground"
                    }`}>{o.plan}</span>
                  </td>
                  <td className="px-4 py-3.5 text-sm text-center font-medium hidden xl:table-cell">{o.mrr}</td>
                  <td className="px-4 py-3.5 text-center"><StatusBadge status={o.status} /></td>
                  <td className="px-4 py-3.5 text-center">
                    <button className="text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 border-t bg-muted/30">
          <span className="text-xs text-muted-foreground">Showing 1-{orgs.length} of {orgs.length} organizations</span>
          <div className="flex gap-1">
            {[1, 2, 3].map((p) => (
              <button key={p} className={`h-8 w-8 rounded text-xs font-medium transition-colors ${p === 1 ? "bg-secondary text-secondary-foreground" : "hover:bg-muted"}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
