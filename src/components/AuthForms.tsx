
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, LogIn } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const authSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type AuthFormValues = z.infer<typeof authSchema>;

export function AuthForms() {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { signIn, signUp, signInWithGoogle, isUsingPlaceholders } = useAuth();

  const form = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignIn = async (data: AuthFormValues) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSignUp = async (data: AuthFormValues) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error(error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {isUsingPlaceholders && (
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Configuration Error</AlertTitle>
          <AlertDescription>
            Supabase authentication is not configured properly. Please set the environment variables 
            VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.
          </AlertDescription>
        </Alert>
      )}
      
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>
        
        <TabsContent value="signin">
          <div className="glass-panel rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-navy mb-4">Welcome Back</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSignIn)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-navy" disabled={isLoading || isUsingPlaceholders}>
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </Form>
            
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
            
            <Button 
              variant="outline" 
              type="button" 
              className="w-full mt-4"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isUsingPlaceholders}
            >
              {isGoogleLoading ? (
                "Connecting..."
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Google
                </>
              )}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="signup">
          <div className="glass-panel rounded-xl p-6 shadow-md">
            <h2 className="text-2xl font-bold text-navy mb-4">Create Account</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSignUp)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your@email.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-navy" disabled={isLoading || isUsingPlaceholders}>
                  {isLoading ? "Signing up..." : "Sign Up"}
                </Button>
              </form>
            </Form>
            
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
            
            <Button 
              variant="outline" 
              type="button" 
              className="w-full mt-4"
              onClick={handleGoogleSignIn}
              disabled={isGoogleLoading || isUsingPlaceholders}
            >
              {isGoogleLoading ? (
                "Connecting..."
              ) : (
                <>
                  <LogIn className="mr-2 h-4 w-4" />
                  Google
                </>
              )}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
