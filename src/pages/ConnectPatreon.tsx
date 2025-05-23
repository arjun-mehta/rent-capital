import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";
import { Logo } from "./homepage/navigation";

const ConnectPatreon: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isAuthenticated, connectPatreon } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await connectPatreon(email, password);

      if (success) {
        toast({
          title: "Success!",
          description: "Your Patreon account has been connected.",
        });
        navigate("/connect-additional-accounts");
      } else {
        toast({
          title: "Error",
          description:
            "Failed to connect your Patreon account. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 flex justify-center px-8 md:px-12">
        <Link to="/" className="flex items-center">
          <Logo className="h-8" />
        </Link>
      </header>

      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connect your Patreon
          </h2>
          <p className="mt-2 text-balance text-center text-sm text-gray-600">
            We need access to your Patreon account to analyze your subscription
            revenue.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <Label htmlFor="patreon-email">Patreon Email</Label>
                <div className="mt-1">
                  <Input
                    id="patreon-email"
                    name="patreon-email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="patreon-password">Patreon Password</Label>
                <div className="mt-1">
                  <Input
                    id="patreon-password"
                    name="patreon-password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-10"
                  />
                </div>
              </div>

              <div>
                <Button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-10"
                  disabled={isLoading}
                >
                  {isLoading ? "Connecting..." : "Connect Patreon"}
                </Button>
              </div>

              <div className="text-center">
                <p className="text-xs text-gray-500 mt-2">
                  We use bank-level encryption to protect your Patreon
                  credentials. Your information is never stored on our servers.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="py-4 text-center">
        <p className="text-xs text-gray-500">
          © 2025 Creator Capital. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default ConnectPatreon;
