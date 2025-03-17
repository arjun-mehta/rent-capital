
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { StarIcon, ChevronRightIcon } from "lucide-react";

const DashboardMockup: React.FC = () => {
  const mockupRef = useRef<HTMLDivElement>(null);
  
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

  // Create an array of random stars for the background
  const generateStars = (count: number) => {
    return Array.from({ length: count }).map((_, i) => {
      const size = Math.random() * 2 + 1;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const opacity = Math.random() * 0.7 + 0.3;
      
      return (
        <div 
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${top}%`,
            left: `${left}%`,
            opacity
          }}
        />
      );
    });
  };

  return (
    <div 
      ref={mockupRef}
      className="w-full max-w-4xl mx-auto mt-12 transition-all duration-700 ease-out transform translate-y-8 opacity-0"
    >
      <div className="relative overflow-hidden rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)]">
        {/* Background with gradient and stars */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#4e6aff] via-[#6b7aff] to-[#a364ff] overflow-hidden">
          {generateStars(50)}
        </div>
        
        {/* Content container with glass effect */}
        <div className="relative p-8 md:p-10 backdrop-blur-sm">
          {/* Dashboard Header */}
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md">
                <StarIcon className="w-6 h-6 text-white" />
              </div>
              <h2 className="ml-3 text-2xl font-medium text-white">Creator Capital</h2>
            </div>
            <div className="flex space-x-4">
              <Button variant="ghost" className="text-white hover:bg-white/10">Portfolio</Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">Twitter</Button>
              <Button variant="ghost" className="text-white hover:bg-white/10">Contact</Button>
            </div>
          </div>
          
          {/* Main project card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 mb-8">
            <div className="flex justify-between mb-2">
              <div className="px-3 py-1 bg-white/20 rounded-full text-white text-xs">All Projects</div>
            </div>
            
            <h2 className="text-3xl font-semibold text-white mt-4 mb-8">Your content creation funding portal</h2>
            
            <div className="flex items-center space-x-6 mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                <span className="text-white">Active</span>
              </div>
              <div className="text-white/80">Project Status</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <p className="text-white mb-6">
                You have successfully received funding based on your monthly revenue. 
                Track your growth and access additional capital as your subscriber base grows.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-white/70 text-sm mb-1">Monthly Revenue</div>
                  <div className="text-white text-xl font-medium">$24,851</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-white/70 text-sm mb-1">Available Funding</div>
                  <div className="text-white text-xl font-medium">$223,659</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/10">
                  <div className="text-white/70 text-sm mb-1">Subscribers</div>
                  <div className="text-white text-xl font-medium">1,284</div>
                </div>
              </div>
              
              <Button className="bg-white hover:bg-white/90 text-[#5e71ff] rounded-full px-6">
                Access Funding
                <ChevronRightIcon className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMockup;
