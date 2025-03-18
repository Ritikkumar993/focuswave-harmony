
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function GoogleAuthButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { signInWithGoogle, isUsingPlaceholders } = useAuth();

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      type="button" 
      className="w-full mt-4"
      onClick={handleGoogleSignIn}
      disabled={isLoading || isUsingPlaceholders}
    >
      {isLoading ? (
        "Connecting..."
      ) : (
        <>
          <LogIn className="mr-2 h-4 w-4" />
          Google
        </>
      )}
    </Button>
  );
}
