

# Fix Super Admin Route Protection

## Problem
The `/admin` routes currently only check if a user is logged in (`ProtectedRoute`). Any authenticated user can access the Super Admin panel. We need to restrict `/admin/*` routes to users with the `super_admin` role in the `user_roles` table.

## Plan

### 1. Extend AuthContext to load user roles
- After auth state changes, query `user_roles` table for the current user
- Expose `roles: string[]` and a helper `isSuperAdmin: boolean` on the context

### 2. Create `SuperAdminRoute` component
- New file: `src/components/layout/SuperAdminRoute.tsx`
- Wraps children, checks `isSuperAdmin` from AuthContext
- Redirects non-super-admins to `/` (dashboard) with a toast error
- Shows loading state while roles are being fetched

### 3. Update `App.tsx` routing
- Replace the `AL` wrapper to use `SuperAdminRoute` instead of `ProtectedRoute`
- All 7 `/admin/*` routes will be protected by super_admin role check

### Files changed
- `src/contexts/AuthContext.tsx` — add `roles` and `isSuperAdmin` to context, fetch from `user_roles` on auth
- `src/components/layout/SuperAdminRoute.tsx` — new component
- `src/App.tsx` — update `AL` wrapper to use `SuperAdminRoute`

