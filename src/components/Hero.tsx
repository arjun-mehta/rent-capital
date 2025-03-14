
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Hero: React.FC = () => {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-reveal-text");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (headingRef.current) observer.observe(headingRef.current);
    if (subheadingRef.current) observer.observe(subheadingRef.current);
    if (ctaRef.current) observer.observe(ctaRef.current);

    return () => {
      if (headingRef.current) observer.unobserve(headingRef.current);
      if (subheadingRef.current) observer.unobserve(subheadingRef.current);
      if (ctaRef.current) observer.unobserve(ctaRef.current);
    };
  }, []);

  return (
    <section className="relative pt-32 pb-16 md:pt-44 md:pb-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white z-0"></div>
      
      <div className="section-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="tag bg-black/5 text-black/80 mb-6 opacity-0 animate-fade-in" style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}>
            Creator Financing Simplified
          </div>
          
          <h1 
            ref={headingRef}
            className="heading-xl mb-6 opacity-0"
          >
            Get Upfront Capital for Your Recurring Revenue
          </h1>
          
          <p 
            ref={subheadingRef}
            className="paragraph text-xl md:text-2xl mb-8 opacity-0"
          >
            Get a cash advance against your predictable subscription revenue—no equity, no debt, no hassle.
          </p>
          
          <div 
            ref={ctaRef}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0"
            style={{ animationDelay: "0.4s", animationFillMode: "forwards" }}
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
      
      <div className="section-container mt-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-lg text-center text-gray-500 mb-6 animate-fade-in-slow">Trusted by creators from</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center opacity-80">
            <div className="h-8 flex items-center animate-fade-in-slow" style={{ animationDelay: "0.1s" }}>
              <div className="text-xl font-semibold">Patreon</div>
            </div>
            <div className="h-8 flex items-center animate-fade-in-slow" style={{ animationDelay: "0.2s" }}>
              <div className="text-xl font-semibold">Substack</div>
            </div>
            <div className="h-8 flex items-center animate-fade-in-slow" style={{ animationDelay: "0.3s" }}>
              <div className="text-xl font-semibold">YouTube</div>
            </div>
            <div className="h-8 flex items-center animate-fade-in-slow" style={{ animationDelay: "0.4s" }}>
              <div className="text-xl font-semibold">Twitch</div>
            </div>
            <div className="h-8 flex items-center animate-fade-in-slow" style={{ animationDelay: "0.5s" }}>
              <div className="text-xl font-semibold">Discord</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
