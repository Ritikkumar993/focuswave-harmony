
import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/auth");
    }
  }, [user, isLoading, navigate]);

  // Modified to show loading and children if loading is true
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lightGray">
        <div className="animate-pulse text-navy">Loading your profile...</div>
      </div>
    );
  }

  // Modified to show children even if user is not yet loaded
  return <>{children}</>;
};

export default ProtectedRoute;
