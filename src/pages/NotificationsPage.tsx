import { Bell, Check, Swords, Trophy, Users, Shield, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";

const notifications = [
  { type: "match", icon: Swords, title: "Match Result Submitted", desc: "FC Thunder 2-1 Red Lions · Referee report pending review", time: "2 min ago", read: false },
  { type: "tournament", icon: Trophy, title: "New Team Registration", desc: "Dynamo City has registered for Youth Championship", time: "15 min ago", read: false },
  { type: "player", icon: Users, title: "Player Document Uploaded", desc: "Carlos Silva uploaded medical certificate", time: "1 hour ago", read: false },
  { type: "referee", icon: Shield, title: "Referee Assignment Confirmed", desc: "John Smith confirmed for Mar 15 match", time: "2 hours ago", read: true },
  { type: "billing", icon: CreditCard, title: "Payment Received", desc: "Monthly subscription payment of $79 processed", time: "5 hours ago", read: true },
  { type: "match", icon: Swords, title: "Match Scheduled", desc: "United FC vs Phoenix SC added to schedule", time: "Yesterday", read: true },
  { type: "tournament", icon: Trophy, title: "Tournament Phase Updated", desc: "Premier Cup moved to Round 10", time: "Yesterday", read: true },
  { type: "player", icon: Users, title: "Player Transfer Request", desc: "Ben Taylor requests transfer to Blue Eagles", time: "2 days ago", read: true },
];

export default function NotificationsPage() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="page-header flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">{notifications.filter(n => !n.read).length} unread</p>
        </div>
        <Button variant="ghost" size="sm"><Check className="h-4 w-4 mr-1" />Mark all read</Button>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden divide-y">
        {notifications.map((n, i) => {
          const Icon = n.icon;
          return (
            <div key={i} className={`flex items-start gap-4 p-4 hover:bg-muted/30 transition-colors cursor-pointer ${!n.read ? "bg-secondary/5" : ""}`}>
              <div className={`h-10 w-10 rounded-lg flex items-center justify-center shrink-0 ${!n.read ? "bg-secondary/10 text-secondary" : "bg-muted text-muted-foreground"}`}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`text-sm ${!n.read ? "font-semibold" : "font-medium"}`}>{n.title}</p>
                  {!n.read && <span className="h-2 w-2 rounded-full bg-secondary shrink-0" />}
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">{n.desc}</p>
                <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
