

## Plan: Remove "Organizations" from EO Sidebar

Remove line 31 (`{ label: "Organizations", icon: Building2, path: "/organizations" }`) from the `navItems` array in `src/components/layout/DashboardLayout.tsx`. The `Building2` import can also be removed since it won't be used elsewhere in this file.

Single file change, one line removal.

