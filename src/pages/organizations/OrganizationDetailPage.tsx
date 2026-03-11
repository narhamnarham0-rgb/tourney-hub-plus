import { ArrowLeft, MapPin, Users, Trophy, Calendar, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";

export default function OrganizationDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Link to="/organizations" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-5 w-5" /></Link>
        <span className="text-sm text-muted-foreground">Organizations</span>
      </div>

      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          <div className="h-16 w-16 rounded-xl bg-primary-foreground/10 flex items-center justify-center text-2xl font-black">CF</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold">City Football Association</h1>
              <StatusBadge status="active" />
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />New York, USA</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Since 2019</span>
              <span className="flex items-center gap-1"><Users className="h-4 w-4" />12 Users</span>
              <span className="bg-primary-foreground/10 px-2 py-0.5 rounded text-xs font-medium">Enterprise Plan</span>
            </div>
          </div>
          <Button variant="accent" size="sm"><Settings className="h-4 w-4 mr-1" />Manage</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Active Tournaments" value={5} icon={Trophy} />
        <StatCard title="Total Teams" value={48} icon={Users} />
        <StatCard title="Total Players" value={960} icon={Users} />
        <StatCard title="Subscription" value="$199/mo" icon={Settings} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="px-5 py-3 border-b bg-muted/50">
            <h3 className="font-semibold">Active Tournaments</h3>
          </div>
          <div className="divide-y">
            {[
              { name: "Premier Cup 2026", teams: 8, status: "active" as const },
              { name: "City League Season 8", teams: 12, status: "active" as const },
              { name: "Youth Championship", teams: 24, status: "upcoming" as const },
              { name: "Summer Invitational", teams: 8, status: "draft" as const },
              { name: "Women's Cup 2026", teams: 10, status: "active" as const },
            ].map((t, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors cursor-pointer">
                <div>
                  <p className="text-sm font-medium">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.teams} teams</p>
                </div>
                <StatusBadge status={t.status} />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="px-5 py-3 border-b bg-muted/50">
            <h3 className="font-semibold">Team Members</h3>
          </div>
          <div className="divide-y">
            {[
              { name: "Sarah Connor", role: "Admin", email: "sarah@cityfootball.com" },
              { name: "John Doe", role: "Manager", email: "john@cityfootball.com" },
              { name: "Lisa Chen", role: "Coordinator", email: "lisa@cityfootball.com" },
              { name: "Mike Lee", role: "Referee Manager", email: "mike@cityfootball.com" },
            ].map((u, i) => (
              <div key={i} className="flex items-center justify-between px-5 py-3 hover:bg-muted/30 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-bold">{u.name.split(" ").map(n => n[0]).join("")}</div>
                  <div>
                    <p className="text-sm font-medium">{u.name}</p>
                    <p className="text-xs text-muted-foreground">{u.email}</p>
                  </div>
                </div>
                <span className="text-xs font-medium bg-muted px-2 py-0.5 rounded">{u.role}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
