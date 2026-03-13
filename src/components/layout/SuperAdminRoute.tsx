import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
import { useEffect, useRef } from "react";

export default function SuperAdminRoute({ children }: { children: React.ReactNode }) {
  const { user, loading, isSuperAdmin } = useAuth();
  const toasted = useRef(false);

  useEffect(() => {
    if (!loading && user && !isSuperAdmin && !toasted.current) {
      toasted.current = true;
      toast.error("Akses ditolak. Hanya Super Admin yang dapat mengakses halaman ini.");
    }
  }, [loading, user, isSuperAdmin]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-sm font-bold text-muted-foreground">Loading…</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!isSuperAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
