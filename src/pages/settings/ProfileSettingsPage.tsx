import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export default function ProfileSettingsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Profile Settings</h1>
        <p className="text-muted-foreground">Manage your account details</p>
      </div>

      <div className="bg-card rounded-xl border p-6 space-y-6">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 rounded-full bg-secondary flex items-center justify-center text-2xl font-bold text-secondary-foreground">EO</div>
          <div>
            <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1" />Change Photo</Button>
            <p className="text-xs text-muted-foreground mt-1">JPG or PNG, max 2MB</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1.5 block">First Name</label>
            <input type="text" defaultValue="Sarah" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Last Name</label>
            <input type="text" defaultValue="Connor" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Email</label>
            <input type="email" defaultValue="sarah@cityfootball.com" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Phone</label>
            <input type="tel" defaultValue="+1 234 567 890" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Role</label>
            <input type="text" defaultValue="Event Organizer" disabled className="h-11 w-full rounded-lg border bg-muted px-4 text-sm" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Organization</label>
            <input type="text" defaultValue="City Football Association" disabled className="h-11 w-full rounded-lg border bg-muted px-4 text-sm" />
          </div>
        </div>

        <div className="flex justify-end pt-4 border-t">
          <Button variant="success">Save Changes</Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border p-6 space-y-4">
        <h3 className="font-semibold">Change Password</h3>
        <div className="space-y-4 max-w-md">
          <div>
            <label className="text-sm font-medium mb-1.5 block">Current Password</label>
            <input type="password" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">New Password</label>
            <input type="password" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <div>
            <label className="text-sm font-medium mb-1.5 block">Confirm New Password</label>
            <input type="password" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
          </div>
          <Button variant="outline">Update Password</Button>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-destructive/30 p-6">
        <h3 className="font-semibold text-destructive">Danger Zone</h3>
        <p className="text-sm text-muted-foreground mt-1">Once you delete your account, there is no going back.</p>
        <Button variant="destructive" size="sm" className="mt-4">Delete Account</Button>
      </div>
    </div>
  );
}
