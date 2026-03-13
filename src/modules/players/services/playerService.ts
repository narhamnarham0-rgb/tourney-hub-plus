import { supabase } from "@/integrations/supabase/client";
import { PlayerFormData } from "../components/PlayerRegistrationForm";
import { Database } from "@/integrations/supabase/types";

type PlayerRow = Database["public"]["Tables"]["players"]["Row"];

export const playerService = {
  getPlayers: async (page = 1, limit = 10, filters?: {
    search?: string;
    organizationId?: string;
    teamId?: string;
    ageCategory?: string[];
    position?: string[];
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    let query = supabase.from("players").select("*, teams(name, logo_url)", { count: "exact" });

    if (filters?.search) {
      query = query.or(`name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }
    if (filters?.organizationId) {
      query = query.eq("organization_id", filters.organizationId);
    }
    if (filters?.teamId) {
      query = query.eq("team_id", filters.teamId);
    }
    if (filters?.ageCategory && filters.ageCategory.length > 0) {
      query = query.in("age_category", filters.ageCategory as any);
    }
    if (filters?.position && filters.position.length > 0) {
      query = query.in("primary_position", filters.position as any);
    }

    const sortCol = filters?.sortBy || "created_at";
    const sortDir = filters?.sortOrder === "asc";
    query = query.order(sortCol, { ascending: sortDir });

    const from = (page - 1) * limit;
    query = query.range(from, from + limit - 1);

    const { data, count, error } = await query;
    if (error) throw error;

    return {
      items: data || [],
      total: count || 0,
      page,
      totalPages: Math.ceil((count || 0) / limit),
    };
  },

  getPlayerById: async (id: string) => {
    const { data, error } = await supabase
      .from("players")
      .select("*, teams(name, logo_url)")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },

  createPlayer: async (input: PlayerFormData) => {
    const insertData: Database["public"]["Tables"]["players"]["Insert"] = {
      name: input.name,
      date_of_birth: input.dateOfBirth || null,
      email: input.email || null,
      phone: input.phone || null,
      address: input.address || null,
      nationality: input.nationality || null,
      team_id: input.teamId || null,
      organization_id: input.organizationId,
      age_category: input.ageCategory,
      primary_position: input.primaryPosition,
      secondary_position: input.secondaryPosition || null,
      jersey_number: input.jerseyNumber || null,
      photo_url: input.photoUrl || null,
      emergency_contact: input.emergencyContact as unknown as Database["public"]["Tables"]["players"]["Insert"]["emergency_contact"],
      status: input.status,
    };

    const { data, error } = await supabase
      .from("players")
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updatePlayer: async (id: string, updates: Partial<Database["public"]["Tables"]["players"]["Update"]>) => {
    const { data, error } = await supabase
      .from("players")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  deletePlayer: async (id: string) => {
    const { error } = await supabase.from("players").delete().eq("id", id);
    if (error) throw error;
    return true;
  },

  bulkDelete: async (ids: string[]) => {
    const { error } = await supabase.from("players").delete().in("id", ids);
    if (error) throw error;
    return true;
  },
};
