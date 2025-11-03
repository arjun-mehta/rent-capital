
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/components/ui/use-toast";

interface PasswordProtectionProps {
  password: string;
  children: React.ReactNode;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ password, children }) => {
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(false);
  const { toast } = useToast();

  // Check if user has already been authenticated
  useEffect(() => {
    const authenticated = localStorage.getItem("authenticated") === "true";
    setIsAuthenticated(authenticated);
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputPassword === password) {
      setIsAuthenticated(true);
      localStorage.setItem("authenticated", "true");
      toast({
        title: "Access granted",
        description: "Welcome to Rent Capital",
      });
    } else {
      setError(true);
      toast({
        title: "Incorrect password",
        description: "Please try again with the correct password",
        variant: "destructive",
      });
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FCF7F0] p-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <img 
            src="/lovable-uploads/ffdad90a-7332-4fbe-add4-1edb2c536b21.png" 
            alt="Rent Capital" 
            className="h-16 mx-auto mb-4" 
          />
          <h1 className="text-2xl font-bold text-gray-900">Rent Capital</h1>
          <p className="mt-2 text-gray-600">This site is password protected</p>
        </div>

        {error && (
          <Alert variant="destructive" className="my-4">
            <AlertDescription>
              Incorrect password. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              required
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-[#017354] hover:bg-[#017354]/90">
            Enter Site
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtection;
