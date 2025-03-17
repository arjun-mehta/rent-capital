import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  BarChart4, 
  PieChart,
  UserRound,
  ChevronRight,
  DollarSign,
  Upload
} from "lucide-react";

const DashboardMockup: React.FC = () => {
  const mockupRef = useRef<HTMLDivElement>(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000);
  const annualRevenue = monthlyRevenue * 12;
  const advanceAmount = Math.round(annualRevenue * 0.85 / 1000) * 1000; // 85% of annual, rounded to nearest 1000
  
  const handleSliderChange = (value: number[]) => {
    setMonthlyRevenue(value[0] * 1000); // Convert slider value to revenue (1 = $1,000)
  };
  
  useEffect(() => {
    // Animation for the dashboard
    const timer = setTimeout(() => {
      if (mockupRef.current) {
        mockupRef.current.classList.add('translate-y-0', 'opacity-100');
        mockupRef.current.classList.remove('translate-y-8', 'opacity-0');
      }
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={mockupRef}
      className="w-full max-w-4xl mx-auto mt-12 transition-all duration-700 ease-out transform translate-y-8 opacity-0"
    >
      <div className="relative overflow-hidden rounded-3xl border-[3px] border-black/10 shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] bg-gradient-to-b from-gray-50 to-white">
        {/* Apple-style inner border glow effect */}
        <div className="absolute inset-0 rounded-3xl pointer-events-none" style={{
          boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5)",
          zIndex: 5
        }}></div>
        
        {/* Navigation Bar */}
        <div className="bg-black/[0.03] border-b border-black/10 backdrop-blur-sm bg-white/80">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-9 w-9 border border-black/10 shadow-sm">
                <AvatarImage src="/lovable-uploads/7e03b3ad-f9ee-43d6-b27f-2bc4e73805e6.png" alt="Profile" />
                <AvatarFallback>
                  <UserRound className="h-5 w-5 text-gray-600" />
                </AvatarFallback>
              </Avatar>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-800">Alex Johnson</span>
                <ChevronRight className="h-4 w-4 text-gray-400 ml-1" />
              </div>
            </div>
            <div className="text-xs font-medium text-gray-500 bg-white/60 px-3 py-1.5 rounded-full border border-black/5 shadow-sm flex items-center gap-1.5">
              <Upload className="h-3.5 w-3.5 text-gray-500" />
              New Estimate
            </div>
          </div>
        </div>
        
        {/* Clean white background with subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/30 -z-10"></div>
        
        {/* Content container */}
        <div className="relative p-8 md:p-10">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
            <h2 className="text-xl font-medium text-gray-900">Creator Dashboard</h2>
            <div className="text-sm text-gray-500">Instant preview</div>
          </div>
          
          {/* Main Content */}
          <div className="space-y-8">
            {/* Estimated Upfront Advance */}
            <Card className="border border-black/5 shadow-md overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col text-left">
                  <div className="text-sm font-medium text-gray-500 mb-2">You could receive based on your current subscription revenue</div>
                  <span className="text-3xl md:text-4xl font-semibold text-green-600">${advanceAmount.toLocaleString()}</span>
                </div>
              </CardContent>
            </Card>
            
            {/* Revenue Adjustment Slider */}
            <div className="bg-black/[0.02] rounded-xl p-5 border border-black/5">
              <div className="flex justify-between items-start mb-4">
                <div className="text-sm font-medium text-gray-700">Adjust your monthly revenue to see your potential advance</div>
              </div>
              <div className="space-y-4">
                <Slider 
                  defaultValue={[10]} 
                  max={20} 
                  step={1} 
                  onValueChange={handleSliderChange}
                  className="py-4"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>$1,000</span>
                  <span>$20,000</span>
                </div>
              </div>
            </div>
            
            {/* Revenue Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border border-black/5 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium text-gray-500">Current Monthly Revenue</div>
                    <BarChart4 className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-medium text-gray-900">${monthlyRevenue.toLocaleString()}</div>
                </CardContent>
              </Card>
              
              <Card className="border border-black/5 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm font-medium text-gray-500">Projected Yearly Earnings</div>
                    <PieChart className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-medium text-gray-900">${annualRevenue.toLocaleString()}</div>
                  <div className="text-xs text-gray-500 mt-1">Unlock the value of a full year's earnings upfront</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Funding Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="border border-black/5 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex space-x-3 items-start">
                    <div className="p-2 bg-black/[0.02] rounded-lg">
                      <DollarSign className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Advance Rate</div>
                      <div className="text-xs text-gray-500 mt-1">Get 75-90% of your expected earnings upfront</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-black/5 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex space-x-3 items-start">
                    <div className="p-2 bg-black/[0.02] rounded-lg">
                      <Calendar className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Repayment</div>
                      <div className="text-xs text-gray-500 mt-1">Automatically deducted from your subscription revenue—no manual payments</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border border-black/5 shadow-sm">
                <CardContent className="p-4">
                  <div className="flex space-x-3 items-start">
                    <div className="p-2 bg-black/[0.02] rounded-lg">
                      <Clock className="w-4 h-4 text-gray-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Approval Speed</div>
                      <div className="text-xs text-gray-500 mt-1">Approval in 24-48 hours—fast, flexible funding</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center mt-6">
              <Button 
                className="bg-black hover:bg-black/90 text-white w-full md:w-auto px-8 flex items-center justify-center h-12 rounded-full"
                onClick={() => document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'})}
              >
                Unlock Your Funding Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
