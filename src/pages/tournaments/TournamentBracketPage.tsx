import { cn } from "@/lib/utils";

interface BracketMatch {
  home: string;
  away: string;
  homeScore?: number;
  awayScore?: number;
  completed: boolean;
}

const quarterfinals: BracketMatch[] = [
  { home: "FC Thunder", away: "Metro FC", homeScore: 3, awayScore: 0, completed: true },
  { home: "Golden Stars", away: "Blue Eagles", homeScore: 1, awayScore: 2, completed: true },
  { home: "Red Lions", away: "Phoenix SC", homeScore: 2, awayScore: 1, completed: true },
  { home: "United FC", away: "Dynamo City", homeScore: 1, awayScore: 1, completed: false },
];

const semifinals: BracketMatch[] = [
  { home: "FC Thunder", away: "Blue Eagles", homeScore: 2, awayScore: 0, completed: true },
  { home: "Red Lions", away: "TBD", completed: false },
];

const final: BracketMatch[] = [
  { home: "FC Thunder", away: "TBD", completed: false },
];

function BracketMatchCard({ match }: { match: BracketMatch }) {
  const homeWin = match.completed && (match.homeScore ?? 0) > (match.awayScore ?? 0);
  const awayWin = match.completed && (match.awayScore ?? 0) > (match.homeScore ?? 0);

  return (
    <div className="bg-card rounded-lg border overflow-hidden w-56 shrink-0">
      <div className={cn("flex items-center justify-between px-3 py-2 border-b", homeWin && "bg-secondary/5")}>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{match.home.slice(0, 2).toUpperCase()}</div>
          <span className={cn("text-sm", homeWin && "font-bold")}>{match.home}</span>
        </div>
        <span className={cn("text-sm font-bold", homeWin && "text-secondary")}>{match.homeScore ?? "—"}</span>
      </div>
      <div className={cn("flex items-center justify-between px-3 py-2", awayWin && "bg-secondary/5")}>
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold">{match.away.slice(0, 2).toUpperCase()}</div>
          <span className={cn("text-sm", awayWin && "font-bold")}>{match.away}</span>
        </div>
        <span className={cn("text-sm font-bold", awayWin && "text-secondary")}>{match.awayScore ?? "—"}</span>
      </div>
    </div>
  );
}

export default function TournamentBracketPage() {
  return (
    <div className="space-y-6">
      <div className="page-header">
        <h1 className="text-2xl font-bold">Tournament Bracket</h1>
        <p className="text-muted-foreground">Premier Cup 2026 · Knockout Stage</p>
      </div>

      <div className="bg-card rounded-xl border p-6 overflow-x-auto">
        <div className="flex gap-12 min-w-[800px] items-start">
          {/* Quarterfinals */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-3">Quarterfinals</h3>
            <div className="space-y-4">
              {quarterfinals.map((m, i) => <BracketMatchCard key={i} match={m} />)}
            </div>
          </div>

          {/* Connector lines visual */}
          <div className="flex items-center pt-10">
            <div className="space-y-[88px]">
              {[0, 1].map(i => (
                <div key={i} className="w-8 h-16 border-r-2 border-t-2 border-b-2 border-border rounded-r-lg" />
              ))}
            </div>
          </div>

          {/* Semifinals */}
          <div className="space-y-2 pt-10">
            <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-3">Semifinals</h3>
            <div className="space-y-12">
              {semifinals.map((m, i) => <BracketMatchCard key={i} match={m} />)}
            </div>
          </div>

          {/* Connector */}
          <div className="flex items-center pt-20">
            <div className="w-8 h-24 border-r-2 border-t-2 border-b-2 border-border rounded-r-lg" />
          </div>

          {/* Final */}
          <div className="space-y-2 pt-24">
            <h3 className="text-xs font-semibold uppercase text-muted-foreground mb-3">Final</h3>
            {final.map((m, i) => <BracketMatchCard key={i} match={m} />)}
            <div className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-2 rounded-lg">
                <span className="text-lg">🏆</span>
                <span className="text-sm font-bold">Champion: TBD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
