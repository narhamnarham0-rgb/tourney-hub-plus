import { Trophy, Users, Swords, CalendarPlus, MapPin, ClipboardList } from "lucide-react";

const actions = [
  { label: "Create Tournament", icon: Trophy, color: "bg-secondary/10 text-secondary" },
  { label: "Register Team", icon: Users, color: "bg-info/10 text-info" },
  { label: "Generate Schedule", icon: CalendarPlus, color: "bg-accent/10 text-accent" },
  { label: "Add Venue", icon: MapPin, color: "bg-destructive/10 text-destructive" },
];

export function QuickActions() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map((action) => (
        <div key={action.label} className="quick-action-btn">
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color}`}>
            <action.icon className="h-5 w-5" />
          </div>
          <span className="text-xs font-medium">{action.label}</span>
        </div>
      ))}
    </div>
  );
}
