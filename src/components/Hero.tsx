import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import MinimalCalculator from "./MinimalCalculator";
import { useIsMobile } from "@/hooks/use-mobile";

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);
  const calculatorRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Staggered animation effect for hero elements
    const animateHeroElements = () => {
      const elements = [headingRef.current, subheadingRef.current, ctaRef.current, calculatorRef.current, platformsRef.current];
      
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
    { name: "Creator Capital", image: "/lovable-uploads/ffdad90a-7332-4fbe-add4-1edb2c536b21.png" },
    { name: "Supercast", image: "/lovable-uploads/c065b0eb-11e5-4a1b-9b11-a51fda9242d3.png" },
    { name: "Apple Podcasts", image: "/lovable-uploads/fa618ef5-0992-48ff-9d97-deeb98eaca42.png" },
  ];

  return (
    <section 
      id="hero-section" 
      ref={heroSectionRef}
      className="relative min-h-[600px] md:min-h-[700px] md:max-h-[900px] pt-20 pb-16 md:pb-0 md:h-screen overflow-hidden flex flex-col md:flex-row items-center"
    >
      <div className="absolute inset-0 bg-[#FCF7F0] z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 relative z-10 w-full">
        <div className="grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-5 max-w-xl">
            <h1 
              ref={headingRef}
              className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 md:mb-6 opacity-0 leading-[1.2]"
            >
              Get your annual subscription revenue upfront.
            </h1>
            
            {/* Removed the subheading with the text that needed to be removed */}
            <div 
              ref={subheadingRef}
              className="opacity-0 mb-4 md:mb-6"
            >
              {/* Text removed from here */}
            </div>
            
            <div 
              ref={ctaRef}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 opacity-0 mb-8"
            >
              <Button 
                className={cn(
                  "primary-button group w-full sm:w-auto",
                  "bg-[#017354] hover:bg-[#017354]/90 text-base h-12 px-6"
                )}
                onClick={() => document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'})}
              >
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              
              <Button 
                variant="outline" 
                className="secondary-button text-base h-12 px-6 w-full sm:w-auto"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({behavior: 'smooth'})}
              >
                Learn How It Works
              </Button>
            </div>
            
            {/* Platform section - shown on both mobile and desktop */}
            <div 
              ref={platformsRef}
              className="opacity-0 mb-8 md:mb-0"
            >
              <h3 className="text-sm font-normal text-gray-500 mb-4">
                We fund creators with subscription-based earnings from:
              </h3>
              
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3 max-w-md mx-auto sm:mx-0">
                {platforms.map((platform, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-center p-2 bg-white rounded-lg border border-gray-100 shadow-sm h-12 sm:h-16"
                  >
                    <img 
                      src={platform.image} 
                      alt={platform.name} 
                      className="max-h-6 sm:max-h-8 w-auto object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Calculator section - full width on mobile, right-aligned on desktop */}
          <div 
            ref={calculatorRef}
            className="opacity-0 md:col-span-7 flex justify-center md:justify-end mt-6 md:mt-0"
          >
            <MinimalCalculator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
