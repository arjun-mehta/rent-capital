
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered animation effect for hero elements
    const animateHeroElements = () => {
      const elements = [headingRef.current, subheadingRef.current, ctaRef.current, platformsRef.current];
      
      elements.forEach((element, index) => {
        if (element) {
          setTimeout(() => {
            element.classList.add("animate-reveal-text");
          }, index * 200); // Stagger the animations with 200ms delay
        }
      });
    };

    // Trigger animations after a short delay when component mounts
    const animationTimer = setTimeout(() => {
      animateHeroElements();
    }, 100);

    return () => clearTimeout(animationTimer);
  }, []);

  // Platform logos
  const platforms = [
    { name: "Patreon", image: "/lovable-uploads/2eaf1022-49a3-438a-b943-6537f0bead7e.png" },
    { name: "YouTube", image: "/lovable-uploads/8d03313e-767e-4c31-bca6-07b5e0c8fa02.png" },
    { name: "Substack", image: "/lovable-uploads/df18836f-8cd4-462f-84b0-d917f20195ef.png" },
    { name: "Twitch", image: "/lovable-uploads/09c16960-6097-4df5-ba5b-62d6d6d1cda8.png" },
    { name: "Supercast", image: "/lovable-uploads/c065b0eb-11e5-4a1b-9b11-a51fda9242d3.png" },
  ];

  return (
    <section className="relative pt-32 pb-8 md:pt-44 md:pb-16 overflow-hidden">
      <div className="absolute inset-0 bg-[#fcf4ed] z-0"></div>
      
      <div className="section-container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            ref={headingRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 opacity-0 leading-[1.1]"
          >
            Get Paid Upfront for Your Subscription Revenue.
          </h1>
          
          <p 
            ref={subheadingRef}
            className="text-xl md:text-2xl lg:text-3xl mb-10 opacity-0 text-gray-700 max-w-3xl mx-auto"
          >
            Turn your future subscription earnings into cash today—no equity, no debt, no waiting.
          </p>
          
          <div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
          >
            <Button 
              className={cn(
                "primary-button group",
                "bg-black hover:bg-black/90 text-base sm:text-lg h-14 px-8"
              )}
              onClick={() => document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'})}
            >
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button 
              variant="outline" 
              className="secondary-button text-base sm:text-lg h-14 px-8"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior: 'smooth'})}
            >
              Learn How It Works
            </Button>
          </div>
          
          {/* Platform section moved from WhoWeHelp component */}
          <div 
            ref={platformsRef}
            className="mt-16 opacity-0"
          >
            <h3 className="text-xl md:text-2xl font-medium text-center mb-8">
              We fund creators with predictable, subscription-based earnings from:
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6 max-w-4xl mx-auto">
              {platforms.map((platform, index) => (
                <div 
                  key={index}
                  className="flex flex-col items-center justify-center p-4 md:p-5 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 h-24 md:h-28"
                >
                  <img 
                    src={platform.image} 
                    alt={platform.name} 
                    className="h-8 md:h-10 object-contain" 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
