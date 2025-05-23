import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "./homepage/navigation";
import { PlusIcon } from "lucide-react";

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
          <h2 className="mt-6 text-balance text-center text-3xl font-extrabold text-gray-900">
            Boost Your Funding Potential
          </h2>
          <p className="mt-2 text-balance text-center text-sm text-gray-600 max-w-md mx-auto">
            Optionally connect your additional revenue streams to unlock higher
            funding amounts and better terms.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Shopify Card */}
              <Button
                onClick={handleConnectShopify}
                className="h-40 w-full bg-[#95BF47] hover:bg-[#7EA639] text-white text-xl font-medium flex flex-col items-center justify-center gap-4 rounded-lg"
              >
                <img
                  src="https://firework.com/wp-content/uploads/2023/11/Shopify-Logo-500x313-1.png"
                  alt="Shopify"
                  className="h-10 w-auto"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://cdn.shopify.com/s/files/1/0578/3432/1084/files/shopify-seeklogo.com_1_5e1e579f-3b19-4a5e-a33c-c3fa7e03b488.png?v=1680715727";
                  }}
                />
              </Button>

              {/* YouTube Card */}
              <Button
                onClick={handleConnectYouTube}
                className="h-40 w-full bg-[#FF0000] hover:bg-[#D90000] text-white text-xl font-medium flex flex-col items-center justify-center gap-4 rounded-lg"
              >
                <img
                  src="https://freepnglogo.com/images/all_img/1701508998white-youtube-logo-png.png"
                  alt="YouTube"
                  className="h-8 w-auto"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/800px-YouTube_full-color_icon_%282017%29.svg.png";
                  }}
                />
              </Button>
            </div>
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
