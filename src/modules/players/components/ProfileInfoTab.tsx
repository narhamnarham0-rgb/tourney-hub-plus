import React from "react";
import { Mail, Phone, MapPin, Calendar, User, Shield, AlertCircle } from "lucide-react";

interface ProfileInfoTabProps {
  player: any;
}

export function ProfileInfoTab({ player }: ProfileInfoTabProps) {
  const emergencyContact = player.emergency_contact || player.emergencyContact || {};
  const dateOfBirth = player.date_of_birth || player.dateOfBirth;
  const email = player.email;
  const phone = player.phone;
  const address = player.address;
  const nationality = player.nationality;
  const teamName = player.teams?.name || player.clubName || "Unassigned";
  const teamLogo = player.teams?.logo_url || player.clubLogo;
  const ageCategory = player.age_category || player.ageCategory || "—";
  const primaryPosition = player.primary_position || player.primaryPosition || "—";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Personal Details */}
      <div className="bg-card rounded-3xl border p-8 shadow-sm">
        <h3 className="text-xl font-black tracking-tight mb-6 flex items-center gap-2">
          <User className="h-5 w-5 text-secondary" />
          Personal Details
        </h3>
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Date of Birth</p>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-bold">{dateOfBirth ? new Date(dateOfBirth).toLocaleDateString() : "—"}</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Nationality</p>
              <p className="font-bold">{nationality || "—"}</p>
            </div>
          </div>
          
          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Email Address</p>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span className="font-bold">{email || "—"}</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Phone Number</p>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span className="font-bold">{phone || "—"}</span>
            </div>
          </div>

          <div>
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Physical Address</p>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="font-bold">{address || "—"}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Club & Emergency Info */}
      <div className="space-y-8">
        <div className="bg-card rounded-3xl border p-8 shadow-sm">
          <h3 className="text-xl font-black tracking-tight mb-6 flex items-center gap-2">
            <Shield className="h-5 w-5 text-secondary" />
            Club Assignment
          </h3>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-muted/30 border border-muted/50">
            <div className="h-12 w-12 rounded-xl bg-background flex items-center justify-center border shadow-sm">
              {teamLogo ? (
                <img src={teamLogo} alt={teamName} className="h-8 w-8 object-contain" />
              ) : (
                <Shield className="h-6 w-6 text-secondary" />
              )}
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Current Club</p>
              <p className="text-lg font-black">{teamName}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Age Category</p>
              <p className="font-bold">{ageCategory}</p>
            </div>
            <div>
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-1">Primary Position</p>
              <p className="font-bold capitalize">{primaryPosition?.replace("_", " ")}</p>
            </div>
          </div>
        </div>

        <div className="bg-destructive/5 rounded-3xl border border-destructive/10 p-8 shadow-sm">
          <h3 className="text-xl font-black tracking-tight mb-6 flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Emergency Contact
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-[10px] font-black text-destructive/60 uppercase tracking-widest mb-1">Contact Name</p>
              <p className="font-black">{emergencyContact.name || "—"}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] font-black text-destructive/60 uppercase tracking-widest mb-1">Relationship</p>
                <p className="font-bold">{emergencyContact.relationship || "—"}</p>
              </div>
              <div>
                <p className="text-[10px] font-black text-destructive/60 uppercase tracking-widest mb-1">Phone</p>
                <p className="font-bold">{emergencyContact.phone || "—"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
