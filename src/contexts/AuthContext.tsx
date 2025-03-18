
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isUsingPlaceholders, signInWithGoogle } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  isUsingPlaceholders: boolean;
  setSession: (session: Session | null) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      setIsLoading(true);
      
      // Check if we have a session
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error("Error getting session:", error);
      } else {
        setSession(data.session);
        setUser(data.session?.user ?? null);
      }
      
      setIsLoading(false);
    };

    initializeAuth();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string) => {
    try {
      if (isUsingPlaceholders) {
        throw new Error("Supabase is not configured. Please set up the environment variables.");
      }
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Check your email for the confirmation link",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign up",
      });
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      if (isUsingPlaceholders) {
        throw new Error("Supabase is not configured. Please set up the environment variables.");
      }
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      toast({
        title: "Welcome back!",
        description: "Successfully signed in",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign in",
      });
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Signed out",
        description: "You have been successfully signed out",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign out",
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      if (isUsingPlaceholders) {
        throw new Error("Supabase is not configured. Please set up the environment variables.");
      }
      
      const { error } = await signInWithGoogle();

      if (error) throw error;
      
      toast({
        title: "Redirecting to Google",
        description: "Please complete the sign in process",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign in with Google",
      });
      throw error;
    }
  };

  const value = {
    user,
    session,
    isLoading,
    signUp,
    signIn,
    signOut,
    signInWithGoogle: handleGoogleSignIn,
    isUsingPlaceholders,
    setSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
