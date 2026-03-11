import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { Building2, Trophy, Users, CreditCard } from "lucide-react";

const orgs = [
  { name: "City Football Association", country: "USA", tournaments: 5, users: 12, plan: "Enterprise", status: "active" as const },
  { name: "National Youth League", country: "UK", tournaments: 3, users: 8, plan: "Pro", status: "active" as const },
  { name: "Copa Regional", country: "Brazil", tournaments: 2, users: 5, plan: "Pro", status: "active" as const },
  { name: "Euro Futsal Network", country: "Germany", tournaments: 1, users: 3, plan: "Starter", status: "inactive" as const },
  { name: "Asian Cup Org", country: "Japan", tournaments: 4, users: 10, plan: "Enterprise", status: "active" as const },
];

export default function OrganizationsPage() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Organizations</h1>
        <p className="text-muted-foreground">Platform-wide organization management</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Organizations" value={orgs.length} icon={Building2} />
        <StatCard title="Active Tournaments" value={15} icon={Trophy} />
        <StatCard title="Registered Players" value="2,340" icon={Users} />
        <StatCard title="Revenue (MRR)" value="$12.4K" change="+18%" changeType="positive" icon={CreditCard} />
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
              {orgs.map((o, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-xs font-bold">{o.name.split(" ").map(n => n[0]).join("").slice(0, 2)}</div>
                      <span className="font-medium text-sm">{o.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden md:table-cell">{o.country}</td>
                  <td className="px-4 py-3 text-sm text-center">{o.tournaments}</td>
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
  );
}
