
import React, { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WhoWeHelp: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const platformsRef = useRef<HTMLDivElement>(null);
  const qualificationsRef = useRef<HTMLDivElement>(null);
  const useCasesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (platformsRef.current) observer.observe(platformsRef.current);
    if (qualificationsRef.current) observer.observe(qualificationsRef.current);
    if (useCasesRef.current) observer.observe(useCasesRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
      if (platformsRef.current) observer.unobserve(platformsRef.current);
      if (qualificationsRef.current) observer.unobserve(qualificationsRef.current);
      if (useCasesRef.current) observer.unobserve(useCasesRef.current);
    };
  }, []);

  const platforms = [
    { name: "Patreon", image: "/lovable-uploads/2eaf1022-49a3-438a-b943-6537f0bead7e.png" },
    { name: "YouTube", image: "/lovable-uploads/8d03313e-767e-4c31-bca6-07b5e0c8fa02.png" },
    { name: "Substack", image: "/lovable-uploads/df18836f-8cd4-462f-84b0-d917f20195ef.png" },
    { name: "Twitch", image: "/lovable-uploads/09c16960-6097-4df5-ba5b-62d6d6d1cda8.png" },
    { name: "Supercast", image: "/lovable-uploads/c065b0eb-11e5-4a1b-9b11-a51fda9242d3.png" },
  ];

  const qualifications = [
    "You upload content at least twice a month on a subscription platform.",
    "You've been earning subscription revenue for at least 12 months.",
    "You generate $20,000+ per month from Patreon, Substack, or similar platforms."
  ];

  const useCases = [
    "Hire an editor, designer, or producer to scale production.",
    "Upgrade your setup with professional equipment.",
    "Expand your business with a new content series or premium tier.",
    "Launch & stock merchandise to boost your brand.",
    "Invest in marketing, digital products, or live events to grow faster."
  ];

  return (
    <section id="who-we-help" className="py-24 bg-[#fcf4ed]">
      <div className="section-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 ref={sectionRef} className="heading-lg mb-6 opacity-0">
            If You Have Recurring Revenue, We Can Fund You
          </h2>
          <p className="paragraph text-gray-600 mx-auto max-w-2xl opacity-0 animate-fade-in" style={{ animationDelay: "0.2s", animationFillMode: "forwards" }}>
            We specialize in providing financing to creators with predictable, subscription-based income streams.
          </p>
        </div>

        <div ref={platformsRef} className="mb-16 opacity-0">
          <h3 className="heading-md text-center mb-8">
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

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div ref={qualificationsRef} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm opacity-0">
            <h3 className="heading-md mb-6">Who Qualifies?</h3>
            <ul className="space-y-4">
              {qualifications.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div ref={useCasesRef} className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm opacity-0">
            <h3 className="heading-md mb-6">Ways Creators Use Their Funding:</h3>
            <ul className="space-y-4">
              {useCases.map((item, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-black flex-shrink-0 mt-1" />
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button 
            className="bg-black hover:bg-black/90 text-white group"
            onClick={() => document.getElementById('application-form')?.scrollIntoView({behavior: 'smooth'})}
          >
            See If You Qualify
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhoWeHelp;
