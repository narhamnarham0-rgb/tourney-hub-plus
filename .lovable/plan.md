# Backend Architecture for Football Tournament Management Platform

## Current State

The entire app runs on **in-memory mock data** across 5 service files (`organizations.ts`, `matches.ts`, `venues.ts`, `playerService.ts`, `tournamentService.ts`, `teamService.ts`). The database has **zero tables**. Auth pages exist but are non-functional (no Supabase Auth wiring).

## Implementation Plan

Due to the scale (17+ tables, auth, RLS, storage, realtime), this will be executed in **4 phases**.

---

### Phase 1: Database Schema (Single Migration)

**Enums:**

```text
org_plan: starter, pro, enterprise
org_status: active, inactive
org_member_role: admin, manager, coordinator, referee_manager, analyst
member_status: active, invited, suspended
tournament_format: league, knockout, group_knockout, round_robin
tournament_status: draft, upcoming, active, completed
team_status: active, inactive, pending
player_status: active, inactive, suspended
player_position: goalkeeper, defender, midfielder, forward, multi_position
match_status: upcoming, live, completed, delayed
match_event_type: goal, yellow_card, red_card, substitution, var_review
referee_role: referee, assistant_1, assistant_2, fourth_official, var
venue_type: stadium, arena, training_ground, indoor, community_field
booking_status: available, pending, booked
report_type: tournament_summary, player_performance, match_report, financial, attendance, discipline
age_category: senior, u21, u19, u17, u15, u13, u12, u11, u10, u9, u8
```

**Tables (17):**


| Table                  | Key Columns                                                                                                                                                                                                                | Relationships                      |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| `profiles`             | id (→ auth.users), full_name, avatar_url, phone                                                                                                                                                                            | Auto-created on signup via trigger |
| `organizations`        | name, short_name, description, city, country, founded_year, plan, status, logo_url, phone, website, contact_email, timezone, social_links (jsonb), owner_id → profiles                                                     | Root tenant entity                 |
| `organization_members` | organization_id → organizations, user_id → profiles, role, status                                                                                                                                                          | Multi-tenant membership            |
| `tournaments`          | organization_id → organizations, name, description, format, age_category, start_date, end_date, location, max_teams, registration_deadline, logo_url, status                                                               | Scoped to org                      |
| `teams`                | organization_id → organizations, name, city, logo_url, description, founding_date, coach_name, status                                                                                                                      | Scoped to org                      |
| `players`              | team_id → teams, organization_id → organizations, name, photo_url, date_of_birth, age_category, primary_position, secondary_position, nationality, email, phone, address, jersey_number, emergency_contact (jsonb), status | Scoped to org via team             |
| `tournament_teams`     | tournament_id → tournaments, team_id → teams                                                                                                                                                                               | Many-to-many registration          |
| `venues`               | organization_id → organizations, name, type, city, country, address, lat, lng, capacity, facilities (text[]), amenities (jsonb), contact (jsonb), pricing (jsonb), description, images (jsonb)                             | Scoped to org                      |
| `venue_bookings`       | venue_id → venues, status, start_time, end_time, requester_name, notes                                                                                                                                                     | Booking slots                      |
| `matches`              | tournament_id → tournaments, organization_id → organizations, round, date_time, venue_id → venues, status, minute, home_team_id → teams, away_team_id → teams, home_score, away_score, weather (jsonb), stats (jsonb)      | Core match data                    |
| `match_events`         | match_id → matches, minute, type, team_id → teams, player_name, player_in, player_out, description                                                                                                                         | Live match events                  |
| `match_referees`       | match_id → matches, referee_id → referees, role                                                                                                                                                                            | Assignment join                    |
| `referees`             | organization_id → organizations, name, badge_level, email, phone, photo_url, rating                                                                                                                                        | Referee profiles                   |
| `standings`            | tournament_id → tournaments, team_id → teams, position, played, wins, draws, losses, goals_for, goals_against, points                                                                                                      | Auto-calculated                    |
| `player_statistics`    | player_id → players, tournament_id → tournaments, goals, assists, yellow_cards, red_cards, minutes_played, matches_played, clean_sheets, average_rating                                                                    | Per-tournament stats               |
| `media_files`          | organization_id → organizations, name, file_path, file_type, entity_type, entity_id, uploaded_by → profiles                                                                                                                | Storage metadata                   |
| `reports`              | organization_id → organizations, title, type, parameters (jsonb), generated_by → profiles, file_path, status                                                                                                               | Generated reports                  |


**Key indexes:** organization_id on all tenant-scoped tables, tournament_id on matches/standings, team_id on players.

**Trigger:** `on_auth_user_created` → auto-insert into `profiles`.

**Realtime:** Enable on `matches`, `match_events`, `standings`.

---

### Phase 2: Row-Level Security

**Strategy:**

- `has_org_role(org_id, role)` — security definer function to check membership without recursion
- `is_org_member(org_id)` — security definer function for any-role membership check

**Policies per table pattern:**

- **Public read** (SELECT for anon+authenticated): tournaments, teams, players, matches, match_events, standings, venues, referees
- **Org-scoped write** (INSERT/UPDATE/DELETE for authenticated org members): all org-scoped tables
- **Profile self-access**: users read/update only their own profile
- **Organization owner-only**: delete organization, manage members

---

### Phase 3: Authentication & User Roles

- Wire `LoginPage.tsx` to `supabase.auth.signInWithPassword()`
- Wire `RegisterPage.tsx` to `supabase.auth.signUp()` with email verification
- Wire `ForgotPasswordPage.tsx` to `supabase.auth.resetPasswordForEmail()`
- Create `/reset-password` page for password update flow
- Create `user_roles` table (separate from profiles) with `app_role` enum (super_admin, organizer, club_manager, referee, player, viewer)
- Create `has_role()` security definer function
- Add auth context provider with `onAuthStateChange` listener
- Add protected route wrapper for dashboard routes
- Google/Apple OAuth configuration (UI already has buttons)

---

### Phase 4: Service Layer Migration

Replace all mock services with Supabase client calls:


| Current Mock Service                                    | Supabase Migration                                                              |
| ------------------------------------------------------- | ------------------------------------------------------------------------------- |
| `src/lib/organizations.ts`                              | Query `organizations` + `organization_members` tables                           |
| `src/lib/matches.ts`                                    | Query `matches` + `match_events` + `match_referees` with realtime subscriptions |
| `src/lib/venues.ts`                                     | Query `venues` + `venue_bookings` tables                                        |
| `src/modules/players/services/playerService.ts`         | Query `players` + `player_statistics` tables                                    |
| `src/modules/tournaments/services/tournamentService.ts` | Query `tournaments` + `tournament_teams` tables                                 |
| `src/modules/teams/services/teamService.ts`             | Query `teams` + `players` tables                                                |
| `src/lib/standings.ts`                                  | Query `standings` table with realtime                                           |


**Storage buckets to create:**

- `player-photos` — player profile images
- `team-logos` — team logo uploads
- `documents` — player documents, contracts
- `match-media` — match photos/videos
- `org-assets` — organization logos

**Edge functions:**

- `update-standings` — triggered after match result submission, recalculates standings
- `generate-report` — generates PDF/CSV/Excel reports using AI

---

### Summary

- **Phase 1**: 1 large migration (17 tables, 18 enums, triggers, realtime)
- **Phase 2**: RLS policies with security definer functions
- **Phase 3**: Auth wiring + user roles + protected routes
- **Phase 4**: Replace 7 mock service files + create storage buckets + edge functions

No frontend UI changes. All existing component interfaces will be preserved — only the data source changes from mock to database.