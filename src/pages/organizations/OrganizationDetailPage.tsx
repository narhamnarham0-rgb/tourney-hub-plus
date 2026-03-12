import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Building2,
  Calendar,
  CalendarPlus,
  ChevronRight,
  Clock,
  CreditCard,
  ExternalLink,
  Facebook,
  Globe,
  Instagram,
  Mail,
  MapPin,
  MoreVertical,
  Phone,
  Search,
  Settings,
  Shield,
  Swords,
  Trophy,
  Twitter,
  UserPlus,
  Users,
  FileText,
  Activity,
} from "lucide-react";
import { Link, useLocation, useParams } from "react-router-dom";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { StatCard } from "@/components/dashboard/StatCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { organizationsService, Organization, OrganizationMember, MemberStatus } from "@/lib/organizations";

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0] ?? "")
    .join("")
    .slice(0, 2)
    .toUpperCase();

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
const fmtDateTime = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

const memberStatusBadge = (status: MemberStatus) => {
  if (status === "active") return <Badge className="rounded-2xl font-black text-[10px] uppercase tracking-widest bg-success/15 text-success border border-success/20">Active</Badge>;
  if (status === "invited") return <Badge variant="outline" className="rounded-2xl font-black text-[10px] uppercase tracking-widest">Invited</Badge>;
  return <Badge className="rounded-2xl font-black text-[10px] uppercase tracking-widest bg-destructive/10 text-destructive border border-destructive/20">Suspended</Badge>;
};

const activityIcon = (type: string) => {
  switch (type) {
    case "tournament_created": return <Trophy className="h-4 w-4 text-secondary" />;
    case "member_joined": return <UserPlus className="h-4 w-4 text-info" />;
    case "match_completed": return <Swords className="h-4 w-4 text-accent" />;
    case "team_registered": return <Users className="h-4 w-4 text-primary" />;
    case "setting_changed": return <Settings className="h-4 w-4 text-muted-foreground" />;
    default: return <Activity className="h-4 w-4 text-muted-foreground" />;
  }
};

const quickActions = [
  { label: "Create Tournament", icon: Trophy, color: "bg-secondary/10 text-secondary" },
  { label: "Register Team", icon: Users, color: "bg-info/10 text-info" },
  { label: "Invite Member", icon: UserPlus, color: "bg-primary/10 text-primary" },
  { label: "View Schedule", icon: CalendarPlus, color: "bg-accent/10 text-accent" },
  { label: "Generate Report", icon: FileText, color: "bg-muted-foreground/10 text-muted-foreground" },
  { label: "Manage Subscription", icon: CreditCard, color: "bg-destructive/10 text-destructive" },
];

export default function OrganizationDetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);

  const initialTab = useMemo(() => {
    const tab = params.get("tab");
    if (tab === "members" || tab === "metadata" || tab === "overview") return tab;
    return "overview";
  }, [params]);

  const [activeTab, setActiveTab] = useState<"overview" | "members" | "metadata">(initialTab);
  const [memberSearch, setMemberSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<OrganizationMember["role"] | "all">("all");

  const orgQuery = useQuery({
    queryKey: ["organizations", "detail", id],
    queryFn: async () => {
      if (!id) return null;
      return organizationsService.getById(id);
    },
    enabled: !!id,
    retry: false,
    staleTime: 15000,
  });

  const org = orgQuery.data;

  const filteredMembers = useMemo(() => {
    if (!org) return [];
    const s = memberSearch.trim().toLowerCase();
    return org.members.filter((m) => {
      const matchSearch = !s || m.name.toLowerCase().includes(s) || m.email.toLowerCase().includes(s) || m.role.toLowerCase().includes(s);
      const matchRole = roleFilter === "all" || m.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [memberSearch, org, roleFilter]);

  if (!id) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
        <div className="bg-card rounded-3xl border p-8 text-center">
          <div className="text-xl font-black">Organization ID is missing</div>
          <div className="text-sm text-muted-foreground mt-2">Please open the detail page from the Organizations list.</div>
          <div className="mt-6">
            <Link to="/organizations" className="inline-flex h-12 min-h-[48px] items-center justify-center rounded-2xl px-5 font-black bg-secondary text-secondary-foreground">
              Back to organizations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (orgQuery.isLoading) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto pb-10 animate-in fade-in duration-300">
        <div className="flex items-center gap-3">
          <Skeleton className="h-11 w-11 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-64 rounded" />
            <Skeleton className="h-4 w-80 rounded" />
          </div>
        </div>
        <Skeleton className="h-[220px] w-full rounded-3xl" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[80px] rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-[520px] w-full rounded-3xl" />
      </div>
    );
  }

  if (orgQuery.isError) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
        <div className="bg-destructive/5 border border-destructive/10 rounded-3xl p-8 text-center" role="alert" aria-label="Failed to load organization">
          <div className="text-xl font-black text-destructive">Failed to load organization</div>
          <div className="text-sm text-muted-foreground mt-2">Please try again.</div>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Button className="h-11 rounded-2xl font-black" variant="secondary" onClick={() => orgQuery.refetch()}>
              Retry
            </Button>
            <Button variant="outline" className="h-11 rounded-2xl font-bold" asChild>
              <Link to="/organizations">Back</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!org) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
        <div className="bg-card rounded-3xl border p-8 text-center" role="alert" aria-label="Organization not found">
          <div className="text-xl font-black">Organization not found</div>
          <div className="text-sm text-muted-foreground mt-2">The organization ID is invalid or the record no longer exists.</div>
          <div className="mt-6">
            <Link to="/organizations" className="inline-flex h-12 min-h-[48px] items-center justify-center rounded-2xl px-5 font-black bg-secondary text-secondary-foreground">
              Back to organizations
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/organizations">
            <Button variant="ghost" size="icon" className="h-11 w-11 rounded-2xl hover:bg-muted transition-colors" aria-label="Back to organizations">
              <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            </Button>
          </Link>
          <div className="space-y-0.5">
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">Organization Detail</h1>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest">
              <Link to="/organizations" className="hover:text-secondary transition-colors">Organizations</Link>
              <ChevronRight className="h-3 w-3" aria-hidden="true" />
              <span className="text-foreground">{org.name}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-11 rounded-2xl font-bold gap-2 hidden sm:inline-flex" asChild>
            <a href={org.metadata.website} target="_blank" rel="noreferrer">
              <ExternalLink className="h-4 w-4 text-secondary" aria-hidden="true" /> Website
            </a>
          </Button>
          <Button className="h-11 rounded-2xl font-black gap-2" variant="secondary">
            <Settings className="h-4 w-4" aria-hidden="true" /> Manage
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="h-11 w-11 rounded-2xl" aria-label="Organization actions">
                <MoreVertical className="h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[210px]">
              <DropdownMenuLabel>Quick Actions</DropdownMenuLabel>
              <DropdownMenuItem className="cursor-pointer">Invite member</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">Edit profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">Manage subscription</DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">Deactivate organization</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.22 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-secondary/60 rounded-3xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity" />
        <div className="relative bg-gradient-primary rounded-3xl p-6 sm:p-8 text-primary-foreground overflow-hidden border border-sidebar-border">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <Building2 className="h-64 w-64 -rotate-12" aria-hidden="true" />
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-6 lg:items-end lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-3xl bg-primary-foreground/10 border border-white/10 flex items-center justify-center text-lg sm:text-2xl font-black">
                {org.shortName}
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="text-2xl sm:text-3xl font-black tracking-tight">{org.name}</div>
                  <StatusBadge status={org.status} />
                  <Badge variant="outline" className="border-white/20 text-white/80 font-black text-[10px] uppercase tracking-widest">
                    {org.plan} Plan
                  </Badge>
                </div>
                <p className="text-sm text-white/75 max-w-3xl leading-relaxed">{org.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-white/70">
                  <span className="flex items-center gap-2"><MapPin className="h-4 w-4" aria-hidden="true" /> {org.location.city}, {org.location.country}</span>
                  <span className="flex items-center gap-2"><Calendar className="h-4 w-4" aria-hidden="true" /> Since {org.foundedYear}</span>
                  <span className="flex items-center gap-2"><Users className="h-4 w-4" aria-hidden="true" /> {org.metrics.users} members</span>
                  <span className="flex items-center gap-2"><Phone className="h-4 w-4" aria-hidden="true" /> {org.phone}</span>
                  <span className="flex items-center gap-2"><Mail className="h-4 w-4" aria-hidden="true" /> {org.metadata.contactEmail}</span>
                </div>
                {/* Social Links */}
                <div className="flex items-center gap-3 pt-1">
                  {org.socialLinks.twitter && (
                    <span className="flex items-center gap-1.5 text-xs text-white/60"><Twitter className="h-3.5 w-3.5" /> {org.socialLinks.twitter}</span>
                  )}
                  {org.socialLinks.instagram && (
                    <span className="flex items-center gap-1.5 text-xs text-white/60"><Instagram className="h-3.5 w-3.5" /> {org.socialLinks.instagram}</span>
                  )}
                  {org.socialLinks.facebook && (
                    <span className="flex items-center gap-1.5 text-xs text-white/60"><Facebook className="h-3.5 w-3.5" /> {org.socialLinks.facebook}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full lg:w-[520px]">
              {[
                { label: "Tournaments", value: org.metrics.activeTournaments, icon: Trophy },
                { label: "Teams", value: org.metrics.totalTeams, icon: Shield },
                { label: "Players", value: org.metrics.totalPlayers, icon: Users },
                { label: "MRR", value: `$${org.metrics.monthlyRevenueUsd}/mo`, icon: CreditCard },
              ].map((s) => (
                <div key={s.label} className="rounded-2xl border border-white/15 bg-white/10 p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/70">{s.label}</div>
                    <s.icon className="h-4 w-4 text-white/70" aria-hidden="true" />
                  </div>
                  <div className="text-lg sm:text-2xl font-black tabular-nums mt-1">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-sm font-black uppercase tracking-widest text-muted-foreground mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickActions.map((action) => (
            <button
              key={action.label}
              className="flex flex-col items-center gap-2.5 p-4 rounded-2xl border bg-card hover:bg-muted/50 transition-all hover:shadow-md cursor-pointer group"
            >
              <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.color} transition-transform group-hover:scale-110`}>
                <action.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-bold text-center">{action.label}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as typeof activeTab)} className="w-full">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <TabsList className="rounded-2xl h-12 w-full md:w-auto overflow-x-auto justify-start [-webkit-overflow-scrolling:touch]">
            <TabsTrigger value="overview" className="rounded-xl font-black text-xs uppercase tracking-widest min-w-[140px] h-11">Overview</TabsTrigger>
            <TabsTrigger value="members" className="rounded-xl font-black text-xs uppercase tracking-widest min-w-[140px] h-11">Members</TabsTrigger>
            <TabsTrigger value="metadata" className="rounded-xl font-black text-xs uppercase tracking-widest min-w-[140px] h-11">Metadata</TabsTrigger>
          </TabsList>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "overview" ? (
            <TabsContent key="overview" value="overview" className="mt-6">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Column 1: Profile + Subscription */}
                  <div className="space-y-6">
                    {/* Organization Profile Card */}
                    <Card className="rounded-3xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                          <Building2 className="h-5 w-5 text-secondary" /> Profile
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="h-14 w-14 rounded-2xl bg-muted flex items-center justify-center text-lg font-black">
                            {org.shortName}
                          </div>
                          <div>
                            <div className="font-black">{org.name}</div>
                            <div className="text-xs text-muted-foreground">{org.location.city}, {org.location.country}</div>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">{org.description}</p>
                        <div className="space-y-2.5">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{org.metadata.contactEmail}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">{org.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Globe className="h-4 w-4 text-muted-foreground" />
                            <a href={org.metadata.website} target="_blank" rel="noreferrer" className="text-secondary hover:underline truncate">
                              {org.metadata.website}
                            </a>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Founded {org.foundedYear}</span>
                          </div>
                        </div>
                        {/* Social */}
                        <div className="flex gap-2 pt-1">
                          {org.socialLinks.twitter && (
                            <div className="flex items-center gap-1.5 rounded-xl bg-muted px-3 py-1.5 text-xs font-bold">
                              <Twitter className="h-3.5 w-3.5" /> {org.socialLinks.twitter}
                            </div>
                          )}
                          {org.socialLinks.instagram && (
                            <div className="flex items-center gap-1.5 rounded-xl bg-muted px-3 py-1.5 text-xs font-bold">
                              <Instagram className="h-3.5 w-3.5" /> {org.socialLinks.instagram}
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Subscription & Billing Card */}
                    <Card className="rounded-3xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                          <CreditCard className="h-5 w-5 text-secondary" /> Subscription
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-2xl font-black">{org.plan}</div>
                            <div className="text-xs text-muted-foreground">Current plan</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-black tabular-nums">${org.metrics.monthlyRevenueUsd}</div>
                            <div className="text-xs text-muted-foreground">/month</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Last billing</span>
                            <span className="font-bold">{fmtDate(org.metadata.lastBillingISO)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Region</span>
                            <span className="font-bold">{org.metadata.region}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Timezone</span>
                            <span className="font-bold">{org.metadata.timezone}</span>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 pt-1">
                          {[
                            { label: "Tournaments", value: org.metrics.activeTournaments },
                            { label: "Teams", value: org.metrics.totalTeams },
                            { label: "Players", value: org.metrics.totalPlayers },
                          ].map((m) => (
                            <div key={m.label} className="rounded-xl bg-muted p-3 text-center">
                              <div className="text-lg font-black tabular-nums">{m.value}</div>
                              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{m.label}</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Column 2: Tournaments + Upcoming Matches */}
                  <div className="space-y-6">
                    {/* Active Tournaments */}
                    <Card className="rounded-3xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                          <Trophy className="h-5 w-5 text-secondary" /> Tournaments
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="divide-y">
                          {org.tournaments.map((t) => (
                            <div key={t.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-muted/20 transition-colors">
                              <div className="min-w-0">
                                <div className="text-sm font-black truncate">{t.name}</div>
                                <div className="text-xs text-muted-foreground font-bold">{t.teams} teams</div>
                              </div>
                              <StatusBadge status={t.status} />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Upcoming Matches */}
                    <Card className="rounded-3xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                          <Swords className="h-5 w-5 text-secondary" /> Upcoming Matches
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        {org.upcomingMatches.length === 0 ? (
                          <div className="px-6 py-8 text-center text-sm text-muted-foreground">No upcoming matches scheduled.</div>
                        ) : (
                          <div className="divide-y">
                            {org.upcomingMatches.map((match) => (
                              <div key={match.id} className="px-6 py-3.5 hover:bg-muted/20 transition-colors">
                                <div className="flex items-center justify-between">
                                  <div className="text-sm font-black">
                                    {match.home} <span className="text-muted-foreground font-medium">vs</span> {match.away}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {fmtDateTime(match.dateISO)}</span>
                                  <span className="flex items-center gap-1"><Trophy className="h-3 w-3" /> {match.tournament}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  {/* Column 3: Activity Feed + Highlights */}
                  <div className="space-y-6">
                    {/* Recent Activity */}
                    <Card className="rounded-3xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                          <Activity className="h-5 w-5 text-secondary" /> Recent Activity
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        {org.recentActivity.length === 0 ? (
                          <div className="px-6 py-8 text-center text-sm text-muted-foreground">No recent activity.</div>
                        ) : (
                          <div className="divide-y">
                            {org.recentActivity.map((a) => (
                              <div key={a.id} className="flex items-start gap-3 px-6 py-3.5 hover:bg-muted/20 transition-colors">
                                <div className="mt-0.5 shrink-0">{activityIcon(a.type)}</div>
                                <div className="min-w-0">
                                  <div className="text-sm font-bold">{a.description}</div>
                                  <div className="text-xs text-muted-foreground mt-0.5">{fmtDateTime(a.timestampISO)}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    {/* Highlights */}
                    <Card className="rounded-3xl">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg font-black tracking-tight flex items-center gap-2">
                          <Globe className="h-5 w-5 text-secondary" /> Highlights
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          {[
                            { label: "Region", value: org.metadata.region },
                            { label: "Timezone", value: org.metadata.timezone },
                            { label: "Created", value: fmtDate(org.metadata.createdISO) },
                            { label: "Members", value: `${org.metrics.users} active` },
                          ].map((item) => (
                            <div key={item.label} className="rounded-xl border bg-muted/20 p-3">
                              <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.label}</div>
                              <div className="text-sm font-black mt-1">{item.value}</div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 rounded-xl border bg-muted/20 p-3">
                          <div className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Website</div>
                          <a className="text-sm font-black mt-1 inline-flex items-center gap-2 text-secondary hover:underline break-all" href={org.metadata.website} target="_blank" rel="noreferrer">
                            {org.metadata.website} <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ) : null}

          {activeTab === "members" ? (
            <TabsContent key="members" value="members" className="mt-6">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                <div className="bg-card rounded-3xl border overflow-hidden">
                  <div className="px-6 py-4 border-b bg-muted/30">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div>
                        <h2 className="text-lg font-black tracking-tight">Members</h2>
                        <p className="text-sm text-muted-foreground">Search, filter, and review organization access.</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button className="h-11 rounded-2xl font-black" variant="secondary">Invite</Button>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="relative md:col-span-2">
                        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
                        <label htmlFor="org-member-search" className="sr-only">Search members</label>
                        <Input
                          id="org-member-search"
                          value={memberSearch}
                          onChange={(e) => setMemberSearch(e.target.value)}
                          placeholder="Search members by name, email, role…"
                          className="h-12 rounded-2xl pl-11 font-medium"
                          aria-label="Search members"
                        />
                      </div>
                      <Select value={roleFilter} onValueChange={(v) => setRoleFilter(v as OrganizationMember["role"] | "all")}>
                        <SelectTrigger className="h-12 rounded-2xl font-bold" aria-label="Filter by role">
                          <SelectValue placeholder="Role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All roles</SelectItem>
                          <SelectItem value="Admin">Admin</SelectItem>
                          <SelectItem value="Manager">Manager</SelectItem>
                          <SelectItem value="Coordinator">Coordinator</SelectItem>
                          <SelectItem value="Referee Manager">Referee Manager</SelectItem>
                          <SelectItem value="Analyst">Analyst</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="p-4 sm:hidden space-y-3" aria-label="Members list">
                    {filteredMembers.map((m) => (
                      <div key={m.id} className="rounded-2xl border bg-background/60 p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center text-xs font-black shrink-0">
                              {initials(m.name)}
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-black truncate">{m.name}</div>
                              <div className="text-xs text-muted-foreground font-bold truncate">{m.email}</div>
                              <div className="mt-2 flex flex-wrap items-center gap-2">
                                <Badge variant="outline" className="rounded-2xl font-black text-[10px] uppercase tracking-widest">{m.role}</Badge>
                                {memberStatusBadge(m.status)}
                              </div>
                            </div>
                          </div>
                          <div className="text-right text-xs font-bold text-muted-foreground shrink-0">
                            <div>Last active</div>
                            <div className="text-foreground">{fmtDate(m.lastActiveISO)}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {filteredMembers.length === 0 ? (
                      <div className="text-center text-sm text-muted-foreground py-8">No members match the current filters.</div>
                    ) : null}
                  </div>

                  <div className="hidden sm:block">
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[920px]" aria-label="Organization members table">
                        <thead className="border-b bg-muted/40">
                          <tr>
                            <th className="px-6 py-3 text-left text-[11px] font-black uppercase tracking-widest text-muted-foreground">Member</th>
                            <th className="px-6 py-3 text-left text-[11px] font-black uppercase tracking-widest text-muted-foreground">Role</th>
                            <th className="px-6 py-3 text-left text-[11px] font-black uppercase tracking-widest text-muted-foreground">Status</th>
                            <th className="px-6 py-3 text-left text-[11px] font-black uppercase tracking-widest text-muted-foreground">Last Active</th>
                            <th className="px-6 py-3 text-right text-[11px] font-black uppercase tracking-widest text-muted-foreground">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredMembers.map((m) => (
                            <tr key={m.id} className="border-b last:border-0 hover:bg-muted/20 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3 min-w-0">
                                  <div className="h-10 w-10 rounded-2xl bg-muted flex items-center justify-center text-xs font-black shrink-0">
                                    {initials(m.name)}
                                  </div>
                                  <div className="min-w-0">
                                    <div className="text-sm font-black truncate">{m.name}</div>
                                    <div className="text-xs text-muted-foreground font-bold truncate">{m.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <Badge variant="outline" className="rounded-2xl font-black text-[10px] uppercase tracking-widest">{m.role}</Badge>
                              </td>
                              <td className="px-6 py-4">{memberStatusBadge(m.status)}</td>
                              <td className="px-6 py-4 text-sm font-bold text-muted-foreground">{fmtDate(m.lastActiveISO)}</td>
                              <td className="px-6 py-4 text-right">
                                <Button variant="outline" className="h-10 rounded-2xl font-bold">Manage</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {filteredMembers.length === 0 ? (
                      <div className="text-center text-sm text-muted-foreground py-10">No members match the current filters.</div>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ) : null}

          {activeTab === "metadata" ? (
            <TabsContent key="metadata" value="metadata" className="mt-6">
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }}>
                <div className="bg-card rounded-3xl border overflow-hidden">
                  <div className="px-6 py-4 border-b bg-muted/30">
                    <h2 className="text-lg font-black tracking-tight">Organization Metadata</h2>
                    <p className="text-sm text-muted-foreground">Operational and billing context for admins.</p>
                  </div>
                  <div className="p-6">
                    <dl className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4" aria-label="Organization metadata">
                      {[
                        { k: "Organization ID", v: org.id },
                        { k: "Plan", v: org.plan },
                        { k: "Status", v: org.status },
                        { k: "Region", v: org.metadata.region },
                        { k: "Timezone", v: org.metadata.timezone },
                        { k: "Created", v: fmtDate(org.metadata.createdISO) },
                        { k: "Last billing", v: fmtDate(org.metadata.lastBillingISO) },
                        { k: "Website", v: org.metadata.website },
                        { k: "Contact email", v: org.metadata.contactEmail },
                        { k: "Phone", v: org.phone },
                      ].map((item) => (
                        <div key={item.k} className="rounded-2xl border bg-muted/20 p-4">
                          <dt className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{item.k}</dt>
                          <dd className={cn("text-sm font-black mt-1 break-words", item.k === "Website" && "text-secondary")}>{item.v}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          ) : null}
        </AnimatePresence>
      </Tabs>
    </div>
  );
}
