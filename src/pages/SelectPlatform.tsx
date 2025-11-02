import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePlaidLink } from "react-plaid-link";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "./homepage/navigation";
import { Title } from "@/components/Text";
import { Loader2 } from "lucide-react";

const SelectPlatform: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [linkToken, setLinkToken] = useState<string | null>(null);
  const [isLoadingToken, setIsLoadingToken] = useState(true);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Fetch Plaid link token
  // WARNING: This is for DEMO purposes only. In production, link tokens MUST be created on the backend.
  useEffect(() => {
    const fetchLinkToken = async () => {
      try {
        setIsLoadingToken(true);
        
        const clientId = import.meta.env.VITE_PLAID_CLIENT_ID;
        const secret = import.meta.env.VITE_PLAID_SECRET_KEY;
        const env = import.meta.env.VITE_PLAID_ENV || 'sandbox';
        
        if (!clientId || !secret) {
          throw new Error('Plaid credentials not configured');
        }

        // Create link token using CORS proxy for demo (DEMO ONLY - not secure for production)
        const plaidUrl = env === 'production' 
          ? 'https://production.plaid.com' 
          : 'https://sandbox.plaid.com';
        
        // Using a CORS proxy for demo purposes only
        // In production, this MUST be done on your backend server
        const corsProxy = 'https://corsproxy.io/?';
        const targetUrl = `${plaidUrl}/link/token/create`;
        
        const response = await fetch(`${corsProxy}${encodeURIComponent(targetUrl)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: clientId,
            secret: secret,
            client_name: 'Rent Capital',
            products: ['auth', 'transactions'],
            country_codes: ['US'],
            language: 'en',
            user: {
              client_user_id: `user_${Date.now()}`, // Temporary user ID for demo
            },
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error_message || 'Failed to create link token');
        }

        const data = await response.json();
        setLinkToken(data.link_token);
      } catch (error) {
        console.error('Error fetching link token:', error);
        toast({
          title: "Error",
          description: error instanceof Error 
            ? error.message 
            : "Failed to initialize bank connection. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingToken(false);
      }
    };

    if (isAuthenticated) {
      fetchLinkToken();
    }
  }, [isAuthenticated, toast]);

  const onSuccess = useCallback(
    async (publicToken: string, metadata: any) => {
      try {
        // WARNING: For demo only - in production, token exchange MUST happen on backend
        const clientId = import.meta.env.VITE_PLAID_CLIENT_ID;
        const secret = import.meta.env.VITE_PLAID_SECRET_KEY;
        const env = import.meta.env.VITE_PLAID_ENV || 'sandbox';
        
        if (!clientId || !secret) {
          throw new Error('Plaid credentials not configured');
        }

        const plaidUrl = env === 'production' 
          ? 'https://production.plaid.com' 
          : 'https://sandbox.plaid.com';

        // Exchange public token for access token using CORS proxy (DEMO ONLY)
        const corsProxy = 'https://corsproxy.io/?';
        const targetUrl = `${plaidUrl}/item/public_token/exchange`;
        
        const response = await fetch(`${corsProxy}${encodeURIComponent(targetUrl)}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            client_id: clientId,
            secret: secret,
            public_token: publicToken,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error_message || 'Failed to exchange token');
        }

        const data = await response.json();
        console.log('Access token obtained (demo only):', data.access_token);
        
        toast({
          title: "Success!",
          description: `Your bank account (${metadata.institution?.name || 'bank'}) has been connected successfully.`,
        });
        
        // Navigate to next step
        navigate("/processing");
      } catch (error) {
        console.error('Error exchanging public token:', error);
        toast({
          title: "Error",
          description: error instanceof Error 
            ? error.message 
            : "Failed to complete bank connection. Please try again.",
          variant: "destructive",
        });
      }
    },
    [navigate, toast]
  );

  const onExit = useCallback((err: any, metadata: any) => {
    if (err) {
      console.error('Plaid Link error:', err);
      toast({
        title: "Connection Cancelled",
        description: err.display_message || "Bank connection was cancelled.",
      });
    }
  }, [toast]);

  const config = {
    token: linkToken,
    onSuccess,
    onExit,
  };

  const { open, ready } = usePlaidLink(config);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 flex justify-center px-8 md:px-12">
        <Link to="/" className="flex items-center">
          <Logo className="h-8" />
        </Link>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Title>Connect your Bank Account</Title>
            <p className="text-md text-balance text-gray-600 mt-4">
              Securely connect your bank account to verify your identity and
              receive your advance.
            </p>
          </div>

          <Card className="p-8">
            <div className="flex flex-col items-center text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Connect with Plaid
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Plaid is used by thousands of financial institutions to securely
                connect bank accounts.
              </p>
              <Button
                onClick={() => open()}
                disabled={!ready || isLoadingToken}
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base"
                size="lg"
              >
                {isLoadingToken ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Connect Bank Account"
                )}
              </Button>
              <p className="text-xs text-gray-500 mt-4">
                Your credentials are never shared with us. Plaid uses bank-level
                encryption.
              </p>
            </div>
          </Card>
        </div>
      </div>
      <div className="py-4 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Creator Capital. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SelectPlatform;
