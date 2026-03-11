import { Button } from "@/components/ui/button";
import { ArrowLeft, Upload, MapPin, Calendar, Users, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

export default function TournamentCreatePage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center gap-3">
        <Link to="/tournaments" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="text-2xl font-bold">Create Tournament</h1>
          <p className="text-muted-foreground">Set up a new football tournament</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center gap-2">
        {["Basic Info", "Format", "Teams", "Schedule", "Review"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold ${i === 0 ? "bg-secondary text-secondary-foreground" : "bg-muted text-muted-foreground"}`}>
              {i + 1}
            </div>
            <span className={`text-sm hidden sm:inline ${i === 0 ? "font-medium" : "text-muted-foreground"}`}>{step}</span>
            {i < 4 && <div className="h-px w-6 bg-border hidden sm:block" />}
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl border p-6 space-y-6">
        {/* Logo Upload */}
        <div className="flex items-center gap-6">
          <div className="h-24 w-24 rounded-xl border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-secondary transition-colors">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Tournament Logo</p>
            <p className="text-sm text-muted-foreground">Upload a logo (PNG, JPG, max 2MB)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1.5 block">Tournament Name *</label>
            <input type="text" placeholder="e.g. Premier Cup 2026" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium mb-1.5 block">Description</label>
            <textarea placeholder="Brief description of the tournament..." className="h-24 w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary resize-none" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Format *</label>
            <select className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary">
              <option>League</option>
              <option>Knockout</option>
              <option>Group Stage + Knockout</option>
              <option>Round Robin</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Age Category *</label>
            <select className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary">
              <option>Senior</option>
              <option>U-21</option>
              <option>U-19</option>
              <option>U-17</option>
              <option>U-15</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><Calendar className="h-4 w-4" /> Start Date *</label>
            <input type="date" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><Calendar className="h-4 w-4" /> End Date *</label>
            <input type="date" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><MapPin className="h-4 w-4" /> Location *</label>
            <input type="text" placeholder="City, Country" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><Users className="h-4 w-4" /> Max Teams *</label>
            <input type="number" placeholder="16" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block flex items-center gap-1.5"><Trophy className="h-4 w-4" /> Venue</label>
            <select className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary">
              <option>Select a venue...</option>
              <option>National Stadium</option>
              <option>City Arena</option>
              <option>Olympic Park</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Registration Deadline</label>
            <input type="date" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline">Save as Draft</Button>
          <div className="flex gap-3">
            <Button variant="ghost">Cancel</Button>
            <Button variant="success">Continue →</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
