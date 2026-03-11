import { ArrowLeft, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function PlayerRegistrationPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-3">
        <Link to="/players" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-5 w-5" /></Link>
        <div>
          <h1 className="text-2xl font-bold">Register Player</h1>
          <p className="text-muted-foreground">Add a new player to the system</p>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-6 space-y-6">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer hover:border-secondary transition-colors">
            <Upload className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium">Player Photo</p>
            <p className="text-sm text-muted-foreground">Upload a headshot photo</p>
          </div>
        </div>

        <h3 className="font-semibold border-b pb-2">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">First Name *</label>
            <input type="text" placeholder="Carlos" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Last Name *</label>
            <input type="text" placeholder="Silva" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Date of Birth *</label>
            <input type="date" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Nationality *</label>
            <input type="text" placeholder="Brazilian" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
        </div>

        <h3 className="font-semibold border-b pb-2">Football Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Position *</label>
            <select className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary">
              <option>Goalkeeper</option><option>Defender</option><option>Midfielder</option><option>Forward</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Jersey Number *</label>
            <input type="number" placeholder="9" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Team *</label>
            <select className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary">
              <option>Select team...</option><option>FC Thunder</option><option>Red Lions</option><option>Blue Eagles</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Preferred Foot</label>
            <select className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary">
              <option>Right</option><option>Left</option><option>Both</option>
            </select>
          </div>
        </div>

        <h3 className="font-semibold border-b pb-2">Physical Data</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Height (cm)</label>
            <input type="number" placeholder="182" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Weight (kg)</label>
            <input type="number" placeholder="76" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary" />
          </div>
        </div>

        <h3 className="font-semibold border-b pb-2">Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {["ID Document", "Medical Certificate"].map((doc) => (
            <div key={doc} className="border-2 border-dashed rounded-lg p-4 flex items-center gap-3 cursor-pointer hover:border-secondary transition-colors">
              <Upload className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium">{doc}</p>
                <p className="text-xs text-muted-foreground">PDF, JPG (max 5MB)</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button variant="ghost">Cancel</Button>
          <Button variant="success">Register Player</Button>
        </div>
      </div>
    </div>
  );
}
