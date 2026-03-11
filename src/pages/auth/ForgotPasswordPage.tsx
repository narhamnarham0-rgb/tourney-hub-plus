import { Link } from "react-router-dom";
import { Trophy, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-background">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
            <Trophy className="h-5 w-5 text-secondary-foreground" />
          </div>
          <span className="text-xl font-bold">KickOff</span>
        </div>

        <div className="bg-card rounded-xl border p-8 text-center">
          <div className="h-14 w-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
            <svg className="h-7 w-7 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Reset your password</h2>
          <p className="text-muted-foreground text-sm mb-6">Enter your email address and we'll send you instructions to reset your password.</p>

          <div className="space-y-4 text-left">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email Address</label>
              <input type="email" placeholder="name@organization.com" className="h-11 w-full rounded-lg border bg-background px-4 text-sm outline-none focus:border-secondary focus:ring-1 focus:ring-secondary" />
            </div>
            <Button variant="success" className="w-full h-11">Send Reset Link</Button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/login" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
