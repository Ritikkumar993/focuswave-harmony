
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthForms } from "@/components/AuthForms";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";

const Auth = () => {
  const { user, isLoading, setSession } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Handle the OAuth callback by checking for the hash in the URL
    const handleAuthCallback = async () => {
      // Get the auth hash from the URL
      const hash = window.location.hash;
      
      if (hash && hash.includes("access_token")) {
        // Process the hash to set the session
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
        } else if (data?.session) {
          // Navigate to profile after successful authentication
          navigate("/profile");
        }
      }
    };

    handleAuthCallback();

    // Also check if user is already logged in
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
