import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Globe, Mail, Shield, Database, Bell, CreditCard, Code, Palette } from "lucide-react";

const settingsSections = [
  { id: "general", label: "General", icon: Globe },
  { id: "email", label: "Email", icon: Mail },
  { id: "security", label: "Security", icon: Shield },
  { id: "database", label: "Database", icon: Database },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "billing", label: "Billing", icon: CreditCard },
  { id: "api", label: "API", icon: Code },
  { id: "branding", label: "Branding", icon: Palette },
];

export default function PlatformSettingsPage() {
  const [activeSection, setActiveSection] = useState("general");

  return (
    <div className="space-y-6">
      <div className="page-header flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold">Platform Settings</h1>
          <p className="text-muted-foreground">Global platform configuration</p>
        </div>
        <Button variant="success" size="sm"><Save className="h-4 w-4 mr-1" />Save All Changes</Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Settings Nav */}
        <div className="lg:w-56 shrink-0">
          <div className="bg-card rounded-lg border overflow-hidden">
            {settingsSections.map((s) => {
              const Icon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveSection(s.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium border-b last:border-0 transition-colors ${
                    activeSection === s.id ? "bg-secondary/10 text-secondary" : "text-muted-foreground hover:bg-muted/30 hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4" />{s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Settings Content */}
        <div className="flex-1 space-y-6">
          {activeSection === "general" && (
            <div className="bg-card rounded-xl border p-6 space-y-6">
              <h3 className="font-semibold text-lg">General Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Platform Name</label>
                  <input type="text" defaultValue="KickOff" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Support Email</label>
                  <input type="email" defaultValue="support@kickoff.app" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Platform URL</label>
                  <input type="url" defaultValue="https://app.kickoff.com" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Default Language</label>
                  <select className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>Portuguese</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Default Timezone</label>
                  <select className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary">
                    <option>UTC</option>
                    <option>America/New_York</option>
                    <option>Europe/London</option>
                    <option>Asia/Tokyo</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">Date Format</label>
                  <select className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t space-y-4">
                <h4 className="font-medium text-sm">Feature Flags</h4>
                {[
                  { label: "Public Tournament Pages", desc: "Allow tournaments to have public-facing pages", enabled: true },
                  { label: "Player Self-Registration", desc: "Players can register themselves via public link", enabled: true },
                  { label: "Live Match Updates", desc: "Real-time match score updates via WebSocket", enabled: true },
                  { label: "QR Code Player Cards", desc: "Generate QR-based digital player ID cards", enabled: false },
                  { label: "Maintenance Mode", desc: "Show maintenance page to all non-admin users", enabled: false },
                ].map((f) => (
                  <div key={f.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="text-sm font-medium">{f.label}</p>
                      <p className="text-xs text-muted-foreground">{f.desc}</p>
                    </div>
                    <button className={`relative h-6 w-11 rounded-full transition-colors ${f.enabled ? "bg-secondary" : "bg-muted"}`}>
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform ${f.enabled ? "left-[22px]" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeSection === "email" && (
            <div className="bg-card rounded-xl border p-6 space-y-6">
              <h3 className="font-semibold text-lg">Email Configuration</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">SMTP Host</label>
                  <input type="text" defaultValue="smtp.sendgrid.net" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">SMTP Port</label>
                  <input type="number" defaultValue="587" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">From Email</label>
                  <input type="email" defaultValue="noreply@kickoff.app" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">From Name</label>
                  <input type="text" defaultValue="KickOff Platform" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary" />
                </div>
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">Send Test Email</Button>
                <Button variant="success" size="sm">Save Email Settings</Button>
              </div>
            </div>
          )}

          {activeSection === "security" && (
            <div className="bg-card rounded-xl border p-6 space-y-6">
              <h3 className="font-semibold text-lg">Security Settings</h3>
              <div className="space-y-4">
                {[
                  { label: "Two-Factor Authentication", desc: "Require 2FA for all admin accounts", enabled: true },
                  { label: "IP Whitelisting", desc: "Restrict admin access to specific IP addresses", enabled: false },
                  { label: "Session Timeout", desc: "Auto-logout after 30 minutes of inactivity", enabled: true },
                  { label: "Password Complexity", desc: "Require strong passwords (8+ chars, uppercase, number, symbol)", enabled: true },
                  { label: "API Rate Limiting", desc: "Limit API requests to 1000/min per organization", enabled: true },
                  { label: "Audit Logging", desc: "Log all admin actions for security review", enabled: true },
                ].map((f) => (
                  <div key={f.label} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="text-sm font-medium">{f.label}</p>
                      <p className="text-xs text-muted-foreground">{f.desc}</p>
                    </div>
                    <button className={`relative h-6 w-11 rounded-full transition-colors ${f.enabled ? "bg-secondary" : "bg-muted"}`}>
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-card shadow transition-transform ${f.enabled ? "left-[22px]" : "left-0.5"}`} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
                <p className="text-sm font-medium text-destructive">Danger Zone</p>
                <p className="text-xs text-muted-foreground mt-1">Purge all sessions, reset rate limits, or wipe test data.</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="destructive" size="sm">Purge Sessions</Button>
                  <Button variant="outline" size="sm">Reset Rate Limits</Button>
                </div>
              </div>
            </div>
          )}

          {activeSection === "database" && (
            <div className="bg-card rounded-xl border p-6 space-y-6">
              <h3 className="font-semibold text-lg">Database & Storage</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: "Database Size", value: "2.4 GB" },
                  { label: "Total Records", value: "1.2M" },
                  { label: "Storage Used", value: "8.6 GB / 50 GB" },
                  { label: "Last Backup", value: "Today 06:00 UTC" },
                ].map((s) => (
                  <div key={s.label} className="p-4 rounded-lg bg-muted/30 border">
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                    <p className="text-lg font-bold mt-1">{s.value}</p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline" size="sm">Run Backup Now</Button>
                <Button variant="outline" size="sm">Optimize Database</Button>
              </div>
            </div>
          )}

          {(activeSection === "notifications" || activeSection === "billing" || activeSection === "api" || activeSection === "branding") && (
            <div className="bg-card rounded-xl border p-6 text-center py-16">
              <div className="h-14 w-14 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                {settingsSections.find(s => s.id === activeSection)?.icon && (() => {
                  const Icon = settingsSections.find(s => s.id === activeSection)!.icon;
                  return <Icon className="h-7 w-7 text-muted-foreground" />;
                })()}
              </div>
              <h3 className="font-semibold text-lg">{settingsSections.find(s => s.id === activeSection)?.label} Settings</h3>
              <p className="text-sm text-muted-foreground mt-2">Configure {settingsSections.find(s => s.id === activeSection)?.label.toLowerCase()} settings for the platform.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
