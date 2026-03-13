
-- =============================================
-- ENABLE RLS ON ALL TABLES
-- =============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tournament_teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.venue_bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.referees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_referees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.standings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- =============================================
-- SECURITY DEFINER FUNCTIONS
-- =============================================

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.is_org_member(_user_id UUID, _org_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE user_id = _user_id AND organization_id = _org_id AND status = 'active'
  )
$$;

CREATE OR REPLACE FUNCTION public.has_org_role(_user_id UUID, _org_id UUID, _role public.org_member_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE user_id = _user_id AND organization_id = _org_id AND role = _role AND status = 'active'
  )
$$;

-- =============================================
-- PROFILES POLICIES
-- =============================================

CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- =============================================
-- USER ROLES POLICIES
-- =============================================

CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Super admins can manage roles"
  ON public.user_roles FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'super_admin'));

-- =============================================
-- ORGANIZATIONS POLICIES
-- =============================================

CREATE POLICY "Anyone can view organizations"
  ON public.organizations FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can create organizations"
  ON public.organizations FOR INSERT
  TO authenticated
  WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Org admins can update organization"
  ON public.organizations FOR UPDATE
  TO authenticated
  USING (public.has_org_role(auth.uid(), id, 'admin') OR owner_id = auth.uid());

CREATE POLICY "Org owner can delete organization"
  ON public.organizations FOR DELETE
  TO authenticated
  USING (owner_id = auth.uid());

-- =============================================
-- ORGANIZATION MEMBERS POLICIES
-- =============================================

CREATE POLICY "Org members can view members"
  ON public.organization_members FOR SELECT
  TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));

CREATE POLICY "Org admins can manage members"
  ON public.organization_members FOR INSERT
  TO authenticated
  WITH CHECK (public.has_org_role(auth.uid(), organization_id, 'admin'));

CREATE POLICY "Org admins can update members"
  ON public.organization_members FOR UPDATE
  TO authenticated
  USING (public.has_org_role(auth.uid(), organization_id, 'admin'));

CREATE POLICY "Org admins can remove members"
  ON public.organization_members FOR DELETE
  TO authenticated
  USING (public.has_org_role(auth.uid(), organization_id, 'admin'));

-- =============================================
-- PUBLIC READ TABLES (tournaments, teams, players, matches, match_events, standings, venues, referees)
-- =============================================

-- TOURNAMENTS
CREATE POLICY "Public read tournaments"
  ON public.tournaments FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Org members can insert tournaments"
  ON public.tournaments FOR INSERT TO authenticated
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org members can update tournaments"
  ON public.tournaments FOR UPDATE TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org admins can delete tournaments"
  ON public.tournaments FOR DELETE TO authenticated
  USING (public.has_org_role(auth.uid(), organization_id, 'admin'));

-- TEAMS
CREATE POLICY "Public read teams"
  ON public.teams FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Org members can insert teams"
  ON public.teams FOR INSERT TO authenticated
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org members can update teams"
  ON public.teams FOR UPDATE TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org admins can delete teams"
  ON public.teams FOR DELETE TO authenticated
  USING (public.has_org_role(auth.uid(), organization_id, 'admin'));

-- PLAYERS
CREATE POLICY "Public read players"
  ON public.players FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Org members can insert players"
  ON public.players FOR INSERT TO authenticated
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org members can update players"
  ON public.players FOR UPDATE TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org admins can delete players"
  ON public.players FOR DELETE TO authenticated
  USING (public.has_org_role(auth.uid(), organization_id, 'admin'));

-- TOURNAMENT TEAMS
CREATE POLICY "Public read tournament_teams"
  ON public.tournament_teams FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Org members can register teams"
  ON public.tournament_teams FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.tournaments t
      WHERE t.id = tournament_id AND public.is_org_member(auth.uid(), t.organization_id)
    )
  );
CREATE POLICY "Org members can remove team registration"
  ON public.tournament_teams FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.tournaments t
      WHERE t.id = tournament_id AND public.is_org_member(auth.uid(), t.organization_id)
    )
  );

-- VENUES
CREATE POLICY "Public read venues"
  ON public.venues FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Org members can insert venues"
  ON public.venues FOR INSERT TO authenticated
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org members can update venues"
  ON public.venues FOR UPDATE TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org admins can delete venues"
  ON public.venues FOR DELETE TO authenticated
  USING (public.has_org_role(auth.uid(), organization_id, 'admin'));

-- VENUE BOOKINGS
CREATE POLICY "Public read venue_bookings"
  ON public.venue_bookings FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Authenticated can create bookings"
  ON public.venue_bookings FOR INSERT TO authenticated
  WITH CHECK (true);
CREATE POLICY "Authenticated can update bookings"
  ON public.venue_bookings FOR UPDATE TO authenticated
  USING (true);

-- REFEREES
CREATE POLICY "Public read referees"
  ON public.referees FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Org members can insert referees"
  ON public.referees FOR INSERT TO authenticated
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org members can update referees"
  ON public.referees FOR UPDATE TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org admins can delete referees"
  ON public.referees FOR DELETE TO authenticated
  USING (public.has_org_role(auth.uid(), organization_id, 'admin'));

-- MATCHES
CREATE POLICY "Public read matches"
  ON public.matches FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Org members can insert matches"
  ON public.matches FOR INSERT TO authenticated
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org members can update matches"
  ON public.matches FOR UPDATE TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org admins can delete matches"
  ON public.matches FOR DELETE TO authenticated
  USING (public.has_org_role(auth.uid(), organization_id, 'admin'));

-- MATCH EVENTS
CREATE POLICY "Public read match_events"
  ON public.match_events FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Org members can insert match_events"
  ON public.match_events FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.matches m
      WHERE m.id = match_id AND public.is_org_member(auth.uid(), m.organization_id)
    )
  );
CREATE POLICY "Org members can update match_events"
  ON public.match_events FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.matches m
      WHERE m.id = match_id AND public.is_org_member(auth.uid(), m.organization_id)
    )
  );
CREATE POLICY "Org members can delete match_events"
  ON public.match_events FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.matches m
      WHERE m.id = match_id AND public.is_org_member(auth.uid(), m.organization_id)
    )
  );

-- MATCH REFEREES
CREATE POLICY "Public read match_referees"
  ON public.match_referees FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Org members can assign referees"
  ON public.match_referees FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.matches m
      WHERE m.id = match_id AND public.is_org_member(auth.uid(), m.organization_id)
    )
  );
CREATE POLICY "Org members can remove referee assignment"
  ON public.match_referees FOR DELETE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.matches m
      WHERE m.id = match_id AND public.is_org_member(auth.uid(), m.organization_id)
    )
  );

-- STANDINGS
CREATE POLICY "Public read standings"
  ON public.standings FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Org members can manage standings"
  ON public.standings FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.tournaments t
      WHERE t.id = tournament_id AND public.is_org_member(auth.uid(), t.organization_id)
    )
  );

-- PLAYER STATISTICS
CREATE POLICY "Public read player_statistics"
  ON public.player_statistics FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Org members can manage player_statistics"
  ON public.player_statistics FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.tournaments t
      WHERE t.id = tournament_id AND public.is_org_member(auth.uid(), t.organization_id)
    )
  );

-- MEDIA FILES
CREATE POLICY "Public read media_files"
  ON public.media_files FOR SELECT TO authenticated, anon USING (true);
CREATE POLICY "Org members can insert media"
  ON public.media_files FOR INSERT TO authenticated
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org members can delete media"
  ON public.media_files FOR DELETE TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));

-- REPORTS
CREATE POLICY "Org members can view reports"
  ON public.reports FOR SELECT TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org members can create reports"
  ON public.reports FOR INSERT TO authenticated
  WITH CHECK (public.is_org_member(auth.uid(), organization_id));
CREATE POLICY "Org members can delete reports"
  ON public.reports FOR DELETE TO authenticated
  USING (public.is_org_member(auth.uid(), organization_id));
