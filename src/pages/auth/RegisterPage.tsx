import { useState } from "react";
import { Link } from "react-router-dom";
import { Trophy, Eye, EyeOff, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  const features = [
    "Unlimited tournament management",
    "Real-time match tracking",
    "Player & team analytics",
    "Digital player ID cards",
  ];

  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-primary items-center justify-center p-12">
        <div className="max-w-md text-primary-foreground">
          <div className="flex items-center gap-3 mb-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
              <Trophy className="h-7 w-7 text-secondary-foreground" />
            </div>
            <span className="text-3xl font-bold">KickOff</span>
          </div>
          <h1 className="text-4xl font-bold leading-tight mb-4">Start Managing Tournaments Today</h1>
          <p className="text-lg opacity-70 mb-8">Join thousands of event organizers running professional football competitions.</p>
          <div className="space-y-3">
            {features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <div className="h-6 w-6 rounded-full bg-secondary/20 flex items-center justify-center">
                  <Check className="h-3.5 w-3.5 text-secondary" />
                </div>
                <span className="text-sm opacity-80">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
              <Trophy className="h-5 w-5 text-secondary-foreground" />
            </div>
            <span className="text-xl font-bold">KickOff</span>
          </div>
          <h2 className="text-2xl font-bold mb-1">Create your account</h2>
          <p className="text-muted-foreground mb-8">Start your 14-day free trial</p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-sm font-medium mb-1.5 block">First Name</label>
                <input type="text" placeholder="John" className="h-11 w-full rounded-lg border bg-card px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1.5 block">Last Name</label>
                <input type="text" placeholder="Doe" className="h-11 w-full rounded-lg border bg-card px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Organization Name</label>
              <input type="text" placeholder="City Football Association" className="h-11 w-full rounded-lg border bg-card px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email Address</label>
              <input type="email" placeholder="name@organization.com" className="h-11 w-full rounded-lg border bg-card px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="Min. 8 characters" className="h-11 w-full rounded-lg border bg-card px-4 pr-10 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
                <button onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">Role</label>
              <select className="h-11 w-full rounded-lg border bg-card px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary">
                <option>Event Organizer</option>
                <option>Club Manager</option>
                <option>Referee</option>
              </select>
            </div>
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" className="rounded border-input mt-0.5" />
              <span className="text-muted-foreground">I agree to the <a href="#" className="text-secondary hover:underline">Terms of Service</a> and <a href="#" className="text-secondary hover:underline">Privacy Policy</a></span>
            </label>
            <Button variant="success" className="w-full h-11">Create Account</Button>
          </div>
          <p className="text-sm text-center text-muted-foreground mt-8">
            Already have an account? <Link to="/login" className="text-secondary font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
