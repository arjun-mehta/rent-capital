
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { ArrowRight, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MinimalCalculator: React.FC = () => {
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000);
  const annualRevenue = monthlyRevenue * 12;
  const advanceAmount = Math.round(annualRevenue * 0.85 / 1000) * 1000; // 85% of annual, rounded to nearest 1000
  
  const handleSliderChange = (value: number[]) => {
    setMonthlyRevenue(value[0] * 1000); // Convert slider value to revenue (1 = $1,000)
  };

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-xl border-[3px] border-black/10 shadow-lg overflow-hidden">
      <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
        boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5)",
        zIndex: 5
      }}></div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">See how much you could receive</h3>
          
          <Card className="border border-black/5 shadow-md overflow-hidden mb-6">
            <CardContent className="p-5">
              <div className="flex flex-col text-left">
                <div className="text-sm font-medium text-gray-500 mb-1">Estimated advance amount</div>
                <span className="text-3xl font-semibold text-green-600">${advanceAmount.toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
          
          <div className="bg-black/[0.02] rounded-lg p-4 border border-black/5">
            <div className="text-sm font-medium text-gray-700 mb-3">Monthly subscription revenue</div>
            <div className="space-y-3">
              <Slider 
                defaultValue={[10]} 
                max={20} 
                step={1} 
                onValueChange={handleSliderChange}
              />
              <div className="flex justify-between items-center">
                <span className="text-xs text-gray-500">$1,000</span>
                <span className="text-base font-medium">${monthlyRevenue.toLocaleString()}</span>
                <span className="text-xs text-gray-500">$20,000</span>
              </div>
            </div>
          </div>
        </div>
        
        <Button 
          className={cn(
            "w-full bg-black hover:bg-black/90 text-white",
            "flex items-center justify-center rounded-lg h-10"
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
