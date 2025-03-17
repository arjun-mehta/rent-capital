
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MinimalCalculator: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000);
  const annualRevenue = monthlyRevenue * 12;
  const advanceAmount = Math.round(annualRevenue * 0.9 / 1000) * 1000;
  
  const handleSliderChange = (value: number[]) => {
    // Update to map slider value 10-100 to revenue $10,000-$100,000
    setMonthlyRevenue(value[0] * 1000);
  };

  return (
    <div className="w-full max-w-md ml-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-8">
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
