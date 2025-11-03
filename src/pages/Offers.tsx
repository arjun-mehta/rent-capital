import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, Check } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { Logo } from "./homepage/navigation";
import { Title } from "@/components/Text";

const Offers: React.FC = () => {
  // Slider configuration
  const minAmount = 50000;
  const maxAmount = 1000000;
  const step = 1000;
  const defaultAmount = Math.round((minAmount + maxAmount) / 2); // Middle of the range
  
  const [amount, setAmount] = useState([defaultAmount]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Calculate offer details based on selected amount
  const offerDetails = useMemo(() => {
    const selectedAmount = amount[0];
    
    // Fee calculation: 10% of total repayment (not advance amount)
    // If fee = 10% of totalRepayment, then:
    // totalRepayment = selectedAmount + fee
    // fee = totalRepayment * 0.10
    // fee = (selectedAmount + fee) * 0.10
    // fee = selectedAmount / 9
    const feePercentage = 10;
    const fee = Math.round(selectedAmount / 9);
    
    // Total repayment is amount + fee
    const totalRepayment = selectedAmount + fee;
    
    return {
      amount: selectedAmount,
      fee,
      feePercentage,
      totalRepayment,
    };
  }, [amount]);

  const handleContinue = () => {
    // Store selected amount for next steps
    navigate("/entity-details");
  };

  // Format currency helper
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="w-full p-4 flex justify-center px-8 md:px-12">
        <Link to="/" className="flex items-center">
          <Logo className="h-8" />
        </Link>
      </header>

      <div className="overflow-auto flex-1 flex items-center justify-center flex-col py-8 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-2xl">
          <div className="text-center mb-10">
            <Title>How much would you like to be advanced?</Title>
            <p className="text-md text-gray-600 text-balance max-w-2xl mx-auto mt-4">
              Repayment is automatically collected from your rental income each month.
            </p>
          </div>

          <Card className="p-8 md:p-12 border rounded-xl shadow-md">
            {/* Amount Display */}
            <div className="text-center mb-10">
              <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                Advance Amount
              </div>
              <div className="text-5xl md:text-6xl font-bold tracking-tight text-primary">
                {formatCurrency(offerDetails.amount)}
              </div>
            </div>

            {/* Slider */}
            <div className="mb-8">
              <Slider
                value={amount}
                onValueChange={setAmount}
                min={minAmount}
                max={maxAmount}
                step={step}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>{formatCurrency(minAmount)}</span>
                <span>{formatCurrency(maxAmount)}</span>
              </div>
            </div>

            {/* Quick Amount Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {[100000, 250000, 500000, 750000].map((value) => (
                <Button
                  key={value}
                  variant="outline"
                  size="sm"
                  className={cn(
                    "text-xs",
                    amount[0] === value
                      ? "border-primary bg-primary/10 text-primary"
                      : "hover:border-primary/50"
                  )}
                  onClick={() => setAmount([value])}
                >
                  {formatCurrency(value)}
                </Button>
              ))}
            </div>

            {/* Offer Details */}
            <div className="border-t pt-6 mt-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Flat Fee ({offerDetails.feePercentage}%)
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">
                    {formatCurrency(offerDetails.fee)}
                  </div>
                </div>
                
                <div className="hidden md:block w-px h-12 bg-gray-200"></div>
                
                <div className="text-center">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                    Total Repayment
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900">
                    {formatCurrency(offerDetails.totalRepayment)}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-2 mt-8 items-center justify-center">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base w-full max-w-md"
              onClick={handleContinue}
            >
              Continue with {formatCurrency(offerDetails.amount)}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>

            <div className="text-center text-xs text-gray-500 max-w-2xl mx-auto">
              <p>
                Rent Capital provides revenue-based funding, not loans. We
                purchase a fixed portion of your future rental income at
                a set rate. Repayment timelines may vary with rental income
                performance. No personal guarantees or credit checks are
                required. All offers are subject to final approval. Funding
                typically begins within 24–48 hours of contract execution.
              </p>
            </div>
          </div>
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

export default Offers;
