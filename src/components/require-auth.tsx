import useAuth from "@/hooks/use-auth";
import type { ReactNode } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

interface RequireAuthProps {
  children?: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const { isAuthenticated } = useAuth();

  const location = useLocation();

  if (isAuthenticated) return <>{children ?? <Outlet />}</>;

  return <Navigate to="/sign-in" state={{ from: location }} replace />;
};

export default RequireAuth;
