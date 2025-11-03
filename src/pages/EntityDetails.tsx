import { Title } from "@/components/Text";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/lib/auth";
import { ArrowRight, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "./homepage/navigation";

const EntityDetails: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [legalName, setLegalName] = useState<string>("");
  const [ein, setEin] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Validate form
  useEffect(() => {
    const validLegalName = !!legalName.trim();
    const validAddress = !!address.trim();
    const validPhone = !!phone.trim();
    const validEin = /^[0-9]{2}-[0-9]{7}$/.test(ein) || /^[0-9]{9}$/.test(ein);

    setIsFormValid(
      validLegalName && validEin && validAddress && validPhone && isAuthorized
    );
  }, [legalName, ein, address, phone, isAuthorized]);

  const handleContinue = () => {
    navigate('/business-verification?type=business');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 flex justify-center px-8 md:px-12">
        <Link to="/" className="flex items-center">
          <Logo className="h-8" />
        </Link>
      </header>

      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <Title>Entity Information</Title>
          <p className="text-md text-balance text-gray-600 max-w-2xl mx-auto">
            Please provide your basic details to proceed with your revenue
            purchase agreement.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto p-6 mb-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="legal-name">
                Legal Business Name
              </Label>
              <Input
                id="legal-name"
                value={legalName}
                onChange={(e) => setLegalName(e.target.value)}
                placeholder="Enter your legal business name"
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ein">
                Tax ID (EIN)
                <span className="text-xs text-gray-500 ml-1">
                  Format: XX-XXXXXXX or XXXXXXXXX
                </span>
              </Label>
              <Input
                id="ein"
                value={ein}
                onChange={(e) => setEin(e.target.value)}
                placeholder="XX-XXXXXXX"
                className="h-10"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">
                Business Address
              </Label>
              <Textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your full business address"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                Business Phone Number
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your business phone number"
                className="h-10"
              />
            </div>

            <div className="pt-4 border-t">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="authorization"
                  checked={isAuthorized}
                  onCheckedChange={(checked) => setIsAuthorized(checked as boolean)}
                  className="mt-1"
                />
                <Label
                  htmlFor="authorization"
                  className="text-sm text-gray-700 font-normal cursor-pointer"
                >
                  I authorize Rent Capital to verify my business information and
                  creditworthiness. This may include a soft business credit inquiry, 
                  which will not affect my personal credit.
                </Label>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center text-amber-600 text-sm mb-4">
            <Info className="h-4 w-4 mr-2" />
            <p>
              All information is securely stored and used only for verification purposes.
            </p>
          </div>

          <Button
            className="bg-primary hover:bg-primary/90 text-primary-foreground py-5 px-6 text-base gap-2 min-w-[200px] mb-4"
            onClick={handleContinue}
          >
            Continue to Revenue Purchase Agreement
            <ArrowRight className="size-5" strokeWidth={3} />
          </Button>
        </div>
      </div>

      <div className="py-4 text-center">
        <p className="text-xs text-gray-500">
          © 2025 Rent Capital. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default EntityDetails;
