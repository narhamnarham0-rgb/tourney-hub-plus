import { MapPin, Users as UsersIcon } from "lucide-react";

const venues = [
  { name: "National Stadium", city: "New York", capacity: 45000, matches: 12 },
  { name: "City Arena", city: "Los Angeles", capacity: 28000, matches: 8 },
  { name: "Olympic Park", city: "Houston", capacity: 35000, matches: 6 },
  { name: "Phoenix Ground", city: "Phoenix", capacity: 18000, matches: 5 },
  { name: "Star Arena", city: "Miami", capacity: 22000, matches: 4 },
];

export default function VenuesPage() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Venues</h1>
        <p className="text-muted-foreground">{venues.length} registered venues</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {venues.map((v, i) => (
          <div key={i} className="bg-card rounded-lg border overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-32 bg-gradient-primary flex items-center justify-center">
              <MapPin className="h-10 w-10 text-primary-foreground/30" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold">{v.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin className="h-3.5 w-3.5" />{v.city}
              </p>
              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><UsersIcon className="h-3.5 w-3.5" />{v.capacity.toLocaleString()} capacity</span>
                <span>{v.matches} matches hosted</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
