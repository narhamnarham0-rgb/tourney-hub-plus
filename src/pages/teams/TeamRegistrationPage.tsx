import { ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function TeamRegistrationPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link to="/teams" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="text-2xl font-bold">Register Team</h1>
          <p className="text-muted-foreground">Register a new team for a tournament</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-6 space-y-6">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-secondary transition-colors">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Team Logo</p>
            <p className="text-sm text-muted-foreground">Upload your team badge</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1.5 block">Team Name *</label>
            <input type="text" placeholder="e.g. FC Thunder" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">City *</label>
            <input type="text" placeholder="New York" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Country *</label>
            <input type="text" placeholder="United States" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Head Coach *</label>
            <input type="text" placeholder="Coach name" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Assistant Coach</label>
            <input type="text" placeholder="Optional" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Tournament *</label>
            <select className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary">
              <option>Select tournament...</option>
              <option>Premier Cup 2026</option>
              <option>City League Season 8</option>
              <option>Youth Championship</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Contact Email *</label>
            <input type="email" placeholder="team@club.com" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
            <input type="tel" placeholder="+1 234 567 890" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Primary Kit Color</label>
            <div className="flex items-center gap-3">
              <input type="color" defaultValue="#16A34A" className="h-11 w-11 rounded-lg border cursor-pointer" />
              <input type="text" defaultValue="#16A34A" className="h-11 flex-1 rounded-lg border bg-background px-4 text-sm outline-none" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button variant="ghost">Cancel</Button>
          <Button variant="success">Register Team</Button>
        </div>
      </div>
    </div>
  );
}
