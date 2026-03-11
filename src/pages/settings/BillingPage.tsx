import { Button } from "@/components/ui/button";
import { Check, CreditCard } from "lucide-react";

const invoices = [
  { id: "INV-2026-003", date: "Mar 1, 2026", amount: "$79.00", status: "Paid" },
  { id: "INV-2026-002", date: "Feb 1, 2026", amount: "$79.00", status: "Paid" },
  { id: "INV-2026-001", date: "Jan 1, 2026", amount: "$79.00", status: "Paid" },
  { id: "INV-2025-012", date: "Dec 1, 2025", amount: "$79.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Billing & Subscription</h1>
        <p className="text-muted-foreground">Manage your plan and payment methods</p>
      </div>

      {/* Current Plan */}
      <div className="bg-card rounded-xl border-2 border-secondary p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-bold">Pro Plan</h3>
              <span className="status-badge bg-secondary/10 text-secondary">Active</span>
            </div>
            <p className="text-sm text-muted-foreground">25 Tournaments · 200 Teams · Advanced Analytics</p>
            <p className="text-2xl font-black mt-2">$79<span className="text-sm font-normal text-muted-foreground">/month</span></p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">Change Plan</Button>
            <Button variant="destructive" size="sm">Cancel</Button>
          </div>
        </div>

        {/* Usage */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Tournaments", used: 3, max: 25 },
            { label: "Teams", used: 52, max: 200 },
            { label: "Storage", used: 1.2, max: 10 },
          ].map((u) => (
            <div key={u.label}>
              <div className="flex justify-between text-sm mb-1">
                <span>{u.label}</span>
                <span className="font-medium">{u.used} / {u.max}{u.label === "Storage" ? " GB" : ""}</span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-secondary transition-all" style={{ width: `${(u.used / u.max) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-card rounded-xl border p-6">
        <h3 className="font-semibold mb-4">Payment Method</h3>
        <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="h-10 w-14 rounded bg-gradient-primary flex items-center justify-center">
              <CreditCard className="h-5 w-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium">•••• •••• •••• 4242</p>
              <p className="text-xs text-muted-foreground">Expires 12/2027</p>
            </div>
          </div>
          <Button variant="outline" size="sm">Update</Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3">Next billing date: April 1, 2026</p>
      </div>

      {/* Invoices */}
      <div className="bg-card rounded-xl border overflow-hidden">
        <div className="p-5 border-b">
          <h3 className="font-semibold">Invoice History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="data-table-header px-4 py-3 text-left">Invoice</th>
                <th className="data-table-header px-4 py-3 text-left hidden sm:table-cell">Date</th>
                <th className="data-table-header px-4 py-3 text-center">Amount</th>
                <th className="data-table-header px-4 py-3 text-center">Status</th>
                <th className="data-table-header px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((inv) => (
                <tr key={inv.id} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium font-mono">{inv.id}</td>
                  <td className="px-4 py-3 text-sm text-muted-foreground hidden sm:table-cell">{inv.date}</td>
                  <td className="px-4 py-3 text-sm text-center font-medium">{inv.amount}</td>
                  <td className="px-4 py-3 text-center">
                    <span className="status-badge bg-secondary/10 text-secondary"><Check className="h-3 w-3 mr-1" />{inv.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-sm text-secondary hover:underline">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
