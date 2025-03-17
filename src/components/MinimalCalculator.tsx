
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlanDuration = "3" | "6" | "12";

const MinimalCalculator: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000);
  const [selectedPlan, setSelectedPlan] = useState<PlanDuration>("12");
  
  // Calculate values based on plan duration with different multipliers
  const annualRevenue = monthlyRevenue * 12;
  
  // Apply different multipliers based on plan duration
  let advanceMultiplier = 0.85; // Default for 12 months
  if (selectedPlan === "3") {
    advanceMultiplier = 0.95;
  } else if (selectedPlan === "6") {
    advanceMultiplier = 0.9;
  }
  
  // Calculate advance amount based on selected plan duration and its specific multiplier without rounding
  const advanceAmount = monthlyRevenue * Number(selectedPlan) * advanceMultiplier;
  
  const handleSliderChange = (value: number[]) => {
    // Update to map slider value 10-100 to revenue $10,000-$100,000
    setMonthlyRevenue(value[0] * 1000);
  };

  const handlePlanChange = (value: string) => {
    setSelectedPlan(value as PlanDuration);
  };

  return (
    <div className="w-full max-w-lg ml-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8 md:p-10">
        <div className="mb-8">
          <h3 className="text-xl font-medium mb-4">See how much you could receive</h3>
          
          <div className="bg-black/[0.02] rounded-lg p-5 border border-black/5 mb-6">
            <div className="text-sm font-medium text-gray-700 mb-4">Monthly subscription revenue</div>
            <div className="space-y-4">
              <Slider 
                defaultValue={[10]} 
                min={10}
                max={100} 
                step={1} 
                onValueChange={handleSliderChange}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">$10,000</span>
                <span className="text-base font-medium">${monthlyRevenue.toLocaleString()}</span>
                <span className="text-xs text-gray-500">$100,000</span>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="text-sm font-medium text-gray-700 mb-4">Advance size</div>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "3", label: "3 months" },
                { value: "6", label: "6 months" },
                { value: "12", label: "12 months" }
              ].map((plan) => (
                <button
                  key={plan.value}
                  onClick={() => handlePlanChange(plan.value)}
                  className={cn(
                    "py-3 px-2 rounded-lg text-center transition-all duration-200",
                    "text-sm font-medium",
                    selectedPlan === plan.value
                      ? "border-2 border-[#017354] text-[#017354] bg-white"
                      : "border border-gray-200 text-gray-700 bg-white hover:border-[#017354]/50"
                  )}
                >
                  {plan.label}
                </button>
              ))}
            </div>
          </div>
          
          <Card className="border-0 shadow-md overflow-hidden mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col text-left">
                <div className="text-sm font-medium text-gray-500 mb-2">Estimated advance amount</div>
                <span className="text-3xl font-semibold text-[#017354]">${advanceAmount.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <Button 
          className={cn(
            "w-full bg-[#017354] hover:bg-[#017354]/90 text-white",
            "flex items-center justify-center rounded-lg h-12"
          )}
          onClick={() => document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'})}
        >
          Apply Now
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default MinimalCalculator;
