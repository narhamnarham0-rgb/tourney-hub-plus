# Complete Tournament Creation Multi-Step Form

## Current State

- Step 1 (Basic Info): Has a working `TournamentForm` with name, description, format, age category, dates, location, max teams, venue, registration deadline, logo upload placeholder.
- Steps 2-5 (Rules & Format, Participant Mgmt, Scheduling, Review & Publish): All show placeholder "Implementation coming soon" UI with no actual form content.
- Venue dropdown is hardcoded (not fetched from DB).
- Logo upload is visual-only (no actual upload logic).
- The `tournamentService.create()` is a mock that doesn't persist to the database.

## Plan

### 1. Fix pre-existing test build errors

The test files import `screen`, `fireEvent`, `within` from `@testing-library/react` which isn't properly installed. Update imports or install the missing dependency.

### 2. Enhance Step 1 — Basic Info

- Fetch venues from database for the venue dropdown (replace hardcoded options).
- Wire logo upload to the `org-assets` storage bucket so the image actually persists.
- Organization selection — the `tournaments` table requires `organization_id`; add an org selector (fetch from DB).

### 3. Build Step 2 — Rules & Format

New component `RulesFormatStep.tsx` with fields for:

- Match duration (minutes per half)
- Extra time allowed (toggle)
- Penalty shootout rules
- Points system (win/draw/loss points)
- Tiebreaker rules (goal difference, head-to-head, etc.)
- Cards/suspension rules (yellow card accumulation threshold)
- Max substitutions per match
  &nbsp;

These are config fields stored as a JSON `rules` column or handled client-side until submit.

### 4. Build Step 3 — Participant Management

New component `ParticipantStep.tsx` with:

- List of available teams from the database (fetched from `teams` table)
- Multi-select to pick teams to register
- Display selected teams count vs max teams
- Option to set registration as open/closed

### 5. Build Step 4 — Scheduling

New component `SchedulingStep.tsx` with:

- Match day preferences (weekdays/weekends)
- Default kick-off times
- Venue assignments per round (optional)
- Auto-generate schedule option (placeholder)

### 6. Build Step 5 — Review & Publish

New component `ReviewStep.tsx` that:

- Displays a read-only summary of all data from steps 1-4
- Shows validation warnings for missing required fields
- "Publish" button creates the tournament in the database via Supabase
- "Save as Draft" saves with `status: 'draft'`

### 7. Wire tournament creation to the database

- Update `tournamentService.create()` to insert into the `tournaments` table via Supabase client.
- After creating the tournament, insert selected teams into `tournament_teams`.
- Store rules/scheduling config as part of the tournament or a separate config approach.

### 8. State management across steps

- Store each step's data in `TournamentCreatePage` state (already partially done with `formData`).
- Pass `initialData` to each step component so values persist when navigating back.

### Files to create/modify

- `src/modules/tournaments/components/RulesFormatStep.tsx` — new
- `src/modules/tournaments/components/ParticipantStep.tsx` — new
- `src/modules/tournaments/components/SchedulingStep.tsx` — new
- `src/modules/tournaments/components/ReviewStep.tsx` — new
- `src/modules/tournaments/components/TournamentForm.tsx` — add org selector, dynamic venues, logo upload
- `src/modules/tournaments/hooks/useTournamentForm.ts` — add `organizationId` to schema
- `src/modules/tournaments/types/tournament.ts` — extend with rules/scheduling fields
- `src/modules/tournaments/services/tournamentService.ts` — replace mock with Supabase calls
- `src/pages/tournaments/TournamentCreatePage.tsx` — render step components
- Test files — fix imports