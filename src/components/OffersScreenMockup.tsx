import React, { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const OffersScreenMockup: React.FC = () => {
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

  // Calculate offer details based on selected total repayment
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="w-full max-w-5xl md:max-w-6xl lg:max-w-7xl mx-auto">
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-lg">
        <div className="bg-gray-50 border-b border-gray-200 px-4 py-2.5 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex-1 bg-white rounded-md px-4 py-1.5 text-xs text-gray-500 text-center border border-gray-200">
            yourbrand.com/offers
          </div>
        </div>

        <div className="p-4 md:p-6 bg-white">
          <div className="max-w-3xl mx-auto">
            {/* White-label Logo Placeholder */}
            <div className="text-center mb-6">
              <div className="relative inline-flex flex-col items-center justify-center w-40 h-20 md:w-48 md:h-24 rounded-lg bg-primary/5 py-3 border-2 border-dashed border-primary/20 overflow-hidden">
                {/* Shimmer effect */}
                <div 
                  className="absolute inset-0 z-0"
                  style={{
                    background: 'linear-gradient(110deg, transparent 25%, hsl(var(--primary)) 50%, transparent 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2.5s linear infinite',
                    opacity: 0.3,
                  }}
                />
                <span className="text-sm md:text-base font-semibold text-primary uppercase tracking-wide mb-1 relative z-10">
                  Your Logo
                </span>
                <span className="text-xs text-gray-500 font-medium relative z-10">White-labeled branding</span>
                <style>{`
                  @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                  }
                `}</style>
              </div>
            </div>
            <div className="text-center mb-5 md:mb-6">
              <h1 className="text-lg md:text-xl font-emilio text-gray-900">
                How many months of rent would you like to be advanced?
              </h1>
            </div>

            <Card className="p-4 md:p-5 border rounded-xl shadow-sm">
              <div className="text-center mb-4">
                <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                  Advance Amount
                </div>
                <div className="text-3xl md:text-4xl font-bold tracking-tight text-primary mb-1">
                  {formatCurrency(offerDetails.amount)}
                </div>
                <div className="text-xs text-gray-500">
                  {offerDetails.months} {offerDetails.months === 1 ? 'month' : 'months'} of rent
                </div>
              </div>

              <div className="mb-4">
                <div className="relative px-2">
                  <Slider
                    value={totalRepayment}
                    onValueChange={setTotalRepayment}
                    min={minRepayment}
                    max={maxRepayment}
                    step={step}
                    className="w-full relative z-10"
                  />
                  <div className="flex justify-between mt-1.5 text-xs text-gray-400">
                    <span>$10k</span>
                    <span>$90k</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mb-4">
                {[3, 6, 9].map((value) => {
                  const repaymentForMonths = value * 10000;
                  const isSelected = offerDetails.months === value;
                  return (
                    <Button
                      key={value}
                      variant="outline"
                      size="sm"
                      className={cn(
                        "text-xs py-1.5 px-2",
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

              <div className="border-t pt-3">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Months
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {offerDetails.months}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Fee ({offerDetails.feePercentage.toFixed(2)}%)
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(offerDetails.fee)}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
                      Total
                    </div>
                    <div className="text-lg font-bold text-gray-900">
                      {formatCurrency(offerDetails.totalRepayment)}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-9 text-sm"
                >
                  Continue with {formatCurrency(offerDetails.amount)}
                  <ArrowRight className="h-3.5 w-3.5 ml-2" />
                </Button>
              </div>
                </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersScreenMockup;
