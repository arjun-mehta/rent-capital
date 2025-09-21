import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/components/ui/use-toast";
import { Logo } from "./homepage/navigation";
import { Title } from "@/components/Text";
import { cn } from "@/lib/utils";

const SelectPlatform: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  const handleUnsupportedPlatform = (name: string) => {
    toast({
      title: `${name} Not Available`,
      description: `${name} integration is coming soon. Please select Patreon for now.`,
    });
  };

  const platforms = [
    {
      name: "Patreon",
      logo: "/logos/patreon.svg",
      action: () => navigate("/connect-patreon"),
      available: true,
    },
    {
      name: "Substack",
      logo: "/logos/substack.svg",
      action: () => handleUnsupportedPlatform("Substack"),
      available: false,
    },
    {
      name: "Supercast",
      logo: "/logos/supercast.svg",
      action: () => handleUnsupportedPlatform("Supercast"),
      available: false,
    },
    {
      name: "Fanfix",
      logo: "/logos/apple-podcast-new.png",
      action: () => handleUnsupportedPlatform("Fanfix"),
      available: false,
    },
  ];

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
            <Title>Connect your Platform</Title>
            <p className="text-md text-balance text-gray-600">
              Choose the subscription platform where you earn most of your
              recurring revenue
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {platforms.map((platform) => (
              <Card
                key={platform.name}
                className={cn(
                  "p-6 cursor-pointer hover:shadow-md transition-shadow"
                )}
                onClick={platform.action}
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

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Don't see your platform? We're adding more options soon.</p>
          </div>
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
