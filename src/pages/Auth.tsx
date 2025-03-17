
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForms } from "@/components/AuthForms";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !isLoading) {
      navigate("/profile");
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-lightGray">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightGray">
      <div className="max-w-4xl mx-auto pt-16 pb-20 px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-navy">NeuroPeak</h1>
          <p className="text-darkGray mt-2">Science-driven focus for your mind</p>
        </div>
        
        <AuthForms />
      </div>
    </div>
  );
};

export default Auth;
