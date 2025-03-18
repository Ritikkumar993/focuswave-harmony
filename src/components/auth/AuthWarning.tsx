
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface AuthWarningProps {
  isUsingPlaceholders: boolean;
}

export function AuthWarning({ isUsingPlaceholders }: AuthWarningProps) {
  if (!isUsingPlaceholders) return null;
  
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Configuration Error</AlertTitle>
      <AlertDescription>
        Supabase authentication is not configured properly. Please set the environment variables 
        VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
      </AlertDescription>
    </Alert>
  );
}
