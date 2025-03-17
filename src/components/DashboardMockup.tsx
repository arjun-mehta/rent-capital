
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const DashboardMockup: React.FC = () => {
  const mockupRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Simple animation for the dashboard
    const timer = setTimeout(() => {
      if (mockupRef.current) {
        mockupRef.current.classList.add('translate-y-0', 'opacity-100');
        mockupRef.current.classList.remove('translate-y-8', 'opacity-0');
      }
    }, 600); // Delay after the hero text animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      ref={mockupRef}
      className="w-full max-w-4xl mx-auto mt-12 transition-all duration-700 ease-out transform translate-y-8 opacity-0"
    >
      <div className="bg-black rounded-xl overflow-hidden shadow-2xl border border-gray-800">
        {/* Dashboard Header */}
        <div className="bg-gray-900 p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-24 h-6 bg-gray-800 rounded-md"></div>
            <div className="w-6 h-6 bg-gray-800 rounded-md"></div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="p-6 bg-gradient-to-br from-gray-900 to-black">
          <div className="flex justify-between items-center mb-6">
            <div className="text-white text-xl font-medium">Creator Capital Dashboard</div>
            <div className="px-4 py-1 bg-[#fcf4ed]/10 rounded-full text-[#fcf4ed] text-sm">Welcome back!</div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">Monthly Revenue</div>
              <div className="text-white text-2xl font-semibold">$24,851.00</div>
              <div className="text-green-500 text-xs mt-2 flex items-center">
                <span className="inline-block w-3 h-3">↑</span> 12.5% from last month
              </div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">Available Funding</div>
              <div className="text-white text-2xl font-semibold">$223,659.00</div>
              <div className="text-[#fcf4ed] text-xs mt-2">9x your monthly revenue</div>
            </div>
            <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
              <div className="text-gray-400 text-sm mb-1">Subscribers</div>
              <div className="text-white text-2xl font-semibold">1,284</div>
              <div className="text-green-500 text-xs mt-2 flex items-center">
                <span className="inline-block w-3 h-3">↑</span> 78 new this month
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="bg-gray-800/60 backdrop-blur-sm p-4 rounded-lg border border-gray-700 mb-6">
            <div className="text-gray-300 mb-3">Revenue Growth</div>
            <div className="h-28 flex items-end justify-between space-x-2">
              {[35, 45, 40, 50, 60, 55, 65, 70, 80, 85, 75, 90].map((height, index) => (
                <div key={index} className="h-full flex flex-col justify-end">
                  <div 
                    className="w-6 bg-gradient-to-t from-[#fcf4ed]/80 to-[#fcf4ed]/30 rounded-sm"
                    style={{height: `${height}%`}}
                  ></div>
                  <div className="text-gray-500 text-xs mt-1">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex justify-center">
            <div className="px-6 py-3 bg-[#fcf4ed] text-black rounded-lg font-medium inline-block">
              Claim Your Funding Now
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
