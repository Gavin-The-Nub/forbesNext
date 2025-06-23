// At the top of /app/admin/login/page.tsx
export const dynamic = "force-dynamic";

("use client");

import type React from "react";
import Image from "next/image";

import { ChangeEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Lock, User, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase-client";
import AdminPage from "../page";
import { Session } from "@supabase/supabase-js";
export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error("Invalid email or password");
      }

      router.push("/admin");
      router.refresh();
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSession = async () => {
    const currentSession = await supabase.auth.getSession();
    console.log(currentSession);
    setSession(currentSession.data.session);
  };

  useEffect(() => {
    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {session ? (
        <AdminPage />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Header */}
            <div className="text-center mb-8">
              <Link
                href="/"
                className="inline-flex items-center space-x-2 mb-4"
              >
                <Image
                  src="/logo.png"
                  alt="Forbes Capital Cars Logo"
                  width={250} // adjust size as needed
                  height={40}
                  className="object-contain"
                />
              </Link>
              <h1 className="text-lg font-extralight text-gray-900">
                Admin Portal
              </h1>
              <p className="text-gray-600 mt-2 font-extralight text-sm">
                Sign in to access the admin dashboard
              </p>
            </div>

            {/* Login Form */}
            <Card className="shadow-xl">
              <CardHeader className="space-y-1">
                <CardTitle className="text-lg text-center font-light">
                  Welcome Back
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4" onSubmit={handleSubmit}>
                  {error && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription className="font-light text-xs">
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-light">
                      Email
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setEmail(e.target.value)
                        }
                        className="pl-10 font-extralight"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-light">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          setPassword(e.target.value)
                        }
                        className="pl-10 pr-10 font-extralight"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 font-light"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                  <Link
                    href="/"
                    className="text-xs text-blue-600 hover:text-blue-700 font-light hover:font-normal"
                  >
                    ← Back to Website
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Security Notice */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                This is a secure admin portal. All activities are logged and
                monitored.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
