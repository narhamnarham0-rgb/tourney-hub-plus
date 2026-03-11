import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Trophy, Calendar, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const radarData = [
  { stat: "Pace", value: 85 }, { stat: "Shooting", value: 90 }, { stat: "Passing", value: 72 },
  { stat: "Dribbling", value: 78 }, { stat: "Defense", value: 35 }, { stat: "Physical", value: 80 },
];

const goalsPerMatch = [
  { match: "R1", goals: 1 }, { match: "R2", goals: 2 }, { match: "R3", goals: 0 },
  { match: "R4", goals: 1 }, { match: "R5", goals: 2 }, { match: "R6", goals: 0 },
  { match: "R7", goals: 1 }, { match: "R8", goals: 0 }, { match: "R9", goals: 0 },
  { match: "R10", goals: 1 },
];

const tabs = ["Profile", "Statistics", "Match History", "Documents"];

export default function PlayerProfilePage() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <Link to="/players" className="text-muted-foreground hover:text-foreground"><ArrowLeft className="h-5 w-5" /></Link>
        <span className="text-sm text-muted-foreground">Players</span>
      </div>

      {/* Player Header */}
      <div className="bg-gradient-primary rounded-xl p-6 text-primary-foreground">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="h-24 w-24 rounded-xl bg-primary-foreground/10 flex items-center justify-center text-4xl font-black">CS</div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold">Carlos Silva</h1>
              <span className="bg-secondary/20 text-secondary-foreground text-xs font-bold px-2 py-0.5 rounded">#9</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm opacity-80">
              <span>Striker</span>
              <span className="flex items-center gap-1"><Trophy className="h-4 w-4" />FC Thunder</span>
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />Brazil</span>
              <span className="flex items-center gap-1"><Calendar className="h-4 w-4" />Age 24</span>
            </div>
          </div>
          <Button variant="accent" size="sm"><Download className="h-4 w-4 mr-1" />Player Card</Button>
        </div>
      </div>

      <div className="flex gap-1 overflow-x-auto border-b">
        {tabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors border-b-2 ${activeTab === tab ? "border-secondary text-secondary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "Profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Info */}
          <div className="bg-card rounded-lg border p-5 space-y-4">
            <h3 className="font-semibold">Personal Info</h3>
            {[
              ["Full Name", "Carlos Eduardo Silva"],
              ["Date of Birth", "May 15, 2002"],
              ["Nationality", "Brazilian"],
              ["Height", "182 cm"],
              ["Weight", "76 kg"],
              ["Preferred Foot", "Right"],
              ["Player ID", "KO-2026-0042"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between items-center py-1">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-sm font-medium">{value}</span>
              </div>
            ))}
          </div>

          {/* Season Stats */}
          <div className="bg-card rounded-lg border p-5">
            <h3 className="font-semibold mb-4">Season Statistics</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Appearances", value: 10 }, { label: "Goals", value: 8 },
                { label: "Assists", value: 3 }, { label: "Minutes", value: 870 },
                { label: "Yellow Cards", value: 1 }, { label: "Red Cards", value: 0 },
                { label: "Pass Accuracy", value: "78%" }, { label: "Shot Accuracy", value: "64%" },
              ].map((s) => (
                <div key={s.label} className="text-center py-2">
                  <p className="text-xl font-bold">{s.value}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Radar */}
          <div className="bg-card rounded-lg border p-5">
            <h3 className="font-semibold mb-4">Attributes</h3>
            <ResponsiveContainer width="100%" height={220}>
              <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="stat" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} />
                <Radar dataKey="value" stroke="hsl(var(--secondary))" fill="hsl(var(--secondary))" fillOpacity={0.2} strokeWidth={2} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "Statistics" && (
        <div className="space-y-6">
          <div className="bg-card rounded-lg border p-5">
            <h3 className="font-semibold mb-4">Goals per Match</h3>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={goalsPerMatch}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="match" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip />
                <Bar dataKey="goals" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === "Match History" && (
        <div className="bg-card rounded-lg border overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="data-table-header px-4 py-3 text-left">Match</th>
                <th className="data-table-header px-4 py-3 text-center hidden sm:table-cell">Result</th>
                <th className="data-table-header px-4 py-3 text-center">Goals</th>
                <th className="data-table-header px-4 py-3 text-center hidden md:table-cell">Assists</th>
                <th className="data-table-header px-4 py-3 text-center hidden md:table-cell">Minutes</th>
                <th className="data-table-header px-4 py-3 text-center hidden sm:table-cell">Rating</th>
              </tr>
            </thead>
            <tbody>
              {[
                { match: "vs Red Lions", result: "2-1 W", goals: 2, assists: 0, mins: 90, rating: 8.5 },
                { match: "vs Blue Eagles", result: "3-1 W", goals: 1, assists: 1, mins: 90, rating: 7.8 },
                { match: "vs Golden Stars", result: "1-0 W", goals: 1, assists: 0, mins: 85, rating: 7.2 },
                { match: "vs Dynamo City", result: "2-2 D", goals: 1, assists: 0, mins: 90, rating: 6.9 },
                { match: "vs Metro FC", result: "4-0 W", goals: 2, assists: 1, mins: 70, rating: 9.0 },
              ].map((m, i) => (
                <tr key={i} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 text-sm font-medium">{m.match}</td>
                  <td className="px-4 py-3 text-sm text-center hidden sm:table-cell">{m.result}</td>
                  <td className="px-4 py-3 text-center text-sm font-bold text-secondary">{m.goals}</td>
                  <td className="px-4 py-3 text-sm text-center hidden md:table-cell">{m.assists}</td>
                  <td className="px-4 py-3 text-sm text-center hidden md:table-cell">{m.mins}'</td>
                  <td className="px-4 py-3 text-center hidden sm:table-cell">
                    <span className={`text-sm font-bold ${m.rating >= 8 ? "text-secondary" : m.rating >= 7 ? "text-accent" : "text-muted-foreground"}`}>{m.rating}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "Documents" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { name: "Player Registration Form", type: "PDF", date: "Feb 28, 2026" },
            { name: "Medical Certificate", type: "PDF", date: "Feb 25, 2026" },
            { name: "ID Document", type: "JPG", date: "Feb 20, 2026" },
            { name: "Insurance Policy", type: "PDF", date: "Jan 15, 2026" },
          ].map((doc, i) => (
            <div key={i} className="bg-card rounded-lg border p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-destructive/10 flex items-center justify-center text-xs font-bold text-destructive">{doc.type}</div>
                <div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.date}</p>
                </div>
              </div>
              <Download className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
