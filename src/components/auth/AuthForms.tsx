
import { useAuth } from "@/contexts/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { SignInForm } from "./SignInForm";
import { SignUpForm } from "./SignUpForm";
import { GoogleAuthButton } from "./GoogleAuthButton";
import { AuthWarning } from "./AuthWarning";

export function AuthForms() {
  const { isUsingPlaceholders } = useAuth();

  return (
    <div className="w-full max-w-md mx-auto">
      <AuthWarning isUsingPlaceholders={isUsingPlaceholders} />
      
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin">
          <div className="glass-panel rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-navy mb-4">Welcome Back</h2>
            <SignInForm />
            
            <div className="mt-4 relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <GoogleAuthButton />
          </div>
        </TabsContent>
        
        <TabsContent value="signup">
          <div className="glass-panel rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-navy mb-4">Create Account</h2>
            <SignUpForm />
            
            <div className="mt-4 relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <GoogleAuthButton />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
