
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Staggered animation effect for hero elements
    const animateHeroElements = () => {
      const elements = [headingRef.current, subheadingRef.current, ctaRef.current];
      
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
        </div>
      </div>
    </section>
  );
};

export default Hero;
