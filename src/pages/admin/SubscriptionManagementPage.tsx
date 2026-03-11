import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Check, X } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/month",
    features: ["5 Tournaments", "50 Teams", "Basic Analytics", "Email Support"],
    notIncluded: ["Custom Branding", "API Access", "Priority Support"],
    popular: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/month",
    features: ["25 Tournaments", "200 Teams", "Advanced Analytics", "Priority Support", "Custom Branding"],
    notIncluded: ["API Access"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$199",
    period: "/month",
    features: ["Unlimited Tournaments", "Unlimited Teams", "Full Analytics", "24/7 Support", "Custom Branding", "API Access"],
    notIncluded: [],
    popular: false,
  },
];

const subscribers = [
  { org: "City Football Association", plan: "Enterprise", status: "active" as const, mrr: "$199", nextBilling: "Apr 1, 2026", users: 12 },
  { org: "National Youth League", plan: "Pro", status: "active" as const, mrr: "$79", nextBilling: "Mar 28, 2026", users: 8 },
  { org: "Copa Regional", plan: "Pro", status: "active" as const, mrr: "$79", nextBilling: "Apr 5, 2026", users: 5 },
  { org: "Euro Futsal Network", plan: "Starter", status: "inactive" as const, mrr: "$0", nextBilling: "—", users: 3 },
  { org: "Asian Cup Org", plan: "Enterprise", status: "active" as const, mrr: "$199", nextBilling: "Apr 10, 2026", users: 10 },
];

export default function SubscriptionManagementPage() {
  return (
    <div className="space-y-8">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Subscription Management</h1>
        <p className="text-muted-foreground">Manage plans and organization subscriptions</p>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.name} className={`bg-card rounded-xl border-2 p-6 relative ${plan.popular ? "border-secondary shadow-lg" : "border-border"}`}>
            {plan.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-secondary text-secondary-foreground text-xs font-bold px-3 py-1 rounded-full">Most Popular</span>
            )}
            <h3 className="text-lg font-bold">{plan.name}</h3>
            <div className="mt-2 mb-4">
              <span className="text-3xl font-black">{plan.price}</span>
              <span className="text-muted-foreground text-sm">{plan.period}</span>
            </div>
            <div className="space-y-2 mb-6">
              {plan.features.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-secondary shrink-0" /><span>{f}</span>
                </div>
              ))}
              {plan.notIncluded.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <X className="h-4 w-4 shrink-0" /><span>{f}</span>
                </div>
              ))}
            </div>
            <Button variant={plan.popular ? "success" : "outline"} className="w-full">Edit Plan</Button>
          </div>
        ))}
      </div>

      {/* Subscribers table */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Active Subscriptions</h2>
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="data-table-header px-4 py-3 text-left">Organization</th>
                  <th className="data-table-header px-4 py-3 text-center">Plan</th>
                  <th className="data-table-header px-4 py-3 text-center hidden sm:table-cell">MRR</th>
                  <th className="data-table-header px-4 py-3 text-center hidden md:table-cell">Users</th>
                  <th className="data-table-header px-4 py-3 text-center hidden lg:table-cell">Next Billing</th>
                  <th className="data-table-header px-4 py-3 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {subscribers.map((s, i) => (
                  <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-sm">{s.org}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-xs font-medium bg-accent/10 text-accent px-2 py-0.5 rounded">{s.plan}</span>
                    </td>
                    <td className="px-4 py-3 text-sm text-center font-medium hidden sm:table-cell">{s.mrr}</td>
                    <td className="px-4 py-3 text-sm text-center hidden md:table-cell">{s.users}</td>
                    <td className="px-4 py-3 text-sm text-center text-muted-foreground hidden lg:table-cell">{s.nextBilling}</td>
                    <td className="px-4 py-3 text-center"><StatusBadge status={s.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
