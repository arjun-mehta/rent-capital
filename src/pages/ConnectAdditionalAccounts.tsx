import { Title } from "@/components/Text";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/auth";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./homepage/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const platforms = [
  {
    name: "Shopify",
    logo: "/logos/shopify.svg",
  },
  {
    name: "Youtube",
    logo: "/logos/youtube.svg",
  },
];

const ConnectAdditionalAccounts: React.FC = () => {
  const { isAuthenticated, isPatreonConnected } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if not authenticated or Patreon not connected
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else if (!isPatreonConnected) {
      navigate("/connect-patreon");
    }
  }, [isAuthenticated, isPatreonConnected, navigate]);

  const handleConnect = (platform: string) => {
    if (platform === "Shopify") {
      handleConnectShopify();
    }
    if (platform === "Youtube") {
      handleConnectYouTube();
    }
  };

  const handleConnectShopify = () => {
    toast({
      title: "Connecting to Shopify",
      description: "Redirecting you to authenticate with Shopify...",
    });
    // This would be replaced with actual Shopify OAuth flow
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Your Shopify account has been connected.",
      });
    }, 1500);
  };

  const handleConnectYouTube = () => {
    toast({
      title: "Connecting to YouTube",
      description: "Redirecting you to authenticate with YouTube...",
    });
    // This would be replaced with actual YouTube OAuth flow
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "Your YouTube account has been connected.",
      });
    }, 1500);
  };

  const handleContinueToProcessing = () => {
    navigate("/processing");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 flex justify-center px-8 md:px-12">
        <Link to="/" className="flex items-center">
          <Logo className="h-8" />
        </Link>
      </header>

      <div className="flex-1 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-2xl">
          <Title>Boost Your Funding Potential</Title>
          <p className="mt-2 text-balance text-center text-sm text-gray-600 max-w-md mx-auto">
            Optionally connect your additional revenue streams to unlock higher
            funding amounts and better terms.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="grid grid-cols-2 gap-4 mb-8">
            {platforms.map((platform) => (
              <Card
                key={platform.name}
                className={cn(
                  "p-6 cursor-pointer hover:shadow-md transition-shadow"
                )}
                onClick={() => handleConnect(platform.name)}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`size-[50px] rounded-full flex items-center justify-center mb-3`}
                  >
                    <img
                      src={platform.logo}
                      alt={platform.name}
                      className="size-full"
                    />
                  </div>
                  <h3 className="font-medium text-gray-900">{platform.name}</h3>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleContinueToProcessing}
              className="bg-primary w-fit mx-auto hover:bg-primary/90 text-primary-foreground h-10"
            >
              Show My Cash Advance Offers
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Button>
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

export default ConnectAdditionalAccounts;
