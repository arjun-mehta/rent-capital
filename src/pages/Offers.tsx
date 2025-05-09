import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Check } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";

interface OfferOption {
  id: string;
  months: number;
  amount: number;
  fee: number;
  feePercentage: number;
  totalRepayment: number;
  monthlyPayment: number;
  projectedRevenue: number;
}

const Offers: React.FC = () => {
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  const { isAuthenticated, isPatreonConnected } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or Patreon not connected
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    } else if (!isPatreonConnected) {
      navigate("/connect-patreon");
    }
  }, [isAuthenticated, isPatreonConnected, navigate]);

  // Mock offer options
  const offerOptions: OfferOption[] = [
    {
      id: "3-month",
      months: 3,
      amount: 231000,
      fee: 18750,
      feePercentage: 7.5,
      totalRepayment: 249750,
      monthlyPayment: Math.round((250000 / 3) * 0.9),
      projectedRevenue: 250000
    },
    {
      id: "6-month",
      months: 6,
      amount: 450000,
      fee: 50000,
      feePercentage: 10,
      totalRepayment: 500000,
      monthlyPayment: Math.round((500000 / 6) * 0.9),
      projectedRevenue: 500000
    },
    {
      id: "12-month",
      months: 12,
      amount: 850000,
      fee: 150000,
      feePercentage: 15,
      totalRepayment: 1000000,
      monthlyPayment: Math.round((1000000 / 12) * 0.9),
      projectedRevenue: 1000000
    }
  ];

  const handleSelectOffer = (offerId: string) => {
    setSelectedOffer(offerId);
  };

  const handleContinue = () => {
    if (selectedOffer) {
      navigate("/entity-details");
    }
  };

  return (
    <div className="min-h-screen h-screen flex flex-col bg-[#FCF7F0]">
      <div className="flex-1 flex flex-col overflow-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="mb-2">
            <span className="text-xl font-poppins font-semibold tracking-tight">Creator Capital</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Your Revenue Purchase Offers
          </h1>
          <p className="text-md text-gray-600 max-w-5xl mx-auto">
            Based on your Patreon subscription revenue, we've prepared these funding options for you.
            Select the option that works best for your needs. Collections are made directly from your Patreon — no manual payments needed.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6 flex-1 max-w-5xl mx-auto">
          {offerOptions.map((offer) => (
            <Card 
              key={offer.id} 
              className={cn(
                "relative flex flex-col border rounded-xl shadow-md transition-all duration-200 overflow-hidden cursor-pointer",
                selectedOffer === offer.id 
                  ? "border-[#017354] ring-2 ring-[#017354] ring-opacity-50 transform scale-[1.02]" 
                  : "border-gray-200 hover:border-[#017354] hover:shadow-lg"
              )}
              onClick={() => handleSelectOffer(offer.id)}
            >
              {selectedOffer === offer.id && (
                <div className="absolute top-0 right-0 bg-[#017354] text-white p-2 rounded-bl-lg">
                  <Check size={16} />
                </div>
              )}
              <div className="p-5 pb-3 flex flex-col h-full">
                <div className="mb-2">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {offer.months}-Month Advance
                  </h3>
                  <div className="text-3xl font-bold text-[#017354] mb-2">
                    ${offer.amount.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-500">
                    ${offer.monthlyPayment.toLocaleString()} estimated monthly collection for approx. {offer.months} months
                  </p>
                </div>

                <div className="mb-2">
                  <div className="grid grid-cols-1 gap-1">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-1.5">
                        <Check size={10} className="text-green-600" />
                      </div>
                      <span className="text-sm">
                        Projected Revenue: ${offer.projectedRevenue.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-1.5">
                        <Check size={10} className="text-green-600" />
                      </div>
                      <span className="text-sm">
                        Flat Fee: ${offer.fee.toLocaleString()} ({offer.feePercentage}% of Projected Revenue)
                      </span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-4 w-4 rounded-full bg-green-100 flex items-center justify-center mr-1.5">
                        <Check size={10} className="text-green-600" />
                      </div>
                      <span className="text-sm">
                        Monthly Split: 90% to repayment / 10% to you
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  className={cn(
                    "w-full mt-auto",
                    selectedOffer === offer.id 
                      ? "bg-[#017354] hover:bg-[#017354]/90 text-white" 
                      : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-50"
                  )}
                  onClick={() => handleSelectOffer(offer.id)}
                  size="sm"
                >
                  {selectedOffer === offer.id ? "Selected" : "Select This Plan"}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex flex-col items-center justify-center">
          <Button
            className={cn(
              "py-5 px-6 text-lg gap-2 min-w-[200px] mb-4 transition-all duration-200",
              selectedOffer 
                ? "bg-[#017354] hover:bg-[#017354]/90 text-white" 
                : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70"
            )}
            disabled={!selectedOffer}
            onClick={handleContinue}
          >
            Continue
            <ArrowRight className="h-5 w-5" />
          </Button>
          
          <div className="text-center text-xs text-gray-500 max-w-5xl mx-auto">
            <p>Creator Capital provides revenue-based funding, not loans. We purchase a fixed portion of your future subscription revenue at a set rate. Repayment timelines may vary with revenue performance. No personal guarantees or credit checks are required. All offers are subject to final approval. Funding typically begins within 24–48 hours of contract execution.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Offers; 