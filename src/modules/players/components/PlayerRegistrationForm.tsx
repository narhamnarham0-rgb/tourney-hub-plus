import React, { useState, useEffect, useRef } from "react";
import { 
  User, 
  Shield, 
  FileText, 
  Users, 
  Check, 
  ChevronRight, 
  ChevronLeft,
  Camera,
  Upload,
  Info,
  ClipboardCheck,
  X,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Database } from "@/integrations/supabase/types";

type DbAgeCategory = Database["public"]["Enums"]["age_category"];
type DbPlayerPosition = Database["public"]["Enums"]["player_position"];

interface PlayerRegistrationFormProps {
  onSubmit: (data: PlayerFormData) => void;
  onCancel: () => void;
}

export interface PlayerFormData {
  name: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  nationality: string;
  teamId: string;
  organizationId: string;
  ageCategory: DbAgeCategory;
  primaryPosition: DbPlayerPosition;
  secondaryPosition?: DbPlayerPosition;
  jerseyNumber?: number;
  photoUrl?: string;
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
  documentUrls: string[];
  status: "active" | "inactive" | "suspended";
}

const steps = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "Club & Position", icon: Shield },
  { id: 3, label: "Documents", icon: FileText },
  { id: 4, label: "Guardian Info", icon: Users },
  { id: 5, label: "Review", icon: ClipboardCheck },
];

const positionMap: Record<string, DbPlayerPosition> = {
  "Goalkeeper": "goalkeeper",
  "Defender": "defender",
  "Midfielder": "midfielder",
  "Forward": "forward",
  "Multi-position": "multi_position",
};

const ageCategoryMap: Record<string, DbAgeCategory> = {
  "U8": "u8",
  "U9": "u9",
  "U10": "u10",
  "U11": "u11",
  "U12": "u12",
  "U13": "u13",
  "U15": "u15",
  "U17": "u17",
  "U19": "u19",
  "U21": "u21",
  "Senior": "senior",
};

type FormState = {
  name: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  nationality: string;
  teamId: string;
  organizationId: string;
  ageCategory: string;
  primaryPosition: string;
  secondaryPosition: string;
  jerseyNumber: string;
  guardianName: string;
  guardianRelationship: string;
  guardianPhone: string;
  photoUrl: string;
  documentUrls: string[];
};

interface TeamOption {
  id: string;
  name: string;
  organization_id: string;
  logo_url: string | null;
}

interface OrgOption {
  id: string;
  name: string;
}

export function PlayerRegistrationForm({ onSubmit, onCancel }: PlayerRegistrationFormProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [teams, setTeams] = useState<TeamOption[]>([]);
  const [organizations, setOrganizations] = useState<OrgOption[]>([]);
  const [loadingTeams, setLoadingTeams] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const idDocInputRef = useRef<HTMLInputElement>(null);
  const medicalInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<FormState>({
    name: "",
    dateOfBirth: "",
    email: "",
    phone: "",
    address: "",
    nationality: "",
    teamId: "",
    organizationId: "",
    ageCategory: "",
    primaryPosition: "",
    secondaryPosition: "",
    jerseyNumber: "",
    guardianName: "",
    guardianRelationship: "",
    guardianPhone: "",
    photoUrl: "",
    documentUrls: [],
  });

  // Fetch organizations
  useEffect(() => {
    const fetchOrgs = async () => {
      const { data } = await supabase.from("organizations").select("id, name").order("name");
      if (data) setOrganizations(data);
    };
    fetchOrgs();
  }, []);

  // Fetch teams when organization changes
  useEffect(() => {
    if (!formData.organizationId) {
      setTeams([]);
      return;
    }
    const fetchTeams = async () => {
      setLoadingTeams(true);
      const { data } = await supabase
        .from("teams")
        .select("id, name, organization_id, logo_url")
        .eq("organization_id", formData.organizationId)
        .eq("status", "active")
        .order("name");
      if (data) setTeams(data);
      setLoadingTeams(false);
    };
    fetchTeams();
  }, [formData.organizationId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === "organizationId") {
      setFormData(prev => ({ ...prev, teamId: "" }));
    }
  };

  const isMinor = () => {
    if (!formData.dateOfBirth) return false;
    const birthDate = new Date(formData.dateOfBirth);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age < 18;
  };

  // Validation per step
  const validateStep = (step: number): string[] => {
    const errors: string[] = [];
    switch (step) {
      case 1:
        if (!formData.name.trim()) errors.push("Full Name is required");
        if (!formData.dateOfBirth) errors.push("Date of Birth is required");
        if (!formData.email.trim()) errors.push("Email is required");
        break;
      case 2:
        if (!formData.organizationId) errors.push("Organization is required");
        if (!formData.primaryPosition) errors.push("Primary Position is required");
        break;
      case 3:
        // Optional
        break;
      case 4:
        if (isMinor()) {
          if (!formData.guardianName.trim()) errors.push("Guardian Name is required for minors");
          if (!formData.guardianPhone.trim()) errors.push("Guardian Phone is required for minors");
          if (!formData.guardianRelationship) errors.push("Guardian Relationship is required for minors");
        }
        break;
    }
    return errors;
  };

  const nextStep = () => {
    const errors = validateStep(currentStep);
    if (errors.length > 0) {
      toast.error("Please fix the following:", { description: errors.join(", ") });
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, steps.length));
  };

  const prevStep = () => setCurrentStep(prev => Math.max(prev - 1, 1));

  // Photo upload
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Photo must be under 5MB");
      return;
    }
    setUploadingPhoto(true);
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("player-photos").upload(path, file);
    if (error) {
      toast.error("Failed to upload photo");
      setUploadingPhoto(false);
      return;
    }
    const { data: urlData } = supabase.storage.from("player-photos").getPublicUrl(path);
    setFormData(prev => ({ ...prev, photoUrl: urlData.publicUrl }));
    setUploadingPhoto(false);
    toast.success("Photo uploaded");
  };

  // Document upload
  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>, label: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10MB");
      return;
    }
    setUploadingDoc(label);
    const ext = file.name.split(".").pop();
    const path = `player-docs/${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("documents").upload(path, file);
    if (error) {
      toast.error(`Failed to upload ${label}`);
      setUploadingDoc(null);
      return;
    }
    // Store path reference (private bucket)
    setFormData(prev => ({ ...prev, documentUrls: [...prev.documentUrls, path] }));
    setUploadingDoc(null);
    toast.success(`${label} uploaded`);
  };

  const removeDocument = (idx: number) => {
    setFormData(prev => ({
      ...prev,
      documentUrls: prev.documentUrls.filter((_, i) => i !== idx),
    }));
  };

  const submit = () => {
    // Final validation
    for (let s = 1; s <= 4; s++) {
      const errors = validateStep(s);
      if (errors.length > 0) {
        toast.error(`Step ${s} has errors`, { description: errors.join(", ") });
        setCurrentStep(s);
        return;
      }
    }

    const data: PlayerFormData = {
      name: formData.name,
      dateOfBirth: formData.dateOfBirth,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      nationality: formData.nationality,
      teamId: formData.teamId || "",
      organizationId: formData.organizationId,
      ageCategory: ageCategoryMap[formData.ageCategory] || "senior",
      primaryPosition: positionMap[formData.primaryPosition] || "midfielder",
      secondaryPosition: formData.secondaryPosition ? positionMap[formData.secondaryPosition] : undefined,
      jerseyNumber: formData.jerseyNumber ? parseInt(formData.jerseyNumber) : undefined,
      photoUrl: formData.photoUrl || undefined,
      emergencyContact: {
        name: formData.guardianName || "N/A",
        relationship: formData.guardianRelationship || "N/A",
        phone: formData.guardianPhone || "N/A",
      },
      documentUrls: formData.documentUrls,
      status: "active",
    };

    onSubmit(data);
  };

  const inputClass = "h-12 rounded-xl border-muted-foreground/20 focus:border-secondary focus:ring-secondary/5 transition-all";

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Full Name *</Label>
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Cristiano Ronaldo" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Date of Birth *</Label>
                <Input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Nationality</Label>
                <Input name="nationality" value={formData.nationality} onChange={handleChange} placeholder="e.g. Brazil" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Email Address *</Label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="player@club.com" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Phone Number</Label>
                <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" className={inputClass} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Residential Address</Label>
                <Input name="address" value={formData.address} onChange={handleChange} placeholder="123 Football Ave, Soccer City" className={inputClass} />
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Organization *</Label>
                <Select value={formData.organizationId} onValueChange={(v) => handleSelectChange("organizationId", v)}>
                  <SelectTrigger className="h-12 rounded-xl border-muted-foreground/20">
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {organizations.map(o => (
                      <SelectItem key={o.id} value={o.id}>{o.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Team Assignment</Label>
                <Select value={formData.teamId} onValueChange={(v) => handleSelectChange("teamId", v)} disabled={!formData.organizationId || loadingTeams}>
                  <SelectTrigger className="h-12 rounded-xl border-muted-foreground/20">
                    <SelectValue placeholder={loadingTeams ? "Loading teams..." : "Select a team"} />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {teams.map(t => (
                      <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Age Category</Label>
                <Select value={formData.ageCategory} onValueChange={(v) => handleSelectChange("ageCategory", v)}>
                  <SelectTrigger className="h-12 rounded-xl border-muted-foreground/20">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {Object.keys(ageCategoryMap).map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Jersey Number</Label>
                <Input type="number" name="jerseyNumber" value={formData.jerseyNumber} onChange={handleChange} placeholder="e.g. 10" min="1" max="99" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Primary Position *</Label>
                <Select value={formData.primaryPosition} onValueChange={(v) => handleSelectChange("primaryPosition", v)}>
                  <SelectTrigger className="h-12 rounded-xl border-muted-foreground/20">
                    <SelectValue placeholder="Select position" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {Object.keys(positionMap).map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Secondary Position</Label>
                <Select value={formData.secondaryPosition} onValueChange={(v) => handleSelectChange("secondaryPosition", v)}>
                  <SelectTrigger className="h-12 rounded-xl border-muted-foreground/20">
                    <SelectValue placeholder="Select secondary" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    {Object.keys(positionMap).map(p => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Photo Upload */}
              <div className="space-y-4 p-6 bg-muted/30 rounded-3xl border border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-center">
                {formData.photoUrl ? (
                  <div className="relative">
                    <img src={formData.photoUrl} alt="Player" className="h-24 w-24 rounded-2xl object-cover" />
                    <button onClick={() => setFormData(prev => ({ ...prev, photoUrl: "" }))} className="absolute -top-2 -right-2 h-6 w-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center">
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ) : (
                  <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Camera className="h-8 w-8 text-secondary" />
                  </div>
                )}
                <div>
                  <h4 className="font-black text-sm">Player Photo</h4>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">PNG, JPG up to 5MB</p>
                </div>
                <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
                <Button variant="outline" size="sm" className="rounded-xl font-bold h-9" onClick={() => photoInputRef.current?.click()} disabled={uploadingPhoto}>
                  {uploadingPhoto ? "Uploading..." : formData.photoUrl ? "Change Photo" : "Upload Photo"}
                </Button>
              </div>

              {/* ID Document Upload */}
              <div className="space-y-4 p-6 bg-muted/30 rounded-3xl border border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-center">
                <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Upload className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h4 className="font-black text-sm">ID Verification</h4>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Passport or ID Card</p>
                </div>
                <input ref={idDocInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleDocUpload(e, "ID Document")} />
                <Button variant="outline" size="sm" className="rounded-xl font-bold h-9" onClick={() => idDocInputRef.current?.click()} disabled={uploadingDoc === "ID Document"}>
                  {uploadingDoc === "ID Document" ? "Uploading..." : "Upload Document"}
                </Button>
              </div>

              {/* Medical Record Upload */}
              <div className="space-y-4 p-6 bg-muted/30 rounded-3xl border border-dashed border-muted-foreground/30 flex flex-col items-center justify-center text-center md:col-span-2">
                <div className="h-16 w-16 rounded-full bg-secondary/10 flex items-center justify-center">
                  <FileText className="h-8 w-8 text-secondary" />
                </div>
                <div>
                  <h4 className="font-black text-sm">Medical Clearance</h4>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Certified Medical Record</p>
                </div>
                <input ref={medicalInputRef} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={(e) => handleDocUpload(e, "Medical Record")} />
                <Button variant="outline" size="sm" className="rounded-xl font-bold h-9" onClick={() => medicalInputRef.current?.click()} disabled={uploadingDoc === "Medical Record"}>
                  {uploadingDoc === "Medical Record" ? "Uploading..." : "Upload Record"}
                </Button>
              </div>
            </div>

            {/* Uploaded documents list */}
            {formData.documentUrls.length > 0 && (
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Uploaded Documents</Label>
                <div className="space-y-2">
                  {formData.documentUrls.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-xl border">
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-secondary" />
                        <span className="text-sm font-medium truncate max-w-[200px]">{doc.split("/").pop()}</span>
                      </div>
                      <button onClick={() => removeDocument(idx)} className="text-muted-foreground hover:text-destructive transition-colors">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {isMinor() && (
              <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-2xl flex items-start gap-3 mb-4">
                <AlertTriangle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-destructive">
                  This player is under 18. Guardian information is <strong>required</strong>.
                </p>
              </div>
            )}
            {!isMinor() && (
              <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-start gap-3 mb-4">
                <Info className="h-5 w-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-sm font-medium text-blue-700">
                  This player is an adult. Guardian information is optional but recommended.
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Guardian Name {isMinor() && "*"}</Label>
                <Input name="guardianName" value={formData.guardianName} onChange={handleChange} placeholder="e.g. Mary Jane" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Relationship {isMinor() && "*"}</Label>
                <Select value={formData.guardianRelationship} onValueChange={(v) => handleSelectChange("guardianRelationship", v)}>
                  <SelectTrigger className="h-12 rounded-xl border-muted-foreground/20">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="Father">Father</SelectItem>
                    <SelectItem value="Mother">Mother</SelectItem>
                    <SelectItem value="Sibling">Sibling</SelectItem>
                    <SelectItem value="Other">Legal Guardian</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Guardian Phone {isMinor() && "*"}</Label>
                <Input name="guardianPhone" value={formData.guardianPhone} onChange={handleChange} placeholder="+1 987 654 321" className={inputClass} />
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
            {/* Review Summary */}
            <div className="space-y-4">
              <ReviewSection title="Personal Information">
                <ReviewItem label="Full Name" value={formData.name} />
                <ReviewItem label="Date of Birth" value={formData.dateOfBirth} />
                <ReviewItem label="Nationality" value={formData.nationality} />
                <ReviewItem label="Email" value={formData.email} />
                <ReviewItem label="Phone" value={formData.phone} />
                <ReviewItem label="Address" value={formData.address} />
              </ReviewSection>

              <ReviewSection title="Club & Position">
                <ReviewItem label="Organization" value={organizations.find(o => o.id === formData.organizationId)?.name || "—"} />
                <ReviewItem label="Team" value={teams.find(t => t.id === formData.teamId)?.name || "Not assigned"} />
                <ReviewItem label="Age Category" value={formData.ageCategory || "Senior"} />
                <ReviewItem label="Jersey Number" value={formData.jerseyNumber || "—"} />
                <ReviewItem label="Primary Position" value={formData.primaryPosition || "—"} />
                <ReviewItem label="Secondary Position" value={formData.secondaryPosition || "—"} />
              </ReviewSection>

              <ReviewSection title="Documents">
                <ReviewItem label="Player Photo" value={formData.photoUrl ? "✓ Uploaded" : "Not uploaded"} />
                <ReviewItem label="Documents" value={formData.documentUrls.length > 0 ? `${formData.documentUrls.length} file(s) uploaded` : "None uploaded"} />
              </ReviewSection>

              <ReviewSection title="Guardian / Emergency Contact">
                <ReviewItem label="Guardian Name" value={formData.guardianName || "—"} />
                <ReviewItem label="Relationship" value={formData.guardianRelationship || "—"} />
                <ReviewItem label="Phone" value={formData.guardianPhone || "—"} />
              </ReviewSection>

              {/* Warnings */}
              {(() => {
                const allWarnings: string[] = [];
                if (!formData.photoUrl) allWarnings.push("No player photo uploaded");
                if (formData.documentUrls.length === 0) allWarnings.push("No documents uploaded");
                if (!formData.teamId) allWarnings.push("No team assigned");
                if (allWarnings.length === 0) return null;
                return (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-bold text-yellow-700 mb-1">Optional items missing:</p>
                      <ul className="text-xs text-yellow-600 space-y-0.5">
                        {allWarnings.map((w, i) => <li key={i}>• {w}</li>)}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-card rounded-[2.5rem] border shadow-xl overflow-hidden border-muted max-w-3xl mx-auto">
      {/* Progress Stepper */}
      <div className="bg-muted/30 border-b p-8 flex justify-between">
        {steps.map((step) => {
          const isActive = step.id === currentStep;
          const isCompleted = step.id < currentStep;
          return (
            <div key={step.id} className="flex flex-col items-center gap-3 relative z-10 flex-1">
              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500",
                isActive ? "bg-secondary border-secondary text-secondary-foreground shadow-lg shadow-secondary/20 scale-110" : 
                isCompleted ? "bg-success/20 border-success text-success" : 
                "bg-background border-muted text-muted-foreground"
              )}>
                {isCompleted ? <Check className="h-6 w-6" /> : <step.icon className="h-6 w-6" />}
              </div>
              <span className={cn(
                "text-[10px] font-black uppercase tracking-widest hidden md:block",
                isActive ? "text-secondary" : isCompleted ? "text-success" : "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Form Content */}
      <div className="p-8 md:p-12">
        <div className="mb-10">
          <h3 className="text-2xl font-black tracking-tighter">
            {steps.find(s => s.id === currentStep)?.label}
          </h3>
          <p className="text-muted-foreground font-medium">
            {currentStep === 5 ? "Review all information before submitting." : "Please provide the details below to continue."}
          </p>
        </div>

        {renderStep()}

        {/* Form Actions */}
        <div className="flex items-center justify-between mt-12 pt-8 border-t border-muted">
          <Button 
            variant="ghost" 
            onClick={currentStep === 1 ? onCancel : prevStep}
            className="h-12 px-6 rounded-2xl font-black text-xs uppercase tracking-widest gap-2"
          >
            {currentStep === 1 ? "CANCEL REGISTRATION" : <><ChevronLeft className="h-4 w-4" /> PREVIOUS STEP</>}
          </Button>

          <Button 
            onClick={currentStep === steps.length ? submit : nextStep}
            className="h-12 px-8 bg-secondary hover:bg-secondary/90 text-secondary-foreground font-black rounded-2xl gap-2 shadow-lg shadow-secondary/20 transition-all"
          >
            {currentStep === steps.length ? "COMPLETE REGISTRATION" : <>NEXT STEP <ChevronRight className="h-4 w-4" /></>}
          </Button>
        </div>
      </div>
    </div>
  );
}

// Helper components for review step
function ReviewSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-muted/20 rounded-2xl border p-5 space-y-3">
      <h4 className="text-xs font-black uppercase tracking-widest text-secondary">{title}</h4>
      <div className="grid grid-cols-2 gap-x-6 gap-y-2">{children}</div>
    </div>
  );
}

function ReviewItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{label}</p>
      <p className="text-sm font-semibold">{value || "—"}</p>
    </div>
  );
}
