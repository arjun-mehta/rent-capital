
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
      <div className="bg-white rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
        {/* Dashboard Header */}
        <div className="bg-[#f5f5f7] p-5 flex items-center justify-between border-b border-[#e5e5e7]">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 rounded-full bg-[#ff605c]"></div>
            <div className="w-3 h-3 rounded-full bg-[#ffbd44]"></div>
            <div className="w-3 h-3 rounded-full bg-[#00ca4e]"></div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-24 h-6 bg-[#e5e5e7] rounded-md"></div>
            <div className="w-6 h-6 rounded-full bg-[#e5e5e7] flex items-center justify-center">
              <svg className="w-3 h-3 text-[#999]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Dashboard Content */}
        <div className="p-8 bg-white">
          <div className="flex justify-between items-center mb-8">
            <div className="text-[#1d1d1f] text-2xl font-medium tracking-tight">Creator Capital</div>
            <div className="px-4 py-1.5 bg-[#f5f5f7] rounded-full text-[#6e6e73] text-sm font-medium">Welcome back, Sam</div>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-[#e5e5e7] shadow-sm">
              <div className="text-[#6e6e73] text-sm font-medium mb-2">Monthly Revenue</div>
              <div className="text-[#1d1d1f] text-3xl font-semibold tracking-tight">$24,851</div>
              <div className="text-[#34c759] text-xs font-medium mt-3 flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M12 5L18 11M12 5L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                12.5% from last month
              </div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#e5e5e7] shadow-sm">
              <div className="text-[#6e6e73] text-sm font-medium mb-2">Available Funding</div>
              <div className="text-[#1d1d1f] text-3xl font-semibold tracking-tight">$223,659</div>
              <div className="text-[#6e6e73] text-xs font-medium mt-3">9× your monthly revenue</div>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-[#e5e5e7] shadow-sm">
              <div className="text-[#6e6e73] text-sm font-medium mb-2">Subscribers</div>
              <div className="text-[#1d1d1f] text-3xl font-semibold tracking-tight">1,284</div>
              <div className="text-[#34c759] text-xs font-medium mt-3 flex items-center">
                <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M12 5L18 11M12 5L6 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                78 new this month
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="bg-white p-6 rounded-2xl border border-[#e5e5e7] shadow-sm mb-8">
            <div className="flex justify-between items-center mb-5">
              <div className="text-[#1d1d1f] font-medium">Revenue Growth</div>
              <div className="text-[#6e6e73] text-xs font-medium">Last 12 months</div>
            </div>
            <div className="h-32 flex items-end justify-between space-x-2">
              {[35, 42, 38, 45, 52, 48, 56, 60, 65, 72, 68, 78].map((height, index) => (
                <div key={index} className="h-full flex flex-col justify-end">
                  <div 
                    className={`w-5 rounded-t-sm ${index === 11 ? 'bg-black' : 'bg-[#f5f5f7]'}`}
                    style={{height: `${height}%`}}
                  ></div>
                  <div className="text-[#86868b] text-[10px] mt-1.5 text-center">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][index]}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Action Button */}
          <div className="flex justify-center">
            <button className="w-full sm:w-auto px-7 py-3.5 bg-black text-white rounded-full font-medium text-sm transition-transform hover:scale-105">
              Claim Your Funding Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
