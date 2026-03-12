

## Plan: Enhanced Organization Profile Page at `/organizations/:id`

The current `OrganizationDetailPage` already has a solid structure with a hero banner, stat cards, and tabs (Overview, Members, Metadata). The request is to make it a richer EO/Organization profile with **Quick Actions** and more **information cards**.

### Changes to `OrganizationDetailPage.tsx`

1. **Add Quick Actions section** below the stat cards — a grid of actionable buttons specific to the organization:
   - Create Tournament
   - Register Team
   - Invite Member
   - View Schedule
   - Generate Report
   - Manage Subscription

   Styled as icon + label cards (similar to `QuickActions` component on the dashboard).

2. **Expand the Overview tab** with additional information cards:
   - **Organization Profile Card** — logo/avatar, full description, founded year, contact info, website, social links
   - **Subscription & Billing Card** — current plan, next billing date, MRR, plan features
   - **Recent Activity Feed** — latest actions (member joined, tournament created, match completed)
   - **Top Performing Teams Card** — mini leaderboard of teams within this org
   - **Upcoming Matches Card** — next 3-5 scheduled matches across all tournaments

3. **Enhance the hero section** with additional profile details:
   - Phone number, social media links (mock data)
   - Organization logo/avatar placeholder

### Changes to `src/lib/organizations.ts`

Add mock fields to the `Organization` type and data:
- `phone`, `socialLinks` (twitter, instagram), `logoUrl`
- `recentActivity` array (type, description, timestamp)
- `upcomingMatches` array (home, away, date, tournament)

### Summary

- Files modified: `OrganizationDetailPage.tsx`, `organizations.ts`
- No new files needed — reuses existing `StatCard`, `StatusBadge`, `Button`, `Card` components
- Purely UI/UX enhancement, no backend changes

