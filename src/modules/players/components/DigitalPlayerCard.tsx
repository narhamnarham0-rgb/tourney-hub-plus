import React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Shield, Trophy } from "lucide-react";
import { Tables } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type DbPlayer = Tables<"players">;

interface DigitalPlayerCardProps {
  player: DbPlayer;
  className?: string;
}

const ageCategoryColors: Record<string, string> = {
  u8: "bg-blue-500",
  u9: "bg-blue-400",
  u10: "bg-green-500",
  u11: "bg-green-400",
  u12: "bg-yellow-500",
  u13: "bg-yellow-400",
  u15: "bg-orange-500",
  u17: "bg-red-500",
  u19: "bg-purple-500",
  u21: "bg-indigo-500",
  senior: "bg-black",
};

export function DigitalPlayerCard({ player, className }: DigitalPlayerCardProps) {
  const profileUrl = `${window.location.origin}/players/${player.id}`;
  const initials = player.name.split(" ").map(n => n[0]).join("");

  return (
    <div className={cn(
      "w-full max-w-[350px] bg-gradient-to-br from-sidebar-background to-sidebar-accent rounded-3xl overflow-hidden shadow-2xl border border-sidebar-border transition-transform hover:scale-[1.02]",
      className
    )}>
      {/* Card Header */}
      <div className="p-6 pb-0 flex justify-between items-start">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
            <Shield className="h-6 w-6 text-white/70" />
          </div>
          <div className="flex flex-col">
            <span className="text-white/50 text-[10px] font-black uppercase tracking-widest leading-none">Player</span>
            <span className="text-white font-black text-sm truncate max-w-[120px]">
              #{player.jersey_number || "—"}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-white/50 text-[10px] font-black uppercase tracking-widest leading-none mb-1">Player ID</span>
          <span className="text-white font-mono font-black text-sm">{player.id.slice(0, 8)}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 flex flex-col items-center">
        {/* Photo Container */}
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-secondary blur-2xl opacity-20 animate-pulse" />
          <div className="h-44 w-44 rounded-full border-4 border-white/10 p-1 relative z-10 overflow-hidden">
            {player.photo_url ? (
              <img 
                src={player.photo_url} 
                alt={player.name} 
                className="h-full w-full object-cover rounded-full"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full bg-sidebar-muted flex items-center justify-center text-white/20 text-4xl font-black">
                {initials}
              </div>
            )}
          </div>
          {/* Position Badge Overlay */}
          {player.primary_position && (
            <div className="absolute -bottom-2 -right-2 bg-secondary text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg border border-white/10">
              {player.primary_position.toUpperCase()}
            </div>
          )}
        </div>

        {/* Name and Info */}
        <div className="text-center w-full mb-6">
          <h3 className="text-2xl font-black text-white tracking-tighter truncate px-4" title={player.name}>
            {player.name}
          </h3>
          <div className="flex items-center justify-center gap-2 mt-2">
            {player.age_category && (
              <Badge className={cn("text-[10px] font-black uppercase tracking-widest px-3", ageCategoryColors[player.age_category] || "bg-muted")}>
                {player.age_category}
              </Badge>
            )}
            {player.nationality && (
              <>
                <div className="h-1 w-1 rounded-full bg-white/30" />
                <span className="text-white/60 text-xs font-bold uppercase tracking-widest">
                  {player.nationality}
                </span>
              </>
            )}
          </div>
        </div>

        {/* QR Code and Profile Link */}
        <div className="flex items-center justify-between w-full pt-6 border-t border-white/10">
          <div className="flex flex-col">
            <span className="text-white/40 text-[9px] font-black uppercase tracking-widest mb-1">Scan for Profile</span>
            <div className="p-2 bg-white rounded-xl shadow-inner">
              <QRCodeSVG 
                value={profileUrl} 
                size={80} 
                level="M" 
                includeMargin={false}
                imageSettings={{
                  src: "/favicon.ico",
                  x: undefined,
                  y: undefined,
                  height: 16,
                  width: 16,
                  excavate: true,
                }}
              />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-secondary mb-2">
              <Trophy className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Player Card</span>
            </div>
            <p className="text-[8px] text-white/30 font-bold uppercase tracking-widest text-right">
              Verified by KickOff Plus<br />© 2026 Tourney Hub
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
