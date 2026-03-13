
-- =============================================
-- PHASE 1: ENUMS
-- =============================================

CREATE TYPE public.org_plan AS ENUM ('starter', 'pro', 'enterprise');
CREATE TYPE public.org_status AS ENUM ('active', 'inactive');
CREATE TYPE public.org_member_role AS ENUM ('admin', 'manager', 'coordinator', 'referee_manager', 'analyst');
CREATE TYPE public.member_status AS ENUM ('active', 'invited', 'suspended');
CREATE TYPE public.tournament_format AS ENUM ('league', 'knockout', 'group_knockout', 'round_robin');
CREATE TYPE public.tournament_status AS ENUM ('draft', 'upcoming', 'active', 'completed');
CREATE TYPE public.team_status AS ENUM ('active', 'inactive', 'pending');
CREATE TYPE public.player_status AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE public.player_position AS ENUM ('goalkeeper', 'defender', 'midfielder', 'forward', 'multi_position');
CREATE TYPE public.match_status AS ENUM ('upcoming', 'live', 'completed', 'delayed');
CREATE TYPE public.match_event_type AS ENUM ('goal', 'yellow_card', 'red_card', 'substitution', 'var_review');
CREATE TYPE public.referee_role AS ENUM ('referee', 'assistant_1', 'assistant_2', 'fourth_official', 'var');
CREATE TYPE public.venue_type AS ENUM ('stadium', 'arena', 'training_ground', 'indoor', 'community_field');
CREATE TYPE public.booking_status AS ENUM ('available', 'pending', 'booked');
CREATE TYPE public.report_type AS ENUM ('tournament_summary', 'player_performance', 'match_report', 'financial', 'attendance', 'discipline');
CREATE TYPE public.age_category AS ENUM ('senior', 'u21', 'u19', 'u17', 'u15', 'u13', 'u12', 'u11', 'u10', 'u9', 'u8');
CREATE TYPE public.app_role AS ENUM ('super_admin', 'organizer', 'club_manager', 'referee', 'player', 'viewer');
CREATE TYPE public.report_status AS ENUM ('pending', 'generating', 'completed', 'failed');

-- =============================================
-- PHASE 1: TABLES
-- =============================================

-- 1. Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. User Roles (separate table per security guidelines)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

-- 3. Organizations
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  short_name TEXT,
  description TEXT,
  city TEXT,
  country TEXT,
  founded_year INTEGER,
  plan public.org_plan NOT NULL DEFAULT 'starter',
  status public.org_status NOT NULL DEFAULT 'active',
  logo_url TEXT,
  phone TEXT,
  website TEXT,
  contact_email TEXT,
  timezone TEXT DEFAULT 'UTC',
  social_links JSONB DEFAULT '{}',
  owner_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Organization Members
CREATE TABLE public.organization_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  role public.org_member_role NOT NULL DEFAULT 'coordinator',
  status public.member_status NOT NULL DEFAULT 'active',
  invited_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (organization_id, user_id)
);

-- 5. Tournaments
CREATE TABLE public.tournaments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  format public.tournament_format NOT NULL DEFAULT 'league',
  age_category public.age_category NOT NULL DEFAULT 'senior',
  start_date DATE,
  end_date DATE,
  location TEXT,
  max_teams INTEGER DEFAULT 16,
  registration_deadline DATE,
  logo_url TEXT,
  status public.tournament_status NOT NULL DEFAULT 'draft',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Teams
CREATE TABLE public.teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  city TEXT,
  logo_url TEXT,
  description TEXT,
  founding_date DATE,
  coach_name TEXT,
  manager_name TEXT,
  status public.team_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 7. Players
CREATE TABLE public.players (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  photo_url TEXT,
  date_of_birth DATE,
  age_category public.age_category DEFAULT 'senior',
  primary_position public.player_position DEFAULT 'midfielder',
  secondary_position public.player_position,
  nationality TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  jersey_number INTEGER,
  emergency_contact JSONB DEFAULT '{}',
  status public.player_status NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 8. Tournament Teams (many-to-many)
CREATE TABLE public.tournament_teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES public.tournaments(id) ON DELETE CASCADE NOT NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  registered_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tournament_id, team_id)
);

-- 9. Venues
CREATE TABLE public.venues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  type public.venue_type NOT NULL DEFAULT 'stadium',
  city TEXT,
  country TEXT,
  address TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  timezone TEXT DEFAULT 'UTC',
  capacity INTEGER,
  length_m NUMERIC,
  width_m NUMERIC,
  facilities TEXT[] DEFAULT '{}',
  amenities JSONB DEFAULT '{}',
  contact JSONB DEFAULT '{}',
  pricing JSONB DEFAULT '{}',
  description TEXT,
  images JSONB DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 10. Venue Bookings
CREATE TABLE public.venue_bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  venue_id UUID REFERENCES public.venues(id) ON DELETE CASCADE NOT NULL,
  status public.booking_status NOT NULL DEFAULT 'pending',
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ NOT NULL,
  requester_name TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 11. Referees
CREATE TABLE public.referees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.profiles(id),
  name TEXT NOT NULL,
  badge_level TEXT,
  email TEXT,
  phone TEXT,
  photo_url TEXT,
  rating NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 12. Matches
CREATE TABLE public.matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES public.tournaments(id) ON DELETE CASCADE NOT NULL,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  round TEXT,
  date_time TIMESTAMPTZ,
  venue_id UUID REFERENCES public.venues(id) ON DELETE SET NULL,
  status public.match_status NOT NULL DEFAULT 'upcoming',
  minute INTEGER DEFAULT 0,
  home_team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  away_team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  home_score INTEGER NOT NULL DEFAULT 0,
  away_score INTEGER NOT NULL DEFAULT 0,
  weather JSONB DEFAULT '{}',
  stats JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 13. Match Events
CREATE TABLE public.match_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE NOT NULL,
  minute INTEGER NOT NULL,
  type public.match_event_type NOT NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  player_name TEXT,
  player_in TEXT,
  player_out TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 14. Match Referees
CREATE TABLE public.match_referees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES public.matches(id) ON DELETE CASCADE NOT NULL,
  referee_id UUID REFERENCES public.referees(id) ON DELETE CASCADE NOT NULL,
  role public.referee_role NOT NULL DEFAULT 'referee',
  UNIQUE (match_id, referee_id)
);

-- 15. Standings
CREATE TABLE public.standings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id UUID REFERENCES public.tournaments(id) ON DELETE CASCADE NOT NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  position INTEGER NOT NULL DEFAULT 0,
  played INTEGER NOT NULL DEFAULT 0,
  wins INTEGER NOT NULL DEFAULT 0,
  draws INTEGER NOT NULL DEFAULT 0,
  losses INTEGER NOT NULL DEFAULT 0,
  goals_for INTEGER NOT NULL DEFAULT 0,
  goals_against INTEGER NOT NULL DEFAULT 0,
  points INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (tournament_id, team_id)
);

-- 16. Player Statistics
CREATE TABLE public.player_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES public.players(id) ON DELETE CASCADE NOT NULL,
  tournament_id UUID REFERENCES public.tournaments(id) ON DELETE CASCADE NOT NULL,
  goals INTEGER NOT NULL DEFAULT 0,
  assists INTEGER NOT NULL DEFAULT 0,
  yellow_cards INTEGER NOT NULL DEFAULT 0,
  red_cards INTEGER NOT NULL DEFAULT 0,
  minutes_played INTEGER NOT NULL DEFAULT 0,
  matches_played INTEGER NOT NULL DEFAULT 0,
  clean_sheets INTEGER NOT NULL DEFAULT 0,
  average_rating NUMERIC DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (player_id, tournament_id)
);

-- 17. Media Files
CREATE TABLE public.media_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  entity_type TEXT,
  entity_id UUID,
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 18. Reports
CREATE TABLE public.reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  type public.report_type NOT NULL,
  parameters JSONB DEFAULT '{}',
  generated_by UUID REFERENCES public.profiles(id),
  file_path TEXT,
  status public.report_status NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- INDEXES
-- =============================================

CREATE INDEX idx_org_members_org ON public.organization_members(organization_id);
CREATE INDEX idx_org_members_user ON public.organization_members(user_id);
CREATE INDEX idx_tournaments_org ON public.tournaments(organization_id);
CREATE INDEX idx_teams_org ON public.teams(organization_id);
CREATE INDEX idx_players_org ON public.players(organization_id);
CREATE INDEX idx_players_team ON public.players(team_id);
CREATE INDEX idx_matches_tournament ON public.matches(tournament_id);
CREATE INDEX idx_matches_org ON public.matches(organization_id);
CREATE INDEX idx_match_events_match ON public.match_events(match_id);
CREATE INDEX idx_standings_tournament ON public.standings(tournament_id);
CREATE INDEX idx_player_stats_player ON public.player_statistics(player_id);
CREATE INDEX idx_player_stats_tournament ON public.player_statistics(tournament_id);
CREATE INDEX idx_venues_org ON public.venues(organization_id);
CREATE INDEX idx_referees_org ON public.referees(organization_id);
CREATE INDEX idx_media_org ON public.media_files(organization_id);
CREATE INDEX idx_reports_org ON public.reports(organization_id);

-- =============================================
-- TRIGGER: Auto-create profile on signup
-- =============================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', ''),
    COALESCE(NEW.raw_user_meta_data ->> 'avatar_url', '')
  );
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- =============================================
-- REALTIME
-- =============================================

ALTER PUBLICATION supabase_realtime ADD TABLE public.matches;
ALTER PUBLICATION supabase_realtime ADD TABLE public.match_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.standings;
