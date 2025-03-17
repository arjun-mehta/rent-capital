import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  Calendar, 
  Clock, 
  BarChart4, 
  PieChart,
  UserRound,
  ChevronRight
} from "lucide-react";

const DashboardMockup: React.FC = () => {
  const mockupRef = useRef<HTMLDivElement>(null);
  const [monthlyRevenue, setMonthlyRevenue] = useState(10000);
  const annualRevenue = monthlyRevenue * 12;
  const advanceAmount = Math.round(annualRevenue * 0.85 / 1000) * 1000; // 85% of annual, rounded to nearest 1000
  
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
      <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] border border-black/10">
        {/* Navigation Bar */}
        <div className="bg-black/[0.03] border-b border-black/10">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-black/5 flex items-center justify-center border border-black/10 overflow-hidden">
                <UserRound className="h-5 w-5 text-gray-600" />
              </div>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-800">Alex Johnson</span>
                <ChevronRight className="h-4 w-4 text-gray-400 ml-1" />
              </div>
            </div>
            <div className="text-xs font-medium text-gray-500 bg-white/60 px-3 py-1 rounded-full border border-black/5">
              Dashboard Preview
            </div>
          </div>
        </div>
        
        {/* Clean white background */}
        <div className="absolute inset-0 bg-white -z-10"></div>
        
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
            <div className="bg-[#F2FCE2] rounded-2xl p-6 border border-black/5">
              <div className="flex flex-col text-left">
                <div className="flex items-baseline mb-2">
                  <div className="text-sm font-medium text-gray-500">You could receive</div>
                  <div className="text-sm text-gray-500 ml-2">Based on your current subscription revenue</div>
                </div>
                <span className="text-3xl md:text-4xl font-semibold text-green-600">${advanceAmount.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Revenue Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-black/[0.02] rounded-xl p-5 border border-black/5">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-gray-500">Current Monthly Revenue</div>
                  <BarChart4 className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-medium text-gray-900">${monthlyRevenue.toLocaleString()}</div>
              </div>
              
              <div className="bg-black/[0.02] rounded-xl p-5 border border-black/5">
                <div className="flex justify-between items-start mb-2">
                  <div className="text-sm font-medium text-gray-500">Annualized Revenue</div>
                  <PieChart className="w-4 h-4 text-gray-400" />
                </div>
                <div className="text-2xl font-medium text-gray-900">${annualRevenue.toLocaleString()}</div>
                <div className="text-xs text-gray-500 mt-1">Turn your monthly earnings into upfront cash</div>
              </div>
            </div>
            
            {/* Funding Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-xl p-4 border border-black/5">
                <div className="flex space-x-3 items-start">
                  <div className="p-2 bg-black/[0.02] rounded-lg">
                    <DollarSign className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Advance Rate</div>
                    <div className="text-xs text-gray-500 mt-1">85-90% of projected earnings</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-black/5">
                <div className="flex space-x-3 items-start">
                  <div className="p-2 bg-black/[0.02] rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Repayment</div>
                    <div className="text-xs text-gray-500 mt-1">A portion of future earnings</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-black/5">
                <div className="flex space-x-3 items-start">
                  <div className="p-2 bg-black/[0.02] rounded-lg">
                    <Clock className="w-4 h-4 text-gray-500" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Approval Speed</div>
                    <div className="text-xs text-gray-500 mt-1">As fast as 48 hours</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* CTA Button */}
            <div className="flex justify-center mt-6">
              <Button 
                className="bg-black hover:bg-black/90 text-white w-full md:w-auto px-8 flex items-center justify-center h-12 rounded-full"
                onClick={() => document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'})}
              >
                See Your Offer
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
