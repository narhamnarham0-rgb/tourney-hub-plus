import { ArrowLeft, MapPin, Users, Calendar, Swords } from "lucide-react";
import { Link } from "react-router-dom";
import { MatchCard } from "@/components/dashboard/MatchCard";

export default function VenueDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Link to="/venues" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-5 w-5" /></Link>
        <span className="text-sm text-muted-foreground">Venues</span>
      </div>

      {/* Venue Header */}
      <div className="bg-gradient-primary rounded-xl overflow-hidden">
        <div className="h-48 flex items-center justify-center">
          <MapPin className="h-16 w-16 text-primary-foreground/20" />
        </div>
        <div className="p-6 text-primary-foreground">
          <h1 className="text-2xl font-bold">National Stadium</h1>
          <div className="flex flex-wrap items-center gap-4 text-sm opacity-80 mt-2">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />New York, USA</span>
            <span className="flex items-center gap-1"><Users className="h-4 w-4" />45,000 capacity</span>
            <span className="flex items-center gap-1"><Swords className="h-4 w-4" />12 matches hosted</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Matches", value: 12 },
          { label: "Avg. Attendance", value: "28,400" },
          { label: "Goals Scored", value: 35 },
          { label: "Revenue", value: "$24.5K" },
        ].map((s) => (
          <div key={s.label} className="stat-card text-center">
            <p className="text-xl font-bold">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Map placeholder */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <div className="h-48 bg-muted flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            <MapPin className="h-8 w-8 mx-auto mb-2" />
            <p className="text-sm">Map View</p>
            <p className="text-xs">40.7128° N, 74.0060° W</p>
          </div>
        </div>
      </div>

      {/* Upcoming Matches */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Upcoming Matches at this Venue</h2>
        <div className="space-y-3">
          <MatchCard homeTeam="FC Thunder" awayTeam="United FC" time="Mar 15, 18:00" venue="National Stadium" status="upcoming" />
          <MatchCard homeTeam="Blue Eagles" awayTeam="Red Lions" time="Mar 22, 16:00" venue="National Stadium" status="upcoming" />
        </div>
      </div>

      {/* Venue Info */}
      <div className="bg-card rounded-lg border p-5">
        <h3 className="font-semibold mb-4">Venue Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            ["Surface", "Natural Grass"],
            ["Dimensions", "105m × 68m"],
            ["Floodlights", "Yes - 1500 lux"],
            ["Year Built", "2018"],
            ["Parking", "2,000 spaces"],
            ["Public Transport", "Metro Line 4 - Stadium Station"],
          ].map(([label, value]) => (
            <div key={label} className="flex justify-between items-center py-1.5 border-b">
              <span className="text-sm text-muted-foreground">{label}</span>
              <span className="text-sm font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
