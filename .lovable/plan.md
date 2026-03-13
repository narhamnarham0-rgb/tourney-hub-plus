

## Plan: Make All Dashboard Items Clickable

Currently, the dashboard has several non-interactive elements. Here's what needs linking:

### 1. `QuickActions.tsx` — Add navigation links
- **Create Tournament** → `/tournaments/create`
- **Register Team** → `/teams/create`
- **Generate Schedule** → `/tournaments/schedule`
- **Add Venue** → `/venues` (no create page exists, so link to venues list)

Change each `<div>` to a `<Link>` from react-router-dom.

### 2. `StatCard.tsx` — Add optional `href` prop
- Active Tournaments → `/tournaments`
- Registered Teams → `/teams`
- Matches Today → `/matches`
- Upcoming (7 Days) → `/calendar`

Add an optional `href` prop; wrap the card in a `<Link>` when provided.

### 3. `TournamentCard.tsx` — Make entire card and "Manage" button clickable
- Wrap the card in `<Link to="/tournaments/detail">` 
- "Manage" button also links to `/tournaments/detail`

### 4. `DashboardTimeline.tsx` — Make match rows clickable
- Wrap each match row in `<Link to={/matches/${match.id}}>` 

### 5. `DashboardPage.tsx` — Wire up remaining buttons
- "View All" button on Active Tournaments → `/tournaments`
- Pass `href` props to each `StatCard`
- "Filter" / "Today" buttons in timeline section are already decorative, leave as-is

### Files Modified
- `src/components/dashboard/QuickActions.tsx`
- `src/components/dashboard/StatCard.tsx`
- `src/components/dashboard/TournamentCard.tsx`
- `src/components/dashboard/DashboardTimeline.tsx`
- `src/pages/DashboardPage.tsx`

