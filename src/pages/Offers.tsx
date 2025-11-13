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
  // Slider configuration - total repayment (10k-90k, 10k increments)
  const minRepayment = 10000;
  const maxRepayment = 90000;
  const step = 10000;
  const defaultRepayment = 30000; // Default to 30k (3 months)
  
  // Dynamic fee percentage based on months
  const getFeePercentage = (months: number): number => {
    const feeTable: Record<number, number> = {
      1: 5.00,
      2: 6.00,
      3: 7.00,
      4: 8.00,
      5: 9.00,
      6: 10.00,
      7: 11.00,
      8: 12.00,
      9: 13.00,
      10: 14.00,
      11: 14.50,
      12: 15.00,
    };
    return feeTable[months] || 10.00;
  };
  
  const [totalRepayment, setTotalRepayment] = useState([defaultRepayment]);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/signin");
    }
  }, [isAuthenticated, navigate]);

  // Calculate offer details based on selected total repayment
  // Months are calculated dynamically from total repayment: months = totalRepayment / 10,000
  const offerDetails = useMemo(() => {
    const selectedRepayment = totalRepayment[0];
    // Calculate months from total repayment (10k = 1 month, 20k = 2 months, etc.)
    const calculatedMonths = Math.round(selectedRepayment / 10000);
    // Ensure months is between 1 and 9
    const selectedMonths = Math.max(1, Math.min(9, calculatedMonths));
    
    // Fee calculation: dynamic percentage based on months
    const feePercentage = getFeePercentage(selectedMonths);
    const fee = Math.round(selectedRepayment * (feePercentage / 100));
    
    // Advance amount = total repayment - fee
    const amount = selectedRepayment - fee;
    
    return {
      months: selectedMonths,
      amount,
      fee,
      feePercentage,
      totalRepayment: selectedRepayment,
    };
  }, [totalRepayment]);

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
            <Title>
              <span className="block">How many months of rent</span>
              <span className="block">would you like to be advanced?</span>
            </Title>
          </div>

          <Card className="p-8 md:p-12 border rounded-xl shadow-md">
            {/* Amount Display */}
            <div className="text-center mb-10">
              <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
                Advance Amount
              </div>
              <div className="text-5xl md:text-6xl font-bold tracking-tight text-primary">
                {formatCurrency(offerDetails.amount)}
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                {offerDetails.months} {offerDetails.months === 1 ? 'month' : 'months'} of rent
              </div>
            </div>

            {/* Total Repayment Slider */}
            <div className="mb-8">
              <div className="relative px-2">
                <Slider
                  value={totalRepayment}
                  onValueChange={setTotalRepayment}
                  min={minRepayment}
                  max={maxRepayment}
                  step={step}
                  className="w-full"
                />
                {/* Repayment markers/ridges */}
                <div className="absolute top-0 left-2 right-2 h-1 flex justify-between items-center pointer-events-none">
                  {Array.from({ length: (maxRepayment - minRepayment) / step + 1 }, (_, i) => {
                    const repaymentValue = minRepayment + (i * step);
                    return (
                      <div
                        key={repaymentValue}
                        className="w-0.5 h-3 bg-border rounded-full"
                        style={{
                          position: 'absolute',
                          left: `${((repaymentValue - minRepayment) / (maxRepayment - minRepayment)) * 100}%`,
                          transform: 'translateX(-50%)',
                        }}
                      />
                    );
                  })}
                </div>
                {/* Repayment labels */}
                <div className="flex justify-between text-xs text-muted-foreground mt-3 px-2">
                  <span>$10k</span>
                  <span>$90k</span>
                </div>
              </div>
            </div>

            {/* Quick Month Buttons */}
            <div className="grid grid-cols-4 gap-2 mb-8">
              {[1, 3, 6, 9].map((value) => {
                const repaymentForMonths = value * 10000;
                const isSelected = offerDetails.months === value;
                return (
                  <Button
                    key={value}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "text-xs",
                      isSelected
                        ? "border-primary bg-primary/10 text-primary"
                        : "hover:border-primary/50"
                    )}
                    onClick={() => setTotalRepayment([repaymentForMonths])}
                  >
                    {value} {value === 1 ? 'Month' : 'Months'}
                  </Button>
                );
              })}
            </div>

            {/* Offer Details */}
            <div className="border-t pt-6 mt-6">
              <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
                <div className="text-center">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Months Advanced
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {offerDetails.months}
                  </div>
                </div>
                
                <div className="hidden md:block w-px h-12 bg-border"></div>
                
                <div className="text-center">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Fee ({offerDetails.feePercentage.toFixed(2)}%)
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {formatCurrency(offerDetails.fee)}
                  </div>
                </div>
                
                <div className="hidden md:block w-px h-12 bg-border"></div>
                
                <div className="text-center">
                  <div className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2">
                    Total Repayment
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">
                    {formatCurrency(offerDetails.totalRepayment)}
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className="flex flex-col gap-6 mt-8 items-center justify-center">
            <Button
              className="bg-primary hover:bg-primary/90 text-primary-foreground h-12 text-base w-full max-w-md"
              onClick={handleContinue}
            >
              Continue with {formatCurrency(offerDetails.amount)}
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
      <div className="py-4 text-center mt-2">
        <p className="text-xs text-muted-foreground">
          © 2025 Rent Capital. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Offers;
