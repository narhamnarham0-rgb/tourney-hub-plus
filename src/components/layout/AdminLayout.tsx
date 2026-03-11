import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Building2, CreditCard, Users, ScrollText,
  BarChart3, Settings, ChevronLeft, ChevronRight, Search, Bell,
  Menu, ShieldCheck, ArrowLeft, Trophy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const adminNavItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
  { label: "Organizations", icon: Building2, path: "/admin/organizations" },
  { label: "Subscriptions", icon: CreditCard, path: "/admin/subscriptions" },
  { label: "Users", icon: Users, path: "/admin/users" },
  { label: "System Logs", icon: ScrollText, path: "/admin/system-logs" },
  { label: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  { label: "Platform Settings", icon: Settings, path: "/admin/platform-settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-foreground/40 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Admin Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 flex flex-col transition-all duration-300 lg:relative",
        "bg-[hsl(222_47%_8%)]",
        collapsed ? "w-[68px]" : "w-64",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}>
        {/* Logo */}
        <div className={cn("flex h-16 items-center border-b border-sidebar-border px-4", collapsed && "justify-center")}>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/80">
              <ShieldCheck className="h-5 w-5 text-destructive-foreground" />
            </div>
            {!collapsed && (
              <div>
                <span className="text-lg font-bold text-sidebar-primary">KickOff</span>
                <span className="ml-1.5 text-[10px] font-semibold bg-destructive/20 text-destructive-foreground px-1.5 py-0.5 rounded">ADMIN</span>
              </div>
            )}
          </div>
        </div>

        {/* Back to app */}
        {!collapsed && (
          <Link to="/" className="flex items-center gap-2 px-4 py-2.5 mx-3 mt-3 rounded-md text-xs font-medium text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Platform
          </Link>
        )}

        <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-1">
          {!collapsed && <p className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-sidebar-foreground/40">Administration</p>}
          {adminNavItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "nav-item",
                  active ? "bg-destructive/15 text-destructive-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  collapsed && "justify-center px-2"
                )}
                title={collapsed ? item.label : undefined}
              >
                <item.icon className={cn("h-5 w-5 shrink-0", active && "text-destructive")} />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex border-t border-sidebar-border p-3">
          <button onClick={() => setCollapsed(!collapsed)} className="nav-item text-sidebar-foreground hover:bg-sidebar-accent w-full justify-center">
            {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <header className="flex h-16 items-center justify-between border-b bg-card px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setMobileOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold bg-destructive/10 text-destructive px-2 py-1 rounded-md hidden sm:inline-flex items-center gap-1">
                <ShieldCheck className="h-3 w-3" /> Super Admin Mode
              </span>
            </div>
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input type="text" placeholder="Search platform..." className="h-10 w-64 rounded-lg border bg-muted/50 pl-10 pr-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary transition-colors" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-full bg-destructive/80 flex items-center justify-center text-sm font-semibold text-destructive-foreground">SA</div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Super Admin</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
