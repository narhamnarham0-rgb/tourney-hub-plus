export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Platform configuration</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {[
          { title: "Organization Profile", desc: "Name, logo, contact details" },
          { title: "User Management", desc: "Invite and manage team members" },
          { title: "Subscription & Billing", desc: "Plan details and payment methods" },
          { title: "Notifications", desc: "Email and push notification preferences" },
          { title: "Integrations", desc: "Third-party service connections" },
          { title: "API Access", desc: "API keys and documentation" },
        ].map((s, i) => (
          <div key={i} className="bg-card rounded-lg border p-5 hover:shadow-md transition-shadow cursor-pointer">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
